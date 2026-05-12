import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import type { PartyGuideArticle } from "@/lib/party-guides-data";
import { getRelatedGuides } from "@/lib/party-guides-data";
import { textLinkNeutralClass } from "@/lib/interactive-styles";
import { PartyGuideCtas } from "./party-guide-ctas";
import { PartyGuideImagePlaceholder } from "./party-guide-image-placeholder";
import { RelatedGuides } from "./related-guides";

function contextualResourceLinks(slug: string): { href: string; label: string }[] {
  switch (slug) {
    case "graduation-party-tent-backyard-connecticut":
      return [{ href: "/events/graduation-parties", label: "Graduation party occasion guide" }];
    case "what-fits-in-a-20x40-tent-connecticut":
      return [{ href: "/tents/frame-tents/20x40-frame-tent-rental", label: "20×40 frame tent size page" }];
    case "frame-tent-vs-pole-tent-connecticut":
      return [
        { href: "/tents/frame-tents", label: "Frame tent family" },
        { href: "/tents/pole-tents", label: "Pole tent family" },
        { href: "/tents/cheap-canopy-vs-professional-event-tent", label: "Cheap canopy vs. professional tent" },
      ];
    case "what-size-tent-do-i-need":
      return [
        { href: "/planning", label: "Planning hub" }, { href: "/tents", label: "Tent families hub" }, ];
    case "tent-rental-pricing":
      return [
        { href: "/wishlist", label: "Wishlist builder" }, { href: "/party-packages", label: "Party packages" }, ];
    case "tents-on-driveways-and-pavement":
      return [
        { href: "/tent-rentals", label: "Tent rentals overview" }, { href: "/rental-inventory#inv-tents", label: "Tent inventory" }, ];
    default:
      return [];
  }
}

function TocLinks({ guide }: { guide: PartyGuideArticle }) {
  return (
    <ul className="space-y-2 text-sm">
      {guide.toc.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="text-stone-700 underline-offset-2 transition hover:text-stone-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 rounded-sm"
          >
            {item.label}
          </a>
        </li>
      ))}
      <li>
        <a
          href="#faq"
          className="text-stone-700 underline-offset-2 transition hover:text-stone-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228] focus-visible:ring-offset-2 rounded-sm"
        >
          Questions
        </a>
      </li>
    </ul>
  );
}

export function PartyGuideArticleView({ guide }: { guide: PartyGuideArticle }) {
  const related = getRelatedGuides(guide.relatedSlugs);
  const extraLinks = contextualResourceLinks(guide.slug);

  return (
    <>
      <article>
        <header className="relative border-b border-stone-200/80 bg-gradient-to-b from-[#f7f5f1] to-[#faf8f5] py-8 sm:py-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#c9a24a]/35 to-transparent" aria-hidden />
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb
              className="mb-6"
              items={[
                { label: "Home", href: "/" }, { label: "Party guides", href: "/party-guides" }, { label: guide.title }, ]}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6d3a]">{guide.categoryLabel}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl [font-family:var(--font-display)]">
              {guide.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-700">{guide.intro}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-200/80 pt-6 text-sm text-stone-600">
              <span>
                <span className="text-stone-500">Reviewed by </span>
                {guide.reviewedBy}
              </span>
              <span>
                <span className="text-stone-500">Updated </span>
                <time dateTime={guide.updatedAt}>
                  {new Date(guide.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric", })}
                </time>
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <PartyGuideImagePlaceholder caption={`Illustration or photo: ${guide.title}`} />

          <details className="lg:hidden mt-8 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-sm font-semibold text-stone-900 [list-style:none] [&::-webkit-details-marker]:hidden">
              On this page <span className="text-stone-500">·</span> <span className="font-normal text-stone-600">Jump to section</span>
            </summary>
            <div className="mt-3 border-t border-stone-100 pt-3">
              <nav aria-label="On this page">
                <TocLinks guide={guide} />
              </nav>
            </div>
          </details>

          <div className="mt-10 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 lg:items-start">
            <nav className="mb-8 hidden lg:block lg:sticky lg:top-28" aria-label="On this page">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">On this page</p>
              <div className="mt-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                <TocLinks guide={guide} />
              </div>
            </nav>

            <div className="min-w-0">
              <div className="rounded-xl border border-[#b78a2d]/25 bg-[#fffdf8] px-4 py-4 sm:px-5">
                <p className="text-base font-medium leading-relaxed text-stone-800">
                  <strong className="text-stone-900">Direct answer: </strong>
                  {guide.excerpt}
                </p>
              </div>

              <div className="mt-10 space-y-10">
                {guide.sections.map((sec) => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-28">
                    <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">{sec.heading}</h2>
                    <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-stone-700">{sec.body}</p>
                  </section>
                ))}
              </div>

              {guide.callouts?.map((c) => (
                <aside
                  key={c.title}
                  className="mt-10 rounded-xl border border-[#b78a2d]/30 bg-[#fffdf8] p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-stone-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{c.body}</p>
                </aside>
              ))}

              {guide.checklist && guide.checklist.length > 0 ? (
                <div className="mt-10 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-stone-900">Checklist</h3>
                  <ul className="mt-3 space-y-2 text-sm text-stone-700">
                    {guide.checklist.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[#b8860b]" aria-hidden>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <section id="faq" className="mt-12 scroll-mt-28 border-t border-stone-200 pt-10">
                <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">Questions</h2>
                <div className="mt-6 space-y-3">
                  {guide.faq.map((f) => (
                    <details
                      key={f.question}
                      className="group rounded-xl border border-stone-200 bg-white shadow-sm transition open:border-stone-300 open:shadow-md"
                    >
                      <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-stone-900 [list-style:none] [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center justify-between gap-3">
                          {f.question}
                          <span className="text-stone-400 transition group-open:rotate-180" aria-hidden>
                            ▼
                          </span>
                        </span>
                      </summary>
                      <p className="border-t border-stone-100 px-5 pb-4 pt-1 text-sm leading-relaxed text-stone-600">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <div className="mt-12">
                <PartyGuideCtas variant="inline" />
              </div>

              <div className="mt-10 rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="font-semibold text-stone-900">Helpful links</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/tents" className={textLinkNeutralClass}>
                      Tent guide hub
                    </Link>
                  </li>
                  <li>
                    <Link href="/planning" className={textLinkNeutralClass}>
                      Planning hub (calculator & planner)
                    </Link>
                  </li>
                  <li>
                    <Link href="/wedding-tent-rentals" className={textLinkNeutralClass}>
                      Wedding tent rentals
                    </Link>
                  </li>
                  <li>
                    <Link href="/corporate-event-rentals" className={textLinkNeutralClass}>
                      Corporate events
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq#faq-rain-plan" className={textLinkNeutralClass}>
                      Rain planning FAQ
                    </Link>
                  </li>
                  {extraLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={textLinkNeutralClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>

      <RelatedGuides guides={related} />

      <section className="border-t border-stone-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <PartyGuideCtas variant="band" />
        </div>
      </section>
    </>
  );
}
