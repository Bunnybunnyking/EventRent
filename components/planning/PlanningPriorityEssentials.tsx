const bubbleClass =
  "flex h-full min-h-0 flex-col rounded-[1.75rem] border border-[#e3d3b0]/85 bg-gradient-to-br from-[#fdf8ed] via-[#faf1dc] to-[#f2e4c4] px-6 py-6 shadow-[0_2px_24px_rgba(45,35,20,0.06)] transition duration-300 sm:px-8 sm:py-7 " +
  "hover:shadow-[0_6px_28px_rgba(45,35,20,0.08)] hover:border-[#d4c4a0]";

const priorities = [
  {
    id: "guest-count-flow", title: "Guest Count and Event Flow", intro:
      "The first step is understanding how many people are coming and how the event will function. This affects the tent size, layout, seating plan, and the overall rental setup.", bullets: [
      "Total guest count", "Seated, cocktail, or mixed setup", "Dining, bar, dance floor, ceremony, or vendor areas", ], }, {
    id: "space-itself", title: "The Space Itself", intro:
      "A space may seem large enough, but the layout, surface, and access points matter just as much as the size. This helps determine what can realistically fit and how the setup will work.", bullets: [
      "Backyard, venue, field, school, or corporate site", "Grass, gravel, asphalt, patio, or mixed surface", "Obstacles like trees, wires, fences, slopes, or pools", ], }, {
    id: "weather-comfort", title: "Weather and Guest Comfort", intro:
      "Outdoor events should be planned for comfort, not just coverage. A tent can make a major difference by creating shade from the sun and a more comfortable space for guests, staff, and vendors to work under throughout the event.", bullets: [
      "Protection from sun, light rain, wind, or cooler temperatures", "Shade and a more comfortable working area under the tent", "Sidewalls, heaters, fans, and lighting for a better guest experience", ], }, {
    id: "scope-we-provide", title: "What You Need Us to Provide", intro:
      "Some events only need a tent, while others need a fuller rental package and planning support. Tell us what you want us to supply and we finish a layout-driven quote, equipment list, and setup plan around that scope.", bullets: [
      "Tent only or full setup", "Tables, chairs, lighting, flooring, heaters, or sidewalls", "Layout help, planning help, or a quote-ready setup", ], },
] as const;

export function PlanningPriorityEssentials() {
  return (
    <section
      className="mt-6 border-t border-stone-200/60 pt-6 sm:mt-7 sm:pt-7 lg:mt-8 lg:pt-8"
      aria-labelledby="planning-priorities-heading"
    >
      <header className="mx-auto max-w-2xl text-center sm:max-w-3xl sm:text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f6f28]">Planning priorities</p>
        <h2
          id="planning-priorities-heading"
          className="mt-3 text-[1.65rem] font-semibold leading-snug tracking-tight text-black [font-family:var(--font-display)] sm:text-3xl sm:leading-tight"
        >
          Start With the Essentials
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-stone-700 sm:text-base">
          Four decisions hosts bring to every quote conversation. Get them clear before you open calculators and planners
          below, so numbers stay tied to how your day actually runs.
        </p>
      </header>
      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:mt-9 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-7 lg:mt-10 lg:max-w-6xl lg:gap-x-9 lg:gap-y-8">
        {priorities.map((item, index) => (
          <article key={item.id} aria-labelledby={`${item.id}-title`} className={bubbleClass}>
            <h3
              id={`${item.id}-title`}
              className="flex items-start gap-4 text-xl font-bold leading-snug tracking-tight text-black [font-family:var(--font-display)] sm:text-[1.35rem] sm:gap-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/70 text-lg font-bold tabular-nums text-black shadow-sm sm:h-11 sm:w-11 sm:text-xl">
                {index + 1}
              </span>
              <span className="min-w-0 pt-0.5">{item.title}</span>
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-[1.65] text-black/90 sm:text-base sm:leading-relaxed">{item.intro}</p>
            <ul className="mt-5 space-y-2.5 border-t border-black/[0.06] pt-5 text-[0.9375rem] leading-relaxed text-black/90 sm:text-base">
              {item.bullets.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]/80" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
