import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Bell,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const navItems = [
  { label:"Overview", icon:LayoutDashboard },
  { label:"Analytics", icon:BarChart3 },
  { label:"Customers", icon:Users },
  { label:"Billing", icon:CreditCard },
];

function Navigation({ collapsed, active, onSelect, onCollapse, mobile, onClose }) {
  return (
    <div className="flex h-full flex-col">
      <div className={"flex h-[70px] items-center border-b border-[var(--border-soft,rgba(255,255,255,.075))] px-3 " + (collapsed ? "justify-center" : "justify-between")}>
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br from-blue-300 to-indigo-300 text-[var(--text-on-accent,#020617)] shadow-lg shadow-blue-950/25">
            <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
          </div>
          {!collapsed && <div className="min-w-0"><p className="truncate text-sm font-semibold text-white">Nexus</p><p className="truncate text-[9px] uppercase tracking-[0.15em] text-[var(--text-faint,#334155)]">Enterprise</p></div>}
        </div>
        {mobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-soft,rgba(255,255,255,.075))] text-[var(--text-muted,#64748b)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex-1 p-2.5">
        {!collapsed && (
          <div className="mb-3 flex h-10 items-center gap-2 rounded-xl border border-[var(--border-soft,rgba(255,255,255,.075))] bg-[var(--surface-inset,rgba(255,255,255,.025))] px-3 text-[var(--text-subtle,#475569)] focus-within:border-blue-300/20">
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <label htmlFor="sidebar-search" className="sr-only">
              Search workspace
            </label>
            <input
              id="sidebar-search"
              type="search"
              placeholder="Search workspace"
              className="min-w-0 flex-1 bg-transparent text-[11px] text-[var(--text-secondary,#cbd5e1)] outline-none placeholder:text-[var(--text-faint,#334155)]"
            />
            <kbd className="rounded-md border border-[var(--border-soft,rgba(255,255,255,.075))] px-1.5 py-0.5 font-mono text-[8px] text-[var(--text-faint,#334155)]">⌘K</kbd>
          </div>
        )}

        <p className={"mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-800 " + (collapsed ? "hidden" : "")}>Workspace</p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon=item.icon;
            const selected=active===item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelect(item.label)}
                aria-label={collapsed ? item.label : undefined}
                aria-current={selected ? "page" : undefined}
                title={collapsed ? item.label : undefined}
                className={[
                  "group flex h-10 w-full items-center rounded-xl border text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300",
                  collapsed ? "justify-center" : "gap-3 px-3",
                  selected
                    ? "border-blue-300/15 bg-blue-300/[0.08] text-blue-100"
                    : "border-transparent text-[var(--text-subtle,#475569)] hover:bg-white/[0.035] hover:text-[var(--text-secondary,#cbd5e1)]",
                ].join(" ")}
              >
                <Icon className={"h-4 w-4 shrink-0 " + (selected ? "text-blue-300" : "text-[var(--text-faint,#334155)] group-hover:text-[var(--text-tertiary,#94a3b8)]")} aria-hidden="true" />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                {!collapsed && selected && <ChevronRight className="h-3 w-3 text-blue-300/60" aria-hidden="true" />}
              </button>
            );
          })}
        </nav>

        <div className="my-3 border-t border-white/[0.06]" />
        {[
          [Bell, "Notifications"],
          [Settings, "Settings"],
        ].map(([Icon, label]) => (
          <button
            key={label}
            type="button"
            aria-label={collapsed ? label : undefined}
            title={collapsed ? label : undefined}
            className={"flex h-10 w-full items-center rounded-xl text-[var(--text-faint,#334155)] transition hover:bg-white/[0.035] hover:text-[var(--text-secondary,#cbd5e1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 " + (collapsed ? "justify-center" : "gap-3 px-3")}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {!collapsed && <span className="text-xs">{label}</span>}
          </button>
        ))}
      </div>

      <div className="border-t border-[var(--border-soft,rgba(255,255,255,.075))] p-2.5">
        {!mobile && (
          <button
            type="button"
            onClick={onCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={"mb-2 flex h-9 w-full items-center rounded-xl border border-[var(--border-soft,rgba(255,255,255,.075))] bg-white/[0.02] text-[var(--text-subtle,#475569)] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 " + (collapsed ? "justify-center" : "justify-between px-3")}
          >
            {!collapsed && <span className="text-[10px] font-medium">Collapse sidebar</span>}
            {collapsed ? <PanelLeftOpen className="h-3.5 w-3.5" aria-hidden="true" /> : <PanelLeftClose className="h-3.5 w-3.5" aria-hidden="true" />}
          </button>
        )}
        <div className={"flex items-center rounded-xl border border-[var(--border-soft,rgba(255,255,255,.075))] bg-white/[0.02] p-2 " + (collapsed ? "justify-center" : "gap-3")}>
          <div aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-300/30 to-blue-300/20 text-[10px] font-bold text-[var(--text-primary,#e2e8f0)]">MK</div>
          {!collapsed && <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-medium text-[var(--text-secondary,#cbd5e1)]">Maya Kim</p><p className="truncate text-[9px] text-[var(--text-faint,#334155)]">Product admin</p></div>}
        </div>
      </div>
    </div>
  );
}

export default function ResponsiveSidebarNavigation(){
  const [collapsed,setCollapsed]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const [active,setActive]=useState("Overview");
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;
    drawerRef.current?.querySelector("button")?.focus();
    const menuButton = menuButtonRef.current;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [mobileOpen]);

  return (
    <section className="relative min-h-[540px] w-full max-w-5xl overflow-hidden rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <div className="flex min-h-[540px]">
        <aside className={"hidden shrink-0 border-r border-[var(--border-soft,rgba(255,255,255,.075))] bg-[#040a12] transition-[width] duration-300 md:block " + (collapsed ? "w-[72px]" : "w-[230px]")}>
          <Navigation collapsed={collapsed} active={active} onSelect={setActive} onCollapse={()=>setCollapsed(!collapsed)} />
        </aside>

        {mobileOpen && <>
          <button type="button" className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[2px] md:hidden" onClick={()=>setMobileOpen(false)} aria-label="Close menu" />
          <aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Sidebar navigation"
            className="absolute inset-y-0 left-0 z-30 w-[235px] border-r border-[var(--border,rgba(255,255,255,.1))] bg-[#040a12] shadow-2xl md:hidden"
          >
            <Navigation active={active} onSelect={(value)=>{setActive(value);setMobileOpen(false)}} mobile onClose={()=>setMobileOpen(false)} />
          </aside>
        </>}

        <main className="min-w-0 flex-1">
          <header className="flex h-[70px] items-center justify-between border-b border-[var(--border-soft,rgba(255,255,255,.075))] px-4 sm:px-5">
            <div className="flex items-center gap-3">
              <button
                ref={menuButtonRef}
                type="button"
                onClick={()=>setMobileOpen(true)}
                aria-label="Open sidebar menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-soft,rgba(255,255,255,.075))] text-[var(--text-muted,#64748b)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 md:hidden"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </button>
              <div><p className="text-sm font-semibold text-white">{active}</p><p className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-[var(--text-faint,#334155)]">Workspace / {active}</p></div>
            </div>
            <button
              type="button"
              className="rounded-xl border border-[var(--border-soft,rgba(255,255,255,.075))] bg-[var(--surface-inset,rgba(255,255,255,.025))] px-3 py-2 text-[10px] font-medium text-[var(--text-muted,#64748b)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              Sep 01 – Sep 30
            </button>
          </header>

          <div className="p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Net revenue","$84.2K","+12.4%"],
                ["Active users","12,490","+8.8%"],
                ["Conversion","8.72%","+1.3%"],
              ].map(([label,value,change])=>(
                <article key={label} className="rounded-[20px] border border-[var(--border-soft,rgba(255,255,255,.075))] bg-[var(--surface-inset,rgba(255,255,255,.025))] p-4">
                  <p className="text-[10px] text-[var(--text-subtle,#475569)]">{label}</p>
                  <div className="mt-2 flex items-end justify-between gap-2"><p className="text-xl font-semibold tracking-[-0.03em] text-white">{value}</p><span className="text-[9px] font-semibold text-emerald-300">{change}</span></div>
                </article>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1.45fr_.55fr]">
              <article className="rounded-[20px] border border-[var(--border-soft,rgba(255,255,255,.075))] bg-white/[0.018] p-4">
                <div className="flex items-center justify-between"><div><p className="text-xs font-medium text-[var(--text-tertiary,#94a3b8)]">Performance</p><p className="mt-1 text-[9px] text-[var(--text-faint,#334155)]">Revenue over time</p></div><span className="text-[9px] text-[var(--text-faint,#334155)]">Live</span></div>
                <div aria-hidden="true" className="mt-6 flex h-48 items-end gap-2">
                  {[35,46,42,61,55,74,66,83,76,92,84,97].map((height,index)=><div key={index} className="flex-1 rounded-t-md bg-gradient-to-t from-blue-400/10 to-indigo-400/55" style={{height:height+"%"}} />)}
                </div>
              </article>

              <article className="rounded-[20px] border border-[var(--border-soft,rgba(255,255,255,.075))] bg-gradient-to-b from-blue-300/[0.05] to-transparent p-4">
                <p className="text-xs font-medium text-[var(--text-tertiary,#94a3b8)]">Goal</p>
                <div
                  role="progressbar"
                  aria-label="Goal completion"
                  aria-valuenow={74}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="mx-auto mt-7 flex h-32 w-32 items-center justify-center rounded-full bg-[conic-gradient(#67e8f9_0_74%,rgba(255,255,255,.05)_74%_100%)]"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--surface-elevated,#111114)]"><div aria-hidden="true" className="text-center"><p className="text-2xl font-semibold text-white">74%</p><p className="text-[9px] text-[var(--text-faint,#334155)]">complete</p></div></div>
                </div>
              </article>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
