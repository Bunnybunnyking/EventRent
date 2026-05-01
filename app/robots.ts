import type { MetadataRoute } from "next";
import { siteBaseUrl } from "@/lib/metadata";

/** Align `disallow` with routes that use `robots: { index: false }` so crawlers are not given mixed signals. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*", allow: "/", disallow: ["/wedding-checklist-dev", "/goodshuffle-test", "/admin"], }, ], sitemap: `${siteBaseUrl}/sitemap.xml`, };
}