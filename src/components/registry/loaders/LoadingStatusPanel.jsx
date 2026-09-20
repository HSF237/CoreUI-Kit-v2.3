import { CheckCircle2, CircleDashed, LoaderCircle } from "lucide-react";

const stateLabels = {
  done: "Completed",
  active: "In progress",
  waiting: "Waiting",
};

const steps = [
  { label: "Preparing workspace", state: "done" },
  { label: "Installing dependencies", state: "done" },
  { label: "Building production bundle", state: "active" },
  { label: "Deploying edge assets", state: "waiting" },
];

export default function LoadingStatusPanel() {
  return (
    <section className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0d0d10] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-300">
          <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Publishing your project</h3>
          <p className="mt-0.5 text-xs text-slate-600">Usually takes less than a minute.</p>
        </div>
      </div>

      <ol className="mt-6 space-y-3">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3"
          >
            {step.state === "done" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            ) : step.state === "active" ? (
              <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none text-amber-300" aria-hidden="true" />
            ) : (
              <CircleDashed className="h-4 w-4 text-slate-700" aria-hidden="true" />
            )}
            <span className={"flex-1 text-xs " + (step.state === "waiting" ? "text-slate-700" : "text-slate-300")}>
              {step.label}
              <span className="sr-only"> — {stateLabels[step.state]}</span>
            </span>
            <span className="font-mono text-[10px] text-slate-700">0{index + 1}</span>
          </li>
        ))}
      </ol>

      <div
        role="progressbar"
        aria-label="Publish progress"
        aria-valuenow={68}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]"
      >
        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-amber-300 to-orange-300" />
      </div>
      <p aria-hidden="true" className="mt-2 text-right font-mono text-[10px] text-slate-700">
        68%
      </p>
    </section>
  );
}
