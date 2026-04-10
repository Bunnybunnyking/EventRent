import Image from "next/image";
import Link from "next/link";
import { FAQAccordion } from "@/components/faq-accordion";
import {
  InventoryOverviewSection,
  PopularRentalCategoriesSection,
  QuoteWorkflowSection,
  WhatWeOfferSection,
} from "@/components/inventory-sections";
import { CTASection, GalleryGrid, SectionHeading, ServiceAreaBlock } from "@/components/sections";
import { bookNowSectionClass, callNowHeroClass } from "@/lib/cta-styles";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { business, eventTypeLinks, faqItems, services, testimonials, townList, trustPoints } from "@/lib/site-data";
import { FAQSchemaItems } from "@/components/schema";

export const metadata = createPageMetadata({
  title: "Wethersfield, CT Tent Rentals & Party Tent Rentals | Hartford Area & Statewide",
  description:
    "Party tent and wedding tent rentals for Wethersfield, CT and all of Connecticut: marquee tents, tables, chairs, dance floor, lighting, and professional setup. Backyard weddings, receptions, and corporate events. Fast quotes and delivery.",
  path: "/",
  ogImage: defaultOgImagePath,
});

export default function HomePage() {
  return (
    <>
      <FAQSchemaItems items={faqItems.slice(0, 5)} />
      <section aria-label="Featured event tent setup" className="relative w-full overflow-hidden bg-[#0f1214]">
        <div className="relative aspect-[21/9] min-h-[220px] w-full sm:min-h-[280px] md:min-h-[min(42vw,420px)] lg:min-h-[min(38vw,480px)]">
          <Image
            src={defaultOgImagePath}
            alt="Elegant outdoor wedding tent rental in Wethersfield, CT, featuring white lace linens, gold accents, paper lantern lighting, and a marquee reception on the lawn."
            fill
            priority
            sizes="100vw"
            className="object-cover object-center hero-home-fade-in"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#15181b] to-transparent sm:h-20" aria-hidden />
          <div className="absolute right-3 top-3 z-10 sm:right-5 sm:top-5 md:right-6 md:top-6">
            <a href={business.phoneHref} className={`${callNowHeroClass} pointer-events-auto`}>
              Call Now
            </a>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#15181b] text-white">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16 md:pb-28 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#edc16c]">{business.name}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Tent rentals in Wethersfield, {business.primaryCity}, and statewide—polished setups that run on schedule.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#e8dcc4] [font-family:var(--font-display)] sm:text-lg">
            {business.heroBrandTagline}
          </p>
          <p className="mt-5 max-w-2xl text-base text-stone-200">
            Family owned and operated since {business.establishedYear}, we help weddings, backyard celebrations, and corporate events feel organized, elevated, and stress-free with clean equipment, professional setup, and responsive communication.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Book Now
            </Link>
          </div>
          <p className="mt-3 text-xs text-stone-300">Fast quote turnaround. No-pressure planning help. Clear next steps from delivery to pickup.</p>
          <p className="mt-4 max-w-xl text-xs text-stone-400">
            Not sure about sizing or weather backup yet? Start with our{" "}
            <Link href="/planning" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              planning guide
            </Link>
            . Serving hosts statewide—explore{" "}
            <Link href="/service-areas" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              Connecticut tent rental service areas
            </Link>{" "}
            or start with a quote above.
          </p>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-6">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustPoints.map((point) => (
            <p key={point} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
              {point}
            </p>
          ))}
        </div>
      </section>

      <WhatWeOfferSection />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Featured Rentals" title="Built for events that need to look right and run right" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <h3 className="text-xl font-semibold text-stone-900">{service.title}</h3>
                <p className="mt-2 text-stone-600">{service.description}</p>
                <Link href={service.href} className="mt-4 inline-block text-sm font-semibold text-stone-800 underline underline-offset-4">
                  Explore {service.title}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InventoryOverviewSection />

      <PopularRentalCategoriesSection />

      <QuoteWorkflowSection />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Event Types" title="Designed for weddings, private events, and organized public programs" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {eventTypeLinks.map((event) => (
              <Link
                key={event.label}
                href={event.href}
                className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
              >
                {event.label}
                <span className="ml-1 text-stone-400" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight">What clients worry about, solved up front</h2>
            <ul className="mt-5 space-y-3 text-sm text-stone-700">
              <li>Concerned about no-shows? We confirm timing windows and keep communication clear before event day.</li>
              <li>Worried about equipment condition? Every tent, table, and chair is inspected before deployment.</li>
              <li>Need rain confidence? We plan sidewalls and weather-ready options in advance.</li>
              <li>Afraid of hidden charges? We provide transparent quote details and practical recommendations.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-[#111315] p-7 text-stone-100 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
            <ol className="mt-5 space-y-3 text-sm text-stone-300">
              <li>1. Share your date, town, and guest count.</li>
              <li>2. We recommend a tent size and rental package.</li>
              <li>3. You receive a clear quote with timeline details.</li>
              <li>4. Our crew delivers, sets up, and returns for breakdown.</li>
            </ol>
            <Link href="/contact#quote" className={`${bookNowSectionClass} mt-5 inline-flex text-base sm:text-lg`}>
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Tent Planning"
            title="Not sure what size tent you need?"
            intro="We plan around guest count, seating style, dance floor, food service, and weather backup so your layout works in real life, not just on paper."
          />
          <div className="mt-8 grid gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-stone-900">60-80 guests</p>
              <p className="mt-1 text-sm text-stone-600">Popular for backyard celebrations and graduation parties.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">100-150 guests</p>
              <p className="mt-1 text-sm text-stone-600">Ideal for wedding receptions and larger private events.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">200+ guests</p>
              <p className="mt-1 text-sm text-stone-600">Corporate, school, municipal, and multi-zone event planning.</p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-stone-600">
            For sizing methodology and layout factors, see{" "}
            <Link href="/faq#faq-tent-size" className="font-semibold text-stone-800 underline underline-offset-2">
              what size tent do I need?
            </Link>
            .
          </p>
        </div>
      </section>

      <ServiceAreaBlock />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Testimonials" title="Trusted by hosts across Connecticut" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <blockquote className="text-sm text-stone-700">“{item.quote}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-stone-900">{item.name}</figcaption>
                <p className="text-xs text-stone-500">{item.event}</p>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Gallery Preview" title="Clean setups with polished, professional presentation" />
            <Link href="/tents/gallery" className="hidden text-sm font-semibold text-stone-800 underline underline-offset-4 md:block">
              View full gallery
            </Link>
          </div>
          <GalleryGrid preview />
          <Link href="/tents/gallery" className="mt-6 inline-block text-sm font-semibold text-stone-800 underline underline-offset-4 md:hidden">
            View full gallery
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers before you have to call"
            intro="Sizing, guest counts, rain backup, delivery timing, pricing, booking, and hard-surface setups—plain language for Connecticut hosts."
          />
          <div className="mt-8">
            <FAQAccordion items={faqItems.slice(0, 5)} />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
            <Link href="/faq" className="text-sm font-semibold text-stone-800 underline underline-offset-4">
              Browse the full FAQ library
            </Link>
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center`}>
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <CTASection />

      <section className="pb-16">
        <div className="mx-auto max-w-7xl space-y-3 px-4 text-center text-sm text-stone-600 sm:px-6 lg:px-8">
          <p>
            Party tent rentals and event tent rentals in {townList.slice(0, 8).join(", ")}, and nearby towns.
          </p>
          <p>
            Also serving {townList.slice(8, 16).join(", ")}, and communities across {business.state}.
          </p>
          <p>
            <Link href="/service-areas" className="font-semibold text-stone-800 underline underline-offset-2">
              View all Connecticut service areas
            </Link>{" "}
            ·{" "}
            <Link href="/contact#quote" className="font-semibold text-stone-800 underline underline-offset-2">
              Book now
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}