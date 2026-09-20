import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const registryPath = path.join(rootDir, "registry.json");

function fail(message) {
  console.error(`✖ ${message}`);
  process.exitCode = 1;
}

function main() {
  const raw = readFileSync(registryPath, "utf8");
  let manifest;

  try {
    manifest = JSON.parse(raw);
  } catch (error) {
    fail(`registry.json is not valid JSON: ${error.message}`);
    return;
  }

  const { categories = [], items = [] } = manifest;
  const categorySet = new Set(categories);
  const seenNames = new Set();
  let errorCount = 0;

  if (items.length === 0) {
    fail("registry.json has no items.");
    errorCount += 1;
  }

  for (const item of items) {
    const label = item.name ?? "(unnamed item)";

    if (!item.name) {
      fail(`Item is missing a "name": ${JSON.stringify(item)}`);
      errorCount += 1;
    } else if (seenNames.has(item.name)) {
      fail(`Duplicate item name "${item.name}".`);
      errorCount += 1;
    } else {
      seenNames.add(item.name);
    }

    if (!item.category || !categorySet.has(item.category)) {
      fail(`"${label}" has an unknown category "${item.category}". Add it to the categories array first.`);
      errorCount += 1;
    }

    if (!Array.isArray(item.files) || item.files.length === 0) {
      fail(`"${label}" must list at least one file.`);
      errorCount += 1;
      continue;
    }

    for (const file of item.files) {
      const absolute = path.join(rootDir, file);
      if (!existsSync(absolute)) {
        fail(`"${label}" references a file that does not exist: ${file}`);
        errorCount += 1;
      }
    }
  }

  if (errorCount === 0) {
    console.log(`✓ registry.json is valid — ${items.length} components across ${categories.length} categories.`);
  }
}

main();
