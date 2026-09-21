import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Without vitest's `globals` mode, Testing Library can't auto-detect
// `afterEach` to register its own cleanup, so each render would otherwise
// accumulate in the DOM across tests within the same file.
afterEach(cleanup);

// jsdom does not implement matchMedia; several components check
// prefers-reduced-motion via window.matchMedia.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom does not implement IntersectionObserver; used by components
// that animate once scrolled into view.
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
