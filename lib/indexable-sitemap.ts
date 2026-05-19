import { eventLandingSlugs, eventLandings } from "@/lib/event-landing-data";
import { frameTentSlugs, largeEventTentSlugs } from "@/lib/tent-section-data";
import { partyGuideSlugs, getPartyGuide } from "@/lib/party-guides-data";
import { townList } from "@/lib/site-data";

export type SitemapNavLink = { href: string; label: string };

export function townToPath(town: string): string {
  return `/service-areas/${town.toLowerCase().replace(/\s+/g, "-")}`;
}

/** Shown in footer; full town list lives on `/service-areas` and the HTML sitemap. */
export const PRIORITY_SERVICE_TOWNS = ["Hartford", "West Hartford", "Farmington", "Wethersfield", "Glastonbury", "New Britain"] as const;

export function buildTentInventoryPaths(): string[] {
  return [
    "/tents/frame-tents",
    "/tents/expandable-frame-tents",
    "/tents/pole-tents",
    "/tents/large-event-structures",
    "/tents/marquee-walkways",
    "/tents/cheap-canopy-vs-professional-event-tent",
    ...frameTentSlugs.map((slug) => `/tents/frame-tents/${slug}`),
    ...largeEventTentSlugs.map((slug) => `/tents/large-event-structures/${slug}`),
  ];
}

/**
 * All URLs included in `sitemap.xml` (indexable, canonical). Keep in sync with `app/robots.ts` disallow rules.
 *
 * Intentionally omitted: `/contact/thank-you` (noindex), `/wedding-checklist-dev`, `/goodshuffle-test`, `/admin/*`,
 * `/planning-tools` → `/planning`, `/games` → `/party-games-tools` (legacy aliases; never in sitemap.xml),
 * per-event RSVP URLs (`/rsvp/[slug]`, `/rsvp/[slug]/dashboard` — noindex + robots disallow `/rsvp/`),
 * and other private or non-indexable routes.
 */
export function buildIndexablePaths(): string[] {
  const tentPaths = buildTentInventoryPaths();
  const staticPaths = [
    "/", "/sitemap", "/tent-rentals", "/tent-rentals/jobsite-coverage", "/tents", ...tentPaths, "/tents/gallery", "/events", "/events/birthdays", "/rsvp", "/rsvp/create", "/av-games", "/yard-games", "/bounce-houses", "/table-chair-rentals", "/wedding-tent-rentals", "/corporate-event-rentals", "/rental-inventory", "/party-packages", "/about", "/contact", "/faq", "/planning", "/party-games-tools", "/quiz", "/whats-your-party-personality", "/quiz/quizast", "/party-spark-generator", "/wedding-checklist", "/quick-event-planner", "/backyard-party-checklist", "/tent-seating-reference", "/wishlist", "/party-guides", ...partyGuideSlugs.map((slug) => `/party-guides/${slug}`), "/packages/most-booked-event-setups", "/how-it-works", "/reviews-and-real-events", "/case-studies", "/service-areas", ...eventLandingSlugs.map((slug) => `/events/${slug}`), ];
  const townPaths = townList.map(townToPath);
  return [...new Set([...staticPaths, ...townPaths])];
}

export type FooterSitemapGroup = {
  id: string;
  title: string;
  links: SitemapNavLink[];
};

/** Compact crawlable footer: priority hubs only (full index on `/sitemap`). */
export const footerSitemapGroups: FooterSitemapGroup[] = [
  {
    id: "tent-rentals", title: "Tent rentals", links: [
      { href: "/tent-rentals", label: "Tent rentals hub" }, { href: "/tents", label: "Tent guide hub" }, { href: "/tents/frame-tents", label: "Frame tents" }, { href: "/tents/pole-tents", label: "Pole tents" }, { href: "/tents/expandable-frame-tents", label: "Expandable systems" }, { href: "/wedding-tent-rentals", label: "Wedding tent rentals" }, { href: "/tents/gallery", label: "Tent gallery" }, ], }, {
    id: "planning", title: "Planning & guides", links: [
      { href: "/planning", label: "Planning hub" }, { href: "/party-games-tools", label: "Party games & tools" }, { href: "/party-guides", label: "Party guides" }, { href: "/party-guides/what-size-tent-do-i-need", label: "Tent size help" }, { href: "/party-guides/outdoor-wedding-rain-plan-basics", label: "Weather & rain plan" }, { href: "/quick-event-planner", label: "Quick Event Planner" }, { href: "/backyard-party-checklist", label: "Party checklist" }, ], }, {
    id: "events", title: "Event types", links: [
      { href: "/events", label: "Events hub" }, { href: "/wedding-tent-rentals", label: "Weddings" }, { href: "/corporate-event-rentals", label: "Corporate events" }, { href: "/events/graduation-parties", label: "Graduation parties" }, { href: "/events/festivals-fairs", label: "Festivals & fairs" }, { href: "/events/community-school-town", label: "Community & school" }, ], }, {
    id: "tables", title: "Tables & more", links: [
      { href: "/table-chair-rentals", label: "Tables & chairs" }, { href: "/rental-inventory", label: "Rental inventory" }, { href: "/party-packages", label: "Party packages" }, { href: "/wishlist", label: "Catalog & reserve a tent" }, { href: "/av-games", label: "AV / games" }, ], }, {
    id: "service-areas", title: "Service areas", links: [
      { href: "/service-areas", label: "All service areas" }, ...PRIORITY_SERVICE_TOWNS.map((town) => ({ href: townToPath(town), label: town })), ], }, {
    id: "company", title: "Company & help", links: [
      { href: "/about", label: "About" }, { href: "/reviews-and-real-events", label: "Reviews & real events" }, { href: "/case-studies", label: "Case studies" }, { href: "/how-it-works", label: "Delivery & setup" }, { href: "/faq", label: "FAQ" }, { href: "/contact#quote", label: "Contact & quote" }, { href: "/sitemap", label: "Site map (HTML)" }, ], },
];

export function getPartyGuideSitemapLinks(): SitemapNavLink[] {
  return partyGuideSlugs.map((slug) => {
    const g = getPartyGuide(slug);
    return { href: `/party-guides/${slug}`, label: g?.title ?? slug };
  });
}

export function getEventOccasionSitemapLinks(): SitemapNavLink[] {
  return eventLandingSlugs.map((slug) => ({
    href: `/events/${slug}`, label: eventLandings[slug].h1, }));
}

export function getServiceAreaSitemapLinks(): SitemapNavLink[] {
  return townList.map((town) => ({ href: townToPath(town), label: town }));
}
