import { Suspense } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { QuoteForm } from "@/components/quote-form";
import { SmsTentDetailsCta } from "@/components/sms-tent-details-cta";
import { createPageMetadata } from "@/lib/metadata";
import { business, services } from "@/lib/site-data";

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

        <div className="mt-12 border-t border-stone-200/90 pt-10 pb-14">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">What we offer & how to reach us</h2>
          <p className="mt-3 max-w-3xl text-sm text-stone-600 sm:text-base">
            {business.name} is {business.ownership.toLowerCase()} since {business.establishedYear}. We rent outdoor event equipment across{" "}
            {business.serviceArea.toLowerCase()}, including tents from {business.tentSizeRange}, tables and chairs, lighting, and add-ons—delivered and installed by our crew.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8b6914]">Rentals & services</h3>
              <ul className="mt-4 space-y-4">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="group block rounded-lg border border-stone-200 bg-white/80 p-4 shadow-sm transition hover:border-[#c9a227]/80 hover:shadow">
                      <span className="font-semibold text-stone-900 group-hover:text-[#6b5210]">{s.title}</span>
                      <p className="mt-1 text-sm text-stone-600">{s.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-stone-600">
                Service area:{" "}
                <Link href="/service-areas" className="font-medium text-[#8b6914] underline decoration-[#c9a227]/50 underline-offset-2 hover:text-stone-900">
                  Connecticut towns we serve
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8b6914]">Contact & location</h3>
              <dl className="mt-4 space-y-4 rounded-xl border border-stone-200 bg-white/90 p-5 shadow-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Address</dt>
                  <dd className="mt-1 text-sm text-stone-800">
                    {business.name}
                    <br />
                    {business.address}
                    <br />
                    {business.primaryCity}, {business.state} {business.postalCode}
                    <br />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.address}, ${business.primaryCity}, ${business.state} ${business.postalCode}`)}`}
                      className="mt-2 inline-block text-sm font-medium text-[#8b6914] underline decoration-[#c9a227]/50 underline-offset-2 hover:text-stone-900"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${business.email}`} className="text-sm font-semibold text-stone-900 underline decoration-stone-300 underline-offset-2 hover:text-[#6b5210]">
                      {business.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Phone</dt>
                  <dd className="mt-1">
                    <a href={business.phoneHref} className="text-sm font-semibold text-stone-900 underline decoration-stone-300 underline-offset-2 hover:text-[#6b5210]">
                      {business.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Text</dt>
                  <dd className="mt-1">
                    <a href={business.smsHref} className="text-sm font-semibold text-stone-900 underline decoration-stone-300 underline-offset-2 hover:text-[#6b5210]">
                      Send a text to {business.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Website</dt>
                  <dd className="mt-1 break-all text-sm">
                    <a href={business.websiteUrl} className="font-semibold text-stone-900 underline decoration-stone-300 underline-offset-2 hover:text-[#6b5210]">
                      {business.websiteUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}