"use client";

import { useMemo, useState } from "react";

type EventKind = "wedding" | "party" | "corporate" | "festival";
type SeatingKind = "cocktail" | "mixed" | "seated";

function suggestFootprintSqFt(
  guests: number,
  eventType: EventKind,
  seating: SeatingKind,
  danceFloor: boolean,
  buffetOrBar: boolean,
): { low: number; high: number; rationale: string } {
  const perGuest: Record<SeatingKind, number> = {
    cocktail: 9,
    mixed: 11,
    seated: 14,
  };
  let base = guests * perGuest[seating];

  const eventMult: Record<EventKind, number> = {
    wedding: 1.1,
    party: 1.0,
    corporate: 1.06,
    festival: 1.18,
  };
  base *= eventMult[eventType];

  if (danceFloor) {
    base += Math.max(280, Math.round(guests * 2.8));
  }
  if (buffetOrBar) {
    base += 200;
  }

  const low = Math.round(base * 0.92);
  const high = Math.round(base * 1.12);

  const rationale =
    "Includes rough allowance for aisles and service. Dance floors, bars, stages, head tables, or tight sites may require more—or a modular layout.";

  return { low, high, rationale };
}

function sqFtToExampleTents(low: number, high: number): string {
  const mid = (low + high) / 2;
  if (mid < 900) {
    return "Examples: 20×40, 30×30, or similar—often paired with a canopy for food or bar.";
  }
  if (mid < 1600) {
    return "Examples: 30×45, 40×40, 40×50—verify against your actual table map and walkways.";
  }
  if (mid < 2600) {
    return "Examples: 40×60 to 40×80 class structures, or modular sections connected with gutters.";
  }
  if (mid < 4000) {
    return "Examples: 40×100, 50×70+, or multi-bay frame layouts for programs with multiple zones.";
  }
  return "Large-event territory—often multiple structures or very wide frames. Site visit and CAD-style planning recommended.";
}

export function TentSizeEstimator() {
  const [guests, setGuests] = useState(100);
  const [eventType, setEventType] = useState<EventKind>("wedding");
  const [seating, setSeating] = useState<SeatingKind>("seated");
  const [danceFloor, setDanceFloor] = useState(true);
  const [buffetBar, setBuffetBar] = useState(true);

  const result = useMemo(
    () => suggestFootprintSqFt(guests, eventType, seating, danceFloor, buffetBar),
    [guests, eventType, seating, danceFloor, buffetBar],
  );

  const example = useMemo(() => sqFtToExampleTents(result.low, result.high), [result.low, result.high]);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <div>
            <label htmlFor="plan-guests" className="text-sm font-semibold text-stone-800">
              Approximate guests
            </label>
            <input
              id="plan-guests"
              type="range"
              min={20}
              max={300}
              step={10}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-2 w-full accent-[#9a7328]"
            />
            <p className="mt-1 text-sm text-stone-600">{guests} guests</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800">Event type</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["wedding", "Wedding"],
                  ["party", "Private party"],
                  ["corporate", "Corporate / gala"],
                  ["festival", "Festival / fair"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setEventType(v)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    eventType === v
                      ? "bg-[#1a1d20] text-[#f5e0b3] ring-2 ring-[#b78a2d]"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800">Seating style</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["cocktail", "Mostly standing"],
                  ["mixed", "Mixed"],
                  ["seated", "Seated dinner"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSeating(v)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    seating === v
                      ? "bg-[#1a1d20] text-[#f5e0b3] ring-2 ring-[#b78a2d]"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
              <input type="checkbox" checked={danceFloor} onChange={(e) => setDanceFloor(e.target.checked)} className="h-4 w-4 rounded border-stone-400 accent-[#9a7328]" />
              Dance floor or main dance area
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
              <input type="checkbox" checked={buffetBar} onChange={(e) => setBuffetBar(e.target.checked)} className="h-4 w-4 rounded border-stone-400 accent-[#9a7328]" />
              Buffet and/or bar zone
            </label>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-[#b78a2d]/35 bg-gradient-to-br from-[#fffbf0] to-stone-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6a2a]">Estimated covered footprint</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            {result.low.toLocaleString()}–{result.high.toLocaleString()} sq ft
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-700">{example}</p>
          <p className="mt-4 text-xs leading-relaxed text-stone-600">{result.rationale}</p>
          <p className="mt-4 rounded-xl bg-white/80 p-3 text-xs font-medium text-stone-800 ring-1 ring-stone-200/80">
            This is a planning estimate only—not a quote. Final tent size depends on your exact layout, site boundaries, equipment, and Connecticut weather planning.
          </p>
        </div>
      </div>
    </div>
  );
}
