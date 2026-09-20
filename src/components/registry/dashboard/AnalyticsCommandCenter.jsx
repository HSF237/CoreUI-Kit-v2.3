import { ArrowUpRight, BarChart3, MoreHorizontal, TrendingUp, Users } from "lucide-react";

const bars=[38,52,48,66,61,75,58,82,72,91,84,96];

export default function AnalyticsCommandCenter(){
  const stats=[
    {label:"Revenue",value:"$284.9K",change:"+12.8%",icon:TrendingUp},
    {label:"Active users",value:"48,291",change:"+8.3%",icon:Users},
    {label:"Conversion",value:"9.42%",change:"+1.7%",icon:BarChart3},
  ];
  return <section className="w-full max-w-4xl rounded-[30px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs text-slate-500">Executive analytics</p><h3 className="mt-1 text-xl font-semibold text-white">Growth command center</h3></div><button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300">Open report <ArrowUpRight className="h-3.5 w-3.5"/></button></div>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">{stats.map((item)=>{const Icon=item.icon; return <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"><div className="flex items-center justify-between"><Icon className="h-4 w-4 text-blue-300"/><MoreHorizontal className="h-4 w-4 text-slate-700"/></div><p className="mt-5 text-[11px] text-slate-600">{item.label}</p><div className="mt-1 flex items-end justify-between"><p className="text-2xl font-semibold text-white">{item.value}</p><span className="text-[11px] font-semibold text-emerald-300">{item.change}</span></div></div>})}</div>
    <div className="mt-3 grid gap-3 lg:grid-cols-[1.55fr_.65fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-medium text-slate-400">Revenue velocity</p><p className="mt-1 text-[10px] text-slate-700">Last 12 periods</p></div><span className="text-[10px] text-slate-700">Live</span></div><div className="mt-6 flex h-44 items-end gap-2">{bars.map((bar,i)=><div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-blue-400/15 to-indigo-400/60" style={{height:bar+"%"}}/>)}</div></div>
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-indigo-400/[0.08] to-transparent p-4"><p className="text-xs font-medium text-slate-400">Goal completion</p><div className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full bg-[conic-gradient(#67e8f9_0_78%,rgba(255,255,255,.06)_78%_100%)]"><div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#111114]"><div className="text-center"><p className="text-2xl font-semibold text-white">78%</p><p className="text-[10px] text-slate-600">on target</p></div></div></div></div>
    </div>
  </section>
}
