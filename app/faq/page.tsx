import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { FAQAccordion } from "@/components/faq-accordion";
import { FAQSchema } from "@/components/schema";
import { createPageMetadata } from "@/lib/metadata";
import { business, faqItems } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Tent Rental FAQ | Sizing, Weather, Surfaces & Booking`,
  description:
    "Connecticut tent rental FAQ: tent sizing and guest capacity, rain backup, delivery windows, pricing, booking steps, hard surfaces vs. lawn staking, backyard and wedding events.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <section className="py-14">
      <FAQSchema />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        <div className="mt-8 text-center sm:text-left">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#a97a21]">
            {business.celebrationTagline}
          </p>
          <p className="mt-2 text-xl font-medium leading-snug tracking-tight text-stone-800 [font-family:var(--font-display)] sm:text-2xl">
            {business.faqPageTagline}
          </p>
        </div>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-stone-900">Frequently asked questions</h1>
        <p className="mt-3 text-stone-600">
          Straight answers on sizing, weather, surfaces, delivery, and booking—whether you are planning a wedding in {business.primaryCity}, a backyard party, or a school or corporate program elsewhere in Connecticut.
        </p>
        <p className="mt-4 text-sm text-stone-600">
          Do not see your question?{" "}
          <Link href="/contact#quote" className="font-semibold text-stone-800 underline underline-offset-2">
            Request a quote
          </Link>{" "}
          and we will respond with specifics for your date and venue.
        </p>
        <div className="mt-8">
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}