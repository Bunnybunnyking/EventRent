"use client";

/**
 * Renders Goodshuffle `gspro-item-card` in a client boundary (loads after `gspro-wishlist-config` from a parent `GoodshuffleRuntime`).
 * `item-id` is the Website Integration id for one **catalog row** in Pro. That row can be Type **Package** (a bundled
 * tent setup); the wishlist still adds that bundle as a single line when guests use the heart.
 */
export function GoodshuffleItemCardEmbed({
  itemId,
  className,
}: {
  itemId: string;
  className?: string;
}) {
  const shell =
    className?.trim() ??
    "min-h-[8rem] rounded-lg border border-stone-200 bg-white p-1";
  return (
    <div className={shell}>
      <gspro-item-card item-id={itemId} />
    </div>
  );
}
