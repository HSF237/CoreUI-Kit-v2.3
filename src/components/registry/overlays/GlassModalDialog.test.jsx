import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GlassModalDialog from "./GlassModalDialog.jsx";

describe("GlassModalDialog", () => {
  it("opens on trigger click with correct dialog semantics", async () => {
    const user = userEvent.setup();
    render(<GlassModalDialog />);

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Discard draft" }));

    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toHaveAccessibleName("Discard unsaved changes?");
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<GlassModalDialog />);

    const trigger = screen.getByRole("button", { name: "Discard draft" });
    await user.click(trigger);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes when Keep editing is clicked", async () => {
    const user = userEvent.setup();
    render(<GlassModalDialog />);

    await user.click(screen.getByRole("button", { name: "Discard draft" }));
    await user.click(screen.getByRole("button", { name: "Keep editing" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("closes when Discard changes is clicked", async () => {
    const user = userEvent.setup();
    render(<GlassModalDialog />);

    await user.click(screen.getByRole("button", { name: "Discard draft" }));
    await user.click(screen.getByRole("button", { name: "Discard changes" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
});
