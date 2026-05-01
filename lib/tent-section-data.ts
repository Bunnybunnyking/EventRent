import type { TentFamilyMeta } from "./tent-section-types";
import { frameTentPages, frameTentSlugs } from "./tent-frame-pages";
import { largeEventTentPages, largeEventTentSlugs } from "./tent-large-pages";

export { frameTentPages, frameTentSlugs, largeEventTentPages, largeEventTentSlugs };
export { tentInventoryCopy, quickGuestTableCounts } from "./tent-inventory";

export const tentFamilies: TentFamilyMeta[] = [
  {
    slug: "frame-tents",
    path: "/tents/frame-tents",
    shortTitle: "Frame Tents",
    title: "Frame tent rentals",
    metaDescription:
      "Frame tent rentals in Connecticut: clear-span interiors, no center poles, flexible layouts for weddings, corporate events, and backyard parties.",
    intro:
      "Clear-span frame tents give open interiors without center poles, ideal for rounds, head tables, lighting, dance floors, and sidewalls that match your run of show.",
    bullets: [
      "Clear-span interior for flexible seating and dance layouts",
      "Works on many surfaces with the right anchoring plan",
      "Pairs with lighting, sidewalls, flooring, and decor",
    ],
  },
  {
    slug: "expandable-frame-tents",
    path: "/tents/expandable-frame-tents",
    shortTitle: "Expandable Tent Structures",
    title: "Expandable frame & modular tents",
    metaDescription:
      "Expandable modular systems and large clear-span structures in Connecticut: gutter-linked bays, 60′ class footprints, galas, and festivals with layout-first quoting.",
    intro:
      "Modular bays gutter together for one roofline, scaling into 60′ class clear-span as programs grow, with anchoring driven by site survey.",
    bullets: [
      "Scalable layouts for growing guest counts",
      "Large clear-span class (e.g. 60×60 to 60×150) for major events",
      "Pairs with marquee connectors for arrival and guest flow",
    ],
  },
  {
    slug: "pole-tents",
    path: "/tents/pole-tents",
    shortTitle: "Elegant Pole Tents",
    title: "Pole tent rentals",
    metaDescription:
      "Classic pole tent rentals in Connecticut: traditional peaks and elegant lines, often best on grass. Compare pole vs frame with Connecticut Party Rentals.",
    intro:
      "Pole tents bring timeless peaks and elegant outdoor lines, with center poles and staking that suit grass sites and classic wedding or festival aesthetics.",
    bullets: ["Classic peaked look", "Often best on grass with staking", "Plan seating and sight lines around poles"],
  },
  {
    slug: "marquee-walkways",
    path: "/tents/marquee-walkways",
    shortTitle: "Marquee & walkways",
    title: "Marquee tents & walkways",
    metaDescription:
      "Marquee tent walkways and connectors for entries, rain-protected routes, and tent-to-building transitions, Connecticut Party Rentals.",
    intro:
      "Marquee sections keep guests comfortable along entries, queues, L-shaped paths, and rain-smart routes between tents and buildings.",
    bullets: ["Entries and queue control", "Tent-to-building transitions", "Rain-protected guest flow"],
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
    family: "Frame tents",
    bestFor: "Seated dinners, dance floors, decor, and flexible layouts",
    interior: "Clear-span, no center poles",
    surfaces: "Many surfaces with proper anchoring",
  },
  {
    family: "Expandable tent structures",
    bestFor: "Growing layouts, connected bays, long rectangles, and high-capacity clear-span",
    interior: "Modular bays plus large 60′ class spans when the program demands it",
    surfaces: "Site-dependent; gutters, ballast, and survey-driven anchoring",
  },
  {
    family: "Elegant pole tents",
    bestFor: "Classic look and traditional outdoor events",
    interior: "Center poles, plan seating around poles",
    surfaces: "Often grass / staking",
  },
  {
    family: "Marquee & walkways",
    bestFor: "Arrivals, queues, connectors, and rain-protected flow",
    interior: "Linear runs and covered paths",
    surfaces: "Paired with mains; anchoring per path layout",
  },
];

export type TentHubPopularSize = {
  href: string;
  label: string;
  sqft: number;
  blurb: string;
  /** When set, links to the matching tent row on `/rental-inventory` for the live Goodshuffle package card. */
  inventoryCardId?: string;
};

export const tentHubPopularSizes: TentHubPopularSize[] = [
  {
    href: "/tents/frame-tents/20x20-frame-tent-rental",
    label: "20×20",
    sqft: 400,
    blurb: "Typical backyard main-tent starting point when you want real seated room.",
    inventoryCardId: "tent-20x20",
  },
  {
    href: "/tents/frame-tents/20x40-frame-tent-rental",
    label: "20×40",
    sqft: 800,
    blurb: "Popular for many seated dinners, layout-dependent.",
    inventoryCardId: "tent-20x40",
  },
  {
    href: "/tents/frame-tents/30x30-frame-tent-rental",
    label: "30×30",
    sqft: 900,
    blurb: "Extra room for dance floor and aisles.",
    inventoryCardId: "tent-30x30",
  },
  {
    href: "/tents/frame-tents/30x45-frame-tent-rental",
    label: "30×45",
    sqft: 1350,
    blurb: "Strong for dinner + dance + service.",
    inventoryCardId: "tent-30x45",
  },
  {
    href: "/tents/large-event-structures/60x60-event-tent",
    label: "60×60",
    sqft: 3600,
    blurb: "Large clear-span for major events.",
    inventoryCardId: "tent-60wide",
  },
];

export function getTentFamily(slug: string): TentFamilyMeta | undefined {
  return tentFamilies.find((f) => f.slug === slug);
}

export function getFrameSizePage(slug: string) {
  return frameTentPages[slug] ?? null;
}

/**
 * Map URL segments to real `frameTentPages` keys: lowercase, decode, ×→x, and
 * shorthand `20x20` → `20x20-frame-tent-rental` when that page exists.
 */
export function canonicalizeFrameTentSlugParam(raw: string): string {
  const s = decodeURIComponent(raw).trim().toLowerCase().replace(/\u00d7/g, "x");
  if (frameTentPages[s]) return s;
  const compact = /^(\d+x\d+)$/.exec(s);
  if (compact) {
    const guess = `${compact[1]}-frame-tent-rental`;
    if (frameTentPages[guess]) return guess;
  }
  return s;
}

export function getLargeStructurePage(slug: string) {
  return largeEventTentPages[slug] ?? null;
}

/** Same idea as frame tents: `60x60` → `60x60-event-tent`, etc. */
export function canonicalizeLargeEventSlugParam(raw: string): string {
  const s = decodeURIComponent(raw).trim().toLowerCase().replace(/\u00d7/g, "x");
  if (largeEventTentPages[s]) return s;
  const compact = /^(\d+x\d+)$/.exec(s);
  if (!compact) return s;
  const prefix = `${compact[1]}-`;
  const hit = Object.keys(largeEventTentPages).find((k) => k.startsWith(prefix));
  return hit ?? s;
}
