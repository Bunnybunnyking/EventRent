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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <Link href={primaryHref} className="rounded-full bg-[#1f2327] px-4 py-3 text-center text-sm font-semibold text-white">
          {primaryLabel}
        </Link>
        <a href={business.phoneHref} className="rounded-full bg-[#b78a2d] px-4 py-3 text-center text-sm font-semibold text-[#1b1712]">
          Call Now
        </a>
      </div>
    </div>
  );
}
