import { cloneElement, useEffect, useId, useRef, useState } from "react";
import { Bell, LogOut, Settings, User } from "lucide-react";

const menuItems = [
  { label: "View profile", icon: User },
  { label: "Notification settings", icon: Bell },
  { label: "Account settings", icon: Settings },
];

function Tooltip({ label, children }) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      {cloneElement(children, { "aria-describedby": open ? tooltipId : undefined })}
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border,rgba(255,255,255,.1))] bg-[#18181c] px-3 py-1.5 text-[11px] font-medium text-[var(--text-primary,#e2e8f0)] shadow-lg"
        >
          {label}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#18181c]" />
        </span>
      )}
    </span>
  );
}

function AccountMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  const menuId = useId();
  const totalItems = menuItems.length + 1;

  useEffect(() => {
    if (!open) return;
    itemRefs.current[0]?.focus();

    function onDocumentMouseDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, [open]);

  function onTriggerKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function onMenuKeyDown(event) {
    const items = itemRefs.current.filter(Boolean);
    const currentIndex = items.indexOf(document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  function closeAndReturnFocus() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        className="flex items-center gap-2 rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary,#cbd5e1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
      >
        <span className="h-6 w-6 rounded-full bg-gradient-to-br from-sky-300 to-blue-500" />
        Account menu
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Account menu"
          onKeyDown={onMenuKeyDown}
          className="absolute left-0 top-[calc(100%+10px)] w-56 overflow-hidden rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,.4)]"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                role="menuitem"
                type="button"
                onClick={closeAndReturnFocus}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] text-[var(--text-secondary,#cbd5e1)] transition hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:outline-none"
              >
                <Icon className="h-3.5 w-3.5 text-[var(--text-subtle,#475569)]" />
                {item.label}
              </button>
            );
          })}
          <div className="my-1 h-px bg-white/10" role="separator" />
          <button
            ref={(el) => {
              itemRefs.current[totalItems - 1] = el;
            }}
            role="menuitem"
            type="button"
            onClick={closeAndReturnFocus}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] text-rose-300 transition hover:bg-rose-300/10 focus-visible:bg-rose-300/10 focus-visible:outline-none"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default function TooltipPopoverKit() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-10 py-4">
      <div className="relative flex items-center gap-4">
        <button
          type="button"
          className="rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary,#cbd5e1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        >
          Hover me
        </button>
        <Tooltip label="Copies the current invite link">
          <button
            type="button"
            className="rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary,#cbd5e1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            Tooltip target
          </button>
        </Tooltip>
      </div>

      <AccountMenu />
    </div>
  );
}
