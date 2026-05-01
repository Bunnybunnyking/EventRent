import Link from "next/link";
import { bookNowSectionClass } from "@/lib/cta-styles";

const secondaryOutlineClass =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2";

const tertiaryLinkClass =
  "text-center text-sm font-semibold text-stone-800 underline underline-offset-4 decoration-stone-400 transition hover:decoration-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 rounded-sm";

export function PartyGuideCtas({ variant = "band" }: { variant?: "band" | "inline" }) {
  if (variant === "inline") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link href="/planning" className={`${bookNowSectionClass} justify-center text-center sm:inline-flex`}>
          Start planning
        </Link>
        <Link href="/tent-rentals" className={secondaryOutlineClass}>
          Explore tent rentals
        </Link>
        <Link href="/wishlist" className={secondaryOutlineClass}>
          Build your wishlist
        </Link>
        <Link href="/contact#quote" className={tertiaryLinkClass}>
          Request a quote
        </Link>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-stone-200 bg-[#111315] p-8 text-center text-stone-100 shadow-lg">
      <p className="text-lg font-semibold sm:text-xl">Ready to move from reading to a real plan?</p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-stone-400">
        Use planners for structure, compare tent families when sizing gets specific, then loop in our team for inventory and setup that matches your site.
      </p>
      <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Link href="/planning" className={`${bookNowSectionClass} justify-center`}>
          Start planning
        </Link>
        <Link href="/tents" className={secondaryOutlineClass}>
          Compare tent sizes
        </Link>
        <Link href="/wishlist" className={secondaryOutlineClass}>
          Build your wishlist
        </Link>
        <Link
          href="/contact#quote"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#edc16c]/40 bg-transparent px-6 py-3 text-sm font-semibold text-[#edc16c] transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#edc16c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111315]"
        >
          Request a quote
        </Link>
      </div>
    </div>
  );
}
