# Changelog

All notable changes to this project are documented in this file. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project uses [Semantic Versioning](https://semver.org/).

## v0.8.1

CLI hardening, based on review feedback before its first publish:

- Dependency installs now run via [`cross-spawn`](https://github.com/moxystudio/node-cross-spawn) with an argument array instead of building a shell command string and running it through `execSync` — a dependency name can no longer be interpreted as shell syntax. (An intermediate attempt using Node's built-in `execFileSync` with `shell: true` turned out to *not* actually be safe on Windows — Node itself deprecated that exact combination as DEP0190, since `shell: true` with an array still just concatenates arguments without escaping them. `cross-spawn` is what npm and Yarn use internally to solve this correctly, including proper `.cmd`/`.bat` resolution on Windows.)
- `fetch` calls now have a 10s timeout (`AbortController`), instead of hanging indefinitely if the registry is unreachable.
- `--path` is validated: rejects an empty value, rejects resolving to the filesystem root, and rejects an existing path that isn't a directory — with a clear error message instead of a raw `fs` exception.
- The registry API is now versioned: `public/r/v1/index.json`, `public/r/v1/<component>.json` (was unversioned `public/r/`). A future breaking schema change ships as `v2` without breaking CLI versions already installed by users.

## v0.8.0

- Added an install CLI: `npx coreui-kit add <component>` fetches a component's source and dependencies and writes it into your project. Also `npx coreui-kit list`, `--path`, `--overwrite`, `--install`.
- The CLI (`cli/`) is its own independent, zero-dependency npm package — publishing it never pulls in this repo's own React/Vite/testing tooling as install dependencies.
- Added `scripts/generate-registry-api.mjs`, run automatically as part of `prebuild`, which turns `registry.json` into a static JSON API under `public/r/` (one file per component plus an index) that the CLI reads from the deployed site.
- **Not yet live publicly**: `npx coreui-kit` only works once `npm publish` has been run from `cli/` under the maintainer's own npm account — this requires npm credentials that aren't available to automate.

## v0.7.2

- Reverted the homepage's 2-column gallery grid (added in v0.7.1). It broke wide, multi-panel components like `ResponsiveSidebarNavigation`, `DataTablePro`, and `AnalyticsCommandCenter` — their internal `sm:`/`md:`/`lg:` breakpoints respond to the browser's viewport width, not the width of the grid column they're placed in, so they rendered their "desktop" layout inside a half-width column and visibly broke (overlapping text, truncated labels). Back to a single full-width column, which is correct for every component regardless of its internal responsive assumptions. A denser gallery layout needs either a curated per-component allowlist or a container-query-based refactor — not a blanket grid change — and either would need visual verification in a real browser before shipping again.

## v0.7.1

- The homepage component gallery now lays out in a 2-column grid on wide screens (`xl:` breakpoint and up) instead of stacking every component full-width in a single column. Most blocks are `max-w-md`–`max-w-2xl` internally, so the old single-column layout left a lot of dead space on desktop.

## v0.7.0

- Added a real test suite: Vitest + React Testing Library + jest-axe, wired into `npm run check` and CI. 53 tests: an automated axe accessibility scan across all 38 registry components, plus behavior regression tests for the trickiest interactive blocks (modal focus trap/Escape/focus-return, tabs keyboard navigation, carousel/accordion state). The suite caught two real accessibility bugs on its first run — see Fixed below.
- Fixed the production site returning a 404 on any route besides `/` (e.g. `/docs`, `/components/tabs-panel`) — `vercel.json` had no SPA fallback rewrite, so a direct link or refresh on a client-side route hit Vercel's static file server instead of `index.html`.
- Consolidated the canonical domain to `https://core-ui-kit-v2-3.vercel.app` across `README.md`, `index.html` (canonical/OG/Twitter tags), `package.json` (`homepage`), `public/robots.txt`, and `scripts/generate-sitemap.mjs` — these had been left pointing at an old domain from a previous project iteration.

### Fixed

- `UpcomingFeaturesCard`: progress bar `id`/`aria-labelledby` was built from a feature title containing spaces (e.g. `"Automation Studio-progress-label"`), which `aria-labelledby` parses as multiple space-separated ID references — none of which existed, breaking the accessible name entirely. IDs are now slugified.
- `FileUploadDropzone`: the visually-hidden native `<input type="file">` had no accessible name.

## v0.6.0

- Retrofitted all 38 components: structural colors (surface backgrounds, borders, body text) now use CSS variables with a fallback equal to the original color — e.g. `bg-[var(--surface,#0d0d10)]` — instead of hardcoded Tailwind utilities. Zero visual change by default; consumers can now re-theme every copied component at once by defining `--surface`, `--border`, `--text-primary`, etc. in their own global CSS.
- Category accent colors (amber, emerald, rose, sky, fuchsia...) intentionally stay as plain Tailwind utilities — they're part of each block's individual visual identity, not shared chrome.
- Updated the Theming docs page with the full token reference, and CONTRIBUTING.md with the convention for new components.

## v0.5.0

- Added three new blocks: Custom Checkbox Kit (Forms), Tabs Panel (Interactive), Stats Counter Section (Marketing) — 38 blocks total.
- Added `CREDITS.md` documenting the open-source projects (Uiverse.io, HyperUI, Flowbite, daisyUI) whose patterns inspired these blocks — each re-implemented from scratch in our own conventions, not copied source.

## v0.4.0

- Every block is now a real, working component instead of a static mockup — keyboard navigation, ARIA roles/labels, focus-visible states, and `prefers-reduced-motion` support across all 35 blocks.
- Fixed dead controls that looked interactive but weren't (carousel prev/next, FAQ accordion toggle were both no-ops).
- Documented the accessibility bar every new block must meet in `CONTRIBUTING.md`.
- Added `repository`/`homepage`/`bugs` fields to `package.json`.

## v0.3.0

- Added dedicated, shareable pages for every component (`/components/:slug`).
- Added a real site-wide search / command palette (⌘K or `/`).
- Added a light theme for the site chrome, with a header toggle.
- Added a Docs section: Introduction, Installation, Usage, Theming, Contributing, Changelog.
- Grew the registry with new Overlays and Marketing categories.
- Added SEO metadata, Open Graph tags, and a sitemap.

## v0.2.0

- 27 production-ready blocks across six categories.
- Preview / Code tabs with one-click copy for every block.
