import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { QuizastQuiz } from "@/components/quizast/QuizastQuiz";
import { business } from "@/lib/site-data";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "QUIZAST — birth-chart party tarot",
  description:
    "QUIZAST: a playful birth-chart party quiz for Connecticut hosts — Sun, Moon, and Rising (or style) as tarot-style cards with tent-and-party flavor. Entertainment only.",
  path: "/quiz/quizast",
  ogImage: defaultOgImagePath,
});

export default function QuizastPage() {
  const brandShort = business.name;

  return (
    <section className="relative min-h-[72vh] overflow-hidden border-b border-[#E6E1D8] bg-[linear-gradient(180deg,#FFFDFB_0%,#FAF8F3_45%,#EEE8F5_100%)] py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_70%_100%_at_50%_-25%,rgba(124,92,176,0.11),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Party games & tools", href: "/games" },
            { label: "Quizzes", href: "/quiz" },
            { label: "QUIZAST" },
          ]}
        />
        <div className="mt-8 max-w-3xl rounded-2xl border border-[#e8e0f0]/90 bg-white/55 px-6 py-5 shadow-[0_14px_44px_-36px_rgba(60,40,90,0.35)] backdrop-blur-[1px] sm:px-8 sm:py-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c5cb0]">
            Tarot · Chart lite
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#5c5348] sm:text-base">
            <span className="font-semibold text-[#3d362e]">QUIZAST</span> — tarot-inspired party vibes from{" "}
            <span className="font-semibold text-[#3d362e]">{brandShort}</span>
            . Fun first; optional birth details sharpen the read — we label estimates honestly. Your answers stay in your browser until you
            choose to contact us; you see your full result without sending us anything.
          </p>
        </div>
        <div className="mt-10">
          <QuizastQuiz />
        </div>
      </div>
    </section>
  );
}
