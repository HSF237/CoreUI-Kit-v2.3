import { ArrowUpRight, DollarSign, TrendingUp } from "lucide-react";

const points=[22,31,29,44,39,58,53,69,64,78,73,88];

export default function RevenueMetricCard(){
  return <section className="w-full max-w-xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
    <div className="flex items-start justify-between">
      <div><div className="flex items-center gap-2 text-xs text-slate-500"><DollarSign className="h-4 w-4 text-emerald-300"/>Net revenue</div><p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">$284,920</p><div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2.5 py-1 text-[11px] font-semibold text-emerald-300"><TrendingUp className="h-3 w-3"/>12.8%</div></div>
      <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-500"><ArrowUpRight className="h-4 w-4"/></button>
    </div>
    <div className="mt-8 flex h-36 items-end gap-2 rounded-2xl border border-white/10 bg-black/10 p-4">{points.map((p,i)=><div key={i} className="group relative flex h-full flex-1 items-end"><div className="w-full rounded-t-md bg-gradient-to-t from-emerald-400/15 to-emerald-300/70 transition group-hover:to-sky-300/80" style={{height:p+"%"}}/></div>)}</div>
    <div className="mt-4 grid grid-cols-3 gap-2">{[["MRR","$94.3K"],["ARR","$1.13M"],["ARPU","$86.40"]].map(([l,v])=><div key={l} className="rounded-xl border border-white/10 bg-white/[0.025] p-3"><p className="text-[10px] uppercase tracking-[0.14em] text-slate-700">{l}</p><p className="mt-1.5 text-sm font-semibold text-slate-200">{v}</p></div>)}</div>
  </section>
}
