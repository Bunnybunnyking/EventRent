import { formatWeeklyHoursLines } from "@/lib/location-hours";
import { locationHoursDisplay, type CompanyLocation } from "@/lib/locations-data";
import { business } from "@/lib/site-data";
import { LocationCtaLink } from "@/components/locations/location-cta-link";

const labelClass = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a6d3a]";
const valueClass = "mt-1 text-sm leading-relaxed text-stone-700";
const placeholderClass = "mt-1 text-sm text-stone-500";
const linkClass =
  "mt-0.5 inline-block font-semibold text-stone-900 underline decoration-[#c9a24a]/50 underline-offset-4 hover:text-[#7a5a18]";

type LocationIdentityPanelProps = {
  location: CompanyLocation;
  className?: string;
};

export function LocationIdentityPanel({ location, className = "" }: LocationIdentityPanelProps) {
  const addr = location.address;
  const hoursText = locationHoursDisplay(location);
  const hoursLines = location.hoursSchedule ? formatWeeklyHoursLines(location.hoursSchedule) : null;

  return (
    <aside
      className={`rounded-2xl border border-[#e3d3b0]/60 bg-gradient-to-br from-[#fffefb] to-[#faf4e8]/80 p-5 shadow-sm sm:p-6 lg:sticky lg:top-24 ${className}`.trim()}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6d3a]">Visit & contact</p>
      <h2 className="mt-2 text-lg font-semibold leading-snug text-stone-900 [font-family:var(--font-display)]">
        {location.city}, CT
      </h2>
      <p className="mt-1 text-sm text-stone-600">{location.businessRole}</p>

      <dl className="mt-4 space-y-3.5">
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
            <dd className={placeholderClass}>
              {location.addressNote ?? `Visit address — call ${business.phone} to confirm before visiting.`}
            </dd>
          )}
        </div>
        <div>
          <dt className={labelClass}>Phone</dt>
          <dd className="mt-2 space-y-3">
            {location.phones.map((p) => (
              <div key={p.phoneHref}>
                <p className="text-[11px] font-medium text-stone-500">{p.label}</p>
                <a href={p.phoneHref} className={linkClass}>
                  {p.phone}
                </a>
              </div>
            ))}
          </dd>
        </div>
        <div>
          <dt className={labelClass}>Email</dt>
          <dd className={valueClass}>
            <p className="text-[11px] font-medium text-stone-500">{location.email.label}</p>
            <a href={`mailto:${location.email.address}`} className={linkClass}>
              {location.email.address}
            </a>
          </dd>
        </div>
        <div>
          <dt className={labelClass}>Hours</dt>
          {hoursLines ? (
            <dd className={valueClass}>
              <ul className="mt-1 space-y-1">
                {hoursLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-stone-500">Matches this location on Google Maps.</p>
            </dd>
          ) : hoursText ? (
            <dd className={valueClass}>
              <p>{hoursText}</p>
              {location.mapsUrl ? (
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-2`}>
                  View on Google Maps
                </a>
              ) : null}
            </dd>
          ) : (
            <dd className={placeholderClass}>Call for current hours at this location.</dd>
          )}
        </div>
        <div>
          <dt className={labelClass}>Directions</dt>
          {location.mapsUrl ? (
            <dd className={valueClass}>
              <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Open in Google Maps
              </a>
            </dd>
          ) : (
            <dd className={placeholderClass}>Map link — available when visit address is confirmed.</dd>
          )}
        </div>
      </dl>

      <LocationCtaLink href="/contact#quote" variant="panel" className="mt-6">
        Request a Quote
      </LocationCtaLink>
    </aside>
  );
}
