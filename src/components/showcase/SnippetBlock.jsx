import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Code2, Copy, Eye, Link2 } from "lucide-react";

const themes = {
  fintech: {
    preview: "preview-fintech",
    line: "bg-emerald-400",
    badge: "border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-300",
  },
  dashboard: {
    preview: "preview-dashboard",
    line: "bg-blue-400",
    badge: "border-blue-300/15 bg-blue-300/[0.06] text-blue-300",
  },
  interactive: {
    preview: "preview-interactive",
    line: "bg-amber-400",
    badge: "border-amber-300/15 bg-amber-300/[0.06] text-amber-300",
  },
  buttons: {
    preview: "preview-buttons",
    line: "bg-rose-400",
    badge: "border-rose-300/15 bg-rose-300/[0.06] text-rose-300",
  },
  loaders: {
    preview: "preview-loaders",
    line: "bg-lime-400",
    badge: "border-lime-300/15 bg-lime-300/[0.06] text-lime-300",
  },
  forms: {
    preview: "preview-forms",
    line: "bg-sky-400",
    badge: "border-sky-300/15 bg-sky-300/[0.06] text-sky-300",
  },
};

function legacyCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

export default function SnippetBlock({
  title,
  description,
  filename,
  code,
  tags = [],
  category = "dashboard",
  slug,
  linkToDetail = true,
  dependencies = [],
  children,
}) {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState("preview");
  const timer = useRef(null);
  const theme = themes[category] ?? themes.dashboard;

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function copyCode() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        legacyCopy(code);
      }
    } catch {
      legacyCopy(code);
    }

    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1700);
  }

  const lines = code.replace(/\s+$/, "").split("\n");

  return (
    <article className="overflow-hidden rounded-[28px] border border-[var(--chrome-border)] bg-[var(--chrome-surface)] shadow-[0_18px_70px_rgba(0,0,0,.28)]">
      <div className={"h-[2px] w-full " + theme.line} />

      <header className="px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {linkToDetail && slug ? (
                <Link
                  to={`/components/${slug}`}
                  className="group inline-flex items-center gap-1.5 text-lg font-semibold tracking-[-0.025em] text-[var(--chrome-text-primary)] hover:underline sm:text-xl"
                >
                  <h2 className="inline">{title}</h2>
                  <Link2 className="h-3.5 w-3.5 shrink-0 text-[var(--chrome-text-muted)] opacity-0 transition group-hover:opacity-100" />
                </Link>
              ) : (
                <h2 className="text-lg font-semibold tracking-[-0.025em] text-[var(--chrome-text-primary)] sm:text-xl">{title}</h2>
              )}
              <span className={"rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] " + theme.badge}>Ready</span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--chrome-text-muted)]">{description}</p>

            {dependencies.length > 0 && (
              <p className="mt-2 font-mono text-[10px] text-[var(--chrome-text-faint)]">
                deps: {dependencies.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-lg border border-[var(--chrome-border)] bg-[var(--chrome-hover)] px-2.5 py-1 text-[10px] font-medium text-[var(--chrome-text-muted)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[var(--chrome-border-soft)] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit rounded-xl border border-[var(--chrome-border)] bg-black/20 p-1">
            <button
              type="button"
              onClick={() => setView("preview")}
              className={[
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold transition",
                view === "preview" ? "bg-zinc-100 text-zinc-950 shadow-sm" : "text-[var(--chrome-text-muted)] hover:text-[var(--chrome-text-primary)]",
              ].join(" ")}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setView("code")}
              className={[
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold transition",
                view === "code" ? "bg-zinc-100 text-zinc-950 shadow-sm" : "text-[var(--chrome-text-muted)] hover:text-[var(--chrome-text-primary)]",
              ].join(" ")}
            >
              <Code2 className="h-3.5 w-3.5" />
              Code
            </button>
          </div>

          <button
            type="button"
            onClick={copyCode}
            className={[
              "inline-flex h-9 items-center justify-center gap-2 rounded-xl border px-3.5 text-[11px] font-semibold transition",
              copied
                ? "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-300"
                : "border-[var(--chrome-border)] bg-[var(--chrome-hover)] text-[var(--chrome-text-secondary)] hover:bg-[var(--chrome-border)] hover:text-[var(--chrome-text-primary)]",
            ].join(" ")}
            aria-live="polite"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      </header>

      {view === "preview" ? (
        <div className={"preview-grid relative min-h-[390px] overflow-hidden border-t border-white/[0.06] p-4 sm:p-6 lg:p-8 " + theme.preview}>
          <div className="relative flex min-h-[330px] items-center justify-center">{children}</div>
        </div>
      ) : (
        <div className="border-t border-white/[0.06] bg-[#070709]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-300/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-300/70" />
            </div>
            <p className="max-w-[70%] truncate font-mono text-[10px] text-zinc-700">{filename}</p>
          </div>
          <pre className="code-scrollbar max-h-[620px] overflow-auto py-4 text-[12px] leading-6 sm:text-[13px]">
            <code>
              {lines.map((line, index) => (
                <span key={String(index) + line} className="grid min-w-max grid-cols-[3.5rem_1fr] px-4 sm:px-5">
                  <span aria-hidden="true" className="select-none pr-4 text-right font-mono text-zinc-800">{index + 1}</span>
                  <span className="pr-6 font-mono text-zinc-300">{line || " "}</span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      )}
    </article>
  );
}
