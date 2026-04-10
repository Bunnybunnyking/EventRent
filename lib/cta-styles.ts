/**
 * Site-wide primary CTA system — “Book Now” & “Call Now”
 * Rich gold fill, near-black text, strong contrast, focus rings, premium hover/active.
 * Use `bookNow*` for quote actions; `callNow*` for phone (same gold, slightly smaller text when label includes phone number).
 */

/** Shared visual language for all gold CTAs */
const goldCtaCore =
  [
    "touch-manipulation cursor-pointer select-none",
    "font-extrabold tracking-[0.03em] text-neutral-950",
    "bg-gradient-to-b from-[#f8e9b0] via-[#ebc94a] to-[#c9a228]",
    "border-[3px] border-[#5c4818]",
    "shadow-[0_4px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.5)]",
    "transition-[transform,box-shadow,filter,border-color] duration-150 ease-out",
    "hover:from-[#fff6cc] hover:via-[#f0d65e] hover:to-[#d4b030] hover:border-[#4a3a14]",
    "hover:shadow-[0_8px_28px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.55)]",
    "active:scale-[0.98] active:brightness-[0.96]",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e8c547] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "disabled:pointer-events-none disabled:opacity-50 disabled:grayscale-[0.2]",
    "[font-family:var(--font-display)]",
  ].join(" ");

const headerShell =
  "inline-flex shrink-0 items-center justify-center rounded-full min-h-[44px] px-5 py-2.5 text-sm leading-tight sm:min-h-[48px] sm:px-6 sm:py-3 sm:text-base md:text-lg";

/** Header — Book Now */
export const bookNowHeaderClass = `${headerShell} ${goldCtaCore}`;

/**
 * Homepage hero — Call Now on photo (extra lift + ring so gold stays legible on imagery).
 */
export const callNowHeroClass = `${headerShell} ${goldCtaCore} ring-2 ring-black/35 shadow-[0_10px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.12)]`;

/** Section / hero — Book Now (largest label) */
export const bookNowSectionClass =
  `inline-flex items-center justify-center rounded-full min-h-[52px] px-7 py-3.5 text-lg leading-tight sm:px-9 sm:py-4 sm:text-xl md:text-2xl md:py-[1.125rem] ${goldCtaCore}`;

/**
 * Section — Call Now / Call + phone (slightly smaller type so long numbers wrap cleanly).
 */
export const callNowSectionClass =
  `inline-flex max-w-full items-center justify-center rounded-full min-h-[52px] px-6 py-3.5 text-center text-base leading-snug sm:px-8 sm:py-4 sm:text-lg md:text-xl md:py-[1.05rem] ${goldCtaCore}`;

/** Sticky mobile bar — full-width tap targets */
export const bookNowStickyClass =
  `inline-flex w-full items-center justify-center rounded-full min-h-[52px] px-4 py-3.5 text-center text-base font-extrabold leading-snug sm:min-h-[56px] sm:py-4 sm:text-lg ${goldCtaCore}`;

/** Alias: sticky Call uses same shell as Book */
export const callNowStickyClass = bookNowStickyClass;
