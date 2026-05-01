import Link from "next/link";
import { browseInventoryHeaderClass } from "@/lib/cta-styles";

const inv = (hash: string) => `/rental-inventory${hash}`;

const linkClass =
  "font-semibold text-[#5c4518] underline decoration-[#a67c28]/45 underline-offset-2 transition hover:text-stone-950";

/**
 * Compact planning-hub strip: copy on the left, gold “Browse inventory” on the right (stacks on small screens).
 */
export function BrowseInventoryPlanningCallout() {
  return (
    <div
      id="browse-inventory-callout"
      className="mb-4 scroll-mt-28 rounded-xl border border-[#c9a87a]/50 bg-gradient-to-br from-[#fcf6e8] via-[#f6e8ce] to-[#ebd7b4] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_4px_16px_rgba(139,106,52,0.06)] sm:mb-5 sm:px-4 sm:py-3.5"
      aria-label="Browse rental inventory"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <p className="min-w-0 flex-1 text-left text-[0.8125rem] leading-snug text-stone-800 sm:max-w-[40rem] sm:text-[0.84375rem] sm:leading-relaxed">
          <Link href="/wishlist" className={linkClass}>
            Book online
          </Link>{" "}
          now. Tents and peak dates move quickly in the summer and around holidays. See our{" "}
          <Link href={inv("#inv-tents")} className={linkClass}>
            tents
          </Link>
          ,{" "}
          <Link href={inv("#inv-chairs")} className={linkClass}>
            chairs
          </Link>
          ,{" "}
          <Link href={inv("#inv-tables")} className={linkClass}>
            tables
          </Link>
          , and{" "}
          <Link href={inv("#inv-lighting-heating")} className={linkClass}>
            lighting & heating
          </Link>{" "}
          in the live catalog. Not sure where to start?{" "}
          <Link href="/contact" className={linkClass}>
            Call us
          </Link>
          —we&apos;re happy to help.
        </p>
        <Link
          href="/rental-inventory"
          className={`group ${browseInventoryHeaderClass} inline-flex shrink-0 items-center justify-center self-end px-5 py-2.5 sm:self-center sm:px-6 sm:py-2.5`}
          title="Open the full rental catalog"
        >
          <span className="relative z-10">Browse inventory</span>
          <span className="relative z-10 ml-1.5 transition group-hover:translate-x-0.5" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
