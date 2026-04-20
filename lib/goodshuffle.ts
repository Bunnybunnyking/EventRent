/** Pin to npm version: https://www.npmjs.com/package/@goodshuffle/gspro-wc */
export const GOODSHUFFLE_GSPRO_WC_VERSION = "0.5.11" as const;

const pkg = `@goodshuffle/gspro-wc@${GOODSHUFFLE_GSPRO_WC_VERSION}`;

export const goodshuffleWcEsmScriptUrl = `https://unpkg.com/${pkg}/dist/gspro-wc/gspro-wc.esm.js`;
export const goodshuffleWcLegacyScriptUrl = `https://unpkg.com/${pkg}/dist/gspro-wc/gspro-wc.js`;

/** Build vendor data URL from your Public Browser Key (Goodshuffle Pro → Activation). */
export function goodshuffleVendorDataUrl(publicWebsiteKey: string): string {
  const key = publicWebsiteKey.trim();
  return `https://data.goodshuffle.com/vendor/${key}`;
}
