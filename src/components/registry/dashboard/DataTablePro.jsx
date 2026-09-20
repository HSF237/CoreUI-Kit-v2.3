import { ChevronDown, Filter, MoreHorizontal, Search } from "lucide-react";

const rows=[
  ["Northstar Labs","Enterprise","$18,420","Active"],
  ["Velora Studio","Pro","$8,940","Active"],
  ["Orbit Systems","Enterprise","$14,680","Review"],
  ["Aster Cloud","Starter","$2,140","Active"],
];

export default function DataTablePro(){
  return <section className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d10] shadow-[0_18px_60px_rgba(0,0,0,.24)]">
    <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs text-slate-500">Customers</p><h3 className="mt-1 text-xl font-semibold text-white">Account directory</h3></div><div className="flex gap-2"><label className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-slate-600"><Search className="h-3.5 w-3.5"/><input placeholder="Search" className="w-28 bg-transparent text-xs text-slate-300 outline-none"/></label><button className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs text-slate-400"><Filter className="h-3.5 w-3.5"/>Filter</button></div></div>
    <div className="overflow-x-auto"><div className="min-w-[650px]">
      <div className="grid grid-cols-[1.4fr_.8fr_.8fr_.7fr_40px] gap-4 border-b border-white/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700"><span>Customer</span><span>Plan</span><span>Revenue</span><span>Status</span><span/></div>
      {rows.map((row)=><div key={row[0]} className="grid grid-cols-[1.4fr_.8fr_.8fr_.7fr_40px] items-center gap-4 border-b border-white/5 px-5 py-3.5 transition last:border-0 hover:bg-white/[0.025]"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-slate-300">{row[0].slice(0,2).toUpperCase()}</div><div><p className="text-sm font-medium text-slate-200">{row[0]}</p><p className="text-[10px] text-slate-700">customer@company.com</p></div></div><span className="text-xs text-slate-400">{row[1]}</span><span className="text-xs font-semibold text-slate-200">{row[2]}</span><span className={"w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold "+(row[3]==="Active"?"border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-300":"border-amber-300/15 bg-amber-300/[0.07] text-amber-300")}>{row[3]}</span><button className="text-slate-700 hover:text-white"><MoreHorizontal className="h-4 w-4"/></button></div>)}
    </div></div>
    <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[11px] text-slate-600"><span>Showing 4 of 248</span><button className="inline-flex items-center gap-1 text-slate-400">Page 1 <ChevronDown className="h-3 w-3"/></button></div>
  </section>
}
