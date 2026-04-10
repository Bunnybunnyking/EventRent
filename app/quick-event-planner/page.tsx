import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { QuickEventPlanner } from "@/components/quick-event-planner";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Quick Event Planner | Chairs, Tables, Tent & Setup",
  description:
    "Step through a short planner for your Connecticut event: tent size starting point, chairs, tables, linens, lighting, weather, and more. Use alongside our square-footage calculator on the Planning page.",
  path: "/quick-event-planner",
  ogImage: defaultOgImagePath,
});

export default function QuickEventPlannerPage() {
  return (
    <section className="border-b border-stone-200 bg-gradient-to-b from-[#faf9f7] to-stone-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Planning", href: "/planning" },
            { label: "Quick Event Planner" },
          ]}
        />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Interactive tool</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Quick Event Planner</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">
          Answer a few prompts for a comfortable starting plan. For square-footage ranges only, use the{" "}
          <Link href="/planning#tent-size-estimator" className="font-semibold text-[#8a6218] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
            tent size calculator
          </Link>{" "}
          on the full Planning page.
        </p>
        <div className="mt-10">
          <QuickEventPlanner />
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
