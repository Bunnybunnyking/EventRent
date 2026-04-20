"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  checklistCategoryLabels,
  checklistCategoryOrder,
  computeBackyardChecklistResult,
  defaultBackyardChecklistInput,
  formatBackyardChecklistPlainText,
  mergeParsedIntoDefault,
  parseChecklistSearchParams,
  serializeChecklistInput,
  type BackyardChecklistInput,
  type BackyardChecklistInputPatch,
  type ChecklistLineItem,
  type DayPart,
  type FoodLevel,
  type GuestRange,
  type KidsLevel,
  type MusicPlan,
  type PrefQuick,
  type PrivateEventType,
  type SetupConfirm,
  type SiteGuestQuick,
  type Timeframe,
  type VenueKind,
  type WeatherConcernLevel,
} from "@/lib/backyard-checklist-logic";
import { bookNowSectionClass, callNowSectionClass } from "@/lib/cta-styles";
import { business } from "@/lib/site-data";

const STEP_COUNT = 3 as const;
type Step = 1 | 2 | 3;

const STORAGE_KEY = "ctpr_backyard_checklist_v1";
const STORAGE_DEBOUNCE_MS = 450;

function clampStep(n: unknown): Step {
  const x = typeof n === "number" ? n : 1;
  if (x < 1) return 1;
  if (x > STEP_COUNT) return STEP_COUNT;
  return x as Step;
}

/** Restore answers, step, and checked lines from localStorage (v1 had inp only; v2 adds step + checks). */
function readStoredChecklist(raw: string): {
  inp: BackyardChecklistInput;
  step: Step;
  furthest: Step;
  checkedIds: string[];
} | null {
  try {
    const data = JSON.parse(raw) as {
      inp?: unknown;
      step?: unknown;
      furthest?: unknown;
      checkedIds?: unknown;
    };
    if (!data || typeof data !== "object" || data.inp == null) return null;
    const inp = mergeParsedIntoDefault(data.inp as BackyardChecklistInputPatch);
    const step = clampStep(data.step);
    let furthest = clampStep(data.furthest);
    if (furthest < step) furthest = step;
    const checkedIds = Array.isArray(data.checkedIds) ? data.checkedIds.filter((id): id is string => typeof id === "string") : [];
    return { inp, step, furthest, checkedIds };
  } catch {
    return null;
  }
}

function canGoToStep(target: Step, furthest: Step): boolean {
  return target <= furthest;
}

const eventTypes: { id: PrivateEventType; label: string }[] = [
  { id: "birthday", label: "Birthday" },
  { id: "graduation", label: "Graduation" },
  { id: "anniversary", label: "Anniversary" },
  { id: "family_gathering", label: "Family" },
  { id: "shower", label: "Shower" },
  { id: "retirement", label: "Retirement" },
  { id: "religious_family", label: "Religious / family" },
  { id: "backyard_social", label: "Backyard party" },
  { id: "other_private", label: "Other" },
];

const stepMeta: { label: string; hint: string }[] = [
  { label: "Event basics", hint: "Tell us a little about the event: when, where, food, sound, and kids." },
  {
    label: "Setup, site & style",
    hint: "What you’re planning, how the space feels, fun ideas, and vibe. Trending enhancements go straight on your checklist.",
  },
  { label: "Your checklist", hint: "Check items off, share with family or co-hosts, and move on when you’re ready." },
];

const setupToggles: { key: keyof SetupConfirm; label: string; helper?: string }[] = [
  { key: "tentOrCover", label: "Tent or covered area" },
  { key: "tables", label: "Tables" },
  { key: "chairs", label: "Chairs / seating" },
  { key: "buffetServing", label: "Buffet or serving tables" },
  { key: "dessertCakeTable", label: "Dessert or cake table" },
  { key: "barDrinkStation", label: "Bar or drink station" },
  { key: "musicSpeakerZone", label: "Music / speaker area" },
  { key: "danceFloor", label: "Dance floor or dance space" },
  { key: "lighting", label: "Lighting (beyond porch floods)" },
  { key: "sidewalls", label: "Sidewalls or weather panels" },
  { key: "generatorPower", label: "Generator or clear power plan" },
  { key: "restroomPlan", label: "Restroom plan for guest count" },
  { key: "parkingPlan", label: "Parking plan" },
  { key: "trashCleanup", label: "Trash & cleanup plan" },
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
              ? "border-neutral-950 bg-neutral-950 text-white shadow-sm"
              : "border-neutral-200 bg-white text-neutral-800 hover:border-[#d4b87a]/60 hover:bg-[#fffbf0]/50"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ToggleQuiet({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full min-h-[52px] items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-neutral-300"
    >
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? "bg-emerald-600" : "bg-neutral-300"}`}
      >
        <span
          className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </span>
    </button>
  );
}

/** Gold switch style, matches Quick Event Planner affordance */
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
      className="flex w-full min-h-[52px] items-start gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#d4b87a]/50"
    >
      <span
        className={`mt-0.5 flex h-6 w-11 shrink-0 rounded-full p-0.5 transition ${checked ? "bg-[#b8860b]" : "bg-neutral-300"}`}
      >
        <span className={`h-5 w-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </span>
      <span>
        <span className="block text-sm font-semibold text-neutral-900">{label}</span>
        {helper ? <span className="mt-0.5 block text-xs text-neutral-500">{helper}</span> : null}
      </span>
    </button>
  );
}

function StepProgressBar({ step }: { step: Step }) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-neutral-500">
        <span>
          Step {step} of {STEP_COUNT}
        </span>
        <span>{Math.round((step / STEP_COUNT) * 100)}%</span>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-emerald-600 transition-[width] duration-500 ease-out"
          style={{ width: `${(step / STEP_COUNT) * 100}%` }}
        />
      </div>
    </div>
  );
}

function ChecklistLine({
  item,
  checked,
  onToggle,
}: {
  item: ChecklistLineItem;
  checked: boolean;
  onToggle: () => void;
}) {
  const aria = checked
    ? `Unmark. This item is not covered yet: ${item.text}`
    : `Mark as covered for your event (done, bought, booked, or assigned): ${item.text}`;
  return (
    <label className="flex cursor-pointer gap-3 rounded-lg px-1 py-2.5 transition hover:bg-neutral-50/90">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        aria-label={aria}
        className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-600 focus:ring-offset-0"
      />
      <span className={`min-w-0 text-[0.9375rem] leading-snug text-neutral-800 ${checked ? "text-neutral-400 line-through" : ""}`}>
        {item.text}
      </span>
    </label>
  );
}

function SectionCard({
  eyebrow,
  title,
  children,
  variant = "default",
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  variant?: "default" | "forget" | "muted" | "win" | "attention" | "upgrade";
}) {
  const styles =
    variant === "forget"
      ? "border-[#e8d5a8]/90 bg-gradient-to-br from-[#fffbf0] to-white"
      : variant === "muted"
        ? "border-neutral-200 bg-neutral-50/50"
        : variant === "win"
          ? "border-emerald-200/80 bg-gradient-to-br from-emerald-50/40 to-white"
          : variant === "attention"
            ? "border-red-200/80 bg-gradient-to-br from-red-50/40 to-white"
            : variant === "upgrade"
              ? "border-[#e8d5a8]/90 bg-gradient-to-br from-amber-50/30 to-[#fffbf0]/50"
              : "border-neutral-200/90 bg-white";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm sm:p-6 ${styles}`}>
      {eyebrow ? (
        <p
          className={`text-[0.65rem] font-bold uppercase tracking-[0.14em] ${
            variant === "win"
              ? "text-emerald-800/90"
              : variant === "attention"
                ? "text-red-800/80"
                : variant === "upgrade" || variant === "forget"
                  ? "text-[#8a6218]"
                  : "text-neutral-500"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h3 className={`font-semibold tracking-tight text-neutral-900 ${eyebrow ? "mt-1.5" : ""}`}>{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function BackyardPartyChecklistGenerator({ embedded = false }: { embedded?: boolean }) {
  const [step, setStep] = useState<Step>(1);
  const [furthest, setFurthest] = useState<Step>(1);
  const [inp, setInp] = useState<BackyardChecklistInput>(() => defaultBackyardChecklistInput());
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [linkMsg, setLinkMsg] = useState<string | null>(null);
  const [resumeBanner, setResumeBanner] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const skipNextPersistRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const parsed = parseChecklistSearchParams(window.location.search);
    if (parsed?.eventType) {
      setInp(mergeParsedIntoDefault(parsed));
      setStorageReady(true);
      return;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const restored = readStoredChecklist(raw);
      if (restored) {
        setInp(restored.inp);
        setStep(restored.step);
        setFurthest(restored.furthest);
        setCheckedIds(new Set(restored.checkedIds));
        setResumeBanner(true);
      }
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !storageReady) return;
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            v: 2,
            t: Date.now(),
            inp,
            step,
            furthest,
            checkedIds: [...checkedIds],
          }),
        );
      } catch {
        /* quota / private mode */
      }
    }, STORAGE_DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [inp, step, furthest, checkedIds, storageReady]);

  const patch = (p: Partial<BackyardChecklistInput>) => setInp((s) => ({ ...s, ...p }));
  const patchSetup = (p: Partial<SetupConfirm>) => setInp((s) => ({ ...s, setup: { ...s.setup, ...p } }));
  const patchSite = (p: Partial<SiteGuestQuick>) => setInp((s) => ({ ...s, site: { ...s.site, ...p } }));
  const patchPrefs = (p: Partial<PrefQuick>) => setInp((s) => ({ ...s, prefs: { ...s.prefs, ...p } }));

  const result = useMemo(() => computeBackyardChecklistResult(inp), [inp]);
  const plainText = useMemo(() => formatBackyardChecklistPlainText(inp, result), [inp, result]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/backyard-party-checklist?${serializeChecklistInput(inp)}`;
  }, [inp]);

  const quoteHref = useMemo(() => {
    const q = new URLSearchParams();
    q.set("etype", eventTypes.find((e) => e.id === inp.eventType)?.label?.replace(/\s+/g, " ") ?? "Private party");
    q.set("tool", "backyard-checklist");
    return `/contact?${q.toString()}#quote`;
  }, [inp.eventType]);

  const copyText = async (text: string, ok: () => void) => {
    try {
      await navigator.clipboard.writeText(text);
      ok();
    } catch {
      /* ignore */
    }
  };

  const persistForQuote = () => {
    try {
      sessionStorage.setItem("ctpr_backyard_checklist", plainText);
    } catch {
      /* ignore */
    }
  };

  const saveLocal = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          v: 2,
          t: Date.now(),
          inp,
          step,
          furthest,
          checkedIds: [...checkedIds],
        }),
      );
      setSaveMsg("Saved on this device");
      setTimeout(() => setSaveMsg(null), 2500);
    } catch {
      setSaveMsg("Could not save");
      setTimeout(() => setSaveMsg(null), 2500);
    }
  };

  const copyShareLink = () => {
    if (!shareUrl) return;
    void copyText(shareUrl, () => {
      setLinkMsg("Link copied");
      setTimeout(() => setLinkMsg(null), 2500);
    });
  };

  const printFriendly = () => {
    window.print();
  };

  const toggleLine = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const goNext = () => {
    if (step < STEP_COUNT) {
      const n = (step + 1) as Step;
      setStep(n);
      setFurthest((f) => (n > f ? n : f));
    }
  };

  const goBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    skipNextPersistRef.current = true;
    setStep(1);
    setFurthest(1);
    setInp(defaultBackyardChecklistInput());
    setCheckedIds(new Set());
    setResumeBanner(false);
  };

  return (
    <section
      className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white shadow-[0_2px_32px_rgba(0,0,0,0.06)] sm:rounded-3xl"
      aria-label="Backyard and private party checklist generator"
    >
      <div className={`${embedded ? "px-4 py-5 sm:px-6 sm:py-6" : "px-4 py-6 sm:px-8 sm:py-8"}`}>
        {!embedded ? (
          <header className="border-b border-neutral-200 pb-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8a6218]">Party readiness</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">Backyard &amp; private party checklist</h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-600">
              Confirm what matters, catch easy misses, and get light ideas, without replacing our{" "}
              <Link
                href="/planning#tent-size-estimator"
                className="font-medium text-[#8a6218] underline decoration-[#d4b87a] underline-offset-2 hover:text-neutral-950"
              >
                tent calculator
              </Link>{" "}
              or{" "}
              <Link
                href="/planning#quick-event-planner"
                className="font-medium text-[#8a6218] underline decoration-[#d4b87a] underline-offset-2 hover:text-neutral-950"
              >
                Quick Event Planner
              </Link>
              . Your progress saves in this browser as you go. Come back anytime on the same device and phone or computer.
            </p>
          </header>
        ) : (
          <p className="border-b border-neutral-200 pb-4 text-sm text-neutral-600">
            Short steps, then your checklist. Your answers stay in this browser automatically so you can close the tab and pick up where you left off.
          </p>
        )}

        <StepProgressBar step={step} />

        {resumeBanner ? (
          <div
            role="status"
            className="mt-4 flex flex-col gap-2 rounded-xl border border-emerald-200/90 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-950 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>Welcome back. We loaded your last answers and checklist marks from this browser.</span>
            <button
              type="button"
              onClick={() => setResumeBanner(false)}
              className="shrink-0 self-start rounded-full border border-emerald-300/90 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-50 sm:self-auto"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        <p className="mt-5 text-[0.9375rem] font-medium text-neutral-900">{stepMeta[step - 1].hint}</p>

        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Steps">
          {([1, 2, 3] as const).map((n) => {
            const allowed = canGoToStep(n, furthest);
            return (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={step === n}
                disabled={!allowed}
                onClick={() => allowed && setStep(n)}
                className={`min-h-[40px] rounded-full px-3 py-2 text-left text-xs font-semibold transition sm:text-[0.8125rem] ${
                  step === n
                    ? "bg-neutral-950 text-white shadow-sm ring-1 ring-neutral-950"
                    : allowed
                      ? "border border-neutral-200 bg-white text-neutral-700 hover:border-[#d4b87a]/50 hover:bg-[#fffbf0]/40"
                      : "cursor-not-allowed border border-transparent bg-neutral-50 text-neutral-300"
                }`}
              >
                <span className="opacity-70">{n}.</span> {stepMeta[n - 1].label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 min-h-[12rem]">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-neutral-800">Occasion</p>
                <div className="mt-2">
                  <Segmented options={eventTypes} value={inp.eventType} onChange={(v) => patch({ eventType: v })} columns="grid-cols-2 sm:grid-cols-3" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-800">Approximate guest count</p>
                <div className="mt-2">
                  <Segmented<GuestRange>
                    options={[
                      { id: "under25", label: "Under ~25" },
                      { id: "25_50", label: "25 to 50" },
                      { id: "50_100", label: "50 to 100" },
                      { id: "100_plus", label: "100+" },
                    ]}
                    value={inp.guestRange}
                    onChange={(v) => patch({ guestRange: v })}
                    columns="grid-cols-2 sm:grid-cols-4"
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-neutral-800">Location</p>
                  <div className="mt-2">
                    <Segmented<VenueKind>
                      options={[
                        { id: "backyard_home", label: "Backyard / home" },
                        { id: "private_venue", label: "Private venue" },
                      ]}
                      value={inp.venue}
                      onChange={(v) => patch({ venue: v })}
                      columns="grid-cols-1"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800">Time of day</p>
                  <div className="mt-2">
                    <Segmented<DayPart>
                      options={[
                        { id: "day", label: "Daytime" },
                        { id: "evening", label: "Evening" },
                      ]}
                      value={inp.dayPart}
                      onChange={(v) => patch({ dayPart: v })}
                      columns="grid-cols-2"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-neutral-800">Food</p>
                  <div className="mt-2">
                    <Segmented<FoodLevel>
                      options={[
                        { id: "full", label: "Full meal" },
                        { id: "light", label: "Light / apps" },
                        { id: "none", label: "Drinks / snacks" },
                      ]}
                      value={inp.food}
                      onChange={(v) => patch({ food: v })}
                      columns="grid-cols-3"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800">Weather on your mind</p>
                  <div className="mt-2">
                    <Segmented<WeatherConcernLevel>
                      options={[
                        { id: "low", label: "Low" },
                        { id: "medium", label: "Some" },
                        { id: "high", label: "High" },
                      ]}
                      value={inp.weatherConcern}
                      onChange={(v) => patch({ weatherConcern: v })}
                      columns="grid-cols-3"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-neutral-800">When you’re planning</p>
                  <div className="mt-2">
                    <Segmented<Timeframe>
                      options={[
                        { id: "this_month", label: "This month" },
                        { id: "next_3_months", label: "Next 3 months" },
                        { id: "later", label: "Later" },
                        { id: "not_sure", label: "Not sure yet" },
                      ]}
                      value={inp.timeframe}
                      onChange={(v) => patch({ timeframe: v })}
                      columns="grid-cols-2 sm:grid-cols-4"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800">Music / sound</p>
                  <div className="mt-2">
                    <Segmented<MusicPlan>
                      options={[
                        { id: "none", label: "Quiet / none" },
                        { id: "speakers", label: "Speakers" },
                        { id: "dj_or_live", label: "DJ or live" },
                      ]}
                      value={inp.music}
                      onChange={(v) => patch({ music: v })}
                      columns="grid-cols-3"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-800">Kids expected</p>
                <div className="mt-2">
                  <Segmented<KidsLevel>
                    options={[
                      { id: "none", label: "Few / none" },
                      { id: "some", label: "Some" },
                      { id: "many", label: "Many" },
                    ]}
                    value={inp.kids}
                    onChange={(v) => patch({ kids: v })}
                    columns="grid-cols-3"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-neutral-600">Flip on what you already plan. This helps us confirm what’s left and what to mention in your checklist.</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {setupToggles.map((row) => (
                  <ToggleRow
                    key={row.key}
                    label={row.label}
                    helper={row.helper}
                    checked={inp.setup[row.key]}
                    onChange={(v) => patchSetup({ [row.key]: v })}
                  />
                ))}
              </div>
              <div className="border-t border-neutral-200 pt-6">
                <p className="text-sm font-medium text-neutral-900">Site &amp; crowd</p>
                <p className="mt-1 text-sm text-neutral-600">Three quick signals about the space and flow.</p>
                <div className="mt-3 space-y-2">
                  <ToggleQuiet
                    label="Space feels tight, sloped, or tricky for setup"
                    checked={inp.site.spaceTightOrTricky}
                    onChange={(v) => patchSite({ spaceTightOrTricky: v })}
                  />
                  <ToggleQuiet
                    label="Power is far from the yard or I’m unsure about load"
                    checked={inp.site.powerFarOrUnsure}
                    onChange={(v) => patchSite({ powerFarOrUnsure: v })}
                  />
                  <ToggleQuiet
                    label="Expect lots of standing and mingling"
                    checked={inp.site.expectLotsOfMingling}
                    onChange={(v) => patchSite({ expectLotsOfMingling: v })}
                  />
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-6">
                <p className="text-sm font-medium text-neutral-900">Fun ideas on your checklist</p>
                <p className="mt-1 text-sm text-neutral-600">Turn this on to add a short fun-ideas section to the checklist (section F).</p>
                <div className="mt-3">
                  <ToggleQuiet label="Include fun ideas for the day" checked={inp.prefs.wantFunIdeas} onChange={(v) => patchPrefs({ wantFunIdeas: v })} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-800">Overall vibe</p>
                <p className="mt-1 text-sm text-neutral-600">Shapes trending enhancements and fun ideas.</p>
                <div className="mt-2">
                  <Segmented
                    options={[
                      { id: "keep_simple", label: "Keep it simple" },
                      { id: "balanced", label: "Balanced" },
                      { id: "make_special", label: "Make it special" },
                    ]}
                    value={inp.prefs.vibe}
                    onChange={(v) => patchPrefs({ vibe: v as PrefQuick["vibe"] })}
                    columns="grid-cols-3"
                  />
                </div>
              </div>
              <p className="rounded-xl border border-emerald-100/90 bg-emerald-50/40 px-4 py-3 text-sm text-emerald-950">
                <span className="font-semibold">Trending party enhancements</span> (section E on your checklist) are included automatically from your answers. No extra toggle needed.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 print:space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-[#fffbf0]/90 via-white to-white p-6 sm:p-7 ring-1 ring-[#e8d5a8]/40">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#8a6218]">Your party checklist</p>
                <h3 className="mt-2 text-xl font-semibold text-neutral-950 sm:text-2xl">{result.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">{result.subhead}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                  <span>
                    <span className="font-semibold text-emerald-700">Green</span> = confirmed / done
                  </span>
                  <span>
                    <span className="font-semibold text-red-700">Red</span> = still to nail down
                  </span>
                  <span>
                    <span className="font-semibold text-[#8a6218]">Gold</span> = upgrades &amp; nice-to-haves
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-950">A. Your party checklist</h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    <span className="font-medium text-neutral-900">Check a line = you’ve covered it</span> for your party (done, ordered, booked, or decided it doesn’t apply). Strikes show what’s still open. Only you see these checks on this device.{" "}
                    <span className="font-medium text-neutral-900">Section B</span> mirrors the setup toggles you chose earlier; this section is your separate task list.
                  </p>
                </div>
                <div className="space-y-2">
                  {checklistCategoryOrder.map((cat) => {
                    const items = result.checklistByCategory[cat];
                    if (!items.length) return null;
                    return (
                      <details key={cat} open className="group rounded-2xl border border-neutral-200 bg-white open:shadow-md open:ring-1 open:ring-neutral-900/5">
                        <summary className="cursor-pointer list-none px-4 py-3.5 pr-10 text-sm font-semibold text-neutral-950 marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
                          <span className="flex items-center justify-between gap-2">
                            {checklistCategoryLabels[cat]}
                            <span className="text-xs font-normal text-neutral-400 group-open:rotate-180">▼</span>
                          </span>
                        </summary>
                        <div className="border-t border-neutral-200 px-4 pb-4 pt-1 sm:px-5">
                          <ul className="divide-y divide-neutral-100">
                            {items.map((it) => (
                              <li key={it.id}>
                                <ChecklistLine item={it} checked={checkedIds.has(it.id)} onToggle={() => toggleLine(it.id)} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SectionCard variant="win" eyebrow="B." title="Confirmed so far">
                  <ul className="space-y-2 text-sm text-neutral-800">
                    {result.confirmedItems.length ? (
                      result.confirmedItems.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="text-emerald-600" aria-hidden>
                            ✓
                          </span>
                          {c}
                        </li>
                      ))
                    ) : (
                      <li className="text-neutral-500">Nothing toggled on yet. We’ll emphasize open items below.</li>
                    )}
                  </ul>
                </SectionCard>
                <SectionCard variant="attention" eyebrow="C." title="Still to confirm">
                  <ul className="space-y-2 text-sm text-neutral-800">
                    {result.stillToConfirm.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-red-600" aria-hidden>
                          ○
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </SectionCard>
              </div>

              <div>
                <SectionCard variant="forget" eyebrow="D." title="Things people forget">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {result.thingsPeopleForget.map((t) => (
                      <li key={t} className="flex gap-2 rounded-lg border border-[#e8d5a8]/50 bg-white/90 px-3 py-2 text-sm text-neutral-800 shadow-sm">
                        <span className="font-medium text-[#b8860b]" aria-hidden>
                          +
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </SectionCard>
              </div>

              <div>
                <SectionCard variant="upgrade" eyebrow="E." title="Trending party enhancements">
                  <p className="mb-4 text-sm text-neutral-600">Nice-to-have upgrades picked from your answers. Not a shopping list.</p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {result.popularEnhancements.map((e) => (
                        <li
                          key={e.id}
                          className="rounded-xl border border-[#e8d5a8]/80 bg-gradient-to-br from-[#fffbf0] to-amber-50/20 p-4 shadow-sm"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-neutral-950">{e.title}</p>
                            {e.badge ? (
                              <span className="rounded-full bg-white/90 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[#8a6218] ring-1 ring-[#d4b87a]/60">
                                {e.badge}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1.5 text-sm leading-snug text-neutral-600">{e.why}</p>
                        </li>
                      ))}
                    </ul>
                </SectionCard>
              </div>

              {inp.prefs.wantFunIdeas ? (
                <div>
                  <SectionCard eyebrow="F." title="Fun ideas for your event">
                    <ul className="flex flex-col gap-3">
                      {result.funIdeas.map((f) => (
                        <li key={f.id} className="rounded-xl border border-emerald-100/90 bg-emerald-50/20 px-4 py-3">
                          <p className="font-medium text-neutral-950">{f.title}</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {f.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-900"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </SectionCard>
                </div>
              ) : null}

              <SectionCard variant="muted" eyebrow="G." title="Next steps & sharing">
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-700">
                  {result.nextStepHints.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={saveLocal}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Save now
                  </button>
                  <button
                    type="button"
                    onClick={() => void copyText(plainText, () => {})}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Copy checklist
                  </button>
                  <a
                    href={`mailto:${business.email}?subject=${encodeURIComponent("Backyard party checklist")}&body=${encodeURIComponent(plainText)}`}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Email checklist
                  </a>
                  <button
                    type="button"
                    onClick={copyShareLink}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Copy share link
                  </button>
                  <button
                    type="button"
                    onClick={printFriendly}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Print / PDF
                  </button>
                </div>
                <p className="mt-3 text-xs text-neutral-500">
                  We auto-save your answers and checked items in this browser as you work. Use <span className="font-medium text-neutral-600">Save now</span> if you want confirmation it landed. For another device or a co-host, use{" "}
                  <span className="font-medium text-neutral-600">Copy share link</span>. Print uses your browser. Choose “Save as PDF” for a file.
                </p>
                {(saveMsg || linkMsg) && <p className="mt-2 text-sm font-medium text-emerald-800">{saveMsg ?? linkMsg}</p>}

                <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200/80 pt-6 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/quick-event-planner"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Continue to planner
                  </Link>
                  <Link
                    href="/rental-inventory"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Browse rentals
                  </Link>
                  <Link
                    href={quoteHref}
                    onClick={persistForQuote}
                    className={`${bookNowSectionClass} justify-center text-center text-sm`}
                    prefetch={true}
                  >
                    Get a quote
                  </Link>
                  <a href={business.phoneHref} className={`${callNowSectionClass} justify-center text-sm`}>
                    Call us
                  </a>
                </div>
              </SectionCard>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="min-h-[44px] rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
            >
              Back
            </button>
          ) : (
            <span />
          )}
          {step < STEP_COUNT ? (
            <button
              type="button"
              onClick={goNext}
              className="min-h-[44px] rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-neutral-950 hover:bg-neutral-900"
            >
              {step === 2 ? "See my checklist" : "Continue"}
            </button>
          ) : (
            <div className="ml-auto flex flex-wrap gap-2 print:hidden">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setFurthest(1);
                }}
                className="min-h-[44px] rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                Edit answers
              </button>
              <button type="button" onClick={reset} className="min-h-[44px] rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50">
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
