import Image from "next/image";
import Link from "next/link";
import { galleryItems, testimonials } from "@/lib/site-data";

export function GalleryPreview() {
  const quotes = testimonials.slice(0, 3);

  return (
    <section className="border-y border-stone-200 bg-[#faf8f5] py-10 sm:py-8 lg:py-9" aria-labelledby="home-gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="home-gallery-heading" className="text-center text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Gallery &amp; client notes
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-stone-600">
          Real Connecticut installs—same photos as our{" "}
          <Link href="/tents/gallery" className="font-medium text-[#7a5a18] underline decoration-[#d4bc88] underline-offset-2 hover:text-stone-900">
            full tent gallery
          </Link>
          .
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4" role="region" aria-label="Tent and event photo gallery preview">
          {galleryItems.map((item, i) => (
            <Link
              key={item.src}
              href="/tents/gallery"
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-200/90 bg-stone-100 shadow-sm transition hover:border-stone-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
              prefetch={true}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                loading={i < 6 ? "eager" : "lazy"}
                priority={i < 4}
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 py-2 pt-8 text-[10px] font-medium leading-snug text-white opacity-0 transition group-hover:opacity-100 sm:text-[11px]">
                <span className="line-clamp-2">{item.alt}</span>
              </span>
            </Link>
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
            className="text-sm font-semibold text-[#7a5a18] underline decoration-[#d4bc88] underline-offset-[3px] transition hover:text-stone-900 md:inline-flex md:min-h-[48px] md:items-center md:justify-center md:rounded-full md:border-2 md:border-stone-800 md:bg-white md:px-8 md:py-3 md:text-base md:font-semibold md:text-stone-900 md:no-underline md:decoration-transparent md:shadow-sm md:transition md:hover:bg-stone-50 md:focus-visible:outline-none md:focus-visible:ring-2 md:focus-visible:ring-[#c9a228] md:focus-visible:ring-offset-2"
            prefetch={true}
          >
            View full gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Keep testimonials to 1 to 2 short sentences on the homepage. */
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
