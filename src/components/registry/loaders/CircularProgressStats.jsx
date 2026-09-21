const stats = [
  ["Storage", "72%", 72, "#67e8f9"],
  ["Projects", "46%", 46, "#c4b5fd"],
  ["Tasks", "88%", 88, "#6ee7b7"],
];

export default function CircularProgressStats() {
  return (
    <section className="grid w-full max-w-3xl gap-3 rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:grid-cols-3 sm:p-6">
      {stats.map(([label, value, percent, color]) => (
        <article key={label} className="rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface-inset,rgba(255,255,255,.025))] p-4 text-center">
          <div
            role="progressbar"
            aria-label={`${label} utilization`}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full"
            style={{ background: "conic-gradient(" + color + " 0 " + percent + "%, rgba(255,255,255,.06) " + percent + "% 100%)" }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-elevated,#111114)]">
              <span aria-hidden="true" className="text-xl font-semibold text-white">
                {value}
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-[var(--text-tertiary,#94a3b8)]">{label}</p>
          <p className="mt-1 text-[10px] text-[var(--text-faint,#334155)]">Current utilization</p>
        </article>
      ))}
    </section>
  );
}
