import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { largeEventTentPages } from "@/lib/tent-large-pages";
import { TentImagePlaceholder } from "./tent-image-placeholder";
import { TentPlannerCallout } from "./tent-planner-callout";

export function TentLargeFamilyPage() {
  const items = Object.values(largeEventTentPages);

  return (
    <>
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[{ label: "Home", href: "/" }, { label: "Tents", href: "/tents" }, { label: "Large event structures" }]}
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Large clear-span"
              title="Large event structures"
              intro="When receptions, galas, and community programs need serious square footage, large clear-span structures support stage, dance, and seated zones, planned with site access, safety, and egress in mind."
              titleAs="h1"
              align="left"
            />
            <TentImagePlaceholder label="Large clear-span structure, hero image" />
          </div>
          <Link href="/contact#quote" className={`${bookNowSectionClass} mt-8 inline-flex justify-center text-center`}>
            Book Consultation
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Structures</h2>
          <p className="mt-2 text-sm text-stone-600">Capacity is always layout- and code-dependent.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {items.map((s) => (
              <Link
                key={s.slug}
                href={`/tents/large-event-structures/${s.slug}`}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#b78a2d]/45"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{s.sizeLabel}</p>
                <p className="text-xs text-stone-500">{s.sqft.toLocaleString()} sq ft</p>
                <p className="mt-2 text-sm text-stone-600 line-clamp-3">{s.heroSubhead}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-[#8a6d3a]">Details →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#faf8f5] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TentPlannerCallout />
        </div>
      </section>
    </>
  );
}
