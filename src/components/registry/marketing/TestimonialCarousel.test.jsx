import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestimonialCarousel from "./TestimonialCarousel.jsx";

// Regression test: the prev/next buttons used to be rendered but wired to
// nothing, so the displayed testimonial never actually changed.
describe("TestimonialCarousel", () => {
  it("advances to the next testimonial when Next is clicked", async () => {
    const user = userEvent.setup();
    render(<TestimonialCarousel />);

    expect(screen.getByText(/Priya Nair/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next testimonial" }));
    expect(screen.getByText(/Daniel Cho/)).toBeInTheDocument();
    expect(screen.queryByText(/Priya Nair/)).not.toBeInTheDocument();
  });

  it("wraps back to the first testimonial from the last", async () => {
    const user = userEvent.setup();
    render(<TestimonialCarousel />);

    await user.click(screen.getByRole("button", { name: "Next testimonial" }));
    expect(screen.getByText(/Daniel Cho/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next testimonial" }));
    expect(screen.getByText(/Priya Nair/)).toBeInTheDocument();
  });

  it("goes to a specific slide via the dot controls", async () => {
    const user = userEvent.setup();
    render(<TestimonialCarousel />);

    await user.click(screen.getByRole("button", { name: "Go to testimonial 2" }));
    expect(screen.getByText(/Daniel Cho/)).toBeInTheDocument();
  });
});
