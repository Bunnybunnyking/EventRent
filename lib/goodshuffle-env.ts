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

/**
 * How many items `gspro-item-gallery` loads at once (Goodshuffle default is 15, which enables paging).
 * Tent galleries use a higher default so the full fleet scrolls on one page.
 */
function parseGallerySize(raw: string | undefined, fallback: number): number {
  const n = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, 500);
}

/** General catalog embeds (tables/chairs hub, etc.). */
export function goodshuffleGalleryPageSize(): number {
  return parseGallerySize(process.env.NEXT_PUBLIC_GOODSHUFFLE_GALLERY_SIZE, 60);
}

/** Tent & canopy gallery — show full fleet without paging when possible. */
export function goodshuffleTentGalleryPageSize(): number {
  return parseGallerySize(process.env.NEXT_PUBLIC_GOODSHUFFLE_TENT_GALLERY_SIZE, 120);
}
