import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection, SectionHeading } from "@/components/sections";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Corporate Event Rentals ${business.primaryCity} CT`,
  description: "Corporate event rentals in Connecticut for company events, schools, nonprofits, and municipal programs with professional scheduling and setup.",
  path: "/corporate-event-rentals",
});

export default function CorporatePage() {
  return (
    <>
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Corporate Event Rentals" }]} />
          <SectionHeading
            eyebrow="Corporate & Community"
            title="Organized event rentals for teams, schools, and public programs"
            intro="From company picnics to school events and municipal festivals, we focus on clean setup execution, clear schedules, and dependable communication."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Company celebrations and team events",
              "School functions and graduation ceremonies",
              "Nonprofit fundraising events",
              "Municipal and community festivals",
              "Professional timing and logistics alignment",
              "Presentation quality that supports your brand",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-700">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-stone-600">
            For tent sizing, site readiness, and weather-aware layouts, start with our{" "}
            <Link href="/planning" className="font-semibold text-stone-800 underline underline-offset-2">
              Planning hub
            </Link>
            . Planning a specific format? Our{" "}
            <Link href="/events/community-school-town" className="font-semibold text-stone-800 underline underline-offset-2">
              community &amp; school
            </Link>
            ,{" "}
            <Link href="/events/festivals-fairs" className="font-semibold text-stone-800 underline underline-offset-2">
              festival
            </Link>
            , and{" "}
            <Link href="/events/fundraisers-galas" className="font-semibold text-stone-800 underline underline-offset-2">
              fundraiser &amp; gala
            </Link>{" "}
            guides walk through layout, weather backup, and crowd flow—without adding noise to your main navigation.
          </p>
        </div>
      </section>
      <CTASection showPrimaryCta={false} />
    </>
  );
}