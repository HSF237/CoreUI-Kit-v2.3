import { useRef, useState } from "react";
import { Camera, Check, UserRound } from "lucide-react";

const fields = [
  ["First name", "Maya"],
  ["Last name", "Kim"],
  ["Role", "Product Designer"],
  ["Company", "Northstar Labs"],
];

export default function ProfileSettingsForm() {
  const [status, setStatus] = useState("idle");
  const timeoutRef = useRef(null);

  function onSubmit(event) {
    event.preventDefault();
    setStatus("saved");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <section className="w-full max-w-2xl rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <div>
        <p className="text-xs text-[var(--text-muted,#64748b)]">Account</p>
        <h3 className="mt-1 text-xl font-semibold text-white">Profile settings</h3>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mt-6 flex items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-[var(--text-secondary,#cbd5e1)]">
            <UserRound className="h-6 w-6" aria-hidden="true" />
            <button
              type="button"
              aria-label="Change profile photo"
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border,rgba(255,255,255,.1))] bg-slate-900 text-[var(--text-tertiary,#94a3b8)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-primary,#e2e8f0)]">Profile photo</p>
            <p className="mt-1 text-xs text-[var(--text-subtle,#475569)]">JPG, PNG or WebP. Max 4MB.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {fields.map(([label, value]) => (
            <label key={label}>
              <span className="text-[11px] font-medium text-[var(--text-muted,#64748b)]">{label}</span>
              <input
                name={label.toLowerCase().replace(/\s+/g, "-")}
                defaultValue={value}
                className="mt-2 h-11 w-full rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface-inset,rgba(255,255,255,.025))] px-3 text-sm text-[var(--text-primary,#e2e8f0)] outline-none transition focus:border-sky-300/30"
              />
            </label>
          ))}
        </div>

        <label className="mt-4 block">
          <span className="text-[11px] font-medium text-[var(--text-muted,#64748b)]">Bio</span>
          <textarea
            name="bio"
            defaultValue="Designing fast, thoughtful product experiences."
            className="mt-2 min-h-24 w-full resize-none rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface-inset,rgba(255,255,255,.025))] p-3 text-sm text-[var(--text-primary,#e2e8f0)] outline-none focus:border-sky-300/30"
          />
        </label>

        <div className="mt-5 flex items-center justify-end gap-3">
          <p role="status" aria-live="polite" className="text-xs font-medium text-emerald-300">
            {status === "saved" ? "Saved" : ""}
          </p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[var(--text-on-accent,#020617)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Save changes
          </button>
        </div>
      </form>
    </section>
  );
}
