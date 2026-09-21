import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "We replaced three internal tools with components copied straight from this registry. Shipped our new dashboard in a week.",
    name: "Priya Nair",
    role: "Engineering Lead, Flowstack",
  },
  {
    quote: "The code is clean enough that our design system team just adopted the spacing scale wholesale.",
    name: "Daniel Cho",
    role: "Staff Designer, Ledgerly",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  function go(direction) {
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  }

  return (
    <section aria-roledescription="carousel" aria-label="Customer testimonials" className="w-full max-w-2xl rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-6 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-8">
      <Quote className="h-8 w-8 text-fuchsia-300/50" aria-hidden="true" />
      <div role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${testimonials.length}`}>
        <p role="status" aria-live="polite" className="mt-4 text-lg leading-8 text-[var(--text-primary,#e2e8f0)] sm:text-xl">
          "{active.quote}"
        </p>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-300 to-violet-500 text-sm font-semibold text-[var(--text-on-accent,#020617)]">
              {active.name.split(" ").map((part) => part[0]).join("")}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{active.name}</p>
              <p className="text-xs text-[var(--text-subtle,#475569)]">{active.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-300">
            <span className="sr-only">Rated 5 out of 5 stars</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-[var(--border,rgba(255,255,255,.1))] pt-5">
        <div className="flex items-center gap-1.5">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={"h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300 " + (i === index ? "w-6 bg-fuchsia-300" : "w-1.5 bg-white/15")}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.03] text-[var(--text-tertiary,#94a3b8)] transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border,rgba(255,255,255,.1))] bg-white/[0.03] text-[var(--text-tertiary,#94a3b8)] transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
