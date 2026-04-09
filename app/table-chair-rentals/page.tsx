import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection, SectionHeading } from "@/components/sections";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Table and Chair Rentals ${business.primaryCity} CT`,
  description: "Table and chair rentals in Connecticut for weddings, private events, graduations, and corporate functions with delivery and setup options.",
  path: "/table-chair-rentals",
});

export default function TableChairPage() {
  return (
    <>
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tables & Chairs" }]} />
          <SectionHeading
            eyebrow="Table & Chair Rentals"
            title={`Table and chair rentals in ${business.primaryCity} for polished event flow`}
            intro="We provide event-ready inventory for ceremony seating, guest dining, cocktail spaces, and registration zones across Connecticut."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Round and banquet tables", "Cocktail and buffet tables", "Ceremony chair layouts", "Reception dining seating", "Clean, inspected inventory", "Delivery coordination with your timeline"].map(
              (item) => (
                <div key={item} className="rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-700">
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}