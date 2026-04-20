import Link from "next/link";
import { business, eventOccasionGuideLinks, footerServiceLinks, townList } from "@/lib/site-data";

/** Company, process, and proof—kept separate from rental “Services” to avoid duplicate links. */
const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact#quote", label: "Contact & quote" },
  { href: "/how-it-works", label: "Delivery & setup" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/tents/gallery", label: "Tent gallery" },
  { href: "/reviews-and-real-events", label: "Reviews & events" },
  { href: "/case-studies", label: "Case studies" },
];

const planningEntryLinks = [
  { href: "/party-guides", label: "Party guides" },
  { href: "/planning", label: "Planning hub" },
  { href: "/quick-event-planner", label: "Quick Event Planner" },
  { href: "/backyard-party-checklist", label: "Party checklist" },
];

const faqTopicLinks = [
  { href: "/faq#faq-tent-size", label: "Tent sizing" },
  { href: "/faq#faq-tent-capacity", label: "Guest capacity" },
  { href: "/faq#faq-booking-process", label: "How to book" },
  { href: "/faq#faq-hard-surface-anchoring", label: "Driveways & courts" },
  { href: "/faq#faq-lawn-utilities", label: "Lawn & utilities" },
  { href: "/faq#faq-rain-plan", label: "Rain backup" },
  { href: "/faq#faq-delivery-setup", label: "Delivery & setup" },
  { href: "/faq#faq-pricing", label: "Pricing" },
  { href: "/faq#faq-backyard-party", label: "Backyard parties" },
];

const colTitleClass = "text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500";
const linkClass =
  "inline-flex rounded-sm text-sm leading-snug text-stone-400 outline-none ring-offset-2 ring-offset-[#0c0e10] transition hover:text-white focus-visible:ring-2 focus-visible:ring-[#c9a24a]";
const linkGridClass = "grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2";

function townHref(town: string) {
  return `/service-areas/${town.toLowerCase().replace(/\s+/g, "-")}`;
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-800/80 bg-[#0c0e10] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          {/* Brand + contact */}
          <div className="lg:col-span-3">
            <p className={colTitleClass}>Est. {business.establishedYear}</p>
            <Link
              href="/"
              className="mt-3 block text-lg font-semibold tracking-tight text-white transition hover:text-[#e8d5b5] [font-family:var(--font-display)]"
            >
              {business.name}
            </Link>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#c9a24a]">{business.celebrationTagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              Tent and event rentals statewide: clean gear, professional setup, and fast quote support for weddings, backyards, schools, and corporate programs.
            </p>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex flex-wrap gap-x-2">
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a href={business.phoneHref} className={linkClass}>
                    {business.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-stone-500">Email</dt>
                <dd>
                  <a href={`mailto:${business.email}`} className={linkClass}>
                    {business.email}
                  </a>
                </dd>
              </div>
              <div className="pt-1 text-xs leading-relaxed text-stone-500">{business.serviceArea}</div>
            </dl>
            <p className="mt-6">
              <Link href="/" className={`${linkClass} text-xs font-medium uppercase tracking-wide text-stone-500 hover:text-stone-300`}>
                ← Back to home
              </Link>
            </p>
          </div>

          {/* Services — two columns to use width */}
          <div className="lg:col-span-5">
            <p className={colTitleClass}>Services</p>
            <ul className={`${linkGridClass} mt-4`}>
              {footerServiceLinks.map((link) => (
                <li key={link.href} className="min-w-0">
                  <Link href={link.href} className={`${linkClass} block`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <p className={colTitleClass}>Company</p>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas — dense grid */}
          <div className="lg:col-span-2">
            <p className={colTitleClass}>Areas we serve</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
              {townList.map((town) => (
                <li key={town} className="min-w-0">
                  <Link href={townHref(town)} className={`${linkClass} block truncate`} title={town}>
                    {town}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <Link href="/service-areas" className="text-xs font-semibold text-[#c9a24a] underline-offset-2 transition hover:text-white hover:underline">
                All service areas →
              </Link>
            </p>
          </div>
        </div>

        {/* Planning band — full width, three balanced columns */}
        <div className="mt-14 border-t border-white/[0.08] pt-12 lg:mt-16 lg:pt-14">
          <p className={colTitleClass}>Planning & resources</p>
          <div className="mt-6 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            <div>
              <p className="text-xs font-semibold text-stone-500">Get started</p>
              <ul className={`${linkGridClass} mt-3 md:grid-cols-1`}>
                {planningEntryLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-500">FAQ topics</p>
              <ul className={`${linkGridClass} mt-3`}>
                {faqTopicLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-500">Occasion guides</p>
              <ul className={`${linkGridClass} mt-3 md:grid-cols-1`}>
                {eventOccasionGuideLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800/90 bg-[#08090a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4 lg:px-8">
          <p className="text-xs leading-relaxed text-stone-500">
            © {year} {business.name}
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">{business.ownership}</span>
          </p>
          <p className="text-xs text-stone-600">
            {business.primaryCity}, {business.state}
            {business.address && business.address !== "[INSERT BUSINESS ADDRESS]" ? ` · ${business.address}` : null}
          </p>
        </div>
      </div>

      {/* Space for fixed mobile CTA */}
      <div className="h-20 md:hidden" aria-hidden />
    </footer>
  );
}
