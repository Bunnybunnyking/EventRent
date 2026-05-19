import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { HostDashboard } from "@/components/rsvp/host-dashboard";
import { optionalAdditionDropdownOptions } from "@/lib/rsvp/addition-options";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { getDashboardEvent } from "@/lib/rsvp/service";
import type { RentalNeedOption } from "@/lib/rsvp/types";

type PageProps = { params: Promise<{ slug: string }>; searchParams: Promise<{ token?: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return createPageMetadata({
    title: "Host dashboard · Event Guest Count Planner",
    description: "Private host dashboard for tracking RSVPs and rental planning.",
    path: `/rsvp/${slug}/dashboard`,
    ogImage: defaultOgImagePath,
    index: false,
  });
}

const privateMessage =
  "This dashboard link is private. Please use the dashboard link sent to the event host.";

export default async function HostDashboardPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const token = typeof sp.token === "string" ? sp.token : undefined;
  const gate = await getDashboardEvent(slug, token);

  if (gate === "missing" || gate === "invalid") {
    return (
      <section className="border-b border-stone-200 bg-gradient-to-b from-[#faf9f7] to-white py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <h1 className="text-2xl font-semibold text-stone-900 [font-family:var(--font-display)]">Private dashboard</h1>
          <p className="mt-4 text-base leading-relaxed text-stone-600">{privateMessage}</p>
          <p className="mt-6 text-sm text-stone-500">
            Need a new planner?{" "}
            <Link className="font-semibold text-stone-900 underline underline-offset-2" href="/rsvp/create">
              Create a fresh event page
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  const { hostToken: _omit, ...rest } = gate;
  void _omit;

  const additionOptions = optionalAdditionDropdownOptions(rest.rentalNeeds as RentalNeedOption[]);

  const payload = {
    slug,
    token: token!,
    eventName: rest.eventName,
    eventDate: rest.eventDate,
    eventType: rest.eventType,
    location: rest.location,
    estimatedGuestCount: rest.estimatedGuestCount,
    rentalNeeds: rest.rentalNeeds,
    optionalAddition: rest.optionalAddition,
    additionOptions,
    seatingStyle: rest.seatingStyle,
    indoorOutdoor: rest.indoorOutdoor,
    quoteUpdateRequested: rest.quoteUpdateRequested,
    quoteUpdateResolved: rest.quoteUpdateResolved,
    rsvps: rest.rsvps,
  };

  return (
    <section className="border-b border-stone-200 bg-gradient-to-b from-[#faf9f7] to-white py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "RSVP", href: "/rsvp" },
            { label: rest.eventName, href: `/rsvp/${slug}` },
            { label: "Dashboard" },
          ]}
        />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Private host view</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
          Event Guest Count Planner
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
          Track responses, watch your planning count, and line up tables, chairs, linens, tents, and add-ons with our Connecticut crew.
          Bookmark this URL — it is how you get back in without an account.
        </p>
        <div className="mt-10">
          <HostDashboard data={payload} />
        </div>
      </div>
    </section>
  );
}
