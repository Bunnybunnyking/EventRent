import { business, faqItems, type FaqItem } from "@/lib/site-data";
import { defaultOgImagePath, siteBaseUrl } from "@/lib/metadata";

const businessId = `${siteBaseUrl}/#localbusiness`;
/** Stable @id for WebSite so Article / CollectionPage can reference the same graph node. */
const websiteId = `${siteBaseUrl}/#website`;

function absolutePageUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteBaseUrl}${p}`;
}

const hasPublishableStreetAddress =
  Boolean(business.address?.trim()) && !/\[INSERT|PLACEHOLDER|TBD\b/i.test(business.address);

export function LocalBusinessSchema() {
  const heroImage = `${siteBaseUrl}${defaultOgImagePath}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: business.name,
    image: [heroImage],
    telephone: business.phone,
    email: business.email,
    url: siteBaseUrl,
    ...(hasPublishableStreetAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address,
            addressLocality: business.primaryCity,
            addressRegion: "CT",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.7658,
      longitude: -72.6734,
    },
    areaServed: [
      { "@type": "State", name: "Connecticut" },
      { "@type": "AdministrativeArea", name: "Hartford County" },
    ],
    description: `Family owned and operated since ${business.establishedYear}. Celebrating 80+ years in business. ${business.name} provides tent rentals, table and chair rentals, and full setup service for weddings, private parties, and corporate events across Connecticut and Southern MA.`,
    priceRange: "$$",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: business.phone,
      email: business.email,
      areaServed: "US",
      availableLanguage: ["English"],
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function FAQSchema() {
  return <FAQSchemaItems items={faqItems} />;
}

export function FAQSchemaItems({ items }: { items: Pick<FaqItem, "question" | "answer">[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: business.name,
    url: siteBaseUrl,
    inLanguage: "en-US",
    publisher: { "@id": businessId },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

type ServiceSchemaProps = {
  name: string;
  description: string;
  path: string;
  /** When set (e.g. town service pages), adds a City alongside Connecticut for clearer local relevance. */
  serviceAreaCity?: string;
};

/** Use on service pages; references LocalBusiness @id from layout */
export function ServiceSchema({ name, description, path, serviceAreaCity }: ServiceSchemaProps) {
  const areaServed = serviceAreaCity
    ? [
        { "@type": "State", name: "Connecticut" },
        { "@type": "City", name: serviceAreaCity, containedInPlace: { "@type": "State", name: "Connecticut" } },
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

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

type BreadcrumbItem = { name: string; path: string };

/** BreadcrumbList for service/landing pages; `path` is pathname including leading slash. */
export function BreadcrumbListSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolutePageUrl(item.path === "/" ? "/" : item.path).replace(/\/$/, "") || siteBaseUrl,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

type ArticleSchemaProps = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  /** https://schema.org/articleSection */
  articleSection?: string;
};

/** Article / BlogPosting for guide and content pages */
export function ArticleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  articleSection,
}: ArticleSchemaProps) {
  const pageUrl = absolutePageUrl(path);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified,
    ...(articleSection ? { articleSection } : {}),
    author: { "@type": "Organization", name: business.name },
    publisher: { "@id": businessId },
    isPartOf: { "@id": websiteId },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      isPartOf: { "@id": websiteId },
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

type ItemListSchemaEntry = { name: string; path: string; description?: string };

/** Collection + ItemList for hub pages (e.g. /guides). */
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

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
