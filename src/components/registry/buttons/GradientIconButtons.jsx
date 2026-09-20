import { Bell, Heart, MessageCircle, Share2, Star, Zap } from "lucide-react";

const actions=[
  {icon:Heart,label:"Like",className:"from-rose-300 to-pink-500"},
  {icon:Star,label:"Favorite",className:"from-amber-300 to-orange-500"},
  {icon:MessageCircle,label:"Message",className:"from-cyan-300 to-blue-500"},
  {icon:Bell,label:"Notify",className:"from-violet-300 to-fuchsia-500"},
  {icon:Share2,label:"Share",className:"from-emerald-300 to-teal-500"},
  {icon:Zap,label:"Boost",className:"from-sky-300 to-indigo-500"},
];

export default function GradientIconButtons(){
  return <section className="w-full max-w-xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
    <p className="text-xs font-medium text-slate-500">Gradient icon actions</p>
    <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">{actions.map((action)=>{const Icon=action.icon; return <button key={action.label} className="group flex flex-col items-center gap-2"><span className={"flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-slate-950 shadow-lg transition group-hover:-translate-y-1 group-hover:scale-105 "+action.className}><Icon className="h-5 w-5"/></span><span className="text-[10px] font-medium text-slate-600 group-hover:text-slate-300">{action.label}</span></button>})}</div>
  </section>
}
