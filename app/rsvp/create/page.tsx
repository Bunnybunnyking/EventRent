import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { CreateRsvpWizard } from "@/components/rsvp/create-rsvp-wizard";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Create Event Guest Count Planner",
  description:
    "Set up your Connecticut event page, share an RSVP link with guests, and keep a private dashboard for guest count and rental planning.",
  path: "/rsvp/create",
  ogImage: defaultOgImagePath,
});

export default function RsvpCreatePage() {
  return (
    <section className="border-b border-stone-200 bg-gradient-to-b from-[#faf9f7] to-white py-10 sm:py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Event planner", href: "/rsvp" }, { label: "Create" }]} />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Step-by-step</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
          Create your event page
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600">
          Tell us the basics, pick rental categories you are thinking about, then get your public RSVP link and private host dashboard.
        </p>
        <div className="mt-10">
          <CreateRsvpWizard />
        </div>
      </div>
    </section>
  );
}
