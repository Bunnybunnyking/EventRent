import Link from "next/link";
import { business } from "@/lib/site-data";
import { footerSitemapGroups } from "@/lib/indexable-sitemap";

const colTitleClass = "text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500";
const linkClass =
  "inline-flex rounded-sm text-[13px] leading-tight text-stone-400 outline-none ring-offset-2 ring-offset-[#0c0e10] transition hover:text-white focus-visible:ring-2 focus-visible:ring-[#c9a24a]";

export function Footer() {
  const year = new Date().getFullYear();
  const pageStamp = new Date();
  const pageStampIso = pageStamp.toISOString();
  const pageStampLabel = pageStamp.toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <footer className="border-t border-stone-800/80 bg-[#0c0e10] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6">
          <div className="lg:col-span-4 lg:border-r lg:border-stone-800/80 lg:pr-6">
            <p className={colTitleClass}>Est. {business.establishedYear}</p>
            <Link
              href="/"
              className="mt-2 block text-base font-semibold tracking-tight text-white transition hover:text-[#e8d5b5] [font-family:var(--font-display)] sm:text-lg"
            >
              {business.name}
            </Link>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c9a24a]">{business.celebrationTagline}</p>
            <p className="mt-0.5 text-[12px] text-stone-500">{business.locationTagline}</p>
            <p className="mt-2 max-w-md text-[13px] leading-snug text-stone-400">
              Tent and event rentals statewide: clean gear, professional setup, and fast quote support for weddings, backyards, schools, and corporate programs.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
              <a href={business.phoneHref} className={linkClass}>
                Call {business.phone}
              </a>
              <a href={business.smsHref} className={linkClass}>
                Text us
              </a>
              <a href={`mailto:${business.email}`} className={linkClass}>
                {business.email}
              </a>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-stone-500">{business.serviceArea}</p>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-end justify-between gap-2 border-b border-stone-800/70 pb-2">
              <p className={colTitleClass}>Explore</p>
              <p className="max-w-xl text-[11px] leading-snug text-stone-500">
                Full directory:{" "}
                <Link href="/sitemap" className="font-medium text-[#c9a24a] underline-offset-2 hover:text-white hover:underline">
                  HTML site map
                </Link>
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-6">
              {footerSitemapGroups.map((group) => (
                <div key={group.id} className="min-w-0">
                  <p className={colTitleClass}>{group.title}</p>
                  <ul className="mt-2 space-y-1">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={`${linkClass} block py-0.5`}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800/90 bg-[#08090a]">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 border-b border-stone-800/60 pb-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">Contact</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
              <a
                href={business.phoneHref}
                className="font-medium text-stone-300 underline-offset-2 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
              >
                {business.phone}
              </a>
              <span className="text-stone-700" aria-hidden>
                ·
              </span>
              <a
                href={business.smsHref}
                className="font-medium text-[#c9a24a] underline-offset-2 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
              >
                Text now
              </a>
              <span className="text-stone-700" aria-hidden>
                ·
              </span>
              <a
                href={`mailto:${business.email}`}
                className="break-all font-medium text-stone-300 underline-offset-2 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a] sm:break-normal"
              >
                {business.email}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] leading-snug text-stone-500">
              © {year} {business.name}
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">{business.ownership}</span>
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-stone-600">
              <Link href="/" className="font-medium text-stone-500 underline-offset-2 hover:text-stone-300 hover:underline">
                Home
              </Link>
              <span className="text-stone-700" aria-hidden>
                ·
              </span>
              <Link href="/sitemap" className="font-medium text-[#c9a24a] underline-offset-2 hover:text-stone-300 hover:underline">
                Site map
              </Link>
              <span className="text-stone-700" aria-hidden>
                ·
              </span>
              <span>
                {business.address && business.address !== "[INSERT BUSINESS ADDRESS]" ? (
                  <>
                    {business.address}, {business.primaryCity}, CT
                    {business.postalCode ? ` ${business.postalCode}` : null}
                  </>
                ) : (
                  <>
                    {business.primaryCity}, {business.state}
                  </>
                )}
              </span>
            </p>
          </div>
        </div>
        <p className="mx-auto max-w-7xl border-t border-stone-800/50 px-4 pb-3 pt-2 text-center text-[10px] leading-snug text-stone-600 sm:px-6 sm:text-left lg:px-8">
          Last updated{" "}
          <time dateTime={pageStampIso} className="text-stone-500">
            {pageStampLabel}
          </time>{" "}
          ET
        </p>
      </div>

      <div className="h-16 md:hidden" aria-hidden />
    </footer>
  );
}
