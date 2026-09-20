import { ArrowRight, Plus, Sparkles, Zap } from "lucide-react";

export default function MagneticActionButtons(){
  return <section className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
    <p className="text-xs font-medium text-slate-500">Premium action buttons</p>
    <div className="mt-5 flex flex-wrap gap-3">
      <button className="group inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5"><Plus className="h-4 w-4 transition group-hover:rotate-90"/>Create project</button>
      <button className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-300 to-rose-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5"><Sparkles className="h-4 w-4"/>Generate with AI</button>
      <button className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/[0.07]">Explore blocks<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></button>
      <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-orange-300/20 bg-orange-300/[0.07] px-4 py-3 text-sm font-semibold text-orange-100 transition hover:-translate-y-0.5"><span className="absolute inset-0 translate-y-full bg-orange-300/10 transition group-hover:translate-y-0"/><Zap className="relative h-4 w-4 text-orange-300"/><span className="relative">Quick deploy</span></button>
    </div>
  </section>
}
