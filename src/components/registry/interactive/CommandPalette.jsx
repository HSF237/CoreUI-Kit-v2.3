import { Command, FilePlus2, Moon, Search, Settings, Sparkles } from "lucide-react";

const commands=[
  {label:"Create new project",hint:"⌘ N",icon:FilePlus2},
  {label:"Open AI assistant",hint:"⌘ J",icon:Sparkles},
  {label:"Toggle appearance",hint:"⌘ D",icon:Moon},
  {label:"Workspace settings",hint:"⌘ ,",icon:Settings},
];

export default function CommandPalette(){
  return <section className="w-full max-w-xl overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d10]/95 shadow-[0_18px_60px_rgba(0,0,0,.24)] backdrop-blur-2xl">
    <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5"><Search className="h-4 w-4 text-slate-600"/><input placeholder="Search commands, pages, and actions..." className="min-w-0 flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-700"/><kbd className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-slate-600">ESC</kbd></div>
    <div className="p-2"><p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">Quick actions</p>{commands.map((item,index)=>{const Icon=item.icon; return <button key={item.label} className={"flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition "+(index===0?"bg-white/[0.06]":"hover:bg-white/[0.04]")}><div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-400"><Icon className="h-4 w-4"/></div><span className="flex-1 text-sm font-medium text-slate-300">{item.label}</span><span className="font-mono text-[10px] text-slate-700">{item.hint}</span></button>})}</div>
    <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 text-[10px] text-slate-700"><Command className="h-3.5 w-3.5"/>Type to filter • Enter to select</div>
  </section>
}
