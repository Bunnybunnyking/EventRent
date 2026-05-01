import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { GraduationPartyLocalSection } from "@/components/graduation-party-local-section";
import { FAQSchemaItems } from "@/components/schema";
import { bookNowHeaderClass } from "@/lib/cta-styles";
import { business } from "@/lib/site-data";
import type { ServiceAreaTownPayload } from "@/lib/service-area-town-content";

type Props = {
  townName: string;
  townSlug: string;
  content: ServiceAreaTownPayload;
};

type EmphasisKey = NonNullable<ServiceAreaTownPayload["emphasizedMidSection"]>;

function midEmphasisClass(active: EmphasisKey | undefined, key: EmphasisKey) {
  return active === key ? "rounded-2xl ring-2 ring-[#b8956a]/40 shadow-sm ring-offset-2 ring-offset-white" : "";
}

export function ServiceAreaTownTemplate({ townName, townSlug, content }: Props) {
  const primaryCta = content.primaryCtaLabel ?? "Get a quote";
  const wishlistCta = content.wishlistCtaLabel ?? "Build a wishlist";
  const finalTitle = content.finalCtaTitle ?? `Plan rentals in ${townName}`;
  const quickTitle = content.quickAnswerTitle ?? "At a glance";
  const faqSubline =
    content.faqSubline ?? "Straight answers first, then a little context if it helps.";

  const em = content.emphasizedMidSection;
  const patterns = content.localEventPatterns;
  const hasPatterns = Boolean(patterns?.items?.length);
  const patternsAfterIntro = content.localPatternsAfterIntro ?? false;
  const setupFirst = content.setupBulletsBeforeEvents ?? false;

  const patternsSection = hasPatterns && patterns ? (
    <div className={`mt-6 ${midEmphasisClass(em, "patterns")}`}>
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">{patterns.title}</h2>
        {patterns.intro ? <p className="mt-2 text-sm text-stone-600">{patterns.intro}</p> : null}
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.items.map((item) => (
            <li
              key={item.label}
              className="rounded-xl border border-stone-200/90 bg-[#faf8f5] p-3.5 shadow-sm"
            >
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b5420]">
                {item.label}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-stone-700">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;

  const planningSection =
    content.planningBlockTitle && content.planningBlockItems?.length ? (
      <div className={`mt-6 ${midEmphasisClass(em, "planning")}`}>
        <div className="rounded-2xl border border-[#c9a87a]/40 bg-gradient-to-br from-[#fdfaf6] to-[#f4ead8] p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">{content.planningBlockTitle}</h2>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-stone-800 sm:text-[0.9375rem]">
            {content.planningBlockItems.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a97a21]" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : null;

  const eventSection = (
    <div className={`mt-6 ${midEmphasisClass(em, "events")}`}>
      <div className="rounded-2xl border border-stone-200 bg-[#faf8f5] p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">{content.eventHelpTitle}</h2>
        {content.eventHelpIntro ? <p className="mt-2 text-sm text-stone-600">{content.eventHelpIntro}</p> : null}
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {content.eventHelpItems.map((item) => (
            <li key={item.title} className="rounded-xl border border-stone-200/80 bg-white p-3.5 shadow-sm">
              <h3 className="text-[0.9375rem] font-semibold leading-snug text-stone-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-snug text-stone-600">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const setupBulletsSection = (
    <div className={`mt-6 ${midEmphasisClass(em, "setupBullets")}`}>
      <div>
        <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">{content.setupTitle}</h2>
        {content.setupIntro ? <p className="mt-2 text-sm text-stone-600">{content.setupIntro}</p> : null}
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone-700 sm:text-[0.9375rem]">
          {content.setupItems.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const setupsSection = (
    <div className={`mt-6 ${midEmphasisClass(em, "setups")}`}>
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">{content.setupsTitle}</h2>
        {content.setupsIntro ? <p className="mt-2 text-sm text-stone-600">{content.setupsIntro}</p> : null}
        <ul className="mt-3 space-y-4">
          {content.setups.map((s) => (
            <li key={s.title} className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
              <h3 className="text-base font-semibold text-stone-900">{s.title}</h3>
              <p className="mt-1 text-sm text-stone-600">{s.detail}</p>
              {s.bestFor ? (
                <p className="mt-1.5 text-xs text-stone-700">
                  <span className="font-semibold text-stone-900">Best when:</span> {s.bestFor}
                </p>
              ) : null}
              {s.planningTip ? (
                <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
                  <span className="font-semibold text-stone-700">Planning note:</span> {s.planningTip}
                </p>
              ) : null}
              {s.wishlistHint ? (
                <p className="mt-1 text-xs italic text-stone-500">{s.wishlistHint}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const titleBlock = (
    <>
      <Breadcrumb
        className="mb-3 text-xs sm:text-sm"
        items={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/service-areas" }, { label: townName }]}
      />
      <h1 id="town-service-h1" className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        {content.h1}
      </h1>
      <p className="mt-2.5 text-sm leading-relaxed text-stone-600 sm:text-base">{content.heroLead}</p>
      {content.heroMicroline ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-[#8a6a3a] sm:text-[13px] sm:tracking-[0.16em]">
          {content.heroMicroline}
        </p>
      ) : null}
    </>
  );

  return (
    <>
      <section
        className={`border-b border-stone-200 bg-white ${content.hero ? "pt-5 pb-4 sm:pt-6 sm:pb-5" : "py-7 sm:py-9"}`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{titleBlock}</div>
      </section>

      {content.hero ? (
        <section className="border-b border-stone-200 bg-[#f4f1eb] pt-2 pb-6 sm:pb-7">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <figure className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
              <div className="relative aspect-[16/10] w-full md:aspect-[2.15/1]">
                <Image
                  src={content.hero.src}
                  alt={content.hero.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="border-t border-stone-200 bg-white px-3 py-2 text-center text-xs text-stone-600 sm:text-sm">
                {content.hero.caption}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      <section
        className={`border-b border-stone-200 bg-white ${content.hero ? "pt-6 pb-8 sm:pt-7 sm:pb-10" : "pb-8 sm:pb-10"}`}
      >
        <article
          id={`service-area-${townSlug}`}
          aria-labelledby="town-service-h1"
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        >
          {content.quickAnswer ? (
            <div className="mt-5 rounded-xl border border-[#c9a87a]/45 bg-[#fdfaf6] px-3.5 py-3 sm:px-4 sm:py-3.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#6b5420]">{quickTitle}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-800 sm:text-[0.9375rem]">{content.quickAnswer}</p>
            </div>
          ) : null}

          <div className="mt-5 rounded-xl border border-stone-200/90 bg-stone-50/95 px-3 py-3 sm:px-4">
            {content.trustStripIntro ? (
              <p className="mb-2 text-xs font-semibold text-stone-700 sm:text-sm">{content.trustStripIntro}</p>
            ) : null}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {content.trustPoints.map((line) => (
                <span
                  key={line}
                  className="inline-flex items-center rounded-full border border-stone-200/90 bg-white px-2.5 py-1 text-[11px] font-medium leading-snug text-stone-700 sm:px-3 sm:text-xs"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-stone-700 sm:text-base">{content.localIntro}</p>

          {patternsAfterIntro ? patternsSection : null}
          {planningSection}
          {!patternsAfterIntro ? patternsSection : null}

          {setupFirst ? (
            <>
              {setupBulletsSection}
              {eventSection}
            </>
          ) : (
            <>
              {eventSection}
              {setupBulletsSection}
            </>
          )}

          {setupsSection}

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">{content.featuredTitle}</h2>
            {content.featuredIntro ? <p className="mt-2 text-sm text-stone-600">{content.featuredIntro}</p> : null}
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              {content.featuredRentals.map((r) => (
                <Link
                  key={r.href + r.title}
                  href={r.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-[#faf8f5] shadow-sm transition hover:border-[#c9a87a]/60 hover:shadow-md"
                  data-goodshuffle-item-id={r.goodshuffleItemId || undefined}
                  data-goodshuffle-image-id={r.goodshuffleImageId || undefined}
                  data-goodshuffle-product-slug={r.goodshuffleProductSlug || undefined}
                  data-featured-for-town={r.featuredForTown ? "true" : undefined}
                  data-wishlist-enabled={r.wishlistEnabled ? "true" : undefined}
                  data-waitlist-enabled={r.waitlistEnabled ? "true" : undefined}
                >
                  {r.image ? (
                    <div className="relative aspect-[4/3] w-full border-b border-stone-200 bg-stone-100">
                      <Image
                        src={r.image.src}
                        alt={r.image.alt}
                        fill
                        className="object-cover object-center transition group-hover:brightness-[1.02]"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="border-b border-stone-200 bg-gradient-to-br from-stone-100 to-stone-200/60 px-3 py-4">
                      <p className="text-center text-xs font-semibold uppercase tracking-wide text-stone-500">Curated link</p>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-3.5">
                    {r.eventTags?.length ? (
                      <div className="mb-1.5 flex flex-wrap gap-1">
                        {r.eventTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-600 ring-1 ring-stone-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-950">{r.title}</h3>
                    <p className="mt-1 flex-1 text-sm leading-snug text-stone-600">{r.description}</p>
                    {r.bestFor ? (
                      <p className="mt-1 text-xs text-stone-700">
                        <span className="font-semibold text-stone-900">Best when:</span> {r.bestFor}
                      </p>
                    ) : null}
                    {r.planningTip ? (
                      <p className="mt-1.5 text-xs leading-relaxed text-stone-500">{r.planningTip}</p>
                    ) : null}
                    <span className="mt-2 text-xs font-semibold text-[#8a6218]">{r.ctaLabel ?? "Open"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <GraduationPartyLocalSection townSlug={townSlug} townName={townName} />

          <div className="mt-7">
            <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">{content.faqTitle}</h2>
            <p className="mt-1 text-xs text-stone-500 sm:text-sm">{faqSubline}</p>
            <div className="mt-3 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
              {content.faqs.map((faq) => (
                <details key={faq.id} id={`faq-${townSlug}-${faq.id}`} className="px-4 py-3 sm:px-5">
                  <summary className="cursor-pointer text-sm font-semibold text-stone-900 sm:text-[0.9375rem]">{faq.question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#d4b87a]/50 bg-gradient-to-br from-[#fcf6e8] to-[#f0e4cc] p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">{finalTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-800 sm:text-[0.9375rem]">{content.finalCtaBlurb}</p>
            <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
              <Link href="/contact#quote" className={bookNowHeaderClass}>
                {primaryCta}
              </Link>
              <Link
                href="/wishlist"
                className="inline-flex min-h-[40px] items-center justify-center rounded-full border-2 border-stone-400 bg-white px-4 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-500 hover:bg-stone-50"
              >
                {wishlistCta}
              </Link>
              <a href={business.phoneHref} className={bookNowHeaderClass}>
                Call {business.phone}
              </a>
            </div>
            <p className="mt-3 text-xs leading-snug text-stone-600">
              <span className="font-semibold text-stone-800">{content.relatedLinksIntro ?? "Related"}</span>{" "}
              <Link href="/tents" className="font-semibold text-stone-800 underline underline-offset-2">
                Tent guide
              </Link>
              <span className="text-stone-400"> · </span>
              <Link href="/rental-inventory" className="font-semibold text-stone-800 underline underline-offset-2">
                Inventory
              </Link>
              <span className="text-stone-400"> · </span>
              <Link href="/planning" className="font-semibold text-stone-800 underline underline-offset-2">
                Planning
              </Link>
            </p>
          </div>
        </article>
      </section>

      <FAQSchemaItems
        items={content.faqs.map((f) => ({
          question: f.question, answer: f.answer, }))}
      />
    </>
  );
}
