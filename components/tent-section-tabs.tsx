import Link from "next/link";

const wrap = "flex flex-wrap gap-1 rounded-2xl border border-stone-200/90 bg-white/90 p-1 shadow-sm";

const activeClass =
  "inline-flex items-center justify-center rounded-xl bg-stone-900 px-3.5 py-2 text-sm font-semibold text-white shadow-sm sm:px-4";
const inactiveClass =
  "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 sm:px-4";

export type TentSectionTab = "tent-rentals" | "jobsite-coverage" | "inventory";

export function TentSectionTabs({ active }: { active: TentSectionTab }) {
  return (
    <nav className={wrap} aria-label="Tent section menu">
      <Link href="/tent-rentals" className={active === "tent-rentals" ? activeClass : inactiveClass}>
        Events &amp; layouts
      </Link>
      <Link href="/tent-rentals/jobsite-coverage" className={active === "jobsite-coverage" ? activeClass : inactiveClass}>
        Jobsite tents
      </Link>
      <Link href="/rental-inventory" className={active === "inventory" ? activeClass : inactiveClass}>
        Full inventory
      </Link>
    </nav>
  );
}
