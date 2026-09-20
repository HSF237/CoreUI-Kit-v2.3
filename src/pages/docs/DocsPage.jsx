import { useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { docsPages, getDocPage } from "../../content/docs.js";
import { useDocumentTitle } from "../../hooks/useDocumentTitle.js";
import NotFoundPage from "../NotFoundPage.jsx";

export default function DocsPage() {
  const { slug } = useParams();
  const page = getDocPage(slug ?? docsPages[0].slug);

  useDocumentTitle(page ? `Docs · ${page.title}` : "Docs");

  if (!page) return <NotFoundPage />;

  return (
    <article className="rounded-[26px] border border-[var(--chrome-border)] bg-[var(--chrome-surface)] p-6 sm:p-9">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--chrome-text-faint)]">
        Docs
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--chrome-text-primary)] sm:text-3xl">
        {page.title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--chrome-text-muted)]">{page.summary}</p>

      <div className="mt-8 space-y-8">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-base font-semibold text-[var(--chrome-text-primary)]">
              {section.heading}
            </h2>

            {section.paragraphs?.map((paragraph, index) => (
              <p key={index} className="mt-3 max-w-2xl text-[13px] leading-6 text-[var(--chrome-text-secondary)]">
                {paragraph}
              </p>
            ))}

            {section.list && (
              <ul className="mt-3 space-y-2">
                {section.list.map((entry) => (
                  <li key={entry} className="flex items-start gap-2.5 text-[13px] leading-6 text-[var(--chrome-text-secondary)]">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-300">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {entry}
                  </li>
                ))}
              </ul>
            )}

            {section.code && (
              <pre className="code-scrollbar mt-3 overflow-x-auto rounded-2xl border border-[var(--chrome-border)] bg-[#070709] p-4 text-[12px] leading-6 text-zinc-300">
                <code>{section.code}</code>
              </pre>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
