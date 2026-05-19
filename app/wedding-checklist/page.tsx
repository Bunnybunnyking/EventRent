import type { Metadata } from "next";
import Link from "next/link";
import { WeddingChecklistGenerator } from "@/features/wedding-checklist/components/wedding-checklist-generator";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbListSchema } from "@/components/schema";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Wedding checklist generator — outdoor & tent weddings",
  description:
    "Interactive wedding checklist for Connecticut celebrations: full wedding mode or outdoor/tent quick checklist. Pair with tent sizing and Quick Event Planner when you are ready for gear.",
  path: "/wedding-checklist",
  ogImage: defaultOgImagePath,
});

export default function WeddingChecklistPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Party games & tools", path: "/party-games-tools" },
          { name: "Wedding checklist", path: "/wedding-checklist" },
        ]}
      />

      <section className="border-b border-stone-200 bg-gradient-to-b from-[#f6f9f7] to-[#f8f6f2] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Party games & tools", href: "/party-games-tools" },
              { label: "Wedding checklist" },
            ]}
          />
          <header className="mt-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/85">Interactive tool</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-4xl">
              Wedding checklist generator
            </h1>
            <p className="mt-3 text-base leading-relaxed text-stone-600">
              Full wedding checklist and outdoor/tent quick mode for celebrations under canopy. When you need square footage and rental starters, use the{" "}
              <Link
                href="/planning#tent-size-estimator"
                className="font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900"
              >
                tent size tools
              </Link>{" "}
              and{" "}
              <Link
                href="/quick-event-planner"
                className="font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900"
              >
                Quick Event Planner
              </Link>
              .
            </p>
          </header>

          <div className="mt-10">
            <WeddingChecklistGenerator />
          </div>

          <p className="mt-12 text-center text-sm text-stone-600">
            <Link href="/party-games-tools" className="font-semibold text-stone-900 underline underline-offset-2">
              Party games &amp; tools hub
            </Link>{" "}
            ·{" "}
            <Link href="/planning" className="font-semibold text-stone-900 underline underline-offset-2">
              Planning hub
            </Link>{" "}
            ·{" "}
            <Link href="/contact#quote" className="font-semibold text-stone-900 underline underline-offset-2" prefetch={true}>
              Request a quote
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
