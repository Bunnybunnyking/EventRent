import Link from "next/link";
import { FrameTentSizeWishlistAffordance } from "@/components/tents/frame-tent-size-wishlist-inline";
import { GoodshuffleItemListEmbed } from "@/components/goodshuffle-item-list-embed";
import { GoodshuffleRuntime } from "@/components/goodshuffle-runtime";
import {
  goodshuffleFallbackCatalogSearchForTentSizePage,
  rentalInventoryTentCardHrefForTentSizeSlug,
} from "@/lib/goodshuffle-catalog-ids";
import { goodshufflePublicWebsiteKey } from "@/lib/goodshuffle-env";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";
import { FAQSchemaItems, ServiceSchema } from "@/components/schema";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { textLinkNeutralClass } from "@/lib/interactive-styles";
import type { TentPairedRental, TentSizePageData } from "@/lib/tent-section-types";
import { business, trustPoints } from "@/lib/site-data";
import { TentImagePlaceholder } from "./tent-image-placeholder";
import { TentPlannerCallout } from "./tent-planner-callout";

type Props = {
  data: TentSizePageData;
  breadcrumb: { label: string; href?: string }[];
  schemaPath: string;
  schemaName: string;
  schemaDescription: string;
  familyLinks?: { href: string; label: string }[];
  variant: "frame" | "large";
  /** When false, a wired `goodshuffleItemId` shows a short notice instead of the live card. */
  goodshuffleEnabled?: boolean;
};

function hasGoodshuffleHooks(p: TentPairedRental) {
  return Boolean(
    p.goodshuffleItemId ||
      p.goodshuffleImageId ||
      p.goodshuffleProductSlug ||
      p.wishlistEnabled ||
      p.waitlistEnabled,
  );
}

function TentHeroPath({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] leading-relaxed tracking-tight text-stone-500 sm:text-sm">
      <ol className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex min-w-0 items-baseline gap-x-1.5">
            {index > 0 ? (
              <span className="shrink-0 select-none text-stone-300 [font-family:ui-serif,Georgia,serif]" aria-hidden>
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="shrink-0 transition hover:text-stone-900">
                {item.label}
              </Link>
            ) : (
              <span
                className="min-w-0 font-medium text-stone-900 [font-family:var(--font-display)]"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function TentSizePageTemplate({
  data,
  breadcrumb,
  schemaPath,
  schemaName,
  schemaDescription,
  familyLinks,
  variant,
  goodshuffleEnabled = false,
}: Props) {
  /** Short display title; breadcrumb carries “Home / Tents / …”. Override with `heroHeadline` when needed. */
  const displayTitle =
    data.heroHeadline ??
    (variant === "frame" ? `${data.sizeLabel} frame tent` : `${data.sizeLabel} large event structure`);
  const trustStrip = data.trustStrip ?? trustPoints.slice(0, 4);
  const faqForSchema = data.faqs.map((f) => ({ question: f.question, answer: f.answer }));
  const rentalInventoryDeepHref = rentalInventoryTentCardHrefForTentSizeSlug(data.slug);
  const rentalInventoryHref = rentalInventoryDeepHref ?? "/rental-inventory";
  const catalogListSearch =
    data.goodshuffleCatalogSearch ??
    goodshuffleFallbackCatalogSearchForTentSizePage(data.slug, data.sizeLabel, variant);

  const gsKey = goodshufflePublicWebsiteKey()?.trim();
  const wrapGoodshuffleRuntime = Boolean(goodshuffleEnabled && gsKey);
  const gsDataUrl = gsKey ? goodshuffleVendorDataUrl(gsKey) : "";

  const page = (
    <>
      <ServiceSchema name={schemaName} description={schemaDescription} path={schemaPath} />
      <FAQSchemaItems items={faqForSchema} />

      <header className="border-b border-stone-200/70 bg-[linear-gradient(165deg,#faf8f4_0%,#fffdf9_38%,#ffffff_100%)] pb-10 pt-6 sm:pb-12 sm:pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 xl:gap-x-12">
            <div className="lg:col-span-5">
              <TentHeroPath items={breadcrumb} />
              <h1 className="mt-3 text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-stone-900 sm:mt-3.5 sm:text-4xl sm:leading-[1.1] [font-family:var(--font-display)]">
                {displayTitle}
              </h1>
              <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-stone-600 sm:text-base">
                {data.heroSubhead}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
                {business.state} tent rentals
              </p>
            </div>

            <div className="mt-7 min-w-0 lg:col-span-7 lg:mt-0">
              {goodshuffleEnabled && data.goodshuffleItemId ? (
                <div
                  className="ctp-tent-hero-wishlist-slot flex min-h-[12rem] flex-col items-center justify-center gap-3 rounded-2xl border border-stone-200/80 bg-[linear-gradient(180deg,#fffdf9_0%,#faf8f4_100%)] px-6 py-10 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.1)] ring-1 ring-stone-900/[0.03] sm:min-h-[14rem]"
                  aria-labelledby="hero-wishlist-heading"
                >
                  <h2
                    id="hero-wishlist-heading"
                    className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7a6635]"
                  >
                    Add to wishlist
                  </h2>
                  <FrameTentSizeWishlistAffordance itemId={data.goodshuffleItemId} sizeLabel={data.sizeLabel} />
                  <p className="max-w-sm text-center text-xs leading-relaxed text-stone-600">
                    Tap the heart to save this <strong className="font-semibold text-stone-800">{data.sizeLabel}</strong>{" "}
                    package to your list. Same item as in Goodshuffle Pro.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold">
                    <Link
                      href="/wishlist"
                      className="text-stone-700 underline decoration-stone-300 underline-offset-4 transition hover:text-stone-950"
                    >
                      Full catalog
                    </Link>
                    {rentalInventoryDeepHref ? (
                      <Link
                        href={rentalInventoryDeepHref}
                        className="text-[#6b5420] underline decoration-amber-300/80 underline-offset-4 transition hover:text-stone-950"
                      >
                        On inventory
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : goodshuffleEnabled && !data.goodshuffleItemId ? (
                <section
                  aria-labelledby="catalog-list-heading"
                  className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_18px_48px_-28px_rgba(15,23,42,0.14)] ring-1 ring-stone-900/[0.03]"
                >
                  <div className="flex flex-col gap-2 border-b border-stone-100/90 bg-stone-50/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3.5">
                    <div>
                      <h2
                        id="catalog-list-heading"
                        className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7a6635]"
                      >
                        Live catalog
                      </h2>
                      <p className="mt-1 text-xs text-stone-500">
                        Matches for <span className="font-mono text-[11px] text-stone-700">{catalogListSearch}</span>
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <Link
                        href="/wishlist"
                        className="text-xs font-semibold text-stone-700 underline decoration-stone-300 underline-offset-4 transition hover:text-stone-950"
                      >
                        Wishlist
                      </Link>
                      {rentalInventoryDeepHref ? (
                        <Link
                          href={rentalInventoryDeepHref}
                          className="text-xs font-semibold text-[#6b5420] underline decoration-amber-300/80 underline-offset-4 transition hover:text-stone-950"
                        >
                          On inventory
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div className="px-2.5 pb-4 pt-2 sm:px-4 sm:pb-5 sm:pt-3">
                    <GoodshuffleItemListEmbed search={catalogListSearch} listSize={6} className="border border-stone-100 bg-white" />
                  </div>
                </section>
              ) : data.goodshuffleItemId && !goodshuffleEnabled ? (
                <div className="rounded-2xl border border-amber-200/90 bg-amber-50/90 px-4 py-3.5 text-sm text-amber-950 sm:px-5">
                  <p className="font-semibold text-amber-950">Wishlist integration is not loaded</p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-900/90">
                    Add your Goodshuffle public website key to the site environment to enable the wishlist heart in the hero.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-stone-200/80 bg-stone-50/40 p-1">
                  <TentImagePlaceholder label={`${data.sizeLabel} tent, overview`} />
                </div>
              )}
            </div>
          </div>

          {familyLinks && familyLinks.length > 0 ? (
            <p className="mt-6 border-t border-stone-200/60 pt-5 text-center text-xs leading-relaxed text-stone-500 sm:text-left lg:mt-7">
              {familyLinks.map((l, i) => (
                <span key={l.href}>
                  {i > 0 ? <span className="text-stone-300"> · </span> : null}
                  <Link href={l.href} className="font-medium text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline">
                    {l.label}
                  </Link>
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </header>

      <div className="border-b border-stone-200 bg-white py-3">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs font-medium text-stone-600 sm:text-sm">
            {trustStrip.map((t) => (
              <li key={t} className="max-w-[14rem] sm:max-w-none">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section id="quick-answer" className="scroll-mt-24 border-b border-stone-200 bg-[#fffdf8] py-8 sm:py-9">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b5420]">Quick answer</h2>
          <p className="mt-3 text-base leading-relaxed text-stone-800 sm:text-[1.05rem]">{data.quickAnswer}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
            <Link href="/party-guides/how-to-think-about-tent-size-before-you-quote" className={textLinkNeutralClass}>
              Tent size mindset
            </Link>
            <Link href="/planning" className={textLinkNeutralClass}>
              Planning tools
            </Link>
            <Link href="/tents/gallery" className={textLinkNeutralClass}>
              Tent gallery
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-9 sm:py-10" aria-labelledby="best-for-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="best-for-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            Best for
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {data.bestForWho.map((label) => (
              <li
                key={label}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-800"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#faf8f5] py-9 sm:py-10" aria-labelledby="overview-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="overview-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            Tent overview
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">{data.tentOverview}</p>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-9 sm:py-10" aria-labelledby="uses-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="uses-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            Common event uses
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone-700 sm:text-base">
            {data.commonEventUses.map((u) => (
              <li key={u} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#b8860b]" aria-hidden />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#faf8f5] py-9 sm:py-10" aria-labelledby="planning-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="planning-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            Planning notes
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-stone-700 sm:text-base">
            {data.planningNotes.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="font-semibold text-[#8a6d3a]" aria-hidden>
                  ·
                </span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-9 sm:py-10" aria-labelledby="glance-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="glance-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            At a glance
          </h2>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Footprint</dt>
              <dd className="mt-1 text-sm font-semibold text-stone-900">~{data.sqft.toLocaleString()} sq ft</dd>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Seated (estimate)</dt>
              <dd className="mt-1 text-sm leading-snug text-stone-800">{data.guestSeatedEstimate}</dd>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Standing / cocktail</dt>
              <dd className="mt-1 text-sm leading-snug text-stone-800">{data.guestCocktailEstimate}</dd>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Typical programs</dt>
              <dd className="mt-1 text-sm leading-snug text-stone-800">{data.commonEventUses.slice(0, 4).join(" · ")}</dd>
            </div>
          </dl>
          {data.surfacesNote ? (
            <p className="mt-4 text-sm text-stone-600">
              <span className="font-semibold text-stone-800">Surfaces / install:</span> {data.surfacesNote}
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#faf8f5] py-9 sm:py-10" aria-labelledby="fits-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="fits-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            Why this size
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-stone-700 sm:text-base">
            {data.whatFits.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#b8860b]" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-9 sm:py-10" aria-labelledby="layouts-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="layouts-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            Common layout ideas
          </h2>
          <p className="mt-2 text-sm text-stone-600">Examples only, we confirm with your guest count, furniture list, and site photos.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.layoutExamples.map((ex) => (
              <div key={ex.title} className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold text-stone-900">{ex.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{ex.body}</p>
                <div className="mt-3">
                  <TentImagePlaceholder label={`${ex.title} diagram`} aspect="square" className="min-h-[120px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#faf8f5] py-9 sm:py-10" aria-labelledby="paired-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="paired-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            Common add-ons & paired rentals
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Popular companions on real Connecticut programs. We bundle these when we quote so flow and service lanes stay realistic.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.pairedRentals.map((p, idx) => (
              <li
                key={`${p.title}-${idx}`}
                className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm ring-1 ring-stone-900/[0.02]"
              >
                <h3 className="text-sm font-semibold text-stone-900">{p.title}</h3>
                {p.note ? <p className="mt-2 text-sm leading-relaxed text-stone-600">{p.note}</p> : null}
                {p.tags?.length ? (
                  <p className="mt-2 text-xs text-stone-500">{p.tags.join(" · ")}</p>
                ) : null}
                {hasGoodshuffleHooks(p) ? (
                  <p className="mt-3 text-xs leading-relaxed text-[#7a5a18]">
                    On the live catalog, matching items can be saved with your wishlist alongside this tent.
                  </p>
                ) : (
                  <p className="mt-3 text-xs leading-relaxed text-stone-500">Tell us what you need; we align chairs, tables, and weather add-ons in the quote.</p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-stone-600">
            Also consider: {data.bestAddOns.join(" · ")}. See{" "}
            <Link href={rentalInventoryHref} className={`font-medium ${textLinkNeutralClass}`}>
              rental inventory
              {rentalInventoryDeepHref ? " (this size)" : ""}
            </Link>{" "}
            for live categories and Goodshuffle packages where wired.
          </p>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-9 sm:py-10" aria-labelledby="sizeup-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="sizeup-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            When to size up
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone-700 sm:text-base">
            {data.whenToSizeUp.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="font-semibold text-[#8a6d3a]" aria-hidden>
                  +
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#faf8f5] py-9 sm:py-10" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="gallery-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            Event photography
          </h2>
          <p className="mt-2 text-sm text-stone-600">More install photography is rolling in. Browse the tent gallery for real events today.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <TentImagePlaceholder label="Wide shot" aspect="[4/3]" />
            <TentImagePlaceholder label="Interior lighting" aspect="[4/3]" />
            <TentImagePlaceholder label="Detail" aspect="[4/3]" className="col-span-2 sm:col-span-1" />
          </div>
          <p className="mt-5 text-center sm:text-left">
            <Link href="/tents/gallery" className={`text-sm font-medium ${textLinkNeutralClass}`}>
              Browse tent gallery →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-9 sm:py-10" id="faq" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-lg font-semibold tracking-tight text-stone-900">
            Questions
          </h2>
          <div className="mt-4 divide-y divide-stone-200">
            {data.faqs.map((f) => (
              <details key={f.question} className="group py-4 first:pt-0 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none text-sm font-semibold text-stone-900">
                  <span className="flex items-start justify-between gap-3">
                    {f.question}
                    <span className="text-stone-400 transition group-open:rotate-180" aria-hidden>
                      ▼
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <TentPlannerCallout />
          <div className="mt-10 rounded-2xl border border-stone-200 border-l-[3px] border-l-[#b8934a] bg-stone-50 px-6 py-7 sm:px-8">
            <h2 className="text-lg font-semibold tracking-tight text-stone-900">Next step</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-700">
              Send your date, town, guest count, surface type, and how you want the day to flow. We will tell you honestly if this footprint fits, or which size is safer.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center`}>
                Get a fast quote
              </Link>
              <Link
                href="/wishlist"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-stone-400 bg-white px-5 text-sm font-semibold text-stone-900 transition hover:bg-white"
              >
                Start a wishlist
              </Link>
              <Link href="/contact" className={`inline-flex min-h-[44px] items-center justify-center text-sm font-semibold ${textLinkNeutralClass}`}>
                Ask about this tent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  if (wrapGoodshuffleRuntime && gsDataUrl) {
    return (
      <GoodshuffleRuntime dataUrl={gsDataUrl}>
        <div className="ctp-tent-goodshuffle-page">{page}</div>
      </GoodshuffleRuntime>
    );
  }
  return page;
}
