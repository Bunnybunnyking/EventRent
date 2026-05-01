export type TentLayoutExample = {
  title: string;
  body: string;
};

export type TentSizeFaq = { question: string; answer: string };

/** Optional Goodshuffle / wishlist hooks for paired rental cards (safe when empty). */
export type TentPairedRentalHooks = {
  goodshuffleItemId?: string;
  goodshuffleImageId?: string;
  goodshuffleProductSlug?: string;
  wishlistEnabled?: boolean;
  waitlistEnabled?: boolean;
  featuredForTent?: boolean;
};

export type TentPairedRental = TentPairedRentalHooks & {
  title: string;
  note?: string;
  tags?: string[];
};

export type TentSizePageData = {
  slug: string;
  /** e.g. 20×40 */
  sizeLabel: string;
  sqft: number;
  pageTitle: string;
  metaDescription: string;
  /** Optional override for the visible H1 (otherwise built from size + family + state). */
  heroHeadline?: string;
  /** One line under the H1: what this tent is for. */
  heroSubhead: string;
  /** Snippet-style: what this tent is and what it is usually best for. */
  quickAnswer: string;
  /** Short trust bar lines; omit to use site defaults in the template. */
  trustStrip?: string[];
  /** Self-ID chips: who should consider this size. */
  bestForWho: string[];
  /** Plain-language overview: family, role vs neighbors, capacity tone. */
  tentOverview: string;
  /** Typical events and programs for this footprint. */
  commonEventUses: string[];
  guestSeatedEstimate: string;
  guestCocktailEstimate: string;
  surfacesNote?: string;
  whatFits: string[];
  /** Practical bullets for this size only (surface, flow, weather, access). */
  planningNotes: string[];
  layoutExamples: TentLayoutExample[];
  whenToSizeUp: string[];
  bestAddOns: string[];
  /** Paired inventory families, Goodshuffle fields optional until wired. */
  pairedRentals: TentPairedRental[];
  /** When set, a compact Goodshuffle add-to-wishlist control can be wired for this size (Website Integration UUID). */
  goodshuffleItemId?: string;
  /**
   * Override keyword search for `gspro-item-list` when no `goodshuffleItemId` is set (tune per slug in
   * `lib/goodshuffle-catalog-ids.ts` first).
   */
  goodshuffleCatalogSearch?: string;
  faqs: TentSizeFaq[];
};

export type TentFamilyMeta = {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  intro: string;
  bullets: string[];
};
