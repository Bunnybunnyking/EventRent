import Link from "next/link";

const href = "/tent-seating-reference";

const goldOnDark =
  "inline-flex min-h-[44px] max-w-[13.5rem] touch-manipulation items-center justify-center rounded-full border-2 border-[#c9a24a] bg-gradient-to-b from-[#2a2418] to-[#15181b] px-5 py-2.5 text-center text-[0.75rem] font-bold leading-snug tracking-tight text-[#f5e9d2] shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-[#e4c96e] hover:text-white sm:min-h-[48px] sm:max-w-none sm:px-6 sm:py-3 sm:text-sm [font-family:var(--font-display)]";

const outlineLight =
  "inline-flex min-h-[44px] max-w-[13.5rem] touch-manipulation items-center justify-center rounded-full border-2 border-[#9a7a45] bg-white/95 px-5 py-2.5 text-center text-[0.75rem] font-bold leading-snug tracking-tight text-stone-900 shadow-sm transition hover:border-[#b78a2d] hover:bg-white sm:min-h-[48px] sm:max-w-none sm:px-6 sm:py-3 sm:text-sm [font-family:var(--font-display)]";

/** Smaller pill for dense toolbars (e.g. tents hub under gallery). */
const outlineLightCompact =
  "inline-flex min-h-[32px] max-w-none touch-manipulation items-center justify-center rounded-full border border-[#b78a2d] bg-white px-3 py-1.5 text-center text-[11px] font-semibold leading-tight tracking-tight text-stone-900 shadow-sm transition hover:border-[#9a7328] hover:bg-stone-50 sm:min-h-[34px] sm:px-3.5 sm:py-2 sm:text-xs [font-family:var(--font-display)]";

const compactDark =
  "inline-flex min-h-[40px] touch-manipulation items-center justify-center rounded-full border border-[#c9a24a]/80 bg-[#1a1d22]/95 px-4 py-2 text-center text-[0.65rem] font-bold leading-snug tracking-tight text-[#f0e6c8] transition hover:border-[#e4c96e] hover:text-white sm:min-h-[42px] sm:px-5 sm:text-[0.7rem] [font-family:var(--font-display)]";

export type QuickSizeReferenceButtonVariant = "goldOnDark" | "outlineLight" | "compactDark";

type Props = {
  variant?: QuickSizeReferenceButtonVariant;
  className?: string;
  /** Tighter padding and type (pairs with `outlineLight`). */
  compact?: boolean;
};

/**
 * Links to `/tent-seating-reference` (not in main nav). Label: Tent & Seating Reference.
 */
export function QuickSizeReferenceButton({ variant = "outlineLight", className = "", compact = false }: Props) {
  const shell =
    variant === "goldOnDark"
      ? goldOnDark
      : variant === "compactDark"
        ? compactDark
        : compact
          ? outlineLightCompact
          : outlineLight;
  return (
    <Link
      href={href}
      prefetch={true}
      className={[shell, className].filter(Boolean).join(" ")}
      title="Tent sizes, seating, tables, and linen reference"
    >
      {"Tent & Seating Reference"}
    </Link>
  );
}
