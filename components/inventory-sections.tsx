import Link from "next/link";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { business } from "@/lib/site-data";
import {
  inventoryDisclaimer,
  inventoryOverviewGroups,
  popularRentalCategories,
  type InventoryCategory,
} from "@/lib/inventory-data";
import { SectionHeading } from "@/components/sections";

function formatQty(item: { quantity?: number; quantityNote?: string }) {
  if (item.quantityNote) return item.quantityNote;
  if (item.quantity !== undefined) return item.quantity.toLocaleString();
  return "Varies";
}

function InventoryCategoryCard({ category }: { category: InventoryCategory }) {
  return (
    <div
      id={`category-${category.id}`}
      className="scroll-mt-28 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm transition hover:border-stone-300 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold tracking-tight text-stone-900">{category.title}</h3>
      {category.description ? <p className="mt-1.5 text-xs leading-relaxed text-stone-500">{category.description}</p> : null}
      {category.overviewOnly ? (
        <p className="mt-4 text-sm font-medium text-stone-700">Large rental selection; exact counts confirmed on your quote.</p>
      ) : (
        <ul className="mt-4 space-y-2 border-t border-stone-100 pt-4">
          {category.items.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
              <span className="text-stone-700">{item.label}</span>
              <span className="shrink-0 tabular-nums font-semibold text-stone-900">{formatQty(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** “More than tents”: breadth of Connecticut event rentals */
export function WhatWeOfferSection() {
  const pillars = [
    {
      title: "Tent rentals & large structures",
      body: "Frame tents and larger builds for weddings, company events, festivals, and big guest lists. We plan anchoring for grass or pavement so you are not guessing on install day.",
    },
    {
      title: "Tables & chairs at scale",
      body: "Round, banquet, and high-top tables with plastic and padded chairs for ceremonies, dinner, and buffet lines that actually flow.",
    },
    {
      title: "Dance floors, lighting & siding",
      body: "Dance floor, lights, and sidewalls so the tent feels like a room, not a last-minute tarp.",
    },
    {
      title: "Yard games, bounce houses & add-ons",
      body: "Games and bounce houses for backyards, schools, and town events. Bundle with a tent when you want one order and one crew to think about.",
    },
  ];

  return (
    <section className="border-y border-stone-200 bg-[#faf8f5] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Connecticut event rentals"
          title="More than tents: full rental depth"
          intro={`${business.name} is not only tents. Structures, seating, tables, lighting, sidewalls, and the extras people forget, from small yards to full field setups.`}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-stone-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-stone-600">
          Backyard parties, weddings, company events, schools, and festivals across {business.state}. One team, clear communication, delivery and setup included.
        </p>
      </div>
    </section>
  );
}

export function InventoryOverviewSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`py-16 ${compact ? "" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Rental inventory overview"
          title="Extensive Connecticut inventory, planned around your guest count"
          intro="High-capacity tents, tables, and chairs for Connecticut events. The overview below helps you plan; what is available always ties to your date and our schedule."
        />
        <p className="mx-auto mt-4 max-w-3xl rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-center text-xs leading-relaxed text-amber-950/90">
          {inventoryDisclaimer}
        </p>

        <div className="mt-12 space-y-14">
          {inventoryOverviewGroups.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-28">
              <h2 className="border-b border-stone-200 pb-2 text-xl font-semibold tracking-tight text-stone-900">{group.title}</h2>
              {group.description ? (
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-stone-600">{group.description}</p>
              ) : null}
              <div
                className={`mt-6 grid gap-4 ${
                  group.categories.length > 1 ? "lg:grid-cols-2" : ""
                } ${compact ? "md:grid-cols-2" : "lg:grid-cols-2"}`}
              >
                {group.categories.map((cat) => (
                  <InventoryCategoryCard key={cat.id} category={cat} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-stone-100 pt-10">
          <Link href="/contact#quote" className={bookNowSectionClass}>
            Book Now
          </Link>
          <Link
            href="/wishlist"
            className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400"
          >
            Build your rental list
          </Link>
          <Link
            href="/tent-rentals#modular-tent-systems"
            className="rounded-full border border-[#b78a2d] bg-[#b78a2d]/10 px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-[#b78a2d]/20"
          >
            Expandable tent layouts
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PopularRentalCategoriesSection() {
  return (
    <section className="border-t border-stone-200 bg-[#111315] py-16 text-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#edc16c]">Start here</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Popular rental categories</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-400">
            Pick what matches your event, then ask for a quote with inventory locked to your date.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularRentalCategories.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group rounded-2xl border border-stone-700 bg-[#1a1d21] p-5 transition hover:border-[#b78a2d]/80 hover:bg-[#22262b]"
            >
              <h3 className="text-base font-semibold text-white group-hover:text-[#f5e0b3]">{card.title}</h3>
              <p className="mt-2 text-sm text-stone-400">{card.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-[#c9a24a]">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuoteWorkflowSection() {
  const steps = [
    { title: "Your date & town", text: "Lock the when and where so we can check schedule and routing." },
    { title: "Guest count & event type", text: "Wedding, company, school, backyard, or festival: each one changes layout and what you rent." },
    { title: "What you need", text: "Tent size, tables, chairs, lighting, siding, dance floor, games. Tell us what matters most and we help with the rest." },
    { title: "Custom quote", text: "You receive a clear line-item plan you can adjust before we reserve gear for your day." },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quote workflow"
          title="Plan your event, then we build the rental list"
          intro="This is how we work through a quote with you: date and place first, then headcount and event type, then the gear list. Nothing vague when you are ready to book."
        />
        <ol className="mt-10 space-y-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="flex gap-4 rounded-2xl border border-stone-200 bg-stone-50/80 p-5 md:items-center md:gap-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1d2124] text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-stone-900">{s.title}</h3>
                <p className="mt-1 text-sm text-stone-600">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/contact#quote" className={bookNowSectionClass}>
            Book Now
          </Link>
          <Link href="/rental-inventory" className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50">
            View full inventory overview
          </Link>
          <Link href="/tent-rentals" className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50">
            Tent rental options
          </Link>
        </div>
      </div>
    </section>
  );
}
