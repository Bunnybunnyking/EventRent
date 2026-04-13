import type { TentSizePageData } from "./tent-section-types";

const disclaimer =
  "Capacities are estimates and depend on table size, aisle width, dance floor, buffet, bar, stage, decor, and site layout.";

function faqCommon(sizeLabel: string): TentSizePageData["faqs"] {
  return [
    {
      question: `How many guests fit in a ${sizeLabel} frame tent?`,
      answer: `It depends how you use the space. Seated rounds need more footprint than cocktail-style standing room. ${disclaimer}`,
    },
    {
      question: "Can we add sidewalls later?",
      answer:
        "Often yes, sidewalls are planned with the rental so anchoring and layout stay coherent. Ask during quoting so we reserve the right wall type for your tent.",
    },
    {
      question: "When should I choose the next size up?",
      answer:
        "If you want a larger dance floor, buffet lines inside the tent, lounge furniture, or a bigger head table, stepping up early usually feels better than squeezing everything in.",
    },
  ];
}

/** All /tents/frame-tents/[slug] pages */
export const frameTentPages: Record<string, TentSizePageData> = {
  "10x10-frame-tent-rental": {
    slug: "10x10-frame-tent-rental",
    sizeLabel: "10×10",
    sqft: 100,
    pageTitle: "10×10 Frame Tent Rental | Small Cover & Vendor Booths | Connecticut",
    metaDescription:
      "10×10 frame tent rentals in Connecticut: compact cover for bars, DJs, catering prep, registration, and small shade zones. No center pole, quick footprint for tight sites.",
    heroSubhead: "Compact, versatile cover for bars, DJs, prep, and tight backyards, without a center pole.",
    guestSeatedEstimate: "Often used for cover and service zones rather than full seated dinners, typically a few tables or standing room.",
    guestCocktailEstimate: "Cocktail or standing reception snippets, or a focused service island (bar, dessert, gift table).",
    bestEventTypes: ["DJ or band cover", "Bar or dessert station", "Catering prep / staging", "Registration or check-in"],
    surfacesNote: "Popular on patios, asphalt, and lawns where a small footprint keeps stakes or ballasts manageable.",
    whatFits: [
      "A natural add-on when the main tent handles dinner but you want the DJ, bar, or buffet slightly separated.",
      "Works well as a weather shield for equipment or a compact hospitality nook.",
    ],
    layoutExamples: [
      {
        title: "DJ or entertainment shell",
        body: "Keeps gear covered while the main tent handles seating, common for dinner-plus-dance layouts.",
      },
      {
        title: "Bar or specialty station",
        body: "Defines a drink or dessert zone without stealing square footage from the primary tent.",
      },
      {
        title: "Prep or staging",
        body: "Short-term cover for catering flow when the main kitchen or buffet lives in a larger structure.",
      },
    ],
    whenToSizeUp: [
      "You want multiple service lines or guest seating inside the same footprint.",
      "You need a buffet line and bar inside with comfortable circulation, consider 20×20 or larger.",
    ],
    bestAddOns: [
      "Sidewalls for wind-driven rain",
      "Lighting for evening service",
      "Weights for hard surfaces",
      "Coordinated tables/chairs from inventory",
    ],
    faqs: faqCommon("10×10"),
  },

  "12x12-frame-tent-rental": {
    slug: "12x12-frame-tent-rental",
    sizeLabel: "12×12",
    sqft: 144,
    pageTitle: "12×12 Frame Tent Rental | Connecticut Party Rentals",
    metaDescription:
      "12×12 frame tent rentals: small clear-span footprint for tight yards, service areas, and auxiliary cover next to a larger main tent.",
    heroSubhead: "A step up from 10×10 for slightly larger service islands or compact guest clusters.",
    guestSeatedEstimate: "Limited seated counts, often used for auxiliary seating samples or small clusters, not full receptions.",
    guestCocktailEstimate: "Modest standing or cocktail zones when paired with other structures.",
    bestEventTypes: ["Auxiliary cover", "Vendor or hospitality nooks", "Tight residential lots"],
    whatFits: [
      "Helpful when you need a little more width than 10×10 for bar lines or guest circulation.",
      "Pairs with larger frame tents for split buffet, dessert, or lounge concepts.",
    ],
    layoutExamples: [
      { title: "Expanded service island", body: "Extra width for bar back-stock or dual service points." },
      { title: "Compact lounge", body: "Soft seating vignette without committing a large footprint." },
      { title: "Sideyard cover", body: "When the main tent sits in the backyard and you need a satellite zone." },
    ],
    whenToSizeUp: [
      "You want true seated rounds for more than a handful of guests in one tent.",
      "You need dance floor plus seating in the same structure, move toward 20×30+.",
    ],
    bestAddOns: ["Sidewalls", "Lighting", "Flooring for uneven turf", "Marquee connector to main tent"],
    faqs: faqCommon("12×12"),
  },

  "16x16-frame-tent-rental": {
    slug: "16x16-frame-tent-rental",
    sizeLabel: "16×16",
    sqft: 256,
    pageTitle: "16×16 Frame Tent Rental | Mid-Size Clear-Span | Connecticut",
    metaDescription:
      "16×16 frame tent rentals for Connecticut events: mid-size clear-span footprint for intimate seated dinners, lounge zones, or expanded service areas.",
    heroSubhead: "A practical mid-size clear-span when you need more room than small pop-ups but not a full 20×40 run.",
    guestSeatedEstimate: "Roughly 20–32 seated depending on rounds vs. banquet, head table, and aisle plan, layout dependent.",
    guestCocktailEstimate: "Often 35–55+ for standing cocktail if you are not filling the floor with tables.",
    bestEventTypes: ["Small receptions", "VIP or lounge zones", "Expanded buffet or bar cover"],
    whatFits: [
      "A sweet spot for intimate seated layouts or a defined lounge when a larger tent handles the main meal.",
      "Useful when the site has an odd pocket of space between buildings or landscape features.",
    ],
    layoutExamples: [
      { title: "Intimate seated dinner", body: "A few rounds with space for service, keep aisles generous for photography and comfort." },
      { title: "Cocktail cluster", body: "High-tops and a small bar footprint for mingling-heavy timelines." },
      { title: "Hybrid lounge + service", body: "Soft seating with a compact bar when you want a second experience zone." },
    ],
    whenToSizeUp: [
      "You want dance floor and full seated dinner in the same tent.",
      "Buffet lines and head table eat most of the floor, 20×30+ is usually calmer.",
    ],
    bestAddOns: ["Sidewalls", "Lighting", "Dance floor adjacent or partial inside", "Marquee connector"],
    faqs: faqCommon("16×16"),
  },

  "20x20-frame-tent-rental": {
    slug: "20x20-frame-tent-rental",
    sizeLabel: "20×20",
    sqft: 400,
    pageTitle: "20×20 Frame Tent Rental | Small Receptions & Service Cover | CT",
    metaDescription:
      "20×20 frame tent rental in Connecticut: 400 sq ft clear-span footprint for small seated dinners, cocktail clusters, and add-on service tents next to larger layouts.",
    heroSubhead: "400 square feet of clear-span space, ideal for intimate dinners, satellite bars, and tight residential lots.",
    guestSeatedEstimate: "Often roughly 32–48 seated with standard rounds, depends on head table, dance floor, and aisles.",
    guestCocktailEstimate: "Frequently 55–80+ standing cocktail if tables are minimal.",
    bestEventTypes: ["Backyard dinners", "Satellite bars next to a main tent", "Grad parties", "Corporate hospitality"],
    whatFits: [
      "A strong small-footprint option when you want real seated capacity without jumping to a long rectangle.",
      "Pairs well as an add-on when your main tent handles dinner but you want DJ, dessert, or lounge outside that footprint.",
    ],
    layoutExamples: [
      {
        title: "Seated dinner (compact)",
        body: "Rounds with a modest dance floor slice or dance floor just outside the tent edge on patio or lawn.",
      },
      { title: "Cocktail-forward", body: "High-tops and a small bar wall, great when mingling is the main event." },
      {
        title: "Service / vendor",
        body: "Cover for buffet, dessert, or vendor row when the main tent is dedicated to seating.",
      },
    ],
    whenToSizeUp: [
      "You want buffet lines and dance floor inside the same tent with comfortable aisles, consider 20×30 or 20×40.",
      "Head table, large stage, or lounge furniture are non-negotiables inside the same footprint.",
    ],
    bestAddOns: [
      "Sidewalls for weather",
      "Lighting package",
      "10×10 DJ tent if you want audio separated",
      "Marquee connector to a larger structure",
    ],
    faqs: faqCommon("20×20"),
  },

  "20x30-frame-tent-rental": {
    slug: "20x30-frame-tent-rental",
    sizeLabel: "20×30",
    sqft: 600,
    pageTitle: "20×30 Frame Tent Rental | Connecticut | Dinner + Service Flow",
    metaDescription:
      "20×30 frame tent rentals: 600 sq ft clear-span for events that need more length than 20×20, better aisles, buffet lines, or a modest dance floor inside.",
    heroSubhead: "Extra length without a full 20×40, helpful when you need aisles, buffet, or a tight dance floor inside.",
    guestSeatedEstimate: "Often roughly 48–72 seated with rounds, depends on dance floor, head table, and buffet placement.",
    guestCocktailEstimate: "Higher standing counts when tables are sparse; plan bars so lines do not choke aisles.",
    bestEventTypes: ["Weddings", "Graduations", "Corporate dinners", "Backyard celebrations"],
    whatFits: [
      "A practical step-up when 20×20 feels tight for service staff and guest movement.",
      "Works when you want a small dance floor inside without jumping two size classes.",
    ],
    layoutExamples: [
      { title: "Seated dinner + slim dance", body: "Keep dance floor modest so aisles stay safe, often dance partially outside the perimeter." },
      { title: "Buffet along one long side", body: "Uses length for queue space so rounds stay open." },
      { title: "Ceremony flip to dinner", body: "Enough length for rows then rounds if timeline allows a reset." },
    ],
    whenToSizeUp: [
      "You want a comfortable dance floor and buffet inside with wide aisles, 20×40 is often smoother.",
      "Guest count climbs past the mid-60s seated with rounds, recheck layout before locking size.",
    ],
    bestAddOns: ["Sidewalls", "Lighting", "Dance floor", "Separate 10×20 prep tent for catering if needed"],
    faqs: faqCommon("20×30"),
  },

  "20x40-frame-tent-rental": {
    slug: "20x40-frame-tent-rental",
    sizeLabel: "20×40",
    sqft: 800,
    pageTitle: "20×40 Frame Tent Rental | What Fits | Connecticut Party Rentals",
    metaDescription:
      "20×40 frame tent rental in Connecticut: ~800 sq ft clear-span, popular for seated dinners in the ~50–65 guest range, with room for buffet, bar, and dance when planned intentionally.",
    heroSubhead:
      "One of the most requested footprints for seated dinners and mixed layouts, clear-span, no center pole, flexible along the long sides.",
    guestSeatedEstimate:
      "Often roughly 50–65 seated with rounds, head table, buffet inside, dance floor, and aisles change the math quickly.",
    guestCocktailEstimate: "Higher counts for standing cocktail; plan bar placement so lines do not block egress.",
    bestEventTypes: ["Weddings", "Corporate awards", "Family celebrations", "Backyard tented receptions"],
    surfacesNote: "Works on many surfaces with appropriate anchoring, grass, asphalt, and some patios after site review.",
    whatFits: [
      "A strong answer tent for “what fits in a 20×40?” when you want seated dinner with realistic aisles.",
      "Buffet and bar can live inside when lines are designed, otherwise consider spill to a 10×10 or marquee connector.",
    ],
    layoutExamples: [
      {
        title: "Seated dinner",
        body: "Rounds with a defined head table lane, keep aisles wide enough for photography and service.",
      },
      {
        title: "Cocktail + seated hybrid",
        body: "Some high-tops early, then flip to rounds, confirm timeline and staff path with your planner.",
      },
      {
        title: "Dinner + dance",
        body: "Works when dance floor size is intentional, if you want a large floor plus buffet inside, size up or split functions.",
      },
    ],
    whenToSizeUp: [
      "Guest count pushes past the mid-60s seated with rounds.",
      "You want a large dance floor, big stage, and buffet all comfortably inside.",
      "You expect sidewalls closed most of the night, breathing room matters for comfort.",
    ],
    bestAddOns: [
      "Sidewalls / window walls",
      "Lighting (bistro, chandeliers, practical work light)",
      "Dance floor",
      "10×10 DJ tent or 10×20 prep tent when splitting functions",
      "Marquee walkway to building or parking",
    ],
    faqs: [
      {
        question: "What size tent for 60 guests?",
        answer:
          "A 20×40 is often in the conversation for seated rounds, exact fit depends on dance floor, buffet, bar, and aisle plan. We right-size from layout, not guest count alone.",
      },
      ...faqCommon("20×40"),
    ],
  },

  "30x30-frame-tent-rental": {
    slug: "30x30-frame-tent-rental",
    sizeLabel: "30×30",
    sqft: 900,
    pageTitle: "30×30 Frame Tent Rental | 900 sq ft | Connecticut",
    metaDescription:
      "30×30 frame tent rentals in Connecticut: ~900 sq ft clear-span, popular when you need more width and depth than 20×40 for dance floor, lounge, or larger seated counts.",
    heroSubhead: "Nine hundred square feet of clear-span, strong for mid-size receptions that need breathing room.",
    guestSeatedEstimate: "Often roughly 60–80 seated with rounds, depends on dance floor, stage, buffet, and head table.",
    guestCocktailEstimate: "Standing cocktail can go higher, still plan bar and egress intentionally.",
    bestEventTypes: ["Weddings", "Corporate galas", "School events", "Large backyard parties"],
    whatFits: [
      "A common upgrade when 20×40 feels tight for dance floor plus comfortable seating.",
      "Better for mixed layouts: lounge + rounds + service zones when planned together.",
    ],
    layoutExamples: [
      { title: "Seated + dance inside", body: "More width helps separate dance floor from rounds without cramming tables." },
      { title: "Buffet + rounds", body: "Buffet along one side with queue space, avoid choking the aisle." },
      { title: "Ceremony in the round", body: "Works when furniture clears efficiently for the reception reset." },
    ],
    whenToSizeUp: [
      "You want dinner, large dance floor, and full buffet comfortably inside with wide aisles, look at 30×45.",
      "Guest counts climb toward 100 seated with rounds, validate layout early.",
    ],
    bestAddOns: ["Sidewalls", "Lighting", "Flooring", "Marquee entry", "Separate prep tent"],
    faqs: faqCommon("30×30"),
  },

  "30x45-frame-tent-rental": {
    slug: "30x45-frame-tent-rental",
    sizeLabel: "30×45",
    sqft: 1350,
    pageTitle: "30×45 Frame Tent Rental | Dinner + Dance Layouts | Connecticut",
    metaDescription:
      "30×45 frame tent rental: ~1,350 sq ft clear-span for dinner-plus-dance layouts, larger seated counts, and mixed-use receptions, Connecticut Party Rentals.",
    heroSubhead:
      "A powerhouse footprint for dinner, dance, and service zones when you want everything under one roof without jumping to the largest structures.",
    guestSeatedEstimate:
      "Often roughly 90–120 seated with rounds, strongly depends on dance floor, stage, buffet, and lounge furniture.",
    guestCocktailEstimate: "Standing cocktail counts can be higher, still plan egress and bar lines.",
    bestEventTypes: ["Weddings", "Fundraisers", "Corporate receptions", "Large family events"],
    whatFits: [
      "Excellent when you want dinner + dance + buffet/bar inside with realistic aisles.",
      "Pairs with marquee walkways for guest arrival and weather-protected flow from parking or venue doors.",
    ],
    layoutExamples: [
      {
        title: "Dinner + dance + DJ",
        body: "Enough length to separate dance floor from rounds when the plan is disciplined about furniture.",
      },
      {
        title: "Buffet + rounds",
        body: "Long sides help queue space, keep aisles wide for safety and photography.",
      },
      {
        title: "Head table + rounds",
        body: "Define a clear focal wall for the head table without stealing circulation.",
      },
    ],
    whenToSizeUp: [
      "Guest list grows past low triple digits seated with rounds and you still want a large dance floor.",
      "You want extensive lounge, stage, and dual bars inside, consider 30×60 or modular expansion.",
    ],
    bestAddOns: [
      "Sidewalls",
      "Lighting",
      "Large dance floor",
      "Marquee connector",
      "10×10 or 10×20 satellite tents for DJ, dessert, or prep",
    ],
    faqs: faqCommon("30×45"),
  },

  "30x60-frame-tent-rental": {
    slug: "30x60-frame-tent-rental",
    sizeLabel: "30×60",
    sqft: 1800,
    pageTitle: "30×60 Frame Tent Rental | Large Receptions | Connecticut",
    metaDescription:
      "30×60 frame tent rentals: ~1,800 sq ft clear-span for larger seated weddings and events, plan aisles, dance floor, and service zones with our layout team.",
    heroSubhead: "Eighteen hundred square feet of clear-span, built for larger seated layouts and complex service plans.",
    guestSeatedEstimate:
      "Often roughly 100–140+ seated with rounds, stage, dance floor, buffet, and head table change capacity quickly.",
    guestCocktailEstimate: "Standing cocktail can scale up, still define bar count and egress.",
    bestEventTypes: ["Large weddings", "Corporate events", "Community galas", "School celebrations"],
    whatFits: [
      "Strong when you want large seated counts with real dance floor and service inside one tent.",
      "Works with modular additions or marquee entries when the site supports longer footprints.",
    ],
    layoutExamples: [
      { title: "Full reception in one tent", body: "Dance floor, rounds, and head table with careful aisle planning." },
      { title: "Buffet + dual bars", body: "Use length to separate lines and avoid bottlenecks." },
      { title: "Stage + dance + rounds", body: "Confirm sightlines and speaker placement during quoting." },
    ],
    whenToSizeUp: [
      "You need clearspan beyond 30×60, explore large event structures or connected modular systems.",
      "You want separate ceremony and reception without a reset, often two footprints or a bigger structure.",
    ],
    bestAddOns: ["Sidewalls", "Premium lighting", "Flooring", "Marquee arrival", "Prep tents", "Climate planning"],
    faqs: faqCommon("30×60"),
  },
};

export const frameTentSlugs = Object.keys(frameTentPages);
