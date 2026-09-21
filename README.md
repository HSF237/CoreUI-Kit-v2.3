# CoreUI-Kit

[![CI](https://github.com/HSF237/CoreUI-Kit-v2.3/actions/workflows/ci.yml/badge.svg)](https://github.com/HSF237/CoreUI-Kit-v2.3/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-0.7.1-informational.svg)](./CHANGELOG.md)

**CoreUI-Kit is a free, open-source copy-and-paste UI registry for React and Tailwind CSS.**

Browse polished production-minded interface blocks, preview them live, inspect the exact source file, and copy the code directly into your own product. No package to install, no runtime dependency on CoreUI-Kit — the code you copy is the code you own.

**Live site:** https://core-ui-kit-v2-3.vercel.app/
**Repository:** https://github.com/HSF237/CoreUI-Kit-v2.3

## v0.7 — 38 production-ready, accessible, themeable, tested blocks

CoreUI-Kit currently ships eight categories:

| Category | Blocks |
| --- | ---: |
| Fintech Blocks | 5 |
| Dashboards | 5 |
| Interactive Sections | 6 |
| Buttons & Actions | 4 |
| Loaders & Progress | 4 |
| Forms & Inputs | 5 |
| Overlays & Feedback | 4 |
| Marketing Sections | 5 |
| **Total** | **38** |

### Fintech Blocks
- Transaction & Exchange Overview
- Premium Wallet Card
- Payment Method Stack
- Revenue Metric Card
- Invoice Status Panel

### Dashboards
- Responsive Sidebar Navigation
- Analytics Command Center
- Activity Timeline
- Data Table Pro
- System Health Panel

### Interactive Sections
- Glassmorphic Upcoming Features
- Bento Feature Grid
- Notification Center
- Pricing Tier Card
- Command Palette
- Tabs Panel

### Buttons & Actions
- Premium Action Buttons
- Segmented Control
- Gradient Icon Buttons
- Floating Action Dock

### Loaders & Progress
- Loading Status Panel
- Multi-Step Progress
- Circular Progress Stats
- Skeleton Dashboard

### Forms & Inputs
- Smart Login Panel
- Profile Settings Form
- Search & Filter Bar
- File Upload Dropzone
- Custom Checkbox Kit

### Overlays & Feedback
- Glass Modal Dialog
- Toast Notification Stack
- Tooltip & Popover Kit
- Confirm Delete Dialog

### Marketing Sections
- Testimonial Carousel
- FAQ Accordion
- Logo Cloud
- Newsletter CTA Banner
- Stats Counter Section

## Why CoreUI-Kit?

- Every block is a real, working component — keyboard-operable, screen-reader-labeled, with visible focus states — not a static mockup. See [CONTRIBUTING.md](./CONTRIBUTING.md#accessibility-conventions) for the bar every block is held to.
- Structural colors ship as CSS variables with sensible fallbacks — re-theme every copied block at once by overriding a handful of tokens, no per-file editing required. See the [Theming docs](https://core-ui-kit-v2-3.vercel.app/docs/theming).
- Live rendered previews with Preview / Code tabs for every block.
- Every component has its own shareable page at `/components/:slug`.
- Real, site-wide search — press **⌘K** or **/** anywhere to jump to a component or doc.
- Light and dark site theme, toggleable from the header.
- One-click **Copy code**, with the exact source shown via Vite raw imports (preview and copy are always in sync).
- A Docs section: Introduction, Installation, Usage, Theming, Contributing, Changelog.
- Machine-readable `registry.json`, validated on every build.
- SEO metadata, Open Graph image, and a generated sitemap.
- React + Tailwind CSS, minimal dependency surface, MIT licensed.

See [CHANGELOG.md](./CHANGELOG.md) for release history, [ROADMAP.md](./ROADMAP.md) for what's planned next, and [CREDITS.md](./CREDITS.md) for the open-source patterns that inspired a few blocks.

## Architecture

```text
CoreUI-Kit/
├── src/
│   ├── components/
│   │   ├── registry/
│   │   │   ├── buttons/
│   │   │   ├── dashboard/
│   │   │   ├── fintech/
│   │   │   ├── forms/
│   │   │   ├── interactive/
│   │   │   ├── loaders/
│   │   │   ├── overlays/
│   │   │   └── marketing/
│   │   ├── showcase/
│   │   │   └── SnippetBlock.jsx
│   │   └── layout/
│   │       ├── Layout.jsx
│   │       ├── SiteHeader.jsx
│   │       ├── SiteFooter.jsx
│   │       └── SiteCommandPalette.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ComponentDetailPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── docs/
│   │       ├── DocsLayout.jsx
│   │       └── DocsPage.jsx
│   ├── content/
│   │   └── docs.js
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── registry/
│   │   ├── index.js
│   │   └── categoryTheme.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml (generated)
├── scripts/
│   ├── validate-registry.mjs
│   └── generate-sitemap.mjs
├── registry.json
├── vercel.json
├── vite.config.js
├── package.json
├── CONTRIBUTING.md
├── README.md
└── LICENSE
```

## How source copying works

A component is imported normally for the live preview and again with Vite's `?raw` suffix for the source viewer.

```js
import Component from "../components/registry/example/Component.jsx";
import componentSource from "../components/registry/example/Component.jsx?raw";
```

This keeps the preview and copied source synchronized from one real component file. `registry.json`'s `dependencies` field is the single source of truth for what each component needs beyond `react`; the UI reads it directly rather than duplicating it.

## Getting Started

### Requirements

- Node.js 20+
- npm

### Clone

```bash
git clone https://github.com/HSF237/CoreUI-Kit-v2.3.git
cd CoreUI-Kit-v2.3
```

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

## Using a single component in your own project

You don't need to clone the whole repository. Open the component on its detail page (`/components/<slug>`), switch to the **Code** tab, and copy it into your project. Make sure Tailwind CSS is already set up, and install `lucide-react` if the component uses icons.

See the [Docs](https://core-ui-kit-v2-3.vercel.app/docs) for the full installation and theming guide.

## Adding a component

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide. In short:

1. Add the component under `src/components/registry/<category>/`.
2. Import the component and its `?raw` source in `src/registry/index.js`.
3. Add its metadata to `registryItems`.
4. Add matching metadata to `registry.json`.
5. Run `npm run check` (validates the registry, lints, and builds).

## Deployment

### Vercel

Production updates deploy from `main`.

The included `vercel.json` uses:

```text
Framework: Vite
Build command: npm run build
Output directory: dist
```

The build automatically regenerates `public/sitemap.xml` from the current registry and docs before Vite builds (see the `prebuild` script).

### GitHub repository

https://github.com/HSF237/CoreUI-Kit-v2.3

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md) for conventions, the component checklist, and how to open a focused PR.

## License

CoreUI-Kit is released under the **MIT License**. See [LICENSE](./LICENSE).
