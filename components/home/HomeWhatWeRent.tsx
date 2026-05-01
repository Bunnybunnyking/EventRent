import Image from "next/image";
import Link from "next/link";

const rentalOptions = [
  {
    title: "Tents & structures", line: "Frame, pole, and expandable layouts sized for your headcount and program.", href: "/tent-rentals", photoLabel: "Tent exterior or interior", photoSrc: "/images/home-hero-panoramic-tent.jpg", }, {
    title: "Tables & chairs", line: "Round, banquet, folding, set for seated dinners, ceremonies, or buffet flow.", href: "/table-chair-rentals", photoLabel: "Table settings", photoSrc: "/images/white-folding-chair-outdoor-event-ct.jpg", }, {
    title: "Dance floors & staging", line: "Dance surface, band or DJ risers, and sightlines planned with your tent.", href: "/party-packages", photoLabel: "Dance floor", photoSrc: "/images/wethersfield-ct-party-tent-rental-wedding-reception.png", }, {
    title: "Lighting & climate", line: "String lights, bistro feel, fans or heaters, comfort that matches your timeline.", href: "/rental-inventory", photoLabel: "Lighting detail", photoSrc: "/images/farmington-tent-rental-lakeside-event-tent.png", }, {
    title: "Sidewalls & weather", line: "Partial or full enclosure, café-style openings, and rain backup options.", href: "/tents", photoLabel: "Sidewalls / tent sides", photoSrc: "/images/tent-sidewalls-window-walls-tennis-court.png", }, {
    title: "Games & add-ons", line: "Yard games, inflatables, and extras that round out the guest experience.", href: "/av-games", photoLabel: "Games or lawn setup", photoSrc: "/images/gallery/ct-fiesta-frame-tent-20x40.png", }, ] as const;

function PhotoCard({ label, src }: { label: string; src: string }) {
  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-200/90 bg-stone-100 shadow-sm"
      aria-label={label}
    >
      <Image src={src} alt={label} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
    </div>
  );
}

export function HomeWhatWeRent() {
  return (
    <section className="border-b border-stone-200/80 bg-[#faf8f5] py-10 sm:py-9 lg:py-10" aria-labelledby="what-we-rent-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Rental options</p>
          <h2 id="what-we-rent-heading" className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            What we rent
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            One inventory for backyard parties and large tented events, gear that shows up clean, installed on schedule, and
            picked up when we say we will.
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {rentalOptions.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-2xl border border-stone-200/60 bg-white p-1 shadow-sm transition hover:border-[#d4bc88]/60 hover:shadow-md"
            >
              <PhotoCard label={item.photoLabel} src={item.photoSrc} />
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
            className="text-sm font-semibold text-[#7a5a18] underline decoration-[#d4bc88] underline-offset-[3px] transition hover:text-stone-900 md:inline-flex md:min-h-[48px] md:items-center md:justify-center md:rounded-full md:border-2 md:border-stone-800 md:bg-white md:px-8 md:py-3 md:text-base md:no-underline md:decoration-transparent md:shadow-sm md:transition md:hover:bg-stone-50 md:focus-visible:outline-none md:focus-visible:ring-2 md:focus-visible:ring-[#c9a228] md:focus-visible:ring-offset-2"
            prefetch={true}
          >
            Browse full rental inventory
          </Link>
        </p>
      </div>
    </section>
  );
}
