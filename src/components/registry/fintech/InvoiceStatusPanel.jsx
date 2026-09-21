import { CheckCircle2, Clock3, Download, FileText, MoreHorizontal } from "lucide-react";

const invoices = [
  { id: "INV-4092", client: "Northstar Labs", amount: "$8,420", status: "Paid" },
  { id: "INV-4091", client: "Velora Studio", amount: "$3,180", status: "Pending" },
  { id: "INV-4089", client: "Orbit Systems", amount: "$5,960", status: "Paid" },
];

export default function InvoiceStatusPanel() {
  return (
    <section className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <div className="flex items-center justify-between border-b border-[var(--border,rgba(255,255,255,.1))] p-5 sm:p-6">
        <div>
          <p className="text-xs text-[var(--text-muted,#64748b)]">Billing workspace</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Recent invoices</h3>
        </div>
        <button
          type="button"
          aria-label="More invoice options"
          className="rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.04] p-2 text-[var(--text-muted,#64748b)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <ul className="divide-y divide-white/10">
        {invoices.map((inv) => {
          const paid = inv.status === "Paid";
          return (
            <li key={inv.id} className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 transition hover:bg-[var(--surface-inset,rgba(255,255,255,.025))] sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.035] text-[var(--text-tertiary,#94a3b8)]">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--text-primary,#e2e8f0)]">{inv.client}</p>
                  <p className="mt-0.5 text-[11px] text-[var(--text-subtle,#475569)]">{inv.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{inv.amount}</p>
                  <p className={"mt-1 inline-flex items-center gap-1 text-[10px] font-semibold " + (paid ? "text-emerald-300" : "text-amber-300")}>
                    {paid ? <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> : <Clock3 className="h-3 w-3" aria-hidden="true" />}
                    {inv.status}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Download invoice ${inv.id}`}
                  className="hidden rounded-lg border border-[var(--border,rgba(255,255,255,.1))] p-2 text-[var(--text-subtle,#475569)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:block"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
