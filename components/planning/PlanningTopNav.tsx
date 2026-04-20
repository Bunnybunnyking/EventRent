const pillClass =
  "inline-flex shrink-0 items-center rounded-full border border-stone-200/90 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-700 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:px-3.5 sm:text-xs";

/** Slightly quieter than the hero so text + photo stay the focus */
const primaryToolClass =
  "inline-flex min-h-[2.5rem] shrink-0 items-center justify-center rounded-full border border-[#c9a24a]/50 bg-gradient-to-b from-[#fffdf8] to-[#fff6e6] px-4 py-2 text-xs font-semibold text-[#4a3814] shadow-sm transition hover:border-[#b78a2d] hover:from-white hover:to-[#fff4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:min-h-[2.625rem] sm:px-5 sm:text-sm";

const secondaryToolClass =
  "inline-flex min-h-[2.5rem] shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:min-h-[2.625rem] sm:px-5 sm:text-sm";

const primaryPills = [
  { href: "#party-guides", label: "Party guides" },
  { href: "/guides", label: "Guides hub" },
  { href: "#tent-types", label: "Tent types" },
  { href: "#easy-to-forget", label: "Easy to forget" },
] as const;

export function PlanningTopNav() {
  return (
    <nav aria-label="Planning page topics and tools" className="w-full border-b border-stone-100 pb-5 sm:pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {primaryPills.map((item) => (
            <a key={item.href} href={item.href} className={pillClass}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <a href="#quick-event-planner" className={primaryToolClass}>
            Quick Event Planner
          </a>
          <a href="#tent-size-estimator" className={secondaryToolClass}>
            Sq Ft Calculator
          </a>
          <a href="#backyard-party-checklist" className={secondaryToolClass}>
            Party checklist
          </a>
        </div>
      </div>
    </nav>
  );
}
