"use client";

import type { ReactNode } from "react";
import { GoodshuffleRuntime } from "@/components/goodshuffle-runtime";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";

/**
 * Single Website Integration mount (scripts + `gspro-wishlist-config`).
 * Goodshuffle recommends one config for the whole site so wishlist, item galleries,
 * and `data-goodshuffle-*` hooks work on every route.
 *
 * Set `NEXT_PUBLIC_GOODSHUFFLE_PUBLIC_WEBSITE_KEY` in `.env.local` (Activation → Public Browser Key).
 */
export function GoodshuffleRootProvider({
  publicWebsiteKey,
  children,
}: {
  publicWebsiteKey: string | undefined;
  children: ReactNode;
}) {
  const key = publicWebsiteKey?.trim();
  if (!key) return <>{children}</>;

  return <GoodshuffleRuntime dataUrl={goodshuffleVendorDataUrl(key)}>{children}</GoodshuffleRuntime>;
}
