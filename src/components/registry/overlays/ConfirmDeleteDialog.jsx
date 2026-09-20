import { ShieldAlert, Trash2 } from "lucide-react";

export default function ConfirmDeleteDialog(){
  return <section className="w-full max-w-md overflow-hidden rounded-[26px] border border-rose-300/15 bg-[#12090a] shadow-[0_25px_80px_rgba(0,0,0,.4)]">
    <div className="border-b border-rose-300/10 bg-rose-300/[0.04] px-6 py-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-300/20 bg-rose-300/10 text-rose-300"><ShieldAlert className="h-5 w-5"/></div>
      <h3 className="mt-4 text-lg font-semibold text-white">Delete production database?</h3>
      <p className="mt-2 text-sm leading-6 text-rose-200/50">This will permanently remove all tables, backups and connected integrations. This action cannot be undone.</p>
    </div>
    <div className="px-6 py-5">
      <label className="text-[11px] font-medium text-slate-500">Type <span className="font-mono text-rose-300">delete my database</span> to confirm</label>
      <input placeholder="delete my database" className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-700 focus:border-rose-300/40"/>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06]">Cancel</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-400"><Trash2 className="h-3.5 w-3.5"/>Delete permanently</button>
      </div>
    </div>
  </section>
}
