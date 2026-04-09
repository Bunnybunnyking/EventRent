import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { createPageMetadata } from "@/lib/metadata";
import { business, townList } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Connecticut Tent Rental Service Areas | Hartford County & Nearby Towns`,
  description:
    "Tent rentals near you: Hartford, West Hartford, Farmington, Glastonbury, and towns across Connecticut. Delivery and professional setup.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
        <SectionHeading
          eyebrow="Service Areas"
          title={`Connecticut towns we serve from ${business.primaryCity}`}
          intro="Looking for tent rentals near me? We provide delivery and professional setup throughout Hartford County and nearby CT communities."
          titleAs="h1"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {townList.map((town) => (
            <Link
              key={town}
              href={`/service-areas/${town.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-400"
            >
              {town} Tent Rentals
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}