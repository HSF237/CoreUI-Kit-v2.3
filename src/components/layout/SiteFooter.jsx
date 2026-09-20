import { Link } from "react-router-dom";
import { registryItems } from "../../registry/index.js";

export default function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1560px] px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-t border-[var(--chrome-border-soft)] py-6 text-[11px] text-[var(--chrome-text-faint)] sm:flex-row sm:items-center sm:justify-between">
        <p>CoreUI-Kit · Free and open source under the MIT License.</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>
            {registryItems.length} blocks · React · Tailwind CSS · Vite
          </span>
          <Link to="/docs" className="transition hover:text-[var(--chrome-text-secondary)]">
            Docs
          </Link>
          <Link to="/docs/contributing" className="transition hover:text-[var(--chrome-text-secondary)]">
            Contributing
          </Link>
          <a
            href="https://github.com/HSF237/CoreUI-Kit-v2.3"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[var(--chrome-text-secondary)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
