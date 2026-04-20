import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { TentImagePlaceholder } from "./tent-image-placeholder";
import { TentPlannerCallout } from "./tent-planner-callout";

export function TentPolePage() {
  return (
    <>
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[{ label: "Home", href: "/" }, { label: "Tents", href: "/tents" }, { label: "Pole tents" }]}
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Classic style"
              title="Pole tent rentals"
              intro="Traditional peaks and elegant lines, often best on grass with staking. Plan seating and service around center poles; pair with frame tents when you need clear-span interiors for dance or head tables."
              titleAs="h1"
              align="left"
            />
            <TentImagePlaceholder label="Pole tent, lawn staking, classic peaks" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Frame tent vs pole tent</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-stone-900">Frame tents</h3>
              <p className="mt-2 text-sm text-stone-600">
                Clear-span interiors, no center poles, flexible for rounds, dance floors, and lighting grids on many surfaces with the right anchoring.
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-stone-900">Pole tents</h3>
              <p className="mt-2 text-sm text-stone-600">
                Classic look with center poles, often ideal on grass. Layouts must account for poles in seating plans and photography sightlines.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-stone-600">
            We do not list pole tent size SKUs here until your inventory is confirmed page-by-page, ask during quoting for the classic pole look on suitable lawns.
          </p>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#faf8f5] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center`}>
              Book Now
            </Link>
            <Link href="/tents/frame-tents" className="inline-flex min-h-[48px] items-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-semibold text-stone-900">
              Browse frame sizes
            </Link>
          </div>
          <div className="mt-10">
            <TentPlannerCallout />
          </div>
        </div>
      </section>
    </>
  );
}
