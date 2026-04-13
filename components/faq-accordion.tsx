"use client";

import { useCallback, useEffect, useState } from "react";

type FaqItem = { id?: string; question: string; answer: string };

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const findIndexFromHash = useCallback(() => {
    if (typeof window === "undefined") return null;
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw.startsWith("faq-")) return null;
    const id = raw.slice("faq-".length);
    const idx = items.findIndex((i) => i.id === id);
    return idx >= 0 ? idx : null;
  }, [items]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const idx = findIndexFromHash();
    if (idx !== null) {
      setOpenIndex(idx);
      const id = items[idx]?.id;
      if (id) {
        requestAnimationFrame(() => {
          document.getElementById(`faq-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }, [findIndexFromHash, items]);

  useEffect(() => {
    const onHashChange = () => {
      const idx = findIndexFromHash();
      if (idx !== null) setOpenIndex(idx);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [findIndexFromHash]);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const anchorId = item.id ? `faq-${item.id}` : undefined;
        const panelId = item.id ? `faq-panel-${item.id}` : `faq-panel-${index}`;
        const triggerId = item.id ? `faq-trigger-${item.id}` : `faq-trigger-idx-${index}`;
        return (
          <div
            key={item.question}
            id={anchorId}
            className="scroll-mt-28 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-stone-300"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={triggerId}
              className="flex min-h-[52px] w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c9a228]"
            >
              <span className="font-medium text-stone-900">{item.question}</span>
              <span className="shrink-0 text-xl tabular-nums text-stone-500" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <div id={panelId} role="region" aria-labelledby={triggerId} className="border-t border-stone-100 px-5 pb-5 pt-0">
                <p className="pt-4 text-sm leading-relaxed text-stone-600">{item.answer}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
