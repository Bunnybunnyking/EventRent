import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingPageShell } from "@/components/marketing-pages/MarketingPageShell";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { getMarketingGuidePage, guideSlugs } from "@/lib/marketing-pages-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getMarketingGuidePage(slug);
  if (!page) return {};
  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    ogImage: defaultOgImagePath,
  });
}

export default async function MarketingGuideSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getMarketingGuidePage(slug);
  if (!page) notFound();

  return (
    <MarketingPageShell
      page={page}
      breadcrumbSchema={[
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: page.h1, path: page.path },
      ]}
      breadcrumbView={[
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides" },
        { label: page.h1 },
      ]}
    />
  );
}
