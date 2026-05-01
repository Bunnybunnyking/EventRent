import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { GoodshuffleCatalogGallery } from "@/components/goodshuffle-catalog-gallery";
import { QuickSizeReferenceButton } from "@/components/tent-seating-reference/quick-size-reference-button";
import { GoodshuffleMissingKeyNotice } from "@/components/goodshuffle-runtime";
import { goodshuffleTableChairGalleryCategory } from "@/lib/goodshuffle-env";
import { business } from "@/lib/site-data";

type CategoryCard = {
  title: string;
  description: string;
  /** Deep link on `/rental-inventory` when helpful */
  href: string;
  /** Optional hook for Goodshuffle filters or embeds (see `goodshuffle-catalog-ids.ts`) */
  dataCtpCategory?: string;
};

const featuredCategories: CategoryCard[] = [
  {
    title: "Round tables",
    description:
      "Guest dining, assigned seating, weddings, showers, banquets, and formal layouts. Standard 60 in and 72 in rounds plus smaller accent sizes.",
    href: "/rental-inventory#inv-tables",
    dataCtpCategory: "round-tables",
  },
  {
    title: "Banquet tables",
    description:
      "Buffet lines, bar service, vendor stations, head tables, check in, and long dining rows. 6 ft and 8 ft rectangles.",
    href: "/rental-inventory#inv-tables",
    dataCtpCategory: "banquet-tables",
  },
  {
    title: "Cocktail tables",
    description:
      "Cocktail hours, networking, lounges, bars, and standing reception zones. High tops sized for two to three guests.",
    href: "/rental-inventory#inv-tables",
    dataCtpCategory: "cocktail-tables",
  },
  {
    title: "Chairs",
    description:
      "Ceremony rows, dining layouts, cocktail seating, graduations, corporate events, and backyard parties. Plastic, padded, and specialty finishes.",
    href: "/rental-inventory#inv-chairs",
    dataCtpCategory: "chairs",
  },
  {
    title: "Buffet and service tables",
    description:
      "Food service, gifts, desserts, beverages, registration, DJ support, and back of house. Sized for flow, not guesswork.",
    href: "/rental-inventory#inv-tables",
    dataCtpCategory: "service-tables",
  },
  {
    title: "Layout support",
    description:
      "Guest count, event type, and site details drive what we recommend. We match inventory to your floor plan, delivery timing, and setup crew.",
    href: "/rental-inventory#inv-planning",
    dataCtpCategory: "layout-support",
  },
];

type StockTableProps = { showLiveCatalog: boolean };

/**
 * Tables and chairs marketing block: Goodshuffle catalog slot, category cards with
 * `data-ctp-goodshuffle-category` hooks, and internal quantity reference tables.
 */
export function TableChairStockSection({ showLiveCatalog }: StockTableProps) {
  return (
    <section
      id="tables-chairs-stock"
      className="border-t border-stone-200/80 bg-[#faf9f7] py-10 sm:py-14"
      aria-labelledby="tables-chairs-stock-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tables & Chairs" }]} className="mb-0" />
        <div className="mt-4">
          <QuickSizeReferenceButton variant="outlineLight" />
        </div>
        <h2
          id="tables-chairs-stock-heading"
          className="mt-6 text-pretty text-2xl font-semibold tracking-tight text-stone-900 sm:text-[1.65rem]"
        >
          What we stock for tables and chair layouts
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
          Browse real inventory in our{" "}
          <Link href="/wishlist" className="font-medium text-[#8a6418] underline decoration-[#c9a24a]/60 underline-offset-2 hover:text-[#5c4310]">
            Goodshuffle catalog
          </Link>
          . Build your setup by category, add lines to your{" "}
          <Link href="/wishlist" className="font-medium text-[#8a6418] underline decoration-[#c9a24a]/60 underline-offset-2 hover:text-[#5c4310]">
            wishlist
          </Link>
          , and submit for a faster quote. Prefer the grid view first?{" "}
          <Link href="/rental-inventory" className="font-medium text-[#8a6418] underline decoration-[#c9a24a]/60 underline-offset-2 hover:text-[#5c4310]">
            Rental inventory
          </Link>{" "}
          lists the same stock with planning notes.
        </p>

        <div
          id="table-chair-goodshuffle-catalog"
          className="mt-8 scroll-mt-24"
          data-ctp-goodshuffle-slot="table-chair-catalog"
        >
          {showLiveCatalog ? (
            <GoodshuffleCatalogGallery
              className="min-h-[min(42vh,20rem)] rounded-xl border border-stone-200/90 bg-white p-2 shadow-[0_12px_36px_-18px_rgba(15,23,42,0.1)] sm:min-h-[min(48vh,24rem)] sm:p-3"
              category={goodshuffleTableChairGalleryCategory()}
              showSearch={false}
              showFilters={false}
              showCategories
            />
          ) : (
            <div className="rounded-xl border border-stone-200 bg-white p-1 shadow-sm">
              <GoodshuffleMissingKeyNotice compact />
              <p className="border-t border-stone-100 px-4 py-3 text-center text-xs text-stone-500 sm:text-sm">
                When your public key is set, the live gallery loads here so guests can heart packages from this page.
              </p>
            </div>
          )}
        </div>

        <h3 className="mt-12 text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">Featured inventory categories</h3>
        <p className="mt-2 max-w-3xl text-sm text-stone-600">
          Each card links to the matching area on rental inventory. Use{" "}
          <code className="rounded bg-stone-100 px-1 py-0.5 text-xs text-stone-800">data-ctp-goodshuffle-category</code>{" "}
          for future Goodshuffle filters or embed hooks.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {featuredCategories.map((cat) => (
            <li key={cat.title}>
              <Link
                href={cat.href}
                data-ctp-goodshuffle-category={cat.dataCtpCategory}
                className="group flex h-full flex-col rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm transition hover:border-[#c9a24a]/55 hover:shadow-md"
              >
                <span className="text-base font-semibold text-stone-900 group-hover:text-[#6b4e16]">{cat.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-stone-600">{cat.description}</span>
                <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#a97a21]">View inventory</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-stone-900">Layout support</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Share guest count, event type, and site constraints. We align tables and chairs with your timeline and crew
            plan. Family owned and operated since {business.establishedYear}.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-stone-500">
            Internal reference for tent types, heating, lighting, and common planning notes. Quantities are typical
            warehouse levels and move with bookings. Availability is always confirmed for your date.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[32rem] w-full border-collapse text-left text-sm">
              <caption className="border-b border-stone-100 bg-stone-50 px-4 py-3 text-left text-sm font-semibold text-stone-900">
                Seating inventory
                <span className="mt-1 block text-xs font-normal text-stone-500">
                  Typical warehouse quantities; confirm availability for your event date.
                </span>
              </caption>
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/80 text-xs font-semibold uppercase tracking-wide text-stone-600">
                  <th className="px-4 py-2.5">Item</th>
                  <th className="px-4 py-2.5 whitespace-nowrap">Quantity</th>
                  <th className="px-4 py-2.5">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                <tr>
                  <td className="px-4 py-2.5">Beige plastic folding chairs</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">6,000</td>
                  <td className="px-4 py-2.5 text-stone-600">Standard beige plastic folding</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">White padded chairs</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">300</td>
                  <td className="px-4 py-2.5 text-stone-600">Upgraded seating, popular for weddings</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">White on white folding chairs</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">200</td>
                  <td className="px-4 py-2.5 text-stone-600">White frame and white seat</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Cream folding chairs</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">500</td>
                  <td className="px-4 py-2.5 text-stone-600">Neutral upgraded folding</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Black folding chairs</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">200</td>
                  <td className="px-4 py-2.5 text-stone-600">Formal and corporate palettes</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
            <table className="min-w-[36rem] w-full border-collapse text-left text-sm">
              <caption className="border-b border-stone-100 bg-stone-50 px-4 py-3 text-left text-sm font-semibold text-stone-900">
                Table inventory
              </caption>
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/80 text-xs font-semibold uppercase tracking-wide text-stone-600">
                  <th className="px-4 py-2.5">Table type</th>
                  <th className="px-4 py-2.5">Size</th>
                  <th className="px-4 py-2.5">Typical seats or use</th>
                  <th className="px-4 py-2.5 whitespace-nowrap">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                <tr>
                  <td className="px-4 py-2.5">Banquet table, rectangular</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">8 ft by 30 in</td>
                  <td className="px-4 py-2.5 text-stone-600">Buffet, cake, gifts. Up to 8 seated, 10 max</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">170</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Banquet table, rectangular</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">6 ft by 30 in</td>
                  <td className="px-4 py-2.5 text-stone-600">Buffet, cake, gifts. Up to 6 seated, 8 max</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">140</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Round table</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">60 in (5 ft)</td>
                  <td className="px-4 py-2.5 text-stone-600">Seated wedding and assigned seating, 6 to 8 guests</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">150</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Round table</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">72 in</td>
                  <td className="px-4 py-2.5 text-stone-600">Larger guest counts, 9 to 11 seats</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">29</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Round table</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">48 in</td>
                  <td className="px-4 py-2.5 text-stone-600">Compact dining, 4 to 6 guests</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">30</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Round table</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">36 in</td>
                  <td className="px-4 py-2.5 text-stone-600">Cafe accent, 2 to 4 guests</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">32</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">High top, cocktail</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">30 in diameter</td>
                  <td className="px-4 py-2.5 text-stone-600">Standing cocktail zones, 2 to 3 guests</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">35</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5">Serpentine, curved buffet</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">30 in deep sections</td>
                  <td className="px-4 py-2.5 text-stone-600">Curved food lines and serpentine buffet runs</td>
                  <td className="px-4 py-2.5 font-medium tabular-nums">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
