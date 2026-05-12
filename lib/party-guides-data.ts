export type PartyGuideCategory =
  | "tent"
  | "party_tips"
  | "wedding"
  | "backyard"
  | "layout"
  | "weather"
  | "logistics"
  | "graduation"
  | "corporate"
  | "inspiration"
  | "pricing";

/** Curated shelves on `/party-guides` (browse hub, not filter chips). */
export type PartyGuideHubSectionId =
  | "tent-planning"
  | "layout-guests"
  | "weather-surface"
  | "tables-addons"
  | "backyard-venue"
  | "event-types";

export type PartyGuideHubSection = {
  id: PartyGuideHubSectionId;
  title: string;
  summary: string;
  /** Guide slugs in display order */
  slugs: string[];
  /** Optional deep links when a shelf is mostly tooling or inventory */
  resourceLinks?: { href: string; label: string; description: string }[];
};

export type PartyGuideTocItem = { id: string; label: string };

export type PartyGuideSection = {
  id: string;
  heading: string;
  body: string;
};

export type PartyGuideCallout = { title: string; body: string };

export type PartyGuideArticle = {
  slug: string;
  title: string;
  metaDescription: string;
  category: PartyGuideCategory;
  categoryLabel: string;
  publishedAt: string;
  updatedAt: string;
  reviewedBy: string;
  excerpt: string;
  intro: string;
  featured?: boolean;
  toc: PartyGuideTocItem[];
  sections: PartyGuideSection[];
  callouts?: PartyGuideCallout[];
  checklist?: string[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
};

/** Filter chips: ids match `PartyGuideCategory` or "all". Labels are SEO-facing. */
export const partyGuideCategories: { id: PartyGuideCategory | "all"; label: string }[] = [
  { id: "all", label: "All guides" }, { id: "tent", label: "Tent size guides" }, { id: "party_tips", label: "Party planning tips" }, { id: "pricing", label: "Quotes & pricing" }, { id: "wedding", label: "Wedding tent guides" }, { id: "backyard", label: "Backyard event guides" }, { id: "layout", label: "Layout & seating" }, { id: "weather", label: "Rain plan & weather" }, { id: "logistics", label: "Event logistics" }, { id: "graduation", label: "Graduation guides" }, { id: "corporate", label: "Corporate event guides" }, { id: "inspiration", label: "Inspiration & ideas" },
];

export const partyGuideHubSections: PartyGuideHubSection[] = [
  {
    id: "tent-planning", title: "Tent planning", summary:
      "Footprint, flow, and system choice, how to think in square feet before anyone asks for a deposit. Pair these with our tent family pages when you are ready to compare inventory.", slugs: [
      "what-size-tent-do-i-need", "how-to-think-about-tent-size-before-you-quote", "what-fits-in-a-20x40-tent-connecticut", "frame-tent-vs-pole-tent-connecticut", "five-questions-before-you-rent-a-tent", "tent-rental-pricing", ], }, {
    id: "layout-guests", title: "Layout & guest count", summary:
      "Where people sit, how lines form, and how programs eat space. Strong layout beats a prettier tent that cannot hold your buffet or dance floor.", slugs: ["wedding-reception-tent-layout-priorities", "buffet-dj-bar-dance-floor-footprint"], }, {
    id: "weather-surface", title: "Weather & surface prep", summary:
      "New England shifts fast. Sidewalls, airflow, lighting, and honest driveway or patio conversations belong in the first plan, not three days out.", slugs: ["outdoor-wedding-rain-plan-basics", "tents-on-driveways-and-pavement"], }, {
    id: "tables-addons", title: "Tables, chairs & add-ons", summary:
      "Seating style and service pieces drive tent size as much as headcount. Browse inventory when you know your flow, then loop back to layout guides if counts change.", slugs: [], resourceLinks: [
      {
        href: "/table-chair-rentals", label: "Table & chair rentals", description: "Rounds, banquets, ceremony seating, and high tops sized to your service style.", }, {
        href: "/rental-inventory", label: "Rental inventory browser", description: "Tents, lighting, heating, and specialty pieces in one place for wishlists and quotes.", }, {
        href: "/wishlist", label: "Build your wishlist", description: "List what you are considering, we respond with availability and a scoped quote.", }, ], }, {
    id: "backyard-venue", title: "Backyard & venue help", summary:
      "Residential lots and private venues have access, utilities, and neighbor realities that parks do not. Use these before you promise a footprint to guests.", slugs: ["backyard-party-checklist-connecticut", "tented-event-details-people-forget"], }, {
    id: "event-types", title: "Event-type planning", summary:
      "Graduations, corporate picnics, weddings, and “we want it to feel special” starts. Match the mood, then bring us date and town for inventory-backed math.", slugs: [
      "graduation-party-tent-backyard-connecticut", "corporate-picnic-tent-flow-basics", "connecticut-tented-party-inspiration-starters", ], },
];

const guides: PartyGuideArticle[] = [
  {
    slug: "how-to-think-about-tent-size-before-you-quote", title: "How to think about tent size before you quote", metaDescription:
      "Practical steps to estimate tent footprint in Connecticut: layout first, guest count second, and what changes the math for dance floors, buffets, and weather.", category: "tent", categoryLabel: "Tent size guides", publishedAt: "2025-11-01", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Start with how people move, not how many people RSVP.", intro:
      "This is the mindset piece: flow first, then furniture, then square footage. For guest-count bands, typical footprint families, and the FAQs hosts ask first, read \"What size tent do I need?\" in this same library, then come back here for the order of operations before you request a quote.", featured: true, toc: [
      { id: "layout-first", label: "Why layout comes first" }, { id: "guest-count", label: "Where guest count still matters" }, { id: "what-changes-math", label: "What changes the math" }, { id: "next-step", label: "What to send us for a useful quote" }, ], sections: [
      {
        id: "layout-first", heading: "Why layout comes first", body:
          "Ceremony in the round, buffet along one wall, or dance floor inside the same roofline all use space differently. Sketch how you want the day to feel, then we translate that into footprint. Our frame tent pages (10×10 through 30×60 class sizes), expandable 20′ and 30′ systems, pole tents, marquee walkways, and 60×60 to 60×150 large structures each solve different layout problems. Your program picks the family, not the other way around.", }, {
        id: "guest-count", heading: "Where guest count still matters", body:
          "Guest count sets a starting band for seating and chair counts. Pair it with table shape (rounds vs banquet), head table size, and whether kids get full seats. Quick table math helps, but it is not a tent size by itself.", }, {
        id: "what-changes-math", heading: "What changes the math", body:
          "Dance floor size, stage, DJ placement, buffet lines, lounge furniture, catering prep tents, and sidewalls all steal square footage. Rain plans and closed sidewalls can also change how tight the room feels. Saying this early prevents a tent that looks fine on paper but feels crowded on site.", }, {
        id: "next-step", heading: "What to send us for a useful quote", body:
          "Date, town, venue or backyard context, estimated guests, and your best guess at ceremony vs reception flow. If you have a planner, loop them in so load in and run of show match the rental plan. Use our planning hub or quick planner when you are ready to go deeper.", }, ], callouts: [
      {
        title: "Quick tip", body: "If you hope for dancing and buffet inside the same tent, say so up front. We would rather size once than shuffle furniture the week of the event.", }, ], checklist: [
      "Rough guest count and seating style (rounds, banquet, mixed)", "Dance floor inside the tent or just outside the edge", "Buffet, stations, or plated service", "Bar count and approximate line style", "Weather comfort level (open sides vs more enclosure)", ], faq: [
      {
        question: "Is there a single chart that picks my tent?", answer:
          "No trustworthy one. Charts help as a conversation starter. Your site, program, and furniture plan decide what fits.", }, {
        question: "Should I use the quick planner first?", answer:
          "If you want structured prompts, yes. You can also contact us with a short note and we will ask the right follow ups.", }, ], relatedSlugs: [
      "what-size-tent-do-i-need", "what-fits-in-a-20x40-tent-connecticut", "frame-tent-vs-pole-tent-connecticut", "backyard-party-checklist-connecticut", ], }, {
    slug: "what-fits-in-a-20x40-tent-connecticut", title: "What fits in a 20×40 tent in Connecticut?", metaDescription:
      "A practical look at 800 square feet under a 20×40 frame or expandable bay: seated counts, buffet and bar lines, dance floor tradeoffs, and when to size up.", category: "tent", categoryLabel: "Tent size guides", publishedAt: "2026-01-10", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Eight hundred square feet is flexible, not magic. Layout still wins.", intro:
      "A 20×40 footprint is one of the most common stepping stones for Connecticut events because it covers eight hundred square feet of clear-span space in typical frame or expandable layouts. This guide explains what that usually means for rounds, ceremonies, buffets, and dance floors, and when you should plan a larger structure or a second tent.", toc: [
      { id: "sqft", label: "The real square footage" }, { id: "programs", label: "Programs that fit comfortably" }, { id: "tradeoffs", label: "Tradeoffs and add-ons" }, { id: "inventory", label: "How this maps to our inventory" }, ], sections: [
      {
        id: "sqft", heading: "The real square footage", body:
          "Twenty by forty is eight hundred square feet under the roof in a clean rectangle. That sounds simple, but aisles, service lanes, DJ or speaker clearance, and head tables all consume length and width you cannot get back. We quote from your flow, not from a single number.", }, {
        id: "programs", heading: "Programs that fit comfortably", body:
          "Many seated dinners in the dozens of guests can start here if dance and buffet are staged thoughtfully or partly outside the same roofline. Cocktail-forward events with limited seating often have more room to breathe. Ceremony-only or awards rows can feel generous in a 20×40 when chairs are the main furniture.", }, {
        id: "tradeoffs", heading: "Tradeoffs and add-ons", body:
          "A full buffet line, large bar build, and dance floor inside the same tent often push you toward more square footage or a satellite canopy for food or DJ. Sidewalls for weather change how tight the room feels even when the math is unchanged.", }, {
        id: "inventory", heading: "How this maps to our inventory", body:
          "We stock frame sizes including 20×20 and 20×40 class units and expandable 20′ and 30′ systems that can combine into longer runs (for example toward 30×45 style layouts). Your quote names the exact bays and connectors that match the site.", }, ], callouts: [
      {
        title: "Size page", body: "See our 20×40 frame tent page for inventory-aware notes and photos you can pair with this guide.", }, ], faq: [
      {
        question: "Is a 20×40 enough for eighty seated guests?", answer:
          "Sometimes, but only if the program matches. Eighty people in rounds with dance and buffet inside the same box is often tight. We confirm with a short layout conversation.", }, ], relatedSlugs: [
      "what-size-tent-do-i-need", "how-to-think-about-tent-size-before-you-quote", "buffet-dj-bar-dance-floor-footprint", ], }, {
    slug: "frame-tent-vs-pole-tent-connecticut", title: "Frame tent vs pole tent: what Connecticut hosts should know", metaDescription:
      "Compare clear-span frame tents and classic pole tents: interior poles, surfaces, style, and when each family fits weddings, backyards, and corporate events.", category: "tent", categoryLabel: "Tent size guides", publishedAt: "2026-02-01", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Clear-span vs classic peaks: the tradeoff is layout and site as much as looks.", intro:
      "Frame tents give you open interiors for rounds, dance floors, and head tables without center poles. Pole tents deliver traditional peaks and often stake beautifully on grass, but seating and photography have to account for poles and guy lines. This guide helps you pick a direction before you fall in love with a photo.", toc: [
      { id: "frame", label: "Frame tents" }, { id: "pole", label: "Pole tents" }, { id: "choose", label: "How we help you choose" }, ], sections: [
      {
        id: "frame", heading: "Frame tents", body:
          "Frame and expandable systems are the default when you need predictable sightlines, modular connections, and flexible anchoring on more surface types with ballast when stakes are not an option. Sizes from compact 10×10 and 12×12 units up through large clear-span structures are all part of the same planning mindset: layout first.", }, {
        id: "pole", heading: "Pole tents", body:
          "Pole tents bring a timeless festival look and often work well on lawns with staking. Planners map tables, dance floor, and traffic around center poles and perimeter lines. When you want that aesthetic and the site cooperates, pole can be the right call.", }, {
        id: "choose", heading: "How we help you choose", body:
          "We ask about surface, wind exposure, guest flow, and the look you want. Then we align families to inventory you can actually book for your date, including marquee walkways when you need covered flow between spaces.", }, ], faq: [
      {
        question: "Can I mix frame and pole on one property?", answer:
          "Sometimes, for example a pole main tent and frame satellite canopies. Flow, anchoring, and timing have to agree; we review during quoting.", }, ], relatedSlugs: [
      "what-size-tent-do-i-need", "how-to-think-about-tent-size-before-you-quote", "tents-on-driveways-and-pavement", "wedding-reception-tent-layout-priorities", ], }, {
    slug: "what-size-tent-do-i-need", title: "What size tent do I need?", metaDescription:
      "Connecticut tent sizing without guesswork: event flow, guest count, seating style, buffet and bar, dance floor, and weather backup, plus realistic footprint families to discuss with your rental team.", category: "tent", categoryLabel: "Tent size guides", publishedAt: "2026-04-20", updatedAt: "2026-04-20", reviewedBy: "Connecticut Party Rentals planning team", excerpt:
      "The right tent size follows how guests eat and move, not a single number from a generic chart.", intro:
      "Different events move differently: a wedding routes people through ceremony, cocktail, dinner, and dance, while a graduation open house has steady traffic and food lines. Start with that flow, add honest guest count and service style, then layer weather comfort. The footprint comes last, and it should match inventory you can actually book.", featured: true, toc: [
      { id: "event-type", label: "Start with event type" }, { id: "guest-count", label: "Guest count (the honest version)" }, { id: "drivers", label: "What changes the span you need" }, { id: "families", label: "Footprint families we talk through in CT" }, { id: "frame-pole", label: "Frame vs pole in one paragraph" }, ], sections: [
      {
        id: "event-type", heading: "Start with event type", body:
          "Backyard parties often center on a grill zone and mingling. Weddings stack moments that each need space at different times. Graduations mix gifts, dessert, and speeches. Corporate and community events blend registration, programming, and food service. Naming the day keeps the conversation in flow, not only square feet.", }, {
        id: "guest-count", heading: "Guest count (the honest version)", body:
          "Use expected attendance with a small buffer for plus-ones and vendors who need floor space. The same headcount feels different when everyone sits at once versus when half the room stands with drinks, say which pattern you want.", }, {
        id: "drivers", heading: "What changes the span you need", body:
          "Seated dinner versus cocktail service, buffet or bar lines, dance floor or band depth, cake and gift tables, and weather backup (sidewalls, wider aisles, sometimes a second entry) all change the math. Tables and chairs steal more room than people remember because chairs slide back and aisles need real width.", }, {
        id: "families", heading: "Footprint families we talk through in CT", body:
          "These are planning words, not promises, until we see your site: 20×20 for compact shade or rain cover; 20×30 and 30×30 for larger backyard flows; 20′ and 30′ expandable systems when length needs to grow with the program; 40′ class widths when service lines and seating share one roof; 60′ systems for major receptions and festivals. Pair any short list with our tent family pages and photos.", }, {
        id: "frame-pole", heading: "Frame vs pole in one paragraph", body:
          "Frame and expandable lines often help tighter layouts and more surface types because interiors stay clear. Pole tents bring classic peaks and strong value on grass when you plan around center poles and stake lines. When you are torn, read the frame vs pole guide here, then send photos so we align with real inventory on your date.", }, ], callouts: [
      {
        title: "Inventory-aware next step", body:
          "Browse rental categories for tents, tables, chairs, and lighting or heating when you know what must live under cover. Tell us what you cannot flex on, we map the rest.", }, ], faq: [
      {
        question: "What size tent do I need for 50 guests?", answer:
          "There is no single correct footprint: seated rounds, buffet lines, and cocktail standing all need different spans. Share how you want people to eat and move, and we map aisles, head table, and dance or band zones against real inventory.", }, {
        question: "What about 100 guests?", answer:
          "A full reception usually needs more canopy than ceremony-only cover for the same headcount. Add bar, buffet, dance, and stage if they share the tent, then we recommend families that fit your flow.", }, {
        question: "Do buffet tables or a bar need extra room?", answer:
          "Yes. Guests queue, plates need set-down space, and bartenders need working depth behind the rail. We plan approach lanes so lines do not choke dinner seating.", }, {
        question: "Is a frame tent better for tight layouts?", answer:
          "Often yes: predictable perimeters and no center poles can simplify tight table maps. Surface, wind, and style still matter, use the frame vs pole guide, then we confirm what is available for your town and date.", }, {
        question: "Can you help if I am not sure?", answer:
          "That is normal. Bring guest count, event type, town, photos, and rough measurements. We recommend tent systems and add-ons, then refine once we understand access and surfaces.", }, ], relatedSlugs: [
      "how-to-think-about-tent-size-before-you-quote", "what-fits-in-a-20x40-tent-connecticut", "frame-tent-vs-pole-tent-connecticut", "tent-rental-pricing", ], }, {
    slug: "tent-rental-pricing", title: "How tent rental pricing works", metaDescription:
      "What drives tent rental quotes in Connecticut: size, surface, layout density, delivery, labor, and add-ons, without list pricing, so you can prep a realistic request.", category: "pricing", categoryLabel: "Quotes & pricing", publishedAt: "2026-04-20", updatedAt: "2026-04-20", reviewedBy: "Connecticut Party Rentals planning team", excerpt:
      "Quotes reflect the install you actually need, distance, surface, tent system, crew time, and accessories, not a generic rate per guest.", intro:
      "We do not publish one-size pricing because two events with the same headcount can price differently: one is a seated buffet on grass with a dance floor, the other is cocktail rounds on pavement with sidewalls and heaters. Understanding the drivers keeps expectations grounded and gets you a faster, more accurate quote.", toc: [
      { id: "drivers", label: "What moves the number" }, { id: "included", label: "What is usually included" }, { id: "adds", label: "What often adds to the quote" }, { id: "anchors", label: "Mental models (illustrative, not priced)" }, { id: "fast-quote", label: "Fastest path to an accurate quote" }, ], sections: [
      {
        id: "drivers", heading: "What moves the number", body:
          "Tent size and system type (frame, pole, expandable, large structures, marquees), layout density because it drives labor and accessory counts, grass versus driveway versus patio for anchoring and protection, sidewalls heating and lighting for material and install time, and access or strike windows that extend crew hours.", }, {
        id: "included", heading: "What is usually included", body:
          "Delivery, professional setup, and breakdown for the rental mix we agree to, plus planning help so the footprint matches your flow, not only a catalog photo.", }, {
        id: "adds", heading: "What often adds to the quote", body:
          "Tables, chairs, linens, and cocktail high-tops sized to your service style; lighting runs and marquee connectors; heaters when tents are enclosed; extra moves or late-night strikes when venues are strict. Nothing here is a hidden fee, it is work, equipment, and time that changes when the program grows.", }, {
        id: "anchors", heading: "Mental models (illustrative, not priced)", body:
          "Think in bundles: simple backyard shade with practical seating; graduation open house with buffet and gift zones; wedding reception with dinner lanes, dance or band, and a lighting upgrade path; larger corporate or community layouts with aisles and possible marquee connectors. We still confirm every line against date, town, surface, and availability.", }, {
        id: "fast-quote", heading: "Fastest path to an accurate quote", body:
          "Send event date and town, guest count and event type, surface type with photos if you have them, and must-have add-ons: sidewalls, heaters, lighting, specialty chairs, stages. A wishlist or package conversation is fine too, we respond with scoped options or the right follow-up questions.", }, ], faq: [
      {
        question: "Why does pricing vary event to event?", answer:
          "Distance, surface, tent system, crew time, accessory count, and venue rules move independently of guest count. Quotes reflect the install you actually need.", }, {
        question: "Do driveways or patios change the quote?", answer:
          "Often yes. Hard surfaces change anchoring, protection, and time on site compared with open grass. A short site note and photos beat guessing from satellite imagery.", }, {
        question: "Are tables and chairs usually bundled with the tent?", answer:
          "Most outdoor programs do. You can still request tent-only, just be explicit about what you already own versus what guests still need on site.", }, {
        question: "Do sidewalls and heaters change the price?", answer:
          "Yes. They add material, install time, and sometimes airflow planning. They also buy comfort when weather shifts.", }, {
        question: "Can I get a planning-range quote before everything is final?", answer:
          "Yes. Share your best current guess on count, layout, and town. We can stage a planning range, then tighten numbers once details firm up.", }, ], relatedSlugs: [
      "what-size-tent-do-i-need", "how-to-think-about-tent-size-before-you-quote", "tents-on-driveways-and-pavement", ], }, {
    slug: "tents-on-driveways-and-pavement", title: "Can a tent go on a driveway or patio?", metaDescription:
      "Hard-surface tent installs in Connecticut: usable footprint, slope, access, frame vs pole tradeoffs, and safe anchoring on asphalt or concrete, what to photograph before you quote.", category: "logistics", categoryLabel: "Site & surfaces", publishedAt: "2026-04-20", updatedAt: "2026-04-20", reviewedBy: "Connecticut Party Rentals planning team", excerpt:
      "Often yes, but tent family, working space, anchoring without stakes, and guest flow decide whether it is the right call.", intro:
      "Driveways and patios can buy level footing and predictable paths for guests in dress shoes. They also introduce ballast plans, surface protection, drainage at the perimeter, and realistic working lanes for crews. Photos and rough measurements help more than satellite guesses.", toc: [
      { id: "when", label: "When hard-surface setups make sense" }, { id: "matters", label: "What matters most on site" }, { id: "types", label: "Frame vs pole on tighter pads" }, { id: "mixed", label: "Mixed yard and pavement" }, { id: "mistakes", label: "Common planning mistakes" }, ], sections: [
      {
        id: "when", heading: "When hard-surface setups make sense", body:
          "Pavement can keep heavy traffic off wet lawn, simplify guest paths, and sometimes improve equipment access. The tradeoff is anchoring without stakes and protecting finishes, both need to be planned, not improvised on install day.", }, {
        id: "matters", heading: "What matters most on site", body:
          "Usable width and footprint including buffer for ballasts, stakes, or guy zones where required; slope and drainage so rain does not channel under sidewalls or doors; truck and dolly access; landscaping and sprinkler heads that cannot take weight; and clear in-and-out for guests when the tent bridges lawn and pavement.", }, {
        id: "types", heading: "Frame vs pole on tighter pads", body:
          "Frame tents are often strong candidates when you need predictable perimeter space and fewer center obstructions on smaller pads. Pole tents deliver classic peaks and value on grass, but center poles and stake lines need to be planned early. Compare our frame vs pole guide, then send photos so recommendations match inventory.", }, {
        id: "mixed", heading: "Mixed yard and pavement", body:
          "Long driveways sometimes let us stage on hard surface while guy or stake zones sit on lawn, if utilities and slope allow. Small patios may push you toward compact footprints or satellite canopies with marquee connectors when inventory allows.", }, {
        id: "mistakes", heading: "Common planning mistakes", body:
          "Measuring only the pretty pad instead of the working area crews need; forgetting buffet, gift, cake, or bar zones outside the dinner rectangle; underestimating clearance for doors, steps, and generator or power paths.", }, ], callouts: [
      {
        title: "Weather on pavement", body:
          "Wind can whip across open asphalt. Sidewalls, lighting, and sometimes marquee entries make guests safer and calmer after dark, see the rain and sidewall guide in this library.", }, ], faq: [
      {
        question: "Can tents be installed on asphalt or concrete?", answer:
          "Often yes, with anchoring and surface protection matched to the pad. Photos and a short description beat guessing.", }, {
        question: "Are frame tents better for driveways?", answer:
          "Frequently a good match when space is tight or you need clear span, but measurements and access still decide. We confirm against real inventory and crew methods.", }, {
        question: "How much extra room should we leave around the tent?", answer:
          "Think in working lanes, not only canopy size. Guests need door stacks that do not block traffic; crews need safe paths. We mark those zones when we review your sketch or photos.", }, {
        question: "What if the surface is uneven?", answer:
          "Minor slope can be managed with planning; major pitch may change tent family or orientation. A side-angle photo keeps expectations honest.", }, ], relatedSlugs: [
      "outdoor-wedding-rain-plan-basics", "frame-tent-vs-pole-tent-connecticut", "tent-rental-pricing", ], }, {
    slug: "wedding-reception-tent-layout-priorities", title: "Wedding reception tent layout priorities", metaDescription:
      "Plan an outdoor wedding tent layout: ceremony vs reception, dance floor placement, buffet and bar lines, head table, and weather backup in Connecticut.", category: "wedding", categoryLabel: "Wedding tent guides", publishedAt: "2025-12-01", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Decide what must happen under one roof, then size the roof.", intro:
      "Reception tents work when the layout respects how guests arrive, eat, toast, and dance. Start with non negotiables: where the head table sits, how buffet or stations move, whether the dance floor shares the same air as dinner, and where rain sends people first.", featured: true, toc: [
      { id: "zones", label: "Zones under one tent" }, { id: "flow", label: "Service and guest flow" }, { id: "backup", label: "Weather and sidewalls" }, ], sections: [
      {
        id: "zones", heading: "Zones under one tent", body:
          "List ceremony attachment, seated dinner, dance, bar, cake, and lounge as separate needs even if some overlap in time. If everything must stay dry in one footprint, the tent grows. If cocktail can spill outside with a quick rain plan, you may flex.", }, {
        id: "flow", heading: "Service and guest flow", body:
          "Servers, photographers, and guests use different lanes. Narrow aisles look fine on CAD and feel tight with chairs and people. We leave realistic buffer for vendors you already booked.", }, {
        id: "backup", heading: "Weather and sidewalls", body:
          "Sidewall style affects light, breeze, and temperature. Planning walls with the tent keeps anchoring coherent. Pair this page with our outdoor rain plan guide for messaging, doors, lighting, and comfort level.", }, ], faq: [
      {
        question: "Do we need a separate tent for catering prep?", answer:
          "Often yes when cooking or heavy prep runs hot. Guest tents stay for dining and dancing; prep stays ventilated and separate.", }, ], relatedSlugs: ["outdoor-wedding-rain-plan-basics", "what-fits-in-a-20x40-tent-connecticut"], }, {
    slug: "backyard-party-checklist-connecticut", title: "Backyard party checklist for Connecticut hosts", metaDescription:
      "A practical checklist for tented backyard parties: access, lawn, utilities, neighbor timing, and how to line up tents, tables, and weather backup.", category: "backyard", categoryLabel: "Backyard event guides", publishedAt: "2025-10-15", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Access, lawn, and utilities matter as much as the guest list.", intro:
      "Backyard parties win when the site is treated like a real venue. Trucks need access, stakes need safe clearance from utilities, and guests need a logical path from parking to the tent. Use this checklist before you lock a date for install.", featured: true, toc: [
      { id: "access", label: "Access and parking" }, { id: "lawn", label: "Lawn and underground utilities" }, { id: "flow", label: "Guest flow and noise" }, { id: "weather", label: "Weather and backup" }, ], sections: [
      {
        id: "access", heading: "Access and parking", body:
          "Measure gate width and overhead branches for our truck path. Tell us if the tent sits far from the driveway so we can plan carry distance and timing.", }, {
        id: "lawn", heading: "Lawn and underground utilities", body:
          "Irrigation, septic, and buried electric matter for staking. If you are unsure, locate lines before event week. Soft or sloped lawn can change anchoring strategy.", }, {
        id: "flow", heading: "Guest flow and noise", body:
          "Give guests a clear walk from parking to the tent. If neighbors are close, agree on music end time and where generators can sit.", }, {
        id: "weather", heading: "Weather and backup", body:
          "Sidewalls, weighting strategy, and a calm rain message on the invite all help. We plan with you so a forecast shift does not feel like a crisis.", }, ], callouts: [
      {
        title: "Connecticut note", body: "Spring mud and fall leaves both affect access and staking. Mention seasonal conditions when you quote.", }, ], faq: [
      {
        question: "Do you stake every backyard tent?", answer:
          "Often on grass we stake when it is safe and allowed. Hard surfaces may use ballasts instead. Site review decides.", }, ], relatedSlugs: ["how-to-think-about-tent-size-before-you-quote", "graduation-party-tent-backyard-connecticut"], }, {
    slug: "outdoor-wedding-rain-plan-basics", title: "Outdoor rain plan: sidewalls, backup, and tent comfort", metaDescription:
      "Connecticut tent weather planning: sidewalls, entries, layout, lighting, heating conversations, and guest messaging, so backup is designed in, not bolted on.", category: "weather", categoryLabel: "Rain plan & weather", publishedAt: "2025-09-20", updatedAt: "2026-04-20", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Comfortable outdoor events decide weather strategy when the tent is quoted, not when the forecast wobbles.", intro:
      "Sidewalls, lighting, heating, and door locations change how a tent feels as much as how dry it stays. Weddings get the headlines, but the same decisions matter for graduations, backyard dinners, and corporate picnics. Build the plan with your layout team early so anchoring, inventory, and guest messaging stay aligned.", toc: [
      { id: "comfort", label: "Define your comfort level" }, { id: "plan", label: "What a real weather plan includes" }, { id: "sidewalls", label: "Sidewalls and airflow" }, { id: "lighting-heating", label: "Lighting and heating (planning only)" }, { id: "by-event", label: "Rain-ready patterns by event style" }, { id: "mistakes", label: "Mistakes we see hosts make" }, { id: "message", label: "Guest messaging" }, ], sections: [
      {
        id: "comfort", heading: "Define your comfort level", body:
          "Decide what still feels like a celebration in light rain or wind. That answer drives tent size, how many panels close, where doors live, and whether parts of the program can flex to a second canopy or the house.", }, {
        id: "plan", heading: "What a real weather plan includes", body:
          "Tent span that fits the program in wet air, not only fair-weather seating. Sidewalls or window walls where they help splash and wind without trapping heat. At least two logical entries so guests never bottleneck at one zipper corner. Aisles that stay passable when jackets and umbrellas appear. Lighting for food lines and steps after sunset. Heating conversations when walls enclose enough volume that warmth matters.", }, {
        id: "sidewalls", heading: "Sidewalls and airflow", body:
          "Solid, window, and clear panels behave differently for wind, light, and temperature. Sometimes partial walls beat sealing every panel. We pick wall types for your season and site, and we plan them with the tent so anchoring stays coherent.", }, {
        id: "lighting-heating", heading: "Lighting and heating (planning only)", body:
          "Bistro and decorative lighting make a tent feel finished; they also help guests see chair legs and buffet transitions once the sun drops. Pair mood lighting with practical coverage where people walk. Heaters can support enclosed tents on cool nights, but results vary with wind, wall configuration, volume, and how often doors open. Inventory conversations often reference 170k, 80k, and 40k BTU families for different enclosed volumes, those are starting points for discussion, not performance promises.", }, {
        id: "by-event", heading: "Rain-ready patterns by event style", body:
          "Weddings: protect ceremony handoff, keep cocktail furniture dry, and keep dinner aisles lit. Graduations: plan for wet shoes, gift-table queues, and dessert stations that cannot get soaked. Backyard dinners: smaller spans with honest sidewall and heat plans as the night cools. Corporate or community: wider aisles, dry signage paths, and sometimes multiple entries when crowds arrive at once.", }, {
        id: "mistakes", heading: "Mistakes we see hosts make", body:
          "Waiting until a few days out to discuss sidewalls when inventory is already committed. Skipping lighting because the event starts in daylight, even though dinner ends after sunset. Treating heaters as a surprise plug-in instead of planning clearances, power, and airflow with the tent.", }, {
        id: "message", heading: "Guest messaging", body:
          "A short note on the website or invite about outdoor elements and footwear sets expectations and lowers day-of stress. Calm messaging beats frantic group texts when radar turns green.", }, ], faq: [
      {
        question: "Should we add sidewalls at the last minute?", answer:
          "Sometimes inventory allows it, but walls are best chosen with the tent so anchoring and layout stay coherent. Ask during quoting so we reserve the right mix.", }, {
        question: "Do I need sidewalls for my tent?", answer:
          "Not always. Season, wind exposure, and how long guests stay under cover decide whether full walls, partial walls, or open sides make sense. Site photos help us recommend a sensible default.", }, {
        question: "What happens if it rains during the event?", answer:
          "Guests consolidate under cover, aisles must stay passable, and slip hazards need attention. If sidewalls, drainage paths, and lighting are already planned, the shift is calmer than reacting mid-ceremony.", }, {
        question: "Can heaters be added to enclosed tents?", answer:
          "Often yes, with clearances and responsible placement. Heat output still depends on enclosure, wind, and door traffic. We set realistic expectations for your layout.", }, {
        question: "Are bistro lights enough for evening events?", answer:
          "They are a strong mood layer. Many programs pair decorative lighting with practical coverage near food service and pathways, tell us where guests walk after dark.", }, {
        question: "Should I plan for weather even if the forecast looks good?", answer:
          "Yes. New England forecasts swing fast. A light backup plan early is cheaper and calmer than a midweek panic before a Saturday wedding.", }, ], relatedSlugs: [
      "wedding-reception-tent-layout-priorities", "tents-on-driveways-and-pavement", "backyard-party-checklist-connecticut", ], }, {
    slug: "buffet-dj-bar-dance-floor-footprint", title: "Buffet, bar, DJ, and dance floor: planning the footprint", metaDescription:
      "Allocate space for buffet lines, bars, DJ or band, and dance floors under a tent: layout rules that prevent crowding in Connecticut events.", category: "layout", categoryLabel: "Layout & seating", publishedAt: "2026-01-20", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Service and entertainment zones steal more room than tables alone.", intro:
      "Guests remember how the tent felt, not the spreadsheet that sized it. Buffet lines, bar queues, DJ or band clearance, and dance floors each need real dimensions. This guide names the common mistakes so your quote matches the night you are planning.", toc: [
      { id: "buffet", label: "Buffet and stations" }, { id: "bar", label: "Bars and lines" }, { id: "dance", label: "Dance floor and sound" }, { id: "split", label: "When to split into two tents" }, ], sections: [
      {
        id: "buffet", heading: "Buffet and stations", body:
          "Lines need length, not just depth. Guests need space to hold plates without blocking tables. If stations face each other, leave aisle width for staff and guests to cross safely.", }, {
        id: "bar", heading: "Bars and lines", body:
          "Multiple bars reduce queues but need square footage and power planning. Tell us if bartenders need ice storage, sinks, or backup behind the bar wall.", }, {
        id: "dance", heading: "Dance floor and sound", body:
          "Dance floors have standard sizes; speakers and subs need clearance and sometimes isolation from seated guests. Subwoofers on hard surfaces behave differently than on turf.", }, {
        id: "split", heading: "When to split into two tents", body:
          "If dinner, dancing, and buffet all compete for the same rectangle, a satellite tent for food, DJ, or lounge often feels better than one overstuffed canopy. Our planning hub calls this out on purpose.", }, ], faq: [
      {
        question: "Can the dance floor sit outside the main tent?", answer:
          "Sometimes, if weather and surface allow and guests understand footwear. We still plan lighting and safety.", }, ], relatedSlugs: ["what-fits-in-a-20x40-tent-connecticut", "corporate-picnic-tent-flow-basics"], }, {
    slug: "graduation-party-tent-backyard-connecticut", title: "Graduation party tent setup for backyards", metaDescription:
      "Plan a Connecticut graduation party under tent: guest flow, speeches, food lines, tables and chairs, and weather backup for busy spring weekends.", category: "graduation", categoryLabel: "Graduation guides", publishedAt: "2026-03-01", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Graduations mix emotion, traffic, and food lines. Give the layout room.", intro:
      "Graduation weekends stack speeches, open houses, buffets, and late arrivals into one afternoon. A tent plan that ignores arrival chaos feels tight even when the guest count looks fine on paper. Start with parking to dessert and work backward.", toc: [
      { id: "arrival", label: "Arrival and crowd timing" }, { id: "food", label: "Food and seating" }, { id: "weather", label: "Spring weather" }, ], sections: [
      {
        id: "arrival", heading: "Arrival and crowd timing", body:
          "Guests rarely arrive evenly. Plan a greeting zone, gift or card table, and a path to food that does not cross the speech area. If the house and tent both host people, sign the route.", }, {
        id: "food", heading: "Food and seating", body:
          "Buffet vs stations changes lines. Round tables for family style seating need different space than high tops for mingling. Tell us if kids need their own zone.", }, {
        id: "weather", heading: "Spring weather", body:
          "May and June in Connecticut can swing hot, wet, or windy in one day. Sidewalls and weighting should match the comfort you want for older relatives, not just the forecast three weeks out.", }, ], faq: [
      {
        question: "Do you rent chairs and tables with the tent?", answer:
          "Yes. Plastic chairs, white padded chairs, rounds, banquet tables, and high tops are common pairings. We align counts to your layout.", }, ], relatedSlugs: ["backyard-party-checklist-connecticut", "buffet-dj-bar-dance-floor-footprint"], }, {
    slug: "tented-event-details-people-forget", title: "Things people forget when planning a tented event", metaDescription:
      "Power, bathrooms, walkways, generator placement, catering rules, and neighbor timing: the logistics checklist Connecticut hosts overlook.", category: "logistics", categoryLabel: "Event logistics", publishedAt: "2026-02-15", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Tents solve cover. Logistics solve comfort.", intro:
      "A beautiful tent plan still fails if guests cannot get from the car to the bar without mud, if sound has nowhere to go, or if the crew cannot reach the stake line. This is the practical layer underneath decor: power, restrooms, access, and rules.", toc: [
      { id: "power", label: "Power and lighting" }, { id: "comfort", label: "Restrooms and walkways" }, { id: "rules", label: "Neighbors and timing" }, ], sections: [
      {
        id: "power", heading: "Power and lighting", body:
          "Bands, DJs, catering warmers, and photo booths add circuits. Extension cords across walkways are a trip hazard; plan power paths with your vendors early.", }, {
        id: "comfort", heading: "Restrooms and walkways", body:
          "Long walks to a single bathroom bottleneck the party. Temporary units need level ground and service access. Marquee sections can keep guests dry between house and tent.", }, {
        id: "rules", heading: "Neighbors and timing", body:
          "Agree on load in and strike windows that respect noise ordinances and sleep. Early crew arrival beats surprise knocks at dawn.", }, ], faq: [
      {
        question: "Do you coordinate with caterers?", answer:
          "We align tent and layout with what catering needs for service and safety. Your caterer should confirm prep, warming, and handwash realities.", }, ], relatedSlugs: ["backyard-party-checklist-connecticut", "corporate-picnic-tent-flow-basics"], }, {
    slug: "corporate-picnic-tent-flow-basics", title: "Corporate picnic tent flow basics", metaDescription:
      "Plan company picnics and staff events with better tent flow: arrival, food lines, programming, and teardown that matches your run of show.", category: "corporate", categoryLabel: "Corporate event guides", publishedAt: "2025-08-01", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Lines and programming eat space. Plan for both.", intro:
      "Corporate events often need clear arrival, registration, food service, and stage or awards timing. Tent placement should match power, AV, and where leadership speaks from, not only where tables fit.", toc: [
      { id: "arrival", label: "Arrival and queues" }, { id: "food", label: "Food service style" }, { id: "wrap", label: "Wrap and load out" }, ], sections: [
      {
        id: "arrival", heading: "Arrival and queues", body:
          "Give guests a single obvious entry. If badges or wristbands are in play, keep that line out of the buffet line.", }, {
        id: "food", heading: "Food service style", body:
          "Buffet, trucks, and boxed lunches use different footprints. Say how food arrives so we leave room for service staff and trash.", }, {
        id: "wrap", heading: "Wrap and load out", body:
          "Agree on end time and truck path before the event. Neighbors and venue rules may limit late noise and pickup windows.", }, ], faq: [
      {
        question: "Do you work with AV vendors?", answer:
          "Yes. Share stage size and power needs early so tent placement and ballast plans stay realistic.", }, ], relatedSlugs: ["buffet-dj-bar-dance-floor-footprint", "tented-event-details-people-forget"], }, {
    slug: "five-questions-before-you-rent-a-tent", title: "Five questions to ask before you rent a tent", metaDescription:
      "Date, site, guest flow, weather comfort, and service needs: the questions that make a Connecticut tent quote actually useful.", category: "party_tips", categoryLabel: "Party planning tips", publishedAt: "2026-03-15", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "A good quote starts with how the day runs, not only how many people come.", intro:
      "If you only share a headcount, you get a guess. If you share how the day moves through space, you get a plan. These five questions are the fastest way to align your tent, tables, and crew with reality.", toc: [
      { id: "date", label: "Date and load-in reality" }, { id: "site", label: "Site and access" }, { id: "flow", label: "Guest flow and program" }, { id: "weather", label: "Weather comfort" }, { id: "service", label: "Food and entertainment" }, ], sections: [
      {
        id: "date", heading: "Date and load-in reality", body:
          "Town events, school calendars, and holiday weekends affect crew windows. Share the full day, not only the party hours.", }, {
        id: "site", heading: "Site and access", body:
          "Grass vs pavement, slope, overhead branches, and how far we carry from the truck all change anchoring and timing. Photos and rough dimensions help.", }, {
        id: "flow", heading: "Guest flow and program", body:
          "Ceremony, cocktail, dinner, and dancing can live in one tent or several zones. Say what must stay dry in one roofline.", }, {
        id: "weather", heading: "Weather comfort", body:
          "Open sides feel different from window walls or solid panels. Decide what still feels acceptable in wind or drizzle.", }, {
        id: "service", heading: "Food and entertainment", body:
          "Buffet, stations, DJ, band, and generators each need space and sometimes power. Mention them before you lock tent size.", }, ], faq: [
      {
        question: "Can I answer these in the Quick Event Planner?", answer:
          "Yes. The planner captures many of the same prompts so you arrive at a quote conversation with structure.", }, ], relatedSlugs: ["how-to-think-about-tent-size-before-you-quote", "tented-event-details-people-forget"], }, {
    slug: "connecticut-tented-party-inspiration-starters", title: "Connecticut tented party inspiration starters", metaDescription:
      "Ideas for backyard parties, weddings, graduations, and corporate events using real tent families and inventory: frame, expandable, pole, structures, and walkways.", category: "inspiration", categoryLabel: "Inspiration & ideas", publishedAt: "2026-04-01", updatedAt: "2026-04-13", reviewedBy: "Connecticut Party Rentals planning team", excerpt: "Match the mood to the structure, then call us for the real math.", intro:
      "Inspiration should still answer practical questions: how guests arrive, where they eat, and what happens if it rains. Use these starters as creative prompts, then bring them to our team with your date and town so we translate ideas into inventory you can book.", toc: [
      { id: "backyard", label: "Backyard and private" }, { id: "wedding", label: "Weddings" }, { id: "public", label: "Corporate and community" }, ], sections: [
      {
        id: "backyard", heading: "Backyard and private", body:
          "Smaller frame units and expandable bays create intimate reception rooms on residential lots. Add marquee fabric to connect house to tent when the weather turns.", }, {
        id: "wedding", heading: "Weddings", body:
          "Ceremony lawn plus reception tent is a classic Connecticut flow. Large clear-span structures enter when guest counts and production needs outgrow standard frame sizes.", }, {
        id: "public", heading: "Corporate and community", body:
          "Festivals and town programs lean on large structures, queue controls, and repeatable layouts. We align load in windows with parks and schools.", }, ], faq: [
      {
        question: "Where should I look for photos?", answer:
          "Start with our tent gallery, then walk tent family pages for structure context. Party guides add the planning narrative.", }, ], relatedSlugs: ["how-to-think-about-tent-size-before-you-quote", "wedding-reception-tent-layout-priorities"], },
];

export const partyGuidesBySlug: Record<string, PartyGuideArticle> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export const partyGuideSlugs = guides.map((g) => g.slug);

export function getPartyGuide(slug: string): PartyGuideArticle | undefined {
  return partyGuidesBySlug[slug];
}

export function getFeaturedGuides(): PartyGuideArticle[] {
  return guides.filter((g) => g.featured);
}

export function getGuidesByCategory(cat: PartyGuideCategory | "all"): PartyGuideArticle[] {
  if (cat === "all") return [...guides].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  return guides.filter((g) => g.category === cat).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getRelatedGuides(slugs: string[]): PartyGuideArticle[] {
  return slugs.map((s) => partyGuidesBySlug[s]).filter(Boolean) as PartyGuideArticle[];
}

export function getGuidesForHubSlugs(slugs: string[]): PartyGuideArticle[] {
  return slugs.map((s) => partyGuidesBySlug[s]).filter(Boolean) as PartyGuideArticle[];
}
