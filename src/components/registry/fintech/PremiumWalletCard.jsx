import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, CreditCard, Eye, EyeOff, MoreHorizontal, Sparkles } from "lucide-react";

export default function PremiumWalletCard() {
  const [balanceHidden, setBalanceHidden] = useState(false);

  return (
    <section className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-teal-400/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Sparkles className="h-4 w-4 text-teal-300" aria-hidden="true" /> Main wallet
          </div>
          <button
            type="button"
            aria-label="More wallet options"
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-500 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            Available balance
            <button
              type="button"
              onClick={() => setBalanceHidden((value) => !value)}
              aria-pressed={balanceHidden}
              aria-label={balanceHidden ? "Show balance" : "Hide balance"}
              className="rounded-md text-slate-500 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
            >
              {balanceHidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          <div className="mt-2 flex items-end gap-2">
            {balanceHidden ? (
              <span className="text-4xl font-semibold tracking-[-0.05em] text-white">••••••</span>
            ) : (
              <>
                <span className="text-4xl font-semibold tracking-[-0.05em] text-white">$18,420</span>
                <span className="mb-1 text-sm font-medium text-slate-500">.84</span>
              </>
            )}
          </div>
          <p className="mt-2 text-xs font-medium text-emerald-300">+8.4% from last month</p>
        </div>
        <div className="mt-7 rounded-[22px] border border-white/10 bg-gradient-to-br from-teal-300/15 via-white/[0.04] to-emerald-400/15 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <CreditCard className="h-5 w-5 text-teal-200" aria-hidden="true" />
            <span className="font-mono text-xs text-slate-400">•••• 8241</span>
          </div>
          <p className="mt-10 text-xs uppercase tracking-[0.18em] text-slate-500">Core Black</p>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-sm font-semibold text-white">Avery Morgan</p>
            <p className="text-xs text-slate-500">09/29</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
          >
            <ArrowUpRight className="h-4 w-4 text-teal-300" aria-hidden="true" /> Send
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <ArrowDownLeft className="h-4 w-4 text-emerald-300" aria-hidden="true" /> Receive
          </button>
        </div>
      </div>
    </section>
  );
}
