import Link from "next/link";

const btnOutline =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-7 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:px-8 sm:text-base";

const core = [
  "Tents & large structures",
  "Tables & chairs",
  "Sidewalls, lighting, climate options",
  "Dance floors & staging",
];

const extras = [
  "Catering / service zones",
  "Entry canopies & walkways",
  "Lounge & kids zones",
  "The details people forget—trash, power planning, parking, and more",
];

export function WhatWeOffer() {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="home-offer-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="home-offer-heading" className="text-center text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Full rental depth—without the chaos.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7328]">Core rentals</p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-stone-700">
              {core.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#b78a2d]" aria-hidden>
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7328]">The extras</p>
            <ul className="mt-4 list-none space-y-2.5 p-0 text-sm leading-relaxed text-stone-700">
              {extras.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#b78a2d]" aria-hidden>
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/rental-inventory" className={btnOutline} prefetch={true}>
            Browse rentals
          </Link>
          <Link href="/tents/gallery" className={btnOutline} prefetch={true}>
            View gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
