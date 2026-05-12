import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { GoogleAdsQuoteConversionOnce } from "@/components/google-ads-quote-conversion-once";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

const baseMeta = createPageMetadata({
  title: "Thanks — we received your request",
  description: `Your quote request was sent to ${business.name}. We'll follow up shortly.`,
  path: "/contact/thank-you",
});

export const metadata: Metadata = {
  ...baseMeta,
  robots: { index: false, follow: true },
};

export default function ContactThankYouPage() {
  return (
    <>
      <Suspense fallback={null}>
        <GoogleAdsQuoteConversionOnce />
      </Suspense>
      <section className="border-b border-stone-200/80 bg-[linear-gradient(165deg,#faf8f4_0%,#fffdf9_42%,#f7f5f1_100%)] py-12 sm:py-16">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Quote request</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-3xl">
            Thanks — we received your request
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Our team will follow up soon. If you need to add details, reply to the confirmation email or call{" "}
            <a href={business.phoneHref} className="font-semibold text-stone-900 underline decoration-[#b78a2d]/40 underline-offset-2">
              {business.phone}
            </a>
            .
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50"
            >
              Back to home
            </Link>
            <Link
              href="/rental-inventory"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Browse inventory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
