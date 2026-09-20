export default function SkeletonDashboard() {
  return (
    <section className="w-full max-w-4xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <div role="status" aria-label="Loading dashboard" className="animate-pulse motion-reduce:animate-none">
        <div aria-hidden="true">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-3 w-24 rounded bg-white/[0.06]" />
              <div className="mt-3 h-6 w-52 rounded-lg bg-white/[0.08]" />
            </div>
            <div className="h-9 w-28 rounded-xl bg-white/[0.06]" />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="h-3 w-20 rounded bg-white/[0.05]" />
                <div className="mt-4 h-7 w-28 rounded-lg bg-white/[0.08]" />
                <div className="mt-6 h-1.5 rounded-full bg-white/[0.05]" />
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="h-3 w-32 rounded bg-white/[0.05]" />
            <div className="mt-5 flex h-44 items-end gap-2">
              {[42, 60, 50, 72, 66, 84, 74, 92, 82, 96].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-white/[0.06]" style={{ height: h + "%" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
