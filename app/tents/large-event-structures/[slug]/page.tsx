import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentSizePageTemplate } from "@/components/tents/tent-size-template";
import { createPageMetadata } from "@/lib/metadata";
import { getLargeStructurePage, largeEventTentSlugs } from "@/lib/tent-section-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return largeEventTentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getLargeStructurePage(slug);
  if (!data) return {};
  return createPageMetadata({
    title: data.pageTitle,
    description: data.metaDescription,
    path: `/tents/large-event-structures/${slug}`,
  });
}

export default async function LargeStructureSizePage({ params }: Props) {
  const { slug } = await params;
  const data = getLargeStructurePage(slug);
  if (!data) notFound();

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tents", path: "/tents" },
          { name: "Large event structures", path: "/tents/large-event-structures" },
          { name: data.sizeLabel, path: `/tents/large-event-structures/${slug}` },
        ]}
      />
      <TentSizePageTemplate
        variant="large"
        data={data}
        schemaPath={`/tents/large-event-structures/${slug}`}
        schemaName={`${data.sizeLabel} large event structure Connecticut`}
        schemaDescription={data.metaDescription}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Tents", href: "/tents" },
          { label: "Large structures", href: "/tents/large-event-structures" },
          { label: data.sizeLabel },
        ]}
        familyLinks={[
          { href: "/tents/large-event-structures", label: "All large structures" },
          { href: "/tents", label: "Tent guide home" },
        ]}
      />
    </>
  );
}
