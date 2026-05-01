import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbListSchema } from "@/components/schema";
import { cardRowHintClass, interactiveCardClass } from "@/lib/interactive-styles";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "Birthdays & Milestone Parties | Sweet 16, Quinceañeras, Communions",
  description: `Tent and party rentals for Connecticut birthdays, Sweet 16, quinceañeras, first communions, and family milestones. ${business.name}: layout help, weather backup, and professional setup.`,
  path: "/events/birthdays",
  ogImage: defaultOgImagePath,
});

const hubs = [
  {
    title: "Sweet 16 parties",
    href: "/events/sweet-16-parties",
    body: "Timeline, dance floor space, food lines, and weather backup for a night that feels grown-up without losing safety margins.",
  },
  {
    title: "Quinceañeras",
    href: "/events/quinceaneras",
    body: "Ceremony-to-reception flow, court seating, photography sightlines, and tent coverage that respects tradition and your guest count.",
  },
  {
    title: "Party packages",
    href: "/party-packages",
    body: "Starter bundles for tents, tables, and chairs when you want a clean quote without guessing every line item.",
  },
  {
    title: "Bounce houses & yard games",
    href: "/bounce-houses",
    body: "Add-ons for younger guests and backyard energy — sized to your lawn, power, and how the day runs.",
  },
] as const;

export default function BirthdaysMilestoneHubPage() {
  return (
    <>
      <BreadcrumbListSchema items={[{ name: "Home", path: "/" }, { name: "Events", path: "/events" }, { name: "Birthdays & milestones", path: "/events/birthdays" }]} />
      <section className="border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-stone-100 py-8 sm:py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Events", href: "/events" },
              { label: "Birthdays & milestones" },
            ]}
          />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Milestone parties</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-4xl">
            Birthdays & milestone celebrations
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Sweet 16, quinceañeras, first communions, milestone birthdays, and family receptions often need the same practical pieces: clear
            tent or canopy coverage, tables and chairs sized to your real headcount, a sensible rain plan, and crew who show up when the
            calendar says they will. Use the guides below, then{" "}
            <Link href="/contact#quote" className="font-semibold text-stone-900 underline underline-offset-2">
              talk to our team
            </Link>{" "}
            for a layout-first quote.
          </p>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)] sm:text-xl">Where to start</h2>
          <p className="mt-2 text-sm text-stone-600">Pick the path that matches your celebration — each page opens layout and rental cues.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {hubs.map((h) => (
              <Link key={h.href} href={h.href} className={`${interactiveCardClass} flex flex-col p-5`}>
                <h3 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">{h.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{h.body}</p>
                <span className={cardRowHintClass}>
                  Open guide <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-stone-600">
            <Link href="/events" className="font-semibold text-stone-900 underline underline-offset-2">
              All event types
            </Link>
            {" · "}
            <Link href="/planning" className="font-semibold text-stone-900 underline underline-offset-2">
              Planning hub
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
