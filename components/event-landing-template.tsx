import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection } from "@/components/sections";
import { SmsTentDetailsCta } from "@/components/sms-tent-details-cta";
import { FAQAccordion } from "@/components/faq-accordion";
import { CallAndTextCta } from "@/components/call-and-text-stack";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import type { EventLandingContent } from "@/lib/event-landing-data";
import { business } from "@/lib/site-data";

const eventSectionNav = [
  { href: "#overview", label: "Overview" }, { href: "#priorities", label: "Priorities" }, { href: "#planning", label: "Planning" }, { href: "#upgrades", label: "Upgrades" }, { href: "#faq", label: "FAQ" }, { href: "#related", label: "Links" }, ];

function EventLandingStickyNav() {
  return (
    <div className="sticky z-40 border-b border-[#e3d3b0]/50 bg-[#faf9f7]/95 py-1.5 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-[#faf9f7]/90 [top:max(0px,calc(env(safe-area-inset-top,0px)+6.25rem))] md:[top:max(0px,calc(env(safe-area-inset-top,0px)+9.25rem))] lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:py-0 lg:shadow-none lg:backdrop-blur-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Jump to sections on this page">
          <ul className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] md:flex-wrap md:justify-center md:gap-2.5">
            {eventSectionNav.map((item) => (
              <li key={item.href} className="shrink-0">
                <a
                  href={item.href}
                  className="inline-flex rounded-full border border-stone-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-800 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:border-[#d4c4a0] hover:bg-[#fffdf8] sm:px-4 sm:py-2 sm:text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function EventLandingTemplate({
  content,
  graduationSms = false,
}: {
  content: EventLandingContent;
  /** Graduation landing only: optional SMS block below hero CTAs */
  graduationSms?: boolean;
}) {
  return (
    <>
      <section className="border-b border-[#e3d3b0]/40 bg-gradient-to-br from-[#faf9f7] via-white to-[#f5f0e8]/90 py-7 sm:py-9 lg:py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">{content.heroEyebrow}</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-[2.2rem] lg:leading-[1.18] [font-family:var(--font-display)]">
              {content.h1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-[1.05rem] sm:leading-relaxed">{content.heroIntro}</p>
            <div className="mt-6 flex flex-wrap items-end gap-3">
              <Link href="/contact#quote" className={bookNowSectionClass}>
                Book Consultation
              </Link>
              <CallAndTextCta variant="section" linkClassName={`${callNowSectionClass} max-w-full`} />
            </div>
            <p className="mt-3 text-sm text-stone-500">Event Concierge support · {business.state}</p>
            {graduationSms ? (
              <SmsTentDetailsCta
                location="graduation-page"
                buttonText="Text Graduation Details"
                className="mt-5 max-w-lg"
                helperText="Planning a graduation party? Text us the date, time, town or pin, guest count, and an optional yard photo."
                helperClassName="mt-2 text-[11px] leading-snug text-stone-500 sm:text-xs"
              />
            ) : null}
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_12px_36px_rgba(45,35,20,0.08)] ring-2 ring-[#e3d3b0]/90 ring-offset-2 ring-offset-[#faf9f7]">
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

      <EventLandingStickyNav />

      <section className="border-b border-stone-200/80 bg-white py-2 sm:py-2.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: content.h1 }]} />
        </div>
      </section>

      <div className="border-b border-[#3d3520]/80 bg-[#111315] py-3 text-center">
        <p className="mx-auto max-w-4xl px-4 text-sm leading-snug text-stone-300">{content.trustLine}</p>
        <p className="mt-1 text-xs text-[#c9a24a]/80">
          Family owned · Since {business.establishedYear} · {business.celebrationTagline}
        </p>
      </div>

      <section id="overview" className="scroll-mt-36 py-7 sm:py-9 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-2 lg:gap-10 lg:items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 [font-family:var(--font-display)]">{content.narrativeTitle}</h2>
              <p className="mt-3 text-base leading-relaxed text-stone-600">{content.narrativeBody}</p>
            </div>
            <div className="rounded-2xl border border-[#e3d3b0]/90 bg-gradient-to-br from-[#fdf8ed] via-[#faf4e8] to-[#f0e6d4] p-5 shadow-[0_2px_16px_rgba(45,35,20,0.05)] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8f6f28]">{content.splitLeftTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-800">{content.splitLeftBody}</p>
              <hr className="my-4 border-[#e3d3b0]/60" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8f6f28]">{content.splitRightTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-800">{content.splitRightBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="priorities" className="scroll-mt-36 bg-white py-7 sm:py-9 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md ring-2 ring-[#e3d3b0]/70 lg:order-1">
              <Image src={content.splitImage} alt={content.splitImageAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </div>
            <div className="lg:order-2">
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 [font-family:var(--font-display)]">{content.caresTitle}</h2>
              <div className="mt-4 grid gap-3 sm:gap-3.5">
                {content.caresCards.map((card, i) => (
                  <div
                    key={card.title}
                    className="flex gap-3 rounded-2xl border border-[#e3d3b0]/85 bg-gradient-to-br from-[#fffefb] to-[#f7f0e4]/90 p-4 shadow-sm transition hover:border-[#d4c4a0] sm:gap-4 sm:p-4"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c9a24a]/40 bg-[#fffdf8] text-sm font-bold text-[#6b5220]"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-stone-900">{card.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">{card.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-7 sm:py-9 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#c9a24a]/25 bg-gradient-to-r from-[#1a1d20] to-[#272b30] px-5 py-7 text-stone-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:px-8 sm:py-8 md:flex md:items-center md:justify-between md:gap-6">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d4a84b]">Next step</p>
              <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl [font-family:var(--font-display)]">{content.midCtaHeadline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-300 sm:text-base">{content.midCtaSub}</p>
            </div>
            <div className="mt-5 flex shrink-0 flex-col gap-2.5 sm:flex-row md:mt-0 md:items-end">
              <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center`}>
                Book Consultation
              </Link>
              <CallAndTextCta
                variant="section"
                labelClassName="text-stone-200"
                captionClassName="text-stone-400"
                linkClassName={`${callNowSectionClass} justify-center`}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="planning" className="scroll-mt-36 bg-stone-50 py-7 sm:py-9 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-2xl border border-[#e3d3b0]/90 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-stone-900 sm:text-xl [font-family:var(--font-display)]">{content.planningTitle}</h2>
              <ul className="mt-4 space-y-3">
                {content.planningItems.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-stone-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-[#e3d3b0]/90 bg-gradient-to-br from-[#fffdf8] to-[#faf0dc] p-5 sm:p-6">
              <h2 className="text-lg font-bold text-stone-900 sm:text-xl [font-family:var(--font-display)]">{content.weatherTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-800">{content.weatherBody}</p>
              <p className="mt-4 text-sm text-stone-600">
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

      <section id="upgrades" className="scroll-mt-36 py-7 sm:py-9 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-stone-900 [font-family:var(--font-display)]">{content.upgradesTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5">
            {content.upgrades.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl border border-[#e3d3b0]/85 bg-gradient-to-br from-[#fffefb] to-[#f5ebe0]/80 p-5 shadow-sm transition hover:border-[#d4c4a0]"
              >
                <p className="font-bold text-stone-900">{u.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-36 border-t border-[#e3d3b0]/35 bg-white py-7 sm:py-9 lg:py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-stone-900 [font-family:var(--font-display)]">Questions we hear often</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-stone-600">
            Straight answers. Call us if yours is not listed.
          </p>
          <div className="mt-6">
            <FAQAccordion items={content.faq} variant="gold" />
          </div>
        </div>
      </section>

      <section id="related" className="scroll-mt-36 bg-gradient-to-b from-stone-50 to-[#faf6ef]/80 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7328]">Related planning</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {content.relatedLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-sm font-semibold text-[#5c4518] underline decoration-[#d4b87a] underline-offset-4 transition hover:text-stone-950 hover:decoration-[#9a7328]"
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
