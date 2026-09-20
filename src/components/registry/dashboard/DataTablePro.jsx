import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Eye, Filter, MoreHorizontal, Pencil, Search, Trash2 } from "lucide-react";

const rows = [
  { id: "northstar", name: "Northstar Labs", plan: "Enterprise", revenue: "$18,420", status: "Active" },
  { id: "velora", name: "Velora Studio", plan: "Pro", revenue: "$8,940", status: "Active" },
  { id: "orbit", name: "Orbit Systems", plan: "Enterprise", revenue: "$14,680", status: "Review" },
  { id: "aster", name: "Aster Cloud", plan: "Starter", revenue: "$2,140", status: "Active" },
];

function RowMenu({ row, open, onToggle, onClose }) {
  const containerRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function onDocumentMouseDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) onClose();
    }
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDocumentMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocumentMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={`More options for ${row.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={onToggle}
        className="rounded-md p-1 text-slate-700 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={`Actions for ${row.name}`}
          className="absolute right-0 top-[calc(100%+6px)] z-10 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#15151a] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,.4)]"
        >
          <button role="menuitem" type="button" onClick={onClose} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-300 transition hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            View details
          </button>
          <button role="menuitem" type="button" onClick={onClose} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-300 transition hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none">
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            Edit account
          </button>
          <button role="menuitem" type="button" onClick={onClose} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-rose-300 transition hover:bg-rose-300/10 focus-visible:bg-rose-300/10 focus-visible:outline-none">
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default function DataTablePro() {
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const searchId = useId();

  const filteredRows = useMemo(
    () => rows.filter((row) => row.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  );

  return (
    <section className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d10] shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500">Customers</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Account directory</h3>
        </div>
        <div className="flex gap-2">
          <div className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-slate-600">
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <label htmlFor={searchId} className="sr-only">
              Search accounts
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="w-28 bg-transparent text-xs text-slate-300 outline-none"
            />
          </div>
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs text-slate-400 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">
              <th scope="col" className="px-5 py-3 font-semibold">Customer</th>
              <th scope="col" className="px-5 py-3 font-semibold">Plan</th>
              <th scope="col" className="px-5 py-3 font-semibold">Revenue</th>
              <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              <th scope="col" className="px-5 py-3 font-semibold">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-6 text-center text-xs text-slate-600">
                  No accounts match "{query}"
                </td>
              </tr>
            )}
            {filteredRows.map((row) => (
              <tr key={row.id} className="border-b border-white/5 transition last:border-0 hover:bg-white/[0.025]">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-slate-300">
                      {row.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{row.name}</p>
                      <p className="text-[10px] text-slate-700">customer@company.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-400">{row.plan}</td>
                <td className="px-5 py-3.5 text-xs font-semibold text-slate-200">{row.revenue}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={
                      "w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold " +
                      (row.status === "Active"
                        ? "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-300"
                        : "border-amber-300/15 bg-amber-300/[0.07] text-amber-300")
                    }
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <RowMenu
                    row={row}
                    open={openMenuId === row.id}
                    onToggle={() => setOpenMenuId((current) => (current === row.id ? null : row.id))}
                    onClose={() => setOpenMenuId(null)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[11px] text-slate-600">
        <span>
          Showing {filteredRows.length} of 248
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-slate-400 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        >
          Page 1 <ChevronDown className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
