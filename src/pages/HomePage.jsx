import { useMemo, useState } from "react";
import { Blocks, Search } from "lucide-react";
import SnippetBlock from "../components/showcase/SnippetBlock.jsx";
import { categories, registryItems } from "../registry/index.js";
import { categoryDotStyles, categoryIcons, categoryStyles, categorySwatchClasses } from "../registry/categoryTheme.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

export default function HomePage() {
  useDocumentTitle(null);

  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const visibleItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return registryItems.filter((item) => {
      const categoryMatches =
        activeCategory === "all" || item.category === activeCategory;

      const searchable = [item.title, item.description, ...item.tags]
        .join(" ")
        .toLowerCase();

      return categoryMatches && (!normalized || searchable.includes(normalized));
    });
  }, [activeCategory, query]);

  const activeLabel =
    activeCategory === "all"
      ? "All Components"
      : categories.find((category) => category.id === activeCategory)?.label;

  return (
    <main className="mx-auto max-w-[1560px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="relative overflow-hidden rounded-[32px] border border-[var(--chrome-border)] bg-[var(--chrome-surface)] px-5 py-10 shadow-[0_30px_90px_rgba(0,0,0,.28)] sm:px-8 sm:py-12 lg:px-11">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--chrome-border-strong)] to-transparent" />

        <div className="relative grid gap-10 xl:grid-cols-[1fr_430px] xl:items-end">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--chrome-border)] bg-[var(--chrome-hover)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--chrome-text-muted)]">
              <Blocks className="h-3.5 w-3.5 text-amber-300" />
              Free & open-source interface library
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-[var(--chrome-text-primary)] sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
              Clean components.
              <span className="block text-[var(--chrome-text-muted)]">
                Distinct visual personalities.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--chrome-text-muted)] sm:text-base">
              Browse production-ready React blocks with intentional spacing,
              restrained effects, category-specific color systems, and source
              code you fully own — free for personal and commercial use.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition hover:-translate-y-0.5 " +
                    categoryStyles[category.id]
                  }
                >
                  <span className={"h-1.5 w-1.5 rounded-full " + categoryDotStyles[category.id]} />
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--chrome-border)] bg-[var(--chrome-surface-raised)] p-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-[18px] border border-[var(--chrome-border-soft)] bg-[var(--chrome-surface)] p-4">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--chrome-text-primary)]">
                  {registryItems.length}
                </p>
                <p className="mt-1 text-[10px] text-[var(--chrome-text-muted)]">Components</p>
              </div>
              <div className="rounded-[18px] border border-[var(--chrome-border-soft)] bg-[var(--chrome-surface)] p-4">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--chrome-text-primary)]">
                  {categories.length}
                </p>
                <p className="mt-1 text-[10px] text-[var(--chrome-text-muted)]">Categories</p>
              </div>
              <div className="rounded-[18px] border border-[var(--chrome-border-soft)] bg-[var(--chrome-surface)] p-4">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--chrome-text-primary)]">
                  MIT
                </p>
                <p className="mt-1 text-[10px] text-[var(--chrome-text-muted)]">Licensed</p>
              </div>
            </div>

            <div className="mt-2 rounded-[18px] border border-[var(--chrome-border-soft)] bg-[var(--chrome-surface)] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[var(--chrome-text-secondary)]">
                  Color language
                </p>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--chrome-text-faint)]">
                  Category driven
                </span>
              </div>

              <div className="mt-4 grid grid-cols-6 gap-2">
                {categorySwatchClasses.map((color) => (
                  <span key={color} className={"h-8 rounded-xl " + color} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-7 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-[82px] lg:self-start">
          <div className="rounded-[22px] border border-[var(--chrome-border)] bg-[var(--chrome-surface)] p-2.5">
            <div className="px-3 pb-2 pt-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--chrome-text-faint)]">
                Registry
              </p>
            </div>

            <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={[
                  "flex min-w-fit items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-medium transition lg:w-full",
                  activeCategory === "all"
                    ? "border-[var(--chrome-border-strong)] bg-[var(--chrome-hover)] text-[var(--chrome-text-primary)]"
                    : "border-transparent text-[var(--chrome-text-muted)] hover:bg-[var(--chrome-hover)] hover:text-[var(--chrome-text-secondary)]",
                ].join(" ")}
              >
                <Blocks className="h-4 w-4" />
                <span className="flex-1 text-left">All Components</span>
                <span className="text-[10px] text-[var(--chrome-text-faint)]">
                  {registryItems.length}
                </span>
              </button>

              {categories.map((category) => {
                const Icon = categoryIcons[category.id];
                const count = registryItems.filter(
                  (item) => item.category === category.id,
                ).length;

                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={[
                      "flex min-w-fit items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-medium transition lg:w-full",
                      activeCategory === category.id
                        ? categoryStyles[category.id]
                        : "border-transparent text-[var(--chrome-text-muted)] hover:bg-[var(--chrome-hover)] hover:text-[var(--chrome-text-secondary)]",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{category.label}</span>
                    <span className="text-[10px] opacity-60">{count}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-3 hidden rounded-[22px] border border-[var(--chrome-border)] bg-[var(--chrome-surface)] p-4 lg:block">
            <p className="text-xs font-semibold text-[var(--chrome-text-secondary)]">Less visual noise.</p>
            <p className="mt-2 text-[11px] leading-5 text-[var(--chrome-text-muted)]">
              Cleaner surfaces, quieter borders, stronger hierarchy, and color
              used only where it adds meaning.
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-5 flex flex-col gap-3 rounded-[18px] border border-[var(--chrome-border-soft)] bg-[var(--chrome-surface)] p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="px-1">
              <h2 className="text-base font-semibold text-[var(--chrome-text-primary)]">{activeLabel}</h2>
              <p className="mt-1 text-[11px] text-[var(--chrome-text-muted)]">
                {visibleItems.length} component{visibleItems.length === 1 ? "" : "s"} available
              </p>
            </div>

            <label className="flex h-10 w-full items-center gap-2 rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-surface-sunken)] px-3 text-[var(--chrome-text-faint)] focus-within:border-[var(--chrome-border-strong)] sm:w-[290px]">
              <Search className="h-4 w-4 shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search components..."
                className="min-w-0 flex-1 bg-transparent text-xs text-[var(--chrome-text-secondary)] outline-none placeholder:text-[var(--chrome-text-faint)]"
              />
              <kbd className="rounded-md border border-[var(--chrome-border)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--chrome-text-faint)]">
                /
              </kbd>
            </label>
          </div>

          <div className="grid gap-7 xl:grid-cols-2 xl:items-start">
            {visibleItems.map((item) => {
              const Component = item.component;

              return (
                <SnippetBlock
                  key={item.slug}
                  slug={item.slug}
                  title={item.title}
                  description={item.description}
                  filename={item.path}
                  code={item.source}
                  tags={item.tags}
                  category={item.category}
                  dependencies={item.dependencies}
                >
                  <Component />
                </SnippetBlock>
              );
            })}

            {visibleItems.length === 0 && (
              <div className="rounded-[26px] border border-dashed border-[var(--chrome-border-strong)] bg-[var(--chrome-surface)] px-6 py-20 text-center xl:col-span-2">
                <Search className="mx-auto h-5 w-5 text-[var(--chrome-text-faint)]" />
                <p className="mt-4 text-sm font-medium text-[var(--chrome-text-secondary)]">
                  No components found.
                </p>
                <p className="mt-2 text-xs text-[var(--chrome-text-muted)]">
                  Try another category or a broader search term.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
