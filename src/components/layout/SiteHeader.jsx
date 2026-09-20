import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Blocks, BookOpen, Github, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { registryItems } from "../../registry/index.js";

const navLinkClass = ({ isActive }) =>
  [
    "rounded-lg px-3 py-1.5 text-[12px] font-semibold transition",
    isActive
      ? "bg-[var(--chrome-hover)] text-[var(--chrome-text-primary)]"
      : "text-[var(--chrome-text-secondary)] hover:bg-[var(--chrome-hover)] hover:text-[var(--chrome-text-primary)]",
  ].join(" ");

export default function SiteHeader({ onOpenSearch }) {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--chrome-border-soft)] bg-[var(--chrome-surface)]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 grid-cols-2 gap-1 rounded-[13px] border border-[var(--chrome-border)] bg-[var(--chrome-surface-raised)] p-2">
              <span className="rounded-[4px] bg-emerald-400" />
              <span className="rounded-[4px] bg-blue-400" />
              <span className="rounded-[4px] bg-amber-400" />
              <span className="rounded-[4px] bg-rose-400" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-bold tracking-[-0.02em] text-[var(--chrome-text-primary)]">
                  CoreUI-Kit
                </p>
                <span className="rounded-md border border-[var(--chrome-border)] bg-[var(--chrome-hover)] px-2 py-0.5 text-[9px] font-bold text-[var(--chrome-text-muted)]">
                  v0.5
                </span>
              </div>
              <p className="truncate text-[10px] text-[var(--chrome-text-muted)]">
                Free, open-source React registry
              </p>
            </div>
          </Link>

          <nav className="ml-2 hidden items-center gap-1 md:flex">
            <NavLink to="/" end className={navLinkClass}>
              Components
            </NavLink>
            <NavLink to="/docs" className={navLinkClass}>
              Docs
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden items-center gap-2 rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-hover)] px-3 py-2 text-[10px] text-[var(--chrome-text-muted)] transition hover:border-[var(--chrome-border-strong)] hover:text-[var(--chrome-text-secondary)] md:flex"
          >
            <Search className="h-3.5 w-3.5" />
            Search {registryItems.length} blocks
            <kbd className="ml-1 rounded-md border border-[var(--chrome-border)] px-1.5 py-0.5 font-mono text-[9px]">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-hover)] text-[var(--chrome-text-secondary)] transition hover:text-[var(--chrome-text-primary)] md:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-hover)] text-[var(--chrome-text-secondary)] transition hover:text-[var(--chrome-text-primary)]"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="https://github.com/HSF237/CoreUI-Kit-v2.3"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-hover)] px-3 text-[11px] font-semibold text-[var(--chrome-text-secondary)] transition hover:bg-[var(--chrome-border)] hover:text-[var(--chrome-text-primary)]"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-hover)] text-[var(--chrome-text-secondary)] md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-[var(--chrome-border-soft)] px-4 py-3 md:hidden">
          <NavLink to="/" end onClick={() => setMobileOpen(false)} className={navLinkClass}>
            <span className="inline-flex items-center gap-2">
              <Blocks className="h-3.5 w-3.5" /> Components
            </span>
          </NavLink>
          <NavLink to="/docs" onClick={() => setMobileOpen(false)} className={navLinkClass}>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5" /> Docs
            </span>
          </NavLink>
        </nav>
      )}
    </header>
  );
}
