import { useState } from "react";
import { Bell, Home, Plus, Search, Settings, User } from "lucide-react";

const leadingItems = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Bell, label: "Notifications" },
];

const trailingItems = [
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function FloatingActionDock() {
  const [active, setActive] = useState("Home");

  function renderItem(item) {
    const Icon = item.icon;
    const isActive = item.label === active;
    return (
      <button
        key={item.label}
        type="button"
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setActive(item.label)}
        className={
          "flex h-10 w-10 items-center justify-center rounded-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 " +
          (isActive ? "bg-white/[0.08] text-white" : "text-slate-600 hover:bg-white/[0.05] hover:text-white")
        }
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </button>
    );
  }

  return (
    <section className="flex w-full max-w-2xl items-center justify-center rounded-[28px] border border-white/10 bg-[#0d0d10] px-5 py-16 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <nav aria-label="Primary" className="flex items-center gap-1 rounded-[22px] border border-white/10 bg-black/35 p-2 shadow-2xl backdrop-blur-xl">
        {leadingItems.map(renderItem)}
        <button
          type="button"
          aria-label="Create new"
          className="mx-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-300 to-sky-300 text-slate-950 shadow-lg shadow-lime-950/30 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
        {trailingItems.map(renderItem)}
      </nav>
    </section>
  );
}
