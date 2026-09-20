import { Bot, Gauge, Layers3, ShieldCheck, Sparkles } from "lucide-react";

export default function BentoFeatureGrid(){
  return <section className="grid w-full max-w-4xl gap-3 md:grid-cols-3">
    <article className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0d0d10] p-5 md:col-span-2">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-sky-400/15 blur-3xl"/>
      <div className="relative"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-300/10 text-sky-300"><Bot className="h-5 w-5"/></div><h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">AI workflows that feel native.</h3><p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">Composable automation blocks with sensible defaults, clear states, and production-ready responsiveness.</p><div className="mt-6 grid grid-cols-3 gap-2">{["Trigger","Reason","Action"].map((label,index)=><div key={label} className="rounded-xl border border-white/10 bg-white/[0.025] p-3"><p className="text-[10px] text-slate-700">0{index+1}</p><p className="mt-2 text-xs font-medium text-slate-300">{label}</p></div>)}</div></div>
    </article>
    <article className="rounded-[26px] border border-white/10 bg-gradient-to-b from-fuchsia-400/[0.08] to-[#07101c] p-5"><Sparkles className="h-5 w-5 text-fuchsia-300"/><p className="mt-10 text-4xl font-semibold tracking-[-0.05em] text-white">48%</p><p className="mt-2 text-xs leading-5 text-slate-500">Faster implementation with copy-owned components.</p></article>
    <article className="rounded-[26px] border border-white/10 bg-[#0d0d10] p-5"><ShieldCheck className="h-5 w-5 text-emerald-300"/><h4 className="mt-8 font-semibold text-white">Secure by default</h4><p className="mt-2 text-xs leading-5 text-slate-600">No hidden APIs or runtime services.</p></article>
    <article className="rounded-[26px] border border-white/10 bg-[#0d0d10] p-5"><Layers3 className="h-5 w-5 text-sky-300"/><h4 className="mt-8 font-semibold text-white">Composable</h4><p className="mt-2 text-xs leading-5 text-slate-600">Small pieces that scale into full products.</p></article>
    <article className="rounded-[26px] border border-white/10 bg-[#0d0d10] p-5"><Gauge className="h-5 w-5 text-amber-300"/><h4 className="mt-8 font-semibold text-white">Fast surfaces</h4><p className="mt-2 text-xs leading-5 text-slate-600">Lean React + Tailwind with minimal dependencies.</p></article>
  </section>
}
