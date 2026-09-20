import { Bell, Check, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";

const notifications=[
  {icon:Sparkles,title:"New release available",body:"CoreUI-Kit 0.2 adds 24 new blocks.",time:"2m",tone:"text-sky-300 bg-sky-300/10"},
  {icon:MessageSquare,title:"Review requested",body:"Maya mentioned you in Dashboard Pro.",time:"18m",tone:"text-fuchsia-300 bg-fuchsia-300/10"},
  {icon:ShieldAlert,title:"Security check complete",body:"No issues detected in production.",time:"1h",tone:"text-emerald-300 bg-emerald-300/10"},
];

export default function NotificationCenter(){
  return <section className="w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d10] shadow-[0_18px_60px_rgba(0,0,0,.24)]">
    <div className="flex items-center justify-between border-b border-white/10 p-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-300/10 text-sky-300"><Bell className="h-4 w-4"/></div><div><h3 className="text-base font-semibold text-white">Notifications</h3><p className="text-[11px] text-slate-600">3 unread updates</p></div></div><button className="text-[11px] font-medium text-slate-500 hover:text-white">Mark all read</button></div>
    <div className="divide-y divide-white/10">{notifications.map((item)=>{const Icon=item.icon; return <div key={item.title} className="flex gap-3 p-4 transition hover:bg-white/[0.025]"><div className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl "+item.tone}><Icon className="h-4 w-4"/></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><p className="text-sm font-medium text-slate-200">{item.title}</p><span className="text-[10px] text-slate-700">{item.time}</span></div><p className="mt-1 text-xs leading-5 text-slate-600">{item.body}</p></div><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-300"/></div>})}</div>
    <div className="border-t border-white/10 p-3"><button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950"><Check className="h-3.5 w-3.5"/>Open notification center</button></div>
  </section>
}
