import { AlertTriangle, X } from "lucide-react";

export default function GlassModalDialog(){
  return <div className="relative flex w-full max-w-md items-center justify-center">
    <div className="absolute inset-0 -m-10 rounded-[30px] bg-black/40 backdrop-blur-sm"/>
    <section className="relative w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#0d0d10]/95 p-5 shadow-[0_30px_90px_rgba(0,0,0,.45)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-300"><AlertTriangle className="h-5 w-5"/></div>
        <button className="rounded-lg p-1 text-slate-600 transition hover:bg-white/5 hover:text-slate-300"><X className="h-4 w-4"/></button>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">Discard unsaved changes?</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">You have edits in this draft that haven't been saved. Leaving now will permanently discard them.</p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06]">Keep editing</button>
        <button className="rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">Discard changes</button>
      </div>
    </section>
  </div>
}
