export const business = {
  name: "Connecticut Party Rentals",
  phone: "[INSERT PHONE]",
  phoneHref: "tel:[INSERT PHONE]",
  email: "[INSERT EMAIL]",
  primaryCity: "Hartford",
  state: "Connecticut",
  serviceArea: "All of Connecticut and Southern Massachusetts",
  address: "[INSERT BUSINESS ADDRESS]",
  /** Shown in copy site-wide; aligns with 80+ year celebration from founding era. */
  establishedYear: "1946",
  /** Trust line (header strip + footer); credibility, not the hero brand tagline */
  celebrationTagline: "Celebrating 80+ years in business",
  /** Polished hero tagline — oldest in CT + quality / service (see homepage hero) */
  heroBrandTagline:
    "Connecticut's oldest party rental company—trusted service and elevated events since 1946.",
  /** Party Packages / tent bundle sales page */
  partyPackagesTagline: "We set the stage. You steal the show.",
  /** FAQ page — line under the celebration / trust line */
  faqPageTagline: "Still hot in tent years",
  ownership: "Family owned and operated",
  tentSizeRange: "10x10 to 100x250",
};

/** Primary header navigation (internal routes). “Call Now” is on the homepage hero image, not in the nav. */
export const headerNavLinks = [
  { href: "/tent-rentals", label: "Tents" },
  { href: "/party-packages", label: "Packages" },
  { href: "/table-chair-rentals", label: "Tables & Chairs" },
  { href: "/wedding-tent-rentals", label: "Weddings" },
  { href: "/corporate-event-rentals", label: "Corporate" },
  { href: "/yard-games", label: "Games" },
];

/** Footer “Services” column — includes deep links not shown in the main nav. */
export const footerServiceLinks = [
  { href: "/tent-rentals", label: "Tent rentals" },
  { href: "/tent-rentals/jobsite-coverage", label: "Jobsite coverage" },
  { href: "/table-chair-rentals", label: "Tables & chairs" },
  { href: "/yard-games", label: "Yard games" },
  { href: "/bounce-houses", label: "Bounce houses" },
  { href: "/party-packages", label: "Party packages" },
  { href: "/wedding-tent-rentals", label: "Weddings" },
  { href: "/corporate-event-rentals", label: "Corporate" },
];

export const trustPoints = [
  "Celebrating 80+ years in business — family owned and operated",
  "Fast quote turnaround",
  "Clean equipment prepared for every event",
  "Delivery, setup, and breakdown handled by our team",
  "Serving Connecticut and Southern MA",
];

export const services = [
  {
    title: "Tent Rentals",
    description: "Frame tents, pole tents, and sailcloth options for polished outdoor events.",
    href: "/tent-rentals",
  },
  {
    title: "Table & Chair Rentals",
    description: "Round, banquet, and cocktail tables with ceremony, dining, and lounge chair options.",
    href: "/table-chair-rentals",
  },
  {
    title: "Wedding Tent Rentals",
    description: "Elevated tent layouts, lighting, and sidewall plans designed for elegant wedding flow.",
    href: "/wedding-tent-rentals",
  },
  {
    title: "Corporate Event Rentals",
    description: "Organized setups for company events, school functions, municipal programs, and festivals.",
    href: "/corporate-event-rentals",
  },
  {
    title: "Yard Games",
    description: "Cornhole, giant Jenga, Connect 4, and more—delivered for backyard parties, graduations, and team events.",
    href: "/yard-games",
  },
  {
    title: "Bounce Houses",
    description: "Clean, inspected inflatables sized for real yards—with safety-first setup and optional game bundles.",
    href: "/bounce-houses",
  },
];

/** Homepage “event types” row — each item links to a relevant service, occasion guide, or FAQ for internal linking. */
export const eventTypeLinks: { label: string; href: string }[] = [
  { label: "Weddings", href: "/wedding-tent-rentals" },
  { label: "Graduation parties", href: "/events/graduation-parties" },
  { label: "Festivals & fairs", href: "/events/festivals-fairs" },
  { label: "Fundraisers & galas", href: "/events/fundraisers-galas" },
  { label: "Community & school events", href: "/events/community-school-town" },
  { label: "Sweet 16 parties", href: "/events/sweet-16-parties" },
  { label: "Quinceañeras", href: "/events/quinceaneras" },
  { label: "Tailgates", href: "/events/tailgating" },
  { label: "Corporate events", href: "/corporate-event-rentals" },
  { label: "Backyard parties", href: "/faq#faq-backyard-party" },
];

/** Footer and cross-page links to occasion landing pages (not shown in main header nav). */
export const eventOccasionGuideLinks: { label: string; href: string }[] = [
  { label: "Community & school", href: "/events/community-school-town" },
  { label: "Festivals & fairs", href: "/events/festivals-fairs" },
  { label: "Graduation parties", href: "/events/graduation-parties" },
  { label: "Sweet 16", href: "/events/sweet-16-parties" },
  { label: "Quinceañeras", href: "/events/quinceaneras" },
  { label: "Tailgating", href: "/events/tailgating" },
  { label: "Fundraisers & galas", href: "/events/fundraisers-galas" },
];

export const townList = [
  "Hartford",
  "West Hartford",
  "Farmington",
  "Avon",
  "Simsbury",
  "Glastonbury",
  "Wethersfield",
  "Rocky Hill",
  "Newington",
  "Berlin",
  "Southington",
  "Plainville",
  "Bristol",
  "Manchester",
  "South Windsor",
  "East Hartford",
  "Bloomfield",
  "Windsor",
  "Cheshire",
  "Middletown",
  "Cromwell",
  "Meriden",
  "Wallingford",
  "New Britain",
];

export const testimonials = [
  {
    name: "Alyssa R.",
    quote:
      "The team delivered exactly on schedule, the tent and chairs looked immaculate, and setup was stress-free from start to finish.",
    event: "Wedding reception in West Hartford",
  },
  {
    name: "Daniel M.",
    quote:
      "Communication was fast, clear, and professional. Our corporate summer event looked polished and stayed on timeline.",
    event: "Corporate picnic in Farmington",
  },
  {
    name: "Priya S.",
    quote:
      "We needed a weather backup plan and they handled every detail. Sidewalls, lighting, and layout were all dialed in.",
    event: "Graduation party in Glastonbury",
  },
];

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

/**
 * Homepage FAQ preview uses the first five (highest-intent topics).
 * Questions mirror what planners ask tent companies—answered in our voice, not copied from competitors.
 */
export const faqItems: FaqItem[] = [
  {
    id: "tent-size",
    question: "What size tent do I need for my event?",
    answer:
      "Size follows your real layout—not a generic chart. We factor seated vs. standing mix, dance floor, buffet or bar lines, head table, DJ or band footprint, and aisle width so servers and guests move comfortably. During planning we sketch a practical flow for your Connecticut venue, then match tent dimensions and style (frame, pole, or sailcloth) to that plan. If your guest count shifts before the event, we adjust recommendations so you are not guessing alone.",
  },
  {
    id: "tent-capacity",
    question: "How many guests fit under a tent?",
    answer:
      "A rough planning rule is about one guest per ten to twelve square feet of tent floor when you are seating people at tables—tighter for ceremony-style rows, more generous for lounge or mixed seating. Always add square footage for dance floors, bars, stages, and service lanes; those pieces shrink usable capacity fast. We translate your headcount and program into a tent size that fits the footprint, not just the math on paper.",
  },
  {
    id: "rain-plan",
    question: "What happens if it rains?",
    answer:
      "We plan for weather before the week of your event. That can mean sidewalls, strategic wall placement, anchoring that suits wind exposure, and layout tweaks so critical areas stay dry. For weddings and timed programs, we talk through a sensible rain backup so you are not making last-minute calls in a panic. Clear window walls and solid walls can be combined so you keep light and views where you want them and block wind where you need it.",
  },
  {
    id: "delivery-setup",
    question: "Do you deliver and set up—and when will you arrive?",
    answer:
      "Yes. Our crew delivers, installs, and returns for takedown so you are not coordinating rentals on event day. We schedule arrival within an agreed window and confirm timing ahead of your date so vendors and venues know what to expect. Access paths, parking, and surface type all affect schedule; we bake that into the plan when you book.",
  },
  {
    id: "pricing",
    question: "How does pricing work?",
    answer:
      "Quotes reflect your date, location, tent size and type, accessories (sidewalls, lighting, climate), tables and chairs, labor for setup and strike, and site conditions such as stairs, distance to the setup area, or hard-surface anchoring. You get line-item clarity—not a vague package—so you can compare options and decide with confidence. Ask us anything on the quote; we prefer upfront questions to surprises later.",
  },
  {
    id: "reserve-ahead",
    question: "How far in advance should I reserve?",
    answer:
      "Prime spring and summer weekends, holiday periods, and popular wedding dates fill first across Connecticut. Once your date and venue are firm, reach out for a quote; we will tell you honestly if inventory is tight. Last-minute requests sometimes work, but early booking keeps your first choice of tent style and size.",
  },
  {
    id: "booking-process",
    question: "How do I book a tent rental?",
    answer:
      "Start with a quote: share your date, town or venue, guest count, and event type. We respond with recommendations, options, and pricing. When you are ready to move forward, we confirm equipment, schedule delivery and installation, and walk through surface conditions and weather considerations. You always know the next step—no mystery process.",
  },
  {
    id: "hard-surface-anchoring",
    question: "Can you set up a tent on a driveway, tennis court, or pavement?",
    answer:
      "Often yes. When stakes cannot go into the ground, we use weighted ballasts or other approved anchoring so the tent stays secure without damaging the surface. Tennis courts, parking areas, and patios are common for corporate and private events; we assess access, slope, and load-in distance during quoting. See our Tent Rentals page for a visual of window sidewalls and ballast setup on a hard surface.",
  },
  {
    id: "lawn-utilities",
    question: "What should I know about lawn staking and underground utilities?",
    answer:
      "For grass installs we typically stake for stability. Clear the area of furniture, hoses, and debris before we arrive; freshly mowed, level lawn helps with a clean setup. If you have irrigation, septic, or buried electric, tell us early so we can position stakes safely—when in doubt, locate utility lines before event day. Steep slopes or soft ground may change anchoring; we address that in planning.",
  },
  {
    id: "tables-without-tent",
    question: "Can I rent tables and chairs without a tent?",
    answer:
      "Yes. Many hosts order tables, chairs, or both for indoor venues, uncovered patios, or events where a tent is not needed. Delivery and pickup scheduling follow the same professional process as tent jobs across Hartford County and Connecticut service towns.",
  },
  {
    id: "backyard-party",
    question: "Do you rent tents for backyard parties in Connecticut?",
    answer:
      "Yes. We review access for our truck and crew, staking vs. ballasting, neighbor-friendly timing, and how guests will move from house to tent. Backyard parties are a staple for us—whether it is a birthday, anniversary, or casual celebration—so the setup feels intentional, not improvised.",
  },
  {
    id: "graduation-events",
    question: "Can you help with graduation tent rentals and guest flow?",
    answer:
      "We map graduation parties around arrival, food lines, seating, speeches, and weather backup. From Farmington to Glastonbury and across CT, we align tent size and inventory with your headcount and schedule so the day stays organized when emotions (and guest counts) run high.",
  },
  {
    id: "corporate-school",
    question: "Do you support corporate events, schools, and community programs?",
    answer:
      "Yes. We align with load-in windows, run-of-show constraints, and presentation standards for company events, school functions, nonprofits, and municipal programs. Repeatable layouts, clear communication with your facilities contact, and dependable teardown timing are built into how we work.",
  },
];

/** Optional rich content for specific town service-area pages (hero image, SEO, copy) */
export type TownPageExtra = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  hero: {
    src: string;
    alt: string;
    caption: string;
  };
};

export const townPageExtras: Partial<Record<string, TownPageExtra>> = {
  Farmington: {
    metaTitle: "Farmington CT Tent Rental",
    metaDescription:
      "Tent rental setup in Farmington, CT featuring a large white event tent on a scenic waterfront lawn, ideal for weddings and private events.",
    h1: "Farmington CT Tent Rental",
    intro:
      "From party tent rental to wedding tent rental, we help Farmington hosts plan outdoor events with delivery and setup you can count on. Whether you need an event tent rental in Farmington for a reception by the water or a Connecticut tent rental backed by decades of local experience, we align tent size, tables, and chairs to your guest count and venue.",
    hero: {
      src: "/images/farmington-tent-rental-lakeside-event-tent.png",
      alt: "Farmington CT tent rental setup on a scenic waterfront lawn for a private event",
      caption: "Large white event tent setup in Farmington, Connecticut",
    },
  },
};

/** Only includes files present under `public/images/` (avoids broken gallery thumbnails). */
export const galleryItems = [
  { src: "/images/wedding-tent-hero.png", alt: "Outdoor wedding reception under a white frame tent with round tables and elegant table settings" },
  {
    src: "/images/tent-sidewalls-window-walls-tennis-court.png",
    alt: "Large white event tent with clear window sidewalls and weighted ballasts installed on a green tennis court in Farmington, CT",
  },
  {
    src: "/images/farmington-tent-rental-lakeside-event-tent.png",
    alt: "Farmington, CT lakeside event tent setup with open sides and scenic waterfront views",
  },
  {
    src: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png",
    alt: "Elegant outdoor wedding tent rental in Wethersfield, CT with paper lantern lighting and marquee reception setup on the lawn",
  },
];