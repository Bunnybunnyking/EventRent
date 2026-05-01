"use client";

import { GoodshuffleMissingKeyNotice, GoodshuffleRuntime } from "@/components/goodshuffle-runtime";
import { goodshufflePublicWebsiteKey, goodshuffleTentCanopyGalleryCategory, isGoodshuffleEnabled } from "@/lib/goodshuffle-env";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";

type Props = {
  /**
   * When true, the route already wrapped the page in `GoodshuffleRuntime` (scripts + wishlist config).
   * Nesting another runtime inside a client island often prevents `gspro-item-gallery` from mounting; use embedOnly on `/tents` and `/tent-rentals`.
   */
  embedOnly?: boolean;
};

/** Live Goodshuffle catalog gallery filtered to tent & canopy rentals; needs public website key in env. */
export function TentFamilyCanopyGallery({ embedOnly = false }: Props) {
  const enabled = isGoodshuffleEnabled();
  const key = goodshufflePublicWebsiteKey()?.trim();

  if (!enabled || !key) {
    return (
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-stone-900 sm:text-xl">Tent &amp; canopy gallery</h3>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          When your Goodshuffle public key is set, a live item gallery appears here for guests to browse packages and add hearts to the wishlist.
        </p>
        <div className="mt-4">
          <GoodshuffleMissingKeyNotice compact />
        </div>
      </div>
    );
  }

  const galleryFrame = (
    <div className="mt-4 min-h-[min(60vh,28rem)] rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.12)] sm:p-5">
      <gspro-item-gallery category={goodshuffleTentCanopyGalleryCategory()} />
    </div>
  );

  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold text-stone-900 sm:text-xl">Tent &amp; canopy gallery</h3>
      <p className="mt-2 max-w-2xl text-sm text-stone-600">
        Live catalog for tent and canopy rentals: browse packages, filters, and add favorites to your wishlist.
      </p>
      {embedOnly ? (
        galleryFrame
      ) : (
        <GoodshuffleRuntime dataUrl={goodshuffleVendorDataUrl(key)}>{galleryFrame}</GoodshuffleRuntime>
      )}
    </div>
  );
}
