"use client";

import { useEffect, useRef } from "react";
import { GoodshuffleMissingKeyNotice, GoodshuffleRuntime } from "@/components/goodshuffle-runtime";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";

type WishlistEl = HTMLElement & { open?: () => Promise<void> };

type Props = {
  publicWebsiteKey: string | undefined;
};

/**
 * Full Goodshuffle wishlist / quote-request flow (`gspro-wishlist`).
 * Opens expanded so guests see line items and checkout fields (https://docs.goodshuffle.dev/docs/components/wishlist-config/).
 */
export function GoodshuffleWishlistView({ publicWebsiteKey }: Props) {
  const key = publicWebsiteKey?.trim();
  const dataUrl = key ? goodshuffleVendorDataUrl(key) : null;
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dataUrl) return;
    let cancelled = false;
    void (async () => {
      try {
        await customElements.whenDefined("gspro-wishlist");
      } catch {
        return;
      }
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (cancelled) return;
      const el = hostRef.current?.querySelector("gspro-wishlist") as WishlistEl | null;
      if (el?.open) await el.open();
    })();
    return () => {
      cancelled = true;
    };
  }, [dataUrl]);

  if (!dataUrl) {
    return <GoodshuffleMissingKeyNotice />;
  }

  return (
    <GoodshuffleRuntime dataUrl={dataUrl}>
      <div ref={hostRef} className="goodshuffle-wishlist-host min-h-[280px]">
        <gspro-wishlist />
      </div>
    </GoodshuffleRuntime>
  );
}
