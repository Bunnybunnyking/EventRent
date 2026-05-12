"use client";

import { stripAiDashes } from "@/lib/quizast/humanizeCopy";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  /** Main title on face */
  title: string;
  subtitle?: string;
  /** Decorative arcana-style tag */
  eyebrow?: string;
  children?: ReactNode;
  /** Visual variant */
  variant?: "gold" | "midnight" | "cream";
  className?: string;
  /** Optional icon / glyph slot */
  ornament?: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  /** Denser card for grids (e.g. Rising picker on small screens) */
  compact?: boolean;
};

const shells: Record<NonNullable<Props["variant"]>, string> = {
  gold:
    "border-[#c9a227]/45 bg-gradient-to-br from-[#2a231c] via-[#1a1612] to-[#0e0c0a] text-[#f7f0e6] shadow-[0_22px_60px_-28px_rgba(201,162,39,0.45)]",
  midnight:
    "border-white/12 bg-gradient-to-br from-[#1e1a24] via-[#15131c] to-[#0d0c10] text-[#ebe4dc] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)]",
  cream:
    "border-[#e6dfd3] bg-gradient-to-br from-[#fffdf9] via-[#faf6ee] to-[#f0ebe3] text-[#2c241c] shadow-[0_18px_44px_-26px_rgba(60,48,30,0.35)]",
};

export function TarotCard({
  title,
  subtitle,
  eyebrow,
  children,
  variant = "gold",
  className = "",
  ornament,
  onClick,
  selected,
  compact = false,
}: Props) {
  const density = compact
    ? "min-h-[96px] rounded-xl border p-3 sm:min-h-[104px] sm:rounded-2xl sm:p-3.5"
    : "min-h-[140px] rounded-2xl border p-5 sm:min-h-[160px] sm:rounded-3xl sm:p-6";

  const shellClass = `relative flex w-full flex-col text-left shadow-lg transition-[box-shadow,transform] ${density} ${shells[variant]} ${
    selected ? "ring-2 ring-[#e8c96b]/75 ring-offset-2 ring-offset-[#0e0c0a]" : ""
  } ${onClick ? "cursor-pointer hover:shadow-xl" : ""} ${className}`;

  const inner = (
    <>
      <div
        className={`pointer-events-none absolute inset-2 rounded-[1.35rem] border border-white/10 ${compact ? "sm:inset-1.5" : "sm:inset-2.5"}`}
      />
      <div
        className={`pointer-events-none absolute h-px w-6 bg-gradient-to-r from-[#e8c96b]/60 to-transparent sm:w-8 ${compact ? "left-3 top-3 sm:left-3.5 sm:top-3.5" : "left-4 top-4 sm:left-5 sm:top-5"}`}
      />
      <div
        className={`pointer-events-none absolute h-px w-6 bg-gradient-to-l from-[#e8c96b]/60 to-transparent sm:w-8 ${compact ? "bottom-3 right-3 sm:bottom-3.5 sm:right-3.5" : "bottom-4 right-4 sm:bottom-5 sm:right-5"}`}
      />

      {eyebrow ? (
        <p
          className={`font-semibold uppercase tracking-[0.35em] text-[#d4bc7a]/90 ${compact ? "text-[9px]" : "text-[10px]"}`}
        >
          {stripAiDashes(eyebrow)}
        </p>
      ) : null}
      <div className={`flex items-start gap-2 ${compact ? "mt-1 sm:gap-2.5" : "mt-2 gap-3"}`}>
        {ornament ? (
          <span
            className={`mt-0.5 flex shrink-0 items-center justify-center rounded-full border border-[#e8c96b]/25 bg-black/20 ${compact ? "h-8 w-8 text-sm sm:h-9 sm:w-9" : "h-11 w-11 text-lg"}`}
          >
            {ornament}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <h3
            className={`font-[family-name:var(--font-display)] font-semibold leading-snug tracking-tight ${compact ? "text-base sm:text-[1.05rem]" : "text-lg sm:text-xl"}`}
          >
            {stripAiDashes(title)}
          </h3>
          {subtitle ? (
            <p
              className={`leading-relaxed opacity-90 ${compact ? "mt-1 text-[11px] sm:text-xs" : "mt-2 text-sm sm:text-[15px]"}`}
            >
              {stripAiDashes(subtitle)}
            </p>
          ) : null}
        </div>
      </div>
      {children ? <div className="relative mt-4 text-sm leading-relaxed opacity-95">{children}</div> : null}
    </>
  );

  return onClick ? (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={shellClass}
    >
      {inner}
    </motion.button>
  ) : (
    <motion.div className={shellClass}>{inner}</motion.div>
  );
}
