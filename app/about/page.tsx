import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection, SectionHeading } from "@/components/sections";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `About Our Connecticut Tent Rental Team`,
  description: "Learn about our local event rental team, equipment standards, communication process, and dependable Connecticut setup service.",
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
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Clean, maintained equipment prepared for every delivery",
              "Professional crews trained for safe and organized setup",
              "Clear communication from quote to pickup",
              "Service-first planning support for layout and weather",
              "Dependable scheduling that respects venue timing",
              "Proudly serving Connecticut events with local experience",
            ].map((item) => (
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