import { Grid2X2, List, PanelsTopLeft } from "lucide-react";

export default function SegmentedControl(){
  return <section className="w-full max-w-lg rounded-[26px] border border-white/10 bg-[#0d0d10] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
    <p className="text-xs text-slate-500">View preference</p>
    <div className="mt-4 inline-flex rounded-2xl border border-white/10 bg-black/15 p-1.5">
      {[
        {label:"Grid",icon:Grid2X2,active:true},
        {label:"Board",icon:PanelsTopLeft},
        {label:"List",icon:List},
      ].map((item)=>{const Icon=item.icon; return <button key={item.label} className={"flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition "+(item.active?"bg-white text-slate-950 shadow-lg":"text-slate-500 hover:text-white")}><Icon className="h-3.5 w-3.5"/>{item.label}</button>})}
    </div>
    <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-5 text-center text-xs text-slate-600">Segmented controls work especially well for display modes and scoped filters.</div>
  </section>
}
