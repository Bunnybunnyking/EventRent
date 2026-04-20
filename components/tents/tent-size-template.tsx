import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
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

export function TentSizePageTemplate({
  data,
  breadcrumb,
  schemaPath,
  schemaName,
  schemaDescription,
  familyLinks,
  variant,
}: Props) {
  const eyebrow = variant === "frame" ? `Frame tent · ${data.sizeLabel}` : `Large structure · ${data.sizeLabel}`;
  const h1 =
    data.heroHeadline ??
    (variant === "frame"
      ? `${data.sizeLabel} frame tent rentals in ${business.state}`
      : `${data.sizeLabel} large event tent rental in ${business.state}`);
  const trustStrip = data.trustStrip ?? trustPoints.slice(0, 4);
  const faqForSchema = data.faqs.map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <>
      <ServiceSchema name={schemaName} description={schemaDescription} path={schemaPath} />
      <FAQSchemaItems items={faqForSchema} />

      <header className="border-b border-stone-200/90 bg-gradient-to-b from-[#f7f5f1] to-[#faf8f5] py-9 sm:py-11">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6" items={breadcrumb} />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6d3a]">{eyebrow}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-[2.125rem] sm:leading-tight [font-family:var(--font-display)]">
                {h1}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">{data.heroSubhead}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center`}>
                  Get a fast quote
                </Link>
                <Link
                  href="/wishlist"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-center text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50"
                >
                  Start a wishlist
                </Link>
                <Link href="/contact" className={`inline-flex min-h-[48px] items-center justify-center text-sm font-semibold ${textLinkNeutralClass}`}>
                  Ask about this tent
                </Link>
              </div>
              {familyLinks && familyLinks.length > 0 ? (
                <p className="mt-5 text-sm text-stone-500">
                  {familyLinks.map((l, i) => (
                    <span key={l.href}>
                      {i > 0 ? " · " : ""}
                      <Link href={l.href} className="font-medium text-stone-800 underline underline-offset-2">
                        {l.label}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
            <TentImagePlaceholder label={`${data.sizeLabel} tent, hero image`} />
          </div>
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
          <p className="mt-2 text-sm text-stone-600">Examples only—we confirm with your guest count, furniture list, and site photos.</p>
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
            Popular companions on real Connecticut programs. Goodshuffle IDs are optional—cards stay clean when fields are empty.
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
                  <p className="mt-3 text-[11px] leading-relaxed text-stone-500">
                    Goodshuffle: item {p.goodshuffleItemId ?? "—"} · image {p.goodshuffleImageId ?? "—"} · slug{" "}
                    {p.goodshuffleProductSlug ?? "—"}
                  </p>
                ) : (
                  <p className="mt-3 text-[11px] text-stone-400">Goodshuffle hooks: connect when catalog sync is ready.</p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-stone-600">
            Also consider: {data.bestAddOns.join(" · ")}. See{" "}
            <Link href="/rental-inventory" className={`font-medium ${textLinkNeutralClass}`}>
              rental inventory
            </Link>{" "}
            for live categories.
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
          <p className="mt-2 text-sm text-stone-600">Placeholders for real installs—browse the gallery for proof today.</p>
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
              Send your date, town, guest count, surface type, and how you want the day to flow. We will tell you honestly if this footprint fits—or which size is safer.
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
}
