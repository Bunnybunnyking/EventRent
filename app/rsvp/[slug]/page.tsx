import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { GuestRsvpForm } from "@/components/rsvp/guest-rsvp-form";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { getPublicEvent } from "@/lib/rsvp/service";

type PageProps = { params: Promise<{ slug: string }>; searchParams: Promise<{ thanks?: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ev = await getPublicEvent(slug);
  if (!ev) {
    return createPageMetadata({
      title: "Event RSVP",
      description: "RSVP for a Connecticut Party Rentals event.",
      path: `/rsvp/${slug}`,
      ogImage: defaultOgImagePath,
      index: false,
    });
  }
  return createPageMetadata({
    title: `RSVP · ${ev.eventName}`,
    description: `RSVP for ${ev.eventName}. Hosted with Connecticut Party Rentals event planning tools.`,
    path: `/rsvp/${slug}`,
    ogImage: defaultOgImagePath,
    index: false,
  });
}

function formatDisplayDate(ymd: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return ymd;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });
}

export default async function PublicRsvpPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const ev = await getPublicEvent(slug);
  if (!ev) notFound();

  const thanks = sp.thanks === "1";

  return (
    <section className="border-b border-stone-200 bg-gradient-to-b from-[#faf9f7] to-white py-10 sm:py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "RSVP", href: "/rsvp" }, { label: ev.eventName }]} />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Guest RSVP</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">{ev.eventName}</h1>
        <p className="mt-3 text-base text-stone-600">
          <span className="font-semibold text-stone-800">{formatDisplayDate(ev.eventDate)}</span>
          <span aria-hidden> · </span>
          <span>{ev.location}</span>
        </p>
        {ev.hostMessage ? (
          <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 text-sm leading-relaxed text-stone-700 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Note from your host</p>
            <p className="mt-2 whitespace-pre-wrap">{ev.hostMessage}</p>
          </div>
        ) : null}

        {thanks ? (
          <div className="mt-8 rounded-2xl border border-[#c9a228]/50 bg-[#fffdf8] p-6 text-center shadow-sm">
            <p className="text-lg font-semibold text-stone-900">Thanks, your RSVP has been saved.</p>
            <p className="mt-3 text-sm text-stone-600">If you need to change your response, ask your host to reach our event team.</p>
            <div className="mt-6 border-t border-stone-200 pt-6">
              <p className="text-sm font-semibold text-stone-900">Need rentals for your own event?</p>
              <p className="mt-2 text-sm text-stone-600">Plan your party with Connecticut Party Rentals.</p>
              <Link
                href="/rsvp"
                className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-stone-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-stone-800"
              >
                Start My Event Plan
              </Link>
            </div>
          </div>
        ) : (
          <GuestRsvpForm slug={slug} />
        )}
      </div>
    </section>
  );
}
