import { business } from "@/lib/site-data";

/**
 * Dark band directly under the hero — headline and brand story only (no duplicate CTAs; links live in sections below).
 */
export function HomeIntroDark() {
  return (
    <section className="relative isolate overflow-hidden bg-[#15181b] text-white" aria-labelledby="home-intro-heading">
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-14 md:pb-16 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#edc16c]">{business.name}</p>
        <h1
          id="home-intro-heading"
          className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl sm:leading-tight md:text-5xl"
        >
          We show up when we say we will—and we treat your lawn like it matters.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#e8dcc4] [font-family:var(--font-display)] sm:text-lg">
          {business.heroBrandTagline}
        </p>
        <p className="mt-5 max-w-2xl text-base text-stone-200">
          Based in Wethersfield with crews across {business.primaryCity} and the rest of Connecticut, we are family owned
          and have been at this since {business.establishedYear}. Weddings, graduations, cookouts, company picnics—clean
          gear, experienced setup, and real people you can call with questions.
        </p>
      </div>
    </section>
  );
}
