import type { MetadataRoute } from "next";
import { siteBaseUrl } from "@/lib/metadata";
import { eventLandingSlugs } from "@/lib/event-landing-data";
import { frameTentSlugs, largeEventTentSlugs } from "@/lib/tent-section-data";
import { partyGuideSlugs } from "@/lib/party-guides-data";
import { townList } from "@/lib/site-data";

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
    "/yard-games",
    "/bounce-houses",
    "/table-chair-rentals",
    "/wedding-tent-rentals",
    "/corporate-event-rentals",
    "/rental-inventory",
    "/party-packages",
    "/wishlist",
    "/about",
    "/contact",
    "/faq",
    "/planning",
    "/party-guides",
    ...partyGuideSlugs.map((slug) => `/party-guides/${slug}`),
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