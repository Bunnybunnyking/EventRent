import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { TentSectionTabs } from "@/components/tent-section-tabs";
import { CTASection, SectionHeading } from "@/components/sections";
import {
  ModularTentSystemsSection,
  TentAddOnsSection,
  TentPageCtaStrip,
  TentTypesSection,
} from "@/components/tent-page-sections";
import { BreadcrumbListSchema, ServiceSchema } from "@/components/schema";
import { TentRentalsResourceTabs } from "@/components/tent-rentals-resource-tabs";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Connecticut Tent Rentals | Frame Tents & Expandable Layouts | ${business.primaryCity}`,
  description:
    "Connecticut tent rentals: frame tents, modular layouts, large structures, sidewalls, lighting, tables, and chairs. One page for event tents, add-ons, jobsite summary, and inventory—delivery and setup statewide.",
  path: "/tent-rentals",
});

export default function TentRentalsPage() {
  return (
    <>
      <ServiceSchema
        name="Tent rentals in Connecticut"
        description="Frame tents, modular and expandable tent layouts with gutters, sidewalls, lighting, and coordinated event rentals for weddings, corporate events, and private parties across Connecticut."
        path="/tent-rentals"
      />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tent rentals", path: "/tent-rentals" },
        ]}
      />
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-4" items={[{ label: "Home", href: "/" }, { label: "Tent Rentals" }]} />

          <TentSectionTabs active="tent-rentals" />

          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1">
              <SectionHeading
                eyebrow={`Connecticut · Est. ${business.establishedYear}`}
                title="Tent rentals & layout-ready structures"
                intro={`Frame tents, modular bays, and large clear-span structures—quoted to your guest count, site, and program. Browse rental inventory from the gold control in the site header on the homepage, or the Browse inventory button on the Tent guide page, or scroll for systems and add-ons and the guide tabs for families and jobsite tents.`}
                titleAs="h1"
                align="left"
              />
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row sm:items-center lg:w-auto lg:flex-col lg:items-stretch">
              <Link
                href="/tents/gallery"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-[#9a7a45] bg-white px-5 py-2.5 text-center text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50"
              >
                Gallery
              </Link>
              <Link href="/contact#quote" className={`${bookNowSectionClass} min-h-[44px] w-full justify-center text-center sm:w-auto`}>
                Book now
              </Link>
            </div>
          </div>

          <TentPageCtaStrip />

          <div className="mt-8 space-y-0">
            <TentTypesSection />
            <ModularTentSystemsSection />
            <TentAddOnsSection />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h2 className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">Sidewalls &amp; hard surfaces</h2>
              <p className="mt-2 text-sm leading-snug text-stone-600">
                Window and solid siding manage wind, rain, and sight lines. On courts or pavement, ballasts replace stakes.{" "}
                <Link href="/faq#faq-rain-plan" className="font-medium text-stone-800 underline underline-offset-2">
                  Rain planning
                </Link>
                {" · "}
                <Link href="/tents/gallery" className="font-medium text-stone-800 underline underline-offset-2">
                  Gallery
                </Link>
              </p>
              <figure className="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm">
                <div className="relative aspect-[16/11] w-full sm:aspect-[16/9] md:aspect-[2.1/1]">
                  <Image
                    src="/images/tent-sidewalls-window-walls-tennis-court.png"
                    alt="Frame tent with clear window sidewalls and ballast weights on a tennis court in Connecticut"
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="border-t border-stone-200 bg-white px-3 py-2 text-center text-xs text-stone-600 sm:text-sm">
                  Window walls + ballasts: typical hard-surface approach.
                </figcaption>
              </figure>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5">
              <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-stone-900">Weddings &amp; backyards</h3>
                <p className="mt-1.5 text-xs leading-snug text-stone-600 sm:text-sm">
                  Flow, dance floor, and weather backup—{" "}
                  <Link href="/wedding-tent-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                    wedding tents
                  </Link>
                  ,{" "}
                  <Link href="/faq#faq-backyard-party" className="font-medium text-stone-800 underline underline-offset-2">
                    backyard FAQ
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-stone-900">Corporate &amp; schools</h3>
                <p className="mt-1.5 text-xs leading-snug text-stone-600 sm:text-sm">
                  Picnics, graduations, public programs—{" "}
                  <Link href="/corporate-event-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                    corporate rentals
                  </Link>
                  ,{" "}
                  <Link href="/party-packages" className="font-medium text-stone-800 underline underline-offset-2">
                    packages
                  </Link>
                  .
                </p>
              </div>
              <p className="rounded-xl border border-stone-200/80 bg-stone-50 px-4 py-3 text-xs leading-snug text-stone-600 sm:text-sm">
                <span className="font-semibold text-stone-800">Sizing:</span>{" "}
                <Link href="/faq#faq-tent-size" className="font-medium text-stone-800 underline underline-offset-2">
                  How we size tents
                </Link>
                {" · "}
                <Link href="/rental-inventory#tent-structures" className="font-medium text-stone-800 underline underline-offset-2">
                  Tent inventory
                </Link>
                {" · "}
                <Link href="/contact#quote" className="font-medium text-stone-800 underline underline-offset-2">
                  Get a quote
                </Link>
              </p>
            </div>
          </div>

          <TentRentalsResourceTabs />
        </div>
      </section>
      <CTASection />
    </>
  );
}
