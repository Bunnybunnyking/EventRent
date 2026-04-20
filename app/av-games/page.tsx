import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbListSchema } from "@/components/schema";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { cardRowHintClass, interactiveCardClass } from "@/lib/interactive-styles";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "AV, Games & Inflatables | Yard Games & Bounce Houses | Connecticut",
  description: `Lawn games and bounce houses for Connecticut events, coordinated with tents, tables, and timing. ${business.name} delivers and sets up with your rental plan.`,
  path: "/av-games",
  ogImage: defaultOgImagePath,
});

const categories = [
  {
    href: "/yard-games",
    title: "Yard games",
    body: "Cornhole, giant Jenga, Connect 4, and more for backyards, graduations, corporate picnics, and team events.",
  },
  {
    href: "/bounce-houses",
    title: "Bounce houses",
    body: "Clean, inspected inflatables sized for real yards, with safety-first setup and optional bundles with tents and tables.",
  },
] as const;

export default function AvGamesHubPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "AV/Games", path: "/av-games" },
        ]}
      />
      <section className="border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-stone-100 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "AV/Games" }]} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Add-ons & atmosphere</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
            Games & inflatables
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-600">
            Lawn games and bounce houses pair with tent packages and event flow. We coordinate delivery and placement with your main rental so setup day stays simple. Sound and AV are typically handled by your DJ or venue; tell us during quoting if you need help sequencing power and footprint.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Book Now
            </Link>
            <Link
              href="/party-packages"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
            >
              Party packages
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className={`${interactiveCardClass} flex flex-col p-6`}>
                <h2 className="text-xl font-semibold text-stone-900 [font-family:var(--font-display)]">{cat.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{cat.body}</p>
                <span className={cardRowHintClass}>
                  Explore {cat.title.toLowerCase()} <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-stone-600">
            Planning tents and layout first?{" "}
            <Link href="/planning" className="font-semibold text-stone-900 underline underline-offset-2">
              Planning hub
            </Link>
            {" · "}
            <Link href="/events" className="font-semibold text-stone-900 underline underline-offset-2">
              Events
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
