import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentSizePageTemplate } from "@/components/tents/tent-size-template";
import { isGoodshuffleEnabled } from "@/lib/goodshuffle-env";
import { createPageMetadata } from "@/lib/metadata";
import { rentalInventoryTentCardHrefForTentSizeSlug } from "@/lib/goodshuffle-catalog-ids";
import {
  canonicalizeFrameTentSlugParam,
  frameTentSlugs,
  getFrameSizePage,
} from "@/lib/tent-section-data";

type Props = { params: Promise<{ slug: string }> };

/** Env + catalog embed must reflect current `NEXT_PUBLIC_GOODSHUFFLE_PUBLIC_WEBSITE_KEY`, not a static build snapshot. */
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return frameTentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = canonicalizeFrameTentSlugParam(raw);
  const data = getFrameSizePage(slug);
  if (!data) return {};
  return createPageMetadata({
    title: data.pageTitle, description: data.metaDescription, path: `/tents/frame-tents/${slug}`, });
}

export default async function FrameTentSizePage({ params }: Props) {
  const { slug: raw } = await params;
  const rawNorm = decodeURIComponent(raw).trim().toLowerCase().replace(/\u00d7/g, "x");
  const slug = canonicalizeFrameTentSlugParam(raw);
  const data = getFrameSizePage(slug);
  if (!data) notFound();
  if (rawNorm !== slug) permanentRedirect(`/tents/frame-tents/${slug}`);
  const goodshuffleEnabled = isGoodshuffleEnabled();
  const inventoryTentHref = rentalInventoryTentCardHrefForTentSizeSlug(slug);

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Tents", path: "/tents" }, { name: "Frame tents", path: "/tents/frame-tents" }, { name: `${data.sizeLabel} rental`, path: `/tents/frame-tents/${slug}` }, ]}
      />
      <TentSizePageTemplate
        variant="frame"
        data={data}
        goodshuffleEnabled={goodshuffleEnabled}
        schemaPath={`/tents/frame-tents/${slug}`}
        schemaName={`${data.sizeLabel} frame tent rental Connecticut`}
        schemaDescription={data.metaDescription}
        breadcrumb={[
          { label: "Home", href: "/" }, { label: "Tents", href: "/tents" }, { label: "Frame tents", href: "/tents/frame-tents" }, { label: data.sizeLabel }, ]}
        familyLinks={[
          { href: "/tents/frame-tents", label: "All frame sizes" },
          { href: "/tents", label: "Tent guide home" },
          { href: "/tent-rentals", label: "Classic tent rentals page" },
          ...(inventoryTentHref ? [{ href: inventoryTentHref, label: "On rental inventory" }] : []),
        ]}
      />
    </>
  );
}
