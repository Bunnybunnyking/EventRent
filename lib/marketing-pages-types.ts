export type MarketingSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type MarketingFaqItem = { id: string; question: string; answer: string };

export type MarketingSetupCard = {
  title: string;
  summary: string;
  includes: string[];
  bestFor: string;
};

export type MarketingPageDefinition = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  /** Shown above H1; defaults in the view if omitted. */
  contentEyebrow?: string;
  /** Optional text link next to hero CTA (e.g. jump to TOC). */
  heroSecondaryCta?: { label: string; href: string };
  /** JSON-LD Article `articleSection` for topical clarity. */
  articleSection?: string;
  h1: string;
  subhead: string;
  cta: { label: string; href: string };
  quickAnswer: string;
  sections: MarketingSection[];
  /** Optional setup-style cards (packages page) */
  setupCards?: MarketingSetupCard[];
  /** Short trust or process line list */
  trustBullets?: string[];
  finalCta: { title: string; body: string; primaryLabel: string; primaryHref: string; secondaryLabel?: string; secondaryHref?: string };
  faqs: MarketingFaqItem[];
  relatedLinks: { href: string; label: string }[];
  publishedAt: string;
  updatedAt: string;
  /** Optional dashed placeholder grid for Goodshuffle item cards + wishlist (packages test page). */
  goodshuffleSlot?: string;
};
