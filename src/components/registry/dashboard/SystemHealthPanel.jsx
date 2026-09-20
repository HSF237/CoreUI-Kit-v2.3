import { CheckCircle2, Cpu, Database, Radio, Server } from "lucide-react";

const services=[
  {name:"API Gateway",value:"99.99%",icon:Server},
  {name:"Primary Database",value:"99.98%",icon:Database},
  {name:"Background Workers",value:"99.97%",icon:Cpu},
  {name:"Realtime Stream",value:"99.96%",icon:Radio},
];

export default function SystemHealthPanel(){
  return <section className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
    <div className="flex items-start justify-between gap-4"><div><p className="text-xs text-slate-500">Infrastructure</p><h3 className="mt-1 text-xl font-semibold text-white">System health</h3></div><div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2.5 py-1 text-[10px] font-semibold text-emerald-300"><CheckCircle2 className="h-3 w-3"/>All systems operational</div></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">{services.map((service,index)=>{const Icon=service.icon; return <div key={service.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"><div className="flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-300/[0.08] text-blue-300"><Icon className="h-4 w-4"/></div><span className="text-[10px] font-semibold text-emerald-300">Healthy</span></div><p className="mt-4 text-sm font-medium text-slate-200">{service.name}</p><div className="mt-2 flex items-center justify-between"><span className="text-[10px] text-slate-600">30d uptime</span><span className="font-mono text-[11px] text-slate-400">{service.value}</span></div><div className="mt-3 flex h-8 items-end gap-1">{Array.from({length:14}).map((_,i)=><div key={i} className="flex-1 rounded-sm bg-emerald-300/40" style={{height:(38+((i*13+index*9)%55))+"%"}}/>)}</div></div>})}</div>
  </section>
}
