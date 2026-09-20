import { FileCheck2, FileUp, Image, UploadCloud, X } from "lucide-react";

export default function FileUploadDropzone(){
  return <section className="w-full max-w-xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
    <div><p className="text-xs text-slate-500">Assets</p><h3 className="mt-1 text-xl font-semibold text-white">Upload project files</h3></div>
    <button className="mt-5 flex w-full flex-col items-center rounded-[22px] border border-dashed border-emerald-300/25 bg-emerald-300/[0.035] px-6 py-9 text-center transition hover:bg-emerald-300/[0.06]"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300"><UploadCloud className="h-5 w-5"/></span><span className="mt-4 text-sm font-semibold text-slate-200">Drop files here or browse</span><span className="mt-1 text-xs text-slate-600">PNG, JPG, SVG, PDF up to 10MB</span></button>
    <div className="mt-4 space-y-2">{[["hero-concept.png","2.4 MB",Image],["brand-guidelines.pdf","6.8 MB",FileCheck2]].map(([name,size,Icon])=><div key={name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400"><Icon className="h-4 w-4"/></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-slate-300">{name}</p><p className="mt-0.5 text-[10px] text-slate-700">{size} • uploaded</p></div><FileUp className="h-3.5 w-3.5 text-emerald-300"/><button className="text-slate-700"><X className="h-3.5 w-3.5"/></button></div>)}</div>
  </section>
}
