"use client";

import type { ReactNode } from "react";

export type QuizShellVariant = "personality" | "tarot";

type Props = {
  variant: QuizShellVariant;
  children: ReactNode;
  className?: string;
};

/** Shared polished container for in-flow quizzes: mesh lighting, corner ornaments, depth shadow */
export function QuizExperienceShell({ variant, children, className = "" }: Props) {
  const base =
    "relative overflow-hidden rounded-[2rem] px-4 py-8 text-[#f5efe6] shadow-[0_40px_120px_-50px_rgba(0,0,0,0.85)] sm:px-8 sm:py-10 md:px-12 md:py-12";

  const skins: Record<QuizShellVariant, string> = {
    personality:
      "border border-white/[0.12] bg-gradient-to-b from-[#2a2419] via-[#1c1814] to-[#12100d] ring-1 ring-white/[0.06]",
    tarot:
      "border border-[#c4b8d4]/20 bg-gradient-to-b from-[#1c1626] via-[#14101a] to-[#0a080e] ring-1 ring-[#9b7bd6]/15",
  };

  return (
    <div className={`${base} ${skins[variant]} ${className}`}>
      {variant === "personality" ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(232,201,107,0.14),transparent_52%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(180,140,90,0.06),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:14px_14px]" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_15%_0%,rgba(155,123,214,0.18),transparent_50%),radial-gradient(ellipse_55%_45%_at_90%_15%,rgba(232,201,107,0.09),transparent_48%),radial-gradient(ellipse_50%_35%_at_50%_100%,rgba(120,90,160,0.12),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px]" />
        </>
      )}

      <CornerFlourish variant={variant} position="tl" />
      <CornerFlourish variant={variant} position="tr" />
      <CornerFlourish variant={variant} position="bl" />
      <CornerFlourish variant={variant} position="br" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(92%,44rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#e8c96b]/30 to-transparent" />

      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

function CornerFlourish({
  variant,
  position,
}: {
  variant: QuizShellVariant;
  position: "tl" | "tr" | "bl" | "br";
}) {
  const accent = variant === "personality" ? "#e8c96b" : "#c9a8e8";
  const pos =
    position === "tl"
      ? "left-3 top-3 sm:left-5 sm:top-5"
      : position === "tr"
        ? "right-3 top-3 sm:right-5 sm:top-5"
        : position === "bl"
          ? "bottom-3 left-3 sm:bottom-5 sm:left-5"
          : "bottom-3 right-3 sm:bottom-5 sm:right-5";

  return (
    <svg
      className={`pointer-events-none absolute h-10 w-10 opacity-[0.35] sm:h-12 sm:w-12 ${pos}`}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 4v8M4 4h8M36 4v8M36 4h-8M4 36v-8M4 36h8M36 36v-8M36 36h-8"
        stroke={accent}
        strokeWidth={0.75}
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="2" fill={accent} opacity={0.5} />
    </svg>
  );
}
