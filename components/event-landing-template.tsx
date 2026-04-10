import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection } from "@/components/sections";
import { FAQAccordion } from "@/components/faq-accordion";
import { bookNowSectionClass } from "@/lib/cta-styles";
import type { EventLandingContent } from "@/lib/event-landing-data";
import { business } from "@/lib/site-data";

const callOnDarkClass =
  "inline-flex touch-manipulation items-center justify-center rounded-full border-2 border-stone-400/90 bg-transparent px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:border-white hover:bg-white/10 sm:px-6 sm:py-3.5 sm:text-base";

const callOnLightClass =
  "inline-flex touch-manipulation items-center justify-center rounded-full border-2 border-stone-400/80 bg-white px-5 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-stone-600 hover:bg-stone-50 sm:px-6 sm:py-3.5 sm:text-base";

export function EventLandingTemplate({ content }: { content: EventLandingContent }) {
  return (
    <>
      <section className="border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-stone-100 py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">{content.heroEyebrow}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-[2.35rem] lg:leading-[1.15]">
              {content.h1}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-stone-600 sm:text-lg">{content.heroIntro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact#quote" className={bookNowSectionClass}>
                Start planning
              </Link>
              <a href={business.phoneHref} className={callOnLightClass}>
                Call {business.phone}
              </a>
            </div>
            <p className="mt-4 text-sm text-stone-500">Event Concierge support · {business.state}</p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] ring-1 ring-stone-200/80">
              <Image
                src={content.heroImage}
                alt={content.heroImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: content.h1 }]} />
        </div>
      </section>

      <div className="border-b border-stone-200 bg-[#111315] py-4 text-center">
        <p className="mx-auto max-w-4xl px-4 text-sm text-stone-300">{content.trustLine}</p>
        <p className="mt-1 text-xs text-stone-500">Family owned · Since {business.establishedYear} · {business.celebrationTagline}</p>
      </div>

      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-900">{content.narrativeTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-stone-600">{content.narrativeBody}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-stone-500">{content.splitLeftTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">{content.splitLeftBody}</p>
              <hr className="my-6 border-stone-200" />
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-stone-500">{content.splitRightTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">{content.splitRightBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-200/80 lg:order-1">
              <Image src={content.splitImage} alt={content.splitImageAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </div>
            <div className="lg:order-2">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-900">{content.caresTitle}</h2>
              <div className="mt-6 grid gap-4 sm:gap-5">
                {content.caresCards.map((card, i) => (
                  <div
                    key={card.title}
                    className="flex gap-4 rounded-2xl border border-stone-200 bg-stone-50/80 p-5 transition hover:border-stone-300"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b78a2d]/15 text-sm font-semibold text-[#6b5220]"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-stone-900">{card.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">{card.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#1a1d20] to-[#272b30] px-6 py-10 text-stone-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:px-10 md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.65rem]">{content.midCtaHeadline}</h2>
              <p className="mt-3 text-base leading-relaxed text-stone-300">{content.midCtaSub}</p>
            </div>
            <div className="mt-6 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0">
              <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center`}>
                Book now
              </Link>
              <a href={business.phoneHref} className={`${callOnDarkClass} justify-center`}>
                Call now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-semibold text-stone-900">{content.planningTitle}</h2>
              <ul className="mt-5 space-y-4">
                {content.planningItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-stone-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a24a]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-[#b78a2d]/35 bg-[#fffbf0] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-stone-900">{content.weatherTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">{content.weatherBody}</p>
              <p className="mt-6 text-sm text-stone-600">
                More on backup planning:{" "}
                <Link href="/faq#faq-rain-plan" className="font-semibold text-stone-900 underline underline-offset-2">
                  rain and weather FAQs
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-stone-900">{content.upgradesTitle}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.upgrades.map((u) => (
              <div key={u.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="font-semibold text-stone-900">{u.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-stone-900">Questions we hear often</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-stone-600">
            Straight answers—call us if yours is not listed.
          </p>
          <div className="mt-8">
            <FAQAccordion items={content.faq} />
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-stone-500">Related planning</p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {content.relatedLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-sm font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 transition hover:text-stone-950 hover:decoration-stone-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
