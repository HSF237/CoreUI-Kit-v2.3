import { useEffect, useId, useRef, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function GlassModalDialog() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  return (
    <div className="flex w-full max-w-md items-center justify-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary,#cbd5e1)] transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
      >
        Discard draft
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <section
            ref={panelRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            className="relative w-full max-w-md overflow-hidden rounded-[26px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)]/95 p-5 shadow-[0_30px_90px_rgba(0,0,0,.45)] outline-none sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-[var(--text-subtle,#475569)] transition hover:bg-white/5 hover:text-[var(--text-secondary,#cbd5e1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 id={titleId} className="mt-4 text-lg font-semibold text-white">
              Discard unsaved changes?
            </h3>
            <p id={descriptionId} className="mt-2 text-sm leading-6 text-[var(--text-muted,#64748b)]">
              You have edits in this draft that haven't been saved. Leaving now will permanently discard them.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary,#cbd5e1)] transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                Keep editing
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-semibold text-[var(--text-on-accent,#020617)] transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100"
              >
                Discard changes
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
