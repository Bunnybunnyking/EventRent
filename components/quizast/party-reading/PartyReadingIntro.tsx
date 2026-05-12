"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Shuffling your party cards…",
  "Reading the signs…",
  "Pulling your perfect party spread…",
] as const;

type Props = {
  onComplete: () => void;
};

/** Short cinematic intro before the face-down spread appears */
export function PartyReadingIntro({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const doneRef = useRef(onComplete);

  useEffect(() => {
    doneRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (step >= MESSAGES.length) {
      const t = window.setTimeout(() => doneRef.current(), 380);
      return () => window.clearTimeout(t);
    }
    const delay = step === MESSAGES.length - 1 ? 820 : 680;
    const id = window.setTimeout(() => setStep((s) => s + 1), delay);
    return () => window.clearTimeout(id);
  }, [step]);

  const msg = MESSAGES[Math.min(step, MESSAGES.length - 1)];

  return (
    <div className="flex min-h-[38vh] flex-col items-center justify-center px-4 py-10 text-center">
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#e8c96b]/35 bg-white/[0.06] shadow-[0_12px_40px_-18px_rgba(0,0,0,0.45)]">
        <motion.span
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          className="block h-7 w-7 rounded-full border-2 border-[#e8c96b]/25 border-t-[#f0d78c]"
          aria-hidden
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={msg}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="max-w-md font-[family-name:var(--font-display)] text-xl font-medium leading-snug tracking-tight text-[#faf6ee] sm:text-2xl"
        >
          {msg}
        </motion.p>
      </AnimatePresence>
      <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c9baa5]">
        QUIZAST reading
      </p>
    </div>
  );
}
