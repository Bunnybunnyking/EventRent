"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { bookNowHeaderClass, bookNowHeaderHomeAccentClass, browseInventoryHeaderClass } from "@/lib/cta-styles";
import { business, headerNavLinks } from "@/lib/site-data";

/** Desktop / tablet: one row, scroll horizontally on narrow viewports instead of wrapping */
const navLinkClass =
  "shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[1.14rem] font-semibold leading-tight tracking-[0.03em] text-[#f0ebe3] [font-family:var(--font-display)] transition hover:text-[#f5e0b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1113] md:text-[1.22rem] lg:text-[1.28rem] xl:text-[1.32rem]";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-[#0f1113] shadow-[0_1px_0_rgba(183,138,45,0.25)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ,   Desktop / tablet: reference layout ,   */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[1fr_minmax(0,auto)_1fr] items-start gap-x-3 gap-y-1 pb-1 pt-6 lg:gap-x-6 lg:pt-7">
            <div className="flex min-h-[42px] min-w-0 items-start justify-self-start self-start pt-0.5">
              {isHome ? (
                <Link href="/rental-inventory" className={browseInventoryHeaderClass} title="Browse rental inventory">
                  <span className="relative z-10">Browse inventory</span>
                </Link>
              ) : null}
            </div>
            <div className="flex min-w-0 flex-col items-center justify-self-center text-center">
              <Link
                href="/"
                className="site-header-logo max-w-[min(100vw-8rem,38rem)] text-balance text-[2.1rem] leading-[1.08] tracking-[0.03em] sm:text-[2.25rem] lg:text-[2.65rem] xl:text-[2.85rem]"
                aria-label={`${business.name} home`}
              >
                {business.name}
              </Link>
              <p className="brand-tagline mt-2.5 max-w-xl text-[0.68rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-[#c9a57a] lg:mt-3 lg:text-[0.76rem]">
                {business.celebrationTagline}
              </p>
            </div>
            <div className="flex min-h-[42px] min-w-0 items-start justify-self-end self-start justify-end pt-0.5">
              <Link
                href="/contact#quote"
                className={isHome ? bookNowHeaderHomeAccentClass : bookNowHeaderClass}
                title="Book now"
              >
                <span className="relative z-10">Book Now</span>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-hidden pb-3 pt-3 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] [scrollbar-color:rgba(183,138,45,0.45)_transparent]">
            <nav
              className="mx-auto flex w-max max-w-none flex-nowrap items-center justify-center gap-x-3 px-3 sm:gap-x-4 lg:gap-x-6 xl:gap-x-7"
              aria-label="Primary"
            >
              {headerNavLinks.map((link) => (
                <Link key={`${link.label}-${link.href}`} href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* ,   Mobile: hierarchy brand → subtitle → actions → menu ,   */}
        <div className="md:hidden">
          <div className="flex flex-col items-center px-2 pb-2 pt-4 text-center sm:pt-5">
            <Link
              href="/"
              className="site-header-logo text-[1.55rem] leading-[1.12] tracking-[0.03em] sm:text-[1.72rem]"
              aria-label={`${business.name} home`}
            >
              {business.name}
            </Link>
            <p className="brand-tagline mt-2 max-w-md text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.16em] text-[#c9a57a] sm:mt-2.5 sm:text-[0.7rem]">
              {business.celebrationTagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 px-2 pb-2 sm:gap-2.5">
            {isHome ? (
              <Link
                href="/rental-inventory"
                className={`${browseInventoryHeaderClass} min-h-[44px] px-3 sm:min-h-0 sm:px-4`}
                title="Browse rental inventory"
              >
                <span className="relative z-10">Browse inventory</span>
              </Link>
            ) : null}
            <Link
              href="/contact#quote"
              className={`${isHome ? bookNowHeaderHomeAccentClass : bookNowHeaderClass} min-h-[44px] px-4 sm:min-h-0`}
              title="Book now"
            >
              <span className="relative z-10">Book Now</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-[44px] min-w-[4.5rem] shrink-0 touch-manipulation items-center justify-center rounded-full border-2 border-[#b78a2d]/90 bg-[#1a1d20]/80 px-4 py-2 text-sm font-semibold text-[#f5e0b3] sm:min-h-0 sm:text-base [font-family:var(--font-display)] active:bg-[#252a2e]"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-[#b78a2d]/40 bg-[#14171a] px-3 py-3 md:hidden"
          >
            <p className="mb-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#9a8f82]">
              Browse services
            </p>
            <div className="grid max-h-[min(72vh,32rem)] grid-cols-2 gap-2 overflow-y-auto overscroll-contain rounded-xl border border-white/[0.07] bg-[#0f1214] p-2.5 sm:gap-2.5">
              {headerNavLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] touch-manipulation items-center justify-center rounded-lg border border-white/[0.06] bg-[#181c1f] px-2 py-3 text-center text-[0.98rem] font-semibold leading-tight tracking-[0.02em] text-stone-100 [font-family:var(--font-display)] transition active:bg-[#252a2e] sm:min-h-[56px] sm:text-[1.05rem]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {/* Thin gold divider, full width of header */}
        <div className="h-px w-full bg-[#b78a2d]/85" aria-hidden />
      </div>
    </header>
  );
}
