"use client";

import { useMemo, useState } from "react";

type EventKind = "wedding" | "party" | "corporate" | "festival";
type SeatingKind = "cocktail" | "mixed" | "seated";
type ProgramScope = "full" | "ceremony";
type TableStyle = "rounds" | "banquet";

function computeFootprint(
  guests: number,
  eventType: EventKind,
  seating: SeatingKind,
  danceFloor: boolean,
  buffetOrBar: boolean,
  programScope: ProgramScope,
  tableStyle: TableStyle,
  djBand: boolean,
  weatherBackup: boolean,
): { low: number; high: number; comfortableLow: number; comfortableHigh: number; rationale: string } {
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

  if (programScope === "ceremony") {
    base *= 0.52;
  }

  if (tableStyle === "rounds" && seating === "seated") {
    base *= 1.05;
  }
  if (tableStyle === "banquet" && seating === "seated") {
    base *= 0.98;
  }

  if (danceFloor) {
    base += Math.max(280, Math.round(guests * 2.8));
  }
  if (buffetOrBar) {
    base += 200;
  }
  if (djBand) {
    base += 160;
  }
  if (weatherBackup) {
    base += Math.round(80 + guests * 0.2);
  }

  const low = Math.round(base * 0.92);
  const high = Math.round(base * 1.12);

  const comfortableLow = Math.round(low * 1.06);
  const comfortableHigh = Math.round(high * 1.14);

  const rationale =
    "This range accounts for your program, seating style, and the options you selected. Tight sites, extra staging, or multiple food stations may still push you larger. We confirm against your layout and property.";

  return { low, high, comfortableLow, comfortableHigh, rationale };
}

function sqFtToExampleTents(low: number, high: number): string {
  const mid = (low + high) / 2;
  if (mid < 900) {
    return "Typical frame sizes in this band: 20×40, 30×30, or similar. Often paired with a small canopy for food or bar.";
  }
  if (mid < 1600) {
    return "Examples: 30×45, 40×40, 40×50. Always verify against your table map and walkways.";
  }
  if (mid < 2600) {
    return "Examples: 40×60 to 40×80 class, or modular sections with gutters.";
  }
  if (mid < 4000) {
    return "Examples: 40×100, 50×70+, or multi-bay layouts for several zones.";
  }
  return "Large-event territory: often multiple structures or very wide frames. Site visit and detailed planning recommended.";
}

export function TentSizeEstimator() {
  const [guests, setGuests] = useState(100);
  const [eventType, setEventType] = useState<EventKind>("wedding");
  const [seating, setSeating] = useState<SeatingKind>("seated");
  const [danceFloor, setDanceFloor] = useState(true);
  const [buffetBar, setBuffetBar] = useState(true);
  const [programScope, setProgramScope] = useState<ProgramScope>("full");
  const [tableStyle, setTableStyle] = useState<TableStyle>("rounds");
  const [djBand, setDjBand] = useState(false);
  const [weatherBackup, setWeatherBackup] = useState(true);

  const result = useMemo(
    () =>
      computeFootprint(
        guests,
        eventType,
        seating,
        danceFloor,
        buffetBar,
        programScope,
        tableStyle,
        djBand,
        weatherBackup,
      ),
    [guests, eventType, seating, danceFloor, buffetBar, programScope, tableStyle, djBand, weatherBackup],
  );

  const example = useMemo(() => sqFtToExampleTents(result.low, result.high), [result.low, result.high]);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-start">
        <div className="min-w-0 space-y-5">
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
            <p className="text-sm font-semibold text-stone-800">Program</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["full", "Full event (reception / full program)"],
                  ["ceremony", "Ceremony-focused (lighter footprint)"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setProgramScope(v)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    programScope === v
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
            <p className="text-sm font-semibold text-stone-800">How guests spend time</p>
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

          {seating === "seated" ? (
            <div>
              <p className="text-sm font-semibold text-stone-800">Table style (seated)</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    ["rounds", "Mostly rounds"],
                    ["banquet", "Mostly banquet"],
                  ] as const
                ).map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setTableStyle(v)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                      tableStyle === v
                        ? "bg-[#1a1d20] text-[#f5e0b3] ring-2 ring-[#b78a2d]"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-stone-100 pt-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={danceFloor}
                onChange={(e) => setDanceFloor(e.target.checked)}
                className="h-4 w-4 rounded border-stone-400 accent-[#9a7328]"
              />
              Dance floor or main dance area
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={buffetBar}
                onChange={(e) => setBuffetBar(e.target.checked)}
                className="h-4 w-4 rounded border-stone-400 accent-[#9a7328]"
              />
              Buffet and/or bar zone
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
              <input type="checkbox" checked={djBand} onChange={(e) => setDjBand(e.target.checked)} className="h-4 w-4 rounded border-stone-400 accent-[#9a7328]" />
              DJ or band footprint
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={weatherBackup}
                onChange={(e) => setWeatherBackup(e.target.checked)}
                className="h-4 w-4 rounded border-stone-400 accent-[#9a7328]"
              />
              Plan for sidewalls / weather backup space
            </label>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-[#b78a2d]/35 bg-gradient-to-br from-[#fffbf0] to-stone-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6a2a]">Estimated footprint</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-2">
            <div className="rounded-xl bg-white/60 px-3 py-2.5 ring-1 ring-stone-200/80">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-stone-500">Good fit</p>
              <p className="mt-0.5 text-xl font-semibold tabular-nums tracking-tight text-stone-900 sm:text-2xl">
                {result.low.toLocaleString()}–{result.high.toLocaleString()}{" "}
                <span className="text-sm font-medium text-stone-600">sq ft</span>
              </p>
            </div>
            <div className="rounded-xl border border-[#c9a24a]/40 bg-white/90 px-3 py-2.5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-[#6b5220]">More comfortable</p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums text-stone-900 sm:text-xl">
                {result.comfortableLow.toLocaleString()}–{result.comfortableHigh.toLocaleString()}{" "}
                <span className="text-sm font-medium text-stone-600">sq ft</span>
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-snug text-stone-600">{example}</p>
          <p className="mt-2 text-xs leading-snug text-stone-500">{result.rationale}</p>
          <p className="mt-3 rounded-lg bg-white/80 px-2.5 py-2 text-[0.7rem] leading-snug text-stone-700 ring-1 ring-stone-200/80">
            Estimates only, not a quote. Heavy buffet or DJ programs often use a second tent. Cooking stays out of guest tents; tell us if you need a prep area—we have setups for that. Confirm for your layout and site.
          </p>
        </div>
      </div>
    </div>
  );
}
