import { business, faqItems, type FaqItem } from "@/lib/site-data";
import { defaultOgImagePath, siteBaseUrl } from "@/lib/metadata";

const businessId = `${siteBaseUrl}/#localbusiness`;

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
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.primaryCity,
      addressRegion: "CT",
      addressCountry: "US",
    },
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
    name: business.name,
    url: siteBaseUrl,
    publisher: { "@id": businessId },
    potentialAction: {
      "@type": "ContactAction",
      target: `${siteBaseUrl}/contact#quote`,
      name: "Request a quote",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

type ServiceSchemaProps = {
  name: string;
  description: string;
  path: string;
};

/** Use on service pages; references LocalBusiness @id from layout */
export function ServiceSchema({ name, description, path }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${siteBaseUrl}${path}`,
    provider: { "@id": businessId },
    areaServed: {
      "@type": "State",
      name: "Connecticut",
    },
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
      item: `${siteBaseUrl}${item.path === "/" ? "" : item.path}`.replace(/\/$/, "") || siteBaseUrl,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
