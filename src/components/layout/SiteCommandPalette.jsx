import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CornerDownLeft, Search } from "lucide-react";
import { registryItems } from "../../registry/index.js";
import { docsPages } from "../../content/docs.js";
import { categoryIcons } from "../../registry/categoryTheme.js";

const docsResults = docsPages.map((page) => ({
  type: "docs",
  slug: page.slug,
  title: page.title,
  description: page.summary,
  href: `/docs/${page.slug}`,
}));

const componentResults = registryItems.map((item) => ({
  type: "component",
  slug: item.slug,
  title: item.title,
  description: item.description,
  category: item.category,
  href: `/components/${item.slug}`,
}));

export default function SiteCommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const all = [...componentResults, ...docsResults];

    if (!normalized) return all.slice(0, 8);

    return all
      .filter((entry) =>
        [entry.title, entry.description, entry.category]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 20);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 10);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function go(entry) {
    if (!entry) return;
    navigate(entry.href);
    onClose();
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[activeIndex]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search CoreUI-Kit"
        className="relative w-full max-w-xl overflow-hidden rounded-[22px] border border-[var(--chrome-border-strong)] bg-[var(--chrome-surface)] shadow-[0_30px_90px_rgba(0,0,0,.45)]"
      >
        <div className="flex items-center gap-3 border-b border-[var(--chrome-border-soft)] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[var(--chrome-text-muted)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search components and docs..."
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--chrome-text-primary)] outline-none placeholder:text-[var(--chrome-text-muted)]"
          />
          <kbd className="rounded-md border border-[var(--chrome-border)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--chrome-text-muted)]">
            esc
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-xs text-[var(--chrome-text-muted)]">
              No matches. Try a different term.
            </p>
          )}

          {results.map((entry, index) => {
            const Icon = entry.type === "docs" ? BookOpen : categoryIcons[entry.category] ?? Search;
            const active = index === activeIndex;

            return (
              <button
                key={entry.type + entry.slug}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => go(entry)}
                className={[
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition",
                  active ? "bg-[var(--chrome-hover)]" : "",
                ].join(" ")}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-surface-raised)]">
                  <Icon className="h-3.5 w-3.5 text-[var(--chrome-text-secondary)]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-[var(--chrome-text-primary)]">
                    {entry.title}
                  </span>
                  <span className="block truncate text-[11px] text-[var(--chrome-text-muted)]">
                    {entry.description}
                  </span>
                </span>
                {active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-[var(--chrome-text-muted)]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
