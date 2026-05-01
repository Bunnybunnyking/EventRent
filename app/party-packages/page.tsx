import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection, SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

const goldCardClass =
  "flex flex-col rounded-2xl border border-[#e3d3b0]/90 bg-gradient-to-br from-[#fdf8ed] via-[#faf1dc] to-[#f2e4c4] p-6 shadow-[0_2px_20px_rgba(45,35,20,0.06)] ring-1 ring-[#d4c4a0]/25 transition hover:border-[#d4c4a0] hover:shadow-[0_4px_24px_rgba(45,35,20,0.07)]";

const goldPanelClass =
  "mt-10 rounded-2xl border border-[#e3d3b0]/55 bg-gradient-to-br from-[#fffefb] to-[#f5ebe0]/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-[#d4c4a0]/20";

const inlineLinkClass =
  "font-semibold text-[#6b5420] underline decoration-stone-300 underline-offset-2 hover:decoration-stone-600";

export const metadata = createPageMetadata({
  title: `Party & Event Rental Packages ${business.primaryCity} CT`, description:
    "Curated party rental packages in Connecticut: tents, tables, chairs, and add-ons with delivery and setup. Request a custom quote for your guest count and date.", path: "/party-packages",
});

const packages = [
  {
    name: "Backyard celebration", blurb: "Ideal for graduations, birthdays, and family gatherings when you want shelter, seating, and a simple layout.", includes: ["Tent sized to your space", "Tables and chairs for your guest list", "Setup and breakdown by our crew", "Guidance on layout and weather basics"], }, {
    name: "Reception-style gathering", blurb: "Elevated flow for mingling, dining, and dancing, popular for weddings and milestone parties.", includes: ["Larger tent and floor plan options", "Dining and cocktail seating mix", "Lighting and accessory options available", "Coordinated delivery timing with your venue"], }, {
    name: "Corporate & community", blurb: "Dependable packages for company picnics, school events, and outdoor programs across CT.", includes: ["Scalable tent and seating counts", "Professional on-site presentation", "Clear communication with your coordinator", "Add-ons such as staging or climate comfort as needed"], },
];

export default function PartyPackagesPage() {
  const [taglineLead, taglineClose] = business.partyPackagesTagline.split(". ");
  return (
    <>
      <section className="border-b border-stone-200/80 bg-gradient-to-b from-[#faf9f7] to-white py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Party Packages" }]} />
          <p className="mx-auto mt-8 max-w-3xl text-center text-[1.35rem] font-medium leading-snug tracking-tight [font-family:var(--font-display)] sm:mt-10 sm:text-2xl md:text-[1.85rem]">
            <span className="text-[#8f6820]">{taglineLead}.</span>{" "}
            <span className="text-stone-700">{taglineClose}</span>
          </p>
          <SectionHeading
            titleAs="h1"
            eyebrow="Party Packages"
            title="Rental packages built around your guest count and event style"
            intro={`Family owned and operated since ${business.establishedYear}, we bundle tents, tables, chairs, and popular add-ons so planning stays simple. Every package is quoted to your date, town, and venue, not one-size-fits-all pricing surprises.`}
          />
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-stone-600">
            Unsure about footprint or weather backup? Our{" "}
            <Link href="/planning" className={inlineLinkClass}>
              planning hub
            </Link>{" "}
            covers sizing, layout flow, and what to lock in first. Start from our Connecticut{" "}
            <Link href="/tent-rentals" className={inlineLinkClass}>
              tent rental options
            </Link>{" "}
            and{" "}
            <Link href="/rental-inventory" className={inlineLinkClass}>
              rental inventory overview
            </Link>
, then customize with your coordinator.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <article key={pkg.name} className={goldCardClass}>
                <h2 className="text-lg font-bold tracking-tight text-stone-900 [font-family:var(--font-display)]">{pkg.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{pkg.blurb}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-stone-800">
                  {pkg.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact#quote" className={`${bookNowSectionClass} mt-6 w-full justify-center text-center text-sm sm:text-[15px]`}>
                  Request this package
                </Link>
              </article>
            ))}
          </div>
          <div className={goldPanelClass}>
            <h2 className="text-lg font-bold tracking-tight text-stone-900 [font-family:var(--font-display)]">Mix and match</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Prefer to start from individual items? Explore{" "}
              <Link href="/tent-rentals" className={inlineLinkClass}>
                tent rentals
              </Link>
,{" "}
              <Link href="/table-chair-rentals" className={inlineLinkClass}>
                tables and chairs
              </Link>
,{" "}
              <Link href="/wedding-tent-rentals" className={inlineLinkClass}>
                wedding rentals
              </Link>
,{" "}
              <Link href="/corporate-event-rentals" className={inlineLinkClass}>
                corporate events
              </Link>
, or{" "}
              <Link href="/events/fundraisers-galas" className={inlineLinkClass}>
                nonprofit and community fundraisers
              </Link>
              . Milestone celebrations often start from our{" "}
              <Link href="/events/graduation-parties" className={inlineLinkClass}>
                graduation
              </Link>
,{" "}
              <Link href="/events/sweet-16-parties" className={inlineLinkClass}>
                Sweet 16
              </Link>
, or{" "}
              <Link href="/events/quinceaneras" className={inlineLinkClass}>
                quinceañera
              </Link>{" "}
              planning guides, then we’ll shape a package quote that fits.
            </p>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
