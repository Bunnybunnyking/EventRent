import { getFaqPageSchemaItems } from "@/lib/faq-data";
import type { FaqItem } from "@/lib/faq-data";
import { serializeJsonLd } from "@/lib/json-ld";
import { business } from "@/lib/site-data";
import { defaultOgImagePath, siteBaseUrl } from "@/lib/metadata";

const businessId = `${siteBaseUrl}/#localbusiness`;
const websiteId = `${siteBaseUrl}/#website`;

const defaultOgAbsolute = `${siteBaseUrl}${defaultOgImagePath}`;

/** Short site pitch for WebSite + consistency with root `metadata.description`. */
const siteWideDescription =
  "Connecticut tent rentals and event rentals: weddings, backyard parties, graduations, corporate events. Table and chair rentals, delivery, and professional setup statewide.";

function absolutePageUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteBaseUrl}${p}`;
}

const hasPublishableStreetAddress =
  Boolean(business.address?.trim()) && !/\[INSERT|PLACEHOLDER|TBD\b/i.test(business.address);

/**
 * Single JSON-LD `@graph` for sitewide entities (recommended pattern for linking WebSite ↔ business).
 * Replaces separate LocalBusiness + WebSite scripts to avoid duplicate @context blocks.
 */
export function SiteWideGraphSchema() {
  const localBusiness: Record<string, unknown> = {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: business.name,
    url: siteBaseUrl,
    logo: { "@type": "ImageObject", url: defaultOgAbsolute },
    image: [defaultOgAbsolute],
    telephone: business.phone,
    email: business.email,
    ...(business.websiteUrl?.trim() && business.websiteUrl.replace(/\/$/, "") !== siteBaseUrl
      ? { sameAs: [business.websiteUrl.replace(/\/$/, "")] }
      : {}),
    ...(hasPublishableStreetAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address,
            addressLocality: business.primaryCity,
            addressRegion: "CT",
            ...(business.postalCode?.trim() ? { postalCode: business.postalCode } : {}),
            addressCountry: "US",
          },
        }
      : {
          address: {
            "@type": "PostalAddress",
            addressLocality: business.primaryCity,
            addressRegion: "CT",
            addressCountry: "US",
          },
        }),
    geo: { "@type": "GeoCoordinates", latitude: 41.8507, longitude: -72.7031 },
    areaServed: [
      { "@type": "State", name: "Connecticut" },
      { "@type": "AdministrativeArea", name: "Hartford County" },
      { "@type": "State", name: "Massachusetts" },
    ],
    description: `${business.familyHistoryShort} ${business.celebrationTagline} ${business.name} provides tent rentals, table and chair rentals, and full setup service for weddings, private parties, and corporate events across Connecticut and Southern Massachusetts.`,
    priceRange: "$$",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: business.phone,
        email: business.email,
        url: absolutePageUrl("/contact"),
        areaServed: ["US"],
        availableLanguage: ["English"],
      },
    ],
  };

  const webSite: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    name: business.name,
    url: siteBaseUrl,
    description: siteWideDescription,
    inLanguage: "en-US",
    publisher: { "@id": businessId },
    copyrightHolder: { "@id": businessId },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [localBusiness, webSite],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />
  );
}

export function FAQSchema() {
  return <FAQSchemaItems items={getFaqPageSchemaItems()} />;
}

export function FAQSchemaItems({ items }: { items: Pick<FaqItem, "question" | "answer">[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
  );
}

type ServiceSchemaProps = {
  name: string;
  description: string;
  path: string;
  serviceAreaCity?: string;
};

export function ServiceSchema({ name, description, path, serviceAreaCity }: ServiceSchemaProps) {
  const areaServed = serviceAreaCity
    ? [
        { "@type": "State", name: "Connecticut" },
        {
          "@type": "City",
          name: serviceAreaCity,
          containedInPlace: { "@type": "State", name: "Connecticut" },
        },
      ]
    : { "@type": "State", name: "Connecticut" };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: absolutePageUrl(path),
    provider: { "@id": businessId },
    isPartOf: { "@id": websiteId },
    areaServed,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
  );
}

type BreadcrumbItem = { name: string; path: string };

export function BreadcrumbListSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolutePageUrl(item.path),
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
  );
}

type ArticleSchemaProps = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  articleSection?: string;
  /** Absolute or site-root path for primary image (defaults to default OG image). */
  imageUrl?: string;
};

export function ArticleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  articleSection,
  imageUrl,
}: ArticleSchemaProps) {
  const pageUrl = absolutePageUrl(path);
  const primaryImage = (() => {
    if (!imageUrl) return defaultOgAbsolute;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${siteBaseUrl}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
  })();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified,
    image: [primaryImage],
    ...(articleSection ? { articleSection } : {}),
    author: { "@type": "Organization", name: business.name, "@id": businessId, url: siteBaseUrl },
    publisher: { "@id": businessId },
    isPartOf: { "@id": websiteId },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      isPartOf: { "@id": websiteId },
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
  );
}

type ItemListSchemaEntry = { name: string; path: string; description?: string };

export function CollectionItemListSchema({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: ItemListSchemaEntry[];
}) {
  const pageUrl = absolutePageUrl(path);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: pageUrl,
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          name: item.name,
          url: absolutePageUrl(item.path),
          ...(item.description ? { description: item.description } : {}),
        },
      })),
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
  );
}
