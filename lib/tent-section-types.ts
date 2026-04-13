export type TentLayoutExample = {
  title: string;
  body: string;
};

export type TentSizeFaq = { question: string; answer: string };

export type TentSizePageData = {
  slug: string;
  /** e.g. 20×40 */
  sizeLabel: string;
  sqft: number;
  pageTitle: string;
  metaDescription: string;
  heroSubhead: string;
  guestSeatedEstimate: string;
  guestCocktailEstimate: string;
  bestEventTypes: string[];
  surfacesNote?: string;
  whatFits: string[];
  layoutExamples: TentLayoutExample[];
  whenToSizeUp: string[];
  bestAddOns: string[];
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
