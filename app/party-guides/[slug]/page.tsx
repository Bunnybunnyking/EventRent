import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartyGuideArticleView } from "@/components/party-guides/party-guide-article";
import { ArticleSchema, BreadcrumbListSchema, FAQSchemaItems } from "@/components/schema";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { getPartyGuide, partyGuideSlugs } from "@/lib/party-guides-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return partyGuideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getPartyGuide(slug);
  if (!guide) return {};
  return createPageMetadata({
    title: guide.title, description: guide.metaDescription, path: `/party-guides/${slug}`, ogImage: defaultOgImagePath, });
}

export default async function PartyGuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const guide = getPartyGuide(slug);
  if (!guide) notFound();

  const faqForSchema = guide.faq.map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <>
      <ArticleSchema
        headline={guide.title}
        description={guide.metaDescription}
        path={`/party-guides/${slug}`}
        datePublished={guide.publishedAt}
        dateModified={guide.updatedAt}
      />
      <FAQSchemaItems items={faqForSchema} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Party guides", path: "/party-guides" }, { name: guide.title, path: `/party-guides/${slug}` }, ]}
      />
      <PartyGuideArticleView guide={guide} />
    </>
  );
}
