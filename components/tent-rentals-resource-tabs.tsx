"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { cardRowHintClass, interactiveCardClass, interactiveTileClass } from "@/lib/interactive-styles";
import {
  tentComparisonRows,
  tentFamilies,
  tentHubPopularSizes,
} from "@/lib/tent-section-data";
import { quickGuestTableCounts, tentInventoryCopy } from "@/lib/tent-inventory";

type TabId = "guide" | "jobsite" | "inventory";

const tabs: { id: TabId; label: string }[] = [
  { id: "guide", label: "Planning guide" },
  { id: "jobsite", label: "Jobsite tents" },
  { id: "inventory", label: "Inventory" },
];

const jobsiteHighlights = [
  "Shade, hydration, and heat-relief station packages for outdoor crews",
  "14-day construction tent rates sized for roofing, paving, and landscaping sites",
  "Delivery, setup, and pickup coordinated for active job schedules",
] as const;

export function TentRentalsResourceTabs() {
  const uid = useId();
  const [active, setActive] = useState<TabId>("guide");

  const tabListClass =
    "inline-flex flex-wrap gap-1 rounded-xl border border-stone-200/90 bg-stone-50/90 p-1 shadow-inner";

  const tabBtn = (id: TabId) => {
    const selected = active === id;
    return selected
      ? "rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-stone-200/80 sm:px-4"
      : "rounded-lg px-3.5 py-2 text-sm font-medium text-stone-600 transition hover:bg-white/70 hover:text-stone-900 sm:px-4";
  };

  return (
    <div id="tent-resource-tabs" className="mt-8 border-t border-stone-200 pt-8 sm:mt-10 sm:pt-9">
      <h2 className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">Guide · Jobsite · Inventory</h2>
      <p className="mt-1.5 max-w-2xl text-sm leading-snug text-stone-600">
        Families, sizing tables, jobsite summary, and inventory orientation. Full pricing stays on the linked pages.
      </p>

      <div className="mt-6" role="tablist" aria-label="Tent planning and resources">
        <div className={tabListClass}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={0}
              className={tabBtn(t.id)}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-stone-200 bg-white p-3 shadow-sm sm:p-5">
        <div
          id={`${uid}-panel-guide`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-guide`}
          hidden={active !== "guide"}
          className={active !== "guide" ? "hidden" : ""}
        >
          <h3 className="text-lg font-semibold text-stone-900">Tent families</h3>
          <p className="mt-1 max-w-3xl text-sm text-stone-600">
            Start from how your event moves—cocktail, seated dinner, dance floor—then pick a family that matches your surface and style.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tentFamilies.map((f) => (
              <Link key={f.slug} href={f.path} className={`${interactiveCardClass} group flex flex-col p-4`}>
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900 group-hover:text-stone-950">{f.shortTitle}</p>
                <p className="mt-2 flex-1 text-sm leading-snug text-stone-600">{f.intro}</p>
                <span className={cardRowHintClass}>
                  Explore <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>

          <h3 className="mt-6 text-base font-semibold text-stone-900 sm:text-lg">Which tent type fits?</h3>
          <p className="mt-1 text-sm text-stone-600">Quick comparison—your quote is still layout-specific.</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <tr>
                  <th scope="col" className="px-3 py-2.5 sm:px-4">
                    Family
                  </th>
                  <th scope="col" className="px-3 py-2.5 sm:px-4">
                    Best for
                  </th>
                  <th scope="col" className="px-3 py-2.5 sm:px-4">
                    Interior
                  </th>
                  <th scope="col" className="px-3 py-2.5 sm:px-4">
                    Surfaces
                  </th>
                </tr>
              </thead>
              <tbody>
                {tentComparisonRows.map((row) => (
                  <tr key={row.family} className="border-b border-stone-100 last:border-0">
                    <td className="px-3 py-2.5 font-semibold text-stone-900 sm:px-4">{row.family}</td>
                    <td className="px-3 py-2.5 text-stone-700 sm:px-4">{row.bestFor}</td>
                    <td className="px-3 py-2.5 text-stone-700 sm:px-4">{row.interior}</td>
                    <td className="px-3 py-2.5 text-stone-700 sm:px-4">{row.surfaces}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 text-base font-semibold text-stone-900 sm:text-lg">Popular footprints</h3>
          <p className="mt-1 text-xs text-stone-500">Estimated use cases; sizing always follows your layout.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tentHubPopularSizes.map((s) => (
              <Link key={s.href} href={s.href} className={`${interactiveTileClass} flex flex-col p-4`}>
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900">{s.label}</p>
                <p className="mt-0.5 text-xs text-stone-500">{s.sqft.toLocaleString()} sq ft</p>
                <p className="mt-2 flex-1 text-sm leading-snug text-stone-600">{s.blurb}</p>
                <span className={`${cardRowHintClass} mt-2`}>
                  Details <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>

          <h3 className="mt-6 text-base font-semibold text-stone-900 sm:text-lg">What fits? (preview)</h3>
          <p className="mt-1 text-sm text-stone-600">Round and banquet estimates—add aisles, dance floor, and service in your real plan.</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-stone-200 bg-[#faf8f5] text-xs font-semibold uppercase tracking-wider text-stone-500">
                <tr>
                  <th scope="col" className="px-3 py-2 sm:px-4">
                    Guests
                  </th>
                  <th scope="col" className="px-3 py-2 sm:px-4">
                    60″ rounds (est.)
                  </th>
                  <th scope="col" className="px-3 py-2 sm:px-4">
                    8′ banquet (est.)
                  </th>
                  <th scope="col" className="px-3 py-2 sm:px-4">
                    Chairs
                  </th>
                </tr>
              </thead>
              <tbody>
                {quickGuestTableCounts.map((row) => (
                  <tr key={row.guests} className="border-b border-stone-100 last:border-0">
                    <td className="px-3 py-2 font-medium text-stone-900 sm:px-4">{row.guests}</td>
                    <td className="px-3 py-2 text-stone-700 sm:px-4">{row.rounds}</td>
                    <td className="px-3 py-2 text-stone-700 sm:px-4">{row.banquetTables}</td>
                    <td className="px-3 py-2 text-stone-700 sm:px-4">{row.chairs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-stone-500">
            Tent inventory snapshot: 20×20 frame units ×{tentInventoryCopy.tents.frame20x20}, expandable 20′ systems ×
            {tentInventoryCopy.tents.expandable20ftSystems}, marquee ~{tentInventoryCopy.tents.marqueeTotalLinearFt} linear ft (positioning only).
          </p>

          <p className="mt-6 text-sm text-stone-600">
            Prefer the expanded hub layout?{" "}
            <Link href="/tents" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/40 underline-offset-4">
              Tent guide hub (/tents)
            </Link>{" "}
            mirrors this guide with gallery placeholders and cross-links.
          </p>
        </div>

        <div
          id={`${uid}-panel-jobsite`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-jobsite`}
          hidden={active !== "jobsite"}
          className={active !== "jobsite" ? "hidden" : ""}
        >
          <h3 className="text-lg font-semibold text-stone-900">Jobsite tent coverage</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Yes—we rent tents for active Connecticut jobsites, not only parties. Stations give crews dependable shade, organized hydration, and heat-relief staging when schedules run hot.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-stone-700">
            {jobsiteHighlights.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7a45]" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link
              href="/tent-rentals/jobsite-coverage"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-[#9a7a45] bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50"
            >
              Jobsite packages &amp; 14-day rates
            </Link>
          </p>
        </div>

        <div
          id={`${uid}-panel-inventory`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-inventory`}
          hidden={active !== "inventory"}
          className={active !== "inventory" ? "hidden" : ""}
        >
          <h3 className="text-lg font-semibold text-stone-900">Rental inventory snapshot</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Use this as orientation, not live availability. Full line items, SKUs-style lists, and add-ons live on the inventory page.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
            <li className="rounded-lg border border-stone-100 bg-stone-50/80 px-3 py-2">
              <span className="font-semibold text-stone-900">Tents:</span> 10×10 through large clear-span; expandable bays ×{tentInventoryCopy.tents.expandable20ftSystems}; marquee ~{tentInventoryCopy.tents.marqueeTotalLinearFt} linear ft.
            </li>
            <li className="rounded-lg border border-stone-100 bg-stone-50/80 px-3 py-2">
              <span className="font-semibold text-stone-900">Seating:</span> folding chairs to ~{tentInventoryCopy.seating.plasticFoldingChairs.toLocaleString()} plastic; {tentInventoryCopy.seating.whitePaddedChairs} white padded.
            </li>
            <li className="rounded-lg border border-stone-100 bg-stone-50/80 px-3 py-2">
              <span className="font-semibold text-stone-900">Tables:</span> 60″ rounds ×{tentInventoryCopy.tables.round60in}, 8′ banquet ×{tentInventoryCopy.tables.banquet8ft}, cocktail high-tops ×{tentInventoryCopy.tables.cocktailHighTop}.
            </li>
            <li className="rounded-lg border border-stone-100 bg-stone-50/80 px-3 py-2">
              <span className="font-semibold text-stone-900">Structures:</span> 60×60 / 60×90 / 60×150 class units on file for major layouts.
            </li>
          </ul>
          <p className="mt-6">
            <Link
              href="/rental-inventory#tent-structures"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-stone-400 hover:bg-stone-50"
            >
              Full inventory list
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
