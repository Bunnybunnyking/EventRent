import Link from "next/link";
import { interactiveCardClass, cardRowHintClass } from "@/lib/interactive-styles";

const pillars = [
  {
    title: "Weddings",
    line: "Tented receptions, ceremony seating, lighting, sidewalls, and clean layouts that flow.",
    href: "/wedding-tent-rentals",
  },
  {
    title: "Corporate events",
    line: "Company picnics, campus events, and large installs—planned, safe, and on schedule.",
    href: "/corporate-event-rentals",
  },
  {
    title: "Festivals & fairs",
    line: "Vendor rows, large structures, entrances, and repeatable logistics for town events.",
    href: "/events/festivals-fairs",
  },
  {
    title: "Backyard parties",
    line: "Graduations, cookouts, birthdays—right-sized tents, tables, chairs, and the essentials.",
    href: "/planning#backyard-parties",
  },
] as const;

export function EventPillars() {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="home-pillars-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="home-pillars-heading" className="text-center text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          One team for events across Connecticut.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-stone-600 sm:text-base">Choose what you&apos;re planning:</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link key={p.title} href={p.href} className={`${interactiveCardClass} flex flex-col p-5`} prefetch={true}>
              <h3 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{p.line}</p>
              <span className={cardRowHintClass}>
                Explore <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
