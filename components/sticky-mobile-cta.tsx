"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bookNowStickyClass } from "@/lib/cta-styles";
import { business } from "@/lib/site-data";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const isGamesLanding = pathname === "/yard-games" || pathname === "/bounce-houses";
  const primaryLabel = isGamesLanding ? "Check Availability" : "Book Now";
  const primaryHref = "/contact#quote";
  const primaryClass = isGamesLanding
    ? "touch-manipulation rounded-full bg-[#1f2327] px-4 py-3.5 text-center text-base font-bold leading-snug text-white shadow-md ring-1 ring-white/10 transition hover:bg-[#2a3036] active:bg-[#333a42] sm:py-4 sm:text-[1.05rem]"
    : bookNowStickyClass;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2.5">
        <Link href={primaryHref} className={primaryClass}>
          {primaryLabel}
        </Link>
        <a href={business.phoneHref} className={`${bookNowStickyClass} block w-full`}>
          Call Now
        </a>
      </div>
    </div>
  );
}
