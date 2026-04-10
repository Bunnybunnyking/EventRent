/**
 * Shared primary CTA (“Book Now”) — high-contrast white field, gold border, near-black text.
 * Tuned for bold, large, readable labels on all viewports.
 */

const bookNowCore =
  "touch-manipulation font-extrabold tracking-[0.02em] text-[#0a0a0a] bg-white border-[3px] border-[#b78a2d] shadow-[0_2px_10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(183,138,45,0.25)] transition hover:bg-[#fffbf0] hover:border-[#9e7324] hover:shadow-[0_4px_16px_rgba(183,138,45,0.35)] active:scale-[0.98] [font-family:var(--font-display)]";

/** Header / top bar */
export const bookNowHeaderClass =
  `inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2.5 text-sm leading-tight sm:px-5 sm:py-3 sm:text-base md:text-lg ${bookNowCore}`;

/** Hero, content sections, bottom CTA band */
export const bookNowSectionClass =
  `inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base leading-snug sm:px-8 sm:py-4 sm:text-xl md:text-2xl md:py-[1.125rem] ${bookNowCore}`;

/** Fixed bottom bar on mobile */
export const bookNowStickyClass =
  `rounded-full px-4 py-3.5 text-center text-base leading-snug sm:py-4 sm:text-xl ${bookNowCore}`;
