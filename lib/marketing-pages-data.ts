import type { MarketingPageDefinition } from "@/lib/marketing-pages-types";

const PUBLISHED = "2026-04-19";
const UPDATED = "2026-04-19";

const quoteHref = "/contact#quote";

export const marketingPagesByPath: Record<string, MarketingPageDefinition> = {
  "/packages/most-booked-event-setups": {
    path: "/packages/most-booked-event-setups", metaTitle: "Most-Booked Event Setups", metaDescription:
      "Layout starting points for CT weddings, graduations, backyards, and corporate tents, tent + tables + chairs patterns you can refine with our team before quoting.", articleSection: "Event layouts", contentEyebrow: "Layout starting points", h1: "Most-Booked Event Setups", subhead:
      "Realistic layout starting points for weddings, graduations, backyard parties, and larger gatherings.", cta: { label: "Refine a setup", href: quoteHref }, quickAnswer:
      "Most customers do not need to start from scratch. The fastest way to plan is to begin with a setup that matches your event style, guest count, and space.", sections: [
      {
        id: "what-includes", heading: "What each setup usually includes", paragraphs: [
          "Every line below is a starting conversation, not a locked bundle. Counts change with guest tally, service style, and weather choices.", ], bullets: [
          "Tent family matched to footprint and surface", "Tables: banquets, rounds, or cocktail high-tops depending on flow", "Chairs: practical folding for casual events, white padded options when the look matters", "Lighting such as bistro strings when the program runs past sunset", ], }, {
        id: "how-choose", heading: "How to choose the right one", paragraphs: [
          "Pick the card that feels closest to your day, then note anything that breaks the template: live band, extra bar, late-night dessert, or lawn games outside the tent.", "Cross-check tent sizing mindset in our party guide library so expectations stay realistic before we quote.", ], }, {
        id: "featured-rentals", heading: "Featured rentals inside each setup", paragraphs: [
          "Inventory anchors we reference often include 20×20 and 30×30 footprints, expandable 20′ and 30′ systems for longer receptions, banquet and round tables, cocktail tables, beige folding chairs, white padded chairs, and bistro lighting. Confirm availability for your date and town when you reach out.", ], }, ], setupCards: [
      {
        title: "Backyard tent, tables, and chairs", summary: "Compact cover with practical seating for cookouts, birthdays, and neighborhood gatherings.", includes: ["Small or mid footprint tent", "Banquet or round tables", "Folding chairs", "Optional basic lighting"], bestFor: "Hosts who want shade or rain cover without a full reception program.", }, {
        title: "Graduation open-house setup", summary: "Mingling lanes, gift and dessert zones, and enough cover for steady foot traffic.", includes: ["Larger footprint or expandable tent", "Mixed tables for food and gifts", "Extra chairs for rotating guests", "Sidewall conversation if weather looks iffy"], bestFor: "Families expecting waves of guests rather than one seated moment.", }, {
        title: "Wedding reception layout", summary: "Dinner seating, service aisles, and space for dance or band without cramping head tables.", includes: ["Expandable or wide-span tent family", "Rounds for guests", "Head or banquet tables", "Lighting upgrade path", "Optional heaters if enclosed"], bestFor: "Couples planning dinner, speeches, and a dance floor in one footprint.", }, {
        title: "Cocktail and mingling layout", summary: "Standing clusters, high-tops, and a few seated zones for older guests.", includes: ["Cocktail tables", "Select rounds or lounges", "Focused lighting", "Smaller footprint when seated count is low"], bestFor: "Engagement parties, welcome drinks, or cocktail-hour-forward schedules.", }, {
        title: "Corporate or community tent setup", summary: "Program space, registration, and food service lines with wider aisles.", includes: ["Mid to large tent system", "Rows or classroom layouts", "Buffet or service tables", "Optional marquee or entry tent"], bestFor: "Schools, companies, and town events with mixed ages and mobility needs.", }, ], goodshuffleSlot:
      "Build your real list in the wishlist builder, then send it with your quote. The cards below show how featured rentals typically group on a quote so you can picture tables, chairs, and tent lines together.", finalCta: {
      title: "Next step", body: "Pick the card closest to your day, note exceptions (extra bar, band, late-night dessert), and send guest count and town so we can tighten the list.", primaryLabel: "Refine a setup", primaryHref: quoteHref, secondaryLabel: "Browse inventory", secondaryHref: "/rental-inventory", }, faqs: [
      {
        id: "faq-grad", question: "What setup works best for a graduation party?", answer:
          "Open-house flow with a larger tent, mixed tables for food and gifts, and sidewalls on standby if spring weather wobbles. Send expected peak headcount.", }, {
        id: "faq-backyard", question: "What is usually included in a backyard tent setup?", answer:
          "Cover plus practical tables and chairs, sometimes basic lighting if the event runs past sunset. Grills and yard games usually stay outside the tent line.", }, {
        id: "faq-change-items", question: "Can I start with a package and change items later?", answer:
          "Yes. Treat these setups as anchors. We expect counts and accessories to move as RSVPs and weather plans firm up.", }, {
        id: "faq-wedding", question: "Which setup works best for weddings?", answer:
          "Most full receptions map closest to the wedding reception card, then customize for band depth, bars, and dessert stations.", }, {
        id: "faq-help-choose", question: "Can you help me choose between a few options?", answer:
          "Absolutely. Send photos, guest count, and your must-keep moments. We will narrow tent families and furniture mixes quickly.", }, ], relatedLinks: [
      { href: "/party-packages", label: "Party packages" }, { href: "/party-guides", label: "Party guides library" }, { href: "/wedding-tent-rentals", label: "Wedding tent rentals" }, { href: "/events/graduation-parties", label: "Graduation parties" }, { href: "/party-guides/what-size-tent-do-i-need", label: "What size tent do I need?" }, ], publishedAt: PUBLISHED, updatedAt: UPDATED, }, "/how-it-works": {
    path: "/how-it-works", metaTitle: "Delivery & Setup Process", metaDescription:
      "Quote to breakdown: how tent and event rentals move from planning to install and pickup. What to have ready, what we handle, and what changes crew time on site.", articleSection: "Service process", contentEyebrow: "How renting works", h1: "How Delivery and Setup Works", subhead:
      "From quote to breakdown, here is what to expect when you book with Connecticut Party Rentals.", cta: { label: "Request a quote", href: quoteHref }, quickAnswer:
      "We help customers move from idea to setup by confirming the date, town, guest count, surface, and rental mix before delivery and installation.", sections: [
      {
        id: "steps", heading: "Step-by-step process", bullets: [
          "Tell us the basics: date, town, guest count, event type, and any must-have moments", "We recommend a tent system and layout-friendly add-ons based on your photos or site description", "We confirm details: footprint, furniture counts, access path, strike timing, and weather assumptions", "Delivery and setup happen on the agreed schedule with professional crews", "Event day support follows the plan you approved, including safety checks where needed", "Breakdown is scheduled around your venue rules and guest departure timing", ], }, {
        id: "ready", heading: "What customers should have ready", bullets: ["Confirmed or target event date", "Town and venue address", "Realistic guest count", "Surface notes: grass, pavement, or mixed", "Event type and run-of-show highlights"], }, {
        id: "we-help", heading: "What we help with", bullets: [
          "Tent sizing and system choice across frame, pole, expandable, and large structures", "Tables and chairs mapped to service style", "Lighting paths, heating conversations when tents are enclosed, and sidewall plans", ], }, {
        id: "timing", heading: "What affects setup timing", paragraphs: [
          "Access distance, surface type, tent size, sidewalls, and evening strikes all influence how long crews are on site. Tell us about stairs, narrow gates, or HOA rules up front so we schedule realistically.", ], }, ], trustBullets: [
      "Clean, inspected inventory prepared for professional installs", "Experienced setup crews who know Connecticut weather and surfaces", "Fast quote support when you send complete basics with photos", ], finalCta: {
      title: "Next step", body: "Send date, town, guest count, and surface. We reply with a recommended mix or follow-up questions before we lock delivery windows.", primaryLabel: "Request a quote", primaryHref: quoteHref, secondaryLabel: "Planning hub", secondaryHref: "/planning", }, faqs: [
      {
        id: "faq-info", question: "What information do you need for a quote?", answer:
          "Date, town, guest count, surface type, event style, and any must-have items like dance floors, bars, or heaters. Photos and rough measurements unlock better recommendations.", }, {
        id: "faq-deliver-setup", question: "Do you deliver and set up the rentals?", answer:
          "Yes for standard tent and event rentals. We install to the plan we agree on, then return for breakdown unless your contract specifies otherwise.", }, {
        id: "faq-book-ahead", question: "How far ahead should I book?", answer:
          "Popular weekends move first, especially May through October. If your date is firm, reach out early; if you are still planning, we can still advise realistic inventory paths.", }, {
        id: "faq-size-unsure", question: "What if I am not sure what size tent I need?", answer:
          "That is common. Start with guest count and service style, then read our party guide on tent sizing. We will translate that into tent families available for your town and date.", }, {
        id: "faq-addons", question: "Do you help with add-ons like chairs, lighting, and heaters?", answer:
          "Yes. Most outdoor programs bundle seating, lighting, and weather items with the tent so the experience feels complete on event day.", }, ], relatedLinks: [
      { href: "/party-guides", label: "Party guides library" }, { href: "/party-guides/what-size-tent-do-i-need", label: "What size tent do I need?" }, { href: "/party-guides/tent-rental-pricing", label: "How tent rental pricing works" }, { href: "/faq", label: "FAQ" }, { href: "/tents/gallery", label: "Tent gallery" }, ], publishedAt: PUBLISHED, updatedAt: UPDATED, }, "/reviews-and-real-events": {
    path: "/reviews-and-real-events", metaTitle: "Reading Tent Rental Reviews & Photo Evidence | Connecticut", metaDescription:
      "How to vet Connecticut tent and event rentals from third-party reviews: what detail matters, what photos should show, red flags to ignore, and where to go for anonymous layout patterns instead of story-driven marketing.", articleSection: "Vendor research", contentEyebrow: "Research checklist", heroSecondaryCta: { label: "Anonymous layout templates (logistics)", href: "/case-studies" }, h1: "Reading reviews, and deciding what actually counts as proof", subhead:
      "This page is not a testimonial wall. It is a buyer-side checklist for judging any rental vendor (including us): what third-party reviews can prove, what photos have to show, and when to move from opinions to layout facts.", cta: { label: "Ask a logistics question", href: quoteHref }, quickAnswer:
      "Reviews are one signal. Strong proof pairs dated photos of real footprints with specifics about access, weather pivots, and how pickup matched the contract, not adjectives alone.", sections: [
      {
        id: "reviews-vs-templates", heading: "Reviews vs. layout templates (why both exist on this site)", paragraphs: [
          "Third-party reviews describe how a day felt to one host on one property. Our case-study-style templates strip names and tell you how a footprint, service lines, and crew constraints fit together so you can compare patterns to your site.", "If a page reads like a magazine feature, you are probably not on the research checklist. If it reads like a field spec with anonymous inputs, you are in the template library.", ], }, {
        id: "signals", heading: "Signals we take seriously in reviews (yours or anyone else’s)", bullets: [
          "Concrete objects: tent family, span, surface type, and whether walls or heaters were part of the plan, not only “looked beautiful.”", "Time discipline: when trucks arrived, how long setup ran, and whether pickup matched the venue’s rules.", "Problem-solving: rain or wind shifts, access surprises, and how the crew communicated options, not only five stars when nothing went wrong.", "Scale match: headcount band and service style similar enough to your program that the comment is comparable.", ], }, {
        id: "photos", heading: "What photo evidence should show before you short-list a vendor", paragraphs: [
          "Use the tent gallery to study span variety, then ask for installs that resemble your surface mix (lawn, pavement, mixed) and your service style (seated, buffet, festival row).", ], bullets: [
          "Wide shots that show stake lines, door stacks, or ballast zones, not only table decor.", "Night shots if your program runs past sunset; lighting changes how safe food lines feel.", "Rain or sidewall configuration if your comfort standard includes enclosure.", ], }, {
        id: "red-flags", heading: "Low-signal patterns to discount", bullets: [
          "Generic praise with no event type, guest band, or town context.", "Only studio renderings or stock imagery with no install photography.", "Reviews that talk about price alone with no description of what was delivered on site.", ], }, ], finalCta: {
      title: "When you are ready to move from opinions to measurements", body: "Send date, town, guest band, surface notes, and a photo if you have one. We answer with inventory-aware options, or tell you what we still need to size honestly.", primaryLabel: "Send scope for review", primaryHref: quoteHref, secondaryLabel: "Open tent gallery (footprints)", secondaryHref: "/tents/gallery", }, faqs: [
      {
        id: "faq-events-help", question: "Where do I go if I want story-driven occasion advice instead of review vetting?", answer:
          "Use the Events hub for occasion guides, or the Party guides library for layout-first articles. Keep this page for judging evidence and knowing what to ask before you sign.", }, {
        id: "faq-weddings-formal", question: "Do you still work weddings and formal programs?", answer:
          "Yes, pricing and inventory conversations start on the wedding hub. This page only explains how to read proof, not which dress code we prefer.", }, {
        id: "faq-backyard-grad-examples", question: "Can I compare backyard or graduation layouts without testimonials?", answer:
          "Yes. Use anonymous templates on the case studies page for logistics patterns, then cross-check photos in the gallery and the graduation occasion guide for tone and flow.", }, {
        id: "faq-hartford-area", question: "Do you deliver across Hartford County and nearby towns?", answer:
          "We serve Connecticut and Southern Massachusetts. Share your venue town for drive-time planning and any multi-day installs.", }, {
        id: "faq-similar-setup", question: "Can I request a footprint similar to a photo I like?", answer:
          "Send the image link plus your guest band and surface. We map realistic tent families and furniture counts, then confirm availability for your date.", }, ], relatedLinks: [
      { href: "/case-studies", label: "Anonymous layout templates (case studies)" }, { href: "/tents/gallery", label: "Tent gallery (photo evidence)" }, { href: "/party-guides", label: "Party guides (layout literacy)" }, { href: "/events", label: "Events hub (occasion guides)" }, ], publishedAt: PUBLISHED, updatedAt: UPDATED, }, "/case-studies": {
    path: "/case-studies", metaTitle: "Anonymous Tent Layout Templates | Logistics Patterns | CT", metaDescription:
      "Field-style layout templates for Connecticut tent programs: anonymous site inputs, equipment patterns, and planning constraints, built to compare against your property, not to read like client testimonials.", articleSection: "Layout templates", contentEyebrow: "Logistics library", heroSecondaryCta: { label: "How to read third-party reviews", href: "/reviews-and-real-events" }, h1: "Anonymous layout templates, not named client stories", subhead:
      "Each block below is a logistics pattern: assumed inputs, a tent and furniture pattern that often fits, and the constraint that usually drives the quote. Use it to brief your team or compare to a photo, not as a substitute for a site visit.", cta: { label: "Map templates to inventory", href: "/rental-inventory" }, quickAnswer:
      "Templates are spec-style sketches. They intentionally avoid client names and towns until installs are approved for marketing; the value is the footprint math, service lanes, and accessory list, not praise.", sections: [
      {
        id: "wedding-case", heading: "Template A, Private reception lawn (ceremony nearby)", bullets: [
          "Program brief: seated dinner, head table, dance floor, bar, weather backup on the same property as ceremony.", "Site inputs: private lawn, partial slope toward tree line, medium truck access.", "Equipment pattern: expandable frame class sized to guest band plus sidewall strategy discussed during quoting.", "Constraint that drove the plan: aisle width for servers and guests before decor locked chair positions.", "Accessory list: rounds, white padded chairs, bistro lighting, optional heaters if walls close.", "Quote input to confirm early: power paths for band and caterer before tent orientation is final.", ], }, {
        id: "grad-case", heading: "Template B, Backyard graduation open house", bullets: [
          "Program brief: afternoon arrivals, gift and dessert traffic, speeches, mingling.", "Site inputs: driveway food zone, lawn tent, neighbor-adjacent property line.", "Equipment pattern: mid-size footprint, mixed banquet and round tables, basic tent lighting.", "Constraint that drove the plan: separating food line from mingling lanes during peak arrivals.", "Accessory list: folding chairs, buffet tables, lighting for post-sunset dessert.", "Quote input to confirm early: photos of grass and hard surfaces for anchoring notes.", ], }, {
        id: "community-case", heading: "Template C, Town festival with vendor row", bullets: [
          "Program brief: vendor row, stage adjacency, public entry and exit, rain plan.", "Site inputs: mixed grass and pavement, multiple arrival points.", "Equipment pattern: large-span or modular tents with marquee connectors when load-in allows.", "Constraint that drove the plan: entry mapping before rain forced crowd compression.", "Accessory list: banquet rows, sidewalls staged for wind side only.", "Quote input to confirm early: single on-site contact for crew questions during load-in.", ], }, {
        id: "corporate-case", heading: "Template D, Company picnic with awards program", bullets: [
          "Program brief: stage sightlines, buffet, shaded seating near ~200 guests.", "Site inputs: flat field, long truck access, defined strike window.", "Equipment pattern: wide tent, classroom-style rows flanking a central aisle.", "Constraint that drove the plan: keeping the awards path clear of buffet queues.", "Accessory list: folding chairs, lighting upgrade path for late program.", "Quote input to confirm early: generator or house power for AV and catering warmers.", ], }, {
        id: "wishlist", heading: "Turning a template into a line-item quote", paragraphs: [
          "When you are ready to attach SKUs, use the wishlist builder with counts from the template closest to your flow. We respond with availability and pricing tied to real inventory, not narrative copy.", ], }, ], finalCta: {
      title: "Apply a template to your measurements", body: "Mention which template letter matches your day (A to D) plus what differs: surface, headcount band, or add-ons. Photos beat prose for anchoring and truck path.", primaryLabel: "Send template + site notes", primaryHref: quoteHref, secondaryLabel: "Open wishlist builder", secondaryHref: "/wishlist", }, faqs: [
      {
        id: "faq-real-names", question: "Why are there no client names?", answer:
          "These entries are intentionally anonymous planning aids. When installs are approved for marketing, we can add dated entries with towns; until then, use them as briefing documents, not testimonials.", }, {
        id: "faq-customize", question: "Can I adapt a template to my property?", answer:
          "Yes. Send measurements, photos, and guest band. We translate the pattern into tent family, furniture counts, and accessories for your access and surface mix.", }, {
        id: "faq-more-studies", question: "Will you add more templates?", answer:
          "As we document additional repeatable patterns, we will add sections with the same spec-style structure.", }, {
        id: "faq-gallery", question: "Where should I look for photo proof while templates stay text-first?", answer:
          "Use the tent gallery for span variety, then occasion hubs for tone and flow. Pair visuals with this page when you need logistics language for an internal approver.", }, {
        id: "faq-quote-similar", question: "How do I reference a template in a quote request?", answer:
          "Name the template letter (A to D) and list deltas: surface type, guest band, bars, dance floor, or strike timing. That keeps the thread out of marketing language and inside layout facts.", }, ], relatedLinks: [
      { href: "/reviews-and-real-events", label: "How to read reviews & proof" }, { href: "/packages/most-booked-event-setups", label: "Most-booked setup anchors" }, { href: "/party-guides/how-to-think-about-tent-size-before-you-quote", label: "Think about tent size before you quote" }, { href: "/rental-inventory", label: "Rental inventory" }, ], publishedAt: PUBLISHED, updatedAt: UPDATED, },
};
