import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection, SectionHeading } from "@/components/sections";
import { FAQAccordion } from "@/components/faq-accordion";
import { QuickEventPlanner } from "@/components/quick-event-planner";
import { TentSizeEstimator } from "@/components/tent-size-estimator";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import { defaultOgImagePath } from "@/lib/metadata";
import {
  eventTypeGuides,
  forgotCategories,
  layoutExamples,
  planningQuickStartCards,
  planningSteps,
  planningTimelineBlocks,
  tentSizeChartRows,
} from "@/lib/planning-hub-content";
import { planningFaqItems } from "@/lib/planning-faq";
import { business } from "@/lib/site-data";

const sectionNav = [
  { href: "#size-guide", label: "Planning tools" },
  { href: "#tent-size-estimator", label: "Sq ft calculator" },
  { href: "#quick-event-planner", label: "Quick planner" },
  { href: "#step-by-step", label: "Steps" },
  { href: "#layout-examples", label: "Examples" },
  { href: "#tent-types", label: "Tent types" },
  { href: "#site-surface", label: "Site" },
  { href: "#weather", label: "Weather" },
  { href: "#tables-flow", label: "Tables" },
  { href: "#forgot", label: "Easy to forget" },
  { href: "#occasions", label: "By event" },
  { href: "#timeline", label: "Timeline" },
  { href: "#quick-start", label: "Quick start" },
  { href: "#faq", label: "FAQ" },
];

function PlanningSectionNav() {
  return (
    <nav aria-label="Jump to planning topics">
      <ul className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] md:flex-wrap md:justify-center md:gap-2.5">
        {sectionNav.map((item) => (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              className="inline-flex rounded-full border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-800 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:border-stone-300 hover:bg-stone-50 sm:px-4 sm:text-sm"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function PlanningStickyTopicBar() {
  return (
    <div className="sticky z-40 border-b border-stone-200/90 bg-[#faf9f7]/95 py-2 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-[#faf9f7]/90 [top:max(0px,calc(env(safe-area-inset-top,0px)+6.25rem))] md:[top:max(0px,calc(env(safe-area-inset-top,0px)+9.25rem))] lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:py-0 lg:shadow-none lg:backdrop-blur-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PlanningSectionNav />
      </div>
    </div>
  );
}

const weatherConcerns = [
  "Sun and heat on long afternoon programs",
  "Wind that picks up across open lawns",
  "Quick rain cells that were not on the weekly forecast",
  "Temperature drop after sunset",
  "Food service and cake in humid or breezy air",
];

const weatherResponses = [
  "Sidewalls and window panels balance breeze, warmth, and light",
  "Heaters, fans, and openings keep air moving comfortably",
  "Flooring steadies chairs and equipment on soft ground",
  "Gutters and transitions keep guests dry between spaces",
  "Early planning beats last-minute scrambles",
];

export function PlanningHub() {
  return (
    <>
      <PlanningStickyTopicBar />

      {/* 1. Hero */}
      <section className="border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-stone-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-14 lg:px-8">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Planning · Connecticut</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-[2.45rem] lg:leading-[1.12]">
              Plan your tent, layout, and event setup with confidence
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              Outdoor events run better when the structure matches the program. We walk you through tent size, layout, weather, and the site details people overlook, so you are not guessing from a generic chart.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              This page is written the way our team talks with hosts: practical, calm, and specific to Connecticut seasons and venues. Use it to get oriented, then{" "}
              <Link href="/contact#quote" className="font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
                reach out
              </Link>{" "}
              when you want a real pair of eyes on your date and property.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a href={business.phoneHref} className={callNowSectionClass}>
                Call Now
              </a>
              <Link href="/contact#quote" className={bookNowSectionClass} title="Open the quote request form" prefetch={true}>
                Book Now
              </Link>
            </div>
            <p className="mt-4 text-sm text-stone-600">
              Not sure what size tent you need? Start with a few details. We will guide the rest.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href="#size-guide"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-4 hover:text-stone-900"
              >
                Planning tools (calculator + chart) <span aria-hidden>↓</span>
              </a>
              <span className="hidden text-stone-300 sm:inline" aria-hidden>
                |
              </span>
              <a
                href="#quick-event-planner"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a24a]/60 bg-[#fffbf0] px-3 py-1.5 text-sm font-semibold text-[#6b5220] shadow-sm hover:bg-[#fff7e6]"
              >
                Open Quick Event Planner →
              </a>
            </div>
            <p className="mt-2 text-xs text-stone-500">
              Planner not loading? Open the{" "}
              <Link href="/quick-event-planner" className="font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
                standalone Quick Event Planner page
              </Link>{" "}
              (<code className="rounded bg-stone-100 px-1 py-0.5 text-[0.7rem] text-stone-700">/quick-event-planner</code>
              ).
            </p>
            <p className="mt-2 text-xs text-stone-500">
              Planning help from our event team, not just a rental list · Family owned since {business.establishedYear}
            </p>
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-200/90 lg:order-2">
            <Image
              src={defaultOgImagePath}
              alt="Outdoor reception tent in Connecticut for wedding or event planning"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Planning tools: (1) Tent size / sq ft estimator + chart (2) Quick Event Planner */}
      <section id="size-guide" className="scroll-mt-36 border-t border-stone-200 bg-stone-50 py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Planning" }]} />
          <SectionHeading
            align="left"
            eyebrow="Planning tools"
            title="Two ways to plan your tent and setup"
            intro="Pick the tool that fits where you are today. Use the square footage calculator for fast tent-size ranges and examples, or use the Quick Event Planner for a fuller starting checklist—chairs, tables, lighting, weather, and more. Both stay on this page; nothing replaces the other."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href="#tent-size-estimator"
              className="group rounded-2xl border-2 border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#c9a24a] hover:shadow-md sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6218]">Option 1 · Fast sizing</p>
              <h3 className="mt-2 text-lg font-semibold text-stone-900">Tent size & square footage calculator</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Guest count, layout, and options—get low / high comfort ranges and example tent sizes. Includes the reference chart.
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#8a6218] group-hover:underline">
                Jump to calculator →
              </span>
            </a>
            <a
              href="#quick-event-planner"
              className="group rounded-2xl border-2 border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#c9a24a] hover:shadow-md sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6218]">Option 2 · Full plan</p>
              <h3 className="mt-2 text-lg font-semibold text-stone-900">Quick Event Planner</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Short guided steps for chairs, tables, linens, dance floor, bar, lighting, weather, and what people forget.
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#8a6218] group-hover:underline">
                Jump to planner →
              </span>
            </a>
          </div>
          <div className="mt-6 rounded-2xl border border-amber-200/90 bg-[#fffbf0] px-5 py-4 text-sm leading-relaxed text-stone-800 sm:px-6">
            <p className="font-semibold text-stone-900">Buffet, DJ, and food service</p>
            <p className="mt-2">
              A full buffet line and a DJ or band often deserve a{" "}
              <strong className="font-semibold text-stone-900">separate tent or canopy</strong> beside the main tent so food service, sound, and guest seating are not fighting the same square footage.
            </p>
            <p className="mt-2">
              <strong className="font-semibold text-stone-900">Serving happens under the guest tent; cooking does not.</strong> We plan canopies for dining, buffets, and bars only. Open flame, grills, fryers, and full cooking belong outside the main guest tent.
            </p>
            <p className="mt-2">
              If you will have <strong className="font-semibold text-stone-900">on-site cooking or grilling</strong>, tell us when you plan. We offer <strong className="font-semibold text-stone-900">tents and layouts designed for prep and heat</strong> so crews have a safe, ventilated area separate from where guests eat and drink.
            </p>
          </div>
          <div id="tent-size-estimator" className="scroll-mt-36 border-t border-stone-200/80 pt-10 sm:mt-10 sm:pt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Option 1</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">Tent size & square footage calculator</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
              Interactive ranges based on your guest count, program, and add-ons—use this when you want numbers and a comfort band before anything else.
            </p>
            <p className="mt-4 mb-4 inline-flex items-center rounded-full border border-[#c9a24a]/50 bg-[#fffbf0] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#6b5220]">
              Interactive estimator
            </p>
            <TentSizeEstimator />
          </div>

          {/* Quick Event Planner placed here (before the long chart) so it is easy to find on mobile and production */}
          <div id="quick-event-planner" className="scroll-mt-36 mt-12 border-t border-stone-200 bg-stone-50/80 py-10 sm:mt-14 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Option 2</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">Quick Event Planner</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
              A second tool—not a replacement for the calculator above. Walk through a few choices and get a starting plan for chairs, tables, service areas, lighting, weather, and more.
            </p>
            <div className="mt-8">
              <QuickEventPlanner embedded />
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:mt-12 sm:p-8">
            <h3 className="text-lg font-semibold text-stone-900">Reference chart: common tent sizes and seated capacity</h3>
            <p className="mt-2 text-sm text-stone-600">
              Seated counts assume typical table layouts; your program may need more room. Banquet rows often pack tighter than rounds. Ceremony seating usually needs less space than a full dinner reception. Buffets, bars, and dance floors push you toward the larger end or the next size class. Large buffet or DJ setups may use a separate tent instead of one oversized main tent.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    <th className="py-3 pr-4">Dimensions</th>
                    <th className="py-3 pr-4">Approx. sq ft</th>
                    <th className="py-3 pr-4">Seated range (typical)</th>
                    <th className="py-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {tentSizeChartRows.map((row, i) => (
                    <tr
                      key={row.size}
                      className={`border-b border-stone-100 text-stone-700 transition-colors hover:bg-amber-50/50 ${i % 2 === 1 ? "bg-stone-50/70" : ""}`}
                    >
                      <td className="py-3 pr-4 font-semibold text-stone-900">{row.size}</td>
                      <td className="py-3 pr-4">{row.sqFt}</td>
                      <td className="py-3 pr-4">{row.seated}</td>
                      <td className="py-3 text-stone-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-stone-600 sm:mt-10">
            More context:{" "}
            <Link href="/faq#faq-tent-size" className="font-semibold text-stone-900 underline underline-offset-2">
              tent sizing FAQ
            </Link>{" "}
            ·{" "}
            <Link href="/tent-rentals" className="font-semibold text-stone-900 underline underline-offset-2">
              tent rental options
            </Link>{" "}
            ·{" "}
            <Link href="/party-packages" className="font-semibold text-stone-900 underline underline-offset-2">
              party packages
            </Link>
          </p>
        </div>
      </section>

      {/* Trust band (after both planning tools) */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-stone-700">Experienced crew, clear communication</p>
          <p className="text-center text-sm font-medium text-stone-700">Sizing and layout help before you commit</p>
          <p className="text-center text-sm font-medium text-stone-700">Weather and site planning, not just delivery</p>
        </div>
      </div>

      {/* How to plan (step by step) */}
      <section id="step-by-step" className="scroll-mt-36 bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Guided planning"
            title="How to plan your event setup, step by step"
            intro="Follow this sequence when you are deciding tent size and layout. It is the same order our planners use on the phone."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {planningSteps.map((step) => (
              <div
                key={step.n}
                className="flex gap-4 rounded-2xl border border-stone-200 bg-stone-50/80 p-5 sm:p-6"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a1d20] text-sm font-bold text-[#f5e0b3]"
                  aria-hidden
                >
                  {step.n}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-amber-200/80 bg-[#fffbf0] px-5 py-4 text-center text-sm leading-relaxed text-stone-800">
            You do not need every detail figured out before you call. Start with what you know (date, location, rough headcount). We help you fill in the rest without pressure.
          </p>
        </div>
      </section>

      {/* Layout examples */}
      <section id="layout-examples" className="scroll-mt-36 bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Popular setups"
            title="Easy layout examples"
            intro="These are starting points, not guarantees. They show how real events often translate into tent sizes before we fine-tune for your property."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {layoutExamples.map((ex) => (
              <article key={ex.title} className="rounded-2xl border border-stone-200 bg-stone-50/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-stone-900">{ex.title}</h3>
                <dl className="mt-4 space-y-2 text-sm text-stone-600">
                  <div>
                    <dt className="font-medium text-stone-800">Guests / program</dt>
                    <dd>
                      {ex.guests} · {ex.layout}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-stone-800">Starting tent direction</dt>
                    <dd>{ex.tent}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-stone-800">Why it works</dt>
                    <dd>{ex.why}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-stone-800">Size up if</dt>
                    <dd>{ex.sizeUp}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Tent type comparison */}
      <section id="tent-types" className="scroll-mt-36 border-t border-stone-200 bg-stone-50 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Structure"
            title="Which tent type fits your event?"
            intro="Most Connecticut outdoor events come down to a few families. We match style to surface, guest flow, and the look you want, without drowning you in product names."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                name: "Frame tents",
                look: "Clean lines, minimal interior poles, easy to connect in sections.",
                space: "Strong sightlines for receptions, auctions, and programs.",
                site: "Works on many surfaces with staking or ballast depending on the lot.",
                best: "Mixed layouts, dance floors, and when you need modular pieces.",
              },
              {
                name: "Pole tents",
                look: "Classic peaks; poles inside follow the roof line.",
                space: "Layout has to account for poles; often cost-effective coverage.",
                site: "Grass-friendly staking is typical; plan around guy lines.",
                best: "Traditional celebrations when the look fits and flow is planned around poles.",
              },
              {
                name: "Premium / sailcloth tops",
                look: "Warm, refined appearance in photos and at dusk.",
                space: "Same planning rules as frame; the story is aesthetic and lighting.",
                site: "Anchoring still follows your surface and wind exposure.",
                best: "Weddings and galas where the canopy is part of the design.",
              },
              {
                name: "Smaller canopies",
                look: "Focused coverage for bars, check-in, or food stations.",
                space: "Satellite to a main tent or stand-alone for tight sites.",
                site: "Flexible placement; watch access and anchoring on hardscape.",
                best: "Add-ons when you need a second zone without rebuilding the whole plan.",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-stone-900">{t.name}</h3>
                <ul className="mt-4 space-y-2 text-sm text-stone-600">
                  <li>
                    <span className="font-medium text-stone-800">Look: </span>
                    {t.look}
                  </li>
                  <li>
                    <span className="font-medium text-stone-800">Space: </span>
                    {t.space}
                  </li>
                  <li>
                    <span className="font-medium text-stone-800">Site: </span>
                    {t.site}
                  </li>
                  <li>
                    <span className="font-medium text-stone-800">Often best when: </span>
                    {t.best}
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/tents/gallery" className="inline-flex text-sm font-semibold text-[#8a6218] underline underline-offset-4">
              Browse the tent gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Site & surface */}
      <section id="site-surface" className="scroll-mt-36 bg-[#111315] py-10 text-stone-100 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d4a84b]">Site and surface</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Before you choose a tent, check the site</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-300">
                Grass, patios, driveways, and parking lots all change how we anchor and how trucks get in. Level ground, overhead branches and wires, fences, pools, septic, and the path we use to load gear matter as much as the tent dimensions. Staking is not always possible; hard surfaces may need ballast. Crew access surprises people: if we cannot reach the spot, the footprint does not help.
              </p>
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-stone-300">
              <li>
                <strong className="text-white">Grass:</strong> Often stake-friendly; watch irrigation, roots, and soft spots after rain.
              </li>
              <li>
                <strong className="text-white">Driveways / lots:</strong> Ballast, cable ramps, and vehicle paths planned in advance.
              </li>
              <li>
                <strong className="text-white">Patios / pavers:</strong> Level matters for seating; drainage matters when it pours.
              </li>
              <li>
                <strong className="text-white">Overhead:</strong> Branches, roof lines, and power lines limit peak placement.
              </li>
            </ul>
          </div>
          <div className="mt-10 rounded-2xl border border-stone-600 bg-[#1a1d21] p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white">Measure or confirm</h3>
            <ul className="mt-4 grid gap-2 text-sm text-stone-300 sm:grid-cols-2">
              {["Usable flat area", "Access path for equipment", "Overhead clearance", "Surface type", "Nearby obstacles", "Whether you need full or partial coverage"].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-[#c9a24a]" aria-hidden>
                    ✓
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-stone-400">
              A few photos and rough dimensions beat guessing.{" "}
              <Link href="/contact#quote" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
                Send them when you request a quote
              </Link>
              .
            </p>
          </div>
          <p className="mt-8 text-center text-sm text-stone-500">
            <Link href="/faq#faq-hard-surface-anchoring" className="text-[#edc16c] underline underline-offset-2 hover:text-white">
              Hard surfaces
            </Link>{" "}
            ·{" "}
            <Link href="/faq#faq-lawn-utilities" className="text-[#edc16c] underline underline-offset-2 hover:text-white">
              Lawns and utilities
            </Link>{" "}
            ·{" "}
            <Link href="/tent-rentals/jobsite-coverage" className="text-[#edc16c] underline underline-offset-2 hover:text-white">
              Jobsite-style coverage
            </Link>
          </p>
        </div>
      </section>

      {/* 8. Weather */}
      <section id="weather" className="scroll-mt-36 bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-200 lg:sticky lg:top-28">
              <Image
                src="/images/tent-sidewalls-window-walls-tennis-court.png"
                alt="Tent with window sidewalls for weather planning"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Comfort and backup</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">Plan for weather before you need to</h2>
              <p className="mt-4 text-base leading-relaxed text-stone-600">
                A tent is not only rain insurance. It gives you shade, structure, and a defined home base for food, music, and seating. The goal is not to overcomplicate your event. It is to keep the program working when the sky changes its mind, which happens often in New England.
              </p>
              <div className="mt-6 rounded-xl border border-amber-200/90 bg-[#fffbf0] px-4 py-3 text-sm font-medium text-stone-900">
                The best rain plan is one you make early, not the night before.
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-8 border-t border-stone-200 pt-12 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Common concerns</h3>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                {weatherConcerns.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-[#b78a2d]" aria-hidden>
                      •
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">How we help</h3>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                {weatherResponses.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-[#b78a2d]" aria-hidden>
                      •
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center">
            <Link href="/faq#faq-rain-plan" className="text-sm font-semibold text-stone-900 underline underline-offset-4">
              Read our rain planning FAQ →
            </Link>
          </p>
        </div>
      </section>

      {/* 9. Tables & flow */}
      <section id="tables-flow" className="scroll-mt-36 border-t border-stone-200 bg-stone-50 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Seating and flow"
            title="Tables, chairs, and layout flow matter more than most people expect"
            intro="Round tables encourage conversation. Banquet rows fit tighter footprints. Cocktail rounds free space for mingling, but if dinner follows, you still need real square footage. Tight layouts can work on paper and feel crowded in person. More comfortable layouts are often worth sizing the tent up."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: '60" round', note: "Seats 8 comfortably; common for mixed groups." },
              { name: '72" round', note: "Seats 10–11; allow space for plated service." },
              { name: "6' banquet", note: "Three per side plus ends; head tables and family-style rows." },
              { name: "8' banquet", note: "Four per side; galas and awards when depth allows." },
              { name: "Cocktail / high-top", note: "Standing mix; frees floor but plan seated dinner elsewhere if needed." },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-stone-200 bg-white p-5 text-sm shadow-sm">
                <p className="font-semibold text-stone-900">{t.name}</p>
                <p className="mt-2 text-stone-600">{t.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-stone-600">
            Inventory and photos:{" "}
            <Link href="/table-chair-rentals" className="font-semibold text-stone-900 underline underline-offset-2">
              table and chair rentals
            </Link>
          </p>
        </div>
      </section>

      {/* 10. Forgotten items */}
      <section id="forgot" className="scroll-mt-36 bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Checklist"
            title="What people often forget until the last minute"
            intro="Group your plan into a few buckets so nothing obvious falls through. These are typical add-ons that protect food, comfort, and flow."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {forgotCategories.map((cat) => (
              <div key={cat.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="text-base font-semibold text-stone-900">{cat.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-stone-600">
                  {cat.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#b78a2d]" aria-hidden>
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-stone-600">
            Want tents, tables, and popular accessories in one conversation? See{" "}
            <Link href="/party-packages" className="font-semibold text-stone-900 underline underline-offset-2">
              party packages
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 11. Event type guides */}
      <section id="occasions" className="scroll-mt-36 border-t border-stone-200 bg-stone-50 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="By event type"
            title="Planning advice by event type"
            intro="Short cues for common Connecticut events. Follow links for deeper guides where we have them."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {eventTypeGuides.map((o) => (
              <Link
                key={o.title}
                id={o.title === "Backyard parties" ? "backyard-parties" : undefined}
                href={o.href}
                className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-[#c9a24a] hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-stone-900 group-hover:text-[#7a5a18]">{o.title}</h3>
                <dl className="mt-4 space-y-3 text-sm text-stone-600">
                  <div>
                    <dt className="font-medium text-stone-800">What matters most</dt>
                    <dd>{o.matters}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-stone-800">What changes size</dt>
                    <dd>{o.sizing}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-stone-800">Weather backup</dt>
                    <dd>{o.weather}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-stone-800">Often forgotten</dt>
                    <dd>{o.forget}</dd>
                  </div>
                </dl>
                <span className="mt-4 text-sm font-semibold text-[#8a6218]">View guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Timeline */}
      <section id="timeline" className="scroll-mt-36 bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="A simple planning timeline" intro="You do not need perfection on day one. You need a sensible order so your date, footprint, and vendors stay aligned." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {planningTimelineBlocks.map((block) => (
              <div key={block.when} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <p className="text-sm font-semibold text-[#7a5a18]">{block.when}</p>
                <ul className="mt-4 space-y-2 text-sm text-stone-600">
                  {block.items.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick start jump cards (end of guide: shortcuts back to key sections) */}
      <section id="quick-start" className="scroll-mt-36 border-t border-stone-200 bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Quick start</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Jump to what you need</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-stone-600 sm:text-base">
              Shortcuts to topics on this page. The square footage calculator, sizing chart, and Quick Event Planner are grouped at the top, right under the hero.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {planningQuickStartCards.map((card) => (
              <article
                key={card.title}
                className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-stone-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-stone-900">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{card.description}</p>
                {"external" in card && card.external ? (
                  <Link href={card.href} className="mt-4 inline-flex text-sm font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-4 hover:text-stone-900">
                    {card.cta} →
                  </Link>
                ) : (
                  <a href={card.href} className="mt-4 inline-flex text-sm font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-4 hover:text-stone-900">
                    {card.cta} →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-36 border-t border-stone-200 bg-stone-50 py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-stone-900">Planning questions, answered</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-stone-600">
            Straight answers on sizing, surfaces, and booking. Written for Connecticut hosts, not search robots.
          </p>
          <div className="mt-8">
            <FAQAccordion items={planningFaqItems} />
          </div>
        </div>
      </section>

      {/* 14. Final CTA */}
      <section className="border-t border-stone-200 bg-[#1a1d20] py-12 text-stone-100 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">You do not have to figure this out alone</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-300">
            Start with your guest count, event type, and date. We help you guide the rest: tent size, layout, site fit, and weather readiness. No jargon required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={business.phoneHref} className={callNowSectionClass}>
              Call Now
            </a>
            <Link href="/contact#quote" className={bookNowSectionClass} prefetch={true}>
              Book Now
            </Link>
          </div>
          <p className="mt-6 text-sm text-stone-400">
            Prefer email first?{" "}
            <Link href="/contact#quote" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              Open the quote form
            </Link>{" "}
            (name, email, phone, date, and event type get the conversation started; everything else can wait).
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
