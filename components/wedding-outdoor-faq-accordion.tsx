"use client";

import { useCallback, useEffect, useState } from "react";

export type WeddingOutdoorFaqEntry = {
  id: string;
  question: string;
  answer: string;
};

function useHashSyncedOpenId(items: readonly WeddingOutdoorFaqEntry[]) {
  const findIdFromHash = useCallback(() => {
    if (typeof window === "undefined") return null;
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw.startsWith("wfaq-")) return null;
    const hit = items.find((i) => i.id === raw);
    return hit?.id ?? null;
  }, [items]);

  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fromHash = findIdFromHash();
    if (!fromHash) return;
    queueMicrotask(() => {
      setOpenId(fromHash);
      requestAnimationFrame(() => {
        document.getElementById(fromHash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, [findIdFromHash, items]);

  useEffect(() => {
    const onHashChange = () => {
      const id = findIdFromHash();
      if (id) setOpenId(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [findIdFromHash]);

  return [openId, setOpenId] as const;
}

export function WeddingOutdoorFaqAccordion({ items }: { items: readonly WeddingOutdoorFaqEntry[] }) {
  const [openId, setOpenId] = useHashSyncedOpenId(items);

  return (
    <div className="mx-auto max-w-3xl space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${item.id}-panel`;
        const triggerId = `${item.id}-trigger`;

        return (
          <div
            key={item.id}
            id={item.id}
            className="scroll-mt-24 overflow-hidden rounded-xl border border-stone-600/50 bg-[#161a1d]/90 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-colors hover:border-stone-500/55"
          >
            <h3 className="m-0 text-[0.9375rem] font-semibold leading-snug text-white sm:text-base">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex min-h-[48px] w-full cursor-pointer items-start justify-between gap-3 px-4 py-3.5 text-left font-semibold tracking-tight transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c9a24a]/70 sm:min-h-[52px] sm:px-5 sm:py-4"
              >
                <span className="pt-0.5 pr-2">{item.question}</span>
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-stone-500/40 text-sm font-normal text-[#edc16c] transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-45" : "rotate-0"} motion-reduce:rotate-0`}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="border-t border-stone-600/40 px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
                  <p className="pt-3 text-[13px] leading-snug text-stone-300 sm:text-sm sm:leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
