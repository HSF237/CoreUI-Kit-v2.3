import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SnippetBlock from "../components/showcase/SnippetBlock.jsx";
import { registryItems } from "../registry/index.js";
import { categoryIcons, categoryStyles } from "../registry/categoryTheme.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ComponentDetailPage() {
  const { slug } = useParams();
  const item = registryItems.find((entry) => entry.slug === slug);

  useDocumentTitle(item ? item.title : "Component not found");

  if (!item) return <NotFoundPage />;

  const Component = item.component;
  const CategoryIcon = categoryIcons[item.category];
  const related = registryItems
    .filter((entry) => entry.category === item.category && entry.slug !== item.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-[1000px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--chrome-text-muted)] transition hover:text-[var(--chrome-text-primary)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All components
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold " + categoryStyles[item.category]}
        >
          <CategoryIcon className="h-3 w-3" />
          {item.category}
        </span>
      </div>

      <div className="mt-6">
        <SnippetBlock
          slug={item.slug}
          title={item.title}
          description={item.description}
          filename={item.path}
          code={item.source}
          tags={item.tags}
          category={item.category}
          dependencies={item.dependencies}
          linkToDetail={false}
        >
          <Component />
        </SnippetBlock>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-[var(--chrome-text-secondary)]">
            More from {item.category}
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((entry) => (
              <Link
                key={entry.slug}
                to={`/components/${entry.slug}`}
                className="rounded-2xl border border-[var(--chrome-border)] bg-[var(--chrome-surface)] p-4 transition hover:border-[var(--chrome-border-strong)]"
              >
                <p className="text-sm font-medium text-[var(--chrome-text-primary)]">{entry.title}</p>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-[var(--chrome-text-muted)]">
                  {entry.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
