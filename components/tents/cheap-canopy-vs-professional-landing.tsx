import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { bookNowSectionClass, mobileStickyOutlineClass } from "@/lib/cta-styles";
import { business } from "@/lib/site-data";

const green = {
  deep: "#142924",
  muted: "#2d4a42",
  wash: "#f3f7f5",
} as const;

function IconDrape({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M4 5h16M6 5v14M12 5v14M18 5v14M4 19h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9c0 2 2 3 4 3s4-1 4-3" />
    </svg>
  );
}

function IconWind({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M3 10h8a2 2 0 012 2 2 2 0 104-4H5M5 14h11a3 3 0 013 3 3 3 0 11-6 0H9" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinejoin="round" d="M12 3l7 4v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V7l7-4z" />
      <path strokeLinecap="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconScale({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M8 20h8M12 16v4M7 8l3 3M17 8l-3 3M9 12h6" />
      <path strokeLinejoin="round" d="M6 8h12v4a3 3 0 01-3 3H9a3 3 0 01-3-3V8z" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SoftRule() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" aria-hidden>
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a24a]/35 to-transparent" />
    </div>
  );
}

export function CheapCanopyVsProfessionalLanding() {
  return (
    <article className="bg-white text-stone-800">
        {/* Hero */}
        <header className="relative overflow-hidden border-b border-stone-200/80 pb-14 pt-10 sm:pb-16 sm:pt-14">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.07] blur-3xl sm:h-96 sm:w-96"
            style={{ background: green.deep }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f3f7f5]/90 to-transparent" aria-hidden />

          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb
              className="mb-8"
              items={[
                { label: "Home", href: "/" },
                { label: "Tents", href: "/tents" },
                { label: "Cheap canopy vs. professional tent" },
              ]}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: green.muted }}>
              {business.name} · Tent education
            </p>
            <h1
              className="mt-4 text-balance text-[2rem] font-semibold leading-[1.12] tracking-tight text-stone-950 sm:text-[2.35rem] sm:leading-[1.1] md:text-[2.6rem] [font-family:var(--font-display)]"
            >
              Not All Tents Are the Same
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl sm:leading-relaxed">
              A cheap canopy may look fine in a video. A professional event tent is built to protect the event.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600">
              <span className="font-medium text-stone-800">Same size does not mean same tent.</span> If you have seen bargain tents on Facebook, TikTok, Amazon, Walmart, or a local classified, this page explains what you are actually comparing—and when a simple canopy is honestly enough.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/contact#quote" className={bookNowSectionClass}>
                <span className="relative z-10">Get Help Choosing the Right Tent</span>
              </Link>
              <Link
                href="/tents/frame-tents"
                className={`${mobileStickyOutlineClass} sm:inline-flex sm:w-auto sm:min-w-[11rem] sm:px-6`}
              >
                View Tent Sizes
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3" aria-label="Examples of professional Connecticut event tents">
              {[
                { src: "/images/service-areas/glastonbury-ct-frame-tent-30x60.png", alt: "Large white frame tent on grass" },
                { src: "/images/home-hero-panoramic-tent.jpg", alt: "Wide white event tent on grass with tables and string lights" },
                { src: "/images/gallery/ct-event-tent-professional-setup.png", alt: "Professional frame tent exterior on a lawn" },
                { src: "/images/service-areas/middletown-ct-frame-tent-20x40.png", alt: "Frame tent on a lawn for an outdoor event" },
              ].map((img, i) => (
                <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-stone-200/70">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Liner section */}
        <section className="border-b border-stone-200/80 py-14 sm:py-16" style={{ backgroundColor: green.wash }} aria-labelledby="liner-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/[0.04]">
                <IconDrape className="h-5 w-5 text-[#142924]" />
              </span>
              <div>
                <h2 id="liner-heading" className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl [font-family:var(--font-display)]">
                  A liner can make a cheap tent look nice. It cannot make it strong.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone-700">
                  Social clips often show string lights, drapes, and liners first. That is fair staging—but it can hide a light frame, thin legs, and hardware that was never meant for a full guest load or a gusty afternoon.{" "}
                  <span className="font-medium text-stone-900">A liner can make a cheap tent look pretty, but it cannot make it strong.</span>
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone-700">
                  When you are shopping, ask what is underneath the styling layer. The structure, anchoring plan, and wind rating matter more than how the fabric photographs at golden hour.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SoftRule />

        {/* Same size comparison */}
        <section className="py-14 sm:py-16" aria-labelledby="compare-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f3f7f5] text-stone-900 ring-1 ring-stone-200/80">
                <IconScale className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h2 id="compare-heading" className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl [font-family:var(--font-display)]">
                  Same size, very different tent
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone-600">
                  Footprint is only one line on the spec sheet. Engineering, anchoring, weather handling, and crew experience change what “10×20” or “20×40” actually means on your lawn or lot.
                </p>
              </div>
            </div>

            <div className="mt-10 overflow-x-auto rounded-2xl bg-white shadow-[0_8px_40px_rgba(20,41,36,0.06)] ring-1 ring-stone-200/60">
              <table className="w-full min-w-[320px] border-collapse text-left text-sm">
                <caption className="border-b border-stone-100 px-4 py-3 text-left text-xs font-medium text-stone-500 sm:px-5">
                  At-a-glance comparison (typical retail canopy vs. professional event tent)
                </caption>
                <thead>
                  <tr className="border-b border-stone-100 bg-[#fafcfb]">
                    <th scope="col" className="px-4 py-3 font-semibold text-stone-900 sm:px-5">
                      Topic
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-stone-800 sm:px-5">
                      Pop-up / budget canopy
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-[#142924] sm:px-5">
                      Professional frame / event tent
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-600">
                  <tr>
                    <th scope="row" className="px-4 py-3.5 font-medium text-stone-900 sm:px-5">
                      Frame &amp; hardware
                    </th>
                    <td className="px-4 py-3.5 sm:px-5">Lightweight tubes; built for portability, not load.</td>
                    <td className="px-4 py-3.5 sm:px-5">Engineered aluminum or steel systems sized for wind and span.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3.5 font-medium text-stone-900 sm:px-5">
                      Anchoring
                    </th>
                    <td className="px-4 py-3.5 sm:px-5">Often weight bags or minimal stakes—easy to under-spec.</td>
                    <td className="px-4 py-3.5 sm:px-5">Staking or ballasting planned for surface, exposure, and code context.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3.5 font-medium text-stone-900 sm:px-5">
                      Weather
                    </th>
                    <td className="px-4 py-3.5 sm:px-5">Rain and sidewalls are often add-ons; sealing varies.</td>
                    <td className="px-4 py-3.5 sm:px-5">Sidewalls, gutters, and rain plans integrated with layout.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3.5 font-medium text-stone-900 sm:px-5">
                      Guest experience
                    </th>
                    <td className="px-4 py-3.5 sm:px-5">Shade over a small zone; headroom and aisles can feel tight.</td>
                    <td className="px-4 py-3.5 sm:px-5">
                      <span className="font-medium text-stone-800">The tent is not just the roof. It is the room your guests are sitting in.</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3.5 font-medium text-stone-900 sm:px-5">
                      Setup &amp; support
                    </th>
                    <td className="px-4 py-3.5 sm:px-5">DIY assembly; little planning help if weather shifts.</td>
                    <td className="px-4 py-3.5 sm:px-5">Professional delivery, install, and strike with layout guidance.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When cheap is fine */}
        <section className="border-y border-stone-200/80 py-14 sm:py-16" style={{ backgroundColor: green.wash }} aria-labelledby="fine-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="fine-heading" className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl [font-family:var(--font-display)]">
              When a cheap canopy may be fine
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700">
              We are not here to shame a pop-up. For basic shade, a canopy may be enough. For real events, choose a real event tent.
            </p>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-stone-700">
              {[
                "Grill or smoker shade with a small footprint and low guest load under it.",
                "Vendor booth or registration table where the manufacturer rating matches the exposure.",
                "Short check-in windows, hydration tables, or equipment cover away from the main crowd.",
                "Kids’ game station or craft table with clear adult supervision and conservative wind planning.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <IconCheck className="mt-1 h-5 w-5 shrink-0 text-[#9a7a45]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Risky */}
        <section className="py-14 sm:py-16" aria-labelledby="risk-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50/90 text-amber-950 ring-1 ring-amber-200/60">
                <IconWind className="h-5 w-5" />
              </span>
              <div>
                <h2 id="risk-heading" className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl [font-family:var(--font-display)]">
                  Where cheap tents become risky
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone-600">
                  Wind does not care about your RSVP count. When a frame is under-built, sidewalls are loose, or anchoring is improvised, the tent can move, pool water, or fail in ways that interrupt the event and create safety issues. None of that shows up in a fifteen-second clip.
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone-600">
                  Professional crews think in terms of exposure, guy lines, ballast, transitions to pavement, and how guests will move in rain—not only how the top looks on install morning.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SoftRule />

        {/* Why pro costs more */}
        <section
          className="py-14 sm:py-16"
          style={{ backgroundColor: green.wash }}
          aria-labelledby="cost-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-stone-900 shadow-sm ring-1 ring-stone-200/70">
                <IconShield className="h-5 w-5 text-[#142924]" />
              </span>
              <div>
                <h2 id="cost-heading" className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl [font-family:var(--font-display)]">
                  Why professional frame tents cost more
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone-700">
                  You are paying for commercial-grade inventory, trained install teams, and the planning that keeps dinner, dancing, and exits working when the forecast shifts. That includes anchoring math, appearance on camera and in person, documentation when a venue asks for it, and accountability if something needs adjusting on site.
                </p>
                <p className="mt-4 text-base font-medium leading-relaxed text-stone-900">
                  Cheap tents cover space. Professional tents protect the event.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Liability - educational */}
        <section className="border-t border-stone-200/80 py-14 sm:py-16" aria-labelledby="liability-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="liability-heading" className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl [font-family:var(--font-display)]">
              Homeowner &amp; event host responsibility
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              If a tent is poorly secured and someone is hurt, property is damaged, or an insurer asks questions after the fact, the homeowner or host is often part of the conversation—along with vendors, venues, and weather decisions that day. This is general education, not legal advice. When in doubt, choose equipment and a crew that match how many people you are inviting, how long they will be under cover, and what your venue expects on paper.
            </p>
          </div>
        </section>

        {/* Compare quotes */}
        <section className="border-y border-stone-200/80 py-14 sm:py-16" style={{ backgroundColor: green.wash }} aria-labelledby="quotes-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="quotes-heading" className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl [font-family:var(--font-display)]">
              How to compare tent quotes the right way
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700">
              Use the same questions for every bidder so you are not comparing a photo price to a full event plan.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "What exact tent model or system is quoted, and is it engineered for my guest count and wind exposure?",
                "How will you anchor on my surface (grass, patio, asphalt mix) and who signs off on that plan?",
                "What is included for rain—sidewalls, gutters, doors, weights, stakes—and what is extra?",
                "Who installs, who strikes, and what happens if the schedule shifts?",
                "Is delivery, pickup, and labor itemized so I can compare apples to apples?",
                "Will you help with layout for tables, buffet, dance, and aisles—or only drop off equipment?",
              ].map((q) => (
                <li key={q} className="flex gap-3 rounded-xl bg-white/70 px-4 py-3 text-sm leading-relaxed text-stone-700 ring-1 ring-stone-200/50 sm:text-base">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9a7a45]" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Our approach */}
        <section className="py-14 sm:py-16" aria-labelledby="approach-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="approach-heading" className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl [font-family:var(--font-display)]">
              Our approach
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              {business.name} is a Connecticut event rental company. We help hosts pick the right tent for backyard parties, graduations, weddings, corporate programs, schools, festivals, and community events—then we deliver, install, and pick up with the same crew standards we use statewide. If a canopy honestly fits your plan, we will say so. If your guest list and weather story call for a frame tent, high-peak line, or larger clear-span structure, we will walk you through why, without pressure.
            </p>
            <p className="mt-6 text-sm text-stone-500">
              Further reading:{" "}
              <Link href="/party-guides/frame-tent-vs-pole-tent-connecticut" className="font-medium text-[#8a6220] underline-offset-2 hover:underline">
                Frame tent vs. pole tent in Connecticut
              </Link>
              {" · "}
              <Link href="/party-guides/tent-rental-pricing" className="font-medium text-[#8a6220] underline-offset-2 hover:underline">
                How tent rental pricing works
              </Link>
              {" · "}
              <Link href="/tents/gallery" className="font-medium text-[#8a6220] underline-offset-2 hover:underline">
                Tent gallery
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-stone-200/80 bg-[#fafcfb] py-14 sm:py-16" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl [font-family:var(--font-display)]">
              Questions hosts ask
            </h2>
            <div className="mt-8 space-y-2">
              {[
                {
                  q: "Are cheap pop-up canopies always bad?",
                  a: "No. They are useful for light-duty shade and short windows when exposure is modest and anchoring is done carefully. Problems start when they are asked to behave like a full reception shell.",
                },
                {
                  q: "Why does a professional frame tent cost more than a canopy?",
                  a: "Materials, engineering, inventory maintenance, insurance, trained labor, and planning time are all part of the quote. You are renting structure and service—not only fabric over a rectangle.",
                },
                {
                  q: "Can two tents be the same size but totally different?",
                  a: "Yes. Same size does not mean same tent. Span, wind rating, anchoring, sidewall options, and interior height can all differ while the footprint looks similar on paper.",
                },
                {
                  q: "Why do cheap tents look good on TikTok or Facebook?",
                  a: "Lighting, liners, and camera angles flatter lightweight frames. Look for close-ups of legs, connectors, and how the tent is tied down—not only the wide glamour shot.",
                },
                {
                  q: "Is a tent liner the same as a better tent?",
                  a: "No. Liners change the look and feel inside. They do not replace frame strength, anchoring, or weather sealing.",
                },
                {
                  q: "Are cheap canopies dangerous?",
                  a: "They can be if they are under-anchored, overloaded with guests, or used in weather they were not built for. Risk rises when expectations exceed the product’s design.",
                },
                {
                  q: "Can the homeowner be liable if a tent fails?",
                  a: "Liability is fact-specific and may involve hosts, vendors, and venues. We are not attorneys—choose reputable equipment and documented install plans, and involve your venue or insurer early when they require it.",
                },
                {
                  q: "Do I need a permit for a tent in Connecticut?",
                  a: "It depends on town, footprint, occupancy, duration, and venue rules. Fire marshals and building departments set thresholds in many places. Ask locally and share what you learn with your rental team so paperwork matches reality.",
                },
                {
                  q: "Is a frame tent better than a pole tent?",
                  a: "Neither is universally better. Frame tents offer clear spans without a center pole; pole tents can offer classic peaks and efficient footprints for certain lots. Your site and program pick the family.",
                },
                {
                  q: "Should I choose the cheapest tent quote?",
                  a: "Choose the quote that answers anchoring, weather, labor, and layout the most clearly. The lowest line item rarely includes the same scope when you read the details.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-stone-200/80 bg-white px-4 py-3 transition hover:border-stone-300 open:shadow-sm open:ring-1 open:ring-stone-200/40"
                >
                  <summary className="relative cursor-pointer list-none pr-8 text-sm font-semibold text-stone-900 outline-none sm:text-base [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="absolute right-0 top-0.5 text-stone-400 group-open:hidden" aria-hidden>
                      +
                    </span>
                    <span className="absolute right-0 top-0.5 hidden text-stone-400 group-open:inline" aria-hidden>
                      −
                    </span>
                  </summary>
                  <p className="mt-3 border-t border-stone-100 pt-3 text-sm leading-relaxed text-stone-600 sm:text-[0.9375rem]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <footer className="border-t border-stone-200/80 bg-gradient-to-b from-white to-[#f3f7f5] py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: green.muted }}>
              Ready when you are
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl [font-family:var(--font-display)]">
              Choose the tent that protects the party.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              Cheap tents cover space. Professional tents protect the event.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact#quote" className={`${bookNowSectionClass} sm:min-w-[14rem]`}>
                <span className="relative z-10">Plan My Tent Rental</span>
              </Link>
              <Link href="/tents" className={`${mobileStickyOutlineClass} sm:inline-flex sm:w-auto sm:min-w-[12rem]`}>
                Back to tent hub
              </Link>
            </div>
          </div>
        </footer>
    </article>
  );
}
