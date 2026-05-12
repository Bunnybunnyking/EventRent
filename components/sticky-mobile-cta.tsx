"use client";

import Link from "next/link";
import { CallAndTextCta } from "@/components/call-and-text-stack";
import { stickyMobileBarCallOutlineClass, stickyMobileBarGoldClass } from "@/lib/cta-styles";
import { EVENT_LIST_HREF, LABEL_BUILD_EVENT_LIST, LABEL_CALL_NOW } from "@/lib/mobile-booking";

/** Short “Call now” label — same footprint as the digit pill, no tabular numerals */
const stickyBarCallNowClass =
  "text-[clamp(15px,4.65vw,17px)] font-extrabold leading-none tracking-tight text-neutral-950 subpixel-antialiased";

/** Mobile only: full phone + Goodshuffle wishlist — matches live site pairing. Hidden md+. */
export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e3d3b0]/90 bg-[linear-gradient(180deg,#fffefb_0%,#faf6ee_100%)] p-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] shadow-[0_-4px_22px_rgba(45,35,20,0.1)] backdrop-blur-sm md:hidden">
      <div className="mx-auto grid min-w-0 max-w-lg grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-stretch gap-1.5 px-0.5 [&>*]:min-w-0">
        <CallAndTextCta
          variant="sticky"
          showCallLabel={false}
          showSubcaption={false}
          wrapperClassName="h-full min-h-[48px] w-full"
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
          <span className="relative z-10 block w-full min-w-0 max-w-full whitespace-nowrap px-0 text-center text-[clamp(14px,4.85vw,16px)] font-black leading-none tracking-[-0.055em] text-black subpixel-antialiased [font-family:var(--font-display)]">
            {LABEL_BUILD_EVENT_LIST}
          </span>
        </Link>
      </div>
    </div>
  );
}
