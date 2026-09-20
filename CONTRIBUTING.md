# Contributing to CoreUI-Kit

Thanks for considering a contribution — CoreUI-Kit is free and open source specifically so other developers can both use it and improve it.

## Ground rules

- Keep pull requests focused. One new component, or one fix, is much easier to review than a bundle of unrelated changes.
- Prefer components that solve a real, recognizable product UI need over adding blocks purely to raise the count.
- Include a screenshot (or a short clip) for any visual change.
- Test both the live preview and the copied source at mobile and desktop widths before opening a PR.
- Match the existing code conventions — see below.

## Component conventions

Every block in the registry follows the same rules:

- A single, self-contained `.jsx` file — no shared internal utilities to drag in.
- Local React state only (`useState`/`useMemo`); nothing global, no external state library.
- Icons come from `lucide-react` only.
- Styling is Tailwind CSS utility classes — no CSS-in-JS, no separate stylesheet per component.
- Default export a single component whose name matches the file name.

## Accessibility conventions

A block that only looks like a button, dialog, or menu is not accepted — every block in the registry must actually work with a keyboard and a screen reader, not just a mouse. Concretely:

- Every `<button>` gets an explicit `type` (`"button"` unless it submits a form).
- Icon-only buttons get `aria-label`; decorative icons (anything next to visible text, or purely ornamental) get `aria-hidden="true"`.
- Interactive elements need a visible focus state — add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2` (pick an outline color that fits the block's palette).
- Dialogs and confirm modals use `role="dialog"`/`role="alertdialog"` with `aria-modal`, `aria-labelledby`/`aria-describedby`, trap Tab focus inside while open, close on `Escape`, and restore focus to the trigger on close.
- Menus/popovers use `role="menu"`/`"menuitem"` (or `"listbox"`/`"option"` for single-select pickers) with arrow-key navigation, `Escape` to close, and click-outside to close.
- Progress indicators and gauges use `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`.
- Toggling a boolean state (like/favorite/segmented control) uses `aria-pressed` or `aria-checked`, not just a color change.
- Looping animations (spinners, skeleton pulses) add `motion-reduce:animate-none` so `prefers-reduced-motion` users don't get a stuck-looking but endlessly animating element.
- A component demoing a real interaction (a modal, a dropdown, a carousel) should actually perform that interaction on click/keypress — a trigger that renders a static "open" state with dead buttons is a bug, not a simplification.

If you're unsure what pattern applies, check the closest existing block in `src/components/registry/overlays/` or `src/components/registry/dashboard/DataTablePro.jsx` for a worked example.

## Adding a new component

1. Add the component file under `src/components/registry/<category>/`. Create a new category folder if it genuinely doesn't fit an existing one.
2. Import the component and its `?raw` source in `src/registry/index.js`, and add its metadata (`slug`, `title`, `description`, `category`, `tags`) to the `registryItems` array.
3. Add matching metadata to `registry.json`, including any npm dependencies beyond `react` and `lucide-react`.
4. If you added a new category, register it in both `registry.json`'s `categories` array and the `categories` export in `src/registry/index.js`, plus an icon/color entry in `src/registry/categoryTheme.js`.
5. Run the full check before opening a PR:

   ```bash
   npm run check
   ```

   This validates `registry.json` against the filesystem, lints, and produces a production build.

## Reporting issues

Bug reports and feature requests are welcome on [GitHub Issues](https://github.com/HSF237/CoreUI-Kit-v2.3/issues). For a bug, please include the component slug (if applicable), what you expected, and what actually happened — a screenshot helps a lot for visual bugs.

## Code of conduct

Be respectful and constructive. Disagreements about design or implementation are fine and expected — personal attacks are not.
