export const business = {
  /** Public brand name: header, footer, titles, copy, and structured data. */
  name: "Connecticut Party Rentals",
  phone: "203-893-7078",
  phoneHref: "tel:+12038937078",
  /** Opens the default SMS app on mobile and many desktops */
  smsHref: "sms:+12038937078",
  email: "info@eventrentct.com",
  /** Public canonical origin (sitemap, robots, OG, JSON-LD). Update if the primary domain changes. */
  websiteUrl: "https://www.eventrentct.com",
  primaryCity: "Bloomfield",
  state: "Connecticut",
  /** USPS ZIP (06002) for display + schema.org postalCode. */
  postalCode: "06002",
  serviceArea: "All of Connecticut and Southern Massachusetts",
  /** Street line only; paired with primaryCity, state, postalCode in UI and JSON-LD. */
  address: "79 Old Windsor Rd",
  /** Shown in copy where a one-line “what we are” helps (Bloomfield home base). */
  locationTagline: "Party equipment rental in Bloomfield, CT",
  /** Tent lending began as a hobby for friends, family, and neighbors. */
  heritageOriginYear: "1946",
  /** Year the full-service rental business was founded (use with heritage + incorporation for the full arc). */
  businessFoundedYear: "1974",
  /** Year the company incorporated as a closely held family business. */
  incorporatedYear: "1994",
  /**
   * “Est.” footer, “family owned since…”, and most on-site “years in business” trust lines.
   * Points to the full business founding (1974), not the informal 1946 start.
   */
  establishedYear: "1974",
  /** Header gold line under the site name */
  celebrationTagline: "Celebrating 50+ years in business.",
  /** Party Packages / home intro — full three-era story in one line */
  heroBrandTagline:
    "Tent rentals started as a family hobby in 1946; we opened as a full business in 1974 and incorporated as a closely held family company in 1994.",
  /** Short paragraph for About and metadata where space allows */
  familyHistoryShort:
    "The family began renting tents as a hobby in 1946 for friends and neighbors, founded a full rental business in 1974, and incorporated as a closely held family company in 1994.",
  partyPackagesTagline: "We set the stage. You steal the show.", ownership: "Family owned and operated", tentSizeRange: "10x10 to 100x250",
};

/** Primary header navigation (internal routes). The Event Guest Count Planner lives under `/events` (My event strip), not here. */
export const headerNavLinks = [
  { href: "/tents", label: "Tents" },
  { href: "/planning", label: "Planning" },
  { href: "/party-packages", label: "Packages" },
  { href: "/table-chair-rentals", label: "Tables & Chairs" },
  { href: "/wedding-tent-rentals", label: "Weddings" },
  { href: "/events", label: "Events" },
  { href: "/av-games", label: "AV/Games" },
] as const;

export const trustPoints = [
  "Celebrating 50+ years in business, family owned and operated", "Fast quote turnaround", "Clean equipment prepared for every event", "Delivery, setup, and breakdown handled by our team", "Serving Connecticut and Southern MA",
];

export const services = [
  {
    title: "Tent Rentals", description: "Frame tents, pole tents, and professional event structures for outdoor gatherings from backyards to full receptions.", href: "/tents", }, {
    title: "Table & Chair Rentals", description: "Round, banquet, and cocktail tables with ceremony, dining, and lounge chair options.", href: "/table-chair-rentals", }, {
    title: "Wedding Tent Rentals", description: "Tent layouts, lighting, and sidewalls planned so your wedding day runs smoothly outside.", href: "/wedding-tent-rentals", }, {
    title: "Events & occasions", description:
      "Corporate picnics, schools, graduations, festivals, and community programs. Start with the events hub, then open occasion guides or corporate rentals.", href: "/events", }, {
    title: "Games & inflatables", description: "Yard games and bounce houses coordinated with tents, tables, and your run of show.", href: "/av-games", },
];

/** Homepage “event types” row, each item links to a relevant service, occasion guide, or FAQ for internal linking. */
export const eventTypeLinks: { label: string; href: string }[] = [
  { label: "Weddings", href: "/wedding-tent-rentals" }, { label: "Graduation parties", href: "/events/graduation-parties" }, { label: "Festivals & fairs", href: "/events/festivals-fairs" }, { label: "Fundraisers & galas", href: "/events/fundraisers-galas" }, { label: "Community & school events", href: "/events/community-school-town" }, { label: "Sweet 16 parties", href: "/events/sweet-16-parties" }, { label: "Quinceañeras", href: "/events/quinceaneras" }, { label: "Tailgates", href: "/events/tailgating" }, { label: "Corporate & events", href: "/events" }, { label: "Backyard parties", href: "/planning#backyard-parties" },
];

export const townList = [
  "Andover",
  "Avon",
  "Barkhamsted",
  "Berlin",
  "Bloomfield",
  "Bolton",
  "Bristol",
  "Burlington",
  "Canton",
  "Cheshire",
  "Chester",
  "Columbia",
  "Coventry",
  "Cromwell",
  "Deep River",
  "Durham",
  "East Granby",
  "East Haddam",
  "East Hampton",
  "East Hartford",
  "East Windsor",
  "Ellington",
  "Enfield",
  "Essex",
  "Farmington",
  "Glastonbury",
  "Granby",
  "Haddam",
  "Hartford",
  "Hartland",
  "Hebron",
  "Killingworth",
  "Manchester",
  "Marlborough",
  "Meriden",
  "Middlefield",
  "Middletown",
  "New Britain",
  "New Hartford",
  "Newington",
  "Norfolk",
  "Plainville",
  "Portland",
  "Rocky Hill",
  "Simsbury",
  "Somers",
  "Southington",
  "South Windsor",
  "Stafford",
  "Suffield",
  "Tolland",
  "Union",
  "Vernon",
  "Wallingford",
  "West Hartford",
  "Westbrook",
  "Wethersfield",
  "Willington",
  "Windsor",
  "Windsor Locks",
];

export const testimonials = [
  {
    name: "Alyssa R.", quote:
      "The team delivered exactly on schedule, the tent and chairs looked immaculate, and setup was stress-free from start to finish.", event: "Wedding reception in West Hartford", }, {
    name: "Daniel M.", quote:
      "Communication was fast, clear, and professional. Our corporate summer event looked polished and stayed on timeline.", event: "Corporate picnic in Farmington", }, {
    name: "Priya S.", quote:
      "We needed a weather backup plan and they handled every detail. Sidewalls, lighting, and layout were all dialed in.", event: "Graduation party in Glastonbury", },
];

/** Only includes files present under `public/images/` (avoids broken gallery thumbnails). */
export const galleryItems = [
  { src: "/images/wedding-tent-hero.png", alt: "Outdoor wedding reception under a white frame tent with round tables and elegant table settings" }, {
    src: "/images/home-hero-panoramic-tent.jpg", alt: "Wide white Connecticut event tent on grass with guest tables, string lights, and open sides for backyard or community gatherings", }, {
    src: "/images/tent-sidewalls-window-walls-tennis-court.png", alt: "Large white event tent with clear window sidewalls and weighted ballasts installed on a green tennis court in Farmington, CT", }, {
    src: "/images/farmington-tent-rental-lakeside-event-tent.png", alt: "Farmington, CT lakeside event tent setup with open sides and scenic waterfront views", }, {
    src: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png", alt: "Elegant outdoor wedding tent rental in Wethersfield, CT with paper lantern lighting and marquee reception setup on the lawn", }, {
    src: "/images/service-areas/glastonbury-ct-frame-tent-30x60.png", alt: "Large white frame tent on grass for an outdoor event in the Glastonbury, Connecticut area", }, {
    src: "/images/service-areas/glastonbury-ct-navitrac-tent-30x30.png", alt: "Navitrac style frame tent on grass for an outdoor gathering in the Glastonbury, Connecticut area", }, {
    src: "/images/service-areas/middletown-ct-frame-tent-20x40.png", alt: "White frame tent on a lawn for an outdoor event in the Middletown, Connecticut area", }, {
    src: "/images/service-areas/cheshire-ct-frame-tent-20x40.png", alt: "White frame tent on a residential lawn in the Cheshire, Connecticut area", },
  { src: "/images/gallery/ct-frame-tent-16x16.png", alt: "Compact 16x16 white frame tent setup for a Connecticut outdoor event footprint", }, {
    src: "/images/gallery/ct-fiesta-frame-tent-20x20.png", alt: "20x20 fiesta-style frame tent setup for a Connecticut backyard or neighborhood gathering", }, {
    src: "/images/gallery/ct-fiesta-frame-tent-20x40.png", alt: "20x40 fiesta-style frame tent layout for dining and service flow at a Connecticut outdoor event", }, {
    src: "/images/gallery/ct-fiesta-frame-tent-30x30.png", alt: "30x30 fiesta-style frame tent setup suitable for Connecticut receptions and private outdoor events", }, {
    src: "/images/white-folding-chair-outdoor-event-ct.jpg", alt: "White folding chair on a lawn at an outdoor Connecticut reception with round tables and string lights in the background", }, {
    src: "/images/60-inch-round-wood-table-outdoor-event-ct.jpg", alt: "60-inch wood-grain round folding table on a lawn with centerpiece and string lights for a Connecticut outdoor event", }, {
    src: "/images/gallery/ct-event-tent-professional-setup.png", alt: "Professional white frame event tent exterior on grass for a Connecticut outdoor gathering", },
];