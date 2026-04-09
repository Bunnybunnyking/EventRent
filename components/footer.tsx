import Link from "next/link";
import { business, footerServiceLinks, townList } from "@/lib/site-data";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact#quote", label: "Contact & quote" },
  { href: "/rental-inventory", label: "Rental inventory" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/tents/gallery", label: "Tent gallery" },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#0f1113] pb-24 pt-14 text-stone-300 md:pb-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{business.name}</p>
          <Link href="/" className="mt-1 inline-block text-sm font-medium text-stone-400 transition hover:text-stone-200">
            Back to home
          </Link>
          <p className="brand-tagline mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#c9a24a]">{business.celebrationTagline}</p>
          <p className="mt-3 text-sm leading-relaxed">
            {business.name} delivers tent and event rentals across the state with clean equipment, dependable setup crews, and fast quote support.
          </p>
          <p className="mt-4 text-sm">
            <a href={business.phoneHref} className="transition hover:text-white">
              {business.phone}
            </a>
          </p>
          <p className="text-sm">Email: {business.email}</p>
        </div>
        <div>
          <p className="font-medium text-white">Services</p>
          <ul className="mt-3 space-y-2 text-sm">
            {footerServiceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-white">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-white">Popular CT towns</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {townList.slice(0, 12).map((town) => (
              <li key={town}>
                <Link href={`/service-areas/${town.toLowerCase().replace(/\s+/g, "-")}`} className="transition hover:text-white">
                  {town}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs">
            <Link href="/service-areas" className="text-[#c9a24a] underline underline-offset-2 transition hover:text-white">
              All Connecticut service areas →
            </Link>
          </p>
        </div>
        <div>
          <p className="font-medium text-white">Planning</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/faq#faq-tent-size" className="transition hover:text-white">
                Tent sizing
              </Link>
            </li>
            <li>
              <Link href="/faq#faq-tent-capacity" className="transition hover:text-white">
                Guest capacity
              </Link>
            </li>
            <li>
              <Link href="/faq#faq-booking-process" className="transition hover:text-white">
                How to book
              </Link>
            </li>
            <li>
              <Link href="/faq#faq-hard-surface-anchoring" className="transition hover:text-white">
                Driveways &amp; courts
              </Link>
            </li>
            <li>
              <Link href="/faq#faq-lawn-utilities" className="transition hover:text-white">
                Lawn &amp; utilities
              </Link>
            </li>
            <li>
              <Link href="/faq#faq-rain-plan" className="transition hover:text-white">
                Rain backup
              </Link>
            </li>
            <li>
              <Link href="/faq#faq-delivery-setup" className="transition hover:text-white">
                Delivery &amp; setup
              </Link>
            </li>
            <li>
              <Link href="/faq#faq-pricing" className="transition hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/faq#faq-backyard-party" className="transition hover:text-white">
                Backyard parties
              </Link>
            </li>
            <li>
              <Link href="/faq#faq-graduation-events" className="transition hover:text-white">
                Graduations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
