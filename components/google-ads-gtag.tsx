import Script from "next/script";

/** Google Ads conversion tag (gtag.js) — matches Google tag snippet; ID from Google Ads. */
const GOOGLE_ADS_AW_ID = "AW-18131224378";

const gtagInitHtml = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_AW_ID}');
`.trim();

export function GoogleAdsGtag() {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_AW_ID}`} strategy="afterInteractive" />
      <Script
        id="google-ads-gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: gtagInitHtml }}
      />
    </>
  );
}
