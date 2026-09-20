import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is CoreUI-Kit really free to use commercially?",
    a: "Yes. Everything in the registry is MIT licensed — use it in personal, client or commercial projects with no attribution required.",
  },
  {
    q: "Do I need to install a package?",
    a: "No runtime package. You copy the component source directly into your project, so there's nothing to version or update later.",
  },
  {
    q: "Which frameworks are supported?",
    a: "Every block is plain React and Tailwind CSS. It drops into any React setup — Vite, Next.js, Remix — without extra configuration.",
  },
  {
    q: "Can I customize the components?",
    a: "Since you own the source the moment you copy it, you can restyle, extend or strip down any block exactly like code you wrote yourself.",
  },
];

export default function FaqAccordion() {
  const [openIndexes, setOpenIndexes] = useState(() => new Set([0]));
  const baseId = useId();

  function toggle(index) {
    setOpenIndexes((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section className="w-full max-w-2xl">
      <div className="divide-y divide-white/10 overflow-hidden rounded-[26px] border border-white/10 bg-[#0d0d10]">
        {faqs.map((item, index) => {
          const open = openIndexes.has(index);
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;
          return (
            <div key={item.q} className="px-5 py-4 sm:px-6">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300"
                >
                  <span className="text-sm font-medium text-slate-200 sm:text-[15px]">{item.q}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={"h-4 w-4 shrink-0 text-slate-600 transition-transform " + (open ? "rotate-180 text-fuchsia-300" : "")}
                  />
                </button>
              </h3>
              {open && (
                <p id={panelId} role="region" aria-labelledby={buttonId} className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
