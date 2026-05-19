import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbListSchema } from "@/components/schema";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { mobileTextLinkClass } from "@/lib/mobile-booking";
import { cardRowHintClass, interactiveCardClass } from "@/lib/interactive-styles";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "AV, Games & Inflatables | Yard Games & Bounce Houses | Connecticut", description: `Lawn games and bounce houses for Connecticut events, coordinated with tents, tables, and timing. ${business.name} delivers and sets up with your rental plan.`, path: "/av-games", ogImage: defaultOgImagePath, });

const categories = [
  {
    href: "/yard-games", title: "Yard games", body: "Cornhole, giant Jenga, Connect 4, and more for backyards, graduations, corporate picnics, and team events.", }, {
    href: "/bounce-houses", title: "Bounce houses", body: "Clean, inspected inflatables sized for real yards, with safety-first setup and optional bundles with tents and tables.", }, ] as const;

export default function AvGamesHubPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "AV/Games", path: "/av-games" }, ]}
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center sm:inline-flex`}>
              <span className="md:hidden">Get a Fast Quote</span>
              <span className="hidden md:inline">Book Consultation</span>
            </Link>
            <Link
              href="/party-packages"
              className="hidden min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:inline-flex"
            >
              Party packages
            </Link>
            <Link href="/party-packages" className={`${mobileTextLinkClass} sm:hidden`}>
              View party packages →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((cat) => (
              <Fragment key={cat.href}>
                <article className="rounded-2xl border border-stone-200/90 bg-[#faf8f5] p-5 shadow-sm md:hidden">
                  <h2 className="text-xl font-semibold text-stone-900 [font-family:var(--font-display)]">{cat.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{cat.body}</p>
                  <Link
                    href={cat.href}
                    className="mt-4 inline-block text-sm font-semibold text-[#7a5a18] underline decoration-[#d4bc88] underline-offset-[3px] hover:text-stone-900"
                  >
                    Explore {cat.title.toLowerCase()} <span aria-hidden>→</span>
                  </Link>
                </article>
                <Link href={cat.href} className={`${interactiveCardClass} hidden flex-col p-6 md:flex`}>
                  <h2 className="text-xl font-semibold text-stone-900 [font-family:var(--font-display)]">{cat.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{cat.body}</p>
                  <span className={cardRowHintClass}>
                    Explore {cat.title.toLowerCase()} <span aria-hidden>→</span>
                  </span>
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#f3f1ee] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-stone-200/90 bg-white/95 p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
              Different section of the site
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-stone-800 sm:text-2xl [font-family:var(--font-display)]">
              Digital party games &amp; planning tools
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
              Quizzes, mini-games, online planners, and printable-style checklists live on their own hub. They are for
              ideas and math—not for ordering tents, tables, or physical lawn games—so this rentals page can stay focused
              on what we deliver and set up.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/party-games-tools"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
              >
                Open Games &amp; tools hub
                <span aria-hidden className="ml-2">
                  →
                </span>
              </Link>
              <p className="text-xs leading-relaxed text-stone-500 sm:max-w-xs">
                Quizzes, Party Spark, Quick Event Planner, and checklists—separate from tents, tables, and physical games.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-stone-600">
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
