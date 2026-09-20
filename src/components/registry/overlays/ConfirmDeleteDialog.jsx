import { useEffect, useId, useRef, useState } from "react";
import { ShieldAlert, Trash2 } from "lucide-react";

const CONFIRM_PHRASE = "delete my database";

export default function ConfirmDeleteDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const panelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const inputId = useId();
  const canDelete = value.trim().toLowerCase() === CONFIRM_PHRASE;

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

  function close() {
    setOpen(false);
    setValue("");
  }

  return (
    <div className="flex w-full max-w-md items-center justify-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-rose-300/20 bg-rose-300/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-300/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete database
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close dialog"
            onClick={close}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <section
            ref={panelRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            className="relative w-full max-w-md overflow-hidden rounded-[26px] border border-rose-300/15 bg-[#12090a] shadow-[0_25px_80px_rgba(0,0,0,.4)] outline-none"
          >
            <div className="border-b border-rose-300/10 bg-rose-300/[0.04] px-6 py-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-300/20 bg-rose-300/10 text-rose-300">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 id={titleId} className="mt-4 text-lg font-semibold text-white">
                Delete production database?
              </h3>
              <p id={descriptionId} className="mt-2 text-sm leading-6 text-rose-200/50">
                This will permanently remove all tables, backups and connected integrations. This action cannot be
                undone.
              </p>
            </div>
            <div className="px-6 py-5">
              <label htmlFor={inputId} className="text-[11px] font-medium text-slate-500">
                Type <span className="font-mono text-rose-300">{CONFIRM_PHRASE}</span> to confirm
              </label>
              <input
                id={inputId}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={CONFIRM_PHRASE}
                autoComplete="off"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-700 focus:border-rose-300/40"
              />
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!canDelete}
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-rose-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete permanently
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
