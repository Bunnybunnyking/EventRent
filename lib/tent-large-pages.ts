import type { TentPairedRental, TentSizePageData } from "./tent-section-types";

const disclaimer =
  "Capacities are not guaranteed—they follow layout, egress, production, codes, and what your site can support.";

function pr(title: string, note?: string): TentPairedRental {
  return note ? { title, note } : { title };
}

export const largeEventTentPages: Record<string, TentSizePageData> = {
  "60x60-event-tent": {
    slug: "60x60-event-tent",
    sizeLabel: "60×60",
    sqft: 3600,
    heroHeadline: "60×60 large event tent rental in Connecticut",
    pageTitle: "60×60 Large Event Tent | High-Capacity Clear-Span | CT",
    metaDescription:
      "60×60 large clear-span event tent in Connecticut: major receptions, galas, and community programs. Layout-first quoting—no invented capacities.",
    heroSubhead: "Large-format clearspan when frame sizes need real scale—stage, dance, and seated zones planned as one system.",
    quickAnswer:
      "A 60×60 large event tent is a 3,600-square-foot class clear-span structure. It is for major weddings, galas, and community events that need high guest movement, production, and service under one engineered roof—not backyard shorthand sizing.",
    bestForWho: ["Major weddings and galas", "Community and school programs at scale", "Corporate celebrations with staging", "Festivals when one large bay fits the plan"],
    tentOverview:
      "These structures are a different logistics class than backyard frame sizes: access routes, anchoring, power, weather, and life-safety planning all join the conversation early. Compared with smaller tents you gain real width for production and aisles; compared with longer 60-foot-class spans you trade length until the program proves more continuous footprint is required.",
    commonEventUses: ["Gala seated dinner with stage", "Large wedding reception", "Community festival anchor tent", "Corporate field day headquarters"],
    planningNotes: [
      "Site survey and access plan precede a firm yes—send maps and gate widths early.",
      "Stage, delay towers, and subs need real estate on the plan—not afterthoughts.",
      "Marquee entries often manage rain and crowd flow from parking.",
      "Power distro scales with lighting, kitchen, and AV—vendor list helps.",
    ],
    guestSeatedEstimate: "Large ranges are possible; final counts follow layout, egress, and production, not a headline number.",
    guestCocktailEstimate: "Hybrid formats depend on bar count, furniture, and safety planning—not guest tally alone.",
    surfacesNote: "Surface load, anchoring, and crew staging are quote-driven with photos and sometimes a walk-through.",
    whatFits: [
      "When you need true large-format clearspan for stage, dance, and seated zones together.",
      "Often coordinated with marquee entries, satellite prep tents, and exterior queue control.",
    ],
    layoutExamples: [
      { title: "Stage-forward gala", body: "Stage, dance, and seated zones mapped with production sightlines." },
      { title: "Wedding at scale", body: "Head table, rounds, and dance separated with intentional aisles." },
      { title: "Community program", body: "Rows, tables, or hybrid seating planned around egress." },
    ],
    whenToSizeUp: [
      "You need more continuous clearspan than 60×60—evaluate 60×90 or 60×150 and connector strategy.",
      "You want separate full ceremony and reception without reset—often multiple footprints.",
    ],
    bestAddOns: ["Marquee walkways", "Sidewalls or glass walls as specified", "Flooring and leveling", "Lighting and power distribution", "Satellite prep or catering tents"],
    pairedRentals: [
      pr("Marquee arrival system", "Dry guest path from parking or building."),
      pr("Flooring package", "Grade changes and chair stability at scale."),
      pr("Sidewall / window strategy", "Weather and wind without trapping heat blindly."),
      pr("Lighting & power distro", "Practical plus decorative layers with load math."),
      pr("Satellite prep tent", "Catering separation from guest floor."),
    ],
    faqs: [
      {
        question: "What kinds of events use a 60×60?",
        answer:
          "Large galas, major weddings, and community events that need one big clearspan for stage, dance, and seated guests together. If your program is smaller, a frame size may save cost and complexity.",
      },
      {
        question: "Is this better for weddings, festivals, or corporate events?",
        answer:
          "All three appear when the guest count, production, and site support it. We pick structure class from your run of show and access, not from the invitation alone.",
      },
      {
        question: "How far in advance should we plan?",
        answer:
          "Large structures touch logistics and safety windows—earlier planning secures inventory and crew time. Reach out as soon as date and venue are firm.",
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
    heroHeadline: "60×90 large event tent rental in Connecticut",
    pageTitle: "60×90 Large Event Tent | Expanded Clear-Span | CT",
    metaDescription:
      "60×90 clear-span large event tent rentals in Connecticut—expanded footprint for major receptions, festivals, and production-heavy layouts. Quote with site context.",
    heroSubhead: "Fifty-four hundred square feet continuous clearspan—more length for production, queues, and guest circulation.",
    quickAnswer:
      "A 60×90 large event tent is about 5,400 square feet in one clear-span class footprint. It is for major programs that outgrew 60×60—wider stages, longer buffet runs, or bigger seated fields—still planned with layout and safety first.",
    bestForWho: ["Major galas and fundraisers", "Large weddings with big dance and service", "Festivals and institutional events", "Programs that need length for queues"],
    tentOverview:
      "Extra length helps separate production from guest seating, run dual buffet lines, or park a large stage without stealing every aisle. Compared with 60×60 you buy runway; compared with 60×150 you stay slightly easier on some sites. Access and ballast still decide what is honest for your date.",
    commonEventUses: ["Wide stage + dance + rounds", "Dual buffet receptions", "Community festivals with anchor tent", "Corporate town-hall under tent"],
    planningNotes: [
      "Length is only helpful if doors, generators, and truck paths agree—map them early.",
      "Dual bars need facing walls or separated approaches—avoid head-on queues.",
      "Weather strategy scales with wall height and fan placement.",
      "Photography and EMS routes stay in the first plan pass.",
    ],
    guestSeatedEstimate: "Very large ranges possible—final counts follow layout, egress, and production.",
    guestCocktailEstimate: "Hybrid formats hinge on bar placement and safety planning.",
    whatFits: [
      "When 60×60 is not enough length for production goals and guest comfort together.",
      "Often paired with marquee networks and exterior queue tents.",
    ],
    layoutExamples: [
      { title: "Wide stage + dance + rounds", body: "Production and guest seating separated on purpose." },
      { title: "Dual buffet lines", body: "Length reduces queue friction when aisles stay wide." },
      { title: "Head table + large dance", body: "Sightlines and delay speakers planned with footprint." },
    ],
    whenToSizeUp: [
      "You need even more continuous clearspan—review 60×150 and modular connectors.",
    ],
    bestAddOns: ["Marquee systems", "Flooring", "Climate and weather planning", "Exterior queue tents", "Power and lighting"],
    pairedRentals: [
      pr("Extended marquee network", "Guest dry routes at festival scale."),
      pr("Flooring & leveling", "For grade and chair stability."),
      pr("Climate planning", "Walls, fans, heaters as a system—not one-off add-ons."),
      pr("Exterior queue tents", "When lines start outside the main footprint."),
      pr("Power distribution", "Matches AV, catering, and lighting loads."),
    ],
    faqs: [
      {
        question: "60×90 vs 60×60—which fits my event?",
        answer:
          "Choose 60×90 when length solves a real problem: bigger stage, dual buffets, longer guest rows, or cleaner separation between production and seating. Stay at 60×60 when the program fits the smaller box honestly.",
      },
      {
        question: "Can the layout be configured in different lengths?",
        answer:
          "Inside this footprint we reconfigure furniture and service lanes; if you need a different continuous span class, we move to another structure size or modular plan.",
      },
      {
        question: "Do you help with drawings?",
        answer:
          "We plan practically with your guest count and run-of-show. Formal CAD may involve your venue or vendors, but we align rental footprints to real use.",
      },
      {
        question: "Is capacity guaranteed?",
        answer: `No. ${disclaimer}`,
      },
    ],
  },

  "60x150-event-structure": {
    slug: "60x150-event-structure",
    sizeLabel: "60×150",
    sqft: 9000,
    heroHeadline: "60×150 event structure rental in Connecticut",
    pageTitle: "60×150 Event Structure | Maximum Clear-Span Class | CT",
    metaDescription:
      "60×150 large event structure rentals in Connecticut—maximum continuous clear-span class footprint for major programs. Honest site and layout planning.",
    heroSubhead: "Nine thousand square feet continuous clearspan class—major events that need serious single-roof square footage.",
    quickAnswer:
      "A 60×150 event structure is about 9,000 square feet in our largest continuous clear-span class highlighted here. It is for major festivals, institutional events, and very large galas that need one massive roofline or tightly coordinated interior zones—not a shortcut around real site logistics.",
    bestForWho: ["Major festivals and public programs", "Institutional events", "Very large galas when one roof is the goal", "Production teams that already know staging requirements"],
    tentOverview:
      "This class assumes professional planning: access, anchoring, weather, power, egress, and often a network of marquees outside the main box. Versus 60×90 you add length for the biggest programs; versus modular multi-bay strategies you pick one continuous span when that is truly what the site and safety story support.",
    commonEventUses: ["Festival anchor structure", "Multi-zone reception under one roof", "Large-scale community seating", "Production-heavy stage shows"],
    planningNotes: [
      "Single on-site decision maker for crew questions speeds install.",
      "Satellite tents for prep, merch, or EMS should be sketched before load-in.",
      "Weather and wind exposure drive wall strategy—partial vs full enclosure.",
      "Parking and pedestrian flow often need marquee work outside the main span.",
    ],
    guestSeatedEstimate: "Major events only—counts are entirely layout- and code-dependent.",
    guestCocktailEstimate: "Hybrid formats require professional egress and safety planning.",
    surfacesNote: "Large-structure installs are site-specific; quotes follow engineering-minded conversations, not online guesswork.",
    whatFits: [
      "When the program needs one very large continuous footprint or tightly choreographed interior zones.",
      "Often paired with extensive marquee and satellite tent strategy.",
    ],
    layoutExamples: [
      { title: "Multi-zone reception", body: "Ceremony, cocktail, and reception zones with staff paths mapped." },
      { title: "Production-heavy stage show", body: "Stage, audio, and guest seating with safety in mind." },
      { title: "Community-scale seating", body: "Rows, tables, or hybrid seating around egress." },
    ],
    whenToSizeUp: [
      "If modular connectors beyond a single box fit the site better, we compare expandable strategy and marquee plans honestly.",
    ],
    bestAddOns: ["Marquee network", "Flooring", "Power and lighting", "Weather strategy", "Satellite prep tents"],
    pairedRentals: [
      pr("Full marquee network", "Parking-to-tent dry routes at scale."),
      pr("Power & lighting design", "Production loads mapped to generators or house power."),
      pr("Flooring system", "Grade, trip hazards, and chair stability."),
      pr("Climate strategy", "Walls, fans, heaters coordinated."),
      pr("Satellite tents", "Prep, merch, first aid, or queue control."),
    ],
    faqs: [
      {
        question: "Is this the right structure for my event?",
        answer:
          "Maybe. Large structures start with site access, footprint, and safety. We tell you honestly what is practical for your date and location before we commit inventory.",
      },
      {
        question: "What kinds of events use a 60×150?",
        answer:
          "Major festivals, institutional programs, and very large galas that need one continuous span or tightly linked interior programming—not typical backyard parties.",
      },
      {
        question: "Can I configure layout in sections?",
        answer:
          "Inside the footprint we map zones and furniture; changing the physical span means a different structure or modular plan—we compare during quoting.",
      },
      {
        question: "Is capacity guaranteed?",
        answer: `No. ${disclaimer}`,
      },
    ],
  },
};

export const largeEventTentSlugs = Object.keys(largeEventTentPages);
