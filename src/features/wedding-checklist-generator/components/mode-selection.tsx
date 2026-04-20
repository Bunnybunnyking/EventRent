"use client";

import type { WeddingMode } from "@/features/wedding-checklist/types";

export function ModeSelection({ onSelect }: { onSelect: (mode: WeddingMode) => void }) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/80">Wedding checklist generator</p>
      <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-4xl">
        How would you like to plan your wedding?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-stone-600">
        Built for lawns, estates, and tented receptions—not a generic mega-list. Pick a depth; your answers save on this device.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <button
          type="button"
          onClick={() => onSelect("quick")}
          className="group flex touch-manipulation flex-col rounded-2xl border border-stone-200/90 bg-white p-6 text-left shadow-sm transition hover:border-[#c9a227]/55 hover:shadow-md active:scale-[0.99]"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6218]">Outdoor / tent quick</span>
          <span className="mt-2 text-xl font-semibold text-stone-900 [font-family:var(--font-display)]">Essentials path</span>
          <span className="mt-2 text-sm leading-relaxed text-stone-600">
            Three short steps, then a tighter checklist focused on tent, weather, power, and guest flow. Best when you want calm clarity fast.
          </span>
          <span className="mt-6 text-sm font-semibold text-[#8a6218] group-hover:underline">Start essentials →</span>
        </button>

        <button
          type="button"
          onClick={() => onSelect("full")}
          className="group flex touch-manipulation flex-col rounded-2xl border border-stone-200/90 bg-white p-6 text-left shadow-sm transition hover:border-[#c9a227]/55 hover:shadow-md active:scale-[0.99]"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/75">Full planner-style</span>
          <span className="mt-2 text-xl font-semibold text-stone-900 [font-family:var(--font-display)]">Detailed path</span>
          <span className="mt-2 text-sm leading-relaxed text-stone-600">
            Four steps and a fuller checklist: timeline, vendors, rentals, and site logistics—still grounded in outdoor and tent reality.
          </span>
          <span className="mt-6 text-sm font-semibold text-emerald-900/85 group-hover:underline">Start detailed →</span>
        </button>
      </div>
    </div>
  );
}
