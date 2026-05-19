import type { MetadataRoute } from "next";
import { siteBaseUrl } from "@/lib/metadata";
import { buildIndexablePaths } from "@/lib/indexable-sitemap";

/**
 * Public indexable URLs only. Omitted paths: see `lib/indexable-sitemap.ts` and `app/robots.ts`.
 *
 * Path list is built from `lib/indexable-sitemap.ts` so XML stays aligned with `/sitemap`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = buildIndexablePaths();
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${siteBaseUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/sitemap" ? 0.65 : 0.7,
  }));
}
