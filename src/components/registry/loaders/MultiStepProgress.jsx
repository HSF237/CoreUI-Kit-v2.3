import { Check, CreditCard, PackageCheck, UserRound, WandSparkles } from "lucide-react";

const steps = [
  { label: "Profile", icon: UserRound, done: true },
  { label: "Plan", icon: WandSparkles, done: true },
  { label: "Payment", icon: CreditCard, active: true },
  { label: "Finish", icon: PackageCheck },
];

export default function MultiStepProgress() {
  return (
    <nav aria-label="Onboarding progress" className="w-full max-w-3xl rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <ol className="grid grid-cols-4 gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const complete = step.done || step.active;
          const statusLabel = step.done ? "Completed" : step.active ? "Current step" : "Not started";
          return (
            <li key={step.label} aria-current={step.active ? "step" : undefined} className="relative">
              {index < steps.length - 1 && (
                <div aria-hidden="true" className="absolute left-[58%] right-[-42%] top-5 h-px bg-white/10">
                  <div className={"h-full " + (step.done ? "w-full bg-blue-300" : "w-0")} />
                </div>
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div
                  className={
                    "flex h-10 w-10 items-center justify-center rounded-full border " +
                    (step.done
                      ? "border-blue-300 bg-blue-300 text-[var(--text-on-accent,#020617)]"
                      : step.active
                        ? "border-blue-300/40 bg-blue-300/10 text-blue-300"
                        : "border-[var(--border,rgba(255,255,255,.1))] bg-[#0a1422] text-[var(--text-faint,#334155)]")
                  }
                >
                  {step.done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Icon className="h-4 w-4" aria-hidden="true" />}
                </div>
                <p className={"mt-2 text-[11px] font-medium " + (complete ? "text-[var(--text-secondary,#cbd5e1)]" : "text-[var(--text-faint,#334155)]")}>
                  {step.label}
                  <span className="sr-only"> — {statusLabel}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
