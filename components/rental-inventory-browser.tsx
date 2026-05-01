import Image from "next/image";
import Link from "next/link";
import { GoodshuffleItemCardEmbed } from "@/components/goodshuffle-item-card-embed";
import { Breadcrumb } from "@/components/breadcrumb";
import { QuickSizeReferenceButton } from "@/components/tent-seating-reference/quick-size-reference-button";
import { TentSectionTabs } from "@/components/tent-section-tabs";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { business } from "@/lib/site-data";
import { inventoryDisclaimer } from "@/lib/inventory-data";
import {
  backyardEssentialIds,
  chairInventoryCards,
  featuredCuratedCollections,
  heatingCards,
  inventoryBrowserNav,
  inventoryCategorySpotlights,
  inventoryPlanningNotes,
  lightingCards,
  tableBanquetCards,
  tableCocktailSpecialtyCards,
  tableRoundCards,
  tentInventoryCards,
  tentTypesExplained,
  weddingFavoriteIds,
  type RentalBrowserItem,
} from "@/lib/rental-inventory-browser-data";

const shell = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

function availabilityLabel(status: RentalBrowserItem["availabilityStatus"]) {
  if (status === "coming-soon") return "Coming soon";
  if (status === "ask") return "Ask us about availability";
  return "Available by quote";
}

function pickItems(ids: readonly string[], pool: RentalBrowserItem[]) {
  const map = new Map(pool.map((i) => [i.id, i]));
  return ids.map((id) => map.get(id)).filter(Boolean) as RentalBrowserItem[];
}

function RentalItemCard({
  item,
  dense = false,
  goodshuffleEnabled = false,
}: {
  item: RentalBrowserItem;
  dense?: boolean;
  goodshuffleEnabled?: boolean;
}) {
  const showAvailability = item.availabilityStatus && item.availabilityStatus !== "quote";
  const hasGs = Boolean(item.goodshuffleItemId || item.goodshuffleImageId || item.goodshuffleProductSlug);
  const wishlistBrowseFallback = item.wishlistEnabled || item.id.startsWith("tent-");

  const imageStrip = (
    <div
      className="relative aspect-[5/3] w-full bg-gradient-to-br from-stone-100 to-stone-200/80"
      data-goodshuffle-image-id={item.goodshuffleImageId || undefined}
    >
      {item.image ? (
        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-4 text-center">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Photo</span>
          <span className="text-xs text-stone-500">Goodshuffle image hook</span>
        </div>
      )}
      {item.featured ? (
        <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-[#1a1a1a]/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#f0e6c8]">
          Popular
        </span>
      ) : null}
    </div>
  );

  return (
    <article
      id={dense ? undefined : item.id}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200/95 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_6px_20px_rgba(15,15,15,0.06)] transition hover:border-stone-300 hover:shadow-[0_10px_28px_rgba(15,15,15,0.08)] ${dense ? "" : "scroll-mt-28"}`}
      data-goodshuffle-item-id={item.goodshuffleItemId || undefined}
      data-goodshuffle-product-slug={item.goodshuffleProductSlug || undefined}
      data-availability={item.availabilityStatus ?? "quote"}
    >
      {item.imageHref ? (
        <Link
          href={item.imageHref}
          prefetch={true}
          className="relative block shrink-0 outline-none transition hover:brightness-[1.03] focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label={`${item.title}: view sizing and details`}
        >
          {imageStrip}
        </Link>
      ) : (
        imageStrip
      )}
      <div className={`flex flex-1 flex-col ${dense ? "p-3" : "p-4"}`}>
        <h3 className={`font-semibold text-stone-900 ${dense ? "text-sm" : "text-base"}`}>{item.title}</h3>
        {item.subtitle ? <p className="mt-0.5 text-xs text-stone-500">{item.subtitle}</p> : null}
        {item.dimensions ? <p className="mt-1 text-xs font-medium text-stone-600">{item.dimensions}</p> : null}
        <p className={`mt-2 flex-1 text-stone-600 ${dense ? "text-xs leading-snug" : "text-sm leading-snug"}`}>{item.description}</p>
        {item.bestFor ? (
          <p className="mt-2 text-[11px] text-stone-500">
            <span className="font-medium text-stone-700">Best for:</span> {item.bestFor}
          </p>
        ) : null}
        {item.seatingNote ? <p className="mt-1 text-[11px] italic text-stone-500">{item.seatingNote}</p> : null}
        {item.tags && item.tags.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-1" aria-label="Tags">
            {item.tags.map((t) => (
              <li key={t} className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-700">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
        {item.internalCount != null ? (
          <p className="mt-2 text-[10px] leading-snug text-stone-400">Planning figures on file, your quote confirms what we can reserve.</p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3">
          {showAvailability ? (
            <span className="text-[11px] font-medium text-[#8a6d3a]">{availabilityLabel(item.availabilityStatus)}</span>
          ) : (
            <span className="text-[11px] font-medium text-stone-600">{availabilityLabel("quote")}</span>
          )}
          {hasGs ? <span className="text-[10px] text-emerald-700">Live package</span> : null}
        </div>
        <div className="mt-2 flex flex-wrap items-start gap-2">
          {item.goodshuffleItemId && goodshuffleEnabled ? (
            <details className="min-w-0 max-w-full flex-1 overflow-hidden rounded-xl border border-stone-200 bg-stone-50/95 open:bg-white open:shadow-sm [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
              <summary className="cursor-pointer rounded-full border-2 border-[#6b5420] bg-gradient-to-b from-[#faf6eb] via-[#e4c96e] to-[#9f7322] px-3 py-1.5 text-center text-[11px] font-bold leading-tight text-[#1a140c] shadow-sm transition hover:brightness-[1.03] [font-family:var(--font-display)]">
                Add package to wishlist
              </summary>
              <div className="border-t border-stone-200 px-2 py-3 sm:px-3">
                <p className="mb-2 text-[11px] leading-snug text-stone-600">
                  Goodshuffle lists this as a <strong className="font-semibold text-stone-800">package</strong> (bundle). Use the heart on the card to add the <strong className="font-semibold text-stone-800">entire package</strong> as one line, then{" "}
                  <Link href="/wishlist" className="font-semibold text-[#8a6220] underline underline-offset-2">
                    open your wishlist
                  </Link>{" "}
                  to review and send.
                </p>
                <GoodshuffleItemCardEmbed
                  itemId={item.goodshuffleItemId}
                  className="max-w-full overflow-x-auto rounded-lg border border-stone-200 bg-white p-1"
                />
              </div>
            </details>
          ) : item.goodshuffleItemId && !goodshuffleEnabled ? (
            <p className="max-w-[14rem] text-[10px] leading-snug text-stone-500">
              <span className="font-semibold text-stone-700">Wishlist:</span> set{" "}
              <code className="rounded bg-stone-100 px-1 py-0.5 text-[9px] text-stone-800">NEXT_PUBLIC_GOODSHUFFLE_PUBLIC_WEBSITE_KEY</code> in{" "}
              <code className="rounded bg-stone-100 px-1 py-0.5 text-[9px]">.env.local</code> to enable one-click add for this SKU, or{" "}
              <Link href="/wishlist" className="font-semibold text-[#8a6220] underline underline-offset-2">
                browse the wishlist gallery
              </Link>
              .
            </p>
          ) : wishlistBrowseFallback ? (
            <Link
              href="/wishlist"
              className="inline-flex min-h-[32px] items-center justify-center rounded-full border border-stone-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-800 transition hover:bg-stone-50"
              title="Open wishlist and live catalog to add items"
            >
              Wishlist
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-[11px] font-semibold text-stone-400"
              title="Not linked to live catalog yet"
            >
              Wishlist
            </button>
          )}
          <Link
            href="/contact#quote"
            className="inline-flex min-h-[32px] items-center justify-center rounded-full border border-stone-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-800 transition hover:bg-stone-50"
          >
            Ask on quote
          </Link>
        </div>
      </div>
    </article>
  );
}

function CardGrid({
  items,
  dense,
  goodshuffleEnabled,
}: {
  items: RentalBrowserItem[];
  dense?: boolean;
  goodshuffleEnabled: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <RentalItemCard key={item.id} item={item} dense={dense} goodshuffleEnabled={goodshuffleEnabled} />
      ))}
    </div>
  );
}

export function RentalInventoryBrowser({ goodshuffleEnabled = false }: { goodshuffleEnabled?: boolean } = {}) {
  const allForFeatured = [
    ...tentInventoryCards,
    ...chairInventoryCards,
    ...tableBanquetCards,
    ...tableRoundCards,
    ...tableCocktailSpecialtyCards,
    ...lightingCards,
    ...heatingCards,
  ];

  const weddingPicks = pickItems([...weddingFavoriteIds], allForFeatured);
  const backyardPicks = pickItems([...backyardEssentialIds], allForFeatured);

  const featuredBlocks = featuredCuratedCollections.map((block) => ({
    ...block,
    items: block.id === "feat-wedding" ? weddingPicks : block.id === "feat-backyard" ? backyardPicks : block.items,
  }));

  return (
    <>
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] pb-5 pt-5 sm:pb-7 sm:pt-7">
        <div className={shell}>
          <Breadcrumb className="mb-3" items={[{ label: "Home", href: "/" }, { label: "Rental inventory" }]} />
          <TentSectionTabs active="inventory" />

          <div className="mt-5 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a45]">Inventory browser</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Browse Event Rental Inventory</h1>
            <p className="mt-3 text-base leading-snug text-stone-600 sm:text-lg sm:leading-relaxed">
              Explore tent, table, chair, lighting, and heating options for weddings, backyard parties, graduations, corporate events, and community gatherings across Central Connecticut. When you are ready, we tie what you see here to a clear quote for your date.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <QuickSizeReferenceButton variant="outlineLight" />
            <Link href="/wishlist" className={`${bookNowSectionClass} min-h-[44px] justify-center px-5`}>
              Start building your wishlist
            </Link>
            <Link
              href="/contact#quote"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-stone-400 bg-white px-5 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50"
            >
              Get a fast quote
            </Link>
            <Link
              href="#inv-tents"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-stone-300 bg-white/80 px-5 text-sm font-semibold text-stone-800 transition hover:bg-white"
            >
              Browse tents
            </Link>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-200/80 pt-4 text-sm text-stone-700">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9a7a45]" aria-hidden />
              Clean, inspected rentals
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9a7a45]" aria-hidden />
              Professional delivery &amp; setup
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9a7a45]" aria-hidden />
              Fast quote support
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9a7a45]" aria-hidden />
              Serving Central Connecticut
            </li>
          </ul>

          <nav
            className="sticky top-0 z-20 mt-5 flex flex-wrap gap-2 border-y border-stone-200/90 bg-[#f7f5f1]/95 py-2.5 backdrop-blur-md [-webkit-backdrop-filter:blur(8px)]"
            aria-label="Inventory categories"
          >
            {inventoryBrowserNav.map((n) => (
              <a
                key={n.id}
                href={n.href}
                className="rounded-full border border-stone-300/90 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 shadow-sm transition hover:border-[#9a7a45] hover:text-stone-950 sm:text-sm"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-10 sm:py-12">
        <div className={shell}>
          <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">Shop by category</h2>
          <p className="mt-1 max-w-2xl text-sm text-stone-600">Jump into the section that matches what you are planning, each card opens in-page anchors above.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inventoryCategorySpotlights.map((c) => (
              <a
                key={c.id}
                href={c.href}
                className="group flex flex-col rounded-2xl border border-stone-200 bg-gradient-to-b from-white to-stone-50/80 p-5 shadow-sm transition hover:border-[#c9a24a]/50 hover:shadow-md"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900 group-hover:text-stone-950">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-snug text-stone-600">{c.line}</p>
                <span className="mt-4 text-sm font-semibold text-[#8a6d3a]">
                  {c.cta} <span aria-hidden>→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="inv-tent-guide" className="scroll-mt-24 border-b border-stone-200 bg-white py-6 sm:py-7">
        <div className={shell}>
          <h2 className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">Tent types explained</h2>
          <p className="mt-1 max-w-4xl text-xs leading-snug text-stone-600 sm:text-sm">
            Short definitions to align vocabulary before we talk site and schedule.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-4">
            {tentTypesExplained.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border border-stone-200/90 bg-stone-50/90 px-2.5 py-2 sm:px-3 sm:py-2.5"
              >
                <h3 className="text-[11px] font-semibold leading-tight text-stone-900 sm:text-xs">{t.title}</h3>
                <p className="mt-1 text-[10px] leading-snug text-stone-600 sm:text-[11px] sm:leading-snug">{t.blurb}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-stone-600 sm:text-sm">
            Deeper layouts:{" "}
            <Link href="/tents" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/40 underline-offset-4">
              Tent guide hub
            </Link>
            {" · "}
            <Link href="/tent-rentals#tent-resource-tabs" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/40 underline-offset-4">
              Sizes &amp; planning tabs
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="inv-tents" className="scroll-mt-24 border-b border-stone-200 bg-stone-50 py-6 sm:py-10">
        <div className={shell}>
          {/* Legacy in-page anchor for links to /rental-inventory#tent-structures */}
          <div id="tent-structures" className="scroll-mt-28 -mt-1 h-px w-full" aria-hidden />
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Tents</h2>
          <div className="mt-4">
            <CardGrid items={tentInventoryCards} goodshuffleEnabled={goodshuffleEnabled} />
          </div>
        </div>
      </section>

      <section id="inv-chairs" className="scroll-mt-24 border-b border-stone-200 bg-white py-10 sm:py-14">
        <div className={shell}>
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Seating and chairs</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Style and scale matter as much as headcount. Tell us your event type, we will steer you toward the right chair line and table pairing.
          </p>
          <div className="mt-8">
            <CardGrid items={chairInventoryCards} dense goodshuffleEnabled={goodshuffleEnabled} />
          </div>
        </div>
      </section>

      <section id="inv-tables" className="scroll-mt-24 border-b border-stone-200 bg-stone-50 py-10 sm:py-14">
        <div className={shell}>
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Tables</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Banquets handle buffets, gifts, and casual rows. Rounds shine for seated weddings. Cocktails keep mingling airy. Serpentine layouts are available, ask when you want curved buffet flow.
          </p>
          <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-stone-500">Banquet tables</h3>
          <div className="mt-4">
            <CardGrid items={tableBanquetCards} dense goodshuffleEnabled={goodshuffleEnabled} />
          </div>
          <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-stone-500">Round tables</h3>
          <div className="mt-4">
            <CardGrid items={tableRoundCards} dense goodshuffleEnabled={goodshuffleEnabled} />
          </div>
          <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-stone-500">Cocktail &amp; specialty</h3>
          <div className="mt-4">
            <CardGrid items={tableCocktailSpecialtyCards} dense goodshuffleEnabled={goodshuffleEnabled} />
          </div>
        </div>
      </section>

      <section id="inv-lighting-heating" className="scroll-mt-24 border-b border-stone-200 bg-[#1a1d20] py-10 text-stone-100 sm:py-14">
        <div className={shell}>
          <div id="category-lighting" className="scroll-mt-28 -mt-1 h-px w-full" aria-hidden />
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Lighting &amp; heating</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400">
            Ambiance and guest comfort after dark or in cold snaps. Heater sizing always depends on tent volume, sidewalls, wind, and weather, we recommend on your specifics, not generic BTU promises.
          </p>
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a84b]">Lighting</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {lightingCards.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-stone-600/60 bg-stone-900/40 p-4 backdrop-blur-sm"
                data-goodshuffle-item-id={item.goodshuffleItemId || undefined}
              >
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-snug text-stone-300">{item.description}</p>
                <p className="mt-3 text-xs font-medium text-[#edc16c]">{availabilityLabel(item.availabilityStatus ?? "quote")}</p>
                <div className="mt-3 flex gap-2">
                  <Link href="/contact#quote" className="text-xs font-semibold text-white underline underline-offset-2">
                    Ask on quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a84b]">Heating</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {heatingCards.map((item) => (
              <article key={item.id} className="rounded-xl border border-stone-600/60 bg-stone-900/40 p-4" data-goodshuffle-item-id={item.goodshuffleItemId || undefined}>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-xs leading-snug text-stone-300">{item.description}</p>
                <ul className="mt-2 flex flex-wrap gap-1">
                  {(item.tags ?? []).map((t) => (
                    <li key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-stone-200">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-8 sm:py-10">
        <div className={shell}>
          <div id="category-dance-floor" className="scroll-mt-28 -mt-1 h-px w-full" aria-hidden />
          <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">Dance floor, staging &amp; flooring</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Portable dance floors, staging, tent flooring, and sidewalls are quoted to your tent size, timeline, and safety plan, not one-size SKUs on the web.{" "}
            <Link href="/contact#quote" className="font-semibold text-stone-900 underline underline-offset-2">
              Ask on your quote
            </Link>{" "}
            and we will walk through what fits your footprint.
          </p>
        </div>
      </section>

      {featuredBlocks.map((block) => (
        <section key={block.id} className="border-b border-stone-200 bg-[#faf8f5] py-10 sm:py-12">
          <div className={shell}>
            <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">{block.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-stone-600">{block.blurb}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {block.items.map((item) => (
                <RentalItemCard key={item.id} item={item} dense goodshuffleEnabled={goodshuffleEnabled} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="inv-planning" className="scroll-mt-24 border-b border-stone-200 bg-white py-10 sm:py-12">
        <div className={shell}>
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Planning notes</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">Straight answers you can skim before you call, open any row for a bit more detail.</p>
          <div className="mx-auto mt-6 max-w-3xl space-y-2">
            {inventoryPlanningNotes.map((n) => (
              <details key={n.id} className="group rounded-xl border border-stone-200 bg-stone-50/50 open:bg-white open:shadow-sm">
                <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-stone-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {n.title}
                    <span className="text-stone-400 transition group-open:rotate-180" aria-hidden>
                      ▼
                    </span>
                  </span>
                </summary>
                <p className="border-t border-stone-100 px-4 pb-4 pt-2 text-sm leading-relaxed text-stone-600">{n.body}</p>
              </details>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-center text-xs leading-relaxed text-amber-950/90">{inventoryDisclaimer}</p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#111315] to-[#0d0f11] py-12 text-stone-100 sm:py-16">
        <div className={`${shell} text-center`}>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tell us what you are planning</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-400">
            Share your date, town, guest count, and the mix you are considering, we will point you to the right rental combination and confirm availability for {business.primaryCity} and the rest of Central Connecticut.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Get a fast quote
            </Link>
            <Link
              href="/wishlist"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-500 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open wishlist
            </Link>
            <Link href="/table-chair-rentals" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-stone-600 px-6 text-sm font-semibold text-stone-200 transition hover:border-stone-400">
              Table &amp; chair guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
