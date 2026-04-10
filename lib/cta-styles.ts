/**
 * Shared primary CTA (“Book Now”) — white / ivory field, gold border, black text
 * (matches legacy Request a quote / Request a consultation look).
 */

const bookNowCore =
  "touch-manipulation font-semibold text-[#1b1712] bg-white border-2 border-[#b78a2d] shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition hover:bg-[#fffbf0] hover:border-[#a67a28] active:scale-[0.98] [font-family:var(--font-display)]";

/** Header / top bar — compact */
export const bookNowHeaderClass =
  `inline-flex shrink-0 items-center justify-center rounded-full px-3.5 py-2.5 text-[0.75rem] leading-none tracking-[0.04em] sm:px-4 sm:py-2.5 sm:text-sm ${bookNowCore}`;

/** Hero, content sections, bottom CTA band */
export const bookNowSectionClass =
  `inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base leading-snug tracking-[0.03em] sm:px-8 sm:py-4 sm:text-lg md:text-xl ${bookNowCore}`;

/** Fixed bottom bar on mobile */
export const bookNowStickyClass =
  `rounded-full px-4 py-3.5 text-center text-base leading-snug tracking-[0.03em] sm:py-4 sm:text-lg ${bookNowCore}`;
