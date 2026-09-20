import { CalendarDays, ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";

export default function SearchFilterBar(){
  return <section className="w-full max-w-4xl rounded-[24px] border border-white/10 bg-[#0d0d10] p-4 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
    <div className="flex flex-col gap-3 lg:flex-row">
      <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 focus-within:border-amber-300/30"><Search className="h-4 w-4 text-slate-600"/><input placeholder="Search projects, owners, tags..." className="min-w-0 flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-700"/></label>
      <div className="flex flex-wrap gap-2">
        <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 text-xs font-medium text-slate-400"><Filter className="h-3.5 w-3.5"/>Status<ChevronDown className="h-3 w-3"/></button>
        <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 text-xs font-medium text-slate-400"><CalendarDays className="h-3.5 w-3.5"/>Last 30 days<ChevronDown className="h-3 w-3"/></button>
        <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] px-3 text-xs font-medium text-amber-200"><SlidersHorizontal className="h-3.5 w-3.5"/>2 filters</button>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">{["Active","Enterprise"].map((tag)=><button key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-slate-400">{tag}<X className="h-3 w-3"/></button>)}</div>
  </section>
}
