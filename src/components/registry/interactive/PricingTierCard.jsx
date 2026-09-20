import { Check, Crown, Sparkles } from "lucide-react";

const features = ["Unlimited projects", "Advanced analytics", "Priority support", "Team permissions", "Custom themes"];

export default function PricingTierCard() {
  return (
    <section className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-rose-300/20 bg-[#080f1c] p-1 shadow-2xl shadow-rose-950/25">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-rose-400/15 to-transparent" />
      <div className="relative rounded-[26px] border border-white/10 bg-black/10 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-200">
            <Crown className="h-3.5 w-3.5" aria-hidden="true" />
            Pro
          </div>
          <Sparkles className="h-5 w-5 text-rose-300" aria-hidden="true" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-white">Built for serious shipping.</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Everything a growing product team needs to move faster without compromising polish.
        </p>
        <p className="mt-6 flex items-end gap-2">
          <span className="text-5xl font-semibold tracking-[-0.06em] text-white">$24</span>
          <span className="mb-1 text-sm text-slate-600">/ month</span>
        </p>
        <button
          type="button"
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-300 to-rose-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
        >
          Start building
        </button>
        <ul className="mt-6 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-slate-400">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-300">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
