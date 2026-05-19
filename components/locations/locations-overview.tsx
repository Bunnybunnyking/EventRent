import Link from "next/link";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { locationList, locationsOverview } from "@/lib/locations-data";

const cardClass =
  "flex h-full flex-col rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition hover:border-[#c9a24a]/45 hover:shadow-md sm:p-7";
const listClass = "mt-4 space-y-2 text-sm text-stone-600";
const bulletClass = "mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a24a]";

export function LocationsOverview() {
  return (
    <section className="border-b border-stone-200/80 bg-gradient-to-b from-[#faf9f7] to-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Locations"
          title={locationsOverview.h1}
          intro={locationsOverview.intro}
          titleAs="h1"
          align="left"
        />
        <p className="mx-0 mt-4 max-w-3xl text-left text-sm text-stone-500">
          These pages describe our company locations — warehouses, customer centers, and coordination offices — not
          individual town service-area pages.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {locationList.map((loc) => (
            <article key={loc.slug} className={cardClass}>
              <h2 className="text-lg font-semibold leading-snug text-stone-900 [font-family:var(--font-display)] sm:text-xl">
                {loc.cardTitle}
              </h2>
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
              </div>
              <Link href={loc.path} className={`${bookNowSectionClass} mt-6 w-full text-center`}>
                <span className="relative z-10">{loc.ctaLabel}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
