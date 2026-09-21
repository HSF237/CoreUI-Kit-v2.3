import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TabsPanel from "./TabsPanel.jsx";

describe("TabsPanel", () => {
  it("shows only the active panel's content", () => {
    render(<TabsPanel />);
    expect(screen.getByText(/12,480 requests/)).toBeVisible();
    expect(screen.getByText(/6 teammates/)).not.toBeVisible();
  });

  it("moves selection and focus with ArrowRight, wrapping past the last tab", async () => {
    const user = userEvent.setup();
    render(<TabsPanel />);

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const membersTab = screen.getByRole("tab", { name: "Members" });
    const settingsTab = screen.getByRole("tab", { name: "Settings" });

    overviewTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(membersTab).toHaveFocus();
    expect(membersTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/6 teammates/)).toBeVisible();

    await user.keyboard("{ArrowRight}");
    expect(settingsTab).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(overviewTab).toHaveFocus();
    expect(overviewTab).toHaveAttribute("aria-selected", "true");
  });

  it("supports Home/End to jump to the first/last tab", async () => {
    const user = userEvent.setup();
    render(<TabsPanel />);

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const settingsTab = screen.getByRole("tab", { name: "Settings" });

    overviewTab.focus();
    await user.keyboard("{End}");
    expect(settingsTab).toHaveFocus();

    await user.keyboard("{Home}");
    expect(overviewTab).toHaveFocus();
  });

  it("only the selected tab is in the natural tab order", () => {
    render(<TabsPanel />);
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Members" })).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveAttribute("tabindex", "-1");
  });
});
