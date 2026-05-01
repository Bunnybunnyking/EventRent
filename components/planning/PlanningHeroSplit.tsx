import Image from "next/image";
import { defaultOgImagePath } from "@/lib/metadata";
import { business } from "@/lib/site-data";

/**
 * Side-by-side hero from sm↑ (640px): text left, photo right. Tight blurb + smaller type so both fit in one row.
 * Below sm: single column (very narrow phones).
 */
export function PlanningHeroSplit() {
  return (
    <div className="grid grid-cols-1 items-start gap-5 pt-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] sm:gap-5 sm:pt-5 md:gap-7 lg:gap-9 lg:pt-6">
      {/* Left: compact blurb */}
      <div className="min-w-0 sm:pr-1 md:pr-2 lg:pr-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7328] sm:text-xs">Planning · Connecticut</p>
        <h1 className="mt-2 text-xl font-bold leading-snug tracking-tight text-black [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#b78a2d] [paint-order:stroke_fill] sm:text-2xl sm:[-webkit-text-stroke-width:1.25px] md:text-[1.5rem] md:leading-tight md:[-webkit-text-stroke-width:1.25px] lg:text-[1.7rem] lg:[-webkit-text-stroke-width:1.5px]">
          Event Planning Starts with the Right Tent
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-[0.8125rem] sm:leading-[1.5] md:text-sm md:leading-relaxed">
          The best outdoor events start with a clear plan, and the right tent helps bring that plan together. Guest count, flow, weather, and site conditions all shape the setup, while the tent helps define the space, improve comfort, and create a more polished setting for dining, gathering, and celebrating. This page is here to help you think through the essentials with practical guidance based on real event planning across Connecticut. If you are not sure where to begin, call our team and we will help you figure out the next step.
        </p>
        <p className="mt-3 text-xs text-stone-500">
          <a href={business.phoneHref} className="font-medium text-stone-600 underline underline-offset-2 hover:text-stone-900">
            Call us
          </a>
          <span className="text-stone-300"> · </span>
          <span className="text-stone-400">Since {business.establishedYear}</span>
        </p>
      </div>

      {/* Right: photo, same row as text from sm breakpoint */}
      <div className="relative w-full min-h-0 sm:pl-1">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-lg ring-1 ring-stone-200/80 sm:aspect-auto sm:h-[min(260px,38vh)] sm:min-h-[200px] md:h-[min(320px,42vh)] md:min-h-[240px] lg:h-[min(380px,48vh)] lg:min-h-[260px]">
          <Image
            src={defaultOgImagePath}
            alt="White event tent with tables and dance floor, Connecticut outdoor reception"
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
