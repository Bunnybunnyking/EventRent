"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Checking guest count crimes…",
  "Measuring weather anxiety…",
  "Reviewing chair shortage risk…",
  "Calculating buffet table dependency…",
  "Exposing your party personality…",
] as const;

type Props = {
  onComplete: () => void;
};

const REVEAL_FAILSAFE_MS = 12_000;

export function ResultReveal({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  /** Keeps latest callback without re-running the timer effect when parent re-renders */
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  /** Never leave the user on a spinning loader if timers mis-fire (tab sleep, strict mode edge cases). */
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        onCompleteRef.current();
      } catch {
        /* parent fault — still unmount via phase change if partial success */
      }
    }, REVEAL_FAILSAFE_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (step >= MESSAGES.length) {
      const t = window.setTimeout(() => {
        try {
          onCompleteRef.current();
        } catch {
          /* ignore */
        }
      }, 420);
      return () => window.clearTimeout(t);
    }
    const delay = step === MESSAGES.length - 1 ? 900 : 720;
    const id = window.setTimeout(() => setStep((s) => s + 1), delay);
    return () => window.clearTimeout(id);
  }, [step]);

  const displayStep = Math.min(step, MESSAGES.length - 1);
  const msg = MESSAGES[displayStep];

  return (
    <div className="flex min-h-[42vh] flex-col items-center justify-center px-2 text-center">
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e8c96b]/30 bg-[#e8c96b]/10 shadow-[0_12px_40px_-10px_rgba(232,201,107,0.45)]">
        <motion.span
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block h-8 w-8 rounded-full border-2 border-[#f0d78c]/35 border-t-[#f0d78c]"
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={msg}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="max-w-md font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-[#faf6ee] sm:text-2xl"
        >
          {msg}
        </motion.p>
      </AnimatePresence>
      <p className="mt-8 text-xs uppercase tracking-[0.25em] text-[#9a8f7e]">
        Almost there
      </p>
    </div>
  );
}
