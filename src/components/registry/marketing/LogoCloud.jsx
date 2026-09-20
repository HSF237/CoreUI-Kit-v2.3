const logos=["Flowstack","Ledgerly","Northwind","Vantage","Kioskly","Pathwise"];

export default function LogoCloud(){
  return <section className="w-full max-w-3xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-8">
    <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">Trusted by product teams everywhere</p>
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {logos.map((name)=><div key={name} className="flex h-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-sm font-semibold tracking-[-0.02em] text-slate-600 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-slate-300">{name}</div>)}
    </div>
  </section>
}
