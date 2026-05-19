import Link from "next/link";
import type { CompanyLocation } from "@/lib/locations-data";
import { business } from "@/lib/site-data";

const labelClass = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a6d3a]";
const valueClass = "mt-1 text-sm leading-relaxed text-stone-700";
const placeholderClass = "mt-1 text-sm italic text-stone-500";

export function LocationContactBlock({ location }: { location: CompanyLocation }) {
  const addr = location.address;

  return (
    <aside className="rounded-2xl border border-stone-200/90 bg-[#faf8f4] p-5 sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-900">Visit & contact</h2>
      <dl className="mt-4 space-y-4">
        <div>
          <dt className={labelClass}>Address</dt>
          {addr?.streetAddress ? (
            <dd className={valueClass}>
              {addr.streetAddress}
              <br />
              {addr.addressLocality}, {addr.addressRegion}
              {addr.postalCode ? ` ${addr.postalCode}` : ""}
            </dd>
          ) : (
            <dd className={placeholderClass}>
              Street address for {location.city} — contact us or check back; full address coming soon.
            </dd>
          )}
        </div>
        <div>
          <dt className={labelClass}>Phone</dt>
          <dd className={valueClass}>
            <a
              href={location.phoneHref}
              className="font-semibold text-stone-900 underline decoration-[#c9a24a]/50 underline-offset-4 hover:text-[#7a5a18]"
            >
              {location.phone}
            </a>
            <span className="block text-xs text-stone-500">Shared line for {business.name}</span>
          </dd>
        </div>
        <div>
          <dt className={labelClass}>Hours</dt>
          {location.hours ? (
            <dd className={valueClass}>{location.hours}</dd>
          ) : (
            <dd className={placeholderClass}>Hours — call for current office and warehouse hours.</dd>
          )}
        </div>
        <div>
          <dt className={labelClass}>Directions</dt>
          {location.mapsUrl ? (
            <dd className={valueClass}>
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-stone-900 underline decoration-[#c9a24a]/50 underline-offset-4 hover:text-[#7a5a18]"
              >
                Open in Google Maps
              </a>
            </dd>
          ) : (
            <dd className={placeholderClass}>Map link — available soon for this location.</dd>
          )}
        </div>
      </dl>
      <p className="mt-5 text-xs leading-relaxed text-stone-500">
        Questions about this location?{" "}
        <Link
          href="/contact#quote"
          className="font-medium text-stone-800 underline underline-offset-2 hover:text-stone-950"
        >
          Book a consultation
        </Link>
        .
      </p>
    </aside>
  );
}

