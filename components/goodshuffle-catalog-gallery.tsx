"use client";

import { goodshuffleGalleryPageSize } from "@/lib/goodshuffle-env";

/**
 * Full Goodshuffle item gallery: search, categories, filters, hearts → wishlist.
 * @see https://docs.goodshuffle.dev/docs/components/item-gallery
 */
export function GoodshuffleCatalogGallery({
  className,
  category,
  showSearch = true,
  showFilters = true,
  showCategories = true,
  size,
}: {
  className?: string;
  /** Goodshuffle Pro root category slug; opens that category first (e.g. furniture-rentals). */
  category?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showCategories?: boolean;
  /** Items per load; Goodshuffle default is 15 (paged). Pass a higher value to show more on one scroll. */
  size?: number;
} = {}) {
  const shell =
    className?.trim() ??
    "min-h-[min(70vh,36rem)] rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.12)] sm:p-5";
  const boolAttr = (on: boolean) => (on ? "true" : "false");
  const itemCount = size ?? goodshuffleGalleryPageSize();

  const galleryAttrs = {
    ...(category ? { category } : {}),
    size: String(itemCount),
    "show-search": boolAttr(showSearch),
    "show-filters": boolAttr(showFilters),
    "show-categories": boolAttr(showCategories),
  } as const;

  return (
    <div className={shell}>
      <gspro-item-gallery {...(galleryAttrs as Record<string, string>)} />
    </div>
  );
}
