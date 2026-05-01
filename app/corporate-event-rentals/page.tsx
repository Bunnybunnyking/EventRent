import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { FAQAccordion } from "@/components/faq-accordion";
import { BreadcrumbListSchema, FAQSchemaItems, ServiceSchema } from "@/components/schema";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Connecticut Corporate Tent Rentals | Outdoor Company & Client Events", description:
    "Tents and rentals for Connecticut company events: employee gatherings, client hospitality, outdoor presentations, launches, and appreciation programs. Layout, flow, weather backup, and setup planning with an experienced crew.", path: "/corporate-event-rentals",
});

/** Gold cream panels, aligned with planning priority bubbles / site palette */
const goldCardClass =
  "rounded-2xl border border-[#e3d3b0]/90 bg-gradient-to-br from-[#fdf8ed] via-[#faf1dc] to-[#f2e4c4] p-5 shadow-[0_2px_20px_rgba(45,35,20,0.06)] ring-1 ring-[#d4c4a0]/25 transition hover:border-[#d4c4a0] hover:shadow-[0_4px_24px_rgba(45,35,20,0.07)]";

const goldListPanelClass =
  "mt-4 rounded-2xl border border-[#e3d3b0]/55 bg-gradient-to-br from-[#fffefb] to-[#f5ebe0]/90 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]";

const whoThisIsFor = [
  {
    title: "Employee & team events", body: "Picnics, service milestones, seasonal gatherings, and all hands outdoors, when you need clear arrival, food, and seating logic your people can move through without confusion.", }, {
    title: "Client & stakeholder hospitality", body: "Tented lunches, cocktail receptions, branded arrival lanes, and outdoor meet and greets where first impressions and comfort matter as much as coverage.", }, {
    title: "Program-driven outdoor functions", body: "Remarks or awards under cover, product or launch moments, outdoor meetings, and appreciation events where the schedule (not just the headcount) drives the footprint.", },
] as const;

const layoutFlowPoints = [
  {
    title: "Registration and arrival", body: "Check in, badges, and gift tables need depth and queue space so the first ten minutes do not clog the rest of the day.", }, {
    title: "Dining, bar, and service", body: "Buffet lines, coffee, and bar service need aisle width and back of house access so catering is not fighting guest traffic.", }, {
    title: "Presentation and focus areas", body: "Speakers, screens, or awards need sightlines, floor stability for tripods, and often a darker ceiling or lighting plan so the program reads indoors, not improvised.", }, {
    title: "Lounges and open networking", body: "High tops, soft seating clusters, or open floor breaks need their own zone or a satellite canopy, so conversation does not steal square footage from seated guests.", }, {
    title: "Guest movement", body: "We plan how people move from parking or building doors through food, program, and exit, especially when two tents or a walkway ties spaces together.", },
] as const;

const weatherComfortPoints = [
  "Midday sun and heat: shade, airflow, and optional sidewalls or fans so guests and staff stay comfortable through the full block.", "Rain and breeze: window panels, gutters between spans, and realistic backup so the run of show does not depend on a perfect forecast.", "Appearance: lighting, liners where they help, and a layout that looks organized on site and on camera for leadership or client-facing moments.",
] as const;

const rentalPairings = [
  "Frame or modular tents for clear spans, sightlines, and AV-friendly bays.", "Rounds, banquets, or mixed seating sized to your actual service style, not generic chair counts.", "Flooring when grass is soft, heels are common, or equipment needs a level deck.", "String, wash, or practical work lighting; heaters or fans depending on season.", "Sidewalls, doors, and service openings planned around catering and safety, not added as an afterthought.",
] as const;

const siteTimingPoints = [
  "Load in and strike windows aligned with security, noise limits, and when the lot or lawn has to be clear.", "Truck path, overhead clearance, and staking vs. ballast on pavement or courtyards.", "Coordination with facilities, IT for power, and your AV or production contact so the tent plan matches the schedule.",
] as const;

const setupExamples = [
  {
    title: "Tented company lunch or dinner", body: "Seated or mixed seating, defined buffet or plated lanes, and headroom for simple AV. Often one primary span plus a service mindset for how plates clear.", }, {
    title: "Client appreciation or branded hospitality", body: "Arrival flow, bar or beverage focal point, lounge pockets, and weather-ready comfort so the event feels intentional, not like a borrowed backyard party.", }, {
    title: "Outdoor presentation or launch moment", body: "Cover for guests and gear, floor plan for chairs or standing room, and lighting so speakers and signage read clearly through dusk if the program runs long.", },
] as const;

const corporateFaqItems = [
  {
    id: "corp-scope", question: "What kinds of corporate outdoor events do you plan tents for in Connecticut?", answer:
      "Company-led programs on private lots, club grounds, campuses (where your team holds the contract), and similar sites: employee events, client hospitality, outdoor presentations, launches, seasonal gatherings, and appreciation days. We focus on footprint, flow, comfort, and how rentals support your schedule, not generic “any occasion” layouts.", }, {
    id: "corp-layout", question: "How do you help us plan layout and guest flow?", answer:
      "We start from arrival through registration, food and bar, program or presentation, and exit. That drives tent size, whether you need one span or a main tent plus a satellite for bar or AV, table shapes, aisle width, and where service enters so guests and crews are not competing for the same corners.", }, {
    id: "corp-weather", question: "What about weather backup and guest comfort?", answer:
      "We talk through sun, heat, wind, and rain early: sidewalls, window panels, fans, heaters, lighting, and sometimes flooring or gutters between tents. The goal is a plan that still feels organized if the forecast shifts, not a scramble the week of.", }, {
    id: "corp-pairings", question: "What rentals are usually paired with corporate tent setups?", answer:
      "Beyond the tent: tables and chairs matched to service style, lighting for program and evening, sidewalls and climate add-ons as needed, flooring when the surface or heels demand it, and clear planning for bar, buffet, or catering access. We align the list with your run of show and inventory we actually carry.", }, {
    id: "corp-surface", question: "Can you install on our parking lot or patio?", answer:
      "Often yes. Hard surfaces usually mean ballast or approved anchoring instead of stakes. We confirm access, setbacks, surface protection, and how trucks reach the footprint before we lock a layout. That is common for corporate sites across Connecticut.", }, {
    id: "corp-not-this-page", question: "Where should we look for school, fair, or town-wide events?", answer:
      "Those programs usually involve different permits, procurement, and crowd patterns than a company-led day. Use our Events hub and choose the guide that matches your occasion. This page stays focused on corporate planners and company-controlled outdoor programs.", },
] as const;

const faqSchemaItems = corporateFaqItems.map(({ question, answer }) => ({ question, answer }));

export default function CorporatePage() {
  return (
    <>
      <ServiceSchema
        name="Corporate tent and event rentals for Connecticut company programs"
        description="Tent rentals, tables, chairs, lighting, and layout planning for Connecticut corporate outdoor events: employee gatherings, client hospitality, presentations, launches, and appreciation programs with weather and site-aware setup."
        path="/corporate-event-rentals"
      />
      <FAQSchemaItems items={faqSchemaItems} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Corporate event rentals", path: "/corporate-event-rentals" }, ]}
      />

      <section className="border-b border-stone-200 bg-gradient-to-b from-[#faf9f7] to-white py-8 sm:py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Corporate event rentals" }]} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Connecticut, corporate outdoor events</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
            Corporate tent planning for programs your company runs outdoors
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
            Corporate events often need more than a roof. The right tent helps you{" "}
            <span className="font-medium text-stone-900">organize guest movement</span>, keep people comfortable through sun or shifting weather, and present a{" "}
            <span className="font-medium text-stone-900">polished, intentional</span> setting for dining, networking, remarks, or client facing hospitality, without your layout reading like a generic festival field.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            We work with planners and facilities teams across Connecticut on headcount, program blocks, catering and AV lanes, and realistic install and strike windows. If your event is school, town, or fair scale procurement instead, start from the{" "}
            <Link href="/events" className="font-semibold text-[#6b5420] underline decoration-stone-300 underline-offset-2 hover:decoration-stone-600">
              Events hub
            </Link>{" "}
            so you land on the right guide. This page stays focused on company-led outdoor functions.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center text-center sm:inline-flex`}>
              Tell us your date and program
            </Link>
            <Link
              href="/party-guides/corporate-picnic-tent-flow-basics"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#c9a24a]/55 bg-gradient-to-b from-[#fffdf8] to-[#fff6e6] px-6 py-3 text-sm font-bold text-[#3d3010] shadow-sm transition hover:border-[#b78a2d] hover:from-white hover:to-[#fff4dc]"
            >
              Corporate flow guide
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            What this page is best for
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Company-controlled outdoor programs where the tent supports <span className="font-medium text-stone-800">flow, comfort, and presentation</span>, not every public gathering type.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {whoThisIsFor.map((c) => (
              <div key={c.title} className={goldCardClass}>
                <h3 className="text-sm font-bold text-black">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50/80 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Why tents matter for corporate events
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            A tent gives you a defined footprint: shade and weather cover, a controlled backdrop for leadership or client moments, and a single place to orchestrate seating, service, and AV so the day feels <span className="font-semibold text-stone-800">structured and professional</span>, especially when the alternative is an open lawn or lot with no natural “rooms.”
          </p>
          <div className={`${goldListPanelClass} max-w-3xl`}>
            <ul className="space-y-2 text-sm leading-relaxed text-stone-800">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]" aria-hidden />
                <span>Clear guest journey from arrival through food, program, and exit.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]" aria-hidden />
                <span>Comfort and backup for sun, heat, breeze, or light rain without scrambling the schedule.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]" aria-hidden />
                <span>A finished look that matches how you want the company to show up in front of employees or clients.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Layout and guest flow
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Most corporate tent problems are really <span className="font-medium text-stone-800">circulation problems</span>. We plan zones so registration, dining, bar, presentations, and lounges each have room to work at the same time.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {layoutFlowPoints.map((c) => (
              <div key={c.title} className={goldCardClass}>
                <h3 className="text-sm font-bold text-black">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50/80 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Weather, comfort, and appearance
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Connecticut summers and shoulder seasons can swing from bright sun to quick showers. We build plans that keep guests and speakers comfortable and the setting looking deliberate, not improvised.
          </p>
          <div className={`${goldListPanelClass} max-w-3xl`}>
            <ul className="space-y-2 text-sm leading-relaxed text-stone-800">
              {weatherComfortPoints.map((line) => (
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
            Common rental pairings for corporate setups
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Your list should follow the program, not a generic package. These are the lines we most often align with company tents once flow is clear.
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
            Browse{" "}
            <Link href="/rental-inventory" className="font-semibold text-[#6b5420] underline decoration-stone-300 underline-offset-2 hover:decoration-stone-600">
              rental inventory
            </Link>{" "}
            or the{" "}
            <Link href="/planning" className="font-semibold text-[#6b5420] underline decoration-stone-300 underline-offset-2 hover:decoration-stone-600">
              planning hub
            </Link>{" "}
            when you want numbers and checklists before you lock a quote.
          </p>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50/80 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Site access, timing, and setup
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Corporate sites often have tight crew windows and non-negotiable lot clear times. We ask about access and power up front so install and strike stay predictable.
          </p>
          <div className={`${goldListPanelClass} max-w-3xl`}>
            <ul className="space-y-2 text-sm leading-relaxed text-stone-800">
              {siteTimingPoints.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a7328]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm text-stone-600">
            More shade or registration-only coverage than a full dinner? See{" "}
            <Link href="/tent-rentals/jobsite-coverage" className="font-semibold text-[#6b5420] underline decoration-stone-300 underline-offset-2 hover:decoration-stone-600">
              jobsite &amp; coverage tents
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Example setups planners compare to their day
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
            Starting points, not guarantees. Your headcount, service style, and site still drive the final footprint.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {setupExamples.map((c) => (
              <div key={c.title} className={goldCardClass}>
                <h3 className="text-sm font-bold text-black">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-8 sm:py-10" aria-labelledby="corp-faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 id="corp-faq-heading" className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl [font-family:var(--font-display)]">
            Corporate event rental FAQs
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Straight answers for company-led outdoor programs in Connecticut.
          </p>
          <div className="mt-6">
            <FAQAccordion items={[...corporateFaqItems]} variant="gold" />
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#111315] py-10 text-stone-100 sm:py-12" aria-labelledby="corp-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d4a84b]">Next step</p>
          <h2 id="corp-cta-heading" className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl [font-family:var(--font-display)]">
            Call and walk through your setup
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-300 sm:text-base">
            The fastest way to get useful is a short conversation: date, town, approximate headcount, seated vs standing mix, and whether you have remarks, buffet, or bar blocks. We will ask about access and timing, then suggest tent options and rental lines that match how your guests actually move, not a generic list.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a href={business.phoneHref} className={`${callNowSectionClass} justify-center px-8`}>
              Call {business.phone}
            </a>
            <Link href="/contact#quote" className={`${bookNowSectionClass} justify-center px-8`}>
              Email your run of show
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
