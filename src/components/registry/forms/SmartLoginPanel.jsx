import { useId, useRef, useState } from "react";
import { ArrowRight, Github, LockKeyhole, Mail, Sparkles } from "lucide-react";

export default function SmartLoginPanel() {
  const [submitting, setSubmitting] = useState(false);
  const emailId = useId();
  const passwordId = useId();
  const timeoutRef = useRef(null);

  function onSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSubmitting(false), 1200);
  }

  return (
    <section className="w-full max-w-md overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0d10] p-1 shadow-[0_18px_60px_rgba(0,0,0,.24)]">
      <div className="rounded-[26px] border border-white/10 bg-black/10 p-5 sm:p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-300 to-rose-300 text-slate-950">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-white">Welcome back.</h3>
        <p className="mt-2 text-sm text-slate-600">Sign in to continue building your workspace.</p>

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <div>
            <label htmlFor={emailId} className="sr-only">
              Email address
            </label>
            <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 focus-within:border-indigo-300/30">
              <Mail className="h-4 w-4 text-slate-600" aria-hidden="true" />
              <input
                id={emailId}
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-700"
              />
            </div>
          </div>
          <div>
            <label htmlFor={passwordId} className="sr-only">
              Password
            </label>
            <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 focus-within:border-indigo-300/30">
              <LockKeyhole className="h-4 w-4 text-slate-600" aria-hidden="true" />
              <input
                id={passwordId}
                type="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-700"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? "Signing in…" : "Continue"}
            {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.14em] text-slate-700">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-semibold text-slate-300 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          Continue with GitHub
        </button>
      </div>
    </section>
  );
}
