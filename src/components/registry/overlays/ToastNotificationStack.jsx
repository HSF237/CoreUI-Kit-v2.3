import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const toasts=[
  {tone:"success",icon:CheckCircle2,title:"Deployment succeeded",body:"main branch is live in production.",accent:"border-emerald-300/20 bg-emerald-300/10 text-emerald-300"},
  {tone:"info",icon:Info,title:"New teammate invited",body:"maria@company.com will get access shortly.",accent:"border-blue-300/20 bg-blue-300/10 text-blue-300"},
  {tone:"error",icon:AlertCircle,title:"Payment failed",body:"Update your billing details to avoid downtime.",accent:"border-rose-300/20 bg-rose-300/10 text-rose-300"},
];

export default function ToastNotificationStack(){
  return <div className="flex w-full max-w-sm flex-col gap-3">
    {toasts.map((toast)=>{const Icon=toast.icon; return <div key={toast.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0d0d10] p-4 shadow-[0_18px_50px_rgba(0,0,0,.3)]">
      <div className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border "+toast.accent}><Icon className="h-4 w-4"/></div>
      <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-white">{toast.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{toast.body}</p></div>
      <button className="shrink-0 text-slate-700 transition hover:text-slate-400"><X className="h-3.5 w-3.5"/></button>
    </div>})}
  </div>
}
