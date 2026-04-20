import Link from "next/link";
import { bookNowSectionClass } from "@/lib/cta-styles";

const cardClass =
  "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-stone-300 hover:shadow-md";

export function TentTypesSection() {
  const types = [
    {
      title: "Frame & clear-span",
      body: "Open interiors without center poles—ideal for rounds, dance floors, and sidewalls. Works across many Connecticut sites when anchoring is planned.",
      footprint: "~100–2,400+ sq ft per single unit (e.g. 10×10 through ~40×60 class); many dinners land ~800–1,400 sq ft before dance and service.",
      guests: "Often ~40–150 seated in mid-size footprints; every layout changes the math.",
    },
    {
      title: "Large event structures",
      body: "High-footprint clear-span for galas, festivals, and big receptions. Anchoring, access, and staging are planned with your venue.",
      footprint: "~3,600–9,000+ sq ft common spans (e.g. 60×60 through 60×150 class); multi-bay totals go higher.",
      guests: "Roughly ~150–500+ guests possible depending on program, staging, and clear height—site survey drives the plan.",
    },
    {
      title: "Expandable & modular",
      body: "Connected bays with gutters for dining, dance, bars, and walkways—one continuous covered plan instead of scattered small tents.",
      footprint: "Typical connected bays ~400–1,800 sq ft each; total sq ft is the sum of linked sections plus gutters.",
      guests: "Common connected layouts ~60–200+ seated; scales up as bays and headcount grow.",
    },
  ];

  return (
    <div id="tent-types" className="scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">What we rent</h2>
      <p className="mt-2 max-w-3xl text-sm leading-snug text-stone-600">
        Your quote ties real inventory to date and layout. Square footage is the geometry; guest counts depend on tables, dance floor, aisles, and service—see the{" "}
        <a href="#tent-resource-tabs" className="font-semibold text-stone-900 underline underline-offset-2">
          guide tab
        </a>{" "}
        for popular footprints and a seating preview table.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {types.map((t) => (
          <div key={t.title} className={`${cardClass} !p-4`}>
            <h3 className="text-sm font-semibold text-stone-900">{t.title}</h3>
            <p className="mt-1.5 text-xs leading-snug text-stone-600 sm:text-sm sm:leading-snug">{t.body}</p>
            <p className="mt-2 border-t border-stone-100 pt-2 text-[11px] font-medium leading-snug text-stone-800 sm:text-xs">
              <span className="text-stone-500">Footprint:</span> {t.footprint}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-stone-600 sm:text-xs">
              <span className="font-medium text-stone-700">Guests (est.):</span> {t.guests}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ModularTentSystemsSection() {
  return (
    <div id="modular-tent-systems" className="scroll-mt-24 mt-8 rounded-xl border border-stone-200 bg-[#faf8f5] p-5 sm:p-6">
      <h2 className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">Modular layouts &amp; gutters</h2>
      <p className="mt-2 max-w-3xl text-sm leading-snug text-stone-700">
        Compatible frame and expansion bays often connect with <strong className="font-semibold text-stone-900">gutters</strong> so seating, dance, bar, and walkways sit under one coordinated roof—better weather continuity and cleaner sight lines than separate tents.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {[
          "Sized to guest count and run of show",
          "Dining, dance, and mingling zones in one plan",
          "Works on split or irregular sites when surveyed",
          "Sidewalls & lighting across the linked footprint",
        ].map((line) => (
          <li key={line} className="flex gap-2 text-xs leading-snug text-stone-700 sm:text-sm">
            <span className="text-[#b78a2d]" aria-hidden>
              ✓
            </span>
            {line}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-stone-600 sm:text-sm">
        <Link href="/rental-inventory" className="font-medium text-stone-800 underline underline-offset-2">
          Inventory
        </Link>
        {" · "}
        <Link href="/contact#quote" className="font-medium text-stone-800 underline underline-offset-2">
          Book a layout consult
        </Link>
      </p>
    </div>
  );
}

export function TentAddOnsSection() {
  const addOns = [
    { label: "Sidewalls & siding", note: "Solid, window, mixed—wind, rain, sun control" },
    { label: "Lighting", note: "String, uplight, packages matched to timeline" },
    { label: "Gutters & links", note: "Modular connected layouts" },
    { label: "Floors & dance", note: "Defined dance areas, leveling" },
    { label: "Tables & chairs", note: "Scaled to service style" },
    { label: "Staging & climate", note: "Elevation, heat/cool as quoted" },
  ];

  return (
    <div id="tent-add-ons" className="scroll-mt-24 mt-8">
      <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">Add-ons that finish the tent</h2>
      <p className="mt-2 max-w-3xl text-sm leading-snug text-stone-600">
        Most events need more than a roof—sidewalls, light, and floor define how the space feels at night and in weather.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {addOns.map((a) => (
          <li key={a.label} className={`${cardClass} !p-3`}>
            <p className="text-sm font-medium text-stone-900">{a.label}</p>
            <p className="mt-0.5 text-xs text-stone-600">{a.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-stone-600 sm:text-sm">
        <Link href="/table-chair-rentals" className="font-medium text-stone-800 underline underline-offset-2">
          Tables &amp; chairs
        </Link>
        {" · "}
        <Link href="/party-packages" className="font-medium text-stone-800 underline underline-offset-2">
          Packages
        </Link>
        {" · "}
        <Link href="/rental-inventory#category-lighting" className="font-medium text-stone-800 underline underline-offset-2">
          Lighting &amp; dance floor
        </Link>
      </p>
    </div>
  );
}

export function TentPageCtaStrip() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-stone-200/80 pt-5 text-sm">
      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Quick</span>
      <Link href="/faq#faq-tent-size" className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-600">
        Tent sizing FAQ
      </Link>
      <span className="text-stone-300" aria-hidden>
        ·
      </span>
      <Link href="/planning" className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-600">
        Planning hub
      </Link>
      <span className="text-stone-300" aria-hidden>
        ·
      </span>
      <Link href="#tent-add-ons" className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-600">
        Add-ons
      </Link>
      <span className="text-stone-300" aria-hidden>
        ·
      </span>
      <Link href="#tent-resource-tabs" className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-600">
        Guide tabs
      </Link>
    </div>
  );
}
