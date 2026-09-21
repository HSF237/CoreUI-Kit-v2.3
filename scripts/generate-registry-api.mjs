import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const registryPath = path.join(rootDir, "registry.json");
const outDir = path.join(rootDir, "public", "r");

function titleCase(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function main() {
  const manifest = JSON.parse(readFileSync(registryPath, "utf8"));
  mkdirSync(outDir, { recursive: true });

  const index = [];

  for (const item of manifest.items) {
    const files = item.files.map((relativePath) => {
      const absolute = path.join(rootDir, relativePath);
      const content = readFileSync(absolute, "utf8");
      return {
        path: relativePath,
        target: `components/coreui-kit/${path.basename(relativePath)}`,
        type: item.type,
        content,
      };
    });

    const entry = {
      $schema: "https://core-ui-kit-v2-3.vercel.app/r/schema.json",
      name: item.name,
      type: item.type,
      title: titleCase(item.name),
      category: item.category,
      dependencies: item.dependencies ?? [],
      files,
    };

    writeFileSync(path.join(outDir, `${item.name}.json`), JSON.stringify(entry, null, 2));

    index.push({
      name: item.name,
      title: entry.title,
      category: item.category,
      dependencies: entry.dependencies,
    });
  }

  writeFileSync(
    path.join(outDir, "index.json"),
    JSON.stringify({ $schema: "https://core-ui-kit-v2-3.vercel.app/r/schema.json", items: index }, null, 2)
  );

  console.log(`✓ Registry API written — ${manifest.items.length} component definitions in public/r/`);
}

main();
