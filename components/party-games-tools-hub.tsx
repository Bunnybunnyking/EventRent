import Link from "next/link";
import { PartyGamesToolsLive } from "@/components/party-games-tools/PartyGamesToolsLive";
import { business } from "@/lib/site-data";

type HubItem = {
  href: string;
  title: string;
  description: string;
  badge?: string;
  accent: string;
  glyph: string;
};

type HubSection = {
  id: string;
  title: string;
  subtitle: string;
  items: HubItem[];
};

const sections: HubSection[] = [
  {
    id: "quizzes",
    title: "Quizzes & mini-games",
    subtitle: "Shareable links on their own URLs, best for saving, QR codes, and social.",
    items: [
      {
        href: "/quiz",
        title: "All quizzes",
        description: "Hub for every interactive quiz we publish.",
        badge: "Start here",
        accent: "from-[#c9983e]/30 via-[#f5e6c8]/45 to-[#b8892f]/25",
        glyph: "◇",
      },
      {
        href: "/whats-your-party-personality",
        title: "What's Your Party Personality?",
        description: "Roast-style fun plus a practical rental starting point.",
        accent: "from-[#c9983e]/25 via-[#f5e6c8]/40 to-[#b8892f]/20",
        glyph: "✦",
      },
      {
        href: "/quiz/quizast",
        title: "QUIZAST",
        description: "Birth-chart party tarot: Sun, Moon, Rising with arcana-inspired cards.",
        accent: "from-[#7c5cb0]/30 via-[#d4c4e8]/35 to-[#9b7bd6]/25",
        glyph: "☽",
      },
    ],
  },
  {
    id: "names",
    title: "Names & sparks",
    subtitle: "Ideas you can text yourself; no email gate on results.",
    items: [
      {
        href: "/party-spark-generator",
        title: "Party Spark Generator",
        description: "Flip-card party names, themes, and bite-sized playbook ideas.",
        badge: "Updated",
        accent: "from-[#e85d75]/25 via-[#fce8ec]/40 to-[#c94d62]/20",
        glyph: "✧",
      },
    ],
  },
  {
    id: "planning",
    title: "Planning apps & deep guides",
    subtitle: "Quick Event Planner and tent tools also run in the live section above. These cards open the full page or guide.",
    items: [
      {
        href: "/quick-event-planner",
        title: "Quick Event Planner",
        description: "Three steps to a starter plan: packages, flow, and add-ons.",
        badge: "Popular",
        accent: "from-[#2d7a5e]/22 via-[#d8efe6]/40 to-[#1f5c46]/18",
        glyph: "◎",
      },
      {
        href: "/planning",
        title: "Full planning hub",
        description: "Calculators, charts, weather checks, and deep guides in one scroll.",
        accent: "from-[#8b7355]/22 via-[#ebe4dc]/38 to-[#6b5340]/18",
        glyph: "⌂",
      },
    ],
  },
  {
    id: "checklists",
    title: "Checklists",
    subtitle: "Structured outputs you can share with family or vendors.",
    items: [
      {
        href: "/backyard-party-checklist",
        title: "Backyard party checklist",
        description: "Home-host flow: yard fit, setup, and the details people forget.",
        accent: "from-[#c9983e]/28 via-[#faf3e4]/42 to-[#a67c1a]/22",
        glyph: "✓",
      },
      {
        href: "/wedding-checklist",
        title: "Wedding checklist generator",
        description: "Full wedding path plus outdoor / tent quick mode.",
        badge: "Weddings",
        accent: "from-[#5c8f9e]/25 via-[#e3eef1]/45 to-[#3d6b78]/20",
        glyph: "♥",
      },
    ],
  },
  {
    id: "site-sizing",
    title: "Site check & sizing",
    subtitle: "Ground truth before you lock a tent size.",
    items: [
      {
        href: "/planning#site-surface",
        title: "Site & surface checklist",
        description: "Grass, pavement, slope, access, and what changes anchoring.",
        accent: "from-[#5c5248]/25 via-[#ebe8e4]/40 to-[#3d362e]/18",
        glyph: "⚑",
      },
      {
        href: "/planning#tent-size-estimator",
        title: "Tent size calculator",
        description: "Square-footage ranges from guest count and layout style.",
        accent: "from-[#9a7328]/28 via-[#f5ecd8]/45 to-[#7a5a1f]/22",
        glyph: "⬡",
      },
      {
        href: "/tent-seating-reference",
        title: "Tent seating reference",
        description: "Quick visual sizing cues while you compare layouts.",
        accent: "from-[#6b5b95]/22 via-[#eae8f4]/40 to-[#4a3f6b]/18",
        glyph: "▦",
      },
    ],
  },
];

export function PartyGamesToolsHub() {
  const brandShort = business.name;

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#e4dcd0]/90 bg-[linear-gradient(165deg,#fffefb_0%,#faf6ee_38%,#f0ebe3_72%,#e8dfd2_100%)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(183,138,45,0.14),transparent_68%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(124,92,176,0.1),transparent_65%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#7a6e5e]">
                Interactive · Connecticut parties
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-[#221c16] sm:text-[2.85rem]">
                Party games &amp; tools
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#534a40] sm:text-[1.05rem]">
                Run tent sizing, Quick Event Planner, Party Spark, and (when wired) the canvas layout planner right on
                this page. Cards below link out to quizzes, checklists, and deep guides.
              </p>
              <p className="mt-4 max-w-xl rounded-xl border border-[#e0d6c8]/90 bg-white/55 px-4 py-3 text-sm leading-relaxed text-[#534a40] backdrop-blur-[1px]">
                <span className="font-semibold text-[#3d362e]">Renting yard games or bounce houses?</span> That lives under{" "}
                <Link
                  href="/av-games"
                  className="font-semibold text-[#7a5a18] underline decoration-[#d4b87a] underline-offset-2 hover:text-[#221c16]"
                >
                  AV/Games
                </Link>
                {" "}with tents and packages. This hub stays digital tools only so it does not compete with rental
                browsing.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e0d6c8]/90 bg-white/60 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-[2px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a67c1a]">Jump to</p>
              <nav className="mt-3 flex flex-wrap gap-2" aria-label="Section shortcuts">
                <a
                  href="#live-tools"
                  className="rounded-full border border-[#c9a96a]/55 bg-[#fffdf9]/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5c5348] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:border-[#c9a96a]/85 hover:text-[#2a241c]"
                >
                  Live tools
                </a>
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-full border border-[#dccfb8]/90 bg-[#fffdf9]/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5c5348] transition hover:border-[#c9a96a]/70 hover:text-[#2a241c]"
                  >
                    {s.title.replace(" & ", " + ").split(" ")[0]}
                  </a>
                ))}
                <a
                  href="#more"
                  className="rounded-full border border-[#dccfb8]/90 bg-[#fffdf9]/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5c5348] transition hover:border-[#c9a96a]/70 hover:text-[#2a241c]"
                >
                  More
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <PartyGamesToolsLive />

      {sections.map((section, si) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-28 border-b border-[#ebe4d9]/90 px-4 py-12 sm:px-6 sm:py-14 lg:px-8 ${
            si % 2 === 0 ? "bg-[#fffdf9]" : "bg-[linear-gradient(180deg,#fffdfb_0%,#f9f6f0_100%)]"
          }`}
          aria-labelledby={`${section.id}-heading`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2
                id={`${section.id}-heading`}
                className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#221c16] sm:text-[1.85rem]"
              >
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6156] sm:text-base">{section.subtitle}</p>
            </div>

            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
              {section.items.map((item) => (
                <li key={item.href} className={section.items.length === 1 ? "sm:col-span-2 lg:max-w-xl" : undefined}>
                  <Link
                    href={item.href}
                    className="group relative flex h-full min-h-[11rem] flex-col overflow-hidden rounded-[1.65rem] border border-[#e8dfd3]/95 bg-white/80 shadow-[0_18px_50px_-38px_rgba(35,28,22,0.55)] transition duration-300 hover:-translate-y-1 hover:border-[#d4bc7a]/55 hover:shadow-[0_28px_60px_-34px_rgba(120,90,40,0.28)]"
                  >
                    <div className={`h-1.5 w-full bg-gradient-to-r ${item.accent}`} aria-hidden />
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#ebe4d9] bg-gradient-to-br from-[#faf7f0] to-[#f0ebe3] text-lg text-[#a67c1a] shadow-inner">
                          <span aria-hidden>{item.glyph}</span>
                        </span>
                        {item.badge ? (
                          <span className="rounded-full bg-[#f3ece2] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7a6b54]">
                            {item.badge}
                          </span>
                        ) : null}
                      </div>
                      <span className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[#2c241c] group-hover:text-[#1a1510] sm:text-xl">
                        {item.title}
                      </span>
                      <span className="mt-2 flex-1 text-sm leading-relaxed text-[#5c5348]">{item.description}</span>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#a67c1a] transition group-hover:gap-3">
                        Open
                        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section
        id="more"
        className="scroll-mt-28 border-b border-[#ebe4d9]/90 bg-[#fffcf7] px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
        aria-labelledby="more-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="more-heading"
            className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[#221c16] sm:text-2xl"
          >
            Also on the site
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6b6156]">
            RSVP helpers and gear pages pair with the tools above when you move from ideas to headcount.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/rsvp",
                title: "RSVP hub",
                description: "Collect replies and manage guest lists for your event.",
                accent: "from-[#4a7bb0]/22 via-[#e8eef6]/42 to-[#355f8a]/18",
                glyph: "☷",
              },
              {
                href: "/yard-games",
                title: "Yard games",
                description: "Classic lawn games to bundle with tents and tables.",
                accent: "from-[#6b8f3d]/22 via-[#edf3e4]/40 to-[#4a6b28]/18",
                glyph: "⚾",
              },
              {
                href: "/av-games",
                title: "AV & games",
                description: "Audio, fun add-ons, and event entertainment options.",
                accent: "from-[#8b5a7c]/20 via-[#f2e8ef]/40 to-[#5c3d51]/16",
                glyph: "▶",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8dfd3]/95 bg-white/85 p-5 shadow-[0_12px_36px_-32px_rgba(35,28,22,0.45)] transition hover:-translate-y-0.5 hover:border-[#d4bc7a]/45"
                >
                  <div className={`mb-4 h-1 rounded-full bg-gradient-to-r ${item.accent}`} aria-hidden />
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ebe4d9] bg-[#faf7f0] text-base text-[#a67c1a]">
                      <span aria-hidden>{item.glyph}</span>
                    </span>
                    <div>
                      <span className="font-[family-name:var(--font-display)] text-base font-semibold text-[#2c241c] group-hover:text-[#1a1510]">
                        {item.title}
                      </span>
                      <p className="mt-1 text-sm leading-relaxed text-[#5c5348]">{item.description}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#e6dfd3] bg-[#14171a] px-3 pb-6 pt-10 text-center sm:px-5 sm:pb-7 sm:pt-11">
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4a84b]/90">Ready for gear?</p>
          <p className="mt-4 text-base leading-relaxed text-stone-300">
            When the games are played and the math is done, browse packages or send your date and guest count for a real quote.
          </p>
          <div className="mx-auto mt-6 flex w-full max-w-md flex-col items-stretch justify-center gap-2.5 sm:mx-auto sm:mt-5 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <Link
              href="/party-packages"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-[#c9a228]/80 bg-[#c9a228] px-6 text-sm font-semibold text-[#1a1510] shadow-[0_12px_36px_-16px_rgba(201,162,40,0.65)] transition hover:bg-[#ddb73a] sm:flex-initial sm:min-w-[11.5rem]"
            >
              Party packages
            </Link>
            <Link
              href="/contact#quote"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-stone-500/50 bg-transparent px-6 text-sm font-semibold text-stone-100 transition hover:border-[#d4a84b]/60 hover:text-white sm:flex-initial sm:min-w-[11.5rem]"
              prefetch={true}
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
