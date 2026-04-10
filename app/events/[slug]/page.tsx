import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventLandingTemplate } from "@/components/event-landing-template";
import { BreadcrumbListSchema, FAQSchemaItems, ServiceSchema } from "@/components/schema";
import { createPageMetadata } from "@/lib/metadata";
import { eventLandingSlugs, getEventLanding } from "@/lib/event-landing-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return eventLandingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getEventLanding(slug);
  if (!content) return {};
  return createPageMetadata({
    title: content.seoTitle,
    description: content.metaDescription,
    path: `/events/${slug}`,
    ogImage: content.heroImage,
  });
}

export default async function EventLandingPage({ params }: Props) {
  const { slug } = await params;
  const content = getEventLanding(slug);
  if (!content) notFound();

  return (
    <>
      <ServiceSchema
        name={content.h1}
        description={content.metaDescription}
        path={`/events/${slug}`}
      />
      <FAQSchemaItems items={content.faq} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: content.h1, path: `/events/${slug}` },
        ]}
      />
      <EventLandingTemplate content={content} />
    </>
  );
}
