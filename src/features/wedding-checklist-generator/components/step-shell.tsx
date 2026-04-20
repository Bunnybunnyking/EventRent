"use client";

import type { ReactNode } from "react";
import { intakeStepCount, outputStepIndex, stepHint, stepTitle } from "@/features/wedding-checklist/lib/flow-meta";
import type { WeddingMode } from "@/features/wedding-checklist/types";

export function StepShell({
  mode,
  stepIndex,
  children,
  footer,
}: {
  mode: WeddingMode;
  stepIndex: number;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const outIdx = outputStepIndex(mode);
  const isOutput = stepIndex === outIdx;
  const totalIntake = intakeStepCount(mode);
  const progress = isOutput ? 1 : (stepIndex + 1) / totalIntake;

  return (
    <div className="mx-auto max-w-2xl">
      {!isOutput ? (
        <div className="mb-8">
          <div className="flex items-center justify-between gap-3 text-xs text-stone-500">
            <span className="font-semibold uppercase tracking-[0.12em] text-stone-500">
              Step {stepIndex + 1} of {totalIntake}
            </span>
            <span className="tabular-nums">{Math.round(progress * 100)}%</span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200/90 ring-1 ring-stone-200/50"
            aria-hidden
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-800/90 to-[#b8860b] transition-[width] duration-300 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-3xl">
            {stepTitle(mode, stepIndex)}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">{stepHint(mode, stepIndex)}</p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-stone-200/90 bg-white/90 p-5 shadow-sm sm:p-8">{children}</div>

      {footer ? <div className="mt-8">{footer}</div> : null}
    </div>
  );
}
