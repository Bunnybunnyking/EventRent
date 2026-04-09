import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { TentGalleryLightbox } from "@/components/tent-gallery-lightbox";
import { SectionHeading } from "@/components/sections";
import { BreadcrumbListSchema } from "@/components/schema";
import { createPageMetadata } from "@/lib/metadata";
import { business, galleryItems } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Tent Photo Gallery | Connecticut Party & Wedding Setups | ${business.primaryCity}`,
  description:
    "Connecticut tent rental photo gallery: wedding, backyard, corporate, and community setups—layouts, lighting, and presentation ideas. Click any image to view full size.",
  path: "/tents/gallery",
});

export default function TentsGalleryPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tents", path: "/tent-rentals" },
          { name: "Tent gallery", path: "/tents/gallery" },
        ]}
      />
      <section className="border-b border-stone-200/80 bg-[#f7f5f1] py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Breadcrumb
              className="mb-0"
              items={[
                { label: "Home", href: "/" },
                { label: "Tent rentals", href: "/tent-rentals" },
                { label: "Tent gallery" },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Link
                href="/contact#quote"
                className="rounded-full bg-[#1d2124] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#131517]"
              >
                Get a Tent Quote
              </Link>
              <Link
                href="/tent-rentals"
                className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
              >
                Tent rentals
              </Link>
            </div>
          </div>

          <SectionHeading
            eyebrow="Gallery"
            title={`Tent rental gallery for ${business.primaryCity} and Connecticut`}
            intro="Browse real setups for weddings, backyard parties, company events, and community gatherings. Select a photo to open a larger view."
            titleAs="h1"
          />

          <div className="mt-10">
            <TentGalleryLightbox items={galleryItems} />
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-stone-200/90 pt-10 sm:flex-row">
            <p className="text-center text-sm text-stone-600">Planning an outdoor event? Lock in tents, tables, and timing with one quote.</p>
            <Link
              href="/contact#quote"
              className="inline-flex rounded-full bg-[#b78a2d] px-6 py-3 text-sm font-semibold text-[#1b1712] transition hover:bg-[#d6a645]"
            >
              Get a Tent Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
