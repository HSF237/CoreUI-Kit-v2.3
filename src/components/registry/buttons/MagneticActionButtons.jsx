import { ArrowRight, Plus, Sparkles, Zap } from "lucide-react";

export default function MagneticActionButtons() {
  return (
    <section className="w-full max-w-2xl rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <p className="text-xs font-medium text-[var(--text-muted,#64748b)]">Premium action buttons</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="group inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[var(--text-on-accent,#020617)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Plus className="h-4 w-4 transition group-hover:rotate-90" aria-hidden="true" />
          Create project
        </button>
        <button
          type="button"
          className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-300 to-rose-300 px-4 py-3 text-sm font-bold text-[var(--text-on-accent,#020617)] shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Generate with AI
        </button>
        <button
          type="button"
          className="group inline-flex items-center gap-2 rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.04] px-4 py-3 text-sm font-semibold text-[var(--text-primary,#e2e8f0)] transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Explore blocks
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-orange-300/20 bg-orange-300/[0.07] px-4 py-3 text-sm font-semibold text-orange-100 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
        >
          <span aria-hidden="true" className="absolute inset-0 translate-y-full bg-orange-300/10 transition group-hover:translate-y-0" />
          <Zap className="relative h-4 w-4 text-orange-300" aria-hidden="true" />
          <span className="relative">Quick deploy</span>
        </button>
      </div>
    </section>
  );
}
