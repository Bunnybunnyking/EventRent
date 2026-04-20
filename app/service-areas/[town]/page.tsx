import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbListSchema, ServiceSchema } from "@/components/schema";
import { ServiceAreaTownTemplate } from "@/components/service-area-town-template";
import { createPageMetadata } from "@/lib/metadata";
import { getServiceAreaTownContent } from "@/lib/service-area-town-content";
import { business, townList } from "@/lib/site-data";

type Props = {
  params: Promise<{ town: string }>;
};

function slugify(input: string) {
  return input.toLowerCase().replace(/\s+/g, "-");
}

function unslug(input: string) {
  return input
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return townList.map((town) => ({ town: slugify(town) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { town } = await params;
  const townName = unslug(town);
  if (!townList.includes(townName)) {
    return createPageMetadata({
      title: "Service area",
      description: "Connecticut party and tent rentals.",
      path: "/service-areas",
    });
  }
  const content = getServiceAreaTownContent(townName);
  return createPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: `/service-areas/${town}`,
  });
}

export default async function TownPage({ params }: Props) {
  const { town } = await params;
  const townName = unslug(town);
  if (!townList.includes(townName)) notFound();

  const content = getServiceAreaTownContent(townName);
  const townSlug = slugify(townName);
  const serviceName = `${townName}, CT tent, table and chair rentals`;
  const serviceDescription = `${business.name} serves ${townName}, Connecticut with tent, table, and chair rentals, delivery, and professional setup. ${content.metaDescription}`;

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/service-areas" },
          { name: townName, path: `/service-areas/${townSlug}` },
        ]}
      />
      <ServiceSchema
        name={serviceName}
        description={serviceDescription}
        path={`/service-areas/${townSlug}`}
        serviceAreaCity={townName}
      />
      <ServiceAreaTownTemplate townName={townName} townSlug={townSlug} content={content} />
    </>
  );
}
