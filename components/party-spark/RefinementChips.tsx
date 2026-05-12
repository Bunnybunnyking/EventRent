"use client";

import type { RefinementIntent } from "@/lib/party-spark-types";

const CHIPS: { intent: RefinementIntent; label: string }[] = [
  { intent: "funnier", label: "Make It Funnier" },
  { intent: "classier", label: "Make It Classier" },
  { intent: "family", label: "More Family-Friendly" },
  { intent: "local", label: "More Local" },
  { intent: "lastMinute", label: "More Last-Minute" },
  { intent: "simple", label: "Simple Version" },
  { intent: "adultsPlayful", label: "Adults-Only Playful" },
];

type RefinementChipsProps = {
  onPick: (intent: RefinementIntent) => void;
  disabled?: boolean;
};

export function RefinementChips({ onPick, disabled }: RefinementChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CHIPS.map(({ intent, label }) => (
        <button
          key={intent}
          type="button"
          disabled={disabled}
          onClick={() => onPick(intent)}
          className="touch-manipulation min-h-[40px] rounded-full border border-[#E6E1D8] bg-white px-3.5 py-2 text-xs font-semibold text-[#555555] transition hover:border-[#C8A24A]/80 hover:text-[#111111] hover:shadow-[0_2px_12px_-4px_rgba(200,162,74,0.35)] active:scale-[0.98] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A]"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
