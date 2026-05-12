/**
 * Mobile booking UX — URLs and labels used with `md:hidden` / responsive patterns.
 * Desktop copy and flows stay unchanged elsewhere.
 */

export const EVENT_LIST_HREF = "/wishlist";
export const FAST_QUOTE_HREF = "/contact#quote";

export const LABEL_BUILD_EVENT_LIST = "Build My Event List";
/** Homepage mobile hero primary link — prefer “reserve” language over generic “quote.” */
export const LABEL_GET_FAST_QUOTE = "Reserve a Tent";
/** Shown inside the mobile sticky call pill instead of digits (`StickyMobileCTA`). Full number stays in `tel:` + `aria-label`. */
export const LABEL_CALL_NOW = "Call Now";

/** Subtle text-link classes for secondary actions on mobile */
export const mobileTextLinkClass =
  "text-sm font-semibold text-[#7a5a18] underline decoration-[#d4bc88] underline-offset-[3px] transition hover:text-stone-900 hover:decoration-stone-600";
