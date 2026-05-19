import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { business } from "@/lib/site-data";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Party quizzes — planning games",
  description:
    "Quick interactive quizzes from Connecticut Party Rentals: personality-style games that pair fun with practical tent and party rental guidance.",
  path: "/quiz",
  ogImage: defaultOgImagePath,
});

const quizzes: {
  href: string;
  title: string;
  blurb: string;
  badge: string;
  accent: string;
  glyph: string;
}[] = [
  {
    href: "/whats-your-party-personality",
    title: "What's Your Party Personality?",
    blurb: "Roast-style humor plus a practical rental setup starting point — tents, tables, chairs, and add-ons.",
    badge: "Live",
    accent: "from-[#c9983e]/25 via-[#f5e6c8]/40 to-[#b8892f]/20",
    glyph: "✦",
  },
  {
    href: "/quiz/quizast",
    title: "QUIZAST",
    blurb: "Birth-chart party tarot — Sun, Moon, Rising (or style) with arcana-inspired cards.",
    badge: "Live",
    accent: "from-[#7c5cb0]/30 via-[#d4c4e8]/35 to-[#9b7bd6]/25",
    glyph: "☽",
  },
];

export default function QuizHubPage() {
  const brandShort = business.name;

  return (
    <section className="relative min-h-[78vh] overflow-hidden border-b border-[#E6E1D8] bg-[linear-gradient(180deg,#FFFDFB_0%,#FAF8F3_42%,#EFE9DE_100%)] py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_70%_100%_at_50%_-20%,rgba(183,138,45,0.12),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4bc7a]/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Party games & tools", href: "/party-games-tools" },
            { label: "Quizzes" },
          ]}
        />

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#e8dfd2]/90 bg-white/55 p-8 shadow-[0_28px_80px_-48px_rgba(45,36,28,0.45)] backdrop-blur-[2px] sm:p-10 md:p-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8a7d68]">
                Interactive · Shareable URLs
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-[2rem] font-semibold tracking-tight text-[#2c241c] sm:text-[2.35rem]">
                Party quizzes
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c5348] sm:text-base">
                Mini-games from{" "}
                <span className="font-semibold text-[#3d362e]">{brandShort}</span>
                — each quiz lives on its own link so you can drop them into emails, QR codes, or Instagram bios.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-[#e6dfd3] bg-[#fffdf9]/90 px-5 py-4 text-right shadow-inner sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a67c1a]">Tip</p>
              <p className="mt-1 max-w-[14rem] text-xs leading-relaxed text-[#6b6156]">
                Finish on desktop or mobile — both quizzes are thumb-friendly with large tap targets.
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {quizzes.map((q) => (
            <li key={q.href}>
              <Link
                href={q.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#e4dcd0] bg-[#fffdf9]/90 shadow-[0_16px_48px_-32px_rgba(35,28,22,0.45)] transition duration-300 hover:-translate-y-1 hover:border-[#d4bc7a]/55 hover:shadow-[0_28px_70px_-36px_rgba(120,90,40,0.35)]"
              >
                <div
                  className={`h-2 w-full bg-gradient-to-r ${q.accent}`}
                  aria-hidden
                />
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#ebe4d9] bg-gradient-to-br from-[#faf7f0] to-[#f0ebe3] text-xl text-[#a67c1a] shadow-inner">
                      <span aria-hidden>{q.glyph}</span>
                    </span>
                    <span className="rounded-full bg-[#f5efe4] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7a6b54]">
                      {q.badge}
                    </span>
                  </div>
                  <span className="mt-6 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[#2c241c] group-hover:text-[#1a1510] sm:text-2xl">
                    {q.title}
                  </span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed text-[#5c5348]">{q.blurb}</span>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#a67c1a] transition group-hover:gap-3">
                    Open quiz
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
  );
}
