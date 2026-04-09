import Link from "next/link";

const cardClass =
  "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-stone-300 hover:shadow-md";

export function TentTypesSection() {
  const types = [
    {
      title: "Frame tents",
      body: "Clear-span style structures that work well when you need flexible layouts, tighter sites, or the option to connect multiple units. Popular for Connecticut wedding tent rentals, corporate events, and large private parties where flow matters as much as coverage.",
    },
    {
      title: "Larger tent structures",
      body: "High-footprint tents for receptions, galas, and festivals—scaled to guest count, staging, and service areas. We plan anchoring and access with your venue, whether the event is on grass, pavement, or a mixed surface.",
    },
    {
      title: "Expandable & modular layouts",
      body: "Many of our systems are designed to grow with your program: connected sections for dining, dance, bars, and walkways—see modular systems below for how gutters create one continuous covered space.",
    },
    {
      title: "The right fit for your event",
      body: "Guest count, site shape, event type (wedding, graduation, corporate picnic, school function), and weather exposure all steer the recommendation. We help you choose a tent setup that fits the day—not a generic default.",
    },
  ];

  return (
    <div id="tent-types" className="scroll-mt-28">
      <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Types of tent rentals we offer</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600">
        Connecticut tent rentals from our inventory span frame-style structures, larger event tents, and modular expansion options. Here is how we talk about them in planning—your quote ties specific equipment to your date and venue.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {types.map((t) => (
          <div key={t.title} className={cardClass}>
            <h3 className="text-base font-semibold text-stone-900">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ModularTentSystemsSection() {
  return (
    <div id="modular-tent-systems" className="scroll-mt-28 mt-14 rounded-2xl border border-stone-200 bg-[#faf8f5] p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Modular tent systems & expandable layouts</h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-700">
        Many of our tents can be configured to fit the needs of your event. Our frame tents and compatible expansion systems can often be connected together using{" "}
        <strong className="font-semibold text-stone-900">gutter systems</strong>, allowing us to create larger covered spaces for weddings, corporate events, graduations, and private parties across Connecticut.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-700">
        Your setup is not limited to a single footprint. Depending on tent style and site layout, we can connect tents to cover seating, buffet or bar areas, dance floors, staging, or walkways between sections—so guests stay dry and the flow feels intentional. Weather protection and a unified look across connected sections are often easier than treating every zone as a separate tent.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          "Better fit for guest count and program length",
          "Custom layouts for dining, dance, and mingling zones",
          "Flexible options for irregular or split sites",
          "Sidewalls and lighting applied across a connected plan",
        ].map((line) => (
          <li key={line} className="flex gap-2 text-sm text-stone-700">
            <span className="text-[#b78a2d]" aria-hidden>
              ✓
            </span>
            {line}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-stone-600">
        See how inventory supports large layouts in our{" "}
        <Link href="/rental-inventory" className="font-medium text-stone-800 underline underline-offset-2">
          rental inventory overview
        </Link>
        , or jump to{" "}
        <Link href="/contact#quote" className="font-medium text-stone-800 underline underline-offset-2">
          plan your tent setup with a quote
        </Link>
        .
      </p>
    </div>
  );
}

export function TentAddOnsSection() {
  const addOns = [
    { label: "Sidewalls & tent siding", note: "Solid, window, and mixed walls for wind and rain" },
    { label: "Lighting", note: "String, uplighting, and packages to match your tent and timeline" },
    { label: "Gutters & connections", note: "For linked, expandable tent layouts where applicable" },
    { label: "Flooring & dance floors", note: "Define dance areas and level surfaces underfoot" },
    { label: "Tables & chairs", note: "Scaled to guest count and service style" },
    { label: "Staging & accessories", note: "When your program needs elevation or extras" },
    { label: "Heating & cooling comfort", note: "Seasonal options discussed during quoting" },
  ];

  return (
    <div id="tent-add-ons" className="scroll-mt-28 mt-14">
      <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Tent add-ons & completing the space</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600">
        A tent rental is rarely just fabric overhead. We help you complete the space with options that match your event type—so the result feels finished and comfortable, not bare.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {addOns.map((a) => (
          <li key={a.label} className={`${cardClass} !p-4`}>
            <p className="font-medium text-stone-900">{a.label}</p>
            <p className="mt-1 text-xs text-stone-600">{a.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-stone-600">
        Pair seating and dining inventory from our{" "}
        <Link href="/table-chair-rentals" className="font-medium text-stone-800 underline underline-offset-2">
          table and chair rentals
        </Link>
        , explore{" "}
        <Link href="/party-packages" className="font-medium text-stone-800 underline underline-offset-2">
          tent packages
        </Link>{" "}
        as a starting point, or{" "}
        <Link href="/rental-inventory#category-lighting" className="font-medium text-stone-800 underline underline-offset-2">
          view lighting and dance floor
        </Link>{" "}
        in the inventory overview.
      </p>
    </div>
  );
}

export function TentPagePlanningSummary() {
  return (
    <div id="plan-your-tent" className="scroll-mt-28 mt-14 rounded-2xl border border-[#b78a2d]/35 bg-[#111315] p-6 text-stone-100 sm:p-8">
      <h2 className="text-xl font-semibold text-white">Planning-oriented tent rentals in Connecticut</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-300">
        Our tent systems offer more flexibility than a single standard footprint. Many structures—especially frame tents and compatible expansion inventory—can be connected using gutters to create larger covered event spaces. That lets us build custom tent layouts around your guest count, venue, and flow. Layer in sidewalls, lighting, flooring, dance floors, and coordinated{" "}
        <Link href="/table-chair-rentals" className="font-medium text-[#edc16c] underline underline-offset-2 hover:text-white">
          tables and chairs
        </Link>
        , and we help you assemble a complete, comfortable setup—not just a tent in a field.
      </p>
    </div>
  );
}

export function TentPageCtaStrip() {
  return (
    <div className="mt-10 flex flex-col gap-3 border-y border-stone-200 py-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
      <div className="flex flex-wrap gap-2">
        <Link href="/contact#quote" className="rounded-full bg-[#1d2124] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#131517]">
          Request a tent quote
        </Link>
        <Link href="/contact#quote" className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50">
          Plan your tent setup
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/faq#faq-tent-size" className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50">
          Need help with tent size?
        </Link>
        <Link href="/rental-inventory#tent-structures" className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50">
          View tent inventory overview
        </Link>
        <Link href="#tent-add-ons" className="rounded-full border border-[#b78a2d]/50 bg-amber-50/80 px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-amber-100/80">
          Tent add-ons
        </Link>
      </div>
    </div>
  );
}
