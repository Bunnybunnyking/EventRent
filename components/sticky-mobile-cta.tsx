"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { business } from "@/lib/site-data";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const isGamesLanding = pathname === "/yard-games" || pathname === "/bounce-houses";
  const primaryLabel = isGamesLanding ? "Check Availability" : "Request Quote";
  const primaryHref = "/contact#quote";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2.5">
        <Link
          href={primaryHref}
          className="touch-manipulation rounded-full bg-[#1f2327] px-4 py-3.5 text-center text-base font-semibold leading-snug text-white active:bg-[#2a3036] sm:py-4 sm:text-[1.05rem]"
        >
          {primaryLabel}
        </Link>
        <a
          href={business.phoneHref}
          className="touch-manipulation rounded-full bg-[#b78a2d] px-4 py-3.5 text-center text-base font-semibold leading-snug text-[#1b1712] active:bg-[#c99d42] sm:py-4 sm:text-[1.05rem]"
        >
          Call now
        </a>
      </div>
    </div>
  );
}
