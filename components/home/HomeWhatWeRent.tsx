import Link from "next/link";

const rentalOptions = [
  {
    title: "Tents & structures",
    line: "Frame, pole, and expandable layouts sized for your headcount and program.",
    href: "/tent-rentals",
    photoLabel: "Tent exterior or interior",
  },
  {
    title: "Tables & chairs",
    line: "Round, banquet, folding—set for seated dinners, ceremonies, or buffet flow.",
    href: "/table-chair-rentals",
    photoLabel: "Table settings",
  },
  {
    title: "Dance floors & staging",
    line: "Dance surface, band or DJ risers, and sightlines planned with your tent.",
    href: "/party-packages",
    photoLabel: "Dance floor",
  },
  {
    title: "Lighting & climate",
    line: "String lights, bistro feel, fans or heaters—comfort that matches your timeline.",
    href: "/rental-inventory",
    photoLabel: "Lighting detail",
  },
  {
    title: "Sidewalls & weather",
    line: "Partial or full enclosure, café-style openings, and rain backup options.",
    href: "/tents",
    photoLabel: "Sidewalls / tent sides",
  },
  {
    title: "Games & add-ons",
    line: "Yard games, inflatables, and extras that round out the guest experience.",
    href: "/av-games",
    photoLabel: "Games or lawn setup",
  },
] as const;

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-200/90 bg-gradient-to-br from-stone-100 via-[#faf8f5] to-stone-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
      role="img"
      aria-label={`Photo placeholder: ${label}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#b8a88c]">Photo</span>
        <span className="max-w-[12rem] text-xs leading-snug text-stone-500">{label}</span>
      </div>
    </div>
  );
}

export function HomeWhatWeRent() {
  return (
    <section className="border-b border-stone-200/80 bg-[#faf8f5] py-12 sm:py-16 lg:py-20" aria-labelledby="what-we-rent-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Rental options</p>
          <h2 id="what-we-rent-heading" className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            What we rent
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            One inventory for backyard parties and large tented events—gear that shows up clean, installed on schedule, and
            picked up when we say we will.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {rentalOptions.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-2xl border border-stone-200/60 bg-white p-1 shadow-sm transition hover:border-[#d4bc88]/60 hover:shadow-md"
            >
              <PhotoPlaceholder label={item.photoLabel} />
              <div className="flex flex-1 flex-col px-4 pb-5 pt-5">
                <h3 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.line}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex text-sm font-semibold text-[#8a6220] underline-offset-2 transition hover:text-stone-900 hover:underline"
                  prefetch={true}
                >
                  Explore <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/rental-inventory"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-8 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:text-base"
            prefetch={true}
          >
            Browse full rental inventory
          </Link>
        </p>
      </div>
    </section>
  );
}
