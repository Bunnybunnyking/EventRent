import { Breadcrumb } from "@/components/breadcrumb";
import { QuoteForm } from "@/components/quote-form";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Request a Quote | Tent & Event Rentals ${business.primaryCity} CT`,
  description:
    "Request a Connecticut tent rental quote: weddings, parties, graduations, corporate events. Fast response, clear setup planning, no-pressure consultation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a97a21]">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900">Request a quote for your Connecticut event</h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            Share a few details and we will reply with clear recommendations and next steps. Call <a href={business.phoneHref} className="font-semibold underline">{business.phone}</a> for immediate help.
          </p>
        </div>
        <div id="quote" className="scroll-mt-28">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}