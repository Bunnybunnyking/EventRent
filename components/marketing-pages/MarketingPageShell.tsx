import { ArticleSchema, BreadcrumbListSchema, FAQSchemaItems } from "@/components/schema";
import type { MarketingPageDefinition } from "@/lib/marketing-pages-types";
import { MarketingPageView } from "./MarketingPageView";

export type MarketingBreadcrumbSchemaItem = { name: string; path: string };

export type MarketingBreadcrumbViewItem = { label: string; href?: string };

export function MarketingPageShell({
  page,
  breadcrumbSchema,
  breadcrumbView,
}: {
  page: MarketingPageDefinition;
  breadcrumbSchema: MarketingBreadcrumbSchemaItem[];
  breadcrumbView: MarketingBreadcrumbViewItem[];
}) {
  const faqForSchema = page.faqs.map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <>
      <ArticleSchema
        headline={page.h1}
        description={page.metaDescription}
        path={page.path}
        datePublished={page.publishedAt}
        dateModified={page.updatedAt}
        articleSection={page.articleSection}
      />
      <FAQSchemaItems items={faqForSchema} />
      <BreadcrumbListSchema items={breadcrumbSchema} />
      <MarketingPageView page={page} breadcrumbTrail={breadcrumbView} />
    </>
  );
}
