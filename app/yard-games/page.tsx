import Link from "next/link";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { FAQAccordion } from "@/components/faq-accordion";
import { CTASection, SectionHeading } from "@/components/sections";
import { BreadcrumbListSchema, ServiceSchema } from "@/components/schema";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Yard Game Rentals Connecticut | Cornhole, Giant Jenga & More | ${business.primaryCity}`,
  description:
    "Rent yard games for Connecticut backyard parties, graduations, and corporate events: cornhole, giant Jenga, Connect 4, KanJam, and more. Delivery and setup available. Bundle with tents and party packages.",
  path: "/yard-games",
});

const popularGames = [
  { name: "Cornhole", blurb: "Classic tailgate favorite—easy to learn, fun for all ages." },
  { name: "Giant Jenga", blurb: "Stack-and-pull tension that draws a crowd at any backyard." },
  { name: "Connect 4", blurb: "Supersized strategy—great for kids and adults side by side." },
  { name: "KanJam", blurb: "Fast-paced disc game for teams that want a little competition." },
  { name: "Ladder Toss", blurb: "Lightweight setup, perfect for grass or pavement." },
  { name: "Bocce", blurb: "Lawn game elegance for mingling and casual tournaments." },
  { name: "Spikeball", blurb: "High-energy roundnet for active groups with space to move." },
  { name: "Giant Tic-Tac-Toe", blurb: "Quick rounds, photo-friendly, works for mixed age groups." },
] as const;

const packages = [
  {
    title: "Backyard Party Bundle",
    body: "Curated mix of crowd-pleasers sized for typical residential yards—great for birthdays, anniversaries, and casual cookouts.",
  },
  {
    title: "Graduation Bundle",
    body: "Games that keep guests rotating while speeches and food run on a schedule—paired layouts we can align with tent and table plans.",
  },
  {
    title: "Corporate Team Games",
    body: "Low-friction icebreakers and light competition for company picnics and outdoor all-hands—delivery and pickup windows that respect your campus or park rules.",
  },
] as const;

const steps = [
  {
    title: "Tell us your date & space",
    body: "Share town, guest count, surface type (grass, patio, parking), and whether you already booked tents or tables.",
  },
  {
    title: "We build a game lineup",
    body: "We recommend titles that fit your footprint, age mix, and weather backup—no guesswork on what travels well in Connecticut.",
  },
  {
    title: "Delivery, setup & pickup",
    body: "Our team stages games for flow and safety, then returns on the agreed window so you are not wrestling inventory after the event.",
  },
] as const;

const yardGamesFaq = [
  {
    question: "What towns do you deliver yard games to?",
    answer:
      "We serve hosts across Connecticut and into Southern Massachusetts on many dates. Share your venue or home address during quoting so we can confirm routing and timing.",
  },
  {
    question: "Do you set up the games for us?",
    answer:
      "Yes. We place and level games for safe play, adjust for surface conditions when possible, and strike them on pickup—so you are not assembling giant sets during your party.",
  },
  {
    question: "What if the weather turns?",
    answer:
      "Outdoor games need dry surfaces and safe wind conditions. We help you plan a sensible rain backup—often paired with a tent rental—and adjust timing if a short weather window is forecast.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Quotes reflect game mix, quantity, delivery distance, labor for setup and pickup, and add-ons like tents, tables, or inflatables. You get clear line items before you commit.",
  },
  {
    question: "What about damage or missing pieces?",
    answer:
      "Normal wear is expected; lost or damaged components may be billed per our rental agreement. We inspect sets between events so you start with complete, working games.",
  },
];

const testimonials = [
  {
    quote: "Cornhole and giant Jenga were the hit of our block party—setup was fast and the crew was professional.",
    name: "Host placeholder — Hartford area",
  },
  {
    quote: "We bundled games with a tent for a graduation cookout. One quote, one schedule, zero stress.",
    name: "Host placeholder — Farmington area",
  },
] as const;

export default function YardGamesPage() {
  return (
    <>
      <ServiceSchema
        name="Yard game rentals in Connecticut"
        description="Outdoor yard game rentals including cornhole, giant Jenga, Connect 4, KanJam, ladder toss, bocce, Spikeball, and giant tic-tac-toe for backyard parties, graduations, and corporate events—with delivery and setup."
        path="/yard-games"
      />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Yard games", path: "/yard-games" },
        ]}
      />

      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a97a21]">Games</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            Yard game rentals for unforgettable outdoor gatherings
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            Elevate backyard parties, graduations, and team events with professional-grade yard games—delivered and staged so your guests spend time playing, not waiting.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#popular-yard-games"
              className="rounded-full bg-[#1d2124] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#131517]"
            >
              Browse Games
            </a>
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Book Now
            </Link>
          </div>
          <p className="mt-6 text-sm text-stone-600">
            Need shade or seating too? Explore{" "}
            <Link href="/tent-rentals" className="font-semibold text-stone-800 underline underline-offset-2">
              tent rentals
            </Link>{" "}
            and{" "}
            <Link href="/bounce-houses" className="font-semibold text-stone-800 underline underline-offset-2">
              bounce houses &amp; inflatables
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="popular-yard-games" className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Catalog"
            title="Popular yard games"
            intro="Pick individual titles or ask us to bundle the right mix for your space, guest count, and energy level."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularGames.map((game) => (
              <article key={game.name} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <h3 className="text-lg font-semibold text-stone-900">{game.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{game.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-50/80 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Bundles" title="Packages" intro="Starter themes we customize to your footprint and schedule—quote always confirms inventory." />
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
          <SectionHeading
            eyebrow="Process"
            title="How it works"
            intro="Straightforward planning from first message to pickup—built for busy hosts and coordinators."
          />
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
          <SectionHeading eyebrow="FAQ" title="Yard game rental questions" />
          <div className="mt-8">
            <FAQAccordion items={yardGamesFaq} />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Social proof" title="What hosts say" intro="Placeholder testimonials—replace with real client quotes when available." />
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
