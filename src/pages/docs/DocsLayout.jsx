import { NavLink, Outlet } from "react-router-dom";
import { docsPages } from "../../content/docs.js";

export default function DocsLayout() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-[82px] lg:self-start">
          <div className="rounded-[22px] border border-[var(--chrome-border)] bg-[var(--chrome-surface)] p-2.5">
            <div className="px-3 pb-2 pt-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--chrome-text-faint)]">
                Documentation
              </p>
            </div>
            <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible">
              {docsPages.map((page) => (
                <NavLink
                  key={page.slug}
                  to={`/docs/${page.slug}`}
                  className={({ isActive }) =>
                    [
                      "flex min-w-fit items-center rounded-xl border px-3 py-2.5 text-xs font-medium transition lg:w-full",
                      isActive
                        ? "border-[var(--chrome-border-strong)] bg-[var(--chrome-hover)] text-[var(--chrome-text-primary)]"
                        : "border-transparent text-[var(--chrome-text-muted)] hover:bg-[var(--chrome-hover)] hover:text-[var(--chrome-text-secondary)]",
                    ].join(" ")
                  }
                >
                  {page.title}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
