# Roadmap

CoreUI-Kit is meant to grow into a full ecosystem — registry, docs, install CLI, theming, testing, and community contribution — not just a component count. This is the current priority order; it will shift as the project gets real usage and feedback.

## Done

- [x] 35 production-ready blocks across 8 categories.
- [x] Live preview + source viewer for every block, with one-click copy.
- [x] Dedicated shareable page per component, site-wide search, light/dark theme.
- [x] Registry validation, lint, and build wired into CI.
- [x] Every block is a real, accessible, keyboard-operable component (v0.4.0) — not a static mockup.
- [x] `CONTRIBUTING.md`, issue/PR templates, `SECURITY.md`, `CHANGELOG.md`.

## In progress / next up

- [ ] **Testing infrastructure.** No automated tests exist yet. Add Vitest + React Testing Library for behavior (focus trap, keyboard nav, form state) and `axe-core` for automated a11y regression checks, wired into CI alongside the existing lint/build/validate step.
- [ ] **Install CLI.** Move beyond copy-paste-only: a `npx coreui-kit add <component>` command that fetches a component's source and dependencies directly into a consumer's project, following the `registry.json` schema already in place.
- [ ] **Component-level design tokens.** Registry components currently hardcode colors (e.g. `bg-[#0d0d10]`, `amber-300`) rather than reading CSS custom properties, so a consumer's theme can't reach into copied components the way the site chrome's own token system already allows. Define a token layer components can opt into.
- [ ] **Richer `registry.json` metadata.** Add per-component `props`, `variants`, and `a11yNotes` fields so the docs page can surface the full spec the project's vision calls for (props table, variants, accessibility notes), not just name/category/files/dependencies.

## Later

- [ ] Component playground (live prop editing in the browser, not just static preview).
- [ ] Versioned component history (diff a component's source across registry versions).
- [ ] AI-assisted component scaffolding matching the registry's existing conventions.

Have an idea or a use case this doesn't cover? Open an issue — see [CONTRIBUTING.md](./CONTRIBUTING.md).
