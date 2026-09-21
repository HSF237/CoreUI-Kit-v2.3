# Roadmap

CoreUI-Kit is meant to grow into a full ecosystem — registry, docs, install CLI, theming, testing, and community contribution — not just a component count. This is the current priority order; it will shift as the project gets real usage and feedback.

## Done

- [x] 38 production-ready blocks across 8 categories.
- [x] Live preview + source viewer for every block, with one-click copy.
- [x] Dedicated shareable page per component, site-wide search, light/dark theme.
- [x] Registry validation, lint, and build wired into CI.
- [x] Every block is a real, accessible, keyboard-operable component (v0.4.0) — not a static mockup.
- [x] `CONTRIBUTING.md`, issue/PR templates, `SECURITY.md`, `CHANGELOG.md`.
- [x] **Component-level design tokens** (v0.6.0). Surface/border/text colors ship as CSS variables with a fallback; a consumer's theme can now reach into copied components by overriding those variables. Category accent colors stay per-component by design.
- [x] **Testing infrastructure** (v0.7.0). Vitest + React Testing Library + jest-axe, wired into `npm run check` and CI: an automated a11y scan across all 38 components plus behavior regression tests for the trickiest interactive ones. Caught two real accessibility bugs on its first run.
- [x] **Production deployment fixes** (v0.7.0). Added an SPA fallback rewrite to `vercel.json` (client-side routes 404'd on direct load/refresh) and consolidated the canonical domain repo-wide.
- [x] **Install CLI** (`cli/`). `npx coreui-kit add <component>` fetches a component's source and dependencies from a generated, versioned static registry API (`public/r/v1/*.json`, regenerated every build from `registry.json`) and writes it into the consumer's project — `list`, `--path`, `--overwrite`, and `--install` supported, with a network timeout and validated `--path`. Published as its own npm package (one runtime dependency, `cross-spawn`, for safe cross-platform installs) so installing the CLI never pulls in this repo's own React/Vite/test tooling. **Needs `npm publish` from the `cli/` directory under the maintainer's npm account before `npx coreui-kit` works publicly** — built and tested end-to-end locally, but publishing itself requires npm credentials no automated tool here has access to.

## In progress / next up

- [ ] **Richer `registry.json` metadata.** Add per-component `props`, `variants`, and `a11yNotes` fields so the docs page can surface the full spec the project's vision calls for (props table, variants, accessibility notes), not just name/category/files/dependencies.
- [ ] **Bundle size.** Production JS is a single ~650KB chunk and growing with every component. Route-based code-splitting (`React.lazy` per page) would cut initial load meaningfully.

## Later

- [ ] Component playground (live prop editing in the browser, not just static preview).
- [ ] Versioned component history (diff a component's source across registry versions).
- [ ] AI-assisted component scaffolding matching the registry's existing conventions.

Have an idea or a use case this doesn't cover? Open an issue — see [CONTRIBUTING.md](./CONTRIBUTING.md).
