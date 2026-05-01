export type EventLandingContent = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroEyebrow: string;
  heroIntro: string;
  heroImage: string;
  heroImageAlt: string;
  trustLine: string;
  narrativeTitle: string;
  narrativeBody: string;
  splitLeftTitle: string;
  splitLeftBody: string;
  splitRightTitle: string;
  splitRightBody: string;
  splitImage: string;
  splitImageAlt: string;
  caresTitle: string;
  caresCards: { title: string; text: string }[];
  midCtaHeadline: string;
  midCtaSub: string;
  planningTitle: string;
  planningItems: string[];
  weatherTitle: string;
  weatherBody: string;
  upgradesTitle: string;
  upgrades: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
};

const baseRelated = [
  { label: "Party packages", href: "/party-packages" },
  { label: "Tent rentals", href: "/tents" },
  { label: "Table & chair rentals", href: "/table-chair-rentals" },
  { label: "Contact & quote", href: "/contact#quote" },
];

export const eventLandingSlugs = [
  "community-school-town",
  "festivals-fairs",
  "graduation-parties",
  "sweet-16-parties",
  "quinceaneras",
  "tailgating",
  "fundraisers-galas",
] as const;

export type EventLandingSlug = (typeof eventLandingSlugs)[number];

export const eventLandings: Record<EventLandingSlug, EventLandingContent> = {
  "community-school-town": {
    slug: "community-school-town",
    seoTitle: "Community, School & Town Event Tent Rentals in Connecticut",
    metaDescription:
      "Dependable tent and event rentals for Connecticut town greens, school functions, and community gatherings. Weather backup, clear layout, and professional setup.",
    h1: "Community & school events that stay on schedule",
    heroEyebrow: "Town · school · civic",
    heroIntro:
      "When the whole neighborhood is counting on you, the setup has to work the first time. We help Connecticut towns and schools plan coverage, flow, and backup so your event feels organized, not improvised.",
    heroImage: "/images/farmington-tent-rental-lakeside-event-tent.png",
    heroImageAlt:
      "Large event tent on a Connecticut lawn for a community gathering",
    trustLine:
      "Structured planning for public-facing events across Connecticut",
    narrativeTitle: "Civic events need clarity, not chaos",
    narrativeBody:
      "Town meetings, field days, and community celebrations share one thing: lots of stakeholders and zero patience for last-minute surprises. A professional tent plan gives you defined spaces for registration, programming, food service, and shade, so guests know where to go and volunteers aren’t guessing.",
    splitLeftTitle: "What hosts usually prioritize",
    splitLeftBody:
      "Clear entrances, accessible paths, and room for vendors or booths without bottlenecks. We think in crowd movement and sightlines, not just square footage, especially when families, seniors, and kids share the same space.",
    splitRightTitle: "Working with your timeline",
    splitRightBody:
      "School calendars and permit windows don’t flex. We align delivery and strike with your access rules and help you stage setup so the day before isn’t a scramble.",
    splitImage: "/images/wedding-tent-hero.png",
    splitImageAlt:
      "High-peak tent interior with open sides for airflow at an outdoor event",
    caresTitle: "What makes these events run smoothly",
    caresCards: [
      {
        title: "Dependable weather backup",
        text: "Rain plans aren’t optional when you’ve promoted a date. A solid tent strategy keeps programs, speakers, and food service protected.",
      },
      {
        title: "Volunteer-friendly logistics",
        text: "We keep layouts intuitive so your team can focus on guests, not reconfiguring tables at the last minute.",
      },
      {
        title: "Professional presentation",
        text: "Civic events reflect the community. Clean structure and thoughtful layout signal that you planned with care.",
      },
    ],
    midCtaHeadline: "Talk through your date and footprint",
    midCtaSub:
      "Share your location, expected attendance, and must-have zones. We’ll recommend sizing and flow before you commit.",
    planningTitle: "Planning checklist (the parts people forget)",
    planningItems: [
      "Power for sound, lighting, and food warmers: mapped early, not day-of.",
      "Accessible routes from parking to programming, especially after rain.",
      "Wind and stake-down expectations for open fields and town greens.",
      "Strike timing that respects neighbors and permit conditions.",
    ],
    weatherTitle: "Rain isn’t the only reason to tent",
    weatherBody:
      "Sun and heat can drain a crowd faster than a drizzle. Tents give you shade, a visual anchor for your event, and a calmer place for staff to work. When weather shifts, you’re already ahead.",
    upgradesTitle: "Smart add-ons for community crowds",
    upgrades: [
      {
        title: "Sidewalls & climate comfort",
        text: "Cut wind on exposed greens and keep food stations stable when the breeze picks up.",
      },
      {
        title: "Lighting for longer days",
        text: "Evening programs and cleanup are safer and more welcoming with the right lighting plan.",
      },
      {
        title: "Flooring where turf matters",
        text: "Protect fields after wet weather and keep high-traffic areas level for chairs and equipment.",
      },
    ],
    faq: [
      {
        question: "Do we need a tent if the forecast looks fine?",
        answer:
          "Often, yes, especially for school and town events with fixed schedules. Tents aren’t only rain insurance; they manage sun, wind, and crowd comfort so your program doesn’t depend on perfect weather.",
      },
      {
        question: "Can you help if we’re not sure how many people will show?",
        answer:
          "Absolutely. We’ll work from your best estimate and plan flexible zones so you can scale seating and lines without redoing the whole layout.",
      },
      {
        question: "What information do you need to get started?",
        answer:
          "Your date, location, approximate attendance, and what happens under the tent (eating, ceremonies, vendors, kids’ activities). If you’re still deciding, call anyway; we’ll help you sequence decisions.",
      },
      {
        question: "Do you work with parks departments and schools?",
        answer:
          "Yes. We’re used to coordinating around access windows, vehicle paths, and site rules. The earlier we’re involved, the smoother setup day goes.",
      },
    ],
    relatedLinks: [
      { label: "Corporate event rentals", href: "/corporate-event-rentals" },
      ...baseRelated,
    ],
  },
  "festivals-fairs": {
    slug: "festivals-fairs",
    seoTitle: "Festival & Fair Tent Rentals in Connecticut",
    metaDescription:
      "Operational tent and structure planning for Connecticut festivals and fairs: crowd flow, vendor rows, weather readiness, and professional setup for multi-hour and multi-day events.",
    h1: "Festivals & fairs built for real crowds",
    heroEyebrow: "Festivals · fairs · outdoor shows",
    heroIntro:
      "A fair isn’t one tent. It’s circulation, vendor needs, weather exposure, and a clock that doesn’t stop. We help Connecticut producers plan layouts that keep lines moving and crews sane when conditions change.",
    heroImage: "/images/tent-sidewalls-window-walls-tennis-court.png",
    heroImageAlt: "Event tent with sidewalls at an outdoor Connecticut venue",
    trustLine: "Crowd-aware layouts for high-traffic Connecticut events",
    narrativeTitle: "Operational first, decorative second",
    narrativeBody:
      "Guests remember smooth flow and short waits. We design tenting around entry points, vendor spacing, and emergency sightlines so your footprint supports throughput, not just coverage.",
    splitLeftTitle: "Vendor rows & guest paths",
    splitLeftBody:
      "Booth spacing, service gaps, and cable runs matter as much as canopy. We help you avoid pinch points where lines collide and food aromas stall foot traffic.",
    splitRightTitle: "Weather that changes by the hour",
    splitRightBody:
      "Festivals don’t pause for passing cells. We plan sidewalls, weights, and sheltered zones so programming and sales continue when wind or rain arrives.",
    splitImage:
      "/images/wethersfield-ct-party-tent-rental-wedding-reception.png",
    splitImageAlt: "Spacious tent setup for an outdoor Connecticut celebration",
    caresTitle: "What festival producers care about most",
    caresCards: [
      {
        title: "Throughput & safety",
        text: "Clear lanes reduce frustration and help staff respond quickly if weather shifts or crowds surge.",
      },
      {
        title: "Vendor-ready structure",
        text: "Stable anchoring and sensible adjacencies keep booths functional when the ground softens or wind rises.",
      },
      {
        title: "Flexible staging",
        text: "Multi-day events benefit from plans that make strike and reset predictable, so day two starts clean.",
      },
    ],
    midCtaHeadline: "Map the fair before you sell another booth",
    midCtaSub:
      "Send your site sketch, hours, and expected peak attendance. We’ll pressure-test the layout with you.",
    planningTitle: "Festival planning notes that save the day",
    planningItems: [
      "Define peak arrival windows; layout stress-tests around those moments.",
      "Plan power distribution before vendors commit to positions.",
      "Reserve crew access lanes that don’t double as guest queues.",
      "Build a compact rain playbook: what moves, what stays, what protects gear.",
    ],
    weatherTitle: "Tents as operational infrastructure",
    weatherBody:
      "Beyond rain, tents reduce glare, stabilize equipment, and give staff a controlled environment for cash handling and food safety. That’s revenue protection, not just comfort.",
    upgradesTitle: "High-impact add-ons for fairs",
    upgrades: [
      {
        title: "Strategic sidewalls",
        text: "Block prevailing wind on food lines and protect electronics without trapping heat.",
      },
      {
        title: "Lighting packages",
        text: "Extend usable hours and improve safety when dusk hits before teardown.",
      },
      {
        title: "Flooring in soft or uneven areas",
        text: "Keep vendor equipment level and reduce trip hazards after rain.",
      },
    ],
    faq: [
      {
        question: "Can you handle uneven fields or mixed surfaces?",
        answer:
          "Yes. We’ll walk through staking constraints, flooring needs, and how to keep vendor rows stable when the ground varies across your site.",
      },
      {
        question: "What if attendance is hard to predict?",
        answer:
          "We plan around your range, often with modular zones, so you can add capacity without rebuilding the whole site plan.",
      },
      {
        question: "Do you support multi-day festivals?",
        answer:
          "We can align delivery, overnight security expectations, and strike timing with your production schedule so each day starts strong.",
      },
      {
        question: "How early should we involve your team?",
        answer:
          "Earlier is better, especially for permitting, power, and access roads. If you’re in concept phase, we can still help you avoid expensive layout mistakes.",
      },
    ],
    relatedLinks: [
      { label: "Yard games & attractions", href: "/yard-games" },
      { label: "Bounce houses", href: "/bounce-houses" },
      ...baseRelated,
    ],
  },
  "graduation-parties": {
    slug: "graduation-parties",
    seoTitle:
      "Connecticut Graduation Party Tent Rentals | Open House & Backyard Flow",
    metaDescription:
      "Plan a Connecticut graduation party at home: open house vs seated flow, tent shade and rain backup, buffet and gift zones, tables and chairs, lighting and sidewalls, and yard access. Call us if you are not sure what fits.",
    h1: "Graduation party tents built around your weekend at home",
    heroEyebrow: "Connecticut graduation season, family parties at home",
    heroIntro:
      "Graduation weekend is waves of guests, photos, and food on repeat. Most Connecticut families choose an open house with steady traffic, or a seated meal with speeches. Either way you need cover and seating that match how people move, plus backup for late spring sun, wind, or a quick shower. Not sure what your yard can hold? Call with rough headcount and a few photos. We will talk layout before tent SKUs.",
    heroImage: "/images/wedding-tent-hero.png",
    heroImageAlt:
      "Backyard graduation party tent with tables and seating in Connecticut",
    trustLine:
      "Family graduation parties across Connecticut, planned for real yards and real weather",
    narrativeTitle: "Why tents help with graduation parties",
    narrativeBody:
      "At home, a tent is not decoration, it is the frame for the day. It gives shade for afternoon arrivals, a dry place for gifts and dessert when the sky turns, and a clear sense of where food and seating live so guests are not guessing. You still host in your own yard, but the flow feels intentional: a defined place for the buffet line, room for grandparents to sit out of the main traffic lane, and space for the grad to take photos without backing into a cooler.",
    splitLeftTitle: "Typical graduation party setup needs",
    splitLeftBody:
      "Open house flow usually means a wider tent or modular layout, mixed standing and seated areas, a buffet line with depth so two families are not colliding, and a gift or card table out of the food choke point. A seated program needs real chair counts, aisles for service, and headroom if you want remarks or a slideshow under cover. Tell us which style you are leaning toward and your realistic peak headcount, not the whole Facebook invite list.",
    splitRightTitle: "Backyard and private property planning",
    splitRightBody:
      "Driveways, side gates, septic fields, pools, irrigation, low branches, and neighbor setbacks all show up on graduation weekend. We ask how trucks reach the lawn, where stakes or ballast can go on patio vs grass, and when setup and strike can happen without surprises. Photos from each corner of the yard and a quick sketch of where you want food save time before we quote.",
    splitImage: "/images/farmington-tent-rental-lakeside-event-tent.png",
    splitImageAlt:
      "Outdoor tent setup for a Connecticut family celebration on private property",
    caresTitle: "Comfort, weather, and guest flow",
    caresCards: [
      {
        title: "Shade and a cooler gathering spot",
        text: "Late spring sun is stronger than people remember. Covered space keeps the open house from emptying out when the lawn is hot, and gives older guests a place to sit through the whole afternoon.",
      },
      {
        title: "Rain backup that keeps the schedule",
        text: "Quick showers are common. Sidewalls or window panels, planned door locations, and gutters when you use more than one span keep food, gifts, and the grad dry without everyone squeezing into the kitchen.",
      },
      {
        title: "Flow that matches how grad parties run",
        text: "People arrive in clusters, hit food, drop gifts, and drift to talk to the grad. We plan entry, buffet depth, seating pockets, and standing room so the yard does not turn into a single bottleneck by the grill.",
      },
    ],
    midCtaHeadline: "Call and walk through your graduation setup",
    midCtaSub:
      "The fastest way to get useful is a short call: date, town, open house vs seated plan, rough headcount, and what worries you about the yard. We will suggest tent size direction, rental pairings, and what to photograph before we lock a quote.",
    planningTitle: "Common graduation party layouts families start from",
    planningItems: [
      "Open house with buffet: plan line depth, plates and napkins at the start of the line, and overflow seating away from the door people use most.",
      "Seated lunch or dinner under tent: count chairs for your real RSVP list plus a few flex seats for last minute plus ones.",
      "Dance floor or lawn games: if you want both, say so early. They steal square footage from dining unless you add a satellite canopy or schedule them at different times.",
      "Speeches or slideshow: simple AV needs sightlines, power, and often a darker tent ceiling or lighting plan so everyone can see without glare.",
      "Cake and dessert: pull it slightly off the main buffet leg so two lines are not competing for the same corner of the tent.",
    ],
    weatherTitle: "Weather and comfort for late spring in Connecticut",
    weatherBody:
      "May and June can be beautiful, breezy, humid, or wet in the same weekend. A tent gives you shade for the long afternoon block, a place to roll sidewalls if drizzle hits during cake, and lighting so teardown and late guests stay safe after dark. We build the plan around how your family actually uses the yard, not a generic fair weather guess.",
    upgradesTitle: "Popular rental pairings for graduation parties",
    upgrades: [
      {
        title: "Tent, tables, and chairs sized to your flow",
        text: "Frame or modular tents for clear spans, rounds or banquets for seated meals, or more high tops and perimeter seating for open house mingling. We match counts to service style so you are not short seats when cousins arrive in one wave.",
      },
      {
        title: "Lighting, linens, and finishing touches",
        text: "Bistro or wash lighting for evening, simple linens when you want tables to feel more finished, and coordinated whites or neutrals that read well in photos with the grad.",
      },
      {
        title: "Sidewalls, fans, and heaters as needed",
        text: "Cut wind near food, add airflow on humid days, or take the chill off if the party runs past sunset. We talk through options with your menu and guest mix in mind.",
      },
    ],
    faq: [
      {
        question:
          "Open house or seated dinner: how does that change the tent plan?",
        answer:
          "Open house usually needs more standing and circulation space, a deeper buffet lane, and flexible seating pockets. Seated dinner needs accurate chair counts, service aisles, and often a larger single span. Tell us which format you are planning and your peak headcount window.",
      },
      {
        question: "Our yard is small. Can a tent still work for graduation?",
        answer:
          "Often yes, with honest measurements and priorities. Sometimes the right answer is a modest main tent plus using a deck or garage for part of food or gifts, or a satellite canopy for drinks. Send photos and rough dimensions and we will be direct about what fits.",
      },
      {
        question: "What if we do not know the final guest count?",
        answer:
          "Give us a realistic low to high range and whether guests arrive in waves. We plan seating and flow so you can flex within the range without rebuilding the whole layout the week of.",
      },
      {
        question: "Do we need flooring for a backyard graduation?",
        answer:
          "It depends on recent rain, heel traffic, and how level the lawn is. Flooring can protect soft turf and steady chairs for buffet lines. We will say when it is worth it for your site.",
      },
      {
        question: "Can you coordinate with our caterer or food setup?",
        answer:
          "Yes. Share buffet vs plated plans and equipment needs. We align table depth, service entrances, and tent openings so staff are not fighting guest traffic.",
      },
      {
        question: "We are not sure what fits. What should we do first?",
        answer:
          "Call us. A quick conversation plus a few yard photos usually tells us whether we need a site visit, what to measure next, and which tent family makes sense for your date in Connecticut.",
      },
    ],
    relatedLinks: [
      {
        label: "Graduation tent flow (party guide)",
        href: "/party-guides/graduation-party-tent-backyard-connecticut",
      },
      {
        label: "Backyard party checklist tool",
        href: "/backyard-party-checklist",
      },
      { label: "Planning hub (sizing tools)", href: "/planning" },
      { label: "Party packages", href: "/party-packages" },
      ...baseRelated.filter((l) => l.href !== "/party-packages"),
    ],
  },
  "sweet-16-parties": {
    slug: "sweet-16-parties",
    seoTitle: "Sweet 16 Party Tent Rentals in Connecticut",
    metaDescription:
      "Stylish tent rentals for Sweet 16 celebrations in Connecticut: comfortable layout, dance-friendly space, lighting, and weather backup that keeps the night feeling polished.",
    h1: "Sweet 16 celebrations with room to shine",
    heroEyebrow: "Sweet 16 · backyard · venue",
    heroIntro:
      "A Sweet 16 should feel intentional: a great playlist, space to dance, photos that look considered, and parents who can breathe because the basics are handled. We help Connecticut families design tent layouts that feel elevated, not improvised.",
    heroImage:
      "/images/wethersfield-ct-party-tent-rental-wedding-reception.png",
    heroImageAlt: "Elegant tent interior setup for a Connecticut special event",
    trustLine: "Polished layouts for milestone celebrations",
    narrativeTitle: "Style with structure",
    narrativeBody:
      "The vibe comes from lighting, spacing, and flow, not clutter. We plan clear zones for dancing, desserts, and gifts so the night moves smoothly and the tent feels like a real venue.",
    splitLeftTitle: "What teens (and parents) notice",
    splitLeftBody:
      "Room to dance without bumping tables, flattering light for photos, and seating that still feels social. We help you balance energy and practicality.",
    splitRightTitle: "Weather backup that doesn’t kill the mood",
    splitRightBody:
      "A passing shower shouldn’t send everyone indoors. The right tent plan keeps music, food, and dancing under control so the night stays on track.",
    splitImage: "/images/tent-sidewalls-window-walls-tennis-court.png",
    splitImageAlt: "Tent sidewalls and window panels for climate control",
    caresTitle: "What makes a Sweet 16 feel premium",
    caresCards: [
      {
        title: "Defined spaces",
        text: "Dance floor, lounge seating, and dessert tables each have a purpose, so the event feels designed.",
      },
      {
        title: "Photo-friendly lighting",
        text: "Good lighting isn’t flashy: it’s flattering. We help you avoid harsh shadows and dark corners.",
      },
      {
        title: "Host confidence",
        text: "When layout and weather are handled, parents can enjoy the night instead of troubleshooting.",
      },
    ],
    midCtaHeadline: "Design the layout around the moment",
    midCtaSub:
      "Tell us your guest count, DJ placement, and whether you want lounge seating. We’ll propose a footprint that fits your property.",
    planningTitle: "Planning details worth deciding early",
    planningItems: [
      "DJ or band space: power and cover requirements.",
      "Cake and dessert flow: avoid bottlenecks near the dance area.",
      "Gift and coat placement: easy to find, out of the main path.",
      "Parent seating that still feels connected to the action.",
    ],
    weatherTitle: "Comfort equals longer celebrations",
    weatherBody:
      "Heat, humidity, and sudden rain are all party-shorteners. A tent gives you climate moderation and a backup plan, so the energy doesn’t collapse when weather shifts.",
    upgradesTitle: "Upgrades guests feel",
    upgrades: [
      {
        title: "Dance-friendly flooring",
        text: "More stable footing for heels and high-energy dancing, especially on grass.",
      },
      {
        title: "Sidewalls for breeze control",
        text: "Cut wind without making the space feel closed off.",
      },
      {
        title: "Lighting accents",
        text: "Warm, tasteful lighting elevates photos and keeps the space feeling festive after dark.",
      },
    ],
    faq: [
      {
        question: "We want it to feel upscale: can a backyard tent do that?",
        answer:
          "Yes. Layout, lighting, and spacing matter more than gimmicks. We focus on clean structure and smart zones so the setting feels intentional.",
      },
      {
        question: "How big a tent do we need for dancing?",
        answer:
          "It depends on guest count and whether you want a dedicated dance floor. Share your numbers and entertainment plans. We’ll size it responsibly.",
      },
      {
        question: "What if neighbors are a concern?",
        answer:
          "We can discuss timing, sound placement, and teardown schedules. A good plan reduces surprises for everyone.",
      },
      {
        question: "Do you help with layout if we’re overwhelmed?",
        answer:
          "That’s what we’re here for. You don’t need every detail finalized to start. We’ll guide the sequence.",
      },
    ],
    relatedLinks: [
      { label: "Wedding tent rentals", href: "/wedding-tent-rentals" },
      { label: "Party packages", href: "/party-packages" },
      ...baseRelated.filter((l) => l.href !== "/party-packages"),
    ],
  },
  quinceaneras: {
    slug: "quinceaneras",
    seoTitle: "Quinceañera Tent Rentals in Connecticut",
    metaDescription:
      "Respectful, elegant tent planning for Quinceañeras in Connecticut: ceremony and reception flow, family seating, weather backup, and a warm, polished guest experience.",
    h1: "Quinceañera celebrations planned with care",
    heroEyebrow: "Quinceañera · family · tradition",
    heroIntro:
      "A Quinceañera brings together generations: ceremony moments, family formals, music, and a reception that should feel gracious from the first greeting to the last dance. We help Connecticut families create tent layouts that honor tradition while keeping everyone comfortable.",
    heroImage: "/images/farmington-tent-rental-lakeside-event-tent.png",
    heroImageAlt:
      "Elegant outdoor tent for a family celebration in Connecticut",
    trustLine: "Family-centered layouts with thoughtful flow",
    narrativeTitle: "Space that respects the occasion",
    narrativeBody:
      "This day is about your daughter and your family story. We plan seating, dance space, and service areas so elders are accommodated, vendors have room to work, and the celebration keeps its warmth without feeling cramped.",
    splitLeftTitle: "What families often prioritize",
    splitLeftBody:
      "A dignified entrance, clear sightlines for key moments, and seating that keeps close family near the heart of the event, not scattered at the edges.",
    splitRightTitle: "Weather and wardrobe",
    splitRightBody:
      "Late afternoon sun and evening breeze both matter. We think about shade, airflow, and backup so outfits, hair, and photography aren’t fighting the elements.",
    splitImage: "/images/wedding-tent-hero.png",
    splitImageAlt: "Spacious tent with open sides for airflow",
    caresTitle: "Why professional tenting matters here",
    caresCards: [
      {
        title: "Guest comfort across generations",
        text: "Shade, seating, and smooth pathways help everyone participate fully, especially in summer heat.",
      },
      {
        title: "A calm host experience",
        text: "When structure is solved early, family can focus on celebration, not logistics.",
      },
      {
        title: "Polished presentation",
        text: "Clean lines and intentional layout photograph beautifully and feel respectful to the milestone.",
      },
    ],
    midCtaHeadline: "Walk through your ceremony and reception flow",
    midCtaSub:
      "Share your traditions, approximate guest count, and whether you’ll have live music or DJ. We’ll align the footprint.",
    planningTitle: "Details that support the day",
    planningItems: [
      "Photo and family grouping zones with good light and minimal clutter.",
      "Catering service paths that don’t cross the dance floor during key moments.",
      "Kids and elders considered in seating and proximity to restrooms.",
      "Clear plan for gifts, personal items, and vendor access.",
    ],
    weatherTitle: "Backup without losing elegance",
    weatherBody:
      "Rain plans aren’t about fear: they’re about protecting the schedule you worked months to build. A tent gives you a composed environment for food, music, and dancing no matter what the sky does.",
    upgradesTitle: "Thoughtful upgrades",
    upgrades: [
      {
        title: "Climate-smart sidewalls",
        text: "Balance breeze control with an open, welcoming feel.",
      },
      {
        title: "Lighting for evening formality",
        text: "Warm, even lighting flatters portraits and keeps the space inviting.",
      },
      {
        title: "Flooring for grass venues",
        text: "Stability for dancing and heels, especially after rain.",
      },
    ],
    faq: [
      {
        question: "We’re blending traditions: can the layout adapt?",
        answer:
          "Yes. Tell us the sequence you’re planning (presentations, dances, speeches), and we’ll map zones so transitions feel natural for guests and vendors.",
      },
      {
        question: "What if our guest list is still changing?",
        answer:
          "We’ll plan from a realistic range and build flexibility into seating so you’re not locked into a brittle layout.",
      },
      {
        question: "Can you coordinate with our venue or backyard constraints?",
        answer:
          "Absolutely. Photos, dimensions, and access paths help us recommend a footprint that fits your property and schedule.",
      },
      {
        question: "We’re new to tent rentals: where do we start?",
        answer:
          "Start with date, location, and approximate attendance. We’ll guide the next questions, without pressure.",
      },
    ],
    relatedLinks: [
      { label: "Wedding tent rentals", href: "/wedding-tent-rentals" },
      { label: "Table & chair rentals", href: "/table-chair-rentals" },
      ...baseRelated,
    ],
  },
  tailgating: {
    slug: "tailgating",
    seoTitle: "Tailgate Tent Rentals in Connecticut",
    metaDescription:
      "Game-day ready tent rentals for Connecticut tailgates: quick setup, shade, wind control, and comfortable layouts for food, drinks, and friends before kickoff.",
    h1: "Tailgates that feel dialed-in, not chaotic",
    heroEyebrow: "Tailgate · game day · parking lot",
    heroIntro:
      "A great tailgate is simple: shade when the sun is brutal, shelter when wind kicks up, and a layout that keeps food hot and friends close. We help Connecticut fans plan compact, sturdy setups that survive real parking lots, not just perfect weather.",
    heroImage: "/images/tent-sidewalls-window-walls-tennis-court.png",
    heroImageAlt: "Sturdy tent setup for outdoor entertaining",
    trustLine: "Parking-lot practical. Game-day ready.",
    narrativeTitle: "Structure beats improvisation",
    narrativeBody:
      "Folding chairs in a circle works until weather doesn’t cooperate. A tent gives you a home base for coolers, grills, and a crowd that grows as kickoff approaches. You spend less time chasing shade and more time enjoying the day.",
    splitLeftTitle: "What tailgaters actually need",
    splitLeftBody:
      "Stable anchoring in wind, room to stage food without crowding the grill, and a clear spot for trash and supplies so your area stays neighbor-friendly.",
    splitRightTitle: "Timing around lots and traffic",
    splitRightBody:
      "Early arrival windows and tight pack-in rules are normal. Tell us your access constraints. We’ll align setup so you’re not fighting the clock.",
    splitImage:
      "/images/wethersfield-ct-party-tent-rental-wedding-reception.png",
    splitImageAlt: "Outdoor covered space for entertaining",
    caresTitle: "Why tenting helps beyond rain",
    caresCards: [
      {
        title: "Sun and heat relief",
        text: "Afternoon games can be brutal. Shade keeps energy up and food safer longer.",
      },
      {
        title: "Wind control",
        text: "Paper goods, napkins, and lighter setups stay calmer with a wind-smart layout.",
      },
      {
        title: "A defined crew HQ",
        text: "Friends find you faster, and your space feels organized, not sprawled.",
      },
    ],
    midCtaHeadline: "Lock your game-day base camp",
    midCtaSub:
      "Tell us your crew size, cooking plans, and whether you need seating for sit-down eating or mostly standing room.",
    planningTitle: "Tailgate checklist",
    planningItems: [
      "Propane and grill placement with safe clearances.",
      "Cooler flow: separate drink ice from food storage when possible.",
      "Trash bags and a dedicated cleanup plan. Lots appreciate good neighbors.",
      "Weather snapshot: sun angle, wind, and quick rain options.",
    ],
    weatherTitle: "Storms move fast near stadiums",
    weatherBody:
      "Open lots are exposed. A tent isn’t just rain insurance: it’s a calmer place to regroup when the sky turns, without packing up the whole day.",
    upgradesTitle: "Smart add-ons",
    upgrades: [
      {
        title: "Sidewalls for wind",
        text: "Cut gusts that knock over cups and send napkins flying.",
      },
      {
        title: "Weights & anchoring guidance",
        text: "Parking surfaces vary; we’ll help you plan for a stable setup.",
      },
      {
        title: "Tables sized for real food service",
        text: "Buffet lines need space; tight tables create spills and frustration.",
      },
    ],
    faq: [
      {
        question: "How small can we go for a tight parking space?",
        answer:
          "We’ll work from your approximate footprint. Send a quick photo or dimensions and your crew size. We’ll recommend a practical layout.",
      },
      {
        question: "Can we cook under or near the tent?",
        answer:
          "Often yes, with safe clearances. Tell us your grill setup; we’ll advise spacing and ventilation considerations.",
      },
      {
        question: "What if we only need coverage for part of the day?",
        answer:
          "Share your arrival and kickoff timing. We’ll align rental windows with how you actually use the space.",
      },
      {
        question: "Do you deliver near Connecticut stadiums?",
        answer:
          "Tell us your meet-up location and timing constraints. We’ll confirm service options for your area.",
      },
    ],
    relatedLinks: [
      { label: "Table & chair rentals", href: "/table-chair-rentals" },
      { label: "Yard games", href: "/yard-games" },
      ...baseRelated,
    ],
  },
  "fundraisers-galas": {
    slug: "fundraisers-galas",
    seoTitle:
      "Connecticut Nonprofit & Community Event Tent Rentals | Fundraisers & Gatherings",
    metaDescription:
      "Tents and rentals for Connecticut nonprofit and community events: fundraisers, donor receptions, benefit dinners, awareness programs, and neighborhood gatherings. Layout, registration flow, weather backup, tables, chairs, lighting, and sidewalls.",
    h1: "Tents for mission events, community gatherings, and fundraisers in Connecticut",
    heroEyebrow: "Nonprofit and community organizers, Connecticut",
    heroIntro:
      "Volunteer committees run on tight schedules and borrowed attention. A tent gives your outdoor program a clear front door: registration and check-in stay dry, donors can hear remarks, food service has a lane that does not cut through the pledge moment, and families stay longer when shade and backup match the forecast. This page is for mission-driven groups and neighborhood hosts, not company picnics or festival-scale crowds. If you are juggling donors, speakers, and weather on one lawn, call us with your date, rough headcount, and what happens under cover.",
    heroImage:
      "/images/wethersfield-ct-party-tent-rental-wedding-reception.png",
    heroImageAlt:
      "Tented community fundraising event with seating and lighting in Connecticut",
    trustLine:
      "Nonprofit and community events across Connecticut, planned for real volunteers and real weather",
    narrativeTitle: "Why tents help nonprofit and community events",
    narrativeBody:
      "Coverage is only the start. A tent signals where the program lives: guests find registration, silent auction, or pledge tables without wandering the field. It keeps sun off afternoon awareness walks, steadies sound for short programs, and gives catering or faith community kitchens a defined service edge. When turnout matters for fundraising or visibility, comfort and clarity are part of the mission, not extras.",
    splitLeftTitle: "Common event types this page serves",
    splitLeftBody:
      "Outdoor fundraisers and pledge events, donor receptions and stewardship nights, community picnics and neighborhood celebrations, benefit dinners with remarks or auctions, awareness walks and kickoff villages, faith community gatherings on parish or borrowed lawns, and small foundation events on private sites. If your program is town wide or school district procurement, our community and school hub may be a better first stop.",
    splitRightTitle: "What to line up before we quote",
    splitRightBody:
      "Peak arrival window, registration depth, seated vs standing mix, whether food is buffet or plated, where speakers or portable sound live, and how volunteers move equipment without crossing guest lines. Photos of the site, gate width, and any septic, irrigation, or parking limits save rework. We translate that into tent family, footprint, and rental lines that match inventory we actually carry.",
    splitImage: "/images/farmington-tent-rental-lakeside-event-tent.png",
    splitImageAlt:
      "Community benefit tent setup on private property in Connecticut",
    caresTitle: "Layout and event flow that protect your program",
    caresCards: [
      {
        title: "Registration and check-in",
        text: "Tables, shade, and queue depth so the first twenty minutes do not clog the rest of the mission story. Wind panels help when lines form beside an open field.",
      },
      {
        title: "Dining, gathering, and service zones",
        text: "Buffet legs, coffee, dessert, or plated service each need aisle width and a back path for volunteers. Silent auction or gift tables work best slightly off the main food leg.",
      },
      {
        title: "Program and donor focus",
        text: "Remarks, awards, or a short auction need sightlines and intelligible sound. We leave room for simple AV, not a surprise rig blocking exits.",
      },
    ],
    midCtaHeadline: "Call and walk through your mission event",
    midCtaSub:
      "Committees move faster on the phone: date, town, event type, realistic headcount, and what has to happen under cover. We will ask about access and power, then suggest tent direction and rental pairings before you chase permits or print programs.",
    planningTitle: "Comfort, weather, presentation, and turnout",
    planningItems: [
      "Late spring and early fall swings: plan shade for long outdoor blocks, not only rain backup for dinner.",
      "Lighting for evening programs and safe teardown when volunteers stay past dusk.",
      "Sidewalls or window panels for breeze and light drizzle near food or registration, without trapping heat.",
      "Heaters or fans when your crowd includes seniors or young families who will leave early if the space is uncomfortable.",
      "Simple stage or riser conversations when speakers need to be seen above seated guests on grass.",
    ],
    weatherTitle: "Weather and comfort affect mission nights too",
    weatherBody:
      "Connecticut evenings can cool fast after a warm afternoon. Quick showers still show up on benefit weekends. A tent keeps donors in place for the ask, protects printed materials and tech, and gives volunteers a predictable home base when the sky changes. Comfort is part of stewardship: people stay, listen, and give when the room feels cared for.",
    upgradesTitle:
      "Common rental combinations for nonprofit and community tents",
    upgrades: [
      {
        title: "Tent, tables, and chairs sized to service style",
        text: "Frame or modular tents for clear spans, rounds or banquets for seated benefits, or more perimeter seating and high tops for mixed community receptions. We match counts to how food moves, not a generic package.",
      },
      {
        title: "Lighting, linens, and modest décor support",
        text: "Warm string or wash lighting for evening credibility, simple linens when tables should read donor ready, and coordinated neutrals that photograph well for newsletters and social posts.",
      },
      {
        title: "Sidewalls, heaters, fans, and flooring as needed",
        text: "Cut wind at registration, add heat for enclosed dinner tents on chilly nights, move air on humid days, and steady chairs on soft turf after rain.",
      },
    ],
    faq: [
      {
        question: "Is this page for our school or town green event?",
        answer:
          "Sometimes. If procurement, permits, and public crowd control drive the plan, start with our community and school town hub. Stay here when a nonprofit board or neighborhood committee leads the contract and the feel is donor or mission focused rather than municipal operations.",
      },
      {
        question: "How is this different from a corporate picnic page?",
        answer:
          "Corporate pages emphasize employer programs and client hospitality timelines. Here we emphasize volunteer labor, donor experience, pledge or auction flow, and community messaging. The rentals overlap, the run of show does not.",
      },
      {
        question:
          "We are not sure how many people will come. Can you still plan?",
        answer:
          "Yes. Give us a realistic range and whether guests arrive in waves. We plan registration and seating flex so you can adjust within the footprint without rebuilding the whole site the week of.",
      },
      {
        question:
          "Can you coordinate with catering or faith kitchen volunteers?",
        answer:
          "Yes. Share buffet vs plated plans, power limits, and when volunteers can access the tent. We align openings and aisles so service does not fight guest traffic during key moments.",
      },
      {
        question: "Do you support nonprofit approval timelines?",
        answer:
          "We are used to board votes and grant reporting windows. Bring us in when the date is likely and the site is narrowed. We help you sequence what to lock first so committee time is not wasted.",
      },
      {
        question: "What should we do if we do not know what fits?",
        answer:
          "Call with a few site photos, gate width, and your program outline. We will say what usually works for similar Connecticut benefits, what needs a visit, and what to measure next.",
      },
    ],
    relatedLinks: [
      {
        label: "Town and school outdoor programs",
        href: "/events/community-school-town",
      },
      { label: "Planning hub (sizing and tools)", href: "/planning" },
      { label: "Party packages", href: "/party-packages" },
      ...baseRelated.filter((l) => l.href !== "/party-packages"),
    ],
  },
};

export function getEventLanding(slug: string): EventLandingContent | null {
  if (eventLandingSlugs.includes(slug as EventLandingSlug)) {
    return eventLandings[slug as EventLandingSlug];
  }
  return null;
}
