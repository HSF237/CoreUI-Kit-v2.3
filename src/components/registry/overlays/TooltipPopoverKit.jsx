import { Bell, LogOut, Settings, User } from "lucide-react";

const menuItems=[
  {label:"View profile",icon:User},
  {label:"Notification settings",icon:Bell},
  {label:"Account settings",icon:Settings},
];

export default function TooltipPopoverKit(){
  return <div className="flex w-full max-w-md flex-col items-center gap-10 py-4">
    <div className="relative flex items-center gap-4">
      <button className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300">Hover me</button>
      <div className="relative">
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#18181c] px-3 py-1.5 text-[11px] font-medium text-slate-200 shadow-lg">
          Copies the current invite link
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#18181c]"/>
        </div>
        <button className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300">Tooltip target</button>
      </div>
    </div>

    <div className="relative">
      <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300">
        <span className="h-6 w-6 rounded-full bg-gradient-to-br from-sky-300 to-blue-500"/>
        Account menu
      </button>
      <div className="absolute left-0 top-[calc(100%+10px)] w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,.4)]">
        {menuItems.map((item)=>{const Icon=item.icon; return <button key={item.label} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] text-slate-300 transition hover:bg-white/[0.05]"><Icon className="h-3.5 w-3.5 text-slate-600"/>{item.label}</button>})}
        <div className="my-1 h-px bg-white/10"/>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] text-rose-300 transition hover:bg-rose-300/10"><LogOut className="h-3.5 w-3.5"/>Sign out</button>
      </div>
    </div>
  </div>
}
