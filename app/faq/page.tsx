import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { FaqHelpCenter } from "@/components/faq/faq-help-center";
import { FAQSchema } from "@/components/schema";
import { bookNowSectionClass } from "@/lib/cta-styles";
import { faqCategories } from "@/lib/faq-data";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Party rental help center | FAQs for Connecticut tents & events",
  description:
    "Answers on booking and quotes, tent sizing and types, delivery and setup, weather backup, staking on lawns and pavement, tables and chairs, Connecticut service areas, policies, and pricing—plus links to planning tools.",
  path: "/faq",
});

const resourceLinks = [
  { href: "/planning", label: "Planning hub" },
  { href: "/tent-size-help", label: "Tent size help" },
  { href: "/weather-rain-plan", label: "Rain & weather plan" },
  { href: "/table-chair-rentals", label: "Tables & chairs" },
  { href: "/party-packages", label: "Party packages" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/contact", label: "Contact" },
] as const;

export default function FAQPage() {
  return (
    <section className="py-14">
      <FAQSchema />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Help center / FAQ" }]} />

        <header className="mt-8 text-center sm:text-left">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#a97a21]">
            {business.celebrationTagline}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-[2.5rem]">
            Connecticut party rental help center
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-stone-600 sm:mx-0">
            Straight answers on tents, weather, surfaces, delivery, and booking—whether you are hosting in {business.primaryCity}{" "}
            or anywhere we serve in Connecticut. Search below or jump to a topic.
          </p>
        </header>

        <nav
          aria-label="Popular planning links"
          className="mt-8 flex flex-wrap justify-center gap-2 border-y border-stone-200/90 py-5 sm:justify-start"
        >
          {resourceLinks.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-[#d4c4a0] hover:bg-[#fdfbf7]"
            >
              {r.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10">
          <h2 className="sr-only">Browse by category</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {faqCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`#category-${cat.id}`}
                  className="flex h-full flex-col rounded-2xl border border-stone-200/90 bg-gradient-to-br from-white to-stone-50/80 p-4 shadow-sm transition hover:border-[#e3d3b0] hover:shadow-md"
                >
                  <span className="font-semibold text-stone-900">{cat.title}</span>
                  <span className="mt-1 text-sm leading-snug text-stone-600">{cat.description}</span>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#8f6f28]">Jump to section →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-10">
          <FaqHelpCenter categories={faqCategories} />
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-[#e8dcc4] bg-gradient-to-br from-[#fdfaf4] via-[#faf4e8] to-[#f3e6cc] p-8 shadow-[0_2px_28px_rgba(45,35,20,0.06)] sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)]">
            Ready to size your setup?
          </h2>
          <p className="mt-3 max-w-2xl text-stone-700">
            Tell us your date, town, guest count, and surface type—we will help size the setup and send options that fit your event.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center sm:inline-flex`}>
              <span className="relative z-10">Book consultation</span>
            </Link>
            <Link
              href="/planning"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-stone-700/25 bg-white/80 px-6 py-2.5 text-base font-semibold text-stone-900 shadow-sm transition hover:bg-white"
            >
              Explore planning tools
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
