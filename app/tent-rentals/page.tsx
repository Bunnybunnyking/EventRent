import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { TentSectionTabs } from "@/components/tent-section-tabs";
import { CTASection, SectionHeading } from "@/components/sections";
import {
  ModularTentSystemsSection,
  TentAddOnsSection,
  TentPageCtaStrip,
  TentPagePlanningSummary,
  TentTypesSection,
} from "@/components/tent-page-sections";
import { ServiceSchema } from "@/components/schema";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Connecticut Tent Rentals | Frame Tents & Expandable Layouts | ${business.primaryCity}`,
  description:
    "Tent rentals in Connecticut: frame tents, large event structures, and expandable layouts with gutters. Sidewalls, lighting, flooring, dance floors, tables and chairs. Wedding and corporate tent rentals with delivery and setup.",
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
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-3" items={[{ label: "Home", href: "/" }, { label: "Tent Rentals" }]} />

          <TentSectionTabs active="tent-rentals" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="min-w-0 flex-1">
              <SectionHeading
                eyebrow="Tent rentals"
                title={`Connecticut tent rentals & custom tent layouts`}
                intro={`Choose the right tent setup for your guest count, site, and event type—weddings, graduations, backyard parties, corporate events, and school programs. Family owned and operated since ${business.establishedYear}, we help you build expandable layouts, not just rent a single box.`}
                titleAs="h1"
                align="left"
              />
            </div>
            <div className="flex w-full flex-shrink-0 flex-col gap-2 sm:flex-row sm:justify-stretch lg:w-auto lg:min-w-[240px] lg:flex-col">
              <Link
                href="/tents/gallery"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#9a7a45] bg-white px-5 py-3 text-center text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50"
              >
                View Tent Gallery
              </Link>
              <Link
                href="/contact#quote"
                className="inline-flex items-center justify-center rounded-full bg-[#b78a2d] px-5 py-3 text-center text-sm font-semibold text-[#1b1712] transition hover:bg-[#d6a645]"
              >
                Get a Tent Quote
              </Link>
            </div>
          </div>

          <TentPageCtaStrip />

          <div className="mt-10 space-y-0">
            <TentTypesSection />
            <ModularTentSystemsSection />
            <TentAddOnsSection />
            <TentPagePlanningSummary />
          </div>

          <div className="mt-14 text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Sidewalls, window walls, and hard-surface installs</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600">
              Tent sidewalls and window panels manage wind and light rain; solid sections control sun and sight lines. On asphalt, tennis courts, or pavement where stakes are not an option, weighted ballasts keep the structure secure. Read more on{" "}
              <Link href="/faq#faq-rain-plan" className="font-medium text-stone-800 underline underline-offset-2">
                rain planning
              </Link>{" "}
              or browse our{" "}
              <Link href="/tents/gallery" className="font-medium text-stone-800 underline underline-offset-2">
                gallery
              </Link>
              .
            </p>
            <figure className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
              <div className="relative aspect-[16/10] w-full md:aspect-[2.1/1]">
                <Image
                  src="/images/tent-sidewalls-window-walls-tennis-court.png"
                  alt="Connecticut frame tent with clear window sidewalls and ballast weights on a tennis court—example of tent siding and hard-surface installation"
                  fill
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="border-t border-stone-200 bg-white px-4 py-3 text-center text-sm text-stone-600">
                Frame tent with window sidewalls and ballasts on a hard surface—combine siding types with your lighting and layout plan.
              </figcaption>
            </figure>
          </div>

          <div className="mt-12 space-y-8 text-left">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Weddings & backyard celebrations</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                For outdoor receptions and private yards, we plan sight lines, dance floor placement, and backup weather so the day feels intentional. Explore{" "}
                <Link href="/wedding-tent-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                  wedding tent rentals
                </Link>{" "}
                and{" "}
                <Link href="/faq#faq-backyard-party" className="font-medium text-stone-800 underline underline-offset-2">
                  backyard party planning
                </Link>
                .
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Corporate, school & community</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Large event tent rentals for company picnics, graduations, and public programs—with load-in timing and presentation that match your run-of-show. See{" "}
                <Link href="/corporate-event-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                  corporate event rentals
                </Link>{" "}
                and{" "}
                <Link href="/party-packages" className="font-medium text-stone-800 underline underline-offset-2">
                  tent packages
                </Link>{" "}
                as starting points.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-xl font-semibold">Still deciding on size?</h2>
              <p className="mt-2 text-sm text-stone-600">
                We size tents from your guest count, seating style, and program—not guesswork. Read{" "}
                <Link href="/faq#faq-tent-size" className="font-medium text-stone-800 underline underline-offset-2">
                  how we size tents
                </Link>
                , review the{" "}
                <Link href="/rental-inventory#tent-structures" className="font-medium text-stone-800 underline underline-offset-2">
                  rental inventory overview
                </Link>
                , or{" "}
                <Link href="/contact#quote" className="font-medium text-stone-800 underline underline-offset-2">
                  request a tent quote
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact#quote" className="rounded-full bg-[#1d2124] px-5 py-3 text-sm font-semibold text-white">
              Request a tent quote
            </Link>
            <Link href="/wedding-tent-rentals" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800">
              Wedding tent rentals
            </Link>
            <Link href="/table-chair-rentals" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800">
              Tables &amp; chairs
            </Link>
            <Link href="/rental-inventory" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800">
              Full inventory list
            </Link>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
