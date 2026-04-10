import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { TentSectionTabs } from "@/components/tent-section-tabs";
import { ServiceSchema } from "@/components/schema";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Jobsite Tent Rentals & Heat Relief | Shade & Hydration Stations | ${business.primaryCity} CT`,
  description:
    "Contractor-focused jobsite tent rentals in Connecticut: shade stations, hydration stations, and heat relief packages for roofing, construction, paving, and landscaping crews. Extended 14-day construction tent rates, delivery and setup.",
  path: "/tent-rentals/jobsite-coverage",
});

const packages = [
  {
    name: "Shade Station",
    price: "Starting at $300",
    items: ["Tent coverage", "Delivery", "Setup", "Pickup"],
  },
  {
    name: "Hydration Station",
    price: "Starting at $425",
    items: [
      "Tent coverage",
      "Coolers",
      "Water",
      "Ice",
      "Cups",
      "Table",
      "Delivery, setup, and pickup",
    ],
  },
  {
    name: "Heat Relief Station",
    price: "Starting at $625",
    items: [
      "Tent coverage",
      "Coolers",
      "Water",
      "Ice",
      "Cups",
      "Table",
      "Fan or misting fan options",
      "Delivery, setup, and pickup",
    ],
  },
] as const;

const fourteenDayRates: { size: string; price: string }[] = [
  { size: "10' x 10'", price: "$495" },
  { size: "10' x 20'", price: "$600" },
  { size: "10' x 30'", price: "$900" },
  { size: "20' x 20'", price: "$1,200" },
  { size: "20' x 30'", price: "$1,800" },
  { size: "20' x 40'", price: "$2,400" },
  { size: "20' x 50'", price: "$3,000" },
  { size: "30' x 30'", price: "$2,700" },
  { size: "30' x 40'", price: "$3,600" },
  { size: "30' x 50'", price: "$4,500" },
  { size: "40' x 40'", price: "$4,800" },
];

const coverageGuide = [
  {
    title: "10x10 Tent",
    body: "Ideal for small break areas, quick shade coverage, and smaller crews.",
  },
  {
    title: "10x20 Tent",
    body: "Great for roofing crews and medium-size outdoor jobs needing shaded break space.",
  },
  {
    title: "20x20 Tent",
    body: "Best for larger crews, lunch areas, and extended jobsite coverage.",
  },
] as const;

const addOns = [
  "Extra coolers",
  "Additional water and ice",
  "Tables and chairs",
  "Fans",
  "Misting fans",
  "Sidewalls",
  "Refill service for longer jobs",
];

const bestFor = [
  "Roofing crews",
  "Construction sites",
  "Paving crews",
  "Landscaping teams",
  "Exterior renovation crews",
  "Utility and maintenance crews",
];

export default function JobsiteCoveragePage() {
  return (
    <>
      <ServiceSchema
        name="Jobsite tent rentals and heat relief stations"
        description="Temporary tent coverage, hydration stations, and heat relief packages for Connecticut contractors—roofing, construction, paving, landscaping, and outdoor crews. Delivery, setup, and extended 14-day jobsite rentals."
        path="/tent-rentals/jobsite-coverage"
      />
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-3"
            items={[
              { label: "Home", href: "/" },
              { label: "Tent Rentals", href: "/tent-rentals" },
              { label: "Jobsite Coverage" },
            ]}
          />

          <TentSectionTabs active="jobsite-coverage" />

          <div className="rounded-2xl border border-stone-200/90 bg-white/80 px-5 py-6 shadow-sm sm:px-8 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a97a21]">Tent Rentals</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Jobsite Coverage</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-600">
              Temporary tent coverage for outdoor job sites that need reliable shade, organized hydration, and heat-relief staging—planned for active crews, tight schedules, and real-world site conditions across Connecticut.
            </p>
          </div>

          <div className="mt-10 space-y-4 text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Jobsite Heat &amp; Hydration Stations</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-stone-600">
              Summer heat and long shifts put crews at risk when there is nowhere to cool down or refill water. We deliver temporary tent coverage sized for your laydown area—so roofing, construction, paving, and landscaping teams get consistent shade, a defined hydration point, and a professional setup that stays put for the job duration. Tell us your crew size, site access, and schedule; we recommend a station layout and rental window that fits how you actually work.
            </p>
            <p className="rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm font-medium text-stone-800">
              Minimum jobsite rental order: <span className="font-semibold">$300</span>
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-stone-900">Jobsite packages</h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-stone-600">
              Shade, hydration, and heat relief bundles—delivery, setup, and pickup handled by our team unless noted.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {packages.map((pkg) => (
                <article
                  key={pkg.name}
                  className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold text-stone-900">{pkg.name}</h3>
                  <ul className="mt-4 flex-1 space-y-2 text-sm text-stone-600">
                    {pkg.items.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7a45]" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-stone-100 pt-4 text-sm font-semibold text-stone-900">{pkg.price}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Extended Construction Tent Rentals</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600">
              These are <strong className="font-semibold text-stone-800">14-day jobsite tent rental</strong> rates for roofing, construction, exterior work, crew break areas, staging, and temporary weather coverage—built for longer runs on active sites, not single-day parties.
            </p>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
              <table className="min-w-full text-left text-sm" aria-label="14-day jobsite tent rental rates by size">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50/90">
                    <th scope="col" className="px-4 py-3 font-semibold text-stone-900">
                      Tent size
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-stone-900">
                      Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fourteenDayRates.map((row) => (
                    <tr key={row.size} className="border-b border-stone-100 last:border-0">
                      <td className="px-4 py-2.5 text-stone-700">{row.size}</td>
                      <td className="px-4 py-2.5 font-medium text-stone-900">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm font-medium text-stone-800">Additional one-time delivery fee: $195 per tent</p>
            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-stone-500">
              14-day jobsite pricing shown above is part of our extended-use construction rental program. Delivery, setup, site conditions, and availability may affect final quote.
            </p>
          </div>

          <div className="mt-14">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-stone-900">Tent Coverage Guide</h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-stone-600">
              Quick reference for common jobsite footprints—your quote may combine sizes or add sidewalls and accessories.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {coverageGuide.map((card) => (
                <article key={card.title} className="rounded-2xl border border-stone-200 bg-stone-50/80 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-stone-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-stone-900">Available Add-Ons</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {addOns.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-stone-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7a45]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-stone-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {bestFor.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 shadow-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <section className="mt-14 rounded-3xl bg-gradient-to-r from-[#1a1d20] to-[#272b30] p-8 text-stone-100 md:p-10" aria-labelledby="jobsite-cta-heading">
            <h2 id="jobsite-cta-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Need Tent Coverage for Your Next Jobsite?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Ask about Shade Station, Hydration Station, and Heat Relief packages—or lock in extended construction tent rentals with 14-day jobsite pricing. Share your site, dates, and crew size; we will recommend coverage that fits the work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact#quote" className={bookNowSectionClass}>
                Book Now
              </Link>
              <Link href="/tent-rentals" className="rounded-full border border-stone-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
                Event tent rentals
              </Link>
            </div>
          </section>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-stone-200/80 pt-8">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Book Now
            </Link>
            <Link href="/rental-inventory" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800">
              Full inventory list
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
