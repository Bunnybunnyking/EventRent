import { WC_URL_PARAM } from "@/features/wedding-checklist/lib/persistence/constants";

/**
 * Remove `?wc=` from the URL without navigation (after successful share restore).
 * Prevents re-applying share state on refresh and makes localStorage the single runtime source of truth.
 */
export function stripWeddingChecklistShareParam(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has(WC_URL_PARAM)) return;
  url.searchParams.delete(WC_URL_PARAM);
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(window.history.state, "", next);
}
