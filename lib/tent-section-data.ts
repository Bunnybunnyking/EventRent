import type { TentFamilyMeta } from "./tent-section-types";
import { frameTentPages, frameTentSlugs } from "./tent-frame-pages";
import { largeEventTentPages, largeEventTentSlugs } from "./tent-large-pages";

export { frameTentPages, frameTentSlugs, largeEventTentPages, largeEventTentSlugs };
export { tentInventoryCopy, quickGuestTableCounts } from "./tent-inventory";

export const tentFamilies: TentFamilyMeta[] = [
  {
    slug: "frame-tents",
    path: "/tents/frame-tents",
    shortTitle: "Frame tents",
    title: "Frame tent rentals",
    metaDescription:
      "Frame tent rentals in Connecticut: clear-span interiors, no center poles, flexible layouts for weddings, corporate events, and backyard parties.",
    intro:
      "Frame tents give you open interiors without center poles, ideal for rounds, head tables, lighting, dance floors, and sidewalls that match your run of show.",
    bullets: [
      "Clear-span interior for flexible seating and dance layouts",
      "Works on many surfaces with the right anchoring plan",
      "Pairs with lighting, sidewalls, flooring, and decor",
    ],
  },
  {
    slug: "expandable-frame-tents",
    path: "/tents/expandable-frame-tents",
    shortTitle: "Expandable systems",
    title: "Expandable frame & modular tents",
    metaDescription:
      "Expandable modular frame tent systems in Connecticut, scalable footprints for 20×40, 30×45 style layouts, and weather-tight modular clear-span.",
    intro:
      "When your event needs to grow or connect, modular expandable systems help you build length and width with gutters and connectors, without guessing a single box size.",
    bullets: [
      "Scalable layouts for growing guest counts",
      "Strong option for 20×40, 30×45, and similar footprints",
      "Pairs with marquee connectors for arrival and flow",
    ],
  },
  {
    slug: "pole-tents",
    path: "/tents/pole-tents",
    shortTitle: "Pole tents",
    title: "Pole tent rentals",
    metaDescription:
      "Classic pole tent rentals in Connecticut, traditional peaks and elegant lines, often best on grass. Compare pole vs frame with Connecticut Party Rentals.",
    intro:
      "Pole tents deliver classic festival and wedding aesthetics with center poles and stakes, often the right choice when the site is grass and the look is traditional.",
    bullets: [
      "Classic peaked look",
      "Often best on grass with staking",
      "Great when you want a timeless outdoor aesthetic",
    ],
  },
  {
    slug: "large-event-structures",
    path: "/tents/large-event-structures",
    shortTitle: "Large structures",
    title: "Large event structures",
    metaDescription:
      "Large clear-span event structures: 60×60, 60×90, 60×150 class footprints for major Connecticut events, layout-first quoting.",
    intro:
      "When frame tents need to go big, large clear-span structures support high-capacity layouts with production-forward planning.",
    bullets: ["High-capacity layouts", "Production and stage considerations", "Site-specific planning required"],
  },
  {
    slug: "marquee-walkways",
    path: "/tents/marquee-walkways",
    shortTitle: "Marquee & walkways",
    title: "Marquee tents & walkways",
    metaDescription:
      "Marquee tent walkways and connectors for entries, rain-protected routes, and tent-to-building transitions, Connecticut Party Rentals.",
    intro:
      "Marquee sections help guests move comfortably, entries, connectors, L-shapes, and rain-protected routes between tents and buildings.",
    bullets: [
      "Entries and queue control",
      "Tent-to-building transitions",
      "Rain-protected guest flow",
    ],
  },
];

export type TentComparisonRow = {
  family: string;
  bestFor: string;
  interior: string;
  surfaces: string;
};

export const tentComparisonRows: TentComparisonRow[] = [
  {
    family: "Frame",
    bestFor: "Seated dinners, dance floors, decor, and flexible layouts",
    interior: "Clear-span, no center poles",
    surfaces: "Many surfaces with proper anchoring",
  },
  {
    family: "Expandable modular",
    bestFor: "Growing layouts, connected bays, long rectangles",
    interior: "Modular clear-span bays",
    surfaces: "Site-dependent, planned with gutters and ballast",
  },
  {
    family: "Pole",
    bestFor: "Classic look and traditional outdoor events",
    interior: "Center poles, plan seating around poles",
    surfaces: "Often grass / staking",
  },
  {
    family: "Large structures",
    bestFor: "Major receptions, galas, and high-capacity layouts",
    interior: "Large clear-span spans",
    surfaces: "Requires site survey and logistics",
  },
];

export type TentHubPopularSize = {
  href: string;
  label: string;
  sqft: number;
  blurb: string;
};

export const tentHubPopularSizes: TentHubPopularSize[] = [
  { href: "/tents/frame-tents/20x40-frame-tent-rental", label: "20×40", sqft: 800, blurb: "Popular for many seated dinners, layout-dependent." },
  { href: "/tents/frame-tents/30x30-frame-tent-rental", label: "30×30", sqft: 900, blurb: "Extra room for dance floor and aisles." },
  { href: "/tents/frame-tents/30x45-frame-tent-rental", label: "30×45", sqft: 1350, blurb: "Strong for dinner + dance + service." },
  { href: "/tents/large-event-structures/60x60-event-tent", label: "60×60", sqft: 3600, blurb: "Large clear-span for major events." },
];

export function getTentFamily(slug: string): TentFamilyMeta | undefined {
  return tentFamilies.find((f) => f.slug === slug);
}

export function getFrameSizePage(slug: string) {
  return frameTentPages[slug] ?? null;
}

export function getLargeStructurePage(slug: string) {
  return largeEventTentPages[slug] ?? null;
}
