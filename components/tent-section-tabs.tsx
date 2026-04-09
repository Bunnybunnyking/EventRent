import Link from "next/link";

const activeClass =
  "-mb-px inline-flex border-b-2 border-[#9a7a45] px-3 pb-2.5 pt-1 text-sm font-semibold text-stone-900 sm:px-4";
const inactiveClass =
  "-mb-px inline-flex px-3 pb-2.5 pt-1 text-sm font-medium text-stone-500 transition hover:text-stone-800 sm:px-4";

export type TentSectionTab = "tent-rentals" | "jobsite-coverage" | "inventory";

export function TentSectionTabs({ active }: { active: TentSectionTab }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-center gap-0 border-b border-stone-300/90 sm:justify-start">
      <Link href="/tent-rentals" className={active === "tent-rentals" ? activeClass : inactiveClass}>
        Tent rentals
      </Link>
      <Link href="/tent-rentals/jobsite-coverage" className={active === "jobsite-coverage" ? activeClass : inactiveClass}>
        Jobsite Coverage
      </Link>
      <Link href="/rental-inventory" className={active === "inventory" ? activeClass : inactiveClass}>
        Inventory
      </Link>
    </div>
  );
}
