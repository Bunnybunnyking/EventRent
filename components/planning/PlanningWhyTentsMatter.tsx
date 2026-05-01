import Link from "next/link";
import { business } from "@/lib/site-data";

const pillars = [
  {
    id: "comfort-protection", title: "Comfort and Protection", body:
      "A tent helps shield guests, staff, food, and rentals from strong sun, light rain, wind, and shifting weather. It also creates a cooler, more comfortable area for people to gather, dine, work, and celebrate.", bullets: [
      "Shade from direct sun", "Protection from light rain and changing weather", "More comfortable space for guests and vendors", ], }, {
    id: "structure-flow", title: "Structure and Flow", body:
      "A tent gives the event a clear footprint and helps organize the layout. It creates space for seating, dining, bars, dance floors, ceremonies, catering, and guest movement.", bullets: ["Defines the main event area", "Helps organize tables, seating, and service zones", "Supports smoother guest flow"], }, {
    id: "better-atmosphere", title: "Better Atmosphere", body:
      "Tents help transform an open yard, venue lawn, or field into a more intentional event setting. With lighting, sidewalls, flooring, linens, and décor, the space feels more complete and elevated.", bullets: ["Creates a polished focal point", "Makes outdoor space feel more finished", "Supports lighting and décor enhancements"], }, {
    id: "more-flexibility", title: "More Flexibility in Planning", body:
      "A tent gives you more options for where and how the event can happen. It can make private property, open land, or outdoor venues more usable for a wider range of events.", bullets: ["Makes outdoor spaces more event-ready", "Expands layout and setup options", "Gives more control over the event environment"], },
] as const;

const panelClass =
  "relative overflow-hidden rounded-[2rem] border border-[#e0d2bc]/90 bg-gradient-to-br from-[#fdfcfa] via-[#faf6ef] to-[#f3ebe0] " +
  "shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_12px_40px_rgba(45,35,20,0.05)]";

const pillarClass =
  "group flex min-h-0 flex-col border-t border-black/[0.06] pt-6 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0 " +
  "sm:rounded-2xl sm:border sm:border-[#e8dcc8]/90 sm:bg-white/35 sm:px-6 sm:py-6 sm:shadow-sm sm:backdrop-blur-[2px]";

export function PlanningWhyTentsMatter() {
  return (
    <section
      id="why-tents-matter"
      className="mt-5 scroll-mt-36 sm:mt-6 lg:mt-7"
      aria-labelledby="why-tents-matter-heading"
    >
      <div className={panelClass}>
        <div
          className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#c9a24a]/35 to-transparent"
          aria-hidden
        />
        <div className="relative px-6 py-7 sm:px-9 sm:py-9 lg:px-11 lg:py-10">
          <header className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-[min(42rem,100%)] lg:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8f6f28]">Why tents matter</p>
            <h2
              id="why-tents-matter-heading"
              className="mt-3 text-[1.65rem] font-semibold leading-snug tracking-tight text-black [font-family:var(--font-display)] sm:text-3xl sm:leading-tight"
            >
              Why Tents Matter and How They Enhance the Event
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-stone-800/95 sm:text-base sm:leading-relaxed lg:mx-0">
              A tent does more than provide coverage. It helps define the space, improve guest comfort, protect against changing weather, and create a more polished setting for the overall event experience.
            </p>
          </header>

          <div className="mx-auto mt-8 max-w-5xl lg:mx-0 lg:mt-9 lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-8 lg:gap-x-9 lg:gap-y-8">
              {pillars.map((item) => (
                <article key={item.id} className={pillarClass} aria-labelledby={`${item.id}-title`}>
                  <h3
                    id={`${item.id}-title`}
                    className="text-lg font-semibold leading-snug tracking-tight text-black [font-family:var(--font-display)] sm:text-[1.125rem]"
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.65] text-stone-800/95 sm:text-base sm:leading-relaxed">{item.body}</p>
                  <ul className="mt-4 space-y-2 border-t border-black/[0.05] pt-4 text-[0.9375rem] leading-relaxed text-stone-800/95 sm:text-base">
                    {item.bullets.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span
                          className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#9a7328]/75"
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl border-t border-[#dccbb0]/80 pt-6 text-center text-sm leading-relaxed text-stone-700 sm:mt-9 sm:pt-7 lg:mx-0 lg:max-w-none lg:text-left">
            When your priorities are clear, the next step is sizing and layout against your site.{" "}
            <Link
              href="/contact#quote"
              className="font-semibold text-[#7a5a18] underline decoration-[#c9a24a]/60 underline-offset-[3px] transition hover:text-black hover:decoration-[#9a7328]"
              prefetch={true}
            >
              Share your date and guest flow
            </Link>
            . We translate it into a practical tent plan and quote tied to real inventory across {business.state}.
          </p>
        </div>
      </div>
    </section>
  );
}
