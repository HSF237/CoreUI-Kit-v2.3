import { useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const initialToasts = [
  {
    id: "deploy",
    tone: "success",
    icon: CheckCircle2,
    title: "Deployment succeeded",
    body: "main branch is live in production.",
    accent: "border-emerald-300/20 bg-emerald-300/10 text-emerald-300",
  },
  {
    id: "invite",
    tone: "info",
    icon: Info,
    title: "New teammate invited",
    body: "maria@company.com will get access shortly.",
    accent: "border-blue-300/20 bg-blue-300/10 text-blue-300",
  },
  {
    id: "billing",
    tone: "error",
    icon: AlertCircle,
    title: "Payment failed",
    body: "Update your billing details to avoid downtime.",
    accent: "border-rose-300/20 bg-rose-300/10 text-rose-300",
  },
];

export default function ToastNotificationStack() {
  const [toasts, setToasts] = useState(initialToasts);

  function dismiss(id) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  return (
    <div role="region" aria-label="Notifications" className="flex w-full max-w-sm flex-col gap-3">
      {toasts.length === 0 && (
        <p className="rounded-2xl border border-dashed border-[var(--border,rgba(255,255,255,.1))] px-4 py-6 text-center text-xs text-[var(--text-subtle,#475569)]">
          No notifications
        </p>
      )}
      {toasts.map((toast) => {
        const Icon = toast.icon;
        return (
          <div
            key={toast.id}
            role={toast.tone === "error" ? "alert" : "status"}
            aria-live={toast.tone === "error" ? "assertive" : "polite"}
            className="flex items-start gap-3 rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-4 shadow-[0_18px_50px_rgba(0,0,0,.3)]"
          >
            <div className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border " + toast.accent}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">{toast.title}</p>
              <p className="mt-1 text-xs leading-5 text-[var(--text-muted,#64748b)]">{toast.body}</p>
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label={`Dismiss "${toast.title}"`}
              className="shrink-0 rounded-md text-[var(--text-faint,#334155)] transition hover:text-[var(--text-tertiary,#94a3b8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
