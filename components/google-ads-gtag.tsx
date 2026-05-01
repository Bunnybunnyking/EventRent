import Script from "next/script";

/** Google Ads conversion tag (gtag.js) — Public Browser / measurement ID. */
const GOOGLE_ADS_AW_ID = "AW-18131224378";

export function GoogleAdsGtag() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_AW_ID}`} strategy="afterInteractive" />
      <Script id="google-ads-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_AW_ID}');
        `}
      </Script>
    </>
  );
}
