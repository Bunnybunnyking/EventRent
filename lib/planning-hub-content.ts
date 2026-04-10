/** Structured copy and data for `/planning` hub (expert guide layout). */

export const planningQuickStartCards = [
  {
    title: "Find your tent size",
    description: "Use the interactive estimator and sizing chart, then confirm with us for your real site.",
    href: "#size-guide",
    cta: "Go to sizing",
  },
  {
    title: "Easy layout examples",
    description: "See how graduations, weddings, and fundraisers often translate into tent sizes.",
    href: "#layout-examples",
    cta: "Browse examples",
  },
  {
    title: "Rain and weather planning",
    description: "Shade, wind, and backup plans matter as much as a rainy forecast.",
    href: "#weather",
    cta: "Plan for weather",
  },
  {
    title: "Site and surface checklist",
    description: "Grass, pavement, slope, and access steer staking, ballast, and crew timing.",
    href: "#site-surface",
    cta: "Check your site",
  },
  {
    title: "Tables and chairs guide",
    description: "Round vs. banquet, aisles, and circulation change what fits under the tent.",
    href: "#tables-flow",
    cta: "Layout basics",
  },
  {
    title: "Talk to an Event Concierge",
    description: "Bring your date, town, and rough headcount. We help you sequence the rest.",
    href: "/contact#quote",
    cta: "Start a conversation",
    external: true,
  },
] as const;

export type PlanningStep = { n: number; title: string; body: string };

export const planningSteps: PlanningStep[] = [
  {
    n: 1,
    title: "Start with the event type",
    body:
      "A wedding, graduation, fundraiser, company picnic, backyard party, or town green event all use space differently. A seated plated dinner needs a different footprint than a cocktail reception or a ceremony-only hold. Naming the event type first keeps sizing and layout decisions grounded in how people will actually move through the day.",
  },
  {
    n: 2,
    title: "Estimate your guest count",
    body:
      "Start from the maximum you realistically expect, not only today’s RSVPs. For ticketed or open events, plan toward the upper end of your range so food lines, seating, and weather backup still work if more people show than your minimum.",
  },
  {
    n: 3,
    title: "Decide how guests will gather",
    body:
      "Think in programs: seated dinner, cocktail style, ceremony rows, mixed seating, buffet flow, dance floor, bar area, lounge or mingling space. Each choice adds or frees square footage. A layout that looks full on paper often feels tight in real life if you skip aisles and service paths.",
  },
  {
    n: 4,
    title: "Think beyond tables and chairs",
    body:
      "Buffet tables, bars, DJs, bands, gift tables, dessert stations, head tables, and clear walkways all consume floor space. If any of those matter to your event, say so early. They are often what pushes a “maybe” tent size into the right size class.",
  },
  {
    n: 5,
    title: "Look at your site",
    body:
      "Grass, patio, driveway, or parking lot changes anchoring. Level ground, overhead trees or wires, fence lines, pools, septic, landscaping, and the path our crew uses to load in matter as much as the tent dimensions. A quick photo tour or rough dimensions saves guesswork.",
  },
  {
    n: 6,
    title: "Make a weather plan early",
    body:
      "Tents help with rain, harsh sun, wind, and temperature swings. Sidewalls, fans, heaters, flooring, and gutters are easier to plan while you are choosing structure than as a panic add-on the week of the event.",
  },
  {
    n: 7,
    title: "Get expert help before you lock decisions",
    body:
      "This is where we confirm sizing, layout, site fit, and weather readiness against real inventory and Connecticut conditions. You get a second set of eyes from a team that does this every week.",
  },
];

export type TentChartRow = {
  size: string;
  sqFt: string;
  seated: string;
  notes: string;
};

export const tentSizeChartRows: TentChartRow[] = [
  { size: "20×20", sqFt: "400", seated: "Roughly 32–40 seated", notes: "Light cocktail or small seated block; tight for food lines." },
  { size: "20×30", sqFt: "600", seated: "Roughly 48–60 seated", notes: "Small gatherings; better circulation than 20×20 for food." },
  { size: "20×40", sqFt: "800", seated: "Roughly 64–80 seated", notes: "Common backyard milestone size; watch buffets and dance area." },
  { size: "30×30", sqFt: "900", seated: "Roughly 72–90 seated", notes: "Balanced mid-size option when layout is simple." },
  { size: "30×40", sqFt: "1,200", seated: "Roughly 96–120 seated", notes: "Strong starting point for many ~100-guest programs." },
  { size: "30×60", sqFt: "1,800", seated: "Roughly 144–180 seated", notes: "Larger receptions and community setups; room for zones." },
  { size: "40×60", sqFt: "2,400", seated: "Varies widely", notes: "More comfort, service space, or dancing without feeling cramped." },
];

export type LayoutExample = {
  title: string;
  guests: string;
  layout: string;
  tent: string;
  why: string;
  sizeUp: string;
};

export const layoutExamples: LayoutExample[] = [
  {
    title: "Backyard graduation",
    guests: "40–50 guests",
    layout: "Open house style, food table, casual seating",
    tent: "Often starts in the 20×30 range",
    why: "Gives you breathing room for food, gifts, and people moving without bumping chairs.",
    sizeUp: "Add space if you want a defined dance area or a long buffet line.",
  },
  {
    title: "Backyard party, seated",
    guests: "~60 seated",
    layout: "Rounds or banquet rows, buffet or grill nearby",
    tent: "Often 20×40 or larger depending on dance floor and bars",
    why: "Seated counts eat floor space fast once you add aisles and service.",
    sizeUp: "Dance floor, DJ, or second food station usually pushes you up a class.",
  },
  {
    title: "Wedding reception",
    guests: "~100 guests",
    layout: "Dinner rounds, dance floor, head table, bar",
    tent: "Often 30×40 class or larger",
    why: "You are planning zones, not just chair count.",
    sizeUp: "Live band, large dance floor, or dual bars increase footprint.",
  },
  {
    title: "Ceremony only",
    guests: "~100 guests",
    layout: "Rows, aisle, modest staging",
    tent: "Often smaller than full reception for same headcount",
    why: "Rows pack tighter than seated dinner with rounds.",
    sizeUp: "Wide aisle, large wedding party, or covered cocktail hold changes the math.",
  },
  {
    title: "Cocktail fundraiser",
    guests: "~100 guests",
    layout: "Standing mix, high tops, auction or program area",
    tent: "Depends on bars, silent auction tables, and stage",
    why: "Standing events still need stable zones for food, check-in, and bidding.",
    sizeUp: "Heavy food stations or seated portion later adds square footage.",
  },
  {
    title: "Community event",
    guests: "Varies",
    layout: "Check-in, vendors or booths, gathering space",
    tent: "Often multiple bays or one large frame",
    why: "Flow and sightlines matter as much as canopy square footage.",
    sizeUp: "Peak arrival windows and weather backup drive real-world sizing.",
  },
  {
    title: "Tailgate hospitality",
    guests: "Small crew to large group",
    layout: "Grill, coolers, seating, weather cover",
    tent: "Compact frames; anchor plan follows the lot",
    why: "Parking surfaces and wind drive setup as much as guest count.",
    sizeUp: "Food service lines and weather protection expand the footprint.",
  },
  {
    title: "Sweet 16",
    guests: "Teens + family",
    layout: "Dining, dance, dessert, gifts",
    tent: "Sized for dance floor and DJ as well as tables",
    why: "Energy zones need clear separation so the night flows.",
    sizeUp: "Lounge seating, photo area, or extra dessert tables add space.",
  },
];

export type ForgotCategory = { title: string; items: string[] };

export const forgotCategories: ForgotCategory[] = [
  {
    title: "Weather and comfort",
    items: ["Sidewalls and window panels", "Fans", "Heaters", "Lighting (task and ambient)"],
  },
  {
    title: "Food and service",
    items: ["Buffet and bar tables", "Catering prep or satellite tent", "Extra service tables", "Generator and power paths"],
  },
  {
    title: "Flow and experience",
    items: ["Dance floor", "Cocktail tables", "Staging", "Lounge seating", "Covered transitions between tents"],
  },
  {
    title: "Site and setup",
    items: ["Ballast and anchoring plan", "Crew access path", "Gutters between tent sections", "Layout buffers for stakes and lines"],
  },
];

export type EventTypeGuide = {
  title: string;
  matters: string;
  sizing: string;
  weather: string;
  forget: string;
  href: string;
};

export const eventTypeGuides: EventTypeGuide[] = [
  {
    title: "Weddings",
    matters: "Ceremony vs. reception footprint, dance floor sightlines, lighting for photos.",
    sizing: "Head table, band or DJ, and buffet style usually drive tent class as much as guest count.",
    weather: "Backup for cocktail hold and dinner keeps the timeline you planned.",
    forget: "Power for entertainment, service lanes, and guest movement after sunset.",
    href: "/wedding-tent-rentals",
  },
  {
    title: "Graduation parties",
    matters: "Flexible headcount, food lines, gift and dessert zones.",
    sizing: "Late spring weather and quick storms often decide sidewall and flooring needs.",
    weather: "Afternoon sun and passing showers both show up in May and June.",
    forget: "Photos, speeches, and overflow seating happen in the same few hours.",
    href: "/events/graduation-parties",
  },
  {
    title: "Backyard parties",
    matters: "Property lines, power for sound, lawn protection, neighbor-friendly timing.",
    sizing: "House-to-tent flow and grill placement steer layout.",
    weather: "Coverage for the whole social window, not only the meal.",
    forget: "Trash, lighting paths, and where vendors park.",
    href: "/planning#layout-examples",
  },
  {
    title: "Corporate events",
    matters: "Registration, AV, brand-clean presentation, load-in windows.",
    sizing: "Stage, screen, and seating style change depth and width needs.",
    weather: "Guest comfort for long programs; wind on open fields.",
    forget: "Cable paths, backup power, and teardown timing with the venue.",
    href: "/corporate-event-rentals",
  },
  {
    title: "Community and school",
    matters: "Vendor rows, accessibility, permits, volunteer-friendly layout.",
    sizing: "Peak crowds and multiple activities under one plan.",
    weather: "Public schedules do not wait for perfect skies.",
    forget: "Clear signage paths and staff access lanes.",
    href: "/events/community-school-town",
  },
  {
    title: "Fundraisers and festivals",
    matters: "Throughput, donor sightlines, multi-day operations.",
    sizing: "Auction, stage, and food service zones compete for space.",
    weather: "Rain ops and donor comfort protect the revenue night.",
    forget: "Overnight gear, security, and strike timing.",
    href: "/events/fundraisers-galas",
  },
];

export const planningTimelineBlocks = [
  {
    when: "2–6 months out",
    items: [
      "Confirm date and choose site or venue",
      "Estimate guest range and event style",
      "List must-have zones (dance, bar, buffet, stage)",
      "Reach out for an initial tent and layout conversation",
    ],
  },
  {
    when: "4–8 weeks out",
    items: [
      "Confirm tent size direction with refined headcount",
      "Lock tables, chairs, and layout intent",
      "Choose rain and comfort options",
      "Align catering and AV with the floor plan",
    ],
  },
  {
    when: "2 weeks out",
    items: [
      "Tighten guest count where possible",
      "Review access, parking, and site contact",
      "Confirm rain playbook with vendors",
      "Distribute layouts to anyone setting up day-of",
    ],
  },
  {
    when: "Week of event",
    items: [
      "Confirm weather plan and sidewall needs",
      "Clear paths for delivery and setup",
      "Confirm setup window with site and vendors",
      "We handle install and strike on agreed timing",
    ],
  },
];
