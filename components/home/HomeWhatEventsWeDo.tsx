import Image from "next/image";
import Link from "next/link";

const events = [
  {
    title: "Weddings", line: "Receptions, ceremony seating, lighting, sidewalls, and layouts that keep service and dance flow smooth.", href: "/wedding-tent-rentals", photoLabel: "Wedding tent reception", photoSrc: "/images/wedding-tent-hero.png", }, {
    title: "Corporate & campus", line: "Picnics, all-hands, and outdoor programs, planned installs, safety in mind, on schedule.", href: "/corporate-event-rentals", photoLabel: "Corporate outdoor event", photoSrc: "/images/tent-sidewalls-window-walls-tennis-court.png", }, {
    title: "Festivals & fairs", line: "Vendor rows, entrances, and repeatable logistics for town and school events.", href: "/events/festivals-fairs", photoLabel: "Festival tents", photoSrc: "/images/gallery/ct-fiesta-frame-tent-30x30.png", }, {
    title: "Backyard & social", line: "Graduations, birthdays, cookouts, right-sized tents, tables, chairs, and the essentials.", href: "/events", photoLabel: "Backyard party tent", photoSrc: "/images/service-areas/middletown-ct-frame-tent-20x40.png", }, ] as const;

function PhotoCard({ label, src }: { label: string; src: string }) {
  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-200/90 bg-stone-100 shadow-sm"
      aria-label={label}
    >
      <Image src={src} alt={label} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
    </div>
  );
}

export function HomeWhatEventsWeDo() {
  return (
    <section className="bg-white py-10 sm:py-9 lg:py-10" aria-labelledby="what-events-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Events</p>
          <h2 id="what-events-heading" className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            What events we do
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            Same crew and inventory whether you are hosting forty guests or four hundred, tell us what you are planning and
            we will size the shell and support around it.
          </p>
        </div>

        <div className="mt-10 grid gap-10 sm:gap-8 sm:grid-cols-2 lg:gap-10">
          {events.map((item) => (
            <article
              key={item.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-[#faf8f5] md:transition md:hover:border-[#c9a228]/40 md:hover:shadow-lg"
            >
              <PhotoCard label={item.photoLabel} src={item.photoSrc} />
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                <h3 className="text-xl font-semibold text-stone-900 [font-family:var(--font-display)]">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.line}</p>
                <Link
                  href={item.href}
                  prefetch={true}
                  className="mt-4 inline-flex w-fit text-sm font-semibold text-[#8a6220] underline-offset-4 transition hover:text-[#6b4f0a] hover:underline"
                >
                  View event guide <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-stone-600">
          Serving all of Connecticut and Southern Massachusetts, see{" "}
          <Link href="/service-areas" className="font-semibold text-[#8a6220] underline-offset-2 hover:underline">
            service areas
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
