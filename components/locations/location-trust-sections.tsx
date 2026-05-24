import Link from "next/link";
import type { CompanyLocation } from "@/lib/locations-data";
import { locationsTrustCopy } from "@/lib/locations-data";
import {
  bulletClass,
  panelClass,
  panelMutedClass,
  sectionBodyClass,
  sectionEyebrowClass,
  sectionTitleClass,
} from "@/components/locations/location-section-styles";

export function LocationPurposeSection({ location }: { location: CompanyLocation }) {
  return (
    <section>
      <p className={sectionEyebrowClass}>What this location supports</p>
      <h2 className={sectionTitleClass}>Purpose at this site</h2>
      <p className={sectionBodyClass}>{location.businessRole}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {location.purposeItems.map((item) => (
          <li key={item} className={`${panelClass} flex gap-3 text-sm text-stone-700`}>
            <span className={bulletClass} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LocationCustomerBenefitSection({ location }: { location: CompanyLocation }) {
  return (
    <section className="mt-8">
      <p className={sectionEyebrowClass}>Customer benefit</p>
      <h2 className={sectionTitleClass}>How this location helps you</h2>
      <p className={`${sectionBodyClass} ${panelMutedClass}`}>{location.customerBenefit}</p>
    </section>
  );
}

export function LocationWhyMattersSection({ location }: { location: CompanyLocation }) {
  return (
    <section className="mt-10">
      <p className={sectionEyebrowClass}>Why this location matters</p>
      <h2 className={sectionTitleClass}>Built for real operations</h2>
      <p className={sectionBodyClass}>{location.whyThisLocationMatters}</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {locationsTrustCopy.bullets.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-stone-600">
            <span className={bulletClass} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LocationPhotosPlaceholder() {
  return (
    <section className="mt-10" aria-labelledby="location-photos-heading">
      <p className={sectionEyebrowClass}>On-site photos</p>
      <h2 id="location-photos-heading" className={sectionTitleClass}>
        Photos of this location
      </h2>
      <p className={sectionBodyClass}>
        Photos of this location, inventory, trucks, signage, and event equipment will be added here as they are
        published — helpful for customers and business verification.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {["Building & signage", "Warehouse or office interior", "Trucks & staged equipment"].map((label) => (
          <div
            key={label}
            className="flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">Photo placeholder</span>
            <span className="mt-2 text-sm text-stone-500">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LocationMapSection({ location }: { location: CompanyLocation }) {
  return (
    <section className="mt-10" aria-labelledby="location-map-heading">
      <p className={sectionEyebrowClass}>Map</p>
      <h2 id="location-map-heading" className={sectionTitleClass}>
        Find this location
      </h2>
      {location.mapsUrl ? (
        <>
          <p className={sectionBodyClass}>
            Use Google Maps for directions to this Connecticut Party Rentals location.
            {location.addressNote ? ` ${location.addressNote}` : ""}
          </p>
          <div className={`${panelMutedClass} mt-5`}>
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-[#c9a24a]/40 bg-white/60 px-4 text-center transition hover:border-[#c9a24a]/70 hover:bg-white"
            >
              <span className="text-sm font-semibold text-stone-900">Open map & directions</span>
              <span className="mt-1 text-xs text-stone-500">Google Maps</span>
            </a>
          </div>
        </>
      ) : (
        <p className={`${sectionBodyClass} ${panelMutedClass}`}>
          Map embed — available when the visit address for this center is confirmed. Call{" "}
          <a href={location.phones[0]?.phoneHref} className="font-semibold text-stone-900 underline underline-offset-2">
            {location.phones[0]?.phone}
          </a>{" "}
          for directions.
        </p>
      )}
    </section>
  );
}

export function LocationsOverviewTrustSection() {
  return (
    <section className="border-t border-stone-200/80 bg-[#111315] py-14 text-stone-100 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d4a84b]">{locationsTrustCopy.sectionTitle}</p>
        <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl [font-family:var(--font-display)]">
          Real locations. Clear roles. Better service statewide.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">{locationsTrustCopy.intro}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {locationsTrustCopy.bullets.map((item) => (
            <li key={item} className="rounded-xl border border-stone-700/80 bg-stone-900/40 px-4 py-3 text-sm text-stone-300">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-stone-400">
          <Link href="/contact#quote" className="font-semibold text-[#edc16c] underline underline-offset-2 hover:text-white">
            Request a quote
          </Link>{" "}
          — we route your event to the right team and location.
        </p>
      </div>
    </section>
  );
}
