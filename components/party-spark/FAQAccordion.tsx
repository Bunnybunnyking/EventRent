"use client";

import { useId, useState } from "react";

const FAQ_ITEMS = [
  {
    q: "How do I name a party?",
    a: "Start with who it’s for, the vibe you want people to feel, and one memorable hook (a place, season, or inside joke that still makes sense on an invite). The Party Spark Generator bundles those into names you can text, share, or drop into a group chat.",
  },
  {
    q: "What is a good graduation party name?",
    a: "Good graduation names sound personal without being too long—think “send-off,” “next chapter,” or a nod to your school or backyard setup. Pick a name that reads well on a yard sign and in a calendar invite.",
  },
  {
    q: "What can I do this weekend with friends or family?",
    a: "Try a themed cookout, lawn games + pizza night, or a simple backyard hang with a covered area if weather is iffy. Use Surprise mode if you want a playful starting idea fast.",
  },
  {
    q: "What size tent do I need for 40–60 guests?",
    a: "Guest count is only one input—layout and service style matter too. Many 40–60 guest plans start around a 20x30 footprint as a planning anchor, then adjust for buffet lines, bars, and seating style.",
  },
  {
    q: "Can I text myself my party idea?",
    a: "Yes. After you generate results, open a card, tap “Text Me This Party Idea,” and we’ll help you save the name, invite line, and a suggested setup starting point. No email is required to see your ideas first.",
  },
  {
    q: "Can Connecticut Party Rentals help with tents, tables, and chairs?",
    a: "Yes—this tool is a fun starting point, and our team can confirm sizing, delivery, and setup for your real site, date, and guest count when you’re ready for a quote.",
  },
];

export function FAQAccordion() {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#E6E1D8] rounded-2xl border border-[#E6E1D8] bg-white">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        const id = `${base}-panel-${i}`;
        const btn = `${base}-btn-${i}`;
        return (
          <div key={item.q} className="px-4 py-1 sm:px-5">
            <h3>
              <button
                type="button"
                id={btn}
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 py-4 text-left text-[15px] font-semibold text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2"
              >
                {item.q}
                <span className="text-[#C8A24A] transition-transform" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>
                  +
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div id={id} role="region" aria-labelledby={btn} className="pb-4 text-sm leading-relaxed text-[#555555]">
                {item.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
