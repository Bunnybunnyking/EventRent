"use client";

/**
 * Renders Goodshuffle `gspro-item-list` (keyword search on title/description).
 * Use when no Website Integration UUID is wired yet; tune `search` in `lib/goodshuffle-catalog-ids.ts` or per-page
 * `goodshuffleCatalogSearch` so the right package surfaces.
 *
 * @see https://docs.goodshuffle.dev/docs/components/item-list
 */
export function GoodshuffleItemListEmbed({
  search,
  listSize = 6,
  className,
}: {
  search: string;
  /** Number of rows to fetch (Goodshuffle default is 15). */
  listSize?: number;
  className?: string;
}) {
  const shell =
    className?.trim() ??
    "min-h-[14rem] rounded-xl border border-stone-200 bg-stone-50/40 p-2 sm:p-3";
  return (
    <div className={shell}>
      <gspro-item-list search={search} size={String(listSize)} />
    </div>
  );
}
