import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection, SectionHeading } from "@/components/sections";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `About Our Connecticut Tent Rental Team`,
  description:
    "Family-run Connecticut tent & event rentals since 1974 (roots in 1946); incorporated as a closely held family company in 1994. Equipment standards, communication, and dependable setup statewide.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <SectionHeading
            eyebrow="About Us"
            title={`A local ${business.primaryCity} event rental team focused on reliability`}
            intro="We combine high presentation standards with straightforward communication so hosts can focus on guests instead of logistics."
          />
          <div className="mt-8 rounded-2xl border border-stone-200/90 bg-[#faf8f4] p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8a6d3a]">Our story</h2>
            <p className="mt-3 text-base leading-relaxed text-stone-800">{business.familyHistoryShort}</p>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              Today we continue as {business.ownership.toLowerCase()}—{business.celebrationTagline}
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Clean, maintained equipment prepared for every delivery", "Professional crews trained for safe and organized setup", "Clear communication from quote to pickup", "Service-first planning support for layout and weather", "Dependable scheduling that respects venue timing", "Proudly serving Connecticut events with local experience", ].map((item) => (
              <p key={item} className="rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-700">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}