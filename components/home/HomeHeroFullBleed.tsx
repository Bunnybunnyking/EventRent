import Image from "next/image";
import Link from "next/link";
import { callNowHeroClass } from "@/lib/cta-styles";
import { homePageHeroImagePath, homePageHeroImageSize } from "@/lib/metadata";
import { business } from "@/lib/site-data";

/**
 * Homepage hero: responsive image with intrinsic width/height so the **entire** photo is visible.
 * Do not use `fill` + `object-cover` here — that crops into the scene and looks “zoomed in” on one area.
 * `unoptimized`: serve `/public` file directly so swapping the PNG isn’t masked by `/_next/image` caching.
 */
export function HomeHeroFullBleed() {
  const { width, height } = homePageHeroImageSize;

  return (
    <section aria-label="Featured event tent setup" className="relative w-full bg-[#0f1214]">
      <div className="relative mx-auto w-full max-w-[100vw]">
        <Image
          src={homePageHeroImagePath}
          alt="Outdoor wedding reception under a white frame tent—champagne gold linens, white lanterns, string lights, dance floor, and lawn beyond."
          width={width}
          height={height}
          priority
          sizes="100vw"
          unoptimized
          className="block h-auto w-full max-w-full object-contain object-center hero-home-fade-in"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#15181b] via-[#15181b]/80 to-transparent sm:h-20"
          aria-hidden
        />
        <div className="absolute left-3 top-3 z-10 sm:left-5 sm:top-5 md:left-6 md:top-6">
          <Link href="/wishlist" className={`${callNowHeroClass} pointer-events-auto`}>
            View wishlist
          </Link>
        </div>
        <div className="absolute right-3 top-3 z-10 sm:right-5 sm:top-5 md:right-6 md:top-6">
          <a href={business.phoneHref} className={`${callNowHeroClass} pointer-events-auto`} aria-label="Call now">
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
