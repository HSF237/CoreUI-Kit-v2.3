import { useState } from "react";
import { Bell, Check, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";

const initialNotifications = [
  {
    id: "release",
    icon: Sparkles,
    title: "New release available",
    body: "CoreUI-Kit 0.2 adds 24 new blocks.",
    time: "2m",
    tone: "text-sky-300 bg-sky-300/10",
    read: false,
  },
  {
    id: "review",
    icon: MessageSquare,
    title: "Review requested",
    body: "Maya mentioned you in Dashboard Pro.",
    time: "18m",
    tone: "text-fuchsia-300 bg-fuchsia-300/10",
    read: false,
  },
  {
    id: "security",
    icon: ShieldAlert,
    title: "Security check complete",
    body: "No issues detected in production.",
    time: "1h",
    tone: "text-emerald-300 bg-emerald-300/10",
    read: false,
  },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((item) => !item.read).length;

  function markRead(id) {
    setNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }

  function markAllRead() {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }

  return (
    <section className="w-full max-w-lg overflow-hidden rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <div className="flex items-center justify-between border-b border-[var(--border,rgba(255,255,255,.1))] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-300/10 text-sky-300">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Notifications</h3>
            <p role="status" aria-live="polite" className="text-[11px] text-[var(--text-subtle,#475569)]">
              {unreadCount} unread update{unreadCount === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="rounded-md text-[11px] font-medium text-[var(--text-muted,#64748b)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[var(--text-muted,#64748b)]"
        >
          Mark all read
        </button>
      </div>
      <ul className="divide-y divide-white/10">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => markRead(item.id)}
                className="flex w-full gap-3 p-4 text-left transition hover:bg-[var(--surface-inset,rgba(255,255,255,.025))] focus-visible:bg-[var(--surface-inset,rgba(255,255,255,.025))] focus-visible:outline-none"
              >
                <div className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " + item.tone}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-[var(--text-primary,#e2e8f0)]">
                      {item.title}
                      {!item.read && <span className="sr-only"> (unread)</span>}
                    </p>
                    <span className="text-[10px] text-[var(--text-faint,#334155)]">{item.time}</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-subtle,#475569)]">{item.body}</p>
                </div>
                {!item.read && <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-300" />}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-[var(--border,rgba(255,255,255,.1))] p-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[var(--text-on-accent,#020617)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        >
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          Open notification center
        </button>
      </div>
    </section>
  );
}
