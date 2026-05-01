import Link from "next/link";
import { SectionHeading } from "@/components/sections";
import { goldCtaCore } from "@/lib/cta-styles";
import { cardRowHintClass, interactiveCardClass, interactiveTileClass } from "@/lib/interactive-styles";
import { business } from "@/lib/site-data";
import {
  tentComparisonRows, tentFamilies, tentHubPopularSizes, tentInventoryCopy,
} from "@/lib/tent-section-data";
import { TentFamilyCanopyGallery } from "./tent-family-canopy-gallery";
import { TentImagePlaceholder } from "./tent-image-placeholder";
import { QuickSizeReferenceButton } from "@/components/tent-seating-reference/quick-size-reference-button";
import { TentPlannerCallout } from "./tent-planner-callout";

/** Compact white + gold outline pill, aligned with `QuickSizeReferenceButton` compact. */
const tentsHubPostGalleryOutlineCta =
  "inline-flex min-h-[32px] shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#b78a2d] bg-white px-3 py-1.5 text-center text-[11px] font-semibold leading-tight tracking-tight text-stone-900 shadow-sm transition hover:border-[#9a7328] hover:bg-stone-50 sm:min-h-[34px] sm:px-3.5 sm:py-2 sm:text-xs [font-family:var(--font-display)]";

const tentsHubPostGalleryBookClass = [
  "inline-flex min-h-[32px] shrink-0 touch-manipulation items-center justify-center rounded-full px-3 py-1.5 text-center text-[11px] leading-tight sm:min-h-[34px] sm:px-3.5 sm:py-2 sm:text-xs [font-family:var(--font-display)]",
  goldCtaCore,
].join(" ");

export function TentHubPage({ goodshuffleEmbedGallery = false }: { goodshuffleEmbedGallery?: boolean } = {}) {
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

          <div className="min-w-0 max-w-3xl">
            <SectionHeading
              eyebrow="Tents"
              title="Connecticut Tent Rentals & The Largest Tent Fleet in CT"
              intro={`Choose a tent family and size with real layout logic: Frame Tents, Expandable Tent Structures, Elegant Pole Tents, and Marquee & walkways. Family owned since ${business.establishedYear}.`}
              titleAs="h1"
              align="left"
              compact
            />
            <p className="mt-2.5 max-w-3xl text-left text-sm font-semibold leading-snug text-stone-800 sm:text-[0.9375rem] sm:leading-relaxed">
              We have <span className="whitespace-nowrap">87,000 square feet</span> of tent coverage and{" "}
              <span className="whitespace-nowrap">16.6 miles</span> of tent canopy, one of the largest tent fleets in Connecticut.
            </p>
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Tent families</h2>
          <p className="mt-1.5 max-w-3xl text-sm leading-snug text-stone-600 sm:text-[0.9375rem] sm:leading-relaxed">
            Start with how your event moves: cocktail, seated dinner, ceremony, dinner plus dance, then right-size the footprint. Inventory-aware guidance, not generic boilerplate.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 min-[720px]:grid-cols-4">
            {tentFamilies.map((f) => (
              <Link
                key={f.slug}
                href={f.path}
                className={`${interactiveCardClass} group flex min-h-0 flex-col border-stone-300/90 p-4 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] ring-1 ring-stone-900/[0.045] min-[720px]:min-h-[14.5rem] sm:p-5`}
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold leading-tight tracking-tight text-stone-900 group-hover:text-stone-950 sm:text-[1.125rem]">
                  {f.shortTitle}
                </h3>
                <p className="mt-2.5 flex-1 text-xs leading-snug text-stone-600 min-[720px]:text-[0.8125rem] min-[720px]:leading-snug sm:text-sm sm:leading-relaxed">
                  {f.intro}
                </p>
                <span className={`${cardRowHintClass} mt-3`}>
                  Explore family <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
          <TentFamilyCanopyGallery embedOnly={goodshuffleEmbedGallery} />
          <div className="mt-3 flex min-w-0 flex-nowrap items-center justify-center gap-2 overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] sm:mt-4 sm:gap-2.5 sm:overflow-visible sm:pb-0">
            <QuickSizeReferenceButton variant="outlineLight" compact />
            <Link href="/tent-rentals#tent-resource-tabs" className={tentsHubPostGalleryOutlineCta}>
              Tent rentals + guide tabs
            </Link>
            <Link href="/contact#quote" className={tentsHubPostGalleryBookClass}>
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#faf8f5] py-4 sm:py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">What type of tent is right for your event?</h2>
          <p className="mt-1.5 max-w-3xl text-sm text-stone-600 sm:text-base">
            If you need clear-span seating and dance space, start with frame or expandable systems. If you want a classic peaked look and can plan around center poles, pole tents may fit. For arrivals and weather-protected flow, add marquee walkways.
          </p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-stone-200 bg-white">
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

      <section className="py-4 sm:py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Popular tent sizes</h2>
          <p className="mt-1.5 text-sm text-stone-600">Estimated use cases, every quote is layout-specific.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tentHubPopularSizes.map((s) => (
              <div key={s.href} className={`${interactiveTileClass} flex flex-col p-4`}>
                <Link href={s.href} className="block text-left">
                  <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">{s.label}</p>
                  <p className="mt-1 text-xs text-stone-500">{s.sqft.toLocaleString()} sq ft</p>
                  <p className="mt-2 flex-1 text-sm text-stone-600">{s.blurb}</p>
                  <span className={`${cardRowHintClass} mt-2`}>
                    View details <span aria-hidden>→</span>
                  </span>
                </Link>
                {s.inventoryCardId ? (
                  <Link
                    href={`/rental-inventory#${s.inventoryCardId}`}
                    className="mt-3 text-xs font-semibold text-[#7a5a18] underline decoration-amber-300 underline-offset-2 hover:text-stone-950"
                  >
                    On rental inventory
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-4 sm:py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">What fits? (preview)</h2>
          <p className="mt-1.5 max-w-3xl text-sm text-stone-600">
            Quick table math for rounds and banquet rows, still talk through aisles, dance floor, and buffet with your planner.
          </p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-stone-200">
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
                  { g: 40, r: 5, b: 5, c: 40 }, { g: 60, r: 8, b: 8, c: 60 }, { g: 80, r: 10, b: 10, c: 80 }, { g: 100, r: 13, b: "12 to 13", c: 100 }, { g: 120, r: 15, b: 15, c: 120 }, ].map((row) => (
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
          <p className="mt-3 text-xs text-stone-500">
            Inventory snapshot (positioning only): 20×20 frame units ×{tentInventoryCopy.tents.frame20x20}, expandable 20′ systems ×
            {tentInventoryCopy.tents.expandable20ftSystems}, marquee inventory ~{tentInventoryCopy.tents.marqueeTotalLinearFt} linear ft.
          </p>
        </div>
      </section>

      <section className="py-4 sm:py-5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Visual library</h2>
          <p className="mt-1.5 text-sm text-stone-600">Room for family-level photography, placeholders for now.</p>
          <div className="mt-3">
            <TentImagePlaceholder label="Tent family hero, frame, pole, marquee, large structure" />
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#faf8f5] py-5 sm:py-6">
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
