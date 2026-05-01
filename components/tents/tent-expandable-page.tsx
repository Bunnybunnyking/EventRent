import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { tentInventoryCopy } from "@/lib/tent-inventory";
import { TentImagePlaceholder } from "./tent-image-placeholder";
import { TentPlannerCallout } from "./tent-planner-callout";

export function TentExpandablePage() {
  return (
    <>
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[{ label: "Home", href: "/" }, { label: "Tents", href: "/tents" }, { label: "Expandable frame tents" }]}
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Modular systems"
              title="Expandable frame & modular tents"
              intro="Weather-tight modular clear-span systems that scale with gutters and connectors, ideal when your footprint needs to grow or connect instead of starting over with a random box size."
              titleAs="h1"
              align="left"
            />
            <TentImagePlaceholder label="Expandable modular system, site photography" />
          </div>
          <div className="mt-8 rounded-xl border border-stone-200 bg-white p-5 text-sm text-stone-700 shadow-sm">
            <p className="font-semibold text-stone-900">Inventory positioning (not live stock)</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-stone-600">
              <li>20′ expandable tent systems ×{tentInventoryCopy.tents.expandable20ftSystems}</li>
              <li>30′ expandable systems (JT Lite) ×{tentInventoryCopy.tents.expandable30ftJTLite}</li>
            </ul>
            <p className="mt-3 text-xs text-stone-500">
              Fiesta / expandable framing pairs with layout planning, common footprints include 20×40 and 30×45 style runs when bays connect cleanly.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center`}>
              Book Consultation
            </Link>
            <Link href="/tents/frame-tents" className="inline-flex min-h-[48px] items-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-semibold text-stone-900">
              Frame size catalog
            </Link>
            <Link href="/tent-rentals#modular-tent-systems" className="inline-flex min-h-[48px] items-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800">
              Modular systems (classic page)
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Planning rules we use</h2>
          <ul className="mt-4 space-y-3 text-stone-700">
            <li>Start with layout intent: cocktail, seated dinner, ceremony, or dinner plus dance.</li>
            <li>Right-size common footprints before jumping to oversized boxes.</li>
            <li>Use add-on tents strategically, DJ, bar, prep, so the main tent breathes.</li>
            <li>Use marquee sections when you need connectors instead of stealing square footage from dinner.</li>
          </ul>
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
