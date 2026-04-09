/**
 * Estimated rental inventory — grouped for scanning. Goodshuffle-ready: replace with API; keep `id` stable.
 */

export type InventoryLineItem = {
  id: string;
  label: string;
  quantity?: number;
  quantityNote?: string;
};

export type InventoryCategory = {
  id: string;
  externalRef?: string;
  title: string;
  description?: string;
  items: InventoryLineItem[];
  overviewOnly?: boolean;
};

/** Shown above inventory tables */
export const inventoryDisclaimer =
  "Figures below are an estimated inventory overview for planning. Availability varies by date, season, and concurrent events. Your quote confirms what we can reserve for your specific day.";

/** Near tent inventory — modular / gutter systems */
export const tentConnectionNote =
  "Many frame and expansion-style systems can be connected with gutters to form larger covered layouts when your guest count, program, or site calls for it—subject to tent type, anchoring, and conditions. We confirm what is possible on your date during planning.";

export type InventorySectionGroup = {
  id: string;
  title: string;
  description?: string;
  categories: InventoryCategory[];
};

/** Grouped presentation: tent structures → expandable systems → tables → seating → add-on categories */
export const inventoryOverviewGroups: InventorySectionGroup[] = [
  {
    id: "tent-structures",
    title: "Tent structures",
    description:
      "Large-event and mid-size footprints for weddings, corporate events, graduations, and festivals. " + tentConnectionNote,
    categories: [
      {
        id: "tent-structures-main",
        title: "Structure sizes",
        items: [
          { id: "t-60x60", label: "60′ × 60′ tent", quantity: 1 },
          { id: "t-60x90", label: "60′ × 90′ tent", quantity: 1 },
          { id: "t-60x150", label: "60′ × 150′ tent", quantity: 1 },
          { id: "t-30x30", label: "30′ × 30′ tents", quantity: 12 },
          { id: "t-16cube", label: "16′ × 16′ × 16′ tents", quantity: 16 },
          { id: "t-18x20", label: "18′ × 20′ × 20′ tents", quantity: 18 },
          { id: "t-12cube", label: "12′ × 12′ × 12′ tents", quantity: 12 },
          { id: "t-10x10", label: "10′ × 10′ tents", quantity: 52 },
        ],
      },
    ],
  },
  {
    id: "expandable-systems",
    title: "Expandable tent systems",
    description:
      "Components and expansion inventory used to build custom layouts—including connected runs with gutters for dining, dance, bar, and walkway zones.",
    categories: [
      {
        id: "tent-expandable",
        title: "Systems & components",
        items: [
          { id: "t-exp-30", label: "30′ EXP systems (up to 30′ × 60′), JTLITE", quantity: 3 },
          { id: "t-exp-20", label: "20′ EXP tents", quantity: 6 },
          { id: "t-40-end", label: "40′ ends", quantity: 6 },
          { id: "t-40-mid", label: "40′ mids", quantity: 8 },
          { id: "t-30-end", label: "30′ ends", quantity: 10 },
          { id: "t-30-mid", label: "30′ mids", quantity: 10 },
          { id: "t-anchor-3060", label: "30′ × 60′ one-piece anchor", quantity: 2 },
          { id: "t-anchor-3045", label: "30′ × 45′ two-piece anchor", quantity: 2 },
          { id: "t-marquee", label: "Marquee tents", quantityNote: "300′ total linear" },
        ],
      },
    ],
  },
  {
    id: "tables-seating",
    title: "Tables & chairs",
    description: "High-volume inventory coordinated with your tent layout and service plan.",
    categories: [
      {
        id: "tables",
        title: "Tables",
        items: [
          { id: "tb-8", label: "8′ banquet tables", quantity: 170 },
          { id: "tb-6", label: "6′ banquet tables", quantity: 140 },
          { id: "tb-5r", label: "5′ round tables", quantity: 150 },
          { id: "tb-48r", label: '48″ round tables', quantity: 30 },
          { id: "tb-36r", label: '36″ round tables', quantity: 32 },
          { id: "tb-72r", label: '72″ round tables', quantity: 29 },
          { id: "tb-hi", label: "High-top tables", quantity: 35 },
        ],
      },
      {
        id: "chairs",
        title: "Chairs",
        items: [
          { id: "ch-plastic", label: "Plastic folding chairs", quantity: 8000 },
          { id: "ch-padded", label: "White padded chairs", quantity: 300 },
        ],
      },
    ],
  },
  {
    id: "event-equipment",
    title: "Dance floors, lighting & other event equipment",
    description: "Complete the tented space—details and counts confirmed when you quote.",
    categories: [
      {
        id: "dance-floor",
        title: "Dance floor",
        overviewOnly: true,
        description: "Portable sections sized to your floor plan and tent layout.",
        items: [],
      },
      {
        id: "lighting",
        title: "Lighting",
        overviewOnly: true,
        description: "String, uplighting, and packages matched to structure and mood.",
        items: [],
      },
      {
        id: "tent-siding",
        title: "Tent siding & sidewalls",
        overviewOnly: true,
        description: "Solid, window, and weather-ready wall options.",
        items: [],
      },
      {
        id: "yard-games",
        title: "Yard games",
        overviewOnly: true,
        description: "Lawn entertainment for backyard and festival programs.",
        items: [],
      },
      {
        id: "bounce-houses",
        title: "Bounce houses",
        overviewOnly: true,
        description: "Family-friendly inflatables—coordinate power and placement with your site.",
        items: [],
      },
      {
        id: "event-accessories",
        title: "Event accessories",
        overviewOnly: true,
        description: "Staging, linens, climate, and finishing touches.",
        items: [],
      },
      {
        id: "addons",
        title: "Other add-ons",
        overviewOnly: true,
        description: "Bundled enhancements for a complete rental order.",
        items: [],
      },
    ],
  },
];

export type PopularCategoryCard = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const popularRentalCategories: PopularCategoryCard[] = [
  {
    id: "wedding-tents",
    title: "Wedding tent rentals",
    description: "Outdoor receptions, ceremony backup, and elegant layouts.",
    href: "/wedding-tent-rentals",
  },
  {
    id: "backyard",
    title: "Backyard party rentals",
    description: "Yard celebrations with tents, seating, and weather planning.",
    href: "/tent-rentals#plan-your-tent",
  },
  {
    id: "corporate",
    title: "Corporate event rentals",
    description: "Company picnics, schools, and professional presentations.",
    href: "/corporate-event-rentals",
  },
  {
    id: "tables-chairs",
    title: "Tables & chairs",
    description: "Round, banquet, and high-top inventory at scale.",
    href: "/table-chair-rentals",
  },
  {
    id: "packages",
    title: "Tent packages",
    description: "Bundled starting points—always quoted to your date and venue.",
    href: "/party-packages",
  },
  {
    id: "dance-lighting",
    title: "Dance floors & lighting",
    description: "Floor plans and lighting layered with your tent layout.",
    href: "/rental-inventory#category-dance-floor",
  },
  {
    id: "bounce-yard",
    title: "Bounce houses & yard games",
    description: "Family-friendly add-ons for festivals and private parties.",
    href: "/party-packages",
  },
];
