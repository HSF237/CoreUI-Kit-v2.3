import { useId, useRef, useState } from "react";
import { Activity, Settings, Users } from "lucide-react";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: Activity,
    content:
      "Your workspace processed 12,480 requests today, up 8.3% from yesterday. Everything is running within normal thresholds.",
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
    content: "6 teammates have access to this workspace. Maya Kim and Daniel Cho were added in the last 30 days.",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: "Workspace visibility is set to Private. Two-factor authentication is required for all admin roles.",
  },
];

export default function TabsPanel() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const tabRefs = useRef([]);
  const baseId = useId();

  function onKeyDown(event, index) {
    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveId(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  const activeTab = tabs.find((tab) => tab.id === activeId);

  return (
    <section className="w-full max-w-xl rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <div role="tablist" aria-label="Workspace sections" className="flex gap-1 rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-black/15 p-1.5">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 " +
                (selected ? "bg-white text-[var(--text-on-accent,#020617)]" : "text-[var(--text-muted,#64748b)] hover:text-[var(--text-secondary,#cbd5e1)]")
              }
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== activeId}
          tabIndex={0}
          className="mt-5 rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.02] p-4 text-sm leading-6 text-[var(--text-tertiary,#94a3b8)]"
        >
          {tab.content}
        </div>
      ))}
      <p className="sr-only" aria-live="polite">
        {activeTab.label} tab selected
      </p>
    </section>
  );
}
