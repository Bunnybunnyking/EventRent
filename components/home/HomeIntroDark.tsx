import Link from "next/link";
import { QuickSizeReferenceButton } from "@/components/tent-seating-reference/quick-size-reference-button";
import { mobileTextLinkClass } from "@/lib/mobile-booking";
import { business } from "@/lib/site-data";

const trustBullets = [
  "We show up on time.",
  "We respect your lawn.",
  "We respect your plan.",
  "Clean gear, experienced setup, real people you can call.",
] as const;

/**
 * Dark band under the hero: headline stack, then bullets (left) + [Tent & seating ref | taglines] row (right).
 * Mobile hero copy + quote link live on `HomeHeroFullBleed`; this section adds depth without duplicating CTAs.
 */
export function HomeIntroDark() {
  return (
    <section className="relative isolate overflow-hidden bg-[#15181b] text-white md:block" aria-labelledby="home-intro-heading">
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-5 sm:pb-8 sm:pt-6 lg:px-8">
        {/* Desktop / tablet: full intro (mobile uses slim hero band above) */}
        <div className="hidden md:block">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#edc16c] sm:text-[0.65rem]">{business.name}</p>
          <h1
            id="home-intro-heading"
            className="mt-1 max-w-4xl text-[1.5rem] font-semibold leading-[1.1] tracking-tight sm:text-[1.65rem] sm:leading-tight md:text-[2.1rem] md:leading-[1.08]"
          >
            Let Us Handle the Event &amp; Tent
          </h1>
          <p className="mt-1 max-w-2xl text-sm font-medium leading-snug text-[#f0e6d4] [font-family:var(--font-display)] sm:text-base">
            Plan it right. Set it tight. Enjoy your night.
          </p>
        </div>

        <div className="mt-2.5 grid gap-6 md:mt-2.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-x-6 xl:gap-x-8">
          <ul className="grid max-w-xl gap-x-4 gap-y-2 text-[0.8125rem] leading-snug text-stone-200 sm:max-w-none sm:grid-cols-2 sm:text-[0.84375rem] lg:max-w-none">
            {trustBullets.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c9a24a]" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="flex min-w-0 flex-col gap-3 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-start sm:gap-x-3 lg:border-t-0 lg:pt-0">
            <QuickSizeReferenceButton variant="goldOnDark" className="hidden shrink-0 text-balance sm:inline-flex" />
            <Link href="/tent-seating-reference" prefetch={true} className={`${mobileTextLinkClass} sm:hidden`}>
              Tent &amp; seating reference →
            </Link>
            <div className="min-w-0 flex-1 space-y-1 sm:min-w-[12rem]">
              <p className="text-[0.68rem] font-medium leading-snug text-[#e8dcc4] [font-family:var(--font-display)] sm:text-[0.72rem] sm:leading-snug">
                {business.heroBrandTagline}
              </p>
              <p className="text-[0.68rem] leading-snug text-stone-400 sm:text-[0.72rem] sm:leading-snug">
                Based in {business.primaryCity}, with crews across Connecticut. Weddings, graduations,
                cookouts, and company picnics. One team from your quote to load out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
