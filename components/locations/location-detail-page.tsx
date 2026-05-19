import Link from "next/link";
import { LocationIdentityPanel } from "@/components/locations/location-identity-panel";
import {
  LocationCustomerBenefitSection,
  LocationMapSection,
  LocationPhotosPlaceholder,
  LocationPurposeSection,
  LocationWhyMattersSection,
} from "@/components/locations/location-trust-sections";
import { BreadcrumbListSchema, LocationLocalBusinessSchema } from "@/components/schema";
import { CTASection } from "@/components/sections";
import type { CompanyLocation } from "@/lib/locations-data";
import { locationList, locationsOverview } from "@/lib/locations-data";
import { business } from "@/lib/site-data";
import { panelClass, sectionEyebrowClass, sectionTitleClass } from "@/components/locations/location-section-styles";

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

      <section className="relative overflow-hidden border-b border-stone-200/80 bg-[#0f1113] text-stone-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(183,138,45,0.18),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-stone-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="text-stone-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={locationsOverview.path} className="text-stone-300 hover:text-white">
                  Locations
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-stone-200">{location.city}</li>
            </ol>
          </nav>
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d4a84b]">
            {business.name} · Company location
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.35rem] [font-family:var(--font-display)]">
            {location.pageTitle}
          </h1>
          <p className="mt-2 text-base font-medium text-[#e8d5b5]">{location.businessRole}</p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">{location.bodyCopy}</p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#faf9f7] to-white py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,320px)] lg:gap-12">
            <div>
              <LocationPurposeSection location={location} />

              <section className="mt-10">
                <p className={sectionEyebrowClass}>Equipment focus</p>
                <h2 className={sectionTitleClass}>Inventory & operations at this site</h2>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {location.equipmentFocus.map((item) => (
                    <li key={item} className={`${panelClass} text-sm text-stone-700`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <LocationCustomerBenefitSection location={location} />
              <LocationWhyMattersSection location={location} />
              <LocationPhotosPlaceholder />
              <LocationMapSection location={location} />

              <p className="mt-10 text-sm text-stone-600">
                <Link
                  href={locationsOverview.path}
                  className="font-semibold text-stone-900 underline decoration-[#c9a24a]/40 underline-offset-4 hover:text-[#7a5a18]"
                >
                  ← All {business.name} locations
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

            <LocationIdentityPanel location={location} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
