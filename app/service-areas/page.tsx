import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { createPageMetadata } from "@/lib/metadata";
import { business, services, townList, trustPoints } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Connecticut Tent & Party Rental Service Areas | Hartford County & CT Towns",
  description:
    "Tent rentals, tables, chairs, and delivery with professional setup across Connecticut—from Hartford, West Hartford, and Farmington to Glastonbury, Cheshire, Middletown, and more. Family owned since 1974. Email info@eventrentct.com or request a quote.",
  path: "/service-areas",
});

function townSlug(town: string) {
  return town.toLowerCase().replace(/\s+/g, "-");
}

export default function ServiceAreasPage() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
        <SectionHeading
          eyebrow="Service Areas"
          title={`Connecticut towns we serve from ${business.primaryCity}`}
          intro="Party tent rentals near you: we deliver frame and pole tents, tables and chairs, lighting, and accessories throughout Hartford County and communities statewide—with the same scheduling and setup standards whether you are on a suburban lawn or a downtown lot."
          titleAs="h1"
          align="left"
        />

        {/* Primary focus: towns first */}
        <div className="mt-10 rounded-2xl border border-stone-200 bg-gradient-to-b from-stone-50 to-white p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">Browse by Connecticut town</h2>
            <p className="mt-2 text-sm text-stone-600 sm:text-base">
              Open any town for tent rental notes, typical delivery considerations, and ideas for weddings, graduations, corporate picnics, and backyard parties in that area.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {townList.map((town) => (
              <Link
                key={town}
                href={`/service-areas/${townSlug(town)}`}
                className="group flex items-center justify-between gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-[#b78a2d] hover:shadow-md"
              >
                <span className="min-w-0 text-left">
                  <span className="block leading-snug">{town}</span>
                  <span className="mt-0.5 block text-xs font-normal text-stone-500 group-hover:text-stone-600">Tent rentals</span>
                </span>
                <span className="text-xs font-medium text-[#a97a21] transition group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">What we do across Connecticut</h2>
            <p className="mt-3 text-stone-600">
              {business.name} is a full-service outdoor event rental company based in {business.primaryCity}, {business.state}. We help hosts plan weather-ready layouts with{" "}
              {business.tentSizeRange} tent footprints, seating, and add-ons—serving {business.serviceArea.toLowerCase()}.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-stone-700 sm:text-base">
              <li>
                <span className="font-medium text-stone-900">Tents & structures:</span> frame tents, pole tents, and expandable layouts for receptions, fundraisers, schools, and neighborhood gatherings.
              </li>
              <li>
                <span className="font-medium text-stone-900">Tables & chairs:</span> round, banquet, and cocktail setups coordinated with your headcount and floor plan.
              </li>
              <li>
                <span className="font-medium text-stone-900">Delivery & professional setup:</span> our crew handles transport, install, and strike so your timeline stays predictable.
              </li>
            </ul>
            <p className="mt-5 text-sm text-stone-600">
              Explore services:{" "}
              {services.map((s, i) => (
                <span key={s.href}>
                  {i > 0 ? " · " : null}
                  <Link href={s.href} className="font-medium text-[#8b6914] underline decoration-[#c9a227]/50 underline-offset-2 hover:text-stone-900">
                    {s.title}
                  </Link>
                </span>
              ))}
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">Why hosts choose us</h2>
            <ul className="mt-4 space-y-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-stone-700 sm:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a227]" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-stone-600">
              {business.heroBrandTagline}
            </p>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-stone-200 bg-stone-900 px-6 py-8 text-stone-100 sm:px-10 sm:py-10">
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">How to contact us</h2>
          <p className="mt-3 max-w-2xl text-sm text-stone-300 sm:text-base">
            Tell us your town, event date, and approximate guest count—we will respond with availability and next steps. Same-day questions? Call or text; for layouts and attachments, email works great.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-700 bg-stone-950/50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${business.email}`} className="text-lg font-semibold text-[#edc16c] underline-offset-2 hover:underline">
                  {business.email}
                </a>
              </dd>
            </div>
            <div className="rounded-xl border border-stone-700 bg-stone-950/50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Phone & text</dt>
              <dd className="mt-1">
                <a href={business.phoneHref} className="text-lg font-semibold text-[#edc16c] underline-offset-2 hover:underline">
                  {business.phone}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact#quote"
              className="inline-flex items-center justify-center rounded-full bg-[#d4a84b] px-5 py-2.5 text-sm font-semibold text-stone-950 shadow transition hover:bg-[#e4bc5f]"
            >
              Request a quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-stone-500 px-5 py-2.5 text-sm font-semibold text-stone-100 transition hover:border-stone-300 hover:bg-stone-800"
            >
              Contact page
            </Link>
          </div>
          <p className="mt-6 text-xs text-stone-500">
            {business.address}, {business.primaryCity}, {business.state} {business.postalCode}
          </p>
        </div>
      </div>
    </section>
  );
}
