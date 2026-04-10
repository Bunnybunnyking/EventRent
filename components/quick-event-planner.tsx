"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  computeQuickPlannerResult,
  defaultQuickPlannerInput,
  formatQuickPlannerSummary,
  type EventTypeId,
  type QuickPlannerInput,
} from "@/lib/quick-event-planner-logic";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import { business } from "@/lib/site-data";

const STEP_COUNT = 6;

const eventTypes: { id: EventTypeId; label: string }[] = [
  { id: "wedding", label: "Wedding" },
  { id: "graduation", label: "Graduation" },
  { id: "backyard", label: "Backyard party" },
  { id: "sweet16", label: "Sweet 16" },
  { id: "quince", label: "Quinceañera" },
  { id: "corporate", label: "Corporate" },
  { id: "fundraiser", label: "Fundraiser" },
  { id: "festival", label: "Festival / fair" },
  { id: "community", label: "Community / town" },
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
          className={`min-h-[44px] rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
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
      className="flex w-full items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-left transition hover:border-stone-300"
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

function ResultSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#8a6218]">{title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-stone-700">{children}</div>
    </div>
  );
}

export function QuickEventPlanner({ embedded = false }: { embedded?: boolean }) {
  const [step, setStep] = useState(1);
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

  return (
    <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-[#fffdf8] via-white to-stone-50 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-8">
      {!embedded ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">Interactive</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900 sm:text-[1.65rem]">Quick Event Planner</h2>
            <p className="mt-2 max-w-xl text-sm text-stone-600 sm:text-base">
              Tell us a few quick things—we will build a comfortable starting plan you can share with our team.
            </p>
          </div>
          <p className="text-xs font-medium text-stone-500">About {STEP_COUNT} short steps · mobile-friendly</p>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100/80 pb-4">
          <p className="text-xs font-medium text-stone-500">About {STEP_COUNT} short steps · mobile-friendly</p>
        </div>
      )}

      {/* Progress */}
      <div className="mt-8 flex items-center gap-1.5 sm:justify-center">
        {Array.from({ length: STEP_COUNT }, (_, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div key={n} className="flex flex-1 items-center sm:max-w-[4rem] sm:flex-none">
              <div
                className={`flex h-9 w-full min-w-0 items-center justify-center rounded-full text-xs font-bold sm:h-10 sm:w-10 sm:shrink-0 ${
                  active
                    ? "bg-stone-900 text-[#f5e0b3]"
                    : done
                      ? "bg-[#e8d5a3] text-stone-900"
                      : "bg-stone-200/90 text-stone-600"
                }`}
              >
                {n}
              </div>
              {n < STEP_COUNT ? <div className={`mx-0.5 h-0.5 flex-1 rounded-full sm:w-6 ${done ? "bg-[#c9a24a]" : "bg-stone-200"}`} /> : null}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-center text-xs text-stone-500">
        {step < 6 ? `Step ${step} of ${STEP_COUNT - 1}` : "Your starting plan"}
      </p>

      <div className="mt-8">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-stone-900">What kind of event is it?</p>
              <p className="mt-1 text-xs text-stone-500">Pick the closest match—we will tune the plan.</p>
              <div className="mt-3">
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
                How many guests (roughly)?
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
                  className="w-24 rounded-xl border border-stone-300 px-3 py-2 text-center text-base font-semibold text-stone-900"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">What time does the main event run?</p>
              <div className="mt-3">
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
              <p className="text-sm font-semibold text-stone-900">Season (helps with heat / cold notes)</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "", label: "Not sure" },
                    { id: "spring", label: "Spring" },
                    { id: "summer", label: "Summer" },
                    { id: "fall", label: "Fall" },
                    { id: "winter", label: "Winter" },
                  ]}
                  value={inp.season}
                  onChange={(v) => patch({ season: v })}
                  columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-stone-900">How will guests spend their time?</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "seated", label: "Seated dinner" },
                    { id: "cocktail", label: "Cocktail / mingling" },
                    { id: "ceremony", label: "Ceremony" },
                    { id: "buffet", label: "Buffet / casual" },
                    { id: "open_house", label: "Open house" },
                    { id: "dance", label: "Dance-focused" },
                    { id: "mixed", label: "Mixed" },
                  ]}
                  value={inp.format}
                  onChange={(v) => patch({ format: v })}
                  columns="grid-cols-2 sm:grid-cols-3"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Table style you are leaning toward</p>
              <div className="mt-3">
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
              <p className="text-sm font-semibold text-stone-900">Do you want everyone seated at once?</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "yes", label: "Yes" },
                    { id: "no", label: "No" },
                    { id: "unsure", label: "Not sure" },
                  ]}
                  value={inp.allSeated}
                  onChange={(v) => patch({ allSeated: v })}
                  columns="grid-cols-3"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-stone-900">Food</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "none", label: "No food" },
                    { id: "light", label: "Light snacks / dessert" },
                    { id: "buffet", label: "Buffet" },
                    { id: "plated", label: "Plated meal" },
                    { id: "stations", label: "Food stations" },
                  ]}
                  value={inp.food}
                  onChange={(v) => patch({ food: v })}
                  columns="grid-cols-2 sm:grid-cols-3"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Want help lining up catering?</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "yes", label: "Yes" },
                    { id: "no", label: "No" },
                    { id: "maybe", label: "Maybe" },
                  ]}
                  value={inp.cateringHelp}
                  onChange={(v) => patch({ cateringHelp: v })}
                  columns="grid-cols-3"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Drinks</p>
              <div className="mt-3">
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
              <p className="text-sm font-semibold text-stone-900">Music & sound</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "none", label: "None" },
                    { id: "background", label: "Background music" },
                    { id: "mic", label: "Mic / announcements" },
                    { id: "dj", label: "DJ / dance" },
                    { id: "live", label: "Live music" },
                  ]}
                  value={inp.music}
                  onChange={(v) => patch({ music: v })}
                  columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Dance floor?</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "yes", label: "Yes" },
                    { id: "no", label: "No" },
                    { id: "maybe", label: "Maybe" },
                  ]}
                  value={inp.danceFloor}
                  onChange={(v) => patch({ danceFloor: v })}
                  columns="grid-cols-3"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-stone-900">Do you already know you need a tent?</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "yes", label: "Yes" },
                    { id: "unsure", label: "Not sure" },
                    { id: "no", label: "No" },
                  ]}
                  value={inp.tentKnown}
                  onChange={(v) => patch({ tentKnown: v })}
                  columns="grid-cols-3"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Weather goal</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "basic", label: "Basic coverage" },
                    { id: "rain", label: "Rain backup" },
                    { id: "comfort", label: "Comfort / shade" },
                    { id: "full", label: "Full readiness" },
                  ]}
                  value={inp.weatherGoal}
                  onChange={(v) => patch({ weatherGoal: v })}
                  columns="grid-cols-2 sm:grid-cols-4"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Separate food or catering tent?</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "yes", label: "Yes" },
                    { id: "no", label: "No" },
                    { id: "unsure", label: "Not sure" },
                  ]}
                  value={inp.separateFoodTent}
                  onChange={(v) => patch({ separateFoodTent: v })}
                  columns="grid-cols-3"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Will things run into the evening?</p>
              <div className="mt-3">
                <Segmented
                  options={[
                    { id: "yes", label: "Yes" },
                    { id: "no", label: "No" },
                  ]}
                  value={inp.eveningExtended}
                  onChange={(v) => patch({ eveningExtended: v })}
                  columns="grid-cols-2 max-w-xs"
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-stone-900">Quick extras (optional)</p>
            <p className="text-xs text-stone-500">Toggle what applies—we will fold it into your plan.</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <ToggleRow
                label="Restroom / bathroom support"
                helper="Larger or longer outdoor events often need a plan here."
                checked={inp.extraRestroom}
                onChange={(v) => patch({ extraRestroom: v })}
              />
              <ToggleRow
                label="Games / lawn games / kids zone"
                helper="We will leave layout space if you want activities."
                checked={inp.extraGames}
                onChange={(v) => patch({ extraGames: v })}
              />
              <ToggleRow
                label="Gift table / cake table"
                checked={inp.extraGiftCake}
                onChange={(v) => patch({ extraGiftCake: v })}
              />
              <ToggleRow
                label="Extra service tables"
                helper="Registration, favors, dessert, etc."
                checked={inp.extraServiceTables}
                onChange={(v) => patch({ extraServiceTables: v })}
              />
              <ToggleRow
                label="Lounge / hangout area"
                checked={inp.extraLounge}
                onChange={(v) => patch({ extraLounge: v })}
              />
              <ToggleRow
                label="Photo or display area"
                checked={inp.extraPhoto}
                onChange={(v) => patch({ extraPhoto: v })}
              />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            <div className="space-y-6">
              <div className="rounded-2xl border border-amber-100 bg-[#fffbf0] p-5 sm:p-6">
                <p className="text-base font-semibold leading-snug text-stone-900">{result.headline}</p>
                <p className="mt-2 text-xs text-stone-600">
                  This recommendation gives you a safer, more comfortable starting point—final numbers depend on your site and schedule.
                </p>
                <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-amber-200/80 bg-white/80 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={inp.comfortableBoost}
                    onChange={(e) => patch({ comfortableBoost: e.target.checked })}
                    className="h-5 w-5 rounded border-stone-300 accent-[#b8860b]"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-stone-900">Make it more comfortable</span>
                    <span className="text-xs text-stone-600">Slightly larger tent class, extra chairs, and buffer—great when you want breathing room.</span>
                  </span>
                </label>
              </div>

              <ResultSection title="1. Your starting setup">
                <ul className="list-none space-y-2.5">
                  {result.startingSetup.map((row) => (
                    <li key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                      <span className="font-semibold text-stone-900">{row.label}:</span>
                      <span>{row.value}</span>
                    </li>
                  ))}
                </ul>
              </ResultSection>

              <ResultSection title="2. Recommended add-ons">
                <ul className="list-disc space-y-2 pl-5">
                  {result.addOns.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                {result.danceFloorRec && !result.addOns.some((a) => a.startsWith("Dance floor")) ? (
                  <p className="mt-3 text-sm text-stone-600">
                    <span className="font-semibold text-stone-800">Dance floor note:</span> {result.danceFloorRec}
                  </p>
                ) : null}
              </ResultSection>
            </div>

            <div className="space-y-6">
              <ResultSection title="3. Food & service notes">
                <ul className="list-disc space-y-2 pl-5">
                  {result.foodNotes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                {result.partnershipNote ? <p className="mt-3 rounded-lg bg-amber-50/80 px-3 py-2 text-sm text-stone-800">{result.partnershipNote}</p> : null}
              </ResultSection>

              <ResultSection title="4. Comfort & weather notes">
                <ul className="list-disc space-y-2 pl-5">
                  {result.comfortNotes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                  <li>{result.lightingNote}</li>
                  {result.weatherItems.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-stone-700">
                  <span className="font-semibold text-stone-900">Audio:</span> {result.audioNote}
                </p>
              </ResultSection>

              <ResultSection title="5. Commonly forgotten items">
                <ul className="list-disc space-y-2 pl-5">
                  {result.forgottenItems.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {result.restroomNote ? <p className="mt-3 text-sm text-stone-700">{result.restroomNote}</p> : null}
                {result.gamesNote ? <p className="mt-3 text-sm text-stone-700">{result.gamesNote}</p> : null}
              </ResultSection>

              <ResultSection title="6. Next step">
                <p className="text-sm text-stone-700">
                  Ready to make it real? Share this plan when you call or book—we will confirm layout, power, and weather details for your property.
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
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-50"
                  >
                    Copy plan text
                  </button>
                  <a
                    href={`mailto:${business.email}?subject=${encodeURIComponent("Quick Event Planner summary")}&body=${encodeURIComponent(summaryText)}`}
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-50"
                  >
                    Email this plan
                  </a>
                  <Link
                    href={`${quoteHref}`}
                    onClick={sendToQuote}
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-50"
                    prefetch={true}
                  >
                    Send plan to quote form
                  </Link>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-stone-500">{result.disclaimer}</p>
              </ResultSection>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/80 pt-6">
        {step > 1 && step < 6 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 6 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-bold text-[#f5e0b3] shadow-sm hover:bg-stone-800"
          >
            {step === 5 ? "See my plan" : "Next"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setInp(defaultQuickPlannerInput());
            }}
            className="ml-auto rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
