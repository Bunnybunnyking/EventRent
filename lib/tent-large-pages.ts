import type { TentSizePageData } from "./tent-section-types";

const disclaimer =
  "Capacities are estimates and depend on layout, staging, production, local codes, and site conditions, your quote is built from a real layout conversation.";

export const largeEventTentPages: Record<string, TentSizePageData> = {
  "60x60-event-tent": {
    slug: "60x60-event-tent",
    sizeLabel: "60×60",
    sqft: 3600,
    pageTitle: "60×60 Large Event Tent | Clear-Span Structure | Connecticut",
    metaDescription:
      "60×60 large clear-span event tent rentals in Connecticut, high-capacity layouts for galas, weddings, and community events. Layout-first quoting with Connecticut Party Rentals.",
    heroSubhead: "Large clear-span footprint for high-capacity layouts when frame tents need to go big.",
    guestSeatedEstimate: "Large ranges possible, often hundreds seated depending on production, stage, and dance floor, planned per event.",
    guestCocktailEstimate: "Standing or hybrid formats scale with egress, bar count, and life-safety planning.",
    bestEventTypes: ["Galas", "Large weddings", "Community events", "Corporate celebrations"],
    surfacesNote: "Site survey matters: access, anchoring, utilities, and safety plans are part of large-structure quoting.",
    whatFits: [
      "When you need true large-format clearspan for stage, dance, and seated zones together.",
      "Often paired with marquee entries, satellite prep tents, and exterior queue control.",
    ],
    layoutExamples: [
      { title: "Stage-forward gala", body: "Stage, dance, and seated zones mapped with production sightlines." },
      { title: "Wedding reception at scale", body: "Head table, rounds, and dance floor with intentional aisles." },
      { title: "Community or school event", body: "Flexible rows, tables, or hybrid seating, planned around egress." },
    ],
    whenToSizeUp: [
      "You need more clearspan than 60×60, evaluate 60×90 or 60×150 structures and modular connectors.",
      "You want separate ceremony and full reception without reset, often multiple footprints.",
    ],
    bestAddOns: [
      "Marquee walkways",
      "Sidewalls / glass walls (as specified)",
      "Flooring and leveling",
      "Lighting and power distribution",
      "Satellite prep or catering tents",
    ],
    faqs: [
      {
        question: "How far in advance should we plan a 60×60?",
        answer:
          "Large structures touch logistics, safety, and access, earlier planning helps secure the right crew windows and supporting inventory.",
      },
      {
        question: "Is capacity guaranteed?",
        answer: `No. ${disclaimer}`,
      },
    ],
  },

  "60x90-event-tent": {
    slug: "60x90-event-tent",
    sizeLabel: "60×90",
    sqft: 5400,
    pageTitle: "60×90 Large Event Tent | Connecticut Party Rentals",
    metaDescription:
      "60×90 clear-span large event tent rentals, expanded footprint for major receptions, community events, and production-heavy layouts in Connecticut.",
    heroSubhead: "Expanded clear-span for major layouts, stage, dance, and seated zones planned as one system.",
    guestSeatedEstimate: "Very large ranges possible, final counts come from layout, egress, and production needs.",
    guestCocktailEstimate: "Hybrid formats depend on bar placement, furniture, and safety planning.",
    bestEventTypes: ["Large galas", "Major weddings", "Festivals", "Institutional events"],
    whatFits: [
      "When 60×60 is not enough width/length for production and guest experience goals.",
      "Often coordinated with multiple entry points and marquee connectors.",
    ],
    layoutExamples: [
      { title: "Wide stage + dance + rounds", body: "Separation between production and guest seating is planned intentionally." },
      { title: "Dual buffet lines", body: "Length helps reduce queue friction when planned with aisles." },
      { title: "Head table + large dance", body: "Sightlines and speaker placement confirmed during layout." },
    ],
    whenToSizeUp: [
      "You need even more continuous clearspan, review 60×150 and modular connection strategy.",
    ],
    bestAddOns: ["Marquee systems", "Flooring", "Climate and weather planning", "Exterior queue tents"],
    faqs: [
      {
        question: "Do you help with layout drawings?",
        answer:
          "We plan practically with your guest count and run-of-show, formal CAD may depend on your venue and vendors, but we align rental footprints to real use.",
      },
      { question: "Is capacity guaranteed?", answer: `No. ${disclaimer}` },
    ],
  },

  "60x150-event-structure": {
    slug: "60x150-event-structure",
    sizeLabel: "60×150",
    sqft: 9000,
    pageTitle: "60×150 Event Structure | Largest Clear-Span Footprint | CT",
    metaDescription:
      "60×150 large event structure rentals, maximum continuous footprint for major Connecticut events. Layout-first planning with Connecticut Party Rentals.",
    heroSubhead: "Our largest continuous clear-span class page, built for major events that need serious square footage.",
    guestSeatedEstimate: "Major events only, capacity is entirely layout- and code-dependent.",
    guestCocktailEstimate: "Hybrid formats require professional egress and safety planning.",
    bestEventTypes: ["Major festivals", "Institutional events", "Very large galas"],
    surfacesNote: "Large-structure installs require site-specific engineering conversations, quote-driven.",
    whatFits: [
      "When the event needs a single massive footprint or coordinated multi-zone planning inside one roofline.",
      "Often paired with extensive exterior marquee and satellite tents.",
    ],
    layoutExamples: [
      { title: "Multi-zone reception", body: "Define ceremony, cocktail, and reception zones with staff paths." },
      { title: "Production-heavy stage show", body: "Stage, audio, and guest seating mapped with safety in mind." },
      { title: "Community-scale seating", body: "Rows, tables, or hybrid, planned around egress." },
    ],
    whenToSizeUp: [
      "If you need modular connectors beyond a single box, review expandable systems and marquee strategy.",
    ],
    bestAddOns: ["Marquee network", "Flooring", "Power and lighting", "Weather strategy", "Satellite prep tents"],
    faqs: [
      {
        question: "Is this the right structure for my event?",
        answer:
          "Maybe, large structures start with site access, footprint, and safety. We will tell you honestly what is practical for your date and location.",
      },
      { question: "Is capacity guaranteed?", answer: `No. ${disclaimer}` },
    ],
  },
};

export const largeEventTentSlugs = Object.keys(largeEventTentPages);
