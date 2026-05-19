import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationDetailPage } from "@/components/locations/location-detail-page";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { getLocation, locationSlugs } from "@/lib/locations-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) {
    return createPageMetadata({
      title: "Location",
      description: "Connecticut Party Rentals company locations.",
      path: "/locations",
      ogImage: defaultOgImagePath,
    });
  }
  return createPageMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: location.path,
    ogImage: defaultOgImagePath,
  });
}

export default async function LocationSlugPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  return <LocationDetailPage location={location} />;
}
