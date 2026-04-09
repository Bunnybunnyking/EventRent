import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { TentSectionTabs } from "@/components/tent-section-tabs";
import { InventoryOverviewSection } from "@/components/inventory-sections";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Rental Inventory Overview | Tents, Tables & Chairs | ${business.primaryCity} CT`,
  description:
    "Connecticut event rental inventory overview: high-capacity tents, tables, chairs, dance floor, lighting, siding, yard games, and bounce houses. Estimated counts for planning—quote confirms availability.",
  path: "/rental-inventory",
});

export default function RentalInventoryPage() {
  return (
    <>
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-3" items={[{ label: "Home", href: "/" }, { label: "Rental inventory" }]} />
          <TentSectionTabs active="inventory" />
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900">Connecticut event rental inventory overview</h1>
          <p className="mt-4 text-lg text-stone-600">
            Party rentals and event rentals in Connecticut—from{" "}
            <Link href="/tent-rentals" className="font-medium text-stone-800 underline underline-offset-2">
              tent rentals
            </Link>{" "}
            and{" "}
            <Link href="/table-chair-rentals" className="font-medium text-stone-800 underline underline-offset-2">
              table and chair rentals
            </Link>{" "}
            to dance floors, lighting, tent siding, yard games, and bounce houses. Use this page to understand our depth; your quote reflects what we can commit on your date.
          </p>
          <p className="mt-4 text-sm text-stone-600">
            Planning a{" "}
            <Link href="/wedding-tent-rentals" className="font-medium text-stone-800 underline underline-offset-2">
              wedding tent rental
            </Link>
            ,{" "}
            <Link href="/corporate-event-rentals" className="font-medium text-stone-800 underline underline-offset-2">
              corporate event
            </Link>
            , or large gathering? Start below, then{" "}
            <Link href="/contact#quote" className="font-medium text-stone-800 underline underline-offset-2">
              request a quote
            </Link>{" "}
            for availability.
          </p>
        </div>
      </section>
      <InventoryOverviewSection />
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/contact#quote" className="inline-flex rounded-full bg-[#b78a2d] px-6 py-3 text-sm font-semibold text-[#1b1712] transition hover:bg-[#d6a645]">
            Request a quote for your date
          </Link>
        </div>
      </section>
    </>
  );
}
