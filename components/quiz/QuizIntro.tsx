"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle: string;
  onStart: () => void;
};

export function QuizIntro({ title, subtitle, onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <p className="mb-3 inline-flex rounded-full border border-[#e8c96b]/35 bg-gradient-to-r from-[#e8c96b]/15 to-[#c9983e]/10 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fce9a8] shadow-[0_4px_24px_-8px_rgba(232,201,107,0.45)]">
        Mini-game · not a form
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#fffdf7] drop-shadow-[0_2px_28px_rgba(0,0,0,0.35)] sm:text-4xl md:text-[2.75rem]">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#d8cdb8] sm:text-lg">
        {subtitle}
      </p>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="mt-10 w-full max-w-sm rounded-2xl bg-gradient-to-r from-[#c9983e] via-[#e8c96b] to-[#b8892f] px-8 py-4 text-base font-semibold text-[#1a1410] shadow-[0_18px_56px_-14px_rgba(232,201,107,0.58)] ring-1 ring-white/15 transition hover:brightness-[1.03] sm:py-[1.125rem]"
      >
        Start the roast
      </motion.button>
      <p className="mt-6 max-w-sm text-xs leading-relaxed text-[#9a8f7e]">
        One question per screen. Tap a card — we&apos;ll keep pace. No “Next” spam.
      </p>
    </motion.div>
  );
}
