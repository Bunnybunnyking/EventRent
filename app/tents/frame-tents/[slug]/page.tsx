import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentSizePageTemplate } from "@/components/tents/tent-size-template";
import { createPageMetadata } from "@/lib/metadata";
import { frameTentSlugs, getFrameSizePage } from "@/lib/tent-section-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return frameTentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getFrameSizePage(slug);
  if (!data) return {};
  return createPageMetadata({
    title: data.pageTitle,
    description: data.metaDescription,
    path: `/tents/frame-tents/${slug}`,
  });
}

export default async function FrameTentSizePage({ params }: Props) {
  const { slug } = await params;
  const data = getFrameSizePage(slug);
  if (!data) notFound();

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tents", path: "/tents" },
          { name: "Frame tents", path: "/tents/frame-tents" },
          { name: `${data.sizeLabel} rental`, path: `/tents/frame-tents/${slug}` },
        ]}
      />
      <TentSizePageTemplate
        variant="frame"
        data={data}
        schemaPath={`/tents/frame-tents/${slug}`}
        schemaName={`${data.sizeLabel} frame tent rental Connecticut`}
        schemaDescription={data.metaDescription}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Tents", href: "/tents" },
          { label: "Frame tents", href: "/tents/frame-tents" },
          { label: data.sizeLabel },
        ]}
        familyLinks={[
          { href: "/tents/frame-tents", label: "All frame sizes" },
          { href: "/tents", label: "Tent guide home" },
          { href: "/tent-rentals", label: "Classic tent rentals page" },
        ]}
      />
    </>
  );
}
