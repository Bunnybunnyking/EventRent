import type { MetadataRoute } from "next";
import { siteBaseUrl } from "@/lib/metadata";
import { eventLandingSlugs } from "@/lib/event-landing-data";
import { frameTentSlugs, largeEventTentSlugs } from "@/lib/tent-section-data";
import { partyGuideSlugs } from "@/lib/party-guides-data";
import { guideSlugs } from "@/lib/marketing-pages-data";
import { townList } from "@/lib/site-data";

/**
 * Public indexable URLs only. Intentionally omitted (see `app/robots.ts`):
 * `/wedding-checklist-dev`, `/goodshuffle-test`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const tentGuideRoutes = [
    "/tents/frame-tents",
    "/tents/expandable-frame-tents",
    "/tents/pole-tents",
    "/tents/large-event-structures",
    "/tents/marquee-walkways",
    ...frameTentSlugs.map((slug) => `/tents/frame-tents/${slug}`),
    ...largeEventTentSlugs.map((slug) => `/tents/large-event-structures/${slug}`),
  ];

  const staticRoutes = [
    "/",
    "/tent-rentals",
    "/tent-rentals/jobsite-coverage",
    "/tents",
    ...tentGuideRoutes,
    "/tents/gallery",
    "/events",
    "/av-games",
    "/yard-games",
    "/bounce-houses",
    "/table-chair-rentals",
    "/wedding-tent-rentals",
    "/corporate-event-rentals",
    "/rental-inventory",
    "/party-packages",
    "/about",
    "/contact",
    "/faq",
    "/planning",
    "/quick-event-planner",
    "/backyard-party-checklist",
    "/wishlist",
    "/party-guides",
    ...partyGuideSlugs.map((slug) => `/party-guides/${slug}`),
    "/guides",
    ...guideSlugs.map((slug) => `/guides/${slug}`),
    "/packages/most-booked-event-setups",
    "/how-it-works",
    "/reviews-and-real-events",
    "/case-studies",
    "/service-areas",
    ...eventLandingSlugs.map((slug) => `/events/${slug}`),
  ];

  const townRoutes = townList.map((town) => `/service-areas/${town.toLowerCase().replace(/\s+/g, "-")}`);

  return [...staticRoutes, ...townRoutes].map((path) => ({
    url: `${siteBaseUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}