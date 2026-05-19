import Link from "next/link";
import { LocationsOverviewTrustSection } from "@/components/locations/location-trust-sections";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { locationList, locationsOverview, locationsTrustCopy } from "@/lib/locations-data";
import { business } from "@/lib/site-data";

const cardClass =
  "flex h-full flex-col rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition hover:border-[#c9a24a]/45 hover:shadow-md sm:p-7";
const listClass = "mt-4 space-y-2 text-sm text-stone-600";
const bulletClass = "mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a24a]";

export function LocationsOverview() {
  return (
    <>
      <section className="border-b border-stone-200/80 bg-gradient-to-b from-[#faf9f7] to-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Locations"
            title={locationsOverview.h1}
            intro={locationsOverview.intro}
            titleAs="h1"
            align="left"
          />

          <div className="mt-8 rounded-2xl border border-[#e3d3b0]/70 bg-[#faf8f4] p-5 sm:p-7">
            <p className="text-sm leading-relaxed text-stone-700 sm:text-base">{locationsTrustCopy.rolesIntro}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">{locationsTrustCopy.intro}</p>
          </div>

          <p className="mx-0 mt-6 max-w-3xl text-left text-sm text-stone-500">
            These are operating locations for {business.name} — not individual town service-area pages. For delivery
            towns, see our{" "}
            <Link href="/service-areas" className="font-semibold text-stone-800 underline underline-offset-2">
              service area directory
            </Link>
            .
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {locationList.map((loc) => (
              <article key={loc.slug} className={cardClass}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a6d3a]">{loc.city}, CT</p>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-stone-900 [font-family:var(--font-display)] sm:text-xl">
                  {loc.cardTitle}
                </h2>
                <p className="mt-1 text-xs font-medium text-stone-500">{loc.businessRole}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{loc.cardDescription}</p>
                <div className="mt-5 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a6d3a]">Equipment focus</p>
                  <ul className={listClass}>
                    {loc.equipmentFocus.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className={bulletClass} aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a6d3a]">Customer benefit</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{loc.customerBenefit}</p>
                </div>
                <Link href={loc.path} className={`${bookNowSectionClass} mt-6 w-full text-center`}>
                  <span className="relative z-10">{loc.ctaLabel}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LocationsOverviewTrustSection />
    </>
  );
}
