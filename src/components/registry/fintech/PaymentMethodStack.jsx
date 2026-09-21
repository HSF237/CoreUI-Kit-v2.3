import { useRef, useState } from "react";
import { Check, ChevronRight, CreditCard, Landmark, Plus, Smartphone } from "lucide-react";

const methods = [
  { name: "Core Black", meta: "Visa •••• 8241", icon: CreditCard },
  { name: "Bank account", meta: "Checking •••• 1098", icon: Landmark },
  { name: "Mobile wallet", meta: "Instant transfer", icon: Smartphone },
];

export default function PaymentMethodStack() {
  const [selected, setSelected] = useState("Core Black");
  const [status, setStatus] = useState("idle");
  const timeoutRef = useRef(null);

  function pay() {
    if (status === "processing") return;
    setStatus("processing");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus("paid"), 1200);
  }

  return (
    <section className="w-full max-w-lg rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--text-muted,#64748b)]">Checkout</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Payment method</h3>
        </div>
        <button
          type="button"
          aria-label="Add payment method"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.04] text-[var(--text-tertiary,#94a3b8)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div role="radiogroup" aria-label="Payment method" className="mt-5 space-y-2.5">
        {methods.map((m) => {
          const Icon = m.icon;
          const isSelected = m.name === selected;
          return (
            <button
              key={m.name}
              role="radio"
              aria-checked={isSelected}
              type="button"
              onClick={() => setSelected(m.name)}
              className={
                "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 " +
                (isSelected ? "border-emerald-300/25 bg-emerald-300/[0.07]" : "border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface-inset,rgba(255,255,255,.025))] hover:bg-white/[0.045]")
              }
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.04] text-[var(--text-secondary,#cbd5e1)]">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--text-primary,#e2e8f0)]">{m.name}</p>
                <p className="mt-0.5 text-[11px] text-[var(--text-subtle,#475569)]">{m.meta}</p>
              </div>
              {isSelected ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-300 text-[var(--text-on-accent,#020617)]">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              ) : (
                <ChevronRight className="h-4 w-4 text-[var(--text-faint,#334155)]" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-black/15 px-4 py-3">
        <div>
          <p className="text-xs text-[var(--text-muted,#64748b)]">Total due</p>
          <p className="mt-1 text-2xl font-semibold text-white">$2,849.00</p>
        </div>
        <button
          type="button"
          onClick={pay}
          disabled={status === "processing"}
          aria-busy={status === "processing"}
          className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[var(--text-on-accent,#020617)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "processing" ? "Processing…" : status === "paid" ? "Paid ✓" : "Pay securely"}
        </button>
      </div>
    </section>
  );
}
