import type { Metadata } from "next";
import { AdminRsvpTable } from "@/components/rsvp/admin-rsvp-table";
import { isStaffAdminKeyValid } from "@/lib/rsvp/admin-auth";
import { adminPlanningCount, listEventsForAdmin } from "@/lib/rsvp/service";
import { siteBaseUrl } from "@/lib/metadata";

/**
 * Staff-only RSVP index. V1 uses a shared secret (`RSVP_ADMIN_SECRET`, or legacy `RSVP_STAFF_KEY`) via `?key=` for mock auth.
 *
 * Replace with real staff authentication (session, SSO, or IP allowlist + login) before production.
 * Do not index this page; individual `/rsvp/[slug]` pages may be shared privately and are not listed here.
 */
export const metadata: Metadata = {
  title: "RSVP admin",
  description: "Internal listing of Event Guest Count Planner events.",
  robots: { index: false, follow: false },
};

type PageProps = { searchParams: Promise<{ key?: string }> };

export default async function AdminRsvpsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const key = typeof sp.key === "string" ? sp.key : undefined;
  const authed = isStaffAdminKeyValid(key);

  if (!authed) {
    return (
      <section className="border-b border-stone-200 bg-stone-50 py-14 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h1 className="text-2xl font-semibold text-stone-900 [font-family:var(--font-display)]">Staff RSVP index</h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            This page is for Connecticut Party Rentals staff. Version 1 uses a shared secret in the environment variable{" "}
            <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">RSVP_ADMIN_SECRET</code>, plus the query parameter{" "}
            <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">key</code> on the URL.
          </p>
          <p className="mt-4 text-sm text-stone-600">
            Example (local):{" "}
            <span className="break-all font-mono text-xs text-stone-800">
              /admin/rsvps?key=
              <span className="select-none">••••••••</span>
            </span>
          </p>
          <p className="mt-6 text-xs text-stone-500">
            Swap this gate for real staff login before relying on it in production. Never commit real keys to the repo.
          </p>
        </div>
      </section>
    );
  }

  const events = await listEventsForAdmin();
  const rows = events.map((ev) => ({
    slug: ev.slug,
    eventDate: ev.eventDate,
    eventName: ev.eventName,
    hostName: ev.hostName,
    phone: ev.phone,
    email: ev.email,
    location: ev.location,
    eventType: ev.eventType,
    estimatedGuestCount: ev.estimatedGuestCount,
    planningCount: adminPlanningCount(ev),
    rsvpCount: ev.rsvps.length,
    rentalNeeds: ev.rentalNeeds.join(", "),
    quoteUpdateRequested: ev.quoteUpdateRequested,
    quoteUpdateResolved: ev.quoteUpdateResolved,
    createdAt: new Date(ev.createdAt).toLocaleString("en-US", { timeZone: "America/New_York" }),
    dashboardUrl: `${siteBaseUrl}/rsvp/${ev.slug}/dashboard?token=${encodeURIComponent(ev.hostToken)}`,
  }));

  return (
    <section className="border-b border-stone-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-stone-900 [font-family:var(--font-display)]">RSVP & guest count planners</h1>
        <p className="mt-2 max-w-3xl text-sm text-stone-600">
          <strong className="font-semibold text-stone-800">Dev / operations:</strong> keep this URL bookmarked with your staff key. Use{" "}
          <span className="font-semibold">View dashboard</span> to see every RSVP with guest email and phone. Data lives in{" "}
          <strong className="font-semibold">Supabase</strong> when <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-xs">SUPABASE_SERVICE_ROLE_KEY</code> are set; otherwise the local JSON file in{" "}
          <code className="text-xs">lib/rsvp/store.ts</code>.
        </p>
        <p className="mt-2 text-xs font-semibold text-amber-800">
          You are viewing confidential host contact information. Do not share outside the company.
        </p>
        <div className="mt-8">
          <AdminRsvpTable rows={rows} staffKey={key!} />
        </div>
      </div>
    </section>
  );
}
