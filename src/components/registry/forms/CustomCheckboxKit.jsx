import { useId, useState } from "react";
import { Check } from "lucide-react";

const notificationOptions = [
  { id: "product-updates", label: "Product updates", hint: "New components and releases" },
  { id: "security-alerts", label: "Security alerts", hint: "Sign-ins from new devices" },
  { id: "marketing-emails", label: "Marketing emails", hint: "Occasional offers and news" },
];

function CustomCheckbox({ id, label, hint, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-xl p-2 transition hover:bg-white/[0.03]">
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer absolute h-full w-full cursor-pointer opacity-0"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-md border border-white/15 bg-white/[0.03] transition peer-checked:border-emerald-300 peer-checked:bg-emerald-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-300"
        />
        <Check
          aria-hidden="true"
          className="relative h-3.5 w-3.5 scale-0 text-[var(--text-on-accent,#020617)] transition peer-checked:scale-100"
        />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-[var(--text-primary,#e2e8f0)]">{label}</span>
        <span className="block text-[11px] text-[var(--text-subtle,#475569)]">{hint}</span>
      </span>
    </label>
  );
}

function CustomRadio({ id, name, label, price, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className={
        "flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition " +
        (checked ? "border-emerald-300/30 bg-emerald-300/[0.06]" : "border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.02] hover:bg-white/[0.04]")
      }
    >
      <span className="flex items-center gap-3">
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            id={id}
            type="radio"
            name={name}
            checked={checked}
            onChange={onChange}
            className="peer absolute h-full w-full cursor-pointer opacity-0"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-white/15 bg-white/[0.03] transition peer-checked:border-emerald-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-300"
          />
          <span aria-hidden="true" className="relative h-2 w-2 scale-0 rounded-full bg-emerald-300 transition peer-checked:scale-100" />
        </span>
        <span className="text-sm font-medium text-[var(--text-primary,#e2e8f0)]">{label}</span>
      </span>
      <span className="text-xs text-[var(--text-muted,#64748b)]">{price}</span>
    </label>
  );
}

function ToggleSwitch({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center justify-between gap-3">
      <span className="text-sm font-medium text-[var(--text-primary,#e2e8f0)]">{label}</span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={onChange}
          className="peer absolute h-full w-full cursor-pointer opacity-0"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-white/10 transition peer-checked:bg-emerald-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-300"
        />
        <span
          aria-hidden="true"
          className="relative h-4.5 w-4.5 translate-x-1 rounded-full bg-white transition peer-checked:translate-x-6"
        />
      </span>
    </label>
  );
}

export default function CustomCheckboxKit() {
  const [notifications, setNotifications] = useState({ "product-updates": true, "security-alerts": true, "marketing-emails": false });
  const [plan, setPlan] = useState("monthly");
  const [darkMode, setDarkMode] = useState(true);
  const groupId = useId();

  function toggleNotification(id) {
    setNotifications((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <section className="w-full max-w-md space-y-6 rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <div>
        <h3 id={`${groupId}-notifications`} className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-subtle,#475569)]">
          Notifications
        </h3>
        <div role="group" aria-labelledby={`${groupId}-notifications`} className="mt-2 space-y-1">
          {notificationOptions.map((option) => (
            <CustomCheckbox
              key={option.id}
              id={`${groupId}-${option.id}`}
              label={option.label}
              hint={option.hint}
              checked={notifications[option.id]}
              onChange={() => toggleNotification(option.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 id={`${groupId}-plan`} className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-subtle,#475569)]">
          Billing cycle
        </h3>
        <div role="radiogroup" aria-labelledby={`${groupId}-plan`} className="mt-2 space-y-2">
          <CustomRadio
            id={`${groupId}-monthly`}
            name={`${groupId}-plan`}
            label="Monthly"
            price="$12/mo"
            checked={plan === "monthly"}
            onChange={() => setPlan("monthly")}
          />
          <CustomRadio
            id={`${groupId}-yearly`}
            name={`${groupId}-plan`}
            label="Yearly"
            price="$96/yr"
            checked={plan === "yearly"}
            onChange={() => setPlan("yearly")}
          />
        </div>
      </div>

      <div className="border-t border-[var(--border,rgba(255,255,255,.1))] pt-4">
        <ToggleSwitch id={`${groupId}-dark-mode`} label="Dark mode" checked={darkMode} onChange={() => setDarkMode((v) => !v)} />
      </div>
    </section>
  );
}
