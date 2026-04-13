import Image from "next/image";
import Link from "next/link";
import { bookNowSectionClass, callNowHeroClass } from "@/lib/cta-styles";
import { business, galleryItems } from "@/lib/site-data";

const shell = "mx-auto w-full max-w-[min(100%,88rem)] px-4 sm:px-6 lg:px-10";

const secondaryBtnLightClass =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-300 bg-white px-6 py-3 text-base font-semibold text-stone-900 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e8c547] focus-visible:ring-offset-2 sm:min-h-[52px] sm:px-8 sm:text-lg";

const outdoorFaq = [
  {
    q: "Do I need a tent for an outdoor wedding?",
    a: "Not always, but many couples use a tent to create weather protection, define the event space, and make the wedding feel more complete and comfortable.",
  },
  {
    q: "How do I know what size tent I need?",
    a: "Tent size depends on more than guest count. It also depends on your dining layout, dance floor, bar area, entertainment, and how open you want the reception to feel.",
  },
  {
    q: "What else do I need besides the tent?",
    a: "Most outdoor weddings also need a plan for tables, chairs, lighting, weather backup, guest flow, and practical logistics like catering, access, and comfort.",
  },
  {
    q: "What happens if it rains?",
    a: "That is exactly why outdoor weddings should be planned with weather in mind from the start. A strong setup should still feel functional and calm if conditions change.",
  },
  {
    q: "Can a tent expand an existing venue?",
    a: "Yes. A tent can add guest capacity, create weather flexibility, support cocktail hour, or expand the reception footprint outdoors.",
  },
  {
    q: "Can you help with backyard weddings?",
    a: "Yes. Backyard weddings often need more intentional planning because the property is not already functioning like an event venue.",
  },
  {
    q: "How early should we book?",
    a: "Earlier is better, especially for popular wedding dates. Outdoor weddings usually involve more planning than people expect.",
  },
  {
    q: "Can you work with my wedding planner or venue?",
    a: "Yes. We coordinate with planners and venue teams so timelines, load-in, and layout decisions stay aligned with your run of show.",
  },
] as const;

/** On-page FAQ JSON-LD (distinct from global `/faq` schema). */
export const weddingTentOutdoorFaqSchemaItems = outdoorFaq.map((item) => ({
  question: item.q,
  answer: item.a,
}));

const planningItems = [
  {
    title: "Guest count",
    body: "Your guest count helps shape the right tent size, seating layout, and overall event footprint.",
  },
  {
    title: "Dining style",
    body: "A seated dinner, buffet, stations, or cocktail-style reception all use space differently.",
  },
  {
    title: "Dance floor and entertainment",
    body: "Your layout changes if you need room for a DJ, band, stage, or a full dance floor.",
  },
  {
    title: "Rain backup",
    body: "Outdoor weddings should feel prepared, not rushed. Build the weather plan in early.",
  },
  {
    title: "Lighting",
    body: "Good lighting helps the space feel warm, polished, and usable after sunset.",
  },
  {
    title: "Guest comfort",
    body: "Bathrooms, sidewalls, walk paths, and flow matter more than many couples realize.",
  },
  {
    title: "Vendor logistics",
    body: "Catering, bar service, parking, loading access, and setup space should be considered early.",
  },
] as const;

const pairedRentals = [
  "Reception tables",
  "Ceremony and reception chairs",
  "Cocktail tables",
  "Lighting",
  "Sidewalls",
  "Dance floor",
  "Staging",
  "Lounge seating",
] as const;

const galleryCaptions = [
  "Backyard wedding reception layout",
  "Outdoor wedding tent designed for dinner and dancing",
  "Venue expansion setup for added reception space",
  "Elegant wedding layout with practical flow",
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
      <section className="relative isolate min-h-[min(76vh,900px)] overflow-hidden bg-[#0c0b09]" aria-labelledby="wedding-page-h1">
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

        {/* Compact lux header: gold/black gradient into the photo, no breadcrumbs */}
        <div className="absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black via-black/88 to-transparent pb-10 pt-4 sm:pb-12 sm:pt-5 md:pt-6">
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
          className={`relative z-10 flex min-h-[min(76vh,900px)] flex-col justify-end pb-5 pt-36 sm:pb-7 sm:pt-40 md:pt-44 ${shell}`}
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
                "Tented receptions, estates & backyards",
                "Venue expansions & rain smart layouts",
                "Tables, chairs, lighting & coordination",
              ].map((line) => (
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
                Request a Wedding Quote
              </Link>
              <Link
                href="/tents/gallery"
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border-2 border-white/85 bg-white/15 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:bg-white/25 sm:text-[15px]"
              >
                View wedding gallery
              </Link>
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
                {["Cleaner planning support", "Practical layout thinking", "Faster quote conversations", "Easier event flow coordination"].map((x) => (
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
                <Link href="/tent-rentals#plan-your-tent" className="font-semibold text-stone-900 underline decoration-[#b78a2d]/50 underline-offset-4 hover:decoration-stone-900">
                  how we plan tent footprints
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
              <h3 className="text-lg font-semibold text-stone-900 sm:text-xl">What couples often do not realize they need</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-stone-700 sm:text-[15px]">
                {[
                  "Tent size based on layout, not just guest count",
                  "Space for dinner, dancing, and guest movement",
                  "A weather backup plan",
                  "Lighting for the full event timeline",
                  "Bar and catering flow",
                  "Bathrooms and walking paths",
                  "Parking and site access",
                  "A plan that works for the property",
                ].map((line) => (
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

      {/* 4. What to plan for */}
      <section className="border-y border-stone-200 bg-white py-14 sm:py-16" id="plan-outdoor-wedding" aria-labelledby="plan-outdoor-heading">
        <div className={shell}>
          <h2 id="plan-outdoor-heading" className="max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            What do you need to plan for an outdoor wedding?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-600 sm:text-lg">
            Most outdoor weddings need more than a tent. The best setups are built around how the wedding will actually move, not just how it will look in a photo.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {planningItems.map((item, i) => (
              <article key={item.title} className="rounded-xl border border-stone-200/90 bg-[#faf8f5] p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8a6d3a]">
                  {i + 1}. {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-700 sm:text-[15px]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ grid */}
      <section className="bg-[#111315] py-14 text-stone-100 sm:py-16" id="outdoor-wedding-faq" aria-labelledby="faq-heading">
        <div className={shell}>
          <h2 id="faq-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Common outdoor wedding questions
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-stone-400 sm:text-base">
            Straight answers in plain language, helpful for couples and{" "}
            <Link href="/contact#quote" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              quote requests
            </Link>
            .
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10">
            {outdoorFaq.map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">{q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300 sm:text-[15px]">{a}</p>
              </div>
            ))}
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
                "Tent recommendations based on guest count and layout",
                "Help thinking through weather and comfort",
                "Guidance around dining, dancing, and event flow",
                "Support pairing tents with tables, chairs, and lighting",
                "A more practical path from idea to quote",
              ].map((line) => (
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
                  "Faster quote conversations",
                  "Cleaner layout planning",
                  "Better support for dining, dancing, and bar flow",
                  "Easier weather-readiness conversations",
                  "More practical rental coordination",
                  "Support for outdoor weddings and venue expansions",
                ].map((line) => (
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
                  contact for quotes
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
                "Add guest capacity",
                "Expand reception space",
                "Create cocktail or ceremony areas",
                "Build in weather flexibility",
                "Make outdoor space more usable",
                "Give couples more layout options",
              ].map((line) => (
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
            What to have ready before you request a quote
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
              "Wedding date",
              "Town or venue location",
              "Estimated guest count",
              "Ceremony, cocktail hour, or reception needs",
              "Backyard, private property, or venue expansion",
              "Tables, chairs, lighting, or dance floor needs",
              "Weather concerns or site limitations",
              "Planner or venue contact if applicable",
            ].map((line) => (
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
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Request a Wedding Quote
            </Link>
            {phoneOk ? (
              <a href={business.phoneHref} className={callNowHeroClass}>
                Call {business.phone}
              </a>
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
                      Request a quote
                    </Link>{" "}
                   , we respond with clear next steps and layout guidance.
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <Link href="/contact#quote" className={`${bookNowSectionClass} w-full justify-center text-center`}>
                  Request a Wedding Quote
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
