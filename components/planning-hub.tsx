import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection, SectionHeading } from "@/components/sections";
import { FAQAccordion } from "@/components/faq-accordion";
import { TentSizeEstimator } from "@/components/tent-size-estimator";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import { defaultOgImagePath } from "@/lib/metadata";
import { planningFaqItems } from "@/lib/planning-faq";
import { business } from "@/lib/site-data";

const sectionNav = [
  { href: "#size-guide", label: "Tent size" },
  { href: "#tent-types", label: "Tent types" },
  { href: "#site-surface", label: "Site & surface" },
  { href: "#weather", label: "Weather" },
  { href: "#tables-flow", label: "Tables & flow" },
  { href: "#forgot", label: "Easy to forget" },
  { href: "#occasions", label: "By occasion" },
  { href: "#timeline", label: "Timeline" },
  { href: "#faq", label: "FAQ" },
];

type QuickCard = {
  title: string;
  text: string;
  href: string;
  cta: string;
  external?: boolean;
};

const quickCards: QuickCard[] = [
  {
    title: "Find your tent size",
    text: "Use the estimator and sizing bands below—then confirm with our team for your real layout.",
    href: "#size-guide",
    cta: "Jump to sizing",
  },
  {
    title: "Plan for rain & comfort",
    text: "Shade, wind, and backup matter as much as drizzle. Build a weather-smart plan early.",
    href: "#weather",
    cta: "Weather planning",
  },
  {
    title: "Tables & chairs that fit",
    text: "Round vs. banquet, aisles, and circulation change what “fits” under the canopy.",
    href: "#tables-flow",
    cta: "Layout basics",
  },
  {
    title: "Site & surface checklist",
    text: "Grass, pavement, slope, and access all steer staking, ballast, and crew timing.",
    href: "#site-surface",
    cta: "Site readiness",
  },
  {
    title: "Add-ons hosts overlook",
    text: "Sidewalls, lighting, power paths, and service zones often make or break flow.",
    href: "#forgot",
    cta: "See the list",
  },
  {
    title: "Talk to an Event Concierge",
    text: "You do not need every answer to start—share your date, town, and rough headcount.",
    href: "/contact#quote",
    cta: "Start planning",
    external: true,
  },
];

export function PlanningHub() {
  return (
    <>
      <section className="border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-stone-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Planning hub · Connecticut</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-[2.35rem] lg:leading-[1.15]">
              Plan your outdoor event before you pick inventory
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              The right tent size, layout, and weather plan save you stress long before delivery day. Whether you are hosting in Wethersfield, along the shoreline, or anywhere statewide, we help you think through what actually happens under the canopy—not just guest count on a spreadsheet.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              You do not need every detail finalized to call. Bring your date, location, and a rough headcount—we will help you sequence the rest.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/contact#quote" className={bookNowSectionClass}>
                Book Now
              </Link>
              <a href={business.phoneHref} className={callNowSectionClass}>
                Call Now
              </a>
            </div>
            <p className="mt-4 text-xs text-stone-500">
              Family owned since {business.establishedYear} · {business.celebrationTagline}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-200/90">
            <Image
              src={defaultOgImagePath}
              alt="Outdoor reception tent in Connecticut—planning tent size, layout, and weather backup with professional guidance"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur-md">
        <nav aria-label="Planning sections" className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ul className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] md:flex-wrap md:justify-center md:gap-2">
            {sectionNav.map((item) => (
              <li key={item.href} className="shrink-0">
                <a
                  href={item.href}
                  className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:border-[#b78a2d] hover:bg-[#fffbf0] sm:text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <section className="bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Planning" }]} />
          <SectionHeading
            eyebrow="Quick start"
            title="The shortest path from “I have a date” to a solid plan"
            intro="Skim what matters most, then go deeper in the sections below. Each link jumps you to the same topic on this page."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickCards.map((card) => (
              <article
                key={card.title}
                className="flex flex-col rounded-2xl border border-stone-200 bg-stone-50/80 p-5 shadow-sm transition hover:border-stone-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-stone-900">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{card.text}</p>
                {card.external ? (
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

      <section id="size-guide" className="scroll-mt-28 border-t border-stone-200 bg-stone-50 py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Tent size guide"
            title="Sizing is about your program—not a single number"
            intro="Guest count alone does not determine tent size. Seating style, dance floors, buffets, bars, stages, aisles, and lounge pockets all change the footprint. The estimator below gives a realistic range; your final plan should reflect how people move, not just where they sit."
          />
          <div className="mt-10">
            <TentSizeEstimator />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { band: "40–80 guests", note: "Often backyard milestones, showers, or team events—watch food lines and gift tables." },
              { band: "90–140 guests", note: "Common wedding and gala band; dance floor + head table can jump you up a tent class fast." },
              { band: "150–250+ guests", note: "Think in zones: ceremony hold, cocktail, dinner, dance—sometimes multiple bays or connected frames." },
            ].map((row) => (
              <div key={row.band} className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-sm font-semibold text-[#7a5a18]">{row.band}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{row.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-stone-600">
            Compare with our{" "}
            <Link href="/faq#faq-tent-size" className="font-semibold text-stone-900 underline underline-offset-2">
              tent sizing FAQ
            </Link>{" "}
            and{" "}
            <Link href="/tent-rentals" className="font-semibold text-stone-900 underline underline-offset-2">
              tent rental options
            </Link>{" "}
            when you are ready to talk dimensions in plain English.
          </p>
        </div>
      </section>

      <section id="tent-types" className="scroll-mt-28 bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Tent types"
                title="Choose structure that matches your site and style"
                intro="Names vary by manufacturer, but most outdoor events in Connecticut come back to a few practical families. We help you match tent style to surface, guest flow, and the look you want—without getting lost in jargon."
              />
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-stone-700">
                <li>
                  <strong className="text-stone-900">Frame tents</strong> — Versatile, minimal interior poles, easier to connect in modular layouts. Strong for mixed programs and clear sightlines.
                </li>
                <li>
                  <strong className="text-stone-900">Pole tents</strong> — Classic peaks; interior poles follow the roof line. Often cost-effective; layout planning must work around poles.
                </li>
                <li>
                  <strong className="text-stone-900">Sailcloth & premium tops</strong> — When the aesthetic is the story—many receptions pair premium tops with thoughtful lighting plans.
                </li>
                <li>
                  <strong className="text-stone-900">Smaller canopies</strong> — Food stations, check-in, or weather pockets alongside a larger main tent.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-stone-900">What changes the recommendation</h3>
              <ul className="mt-4 space-y-3 text-sm text-stone-600">
                <li>· Staking vs. ballast on asphalt, patios, or courts</li>
                <li>· Overhead clearance for peaks, lighting, and rigging</li>
                <li>· Wind exposure on open lawns vs. sheltered venues</li>
                <li>· Need for gutters between sections in unpredictable weather</li>
              </ul>
              <Link href="/tents/gallery" className="mt-6 inline-flex text-sm font-semibold text-[#8a6218] underline underline-offset-4">
                Browse the tent gallery →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="site-surface" className="scroll-mt-28 border-t border-stone-200 bg-[#111315] py-14 text-stone-100 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d4a84b]">Site & surface</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Readiness beats perfect grass</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-300">
                Connecticut hosts everything from town greens to shoreline lawns to downtown lots. Each surface changes how we anchor, route trucks, and protect the ground. A few photos and a quick conversation often prevent expensive day-of surprises.
              </p>
            </div>
            <ul className="space-y-4 text-sm leading-relaxed text-stone-300">
              <li>
                <strong className="text-white">Grass & turf</strong> — Usually stake-friendly; watch irrigation, tree roots, and soft spots after rain.
              </li>
              <li>
                <strong className="text-white">Driveways & parking lots</strong> — Expect ballast plans, cable ramps, and careful vehicle paths.
              </li>
              <li>
                <strong className="text-white">Patios & pavers</strong> — Level matters for seating; drainage affects where water goes when skies open.
              </li>
              <li>
                <strong className="text-white">Access & overhead</strong> — Low branches, roof lines, and power lines affect where peaks can sit.
              </li>
              <li>
                <strong className="text-white">Rules & neighbors</strong> — Venues, towns, and HOAs may have timing or tent rules—we help you ask the right questions early.
              </li>
            </ul>
          </div>
          <p className="mt-10 text-center text-sm text-stone-400">
            Dig deeper:{" "}
            <Link href="/faq#faq-hard-surface-anchoring" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              driveways & courts
            </Link>
            ,{" "}
            <Link href="/faq#faq-lawn-utilities" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              lawns & utilities
            </Link>
            ,{" "}
            <Link href="/tent-rentals/jobsite-coverage" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
              jobsite-style coverage
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="weather" className="scroll-mt-28 bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-200">
              <Image
                src="/images/tent-sidewalls-window-walls-tennis-court.png"
                alt="Frame tent with window sidewalls illustrating weather-ready Connecticut tent planning"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Weather & comfort"
                title="A tent is backup, shade, and structure—not only a rain fix"
                intro="New England weather turns quickly. The best plans account for sun angle, wind, temperature drop after sunset, and fast-moving summer cells—so your guests stay comfortable and your vendors can work safely."
              />
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-stone-600">
                <li>· Sidewalls and window panels balance breeze, warmth, and light.</li>
                <li>· Heaters, fans, and thoughtful openings keep air moving without a stuffy feel.</li>
                <li>· Flooring stabilizes chairs, dance areas, and catering equipment when the ground is soft.</li>
                <li>· Gutters and covered transitions reduce wet carpet runs between spaces.</li>
              </ul>
              <Link href="/faq#faq-rain-plan" className="mt-6 inline-flex text-sm font-semibold text-stone-900 underline underline-offset-4">
                Read our rain-planning perspective →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="tables-flow" className="scroll-mt-28 border-t border-stone-200 bg-stone-50 py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Tables, chairs & flow"
            title="Layouts that feel generous beat layouts that look “maxed” on paper"
            intro="Round tables encourage conversation; banquets fit tighter spaces. Cocktail rounds free footprint for mingling—but seating later still needs real square footage. We help you leave circulation space servers and guests actually use."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: '60" rounds', seats: "Seats 8 comfortably; popular for mixed guest groups." },
              { name: '72" rounds', seats: "Seats 10–11; watch chair spacing for plated service." },
              { name: "6' banquet", seats: "Three per side + ends; strong for head tables and family-style rows." },
              { name: "8' banquet", seats: "Four per side; efficient for awards nights and galas when depth allows." },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-stone-200 bg-white p-5 text-sm">
                <p className="font-semibold text-stone-900">{t.name}</p>
                <p className="mt-2 text-stone-600">{t.seats}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-stone-600">
            Coordinate inventory on our{" "}
            <Link href="/table-chair-rentals" className="font-semibold text-stone-900 underline underline-offset-2">
              table & chair rentals
            </Link>{" "}
            page, then pressure-test the plan with your guest count—not the other way around.
          </p>
        </div>
      </section>

      <section id="forgot" className="scroll-mt-28 bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Easy to forget"
                title="Small add-ons that prevent big headaches"
                intro="These items rarely steal the spotlight—but they protect food, keep guests comfortable, and make teardown dignified."
              />
            </div>
            <div className="rounded-2xl border border-amber-200/80 bg-[#fffbf0] p-6">
              <ul className="grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
                {[
                  "Sidewalls & window panels",
                  "Lighting (task + ambient)",
                  "Heaters / fans",
                  "Dance floor & staging",
                  "Generators & power paths",
                  "Extra service & buffet tables",
                  "Ballast & anchoring plan",
                  "Rain gutters between tents",
                  "Linens & napkin service alignment",
                  "Waste & bussing zone",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#b78a2d]" aria-hidden>
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-sm text-stone-600">
            Bundle thinking: explore{" "}
            <Link href="/party-packages" className="font-semibold text-stone-900 underline underline-offset-2">
              party packages
            </Link>{" "}
            when you want tents, tables, and popular accessories quoted together.
          </p>
        </div>
      </section>

      <section id="occasions" className="scroll-mt-28 border-t border-stone-200 bg-stone-50 py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="By event type"
            title="What shifts first—then what to layer in"
            intro="Short cues for common Connecticut events. Follow the links for deeper occasion guides where we have them."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Weddings",
                focus: "Ceremony hold, dinner rounds, dance floor sightlines, lighting for photos.",
                href: "/wedding-tent-rentals",
              },
              {
                title: "Graduation parties",
                focus: "Flexible headcount, food lines, gift and dessert zones, sunset timing.",
                href: "/events/graduation-parties",
              },
              {
                title: "Backyard parties",
                focus: "Property lines, power for sound, lawn protection, neighbor-friendly teardown.",
                href: "/faq#faq-backyard-party",
              },
              {
                title: "Corporate & galas",
                focus: "Registration flow, AV paths, donor sightlines, brand-clean presentation.",
                href: "/corporate-event-rentals",
              },
              {
                title: "Community & school",
                focus: "Vendor rows, accessibility, permits, volunteer-friendly layout.",
                href: "/events/community-school-town",
              },
              {
                title: "Festivals & fundraisers",
                focus: "Throughput, weather ops, multi-day strike plans, donor comfort.",
                href: "/events/festivals-fairs",
              },
            ].map((o) => (
              <Link
                key={o.title}
                href={o.href}
                className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#c9a24a] hover:shadow-md"
              >
                <h3 className="font-semibold text-stone-900 group-hover:text-[#7a5a18]">{o.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{o.focus}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-[#8a6218]">View guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="scroll-mt-28 bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Planning timeline"
            title="Lock decisions in the right order"
            intro="You do not need perfection on day one—you need a sequence that protects your date, footprint, and vendor stack."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                when: "2–6 months out",
                items: ["Date & venue or property", "Rough guest range", "Event style (seated vs. mixed)", "Initial tent hold conversation"],
              },
              {
                when: "4–8 weeks out",
                items: ["Refined headcount", "Floor plan direction", "Weather options selected", "Catering / AV coordination"],
              },
              {
                when: "2 weeks out",
                items: ["Layouts distributed to vendors", "Access & parking plan", "Rain playbook confirmed", "Final counts where needed"],
              },
              {
                when: "Event week",
                items: ["Delivery windows locked", "Site contact named", "Utilities & safety reviewed", "Calm hosts—We execute setup & strike"],
              },
            ].map((block) => (
              <div key={block.when} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <p className="text-sm font-semibold text-[#7a5a18]">{block.when}</p>
                <ul className="mt-3 space-y-2 text-sm text-stone-600">
                  {block.items.map((line) => (
                    <li key={line}>· {line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 border-t border-stone-200 bg-stone-50 py-14 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-stone-900">Planning questions, answered</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-stone-600">
            Straight talk on sizing, surfaces, and booking—specific to how we work across Connecticut.
          </p>
          <div className="mt-8">
            <FAQAccordion items={planningFaqItems} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
