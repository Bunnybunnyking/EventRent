import { Suspense } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { QuoteForm } from "@/components/quote-form";
import { SmsTentDetailsCta } from "@/components/sms-tent-details-cta";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Reserve Party Rentals Online | ${business.primaryCity} CT`, description:
    "Reserve party rentals online: tents, tables, chairs, and event gear in Connecticut. Fast follow-up: call or browse the catalog anytime.", path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="border-b border-stone-200/80 bg-[linear-gradient(165deg,#faf8f4_0%,#fffdf9_42%,#f7f5f1_100%)] pb-5 pt-3 sm:pb-6 sm:pt-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-1.5" items={[{ label: "Home", href: "/" }, { label: "Reserve online" }]} />
        <div id="quote" className="scroll-mt-28">
          <div className="mb-5 rounded-2xl border border-[#e3d3b0]/80 bg-gradient-to-br from-[#fffefb] to-[#faf4e8]/90 p-4 shadow-sm sm:p-5 md:hidden">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-900/80">Prefer texting?</p>
            <SmsTentDetailsCta
              location="contact-page"
              compact
              className="mt-3"
              helperText="Send the basics and we'll help you reserve the right tent."
              helperClassName="mt-2 text-[11px] leading-snug text-stone-600 sm:text-xs"
            />
          </div>
          <Suspense
            fallback={
              <div className="min-h-[14rem] rounded-2xl border border-stone-200 bg-white/80 p-4 text-sm text-stone-500 shadow-sm">Loading form…</div>
            }
          >
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}