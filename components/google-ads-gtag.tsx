import Script from "next/script";
import { googleAdsAwId } from "@/lib/google-ads-id";

/**
 * Google tag (gtag.js) for Google Ads — same behavior as Google’s snippet:
 * load library, define stub, push config. Uses `afterInteractive` so it always runs
 * from the root layout (avoid `beforeInteractive` in nested modules; diagnostics flake).
 */
export function GoogleAdsGtag() {
  const awId = googleAdsAwId();
  if (!awId) return null;

  const inlineInit = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${awId}');
`.trim();

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${awId}`} strategy="afterInteractive" />
      <Script id="google-ads-gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: inlineInit }} />
    </>
  );
}
