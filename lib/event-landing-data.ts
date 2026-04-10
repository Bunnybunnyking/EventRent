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
  { label: "Tent rentals", href: "/tent-rentals" },
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
    heroImageAlt: "Large event tent on a Connecticut lawn for a community gathering",
    trustLine: "Structured planning for public-facing events across Connecticut",
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
    splitImageAlt: "High-peak tent interior with open sides for airflow at an outdoor event",
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
      { label: "Corporate & municipal events", href: "/corporate-event-rentals" },
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
    splitImage: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png",
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
    seoTitle: "Graduation Party Tent Rentals in Connecticut",
    metaDescription:
      "Celebrate graduation at home or on family property with Connecticut tent rentals: shade, rain backup, seating, and easy flow for relatives, friends, and food service.",
    h1: "Graduation parties that feel effortless for guests",
    heroEyebrow: "Graduation · backyard · family",
    heroIntro:
      "Graduation weekend is a sprint: photos, relatives, food, and weather that won’t cooperate just because it’s special. We help Connecticut families create a comfortable base: shade for afternoon sun, backup for passing showers, and a layout that keeps the focus on your grad.",
    heroImage: "/images/wedding-tent-hero.png",
    heroImageAlt: "Elegant backyard tent setup for a Connecticut outdoor party",
    trustLine: "Seasonal celebrations with sensible backup plans",
    narrativeTitle: "Make space for the moment, not the stress",
    narrativeBody:
      "The best grad parties feel open and relaxed: room to mingle, a clear spot for food, and seating that doesn’t fight the lawn. A tent gives structure without feeling corporate, so your yard still feels like home, just more comfortable.",
    splitLeftTitle: "What families usually want",
    splitLeftBody:
      "Enough seating for grandparents, overflow for friends, and a food zone that doesn’t bottleneck the whole party. We plan around how people actually move, not a perfect diagram.",
    splitRightTitle: "Timing that fits May and June",
    splitRightBody:
      "Short setup windows and back-to-back weekends are normal. Tell us your date and access; we’ll align delivery so you’re not rushing the morning of.",
    splitImage: "/images/farmington-tent-rental-lakeside-event-tent.png",
    splitImageAlt: "Outdoor tent by the water for a Connecticut celebration",
    caresTitle: "Why a tent helps even on a “nice” day",
    caresCards: [
      {
        title: "Sun and shade balance",
        text: "Afternoon heat can shorten a party fast. Covered space keeps guests comfortable through speeches and cake.",
      },
      {
        title: "Rain that shows up mid-party",
        text: "Quick-moving storms are common in late spring. A plan beats a scramble and keeps food and gifts dry.",
      },
      {
        title: "A defined “home base”",
        text: "Guests relax when they know where to put coats, gifts, and plates. Structure reduces awkward wandering.",
      },
    ],
    midCtaHeadline: "Plan the party your grad will actually enjoy",
    midCtaSub:
      "Tell us your headcount range and whether you’re serving buffet or catering. We’ll recommend sizing and flow.",
    planningTitle: "Quick planning wins",
    planningItems: [
      "Decide early: dancing space vs. more seating: both need real square footage.",
      "Plan a gift/dessert zone away from the main food line.",
      "If you’re using a grill or fryer, think ventilation and safe distances from tent walls.",
      "Reserve a calm spot for family photos with decent light and fewer distractions.",
    ],
    weatherTitle: "Spring weather in Connecticut",
    weatherBody:
      "It can be gorgeous, breezy, or suddenly wet. A tent isn’t pessimism: it’s how you keep the schedule you announced to relatives who drove in from out of town.",
    upgradesTitle: "Popular upgrades for grad parties",
    upgrades: [
      {
        title: "Lighting for evening",
        text: "Soft, practical lighting keeps the party going safely after sunset.",
      },
      {
        title: "Sidewalls for breeze or drizzle",
        text: "Add comfort without closing the whole tent off, especially near food.",
      },
      {
        title: "Tables & chairs scaled to your crowd",
        text: "We’ll match inventory to real attendance so you’re not short seats during speeches.",
      },
    ],
    faq: [
      {
        question: "Our yard is small: can a tent still work?",
        answer:
          "Often yes. Send a few photos and rough dimensions; we’ll recommend footprint options and what to prioritize if space is tight.",
      },
      {
        question: "What if we don’t know the final guest count?",
        answer:
          "Give us a realistic range. We’ll plan seating and flow so you can flex slightly without redoing everything.",
      },
      {
        question: "Do we need flooring?",
        answer:
          "Depends on ground softness and heel traffic. If recent rain is likely, flooring can save the lawn and improve stability.",
      },
      {
        question: "Can you coordinate with our caterer?",
        answer:
          "Yes. Share service style and equipment needs. We’ll align layout so lines stay short and staff have room to work.",
      },
    ],
    relatedLinks: [
      { label: "Party packages", href: "/party-packages" },
      { label: "Table & chair rentals", href: "/table-chair-rentals" },
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
    heroImage: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png",
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
    heroImageAlt: "Elegant outdoor tent for a family celebration in Connecticut",
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
    splitImage: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png",
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
    seoTitle: "Fundraiser & Gala Tent Rentals in Connecticut",
    metaDescription:
      "Donor-friendly tent rentals for Connecticut fundraisers and galas: seated dinners, programs, auctions, and weather backup that protects the guest experience and run-of-show.",
    h1: "Fundraisers & galas with donor-grade polish",
    heroEyebrow: "Fundraisers · galas · benefits",
    heroIntro:
      "Donors notice details: comfortable seating, intelligible sound, lighting that flatters, and a schedule that doesn’t unravel when weather shifts. We help Connecticut nonprofits and hosts create tent environments that feel intentional, so your mission stays center stage.",
    heroImage: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png",
    heroImageAlt: "Upscale tent setting for a Connecticut fundraising event",
    trustLine: "Guest experience first. Production-smart layouts.",
    narrativeTitle: "The event should feel effortless to attend",
    narrativeBody:
      "Galas live or die on flow: registration, program seating, auction sightlines, and service timing. We plan tenting around your run-of-show so guests aren’t guessing where to go and staff aren’t improvising in the dark.",
    splitLeftTitle: "What successful benefits prioritize",
    splitLeftBody:
      "Clear stage sightlines, comfortable room at tables, and service paths that don’t cut across the donor experience. We think like a guest, and like a crew running cues.",
    splitRightTitle: "Weather and wardrobe realities",
    splitRightBody:
      "Evening temperature drops and unexpected rain shouldn’t derail speeches or dinner service. A professional tent plan keeps the room stable so your program stays on track.",
    splitImage: "/images/farmington-tent-rental-lakeside-event-tent.png",
    splitImageAlt: "Evening event tent overlooking water in Connecticut",
    caresTitle: "Why tenting supports fundraising outcomes",
    caresCards: [
      {
        title: "Comfort lengthens attention",
        text: "When guests are physically comfortable, programs land better, and generosity follows.",
      },
      {
        title: "Production-friendly structure",
        text: "Sound, lighting, and staging need predictable anchor points and safe cable paths.",
      },
      {
        title: "Composed backup",
        text: "Rain plans protect revenue nights: you don’t get a redo when the schedule is fixed.",
      },
    ],
    midCtaHeadline: "Align the tent with your run-of-show",
    midCtaSub:
      "Share your program format, seating style, and AV needs. We’ll map layout and timing with your team.",
    planningTitle: "Planning points hosts miss",
    planningItems: [
      "Auction visibility and paddle flow: avoid blind corners.",
      "Speaker and stage placement for intelligible sound in a tented space.",
      "Temperature swing planning for long evenings, especially near water or open fields.",
      "Vendor access that doesn’t interrupt the donor experience during key moments.",
    ],
    weatherTitle: "Tents as climate control, not just umbrellas",
    weatherBody:
      "Wind, drizzle, and dropping temps can all shorten a benefit night. A tent gives you moderated airflow, protected AV, and a consistent environment for dinner and program, so donors stay engaged.",
    upgradesTitle: "High-impact gala add-ons",
    upgrades: [
      {
        title: "Flooring for heels and staging",
        text: "Level, stable surfaces improve safety and keep chairs from sinking on turf.",
      },
      {
        title: "Sidewalls & heating strategy",
        text: "Even partial enclosure can transform comfort on chilly Connecticut evenings, planned correctly.",
      },
      {
        title: "Lighting design support",
        text: "Warm, even lighting improves ambiance and photography, without looking gimmicky.",
      },
    ],
    faq: [
      {
        question: "We’re doing a seated dinner: how do you size tents?",
        answer:
          "We size from table counts, service style, stage footprint, and required aisles. Send your floor plan goals and we’ll translate that into a workable structure plan.",
      },
      {
        question: "Can you work with our AV team?",
        answer:
          "Yes. Early coordination prevents last-minute rigging surprises. Share load-in timing and equipment needs.",
      },
      {
        question: "What if our donor count changes near the event?",
        answer:
          "We’ll build reasonable flexibility into seating and service zones, without compromising safety or flow.",
      },
      {
        question: "Do you support nonprofit timelines and approvals?",
        answer:
          "We’re used to committee decisions and vendor coordination. Bring us in when you’re ready. We’ll help you sequence what to lock first.",
      },
    ],
    relatedLinks: [
      { label: "Corporate event rentals", href: "/corporate-event-rentals" },
      { label: "Wedding tent rentals", href: "/wedding-tent-rentals" },
      ...baseRelated,
    ],
  },
};

export function getEventLanding(slug: string): EventLandingContent | null {
  if (eventLandingSlugs.includes(slug as EventLandingSlug)) {
    return eventLandings[slug as EventLandingSlug];
  }
  return null;
}
