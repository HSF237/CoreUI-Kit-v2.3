import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FaqAccordion from "./FaqAccordion.jsx";

// Regression test: the toggle button used to render an "open" flag from
// static data but the click handler never actually updated any state.
describe("FaqAccordion", () => {
  it("starts with the first question expanded and others collapsed", () => {
    render(<FaqAccordion />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles a question open and closed on click", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion />);

    const secondQuestion = screen.getAllByRole("button")[1];
    expect(secondQuestion).toHaveAttribute("aria-expanded", "false");

    await user.click(secondQuestion);
    expect(secondQuestion).toHaveAttribute("aria-expanded", "true");

    await user.click(secondQuestion);
    expect(secondQuestion).toHaveAttribute("aria-expanded", "false");
  });

  it("allows more than one answer open at once", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });
});
