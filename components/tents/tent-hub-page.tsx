import Link from "next/link";
import { SectionHeading } from "@/components/sections";
import { bookNowHeaderClass, browseInventoryHeaderClass } from "@/lib/cta-styles";
import { cardRowHintClass, interactiveCardClass, interactiveTileClass } from "@/lib/interactive-styles";
import { business } from "@/lib/site-data";
import {
  tentComparisonRows,
  tentFamilies,
  tentHubPopularSizes,
  tentInventoryCopy,
} from "@/lib/tent-section-data";
import { TentImagePlaceholder } from "./tent-image-placeholder";
import { TentPlannerCallout } from "./tent-planner-callout";

export function TentHubPage() {
  return (
    <>
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-4 sm:py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="sr-only">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Tents</li>
            </ol>
          </nav>

          <div className="mb-4 rounded-2xl border border-[#c9a87a]/55 bg-gradient-to-br from-[#fcf6e8] via-[#f4e4c4] to-[#e9d5b0] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_28px_rgba(139,106,52,0.08)] sm:p-4">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5 lg:gap-6">
              <Link
                href="/rental-inventory"
                className={`group shrink-0 ${browseInventoryHeaderClass} w-full justify-center sm:w-auto`}
                title="Open the full rental catalog"
              >
                <span className="relative z-10">Browse inventory</span>
                <span className="relative z-10 ml-1.5 transition group-hover:translate-x-0.5" aria-hidden="true">
                  →
                </span>
              </Link>
              <div className="min-w-0 flex-1 border-t border-[#b8935c]/35 pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <p className="text-[0.78rem] leading-snug text-stone-800 sm:text-[0.8125rem] sm:leading-relaxed">
                  Open the live catalog for{" "}
                  <Link href="/rental-inventory#inv-tents" className="font-semibold text-[#5c4518] underline decoration-[#a67c28]/45 underline-offset-2 transition hover:text-stone-950">
                    tents
                  </Link>
                  ,{" "}
                  <Link href="/rental-inventory#inv-chairs" className="font-semibold text-[#5c4518] underline decoration-[#a67c28]/45 underline-offset-2 transition hover:text-stone-950">
                    chairs
                  </Link>
                  ,{" "}
                  <Link href="/rental-inventory#inv-tables" className="font-semibold text-[#5c4518] underline decoration-[#a67c28]/45 underline-offset-2 transition hover:text-stone-950">
                    tables
                  </Link>
                  , and{" "}
                  <Link href="/rental-inventory#inv-lighting-heating" className="font-semibold text-[#5c4518] underline decoration-[#a67c28]/45 underline-offset-2 transition hover:text-stone-950">
                    lighting &amp; heating
                  </Link>
                  , plus{" "}
                  <Link href="/rental-inventory#inv-tent-guide" className="font-semibold text-[#5c4518] underline decoration-[#a67c28]/45 underline-offset-2 transition hover:text-stone-950">
                    tent types
                  </Link>{" "}
                  and{" "}
                  <Link href="/rental-inventory#inv-planning" className="font-semibold text-[#5c4518] underline decoration-[#a67c28]/45 underline-offset-2 transition hover:text-stone-950">
                    planning notes
                  </Link>
                  —so you can see what we carry before you request a quote.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="min-w-0 max-w-3xl">
              <SectionHeading
                eyebrow="Tents"
                title="Connecticut Tent Rentals & The Largest Tent Fleet in CT"
                intro={`Choose a tent family and size with real layout logic: clear-span frame tents, expandable systems, pole tents, large structures, and marquee walkways. Family owned since ${business.establishedYear}.`}
                titleAs="h1"
                align="left"
                compact
              />
              <p className="mt-2.5 max-w-3xl text-left text-sm font-semibold leading-snug text-stone-800 sm:text-[0.9375rem] sm:leading-relaxed">
                We have <span className="whitespace-nowrap">87,000 square feet</span> of tent coverage and{" "}
                <span className="whitespace-nowrap">16.6 miles</span> of tent canopy—one of the largest tent fleets in Connecticut.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row lg:flex-col">
              <Link
                href="/tent-rentals#tent-resource-tabs"
                className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-[#9a7a45]/90 bg-white/95 px-3 py-1.5 text-center text-xs font-semibold leading-tight text-stone-900 shadow-sm transition hover:border-[#b78a2d] hover:bg-white sm:min-h-0 sm:px-3.5 sm:py-2"
              >
                Tent rentals + guide tabs
              </Link>
              <Link href="/contact#quote" className={`${bookNowHeaderClass} justify-center text-center text-xs`}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-7 sm:py-9">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900 sm:text-3xl">Tent families</h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            Start with how your event moves: cocktail, seated dinner, ceremony, dinner plus dance, then right-size the footprint. Inventory-aware guidance, not generic boilerplate.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tentFamilies.map((f) => (
              <Link
                key={f.slug}
                href={f.path}
                className={`${interactiveCardClass} group flex flex-col p-6`}
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900 group-hover:text-stone-950">
                  {f.shortTitle}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{f.intro}</p>
                <span className={cardRowHintClass}>
                  Explore family <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#faf8f5] py-7 sm:py-9">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">What type of tent is right for your event?</h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            If you need clear-span seating and dance space, start with frame or expandable systems. If you want a classic peaked look and can plan around center poles, pole tents may fit. For arrivals and weather-protected flow, add marquee walkways.
          </p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-stone-200 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-3">Family</th>
                  <th className="px-4 py-3">Best for</th>
                  <th className="px-4 py-3">Interior</th>
                  <th className="px-4 py-3">Surfaces</th>
                </tr>
              </thead>
              <tbody>
                {tentComparisonRows.map((row) => (
                  <tr key={row.family} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3 font-semibold text-stone-900">{row.family}</td>
                    <td className="px-4 py-3 text-stone-700">{row.bestFor}</td>
                    <td className="px-4 py-3 text-stone-700">{row.interior}</td>
                    <td className="px-4 py-3 text-stone-700">{row.surfaces}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-7 sm:py-9">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Popular tent sizes</h2>
          <p className="mt-2 text-sm text-stone-600">Estimated use cases, every quote is layout-specific.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tentHubPopularSizes.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`${interactiveTileClass} flex flex-col p-4`}
              >
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">{s.label}</p>
                <p className="mt-1 text-xs text-stone-500">{s.sqft.toLocaleString()} sq ft</p>
                <p className="mt-2 flex-1 text-sm text-stone-600">{s.blurb}</p>
                <span className={`${cardRowHintClass} mt-2`}>
                  View details <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-7 sm:py-9">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">What fits? (preview)</h2>
          <p className="mt-2 max-w-3xl text-sm text-stone-600">
            Quick table math for rounds and banquet rows, still talk through aisles, dance floor, and buffet with your planner.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-stone-200 bg-[#faf8f5] text-xs font-semibold uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-2">Guests</th>
                  <th className="px-4 py-2">60″ rounds (est.)</th>
                  <th className="px-4 py-2">8′ banquet tables (est.)</th>
                  <th className="px-4 py-2">Chairs</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { g: 40, r: 5, b: 5, c: 40 },
                  { g: 60, r: 8, b: 8, c: 60 },
                  { g: 80, r: 10, b: 10, c: 80 },
                  { g: 100, r: 13, b: "12–13", c: 100 },
                  { g: 120, r: 15, b: 15, c: 120 },
                ].map((row) => (
                  <tr key={row.g} className="border-b border-stone-100">
                    <td className="px-4 py-2 font-medium text-stone-900">{row.g}</td>
                    <td className="px-4 py-2 text-stone-700">{row.r}</td>
                    <td className="px-4 py-2 text-stone-700">{row.b}</td>
                    <td className="px-4 py-2 text-stone-700">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-stone-500">
            Inventory snapshot (positioning only): 20×20 frame units ×{tentInventoryCopy.tents.frame20x20}, expandable 20′ systems ×
            {tentInventoryCopy.tents.expandable20ftSystems}, marquee inventory ~{tentInventoryCopy.tents.marqueeTotalLinearFt} linear ft.
          </p>
        </div>
      </section>

      <section className="py-7 sm:py-9">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Visual library</h2>
          <p className="mt-2 text-sm text-stone-600">Room for family-level photography, placeholders for now.</p>
          <div className="mt-4">
            <TentImagePlaceholder label="Tent family hero, frame, pole, marquee, large structure" />
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#faf8f5] py-7 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TentPlannerCallout />
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            <Link href="/wedding-tent-rentals" className="font-semibold text-stone-800 underline underline-offset-4 transition hover:text-stone-950">
              Weddings
            </Link>
            <Link href="/events" className="font-semibold text-stone-800 underline underline-offset-4 transition hover:text-stone-950">
              Events
            </Link>
            <Link href="/party-guides" className="font-semibold text-stone-800 underline underline-offset-4 transition hover:text-stone-950">
              Party guides
            </Link>
            <Link href="/planning#occasions" className="font-semibold text-stone-800 underline underline-offset-4 transition hover:text-stone-950">
              Planning by event type
            </Link>
            <Link href="/tents/gallery" className="font-semibold text-stone-800 underline underline-offset-4 transition hover:text-stone-950">
              Gallery
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
