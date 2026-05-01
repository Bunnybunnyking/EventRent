"use client";

import { GoodshuffleMissingKeyNotice } from "@/components/goodshuffle-runtime";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";

type Props = {
  publicWebsiteKey: string | undefined;
  /** Extra classes on the host wrapper (e.g. rounded card on the wishlist page). */
  className?: string;
};

/**
 * Goodshuffle wishlist / quote-request flow (`gspro-wishlist`).
 * Renders in the default Goodshuffle state (minimized until the guest opens it from the UI).
 */
export function GoodshuffleWishlistView({ publicWebsiteKey, className }: Props) {
  const key = publicWebsiteKey?.trim();
  const dataUrl = key ? goodshuffleVendorDataUrl(key) : null;

  if (!dataUrl) {
    return <GoodshuffleMissingKeyNotice />;
  }

  const hostClass = ["goodshuffle-wishlist-host", className].filter(Boolean).join(" ");
  return (
    <div className={hostClass}>
      <gspro-wishlist />
    </div>
  );
}
