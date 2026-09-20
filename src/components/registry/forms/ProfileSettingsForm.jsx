import { Camera, Check, UserRound } from "lucide-react";

export default function ProfileSettingsForm(){
  return <section className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
    <div><p className="text-xs text-slate-500">Account</p><h3 className="mt-1 text-xl font-semibold text-white">Profile settings</h3></div>
    <div className="mt-6 flex items-center gap-4"><div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-slate-300"><UserRound className="h-6 w-6"/><button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-slate-400"><Camera className="h-3.5 w-3.5"/></button></div><div><p className="text-sm font-medium text-slate-200">Profile photo</p><p className="mt-1 text-xs text-slate-600">JPG, PNG or WebP. Max 4MB.</p></div></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">{[["First name","Maya"],["Last name","Kim"],["Role","Product Designer"],["Company","Northstar Labs"]].map(([label,value])=><label key={label}><span className="text-[11px] font-medium text-slate-500">{label}</span><input defaultValue={value} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[0.025] px-3 text-sm text-slate-200 outline-none transition focus:border-sky-300/30"/></label>)}</div>
    <label className="mt-4 block"><span className="text-[11px] font-medium text-slate-500">Bio</span><textarea defaultValue="Designing fast, thoughtful product experiences." className="mt-2 min-h-24 w-full resize-none rounded-xl border border-white/10 bg-white/[0.025] p-3 text-sm text-slate-200 outline-none focus:border-sky-300/30"/></label>
    <div className="mt-5 flex justify-end"><button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950"><Check className="h-3.5 w-3.5"/>Save changes</button></div>
  </section>
}
