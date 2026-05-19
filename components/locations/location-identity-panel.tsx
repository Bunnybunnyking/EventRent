import Link from "next/link";
import type { CompanyLocation } from "@/lib/locations-data";
import { business } from "@/lib/site-data";
import { bookNowSectionClass } from "@/lib/cta-styles";

const labelClass = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a6d3a]";
const valueClass = "mt-1 text-sm leading-relaxed text-stone-700";
const placeholderClass = "mt-1 text-sm text-stone-500";

export function LocationIdentityPanel({ location }: { location: CompanyLocation }) {
  const addr = location.address;

  return (
    <aside className="rounded-2xl border border-[#e3d3b0]/60 bg-gradient-to-br from-[#fffefb] to-[#faf4e8]/80 p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6d3a]">Location identity</p>
      <h2 className="mt-2 text-lg font-semibold leading-snug text-stone-900 [font-family:var(--font-display)]">
        {location.pageTitle}
      </h2>
      <p className="mt-2 text-sm text-stone-600">{location.businessRole}</p>
      <p className="mt-3 rounded-lg border border-stone-200/80 bg-white/80 px-3 py-2 text-xs leading-relaxed text-stone-600">
        This location is part of <span className="font-semibold text-stone-900">{business.name}</span> — a family-owned
        Connecticut event rental company since {business.establishedYear}.
      </p>

      <dl className="mt-5 space-y-4 border-t border-stone-200/80 pt-5">
        <div>
          <dt className={labelClass}>Address</dt>
          {addr ? (
            <dd className={valueClass}>
              {addr.streetAddress}
              <br />
              {addr.addressLocality}, {addr.addressRegion}
              {addr.postalCode ? ` ${addr.postalCode}` : ""}
              {location.addressNote ? (
                <span className="mt-2 block text-xs text-stone-500">{location.addressNote}</span>
              ) : null}
            </dd>
          ) : (
            <dd className={placeholderClass}>{location.addressNote ?? `Visit address — call ${business.phone} to confirm before visiting.`}</dd>
          )}
        </div>
        <div>
          <dt className={labelClass}>Phone</dt>
          <dd className="mt-2 space-y-3">
            {location.phones.map((p) => (
              <div key={p.phoneHref}>
                <p className="text-[11px] font-medium text-stone-500">{p.label}</p>
                <a
                  href={p.phoneHref}
                  className="mt-0.5 inline-block font-semibold text-stone-900 underline decoration-[#c9a24a]/50 underline-offset-4 hover:text-[#7a5a18]"
                >
                  {p.phone}
                </a>
              </div>
            ))}
          </dd>
        </div>
        <div>
          <dt className={labelClass}>Hours</dt>
          {location.hours ? (
            <dd className={valueClass}>{location.hours}</dd>
          ) : (
            <dd className={placeholderClass}>Call for current hours at this location.</dd>
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
            <dd className={placeholderClass}>Map link — available when visit address is confirmed.</dd>
          )}
        </div>
      </dl>

      <Link href="/contact#quote" className={`${bookNowSectionClass} mt-6 w-full text-center`}>
        <span className="relative z-10">Request a Quote</span>
      </Link>
    </aside>
  );
}
