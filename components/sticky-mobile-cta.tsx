"use client";

import Link from "next/link";
import { bookNowStickyClass, mobileStickyOutlineClass } from "@/lib/cta-styles";
import { EVENT_LIST_HREF, LABEL_BUILD_EVENT_LIST, LABEL_CALL_NOW } from "@/lib/mobile-booking";
import { business } from "@/lib/site-data";

/** Exactly two actions on mobile: Call + Build Event List (premium sticky pair). */
export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200/90 bg-[#faf8f5]/98 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-6px_28px_rgba(15,14,12,0.07)] backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a href={business.phoneHref} className={`${mobileStickyOutlineClass}`}>
          {LABEL_CALL_NOW}
        </a>
        <Link href={EVENT_LIST_HREF} prefetch={true} className={bookNowStickyClass}>
          {LABEL_BUILD_EVENT_LIST}
        </Link>
      </div>
    </div>
  );
}
