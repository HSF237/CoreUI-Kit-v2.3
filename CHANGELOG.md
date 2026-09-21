# Changelog

All notable changes to this project are documented in this file. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project uses [Semantic Versioning](https://semver.org/).

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
