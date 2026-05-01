import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { bookNowHeaderClass } from "@/lib/cta-styles";
import type { MarketingPageDefinition, MarketingSetupCard } from "@/lib/marketing-pages-types";

const defaultEyebrow = "Connecticut event planning";

function SetupCards({ cards }: { cards: MarketingSetupCard[] }) {
  return (
    <ul className="not-prose mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2">
      {cards.map((c) => (
        <li key={c.title} className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm ring-1 ring-stone-900/[0.03]">
          <h3 className="text-lg font-semibold tracking-tight text-stone-900">{c.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">{c.summary}</p>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b5420]">Usually includes</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-700">
            {c.includes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-4 border-t border-stone-100 pt-3 text-xs leading-relaxed text-stone-500">
            <span className="font-semibold text-stone-700">Best when:</span> {c.bestFor}
          </p>
        </li>
      ))}
    </ul>
  );
}

type BreadcrumbItem = { label: string; href?: string };

function OnThisPageNav({ sections }: { sections: MarketingPageDefinition["sections"] }) {
  if (sections.length === 0) return null;
  return (
    <nav
      id="on-this-page"
      className="not-prose scroll-mt-28 rounded-xl border border-stone-200/90 bg-stone-50/80 px-4 py-4 sm:px-5"
      aria-label="On this page"
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">On this page</h2>
      <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-sm font-medium text-[#6b5420] underline decoration-stone-300 underline-offset-4 transition hover:text-stone-900 hover:decoration-stone-500"
            >
              {s.heading}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#faq"
            className="text-sm font-medium text-[#6b5420] underline decoration-stone-300 underline-offset-4 transition hover:text-stone-900 hover:decoration-stone-500"
          >
            Common questions
          </a>
        </li>
      </ul>
    </nav>
  );
}

export function MarketingPageView({
  page, breadcrumbTrail,
}: {
  page: MarketingPageDefinition;
  breadcrumbTrail: BreadcrumbItem[];
}) {
  const eyebrow = page.contentEyebrow ?? defaultEyebrow;
  const heroSecondary = page.heroSecondaryCta ?? { label: "On-page topics", href: "#on-this-page" };

  return (
    <article>
      <header className="border-b border-stone-200 bg-gradient-to-b from-[#f7f5f1] to-[#faf8f5] py-8 sm:py-11">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-8"
            items={breadcrumbTrail.map((b, i) => {
              const isLast = i === breadcrumbTrail.length - 1;
              if (isLast) return { label: b.label };
              return { label: b.label, href: b.href };
            })}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6d3a]">{eyebrow}</p>
          <h1
            className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-[2.125rem] sm:leading-tight [font-family:var(--font-display)]"
            id="page-title"
          >
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-700 sm:text-lg sm:leading-relaxed">
            {page.subhead}
          </p>
          <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href={page.cta.href} className={`${bookNowHeaderClass} justify-center sm:w-auto`}>
              {page.cta.label}
            </Link>
            <Link
              href={heroSecondary.href}
              className="text-center text-sm font-medium text-stone-600 underline-offset-[5px] transition hover:text-stone-900 hover:underline sm:text-left"
            >
              {heroSecondary.label}
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="outline-none" tabIndex={-1}>
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
          <section
            id="quick-answer"
            className="scroll-mt-28 rounded-xl border border-[#c9a87a]/35 bg-[#fffdf8] px-5 py-5 shadow-sm sm:px-6 sm:py-6"
            aria-labelledby="quick-answer-heading"
          >
            <h2 id="quick-answer-heading" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b5420]">
              Quick answer
            </h2>
            <p className="mt-3 text-base font-normal leading-[1.65] text-stone-800 sm:text-[1.0625rem]">{page.quickAnswer}</p>
          </section>

          <div className="mt-8 space-y-8">
            <OnThisPageNav sections={page.sections} />
          </div>

          <div className="prose prose-stone mt-12 max-w-none space-y-12 prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:text-stone-900 prose-h2:mb-3 prose-h2:mt-0 prose-h2:text-xl prose-h2:tracking-tight prose-p:leading-[1.7] prose-p:text-stone-700 prose-li:marker:text-stone-400 prose-li:leading-[1.65] prose-li:text-stone-700">
            {page.sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p, pi) => (
                  <p key={`${s.id}-p-${pi}`}>{p}</p>
                ))}
                {s.bullets?.length ? (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {page.setupCards?.length ? <SetupCards cards={page.setupCards} /> : null}

          {page.goodshuffleSlot ? (
            <div className="not-prose mt-14 rounded-2xl border-2 border-dashed border-stone-300/90 bg-stone-50/90 p-6 sm:p-7">
              <h2 className="text-lg font-semibold tracking-tight text-stone-900">Featured rentals (Goodshuffle-ready)</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{page.goodshuffleSlot}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3" aria-label="Placeholder slots for rental item cards">
                {["Item card 1", "Item card 2", "Item card 3"].map((label) => (
                  <li
                    key={label}
                    className="flex min-h-[128px] items-center justify-center rounded-xl border border-stone-200 bg-white px-3 text-center text-xs font-medium text-stone-400"
                  >
                    {label}
                    <span className="sr-only">, connect Goodshuffle IDs, images, and wishlist when ready.</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {page.trustBullets?.length ? (
            <div className="not-prose mt-14 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-900/[0.03] sm:p-7">
              <h2 className="text-lg font-semibold tracking-tight text-stone-900">What stays consistent</h2>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-stone-700">
                {page.trustBullets.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <section className="not-prose mt-14 scroll-mt-28 rounded-2xl border border-stone-200 bg-white p-6 sm:p-7" id="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-lg font-semibold tracking-tight text-stone-900">
              Common questions
            </h2>
            <div className="mt-2 divide-y divide-stone-200">
              {page.faqs.map((faq) => (
                <details key={faq.id} id={faq.id} className="group py-4 first:pt-1 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="cursor-pointer list-none text-sm font-semibold leading-snug text-stone-900 marker:content-none">
                    <span className="flex items-start justify-between gap-3">
                      <span>{faq.question}</span>
                      <span className="mt-0.5 shrink-0 text-stone-400 transition group-open:rotate-180" aria-hidden>
                        ▼
                      </span>
                    </span>
                  </summary>
                  <div className="mt-3 text-sm leading-relaxed text-stone-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section
            className="not-prose mt-14 rounded-2xl border border-stone-200 border-l-[3px] border-l-[#b8934a] bg-stone-50/60 p-6 sm:p-7"
            aria-labelledby="next-step-heading"
          >
            <h2 id="next-step-heading" className="text-lg font-semibold tracking-tight text-stone-900">
              {page.finalCta.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">{page.finalCta.body}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href={page.finalCta.primaryHref} className={`${bookNowHeaderClass} justify-center sm:inline-flex`}>
                {page.finalCta.primaryLabel}
              </Link>
              {page.finalCta.secondaryHref && page.finalCta.secondaryLabel ? (
                <>
                  <Link
                    href={page.finalCta.secondaryHref}
                    className="hidden min-h-[42px] items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-white sm:inline-flex"
                  >
                    {page.finalCta.secondaryLabel}
                  </Link>
                  <Link
                    href={page.finalCta.secondaryHref}
                    className="text-sm font-semibold text-[#7a5a18] underline decoration-[#d4bc88] underline-offset-[3px] hover:text-stone-900 sm:hidden"
                  >
                    {page.finalCta.secondaryLabel}
                  </Link>
                </>
              ) : null}
            </div>
          </section>

          {page.relatedLinks.length ? (
            <nav className="not-prose mt-14 border-t border-stone-200 pt-10" aria-label="Related reading">
              <h2 className="text-base font-semibold tracking-tight text-stone-900">Related reading</h2>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed">
                {page.relatedLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-medium text-[#6b5420] underline decoration-stone-300 underline-offset-[3px] transition hover:text-stone-900 hover:decoration-stone-500"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </main>
    </article>
  );
}
