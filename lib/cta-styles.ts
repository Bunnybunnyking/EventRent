/**
 * Shared primary CTA (“Book Now”) styles — high contrast, bold, readable on mobile/tablet/desktop.
 * Use with Link or <a>; keep href as /contact#quote for booking flow.
 */

/** Header / top bar — compact row, still bold */
export const bookNowHeaderClass =
  "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-full bg-gradient-to-b from-[#e8bc5c] via-[#c99d42] to-[#9e7324] px-4 py-2.5 text-sm font-extrabold leading-tight tracking-[0.04em] text-[#0f0d0a] shadow-[0_4px_16px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] ring-2 ring-[#f5e0b3]/45 transition hover:brightness-105 hover:ring-[#fff8e6]/60 active:scale-[0.98] sm:px-5 sm:py-3 sm:text-base md:text-lg [font-family:var(--font-display)]";

/** Hero, content sections, bottom CTA band — largest tap target */
export const bookNowSectionClass =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#e8bc5c] via-[#c99d42] to-[#9e7324] px-6 py-3.5 text-base font-extrabold leading-snug tracking-[0.03em] text-[#0f0d0a] shadow-[0_6px_22px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] ring-2 ring-[#f5e0b3]/40 transition hover:brightness-105 hover:ring-[#fff8e6]/55 active:scale-[0.98] sm:px-8 sm:py-4 sm:text-lg md:text-xl [font-family:var(--font-display)]";

/** Fixed bottom bar on mobile */
export const bookNowStickyClass =
  "touch-manipulation rounded-full bg-gradient-to-b from-[#e8bc5c] via-[#c99d42] to-[#9e7324] px-4 py-3.5 text-center text-base font-extrabold leading-snug tracking-[0.03em] text-[#0f0d0a] shadow-[0_4px_18px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] ring-2 ring-[#f5e0b3]/35 transition hover:brightness-105 active:scale-[0.98] sm:py-4 sm:text-lg [font-family:var(--font-display)]";
