import { useId, useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

export default function NewsletterCtaBanner() {
  const [submitted, setSubmitted] = useState(false);
  const emailId = useId();

  function onSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-fuchsia-300/15 bg-[#0d0a0f] p-7 shadow-[0_25px_80px_rgba(0,0,0,.35)] sm:p-9">
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-400/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-fuchsia-200">
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          New components monthly
        </div>
        <h3 className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">Get new blocks in your inbox.</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-[var(--text-muted,#64748b)]">One email whenever a new category ships. No spam, unsubscribe anytime.</p>

        {submitted ? (
          <p role="status" aria-live="polite" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-medium text-emerald-200">
            <Check className="h-4 w-4" aria-hidden="true" />
            You're subscribed — check your inbox to confirm.
          </p>
        ) : (
          <form className="mt-6 flex flex-col gap-2 sm:flex-row" onSubmit={onSubmit}>
            <label htmlFor={emailId} className="sr-only">
              Email address
            </label>
            <input
              id={emailId}
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
              className="min-w-0 flex-1 rounded-xl border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.04] px-4 py-3 text-sm text-[var(--text-primary,#e2e8f0)] outline-none placeholder:text-[var(--text-faint,#334155)] focus:border-fuchsia-300/40"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-300 to-violet-400 px-5 py-3 text-sm font-bold text-[var(--text-on-accent,#020617)] transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-200"
            >
              Subscribe
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
