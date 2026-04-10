/**
 * Shared primary CTAs (“Book Now” + matching “Call Now”) — rich gold/yellow fill, black text, defined border.
 * Polished hover/active; used site-wide for consistency.
 */

const goldCtaCore =
  "touch-manipulation font-extrabold tracking-[0.02em] text-[#0a0a0a] bg-gradient-to-b from-[#fceea3] from-[-20%] via-[#eecf5a] to-[#d9b03d] to-[120%] border-[3px] border-[#8f6820] shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.45)] transition hover:from-[#fff3c2] hover:via-[#f0d66e] hover:to-[#e0bc4a] hover:border-[#7a5a18] hover:shadow-[0_4px_18px_rgba(0,0,0,0.28)] active:scale-[0.98] [font-family:var(--font-display)]";

const headerSize =
  "inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2.5 text-sm leading-tight sm:px-5 sm:py-3 sm:text-base md:text-lg";

/** Header / top bar — Book Now */
export const bookNowHeaderClass = `${headerSize} ${goldCtaCore}`;

/**
 * Homepage hero photo — Call Now, same visual weight as header Book Now, with ring + shadow for readability on photos.
 */
export const callNowHeroClass = `${headerSize} ${goldCtaCore} ring-2 ring-black/25 shadow-[0_8px_36px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.25)]`;

/** Hero, content sections, bottom CTA band */
export const bookNowSectionClass = `inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base leading-snug sm:px-8 sm:py-4 sm:text-xl md:text-2xl md:py-[1.125rem] ${goldCtaCore}`;

/** Fixed bottom bar on mobile */
export const bookNowStickyClass = `rounded-full px-4 py-3.5 text-center text-base leading-snug sm:py-4 sm:text-xl ${goldCtaCore}`;
