import { GitPullRequest, MessageSquare, Rocket, UserPlus } from "lucide-react";

const activity = [
  { icon: Rocket, title: "Production release shipped", meta: "Version 2.4.0 • 4 min ago", tone: "text-cyan-300 bg-cyan-300/10" },
  { icon: GitPullRequest, title: "Pull request #184 merged", meta: "Design tokens cleanup • 18 min ago", tone: "text-violet-300 bg-violet-300/10" },
  { icon: UserPlus, title: "New workspace member", meta: "Maya joined Product • 1 hr ago", tone: "text-emerald-300 bg-emerald-300/10" },
  { icon: MessageSquare, title: "New review comment", meta: "Dashboard shell • 2 hrs ago", tone: "text-amber-300 bg-amber-300/10" },
];

export default function ActivityTimeline() {
  return (
    <section className="w-full max-w-xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <div>
        <p className="text-xs text-slate-500">Workspace feed</p>
        <h3 className="mt-1 text-xl font-semibold text-white">Live activity</h3>
      </div>
      <ol className="relative mt-6 space-y-5 before:absolute before:bottom-3 before:left-5 before:top-3 before:w-px before:bg-white/10">
        {activity.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="relative flex gap-4">
              <div className={"relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 " + item.tone}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 transition hover:bg-white/[0.045]">
                <p className="text-sm font-medium text-slate-200">{item.title}</p>
                <p className="mt-1 text-[11px] leading-5 text-slate-600">{item.meta}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
