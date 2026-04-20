import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbListSchema } from "@/components/schema";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { cardRowHintClass, interactiveCardClass } from "@/lib/interactive-styles";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { eventLandings, eventLandingSlugs } from "@/lib/event-landing-data";
import { business } from "@/lib/site-data";

const occasionTitles: Record<string, string> = {
  "community-school-town": "Community & school",
  "festivals-fairs": "Festivals & fairs",
  "graduation-parties": "Graduation parties",
  "sweet-16-parties": "Sweet 16",
  quinceaneras: "Quinceañeras",
  tailgating: "Tailgates",
  "fundraisers-galas": "Fundraisers & galas",
};

export const metadata: Metadata = createPageMetadata({
  title: "Events & Occasions | Corporate, School, Graduation & Festival Tent Rentals",
  description: `Plan tents and rentals for Connecticut corporate events, schools, graduations, festivals, and private occasions. ${business.name}: layout-first quoting and professional setup.`,
  path: "/events",
  ogImage: defaultOgImagePath,
});

export default function EventsHubPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
        ]}
      />
      <section className="border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-stone-100 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Events" }]} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Connecticut events</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
            Events & occasions
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-600">
            Choose your event type for practical planning cues, then connect to tents, tables, and crew. Corporate picnics and company programs have a dedicated page; occasion guides cover graduations, festivals, schools, and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Book Now
            </Link>
            <Link
              href="/planning"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
            >
              Planning hub
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Corporate & organizational</h2>
          <p className="mt-2 max-w-3xl text-sm text-stone-600">
            Picnics, staff events, town programs, and presentations. Full layout and inventory conversation on the corporate page.
          </p>
          <div className="mt-6 max-w-xl">
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

      <section className="border-b border-stone-200 bg-[#faf8f5] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Occasion guides</h2>
          <p className="mt-2 max-w-3xl text-sm text-stone-600">
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
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventLandingSlugs.map((slug) => {
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

      <section className="bg-white py-10 sm:py-12">
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
