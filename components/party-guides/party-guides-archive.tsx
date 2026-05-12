"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EventLooksSection } from "@/components/event-looks-section";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { cardRowHintClass, filterChipClass, interactiveCardClass, textLinkNeutralClass } from "@/lib/interactive-styles";
import type { PartyGuideArticle, PartyGuideCategory } from "@/lib/party-guides-data";
import {
  getFeaturedGuides, getGuidesByCategory, getGuidesForHubSlugs, partyGuideCategories, partyGuideHubSections,
} from "@/lib/party-guides-data";
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
          year: "numeric", month: "short", day: "numeric", })}
      </p>
      <span className={cardRowHintClass}>
        View guide <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

function HubResourceCard({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link href={href} className={`${interactiveCardClass} flex flex-col p-5 sm:p-6`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#8a6d3a]">Inventory & tools</p>
      <h3 className="mt-2 text-lg font-semibold text-stone-900 [font-family:var(--font-display)] sm:text-xl">{label}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{description}</p>
      <span className={cardRowHintClass}>
        Open <span aria-hidden>→</span>
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
    () => partyGuideCategories.filter((c) => c.id === "all" || allGuides.some((g) => g.category === c.id)), [allGuides], );

  const filtered = useMemo(() => {
    const base = getGuidesByCategory(category);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        g.intro.toLowerCase().includes(q) ||
        g.categoryLabel.toLowerCase().includes(q), );
  }, [category, query]);

  const searchActive = query.trim().length > 0 || category !== "all";

  const jumpLinks = partyGuideHubSections.filter((s) => s.slugs.length > 0 || (s.resourceLinks && s.resourceLinks.length > 0));

  return (
    <>
      <section className="relative border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-[#f5f0e8]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#c9a24a]/40 to-transparent" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Breadcrumb className="mb-8" items={[{ label: "Home", href: "/" }, { label: "Party guides" }]} />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">
            Connecticut · Tent & event planning library
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12] [font-family:var(--font-display)]">
            Party guides: tent sizing, layouts, weather, and quote-ready planning
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-600">
            One curated library for hosts and planners, layout-first tent sizing, Connecticut weather realism, driveway and
            backyard site prep, and how quotes actually get built. Explore by topic below, then use tools or inventory
            links when you are ready to move from reading to booking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/planning" className={bookNowSectionClass}>
              Start planning
            </Link>
            <Link
              href="/tent-rentals"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
            >
              Explore tent rentals
            </Link>
            <Link
              href="/contact#quote"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-stone-300 bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
            >
              Request a quote
            </Link>
          </div>
          {!searchActive ? (
            <nav
              className="mt-10 flex flex-wrap gap-2 border-t border-stone-200/80 pt-8"
              aria-label="Jump to guide sections"
            >
              <span className="w-full text-xs font-semibold uppercase tracking-wider text-stone-500">Jump to</span>
              {jumpLinks.map((s) => (
                <a
                  key={s.id}
                  href={`#hub-${s.id}`}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-sm transition hover:border-[#b78a2d]/40 hover:bg-[#fffdf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          ) : null}
          <div className="mt-10 max-w-2xl">
            <PartyGuideImagePlaceholder caption="Featured image for the party guides hub" />
          </div>
        </div>
      </section>

      <EventLooksSection variant="guides" />

      {searchActive ? (
        <section className="border-b border-stone-200 bg-[#faf8f5] py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Matching guides</h2>
                <p className="mt-2 max-w-2xl text-sm text-stone-600">
                  {allGuides.length} guides total. Reset to return to curated shelves by topic.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="shrink-0 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
              >
                Show curated shelves
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
              <p className="mt-8 text-center text-sm text-stone-600">
                No guides match that search. Try another keyword or reset filters.
              </p>
            ) : null}
          </div>
        </section>
      ) : (
        <>
          <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Featured"
                title="Start here"
                intro="High-intent reads our team returns to when sizing real Connecticut yards, venues, and weather."
              />
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {featured.map((g) => (
                  <GuideCard key={g.slug} g={g} featured />
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-stone-200 bg-[#faf8f5] py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Browse by topic"
                title="A planning library, not a blog archive"
                intro="Each shelf groups guides that answer the same kind of decision. Open the article that matches where you are stuck, then follow links to tent families, inventory, or structured planners."
              />
              <div className="mt-14 space-y-16 sm:space-y-20">
                {partyGuideHubSections.map((section) => {
                  const guidesInShelf = getGuidesForHubSlugs(section.slugs);
                  return (
                    <div key={section.id} id={`hub-${section.id}`} className="scroll-mt-28">
                      <div className="max-w-3xl border-l-2 border-[#c9a228] pl-5 sm:pl-6">
                        <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
                          {section.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:text-base">{section.summary}</p>
                      </div>
                      {guidesInShelf.length > 0 ? (
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {guidesInShelf.map((g) => (
                            <GuideCard key={g.slug} g={g} />
                          ))}
                        </div>
                      ) : null}
                      {section.resourceLinks && section.resourceLinks.length > 0 ? (
                        <div
                          className={`mt-8 grid gap-6 ${section.slugs.length === 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}
                        >
                          {section.resourceLinks.map((r) => (
                            <HubResourceCard key={r.href} href={r.href} label={r.label} description={r.description} />
                          ))}
                        </div>
                      ) : null}
                      {guidesInShelf.length === 0 && (!section.resourceLinks || section.resourceLinks.length === 0) ? (
                        <p className="mt-4 text-sm text-stone-500">Guides coming soon for this shelf.</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="border-b border-stone-200 bg-white py-10 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">Search &amp; filter the full list</h2>
              <p className="mt-2 max-w-2xl text-sm text-stone-600">
                Prefer a flat view? Search by keyword or narrow by category chip.
              </p>
              <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
              <p className="mt-6 text-xs text-stone-500">
                Tip: choose a category chip to switch into filtered mode, or type in the search box.
              </p>
            </div>
          </section>
        </>
      )}

      <section className="border-b border-stone-200 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-[#111315] p-8 text-stone-100 shadow-lg">
              <p className="text-lg font-semibold sm:text-xl">Ready for structured planning?</p>
              <p className="mt-2 text-sm text-stone-400">
                Calculators, charts, and the Quick Event Planner live in one hub so your numbers match your layout.
              </p>
              <Link href="/planning" className={`${bookNowSectionClass} mt-6 inline-flex justify-center`}>
                Start planning
              </Link>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-[#f7f5f1] p-8 shadow-md">
              <p className="text-lg font-semibold text-stone-900 sm:text-xl">Need inventory and a scoped quote?</p>
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
                Compare tent sizes &amp; families
              </Link>
              <span className="text-stone-500"> · Frame, expandable, pole, large structures, marquee walkways.</span>
            </p>
            <p>
              <Link href="/wishlist" className={textLinkNeutralClass}>
                Build your wishlist
              </Link>
              <span className="text-stone-500"> · List rentals; we confirm availability and pricing.</span>
            </p>
            <p>
              <Link href="/wedding-tent-rentals" className={textLinkNeutralClass}>
                Wedding tent rentals
              </Link>
              <span className="text-stone-500"> · Layout-first outdoor receptions.</span>
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
