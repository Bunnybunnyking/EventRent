"use client";

import { GoodshuffleMissingKeyNotice, GoodshuffleRuntime } from "@/components/goodshuffle-runtime";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";

type Props = {
  publicWebsiteKey: string | undefined;
  /** `inline` = tent pages and other embedded spots; `test` = /goodshuffle-test doc-style copy */
  variant?: "test" | "inline";
};

/**
 * Loads Goodshuffle web components (see https://docs.goodshuffle.dev/docs/setup/custom-setup/)
 * and renders the gallery widget.
 */
export function GoodshuffleTestEmbed({ publicWebsiteKey, variant = "test" }: Props) {
  const key = publicWebsiteKey?.trim();
  const dataUrl = key ? goodshuffleVendorDataUrl(key) : null;

  if (!dataUrl) {
    return <GoodshuffleMissingKeyNotice compact={variant === "inline"} />;
  }

  return (
    <div className={variant === "inline" ? "space-y-4" : "space-y-6"}>
      <GoodshuffleRuntime dataUrl={dataUrl}>
        <div
          className={
            variant === "inline"
              ? "rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
              : "rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
          }
        >
          {variant === "test" ? (
            <p className="mb-3 text-sm text-neutral-600">
              Test embed from Goodshuffle docs — Step 2 (<code className="rounded bg-neutral-100 px-1">gspro-item-gallery</code>).
            </p>
          ) : null}
          <gspro-item-gallery />
        </div>
      </GoodshuffleRuntime>
    </div>
  );
}
