import type { Metadata } from "next";
import Link from "next/link";
import { BackyardPartyChecklistGenerator } from "@/components/backyard-party-checklist-generator";
import { Breadcrumb } from "@/components/breadcrumb";
import { FAQAccordion } from "@/components/faq-accordion";
import { BreadcrumbListSchema, FAQSchemaItems, ServiceSchema } from "@/components/schema";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "Backyard Party Tent Planning in Connecticut | Space, Layout & Rentals", description:
    "Practical help for homeowners: whether your yard can host a tent, what surface and access details matter, typical rentals with backyard setups, comfort and weather planning, and what to do next. Includes an interactive checklist.", path: "/backyard-party-checklist", ogImage: defaultOgImagePath, });

const goldCardClass =
  "rounded-2xl border border-[#e3d3b0]/90 bg-gradient-to-br from-[#fdf8ed] via-[#faf1dc] to-[#f2e4c4] p-5 shadow-[0_2px_20px_rgba(45,35,20,0.06)] ring-1 ring-[#d4c4a0]/25 transition hover:border-[#d4c4a0] hover:shadow-[0_4px_24px_rgba(45,35,20,0.07)]";

const goldListPanelClass =
  "mt-4 rounded-2xl border border-[#e3d3b0]/55 bg-gradient-to-br from-[#fffefb] to-[#f5ebe0]/90 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]";

const spaceCheckItems = [
  {
    title: "Flat usable area", body: "Measure the lawn or patio you can actually clear for stakes or ballast, not just “the whole yard.” Slopes, flower beds, and playsets shrink the real footprint fast.", }, {
    title: "Surface type", body: "Grass, gravel, patio stone, and mixed surfaces each change anchoring and chair stability. Soft ground after rain needs honest talk about flooring or timing.", }, {
    title: "Obstacles and utilities", body: "Trees, fences, pools, septic fields, irrigation heads, and low wires limit where peaks and guy lines can go. Photos from each corner save a second site visit.", }, {
    title: "Access for trucks and crew", body: "Gate width, fence panels, steps, and how far gear travels from the curb matter as much as square footage. If we cannot reach the spot, the tent math does not help.", }, ] as const;

const layoutFlowItems = [
  {
    title: "Guest count and how people eat", body: "Seated dinner, buffet, or mostly standing with a few tables each need different depth around food and drink. Name the plan before you pick a tent size.", }, {
    title: "Zones at home", body: "Dining, bar or drink table, dessert, dancing or open floor, and a kids’ corner all compete for the same lawn unless you sequence time or split space on purpose.", }, {
    title: "House tie in", body: "Kitchen handoff, outlet use, and keeping wet feet off finished floors are part of the flow plan, not afterthoughts.", }, ] as const;

const rentalPairings = [
  "Tent sized to real usable space, not the whole property line.", "Tables and chairs matched to seated vs cocktail style.", "Buffet or serving depth if you are not plating inside.", "Lighting when the party runs past sunset on a tree lined lot.", "Sidewalls, fans, or heaters when weather or bugs could pull guests indoors early.", ] as const;

const weatherComfortBullets = [
  "Sun and heat: shade under the canopy keeps food and guests in better shape through long afternoon blocks.", "Rain and breeze: panels, gutters between tents, and a simple backup plan so you are not watching the radar alone.", "Evening at home: string or wash lighting so steps, stakes, and guy lines stay visible for guests leaving after dark.", ] as const;

const siteAccessBullets = [
  "When the crew can arrive and how late breakdown can run with neighbors and town noise in mind.", "Parking on street vs driveway, and a clear path that avoids sprinkler heads and soft trenches.", "Grills, fryers, and open flame stay outside guest tent lines, same as any professional outdoor setup.", ] as const;

const backyardFaqItems = [
  {
    id: "by-small-yard", question: "Our yard is not huge. Can a tent still work?", answer:
      "Often yes, with honest measurements and a layout that matches how you eat and mingle. Sometimes the right answer is one modest tent plus using the deck or garage for part of the program, or timing seated dinner in shifts. Send photos and rough dimensions and we will tell you what is realistic for your date.", }, {
    id: "by-surface", question: "We have a patio and grass. Does that change anything?", answer:
      "Yes. Mixed surfaces may mean ballast on hardscape and stakes in lawn, with transitions planned so guests do not trip at the edge of the floor. We plan anchoring before we promise a span.", }, {
    id: "by-rentals", question: "What do most backyard hosts rent beyond the tent?", answer:
      "Tables and chairs sized to your service style, lighting for evening, sometimes portable flooring on soft lawns, sidewalls or fans for comfort, and occasionally a small satellite cover for bar or DJ if you do not want those under the main dining tent.", }, {
    id: "by-calculator", question: "Where do I get tent size numbers?", answer:
      "Use the tent size calculator and Quick Event Planner on our planning page once you have a rough headcount and layout idea. This checklist page focuses on readiness and easy to miss details at home, then links you to those tools for math.", }, {
    id: "by-unsure", question: "We still do not know if our space fits. What should we do?", answer:
      "Call us. A short phone walkthrough with your guest plan and a few photos is usually enough to say what is likely to work, what needs a site look, and what to measure next.", }, ] as const;

const faqSchemaItems = backyardFaqItems.map(({ question, answer }) => ({ question, answer }));

export default function BackyardPartyChecklistPage() {
  return (
    <>
      <ServiceSchema
        name="Backyard and private party tent planning in Connecticut"
        description="Tent rentals and planning support for Connecticut homeowners: yard fit, layout, tables and chairs, weather comfort, access and setup, plus an interactive backyard party checklist."
        path="/backyard-party-checklist"
      />
      <FAQSchemaItems items={faqSchemaItems} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Planning", path: "/planning" }, { name: "Backyard party checklist", path: "/backyard-party-checklist" }, ]}
      />

      <section className="border-b border-stone-200 bg-gradient-to-b from-[#faf9f7] to-white py-8 sm:py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" }, { label: "Planning", href: "/planning" }, { label: "Backyard party checklist" }, ]}
          />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Connecticut, private property and backyard events</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
            Backyard tent planning when the party is at your house
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
            You already picked the guest list and the date. The open questions are usually the same: whether the lawn or patio can hold the program you want, how guests will move from cars to food to hanging out, and what rentals make the day comfortable without turning your yard into a construction zone.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            This page walks through yard fit, flow, weather, and typical rental pairings for home events in Connecticut, then drops you into our{" "}
            <span className="font-semibold text-stone-800">interactive checklist</span> below for the details people forget. For square footage ranges and starter packages, use the{" "}
            <Link href="/planning#tent-size-estimator" className="font-semibold text-[#6b5420] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
              tent size calculator
            </Link>{" "}
            and{" "}
            <Link href="/planning#quick-event-planner" className="font-semibold text-[#6b5420] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
              Quick Event Planner
            </Link>{" "}
            on the planning hub.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={business.phoneHref} className={`${callNowSectionClass} justify-center text-center sm:inline-flex`}>
              Call if you are unsure about space
            </a>
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center sm:inline-flex`} prefetch={true}>
              Send photos and guest count
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Is your space right for a tented event?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Tents need honest flat area, safe anchoring, and a path for setup. Start with what you can actually clear for one day, then compare that to how guests will use the space.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {spaceCheckItems.map((c) => (
              <div key={c.title} className={goldCardClass}>
                <h3 className="text-sm font-bold text-black">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50/80 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Backyard layout and guest flow
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            At home, the tent should make the day easier to host, not harder to walk through. Count guests, name how you are serving food, and decide where people stand vs sit before you fall in love with a tent size.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {layoutFlowItems.map((c) => (
              <div key={c.title} className={goldCardClass}>
                <h3 className="text-sm font-bold text-black">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Common rental combinations at home
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Every yard is different. These lines show up on most private property quotes once the flow is clear, before optional fun add ons.
          </p>
          <div className={`${goldListPanelClass} max-w-3xl`}>
            <ul className="space-y-2 text-sm leading-relaxed text-stone-800">
              {rentalPairings.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm text-stone-600">
            Deeper layout reads:{" "}
            <Link
              href="/party-guides/backyard-party-checklist-connecticut"
              className="font-semibold text-[#6b5420] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900"
            >
              Backyard party checklist (party guide)
            </Link>{" "}
            and{" "}
            <Link href="/rental-inventory" className="font-semibold text-[#6b5420] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
              rental inventory
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50/80 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Comfort and weather planning
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Connecticut backyards can swing from strong sun to a quick shower. A tent is shade and structure, not only rain insurance. Plan comfort the way you would for guests on your porch, just at larger scale.
          </p>
          <div className={`${goldListPanelClass} max-w-3xl`}>
            <ul className="space-y-2 text-sm leading-relaxed text-stone-800">
              {weatherComfortBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Site access and setup needs
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Professional setup means trucks, cart paths, and crew time on your property. Clear rules up front keep neighbors and your schedule happier.
          </p>
          <div className={`${goldListPanelClass} max-w-3xl`}>
            <ul className="space-y-2 text-sm leading-relaxed text-stone-800">
              {siteAccessBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-gradient-to-b from-[#faf9f7] to-stone-50 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="max-w-3xl border-b border-[#e3d3b0]/70 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Interactive tool</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-3xl">
              Backyard and private party checklist generator
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
              Three short steps: event basics, setup and site details, then a check off list you can share with family or co hosts. It does not replace tent sizing, it catches the home party details people skip when they only think about tables and chairs.
            </p>
          </header>
          <div className="mt-8 rounded-2xl border border-[#e3d3b0]/80 bg-white/90 p-4 shadow-sm sm:p-6">
            <BackyardPartyChecklistGenerator />
          </div>
          <p className="mt-8 text-center text-sm text-stone-600">
            <Link href="/planning" className="font-semibold text-[#6b5420] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
              Full planning hub
            </Link>{" "}
            ·{" "}
            <Link href="/faq#faq-backyard-party" className="font-semibold text-[#6b5420] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900">
              Backyard FAQ
            </Link>{" "}
            ·{" "}
            <Link href="/contact#quote" className="font-semibold text-[#6b5420] underline decoration-[#d4b87a] underline-offset-2 hover:text-stone-900" prefetch={true}>
              Request a quote
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-8 sm:py-10" aria-labelledby="by-faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 id="by-faq-heading" className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Backyard party FAQs
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">Straight answers for hosts planning at home in Connecticut.</p>
          <div className="mt-6">
            <FAQAccordion items={[...backyardFaqItems]} variant="gold" />
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#111315] py-10 text-stone-100 sm:py-12" aria-labelledby="by-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d4a84b]">Not sure the yard will work?</p>
          <h2 id="by-cta-heading" className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl [font-family:var(--font-display)]">
            Call and describe your space
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-300 sm:text-base">
            Tell us town, rough guest count, seated vs mingling, and what you are worried about (slope, gate, pool, septic). We will say what usually fits, what needs photos or a quick look, and what to measure before we quote.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a href={business.phoneHref} className={`${callNowSectionClass} justify-center px-8`}>
              Call {business.phone}
            </a>
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center px-8`} prefetch={true}>
              Email photos and layout notes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
