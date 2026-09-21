import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Command, FilePlus2, Moon, Search, Settings, Sparkles } from "lucide-react";

const commands = [
  { label: "Create new project", hint: "⌘ N", icon: FilePlus2 },
  { label: "Open AI assistant", hint: "⌘ J", icon: Sparkles },
  { label: "Toggle appearance", hint: "⌘ D", icon: Moon },
  { label: "Workspace settings", hint: "⌘ ,", icon: Settings },
];

export default function CommandPalette() {
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [lastRun, setLastRun] = useState("");
  const inputRef = useRef(null);
  const listboxId = useId();
  const runTimeoutRef = useRef(null);

  const filtered = useMemo(
    () => commands.filter((command) => command.label.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  );

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  function runCommand(command) {
    if (!command) return;
    setLastRun(command.label);
    clearTimeout(runTimeoutRef.current);
    runTimeoutRef.current = setTimeout(() => setLastRun(""), 1600);
  }

  function onKeyDown(event) {
    if (filtered.length === 0 && event.key !== "Escape") return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((current) => (current + 1) % filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((current) => (current - 1 + filtered.length) % filtered.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      runCommand(filtered[highlightedIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setQuery("");
      inputRef.current?.focus();
    }
  }

  const activeOptionId = filtered[highlightedIndex] ? `${listboxId}-${highlightedIndex}` : undefined;

  return (
    <section className="w-full max-w-xl overflow-hidden rounded-[24px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)]/95 shadow-[0_18px_60px_rgba(0,0,0,.24)] backdrop-blur-2xl">
      <div className="flex items-center gap-3 border-b border-[var(--border,rgba(255,255,255,.1))] px-4 py-3.5">
        <Search className="h-4 w-4 text-[var(--text-subtle,#475569)]" aria-hidden="true" />
        <label htmlFor={`${listboxId}-input`} className="sr-only">
          Search commands, pages, and actions
        </label>
        <input
          id={`${listboxId}-input`}
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          autoComplete="off"
          placeholder="Search commands, pages, and actions..."
          className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text-primary,#e2e8f0)] outline-none placeholder:text-[var(--text-faint,#334155)]"
        />
        <kbd className="rounded-lg border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-[var(--text-subtle,#475569)]">
          ESC
        </kbd>
      </div>
      <div className="p-2">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-faint,#334155)]">Quick actions</p>
        <ul id={listboxId} role="listbox" aria-label="Quick actions">
          {filtered.length === 0 && (
            <li className="px-3 py-3 text-sm text-[var(--text-subtle,#475569)]">No matching commands</li>
          )}
          {filtered.map((item, index) => {
            const Icon = item.icon;
            const active = index === highlightedIndex;
            return (
              <li key={item.label} role="presentation">
                <button
                  id={`${listboxId}-${index}`}
                  role="option"
                  aria-selected={active}
                  type="button"
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => runCommand(item)}
                  className={
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition " +
                    (active ? "bg-white/[0.06]" : "hover:bg-white/[0.04]")
                  }
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.035] text-[var(--text-tertiary,#94a3b8)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-[var(--text-secondary,#cbd5e1)]">{item.label}</span>
                  <span className="font-mono text-[10px] text-[var(--text-faint,#334155)]">{item.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-[var(--border,rgba(255,255,255,.1))] px-4 py-3 text-[10px] text-[var(--text-faint,#334155)]">
        <span className="flex items-center gap-2">
          <Command className="h-3.5 w-3.5" aria-hidden="true" />
          Type to filter • Enter to select
        </span>
        <span role="status" aria-live="polite" className="text-emerald-300">
          {lastRun && `Ran "${lastRun}"`}
        </span>
      </div>
    </section>
  );
}
