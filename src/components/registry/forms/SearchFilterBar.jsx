import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays, ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";

function FilterDropdown({ label, icon: Icon, options, value, onChange, accent }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const optionRefs = useRef([]);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;
    const selectedIndex = Math.max(options.indexOf(value), 0);
    optionRefs.current[selectedIndex]?.focus();

    function onDocumentMouseDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, [open, options, value]);

  function onListKeyDown(event) {
    const items = optionRefs.current.filter(Boolean);
    const currentIndex = items.indexOf(document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      containerRef.current?.querySelector("button")?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[currentIndex];
      if (option) {
        onChange(option);
        setOpen(false);
        containerRef.current?.querySelector("button")?.focus();
      }
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => setOpen((current) => !current)}
        className={
          "inline-flex h-11 items-center gap-2 rounded-xl border px-3 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 " +
          (accent ?? "border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface-inset,rgba(255,255,255,.025))] text-[var(--text-tertiary,#94a3b8)]")
        }
      >
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}: {value}
        <ChevronDown className="h-3 w-3" aria-hidden="true" />
      </button>
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className="absolute left-0 top-[calc(100%+8px)] z-10 w-48 overflow-hidden rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,.4)]"
        >
          {options.map((option, index) => (
            <li key={option} role="presentation">
              <button
                type="button"
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                  containerRef.current?.querySelector("button")?.focus();
                }}
                className={
                  "flex w-full items-center rounded-lg px-3 py-2 text-left text-[13px] transition focus-visible:outline-none " +
                  (option === value
                    ? "bg-amber-300/10 text-amber-200"
                    : "text-[var(--text-secondary,#cbd5e1)] hover:bg-white/[0.05] focus-visible:bg-white/[0.05]")
                }
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const statusOptions = ["Any status", "Active", "Paused", "Archived"];
const dateOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"];

export default function SearchFilterBar() {
  const [status, setStatus] = useState("Any status");
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [tags, setTags] = useState(["Active", "Enterprise"]);
  const searchId = useId();

  const activeFilterCount =
    (status !== "Any status" ? 1 : 0) + (dateRange !== "Last 30 days" ? 1 : 0) + tags.length;

  function removeTag(tag) {
    setTags((current) => current.filter((entry) => entry !== tag));
  }

  function clearFilters() {
    setStatus("Any status");
    setDateRange("Last 30 days");
    setTags([]);
  }

  return (
    <section className="w-full max-w-4xl rounded-[24px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-4 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface-inset,rgba(255,255,255,.025))] px-3 focus-within:border-amber-300/30">
          <Search className="h-4 w-4 text-[var(--text-subtle,#475569)]" aria-hidden="true" />
          <label htmlFor={searchId} className="sr-only">
            Search projects, owners, tags
          </label>
          <input
            id={searchId}
            type="search"
            placeholder="Search projects, owners, tags..."
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text-primary,#e2e8f0)] outline-none placeholder:text-[var(--text-faint,#334155)]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterDropdown label="Status" icon={Filter} options={statusOptions} value={status} onChange={setStatus} />
          <FilterDropdown
            label="Range"
            icon={CalendarDays}
            options={dateOptions}
            value={dateRange}
            onChange={setDateRange}
          />
          <button
            type="button"
            onClick={clearFilters}
            disabled={activeFilterCount === 0}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] px-3 text-xs font-medium text-amber-200 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"}
          </button>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag} filter`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-[var(--text-tertiary,#94a3b8)] transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              {tag}
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
