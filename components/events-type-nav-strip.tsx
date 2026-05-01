import Link from "next/link";

/**
 * Events hub occasion strip (not the site header): white bar, gold outline, black type.
 * "Birthdays" links to `/events/birthdays` (Sweet 16, quinceañeras, communions, etc.).
 */
const barLink =
  "inline-flex shrink-0 items-center whitespace-nowrap px-3.5 py-2.5 text-sm font-semibold tracking-wide text-stone-900 transition [font-family:var(--font-display)] hover:bg-stone-50 hover:text-black focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#b78a2d] sm:px-4 sm:py-3 sm:text-[0.9375rem]";

const barLinkAccent =
  "inline-flex shrink-0 items-center whitespace-nowrap px-3.5 py-2.5 text-sm font-bold tracking-wide text-stone-950 transition [font-family:var(--font-display)] hover:bg-[#faf6ef] hover:text-black focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#b78a2d] sm:px-4 sm:py-3 sm:text-[0.9375rem]";

const navLinks: { href: string; label: string; accent?: boolean }[] = [
  { href: "/corporate-event-rentals", label: "Corporate" },
  { href: "/wedding-tent-rentals", label: "Weddings" },
  { href: "/events/birthdays", label: "Birthdays", accent: true },
  { href: "/events/community-school-town", label: "Community" },
  { href: "/events/festivals-fairs", label: "Festivals" },
  { href: "/events/graduation-parties", label: "Graduation" },
  { href: "/events/tailgating", label: "Tailgates" },
  { href: "/events/fundraisers-galas", label: "Fundraisers" },
  { href: "/rsvp", label: "Guest planner", accent: true },
];

export function EventsHubTopBar() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10">
      <nav
        className="overflow-hidden rounded-lg border-2 border-[#b78a2d] bg-white shadow-sm [-webkit-overflow-scrolling:touch] [scrollbar-color:#b78a2d_#f5f5f4] [scrollbar-width:thin]"
        aria-label="Event types"
      >
        <div className="flex min-h-[2.75rem] min-w-0 items-stretch overflow-x-auto sm:min-h-[3rem]">
          <div className="flex min-w-min divide-x divide-[#b78a2d]/45">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.accent ? barLinkAccent : barLink}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

/** Previous card-style panel — replaced by `EventsHubTopBar` on the Events hub. */
export function EventsHubNavPanel() {
  return <EventsHubTopBar />;
}

export const EventsTypeNavStrip = EventsHubTopBar;
