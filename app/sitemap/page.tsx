import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbListSchema } from "@/components/schema";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { business } from "@/lib/site-data";
import {
  buildTentInventoryPaths, getEventOccasionSitemapLinks, getPartyGuideSitemapLinks, getServiceAreaSitemapLinks,
} from "@/lib/indexable-sitemap";
import { frameTentPages } from "@/lib/tent-frame-pages";
import { largeEventTentPages } from "@/lib/tent-large-pages";

export const metadata: Metadata = createPageMetadata({
  title: "Site Map | Tent Rentals, Planning & Service Areas", description:
    "Explore Connecticut Party Rentals in one place: tent families and size pages, planning tools, party guides, events, tables and chairs, service towns, and contact paths.", path: "/sitemap", ogImage: defaultOgImagePath,
});

const sectionTitleClass =
  "text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6d3a]";
const h2Class = "mt-2 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]";
const descClass = "mt-2 max-w-2xl text-sm leading-relaxed text-stone-600";
const listClass = "mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3";
const linkClass =
  "group rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-sm font-medium text-stone-800 shadow-sm transition hover:border-[#c9a24a]/50 hover:bg-[#fffdf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2";

function LinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className={listClass}>
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className={`${linkClass} flex min-h-[48px] items-center`}>
            <span className="pr-2">{l.label}</span>
            <span className="ml-auto text-xs font-normal text-stone-400 transition group-hover:text-stone-600" aria-hidden>
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function HtmlSitemapPage() {
  const tentInventoryPaths = buildTentInventoryPaths();
  const frameLinks = tentInventoryPaths
    .filter((p) => p.startsWith("/tents/frame-tents/"))
    .map((href) => {
      const slug = href.replace("/tents/frame-tents/", "");
      const page = frameTentPages[slug];
      return { href, label: page ? `${page.sizeLabel} frame tent` : slug };
    });
  const largeLinks = tentInventoryPaths
    .filter((p) => p.startsWith("/tents/large-event-structures/"))
    .map((href) => {
      const slug = href.replace("/tents/large-event-structures/", "");
      const page = largeEventTentPages[slug];
      return { href, label: page ? `${page.sizeLabel} large event structure` : slug };
    });

  const partyGuideLinks = getPartyGuideSitemapLinks();
  const eventLinks = getEventOccasionSitemapLinks();
  const areaLinks = getServiceAreaSitemapLinks();

  const jump = [
    { href: "#main-pages", label: "Main" }, { href: "#tent-pages", label: "Tents" }, { href: "#party-guides", label: "Party guides" }, { href: "#planning-tools", label: "Planning" }, { href: "#events", label: "Events" }, { href: "#tables", label: "Tables & add-ons" }, { href: "#service-areas", label: "Service areas" }, { href: "#proof", label: "Proof" }, { href: "#contact", label: "Reserve" }, ];

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Site map", path: "/sitemap" }, ]}
      />
      <main id="main-content" tabIndex={-1} className="border-b border-stone-200 bg-gradient-to-b from-[#faf9f7] to-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Site map" }]} />
          <p className={sectionTitleClass}>Browse the full site</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
            Site map
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone-600 sm:text-lg">
            This page helps visitors and search engines explore {business.name} in one place: tent rentals and size pages, planning tools and party guides, event-specific hubs, service areas across Connecticut, and clear paths to get
            a quote.
          </p>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
            {jump.map((j) => (
              <a
                key={j.href}
                href={j.href}
                className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-sm transition hover:border-[#b78a2d]/40 hover:bg-[#fffdf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
              >
                {j.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mx-auto max-w-5xl space-y-14 px-4 pb-16 sm:space-y-16 sm:px-6 lg:px-8">
          <section id="main-pages" className="scroll-mt-28 border-t border-stone-200/80 pt-12 sm:pt-14">
            <p className={sectionTitleClass}>Main pages</p>
            <h2 className={h2Class}>Start here</h2>
            <p className={descClass}>Core entry points for quotes, trust, and high-level browsing.</p>
            <LinkList
              links={[
                { href: "/", label: "Home" }, { href: "/tent-rentals", label: "Tent rentals" }, { href: "/contact#quote", label: "Reserve party rentals online" }, { href: "/about", label: "About" }, { href: "/faq", label: "FAQ" }, { href: "/rental-inventory", label: "Rental inventory browser" }, ]}
            />
          </section>

          <section id="tent-pages" className="scroll-mt-28 border-t border-stone-200/80 pt-12 sm:pt-14">
            <p className={sectionTitleClass}>Tent rental pages</p>
            <h2 className={h2Class}>Tent systems, gallery & size pages</h2>
            <p className={descClass}>
              Hub pages describe families; size pages translate common footprints into planning language for your program.
            </p>
            <LinkList
              links={[
                { href: "/tents", label: "Tent guide hub" }, { href: "/tents/frame-tents", label: "Frame tents" }, { href: "/tents/pole-tents", label: "Pole tents" }, { href: "/tents/expandable-frame-tents", label: "Expandable frame tents" }, { href: "/tents/large-event-structures", label: "Large event structures" }, { href: "/tents/marquee-walkways", label: "Marquee walkways" }, { href: "/tents/gallery", label: "Tent gallery" }, { href: "/tent-rentals/jobsite-coverage", label: "Jobsite & coverage tents" }, ]}
            />
            <h3 className="mt-10 text-sm font-semibold text-stone-900">Frame tent size pages</h3>
            <LinkList links={frameLinks} />
            <h3 className="mt-10 text-sm font-semibold text-stone-900">Large structure size pages</h3>
            <LinkList links={largeLinks} />
          </section>

          <section id="party-guides" className="scroll-mt-28 border-t border-stone-200/80 pt-12 sm:pt-14">
            <p className={sectionTitleClass}>Party guides</p>
            <h2 className={h2Class}>Planning library</h2>
            <p className={descClass}>Layout-first articles: sizing, weather, surfaces, and event flow.</p>
            <LinkList links={[{ href: "/party-guides", label: "Party guides hub" }, ...partyGuideLinks]} />
          </section>

          <section id="planning-tools" className="scroll-mt-28 border-t border-stone-200/80 pt-12 sm:pt-14">
            <p className={sectionTitleClass}>Planning tools</p>
            <h2 className={h2Class}>Calculators, planners & checklists</h2>
            <p className={descClass}>Structured prompts and on-page tools that pair with party guides and quotes.</p>
            <LinkList
              links={[
                { href: "/planning", label: "Planning hub" }, { href: "/planning-tools", label: "Planning tools hub" }, { href: "/quick-event-planner", label: "Quick Event Planner" }, { href: "/tent-seating-reference", label: "Tent & seating reference" }, { href: "/backyard-party-checklist", label: "Backyard party checklist" }, { href: "/wishlist", label: "Catalog & reserve a tent" }, { href: "/packages/most-booked-event-setups", label: "Most-booked event setups" }, ]}
            />
          </section>

          <section id="events" className="scroll-mt-28 border-t border-stone-200/80 pt-12 sm:pt-14">
            <p className={sectionTitleClass}>Event type pages</p>
            <h2 className={h2Class}>Occasions & programs</h2>
            <p className={descClass}>Occasion guides plus dedicated hubs for weddings and corporate programs.</p>
            <LinkList
              links={[
                { href: "/events", label: "Events hub" }, { href: "/wedding-tent-rentals", label: "Wedding tent rentals" }, { href: "/corporate-event-rentals", label: "Corporate event rentals" }, ...eventLinks, ]}
            />
          </section>

          <section id="tables" className="scroll-mt-28 border-t border-stone-200/80 pt-12 sm:pt-14">
            <p className={sectionTitleClass}>Tables, chairs & add-ons</p>
            <h2 className={h2Class}>Seating, games & extras</h2>
            <p className={descClass}>Furniture and fun that usually ship with tent programs.</p>
            <LinkList
              links={[
                { href: "/table-chair-rentals", label: "Table & chair rentals" }, { href: "/party-packages", label: "Party packages" }, { href: "/av-games", label: "AV & games" }, { href: "/yard-games", label: "Yard games" }, { href: "/bounce-houses", label: "Bounce houses" }, ]}
            />
          </section>

          <section id="service-areas" className="scroll-mt-28 border-t border-stone-200/80 pt-12 sm:pt-14">
            <p className={sectionTitleClass}>Service areas</p>
            <h2 className={h2Class}>Connecticut towns we serve</h2>
            <p className={descClass}>Every link is a local landing page for delivery and setup context.</p>
            <LinkList links={[{ href: "/service-areas", label: "Service areas hub" }, ...areaLinks]} />
          </section>

          <section id="proof" className="scroll-mt-28 border-t border-stone-200/80 pt-12 sm:pt-14">
            <p className={sectionTitleClass}>Reviews & proof</p>
            <h2 className={h2Class}>Trust, process & examples</h2>
            <p className={descClass}>How we work, what customers look for, and planning templates.</p>
            <LinkList
              links={[
                { href: "/reviews-and-real-events", label: "Reviews & real events" }, { href: "/case-studies", label: "Case studies" }, { href: "/how-it-works", label: "How delivery & setup works" }, ]}
            />
          </section>

          <section id="contact" className="scroll-mt-28 border-t border-stone-200/80 pt-12 sm:pb-4 sm:pt-14">
            <p className={sectionTitleClass}>Reserve online</p>
            <h2 className={h2Class}>Talk with our team</h2>
            <p className={descClass}>Fastest path to a scoped quote when you share date, town, guest count, and flow.</p>
            <LinkList links={[{ href: "/contact", label: "Reserve online" }, { href: "/contact#quote", label: "Quote form" }]} />
          </section>
        </div>
      </main>
    </>
  );
}
