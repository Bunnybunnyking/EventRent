"use client";

import { GoodshuffleItemWishlistHeart } from "@/components/goodshuffle-item-wishlist-heart";

/**
 * Inline Goodshuffle wishlist heart next to a frame size label.
 * Renders only when `itemId` is set (e.g. from `frameTentGoodshuffleBySlug` in `lib/goodshuffle-catalog-ids.ts`).
 * Add more slugs there when you are ready for the next sizes.
 */
export function FrameTentSizeWishlistAffordance({ itemId, sizeLabel }: { itemId: string; sizeLabel: string }) {
  const id = itemId.trim();
  if (!id) return null;

  return (
    <span className="inline-flex shrink-0 items-baseline [-webkit-tap-highlight-color:transparent]">
      <GoodshuffleItemWishlistHeart
        itemId={id}
        aria-label={`Add ${sizeLabel} frame tent package to wishlist`}
      />
    </span>
  );
}
