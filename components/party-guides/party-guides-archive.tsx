"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EventLooksSection } from "@/components/event-looks-section";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { cardRowHintClass, filterChipClass, interactiveCardClass, textLinkNeutralClass } from "@/lib/interactive-styles";
import type { PartyGuideArticle, PartyGuideCategory } from "@/lib/party-guides-data";
import { getFeaturedGuides, getGuidesByCategory, partyGuideCategories } from "@/lib/party-guides-data";
import { PartyGuideCtas } from "./party-guide-ctas";
import { PartyGuideImagePlaceholder } from "./party-guide-image-placeholder";

function GuideCard({ g, featured }: { g: PartyGuideArticle; featured?: boolean }) {
  return (
    <Link
      href={`/party-guides/${g.slug}`}
      className={`${interactiveCardClass} flex flex-col p-5 sm:p-6 ${featured ? "ring-1 ring-[#b78a2d]/20" : ""}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#8a6d3a]">{g.categoryLabel}</p>
      <h3 className="mt-2 text-lg font-semibold text-stone-900 [font-family:var(--font-display)] group-hover:text-stone-950 sm:text-xl">
        {g.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 line-clamp-3">{g.excerpt}</p>
      <p className="mt-4 text-xs text-stone-500">
        Updated{" "}
        {new Date(g.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      <span className={cardRowHintClass}>
        View guide <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

export function PartyGuidesArchive() {
  const allGuides = useMemo(() => getGuidesByCategory("all"), []);
  const featured = useMemo(() => getFeaturedGuides(), []);
  const [category, setCategory] = useState<PartyGuideCategory | "all">("all");
  const [query, setQuery] = useState("");

  const visibleCategoryChips = useMemo(
    () => partyGuideCategories.filter((c) => c.id === "all" || allGuides.some((g) => g.category === c.id)),
    [allGuides],
  );

  const filtered = useMemo(() => {
    const base = getGuidesByCategory(category);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        g.intro.toLowerCase().includes(q) ||
        g.categoryLabel.toLowerCase().includes(q),
    );
  }, [category, query]);

  return (
    <>
      <section className="relative border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-[#f5f0e8]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#c9a24a]/40 to-transparent" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "Party guides" }]}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Planning resource center · Connecticut</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1]">
            Party guides
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
            A curated library of layout-first answers: tent sizing, backyard and graduation setups, rain plans, corporate flow, and ideas grounded in our frame, expandable, pole, structure, and marquee inventory. Built for scanning, sharing, and quoting with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/planning#size-guide" className={bookNowSectionClass}>
              Use planning tools
            </Link>
            <Link
              href="/contact#quote"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
            >
              Request a quote
            </Link>
          </div>
          <div className="mt-10 max-w-2xl">
            <PartyGuideImagePlaceholder caption="Hero photography or editorial art for this hub (optional)" />
          </div>
        </div>
      </section>

      <EventLooksSection variant="guides" />

      <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Featured"
            title="Start with these guides"
            intro="Short, high intent reads that pair with our tent family pages, planning calculators, and quote flow."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((g) => (
              <GuideCard key={g.slug} g={g} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#faf8f5] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Browse the library</h2>
              <p className="mt-2 max-w-xl text-sm text-stone-600">
                {allGuides.length} guides · Filter by topic or search by keyword.
              </p>
            </div>
            <label className="block w-full max-w-md lg:max-w-sm">
              <span className="sr-only">Search guides</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides, e.g. rain, 20×40, graduation…"
                className="w-full rounded-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm transition focus:border-[#b78a2d]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a228]/40"
              />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {visibleCategoryChips.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={
                  category === c.id
                    ? `${filterChipClass} border-[#5c4818] bg-gradient-to-b from-[#f8e9b0] via-[#ebc94a] to-[#c9a228] text-neutral-950 shadow-md`
                    : filterChipClass
                }
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g) => (
              <GuideCard key={g.slug} g={g} />
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="mt-8 text-center text-sm text-stone-600">No guides match that search. Try another keyword or clear filters.</p>
          ) : null}
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-[#111315] p-8 text-stone-100 shadow-lg">
              <p className="text-lg font-semibold sm:text-xl">Ready for structured planning?</p>
              <p className="mt-2 text-sm text-stone-400">
                Calculators, charts, and the Quick Event Planner live in one hub so your numbers match your layout.
              </p>
              <Link href="/planning" className={`${bookNowSectionClass} mt-6 inline-flex justify-center`}>
                Open planning hub
              </Link>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-[#f7f5f1] p-8 shadow-md">
              <p className="text-lg font-semibold text-stone-900 sm:text-xl">Need inventory and pricing?</p>
              <p className="mt-2 text-sm text-stone-600">
                Share your date, town, guest count, and flow. We respond with options tied to real tent families and add-ons.
              </p>
              <Link href="/contact#quote" className={`${bookNowSectionClass} mt-6 inline-flex justify-center`}>
                Request a quote
              </Link>
            </div>
          </div>
          <div className="mt-10 grid gap-4 text-sm text-stone-700 sm:grid-cols-2">
            <p>
              <Link href="/tents" className={textLinkNeutralClass}>
                Tent guide hub
              </Link>
              <span className="text-stone-500"> · Frame, expandable, pole, large structures, marquee walkways.</span>
            </p>
            <p>
              <Link href="/wedding-tent-rentals" className={textLinkNeutralClass}>
                Wedding tent rentals
              </Link>
              <span className="text-stone-500"> · Layout-first outdoor receptions.</span>
            </p>
            <p>
              <Link href="/corporate-event-rentals" className={textLinkNeutralClass}>
                Corporate events
              </Link>
              <span className="text-stone-500"> · Picnics, staff events, public programs.</span>
            </p>
            <p>
              <Link href="/quick-event-planner" className={textLinkNeutralClass}>
                Quick event planner
              </Link>
              <span className="text-stone-500"> · Structured prompts before you quote.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#faf8f5] py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <PartyGuideCtas variant="band" />
        </div>
      </section>
    </>
  );
}
