import type { MarketingPageDefinition } from "@/lib/marketing-pages-types";

const PUBLISHED = "2026-04-19";
const UPDATED = "2026-04-19";

const quoteHref = "/contact#quote";

export const guideSlugs = [
  "what-size-tent-do-i-need",
  "tent-rental-pricing",
  "tents-on-driveways-and-pavement",
  "rain-backup-and-sidewalls",
] as const;

export type GuideSlug = (typeof guideSlugs)[number];

export const marketingPagesByPath: Record<string, MarketingPageDefinition> = {
  "/guides/what-size-tent-do-i-need": {
    path: "/guides/what-size-tent-do-i-need",
    metaTitle: "What Size Tent Do I Need?",
    metaDescription:
      "Tent size in CT: guest count, seating style, buffet/bar, dance floor, and weather backup. Planning ranges from 20×20 to 60′ systems—guidance only until we see your site.",
    articleSection: "Tent sizing",
    contentEyebrow: "Tent sizing guide",
    h1: "What Size Tent Do I Need?",
    subhead:
      "Start with guest count, seating style, and how your event will actually flow, not just the tent footprint.",
    cta: { label: "Request sizing help", href: quoteHref },
    quickAnswer:
      "The right tent size depends on guest count, seating style, buffet or bar space, dance floor needs, and whether you want extra room for circulation.",
    sections: [
      {
        id: "event-type",
        heading: "Start with event type",
        paragraphs: [
          "Different events move differently. A backyard party may center on a grill and a few tables, while a wedding routes guests from ceremony to cocktail to dinner. A graduation open house has steady foot traffic. Corporate and community events often mix seating, aisles, and service zones.",
          "Naming your event type first keeps the conversation grounded in flow, not only square footage.",
        ],
        bullets: [
          "Backyard party: compact hosting, flexible furniture, often a single focal area",
          "Wedding: ceremony, cocktail, dinner, and dance often compete for the same day",
          "Graduation: open-house pacing, gift and dessert tables, mingling lanes",
          "Corporate or community: registration, program, food service, and exits",
        ],
      },
      {
        id: "guest-count",
        heading: "Start with guest count",
        paragraphs: [
          "Guest count is the fastest starting point, but it is never the whole story. The same headcount feels different when everyone sits at once versus when half the group stands with drinks.",
          "Use your real expected attendance, not a fantasy max, then add a small buffer for plus-ones and vendors who need floor space.",
        ],
      },
      {
        id: "what-changes-size",
        heading: "What changes the size you need",
        bullets: [
          "Seated dinner versus cocktail-style service (tables versus standing clusters)",
          "Buffet, bar, cake, and gift tables, each need approach space, not just top surface",
          "Dance floor or live band footprint and cable paths",
          "Weather backup: sidewalls, slightly wider walkways, and sometimes a second entry",
        ],
      },
      {
        id: "planning-ranges",
        heading: "Typical tent planning ranges (guidance, not a promise)",
        paragraphs: [
          "We carry many footprints and systems. The list below is planning language so you can picture families of tents before we confirm anything against your site and layout.",
          "For deeper layout math and mindset, pair this page with our party guide on thinking about tent size before you quote and the 20×40 fit guide when that span is on your short list.",
        ],
        bullets: [
          "20×20: smaller backyard hosting, focused food or gift zone, tight shade or rain cover",
          "20×30 and 30×30: larger backyard flows, more tables, or graduation-style mingling with service tables",
          "20′ and 30′ expandable systems: weddings and open layouts where length grows with program needs",
          "40′ wide systems: more generous span for mixed seating and service lines",
          "60′ wide systems: major weddings, festivals, and town-scale events that need width and length together",
        ],
      },
      {
        id: "frame-vs-pole",
        heading: "Frame tent versus pole tent",
        paragraphs: [
          "Frame tents clear the span with a metal skeleton, which often helps tighter layouts and many surface types. Pole tents deliver a classic peak and often generous value per square foot, with center poles that become part of your floor plan.",
          "The better fit depends on your site, style, and how tables route around poles. Read the full tradeoff walkthrough in our frame versus pole party guide, then ask us to translate that into inventory on your date.",
        ],
      },
      {
        id: "booked-paths",
        heading: "Most booked size paths we see planners start from",
        bullets: [
          "20×20 for smaller backyard hosting when the goal is defined shade or cover",
          "20×30 and 30×30 for larger backyard and graduation flow with more tables in play",
          "30′ and 40′ expandable setups for weddings and open layouts that need length",
          "60′ systems when the guest count or program needs real width and festival-scale presence",
        ],
      },
      {
        id: "add-ons-layout",
        heading: "Related add-ons that change layout",
        paragraphs: [
          "Tables and chairs steal more space than people remember because chairs slide back and aisles need width. Lighting runs along perimeters. Heaters need safe clearances. Sidewalls change how air moves.",
          "Browse real categories in our rental inventory browser: tents, tables, chairs, and lighting and heating, then tell us what must stay inside the tent on event day.",
        ],
      },
    ],
    finalCta: {
      title: "Next step",
      body: "Share your date, town, guest count, and event type. We will map realistic tent families and layout notes for your space.",
      primaryLabel: "Request sizing help",
      primaryHref: quoteHref,
      secondaryLabel: "Browse tent families",
      secondaryHref: "/tents",
    },
    faqs: [
      {
        id: "faq-50",
        question: "What size tent do I need for 50 guests?",
        answer:
          "There is no single correct footprint for 50 people: seated rounds, buffet lines, and cocktail-style standing all need different spans. Send how you want guests to eat and move, and we map aisles, head table, and dance or band zones against real inventory.",
      },
      {
        id: "faq-100",
        question: "What size tent do I need for 100 guests?",
        answer:
          "A full reception almost always needs more canopy than ceremony-only cover for the same headcount. Start with seated versus cocktail, then add bar, buffet, dance, and stage. Photos or a rough sketch help us recommend tent families that match your flow.",
      },
      {
        id: "faq-buffet",
        question: "Do I need extra room for buffet tables or a bar?",
        answer:
          "Yes. Guests queue, plates need set-down space, and bartenders need working depth behind the rail. We plan approach lanes so lines do not choke dinner seating.",
      },
      {
        id: "faq-frame-tighter",
        question: "Is a frame tent better for tighter layouts?",
        answer:
          "Often yes: no center poles and a predictable perimeter can make tight table maps easier. Surface, wind, and style still decide the right system. Use our frame versus pole guide for tradeoffs, then we confirm what is available for your date and town.",
      },
      {
        id: "faq-not-sure",
        question: "Can you help me figure out the size if I am not sure?",
        answer:
          "That is normal. Bring guest count, event type, town, photos, and rough measurements. We recommend tent systems and add-ons, then refine once we understand access and surfaces.",
      },
    ],
    relatedLinks: [
      { href: "/party-guides/how-to-think-about-tent-size-before-you-quote", label: "How to think about tent size before you quote" },
      { href: "/party-guides/what-fits-in-a-20x40-tent-connecticut", label: "What fits in a 20×40 tent in Connecticut" },
      { href: "/party-guides/frame-tent-vs-pole-tent-connecticut", label: "Frame tent versus pole tent" },
      { href: "/planning", label: "Planning hub (calculator and tools)" },
      { href: "/rental-inventory", label: "Browse rental inventory" },
      { href: "/tent-rentals", label: "Tent rentals overview" },
    ],
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
  },

  "/guides/tent-rental-pricing": {
    path: "/guides/tent-rental-pricing",
    metaTitle: "How Tent Rental Pricing Works",
    metaDescription:
      "What drives tent rental quotes in CT: size, surface, layout, delivery, labor, and add-ons. No list pricing here—just the factors we use so you can request an accurate quote.",
    articleSection: "Tent rental pricing",
    contentEyebrow: "Pricing explainer",
    h1: "How Tent Rental Pricing Works",
    subhead:
      "The final quote depends on size, surface, layout, delivery, and what else the event needs, not just the tent alone.",
    cta: { label: "Request a quote", href: quoteHref },
    quickAnswer:
      "Tent pricing is shaped by tent size, surface conditions, setup complexity, delivery logistics, and whether you also need tables, chairs, lighting, heaters, or sidewalls.",
    sections: [
      {
        id: "what-affects",
        heading: "What affects the price",
        bullets: [
          "Tent size and system type (frame, pole, expandable, large structures, marquees)",
          "Guest count and layout density, because layout drives labor and accessory counts",
          "Grass versus driveway versus patio, which changes anchoring, protection, and time on site",
          "Sidewalls, heating, lighting, and entry pieces that add material and install steps",
          "Setup access, staging distance, and breakdown timing relative to your venue rules",
        ],
      },
      {
        id: "included",
        heading: "What is usually included",
        bullets: [
          "Delivery, professional setup, and breakdown for the rental mix we agree to",
          "Basic planning help so the footprint matches your flow, not just a catalog photo",
        ],
      },
      {
        id: "adds-to-quote",
        heading: "What commonly adds to the quote",
        paragraphs: [
          "These line items track the same categories you will see in our inventory browser. Nothing here is a hidden fee; it is simply work, equipment, and time that changes when your program grows.",
        ],
        bullets: [
          "Tables, chairs, linens, and cocktail high-tops sized to your service style",
          "Lighting runs, heaters sized to enclosure, marquee connectors, and weather-prep pieces",
          "Extra moves, late-night strike windows, or complex access that extends crew hours",
        ],
      },
      {
        id: "same-count-diff-price",
        heading: "Why two events with the same guest count can price differently",
        paragraphs: [
          "Headcount might match, but one event is seated buffet with a dance floor on grass, while the other is cocktail rounds on pavement with sidewalls and heaters. Labor, ballast or stake plans, and accessory counts all move independently of guest tally.",
        ],
      },
      {
        id: "anchors",
        heading: "Package-style anchors (illustrative, not priced)",
        paragraphs: [
          "Use these bundles as mental models when you email or call. We still confirm every quote against date, town, surface, and inventory availability.",
        ],
        bullets: [
          "Simple backyard setup: compact tent, practical tables and chairs, minimal weather extras",
          "Graduation open-house setup: larger footprint, buffet and gift zones, extra mingling space",
          "Wedding reception layout: dinner seating, service lanes, dance or band, lighting upgrade path",
          "Larger corporate or community layout: program zones, wider aisles, possible marquee connectors",
        ],
      },
      {
        id: "fast-quote",
        heading: "How to get the fastest accurate quote",
        bullets: [
          "Event date and town",
          "Guest count and event type",
          "Surface type and photos if you have them",
          "Must-have add-ons: sidewalls, heaters, lighting, specialty chairs, stages",
        ],
      },
    ],
    finalCta: {
      title: "Next step",
      body: "Send date, town, guest count, surface, and must-have items. We respond with a scoped quote or follow-up questions.",
      primaryLabel: "Request a quote",
      primaryHref: quoteHref,
      secondaryLabel: "Party packages",
      secondaryHref: "/party-packages",
    },
    faqs: [
      {
        id: "faq-diff",
        question: "Why is tent rental pricing different from event to event?",
        answer:
          "Because distance, surface, tent system, crew time, accessory count, and venue rules move independently of guest count. Quotes reflect the install you actually need, not a generic per-square-foot rate.",
      },
      {
        id: "faq-driveway",
        question: "Do driveways or patios affect the quote?",
        answer:
          "Often yes. Hard surfaces change anchoring, protection, and how long crews spend on site compared with open grass. Photos and a quick note on what is paved versus lawn help us plan accurately.",
      },
      {
        id: "faq-tables-together",
        question: "Do tables and chairs usually get quoted together with the tent?",
        answer:
          "Most outdoor programs do bundle seating and cover. You can still quote tent-only, but be explicit about what you already own versus what guests still need on site.",
      },
      {
        id: "faq-sidewalls-heaters",
        question: "Do sidewalls and heaters change the price?",
        answer:
          "Yes. They add material, install time, and sometimes safety planning for airflow and clearances. They also buy comfort when weather shifts.",
      },
      {
        id: "faq-planning-quote",
        question: "Can I get a quick planning quote before finalizing everything?",
        answer:
          "Yes. Share your best current guess on count, layout, and town. We can stage a planning range, then tighten numbers once details firm up.",
      },
    ],
    relatedLinks: [
      { href: "/wishlist", label: "Wishlist (build a list, we respond with a quote)" },
      { href: "/party-packages", label: "Party packages" },
      { href: "/rental-inventory", label: "Rental inventory browser" },
      { href: "/guides/what-size-tent-do-i-need", label: "What size tent do I need?" },
      { href: "/contact", label: "Contact" },
    ],
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
  },

  "/guides/rain-backup-and-sidewalls": {
    path: "/guides/rain-backup-and-sidewalls",
    metaTitle: "Rain Backup & Sidewalls",
    metaDescription:
      "Weather planning for CT tents: sidewalls, entries, layout, lighting, and heaters (as planning only). Build the plan early instead of scrambling when the forecast shifts.",
    articleSection: "Weather planning",
    contentEyebrow: "Outdoor weather planning",
    h1: "Rain Backup, Sidewalls, and Weather Planning",
    subhead:
      "Outdoor events feel better when the weather plan is built in early, not added at the last minute.",
    cta: { label: "Ask about weather options", href: quoteHref },
    quickAnswer:
      "A good outdoor setup should include a weather plan from the beginning. Sidewalls, lighting, heating, and layout decisions all affect how comfortable the event feels if conditions shift.",
    sections: [
      {
        id: "weather-plan",
        heading: "What a real weather plan includes",
        bullets: [
          "Tent type and span that fit your program, not only fair-weather seating",
          "Sidewalls or window walls where they help wind and splash without trapping heat",
          "Entry and exit flow so guests never bottleneck at a single zipper corner",
          "Table and chair layout that keeps aisles usable when jackets and umbrellas appear",
          "Lighting after dark so steps, food lines, and dance areas stay visible",
          "Heating when sidewalls enclose enough volume that warmth matters",
        ],
      },
      {
        id: "sidewalls",
        heading: "When sidewalls make sense",
        paragraphs: [
          "Sidewalls help with wind-driven rain, chilly evenings, and bright late-sunset angles. They also change airflow, which is why we plan door locations and sometimes partial walls instead of sealing every panel by default.",
        ],
      },
      {
        id: "heating",
        heading: "When heating makes sense (planning guidance, not a guarantee)",
        paragraphs: [
          "Heaters support enclosed tents on cool nights, but results vary with wind, wall configuration, volume, and how often doors open. Our inventory includes 170k BTU units often discussed for larger enclosed tents, 80k BTU for mid-size enclosed setups, and 40k BTU for smaller enclosed tents. Those ranges are conversation starters, not performance promises.",
        ],
      },
      {
        id: "lighting",
        heading: "Lighting matters more than people think",
        paragraphs: [
          "Bistro and decorative lighting turn a tent from covered into inviting. They also help guests navigate chair legs, steps, and buffet transitions once the sun drops. See lighting families in our inventory browser and tell us how late your program runs.",
        ],
      },
      {
        id: "by-event",
        heading: "Rain-plan setups by event style",
        bullets: [
          "Wedding: protect ceremony handoff, keep cocktail furniture dry, and keep dinner aisles lit",
          "Graduation: plan for muddy shoes, gift table queues, and dessert stations that cannot get soaked",
          "Backyard dinner: smaller span, often heavier focus on sidewalls and heat as the night cools",
          "Corporate or community: wider aisles, signage dry lines, and sometimes multiple entries",
        ],
      },
      {
        id: "mistakes",
        heading: "Most common weather-prep mistakes",
        bullets: [
          "Waiting until three days out to discuss sidewalls when inventory is already committed",
          "Skipping lighting because the event starts in daylight, even though dinner ends after sunset",
          "Forgetting that heaters need time, power, and clearances, not a surprise plug-in",
        ],
      },
    ],
    finalCta: {
      title: "Next step",
      body: "Share your date, event type, and whether you want light rain cover or a more enclosed, weather-ready layout.",
      primaryLabel: "Ask about weather options",
      primaryHref: quoteHref,
      secondaryLabel: "Outdoor wedding rain plan (party guide)",
      secondaryHref: "/party-guides/outdoor-wedding-rain-plan-basics",
    },
    faqs: [
      {
        id: "faq-need-sidewalls",
        question: "Do I need sidewalls for my tent?",
        answer:
          "Not always. Season, wind exposure, and how long guests stay under cover decide whether full walls, partial walls, or open sides make sense. Site photos help us recommend a sensible default before inventory gets tight.",
      },
      {
        id: "faq-rain-during",
        question: "What happens if it rains during the event?",
        answer:
          "Guests consolidate under cover, aisles need to stay passable, and slip hazards need attention. If you plan sidewalls, drainage paths, and lighting ahead of time, the shift is calmer than reacting mid-ceremony.",
      },
      {
        id: "faq-heaters-enclosed",
        question: "Can heaters be added to enclosed tents?",
        answer:
          "Often yes, with clearances and responsible placement. Heat output still depends on enclosure, wind, and how often doors open. We set realistic expectations for your specific layout rather than promising a fixed temperature.",
      },
      {
        id: "faq-bistro",
        question: "Are bistro lights enough for evening events?",
        answer:
          "They are a strong mood layer. Many programs pair decorative lighting with practical coverage near food service and pathways. Tell us where guests will walk after dark.",
      },
      {
        id: "faq-forecast",
        question: "Should I plan for weather even if the forecast looks good?",
        answer:
          "Yes. New England forecasts swing fast. Building a light backup plan early is cheaper and calmer than a Tuesday panic for a Saturday wedding.",
      },
    ],
    relatedLinks: [
      { href: "/party-guides/outdoor-wedding-rain-plan-basics", label: "Outdoor wedding rain plan basics" },
      { href: "/rental-inventory#inv-lighting-heating", label: "Lighting and heating inventory" },
      { href: "/guides/tents-on-driveways-and-pavement", label: "Tents on driveways and pavement" },
      { href: "/planning", label: "Planning hub" },
    ],
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
  },

  "/guides/tents-on-driveways-and-pavement": {
    path: "/guides/tents-on-driveways-and-pavement",
    metaTitle: "Tents on Driveways & Patios",
    metaDescription:
      "Hard-surface tent installs in CT: footprint, slope, access, frame vs pole tradeoffs, and safe anchoring on asphalt or concrete. Photos and measurements help most.",
    articleSection: "Site & surface planning",
    contentEyebrow: "Driveway & patio installs",
    h1: "Can a Tent Go on a Driveway or Patio?",
    subhead:
      "In many cases, yes, but the tent type, space, surface, and installation method all matter.",
    cta: { label: "Send surface details", href: quoteHref },
    quickAnswer:
      "Many tent setups can work on hard surfaces, but the best option depends on the tent family, usable space, and how the site can be safely installed.",
    sections: [
      {
        id: "when-hard-surface",
        heading: "When hard-surface setups make sense",
        paragraphs: [
          "Driveways and patios buy level footing, predictable access for guests in dress shoes, and sometimes easier routes for equipment when grass is wet or landscaped.",
          "They also introduce new questions: anchoring without stakes, protecting finishes, and keeping ballast or weights where they belong.",
        ],
      },
      {
        id: "what-matters",
        heading: "What matters most",
        bullets: [
          "Usable width and footprint, including buffer for stakes, ballasts, or guy lines where required",
          "Slope and drainage so rain does not channel under sidewalls or toward doors",
          "Access and clearance for trucks, dollies, and crew safe paths",
          "Surrounding landscaping, sprinklers, and edges that cannot take weight",
          "Guest flow in and out, especially when the tent bridges yard and pavement",
        ],
      },
      {
        id: "best-types",
        heading: "Best tent types for tighter or harder surfaces",
        paragraphs: [
          "Frame tents are often strong candidates when you need predictable perimeter space and fewer center obstructions on tighter pads. Pole tents deliver a classic silhouette and value, but center poles and stake lines need to be planned early.",
          "Compare the customer-facing tradeoffs in our frame versus pole party guide, then send photos so we can align recommendations with inventory.",
        ],
      },
      {
        id: "surface-types",
        heading: "Driveway versus patio versus mixed surfaces",
        paragraphs: [
          "Long driveways sometimes let us keep heavy traffic off lawn while still using grass for guy zones. Patios may be smooth but small, which pushes you toward compact footprints or split tents with marquee connectors when inventory allows.",
        ],
      },
      {
        id: "mistakes",
        heading: "Common mistakes customers make",
        bullets: [
          "Measuring only the visible pad, not the working area crews need",
          "Forgetting buffet, gift, cake, or bar zones that live outside the dinner footprint",
          "Underestimating clearance for doors, steps, and generator or power paths",
        ],
      },
      {
        id: "addons",
        heading: "Good add-ons for hard-surface events",
        bullets: [
          "Lighting to define edges after dark",
          "Sidewalls when wind whips across open pavement",
          "Marquee connectors or entry tents when the path from parking to cover is long",
          "Cocktail tables for standing clusters when seating is tight",
        ],
      },
    ],
    finalCta: {
      title: "Next step",
      body: "Send a few photos, your town, and rough measurements. We will tell you which tent families typically fit and what still needs a site-specific check.",
      primaryLabel: "Send surface details",
      primaryHref: quoteHref,
      secondaryLabel: "Frame versus pole guide",
      secondaryHref: "/party-guides/frame-tent-vs-pole-tent-connecticut",
    },
    faqs: [
      {
        id: "faq-asphalt",
        question: "Can a tent be installed on asphalt or concrete?",
        answer:
          "Often yes, with anchoring and surface protection matched to the pad. Photos and a short site description beat guessing from a satellite image alone.",
      },
      {
        id: "faq-frame-driveway",
        question: "Are frame tents better for driveways?",
        answer:
          "They are frequently a good match when space is tight or you need a clear span, but your measurements and access still decide. We confirm against real inventory and crew methods.",
      },
      {
        id: "faq-extra-room",
        question: "How much extra room should I allow around the tent?",
        answer:
          "Think in working lanes, not just canopy size. Crews need safe paths, and guests need door stacks that do not block traffic. We mark those zones when we review your sketch or satellite view.",
      },
      {
        id: "faq-yard-driveway",
        question: "Can you help if my yard and driveway both need to be used?",
        answer:
          "Yes. Mixed surfaces are common. We plan anchoring per zone and transitions so guests do not trip between levels.",
      },
      {
        id: "faq-uneven",
        question: "What happens if the surface is uneven?",
        answer:
          "Minor slope can be managed with planning; major pitch may change tent family or orientation. Send a side-angle photo and we will be honest about what installs cleanly.",
      },
    ],
    relatedLinks: [
      { href: "/party-guides/frame-tent-vs-pole-tent-connecticut", label: "Frame tent versus pole tent" },
      { href: "/tents", label: "Tent families hub" },
      { href: "/guides/rain-backup-and-sidewalls", label: "Rain backup and sidewalls" },
      { href: "/rental-inventory#inv-tents", label: "Tent inventory" },
    ],
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
  },

  "/packages/most-booked-event-setups": {
    path: "/packages/most-booked-event-setups",
    metaTitle: "Most-Booked Event Setups",
    metaDescription:
      "Layout starting points for CT weddings, graduations, backyards, and corporate tents—tent + tables + chairs patterns you can refine with our team before quoting.",
    articleSection: "Event layouts",
    contentEyebrow: "Layout starting points",
    h1: "Most-Booked Event Setups",
    subhead:
      "Realistic layout starting points for weddings, graduations, backyard parties, and larger gatherings.",
    cta: { label: "Refine a setup", href: quoteHref },
    quickAnswer:
      "Most customers do not need to start from scratch. The fastest way to plan is to begin with a setup that matches your event style, guest count, and space.",
    sections: [
      {
        id: "what-includes",
        heading: "What each setup usually includes",
        paragraphs: [
          "Every line below is a starting conversation, not a locked bundle. Counts change with guest tally, service style, and weather choices.",
        ],
        bullets: [
          "Tent family matched to footprint and surface",
          "Tables: banquets, rounds, or cocktail high-tops depending on flow",
          "Chairs: practical folding for casual events, white padded options when the look matters",
          "Lighting such as bistro strings when the program runs past sunset",
        ],
      },
      {
        id: "how-choose",
        heading: "How to choose the right one",
        paragraphs: [
          "Pick the card that feels closest to your day, then note anything that breaks the template: live band, extra bar, late-night dessert, or lawn games outside the tent.",
          "Cross-check tent sizing mindset in our party guide library so expectations stay realistic before we quote.",
        ],
      },
      {
        id: "featured-rentals",
        heading: "Featured rentals inside each setup",
        paragraphs: [
          "Inventory anchors we reference often include 20×20 and 30×30 footprints, expandable 20′ and 30′ systems for longer receptions, banquet and round tables, cocktail tables, beige folding chairs, white padded chairs, and bistro lighting. Confirm availability for your date and town when you reach out.",
        ],
      },
    ],
    setupCards: [
      {
        title: "Backyard tent, tables, and chairs",
        summary: "Compact cover with practical seating for cookouts, birthdays, and neighborhood gatherings.",
        includes: ["Small or mid footprint tent", "Banquet or round tables", "Folding chairs", "Optional basic lighting"],
        bestFor: "Hosts who want shade or rain cover without a full reception program.",
      },
      {
        title: "Graduation open-house setup",
        summary: "Mingling lanes, gift and dessert zones, and enough cover for steady foot traffic.",
        includes: ["Larger footprint or expandable tent", "Mixed tables for food and gifts", "Extra chairs for rotating guests", "Sidewall conversation if weather looks iffy"],
        bestFor: "Families expecting waves of guests rather than one seated moment.",
      },
      {
        title: "Wedding reception layout",
        summary: "Dinner seating, service aisles, and space for dance or band without cramping head tables.",
        includes: ["Expandable or wide-span tent family", "Rounds for guests", "Head or banquet tables", "Lighting upgrade path", "Optional heaters if enclosed"],
        bestFor: "Couples planning dinner, speeches, and a dance floor in one footprint.",
      },
      {
        title: "Cocktail and mingling layout",
        summary: "Standing clusters, high-tops, and a few seated zones for older guests.",
        includes: ["Cocktail tables", "Select rounds or lounges", "Focused lighting", "Smaller footprint when seated count is low"],
        bestFor: "Engagement parties, welcome drinks, or cocktail-hour-forward schedules.",
      },
      {
        title: "Corporate or community tent setup",
        summary: "Program space, registration, and food service lines with wider aisles.",
        includes: ["Mid to large tent system", "Rows or classroom layouts", "Buffet or service tables", "Optional marquee or entry tent"],
        bestFor: "Schools, companies, and town events with mixed ages and mobility needs.",
      },
    ],
    goodshuffleSlot:
      "Wire Goodshuffle item IDs, image IDs, and wishlist buttons per card when your catalog sync is ready. Until then, use this grid as a layout placeholder in staging.",
    finalCta: {
      title: "Next step",
      body: "Pick the card closest to your day, note exceptions (extra bar, band, late-night dessert), and send guest count and town so we can tighten the list.",
      primaryLabel: "Refine a setup",
      primaryHref: quoteHref,
      secondaryLabel: "Browse inventory",
      secondaryHref: "/rental-inventory",
    },
    faqs: [
      {
        id: "faq-grad",
        question: "What setup works best for a graduation party?",
        answer:
          "Open-house flow with a larger tent, mixed tables for food and gifts, and sidewalls on standby if spring weather wobbles. Send expected peak headcount.",
      },
      {
        id: "faq-backyard",
        question: "What is usually included in a backyard tent setup?",
        answer:
          "Cover plus practical tables and chairs, sometimes basic lighting if the event runs past sunset. Grills and yard games usually stay outside the tent line.",
      },
      {
        id: "faq-change-items",
        question: "Can I start with a package and change items later?",
        answer:
          "Yes. Treat these setups as anchors. We expect counts and accessories to move as RSVPs and weather plans firm up.",
      },
      {
        id: "faq-wedding",
        question: "Which setup works best for weddings?",
        answer:
          "Most full receptions map closest to the wedding reception card, then customize for band depth, bars, and dessert stations.",
      },
      {
        id: "faq-help-choose",
        question: "Can you help me choose between a few options?",
        answer:
          "Absolutely. Send photos, guest count, and your must-keep moments. We will narrow tent families and furniture mixes quickly.",
      },
    ],
    relatedLinks: [
      { href: "/party-packages", label: "Party packages" },
      { href: "/wedding-tent-rentals", label: "Wedding tent rentals" },
      { href: "/events/graduation-parties", label: "Graduation parties" },
      { href: "/guides/what-size-tent-do-i-need", label: "What size tent do I need?" },
    ],
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
  },

  "/how-it-works": {
    path: "/how-it-works",
    metaTitle: "Delivery & Setup Process",
    metaDescription:
      "Quote to breakdown: how tent and event rentals move from planning to install and pickup. What to have ready, what we handle, and what changes crew time on site.",
    articleSection: "Service process",
    contentEyebrow: "How renting works",
    h1: "How Delivery and Setup Works",
    subhead:
      "From quote to breakdown, here is what to expect when you book with Connecticut Party Rentals.",
    cta: { label: "Request a quote", href: quoteHref },
    quickAnswer:
      "We help customers move from idea to setup by confirming the date, town, guest count, surface, and rental mix before delivery and installation.",
    sections: [
      {
        id: "steps",
        heading: "Step-by-step process",
        bullets: [
          "Tell us the basics: date, town, guest count, event type, and any must-have moments",
          "We recommend a tent system and layout-friendly add-ons based on your photos or site description",
          "We confirm details: footprint, furniture counts, access path, strike timing, and weather assumptions",
          "Delivery and setup happen on the agreed schedule with professional crews",
          "Event day support follows the plan you approved, including safety checks where needed",
          "Breakdown is scheduled around your venue rules and guest departure timing",
        ],
      },
      {
        id: "ready",
        heading: "What customers should have ready",
        bullets: ["Confirmed or target event date", "Town and venue address", "Realistic guest count", "Surface notes: grass, pavement, or mixed", "Event type and run-of-show highlights"],
      },
      {
        id: "we-help",
        heading: "What we help with",
        bullets: [
          "Tent sizing and system choice across frame, pole, expandable, and large structures",
          "Tables and chairs mapped to service style",
          "Lighting paths, heating conversations when tents are enclosed, and sidewall plans",
        ],
      },
      {
        id: "timing",
        heading: "What affects setup timing",
        paragraphs: [
          "Access distance, surface type, tent size, sidewalls, and evening strikes all influence how long crews are on site. Tell us about stairs, narrow gates, or HOA rules up front so we schedule realistically.",
        ],
      },
    ],
    trustBullets: [
      "Clean, inspected inventory prepared for professional installs",
      "Experienced setup crews who know Connecticut weather and surfaces",
      "Fast quote support when you send complete basics with photos",
    ],
    finalCta: {
      title: "Next step",
      body: "Send date, town, guest count, and surface. We reply with a recommended mix or follow-up questions before we lock delivery windows.",
      primaryLabel: "Request a quote",
      primaryHref: quoteHref,
      secondaryLabel: "Planning hub",
      secondaryHref: "/planning",
    },
    faqs: [
      {
        id: "faq-info",
        question: "What information do you need for a quote?",
        answer:
          "Date, town, guest count, surface type, event style, and any must-have items like dance floors, bars, or heaters. Photos and rough measurements unlock better recommendations.",
      },
      {
        id: "faq-deliver-setup",
        question: "Do you deliver and set up the rentals?",
        answer:
          "Yes for standard tent and event rentals. We install to the plan we agree on, then return for breakdown unless your contract specifies otherwise.",
      },
      {
        id: "faq-book-ahead",
        question: "How far ahead should I book?",
        answer:
          "Popular weekends move first, especially May through October. If your date is firm, reach out early; if you are still planning, we can still advise realistic inventory paths.",
      },
      {
        id: "faq-size-unsure",
        question: "What if I am not sure what size tent I need?",
        answer:
          "That is common. Start with guest count and service style, then read our sizing guide. We will translate that into tent families available for your town and date.",
      },
      {
        id: "faq-addons",
        question: "Do you help with add-ons like chairs, lighting, and heaters?",
        answer:
          "Yes. Most outdoor programs bundle seating, lighting, and weather items with the tent so the experience feels complete on event day.",
      },
    ],
    relatedLinks: [
      { href: "/guides/what-size-tent-do-i-need", label: "What size tent do I need?" },
      { href: "/guides/tent-rental-pricing", label: "How tent rental pricing works" },
      { href: "/faq", label: "FAQ" },
      { href: "/tents/gallery", label: "Tent gallery" },
    ],
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
  },

  "/reviews-and-real-events": {
    path: "/reviews-and-real-events",
    metaTitle: "Reviews & Real Events",
    metaDescription:
      "Proof for CT tent and event rentals: what strong reviews include, gallery-first photos, and how to ask for a similar layout—without fabricated testimonials.",
    articleSection: "Social proof",
    contentEyebrow: "Trust & examples",
    h1: "Reviews and Real Events",
    subhead:
      "See how customers use tents, tables, and chairs for weddings, graduations, backyard parties, and community events.",
    cta: { label: "Request a quote", href: quoteHref },
    quickAnswer:
      "The best proof is seeing the kinds of events we help with and how customers describe the setup experience.",
    sections: [
      {
        id: "by-type",
        heading: "Review highlights by event type (what we look for)",
        paragraphs: [
          "We group feedback by event style so future hosts can compare apples to apples. When you read reviews for any rental company, look for specificity, not just stars.",
        ],
        bullets: [
          "Weddings: timing against ceremony, tent cleanliness, crew communication, rain pivots",
          "Graduations: flow during open houses, table resets, pickup punctuality",
          "Backyard parties: footprint fit, neighbor-friendly setup, lighting when parties run late",
          "Community and corporate: load-in discipline, safety awareness, repeat town relationships",
        ],
      },
      {
        id: "what-good-shows",
        heading: "What good reviews should highlight",
        bullets: [
          "Event type and rough headcount so you know the reviewer’s scale",
          "Town or region for local context across Connecticut and nearby Massachusetts",
          "Cleanliness of tents, linens, and furniture",
          "Punctuality for delivery and pickup windows",
          "Smoothness of setup and willingness to adjust when on-site realities change",
        ],
      },
      {
        id: "snapshots",
        heading: "Real event snapshots (gallery first)",
        paragraphs: [
          "Photo proof lives in our tent gallery and throughout occasion pages. As we publish more captioned installs, this section will link directly to dated examples. For now, use the gallery to study footprint variety, then tell us which scenes feel closest to your day.",
        ],
        bullets: [
          "Short caption idea: tent family plus town name once approved for marketing",
          "Event type tag such as wedding, graduation, or community festival",
          "Rental list highlights: tent span, table style, chair type, lighting notes",
        ],
      },
      {
        id: "cards-placeholder",
        heading: "Photo and quote cards (coming soon)",
        paragraphs: [
          "We are intentionally not fabricating quotes. When verified testimonials are available, each card will pair a photo, a short pull-quote, and a link to the relevant service page.",
        ],
      },
    ],
    finalCta: {
      title: "Next step",
      body: "Tell us the date, town, and guest count. We suggest tent families and furniture mixes that fit what you describe—then confirm against inventory.",
      primaryLabel: "Request a quote",
      primaryHref: quoteHref,
      secondaryLabel: "Browse the tent gallery",
      secondaryHref: "/tents/gallery",
    },
    faqs: [
      {
        id: "faq-events-help",
        question: "What kinds of events do you most often help with?",
        answer:
          "Outdoor weddings, graduations, backyard celebrations, and corporate or community programs are the core of our tent work, supported by tables, chairs, lighting, and weather accessories.",
      },
      {
        id: "faq-weddings-formal",
        question: "Do you work with weddings and formal events?",
        answer:
          "Yes. Formal programs usually pair wider-span tents with upgraded seating and lighting. Start on the wedding hub, then send layout priorities.",
      },
      {
        id: "faq-backyard-grad-examples",
        question: "Can I see examples of backyard and graduation setups?",
        answer:
          "Use the tent gallery and graduation occasion page for visuals, then tell us which footprint feels closest. We will confirm inventory for your date.",
      },
      {
        id: "faq-hartford-area",
        question: "Do you deliver across Hartford County and nearby towns?",
        answer:
          "We serve Connecticut and Southern Massachusetts. Share your venue town for drive-time planning and any multi-day installs.",
      },
      {
        id: "faq-similar-setup",
        question: "Can I request a setup similar to one I see here?",
        answer:
          "Yes. Send a screenshot or link to the photo you like, plus your guest count. We will map realistic furniture and tent options.",
      },
    ],
    relatedLinks: [
      { href: "/tents/gallery", label: "Tent gallery" },
      { href: "/wedding-tent-rentals", label: "Wedding tent rentals" },
      { href: "/events/graduation-parties", label: "Graduation parties" },
      { href: "/case-studies", label: "Real event setups (case studies)" },
    ],
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
  },

  "/case-studies": {
    path: "/case-studies",
    metaTitle: "Real Event Setup Templates",
    metaDescription:
      "Anonymous planning templates for CT tents: wedding, graduation, community, and corporate flows with inventory-style notes—no fake client names.",
    articleSection: "Case studies",
    contentEyebrow: "Planning templates",
    h1: "Real Event Setups",
    subhead:
      "See how different tent, table, and chair combinations come together for different event types.",
    cta: { label: "Browse tent gallery", href: "/tents/gallery" },
    quickAnswer:
      "These case-style stories are planning templates. Names and towns are fictionalized until individual installs are approved for marketing, but the logistics are drawn from real inventory categories.",
    sections: [
      {
        id: "wedding-case",
        heading: "Wedding reception setup (template)",
        bullets: [
          "Event type: tented reception with ceremony nearby on the same property",
          "Setting: private lawn with partial slope toward the tree line",
          "Customer need: seated dinner, head table, dance floor, and bar with weather backup",
          "Recommended setup: expandable frame family sized to guest count plus sidewall plan",
          "Why it worked: aisles planned before furniture arrived, lighting aimed at both dinner and dance zones",
          "Related rentals: rounds, white padded chairs, bistro lighting, optional heaters if walls closed",
          "Planning takeaway: confirm power paths for band and caterer before locking tent orientation",
        ],
      },
      {
        id: "grad-case",
        heading: "Backyard graduation open house (template)",
        bullets: [
          "Event type: afternoon open house with steady arrivals",
          "Setting: driveway for food, lawn for tent cover",
          "Customer need: gift table, dessert station, and overflow seating",
          "Recommended setup: mid-size footprint with mixed banquets and rounds",
          "Why it worked: separate food line kept mingling lanes open",
          "Related rentals: folding chairs, buffet tables, basic tent lighting",
          "Planning takeaway: photograph both grass and hard surfaces before quoting anchoring",
        ],
      },
      {
        id: "community-case",
        heading: "Community event layout (template)",
        bullets: [
          "Event type: town festival with vendor row and stage adjacency",
          "Setting: mixed grass and pavement",
          "Customer need: wide guest aisles, covered registration, rain plan",
          "Recommended setup: large-span system or modular tents with marquee connectors where helpful",
          "Why it worked: early map of entries prevented bottlenecks when rain hit",
          "Related rentals: banquet rows, sidewalls staged for wind side only",
          "Planning takeaway: assign a single on-site contact for crew questions during load-in",
        ],
      },
      {
        id: "corporate-case",
        heading: "Corporate tent and seating setup (template)",
        bullets: [
          "Event type: company picnic with awards program",
          "Setting: flat field with long truck access",
          "Customer need: stage sightlines, buffet, and shaded seating for roughly two hundred guests",
          "Recommended setup: wide tent with classroom rows flanking a central aisle",
          "Why it worked: program path stayed separate from food lines",
          "Related rentals: folding chairs, pa tent lighting upgrade path",
          "Planning takeaway: confirm generator or house power early for AV and catering warmers",
        ],
      },
      {
        id: "wishlist",
        heading: "Wishlist and Goodshuffle-ready featured items",
        paragraphs: [
          "Each approved case study can embed live inventory cards with Goodshuffle IDs and wishlist buttons. Until stories are tied to specific installs, use the wishlist page to build a basket and we will respond with availability and pricing.",
        ],
      },
    ],
    finalCta: {
      title: "Next step",
      body: "Start with date, town, guest count, and surface. We map the parts of a template that fit your site, then confirm against access and inventory.",
      primaryLabel: "Request a quote",
      primaryHref: quoteHref,
      secondaryLabel: "Open wishlist builder",
      secondaryHref: "/wishlist",
    },
    faqs: [
      {
        id: "faq-real-names",
        question: "Are these real client names?",
        answer:
          "Not yet. Templates stay anonymous until clients approve photos and quotes. Logistics and inventory categories still help you plan realistically.",
      },
      {
        id: "faq-customize",
        question: "Can I customize a template for my property?",
        answer:
          "Yes. Send measurements, photos, and guest count. We adapt tent family, furniture, and accessories to your site.",
      },
      {
        id: "faq-more-studies",
        question: "Will you publish more case studies?",
        answer:
          "As we capture approved installs, we will add dated entries with towns and rental manifests.",
      },
      {
        id: "faq-gallery",
        question: "Where should I look for photos today?",
        answer:
          "Start with the tent gallery and occasion hubs, then cross-link here once specific posts go live.",
      },
      {
        id: "faq-quote-similar",
        question: "How do I quote something close to a template?",
        answer:
          "Mention the template title in your message plus anything that differs: surface, headcount, or add-ons.",
      },
    ],
    relatedLinks: [
      { href: "/reviews-and-real-events", label: "Reviews and real events" },
      { href: "/packages/most-booked-event-setups", label: "Most-booked event setups" },
      { href: "/guides/what-size-tent-do-i-need", label: "What size tent do I need?" },
      { href: "/rental-inventory", label: "Rental inventory" },
    ],
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
  },
};

export function getMarketingGuidePage(slug: string) {
  if (!guideSlugs.includes(slug as GuideSlug)) return null;
  return marketingPagesByPath[`/guides/${slug}`] ?? null;
}
