import Link from "next/link";
import { CtaActionPair } from "@/components/cta-action-pair";
import { ctaBandDarkClass } from "@/lib/cta-styles";

export function HomeFooterCTA() {
  return (
    <section className={ctaBandDarkClass} aria-labelledby="home-footer-cta-heading">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 id="home-footer-cta-heading" className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          Talk to an Event Concierge
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-stone-300 sm:text-base">
          We&apos;ll help you pick the right setup and confirm the details.
        </p>

        <div className="mt-6">
          <CtaActionPair
            order="call-first"
            secondaryAction={{ href: "/rental-inventory", label: "See what we offer" }}
          />
        </div>

        <p className="mt-6 text-sm text-stone-500">
          <Link href="/service-areas" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
            Service areas
          </Link>
          <span className="text-stone-600"> · </span>
          <Link href="/sitemap" className="font-medium text-stone-400 underline underline-offset-2 hover:text-white">
            Site map
          </Link>
          <span className="text-stone-600"> · </span>
          <Link href="/contact#quote" className="font-medium text-stone-300 underline underline-offset-2 hover:text-white">
            Book Consultation
          </Link>
        </p>
      </div>
    </section>
  );
}
