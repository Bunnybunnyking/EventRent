import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
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
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6" items={[{ label: "Home", href: "/" }, { label: "Tents" }]} />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 max-w-3xl">
              <SectionHeading
                eyebrow="Tents"
                title="Connecticut tent rentals & layout-forward planning"
                intro={`Choose a tent family and size with real layout logic: clear-span frame tents, expandable systems, pole tents, large structures, and marquee walkways. Family owned since ${business.establishedYear}.`}
                titleAs="h1"
                align="left"
              />
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
              <Link href="/party-guides" className="inline-flex items-center justify-center rounded-full border-2 border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-[#b78a2d]/50 hover:bg-stone-50">
                Party guides
              </Link>
              <Link href="/tent-rentals" className="inline-flex items-center justify-center rounded-full border-2 border-[#9a7a45] bg-white px-5 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50">
                Classic tent rentals page
              </Link>
              <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center`}>
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900 sm:text-3xl">Tent families</h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            Start with how your event moves: cocktail, seated dinner, ceremony, dinner plus dance, then right-size the footprint. Inventory-aware guidance, not generic boilerplate.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      <section className="border-y border-stone-200 bg-[#faf8f5] py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">What type of tent is right for your event?</h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            If you need clear-span seating and dance space, start with frame or expandable systems. If you want a classic peaked look and can plan around center poles, pole tents may fit. For arrivals and weather-protected flow, add marquee walkways.
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-stone-200 bg-white">
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

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Popular tent sizes</h2>
          <p className="mt-2 text-sm text-stone-600">Estimated use cases, every quote is layout-specific.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="border-y border-stone-200 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">What fits? (preview)</h2>
          <p className="mt-2 max-w-3xl text-sm text-stone-600">
            Quick table math for rounds and banquet rows, still talk through aisles, dance floor, and buffet with your planner.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200">
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

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Visual library</h2>
          <p className="mt-2 text-sm text-stone-600">Room for family-level photography, placeholders for now.</p>
          <div className="mt-6">
            <TentImagePlaceholder label="Tent family hero, frame, pole, marquee, large structure" />
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#faf8f5] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TentPlannerCallout />
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/wedding-tent-rentals" className="font-semibold text-stone-800 underline underline-offset-4">
              Weddings
            </Link>
            <Link href="/corporate-event-rentals" className="font-semibold text-stone-800 underline underline-offset-4">
              Corporate
            </Link>
            <Link href="/planning#backyard-parties" className="font-semibold text-stone-800 underline underline-offset-4">
              Backyard events
            </Link>
            <Link href="/tents/gallery" className="font-semibold text-stone-800 underline underline-offset-4">
              Gallery
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
