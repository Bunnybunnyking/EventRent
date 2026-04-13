import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { tentInventoryCopy } from "@/lib/tent-inventory";
import { TentImagePlaceholder } from "./tent-image-placeholder";
import { TentPlannerCallout } from "./tent-planner-callout";

export function TentMarqueePage() {
  return (
    <>
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[{ label: "Home", href: "/" }, { label: "Tents", href: "/tents" }, { label: "Marquee walkways" }]}
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Flow & weather"
              title="Marquee tents & walkways"
              intro="Use marquee sections for entries, tent-to-building transitions, rain-protected guest routes, hospitality flow, and L-shape connections, without stealing your main reception footprint."
              titleAs="h1"
              align="left"
            />
            <TentImagePlaceholder label="Marquee walkway, entry or connector" />
          </div>
          <div className="mt-8 rounded-xl border border-stone-200 bg-white p-5 text-sm shadow-sm">
            <p className="font-semibold text-stone-900">Inventory positioning</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-stone-600">
              <li>~{tentInventoryCopy.tents.marqueeTotalLinearFt} linear feet marquee inventory (total)</li>
              <li>40′ ends ×{tentInventoryCopy.tents.marquee40Ends}, mids ×{tentInventoryCopy.tents.marquee40Mids}</li>
              <li>30′ ends ×{tentInventoryCopy.tents.marquee30Ends}, mids ×{tentInventoryCopy.tents.marquee30Mids}</li>
            </ul>
          </div>
          <Link href="/contact#quote" className={`${bookNowSectionClass} mt-6 inline-flex justify-center text-center`}>
            Plan walkway flow
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Where marquees win</h2>
          <ul className="mt-4 space-y-3 text-stone-700">
            <li>Long entry lines and queue control</li>
            <li>Tent-to-building or tent-to-tent connectors</li>
            <li>Rain-protected routes from parking to reception</li>
            <li>Hospitality flow between cocktail and dinner zones</li>
            <li>L-shape connections when the site demands turns</li>
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
