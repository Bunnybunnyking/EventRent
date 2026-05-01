"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { GoodshuffleCatalogGallery } from "@/components/goodshuffle-catalog-gallery";
import { GoodshuffleMissingKeyNotice } from "@/components/goodshuffle-runtime";
import { GoodshuffleWishlistView } from "@/components/goodshuffle-wishlist-view";
import { goodshuffleTentCanopyGalleryCategory } from "@/lib/goodshuffle-env";
import { business } from "@/lib/site-data";

const tentFleetLinks = [
  { href: "/tents", label: "Tent guide" },
  { href: "/tents/frame-tents", label: "Frame tents" },
  { href: "/tents/pole-tents", label: "Pole tents" },
  { href: "/tents/gallery", label: "Gallery" },
  { href: "/rental-inventory#inv-tents", label: "Tent inventory" },
] as const;

const steps: readonly { step: string; title: string; body: ReactNode }[] = [
  {
    step: "1",
    title: "Browse",
    body: (
      <>
        Search the live catalog—<strong className="font-semibold text-stone-800">each card</strong> shows warehouse
        stock.
      </>
    ),
  },
  {
    step: "2",
    title: "Save",
    body: (
      <>
        <strong className="font-semibold text-stone-800">Heart</strong> tents, packages, or add-ons. Packages stay{" "}
        <strong className="font-semibold text-stone-800">one line</strong> in your list (same as Pro).
      </>
    ),
  },
  {
    step: "3",
    title: "Send",
    body: (
      <>
        Open <strong className="font-semibold text-stone-800">your wishlist</strong>, set qty and notes,{" "}
        <strong className="font-semibold text-stone-800">submit</strong>. We confirm availability and price for your
        date.
      </>
    ),
  },
];

type Props = {
  publicWebsiteKey: string | undefined;
};

export function WishlistPageContent({ publicWebsiteKey }: Props) {
  const hasKey = Boolean(publicWebsiteKey?.trim());

  return (
    <section className="py-4 sm:py-5">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-stone-200/90 pb-3 text-center sm:pb-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6a2a] sm:text-[11px]">
            Catalog & quotes
          </p>
          <h1 className="mt-1 text-base font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-lg">
            Wishlist
          </h1>
        </header>

        {!hasKey ? (
          <div className="mt-4">
            <GoodshuffleMissingKeyNotice />
            <p className="mt-3 text-xs leading-snug text-stone-600 sm:text-sm sm:leading-relaxed">
              When your Public Browser Key is set, this page shows the live Goodshuffle catalog and the wishlist you use
              to send {business.name} a list for pricing.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3 sm:mt-4">
            <div>
              <div className="overflow-hidden rounded-lg border border-stone-200/90 bg-white shadow-[0_1px_0_rgba(255,255,255,0.88)_inset,0_4px_16px_-12px_rgba(15,23,42,0.07)] ring-1 ring-stone-900/[0.035]">
                <div className="flex flex-col sm:flex-row sm:items-stretch">
                  <div className="flex shrink-0 items-center border-b border-stone-200/80 bg-[linear-gradient(180deg,#faf8f4_0%,#ffffff_100%)] px-2.5 py-1.5 sm:w-[8.5rem] sm:border-b-0 sm:border-r sm:border-stone-200/80 sm:py-2 lg:w-[9rem]">
                    <h2
                      id="catalog-heading"
                      className="text-left text-sm font-semibold leading-tight tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-[0.9375rem]"
                    >
                      Full catalog
                    </h2>
                  </div>
                  <ol
                    className="grid flex-1 grid-cols-3 divide-x divide-stone-200/85"
                    aria-label="How to use the catalog and wishlist"
                  >
                    {steps.map((s) => (
                      <li
                        key={s.step}
                        className="flex flex-col justify-start bg-white px-2 py-1.5 first:pl-2.5 last:pr-2.5 sm:px-2.5 sm:py-2 lg:px-3"
                      >
                        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0">
                          <span className="text-[10px] font-bold tabular-nums text-[#9a7228]">{s.step}</span>
                          <p className="text-[0.8125rem] font-semibold leading-tight tracking-tight text-stone-900 [font-family:var(--font-display)]">
                            {s.title}
                          </p>
                        </div>
                        <p className="mt-1 text-left text-[11px] leading-snug text-stone-600 sm:text-xs sm:leading-snug">
                          {s.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <nav
                aria-label="Tent fleet"
                className="mt-2 rounded-lg border border-[#d4b87a]/75 bg-[linear-gradient(90deg,#fff9eb_0%,#fffdf6_42%,#faf6ee_100%)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] ring-1 ring-[#b8934a]/22 sm:p-2"
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <div className="min-w-0 shrink-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b5420]">Tent fleet</p>
                    <p className="mt-0.5 min-w-0 text-[10px] leading-snug text-stone-600 sm:max-w-[min(100%,20rem)] sm:text-[11px] lg:max-w-none">
                      Sizing &amp; fleet context—then <strong className="font-semibold text-stone-800">shop below</strong>.
                    </p>
                  </div>
                  <ul className="flex min-w-0 flex-1 flex-wrap gap-x-1 gap-y-1 sm:justify-end">
                    {tentFleetLinks.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="inline-flex min-h-[30px] items-center rounded-md border border-[#c9a85c]/55 bg-white/90 px-2 py-0.5 text-[10px] font-medium text-stone-800 shadow-sm transition hover:border-[#a08030]/80 hover:bg-white sm:min-h-[32px] sm:text-[11px]"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>

            <GoodshuffleCatalogGallery
              className="min-h-[min(38vh,17rem)] rounded-xl border border-stone-200/90 bg-white p-2 shadow-[0_12px_36px_-18px_rgba(15,23,42,0.1)] sm:min-h-[min(42vh,19rem)] sm:p-3"
              category={goodshuffleTentCanopyGalleryCategory()}
            />

            <div id="wishlist" className="scroll-mt-24 border-t border-stone-200/90 pt-5">
              <h2 className="text-base font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-lg">
                Your wishlist
              </h2>
              <p className="mt-1 max-w-xl text-xs leading-snug text-stone-600 sm:text-sm sm:leading-relaxed">
                Set quantities and notes, then <strong className="font-semibold text-stone-800">submit</strong>—we use
                your list to price and check dates.
              </p>
              <div className="mt-3">
                <GoodshuffleWishlistView publicWebsiteKey={publicWebsiteKey} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
