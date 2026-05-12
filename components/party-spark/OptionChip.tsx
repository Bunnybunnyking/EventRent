"use client";

import type { ReactNode } from "react";

type OptionChipProps = {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  /** Tighter padding and type for single-page layouts */
  dense?: boolean;
  /** Visible label for assistive tech when children are complex */
  "aria-label"?: string;
};

export function OptionChip({
  selected,
  onClick,
  children,
  className = "",
  dense,
  icon,
  "aria-label": ariaLabel,
}: OptionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={[
        dense
          ? "flex min-h-[38px] w-full touch-manipulation items-center justify-center gap-1.5 rounded-xl border-2 px-2.5 py-2 text-left text-[13px] font-semibold leading-tight transition-all duration-200 active:scale-[0.98] sm:min-h-[40px] sm:text-[13px]"
          : "flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-left text-[15px] font-semibold leading-snug transition-all duration-200 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FFFCF7] sm:focus-visible:ring-offset-2",
        selected
          ? "border-[#C8A24A] bg-white text-[#111111] shadow-[0_0_0_3px_rgba(200,162,74,0.2)]"
          : "border-[#E6E1D8] bg-white text-[#111111] hover:border-[#C8A24A]/60 hover:bg-[#FFFCF7]",
        className,
      ].join(" ")}
    >
      {icon ? <span className="shrink-0 text-[#C8A24A]" aria-hidden>{icon}</span> : null}
      <span className="flex-1">{children}</span>
      {selected ? (
        <span className="sr-only">(selected)</span>
      ) : null}
    </button>
  );
}
