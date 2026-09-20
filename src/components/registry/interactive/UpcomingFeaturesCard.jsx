import { ArrowUpRight, Boxes, CircleDot, Sparkles, WandSparkles, Workflow } from "lucide-react";

const features = [
  { title:"Automation Studio", description:"Compose multi-step workflows with triggers and guardrails.", status:"Building", progress:78, icon:Workflow, tone:"from-amber-300/15 to-amber-300/[0.02]" },
  { title:"Component Cloud", description:"Sync private component collections across every workspace.", status:"Planned", progress:46, icon:Boxes, tone:"from-rose-300/15 to-rose-300/[0.02]" },
  { title:"AI Theme Lab", description:"Generate production design tokens from your visual language.", status:"Research", progress:24, icon:WandSparkles, tone:"from-amber-300/15 to-amber-300/[0.02]" },
];

export default function UpcomingFeaturesCard(){
  return (
    <section className="group relative w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0d10] p-1 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-amber-400/10 blur-[80px] transition duration-700 group-hover:bg-amber-400/15" />
      <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-rose-500/10 blur-[80px] transition duration-700 group-hover:bg-rose-500/15" />

      <div className="relative rounded-[26px] border border-white/[0.07] bg-black/10 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Product roadmap
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">What we are building next.</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">A roadmap designed to make production UI faster to discover, adapt and ship.</p>
          </div>

          <button className="group/button inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2.5 text-[11px] font-semibold text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/[0.06] hover:text-white">
            View roadmap
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {features.map((feature) => {
            const Icon=feature.icon;
            return (
              <article key={feature.title} className="group/card relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/15">
                <div className={"absolute inset-x-0 top-0 h-24 bg-gradient-to-b "+feature.tone} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-white/10 bg-black/20 text-slate-300 transition group-hover/card:scale-105 group-hover/card:text-white">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/15 px-2.5 py-1 text-[9px] font-semibold text-slate-500">
                      <CircleDot className="h-3 w-3" />
                      {feature.status}
                    </div>
                  </div>

                  <h4 className="mt-6 text-sm font-semibold text-white">{feature.title}</h4>
                  <p className="mt-2 min-h-12 text-[11px] leading-5 text-slate-600">{feature.description}</p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-[9px] text-slate-700">
                      <span>Progress</span>
                      <span className="font-mono">{feature.progress}%</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-rose-300 transition-all duration-700" style={{width:feature.progress+"%"}} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
