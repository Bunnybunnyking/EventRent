"use client";

import Link from "next/link";

type Props = {
  /** Small caps line above the title (e.g. QUIZAST) */
  label?: string;
  /** Main heading for this quiz route */
  title: string;
  description: string;
};

/**
 * Shell for an upcoming quiz route: title, description, and link to the main quiz hub.
 */
export function QuizSlotPlaceholder({
  label = "Quiz slot",
  title,
  description,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#E6E1D8] bg-[linear-gradient(180deg,#FFFDFB_0%,#FAF8F3_55%,#F3EFE6_100%)] px-6 py-12 shadow-[0_24px_60px_-40px_rgba(60,48,30,0.35)] sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#e8c96b]/15 blur-3xl" />
      <div className="relative mx-auto max-w-xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a7d68]">
          {label}
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[#2c241c] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#5c5348]">{description}</p>
        <p className="mt-6 text-sm leading-relaxed text-[#7a6f62]">
          More quizzes will appear here as we publish them. For now, use the main quiz hub or try Party Personality.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/quiz"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#c9a227]/35 bg-white/80 px-6 py-3 text-sm font-semibold text-[#3d362e] shadow-sm transition hover:bg-[#fffdf9]"
          >
            All quizzes
          </Link>
          <Link
            href="/whats-your-party-personality"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#c9983e] via-[#e8c96b] to-[#b8892f] px-6 py-3 text-sm font-semibold text-[#1a1410] shadow-md transition hover:brightness-105"
          >
            Party Personality quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
