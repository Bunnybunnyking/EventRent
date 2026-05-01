import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Tent Size & Seating Reference Guide",
  description:
    "Quickly estimate tent sizes and seating for weddings, backyard parties, corporate events, and festivals. Realistic layouts and planning tools included.",
  path: "/tent-seating-reference",
});

const shell = "mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8";

const compactGold =
  "inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-full border-2 border-[#6b5420] bg-gradient-to-b from-[#faf6eb] via-[#e4c96e] to-[#9f7322] px-4 py-2 text-center text-sm font-semibold text-[#1a140c] shadow-sm transition hover:brightness-[1.02] active:scale-[0.99] [font-family:var(--font-display)] sm:px-5";

const compactOutline =
  "inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-full border-2 border-[#c9a24a]/80 bg-[#1a1814] px-4 py-2 text-center text-sm font-semibold text-[#f5e9d2] shadow-sm transition hover:border-[#e4c96e] hover:bg-[#252018] sm:px-5";

const tentRows = [
  { size: "20×20", comfortable: "24–32", eventReady: "20–28", best: "Small backyard" },
  { size: "20×30", comfortable: "32–48", eventReady: "28–40", best: "Showers, small parties" },
  { size: "20×40", comfortable: "48–64", eventReady: "40–56", best: "Backyard events" },
  { size: "30×30", comfortable: "60–85", eventReady: "50–70", best: "Small weddings, grads" },
  { size: "30×45", comfortable: "80–110", eventReady: "70–95", best: "Weddings, corporate" },
  { size: "30×60", comfortable: "110–140", eventReady: "95–120", best: "Larger weddings" },
  { size: "40×40", comfortable: "120–160", eventReady: "100–140", best: "Formal layouts" },
  { size: "40×60", comfortable: "160–220", eventReady: "140–180", best: "Weddings + dance floor" },
  { size: "60×60", comfortable: "240–320", eventReady: "200–260", best: "Large events" },
] as const;

const tableSeatingRows = [
  {
    type: `60" Round Table`,
    typical: `60" round`,
    seating: "6–8 guests",
    use: "Weddings, formal dinners, showers",
  },
  {
    type: `72" Round Table`,
    typical: `72" round`,
    seating: "8–10 guests",
    use: "Larger weddings, banquet layouts",
  },
  {
    type: "6 ft Rectangle Table",
    typical: "6 ft",
    seating: "6 guests",
    use: "Backyard parties, vendor tables, casual seating",
  },
  {
    type: "8 ft Rectangle Table",
    typical: "8 ft",
    seating: "8 guests",
    use: "Graduations, banquets, family-style seating",
  },
  {
    type: `30" Cocktail Table`,
    typical: `30" round`,
    seating: "2–4 standing",
    use: "Cocktail hour, bars, lounges",
  },
  {
    type: "Sweetheart Table",
    typical: "4–6 ft",
    seating: "2 guests",
    use: "Bride and groom, VIP seating",
  },
  {
    type: "Buffet Table",
    typical: "6–8 ft",
    seating: "N/A",
    use: "Food service, gifts, desserts, bars",
  },
] as const;

const linenRows = [
  {
    tableSize: `60" Round`,
    floor: `120" round`,
    mid: `90" round`,
    use: "Weddings, formal dining",
  },
  {
    tableSize: `72" Round`,
    floor: `132" round`,
    mid: `108" round`,
    use: "Large formal layouts",
  },
  {
    tableSize: "6 ft Rectangle",
    floor: "90×132",
    mid: "60×120",
    use: "Banquets, buffets, seating",
  },
  {
    tableSize: "8 ft Rectangle",
    floor: "90×156",
    mid: "60×126",
    use: "Graduations, family-style seating",
  },
  {
    tableSize: `30" Cocktail Table`,
    floor: `120" round`,
    mid: `90" round`,
    use: "Cocktail hour, bar areas",
  },
] as const;

const quickTableLinenTips = [
  "Round tables feel more formal and social.",
  "Rectangle tables maximize seating and work well for casual events.",
  "Buffet tables need extra room for service lines.",
  "Floor-length linens look more polished for weddings.",
  "Mid-drop linens are practical for outdoor and casual events.",
  "Always allow space for walkways, chairs, and servers.",
] as const;

const sizingRules = [
  { title: "Buffet lines", line: "Add square footage so guests and staff are not squeezing past seated tables." },
  { title: "Bar service", line: "Bars need queue space and ice storage; plan an extra pocket off the main floor." },
  { title: "Dance floor", line: "Dancing pulls capacity out of seated rows—size the tent for both at once." },
  { title: "Walkways", line: "Aisles to restrooms, house, and parking keep flow safe when it gets busy." },
  { title: "Weather", line: "Sidewalls and rain plans feel better with a little extra breathing room." },
  { title: "Formal seating", line: "Assigned rounds and head tables use more space per guest than casual layouts." },
] as const;

const toolCards = [
  {
    title: "Tent Size Calculator",
    body: "Estimate the right tent size from guest count and layout.",
    href: "/planning#tent-size-estimator",
    cta: "Start tool",
  },
  {
    title: "Layout Builder",
    body: "Walk tables, chairs, buffet, and flow in a short guided planner.",
    href: "/quick-event-planner",
    cta: "Open layout tool",
  },
  {
    title: "Site Readiness Check",
    body: "Power, access, lawn, and timing before the truck rolls.",
    href: "/backyard-party-checklist",
    cta: "Check site",
  },
  {
    title: "Wishlist Builder",
    body: "Save tents, tables, and chairs from the live catalog.",
    href: "/wishlist",
    cta: "Build wishlist",
  },
] as const;

const exampleLayouts = [
  { title: "30×30 layout", blurb: "Ceremony flip or compact seated dinner." },
  { title: "30×60 wedding", blurb: "Dinner, head table, and service aisles." },
  { title: "40×60 + dance", blurb: "Band or DJ, floor, and bar off the main span." },
] as const;

function callAction() {
  const raw = business.phone?.trim() ?? "";
  if (!raw || raw.includes("INSERT")) {
    return { href: "/contact#quote" as const, label: "Contact us" as const };
  }
  return { href: business.phoneHref, label: "Call us" as const };
}

/** Black + gold chart shell: dark title bar, light data well. */
function ReferenceChartSection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="py-4 sm:py-5" aria-labelledby={id}>
      <div className="overflow-hidden rounded-xl border-2 border-[#8a7028]/55 shadow-[0_10px_36px_-10px_rgba(15,12,8,0.45)] ring-1 ring-black/20">
        <div className="border-b border-[#c9a24a]/30 bg-gradient-to-r from-[#0f0e0c] via-[#1a1612] to-[#0f0e0c] px-4 py-3 sm:px-5 sm:py-3.5">
          <h2 id={id} className="text-lg font-semibold tracking-tight text-[#faf6eb] sm:text-xl [font-family:var(--font-display)]">
            {title}
          </h2>
          <p className="mt-1.5 text-sm leading-snug text-stone-400">{intro}</p>
        </div>
        <div className="bg-[#fdfcfa]">{children}</div>
      </div>
    </section>
  );
}

function SectionTitleLight({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl [font-family:var(--font-display)]">
      {children}
    </h2>
  );
}

export default function TentSeatingReferencePage() {
  const call = callAction();

  return (
    <div className="min-h-screen bg-[#ebe8e2] text-stone-800">
      <div className={shell}>
        <Breadcrumb
          className="mb-0 border-b border-stone-300/80 pb-3 text-sm text-stone-600 [&_a]:font-medium [&_a]:text-[#8a6418] hover:[&_a]:text-stone-900"
          items={[{ label: "Home", href: "/" }, { label: "Tent & seating reference" }]}
        />

        {/* Elegant intro strip */}
        <header className="mt-4 overflow-hidden rounded-xl border-2 border-[#9a7a45]/60 bg-gradient-to-br from-[#141210] via-[#1c1814] to-[#0f0e0c] px-4 py-5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4)] sm:px-6 sm:py-6">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#d4af48]">Reference</p>
          <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-[#faf6eb] sm:text-3xl [font-family:var(--font-display)]">
            Tent &amp; seating reference
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-snug text-stone-400 sm:text-[0.9375rem]">
            Ballpark tents, tables, and linens from real Connecticut events—then open tools or your wishlist.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
            <Link href="/planning-tools" prefetch={true} className={compactGold}>
              Planning tools
            </Link>
            <Link href="/wishlist" prefetch={true} className={compactOutline}>
              Wishlist
            </Link>
            <a href={call.href} className={compactGold}>
              {call.label}
            </a>
          </div>
        </header>

        {/* 1 — Tent chart FIRST */}
        <ReferenceChartSection
          id="tsr-tent-heading"
          title="Tent Size & Seating Guide"
          intro="Realistic ranges from actual layouts. Counts shift with spacing, buffets, bars, and dance floors. When in doubt, size up."
        >
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#2a2418] bg-[#1a1612] text-[0.65rem] font-semibold uppercase tracking-wider text-[#e4c96e]">
                  <th className="px-3 py-2.5">Tent size</th>
                  <th className="px-3 py-2.5">Comfortable seated</th>
                  <th className="px-3 py-2.5">Event-ready (buffet / bar)</th>
                  <th className="px-3 py-2.5">Best use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/90">
                {tentRows.map((r) => (
                  <tr key={r.size} className="bg-white/90 hover:bg-amber-50/40">
                    <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-stone-900">{r.size}</td>
                    <td className="px-3 py-2.5 tabular-nums text-stone-700">{r.comfortable}</td>
                    <td className="px-3 py-2.5 tabular-nums text-stone-700">{r.eventReady}</td>
                    <td className="px-3 py-2.5 text-stone-600">{r.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-2.5 p-3 sm:p-4 md:hidden">
            {tentRows.map((r) => (
              <div
                key={r.size}
                className="rounded-lg border border-[#2a2418]/20 bg-white/95 p-3.5 shadow-sm [box-shadow:inset_3px_0_0_0_#c9a24a]"
              >
                <p className="text-base font-semibold text-stone-900 [font-family:var(--font-display)]">{r.size}</p>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                    <dt className="text-stone-500">Comfortable seated</dt>
                    <dd className="tabular-nums font-medium text-stone-800">{r.comfortable}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                    <dt className="text-stone-500">Event-ready</dt>
                    <dd className="tabular-nums font-medium text-stone-800">{r.eventReady}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Best use</dt>
                    <dd className="mt-0.5 text-stone-700">{r.best}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </ReferenceChartSection>

        {/* 2 — Table & seating directly under tent chart */}
        <ReferenceChartSection
          id="tsr-table-seating-heading"
          title="Table & Seating Guide"
          intro="Seating counts depend on spacing, chair type, and layout style. These are realistic comfortable ranges used for event planning."
        >
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#2a2418] bg-[#1a1612] text-[0.65rem] font-semibold uppercase tracking-wider text-[#e4c96e]">
                  <th className="px-3 py-2.5">Table type</th>
                  <th className="px-3 py-2.5">Typical size</th>
                  <th className="px-3 py-2.5">Comfortable seating</th>
                  <th className="px-3 py-2.5">Best use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/90">
                {tableSeatingRows.map((r) => (
                  <tr key={r.type} className="bg-white/90 hover:bg-amber-50/40">
                    <td className="px-3 py-2.5 font-semibold text-stone-900">{r.type}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-stone-700">{r.typical}</td>
                    <td className="px-3 py-2.5 text-stone-700">{r.seating}</td>
                    <td className="px-3 py-2.5 text-stone-600">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-2.5 p-3 sm:p-4 md:hidden">
            {tableSeatingRows.map((r) => (
              <div
                key={r.type}
                className="rounded-lg border border-[#2a2418]/20 bg-white/95 p-3.5 shadow-sm [box-shadow:inset_3px_0_0_0_#c9a24a]"
              >
                <p className="text-base font-semibold text-stone-900 [font-family:var(--font-display)]">{r.type}</p>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                    <dt className="text-stone-500">Typical size</dt>
                    <dd className="font-medium text-stone-800">{r.typical}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                    <dt className="text-stone-500">Comfortable seating</dt>
                    <dd className="text-right font-medium text-stone-800">{r.seating}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Best use</dt>
                    <dd className="mt-0.5 text-stone-700">{r.use}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </ReferenceChartSection>

        {/* 3 — Linen chart directly under table guide */}
        <ReferenceChartSection
          id="tsr-linen-heading"
          title="Linen Size Guide"
          intro="Floor-length linens create a formal look and reach near the ground. Mid-drop linens are more casual, cost-effective, and easier for outdoor events."
        >
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#2a2418] bg-[#1a1612] text-[0.65rem] font-semibold uppercase tracking-wider text-[#e4c96e]">
                  <th className="px-3 py-2.5">Table size</th>
                  <th className="px-3 py-2.5">Floor-length linen</th>
                  <th className="px-3 py-2.5">Mid-drop linen</th>
                  <th className="px-3 py-2.5">Best use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/90">
                {linenRows.map((r) => (
                  <tr key={r.tableSize} className="bg-white/90 hover:bg-amber-50/40">
                    <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-stone-900">{r.tableSize}</td>
                    <td className="px-3 py-2.5 font-medium text-stone-800">{r.floor}</td>
                    <td className="px-3 py-2.5 font-medium text-stone-800">{r.mid}</td>
                    <td className="px-3 py-2.5 text-stone-600">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-2.5 p-3 sm:p-4 md:hidden">
            {linenRows.map((r) => (
              <div
                key={r.tableSize}
                className="rounded-lg border border-[#2a2418]/20 bg-white/95 p-3.5 shadow-sm [box-shadow:inset_3px_0_0_0_#c9a24a]"
              >
                <p className="text-base font-semibold text-stone-900 [font-family:var(--font-display)]">{r.tableSize}</p>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                    <dt className="text-stone-500">Floor-length</dt>
                    <dd className="font-medium text-stone-800">{r.floor}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-stone-100 pb-1.5">
                    <dt className="text-stone-500">Mid-drop</dt>
                    <dd className="font-medium text-stone-800">{r.mid}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Best use</dt>
                    <dd className="mt-0.5 text-stone-700">{r.use}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </ReferenceChartSection>

        {/* 4 — Quick tips under both new charts */}
        <section className="py-5 sm:py-6" aria-labelledby="tsr-quick-tips-heading">
          <div className="overflow-hidden rounded-xl border border-[#8a7028]/40 bg-[#faf8f5] shadow-sm">
            <div className="border-b border-stone-200/90 bg-gradient-to-r from-[#1a1612] to-[#141210] px-4 py-3 sm:px-5">
              <h2
                id="tsr-quick-tips-heading"
                className="text-lg font-semibold tracking-tight text-[#faf6eb] sm:text-xl [font-family:var(--font-display)]"
              >
                Quick Table & Linen Tips
              </h2>
            </div>
            <ul className="grid gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4">
              {quickTableLinenTips.map((tip) => (
                <li
                  key={tip}
                  className="flex gap-2 rounded-lg border border-stone-200/80 bg-white px-3 py-2.5 text-sm leading-snug text-stone-700 shadow-sm [box-shadow:inset_2px_0_0_0_#c9a24a/80]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7a45]" aria-hidden />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Planning tools */}
        <section className="border-t border-stone-300/80 py-6 sm:py-8" aria-labelledby="tsr-tools-heading">
          <SectionTitleLight id="tsr-tools-heading">Start with your event details</SectionTitleLight>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {toolCards.map((c) => (
              <div
                key={c.title}
                className="flex flex-col rounded-xl border border-stone-300/90 bg-white p-4 shadow-sm sm:p-5"
              >
                <h3 className="text-base font-semibold text-stone-900 [font-family:var(--font-display)]">{c.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-snug text-stone-600">{c.body}</p>
                <Link
                  href={c.href}
                  prefetch={true}
                  className="mt-3 inline-flex min-h-[38px] items-center justify-center self-start rounded-full border border-[#6b5420] bg-gradient-to-b from-[#faf6eb] to-[#d4b060] px-3.5 text-xs font-semibold uppercase tracking-wide text-[#1a140c] transition hover:brightness-[1.03] [font-family:var(--font-display)]"
                >
                  {c.cta} <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Tent sizing rules */}
        <section className="border-t border-stone-300/80 py-6 sm:py-8" aria-labelledby="tsr-rules-heading">
          <SectionTitleLight id="tsr-rules-heading">How to choose the right tent size</SectionTitleLight>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {sizingRules.map((r) => (
              <div
                key={r.title}
                className="rounded-lg border border-[#2a2418]/15 bg-white px-3.5 py-2.5 shadow-sm [box-shadow:inset_0_-1px_0_0_rgba(201,162,74,0.15)]"
              >
                <h3 className="text-sm font-semibold text-[#5c4518]">{r.title}</h3>
                <p className="mt-1 text-sm leading-snug text-stone-600">{r.line}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example layouts */}
        <section className="border-t border-stone-300/80 py-6 sm:py-8" aria-labelledby="tsr-examples-heading">
          <SectionTitleLight id="tsr-examples-heading">Example layouts</SectionTitleLight>
          <p className="mt-1 text-xs text-stone-500">Floor plans or photos can go here when you have them.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {exampleLayouts.map((ex) => (
              <div
                key={ex.title}
                className="flex min-h-[7rem] flex-col rounded-xl border border-dashed border-[#9a7a45]/50 bg-[#faf8f5] p-3.5"
              >
                {/* TODO: replace with floor-plan image or diagram when assets are ready */}
                <h3 className="text-sm font-semibold text-stone-900 [font-family:var(--font-display)]">{ex.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-stone-600">{ex.blurb}</p>
                <span className="mt-2 text-[0.65rem] font-medium uppercase tracking-wider text-[#8a6d3a]">Coming soon</span>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="mb-8 overflow-hidden rounded-xl border-2 border-[#9a7a45]/55 bg-gradient-to-br from-[#141210] via-[#1c1814] to-[#0f0e0c] px-4 py-5 text-center shadow-[0_10px_36px_-10px_rgba(0,0,0,0.4)] sm:mb-10 sm:px-6 sm:py-6"
          aria-labelledby="tsr-final-cta"
        >
          <h2 id="tsr-final-cta" className="text-lg font-semibold text-[#faf6eb] [font-family:var(--font-display)] sm:text-xl">
            Ready for the next step?
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-stone-400">Jump into tools or the wishlist, or reach out for your date.</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Link href="/planning-tools" prefetch={true} className={compactGold}>
              Planning tools
            </Link>
            <Link href="/wishlist" prefetch={true} className={compactOutline}>
              Wishlist
            </Link>
            <a href={call.href} className={compactGold}>
              {call.label}
            </a>
          </div>
        </section>

        {/* Internal links */}
        <nav className="border-t border-stone-300/80 pb-8 pt-5 text-center text-sm text-stone-600" aria-label="Related pages">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-stone-500">Also helpful</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-2">
            <li>
              <Link
                href="/planning"
                className="font-medium text-[#6b5420] underline decoration-amber-200/90 underline-offset-4 hover:text-stone-900"
              >
                Planning hub
              </Link>
            </li>
            <li>
              <Link
                href="/planning-tools"
                className="font-medium text-[#6b5420] underline decoration-amber-200/90 underline-offset-4 hover:text-stone-900"
              >
                Planning tools
              </Link>
            </li>
            <li>
              <Link
                href="/tent-rentals"
                className="font-medium text-[#6b5420] underline decoration-amber-200/90 underline-offset-4 hover:text-stone-900"
              >
                Tent rentals
              </Link>
            </li>
            <li>
              <Link
                href="/table-chair-rentals"
                className="font-medium text-[#6b5420] underline decoration-amber-200/90 underline-offset-4 hover:text-stone-900"
              >
                Tables &amp; chairs
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="font-medium text-[#6b5420] underline decoration-amber-200/90 underline-offset-4 hover:text-stone-900"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
