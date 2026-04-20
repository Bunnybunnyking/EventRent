import Link from "next/link";
import { interactiveCardClass, cardRowHintClass } from "@/lib/interactive-styles";

const tools = [
  {
    title: "Quick Event Planner",
    sub: "About 60 seconds",
    href: "/quick-event-planner",
    hint: "Explore",
  },
  {
    title: "Sq. ft. calculator",
    sub: "Rough tent ranges from headcount and layout",
    href: "/planning#tent-size-estimator",
    hint: "Explore",
  },
  {
    title: "Easy-to-forget checklist",
    sub: "Power, access, weather—before the truck rolls",
    href: "/planning#easy-to-forget",
    hint: "Explore",
  },
] as const;

export function PlanningTools() {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="home-tools-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="home-tools-heading" className="text-center text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Planning tools
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-stone-600">
          Not the hero—just the stuff that saves you a headache before quote day.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
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
        <p className="mt-8 text-center text-sm">
          <Link href="/planning" className="font-semibold text-[#7a5a18] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
            Explore planning guide
          </Link>
        </p>
      </div>
    </section>
  );
}
