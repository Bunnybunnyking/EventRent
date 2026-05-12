import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PartyPersonalityQuiz } from "@/components/quiz/PartyPersonalityQuiz";
import { business } from "@/lib/site-data";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "What's Your Party Personality? — fun quiz & rental setup roast",
  description:
    "Take a fast, funny personality quiz for hosts in Connecticut. Get roasted gently and see a practical tent, table, and chair starting point for your party.",
  path: "/whats-your-party-personality",
  ogImage: defaultOgImagePath,
});

export default function PartyPersonalityQuizPage() {
  const brandShort = business.name;

  return (
    <section className="relative min-h-[72vh] overflow-hidden border-b border-[#E6E1D8] bg-[linear-gradient(180deg,#FFFDFB_0%,#FAF8F3_45%,#F0ebe3_100%)] py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_65%_100%_at_50%_-30%,rgba(183,138,45,0.1),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Party games & tools", href: "/games" },
            { label: "Quizzes", href: "/quiz" },
            { label: "Party Personality Quiz" },
          ]}
        />
        <div className="mt-8 max-w-3xl rounded-2xl border border-[#ebe4d9]/90 bg-white/50 px-6 py-5 shadow-[0_12px_40px_-34px_rgba(45,36,28,0.35)] backdrop-blur-[1px] sm:px-8 sm:py-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a67c1a]">
            Personality · Rentals
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#5c5348] sm:text-base">
            Interactive mini-game from{" "}
            <span className="font-semibold text-[#3d362e]">{brandShort}</span>
            — roast-grade humor with Connecticut tent, table, and chair context you can actually quote against.
          </p>
        </div>
        <div className="mt-10">
          <PartyPersonalityQuiz quoteHref="/contact#quote" />
        </div>
      </div>
    </section>
  );
}
