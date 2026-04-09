"use client";

import Link from "next/link";
import { useState } from "react";
import { business, headerNavLinks } from "@/lib/site-data";

/** Wish list — distinct from black: muted green-grey */
const btnWishlist =
  "inline-flex shrink-0 items-center justify-center rounded-full border border-[#6b7f78]/55 bg-[#3d4845] px-3 py-2 text-[0.68rem] font-semibold leading-none tracking-[0.06em] text-[#e8f0ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition hover:border-[#8a9e96]/65 hover:bg-[#46534f] hover:text-white sm:px-4 sm:py-2.5 sm:text-xs [font-family:var(--font-display)]";

const btnGold =
  "inline-flex shrink-0 items-center justify-center rounded-full bg-[#b78a2d] px-3 py-2 text-[0.68rem] font-semibold leading-none tracking-[0.04em] text-[#1b1712] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition hover:bg-[#c99d42] sm:px-4 sm:py-2.5 sm:text-xs [font-family:var(--font-display)]";

const navLinkClass =
  "whitespace-nowrap px-2 py-1 text-[1rem] font-semibold leading-tight tracking-[0.03em] text-[#f0ebe3] [font-family:var(--font-display)] transition hover:text-[#f5e0b3] md:text-[1.05rem] lg:text-[1.1rem] xl:text-[1.12rem]";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f1113] shadow-[0_1px_0_rgba(183,138,45,0.25)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* —— Desktop / tablet: reference layout —— */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[1fr_minmax(0,auto)_1fr] items-start gap-x-4 pb-1 pt-6 lg:gap-x-8 lg:pt-7">
            <div className="flex justify-start pt-1">
              <Link href="/wishlist" className={btnWishlist}>
                Add to Wish List
              </Link>
            </div>

            <div className="flex min-w-0 flex-col items-center text-center">
              <Link
                href="/"
                className="site-header-logo max-w-[min(100vw-8rem,36rem)] text-balance text-3xl leading-[1.1] tracking-[0.03em] lg:text-4xl xl:text-[2.35rem]"
                aria-label={`${business.name} home`}
              >
                {business.name}
              </Link>
              <p className="brand-tagline mt-2.5 max-w-xl text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-[#c9a57a] lg:mt-3 lg:text-[0.68rem]">
                {business.celebrationTagline}
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <Link href="/contact#quote" className={btnGold}>
                Request a Consultation
              </Link>
            </div>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-2 pb-3 pt-3 lg:gap-x-5 xl:gap-x-7"
            aria-label="Primary"
          >
            {headerNavLinks.map((link) => (
              <Link key={`${link.label}-${link.href}`} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* —— Mobile: hierarchy brand → subtitle → actions → menu —— */}
        <div className="md:hidden">
          <div className="flex flex-col items-center px-1 pb-2 pt-4 text-center sm:pt-5">
            <Link
              href="/"
              className="site-header-logo text-[1.35rem] leading-tight tracking-[0.03em] sm:text-[1.5rem]"
              aria-label={`${business.name} home`}
            >
              {business.name}
            </Link>
            <p className="brand-tagline mt-2.5 max-w-md text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#c9a57a] sm:text-[0.62rem]">
              {business.celebrationTagline}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 px-1 pb-2 sm:gap-3">
            <Link href="/wishlist" className={`${btnWishlist} px-2.5 sm:px-4`}>
              <span className="sm:hidden">Wish List</span>
              <span className="hidden sm:inline">Add to Wish List</span>
            </Link>
            <Link href="/contact#quote" className={`${btnGold} px-2.5 sm:px-4`}>
              <span className="hidden min-[400px]:inline">Request a Consultation</span>
              <span className="min-[400px]:hidden">Consultation</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#b78a2d]/90 bg-transparent px-3 py-2 text-[0.7rem] font-semibold text-[#f1d48a] sm:text-xs [font-family:var(--font-display)]"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-[#b78a2d]/40 bg-[#14171a] px-3 py-3 md:hidden"
          >
            <div className="grid max-h-[min(65vh,26rem)] gap-0.5 overflow-y-auto overscroll-contain rounded-lg border border-white/5">
              {headerNavLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3.5 text-center text-[1.08rem] font-semibold tracking-[0.02em] text-stone-100 [font-family:var(--font-display)] transition hover:bg-white/[0.06] hover:text-[#f5e0b3] sm:text-[1.12rem]"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={business.phoneHref}
                className="mx-2 mb-2 mt-2 rounded-full bg-[#b78a2d] px-4 py-3 text-center text-[0.95rem] font-bold tracking-[0.03em] text-[#1b1712] [font-family:var(--font-display)]"
              >
                Call Now
              </a>
            </div>
          </div>
        ) : null}

        {/* Thin gold divider — full width of header */}
        <div className="h-px w-full bg-[#b78a2d]/85" aria-hidden />
      </div>
    </header>
  );
}
