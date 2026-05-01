import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/sections";
import { GoodshuffleRuntime } from "@/components/goodshuffle-runtime";
import { TableChairStockSection } from "@/components/table-chair-stock-section";
import { browseInventoryHeaderClass } from "@/lib/cta-styles";
import { goodshufflePublicWebsiteKey, isGoodshuffleEnabled } from "@/lib/goodshuffle-env";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: `Table and Chair Rentals ${business.primaryCity} CT`,
  description:
    "Table and chair rentals in Connecticut for weddings, private events, graduations, and corporate functions with delivery and setup options.",
  path: "/table-chair-rentals",
  ogImage: "/images/white-folding-chair-outdoor-event-ct.jpg",
});

/** Hero: dedicated chair + lawn reception context. */
const heroImageSrc = "/images/white-folding-chair-outdoor-event-ct.jpg";
const heroImageAlt =
  "White folding chair on a Connecticut lawn with round guest tables, white chairs, and warm string lights for an outdoor evening reception.";

export default function TableChairPage() {
  const goodshuffleKey = goodshufflePublicWebsiteKey()?.trim();
  const showLiveCatalog = isGoodshuffleEnabled() && Boolean(goodshuffleKey);

  const inner = (
    <>
      <section
        className="relative isolate overflow-hidden bg-[#0c0b09] md:min-h-[min(90vh,960px)]"
        aria-label="Tables and chairs rentals"
      >
        {/* Right column: larger crop, focal point on tent interior / seated room */}
        <div className="relative h-[min(46vh,420px)] w-full md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[min(64vw,980px)] md:min-h-[min(90vh,960px)]">
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 65vw"
            className="object-cover object-[55%_38%] sm:object-[50%_40%] md:object-[42%_45%]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0c0b09] via-[#0c0b09]/55 to-transparent md:from-[#0c0b09]/90 md:via-[#0c0b09]/25 md:to-transparent"
            aria-hidden
          />
        </div>

        <div className="absolute right-3 top-3 z-30 sm:right-5 sm:top-5 md:right-5 md:top-5 lg:right-8 lg:top-6">
          <Link
            href="/rental-inventory"
            className={`${browseInventoryHeaderClass} min-h-[44px] px-3 sm:min-h-0 sm:px-4`}
            title="Browse full rental inventory"
          >
            <span className="relative z-10">Browse inventory</span>
          </Link>
        </div>

        {/* Left: copy on glass; anchored high and left so the tent stays visible */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-3 pb-10 pt-5 sm:px-4 md:mx-0 md:flex md:min-h-[min(90vh,960px)] md:max-w-none md:flex-col md:justify-start md:px-4 md:pb-12 md:pt-8 md:pr-[min(48vw,32rem)] lg:px-5 lg:pt-10 xl:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8 xl:gap-9">
            <header className="max-w-[21.5rem] shrink-0 rounded-2xl border border-white/[0.1] bg-black/42 p-5 shadow-[0_20px_48px_rgba(0,0,0,0.32)] backdrop-blur-md sm:max-w-[22.5rem] sm:p-5 md:bg-black/38 md:p-6 lg:max-w-[23rem]">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#d4a84b]">Table and chair rentals</p>
              <h1 className="mt-1.5 text-balance text-2xl font-semibold leading-tight tracking-tight text-stone-50 sm:text-[1.65rem] md:text-[1.7rem]">
                Tables and chair rentals in Connecticut
              </h1>
              <p className="mt-3 text-sm font-medium leading-relaxed text-[#ebe4d4] sm:text-[0.9375rem]">
                Hartford County&apos;s largest supplier of tables and chairs. Layout planning keeps guest flow polished from setup through the last chair.
              </p>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-stone-300/95 sm:text-sm">
                We map sight lines, service aisles, and seating zones. Registration, dinner, and dance stay intentional.
              </p>
              <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-stone-300/95 sm:text-sm">
                <span className="font-medium text-stone-200">We prefer seated occasions:</span> seated dinners, awards programs, and celebrations where every place setting feels calm and clear.
              </p>
            </header>
            <aside
              aria-label="Planning and fulfillment details"
              className="max-w-xl border-t border-white/12 pt-5 text-[0.8125rem] leading-relaxed text-stone-300/95 sm:text-sm lg:max-w-[13.5rem] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-1 xl:max-w-[15rem]"
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#c9a24a]">With your order</p>
              <ul className="mt-2.5 list-none space-y-2.5 text-stone-200/90">
                <li>Linens, chargers, and place settings aligned to your table map.</li>
                <li>Delivery and pickup coordinated with your venue, tent partner, and caterer.</li>
                <li>Inventory inspected and staged for your diagram on site.</li>
              </ul>
            </aside>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 bg-gradient-to-t from-[#faf9f7] to-transparent sm:h-20 md:h-24"
          aria-hidden
        />
      </section>

      <section className="border-b border-stone-200 bg-[#faf9f7] py-9 sm:py-10" aria-labelledby="round-tables-example">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-10 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-100 shadow-sm">
            <Image
              src="/images/60-inch-round-wood-table-outdoor-event-ct.jpg"
              alt="60-inch wood-grain round guest table on a lawn with a small centerpiece, set for an outdoor evening event in Connecticut"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-[center_40%]"
            />
          </div>
          <div>
            <h2 id="round-tables-example" className="text-xl font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-2xl">
              60-inch rounds for seated programs
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
              Standard guest rounds map cleanly to place settings, service aisles, and speeches. We align counts to your diagram so arrival and dinner stay calm.
            </p>
          </div>
        </div>
      </section>

      <TableChairStockSection showLiveCatalog={showLiveCatalog} />
      <CTASection />
    </>
  );

  if (showLiveCatalog && goodshuffleKey) {
    return <GoodshuffleRuntime dataUrl={goodshuffleVendorDataUrl(goodshuffleKey)}>{inner}</GoodshuffleRuntime>;
  }
  return inner;
}
