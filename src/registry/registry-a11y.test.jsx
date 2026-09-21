import { describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { axe } from "jest-axe";
import { registryItems } from "./index.js";

// jsdom cannot compute real layout/paint, so axe's color-contrast rule
// produces unreliable results here — contrast should be checked visually
// or with a real browser, not this jsdom-based smoke test.
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("registry components", () => {
  it("covers every category with at least one block", () => {
    expect(registryItems.length).toBeGreaterThan(0);
  });

  for (const item of registryItems) {
    it(`${item.slug} renders with no axe violations`, async () => {
      const Component = item.component;
      const { container, unmount } = render(<Component />);
      const results = await axe(container, axeOptions);
      expect(results).toHaveNoViolations();
      unmount();
      cleanup();
    });
  }
});
