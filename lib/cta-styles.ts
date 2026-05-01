/**
 * Site-wide primary CTA system, “Book Consultation” & “Call Now”
 * Champagne antique gold gradient, warm near-black text, inset gloss + hover lift.
 */

/** Shared visual language for all gold CTAs, compact, soft shine, restrained hover */
export const goldCtaCore =
  [
    "touch-manipulation cursor-pointer select-none", "font-bold tracking-[0.03em] text-[#1a140c]", "bg-gradient-to-b from-[#faf6eb] via-[#e4c96e] to-[#9f7322]", "ring-1 ring-inset ring-white/40", "border-2 border-[#6b5420]", /* Soft depth + subtle top highlight (shine) without loud outer glow */
    "shadow-[0_2px_10px_rgba(95,72,28,0.2),inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-1px_0_rgba(0,0,0,0.06),inset_0_8px_14px_-6px_rgba(255,255,255,0.15)]", "transition-[transform,box-shadow,filter,border-color] duration-150 ease-out", "hover:from-[#fcf9f2] hover:via-[#ebd07c] hover:to-[#a67c28] hover:border-[#5c4a1c] hover:ring-white/48", "hover:shadow-[0_4px_16px_rgba(95,72,28,0.26),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(0,0,0,0.05),inset_0_10px_18px_-8px_rgba(255,255,255,0.18)]", "hover:brightness-[1.012]", "active:scale-[0.99] active:brightness-[0.99]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f2]", "disabled:pointer-events-none disabled:opacity-50 disabled:grayscale-[0.2]", "[font-family:var(--font-display)]", ].join(" ");

const headerShell =
  "inline-flex shrink-0 items-center justify-center rounded-full min-h-[40px] px-4 py-2 text-[13px] leading-tight sm:min-h-[42px] sm:px-5 sm:py-2 sm:text-sm md:text-[15px]";

/** Header, primary quote / consultation CTA */
export const bookNowHeaderClass = `${headerShell} ${goldCtaCore}`;

/** Specular highlight strip (header gold pills); pair with inner `<span className="relative z-10">` for label. */
const goldHeaderShine =
  "relative overflow-hidden after:pointer-events-none after:absolute after:inset-x-[6%] after:top-px after:h-[40%] after:rounded-full after:bg-gradient-to-b after:from-white/55 after:via-white/18 after:to-transparent after:opacity-90";

/** Matched soft gold halo for paired stacked header CTAs (consult + online). */
const headerTwinGlow =
  "shadow-[0_2px_12px_rgba(95,72,28,0.22),0_0_26px_rgba(228,201,110,0.2),inset_0_1px_0_rgba(255,255,255,0.42)] hover:shadow-[0_4px_18px_rgba(95,72,28,0.26),0_0_32px_rgba(228,201,110,0.28),inset_0_1px_0_rgba(255,255,255,0.5)]";

/** Primary CTA with same shine + glow as Browse inventory (homepage header pair). */
export const bookNowHeaderHomeAccentClass = [bookNowHeaderClass, goldHeaderShine, headerTwinGlow].join(" ");

/** Site header: smaller stacked “Book Consultation” (static gloss + twin glow). */
const homeHeaderStackShell =
  "inline-flex w-full max-w-[11.5rem] items-center justify-center rounded-full min-h-[32px] px-2.5 py-1 text-[10px] leading-tight ring-1 ring-inset ring-white/45 sm:max-w-[12.75rem] sm:min-h-[34px] sm:px-3 sm:py-1.5 sm:text-[11px]";

export const bookNowHeaderHomeStackConsultClass = [
  homeHeaderStackShell,
  goldCtaCore,
  goldHeaderShine,
  headerTwinGlow,
].join(" ");

/**
 * Site header stacked “Book Online” — match consult styling; pair with `.ctp-home-book-online-sheen` child for subtle sweep animation (see `globals.css`).
 */
export const bookNowHeaderHomeStackOnlineClass = [
  homeHeaderStackShell,
  goldCtaCore,
  goldHeaderShine,
  headerTwinGlow,
  "isolate",
].join(" ");

/**
 * Header “Browse inventory”, same shell as primary CTA, compact caps, soft outer glow + top shine.
 */
export const browseInventoryHeaderClass = [
  bookNowHeaderClass, goldHeaderShine, "whitespace-nowrap text-[10px] uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.11em] md:text-[13px] md:tracking-[0.12em]", headerTwinGlow, ].join(" ");

/**
 * Homepage hero, Call Now on photo (extra lift + ring so gold stays legible on imagery).
 */
export const callNowHeroClass = `${headerShell} ${goldCtaCore} ring-2 ring-black/30 shadow-[0_6px_22px_rgba(0,0,0,0.32),0_0_0_1px_rgba(0,0,0,0.1)]`;

/**
 * Photo overlay: translucent dark pill with gold border (not solid gold). Use on hero imagery where the
 * background should show through slightly—e.g. wedding page “CATALOG & Reserve A Tent”.
 */
export const catalogReserveGlassHeroClass = [
  "inline-flex shrink-0 items-center justify-center rounded-full text-balance",
  "min-h-[40px] max-w-[min(calc(100vw-5.5rem),16rem)] px-3 py-2 text-center text-[0.625rem] font-semibold leading-snug tracking-wide sm:min-h-[42px] sm:max-w-none sm:px-5 sm:text-xs md:text-sm md:leading-tight",
  "border-2 border-[#b78a2d]/75 bg-black/25 text-[#faf3e6]/95 backdrop-blur-[3px] sm:bg-black/30 sm:backdrop-blur-sm",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_18px_rgba(0,0,0,0.28)]",
  "transition hover:border-[#e4c96e]/90 hover:bg-black/40 hover:text-white",
  "[font-family:var(--font-display)]",
  "touch-manipulation select-none",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24a] focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
].join(" ");

/** Section / hero, Book Consultation (largest label) */
export const bookNowSectionClass =
  `inline-flex items-center justify-center rounded-full min-h-[44px] px-5 py-2.5 text-[15px] leading-tight sm:min-h-[46px] sm:px-7 sm:py-3 sm:text-base md:text-lg md:py-[0.95rem] ${goldCtaCore}`;

/** Contact / quote form footer: smaller gold pills with extra specular shine + soft outer glow (pair label with `<span className="relative z-10">`). */
const quoteFooterShine =
  "relative overflow-hidden after:pointer-events-none after:absolute after:inset-x-[4%] after:top-px after:h-[44%] after:rounded-full after:bg-gradient-to-b after:from-white/62 after:via-white/25 after:to-transparent after:opacity-95";

const quoteFooterGlow =
  "shadow-[0_3px_16px_rgba(95,72,28,0.24),0_0_22px_rgba(228,201,110,0.2),inset_0_1px_0_rgba(255,255,255,0.52),inset_0_-1px_0_rgba(0,0,0,0.05),inset_0_10px_20px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_5px_22px_rgba(95,72,28,0.28),0_0_32px_rgba(228,201,110,0.26),inset_0_1px_0_rgba(255,255,255,0.58),inset_0_-1px_0_rgba(0,0,0,0.04)]";

export const bookNowQuoteFooterClass = [
  "inline-flex w-full items-center justify-center rounded-full min-h-[40px] px-4 py-2 text-sm font-bold leading-tight sm:min-h-[42px] sm:px-5 sm:py-2.5 sm:text-[0.9375rem]",
  goldCtaCore,
  quoteFooterShine,
  quoteFooterGlow,
].join(" ");

/**
 * Section, Call Now / Call + phone (slightly smaller type so long numbers wrap cleanly).
 */
export const callNowSectionClass =
  `inline-flex max-w-full items-center justify-center rounded-full min-h-[44px] px-5 py-2.5 text-center text-[15px] leading-snug sm:min-h-[46px] sm:px-6 sm:py-3 sm:text-base md:text-lg md:py-3 ${goldCtaCore}`;

/** Sticky mobile bar, full-width tap targets */
export const bookNowStickyClass =
  `inline-flex w-full items-center justify-center rounded-full min-h-[48px] px-3 py-2.5 text-center text-sm font-bold leading-snug sm:min-h-[50px] sm:px-4 sm:py-3 sm:text-[15px] ${goldCtaCore}`;

/** Alias: sticky Call uses same shell as Book */
export const callNowStickyClass = bookNowStickyClass;

/** Sticky mobile bar: secondary action (outline) so two pills are not competing gold */
export const mobileStickyOutlineClass =
  "inline-flex w-full select-none items-center justify-center rounded-full min-h-[48px] border-2 border-stone-800 bg-white px-3 py-2.5 text-center text-sm font-bold leading-snug text-stone-900 shadow-sm transition hover:bg-stone-50 active:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24a] focus-visible:ring-offset-2 focus-visible:ring-offset-white [font-family:var(--font-display)] touch-manipulation";
