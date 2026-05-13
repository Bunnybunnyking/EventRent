"use client";

import Link from "next/link";
import { CallAndTextCta } from "@/components/call-and-text-stack";
import { stickyMobileBarCallOutlineClass, stickyMobileBarGoldClass } from "@/lib/cta-styles";
import { EVENT_LIST_HREF, LABEL_BUILD_EVENT_LIST, LABEL_CALL_NOW } from "@/lib/mobile-booking";

/** “Call now” on white + gold-outline pill — dark type, confident weight. */
const stickyBarCallNowClass =
  "text-[clamp(12.5px,3.65vw,14.5px)] font-extrabold leading-none tracking-[0.07em] text-stone-900 subpixel-antialiased [font-family:var(--font-display)]";

/** Mobile only: full phone + Goodshuffle wishlist — matches live site pairing. Hidden md+. */
export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e3d3b0]/85 bg-[linear-gradient(180deg,#fffefb_0%,#f7f4ed_100%)] px-2 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-4px_18px_rgba(45,35,20,0.07)] md:hidden">
      <div className="mx-auto grid min-w-0 max-w-lg grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] items-stretch gap-2 py-0.5 [&>*]:min-w-0">
        <CallAndTextCta
          variant="sticky"
          showCallLabel={false}
          showSubcaption={false}
          wrapperClassName="h-full min-h-[44px] w-full"
          linkClassName={stickyMobileBarCallOutlineClass}
          phoneNumberClassName={stickyBarCallNowClass}
          phonePillLabel={LABEL_CALL_NOW}
          linkProps={{ "data-cta": "call-reserve", "data-cta-location": "mobile-sticky" }}
        />
        <Link
          href={EVENT_LIST_HREF}
          className={`${stickyMobileBarGoldClass} items-center text-center !tracking-normal`}
          prefetch={true}
          title="Browse the live catalog and build your event list"
          aria-label={LABEL_BUILD_EVENT_LIST}
          data-cta="build-event-list"
          data-cta-location="mobile-sticky"
        >
          <span className="relative z-10 block w-full min-w-0 max-w-full px-0.5 text-center text-[clamp(12.5px,4.1vw,16px)] font-bold leading-[1.08] tracking-[-0.02em] text-[#1a140c] subpixel-antialiased [font-family:var(--font-display)] [text-wrap:balance] sm:whitespace-nowrap">
            {LABEL_BUILD_EVENT_LIST}
          </span>
        </Link>
      </div>
    </div>
  );
}
