"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="rounded-2xl border border-stone-200 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-stone-900">{item.question}</span>
              <span className="text-xl text-stone-500">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? <p className="px-5 pb-5 text-sm leading-relaxed text-stone-600">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}