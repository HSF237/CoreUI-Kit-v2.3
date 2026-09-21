export const docsPages = [
  {
    slug: "introduction",
    title: "Introduction",
    summary: "What CoreUI-Kit is and how it's meant to be used.",
    sections: [
      {
        heading: "What is CoreUI-Kit?",
        paragraphs: [
          "CoreUI-Kit is a free, open-source registry of copy-and-paste React + Tailwind CSS interface blocks. There's no package to install and no runtime dependency on CoreUI-Kit itself — you browse a component, copy its source, and it becomes part of your codebase.",
          "That means you own every line. No black-box npm package to update, no breaking changes shipped from upstream, no bundle-size surprises. If you want to change a color, a spacing value, or the whole interaction model, you just edit the file.",
        ],
      },
      {
        heading: "Who it's for",
        paragraphs: [
          "Developers who want production-minded UI (dashboards, fintech surfaces, forms, marketing sections) without starting from a blank Tailwind file, and who would rather adapt real code than fight a component library's API surface.",
        ],
      },
      {
        heading: "What you get",
        list: [
          "Live preview and full source for every block, side by side.",
          "A machine-readable registry.json so tooling can consume the catalog programmatically.",
          "Consistent conventions across every component: plain React state, lucide-react icons, Tailwind utility classes, no external UI dependency.",
          "Everything under the MIT license — use it in personal, commercial, or client work with no attribution required.",
        ],
      },
    ],
  },
  {
    slug: "installation",
    title: "Installation",
    summary: "Requirements and how to get the project running locally.",
    sections: [
      {
        heading: "Requirements",
        list: ["Node.js 20 or newer", "npm (or your package manager of choice)"],
      },
      {
        heading: "Clone and run",
        code: "git clone https://github.com/HSF237/CoreUI-Kit-v2.3.git\ncd CoreUI-Kit-v2.3\nnpm install\nnpm run dev",
      },
      {
        heading: "Using a single component in your own project",
        paragraphs: [
          "You don't need to clone the whole repository to use one block. Open the component on its detail page, switch to the Code tab, and copy it into your project under any path that makes sense to you.",
        ],
        list: [
          "Make sure Tailwind CSS is already set up in your project.",
          "Install lucide-react if the component uses icons: npm install lucide-react",
          "Paste the component file and import it wherever you need it.",
        ],
      },
      {
        heading: "Production build",
        code: "npm run build\nnpm run preview",
      },
    ],
  },
  {
    slug: "usage",
    title: "Usage",
    summary: "How components are structured and how to add a new one to the registry.",
    sections: [
      {
        heading: "Component conventions",
        list: [
          "Each block is a single, self-contained .jsx file — no shared internal utilities to drag in.",
          "State is local React state (useState/useMemo). Nothing global, no external state library.",
          "Icons come from lucide-react only.",
          "Styling is Tailwind CSS utility classes; no CSS-in-JS, no separate stylesheets per component.",
        ],
      },
      {
        heading: "Adding a component to the registry",
        list: [
          "Add the component file under src/components/registry/<category>/.",
          "Import the component and its ?raw source in src/registry/index.js.",
          "Add its metadata (slug, title, description, category, tags) to the registryItems array.",
          "Add matching metadata to registry.json, including any npm dependencies beyond react and lucide-react.",
          "Run npm run check to validate the registry, lint, and build before opening a pull request.",
        ],
      },
      {
        heading: "How source copying works",
        paragraphs: [
          "A component is imported normally for the live preview, and a second time with Vite's ?raw suffix to get its exact source text for the code viewer and the copy button. That keeps the rendered preview and the copied code guaranteed to match — there's no separate 'docs version' of a component that can drift from the real one.",
        ],
        code: 'import Component from "../components/registry/example/Component.jsx";\nimport componentSource from "../components/registry/example/Component.jsx?raw";',
      },
    ],
  },
  {
    slug: "theming",
    title: "Theming",
    summary: "How the site's light/dark chrome works and how to restyle a copied component.",
    sections: [
      {
        heading: "Site chrome vs. component previews",
        paragraphs: [
          "The CoreUI-Kit site itself supports a light and dark theme, controlled by a data-theme attribute on <html> and a set of CSS custom properties (--chrome-surface, --chrome-border, --chrome-text-primary, and so on) defined in src/styles.css.",
          "Component preview canvases and the code viewer intentionally stay dark regardless of the site theme — this keeps every block's intended visual design (glass panels, gradients, category color language) exactly as designed, which is what you're actually copying.",
        ],
      },
      {
        heading: "Component design tokens (v0.5+)",
        paragraphs: [
          "Every block's structural colors — surface backgrounds, borders, and body text — are now written as CSS custom properties with a fallback, e.g. bg-[var(--surface,#0d0d10)] or text-[var(--text-muted,#64748b)]. Each component looks exactly the same as before with zero setup, because the fallback value is the original color.",
          "To re-theme every copied component at once, define these variables in your own app's global stylesheet — you only need to override the ones you want to change:",
        ],
        code: ":root {\n  --surface: #0d0d10;\n  --surface-raised: #111114;\n  --surface-inset: rgba(255, 255, 255, .025);\n  --border: rgba(255, 255, 255, .1);\n  --border-soft: rgba(255, 255, 255, .075);\n  --text-primary: #e2e8f0;\n  --text-secondary: #cbd5e1;\n  --text-tertiary: #94a3b8;\n  --text-muted: #64748b;\n  --text-subtle: #475569;\n  --text-faint: #334155;\n  --text-on-accent: #020617;\n}",
      },
      {
        heading: "Accent colors stay per-component",
        paragraphs: [
          "Category accent colors (the amber, emerald, rose, sky and fuchsia touches that give each block its own personality) are deliberately left as plain Tailwind utilities rather than tokens — swap emerald-300 for your own brand color directly in the component file when you want a specific block to match your palette. Border-radius scale and spacing are also plain Tailwind classes, unchanged from before.",
        ],
      },
    ],
  },
  {
    slug: "contributing",
    title: "Contributing",
    summary: "How to propose new components or improvements.",
    sections: [
      {
        heading: "Ground rules",
        list: [
          "Keep pull requests focused — one component or one fix per PR is easiest to review.",
          "Prefer components that solve a real, recognizable product UI need over adding blocks purely to raise the count.",
          "Include a screenshot or short clip for any visual change.",
          "Test both the preview and the copied source at mobile and desktop widths before opening a PR.",
        ],
      },
      {
        heading: "Local checks before opening a PR",
        code: "npm run check",
        paragraphs: ["This runs registry validation, lint, and a production build in one step."],
      },
      {
        heading: "Reporting issues",
        paragraphs: [
          "Bug reports and feature requests are welcome on GitHub Issues. Include the component slug, what you expected, and what actually happened (a screenshot helps a lot for visual bugs).",
        ],
      },
    ],
  },
  {
    slug: "changelog",
    title: "Changelog",
    summary: "Notable changes by version.",
    sections: [
      {
        heading: "v0.8.0",
        list: [
          "Added an install CLI: npx coreui-kit add <component> fetches a component's source and dependencies and writes it into your project (also list, --path, --overwrite, --install).",
          "The CLI is its own independent, zero-dependency npm package, published separately from this site's own tooling.",
        ],
      },
      {
        heading: "v0.7.2",
        list: ["Reverted the 2-column gallery grid from v0.7.1 — it broke wide, multi-panel components whose internal responsive breakpoints assume full viewport width. Back to a single full-width column."],
      },
      {
        heading: "v0.7.1",
        list: ["The homepage gallery now lays out in a 2-column grid on wide screens instead of a single full-width column."],
      },
      {
        heading: "v0.7.0",
        list: [
          "Added a real test suite (Vitest + React Testing Library + jest-axe): an automated accessibility scan across all 38 blocks plus behavior regression tests for the trickiest interactive ones, wired into CI.",
          "Fixed a production 404 on any route besides / (e.g. /docs) — vercel.json now has an SPA fallback rewrite.",
          "Consolidated the canonical domain across the whole repo.",
        ],
      },
      {
        heading: "v0.6.0",
        list: [
          "Structural colors across all 38 blocks now use CSS variables with a fallback (e.g. bg-[var(--surface,#0d0d10)]) instead of hardcoded utilities — re-theme every copied component at once. See the Theming page for the token reference.",
          "Accent colors stay per-component by design; only surface/border/text tokens are shared.",
        ],
      },
      {
        heading: "v0.5.0",
        list: [
          "Added Custom Checkbox Kit (Forms), Tabs Panel (Interactive), and Stats Counter Section (Marketing) — 38 blocks total.",
          "See CREDITS.md for the open-source projects that inspired these patterns.",
        ],
      },
      {
        heading: "v0.4.0",
        list: [
          "Every block is now a real, working component instead of a static mockup — keyboard navigation, ARIA roles/labels, focus-visible states, and prefers-reduced-motion support across all 35 blocks.",
          "Fixed dead controls that looked interactive but weren't (carousel prev/next, FAQ accordion toggle).",
          "Documented the accessibility bar every new block must meet in CONTRIBUTING.md.",
        ],
      },
      {
        heading: "v0.3.0",
        list: [
          "Added dedicated, shareable pages for every component (/components/:slug).",
          "Added a real site-wide search / command palette (⌘K or /).",
          "Added a light theme for the site chrome, with a header toggle.",
          "Added a Docs section: Introduction, Installation, Usage, Theming, Contributing, Changelog.",
          "Grew the registry with new Overlays and Marketing categories.",
          "Added SEO metadata, Open Graph tags, and a sitemap.",
        ],
      },
      {
        heading: "v0.2.0",
        list: ["27 production-ready blocks across six categories.", "Preview / Code tabs with one-click copy for every block."],
      },
    ],
  },
];

export function getDocPage(slug) {
  return docsPages.find((page) => page.slug === slug);
}
