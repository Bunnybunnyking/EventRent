import Link from "next/link";

const events = [
  {
    title: "Weddings",
    line: "Receptions, ceremony seating, lighting, sidewalls, and layouts that keep service and dance flow smooth.",
    href: "/wedding-tent-rentals",
    photoLabel: "Wedding tent reception",
  },
  {
    title: "Corporate & campus",
    line: "Picnics, all-hands, and outdoor programs—planned installs, safety in mind, on schedule.",
    href: "/corporate-event-rentals",
    photoLabel: "Corporate outdoor event",
  },
  {
    title: "Festivals & fairs",
    line: "Vendor rows, entrances, and repeatable logistics for town and school events.",
    href: "/events/festivals-fairs",
    photoLabel: "Festival tents",
  },
  {
    title: "Backyard & social",
    line: "Graduations, birthdays, cookouts—right-sized tents, tables, chairs, and the essentials.",
    href: "/events",
    photoLabel: "Backyard party tent",
  },
] as const;

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-200/90 bg-gradient-to-br from-stone-100 via-white to-stone-200/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
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

export function HomeWhatEventsWeDo() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="what-events-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Events</p>
          <h2 id="what-events-heading" className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            What events we do
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            Same crew and inventory whether you are hosting forty guests or four hundred—tell us what you are planning and
            we will size the shell and support around it.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {events.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-[#faf8f5] transition hover:border-[#c9a228]/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2"
              prefetch={true}
            >
              <PhotoPlaceholder label={item.photoLabel} />
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                <h3 className="text-xl font-semibold text-stone-900 [font-family:var(--font-display)] group-hover:text-[#6b4f0a]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.line}</p>
                <span className="mt-4 text-sm font-semibold text-[#8a6220]">
                  View event guide <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-stone-600">
          Serving all of Connecticut and Southern Massachusetts — see{" "}
          <Link href="/service-areas" className="font-semibold text-[#8a6220] underline-offset-2 hover:underline">
            service areas
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
