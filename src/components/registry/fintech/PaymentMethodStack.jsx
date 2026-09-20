import { Check, ChevronRight, CreditCard, Landmark, Plus, Smartphone } from "lucide-react";

const methods = [
  { name: "Core Black", meta: "Visa •••• 8241", icon: CreditCard, selected: true },
  { name: "Bank account", meta: "Checking •••• 1098", icon: Landmark },
  { name: "Mobile wallet", meta: "Instant transfer", icon: Smartphone },
];

export default function PaymentMethodStack() {
  return <section className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
    <div className="flex items-center justify-between"><div><p className="text-xs font-medium text-slate-500">Checkout</p><h3 className="mt-1 text-xl font-semibold text-white">Payment method</h3></div><button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400"><Plus className="h-4 w-4" /></button></div>
    <div className="mt-5 space-y-2.5">{methods.map((m)=>{ const Icon=m.icon; return <button key={m.name} className={"flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition " + (m.selected ? "border-emerald-300/25 bg-emerald-300/[0.07]" : "border-white/10 bg-white/[0.025] hover:bg-white/[0.045]")}><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300"><Icon className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="text-sm font-medium text-slate-200">{m.name}</p><p className="mt-0.5 text-[11px] text-slate-600">{m.meta}</p></div>{m.selected ? <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-300 text-slate-950"><Check className="h-3.5 w-3.5" /></span> : <ChevronRight className="h-4 w-4 text-slate-700" />}</button>})}</div>
    <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/15 px-4 py-3"><div><p className="text-xs text-slate-500">Total due</p><p className="mt-1 text-2xl font-semibold text-white">$2,849.00</p></div><button className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950">Pay securely</button></div>
  </section>;
}
