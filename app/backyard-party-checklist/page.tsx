import type { Metadata } from "next";
import Link from "next/link";
import { BackyardPartyChecklistGenerator } from "@/components/backyard-party-checklist-generator";
import { Breadcrumb } from "@/components/breadcrumb";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Backyard & Private Party Checklist Generator | Planning Readiness",
  description:
    "Short questions, then a check-off readiness list for backyard and private parties, with optional add-on ideas on select lines. Use our tent calculator and planner for sizing and layouts.",
  path: "/backyard-party-checklist",
  ogImage: defaultOgImagePath,
});

export default function BackyardPartyChecklistPage() {
  return (
    <section className="border-b border-stone-200 bg-gradient-to-b from-[#f7fdf9] to-stone-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Planning", href: "/planning" },
            { label: "Backyard party checklist" },
          ]}
        />
        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/85">Embedded tool</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Backyard &amp; private party checklist generator
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            Think through readiness, guest comfort, and easy-to-miss details, not tent dimensions or full layouts. For square footage and rental starter plans, use the{" "}
            <Link href="/planning#tent-size-estimator" className="font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
              tent size calculator
            </Link>{" "}
            and{" "}
            <Link href="/planning#quick-event-planner" className="font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
              Quick Event Planner
            </Link>{" "}
            on the main planning page.
          </p>
        </header>
        <div className="mt-10">
          <BackyardPartyChecklistGenerator />
        </div>
        <p className="mt-10 text-center text-sm text-stone-600">
          <Link href="/planning" className="font-semibold text-stone-900 underline underline-offset-2">
            Full planning guide
          </Link>{" "}
          ·{" "}
          <Link href="/contact#quote" className="font-semibold text-stone-900 underline underline-offset-2" prefetch={true}>
            Request a quote
          </Link>
        </p>
      </div>
    </section>
  );
}
