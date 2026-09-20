import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials=[
  {quote:"We replaced three internal tools with components copied straight from this registry. Shipped our new dashboard in a week.",name:"Priya Nair",role:"Engineering Lead, Flowstack"},
  {quote:"The code is clean enough that our design system team just adopted the spacing scale wholesale.",name:"Daniel Cho",role:"Staff Designer, Ledgerly"},
];

export default function TestimonialCarousel(){
  const active=testimonials[0];
  return <section className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-8">
    <Quote className="h-8 w-8 text-fuchsia-300/50"/>
    <p className="mt-4 text-lg leading-8 text-slate-200 sm:text-xl">"{active.quote}"</p>
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-300 to-violet-500 text-sm font-semibold text-slate-950">{active.name.split(" ").map((part)=>part[0]).join("")}</span>
        <div><p className="text-sm font-semibold text-white">{active.name}</p><p className="text-xs text-slate-600">{active.role}</p></div>
      </div>
      <div className="flex items-center gap-1 text-amber-300">{Array.from({length:5}).map((_,index)=><Star key={index} className="h-3.5 w-3.5 fill-current"/>)}</div>
    </div>
    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
      <div className="flex items-center gap-1.5">{testimonials.map((item,index)=><span key={item.name} className={"h-1.5 rounded-full transition-all "+(index===0?"w-6 bg-fuchsia-300":"w-1.5 bg-white/15")}/>)}</div>
      <div className="flex items-center gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06]"><ChevronLeft className="h-4 w-4"/></button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06]"><ChevronRight className="h-4 w-4"/></button>
      </div>
    </div>
  </section>
}
