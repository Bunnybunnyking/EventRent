import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { CTASection } from "@/components/sections";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import { ServiceSchema } from "@/components/schema";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Wedding Tent Rentals CT | Outdoor Reception Tents | ${business.primaryCity}`,
  description:
    "Wedding tent rentals in Connecticut: sailcloth and frame tents, coordinated layouts, lighting, sidewalls, and weather planning for outdoor receptions. Table and chair coordination available.",
  path: "/wedding-tent-rentals",
  ogImage: "/images/wedding-tent-hero.png",
});

export default function WeddingTentPage() {
  return (
    <>
      <ServiceSchema
        name="Wedding tent rentals in Connecticut"
        description="Wedding tent rentals with sailcloth and frame options, lighting, sidewalls, and layout planning for outdoor Connecticut receptions."
        path="/wedding-tent-rentals"
      />
      <section className="relative isolate min-h-[min(72vh,720px)] overflow-hidden bg-[#15181b]">
        <Image
          src="/images/wedding-tent-hero.png"
          alt="Elegant white frame tent wedding reception with round tables, white linens, and garden chairs in a Connecticut outdoor venue"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15181b] via-black/45 to-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[min(72vh,720px)] max-w-5xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:pb-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#edc16c]">Wedding Tent Rentals</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Elevated wedding tent rentals in {business.primaryCity} and across Connecticut
          </h1>
          <p className="mt-5 max-w-2xl text-base text-stone-200">
            Create a polished ceremony and reception experience with clean tent lines, thoughtful lighting, and weather-ready planning from a family-owned Connecticut team serving couples since{" "}
            {business.establishedYear}.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/contact#quote" className={bookNowSectionClass}>
              Book Now
            </Link>
            <a href={business.phoneHref} className={callNowSectionClass}>
              Call Now
            </a>
            <Link
              href="/tents/gallery"
              className="rounded-full border border-stone-500/80 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              View gallery
            </Link>
          </div>
          <p className="mt-3 text-xs text-stone-400">Outdoor reception inspiration — layout and inventory tailored to your guest count and venue.</p>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wedding Tent Rentals" }]} />
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Planning that matches your vision</h2>
          <p className="mt-3 max-w-2xl text-stone-600">
            From table spacing to rain backup, we help you plan with confidence so your wedding day looks and feels intentional. For footprint, seating style, and weather-ready layouts, see our{" "}
            <Link href="/planning" className="font-medium text-stone-800 underline underline-offset-2">
              planning hub
            </Link>
            . For receptions that need separate dining, dance, and cocktail zones, many{" "}
            <Link href="/tent-rentals#modular-tent-systems" className="font-medium text-stone-800 underline underline-offset-2">
              frame tent layouts can connect
            </Link>{" "}
            for a single cohesive space—ask us how during planning.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="text-lg font-semibold">Designed for elegant guest experience</h3>
              <p className="mt-2 text-sm text-stone-600">
                We help map dining, dance floor, bar, and service pathways so the layout feels open, intentional, and beautiful in photos.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="text-lg font-semibold">Rain confidence without compromises</h3>
              <p className="mt-2 text-sm text-stone-600">
                Sidewalls, anchoring strategy, and contingency planning are discussed in advance so your wedding stays comfortable and organized. Read more{" "}
                <Link href="/faq#faq-rain-plan" className="font-medium text-stone-800 underline underline-offset-2">
                  rain backup for tents
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#faf8f5] py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">From quote to reception: how we work with couples</h2>
          <ol className="mt-6 space-y-4 text-sm text-stone-700">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d2124] text-xs font-semibold text-white">
                1
              </span>
              <span>
                <strong className="text-stone-900">Share your date, venue town, and guest count.</strong> We confirm feasibility and suggest tent styles that fit your space and tone.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d2124] text-xs font-semibold text-white">
                2
              </span>
              <span>
                <strong className="text-stone-900">Review layout and inventory together.</strong> We coordinate with{" "}
                <Link href="/tent-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                  tent options
                </Link>
                ,{" "}
                <Link href="/table-chair-rentals" className="font-medium text-stone-800 underline underline-offset-2">
                  tables and chairs
                </Link>
                , and lighting so the plan matches your timeline.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d2124] text-xs font-semibold text-white">
                3
              </span>
              <span>
                <strong className="text-stone-900">Lock in delivery and setup windows.</strong> You stay informed before event day; our crew handles installation and teardown. Questions? See{" "}
                <Link href="/faq#faq-tent-size" className="font-medium text-stone-800 underline underline-offset-2">
                  tent sizing
                </Link>{" "}
                or{" "}
                <Link href="/contact#quote" className="font-medium text-stone-800 underline underline-offset-2">
                  request a quote
                </Link>
                .
              </span>
            </li>
          </ol>
        </div>
      </section>

      <CTASection showPrimaryCta={false} />
    </>
  );
}
