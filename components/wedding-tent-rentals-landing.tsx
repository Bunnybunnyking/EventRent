import Image from "next/image";
import Link from "next/link";
import { WeddingOutdoorFaqAccordion } from "@/components/wedding-outdoor-faq-accordion";
import { CallAndTextCta } from "@/components/call-and-text-stack";
import { bookNowSectionClass, callNowHeroClass, catalogReserveGlassHeroClass } from "@/lib/cta-styles";
import { business, galleryItems } from "@/lib/site-data";

const shell = "mx-auto w-full max-w-[min(100%,88rem)] px-4 sm:px-6 lg:px-10";

const secondaryBtnLightClass =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-300 bg-white px-6 py-3 text-base font-semibold text-stone-900 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e8c547] focus-visible:ring-offset-2 sm:min-h-[52px] sm:px-8 sm:text-lg";

const outdoorWeddingFaqItems = [
  {
    id: "wfaq-tent-size", question: "What size tent do I need for a wedding?", answer:
      "Tent size depends on guest count plus your layout, dinner style, dance floor, bar, and head table included. We size from how the day actually moves, not a single headcount shortcut. Share your guest count and flow, and we will recommend a footprint that fits Connecticut properties.", }, {
    id: "wfaq-driveway-patio", question: "Can a wedding tent go on a driveway or patio?", answer:
      "Often yes, when the surface is level, stable for weight, and clearances work for stakes or ballast. We confirm access, setbacks, and any HOA or venue rules before locking placement. Send photos or a site address early so we can flag constraints.", }, {
    id: "wfaq-sidewalls", question: "Do I need sidewalls for a wedding tent?", answer:
      "Sidewalls are optional, not mandatory. They add wind and rain protection and a more enclosed feel; open sides maximize views and airflow. Many Connecticut weddings combine sidewalls for weather readiness with open areas for cocktails or dancing.", }, {
    id: "wfaq-book-ahead", question: "How far in advance should I book?", answer:
      "Book as soon as your date is firm, peak Saturdays fill first. Outdoor weddings benefit from earlier planning so tent style, layout, and backup options stay available. If your date is soon, ask anyway; we will be direct about what is still realistic.", }, {
    id: "wfaq-tables-chairs", question: "Can I rent tables and chairs with the tent?", answer:
      "Yes. Coordinating tables, chairs, lighting, and dance floors with the tent keeps layout and load-in simpler than piecing vendors together. We help match inventory to your footprint and timeline.", }, {
    id: "wfaq-backyard-layout", question: "Can you help with backyard wedding layouts?", answer:
      "Yes. Backyards are not built like venues, so we focus on guest flow, utilities, catering access, and tent placement that still feels intentional. Bring rough dimensions and photos, we translate that into a workable plan.", }, {
    id: "wfaq-rain", question: "What happens if it rains?", answer:
      "Plan for rain from day one. A strong layout uses tent coverage, sidewall strategy, and walkways so guests stay dry and the timeline stays calm. Build the backup into the footprint instead of improvising the week of the wedding.", },
] as const;

/** On-page FAQ JSON-LD, must match visible accordion copy. */
export const weddingTentOutdoorFaqSchemaItems = outdoorWeddingFaqItems.map((item) => ({
  question: item.question, answer: item.answer,
}));

const planningItems = [
  {
    title: "Guest Count", body: "Drives tent size, seating, and layout.", }, {
    title: "Dining Style", body: "Dinner, buffet, stations, or cocktail flow all use space differently.", }, {
    title: "Dance & Entertainment", body: "Plan for a DJ, band, stage, or dance floor.", }, {
    title: "Rain Backup", body: "Build the weather plan in from the start.", }, {
    title: "Lighting", body: "Keeps the space polished after sunset.", }, {
    title: "Guest Comfort", body: "Bathrooms, sidewalls, walkways, and flow matter.", }, {
    title: "Vendor Logistics", body: "Catering, bar access, parking, and setup space need room.", },
] as const;

const outdoorPlanningItemListJsonLd = {
  "@context": "https://schema.org", "@type": "ItemList", name: "What to plan for an outdoor wedding", description:
    "Key planning factors for outdoor weddings in Connecticut: guest count, dining style, entertainment, weather backup, lighting, comfort, and vendor logistics.", numberOfItems: planningItems.length, itemListElement: planningItems.map((item, index) => ({
    "@type": "ListItem", position: index + 1, item: {
      "@type": "Thing", name: item.title, description: item.body, }, })),
};

const pairedRentals = [
  "Reception tables", "Ceremony and reception chairs", "Cocktail tables", "Lighting", "Sidewalls", "Dance floor", "Staging", "Lounge seating",
] as const;

const galleryCaptions = [
  "Backyard wedding reception layout", "Outdoor wedding tent designed for dinner and dancing", "Venue expansion setup for added reception space", "Elegant wedding layout with practical flow",
] as const;

function hasContactPhone() {
  return Boolean(business.phone && !business.phone.includes("INSERT"));
}

function hasContactEmail() {
  return Boolean(business.email && !business.email.includes("INSERT"));
}

export function WeddingTentRentalsLanding() {
  const phoneOk = hasContactPhone();
  const emailOk = hasContactEmail();

  return (
    <>
      {/* 1. Hero, lux title overlays image; glass blurb bottom-left (dark glass, not white card) */}
      <section className="relative isolate min-h-[42vh] overflow-hidden bg-[#0c0b09] md:min-h-[min(76vh,900px)]" aria-labelledby="wedding-page-h1">
        <Image
          src="/images/wedding-tent-hero.png"
          alt="Elegant white frame tent wedding reception with round tables and garden chairs at a Connecticut outdoor wedding"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft vignette, keeps eyes on the tent */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/20" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden />

        <div className="absolute right-3 top-3 z-30 hidden sm:right-5 sm:top-5 md:right-6 md:top-6 md:block">
          <Link
            href="/wishlist"
            title="Browse the full rental catalog and reserve a tent"
            className={`${catalogReserveGlassHeroClass} pointer-events-auto`}
          >
            CATALOG & Reserve A Tent
          </Link>
        </div>

        {/* Compact lux header: gold/black gradient into the photo, no breadcrumbs */}
        <div className="absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black via-black/88 to-transparent pb-7 pt-3 sm:pb-12 sm:pt-5 md:pt-6">
          <div className={shell}>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-[#d4a84b] sm:text-[0.62rem]">Private celebrations · Connecticut</p>
            <h1 id="wedding-page-h1" className="mt-2 max-w-4xl">
              <span className="block font-[family-name:var(--font-display)] text-[1.65rem] font-semibold italic leading-[1.15] tracking-[0.02em] text-[#f3e7d4] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-[2rem] md:text-[2.35rem] lg:text-[2.55rem]">
                Lux Weddings by CT Party Rentals
              </span>
              <span className="mt-2 block text-[0.95rem] font-semibold leading-snug text-white/95 [text-shadow:0_2px_14px_rgba(0,0,0,0.75)] sm:mt-2.5 sm:text-[1.05rem] md:text-lg lg:text-xl">
                Wedding Tent Rentals for Outdoor Weddings and Venue Expansions in Connecticut
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-[0.72rem] leading-relaxed text-stone-400 sm:text-xs md:text-sm">
              For discerning couples and families who expect flawless outdoor receptions: tents, layout, and white-glove coordination.
            </p>
            <div className="mt-3 h-px w-14 bg-gradient-to-r from-[#c9a24a] to-transparent opacity-90" aria-hidden />
          </div>
        </div>

        {/* Bottom-left: dark glass blurb (same interactive links as before) */}
        <div
          className={`relative z-10 flex min-h-[42vh] flex-col justify-end pb-5 pt-24 sm:min-h-[min(76vh,900px)] sm:pb-7 sm:pt-40 md:pt-44 ${shell}`}
        >
          <div className="max-w-[20.5rem] rounded-2xl border border-white/30 bg-white/12 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:max-w-[22rem] sm:p-5 md:max-w-[23rem]">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#f5e6bc] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              Plan with confidence
            </p>
            <h2
              id="wedding-hero-subheading"
              className="mt-2 font-[family-name:var(--font-display)] text-[1.28rem] font-semibold leading-[1.22] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-[1.4rem]"
            >
              Your outdoor wedding, weather ready and beautifully laid out
            </h2>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] sm:text-[13px]">
              Share your date, guest count, and vision. We will help with tent size, flow, and rentals that feel intentional.
            </p>
            <ul className="mt-3 space-y-1.5 text-[11.5px] leading-snug text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:text-[12.5px]">
              {[
                "Tented receptions, estates & backyards", "Venue expansions & rain smart layouts", "Tables, chairs, lighting & coordination", ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-[0.3rem] h-1 w-1 shrink-0 rounded-full bg-[#e8c547]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/contact#quote"
                className={`${bookNowSectionClass} !min-h-[46px] w-full justify-center !px-5 !py-2.5 !text-base sm:!text-lg`}
              >
                <span className="md:hidden">Get a Fast Quote</span>
                <span className="hidden md:inline">Book Consultation</span>
              </Link>
              <Link
                href="/tents/gallery"
                className="hidden min-h-[44px] w-full items-center justify-center rounded-full border-2 border-white/85 bg-white/15 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:bg-white/25 sm:text-[15px] md:inline-flex"
              >
                View wedding gallery
              </Link>
              <Link
                href="/tents/gallery"
                className="text-center text-sm font-medium text-white/90 underline underline-offset-2 transition hover:text-white md:hidden"
              >
                View wedding gallery
              </Link>
              {phoneOk ? (
                <p className="text-center text-xs text-white/75 md:hidden">
                  <a href={business.phoneHref} className="font-medium underline-offset-2 hover:underline">
                    {business.phone}
                  </a>
                </p>
              ) : null}
            </div>
            <p className="mt-3 border-t border-white/25 pt-3 text-[10.5px] leading-relaxed text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.45)] sm:text-[11.5px]">
              <Link href="/faq#faq-tent-size" className="font-medium text-[#fcefb8] underline-offset-2 hover:underline">
                Tent sizing
              </Link>
              {" · "}
              <Link href="/faq#faq-rain-plan" className="font-medium text-[#fcefb8] underline-offset-2 hover:underline">
                Rain backup
              </Link>
              {" · "}
              <Link href="/tent-rentals" className="font-medium text-[#fcefb8] underline-offset-2 hover:underline">
                Tent styles
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Audience row */}
      <section className="border-b border-stone-200 bg-white py-14 sm:py-16" aria-labelledby="audience-heading">
        <div className={shell}>
          <div className="mb-10 max-w-3xl">
            <h2 id="audience-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              Who we work with
            </h2>
            <p className="mt-3 text-base text-stone-600">
              Couples, planners, and venues each get rental guidance shaped around how the wedding day actually moves, not just what fits in a photo.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            <article className="rounded-2xl border border-stone-200/90 bg-[#faf8f5] p-6 shadow-sm transition hover:shadow-md sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900 sm:text-2xl">For Couples</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
                We help couples turn outdoor wedding ideas into practical, beautiful event setups that feel polished on the day of the wedding.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                {["Tented receptions", "Backyard and estate weddings", "Weather and comfort planning", "Layout guidance based on guest count"].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-[#a97a21]" aria-hidden>
                      ·
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900 sm:text-2xl">For Wedding Planners</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
                We help planners simplify tented wedding logistics with clearer rental support, better layout conversations, and easier coordination.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                {["Cleaner planning support", "Practical layout thinking", "Faster booking conversations", "Easier event flow coordination"].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-[#a97a21]" aria-hidden>
                      ·
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-stone-200/90 bg-[#faf8f5] p-6 shadow-sm transition hover:shadow-md sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900 sm:text-2xl">For Venues</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
                We help venues expand outdoors with event space that feels intentional, connected, and ready for weddings.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                {["More guest capacity", "Reception or cocktail expansion", "Rain backup flexibility", "Better outdoor event options"].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-[#a97a21]" aria-hidden>
                      ·
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Why more than a tent */}
      <section className="bg-stone-50 py-14 sm:py-16" aria-labelledby="more-than-tent-heading">
        <div className={shell}>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 id="more-than-tent-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Outdoor weddings often need more planning than people expect
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
                A great wedding tent does more than cover guests. It helps create a full event environment for dining, dancing, speeches, service flow, weather backup, and guest comfort.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-600">
                When the setup is done well, a tented wedding does not feel temporary. It feels intentional. For layout depth, see our{" "}
                <Link href="/planning" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/50 underline-offset-4 hover:decoration-stone-900">
                  planning hub
                </Link>
,{" "}
                <Link href="/party-guides" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/50 underline-offset-4 hover:decoration-stone-900">
                  party guides
                </Link>
, and{" "}
                <Link href="/tent-rentals#tent-types" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/50 underline-offset-4 hover:decoration-stone-900">
                  how we plan tent footprints
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
              <h3 className="text-lg font-semibold text-stone-900 sm:text-xl">What couples often do not realize they need</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-stone-700 sm:text-[15px]">
                {[
                  "Tent size based on layout, not just guest count", "Space for dinner, dancing, and guest movement", "A weather backup plan", "Lighting for the full event timeline", "Bar and catering flow", "Bathrooms and walking paths", "Parking and site access", "A plan that works for the property", ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#1d2124]" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What to plan for, compact planning grid */}
      <section
        className="border-y border-stone-200 bg-gradient-to-b from-white via-white to-stone-50/40 py-7 sm:py-9"
        id="plan-outdoor-wedding"
        aria-labelledby="plan-outdoor-heading"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(outdoorPlanningItemListJsonLd) }}
        />
        <div className={shell}>
          <div className="mx-auto max-w-5xl">
            <h2
              id="plan-outdoor-heading"
              className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
            >
              What do you need to plan for an outdoor wedding?
            </h2>
            <p className="mt-1.5 max-w-xl text-[13px] leading-snug text-stone-600 sm:mt-2 sm:text-sm sm:leading-snug">
              Great outdoor weddings are planned around flow, comfort, and backup, not just the photo.
            </p>
            <ol className="mt-4 grid list-none gap-2 p-0 sm:mt-5 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-3 xl:grid-cols-4">
              {planningItems.map((item, i) => (
                <li key={item.title} className="min-w-0">
                  <article className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-md border border-stone-200/90 bg-white px-3 pb-2.5 pt-2.5 shadow-[0_1px_0_rgba(0,0,0,0.03),0_4px_14px_rgba(15,15,15,0.05)] ring-1 ring-stone-900/[0.03] transition duration-200 sm:px-3.5 sm:pb-3 sm:pt-2.5 sm:hover:-translate-y-px sm:hover:border-stone-300/90 sm:hover:shadow-[0_8px_22px_rgba(15,15,15,0.07)]">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#8a6d3a]/90 via-[#c9a24a] to-[#8a6d3a]/90"
                      aria-hidden
                    />
                    <div className="flex items-start gap-2">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#c9a24a]/40 bg-[#fcf9f4] text-[10px] font-bold tabular-nums leading-none text-[#5c4a2a]"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[0.78rem] font-bold leading-tight tracking-tight text-stone-900 sm:text-[0.8125rem]">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-[11px] leading-[1.35] text-stone-600 text-pretty sm:text-[11.5px] sm:leading-snug">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 5. FAQ accordion */}
      <section
        className="bg-[#111315] py-9 text-stone-100 sm:py-11"
        id="outdoor-wedding-faq"
        aria-labelledby="faq-heading"
      >
        <div className={shell}>
          <h2 id="faq-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Wedding tent &amp; outdoor reception FAQs
          </h2>
          <p className="mt-2 max-w-2xl text-[13px] leading-snug text-stone-400 sm:text-sm">
            Tap a question for a direct answer, written for Connecticut couples, planners, and venues. Ready to move forward? Start with{" "}
            <Link href="/contact#quote" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              booking
            </Link>
            .
          </p>
          <div className="mt-5 sm:mt-6">
            <WeddingOutdoorFaqAccordion items={outdoorWeddingFaqItems} />
          </div>
        </div>
      </section>

      {/* 6. How we help couples */}
      <section className="bg-white py-14 sm:py-16" aria-labelledby="help-couples-heading">
        <div className={shell}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="help-couples-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                How we help couples
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-600">
                We help couples move from inspiration to an actual plan. Whether you are hosting a backyard wedding, tented reception, or celebration on private property, we help you think through the details that make the day feel easier and more polished.
              </p>
            </div>
            <ul className="rounded-2xl border border-stone-200 bg-[#faf8f5] p-6 sm:p-8">
              {[
                "Tent recommendations based on guest count and layout", "Help thinking through weather and comfort", "Guidance around dining, dancing, and event flow", "Support pairing tents with tables, chairs, and lighting", "A more practical path from idea to booking", ].map((line) => (
                <li key={line} className="flex gap-3 border-b border-stone-200/80 py-3 text-sm text-stone-800 last:border-0 last:pb-0 first:pt-0 sm:text-[15px]">
                  <span className="font-semibold text-[#a97a21]">→</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Planners */}
      <section className="border-y border-stone-200 bg-stone-50 py-14 sm:py-16" aria-labelledby="help-planners-heading">
        <div className={shell}>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  "Faster booking conversations", "Cleaner layout planning", "Better support for dining, dancing, and bar flow", "Easier weather-readiness conversations", "More practical rental coordination", "Support for outdoor weddings and venue expansions", ].map((line) => (
                  <li key={line} className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm sm:text-[15px]">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <h2 id="help-planners-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                How we help wedding planners
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-600">
                Wedding planners need a rental partner that helps reduce friction, not add to it. We support planners with clearer rental guidance, cleaner layout thinking, and practical conversations around how the event will actually function.
              </p>
              <p className="mt-4 text-sm text-stone-500">
                Useful cross-links:{" "}
                <Link href="/tent-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                  Connecticut tent rentals
                </Link>
,{" "}
                <Link href="/table-chair-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                  tables &amp; chairs
                </Link>
,{" "}
                <Link href="/contact#quote" className="font-medium text-stone-800 underline underline-offset-2">
                  contact to book
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Venues */}
      <section className="bg-white py-14 sm:py-16" aria-labelledby="help-venues-heading">
        <div className={shell}>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 id="help-venues-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                How we help venues expand outdoors
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-600">
                A tent can help a venue do more without making the event feel disconnected. We help venues create additional space that feels like part of the wedding experience, whether the goal is more capacity, weather backup, or a better outdoor event footprint.
              </p>
            </div>
            <ul className="columns-1 gap-3 sm:columns-2 sm:gap-4">
              {[
                "Add guest capacity", "Expand reception space", "Create cocktail or ceremony areas", "Build in weather flexibility", "Make outdoor space more usable", "Give couples more layout options", ].map((line) => (
                <li key={line} className="mb-3 break-inside-avoid rounded-lg border border-stone-200 bg-[#faf8f5] px-4 py-2.5 text-sm text-stone-800">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9. Paired rentals */}
      <section className="border-t border-stone-200 bg-[#faf8f5] py-14 sm:py-16" aria-labelledby="paired-rentals-heading">
        <div className={shell}>
          <h2 id="paired-rentals-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Wedding rentals commonly paired with tents
          </h2>
          <p className="mt-3 max-w-3xl text-base text-stone-600">
            The best tented weddings are built as full event spaces, not just covered seating areas. Bundle thinking with{" "}
            <Link href="/table-chair-rentals" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/40 underline-offset-4">
              table and chair rentals
            </Link>{" "}
            and{" "}
            <Link href="/tent-rentals#tent-add-ons" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/40 underline-offset-4">
              tent add-ons
            </Link>
            .
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {pairedRentals.map((label) => (
              <div
                key={label}
                className="flex items-center justify-center rounded-xl border border-stone-200/90 bg-white px-3 py-5 text-center text-sm font-medium text-stone-800 shadow-sm sm:text-[15px]"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Checklist */}
      <section className="bg-[#1a1d20] py-14 text-stone-100 sm:py-16" id="quote-checklist" aria-labelledby="checklist-heading">
        <div className={shell}>
          <h2 id="checklist-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            What to have ready before you book
          </h2>
          <p className="mt-3 max-w-3xl text-stone-400">
            Even a rough starting point helps. The more we know, the easier it is to build a useful recommendation, including{" "}
            <Link href="/faq#faq-tent-size" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              tent size
            </Link>{" "}
            and{" "}
            <Link href="/faq#faq-rain-plan" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              rain backup
            </Link>
            .
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Wedding date", "Town or venue location", "Estimated guest count", "Ceremony, cocktail hour, or reception needs", "Backyard, private property, or venue expansion", "Tables, chairs, lighting, or dance floor needs", "Weather concerns or site limitations", "Planner or venue contact if applicable", ].map((line) => (
              <li
                key={line}
                className="flex gap-3 rounded-xl border border-stone-600/50 bg-white/5 px-4 py-3 text-sm leading-snug text-stone-200"
              >
                <span className="text-[#edc16c]" aria-hidden>
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-end gap-4">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Book Consultation
            </Link>
            {phoneOk ? (
              <CallAndTextCta variant="hero" linkClassName={callNowHeroClass} wrapperClassName="items-start sm:items-center" />
            ) : null}
          </div>
        </div>
      </section>

      {/* 11. Gallery */}
      <section className="bg-white py-14 sm:py-16" aria-labelledby="gallery-heading">
        <div className={shell}>
          <h2 id="gallery-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Real Connecticut wedding &amp; reception setups
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-600">
            Beautiful weddings work best when the layout is as thoughtful as the décor. See more in our{" "}
            <Link href="/tents/gallery" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/40 underline-offset-4">
              full tent gallery
            </Link>
            .
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {galleryItems.map((item, index) => (
              <figure key={item.src} className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                <figcaption className="border-t border-stone-200 bg-white px-3 py-2.5 text-center text-xs leading-snug text-stone-600 sm:text-[13px]">
                  {galleryCaptions[index] ?? item.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="border-t border-stone-200 bg-gradient-to-br from-[#f7f5f1] via-white to-[#faf8f5] py-16 sm:py-20" aria-labelledby="final-cta-heading">
        <div className={shell}>
          <div className="rounded-3xl border border-stone-200/80 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-8">
                <h2 id="final-cta-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                  Planning an outdoor wedding or expanding a venue for a wedding?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
                  Tell us your date, town, guest count, and venue type. We will help you create a wedding setup that feels elegant, functional, and ready for the day.
                </p>
                {(phoneOk || emailOk) && (
                  <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm text-stone-700">
                    {phoneOk && (
                      <div>
                        <dt className="font-medium text-stone-500">Phone</dt>
                        <dd>
                          <a href={business.phoneHref} className="font-semibold text-stone-900 underline decoration-[#b78a2d]/50 underline-offset-2 hover:text-stone-700">
                            {business.phone}
                          </a>
                        </dd>
                      </div>
                    )}
                    {emailOk && (
                      <div>
                        <dt className="font-medium text-stone-500">Email</dt>
                        <dd>
                          <a href={`mailto:${business.email}`} className="font-semibold text-stone-900 underline decoration-[#b78a2d]/50 underline-offset-2 hover:text-stone-700">
                            {business.email}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
                {!phoneOk && !emailOk ? (
                  <p className="mt-6 text-sm text-stone-600">
                    Prefer to start online?{" "}
                    <Link href="/contact#quote" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/40 underline-offset-4">
                      Book Consultation
                    </Link>{" "}
, we respond with clear next steps and layout guidance.
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <Link href="/contact#quote" className={`${bookNowSectionClass} w-full justify-center text-center`}>
                  Book Consultation
                </Link>
                <Link href="/tents/gallery" className={`${secondaryBtnLightClass} w-full justify-center`}>
                  View Tent Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
