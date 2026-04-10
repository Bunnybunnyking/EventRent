import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection, SectionHeading } from "@/components/sections";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Party & Event Rental Packages ${business.primaryCity} CT`,
  description:
    "Curated party rental packages in Connecticut: tents, tables, chairs, and add-ons with delivery and setup. Request a custom quote for your guest count and date.",
  path: "/party-packages",
});

const packages = [
  {
    name: "Backyard celebration",
    blurb: "Ideal for graduations, birthdays, and family gatherings when you want shelter, seating, and a simple layout.",
    includes: ["Tent sized to your space", "Tables and chairs for your guest list", "Setup and breakdown by our crew", "Guidance on layout and weather basics"],
  },
  {
    name: "Reception-style gathering",
    blurb: "Elevated flow for mingling, dining, and dancing—popular for weddings and milestone parties.",
    includes: ["Larger tent and floor plan options", "Dining and cocktail seating mix", "Lighting and accessory options available", "Coordinated delivery timing with your venue"],
  },
  {
    name: "Corporate & community",
    blurb: "Dependable packages for company picnics, school events, and outdoor programs across CT.",
    includes: ["Scalable tent and seating counts", "Professional on-site presentation", "Clear communication with your coordinator", "Add-ons such as staging or climate comfort as needed"],
  },
];

export default function PartyPackagesPage() {
  const [taglineLead, taglineClose] = business.partyPackagesTagline.split(". ");
  return (
    <>
      <section className="py-14">
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
            intro={`Family owned and operated since ${business.establishedYear}, we bundle tents, tables, chairs, and popular add-ons so planning stays simple. Every package is quoted to your date, town, and venue—not one-size-fits-all pricing surprises.`}
          />
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-stone-600">
            Unsure about footprint or weather backup? Our{" "}
            <Link href="/planning" className="font-medium text-stone-800 underline underline-offset-2">
              planning hub
            </Link>{" "}
            covers sizing, layout flow, and what to lock in first. Start from our Connecticut{" "}
            <Link href="/tent-rentals" className="font-medium text-stone-800 underline underline-offset-2">
              tent rental options
            </Link>{" "}
            and{" "}
            <Link href="/rental-inventory" className="font-medium text-stone-800 underline underline-offset-2">
              rental inventory overview
            </Link>
            , then customize with your coordinator.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <article key={pkg.name} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900">{pkg.name}</h2>
                <p className="mt-2 text-sm text-stone-600">{pkg.blurb}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-stone-700">
                  {pkg.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-[#a97a21]" aria-hidden>
                        ·
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex justify-center rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
                >
                  Request this package
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <h2 className="text-lg font-semibold text-stone-900">Mix and match</h2>
            <p className="mt-2 text-sm text-stone-600">
              Prefer to start from individual items? Explore{" "}
              <Link href="/tent-rentals" className="font-semibold text-stone-800 underline underline-offset-2">
                tent rentals
              </Link>
              ,{" "}
              <Link href="/table-chair-rentals" className="font-semibold text-stone-800 underline underline-offset-2">
                tables and chairs
              </Link>
              ,{" "}
              <Link href="/wedding-tent-rentals" className="font-semibold text-stone-800 underline underline-offset-2">
                wedding rentals
              </Link>
              , or{" "}
              <Link href="/corporate-event-rentals" className="font-semibold text-stone-800 underline underline-offset-2">
                corporate events
              </Link>
              . Milestone celebrations often start from our{" "}
              <Link href="/events/graduation-parties" className="font-semibold text-stone-800 underline underline-offset-2">
                graduation
              </Link>
              ,{" "}
              <Link href="/events/sweet-16-parties" className="font-semibold text-stone-800 underline underline-offset-2">
                Sweet 16
              </Link>
              , or{" "}
              <Link href="/events/quinceaneras" className="font-semibold text-stone-800 underline underline-offset-2">
                quinceañera
              </Link>{" "}
              planning guides—then we’ll shape a package quote that fits.
            </p>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
