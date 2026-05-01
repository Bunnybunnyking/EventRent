import Image from "next/image";
import Link from "next/link";
import { callNowHeroClass } from "@/lib/cta-styles";
import { FAST_QUOTE_HREF, LABEL_GET_FAST_QUOTE, mobileTextLinkClass } from "@/lib/mobile-booking";
import { homePageHeroImagePath, homePageHeroImageSize } from "@/lib/metadata";
import { business } from "@/lib/site-data";

/**
 * Homepage hero: full photo visible at every breakpoint (`object-contain`), never cropped.
 * Mobile keeps compact Catalog + Call on the image + headline band below for scanning and quote flow.
 */
export function HomeHeroFullBleed() {
  const { width, height } = homePageHeroImageSize;

  return (
    <section aria-label="Featured event tent setup" className="relative w-full bg-[#0f1214]">
      <div className="relative mx-auto w-full max-w-[100vw]">
        <Image
          src={homePageHeroImagePath}
          alt="Outdoor wedding reception under a white frame tent, champagne gold linens, white lanterns, string lights, dance floor, and lawn beyond."
          width={width}
          height={height}
          priority
          sizes="100vw"
          unoptimized
          className="block h-auto w-full max-w-full object-contain object-center hero-home-fade-in"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#15181b] via-[#15181b]/80 to-transparent sm:h-14"
          aria-hidden
        />
        {/* Catalog + Call — visible on all sizes; compact padding on small screens */}
        <div className="absolute left-2 top-2 z-10 sm:left-5 sm:top-5 md:left-6 md:top-6">
          <Link
            href="/wishlist"
            title="Browse the full rental catalog and start a tent reservation"
            className={`${callNowHeroClass} pointer-events-auto max-w-[min(calc(100vw-5.5rem),16rem)] text-balance px-3 py-2 text-center text-[0.625rem] font-bold leading-snug tracking-wide sm:max-w-none sm:px-5 sm:text-xs md:text-sm md:leading-tight`}
          >
            CATALOG & Reserve A Tent
          </Link>
        </div>
        <div className="absolute right-2 top-2 z-10 sm:right-5 sm:top-5 md:right-6 md:top-6">
          <a href={business.phoneHref} className={`${callNowHeroClass} pointer-events-auto`} aria-label="Call now">
            Call Now
          </a>
        </div>
      </div>

      {/* Mobile: scan-friendly headline + quote link (desktop repeats under hero in HomeIntroDark) */}
      <div className="border-b border-white/[0.06] bg-[#15181b] px-4 pb-7 pt-5 md:hidden">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#c9a24a]/90">{business.name}</p>
        <h1 className="mt-2 text-[1.35rem] font-semibold leading-[1.15] tracking-tight text-white [font-family:var(--font-display)]">
          Let Us Handle the Event &amp; Tent
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-300">
          Plan it right. Set it tight. Enjoy your night.
        </p>
        <p className="mt-5">
          <Link href={FAST_QUOTE_HREF} className={`${mobileTextLinkClass} text-[0.9375rem]`}>
            {LABEL_GET_FAST_QUOTE}
          </Link>
        </p>
        <p className="mt-3 text-sm text-stone-500">
          <a href={business.phoneHref} className="font-medium text-stone-400 underline-offset-2 transition hover:text-stone-200">
            {business.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
