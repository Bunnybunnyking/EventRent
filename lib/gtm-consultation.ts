/**
 * Consultation / quote thank-you: fires the same event through:
 * 1) `dataLayer.push` — for **Google Tag Manager** Custom Event triggers
 * 2) `gtag('event', …)` — so the **Google tag** (gtag.js loaded via `GoogleAdsGtag`) receives the event for GA4 / linked tags
 *
 * Env: `NEXT_PUBLIC_GTM_CONSULTATION_EVENT` (default: `consultation_submit`).
 * In GTM: Trigger → Custom Event → Event name = that value.
 */

export function consultationLeadEventName(): string {
  return process.env.NEXT_PUBLIC_GTM_CONSULTATION_EVENT?.trim() || "consultation_submit";
}

type GtagLikeWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function leadEventParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  return {
    form_type: "book_consultation",
    page_path: window.location.pathname,
    page_location: window.location.href,
  };
}

/** Same tracking used on `/contact/thank-you` after a verified submission (see `GoogleAdsQuoteConversionOnce`). */
export function fireConsultationLeadConversion(): void {
  if (typeof window === "undefined") return;

  const eventName = consultationLeadEventName();
  const params = leadEventParams();

  const w = window as GtagLikeWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: eventName,
    ...params,
  });

  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, params);
  }
}

/** @deprecated Use `fireConsultationLeadConversion` — same behavior, clearer name */
export const pushConsultationConversionDataLayer = fireConsultationLeadConversion;
