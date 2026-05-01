/**
 * Google Ads “Google tag” conversion ID (starts with AW-).
 * Override in Vercel / `.env.local` if Google Ads shows a different ID.
 */
export function googleAdsAwId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_ADS_AW_ID?.trim();
  return fromEnv || "AW-18131224378";
}
