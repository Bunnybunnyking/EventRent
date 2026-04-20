import Image from "next/image";
import Link from "next/link";
import { defaultOgImagePath } from "@/lib/metadata";
import { business } from "@/lib/site-data";

const reachOutClass =
  "font-semibold text-[#9a7328] underline decoration-[#d4b87a] underline-offset-2 transition hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2";

/**
 * Side-by-side hero from sm↑ (640px): text left, photo right. Tight blurb + smaller type so both fit in one row.
 * Below sm: single column (very narrow phones).
 */
export function PlanningHeroSplit() {
  return (
    <div className="grid grid-cols-1 items-center gap-6 pt-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] sm:gap-5 sm:pt-6 md:gap-8 lg:gap-10 lg:pt-8">
      {/* Left: compact blurb */}
      <div className="min-w-0 sm:pr-1 md:pr-2 lg:pr-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7328] sm:text-xs">Planning · Connecticut</p>
        <h1 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-stone-900 sm:text-xl md:text-[1.35rem] md:leading-tight lg:text-[1.5rem]">
          Plan your tent, layout, and event setup with confidence
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-[0.8125rem] sm:leading-[1.5] md:text-sm md:leading-relaxed">
          Outdoor events run better when the structure matches the program—we walk you through tent size, layout, weather, and the site details people overlook. Written like our team talks with hosts:
          practical and specific to Connecticut. Use it to get oriented, then{" "}
          <Link href="/contact#quote" className={reachOutClass} prefetch={true}>
            reach out
          </Link>{" "}
          when you want a real pair of eyes on your date and property.
        </p>
        <p className="mt-3 text-xs text-stone-500">
          <a href={business.phoneHref} className="font-medium text-stone-600 underline underline-offset-2 hover:text-stone-900">
            Call us
          </a>
          <span className="text-stone-300"> · </span>
          <span className="text-stone-400">Since {business.establishedYear}</span>
        </p>
      </div>

      {/* Right: photo — same row as text from sm breakpoint */}
      <div className="relative w-full min-h-0 sm:pl-1">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-lg ring-1 ring-stone-200/80 sm:aspect-auto sm:h-[min(260px,38vh)] sm:min-h-[200px] md:h-[min(320px,42vh)] md:min-h-[240px] lg:h-[min(380px,48vh)] lg:min-h-[260px]">
          <Image
            src={defaultOgImagePath}
            alt="White event tent with tables and dance floor—Connecticut outdoor reception"
            fill
            className="object-cover object-center"
            sizes="(max-width: 639px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
