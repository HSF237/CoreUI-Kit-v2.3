import { useState } from "react";
import { Bell, Heart, MessageCircle, Share2, Star, Zap } from "lucide-react";

const actions = [
  { icon: Heart, label: "Like", className: "from-rose-300 to-pink-500", toggle: true },
  { icon: Star, label: "Favorite", className: "from-amber-300 to-orange-500", toggle: true },
  { icon: MessageCircle, label: "Message", className: "from-cyan-300 to-blue-500", toggle: false },
  { icon: Bell, label: "Notify", className: "from-violet-300 to-fuchsia-500", toggle: true },
  { icon: Share2, label: "Share", className: "from-emerald-300 to-teal-500", toggle: false },
  { icon: Zap, label: "Boost", className: "from-sky-300 to-indigo-500", toggle: false },
];

export default function GradientIconButtons() {
  const [pressed, setPressed] = useState({});

  return (
    <section className="w-full max-w-xl rounded-[28px] border border-white/10 bg-[#0d0d10] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <p className="text-xs font-medium text-slate-500">Gradient icon actions</p>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {actions.map((action) => {
          const Icon = action.icon;
          const isActive = action.toggle && Boolean(pressed[action.label]);
          return (
            <button
              key={action.label}
              type="button"
              aria-pressed={action.toggle ? isActive : undefined}
              onClick={() => {
                if (!action.toggle) return;
                setPressed((current) => ({ ...current, [action.label]: !current[action.label] }));
              }}
              className="group flex flex-col items-center gap-2 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <span
                className={
                  "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-slate-950 shadow-lg transition group-hover:-translate-y-1 group-hover:scale-105 " +
                  action.className +
                  (isActive ? " ring-2 ring-white/70 ring-offset-2 ring-offset-[#0d0d10]" : "")
                }
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[10px] font-medium text-slate-600 group-hover:text-slate-300">{action.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
