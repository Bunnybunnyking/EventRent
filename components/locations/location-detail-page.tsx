import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { LocationContactBlock } from "@/components/locations/location-contact-block";
import { BreadcrumbListSchema, LocationLocalBusinessSchema } from "@/components/schema";
import { CTASection } from "@/components/sections";
import type { CompanyLocation } from "@/lib/locations-data";
import { locationList, locationsOverview } from "@/lib/locations-data";

const sectionTitleClass = "text-sm font-semibold uppercase tracking-[0.14em] text-[#8a6d3a]";
const bulletClass = "mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a24a]";

export function LocationDetailPage({ location }: { location: CompanyLocation }) {
  const otherLocations = locationList.filter((l) => l.slug !== location.slug);

  return (
    <>
      <LocationLocalBusinessSchema location={location} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: locationsOverview.path },
          { name: location.city, path: location.path },
        ]}
      />

      <section className="border-b border-stone-200/80 bg-gradient-to-b from-[#faf9f7] to-white py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: locationsOverview.path },
              { label: location.city },
            ]}
          />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#a97a21]">Company location</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
            {location.pageTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone-600 sm:text-lg">{location.bodyCopy}</p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_minmax(0,280px)] lg:gap-10">
            <div>
              <h2 className={sectionTitleClass}>What this location supports</h2>
              <ul className="mt-4 space-y-3">
                {location.detailSections.map((item) => (
                  <li key={item} className="flex gap-3 rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm">
                    <span className={bulletClass} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl border border-stone-200/90 bg-[#faf8f4] p-5 sm:p-6">
                <h2 className={sectionTitleClass}>Equipment & operations</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {location.equipmentFocus.map((item) => (
                    <li key={item} className="text-sm text-stone-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 text-sm text-stone-600">
                <Link
                  href={locationsOverview.path}
                  className="font-semibold text-stone-900 underline decoration-[#c9a24a]/40 underline-offset-4 hover:text-[#7a5a18]"
                >
                  ← All Connecticut Party Rentals locations
                </Link>
              </p>

              {otherLocations.length > 0 ? (
                <div className="mt-8 border-t border-stone-200/80 pt-8">
                  <h2 className="text-sm font-semibold text-stone-900">Our other locations</h2>
                  <ul className="mt-3 flex flex-wrap gap-3">
                    {otherLocations.map((loc) => (
                      <li key={loc.slug}>
                        <Link
                          href={loc.path}
                          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-800 transition hover:border-[#c9a24a]/50 hover:bg-[#fffdf8]"
                        >
                          {loc.city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <LocationContactBlock location={location} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
