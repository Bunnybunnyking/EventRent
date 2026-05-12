"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { fireConsultationLeadConversion } from "@/lib/gtm-consultation";
import { fireGoogleAdsQuoteConversion, QUOTE_CONVERSION_SESSION_KEY } from "@/lib/google-ads-conversion";

/**
 * Fires the quote conversion once when the user lands here after a real submission:
 * - In-app `/api/quote` flow sets `QUOTE_CONVERSION_SESSION_KEY` before redirecting to `/contact/thank-you`.
 * - External form services should redirect to `/contact/thank-you?quote=1` (configure `NEXT_PUBLIC_QUOTE_THANK_YOU_URL`).
 * - Fires `fireConsultationLeadConversion`: `dataLayer` + `gtag('event', …)` (`NEXT_PUBLIC_GTM_CONSULTATION_EVENT`, default `consultation_submit`).
 */
export function GoogleAdsQuoteConversionOnce() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;

    let fromSession = false;
    try {
      fromSession = sessionStorage.getItem(QUOTE_CONVERSION_SESSION_KEY) === "1";
    } catch {
      fromSession = false;
    }

    const fromQuery = searchParams.get("quote") === "1";
    if (!fromSession && !fromQuery) return;

    if (fromSession) {
      try {
        sessionStorage.removeItem(QUOTE_CONVERSION_SESSION_KEY);
      } catch {
        /* ignore */
      }
    }

    fired.current = true;
    fireGoogleAdsQuoteConversion();
    fireConsultationLeadConversion();

    if (fromQuery) {
      router.replace("/contact/thank-you", { scroll: false });
    }
  }, [searchParams, router]);

  return null;
}
