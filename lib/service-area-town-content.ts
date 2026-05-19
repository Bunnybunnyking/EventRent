import { townHeroFillWhenEmpty } from "@/lib/service-area-town-photo-assets";
import { serviceAreaFeaturedImages } from "@/lib/service-area-featured-images";
import {
  buildClusterLocalEventPatterns,
  getTownServiceAreaCluster,
  seedMod,
} from "@/lib/service-area-town-clusters";
import { business, townList, trustPoints as defaultTrustPoints } from "@/lib/site-data";

export type ServiceAreaFeaturedRental = {
  title: string;
  description: string;
  href: string;
  /** One line: who this setup suits. */
  bestFor?: string;
  /** Optional one-line planning note on the card. */
  planningTip?: string;
  image?: { src: string; alt: string };
  goodshuffleItemId?: string;
  goodshuffleImageId?: string;
  goodshuffleProductSlug?: string;
  wishlistEnabled?: boolean;
  waitlistEnabled?: boolean;
  featuredForTown?: boolean;
  eventTags?: string[];
  ctaLabel?: string;
};

export type ServiceAreaTownFAQ = { id: string; question: string; answer: string };

export type ServiceAreaTownSetup = {
  title: string;
  detail: string;
  bestFor?: string;
  /** One line of practical planning detail (optional). */
  planningTip?: string;
  /** Optional nudge to use wishlist for pieces in this setup. */
  wishlistHint?: string;
};

export type ServiceAreaLocalEventPatternsBlock = {
  title: string;
  intro?: string;
  items: { label: string; text: string }[];
};

export type ServiceAreaTownPayload = {
  metaTitle: string;
  metaDescription: string;
  hero: null | { src: string; alt: string; caption: string };
  h1: string;
  heroLead: string;
  /** Optional one line under the hero lead (hours, tone, or scope). */
  heroMicroline?: string;
  /** Short block directly under the hero stack: what we help with here + what to expect. */
  quickAnswerTitle?: string;
  quickAnswer?: string;
  trustPoints: string[];
  /** One short line above the trust chips. */
  trustStripIntro?: string;
  localIntro: string;
  /** Compact “how rentals get used here” layer (no invented venues or stats). */
  localEventPatterns?: ServiceAreaLocalEventPatternsBlock;
  /** If true, render localEventPatterns right after localIntro instead of after planning. */
  localPatternsAfterIntro?: boolean;
  /** If true, render setup bullet list before the event-type card grid. */
  setupBulletsBeforeEvents?: boolean;
  /** Subtle visual emphasis on one mid-page block (same components, different weight). */
  emphasizedMidSection?: "planning" | "patterns" | "events" | "setupBullets" | "setups";
  /** Optional "why read on" line above the event grid. */
  eventHelpIntro?: string;
  eventHelpTitle: string;
  eventHelpItems: { title: string; detail: string }[];
  /** Optional local planning block (distinct from setup bullets). */
  planningBlockTitle?: string;
  planningBlockItems?: string[];
  setupTitle: string;
  setupIntro?: string;
  setupItems: string[];
  setupsTitle: string;
  setupsIntro?: string;
  setups: ServiceAreaTownSetup[];
  featuredTitle: string;
  featuredIntro?: string;
  featuredRentals: ServiceAreaFeaturedRental[];
  faqTitle: string;
  /** Line under FAQ heading; defaults in template if omitted. */
  faqSubline?: string;
  faqs: ServiceAreaTownFAQ[];
  finalCtaBlurb: string;
  finalCtaTitle?: string;
  primaryCtaLabel?: string;
  wishlistCtaLabel?: string;
  relatedLinksIntro?: string;
  /** Optional authoring notes (not rendered). */
  contentMatrix?: ServiceAreaTownContentMatrix;
};

/** Optional per-town “content matrix” for Phase 3+ authoring (fields map to payload keys). */
export type ServiceAreaTownContentMatrix = {
  townName: string;
  heroAngle?: string;
  quickAnswer?: string;
  localEventPatterns?: ServiceAreaLocalEventPatternsBlock;
  primaryEventTypes?: string[];
  setupPriorities?: string[];
  featuredSetupTheme?: string;
  faqFocus?: string;
  ctaAngle?: string;
  imageMood?: string;
  localPlanningNote?: string;
  featuredRentalNotes?: string;
};

type Archetype = "capital" | "near_capital" | "family_suburb" | "town_corridor";

type EmphasisKey = NonNullable<ServiceAreaTownPayload["emphasizedMidSection"]>;

const ARCHETYPE_BY_TOWN: Record<string, Archetype> = {
  Hartford: "capital",
  "East Hartford": "capital",
  Manchester: "capital",
  "New Britain": "capital",
  Middletown: "capital",
  Meriden: "town_corridor",
  Wallingford: "town_corridor",
  Southington: "town_corridor",
  Plainville: "town_corridor",
  Bristol: "town_corridor",
  Cheshire: "town_corridor",
  "West Hartford": "near_capital",
  Avon: "near_capital",
  Simsbury: "near_capital",
  Glastonbury: "near_capital",
  "South Windsor": "near_capital",
  Farmington: "family_suburb",
  Bloomfield: "family_suburb",
  Wethersfield: "family_suburb",
  "Rocky Hill": "family_suburb",
  Newington: "family_suburb",
  Berlin: "family_suburb",
  Cromwell: "family_suburb",
  Windsor: "town_corridor",
  Enfield: "town_corridor",
  "Windsor Locks": "town_corridor",
  Vernon: "town_corridor",
  Portland: "town_corridor",
  Durham: "town_corridor",
  "East Windsor": "family_suburb",
  Somers: "family_suburb",
  Suffield: "family_suburb",
  Granby: "family_suburb",
  "East Granby": "family_suburb",
  Canton: "family_suburb",
  Burlington: "family_suburb",
  Barkhamsted: "family_suburb",
  Hartland: "family_suburb",
  "New Hartford": "family_suburb",
  Norfolk: "family_suburb",
  Ellington: "family_suburb",
  Tolland: "family_suburb",
  Bolton: "family_suburb",
  Andover: "family_suburb",
  Stafford: "family_suburb",
  Columbia: "family_suburb",
  Coventry: "family_suburb",
  Willington: "family_suburb",
  Union: "family_suburb",
  "East Hampton": "family_suburb",
  Middlefield: "family_suburb",
  Haddam: "family_suburb",
  "East Haddam": "family_suburb",
  Chester: "family_suburb",
  "Deep River": "family_suburb",
  Killingworth: "family_suburb",
  Essex: "family_suburb",
  Westbrook: "family_suburb",
  Hebron: "family_suburb",
  Marlborough: "family_suburb",
};

const PRIORITY: Record<string, ServiceAreaTownPayload> = {
  Hartford: {
    metaTitle: `Hartford CT party rentals | Tents, tables, chairs | ${business.name}`, metaDescription: `Hartford CT tent, table and chair rentals with delivery, setup, ballast on pavement and stakes on grass. Schools, lots, yards. Itemized quotes from ${business.name}.`, hero: {
      src: "/images/wedding-tent-hero.png", alt: "White frame tent at an outdoor Connecticut reception with arranged guest tables", caption: "Seated layouts for receptions and programs where pavement and grass meet", }, h1: "Hartford, CT · outdoor programs when access, pavement & guest flow converge", heroLead: `Tents, tables, chairs, lighting, and sidewalls for lots and courtyards where staging is tight and surfaces do not stay one material for long. Quotes call out anchoring, carry paths, and labor so install day matches what you already approved.`, quickAnswerTitle: "Hartford · at a glance", quickAnswer: `We equip company and nonprofit programs, school and community gatherings, and private receptions where parking, pavement, and guest movement compete for the same space. Expect direct questions about truck access, ballast versus stakes, and your run of show before we lock widths.`, heroMicroline: `Family owned since ${business.establishedYear} · capital-city installs sized to your access story`, trustStripIntro: "Non-negotiables on Hartford routes.", trustPoints: defaultTrustPoints.slice(0, 5), localIntro: `Tell us where the truck can breathe, where guests walk first, and whether any slice is courtyard or plaza. Those three beats decide more than a tent size chart.`, localEventPatterns: {
      title: "Rental patterns we see in Hartford", intro: "Mix shifts by address; nothing here is a guarantee of your block, just the shape of the work.", items: [
        {
          label: "Office adjacent programs", text: "Lunch tents, awards, and staff events where load-in windows and pavement anchoring drive the quote.", }, {
          label: "Schools and community lots", text: "Rows, stages, and food lines sized to a printed agenda with teardown tied to custodial or security rules.", }, {
          label: "Residential and side lot events", text: "Cookouts and receptions where driveway ballast, stake lines, and neighbor sight lines need a single plan.", }, ], }, planningBlockTitle: "Planning your outdoor event · Hartford", planningBlockItems: [
      "List truck staging separate from guest parking. If they overlap, we fix it on paper before chairs arrive.", "Call out every paved pocket now: plaza, alley apron, garage apron. Ballast plans hate surprises.", "If security or facilities signs off on hours, forward that window. Crew finish follows your contract, not optimism.", ], setupBulletsBeforeEvents: true, emphasizedMidSection: "setupBullets", eventHelpTitle: "Events & gatherings · Hartford", eventHelpIntro: "Choose the closest lane; we still confirm the two numbers that change square footage.", eventHelpItems: [
      {
        title: "Corporate and nonprofit programs", detail: "Timed installs, inventory that looks intentional on camera, and teardown that respects desks, docks, and garage gates.", }, {
        title: "Neighborhood and block celebrations", detail: "Side lots and driveways where staking or ballasting is chosen before guests park.", }, {
        title: "School and community gatherings", detail: "Field edges, playgrounds, and lots where rows, stages, and food lines follow a published run of show.", }, {
        title: "Private receptions and milestones", detail: "Dance slices, service aisles, and lighting when programs run past sunset near downtown or dense blocks.", }, ], setupTitle: "Site & logistics · Hartford", setupIntro: "Friction shows up in access and anchoring first. Saying it early keeps crews inside your window.", setupItems: [
      "Confirm hydrant sight lines, neighbor driveways, and where swing gates open before we set a frame line.", "Courtyard and plaza work almost always means ballast. Photos in the thread beat a verbal \"it's all cement.\"", "Wind channels between buildings change sidewall calls. We plan walls for comfort, not just rain.", "Shared alleys need coordinated arrival and strike with you and any building contact so traffic stays legal.", ], setupsTitle: "Layouts we quote often · Hartford", setupsIntro: "Labels are shorthand; your address still edits the final diagram.", setups: [
      {
        title: "Plaza or courtyard luncheon shell", detail: "Canopy or tent, tables and chairs, aisles that still work when trays move, anchoring spelled for hardscape.", bestFor: "Timed programs beside offices or institutions.", planningTip: "Send a photo that shows drain grates and step edges where legs cannot land.", wishlistHint: "Wishlist chairs and tables first if headcount is still moving.", }, {
        title: "Program tent with stage lane and rows", detail: "Seating to headcount, head table or stage flagged, service lane kept clear for staff or volunteers.", bestFor: "School or nonprofit agendas with hard start times.", planningTip: "Note if the mic line crosses an aisle; we widen before you print a program.", }, {
        title: "Residential infill reception with rain language", detail: "Frame tent, optional window walls, evening lighting, dance slice only if the lot allows it after stakes.", bestFor: "Hosts who need guests to understand weather backup without panic.", planningTip: "If the grill stays outside the tent, say so. Heat and flow change wall choices.", }, ], featuredTitle: "Explore resources · Hartford", featuredIntro: "Tent hub for modular depth, inventory for SKU compares, community guide when a committee shares the thread.", featuredRentals: [
      {
        title: "Tent rentals hub", description: "Modular notes, sidewalls, jobsite summary, and resource tabs when one size line is not enough.", href: "/tent-rentals", bestFor: "When footprint is the hardest question.", planningTip: "Bookmark the jobsite tab if parking shares space with stakes.", eventTags: ["Tents", "Layout"], image: { ...serviceAreaFeaturedImages.highPeakBallast }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Open tent page", }, {
        title: "Browse inventory", description: "Chairs, tables, tent structures, lighting, and heating in one catalog view.", href: "/rental-inventory", bestFor: "When you want to compare pieces before you commit.", planningTip: "Use wishlist to park alternates while a building contact answers access.", eventTags: ["Catalog"], image: { ...serviceAreaFeaturedImages.fiesta2040 }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "See inventory", }, {
        title: "Corporate and community events", description: "School, nonprofit, and company timelines with realistic load in language.", href: "/events/community-school-town", bestFor: "When facilities or parking add rules to the day.", eventTags: ["School", "Corporate"], image: { src: "/images/gallery/ct-hartford-trinity-high-peak-pole-spring.png", alt: "High-peak pole tent setup at a Hartford-area Connecticut outdoor event" }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: false, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Read event guide", }, ], faqTitle: "FAQ · Hartford tent & party rentals", faqSubline: "City installs reward specifics in the first message.", faqs: [
      {
        id: "hartford-deliver", question: "Do you deliver tent, table, and chair rentals to Hartford?", answer:
          "Yes. Include date, street or venue, guest count, and whether guests mostly sit, stand, or move between zones. We use that to talk access in the first reply instead of bouncing for basics.", }, {
        id: "hartford-pavement", question: "Can you set up on driveways or paved areas in Hartford?", answer:
          "Often yes. When stakes are not appropriate we plan weighted ballasting on paper. Name the surface type up front so anchors match what we roll off the truck.", }, {
        id: "hartford-events", question: "What kinds of events do you support in Hartford?", answer:
          "Corporate and nonprofit programs, school and community gatherings, neighborhood celebrations, and private receptions outdoors. How guests move from arrival through food matters more than the label on the invite.", }, {
        id: "hartford-book", question: "How do I get a quote for a Hartford date?", answer:
          "Use the contact form with date, Hartford address or venue, guest count, and event type. We return options with pricing context and only the follow ups that change footprint or labor.", }, {
        id: "hartford-plan", question: "What should I know before planning an outdoor event in Hartford?", answer:
          "Know your surface mix, truck staging, and whether you need seated dinner, dancing, or mingling. Those three answers drive tent width and chair counts more than a headcount alone.", }, ], finalCtaTitle: "Your Hartford date · access & staging details", finalCtaBlurb: `Street or venue, date, guest count, and where the truck can sit without blocking a lane. We reply with a rental outline you can forward to facilities or a co-host. Wishlist stays useful while you compare chairs or sidewalls.`, primaryCtaLabel: "Email the access details", wishlistCtaLabel: "Stage a wishlist", relatedLinksIntro: "If you need vocabulary before that email:", contentMatrix: {
      townName: "Hartford", heroAngle: "Mixed-surface urban access", quickAnswer: "Company, school, community, and private outdoor programs with tight staging.", faqFocus: "Access, pavement anchoring, committee-forward quotes", ctaAngle: "Venue or street + truck staging", }, }, "West Hartford": {
    metaTitle: `West Hartford CT party rentals | Tents, tables, chairs | ${business.name}`, metaDescription: `West Hartford CT tent and table rentals for yards, graduations, and school nights. Patios, trees, neighbor friendly timing. Delivery and setup by ${business.name}.`, hero: {
      src: "/images/tent-sidewalls-window-walls-tennis-court.png", alt: "Frame tent with window sidewalls on a paved court, illustrating weather backup for outdoor events", caption: "Sidewall and window-wall options when wind or temperature shifts mid-event", }, h1: "West Hartford · outdoor gatherings that feel considered", heroLead: `Yard receptions, graduations, and school nights lean on tidy lawns, patios guests notice, and programs that run past golden hour. We size tents, tables, chairs, lighting, and sidewalls so gardens, decks, and photo lines still feel intentional.`, quickAnswerTitle: "West Hartford · at a glance", quickAnswer: `We mostly dress private lawns and school lots for graduations, milestones, and receptions where presentation and neighbor timing both count. Expect us to ask how food moves from the kitchen and how many people stand during peak arrivals.`, heroMicroline: `${business.establishedYear}+ years in business · yards, schools, same crew standards`, trustStripIntro: "Calm installs start with honest yard math.", trustPoints: defaultTrustPoints.slice(0, 5), localIntro: `Seated versus standing mix, where the buffet lands, and whether kids shortcut through the house changes chair math fast. Send photos when you can; tree lines and stone paths are easier to read in pictures than in adjectives.`, localPatternsAfterIntro: true, emphasizedMidSection: "events", localEventPatterns: {
      title: "How rentals tend to show up here", intro: "Patterns, not promises. Your measurements still win.", items: [
        {
          label: "Polished yard receptions", text: "Rounds, buffets, and lighting paths planned so linens, photographers, and guests are not fighting the same corner.", }, {
          label: "Graduation open houses", text: "Peak chair counts for a short window, optional tent for drizzle, tables that keep the line off the siding.", }, {
          label: "School and PTA nights", text: "Rows, registration, simple stages, and teardown that clears before custodial lockup.", }, ], }, planningBlockTitle: "Planning your outdoor event · West Hartford", planningBlockItems: [
      "Walk kitchen to tent with a plate in mind. If that path feels silly on foot, guests will feel it in heels.", "Photograph tree drip lines and root zones you want legs to miss. One corner-to-corner shot saves a revision.", "If noise or hour caps exist, paste them into the first note. We schedule crew finish to your real cutoff.", ], eventHelpTitle: "Celebrations & gatherings · West Hartford", eventHelpIntro: "Different guest choreography, same inventory discipline.", eventHelpItems: [
      {
        title: "Private yard receptions", detail: "Footprints that respect gardens, decks, and tree lines with setup timing neighbors can live with.", }, {
        title: "Graduation and open house layouts", detail: "Buffet to seating flow, optional tent for weather, chairs for the hour everyone arrives at once.", }, {
        title: "School and PTA evenings", detail: "Rows, registration tables, simple stages, and teardown that clears lots before custodial lockup.", }, {
        title: "Smaller corporate and family milestones", detail: "Compact tents or canopies with evening lighting when programs run past sunset.", }, ], setupTitle: "Site & logistics · West Hartford", setupIntro: "Small yards go tight once linens, cake tables, and staff appear. These are the saves we see most.", setupItems: [
      "Mature canopy and skinny side yards mean we map true flat space before naming a tent family.", "Stone patios and apron concrete often mean ballast zones. A surface sentence in the first email keeps anchors honest.", "Evening cooling usually needs lighting and sometimes walls. We pair those choices with tent width so dusk is not a redesign.", "School venues publish arrival windows. Forward them so crew size matches facilities, not hope.", ], setupsTitle: "Layouts we quote often · West Hartford", setupsIntro: "Curated for residential polish; your tape measure still rules.", setups: [
      {
        title: "Seated dinner tent with buffet spine", detail: "Weather-ready top, rounds to guest count, chairs, lighting if dinner runs late, aisle kept for staff.", bestFor: "Hosts who care how the tent photographs next to the house.", planningTip: "Call out where vendors park so the service aisle stays wide enough at rush.", wishlistHint: "Wishlist linens-adjacent chair counts if RSVPs are still moving.", }, {
        title: "June open house spike layout", detail: "Open sides for flow, sidewalls staged if rain returns, extra chairs for the two-hour crush, gift table away from mud.", bestFor: "Graduations when arrivals stack, then spread out.", planningTip: "Tell us if the garage is part of the food line; we split counts between zones.", }, {
        title: "Mingling first cocktail footprint", detail: "High tops and scattered seats for a smaller canopy, option to add seated tables if the night splits into dinner.", bestFor: "Adult birthdays or anniversaries that start standing.", planningTip: "If speeches happen before dinner, note a sightline to the tent opening.", }, {
        title: "Private lawn reception diagram pack", detail: "Frame tent, rounds, service aisle, optional dance wedge, wall plan tied to forecast for family and vendors.", bestFor: "When everyone needs the same PDF to believe the layout.", planningTip: "Share sweetheart or head table placement before we lock width.", }, ], featuredTitle: "Explore resources · West Hartford", featuredIntro: "Wedding guide for vendor language, graduation page for spikes, inventory when SKUs need comparing.", featuredRentals: [
      {
        title: "Wedding tent rentals", description: "Outdoor reception planning with lighting, aisles, and vendor lane language that matches private yards.", href: "/wedding-tent-rentals", bestFor: "Receptions with seated dinner and dancing on grass.", planningTip: "Bring DJ or band footprint early if a stage slice matters.", eventTags: ["Wedding", "Layout"], image: { src: "/images/wedding-tent-hero.png", alt: "Outdoor wedding reception under a white frame tent" }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Open wedding guide", }, {
        title: "Graduation parties", description: "Headcount spikes, food lines, and weather notes for open house style events.", href: "/events/graduation-parties", bestFor: "May and June weekends with shifting arrival times.", planningTip: "Mention if part of the crowd stays inside. We split chair counts.", eventTags: ["Graduation", "Flow"], image: { ...serviceAreaFeaturedImages.fiesta2040 }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: false, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Read graduation tips", }, {
        title: "Browse inventory", description: "Chairs, tables, tent sections, and add ons in one catalog.", href: "/rental-inventory", bestFor: "When you want to compare pieces before you commit.", eventTags: ["Catalog"], image: { ...serviceAreaFeaturedImages.fiesta3030 }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "See inventory", }, ], faqTitle: "FAQ · West Hartford tent & party rentals", faqSubline: "Backyard polish and school nights. Answers stay short.", faqs: [
      {
        id: "wh-deliver", question: "Do you deliver rentals to West Hartford homes and schools?", answer:
          "Yes. Lead with date, street, guest count, and whether guests mostly sit, stand, or surge for an open house. We confirm access, surface type, and install windows from that.", }, {
        id: "wh-backyard", question: "Can you set up a tent in a smaller West Hartford backyard?", answer:
          "Often yes when we see true flat space after decks and beds. Rough dimensions or photos let us pick tent family and width with aisles and any dance or buffet zones you still need.", }, {
        id: "wh-rain", question: "What if rain is forecast for our West Hartford date?", answer:
          "We plan sidewalls and anchoring with you before install week, not the morning of the party. Window walls can keep light while cutting wind if the forecast wobbles.", }, {
        id: "wh-quote", question: "How far ahead should we book busy weekends?", answer:
          "Prime May through August Saturdays fill first. When your date is firm, request a quote. If inventory is tight we say so and suggest swaps that still fit your footprint.", }, {
        id: "wh-events", question: "What events do you most often equip in West Hartford?", answer:
          "Graduation open houses, yard receptions, PTA or school nights, and family milestones that mix seated dinner with mingling. Food path beats event title for how we size tables.", }, ], finalCtaTitle: "Your West Hartford date · yard & guest flow", finalCtaBlurb: `Address, date, guest count, and one sentence on how people move from kitchen to tent are enough to start. We return with a diagram-friendly outline you can share with family or school contacts. Wishlist while you compare chairs or sidewalls.`, primaryCtaLabel: "Send the yard details", wishlistCtaLabel: "Compare on wishlist", relatedLinksIntro: "Reading before you measure:", contentMatrix: {
      townName: "West Hartford", heroAngle: "Polished residential and school nights", quickAnswer: "Yard receptions and graduations with high presentation expectations.", faqFocus: "Small yards, rain walls, open house flow", ctaAngle: "Yard + food path", }, }, Farmington: {
    metaTitle: `Farmington CT tent rentals | Tables, chairs, lighting | ${business.name}`, metaDescription: `Farmington CT lawn receptions and backyard milestones. Tents, tables, chairs, lighting. Grade, vendor lanes, delivery and setup by ${business.name}.`, hero: {
      src: "/images/farmington-tent-rental-lakeside-event-tent.png", alt: "Farmington CT tent rental on a lawn near water for a private outdoor event", caption: "Lawn reception footprint with service lanes and guest movement in mind", }, h1: "Farmington · lawn receptions & milestones outdoors", heroLead: `Private lawns here often host the full program outside: cocktails, seated dinner, speeches, cake, and vendor traffic without trampling beds. We map tents, tables, chairs, lighting, and sidewalls to guest count, gentle grade, and how people move from patio to tent line.`, quickAnswerTitle: "Farmington · at a glance", quickAnswer: `We focus on private-property receptions, refined backyard milestones, graduation weekends, and small corporate evenings at home. Expect questions about grade, tree canopy, vendor lanes, and how formal the seating is before we pick a tent family.`, heroMicroline: `Private lawns · quotes separate gear, labor, and install`, trustStripIntro: "Property care shows up in how we measure first.", trustPoints: defaultTrustPoints.slice(0, 5), localIntro: `Say whether the lawn rolls even a little, how wide the vendor path behind rounds needs to be, and if dancing is real or theoretical. Those answers move leg lines before they move your RSVP count.`, localEventPatterns: {
      title: "Farmington rental rhythms", intro: "Illustrative mixes we see on private lots, not a census of every address.", items: [
        {
          label: "Lawn receptions", text: "Rounds, head tables, service aisles, and lighting timed for sunset photos without tripping hazards.", }, {
          label: "Garden forward gatherings", text: "Smaller canopies tied to patios and paths so guests and florals keep sight lines clean.", }, {
          label: "At-home corporate evenings", text: "Compact, presentable seating with remarks lighting and strike that clears the yard for Monday.", }, ], }, emphasizedMidSection: "setups", planningBlockTitle: "Planning your outdoor event · Farmington", planningBlockItems: [
      "Shoot the lawn from the house out and from the far corner back. Grade and canopy read clearer as a pair.", "Long drives add carry minutes. Mention length so crew size matches your start time, not a default two-person guess.", "If a band or caterer needs a protected lane, say it now. That lane is cheaper to reserve on paper than on grass.", ], eventHelpTitle: "Celebrations & gatherings · Farmington", eventHelpIntro: "Presentation and turf care lead the questions here.", eventHelpItems: [
      {
        title: "Lawn receptions and seated dinners", detail: "Tent sizing with service aisles, sweetheart or head table placement, and lighting as the sun drops.", }, {
        title: "Upscale backyard gatherings", detail: "Layouts around patios, stone paths, and gardens with sight lines guests and photographers use.", }, {
        title: "Graduation and family celebrations", detail: "Peak chair counts, buffet lines, optional tent coverage when weather is uncertain.", }, {
        title: "Small corporate evenings at a residence", detail: "Professional install, presentable chairs and tables, and teardown that clears before Monday.", }, ], setupTitle: "Site & logistics · Farmington", setupIntro: "Slopes and long carries change crew time the same way tent width changes chair counts.", setupItems: [
      "Even gentle grade shifts stake lines. A short written note or photo beats guessing from satellite imagery.", "Driveway length changes carry time. We staff installs to your start time, not a generic two-person default.", "Patios beside turf often mean ballast in one band and stakes in another, planned during quoting, not at guest arrival.", "Tree shade is pretty and dark. Lighting paths get decided with tent width so steps and buffet lines stay visible.", ], setupsTitle: "Layouts we quote often · Farmington", setupsIntro: "Names describe intent; your tape still edits the final width.", setups: [
      {
        title: "Lawn reception with rounds, dance lane, and vendor spine", detail: "Frame tent, tables and chairs to headcount, optional floor, sidewalls if weather is a factor, aisle kept for carts.", bestFor: "Seated dinner, speeches, and dancing without crowding the house.", planningTip: "Mark where the cake table clears the dance edge before we lock width.", }, {
        title: "Patio tied garden cocktail shell", detail: "Smaller canopy, mixed high tops and seated tables, softer lighting for mingling-heavy nights.", bestFor: "Milestones that start with drinks near the stone path.", planningTip: "Tell us if heaters live under eaves; we keep setbacks honest.", }, {
        title: "June weekend open house buffer", detail: "Extra chairs for peak arrivals, food tables away from the foyer, tent line that keeps mud off the rug.", bestFor: "Graduation hours when everyone lands at once.", planningTip: "Split counts if part of the crowd stays in the kitchen zone.", }, {
        title: "Executive remarks on the back lawn", detail: "Compact footprint, presentable seating, lighting aimed at faces, strike that clears the yard.", bestFor: "Hosts who need Monday morning lawns back.", planningTip: "Forward any HOA or town quiet hours so teardown matches reality.", }, ], featuredTitle: "Explore resources · Farmington", featuredIntro: "Tent guide for vocabulary, wedding page for vendor lanes, inventory when SKUs need side-by-side compares.", featuredRentals: [
      {
        title: "Tent guide", description: "Families, sizes, and layout vocabulary before you lock a footprint.", href: "/tents", bestFor: "When you need framing language before you talk to anyone else.", planningTip: "Skim modular notes if your lawn is wider than it is deep.", eventTags: ["Tents", "Systems"], image: { src: "/images/farmington-tent-rental-lakeside-event-tent.png", alt: "Farmington tent on lawn near water" }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Open tent guide", }, {
        title: "Wedding tent rentals", description: "Outdoor reception planning with realistic service and dance lane notes.", href: "/wedding-tent-rentals", bestFor: "Private property receptions with vendors in the mix.", planningTip: "Add vendor parking notes early. They change aisle width.", eventTags: ["Wedding", "Layout"], image: { src: "/images/wedding-tent-hero.png", alt: "Outdoor wedding reception under a white frame tent in Connecticut" }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "See wedding options", }, {
        title: "Browse inventory", description: "Chairs, tables, tent structures, lighting, and heating.", href: "/rental-inventory", bestFor: "When you want side by side comparisons before you commit.", eventTags: ["Seating", "Tables"], image: { ...serviceAreaFeaturedImages.fiesta3030 }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Browse inventory", }, ], faqTitle: "FAQ · Farmington tent & party rentals", faqSubline: "Private lawns: slope, vendors, and lighting lead the thread.", faqs: [
      {
        id: "farm-deliver", question: "Do you deliver tent rentals throughout Farmington?", answer:
          "Yes. Include date, street, guest count, formality of seating, and any photos of grade or patio transitions. We talk anchoring and carry distance from that set.", }, {
        id: "farm-lawn", question: "Can you set up on a sloped or tree lined lawn?", answer:
          "Often within limits. Photos and approximate grade help. We pick tent style and footprint so legs, stakes, and guest ankles stay on safe, practical lines.", }, {
        id: "farm-wedding", question: "Do you help with wedding layouts on private property?", answer:
          "Yes. Guest count, ceremony versus reception needs, and vendor space you must protect drive tent width, tables, chairs, and lighting paths.", }, {
        id: "farm-quote", question: "What should I include in a quote request?", answer:
          "Date, Farmington address, guest count, seated versus standing mix, dancing intent, and buffet style. Event type plus headcount in the first sentence is enough to start.", }, {
        id: "farm-surface", question: "Can you mix staking near grass and ballast near a patio?", answer:
          "Yes when the site calls for it. Show where hardscape starts so anchoring is planned before trucks arrive, not improvised during setup.", }, ], finalCtaTitle: "Your Farmington date · lawn, grade & vendors", finalCtaBlurb: `Date, address, guest count, how formal seating is, and any vendor lane requirements get us to a footprint you can share with family or pros. Wishlist chairs or tables while RSVPs move.`, primaryCtaLabel: "Email photos + headcount", wishlistCtaLabel: "Wishlist pieces", relatedLinksIntro: "Vocabulary pass before you loop in vendors:", contentMatrix: {
      townName: "Farmington", heroAngle: "Private lawn presentation", quickAnswer: "Receptions and milestones on residential turf with vendor and grade realities.", faqFocus: "Slope, mixed surfaces, wedding layouts", ctaAngle: "Photos + vendor lanes", }, }, Bloomfield: {
    metaTitle: `Bloomfield CT party rentals | Tents, tables, chairs | ${business.name}`, metaDescription: `Bloomfield CT backyard and school lot rentals. Tents, tables, chairs, timed teardowns. Parking, sidewalks, delivery from ${business.name}.`, hero: {
      src: "/images/home-hero-panoramic-tent.jpg", alt: "Wide white event tent on grass with guest tables, illustrating backyard and community setups", caption: "Neighborhood-scale tent lines with room for food traffic and teardown windows", }, h1: "Bloomfield · yards, schools & community nights outdoors", heroLead: `Backyards, school lots, and parish fields share one need: layouts that respect driveways, turf, and the clock. We rent tents, tables, chairs, lighting, and sidewalls with carry plans that keep streets moving and teardown aligned to custodial or volunteer windows.`, quickAnswerTitle: "Bloomfield · at a glance", quickAnswer: `We spend a lot of time on backyard celebrations, graduation weekends, school or church programs, and community nights where parking, food lines, and teardown windows all talk to each other. Expect practical chair math and honest talk about ballast near sidewalks.`, heroMicroline: `Homes, schools, lots · teardown timed to your real deadline`, trustStripIntro: "Straight talk before we park a truck.", trustPoints: defaultTrustPoints.slice(0, 5), localIntro: `Headcount plus how food moves still beats a catchy party name. Tell us if guests park where chairs will sit, if kids sprint games near stakes, and when the lot has to be clear.`, localEventPatterns: {
      title: "Rental patterns in Bloomfield", intro: "Common mixes, not a promise about your specific venue rules.", items: [
        {
          label: "Backyard cookouts and birthdays", text: "Rain-aware tops, buffet lanes that keep guests off the siding, neighbor-friendly arrival timing.", }, {
          label: "School or church programs", text: "Rows, simple stages, registration tables, teardown that respects custodial schedules.", }, {
          label: "Community nights in lots", text: "Open-sided tents, extra seating bursts, lighting at exits when programs run past dusk.", }, ], }, emphasizedMidSection: "patterns", setupBulletsBeforeEvents: true, planningBlockTitle: "Planning your outdoor event · Bloomfield", planningBlockItems: [
      "If cars park where chairs sit, say it. We widen aisles or shift the frame line before dusk chaos.", "Forward the lot map facilities uses. Curbs and light pole bases change ballast faster than tent width.", "Tell us if the crowd is mostly kids at play. We buffer stakes and guy lines beyond what adult-only layouts need.", ], eventHelpTitle: "Celebrations & gatherings · Bloomfield", eventHelpIntro: "Family flow and printed run-of-show drive the gear list.", eventHelpItems: [
      {
        title: "Backyard celebrations", detail: "Tents sized to lawn space, neighbor-friendly timing, rain choices made before the week of the party.", }, {
        title: "School and church functions", detail: "Rows, stages, registration tables, and teardown aligned to custodial windows.", }, {
        title: "Community gatherings in parks or lots", detail: "Open layouts, extra seating, anchoring suited to turf or pavement.", }, {
        title: "Family milestones and reunions", detail: "Mixed seating, buffet lanes, optional dance space when the program calls for it.", }, ], setupTitle: "Site & logistics · Bloomfield", setupIntro: "These are the first emails we wish every school rep and backyard host sent.", setupItems: [
      "Residential streets need a deliberate truck staging point and a carry path that does not block through traffic.", "Sidewalk-adjacent school walks often need ballast. Curbs, light poles, and buried cable notes belong in message one.", "Community nights need exit lighting and food line light bundled with tent width, not clipped on after dark.", "Spring fronts move fast. Sidewalls and anchoring decisions belong on the checklist, not on the morning of.", ], setupsTitle: "Layouts we quote often · Bloomfield", setupsIntro: "Built for motion and clocks, not catalog glamour shots.", setups: [
      {
        title: "Cookout tent with sidewalk buffet spine", detail: "Rain-ready top, seating to headcount, lane that keeps grill smoke and guest lines separated.", bestFor: "Birthdays and anniversaries when everyone hugs the food table.", planningTip: "Say if the hose bib sits under the buffet line. We shift tables a few feet.", wishlistHint: "Wishlist extra chairs if cousins bring cousins.", }, {
        title: "Awards night on the school lot", detail: "Rows, stage or head table, spare chairs for families who stand through speeches.", bestFor: "Printed agendas with a hard lot-clear time.", planningTip: "Send the custodial cutoff verbatim; we match labor to it.", }, {
        title: "Community raffle and mingle canopy", detail: "Open sides for circulation, optional walls if wind spikes, tables sized for food or prize stations.", bestFor: "Events where people move more than they sit.", planningTip: "Note if power cords must cross a walk. We plan tape and routing.", }, ], featuredTitle: "Explore resources · Bloomfield", featuredIntro: "Community guide when a committee forwards rules, tent overview for vocabulary, inventory for SKU compares.", featuredRentals: [
      {
        title: "Community and school events", description: "Layouts and expectations for town and school programs with realistic load in language.", href: "/events/community-school-town", bestFor: "PTO, athletics, or town events with parking rules.", planningTip: "Attach facilities hours if they exist. Saves one round trip.", eventTags: ["School", "Community"], image: { ...serviceAreaFeaturedImages.panoramicTent }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: false, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Read community guide", }, {
        title: "Tent rentals overview", description: "Systems, add ons, and planning tabs when you need vocabulary before you decide width.", href: "/tent-rentals", bestFor: "When tent family matters as much as square footage.", eventTags: ["Tents"], image: { ...serviceAreaFeaturedImages.navitracField }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Open tent overview", }, {
        title: "Browse inventory", description: "Chairs, tables, tents, lighting, and heating in one catalog.", href: "/rental-inventory", bestFor: "When you want to compare chairs or tables before you commit.", eventTags: ["Catalog"], image: { ...serviceAreaFeaturedImages.navitracField }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "See inventory", }, ], faqTitle: "FAQ · Bloomfield tent & party rentals", faqSubline: "School lots and busy backyards. Timing and access first.", faqs: [
      {
        id: "bl-deliver", question: "Do you deliver rentals to Bloomfield addresses?", answer:
          "Yes. We install and pick up for homes, schools, and community venues. Lead with date, address, guest count, and whether guests mostly sit, stand, or swirl around food.", }, {
        id: "bl-school", question: "Can you work with school parking lots and timed events?", answer:
          "Yes. Paste facilities rules and on-site hours. We match crew size and equipment so setup and teardown stay inside the window you were given.", }, {
        id: "bl-backyard", question: "Can you set up in a Bloomfield backyard with a narrow gate?", answer:
          "Often yes with a measured carry plan. Gate width and path photos let us pick panel sizes that clear fences and beds without scrapes.", }, {
        id: "bl-rain", question: "How do you handle rain plans for outdoor parties?", answer:
          "We choose sidewalls and anchoring with your layout in mind at least a week out when we can. Last-minute pivots burn calm faster than they save money.", }, {
        id: "bl-events", question: "What events do you equip most often in Bloomfield?", answer:
          "Backyard celebrations, graduation weekends, school and church programs, and community nights in lots or fields. Describe food flow and parking overlap and we map tables, chairs, and tent size to that reality.", }, ], finalCtaTitle: "Your Bloomfield date · lot rules & timing", finalCtaBlurb: `Home or venue address, date, guest count, and when the space must be clear are enough to open a useful thread. We reply with options you can forward to a facilities contact or family. Wishlist chairs while RSVPs wobble.`, primaryCtaLabel: "Email schedule + headcount", wishlistCtaLabel: "Wishlist chairs", relatedLinksIntro: "Committee prep reading:", contentMatrix: {
      townName: "Bloomfield", heroAngle: "School, church, and backyard practicality", quickAnswer: "Family celebrations plus institutional lots with hard teardowns.", faqFocus: "Parking overlap, custodial windows, narrow gates", ctaAngle: "Teardown time + facilities rules", }, }, Wethersfield: {
    metaTitle: `Wethersfield CT party rentals | Graduations, tents, tables | ${business.name}`, metaDescription: `Wethersfield CT graduation and backyard party rentals. Tents, tables, chairs. Gates, driveways, open house flow. Setup by ${business.name}.`, hero: {
      src: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png", alt: "Outdoor tent reception on a Connecticut residential lawn with lantern lighting", caption: "Lantern lit lawn reception example. Your gate, grade, and food path still set the quote", }, h1: "Wethersfield · neighborhood parties & graduation weekends", heroLead: `Open houses and backyard parties succeed when driveway parking, buffet lines, and tent stakes are not competing for the same strip of grass. We map tents, tables, chairs, lighting, and sidewalls so guests can move from kitchen to chairs without improvising a route.`, quickAnswerTitle: "Wethersfield · at a glance", quickAnswer: `Graduation weekends, neighborhood parties, and small lawn receptions are the steady ask. We care most about peak headcount for a short window, how food leaves the kitchen, and whether part of the crowd stays inside. Those answers size tents faster than adjectives.`, heroMicroline: `Neighborhood installs · open houses are a frequent brief`, trustStripIntro: "Older lots mean we measure before we promise widths.", trustPoints: defaultTrustPoints.slice(0, 5), localIntro: `Send gate width if gear goes down the side, note soft lawn spots, and say if the garage is part of the food line. Photos beat prose for tree roots and step edges.`, localPatternsAfterIntro: true, emphasizedMidSection: "planning", localEventPatterns: {
      title: "Neighborhood patterns we plan around", intro: "Behavior shapes layout more than town name does.", items: [
        {
          label: "Open house spikes", text: "Two hours of peak chairs, food hugging the back steps, optional tent just for drizzle relief.", }, {
          label: "Classic backyard parties", text: "Games, grill smoke, and seating zones spaced so stakes stay away from running lanes.", }, {
          label: "Split indoor and outdoor crowds", text: "Coordinated chair counts when dining rooms and garages absorb part of the rush.", }, ], }, planningBlockTitle: "Planning your outdoor event · Wethersfield", planningBlockItems: [
      "Draw cars versus chairs. If those zones kiss, we widen aisles before you print invitations.", "Measure the narrow gate if panels go through the side yard. A tape photo beats guessing leg widths.", "Soft lawns or small turf often pair with driveway ballast. Say it early so anchors match the truck load.", ], eventHelpTitle: "Celebrations & gatherings · Wethersfield", eventHelpIntro: "Simple diagrams beat poetic copy. Here is what we are usually matching.", eventHelpItems: [
      {
        title: "Neighborhood backyard parties", detail: "Footprints that leave room for games, buffets, and quieter seating away from the grill.", }, {
        title: "Graduation weekends", detail: "Peak chair counts, flexible table layouts, optional tent coverage when weather looks wet.", }, {
        title: "Family receptions on residential lawns", detail: "Dance floor spacing, head table placement, lighting paths guests can follow after dark.", }, {
        title: "Add on tables and chairs for indoor spaces", detail: "When part of the party stays inside, we balance counts so both zones feel even.", }, ], setupTitle: "Site & logistics · Wethersfield", setupIntro: "Tight side yards reward photos before we lock a tent family.", setupItems: [
      "Gate width and the path past air conditioners or meters decide panel sizes before square footage does.", "Canopy and roots nudge leg placement. We hunt usable flat rings before recommending width.", "Driveway ballast is normal when turf is tight. Surface notes in the first email keep anchors honest.", "Evening parties need step lighting and buffet lighting planned with the tent so cords are not an afterthought.", ], setupsTitle: "Layouts we quote often · Wethersfield", setupsIntro: "Different names than other towns on purpose, same crew discipline underneath.", setups: [
      {
        title: "Kitchen adjacent buffet tent", detail: "Weather-ready top, chairs to headcount, tables sized so the line does not choke the back steps.", bestFor: "Parties where the house stays part of the service path.", planningTip: "Tell us if coolers sit outside the tent; we leave landing space.", }, {
        title: "Arrival surge graduation footprint", detail: "Open sides for flow, optional walls, extra chairs for the crush, gift table away from mud tracks.", bestFor: "Open houses when everyone lands between lunch and dinner.", planningTip: "Split counts if the dining room holds overflow seating.", wishlistHint: "Wishlist folding chairs if the garage stores spares between weekends.", }, {
        title: "Compact reception with dance wedge", detail: "Tent sized for seated guests plus a modest dance area and DJ corner without eating the whole lawn.", bestFor: "Milestones where dancing matters but space does not sprawl.", planningTip: "DJ footprint on paper saves a last-minute squeeze.", }, {
        title: "Garage and dining overflow pack", detail: "Coordinated tables and chairs when part of the party stays inside during peak arrivals.", bestFor: "Graduation weekends when indoors and outdoors share one headcount story.", planningTip: "Label which zone gets cake versus mains so counts stay honest.", }, ], featuredTitle: "Explore resources · Wethersfield", featuredIntro: "Graduation page for spikes, planning hub for sizing talk, tent overview when weather backup matters.", featuredRentals: [
      {
        title: "Graduation parties", description: "Headcount spikes, food lines, and weather notes for open houses.", href: "/events/graduation-parties", bestFor: "May and June when arrivals stack for a few hours.", planningTip: "Mention garage seating. We split chair math early.", eventTags: ["Graduation", "Open house"], image: { src: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png", alt: "Tent reception on a Connecticut residential lawn" }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Read graduation guide", }, {
        title: "Planning hub", description: "Sizing context and backyard notes that pair with a quote request.", href: "/planning", bestFor: "When you want vocabulary before you email measurements.", planningTip: "Grab the quick planner if dates are firm but layout is fuzzy.", eventTags: ["Planning", "Sizing"], image: { ...serviceAreaFeaturedImages.fiesta2040 }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: false, waitlistEnabled: false, featuredForTown: true, ctaLabel: "Open planning hub", }, {
        title: "Tent rentals overview", description: "Systems, sidewalls, and add ons when weather backup matters as much as width.", href: "/tent-rentals", bestFor: "Hosts deciding tent family before they lock guest count.", eventTags: ["Tents", "Weather"], image: { ...serviceAreaFeaturedImages.highPeakBallast }, goodshuffleItemId: "", goodshuffleImageId: "", goodshuffleProductSlug: "", wishlistEnabled: true, waitlistEnabled: false, featuredForTown: true, ctaLabel: "See tent options", }, ], faqTitle: "FAQ · Wethersfield tent & party rentals", faqSubline: "Open houses and tight yards. Answers stay concrete.", faqs: [
      {
        id: "wet-deliver", question: "Do you deliver rentals throughout Wethersfield?", answer:
          "Yes. Lead with date, street, guest count, and whether the day behaves like an open house or a seated dinner. We confirm access and anchoring assumptions from that.", }, {
        id: "wet-grad", question: "Can you help with graduation party tent sizing?", answer:
          "Yes. Peak headcount, buffet versus stations, and any dance intent drive tent family and width. Aisles need to feel walkable when everyone arrives at once.", }, {
        id: "wet-narrow", question: "Our yard is narrow. Can a tent still work?", answer:
          "Often yes. A smaller frame or adjusted layout usually works. Photos and dimensions let us keep exits obvious and stakes out of beds you want untouched.", }, {
        id: "wet-quote", question: "How fast can we get a quote?", answer:
          "Send date, address, guest count, and event type. We respond with options and only the follow ups that change price or footprint.", }, {
        id: "wet-surface", question: "Can you set up tents in backyards or on driveways in Wethersfield?", answer:
          "Yes on many lots. Lawns may take stakes while driveways often need ballast. Mention both in the first note so anchoring matches what we load.", }, ], finalCtaTitle: "Your Wethersfield date · peak hour & flow", finalCtaBlurb: `Date, address, peak headcount, and how food moves from the kitchen are enough to open a useful thread. Mention indoor overflow if the dining room shares the party. Wishlist chairs while cousins confirm.`, primaryCtaLabel: "Send open-house details", wishlistCtaLabel: "Wishlist chairs", relatedLinksIntro: "Sizing vocabulary before you text photos:", contentMatrix: {
      townName: "Wethersfield", heroAngle: "Neighborhood flow and graduation spikes", quickAnswer: "Open houses and split indoor-outdoor crowds.", faqFocus: "Narrow yards, driveway ballast, peak-hour chairs", ctaAngle: "Peak hour + kitchen flow + gate width", }, },
};

function variantIndex(town: string): number {
  let sum = 0;
  for (let i = 0; i < town.length; i++) sum += town.charCodeAt(i);
  return sum % 3;
}

function buildArchetypeTown(townName: string): ServiceAreaTownPayload {
  const arch = ARCHETYPE_BY_TOWN[townName] ?? "town_corridor";
  const v = variantIndex(townName);

  const leads: Record<Archetype, [string, string, string]> = {
    capital: [
      `We rent tents, tables, chairs, lighting, and sidewalls in ${townName} for hosts who need dependable timing and clear layouts. Delivery and professional setup are part of how we work, and quotes stay readable so you know what labor and equipment cover.`, `${townName} events often mix corporate timelines, school programs, and private celebrations. We help you pick tent size, seating, and add ons that match guest flow, then schedule crews around access and parking realities.`, `From paved lots to neighborhood yards, ${townName} asks for practical rental plans. We focus on anchoring, guest movement, and weather backup so your outdoor space feels intentional on event day.`, ], near_capital: [
      `${townName} gatherings often lean on polished backyards, school venues, and family milestones. We supply tents, tables, chairs, and lighting with layouts that respect patios, driveways, and tree lines.`, `Hosts in ${townName} usually want clean presentation without overbuying inventory. Tell us headcount and how guests eat and mingle. We return with tent and seating options that fit the footprint you have.`, `We help ${townName} customers plan outdoor receptions, graduations, and community nights with equipment that matches how people actually move through food lines and seating.`, ], family_suburb: [
      `${townName} is a lot of residential lawns, school nights, and family celebrations. We rent tents, tables, and chairs with neighbor friendly timing and weather plans that are easy to explain to guests.`, `In ${townName} we often size tents around tree shade, driveways, and modest yards. Photos and guest counts help us recommend a footprint that still leaves room for buffets or a dance area if you need one.`, `We support ${townName} hosts who want straightforward answers on tent style, chair counts, and lighting as the sun sets. Quotes spell out what you are getting before install day.`, ], town_corridor: [
      `${townName} hosts book tents and tables for graduations, company picnics, fundraisers, and backyard parties. We align delivery and pickup with your schedule and surface type so setup is predictable.`, `Across ${townName} we see a mix of school lots, company yards, and private events. Share guest count and flow and we recommend equipment that fits without crowding exits or food lines.`, `We rent to ${townName} with the same crew standards as the rest of our Connecticut service area. Anchoring, access, and weather backup are planned during quoting, not guessed on site.`, ], };

  const intros: Record<Archetype, [string, string, string]> = {
    capital: [
      `What does ${business.name} help with in ${townName}? Corporate and nonprofit programs, school and community gatherings, neighborhood celebrations, and private receptions where access and timing matter as much as tent size.`, `In ${townName} we are usually answering questions about pavement installs, parking lot layouts, and how to keep guests comfortable when wind shifts. Bring your date, address, and headcount and we map rentals to the plan.`, `${townName} planners often need equipment that looks sharp under time pressure. We focus on realistic footprints, chair counts, and lighting paths so guests move safely after dark.`, ], near_capital: [
      `What do we help with in ${townName}? Backyard parties, graduations, school functions, and receptions where presentation matters. You describe seating and food flow and we align tents, tables, and chairs.`, `${townName} customers often ask for help balancing tent size with patios and gardens. Send photos when you can. We recommend layouts that keep aisles wide and exits obvious.`, `We help ${townName} hosts who want clear pricing on tents, tables, chairs, and lighting. Quotes stay itemized so families and committees can compare options.`, ], family_suburb: [
      `What does ${business.name} do in ${townName}? We help with graduation weekends, birthdays, anniversaries, and receptions on residential lawns, plus tables and chairs when part of the party stays inside.`, `In ${townName} we talk a lot about tree lines, gentle slope, and neighbor friendly setup windows. Those details change tent placement more than people expect.`, `${townName} events benefit when rain plans are chosen early. We walk through sidewalls and anchoring with your layout so you are not deciding the morning of the party.`, ], town_corridor: [
      `In ${townName} we help schools, companies, and families with tents, tables, chairs, and lighting for outdoor programs and parties. Tell us your surface type and guest plan for a practical quote.`, `What do ${townName} hosts ask for most? Graduation setups, company picnics, fundraisers, and backyard tents sized to real headcounts. We keep recommendations grounded in how guests move.`, `We support ${townName} with the same delivery and install standards as nearby towns. Access photos and guest counts help us lock tent size faster.`, ], };

  const eventPools: Record<Archetype, { title: string; detail: string }[][]> = {
    capital: [
      [
        { title: "Corporate and nonprofit programs", detail: "Timed installs, clean inventory, and teardown that respects building access." }, { title: "School and community gatherings", detail: "Rows, stages, and tables sized to your run of show." }, { title: "Neighborhood celebrations", detail: "Driveways and side lots with staking or ballast decided up front." }, { title: "Private receptions", detail: "Tent sizing with dinner, dancing, and service lanes in mind." }, ], [
        { title: "Community festivals and fairs", detail: "Open layouts, extra seating, and anchoring suited to turf or pavement." }, { title: "Office adjacent events", detail: "Compact tents or canopies with professional presentation." }, { title: "Family milestones outdoors", detail: "Weather aware tent plans with lighting for evening." }, { title: "Fundraisers with seated programs", detail: "Tables and chairs aligned to headcount and aisle needs." }, ], ], near_capital: [
      [
        { title: "Backyard receptions", detail: "Footprints that respect decks, gardens, and tree lines." }, { title: "Graduation open houses", detail: "Peak chairs, buffet flow, and optional tent coverage." }, { title: "School and PTA events", detail: "Simple layouts with teardown aligned to custodial windows." }, { title: "Corporate family days", detail: "Tents, tables, and games friendly layouts for mixed ages." }, ], [
        { title: "Private lawn dinners", detail: "Lighting and walls planned with sunset timing." }, { title: "Neighborhood block gatherings", detail: "High flow layouts with food stations called out." }, { title: "Milestone birthdays", detail: "Tent or canopy sized to guest list and DJ corner if needed." }, { title: "Community concerts or movie nights", detail: "Open sided tents and controlled seating zones." }, ], ], family_suburb: [
      [
        { title: "Residential backyard parties", detail: "Neighbor friendly timing and rain options that feel planned." }, { title: "Graduation weekends", detail: "Extra chairs for arrivals and tables for food or gifts." }, { title: "School fields and church lots", detail: "Anchoring and guest flow matched to your permit window." }, { title: "Family reunions", detail: "Mixed seating with buffet lanes and optional dance space." }, ], [
        { title: "Anniversary and birthday tents", detail: "Compact footprints with room for a bar or dessert table." }, { title: "Open house layouts", detail: "Flexible seating with weather backup at the door." }, { title: "Tables and chairs indoors", detail: "Overflow counts coordinated with outdoor tent plans." }, { title: "Corporate picnics at parks", detail: "Ballast plans and lighting for evening wrap up." }, ], ], town_corridor: [
      [
        { title: "Company picnics", detail: "Tents, tables, and grills friendly spacing with service aisles." }, { title: "School award nights", detail: "Rows, head tables, and teardown on schedule." }, { title: "Fundraisers", detail: "Silent auction tables plus seated dinner zones when needed." }, { title: "Backyard parties", detail: "Tents sized to lawn space with lighting at exits." }, ], [
        { title: "Graduation parties", detail: "Peak headcount planning with optional tent walls." }, { title: "Community fairs", detail: "Open layouts with extra chairs near food." }, { title: "Sports banquets outdoors", detail: "Head tables and team seating with photo lanes." }, { title: "Seasonal festivals", detail: "Weather ready anchoring and sidewall options." }, ], ], };

  const poolPick = eventPools[arch][variantIndex(townName + "x") % eventPools[arch].length];

  const setupPools: Record<Archetype, string[][]> = {
    capital: [
      [
        "Confirm where trucks can stage and how far we carry to the setup area.", "Pavement and courtyard installs may need ballast instead of stakes.", "Wind exposure changes with buildings nearby. We plan walls with that in mind.", "Share any permit or venue rules early so timing matches your contract.", ], [
        "Parking lot setups need clear paths for guests and for our crew during install.", "Evening programs usually need lighting at transitions and near food.", "If power is limited, tell us so lighting plans stay realistic.", "Photos of the surface help us pick anchoring before we arrive.", ], ], near_capital: [
      [
        "Tree lines and patios change usable flat space. Photos speed accurate tent sizing.", "Driveways may need ballast while lawns use stakes. Mixed sites get a mixed plan.", "School venues often have fixed arrival windows. We align crew size to that window.", "Evening events need exit lighting and food line lighting planned together.", ], [
        "Neighbor access matters on tight streets. We confirm where to stage politely.", "Buffet lines eat space fast. Call out service style when you request a quote.", "Rain plans are calmer when sidewalls are chosen before event week.", "Dance floors need flat ground. We flag slope issues early.", ], ], family_suburb: [
      [
        "Gate width and path photos help us choose panel sizes and carry plans.", "Gentle slope can shift leg placement. We look for safe stake lines.", "Graduation weekends mean peak chair counts. Plan for arrivals, not averages only.", "Evening yard events need lighting along steps and near restrooms.", ], [
        "Soft lawns after rain may need ballast or alternate stake lines.", "Keep a clear path from kitchen to tent to protect grass and guests.", "If part of the party stays inside, split chair counts intentionally.", "Tell us about irrigation lines before stake day.", ], ], town_corridor: [
      [
        "School lots may mix pavement and turf. Surface notes keep anchoring correct.", "Company yards may share space with parking. We mark conflicts early.", "Fundraisers often combine auction tables and dinner rounds. Flow drives the plan.", "Weather backup is easier when walls are reserved, not improvised.", ], [
        "Park setups may need longer carries from the truck. We plan crew size accordingly.", "Evening events need guest safe lighting at lot exits.", "Headcounts that swing wide need chair buffers and flexible table clusters.", "Photos of the lot help us recommend tent family quickly.", ], ], };

  const setupsPools: Record<Archetype, { title: string; detail: string }[][]> = {
    capital: [
      [
        { title: "Corporate lunch on pavement", detail: "Canopy or tent, tables and chairs, and ballast plan spelled out in the quote." }, { title: "Community tent with rows", detail: "Seating and aisles matched to program length and headcount." }, { title: "Backyard reception with rain backup", detail: "Frame tent, optional walls, lighting for evening." }, ], [
        { title: "School awards on the lot", detail: "Stage, rows, and teardown aligned to custodial timing." }, { title: "Neighborhood party tent", detail: "Open sides, food tables, and chairs sized to RSVP plus buffer." }, { title: "Fundraiser dinner under tent", detail: "Rounds with service lanes and head table placement." }, ], ], near_capital: [
      [
        { title: "Backyard tent with rounds", detail: "Buffet lane, optional dance slice, lighting at dusk." }, { title: "Graduation open house", detail: "Peak chairs, flexible tables, optional walls." }, { title: "PTA evening on the lot", detail: "Simple rows, registration table, quick teardown." }, ], [
        { title: "Lawn reception with string lighting", detail: "Tent sized to seated guests plus service paths." }, { title: "Cocktail mingling then seated dinner", detail: "Layout shift planned with extra high tops early." }, { title: "Family reunion buffet", detail: "Mixed tables with covered rain lane near house." }, ], ], family_suburb: [
      [
        { title: "Backyard tent and grill zone", detail: "Food line separated from dance or games." }, { title: "Graduation tent with gift table", detail: "Open sides, extra chairs, optional walls." }, { title: "Anniversary dinner tent", detail: "Smaller footprint, soft lighting, seated rounds." }, ], [
        { title: "Open house with indoor overflow", detail: "Outdoor tent plus indoor table and chair add ons." }, { title: "Kids party canopy", detail: "Compact shade, tables for pizza, easy pickup timing." }, { title: "Neighborhood movie night", detail: "Open tent, controlled seating, cords managed safely." }, ], ], town_corridor: [
      [
        { title: "Company picnic tent", detail: "Lunch rounds, beverage tables, and shade near activities." }, { title: "School field ceremony", detail: "Rows, aisle, and quick reset if reused for reception." }, { title: "Backyard birthday tent", detail: "Compact top, chairs to headcount, lighting at cake time." }, ], [
        { title: "Fundraiser silent auction plus tent", detail: "Tables for bidding then seated program." }, { title: "Sports banquet outdoors", detail: "Team tables, head table, photo lane kept clear." }, { title: "Community movie or concert", detail: "Open sided tent, seating clusters, exit lighting." }, ], ], };

  const setupPick = setupPools[arch][variantIndex(townName + "s") % setupPools[arch].length];
  const setupsPickRaw = setupsPools[arch][variantIndex(townName + "t") % setupsPools[arch].length];
  const setupsPick: ServiceAreaTownSetup[] = setupsPickRaw.map((s, idx) => ({
    ...s, bestFor:
      idx === 0
        ? "You already know meal style and rough headcount."
        : idx === 1
          ? "Arrivals spike, then guests spread out."
          : "Space is the main constraint, not brand of chair.", }));

  const planningBullets: string[] = [
    `Name the tightest spot first: where trucks can stage, then the path to the tent footprint. That order saves rework in ${townName}.`, "Note any pavement, patio, or court sections now. Anchoring decisions are calmer on paper than on install morning.", "If a vendor needs a hard finish time, put it in the first message. We schedule crew finish against your run of show.", ];
  const planningAlt: string[] = [
    `Sketch food line direction before you lock tent width. One way flow changes aisle math in ${townName} yards and lots.`, "If part of the party stays inside, split chair counts between zones so we do not overfill the tent.", "Spring and fall swings mean lighting and wall decisions deserve a spot on the checklist, not a last minute guess.", ];

  const hi = variantIndex(townName + "h");
  const heroPick: ServiceAreaTownPayload["hero"] =
    hi % 3 === 0
      ? null
      : hi % 3 === 1
        ? {
            src: "/images/wedding-tent-hero.png", alt: "White frame tent at an outdoor Connecticut reception with guest tables", caption: "Outdoor tent and table layouts we install statewide", }
        : {
            src: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png", alt: "Lantern lit tent reception on a Connecticut residential lawn", caption: "Example lawn tent styling for private Connecticut events", };

  const faqLead = variantIndex(townName + "f");
  const faqBooking =
    faqLead % 2 === 0
      ? {
          id: "book-ahead", question: `How far ahead should I reach out for a busy ${townName} weekend?`, answer: `Earlier is safer for peak May through September Saturdays. Once your date is firm, send a quote request. We tell you straight if inventory is tight and what still fits your footprint.`, }
      : {
          id: "book-ahead", question: `Is last minute rental possible around ${townName}?`, answer: `Sometimes, depending on crew and equipment. Tell us the date and footprint. We answer honestly if we can execute cleanly or if we should suggest a smaller scope.`, };

  const faqPlanning = {
    id: "plan-outdoor", question: `What should I know before planning an outdoor event in ${townName}?`, answer: `Start with guest flow, surface type, and whether you need seated dinner, dancing, or open house mingling. Those three answers drive tent width and chair counts more than a headcount alone.`, };

  const featuredRotations: ServiceAreaFeaturedRental[][] = [
    [
      {
        title: "Tent rentals",
        description: "Systems, sidewalls, and layout tabs when you need depth beyond a single size guess.",
        href: "/tent-rentals",
        bestFor: "Hosts comparing frame options and add ons.",
        eventTags: ["Tents", "Layout"],
        image: { ...serviceAreaFeaturedImages.navitracField },
        goodshuffleItemId: "",
        goodshuffleImageId: "",
        goodshuffleProductSlug: "",
        wishlistEnabled: true,
        waitlistEnabled: false,
        featuredForTown: true,
        ctaLabel: "Explore tents",
      },
      {
        title: "Browse inventory",
        description: "Chairs, tables, structures, lighting, and heating in one scrollable catalog.",
        href: "/rental-inventory",
        bestFor: "When you want to compare SKUs before you email.",
        eventTags: ["Catalog"],
        image: { ...serviceAreaFeaturedImages.fiesta2040 },
        goodshuffleItemId: "",
        goodshuffleImageId: "",
        goodshuffleProductSlug: "",
        wishlistEnabled: true,
        waitlistEnabled: false,
        featuredForTown: true,
        ctaLabel: "Browse stock",
      },
      {
        title: "Table and chair rentals",
        description: "Rounds, banquets, and ceremony language without fluff.",
        href: "/table-chair-rentals",
        bestFor: "Tent optional or indoor overflow heavy events.",
        eventTags: ["Seating"],
        image: { ...serviceAreaFeaturedImages.tentWithGuestTables },
        goodshuffleItemId: "",
        goodshuffleImageId: "",
        goodshuffleProductSlug: "",
        wishlistEnabled: true,
        waitlistEnabled: false,
        featuredForTown: true,
        ctaLabel: "See seating",
      },
    ],
    [
      {
        title: "Browse inventory",
        description: "Start with chairs or tables, then add tent sections if you need coverage.",
        href: "/rental-inventory",
        bestFor: "Open house or graduation style headcount swings.",
        eventTags: ["Inventory"],
        image: { ...serviceAreaFeaturedImages.fiesta3030 },
        goodshuffleItemId: "",
        goodshuffleImageId: "",
        goodshuffleProductSlug: "",
        wishlistEnabled: true,
        waitlistEnabled: false,
        featuredForTown: true,
        ctaLabel: "Open catalog",
      },
      {
        title: "Tent rentals",
        description: "Commercial tent page with jobsite and modular context when you need it.",
        href: "/tent-rentals",
        bestFor: "When coverage area is the main unknown.",
        eventTags: ["Tents"],
        image: { ...serviceAreaFeaturedImages.highPeakBallast },
        goodshuffleItemId: "",
        goodshuffleImageId: "",
        goodshuffleProductSlug: "",
        wishlistEnabled: true,
        waitlistEnabled: false,
        featuredForTown: true,
        ctaLabel: "Read tent page",
      },
      {
        title: "Planning hub",
        description: "Sizing and backyard notes that pair with a real quote conversation.",
        href: "/planning",
        bestFor: "First time tent hosts who want sequence, not jargon.",
        eventTags: ["Planning"],
        image: { ...serviceAreaFeaturedImages.panoramicTent },
        goodshuffleItemId: "",
        goodshuffleImageId: "",
        goodshuffleProductSlug: "",
        wishlistEnabled: false,
        waitlistEnabled: false,
        featuredForTown: true,
        ctaLabel: "Open planning",
      },
    ],
  ];

  const quickAnswers: Record<Archetype, [string, string, string]> = {
    capital: [
      `We help ${townName} hosts with tents, tables, and chairs when access, pavement, and timing stack together. Expect questions about truck staging and anchoring before we lock widths.`, `${townName} programs mix corporate, school, and private outdoor needs. Expect us to ask how guests move from arrival through food before we pick chair counts.`, `Outdoor events in ${townName} lean on clear anchoring and guest flow. Expect direct questions about surfaces and run-of-show windows in the first reply.`, ], near_capital: [
      `We mostly support ${townName} yards, graduations, and school nights with tidy layouts. Expect questions about patio edges, tree lines, and peak arrival hours.`, `${townName} hosts usually need presentation-friendly footprints without overbuying. Expect us to ask seated versus standing mix early.`, `Backyard and school setups in ${townName} reward honest photos. Expect a few sizing follow ups instead of generic charts.`, ], family_suburb: [
      `We equip ${townName} graduation weekends, birthdays, and lawn receptions where neighbor timing matters. Expect questions about gates, grade, and food paths.`, `${townName} parties often split between house and yard. Expect us to ask how headcount peaks and where food lands.`, `Residential lawns in ${townName} need early rain and lighting decisions. Expect those topics in the first thread, not the night before.`, ], town_corridor: [
      `We rent to ${townName} for school, company, and backyard events with practical layouts. Expect questions about lot surfaces and teardown windows.`, `${townName} hosts usually mix seated programs with open mingling. Expect us to clarify flow before tent width.`, `Service-area installs near ${townName} follow the same crew standards as the rest of Connecticut. Expect anchoring notes up front.`, ], };

  const cluster = getTownServiceAreaCluster(townName);
  const clusterPatterns = cluster ? buildClusterLocalEventPatterns(townName, cluster) : null;

  const metaTitlePool = [
    `Event tent rental in ${townName}, CT | Party tent rentals & tables | ${business.name}`,
    `${townName} event tent rentals & party tent rentals | Tables, chairs | ${business.name}`,
    `Party tent rentals in ${townName}, CT | Event tent rental & setup | ${business.name}`,
    `${townName}, CT party tent rentals & event tent rental | Tents, tables & chairs | ${business.name}`,
    `Event tent rentals ${townName}, CT | Party rentals & frame tents | ${business.name}`,
    `${townName}, CT tent rental for events | Party tent rentals | ${business.name}`,
    `Party tent rentals & event tent rental · ${townName}, CT | ${business.name}`,
    `${townName} CT event tent rental | Party tent rentals, tables & chairs | ${business.name}`,
  ];
  const metaDescPool = [
    `Party tent rentals and party rentals in ${townName}, CT: commercial-grade tents, tables, chairs, lighting, delivery & professional setup by ${business.name}. Outdoor weddings, graduations, school events, corporate picnics, and backyard celebrations.`,
    `${townName}, CT party tent rentals from ${business.name}. Tent footprint and anchoring first; tables and chairs sized to guest flow. Delivery, setup & pickup with the same crew standards you expect statewide.`,
    `Planning party tent rentals in ${townName}? We quote tents—frame lines, sidewalls, anchoring—then tables and chairs for seated dinners, open houses, or picnics. Itemized quotes with access notes up front.`,
    `${business.name} serves ${townName}, Connecticut: tent rentals and party rentals including tables, chairs, and lighting, with delivery and professional setup. Mention grass vs. pavement in your first message for accurate anchoring.`,
    `Outdoor events in ${townName}, CT: tent-first rentals plus tables, chairs, and add-ons. Weddings, graduations, fundraisers, and backyard parties with realistic timing and turf-safe anchoring when your lot requires it.`,
  ];

  const emKeys: EmphasisKey[] = ["patterns", "planning", "events", "setupBullets", "setups"];
  const emphasizedMidSection: EmphasisKey | undefined = clusterPatterns
    ? emKeys[seedMod(townName, "emph", emKeys.length)]
    : undefined;
  const localPatternsAfterIntro = clusterPatterns ? seedMod(townName, "lpai", 2) === 1 : false;
  const setupBulletsBeforeEvents = clusterPatterns ? seedMod(townName, "sbbe", 2) === 1 : false;

  const featuredIntroCluster = [
    "Tent systems and sidewalls first in the links below—then inventory for tables and chairs once coverage is clear.",
    "Use the tent hub for vocabulary, inventory to compare chair and table SKUs, planning when sizing is still fuzzy.",
    "Hosts in this area usually open the tent page, stage a wishlist with chairs, then email photos for anchoring notes.",
  ];

  const metaTitleDefaultPool = [
    `Tent & party rentals in ${townName}, CT | Event tent rental | ${business.name}`,
    `Event tent rental ${townName}, CT | Party tent rentals & tables | ${business.name}`,
    `Party tent rentals in ${townName}, CT | Tent rental & chairs | ${business.name}`,
  ];

  const h1ClusterPool = [
    `Event tent rental in ${townName}, CT · party tent rentals, tables, chairs & setup`,
    `Party tent rentals in ${townName}, CT · event tents for outdoor weddings & gatherings`,
    `${townName}, CT event tent rentals & party rentals · tables, chairs & lighting`,
    `Tent rental & party tent rentals · ${townName}, CT · delivery and professional install`,
    `Event tent rentals ${townName}, Connecticut · frame tents and party tent options`,
  ];

  const h1DefaultPool = [
    `Tent rental & party rentals in ${townName}, CT · tables, chairs & outdoor events`,
    `Event tent rental ${townName}, CT · party tent rentals with delivery & setup`,
    `Party tent rentals in ${townName}, CT · tent inventory for backyards, schools & venues`,
    `${townName}, CT · tent rentals and party rentals · ${business.name}`,
  ];

  const metaTitle = clusterPatterns
    ? metaTitlePool[seedMod(townName, "mt", metaTitlePool.length)]!
    : metaTitleDefaultPool[seedMod(townName, "mtd", metaTitleDefaultPool.length)]!;
  const metaDescription = clusterPatterns
    ? metaDescPool[seedMod(townName, "md", metaDescPool.length)]!
    : `${townName}, CT event tent rental and party tent rentals: tents, tables, chairs, lighting, delivery & professional setup from ${business.name}. Weddings, graduations, corporate and backyard events.`;

  const statewideHeroPool: NonNullable<ServiceAreaTownPayload["hero"]>[] = [
    {
      src: serviceAreaFeaturedImages.fiesta3030.src,
      alt: serviceAreaFeaturedImages.fiesta3030.alt,
      caption: `Clear frame-tent example—your ${townName} quote still follows your photos, access, and headcount.`,
    },
    {
      src: serviceAreaFeaturedImages.navitracField.src,
      alt: serviceAreaFeaturedImages.navitracField.alt,
      caption: `Large lawn footprint—anchoring and width stay specific to ${townName} addresses.`,
    },
    {
      src: serviceAreaFeaturedImages.panoramicTent.src,
      alt: serviceAreaFeaturedImages.panoramicTent.alt,
      caption: `Wide reception layout example—we match ${townName} installs to access, grade, and guest flow.`,
    },
  ];
  const statewideHeroFallback = statewideHeroPool[seedMod(townName, "herof", statewideHeroPool.length)]!;

  return {
    metaTitle,
    metaDescription,
    hero: heroPick ?? townHeroFillWhenEmpty[townName] ?? statewideHeroFallback,
    quickAnswerTitle: `${townName} · at a glance`,
    quickAnswer: quickAnswers[arch][v],
    h1: clusterPatterns
      ? h1ClusterPool[seedMod(townName, "h1c", h1ClusterPool.length)]!
      : h1DefaultPool[seedMod(townName, "h1d", h1DefaultPool.length)]!,
    heroLead: leads[arch][v],
    trustStripIntro: "Straight expectations before we book crew.",
    trustPoints: defaultTrustPoints.slice(0, 5),
    localIntro: intros[arch][v],
    ...(clusterPatterns ? { localEventPatterns: clusterPatterns } : {}),
    ...(clusterPatterns ? { emphasizedMidSection, localPatternsAfterIntro, setupBulletsBeforeEvents } : {}),
    planningBlockTitle: `Planning your outdoor event · ${townName}`,
    planningBlockItems: variantIndex(townName + "p") % 2 === 0 ? planningBullets : planningAlt,
    eventHelpTitle: `Celebrations & gatherings · ${townName}`,
    eventHelpIntro: "Choose the closest fit—we still confirm surface, headcount, and flow.",
    eventHelpItems: poolPick,
    setupTitle: `Site & logistics · ${townName}`,
    setupIntro: clusterPatterns
      ? "Tent anchoring and carry paths are the first variables we align for this area—then tables, chairs, and lighting. Photos beat adjectives."
      : "Honest notes upfront save the most time. Photos welcome.",
    setupItems: setupPick,
    setupsTitle: `Layouts we quote often · ${townName}`,
    setupsIntro: "Starting points—every quote is tailored to your address.",
    setups: setupsPick,
    featuredTitle: `Explore resources · ${townName}`,
    featuredIntro: clusterPatterns
      ? featuredIntroCluster[seedMod(townName, "fi", featuredIntroCluster.length)]!
      : "Tents, inventory, and planning links hosts use before locking a date.",
    featuredRentals: featuredRotations[variantIndex(townName + "r") % featuredRotations.length],
    faqTitle: `FAQ · ${townName} tent & party rentals`,
    faqSubline: clusterPatterns
      ? "Tents and anchoring first—tables and chairs follow guest flow. Answers stay concrete."
      : "Delivery and setup first—then the details that shape footprint.",
    faqs: [
      {
        id: "deliver",
        question: `Do you deliver party tent rentals and table and chair rentals to ${townName}?`,
        answer: `Yes. We deliver, install, and pick up in and around ${townName}. Lead with date, street or venue, guest count, and whether you need tent coverage, seating, or both so the first reply stays specific.`,
      },
      {
        id: "surface",
        question: `Can you set up tents on driveways or hard surfaces in ${townName}?`,
        answer:
          "Often yes. When stakes are not the right answer we plan weighted ballast in the quote. Name grass, patio, apron, or lot pavement up front so anchoring matches what we unload.",
      },
      {
        id: "events",
        question: `What events do you support in ${townName}?`,
        answer: `Backyard parties, graduations, weddings, corporate gatherings, and school or community programs. We map tent size first when weather matters, then tables and chairs to how guests move from arrival through food.`,
      },
      faqBooking,
      faqPlanning,
    ],
    finalCtaTitle: `Your ${townName} date · share the basics`,
    finalCtaBlurb: `Send date, address, guest count, and one line on seated dinner vs. dance vs. mingle. We reply with options you can forward. Wishlist chairs or tables while RSVPs move.`,
    primaryCtaLabel: "Email a quote request",
    wishlistCtaLabel: "Open wishlist",
    relatedLinksIntro: "Quick reads:",
  };
}

export function getServiceAreaTownContent(townName: string): ServiceAreaTownPayload {
  if (PRIORITY[townName]) return PRIORITY[townName];
  if (!townList.includes(townName)) {
    throw new Error(`Unknown town: ${townName}`);
  }
  return buildArchetypeTown(townName);
}
