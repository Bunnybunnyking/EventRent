import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SectionHeading } from "@/components/sections";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { frameTentPages } from "@/lib/tent-frame-pages";
import { TentImagePlaceholder } from "./tent-image-placeholder";
import { TentPlannerCallout } from "./tent-planner-callout";

export function TentFrameFamilyPage() {
  const sizes = Object.values(frameTentPages).sort((a, b) => a.sqft - b.sqft);

  return (
    <>
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[{ label: "Home", href: "/" }, { label: "Tents", href: "/tents" }, { label: "Frame tents" }]}
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Frame tents"
                title="Clear-span frame tent rentals"
                intro="No center poles inside the bay, excellent for rounds, head tables, lighting, dance floors, and sidewalls that match your timeline. Right-size from layout, not guest count alone."
                titleAs="h1"
                align="left"
              />
              <ul className="mt-6 space-y-2 text-sm text-stone-700">
                <li className="flex gap-2">
                  <span className="text-[#b8860b]">✓</span>
                  Flexible seating and dance configurations
                </li>
                <li className="flex gap-2">
                  <span className="text-[#b8860b]">✓</span>
                  Works on many surfaces with proper anchoring
                </li>
                <li className="flex gap-2">
                  <span className="text-[#b8860b]">✓</span>
                  Pairs with lighting, flooring, and decor
                </li>
              </ul>
            </div>
            <TentImagePlaceholder label="Frame tent family, photo rail" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center`}>
              Get a quote
            </Link>
            <Link
              href="/tent-rentals"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-semibold text-stone-900"
            >
              Original tent rentals hub
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-stone-900">Frame sizes</h2>
          <p className="mt-2 text-sm text-stone-600">Guest ranges are estimates, layout always wins.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sizes.map((s) => (
              <Link
                key={s.slug}
                href={`/tents/frame-tents/${s.slug}`}
                className="flex flex-col rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#b78a2d]/45"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">{s.sizeLabel}</p>
                <p className="text-xs text-stone-500">{s.sqft.toLocaleString()} sq ft</p>
                <p className="mt-2 flex-1 text-sm text-stone-600 line-clamp-3">{s.heroSubhead}</p>
                <span className="mt-3 text-sm font-semibold text-[#8a6d3a]">View details →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#faf8f5] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TentPlannerCallout />
          <p className="mt-8 text-center text-sm text-stone-600">
            <Link href="/wedding-tent-rentals" className="font-semibold underline underline-offset-2">
              Wedding tent rentals
            </Link>
            {" · "}
            <Link href="/corporate-event-rentals" className="font-semibold underline underline-offset-2">
              Corporate
            </Link>
            {" · "}
            <Link href="/planning" className="font-semibold underline underline-offset-2">
              Planning hub
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
