"use client";

import Link from "next/link";
import { useState } from "react";
import {
  bookNowHeaderHomeStackConsultClass,
  bookNowHeaderHomeStackOnlineClass,
} from "@/lib/cta-styles";
import { business, headerNavLinks } from "@/lib/site-data";

/** Slightly larger numerals before “+” (e.g. 50+ years) while keeping one string in site-data. */
function CelebrationTagline({ className }: { className: string }) {
  const text = business.celebrationTagline;
  const m = /^(.+?)(\d+)(\+)(.*)$/.exec(text);
  if (!m) {
    return <p className={className}>{text}</p>;
  }
  const [, before, digits, plus, after] = m;
  return (
    <p className={className}>
      {before}
      <span className="inline-block text-[1.14em] font-bold leading-none sm:text-[1.16em] lg:text-[1.2em]">
        {digits}
      </span>
      {plus}
      {after}
    </p>
  );
}

/** Desktop / tablet: one row, scroll horizontally on narrow viewports instead of wrapping */
const navLinkClass =
  "shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[1.14rem] font-semibold leading-tight tracking-[0.03em] text-[#f0ebe3] [font-family:var(--font-display)] transition hover:text-[#f5e0b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1113] md:text-[1.22rem] lg:text-[1.28rem] xl:text-[1.32rem]";

const mobileNavLinkClass =
  "block rounded-lg px-3 py-2.5 text-[0.98rem] font-medium leading-snug tracking-[0.02em] text-stone-200 transition active:bg-white/[0.06] [font-family:var(--font-display)]";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f1113] shadow-[0_1px_0_rgba(183,138,45,0.25)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Desktop / tablet */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[1fr_minmax(0,auto)_1fr] items-start gap-x-3 gap-y-0 pb-0 pt-3 lg:gap-x-6 lg:pt-4">
            <div className="min-h-[38px] min-w-0 justify-self-start self-start pt-0.5" aria-hidden />
            <div className="flex min-w-0 flex-col items-center justify-self-center text-center">
              <Link
                href="/"
                className="site-header-logo max-w-[min(100vw-8rem,38rem)] text-balance text-[2.1rem] leading-[1.08] tracking-[0.03em] sm:text-[2.25rem] lg:text-[2.65rem] xl:text-[2.85rem]"
                aria-label={`${business.name} home`}
              >
                {business.name}
              </Link>
              <CelebrationTagline className="brand-tagline mt-1 max-w-xl text-[0.75rem] font-semibold uppercase leading-snug tracking-[0.16em] text-[#d4af48] sm:text-[0.78rem] lg:mt-1.5 lg:text-[0.84rem]" />
            </div>
            <div className="flex min-h-[38px] min-w-0 flex-col items-end justify-end gap-1 self-start justify-self-end pt-0.5">
              <Link
                href="/contact#quote"
                className={bookNowHeaderHomeStackConsultClass}
                title="Book a consultation"
              >
                <span className="relative z-10">Book Consultation</span>
              </Link>
              <Link
                href="/wishlist"
                className={bookNowHeaderHomeStackOnlineClass}
                title="Browse catalog and book online"
              >
                <span className="ctp-home-book-online-sheen" aria-hidden>
                  <span className="ctp-home-book-online-sheen-bar" />
                </span>
                <span className="relative z-10">Book Online</span>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-hidden pb-2 pt-1.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] [scrollbar-color:rgba(183,138,45,0.45)_transparent]">
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

        {/* Mobile: compact bar — brand + menu only; CTAs live in sticky bar */}
        <div className="flex items-center justify-between gap-3 py-2.5 md:hidden">
          <Link
            href="/"
            className="site-header-logo min-w-0 flex-1 text-left text-[1.28rem] leading-[1.12] tracking-[0.03em]"
            aria-label={`${business.name} home`}
          >
            {business.name}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-[40px] shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#b78a2d]/70 bg-[#1a1d20]/90 px-4 py-2 text-sm font-semibold text-[#f5e0b3] [font-family:var(--font-display)] active:bg-[#252a2e]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open ? (
          <div id="mobile-nav" className="border-t border-[#b78a2d]/35 bg-[#14171a] px-3 pb-4 pt-2 md:hidden">
            <p className="mb-2 px-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#9a8f82]">
              Browse
            </p>
            <CelebrationTagline className="brand-tagline mb-3 px-1 text-[0.62rem] font-semibold uppercase leading-snug tracking-[0.14em] text-[#d4af48]/90" />
            <nav className="flex max-h-[min(65vh,28rem)] flex-col gap-0.5 overflow-y-auto overscroll-contain rounded-xl border border-white/[0.06] bg-[#0f1214] py-1" aria-label="Primary">
              {headerNavLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={mobileNavLinkClass}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}

        <div className="h-px w-full bg-[#b78a2d]/85" aria-hidden />
      </div>
    </header>
  );
}
