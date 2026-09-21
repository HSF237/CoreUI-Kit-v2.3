import { useEffect, useRef, useState } from "react";
import { Blocks, Download, GitFork, Star } from "lucide-react";

const stats = [
  { label: "GitHub stars", value: 2480, suffix: "+", icon: Star },
  { label: "Weekly downloads", value: 18200, suffix: "+", icon: Download },
  { label: "Community forks", value: 340, suffix: "+", icon: GitFork },
  { label: "Registry blocks", value: 38, suffix: "", icon: Blocks },
];

function formatValue(value) {
  return value >= 1000 ? value.toLocaleString("en-US") : String(value);
}

function useCountUp(target, shouldAnimate) {
  const [value, setValue] = useState(shouldAnimate ? 0 : target);

  useEffect(() => {
    if (!shouldAnimate) {
      setValue(target);
      return;
    }
    let frame;
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, shouldAnimate]);

  return value;
}

function StatCard({ stat, animate }) {
  const Icon = stat.icon;
  const value = useCountUp(stat.value, animate);

  return (
    <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface-inset,rgba(255,255,255,.025))] p-5 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300">
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </div>
      <p aria-hidden="true" className="mt-4 font-mono text-3xl font-semibold tracking-[-0.03em] text-white">
        {formatValue(value)}
        {stat.suffix}
      </p>
      <span className="sr-only">
        {formatValue(stat.value)}
        {stat.suffix} {stat.label}
      </span>
      <p className="mt-1 text-xs text-[var(--text-subtle,#475569)]">{stat.label}</p>
    </div>
  );
}

export default function StatsCounterSection() {
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    function onChange(event) {
      setReduceMotion(event.matches);
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-3xl rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-8"
    >
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle,#475569)]">
        Trusted by the open-source community
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} animate={inView && !reduceMotion} />
        ))}
      </div>
    </section>
  );
}
