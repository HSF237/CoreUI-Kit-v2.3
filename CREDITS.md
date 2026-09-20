# Credits

CoreUI-Kit's blocks are original implementations written for this project. A few draw on well-known, widely-reused UI *patterns* popularized by other open-source component libraries — this file names those sources for transparency, even where attribution isn't legally required.

None of the listed components are copied source: each was re-implemented from scratch in React + Tailwind CSS, following this project's own conventions (self-contained component, `lucide-react` icons, the accessibility bar described in `CONTRIBUTING.md`), and in most cases made more accessible than the common version of the pattern (for example, native `<input>` elements with a visible focus ring underneath a custom-styled control, rather than a purely decorative div).

| Component | Pattern inspired by | Source license |
| --- | --- | --- |
| [Custom Checkbox Kit](./src/components/registry/forms/CustomCheckboxKit.jsx) | Custom checkbox/radio/switch styling popularized on [Uiverse.io](https://uiverse.io/) | [MIT](https://github.com/uiverse-io/galaxy/blob/main/LICENSE) |
| [Tabs Panel](./src/components/registry/interactive/TabsPanel.jsx) | Tabbed interface pattern as seen in [Flowbite](https://flowbite.com/) and [daisyUI](https://daisyui.com/) | Flowbite core: [MIT](https://flowbite.com/docs/getting-started/license/); daisyUI: [MIT](https://github.com/saadeghi/daisyui/blob/master/LICENSE) |
| [Stats Counter Section](./src/components/registry/marketing/StatsCounterSection.jsx) | Animated stats/counter marketing section pattern as seen in [HyperUI](https://www.hyperui.dev/) | Free, open-source component examples |

If you're a maintainer of one of these projects and want a different credit format (or none at all), open an issue and we'll adjust it.
