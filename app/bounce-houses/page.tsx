import Link from "next/link";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { FAQAccordion } from "@/components/faq-accordion";
import { CTASection, SectionHeading } from "@/components/sections";
import { BreadcrumbListSchema, ServiceSchema } from "@/components/schema";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Bounce House & Inflatable Rentals Connecticut | Clean, Safe Fun | ${business.primaryCity}`,
  description:
    "Bounce house and inflatable rentals in Connecticut: inspected, sanitized equipment for birthdays, schools, and community events. Ask about yard sizing, power, and bundle options with yard games and tents.",
  path: "/bounce-houses",
});

const popularInflatables = [
  { name: "Classic bounce house", blurb: "Iconic castle-style jumper sized for younger guests and birthday parties." },
  { name: "Combo slide unit", blurb: "Bounce plus slide for higher energy—great when you have room to run." },
  { name: "Obstacle course", blurb: "Team-friendly lanes for school fields and larger flat setups." },
  { name: "Toddler inflatable", blurb: "Lower walls and gentler play for the smallest guests." },
] as const;

const safetyPoints = [
  {
    title: "Inspection between events",
    body: "We check seams, anchors, blower connections, and landing zones before your rental goes out—if it is not fit for guests, it does not ship.",
  },
  {
    title: "Sanitizing & cleanliness",
    body: "High-touch surfaces are cleaned per our prep checklist so families feel confident about where kids play.",
  },
  {
    title: "Setup discipline",
    body: "Anchoring matches surface type—stakes on grass, ballasts where stakes are not an option—and we review wind thresholds with you before event day.",
  },
] as const;

const packages = [
  {
    title: "Bounce + Games bundle",
    body: "Pair an inflatable with cornhole, giant Jenga, or ladder toss so teens and adults have something to do while kids bounce in shifts.",
  },
  {
    title: "Birthday bundle",
    body: "Structured for residential yards: bounce unit, game or two, and optional tent or table add-ons for cake and gifts.",
  },
  {
    title: "School / event bundle",
    body: "Higher throughput layouts for field days and community events—multiple units, staggered timing, and clear load-in paths.",
  },
] as const;

const steps = [
  {
    title: "Share yard details",
    body: "Measurements, slope, gate widths, and surface type (grass vs. pavement) determine which units fit and how we anchor.",
  },
  {
    title: "Power & placement plan",
    body: "Most units need a dedicated outlet or generator plan within specified cord lengths—we confirm amp needs and safe routing.",
  },
  {
    title: "Delivery, setup, supervision reminders",
    body: "We install and review rules-of-play with your on-site contact; responsible adult supervision stays with you during the rental.",
  },
] as const;

const bounceFaq = [
  {
    question: "What power do inflatables need?",
    answer:
      "Most bounce units require a standard 110V outlet on a dedicated circuit within the manufacturer’s cord length. If power is far from the setup zone, we discuss generator options during quoting.",
  },
  {
    question: "What surfaces work for setup?",
    answer:
      "Grass is ideal for staking. Driveways and pavement can work with ballast systems where allowed—surface slope, underground utilities, and HOA rules all factor into the plan.",
  },
  {
    question: "What happens if rain or wind is forecast?",
    answer:
      "Inflatable safety depends on wind speed and lightning. We align with manufacturer limits and may reschedule or pause setup if conditions are unsafe—your contract spells out the weather process.",
  },
  {
    question: "Is supervision included?",
    answer:
      "A trained attendant can sometimes be added by request, but hosts are responsible for supervising play and following capacity rules during the rental window.",
  },
  {
    question: "Do you require a deposit?",
    answer:
      "Many dates require a deposit to hold inventory—amounts vary by order size and season. Your quote lists payment milestones clearly.",
  },
];

const testimonials = [
  {
    quote: "The unit looked spotless on delivery. Setup was quick and the team walked us through wind and capacity rules clearly.",
    name: "Host placeholder — West Hartford area",
  },
  {
    quote: "We combined a bounce house with yard games for a school field day—logistics were easier with one vendor.",
    name: "Coordinator placeholder — Glastonbury area",
  },
] as const;

export default function BounceHousesPage() {
  return (
    <>
      <ServiceSchema
        name="Bounce house and inflatable rentals in Connecticut"
        description="Clean, inspected bounce houses and inflatables for Connecticut birthdays, schools, and community events—with safe setup, anchoring guidance, and optional bundles with yard games and tents."
        path="/bounce-houses"
      />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Bounce houses", path: "/bounce-houses" },
        ]}
      />

      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a97a21]">Inflatables</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            Bounce houses &amp; inflatables—clean, inspected, ready for Connecticut yards
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            Parents and planners trust us for equipment that looks sharp, smells clean, and is installed with safety-first anchoring—so kids can play hard and you can breathe easier.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Book Now
            </Link>
            <a
              href="#popular-inflatables"
              className="rounded-full border border-stone-400 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
            >
              Browse options
            </a>
          </div>
          <p className="mt-6 text-sm text-stone-600">
            Add{" "}
            <Link href="/yard-games" className="font-semibold text-stone-800 underline underline-offset-2">
              yard games
            </Link>{" "}
            or{" "}
            <Link href="/tent-rentals" className="font-semibold text-stone-800 underline underline-offset-2">
              tent coverage
            </Link>{" "}
            for a full backyard or campus setup.
          </p>
        </div>
      </section>

      <section id="popular-inflatables" className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Rentals"
            title="Most popular inflatables"
            intro="Inventory rotates by season—your quote confirms exact units, colors, and dimensions available on your date."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularInflatables.map((item) => (
              <article key={item.name} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <h3 className="text-lg font-semibold text-stone-900">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#111315] py-14 text-stone-100 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trust"
            title="Safety &amp; cleanliness"
            intro="Non-negotiable standards on every delivery—because inflatable fun only works when setup is disciplined."
            variant="dark"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {safetyPoints.map((p) => (
              <article key={p.title} className="rounded-2xl border border-stone-600/80 bg-[#161a1d] p-6">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">What fits in your yard</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Most residential bounce units need a flat area larger than the footprint—clearance for stakes or ballasts, blower placement, and safe approach paths. Measure gate widths along the delivery route; narrow gates may require smaller units or alternate access. Power should be within the manufacturer’s cord length or paired with an approved generator.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-stone-700">
            <li className="flex gap-2">
              <span className="text-[#9a7a45]" aria-hidden>
                •
              </span>
              <span>Flat, obstacle-free setup zone plus anchor clearance</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#9a7a45]" aria-hidden>
                •
              </span>
              <span>Dedicated 110V circuit or generator plan within spec</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#9a7a45]" aria-hidden>
                •
              </span>
              <span>Gate and pathway widths that fit rolled units and carts</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50/80 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Bundles" title="Packages" intro="Themes we tailor to your headcount, age mix, and site constraints." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {packages.map((pkg) => (
              <article key={pkg.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-stone-900">{pkg.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{pkg.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Process" title="How it works" intro="Three steps from site check to takedown." />
          <ol className="mt-10 space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1d2124] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Bounce &amp; inflatable questions" />
          <div className="mt-8">
            <FAQAccordion items={bounceFaq} />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Reviews" title="What planners say" intro="Placeholder reviews—swap in verified testimonials as you collect them." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
                <blockquote className="text-sm italic text-stone-700">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-stone-900">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
