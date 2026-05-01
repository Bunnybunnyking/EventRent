/**
 * Goodshuffle wiring for `gspro-item-card` and wishlist hearts.
 *
 * ### Tent “packages” in Pro vs `item-id`
 * In Pro, **Type: Package** means a **bundle** (tent + pieces you grouped). On the website, that bundle is still
 * **one catalog row** in the vendor feed. [`gspro-item-card`](https://docs.goodshuffle.dev/docs/components/item-card)
 * takes **`item-id` = that row’s Website Integration UUID** (hex id from the embed / integration screen, or from
 * markup produced by `gspro-item-list`). Guests who heart the card add the **whole package** to the wishlist as one line.
 *
 * The **numeric “Package • ID”** column in Pro’s inventory grid (e.g. `1169305764`) is **not** the same string as
 * `item-id` in embeds; keep those numbers in `goodshuffleProPackageIds` for cross-check only.
 */

export type GoodshuffleItemRef = {
  /** Website Integration UUID for this catalog row (Package or single Item in Pro). */
  itemId: string;
  /** Optional; defaults to `itemId` for `data-goodshuffle-image-id` on inventory cards. */
  imageId?: string;
};

/**
 * Pro inventory grid **Package • ID** (numeric) — reference only; use the embed **UUID** in `frameTentGoodshuffleBySlug`.
 */
export const goodshuffleProPackageIds = {
  frame10x10: "1169312534",
  frame12x12: "1169137276",
  frame20x20: "1169305764",
  frame20x30: "1169308763",
  frame30x30Fiesta: "1169013825",
  large60x60: "1169316818",
} as const;

/**
 * Frame size slugs under `/tents/frame-tents/[slug]` → Website Integration UUID for `item-id` (often a Pro Package row).
 * Leave empty to use the standard `gspro-item-list` hero on each size page (keyword search) and plain wishlist links on `/rental-inventory`.
 * When you add a slug here, that size gets the inline heart + inventory `item-id` hooks instead.
 */
export const frameTentGoodshuffleBySlug: Partial<Record<string, GoodshuffleItemRef>> = {
  // Example when wired from Pro Website Integration (UUID, not the public browser key):
  // "20x20-frame-tent-rental": { itemId: "…", imageId: "…" },
  // "10x10-frame-tent-rental": { itemId: "…", imageId: "…" },
};

/** Large structure slugs under `/tents/large-event-structures/[slug]`. */
export const largeEventTentGoodshuffleBySlug: Partial<Record<string, GoodshuffleItemRef>> = {
  // "60x60-event-tent": { itemId: "<item-uuid>", imageId: "<item-uuid>" },
};

/**
 * Keyword `search` for `gspro-item-list` when no integration UUID exists for that landing slug yet.
 * Tuned to Pro titles where possible; falls back to `{size} frame tent` / `{size} event tent`.
 */
const frameTentGoodshuffleFallbackSearchBySlug: Partial<Record<string, string>> = {
  "10x10-frame-tent-rental": "10x10 frame tent anchor",
  "12x12-frame-tent-rental": "12x12 frame tent",
  "16x16-frame-tent-rental": "16x16 frame tent",
  "20x20-frame-tent-rental": "20x20 frame tent",
  "20x30-frame-tent-rental": "20x30 frame tent",
  "20x40-frame-tent-rental": "20x40 frame tent",
  "30x30-frame-tent-rental": "30x30 fiesta",
  "30x45-frame-tent-rental": "30x45 frame tent",
  "30x60-frame-tent-rental": "30x60 frame tent",
};

const largeEventTentGoodshuffleFallbackSearchBySlug: Partial<Record<string, string>> = {
  "60x60-event-tent": "60x60 elegant pole",
  "60x90-event-tent": "60x90 event tent",
  "60x150-event-structure": "60x150 event structure",
};

export function goodshuffleFallbackCatalogSearchForTentSizePage(
  slug: string,
  sizeLabel: string,
  variant: "frame" | "large",
): string {
  const ascii = sizeLabel.replace(/×/g, "x");
  if (variant === "frame") {
    return frameTentGoodshuffleFallbackSearchBySlug[slug] ?? `${ascii} frame tent`;
  }
  return largeEventTentGoodshuffleFallbackSearchBySlug[slug] ?? `${ascii} event tent`;
}

/** Rental inventory card ids (`tent-*`) → frame slug (see `frameTentGoodshuffleBySlug`). */
export const inventoryTentCardIdToFrameSlug: Record<string, string> = {
  "tent-10x10": "10x10-frame-tent-rental",
  "tent-12x12": "12x12-frame-tent-rental",
  "tent-16x16": "16x16-frame-tent-rental",
  "tent-20x20": "20x20-frame-tent-rental",
  "tent-20x30": "20x30-frame-tent-rental",
  "tent-20x40": "20x40-frame-tent-rental",
  "tent-30x30": "30x30-frame-tent-rental",
  "tent-30x45": "30x45-frame-tent-rental",
  "tent-30x60": "30x60-frame-tent-rental",
};

/** Large structure detail slugs → inventory row id (approximate “same footprint” card on /rental-inventory). */
export const largeStructureSlugToInventoryCardId: Partial<Record<string, string>> = {
  "60x60-event-tent": "tent-60wide",
  "60x90-event-tent": "tent-60wide",
  "60x150-event-structure": "tent-60wide",
};

export function frameSlugForInventoryTentCard(tentCardId: string): string | undefined {
  return inventoryTentCardIdToFrameSlug[tentCardId];
}

/** Reverse lookup: frame size page slug → `tent-*` id on /rental-inventory (for `#` anchors). */
export function inventoryCardIdForFrameSlug(frameSlug: string): string | undefined {
  const pair = Object.entries(inventoryTentCardIdToFrameSlug).find(([, slug]) => slug === frameSlug);
  return pair?.[0];
}

/** Deep link to the matching tent card on `/rental-inventory` when one exists. */
export function rentalInventoryTentCardHrefForFrameSlug(frameSlug: string): string | undefined {
  const id = inventoryCardIdForFrameSlug(frameSlug);
  return id ? `/rental-inventory#${id}` : undefined;
}

export function rentalInventoryTentCardHrefForLargeStructureSlug(structureSlug: string): string | undefined {
  const id = largeStructureSlugToInventoryCardId[structureSlug];
  return id ? `/rental-inventory#${id}` : undefined;
}

/** Frame size page or large structure page slug → inventory anchor when mapped. */
export function rentalInventoryTentCardHrefForTentSizeSlug(slug: string): string | undefined {
  return rentalInventoryTentCardHrefForFrameSlug(slug) ?? rentalInventoryTentCardHrefForLargeStructureSlug(slug);
}

/** Path to the matching frame size guide, when this inventory row maps to a frame page. */
export function frameDetailHrefForInventoryTentCard(tentCardId: string): string | undefined {
  const slug = frameSlugForInventoryTentCard(tentCardId);
  return slug ? `/tents/frame-tents/${slug}` : undefined;
}

export type GoodshuffleItemCardHooks = {
  goodshuffleItemId?: string;
  goodshuffleImageId?: string;
};

export function goodshuffleProductHooksForFrameSlug(frameSlug: string): GoodshuffleItemCardHooks {
  const ref = frameTentGoodshuffleBySlug[frameSlug];
  if (!ref?.itemId) return {};
  return {
    goodshuffleItemId: ref.itemId,
    goodshuffleImageId: ref.imageId ?? ref.itemId,
  };
}

export function goodshuffleProductHooksForInventoryTentId(tentCardId: string): GoodshuffleItemCardHooks {
  const slug = frameSlugForInventoryTentCard(tentCardId);
  if (!slug) return {};
  return goodshuffleProductHooksForFrameSlug(slug);
}

export function goodshuffleFieldsForFrameSizePage(frameSlug: string): { goodshuffleItemId?: string } {
  const ref = frameTentGoodshuffleBySlug[frameSlug];
  return ref?.itemId ? { goodshuffleItemId: ref.itemId } : {};
}

export function goodshuffleFieldsForLargeEventPage(structureSlug: string): { goodshuffleItemId?: string } {
  const ref = largeEventTentGoodshuffleBySlug[structureSlug];
  return ref?.itemId ? { goodshuffleItemId: ref.itemId } : {};
}
