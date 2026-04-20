import type { Metadata } from "next";
import { business } from "./site-data";

/**
 * Canonical URLs, OG tags, sitemap, and robots must match the public origin.
 * Prefer `NEXT_PUBLIC_SITE_URL` in production; on Vercel fall back to `VERCEL_URL` so previews are not stuck on localhost.
 */
function resolveSiteBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

const baseUrl = resolveSiteBaseUrl();

/** Exists under `public/`, used for OG and general sharing */
export const defaultOgImagePath = "/images/wethersfield-ct-party-tent-rental-wedding-reception.png";

/**
 * Homepage hero — file: `public/images/home-hero-panoramic-tent.png`.
 * (Do not add `?query` here: Next.js `next/image` rejects query strings on local paths unless
 * `images.localPatterns` is extended.) After replacing the file, hard-refresh the browser (Ctrl+F5).
 * If pixel dimensions change, update `homePageHeroImageSize` below.
 */
export const homePageHeroImagePath = "/images/home-hero-panoramic-tent.png";
/** Pixel size of `home-hero-panoramic-tent.png` — must match the file or Next/Image will distort. */
export const homePageHeroImageSize = { width: 1024, height: 681 } as const;

const defaultOgDimensions = { width: 1200, height: 630 } as const;
const defaultOgAlt =
  "Elegant outdoor wedding tent rental in Wethersfield, CT: white marquee reception with paper lantern lighting and polished table decor.";

function resolveOgImages(ogImage?: string):
  | { url: string; width?: number; height?: number; alt?: string }[]
  | undefined {
  if (!ogImage) return undefined;
  const pathPart = ogImage.startsWith("/") ? ogImage : `/${ogImage}`;
  const url = `${baseUrl}${pathPart}`;

  if (ogImage === homePageHeroImagePath) {
    return [
      {
        url,
        width: homePageHeroImageSize.width,
        height: homePageHeroImageSize.height,
        alt: "Outdoor wedding reception under a white frame tent—champagne gold linens, white lanterns, string lights, dance floor, and lawn beyond.",
      },
    ];
  }

  if (ogImage === defaultOgImagePath) {
    return [{ url, width: defaultOgDimensions.width, height: defaultOgDimensions.height, alt: defaultOgAlt }];
  }

  return [{ url }];
}

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
  const canonical = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImages = resolveOgImages(ogImage);
  const primaryOg = ogImages?.[0];

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
      ...(primaryOg
        ? {
            images: [
              {
                url: primaryOg.url,
                ...(primaryOg.width != null && primaryOg.height != null
                  ? { width: primaryOg.width, height: primaryOg.height }
                  : {}),
                ...(primaryOg.alt ? { alt: primaryOg.alt } : {}),
              },
            ],
          }
        : {}),
    },
  };
}

export const siteBaseUrl = baseUrl;