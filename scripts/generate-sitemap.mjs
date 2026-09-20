import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { docsPages } from "../src/content/docs.js";

const rootDir = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const siteUrl = "https://core-ui-kit-livid.vercel.app";

const registry = JSON.parse(readFileSync(path.join(rootDir, "registry.json"), "utf8"));

const staticRoutes = ["/", "/docs"];
const componentRoutes = registry.items.map((item) => `/components/${item.name}`);
const docsRoutes = docsPages.map((page) => `/docs/${page.slug}`);

const routes = [...staticRoutes, ...componentRoutes, ...docsRoutes];

const body = routes
  .map(
    (route) =>
      `  <url>\n    <loc>${siteUrl}${route}</loc>\n  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(path.join(rootDir, "public", "sitemap.xml"), xml);

console.log(`✓ sitemap.xml written with ${routes.length} routes.`);
