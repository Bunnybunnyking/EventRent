import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "Event Guest Count Planner",
  description:
    "Free RSVP and rental planning tool for Connecticut hosts: track guest count, plan tables and chairs, and keep your tent rental order accurate before your final count.",
  path: "/rsvp",
  ogImage: defaultOgImagePath,
});

const benefits = [
  {
    title: "Track who is coming",
    body: "See yes, no, and maybe responses in one place so your headcount is not a guessing game.",
  },
  {
    title: "Plan tables, chairs, and linens",
    body: "Turn your planning count into practical starting numbers you can review with our event team.",
  },
  {
    title: "Avoid last-minute rental changes",
    body: "Catch movement in your guest list early so tents, seating, and service flow stay aligned.",
  },
  {
    title: "Share one simple RSVP link with guests",
    body: "Guests respond without creating an account. You keep the private dashboard link for yourself.",
  },
  {
    title: "Update your rental quote when your guest count changes",
    body: "When your count firms up, we help you adjust inventory and delivery planning for Connecticut events.",
  },
];

export default function RsvpLandingPage() {
  return (
    <section className="border-b border-stone-200 bg-gradient-to-br from-[#faf9f7] via-white to-stone-100 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Event Guest Count Planner" }]} />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">RSVP & rental planning</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
          Create Your Free Event Guest Count Planner
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-600">
          Track RSVPs, estimate tables and chairs, and keep your rental order accurate before the final count deadline.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/rsvp/create"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-stone-900 px-8 py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:w-auto [font-family:var(--font-display)]"
          >
            Create My Event Link
          </Link>
          <Link
            href="/contact#quote"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border-2 border-stone-900 bg-white px-8 py-3.5 text-center text-base font-semibold text-stone-900 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 sm:w-auto [font-family:var(--font-display)]"
          >
            Talk to Our Event Team
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl border-t border-stone-200 px-4 pb-4 pt-10 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl [font-family:var(--font-display)]">Why hosts use this</h2>
        <ul className="mt-6 space-y-6">
          {benefits.map((b) => (
            <li key={b.title} className="rounded-2xl border border-stone-200 bg-white/90 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-stone-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{b.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#c9a228]/40 bg-[#fffdf8] p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-stone-900">Built for real parties</p>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">
            Built for real parties, weddings, graduations, corporate events, and backyard events across Connecticut. This is a{" "}
            <span className="font-semibold text-stone-900">rental planning tool</span> from {business.name}, not a separate RSVP
            website.
          </p>
          <p className="mt-4 text-xs text-stone-600">
            Everything stays on our site. When you are ready, we connect the numbers to tents, tables, chairs, linens, lighting, dance
            floors, and restroom trailers.
          </p>
        </div>
        <p className="mt-8 text-center text-sm text-stone-600">
          Already started? Open your private dashboard from the link we gave you, or{" "}
          <Link href="/contact#quote" className="font-semibold text-stone-900 underline underline-offset-2">
            contact the team
          </Link>{" "}
          if you misplaced it.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/events" className={bookNowSectionClass}>
            Back to Events hub
          </Link>
        </div>
      </div>
    </section>
  );
}
