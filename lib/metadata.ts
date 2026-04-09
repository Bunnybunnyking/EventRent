import type { Metadata } from "next";
import { business } from "./site-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Exists under `public/` — used for OG, schema, and homepage hero */
export const defaultOgImagePath = "/images/wethersfield-ct-party-tent-rental-wedding-reception.png";

export function createPageMetadata({
  title,
  description,
  path = "/",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  /** Optional path under /public for Open Graph (e.g. `/images/wethersfield-ct-party-tent-rental-wedding-reception.png`) */
  ogImage?: string;
}): Metadata {
  const fullTitle = `${title} | ${business.name}`;
  const canonical = `${baseUrl}${path}`;
  const ogImages = ogImage
    ? [{ url: `${baseUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}` }]
    : undefined;

  return {
    /** Absolute so root `title.template` does not append `| business.name` twice */
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      type: "website",
      siteName: business.name,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImages ? { images: [ogImages[0].url] } : {}),
    },
  };
}

export const siteBaseUrl = baseUrl;