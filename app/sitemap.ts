import type { MetadataRoute } from "next";
import { siteBaseUrl } from "@/lib/metadata";
import { townList } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/tent-rentals",
    "/tent-rentals/jobsite-coverage",
    "/tents",
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
    "/service-areas",
  ];

  const townRoutes = townList.map((town) => `/service-areas/${town.toLowerCase().replace(/\s+/g, "-")}`);

  return [...staticRoutes, ...townRoutes].map((path) => ({
    url: `${siteBaseUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}