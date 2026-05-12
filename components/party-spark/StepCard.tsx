"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type StepCardProps = {
  stepIndex: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function StepCard({ stepIndex, totalSteps, title, subtitle, children }: StepCardProps) {
  const pct = Math.round(((stepIndex + 1) / totalSteps) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-[#E6E1D8] bg-white p-5 shadow-[0_12px_40px_-18px_rgba(17,17,17,0.12)] ring-1 ring-black/[0.025] sm:p-7"
    >
      <div className="mb-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#777777]">
          <span>
            Step {stepIndex + 1} / {totalSteps}
          </span>
          <span className="text-[#C8A24A]">{pct}%</span>
        </div>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E6E1D8]"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#B8923A] via-[#C8A24A] to-[#D4B87A]"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#111111] sm:text-[1.65rem]">
          {title}
        </h2>
        {subtitle ? <p className="mt-2 text-sm leading-relaxed text-[#555555]">{subtitle}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}
