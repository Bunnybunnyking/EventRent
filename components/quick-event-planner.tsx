"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  computeQuickPlannerResult,
  defaultQuickPlannerInput,
  formatQuickPlannerSummary,
  type EventStyleId,
  type EventTypeId,
  type QuickPlannerInput,
} from "@/lib/quick-event-planner-logic";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import { business } from "@/lib/site-data";

const TAB_COUNT = 3;

/** User must use Next to unlock steps; cannot jump from step 1 → 3. */
function canNavigateToTab(target: 1 | 2 | 3, current: 1 | 2 | 3, furthest: 1 | 2 | 3): boolean {
  if (target === 1) return true;
  if (target === 2) return furthest >= 2;
  return furthest >= 3 && (current === 2 || current === 3);
}

const eventTypes: { id: EventTypeId; label: string }[] = [
  { id: "wedding", label: "Wedding" },
  { id: "graduation", label: "Graduation" },
  { id: "backyard", label: "Backyard party" },
  { id: "sweet16", label: "Sweet 16" },
  { id: "quince", label: "Quinceañera" },
  { id: "corporate", label: "Corporate event" },
  { id: "fundraiser", label: "Fundraiser" },
  { id: "festival", label: "Festival / fair" },
  { id: "community", label: "Community / town event" },
  { id: "tailgate", label: "Tailgate" },
  { id: "birthday", label: "Birthday party" },
  { id: "other", label: "Other" },
];

function Segmented<T extends string>({
  options,
  value,
  onChange,
  columns = "grid-cols-2 sm:grid-cols-3",
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  columns?: string;
}) {
  return (
    <div className={`grid gap-2 ${columns}`}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`min-h-[48px] rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
            value === o.id
              ? "border-stone-900 bg-stone-900 text-white shadow-sm"
              : "border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ToggleRow({
  label,
  helper,
  checked,
  onChange,
}: {
  label: string;
  helper?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full min-h-[52px] items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-left transition hover:border-stone-300 active:bg-stone-50"
    >
      <span
        className={`mt-0.5 flex h-6 w-11 shrink-0 rounded-full p-0.5 transition ${
          checked ? "bg-[#b8860b]" : "bg-stone-300"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </span>
      <span>
        <span className="block text-sm font-semibold text-stone-900">{label}</span>
        {helper ? <span className="mt-0.5 block text-xs text-stone-500">{helper}</span> : null}
      </span>
    </button>
  );
}

function SectionCard({ title, children, highlight }: { title: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${
        highlight ? "border-[#c9a24a]/70 bg-gradient-to-br from-[#fffbf5] to-amber-50/50 shadow-sm" : "border-stone-200 bg-white shadow-sm"
      }`}
    >
      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6218]">{title}</h3>
      <div className="mt-4 text-sm leading-relaxed text-stone-700">{children}</div>
    </div>
  );
}

export function QuickEventPlanner({ embedded = false }: { embedded?: boolean }) {
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  /** Highest step reached via Next — controls which tabs are clickable. */
  const [furthestStep, setFurthestStep] = useState<1 | 2 | 3>(1);
  const [inp, setInp] = useState<QuickPlannerInput>(() => defaultQuickPlannerInput());

  const patch = (p: Partial<QuickPlannerInput>) => setInp((s) => ({ ...s, ...p }));

  const result = useMemo(() => computeQuickPlannerResult(inp), [inp]);

  const summaryText = useMemo(() => formatQuickPlannerSummary(inp, result), [inp, result]);

  const quoteHref = useMemo(() => {
    const q = new URLSearchParams();
    q.set("guests", String(inp.guestCount));
    q.set("etype", eventTypes.find((e) => e.id === inp.eventType)?.label ?? inp.eventType);
    return `/contact?${q.toString()}#quote`;
  }, [inp.guestCount, inp.eventType]);

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
    } catch {
      /* ignore */
    }
  };

  const sendToQuote = () => {
    try {
      sessionStorage.setItem("ctpr_planner_summary", summaryText);
    } catch {
      /* ignore */
    }
  };

  const tabLabels = ["Event basics", "Setup & style", "Your plan"];

  return (
    <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-[#fffdf8] via-white to-stone-50 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-8">
      {!embedded ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Interactive</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900 sm:text-[1.65rem]">Quick Event Planner</h2>
            <p className="mt-2 max-w-xl text-sm text-stone-600 sm:text-base">
              Tell us a few quick things—we’ll build your starting event plan. Use <strong className="font-semibold text-stone-800">Next</strong> for each step so your plan stays accurate—you can’t skip ahead.
            </p>
          </div>
          <p className="text-xs font-medium text-stone-500">{TAB_COUNT} steps · mobile-friendly</p>
        </div>
      ) : (
        <div className="border-b border-amber-100/80 pb-4">
          <p className="text-xs font-medium text-stone-500">{TAB_COUNT} steps · use Next to unlock each step</p>
        </div>
      )}

      {/* Tab bar — steps unlock only after Next (no skipping to Your plan) */}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3" role="tablist" aria-label="Planner steps">
        {([1, 2, 3] as const).map((n) => {
          const allowed = canNavigateToTab(n, tab, furthestStep);
          return (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={tab === n}
              aria-disabled={!allowed}
              disabled={!allowed}
              title={
                !allowed
                  ? n === 2
                    ? "Use Next on step 1 to unlock"
                    : "Complete steps 1 and 2 with Next to unlock (or open step 2, then this tab)"
                  : undefined
              }
              onClick={() => {
                if (allowed) setTab(n);
              }}
              className={`min-h-[48px] flex-1 rounded-2xl border px-3 py-3 text-center text-sm font-bold transition sm:px-4 ${
                tab === n
                  ? "border-stone-900 bg-stone-900 text-[#f5e0b3] shadow-md"
                  : allowed
                    ? "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                    : "cursor-not-allowed border-stone-100 bg-stone-100/90 text-stone-400"
              }`}
            >
              <span className="block text-[0.65rem] font-semibold uppercase tracking-wide opacity-80">Step {n}</span>
              <span className="mt-0.5 block">{tabLabels[n - 1]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {tab === 1 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-stone-900">Event type</p>
              <div className="mt-2">
                <Segmented
                  options={eventTypes}
                  value={inp.eventType}
                  onChange={(v) => patch({ eventType: v })}
                  columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                />
              </div>
            </div>
            <div>
              <label htmlFor="qep-guests" className="text-sm font-semibold text-stone-900">
                Guest count
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <input
                  id="qep-guests"
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={inp.guestCount}
                  onChange={(e) => patch({ guestCount: Number(e.target.value) })}
                  className="h-2 w-full max-w-md accent-[#b8860b]"
                />
                <input
                  type="number"
                  min={10}
                  max={500}
                  value={inp.guestCount}
                  onChange={(e) => patch({ guestCount: Math.min(500, Math.max(10, Number(e.target.value) || 10)) })}
                  className="w-24 rounded-xl border border-stone-300 px-3 py-2.5 text-center text-base font-semibold text-stone-900"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Time of day</p>
              <div className="mt-2">
                <Segmented
                  options={[
                    { id: "morning", label: "Morning" },
                    { id: "afternoon", label: "Afternoon" },
                    { id: "evening", label: "Evening" },
                    { id: "night", label: "Night" },
                  ]}
                  value={inp.eventTime}
                  onChange={(v) => patch({ eventTime: v })}
                  columns="grid-cols-2 sm:grid-cols-4"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Event style</p>
              <div className="mt-2">
                <Segmented<EventStyleId>
                  options={[
                    { id: "seated", label: "Seated meal" },
                    { id: "cocktail", label: "Cocktail / mingling" },
                    { id: "ceremony", label: "Ceremony" },
                    { id: "buffet_casual", label: "Buffet / casual" },
                    { id: "dance", label: "Dance-focused" },
                    { id: "mixed", label: "Mixed / not sure" },
                  ]}
                  value={inp.eventStyle}
                  onChange={(v) => patch({ eventStyle: v })}
                  columns="grid-cols-2 sm:grid-cols-3"
                />
              </div>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-stone-900">Table style</p>
              <div className="mt-2">
                <Segmented
                  options={[
                    { id: "rounds", label: "Round tables" },
                    { id: "banquet", label: "Banquet tables" },
                    { id: "mixed", label: "Mixed" },
                    { id: "standing", label: "Mostly standing" },
                  ]}
                  value={inp.seatingStyle}
                  onChange={(v) => patch({ seatingStyle: v })}
                  columns="grid-cols-2 sm:grid-cols-4"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Food service</p>
              <div className="mt-2">
                <Segmented
                  options={[
                    { id: "none", label: "No food" },
                    { id: "dessert_only", label: "Dessert / cake only" },
                    { id: "buffet", label: "Buffet" },
                    { id: "plated", label: "Plated / catered meal" },
                    { id: "stations", label: "Food station / catering area" },
                  ]}
                  value={inp.food}
                  onChange={(v) => patch({ food: v })}
                  columns="grid-cols-2 sm:grid-cols-3"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Drinks</p>
              <div className="mt-2">
                <Segmented
                  options={[
                    { id: "none", label: "None" },
                    { id: "self", label: "Self-serve" },
                    { id: "bar", label: "Bar area" },
                  ]}
                  value={inp.drinks}
                  onChange={(v) => patch({ drinks: v })}
                  columns="grid-cols-3"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Music / entertainment</p>
              <div className="mt-2">
                <Segmented
                  options={[
                    { id: "none", label: "None" },
                    { id: "background", label: "Background music" },
                    { id: "mic", label: "Microphone / announcements" },
                    { id: "dj", label: "DJ / dance music" },
                    { id: "live", label: "Live music" },
                  ]}
                  value={inp.music}
                  onChange={(v) => patch({ music: v })}
                  columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Dance floor</p>
              <div className="mt-2">
                <Segmented
                  options={[
                    { id: "yes", label: "Yes" },
                    { id: "no", label: "No" },
                    { id: "maybe", label: "Maybe" },
                  ]}
                  value={inp.danceFloor}
                  onChange={(v) => patch({ danceFloor: v })}
                  columns="grid-cols-3 max-w-md"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Extras</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <ToggleRow label="Games / activity area" checked={inp.extraGames} onChange={(v) => patch({ extraGames: v })} />
                <ToggleRow label="Gift / cake table" checked={inp.extraGiftCake} onChange={(v) => patch({ extraGiftCake: v })} />
                <ToggleRow label="Lounge / hangout area" checked={inp.extraLounge} onChange={(v) => patch({ extraLounge: v })} />
                <ToggleRow
                  label="Restroom planning"
                  helper="Larger or longer outdoor events"
                  checked={inp.extraRestroom}
                  onChange={(v) => patch({ extraRestroom: v })}
                />
                <ToggleRow
                  label="Extra food-service tent"
                  helper="Separate covered prep or catering space"
                  checked={inp.extraFoodServiceTent}
                  onChange={(v) => patch({ extraFoodServiceTent: v })}
                />
              </div>
            </div>
          </div>
        )}

        {tab === 3 && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-amber-200/90 bg-[#fffbf0] p-5 sm:p-6">
              <p className="text-base font-semibold leading-snug text-stone-900">{result.summaryLine}</p>
              <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-amber-200/80 bg-white/90 px-4 py-3">
                <input
                  type="checkbox"
                  checked={inp.comfortableBoost}
                  onChange={(e) => patch({ comfortableBoost: e.target.checked })}
                  className="h-5 w-5 rounded border-stone-300 accent-[#b8860b]"
                />
                <span>
                  <span className="block text-sm font-semibold text-stone-900">More comfortable fit</span>
                  <span className="text-xs text-stone-600">Slightly larger tent class and extra seating buffer.</span>
                </span>
              </label>
            </div>

            <SectionCard title="1. Your recommended setup">
              <ul className="list-disc space-y-2 pl-5 text-stone-800">
                {result.recommendedSetup.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="2. Rental package we recommend" highlight>
              <p className="text-lg font-semibold text-stone-900">{result.rentalPackage.name}</p>
              <p className="mt-2 text-sm text-stone-700">{result.rentalPackage.why}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#6b5220]">Includes</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                {result.rentalPackage.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-stone-500">Optional add-ons</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-stone-600">
                {result.rentalPackage.optionalAddOns.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="3. Helpful add-ons">
              <ul className="space-y-3">
                {result.helpfulAddOns.map((a) => (
                  <li key={a.title} className="border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                    <span className="font-semibold text-stone-900">{a.title}</span>
                    <span className="text-stone-600"> — {a.why}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="4. A few planning notes">
              <ul className="list-disc space-y-2 pl-5">
                {result.planningNotes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="5. Next step">
              <p className="text-sm text-stone-700">
                Share this plan when you call or book—we’ll align layout, power load-in, and weather with your site.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={business.phoneHref} className={`${callNowSectionClass} justify-center`}>
                  Call Now
                </a>
                <Link href={quoteHref} onClick={sendToQuote} className={`${bookNowSectionClass} justify-center text-center`} prefetch={true}>
                  Book Now
                </Link>
                <Link
                  href="/contact#quote"
                  onClick={sendToQuote}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-center text-base font-bold text-stone-900 shadow-sm transition hover:bg-stone-50"
                  prefetch={true}
                >
                  Speak with an Event Concierge
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyPlan}
                  className="rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
                >
                  Copy plan
                </button>
                <a
                  href={`mailto:${business.email}?subject=${encodeURIComponent("Quick Event Planner summary")}&body=${encodeURIComponent(summaryText)}`}
                  className="rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
                >
                  Email this plan
                </a>
                <Link
                  href={quoteHref}
                  onClick={sendToQuote}
                  className="rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
                  prefetch={true}
                >
                  Send to quote form
                </Link>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-stone-500">{result.disclaimer}</p>
            </SectionCard>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/80 pt-6">
        {tab > 1 ? (
          <button
            type="button"
            onClick={() => setTab((prev) => (prev === 3 ? 2 : 1))}
            className="min-h-[48px] rounded-full border border-stone-300 bg-white px-6 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {tab < 3 ? (
          <button
            type="button"
            onClick={() => {
              if (tab === 1) {
                setFurthestStep((f) => (f < 2 ? 2 : f));
                setTab(2);
              } else {
                setFurthestStep(3);
                setTab(3);
              }
            }}
            className="min-h-[48px] rounded-full bg-stone-900 px-7 py-2.5 text-sm font-bold text-[#f5e0b3] shadow-sm hover:bg-stone-800"
          >
            {tab === 2 ? "See my plan" : "Next"}
          </button>
        ) : (
          <div className="ml-auto flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setTab(1);
                setFurthestStep(1);
              }}
              className="min-h-[48px] rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
            >
              Edit answers
            </button>
            <button
              type="button"
              onClick={() => {
                setTab(1);
                setFurthestStep(1);
                setInp(defaultQuickPlannerInput());
              }}
              className="min-h-[48px] rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
