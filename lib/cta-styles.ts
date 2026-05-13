/**
 * Site-wide primary CTA system, “Book Consultation” & “Call Now”
 * Champagne antique gold gradient, warm near-black text, inset gloss + hover lift.
 */

/** Shared visual language for all gold CTAs — antique champagne → bronze (less “lemon plastic”, more metallic depth). */
export const goldCtaCore =
  [
    "relative overflow-hidden",
    "touch-manipulation cursor-pointer select-none",
    "font-bold tracking-[0.03em] text-[#1a140c]",
    "bg-gradient-to-b from-[#faf6ee] via-[#c49a35] to-[#6a4510]",
    "ring-1 ring-inset ring-white/32",
    "border-2 border-[#4f3510]/95",
    /* Rim light + soft metallic sheen + warm outer bloom */
    "shadow-[0_2px_14px_rgba(42,28,8,0.28),0_0_22px_rgba(180,140,55,0.12),inset_0_1px_0_rgba(255,255,255,0.44),inset_0_-1px_0_rgba(0,0,0,0.08),inset_0_10px_20px_-9px_rgba(255,255,255,0.14)]",
    "transition-[transform,box-shadow,filter,border-color] duration-150 ease-out",
    "hover:from-[#fcf9f3] hover:via-[#cfaa48] hover:to-[#7a5214] hover:border-[#3d280c] hover:ring-white/40",
    "hover:shadow-[0_5px_22px_rgba(42,28,8,0.32),0_0_34px_rgba(200,165,70,0.24),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.05),inset_0_12px_22px_-10px_rgba(255,255,255,0.16)]",
    "hover:brightness-[1.015]",
    "active:scale-[0.99] active:brightness-[0.99]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f2]",
    "disabled:pointer-events-none disabled:opacity-50 disabled:grayscale-[0.2]",
    "[font-family:var(--font-display)]",
  ].join(" ");

const headerShell =
  "inline-flex shrink-0 items-center justify-center rounded-full min-h-[40px] px-4 py-2 text-[13px] leading-tight sm:min-h-[42px] sm:px-5 sm:py-2 sm:text-sm md:text-[15px]";

/** Header, primary quote / consultation CTA */
export const bookNowHeaderClass = `${headerShell} ${goldCtaCore}`;

/** Matched soft gold halo for paired stacked header CTAs (consult + online). */
const headerTwinGlow =
  "shadow-[0_2px_14px_rgba(42,28,8,0.26),0_0_28px_rgba(175,132,48,0.2),inset_0_1px_0_rgba(255,255,255,0.44)] hover:shadow-[0_4px_20px_rgba(42,28,8,0.3),0_0_36px_rgba(190,150,58,0.26),inset_0_1px_0_rgba(255,255,255,0.5)]";

/** Primary CTA with same glow as Browse inventory (homepage header pair). */
export const bookNowHeaderHomeAccentClass = [bookNowHeaderClass, headerTwinGlow].join(" ");

/** Site header: smaller stacked “Book Consultation”. */
const homeHeaderStackShell =
  "inline-flex w-full max-w-[11.5rem] items-center justify-center rounded-full min-h-[32px] px-2.5 py-1 text-[10px] leading-tight ring-1 ring-inset ring-white/45 sm:max-w-[12.75rem] sm:min-h-[34px] sm:px-3 sm:py-1.5 sm:text-[11px]";

export const bookNowHeaderHomeStackConsultClass = [
  homeHeaderStackShell,
  goldCtaCore,
  headerTwinGlow,
].join(" ");

/** Site header stacked “Book Online” (matches consult styling). */
export const bookNowHeaderHomeStackOnlineClass = [
  homeHeaderStackShell,
  goldCtaCore,
  headerTwinGlow,
].join(" ");

/**
 * Header “Browse inventory”, same shell as primary CTA, compact caps, soft outer glow.
 */
export const browseInventoryHeaderClass = [
  bookNowHeaderClass, "whitespace-nowrap text-[10px] uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.11em] md:text-[13px] md:tracking-[0.12em]", headerTwinGlow, ].join(" ");

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

/** Contact / quote form footer: smaller gold pills + soft outer glow (pair label with `<span className="relative z-10">`). */
const quoteFooterGlow =
  "shadow-[0_3px_16px_rgba(42,28,8,0.26),0_0_26px_rgba(175,132,48,0.18),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.06),inset_0_10px_20px_-10px_rgba(255,255,255,0.16)] hover:shadow-[0_5px_22px_rgba(42,28,8,0.3),0_0_34px_rgba(190,150,58,0.24),inset_0_1px_0_rgba(255,255,255,0.58),inset_0_-1px_0_rgba(0,0,0,0.04)]";

export const bookNowQuoteFooterClass = [
  "inline-flex w-full items-center justify-center rounded-full min-h-[40px] px-4 py-2 text-sm font-bold leading-tight sm:min-h-[42px] sm:px-5 sm:py-2.5 sm:text-[0.9375rem]",
  goldCtaCore,
  quoteFooterGlow,
].join(" ");

/**
 * Section, Call Now / Call + phone (slightly smaller type so long numbers wrap cleanly).
 */
export const callNowSectionClass =
  `inline-flex max-w-full items-center justify-center rounded-full min-h-[44px] px-5 py-2.5 text-center text-[15px] leading-snug sm:min-h-[46px] sm:px-6 sm:py-3 sm:text-base md:text-lg md:py-3 ${goldCtaCore}`;

/** Quote / consultation form left rail: gold call pill spans full column width */
export const callNowQuoteSidebarClass = [
  callNowSectionClass,
  "w-full min-w-0 max-w-none justify-center min-h-[52px] px-4 py-3.5 sm:min-h-[54px] sm:px-5 sm:py-4",
].join(" ");

/** Sticky mobile bar, full-width tap targets */
export const bookNowStickyClass =
  `inline-flex w-full items-center justify-center rounded-full min-h-[48px] px-3 py-2.5 text-center text-sm font-bold leading-snug sm:min-h-[50px] sm:px-4 sm:py-3 sm:text-[15px] ${goldCtaCore}`;

/** Alias: sticky Call uses same shell as Book */
export const callNowStickyClass = bookNowStickyClass;

/** Sticky mobile bar: secondary action (outline) so two pills are not competing gold */
export const mobileStickyOutlineClass =
  "inline-flex w-full select-none items-center justify-center rounded-full min-h-[48px] border-2 border-stone-800 bg-white px-3 py-2.5 text-center text-sm font-bold leading-snug text-stone-900 shadow-sm transition hover:bg-stone-50 active:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24a] focus-visible:ring-offset-2 focus-visible:ring-offset-white [font-family:var(--font-display)] touch-manipulation";

/**
 * Mobile sticky bar — Call / Text only: white fill, warm gold rim, bold larger type.
 * (No gold gradient fill—reads cleaner as two outline pills.)
 */
export const stickyMobileGoldButtonClass =
  "inline-flex w-full select-none items-center justify-center rounded-full min-h-[40px] border-2 border-[#b78a2d] bg-white px-2 py-1 text-center text-[16px] font-extrabold leading-none tracking-[0.03em] text-[#1a140c] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(107,84,32,0.12)] transition hover:bg-[#fffdf9] hover:border-[#9f7322] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 focus-visible:ring-offset-white [font-family:var(--font-display)] touch-manipulation";

/**
 * Fixed bottom bar (md:hidden): pairs with warm bar on eventrentct.com —
 * “Call now” = white + gold outline; wishlist = same champagne gold system as header CTAs.
 */

/** “Build My Event List” — site `goldCtaCore` only (no second shadow stack). */
export const stickyMobileBarGoldClass =
  `relative inline-flex h-full min-h-[44px] w-full min-w-0 items-center justify-center overflow-hidden rounded-full px-1.5 py-1 text-center touch-manipulation sm:px-2 ${goldCtaCore}`;

/** “Call now” — white pill, antique gold border (matches live mobile bar intent). */
export const stickyMobileBarCallOutlineClass =
  [
    "inline-flex h-full min-h-[44px] w-full min-w-0 items-center justify-center rounded-full",
    "border-2 border-[#b78a2d]",
    "bg-white",
    "px-2.5 py-1 text-center",
    "shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_2px_rgba(55,44,28,0.06)]",
    "transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out",
    "hover:border-[#9a7322] hover:bg-[#fffdf9]",
    "active:scale-[0.99]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f4]",
    "touch-manipulation select-none",
  ].join(" ");

/** Inline “Text event details” on mobile — same antique gold as site CTAs; pair emerald “Text” in label */
export const smsMobileGoldCtaClass =
  `inline-flex w-full max-w-xs select-none items-center justify-center rounded-full min-h-[44px] px-4 py-2.5 text-center text-sm font-bold leading-snug sm:min-h-[46px] sm:px-5 ${goldCtaCore}`;

/** Compact gold SMS pill (contact card) */
export const smsMobileGoldCtaCompactClass =
  `inline-flex w-full select-none items-center justify-center rounded-full min-h-[40px] px-3 py-2 text-center text-xs font-bold leading-snug sm:text-sm ${goldCtaCore}`;

/** @deprecated Prefer smsMobileGoldCtaClass — kept for any legacy imports */
export const smsOutlineSecondaryClass =
  "inline-flex select-none items-center justify-center rounded-full border-2 border-emerald-800 bg-gradient-to-b from-[#ecfdf5] to-[#d1fae5] px-4 py-2 text-center text-sm font-semibold leading-snug text-emerald-950 shadow-sm transition hover:from-[#d1fae5] hover:to-[#a7f3d0] hover:text-emerald-950 active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 [font-family:var(--font-display)] touch-manipulation";
