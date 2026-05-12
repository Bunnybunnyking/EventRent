/**
 * Google Ads quote-request conversion (event snippet).
 * Base tag: `GoogleAdsGtag` in root layout. Fire this only after a confirmed successful quote submission.
 */
const DEFAULT_QUOTE_SEND_TO = "AW-18131224378/vVJkCM6U06UcELqO0sVD";

/** Set before `router.replace("/contact/thank-you")` on successful in-app quote POST. */
export const QUOTE_CONVERSION_SESSION_KEY = "ctpr_quote_conversion_pending";

export function googleAdsQuoteConversionSendTo(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_CONVERSION_SEND_TO?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_ADS_SIGNUP_SEND_TO?.trim();
  return fromEnv || DEFAULT_QUOTE_SEND_TO;
}

type GtagWindow = Window & {
  dataLayer?: IArguments[] | unknown[];
  gtag?: (...args: unknown[]) => void;
};

/**
 * Matches Google’s snippet: `gtag('event', 'conversion', { send_to: 'AW-…/…' })`.
 * Installs the same `gtag` stub as the official tag if needed so the event is queued before gtag.js finishes loading.
 */
export function fireGoogleAdsQuoteConversion(): void {
  if (typeof window === "undefined") return;
  const sendTo = googleAdsQuoteConversionSendTo();
  if (!sendTo) return;

  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    w.gtag = function gtag() {
      w.dataLayer!.push(arguments);
    };
  }
  w.gtag("event", "conversion", { send_to: sendTo });
}

/** @deprecated Use `fireGoogleAdsQuoteConversion` */
export const fireGoogleAdsSignupConversion = fireGoogleAdsQuoteConversion;
