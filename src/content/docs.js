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
        code: "git clone https://github.com/HSF237/CoreUI-Kit.git\ncd CoreUI-Kit\nnpm install\nnpm run dev",
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
        heading: "Restyling a component you copy",
        paragraphs: [
          "Once a component is in your codebase, it's just Tailwind classes. Swap the color utilities (emerald-400, rose-400, etc.) for your own palette, adjust border-radius scale, or change spacing — nothing is namespaced to CoreUI-Kit or requires a theme provider.",
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
