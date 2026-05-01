/**
 * Public Goodshuffle key from `NEXT_PUBLIC_GOODSHUFFLE_PUBLIC_WEBSITE_KEY`.
 * Read via helpers so frame pages, inventory, and layout stay in sync (trimmed).
 *
 * Tent / inventory routes use `force-dynamic` so adding `.env.local` or Vercel env
 * takes effect without relying on a stale static snapshot from an old build.
 */
export function goodshufflePublicWebsiteKey(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_GOODSHUFFLE_PUBLIC_WEBSITE_KEY;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}

export function isGoodshuffleEnabled(): boolean {
  return Boolean(goodshufflePublicWebsiteKey());
}

/**
 * Root category slug for the tables & chairs page (`category` on `gspro-item-gallery`).
 * Defaults to `furniture-rentals` (common Goodshuffle Pro pattern). Override with
 * `NEXT_PUBLIC_GOODSHUFFLE_TABLE_CHAIR_CATEGORY` if your root slug differs.
 */
export function goodshuffleTableChairGalleryCategory(): string {
  const raw = process.env.NEXT_PUBLIC_GOODSHUFFLE_TABLE_CHAIR_CATEGORY?.trim();
  return raw || "furniture-rentals";
}

/**
 * Root category for tent & canopy item gallery (`category` on `gspro-item-gallery`).
 * Used on wishlist and tent hub embeds. Override with `NEXT_PUBLIC_GOODSHUFFLE_TENT_CANOPY_CATEGORY` if the Pro slug differs.
 */
export function goodshuffleTentCanopyGalleryCategory(): string {
  const raw = process.env.NEXT_PUBLIC_GOODSHUFFLE_TENT_CANOPY_CATEGORY?.trim();
  return raw || "tent-canopy-rentals";
}
