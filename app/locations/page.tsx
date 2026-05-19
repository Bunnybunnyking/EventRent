import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { LocationsOverview } from "@/components/locations/locations-overview";
import { BreadcrumbListSchema, LocationsOverviewSchema } from "@/components/schema";
import { CTASection } from "@/components/sections";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { locationsOverview } from "@/lib/locations-data";

export const metadata: Metadata = createPageMetadata({
  title: locationsOverview.metaTitle,
  description: locationsOverview.metaDescription,
  path: locationsOverview.path,
  ogImage: defaultOgImagePath,
});

export default function LocationsPage() {
  return (
    <>
      <LocationsOverviewSchema />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: locationsOverview.path },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
      </div>
      <LocationsOverview />
      <section className="border-b border-stone-200/80 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-stone-600">
            Looking for delivery towns we serve? Browse our{" "}
            <Link href="/service-areas" className="font-semibold text-stone-900 underline underline-offset-2">
              Connecticut service areas
            </Link>{" "}
            directory — separate from these company locations.
          </p>
        </div>
      </section>
      <CTASection />
    </>
  );
}
