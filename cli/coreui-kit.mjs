#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import spawn from "cross-spawn";

const REGISTRY_API_VERSION = "v1";
const DEFAULT_REGISTRY = `https://core-ui-kit-v2-3.vercel.app/r/${REGISTRY_API_VERSION}`;
const registryBase = process.env.COREUI_KIT_REGISTRY ?? DEFAULT_REGISTRY;
const FETCH_TIMEOUT_MS = 10_000;

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
function color(code, text) {
  return useColor ? `\x1b[${code}m${text}\x1b[0m` : text;
}
const bold = (t) => color("1", t);
const green = (t) => color("32", t);
const yellow = (t) => color("33", t);
const red = (t) => color("31", t);
const dim = (t) => color("2", t);

function printHelp() {
  console.log(`
${bold("coreui-kit")} — copy CoreUI-Kit components into your project

${bold("Usage")}
  npx coreui-kit add <component> [<component>...]   Add one or more components
  npx coreui-kit list                                List every available component
  npx coreui-kit add <component> --path <dir>        Write into a custom directory (default: src/components/coreui-kit)
  npx coreui-kit add <component> --overwrite         Replace files that already exist
  npx coreui-kit add <component> --install           Install missing npm dependencies automatically

${bold("Examples")}
  npx coreui-kit add tabs-panel
  npx coreui-kit add tabs-panel premium-wallet-card --install
  npx coreui-kit list
`);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const positional = [];
  const flags = { path: null, overwrite: false, install: false };

  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    if (arg === "--path") {
      flags.path = rest[i + 1];
      i += 1;
    } else if (arg === "--overwrite") {
      flags.overwrite = true;
    } else if (arg === "--install") {
      flags.install = true;
    } else if (arg === "--help" || arg === "-h") {
      flags.help = true;
    } else if (!arg.startsWith("-")) {
      positional.push(arg);
    }
  }

  return { command, positional, flags };
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Timed out reaching ${url} after ${FETCH_TIMEOUT_MS / 1000}s. Check your connection or set COREUI_KIT_REGISTRY.`);
    }
    throw new Error(`Could not reach ${url}: ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}

/** Resolves and sanity-checks a user-supplied --path so we fail with a clear
 * message instead of a cryptic fs error or writing somewhere unexpected. */
function resolveTargetDir(rawPath) {
  const targetDir = rawPath ?? path.join("src", "components", "coreui-kit");

  if (typeof targetDir !== "string" || targetDir.trim() === "") {
    throw new Error("--path cannot be empty.");
  }

  const resolved = path.resolve(process.cwd(), targetDir);
  const root = path.parse(resolved).root;
  if (resolved === root) {
    throw new Error(`--path resolves to the filesystem root (${resolved}) — refusing to write there.`);
  }

  if (existsSync(resolved)) {
    const stat = statSync(resolved);
    if (!stat.isDirectory()) {
      throw new Error(`--path "${targetDir}" exists and is not a directory.`);
    }
  }

  return resolved;
}

async function listComponents() {
  const index = await fetchJson(`${registryBase}/index.json`);
  if (!index) {
    console.error(red(`Could not reach the registry at ${registryBase}`));
    process.exitCode = 1;
    return;
  }

  const byCategory = {};
  for (const item of index.items) {
    (byCategory[item.category] ??= []).push(item);
  }

  console.log(`${bold(`${index.items.length} components available`)}\n`);
  for (const [category, items] of Object.entries(byCategory)) {
    console.log(bold(category));
    for (const item of items) {
      console.log(`  ${item.name}${dim(` — ${item.title}`)}`);
    }
    console.log("");
  }
}

function suggestClosestNames(slug, allNames) {
  const lower = slug.toLowerCase();
  return allNames
    .filter((name) => name.includes(lower) || lower.includes(name) || levenshtein(name, lower) <= 3)
    .slice(0, 5);
}

function levenshtein(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, (_, i) => [i, ...Array(cols - 1).fill(0)]);
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }
  return matrix[rows - 1][cols - 1];
}

/** Returns {bin, args} for the detected package manager, as an argument
 * array (never a shell string) so it can be run via cross-spawn, which
 * handles Windows .cmd/.bat resolution and argument escaping correctly --
 * unlike execFileSync+shell:true, which Node itself warns (DEP0190) does
 * not actually escape arguments when shell:true is combined with an array. */
function detectInstallCommand(deps) {
  const cwd = process.cwd();
  const packageManager = existsSync(path.join(cwd, "pnpm-lock.yaml"))
    ? "pnpm"
    : existsSync(path.join(cwd, "yarn.lock"))
      ? "yarn"
      : "npm";
  const args = packageManager === "npm" ? ["install", ...deps] : ["add", ...deps];
  return { bin: packageManager, args };
}

function alreadyInstalled(dep) {
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, "package.json");
  if (!existsSync(pkgPath)) return false;
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    return Boolean(pkg.dependencies?.[dep] || pkg.devDependencies?.[dep]);
  } catch {
    return false;
  }
}

async function addComponents(slugs, flags) {
  const targetDir = resolveTargetDir(flags.path);
  const allDeps = new Set();
  let addedCount = 0;

  for (const slug of slugs) {
    const entry = await fetchJson(`${registryBase}/${slug}.json`);

    if (!entry) {
      console.error(red(`✗ "${slug}" is not a known component.`));
      const index = await fetchJson(`${registryBase}/index.json`);
      if (index) {
        const suggestions = suggestClosestNames(slug, index.items.map((i) => i.name));
        if (suggestions.length > 0) {
          console.error(dim(`  Did you mean: ${suggestions.join(", ")}?`));
        }
      }
      process.exitCode = 1;
      continue;
    }

    mkdirSync(targetDir, { recursive: true });

    for (const file of entry.files) {
      const destination = path.join(targetDir, path.basename(file.target ?? file.path));

      if (existsSync(destination) && !flags.overwrite) {
        console.log(yellow(`⚠ ${destination} already exists — skipped (use --overwrite to replace)`));
        continue;
      }

      writeFileSync(destination, file.content);
      console.log(green(`✓ ${destination}`));
    }

    for (const dep of entry.dependencies) allDeps.add(dep);
    addedCount += 1;
  }

  if (addedCount === 0) return;

  const missingDeps = [...allDeps].filter((dep) => !alreadyInstalled(dep));
  if (missingDeps.length === 0) return;

  const { bin, args } = detectInstallCommand(missingDeps);

  if (flags.install) {
    console.log(`\n${bold("Installing dependencies:")} ${bin} ${args.join(" ")}`);
    const result = spawn.sync(bin, args, { stdio: "inherit" });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      throw new Error(`${bin} ${args.join(" ")} exited with code ${result.status}`);
    }
  } else {
    console.log(`\n${bold("Dependencies needed:")} ${missingDeps.join(", ")}`);
    console.log(dim(`Run: ${bin} ${args.join(" ")}`));
  }
}

async function main() {
  const { command, positional, flags } = parseArgs(process.argv.slice(2));

  if (!command || flags.help) {
    printHelp();
    return;
  }

  if (command === "list" || command === "ls") {
    await listComponents();
    return;
  }

  if (command === "add") {
    if (positional.length === 0) {
      console.error(red("Specify at least one component, e.g. npx coreui-kit add tabs-panel"));
      process.exitCode = 1;
      return;
    }
    await addComponents(positional, flags);
    return;
  }

  console.error(red(`Unknown command "${command}".`));
  printHelp();
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(red(`Unexpected error: ${error.message}`));
  process.exitCode = 1;
});
