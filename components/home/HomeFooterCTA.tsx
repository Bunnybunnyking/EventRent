import Link from "next/link";
import { business } from "@/lib/site-data";
import { bookNowHeaderClass } from "@/lib/cta-styles";

const secondaryOutline =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-8 py-3 text-base font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2";

export function HomeFooterCTA() {
  return (
    <section className="border-t border-stone-200 bg-[#111315] py-10 text-stone-100 sm:py-8 lg:py-9" aria-labelledby="home-footer-cta-heading">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
        <h2 id="home-footer-cta-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Talk to an Event Concierge
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-stone-300 sm:text-base">
          We&apos;ll help you pick the right setup and confirm the details.
        </p>

        {/* Desktop: paired buttons */}
        <div className="mt-8 hidden flex-col items-center justify-center gap-3 md:flex md:flex-row md:gap-4">
          <a
            href={business.phoneHref}
            className={`${bookNowHeaderClass} min-h-[44px] px-7 sm:min-h-[46px]`}
            aria-label="Call Event Concierge"
          >
            Call Event Concierge
          </a>
          <Link href="/rental-inventory" className={secondaryOutline} prefetch={true}>
            See what we offer
          </Link>
        </div>

        {/* Mobile: text-first — sticky bar holds Call + Build Event List */}
        <div className="mt-8 space-y-3 text-sm leading-relaxed text-stone-400 md:hidden">
          <p>
            <a href={business.phoneHref} className="font-semibold text-[#edc16c] underline underline-offset-2 hover:text-white">
              Call us
            </a>
          </p>
          <p>
            <Link href="/rental-inventory" className="font-medium text-stone-400 underline underline-offset-2 hover:text-white" prefetch={true}>
              Browse rental inventory
            </Link>
          </p>
          <p>
            <Link href="/contact#quote" className="font-medium text-stone-500 underline underline-offset-2 hover:text-stone-300">
              Request a consultation
            </Link>
          </p>
        </div>

        <p className="mt-8 text-sm text-stone-500 md:mt-8">
          <Link href="/service-areas" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
            Service areas
          </Link>
          <span className="text-stone-600"> · </span>
          <Link href="/sitemap" className="font-medium text-stone-400 underline underline-offset-2 hover:text-white">
            Site map
          </Link>
          <span className="hidden text-stone-600 md:inline"> · </span>
          <Link
            href="/contact#quote"
            className="hidden font-medium text-stone-300 underline underline-offset-2 hover:text-white md:inline"
          >
            Book Consultation
          </Link>
        </p>
      </div>
    </section>
  );
}
