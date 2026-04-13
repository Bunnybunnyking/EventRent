/**
 * Reusable affordance classes: premium, obvious interaction without loud UI.
 * Use on cards, text links, and pills site-wide for consistency.
 */

/** Full-width or block links that behave as cards */
export const interactiveCardClass =
  "group relative cursor-pointer rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-200 " +
  "hover:-translate-y-0.5 hover:border-[#b78a2d]/55 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] " +
  "active:translate-y-0 active:brightness-[0.99]";

/** Smaller tile (popular sizes, dense grids) */
export const interactiveTileClass =
  "group cursor-pointer rounded-xl border border-stone-200 bg-white shadow-sm transition duration-200 " +
  "hover:-translate-y-0.5 hover:border-[#b78a2d]/50 hover:shadow-md " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2";

/** Primary gold-adjacent inline links (body copy) */
export const textLinkAccentClass =
  "font-semibold text-[#8a6218] underline decoration-[#d4b87a] decoration-2 underline-offset-[3px] " +
  "transition hover:text-stone-900 hover:decoration-stone-600 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 rounded-sm";

/** Neutral text links on light backgrounds */
export const textLinkNeutralClass =
  "font-semibold text-stone-900 underline underline-offset-4 decoration-stone-300 " +
  "transition hover:decoration-[#b78a2d] hover:text-stone-950 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 rounded-sm";

/** Category / filter chips (unselected) */
export const filterChipClass =
  "cursor-pointer rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 shadow-sm " +
  "transition hover:border-stone-300 hover:bg-stone-50 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2";

/** Row hint at bottom of cards (View guide →) */
export const cardRowHintClass =
  "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8a6d3a] transition group-hover:gap-2";
