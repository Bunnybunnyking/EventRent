import Link from "next/link";
import { testimonials } from "@/lib/site-data";

const placeholderCount = 9;

export function GalleryPreview() {
  const quotes = testimonials.slice(0, 3);

  return (
    <section className="border-y border-stone-200 bg-[#faf8f5] py-12 sm:py-14 lg:py-16" aria-labelledby="home-gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="home-gallery-heading" className="text-center text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Gallery &amp; client notes
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-stone-600">
          Real Connecticut setups—drop in your photography here when it&apos;s ready.
        </p>
        {/* Photo slots: replace with next/image when files exist in public/images/ */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4" role="region" aria-label="Gallery photo placeholders">
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-[4/3] flex-col items-center justify-center rounded-xl border border-dashed border-stone-300/80 bg-white/70 p-2 text-center text-[10px] font-medium uppercase tracking-wide text-stone-400/90 sm:text-[11px]"
              aria-hidden
            >
              <span>Photo</span>
              <span className="mt-1 text-[9px] font-normal normal-case tracking-normal text-stone-400">{i + 1}</span>
            </div>
          ))}
        </div>
        {quotes.length > 0 ? (
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {quotes.map((q) => (
              <figure key={q.name} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <blockquote className="text-sm leading-relaxed text-stone-700">&ldquo;{quoteShort(q.quote)}&rdquo;</blockquote>
                <figcaption className="mt-3 text-xs font-semibold text-stone-900">
                  {q.name}
                  <span className="mt-1 block font-normal text-stone-500">{q.event}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        <div className="mt-10 flex justify-center">
          <Link
            href="/tents/gallery"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-8 py-3 text-base font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
            prefetch={true}
          >
            View full gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Keep testimonials to 1–2 short sentences on the homepage. */
function quoteShort(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length >= 2) {
    return sentences.slice(0, 2).join(" ").trim();
  }
  if (text.length > 200) {
    return `${text.slice(0, 197).trim()}…`;
  }
  return text;
}
