import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const assets = [
  { symbol: "USD", name: "US Dollar", balance: "$12,480.32", allocation: "59.1%", change: 1.84 },
  { symbol: "EUR", name: "Euro", balance: "€6,430.18", allocation: "28.4%", change: 0.62 },
  { symbol: "GBP", name: "British Pound", balance: "£2,198.74", allocation: "12.5%", change: -0.37 },
];

export default function TransactionExchangeOverview() {
  return (
    <section className="relative w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <div aria-hidden="true" className="absolute -right-28 -top-28 h-64 w-64 rounded-full bg-emerald-400/10 blur-[90px]" />
      <div aria-hidden="true" className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-sky-500/10 blur-[90px]" />

      <div className="relative">
        <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <WalletCards className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              Treasury balance
            </div>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <p className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">$21,109.24</p>
              <div className="mb-1 inline-flex items-center gap-1 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                <TrendingUp className="h-3 w-3" aria-hidden="true" /> +3.2%
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-600">Across 3 settlement currencies</p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:self-auto"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            Exchange funds
          </button>
        </div>

        <div className="grid gap-3 py-5 lg:grid-cols-[1.4fr_.6fr]">
          <div className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.025]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
              <div>
                <p className="text-xs font-semibold text-slate-300">Currency positions</p>
                <p className="mt-1 text-[10px] text-slate-700">Live allocation and 24h movement</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              >
                Details <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {assets.map((asset, index) => {
                const positive = asset.change >= 0;
                const TrendIcon = positive ? TrendingUp : TrendingDown;
                return (
                  <div key={asset.symbol} className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 transition hover:bg-white/[0.025]">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] font-mono text-[11px] font-bold text-slate-200">
                        {asset.symbol}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-200">{asset.name}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div aria-hidden="true" className="h-1 w-20 overflow-hidden rounded-full bg-white/[0.05]">
                            <div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-sky-300" style={{ width: [82, 56, 31][index] + "%" }} />
                          </div>
                          <span className="text-[9px] text-slate-700">{asset.allocation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{asset.balance}</p>
                      <p className={"mt-1 inline-flex items-center gap-1 text-[10px] font-semibold " + (positive ? "text-emerald-300" : "text-rose-300")}>
                        <TrendIcon className="h-3 w-3" aria-hidden="true" />
                        {positive ? "+" : ""}{asset.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-[22px] border border-white/[0.08] bg-gradient-to-br from-emerald-300/[0.08] to-transparent p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">USD / EUR</p>
              <p className="mt-3 font-mono text-3xl font-semibold tracking-[-0.04em] text-white">0.9184</p>
              <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300">
                <TrendingUp className="h-3 w-3" aria-hidden="true" /> +0.42% today
              </p>
              <div aria-hidden="true" className="mt-5 flex h-14 items-end gap-1">
                {[32, 45, 39, 58, 52, 71, 66, 82, 75, 91].map((height, index) => (
                  <div key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-400/15 to-emerald-300/60" style={{ height: height + "%" }} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-3.5">
                <ArrowDownLeft className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                <p className="mt-4 text-[10px] text-slate-600">Incoming</p>
                <p className="mt-1 text-sm font-semibold text-white">+$4.82K</p>
              </div>
              <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-3.5">
                <ArrowUpRight className="h-4 w-4 text-rose-300" aria-hidden="true" />
                <p className="mt-4 text-[10px] text-slate-600">Outgoing</p>
                <p className="mt-1 text-sm font-semibold text-white">-$2.14K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
