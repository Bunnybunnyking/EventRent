"use client";

import { useCallback, useEffect, useState } from "react";

type FaqItem = { id?: string; question: string; answer: string };

const faqPanelVariants = {
  default:
    "scroll-mt-28 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-stone-300", gold:
    "scroll-mt-28 overflow-hidden rounded-2xl border border-[#e3d3b0]/90 bg-gradient-to-br from-[#fdf8ed] via-[#faf1dc] to-[#f2e4c4] shadow-[0_2px_20px_rgba(45,35,20,0.06)] transition hover:border-[#d4c4a0] hover:shadow-[0_4px_24px_rgba(45,35,20,0.08)]",
} as const;

export function FAQAccordion({ items, variant = "default" }: { items: FaqItem[]; variant?: keyof typeof faqPanelVariants }) {
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
        const isGold = variant === "gold";
        return (
          <div key={item.question} id={anchorId} className={faqPanelVariants[variant]}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={triggerId}
              className={`flex min-h-[52px] w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c9a228] ${
                isGold ? "hover:bg-white/45" : "hover:bg-stone-50"
              }`}
            >
              <span className={`text-stone-900 ${isGold ? "font-bold" : "font-medium"}`}>{item.question}</span>
              <span className={`shrink-0 text-xl tabular-nums ${isGold ? "text-[#8f6f28]" : "text-stone-500"}`} aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={`border-t px-5 pb-5 pt-0 ${isGold ? "border-[#e3d3b0]/70" : "border-stone-100"}`}
              >
                <p className="pt-4 text-sm leading-relaxed text-stone-700">{item.answer}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
