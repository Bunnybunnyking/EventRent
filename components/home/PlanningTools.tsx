import Link from "next/link";
import { interactiveCardClass, cardRowHintClass } from "@/lib/interactive-styles";

const tools = [
  {
    title: "Quick Event Planner", sub: "About 60 seconds", href: "/quick-event-planner", hint: "Explore", }, {
    title: "Sq. ft. calculator", sub: "Rough tent ranges from headcount and layout", href: "/planning#tent-size-estimator", hint: "Explore", }, {
    title: "Easy-to-forget checklist", sub: "Power, access, weather, before the truck rolls", href: "/planning#easy-to-forget", hint: "Explore", }, ] as const;

export function PlanningTools() {
  return (
    <section className="bg-white py-10 sm:py-8 lg:py-9" aria-labelledby="home-tools-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="home-tools-heading" className="text-center text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Planning tools
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-stone-600">
          Not the hero, just the stuff that saves you a headache before quote day.
        </p>

        {/* Mobile: simple list — no large card buttons */}
        <ul className="mt-8 space-y-5 md:hidden">
          {tools.map((t) => (
            <li key={t.title} className="border-b border-stone-200/90 pb-5 last:border-0 last:pb-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-stone-500">Tool</p>
              <h3 className="mt-1 text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">{t.title}</h3>
              <p className="mt-1 text-sm text-stone-600">{t.sub}</p>
              <Link href={t.href} className="mt-3 inline-block text-sm font-semibold text-[#7a5a18] underline decoration-[#d4bc88] underline-offset-[3px] hover:text-stone-900" prefetch={true}>
                Open tool <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-5 hidden gap-4 md:grid md:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.title} href={t.href} className={`${interactiveCardClass} flex flex-col p-5`} prefetch={true}>
              <h3 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">{t.title}</h3>
              <p className="mt-1 text-sm text-stone-600">{t.sub}</p>
              <span className={`${cardRowHintClass} mt-auto pt-4`}>
                {t.hint} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-stone-600 md:mt-5">
          <Link href="/planning" className="font-semibold text-[#7a5a18] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
            Planning hub
          </Link>
          <span className="mx-2 text-stone-400" aria-hidden>
            ·
          </span>
          <Link href="/party-guides" className="font-semibold text-[#7a5a18] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
            Party guides
          </Link>
          <span className="mx-2 text-stone-400" aria-hidden>
            ·
          </span>
          <Link href="/sitemap" className="font-semibold text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-stone-900">
            Site map
          </Link>
        </p>
      </div>
    </section>
  );
}
