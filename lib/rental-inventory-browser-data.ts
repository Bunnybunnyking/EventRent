/**
 * Customer-facing rental inventory browser, data for /rental-inventory only.
 * Goodshuffle item ids: edit `lib/goodshuffle-catalog-ids.ts` so frame pages and these cards stay on the same SKU.
 */

export type AvailabilityTone = "quote" | "ask" | "coming-soon";

export type GoodshuffleProductHooks = {
  goodshuffleItemId?: string;
  goodshuffleImageId?: string;
  goodshuffleProductSlug?: string;
  wishlistEnabled?: boolean;
  waitlistEnabled?: boolean;
  availabilityStatus?: AvailabilityTone;
  /** Internal planning count; keep off the card headline, optional subtle line */
  internalCount?: number;
  sortOrder?: number;
  featured?: boolean;
};

export type RentalBrowserItem = GoodshuffleProductHooks & {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  dimensions?: string;
  seatingNote?: string;
  bestFor?: string;
  tags?: string[];
  /** Public image path under /public when available */
  image?: string;
  /** When set, the photo strip (image or Goodshuffle hook) links here */
  imageHref?: string;
};

import {
  frameDetailHrefForInventoryTentCard,
  goodshuffleProductHooksForInventoryTentId,
} from "./goodshuffle-catalog-ids";

export type InventoryNavItem = { id: string; label: string; href: string };

export const inventoryBrowserNav: InventoryNavItem[] = [
  { id: "inv-tent-guide", label: "Tent types", href: "#inv-tent-guide" },
  { id: "inv-tents", label: "Tents", href: "#inv-tents" },
  { id: "inv-chairs", label: "Chairs", href: "#inv-chairs" },
  { id: "inv-tables", label: "Tables", href: "#inv-tables" },
  { id: "inv-lighting-heating", label: "Lighting & heating", href: "#inv-lighting-heating" },
  { id: "inv-planning", label: "Planning notes", href: "#inv-planning" },
];

export type CategorySpotlight = {
  id: string;
  title: string;
  line: string;
  href: string;
  cta: string;
};

export const inventoryCategorySpotlights: CategorySpotlight[] = [
  {
    id: "spot-tents",
    title: "Tent rentals",
    line: "Clear-span frame tents in standard footprints, plus expandable bay systems and marquees when the plan grows.",
    href: "#inv-tents",
    cta: "View tents",
  }, {
    id: "spot-chairs", title: "Chair rentals", line: "From practical folding to elevated wedding seating.", href: "#inv-chairs", cta: "See seating", }, {
    id: "spot-tables", title: "Table rentals", line: "Banquets, rounds, and cocktail high-tops sized to your service style.", href: "#inv-tables", cta: "Browse tables", }, {
    id: "spot-light-heat", title: "Lighting & heating", line: "Ambiance and comfort when the sun sets or temps drop.", href: "#inv-lighting-heating", cta: "View options", }, {
    id: "spot-wedding", title: "Wedding favorites", line: "Tents, whites, rounds, and lighting that pair well for receptions.", href: "/wedding-tent-rentals", cta: "Wedding tents", }, {
    id: "spot-backyard", title: "Backyard party basics", line: "Compact tents, practical seating, and easy add-ons.", href: "/tent-rentals#tent-resource-tabs", cta: "Party tents", },
];

const gs = (): GoodshuffleProductHooks => ({});

export const tentInventoryCards: RentalBrowserItem[] = [
  {
    ...gs(),
    id: "tent-10x10",
    title: "10×10 frame tent",
    dimensions: "10′ × 10′",
    description: "Compact clear-span shade for patios, vendor rows, registration, and tight backyards.",
    bestFor: "Vendor · patio · small shade",
    tags: ["Frame", "Backyard", "Vendor"],
    seatingNote: "Standing or tight service, seated counts depend on layout.",
    internalCount: 52,
    imageHref: frameDetailHrefForInventoryTentCard("tent-10x10"),
    ...goodshuffleProductHooksForInventoryTentId("tent-10x10"),
  }, {
    ...gs(),
    id: "tent-12x12",
    title: "12×12 frame tent",
    dimensions: "12′ × 12′",
    description: "Step-up footprint when you need a little more room than a 10×10 without committing to a full reception span.",
    bestFor: "Small gatherings · buffer zones",
    tags: ["Frame", "Backyard", "Small event"],
    internalCount: 12,
    imageHref: frameDetailHrefForInventoryTentCard("tent-12x12"),
    ...goodshuffleProductHooksForInventoryTentId("tent-12x12"),
  }, {
    ...gs(),
    id: "tent-16x16",
    title: "16×16 frame tent",
    dimensions: "16′ × 16′",
    description: "Mid-size clear-span footprint for ceremonies, buffets, or breakout shade.",
    bestFor: "Ceremony backup · buffet",
    tags: ["Frame", "Wedding", "Corporate"],
    internalCount: 16,
    imageHref: frameDetailHrefForInventoryTentCard("tent-16x16"),
    ...goodshuffleProductHooksForInventoryTentId("tent-16x16"),
  }, {
    ...gs(),
    id: "tent-20x20",
    title: "20×20 frame tent",
    dimensions: "20′ × 20′",
    subtitle: "Clear-span · no center pole",
    description: "A backyard and community favorite, enough room for seating or a dance zone when planned tightly.",
    bestFor: "Backyard parties · seated blocks",
    tags: ["Frame", "Backyard", "Graduation"],
    seatingNote: "Often ~32 to 40 seated with rounds; layout-dependent.",
    internalCount: 18,
    featured: true,
    imageHref: frameDetailHrefForInventoryTentCard("tent-20x20"),
    ...goodshuffleProductHooksForInventoryTentId("tent-20x20"),
  }, {
    ...gs(),
    id: "tent-20x30",
    title: "20×30 frame tent",
    dimensions: "20′ × 30′",
    subtitle: "Clear-span · extra length vs 20×20",
    description:
      "Six hundred square feet clear-span when buffet lines, aisles, or a modest interior dance floor need more length than a 20×20 without jumping to 20×40.",
    bestFor: "Weddings · grad parties · service lanes",
    tags: ["Frame", "Wedding", "Backyard"],
    seatingNote: "Often ~48–72 seated at rounds when dance and service zones are planned intentionally.",
    imageHref: frameDetailHrefForInventoryTentCard("tent-20x30"),
    ...goodshuffleProductHooksForInventoryTentId("tent-20x30"),
  }, {
    ...gs(),
    id: "tent-30x30",
    title: "30×30 frame tent",
    dimensions: "30′ × 30′",
    description: "Strong midsize clear-span footprint for dinners that need aisles, head tables, or dance nearby.",
    bestFor: "Wedding reception · school events",
    tags: ["Frame", "Wedding", "Corporate"],
    seatingNote: "Often ~60 to 80 seated with rounds; add dance floor in planning.",
    internalCount: 12,
    featured: true,
    imageHref: frameDetailHrefForInventoryTentCard("tent-30x30"),
    ...goodshuffleProductHooksForInventoryTentId("tent-30x30"),
  }, {
    ...gs(),
    id: "tent-20x40",
    title: "20×40 frame tent",
    dimensions: "20′ × 40′",
    subtitle: "Clear-span · common seated + dance footprint",
    description:
      "About eight hundred square feet clear-span when dinner, dance, and buffet lines need more length than 20×30 without jumping to 30-foot widths.",
    bestFor: "Seated weddings · backyard milestones",
    tags: ["Frame", "Wedding", "Backyard"],
    seatingNote: "Often ~64–80 seated at rounds; layout-dependent.",
    imageHref: frameDetailHrefForInventoryTentCard("tent-20x40"),
    ...goodshuffleProductHooksForInventoryTentId("tent-20x40"),
  }, {
    ...gs(),
    id: "tent-30x45",
    title: "30×45 frame tent",
    dimensions: "30′ × 45′",
    subtitle: "Clear-span · dinner + dance + service",
    description:
      "Thirteen hundred fifty square feet clear-span when you need width and length for head table, dance, and buffet without splitting into multiple tents.",
    bestFor: "Weddings · corporate galas",
    tags: ["Frame", "Wedding", "Corporate"],
    seatingNote: "Often ~90–120 seated with intentional aisles; confirm with layout.",
    imageHref: frameDetailHrefForInventoryTentCard("tent-30x45"),
    ...goodshuffleProductHooksForInventoryTentId("tent-30x45"),
  }, {
    ...gs(),
    id: "tent-30x60",
    title: "30×60 frame tent",
    dimensions: "30′ × 60′",
    subtitle: "Clear-span · max frame class on many lots",
    description:
      "Eighteen hundred square feet clear-span for larger guest counts, wide dance plans, or generous service lanes when the lot can take the width.",
    bestFor: "Large receptions · schools · community",
    tags: ["Frame", "Wedding", "Community"],
    seatingNote: "Often ~120–160 seated; egress and production drive final counts.",
    imageHref: frameDetailHrefForInventoryTentCard("tent-30x60"),
    ...goodshuffleProductHooksForInventoryTentId("tent-30x60"),
  }, {
    ...gs(),
    id: "tent-exp-20",
    title: "20′ expandable tent system",
    subtitle: "Modular bays · not one fixed 20×20 square",
    dimensions: "20′ bay system",
    description:
      "Gutter-linked bays you combine into longer or wider runs, different animal than a single 20×20 frame box. Dining, dance, and bar can share one engineered roofline.",
    bestFor: "Growing guest lists · L-shaped sites",
    tags: ["Expandable", "Wedding", "Corporate"],
    internalCount: 6,
  }, {
    ...gs(),
    id: "tent-exp-30",
    title: "30′ expandable tent system",
    dimensions: "30′ bay · JTLITE class",
    description: "Wider modular bays for generous aisles, staging, or wide buffet runs when the program needs room to breathe.",
    bestFor: "Large receptions · galas",
    tags: ["Expandable", "Wedding", "Festival"],
    internalCount: 3,
  }, {
    ...gs(),
    id: "tent-exp-40",
    title: "40′ expandable components",
    dimensions: "40′ ends & mids",
    description: "Large modular sections for long runs and weather-tight connections, engineered with your site survey.",
    bestFor: "Major layouts · festivals",
    tags: ["Expandable", "Festival", "Corporate"],
    availabilityStatus: "quote",
  }, {
    ...gs(),
    id: "tent-60wide",
    title: "60′ wide tent systems",
    dimensions: "60′ class spans",
    description: "High-capacity clear-span for big guest programs, staging, sight lines, and load-in planned as a system.",
    bestFor: "Galas · festivals · large weddings",
    tags: ["Large structure", "Corporate", "Festival"],
    availabilityStatus: "quote",
  }, {
    ...gs(),
    id: "tent-marquee",
    title: "Marquee tents",
    subtitle: "Walkways & connectors · not a main reception box",
    dimensions: "Walkway & connector runs",
    description: "Entries, tent-to-building links, and rain-smart guest flow, great paired with frame or expandable mains.",
    bestFor: "Arrivals · queues · covered paths",
    tags: ["Marquee", "Wedding", "Corporate"],
    internalCount: 300,
  },
];

export const chairInventoryCards: RentalBrowserItem[] = [
  {
    ...gs(), id: "chair-beige-plastic", title: "Beige plastic folding chair", description: "Practical, high-volume seating for graduations, community events, and large backyards when you need dependable rows.", bestFor: "Large guest counts · quick setup", tags: ["Graduation", "Community"], internalCount: 8000, wishlistEnabled: true, }, {
    ...gs(), id: "chair-white-padded", title: "White padded chair", description: "Elevated look and comfort for ceremonies and receptions where photos and guest experience matter.", bestFor: "Weddings · formal dinners", tags: ["Wedding"], internalCount: 300, featured: true, wishlistEnabled: true, }, {
    ...gs(), id: "chair-white-on-white", title: "White-on-white folding chair", description: "Bright, clean styling that disappears into airy décor, popular when linens and tent walls are light.", bestFor: "Modern weddings · daytime events", tags: ["Wedding"], availabilityStatus: "ask", }, {
    ...gs(), id: "chair-cream", title: "Cream folding chair", description: "Warm neutral tone when you want softness without high contrast against garden or barn palettes.", bestFor: "Garden parties · neutral palettes", tags: ["Wedding", "Backyard"], availabilityStatus: "ask", }, {
    ...gs(), id: "chair-black", title: "Black folding chair", description: "Strong contrast for modern programs, brand-forward corporate setups, or evening lighting schemes.", bestFor: "Corporate · evening receptions", tags: ["Corporate", "Modern"], availabilityStatus: "ask", },
];

export const tableBanquetCards: RentalBrowserItem[] = [
  {
    ...gs(), id: "tbl-8banquet", title: "8′ banquet table", dimensions: "8′ × 30″", description: "Workhorse for buffets, gifts, registration, head tables, and casual rows when you want length without a full round layout.", bestFor: "Buffet · gifts · casual seating", tags: ["Backyard", "Corporate"], internalCount: 170, }, {
    ...gs(), id: "tbl-6banquet", title: "6′ banquet table", dimensions: "6′ × 30″", description: "Flexible length for tighter rooms, kids’ tables, or breakout zones alongside rounds.", bestFor: "Supporting rows · breakout", tags: ["School", "Corporate"], internalCount: 140, },
];

export const tableRoundCards: RentalBrowserItem[] = [
  {
    ...gs(), id: "tbl-60round", title: '60″ round table', dimensions: '60″ diameter', description: "The classic wedding and dinner round, pairs well with standard place settings and centerpieces.", seatingNote: "Often ~8 guests per table; confirm with linen and service style.", bestFor: "Seated weddings · dinners", tags: ["Wedding"], internalCount: 150, featured: true, }, {
    ...gs(), id: "tbl-72round", title: '72″ round table', dimensions: '72″ diameter', description: "Extra elbow room or larger centerpieces, great when comfort matters as much as capacity.", seatingNote: "Often ~10 guests; layout-dependent.", bestFor: "Upscale receptions", tags: ["Wedding"], internalCount: 29, }, {
    ...gs(), id: "tbl-48round", title: "48″ round table", dimensions: '48″ diameter', description: "Cake tables, sweetheart setups, or compact guest clusters without dominating the floor plan.", bestFor: "Sweetheart · accent tables", tags: ["Wedding", "Backyard"], internalCount: 30, }, {
    ...gs(), id: "tbl-36round", title: "36″ round table", dimensions: '36″ diameter', description: "Cocktail-height companion or compact stations when you need a small footprint.", bestFor: "Cocktail clusters · stations", tags: ["Wedding", "Corporate"], internalCount: 32, },
];

export const tableCocktailSpecialtyCards: RentalBrowserItem[] = [
  {
    ...gs(), id: "tbl-cocktail", title: "High-top / cocktail table", description: "Standing mingling, bar adjacencies, and perimeter seating, keeps flow open while guests have a drink rest.", bestFor: "Cocktail hour · mingling", tags: ["Wedding", "Corporate"], internalCount: 35, }, {
    ...gs(), id: "tbl-serpentine", title: "Serpentine table", description: "Curved buffet and display lines when you want flow around food or gifts.", bestFor: "Buffet lines · displays", tags: ["Wedding", "Corporate"], availabilityStatus: "ask", },
];

export const lightingCards: RentalBrowserItem[] = [
  {
    ...gs(), id: "light-bistro", title: "Bistro lights", description: "Warm perimeter and canopy glow that makes tents feel intentional after sunset, pairs with rounds and dance floors.", bestFor: "Receptions · patios", tags: ["Wedding", "Backyard"], availabilityStatus: "quote", }, {
    ...gs(), id: "light-christmas", title: "Christmas / string light packages", description: "Festive canopy coverage and seasonal character, scoped to structure type and timeline.", bestFor: "Holidays · winter events", tags: ["Community", "Corporate"], availabilityStatus: "quote", },
];

export const heatingCards: RentalBrowserItem[] = [
  {
    ...gs(), id: "heat-170", title: "170k BTU heater", description: "Larger enclosed tents and cold-season programs where output needs headroom, wind, sidewalls, and tent volume change what “enough” means.", bestFor: "Large enclosed footprints", tags: ["Corporate", "Wedding"], availabilityStatus: "quote", }, {
    ...gs(), id: "heat-80", title: "80k BTU heater", description: "Mid-size heated zones when the tent is partially enclosed or weather is moderate.", bestFor: "Mid-size tents", tags: ["Backyard", "School"], availabilityStatus: "quote", }, {
    ...gs(), id: "heat-40", title: "40k BTU heater", description: "Smaller enclosed setups and spot warming, always planned with ventilation and safety in mind.", bestFor: "Smaller enclosed tents", tags: ["Backyard"], availabilityStatus: "quote", },
];

export type TentTypeExplained = { id: string; title: string; blurb: string };

export const tentTypesExplained: TentTypeExplained[] = [
  {
    id: "tt-frame",
    title: "Frame & quick-peak tents",
    blurb:
      "Clear-span bays without center poles—rounds, dance, sidewalls. Quick-peak fits small yards and fast timelines.",
  },
  {
    id: "tt-pole",
    title: "Pole tents",
    blurb: "Classic peaks and elegant lines, often grass sites with staking; plan seating around poles.",
  },
  {
    id: "tt-marquee",
    title: "Marquee tents",
    blurb: "Covered walkways and connectors for arrivals, queues, and tent-to-building transitions.",
  },
  {
    id: "tt-large-expandable",
    title: "Large structures & expandable systems",
    blurb:
      "Expandable bays gutter together as counts grow. Sixty-foot-class clear-span for big programs—engineered to your site survey.",
  },
];

export type PlanningAccordion = { id: string; title: string; body: string };

export const inventoryPlanningNotes: PlanningAccordion[] = [
  {
    id: "plan-tent-size", title: "How to think about tent size", body: "Start with guest count, then add dance floor, buffet, head table, and aisles. One footprint rarely fits every program, we quote to your layout, not a generic chart alone.", }, {
    id: "plan-chairs", title: "Chairs for weddings vs backyard parties", body: "Weddings often lean on white or padded lines for photos and comfort; large community events prioritize durable folding inventory at scale. We match style to your run of show.", }, {
    id: "plan-rounds-banquet", title: "Rounds vs banquet tables", body: "Banquets excel for buffets, gifts, and casual rows. Rounds shine for seated weddings and formal service. Cocktails add mingling space without eating your dinner footprint.", }, {
    id: "plan-light-heat", title: "Why lighting and heating matter", body: "After sunset, lighting defines mood and safety. Heaters depend on tent volume, sidewalls, wind, and weather, tell us your date and enclosure plan so we recommend responsibly.", }, {
    id: "plan-sidewalls", title: "Sidewalls, flooring, staging", body: "Sidewalls, floors, staging, and dance surfaces are quoted to structure and schedule. Ask early so load-in and fire lanes stay clean.", },
];

export type FeaturedCurated = {
  id: string;
  title: string;
  blurb: string;
  items: RentalBrowserItem[];
};

export const featuredCuratedCollections: FeaturedCurated[] = [
  {
    id: "feat-wedding", title: "Wedding favorites", blurb: "A starting mix teams often pair, final counts always follow your floor plan.", items: [], }, {
    id: "feat-backyard", title: "Backyard party essentials", blurb: "Compact shade, practical seating, and tables that fit real yards, not showroom diagrams.", items: [], },
];

/** Curated picks reference real inventory cards by id */
/** Curated picks intentionally skip `tent-20x20` so it is not repeated under “Wedding favorites” / “Backyard essentials” (it stays in the main tent grid). */
export const weddingFavoriteIds = ["tent-30x30", "tent-16x16", "chair-white-padded", "tbl-60round", "light-bistro"] as const;
export const backyardEssentialIds = ["tent-10x10", "tent-16x16", "chair-beige-plastic", "tbl-8banquet"] as const;
