/**
 * Google Ads “Google tag” conversion ID (starts with AW-).
 * Override in Vercel / `.env.local` if Google Ads shows a different ID.
 * Set `NEXT_PUBLIC_GOOGLE_ADS_AW_ID=` empty to disable the Ads snippet (GTM can still load tags).
 */
const DEFAULT_AW = "AW-18131224378";

export function googleAdsAwId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_ADS_AW_ID;
  if (raw !== undefined && raw.trim() === "") return null;
  const id = raw?.trim() || DEFAULT_AW;
  return /^AW-[A-Z0-9]+$/i.test(id) ? id : null;
}
