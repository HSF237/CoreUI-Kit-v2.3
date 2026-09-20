import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

export default function NotFoundPage() {
  useDocumentTitle("Page not found");

  return (
    <main className="mx-auto flex max-w-[720px] flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--chrome-border)] bg-[var(--chrome-surface)] text-[var(--chrome-text-muted)]">
        <Compass className="h-6 w-6" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold text-[var(--chrome-text-primary)]">
        We couldn't find that page.
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--chrome-text-muted)]">
        The component or doc you're looking for may have been renamed or removed. Try
        searching instead.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-hover)] px-4 py-2.5 text-sm font-semibold text-[var(--chrome-text-primary)] transition hover:bg-[var(--chrome-border)]"
      >
        Back to all components
      </Link>
    </main>
  );
}
