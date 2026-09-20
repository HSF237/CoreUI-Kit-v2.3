import { ArrowRight, Mail } from "lucide-react";

export default function NewsletterCtaBanner(){
  return <section className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-fuchsia-300/15 bg-[#0d0a0f] p-7 shadow-[0_25px_80px_rgba(0,0,0,.35)] sm:p-9">
    <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-400/10 blur-3xl"/>
    <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-violet-400/10 blur-3xl"/>
    <div className="relative">
      <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-fuchsia-200"><Mail className="h-3.5 w-3.5"/>New components monthly</div>
      <h3 className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">Get new blocks in your inbox.</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">One email whenever a new category ships. No spam, unsubscribe anytime.</p>
      <form className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input type="email" placeholder="you@company.com" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-700 focus:border-fuchsia-300/40"/>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-300 to-violet-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:scale-[1.01]">Subscribe<ArrowRight className="h-3.5 w-3.5"/></button>
      </form>
    </div>
  </section>
}
