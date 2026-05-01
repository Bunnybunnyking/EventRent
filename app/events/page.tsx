import type { Metadata } from "next";
import Link from "next/link";
import { EventsHubTopBar } from "@/components/events-type-nav-strip";
import { BreadcrumbListSchema } from "@/components/schema";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { cardRowHintClass, interactiveCardClass } from "@/lib/interactive-styles";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { eventLandings, eventLandingSlugs } from "@/lib/event-landing-data";
import { business } from "@/lib/site-data";

const occasionTitles: Record<string, string> = {
  "community-school-town": "Community & school", "festivals-fairs": "Festivals & fairs", "graduation-parties": "Graduation parties", "sweet-16-parties": "Sweet 16", quinceaneras: "Quinceañeras", tailgating: "Tailgates", "fundraisers-galas": "Fundraisers & galas", };

export const metadata: Metadata = createPageMetadata({
  title: "Events & Occasions | Corporate, School, Graduation & Festival Tent Rentals", description: `Plan tents and rentals for Connecticut corporate events, schools, graduations, festivals, and private occasions. ${business.name}: layout-first quoting and professional setup.`, path: "/events", ogImage: defaultOgImagePath, });

export default function EventsHubPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Events", path: "/events" }, ]}
      />
      <section className="border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-stone-100 pb-7 pt-0 sm:pb-8">
        <EventsHubTopBar />
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-7 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Connecticut events</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
            Events & occasions
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600 sm:mt-2.5">
            Choose an occasion guide for crowd flow, weather, and layout cues, then connect to tents, tables, and crew. If you are procuring an{" "}
            <strong className="font-semibold text-stone-800">employer-led picnic or company field program</strong>, start on{" "}
            <Link href="/corporate-event-rentals" className="font-semibold text-stone-900 underline underline-offset-2">
              corporate event rentals
            </Link>{" "}
            for crew windows and program discipline; use this hub for schools, festivals, graduations, and public-facing occasions.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-4">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Book Consultation
            </Link>
            <Link
              href="/planning"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
            >
              Planning hub
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#0f1113] py-7 text-white sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 rounded-2xl border border-[#b78a2d]/45 bg-[#14171a] p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af48]">My event</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight [font-family:var(--font-display)]">Event Guest Count Planner</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-300">
                Track RSVPs on your own page, keep a private dashboard for headcount, and line up tables, chairs, linens, and tent planning
                with our team — built into this site, not a separate RSVP product.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:items-end">
              <Link
                href="/rsvp/create"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#c9a228] px-7 py-3.5 text-center text-base font-semibold text-stone-900 shadow-sm transition hover:bg-[#e3c766] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#14171a] sm:w-auto [font-family:var(--font-display)]"
              >
                Create My Event Link
              </Link>
              <Link
                href="/rsvp"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-7 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Corporate & organizational</h2>
          <p className="mt-1.5 max-w-3xl text-sm text-stone-600">
            Picnics, staff events, town programs, and presentations. Full layout and inventory conversation on the corporate page.
          </p>
          <div className="mt-4 max-w-xl">
            <Link href="/corporate-event-rentals" className={`${interactiveCardClass} flex flex-col p-6`}>
              <h3 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">Corporate event rentals</h3>
              <p className="mt-2 flex-1 text-sm text-stone-600">
                Company picnics, meetings, and outdoor programs with staging, food service, and teardown aligned to your run of show.
              </p>
              <span className={cardRowHintClass}>
                Open corporate <span aria-hidden>→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#faf8f5] py-7 sm:py-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Occasion guides</h2>
          <p className="mt-1.5 max-w-3xl text-sm text-stone-600">
            Scan by event type. Each guide links to layout thinking, weather, and flow. Pair with{" "}
            <Link href="/party-guides" className="font-semibold text-stone-900 underline underline-offset-2">
              party guides
            </Link>{" "}
            for deeper reads and{" "}
            <Link href="/tents" className="font-semibold text-stone-900 underline underline-offset-2">
              tent families
            </Link>{" "}
            for inventory.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <Link href="/events/birthdays" className={`${interactiveCardClass} flex flex-col p-5`}>
              <h3 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">Birthdays & milestones</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 line-clamp-4">
                Sweet 16, quinceañeras, first communions, milestone birthdays, and family receptions — layout, headcount, and weather
                backup in one hub.
              </p>
              <span className={cardRowHintClass}>
                Open hub <span aria-hidden>→</span>
              </span>
            </Link>
            {eventLandingSlugs
              .filter((slug) => slug !== "sweet-16-parties" && slug !== "quinceaneras")
              .map((slug) => {
                const c = eventLandings[slug];
                const title = occasionTitles[slug] ?? c.h1;
                return (
                  <Link key={slug} href={`/events/${slug}`} className={`${interactiveCardClass} flex flex-col p-5`}>
                    <h3 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 line-clamp-4">{c.metaDescription}</p>
                    <span className={cardRowHintClass}>
                      View guide <span aria-hidden>→</span>
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <section className="bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-stone-600">
            Weddings have a dedicated path:{" "}
            <Link href="/wedding-tent-rentals" className="font-semibold text-stone-900 underline underline-offset-2">
              Wedding tent rentals
            </Link>
            {" · "}
            <Link href="/planning#occasions" className="font-semibold text-stone-900 underline underline-offset-2">
              Planning by event type
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
