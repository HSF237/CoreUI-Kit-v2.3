import { useRef, useState } from "react";
import { Grid2X2, List, PanelsTopLeft } from "lucide-react";

const options = [
  { label: "Grid", icon: Grid2X2 },
  { label: "Board", icon: PanelsTopLeft },
  { label: "List", icon: List },
];

export default function SegmentedControl() {
  const [selected, setSelected] = useState("Grid");
  const buttonRefs = useRef([]);

  function onKeyDown(event, index) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + options.length) % options.length;
    setSelected(options[nextIndex].label);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="w-full max-w-lg rounded-[26px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <p className="text-xs text-[var(--text-muted,#64748b)]">View preference</p>
      <div role="radiogroup" aria-label="View preference" className="mt-4 inline-flex rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-black/15 p-1.5">
        {options.map((item, index) => {
          const Icon = item.icon;
          const active = item.label === selected;
          return (
            <button
              key={item.label}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              type="button"
              onClick={() => setSelected(item.label)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={
                "flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 " +
                (active ? "bg-white text-[var(--text-on-accent,#020617)] shadow-lg" : "text-[var(--text-muted,#64748b)] hover:text-white")
              }
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>
      <div role="status" aria-live="polite" className="mt-6 rounded-2xl border border-dashed border-[var(--border,rgba(255,255,255,.1))] p-5 text-center text-xs text-[var(--text-subtle,#475569)]">
        {selected} view selected — segmented controls work especially well for display modes and scoped filters.
      </div>
    </section>
  );
}
