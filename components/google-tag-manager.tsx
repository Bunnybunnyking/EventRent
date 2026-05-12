import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

function isValidGtmId(id: string): boolean {
  return /^GTM-[A-Z0-9]+$/i.test(id);
}

/**
 * Loads the Google Tag Manager container when `NEXT_PUBLIC_GTM_ID` is set (e.g. `GTM-XXXX`).
 * Required for GTM tags/triggers that listen on `dataLayer`; pushes alone do nothing until `gtm.js` runs.
 * Works alongside the Ads `gtag.js` snippet: both use `window.dataLayer`. Disable Ads only by setting `NEXT_PUBLIC_GOOGLE_ADS_AW_ID` to empty.
 */
export function GoogleTagManager() {
  if (!gtmId || !isValidGtmId(gtmId)) return null;

  const inlineInit = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
`.trim();

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: inlineInit }} />
      <noscript>
        <iframe
          title="Google Tag Manager"
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height={0}
          width={0}
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
