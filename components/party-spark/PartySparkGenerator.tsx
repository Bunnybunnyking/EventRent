"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type {
  AudienceOption,
  EventPlanOption,
  FlowMode,
  GuestBandOption,
  PartySparkCard,
  RefinementIntent,
  VibeOption,
} from "@/lib/party-spark-types";
import { generatePartyIdeas } from "@/lib/party-spark-logic";
import { OptionChip } from "./OptionChip";
import { ResultFlipCard } from "./ResultFlipCard";
import { TextIdeaModal } from "./TextIdeaModal";
import { RefinementChips } from "./RefinementChips";
import { FAQAccordion } from "./FAQAccordion";
import { formatShareText, ShareIdeaCard } from "./ShareIdeaCard";

const EVENT_OPTIONS: EventPlanOption[] = [
  "Graduation Party",
  "Birthday Party",
  "Backyard Party",
  "Baby Shower",
  "Bridal Shower",
  "Wedding Shower",
  "Game Night",
  "Pizza Night",
  "Cookout",
  "Corporate Event",
  "School Event",
  "Surprise Me",
];

const AUDIENCE_OPTIONS: AudienceOption[] = [
  "Family",
  "Friends",
  "Kids",
  "Adults",
  "Coworkers",
  "Mixed Crowd",
];

const VIBE_OPTIONS: VibeOption[] = [
  "Family-Friendly",
  "Classy",
  "Fun",
  "Chill",
  "Bold",
  "Playful Adults-Only",
];

const GUEST_OPTIONS: GuestBandOption[] = ["5–10", "10–20", "20–40", "40–60", "60–80", "100+"];

function IconSpark({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l1.2 4.2L17 8l-3.8 1.8L12 14l-1.2-4.2L7 8l3.8-1.8L12 2zM5 14l.8 2.8L9 18l-3.2 1.5L5 22l-.8-2.8L1 18l3.2-1.5L5 14zM17 15l.6 2.1L20 18l-2.4 1.1L17 21l-.6-2.1L14 18l2.4-1.1L17 15z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconDice({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3.5" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

export type PartySparkGeneratorProps = {
  quoteHref?: string;
  brandLine?: string;
  brandShort?: string;
};

export function PartySparkGenerator({
  quoteHref = "/contact#quote",
  brandLine = "Connecticut Party Rentals",
  brandShort = "Connecticut Party Rentals",
}: PartySparkGeneratorProps) {
  const [flowMode, setFlowMode] = useState<FlowMode>("know");
  const [eventPlan, setEventPlan] = useState<EventPlanOption | null>(null);
  const [audience, setAudience] = useState<AudienceOption | null>(null);
  const [vibe, setVibe] = useState<VibeOption>("Family-Friendly");
  const [whoFor, setWhoFor] = useState("");
  const [nickname, setNickname] = useState("");
  const [town, setTown] = useState("");
  const [school, setSchool] = useState("");
  const [classYear, setClassYear] = useState("");
  const [themeKeyword, setThemeKeyword] = useState("");
  const [keywords, setKeywords] = useState("");
  const [guestBand, setGuestBand] = useState<GuestBandOption | null>(null);

  const [phase, setPhase] = useState<"wizard" | "loading" | "results">("wizard");
  const runCounter = useRef(0);
  const [dealId, setDealId] = useState(0);
  const [diceRolls, setDiceRolls] = useState(0);
  const [cards, setCards] = useState<PartySparkCard[]>([]);

  const [textCard, setTextCard] = useState<PartySparkCard | null>(null);
  const [helpPickOpen, setHelpPickOpen] = useState(false);
  const [shortlist, setShortlist] = useState<Set<string>>(() => new Set());
  const [sharePreview, setSharePreview] = useState<PartySparkCard | null>(null);

  const handleModeChange = (mode: FlowMode) => {
    setFlowMode(mode);
    if (mode === "surprise") setEventPlan("Surprise Me");
    else if (eventPlan === "Surprise Me") setEventPlan(null);
  };

  const canGenerate = useMemo(
    () => Boolean(flowMode && eventPlan && audience && guestBand),
    [flowMode, eventPlan, audience, guestBand]
  );

  const runGenerate = useCallback(
    (intent: RefinementIntent | null) => {
      if (!eventPlan || !audience || !guestBand || !flowMode) return;
      setPhase("loading");
      runCounter.current += 1;
      const next = runCounter.current;
      window.setTimeout(() => {
        const nextCards = generatePartyIdeas(
          {
            flowMode,
            eventPlan,
            audience,
            vibe,
            whoFor,
            nickname,
            town,
            school,
            classYear,
            themeKeyword,
            keywords,
            guestBand,
          },
          intent,
          next
        );
        setCards(nextCards);
        setDealId((d) => d + 1);
        setPhase("results");
      }, 620);
    },
    [
      audience,
      classYear,
      eventPlan,
      flowMode,
      guestBand,
      keywords,
      nickname,
      school,
      themeKeyword,
      town,
      vibe,
      whoFor,
    ]
  );

  const onGenerateClick = () => {
    runGenerate(null);
  };

  const onRefinement = (intent: RefinementIntent) => {
    runGenerate(intent);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

  const shareIdea = async (card: PartySparkCard) => {
    const body = formatShareText(card, brandLine);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Party idea", text: body });
        return;
      } catch {
        /* fall through */
      }
    }
    await copy(body);
  };

  const toggleShortlist = (name: string) => {
    setShortlist((prev) => {
      const n = new Set(prev);
      if (n.has(name)) n.delete(name);
      else {
        if (n.size >= 4) return prev;
        n.add(name);
      }
      return n;
    });
  };

  const voteCopyText = useMemo(() => {
    const names = cards.filter((c) => shortlist.has(c.partyName)).map((c) => c.partyName);
    if (names.length < 2) return "";
    return `Help us pick a party name:\n${names.map((n, i) => `${i + 1}) ${n}`).join("\n")}\n\nReply in the group chat with a number.`;
  }, [cards, shortlist]);

  const resetForm = () => {
    runCounter.current = 0;
    setPhase("wizard");
    setFlowMode("know");
    setEventPlan(null);
    setAudience(null);
    setGuestBand(null);
    setVibe("Family-Friendly");
    setWhoFor("");
    setNickname("");
    setTown("");
    setSchool("");
    setClassYear("");
    setThemeKeyword("");
    setKeywords("");
    setCards([]);
    setHelpPickOpen(false);
    setShortlist(new Set());
    setSharePreview(null);
  };

  return (
    <div className="relative text-[#111111]">
      <div
        className="pointer-events-none absolute inset-x-0 -top-6 h-28 bg-[radial-gradient(ellipse_85%_55%_at_50%_-5%,rgba(200,162,74,0.08),transparent_65%)] sm:-top-8 sm:h-36"
        aria-hidden
      />

      <header className="relative text-center">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#111111] sm:text-3xl">
          Party Spark
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#555555]">
          A few quick picks, then names, invite lines, and a simple setup sketch. Text yourself a favorite if you want to
          keep it.
        </p>
      </header>

      {/* Single-page form */}
      {phase === "wizard" ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="relative mt-6 rounded-2xl border border-[#E6E1D8] bg-white/95 p-4 shadow-[0_8px_32px_-16px_rgba(17,17,17,0.12)] ring-1 ring-black/[0.03] sm:p-5"
        >
          <div className="space-y-5 sm:space-y-6">
            {/* Starting point */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">Starting point</p>
              <div
                className="mt-2 flex rounded-xl border border-[#E6E1D8] bg-[#FAF8F3] p-1"
                role="group"
                aria-label="Occasion style"
              >
                <button
                  type="button"
                  onClick={() => handleModeChange("know")}
                  className={[
                    "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-semibold transition sm:text-sm",
                    flowMode === "know"
                      ? "bg-white text-[#111111] shadow-sm ring-1 ring-black/[0.06]"
                      : "text-[#666666] hover:text-[#111111]",
                  ].join(" ")}
                >
                  <IconSpark className={flowMode === "know" ? "text-[#C8A24A]" : "text-[#999]"} /> I have an occasion
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("surprise")}
                  className={[
                    "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-semibold transition sm:text-sm",
                    flowMode === "surprise"
                      ? "bg-white text-[#111111] shadow-sm ring-1 ring-black/[0.06]"
                      : "text-[#666666] hover:text-[#111111]",
                  ].join(" ")}
                >
                  <IconDice className={flowMode === "surprise" ? "text-[#C8A24A]" : "text-[#999]"} /> Surprise me
                </button>
              </div>
            </div>

            {/* Occasion */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">Occasion</p>
              {flowMode === "surprise" ? (
                <p className="mt-2 rounded-xl border border-dashed border-[#E6E1D8] bg-[#FFFCF7] px-3 py-2.5 text-sm text-[#555555]">
                  We&apos;ll spin up something fun. Pick crowd and size below.
                </p>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">
                  {EVENT_OPTIONS.filter((o) => o !== "Surprise Me").map((opt) => (
                    <OptionChip key={opt} dense selected={eventPlan === opt} onClick={() => setEventPlan(opt)}>
                      {opt}
                    </OptionChip>
                  ))}
                </div>
              )}
            </div>

            {/* Crowd */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">Who&apos;s coming</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-3">
                {AUDIENCE_OPTIONS.map((opt) => (
                  <OptionChip key={opt} dense selected={audience === opt} onClick={() => setAudience(opt)}>
                    {opt}
                  </OptionChip>
                ))}
              </div>
            </div>

            {/* Vibe */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">Tone / vibe</p>
              <p className="mt-1 text-[11px] text-[#999999]">
                Default is Family-Friendly. “Playful Adults-Only” stays PG-13 and brand-safe.
              </p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 lg:grid-cols-3">
                {VIBE_OPTIONS.map((opt) => (
                  <OptionChip key={opt} dense selected={vibe === opt} onClick={() => setVibe(opt)}>
                    {opt}
                  </OptionChip>
                ))}
              </div>
            </div>

            {/* Personalization (optional; feeds name templates) */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">Personalization</p>
              <p className="mt-1 text-[11px] text-[#999999]">Add what you know: names get sharper. No phone number needed here.</p>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="ps-who" className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">
                    Honoree / host <span className="font-normal normal-case tracking-normal text-[#AAAAAA]">(optional)</span>
                  </label>
                  <input
                    id="ps-who"
                    value={whoFor}
                    onChange={(e) => setWhoFor(e.target.value)}
                    placeholder="e.g. Emma Johnson, Class of 2026"
                    className="mt-1.5 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-2 text-sm text-[#111111] outline-none placeholder:text-[#AAAAAA] focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/25"
                  />
                </div>
                <div>
                  <label htmlFor="ps-nick" className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">
                    Nickname <span className="font-normal normal-case tracking-normal text-[#AAAAAA]">(optional)</span>
                  </label>
                  <input
                    id="ps-nick"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="What friends actually call them"
                    className="mt-1.5 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-2 text-sm text-[#111111] outline-none placeholder:text-[#AAAAAA] focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/25"
                  />
                </div>
                <div>
                  <label htmlFor="ps-town" className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">
                    Town <span className="font-normal normal-case tracking-normal text-[#AAAAAA]">(optional)</span>
                  </label>
                  <input
                    id="ps-town"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    placeholder="e.g. West Hartford"
                    className="mt-1.5 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-2 text-sm text-[#111111] outline-none placeholder:text-[#AAAAAA] focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/25"
                  />
                </div>
                <div>
                  <label htmlFor="ps-school" className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">
                    School <span className="font-normal normal-case tracking-normal text-[#AAAAAA]">(optional)</span>
                  </label>
                  <input
                    id="ps-school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="e.g. Avon High"
                    className="mt-1.5 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-2 text-sm text-[#111111] outline-none placeholder:text-[#AAAAAA] focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/25"
                  />
                </div>
                <div>
                  <label htmlFor="ps-year" className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">
                    Class year <span className="font-normal normal-case tracking-normal text-[#AAAAAA]">(optional)</span>
                  </label>
                  <input
                    id="ps-year"
                    value={classYear}
                    onChange={(e) => setClassYear(e.target.value)}
                    placeholder="e.g. 2026"
                    className="mt-1.5 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-2 text-sm text-[#111111] outline-none placeholder:text-[#AAAAAA] focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/25"
                  />
                </div>
                <div>
                  <label htmlFor="ps-theme" className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">
                    Theme / color / season <span className="font-normal normal-case tracking-normal text-[#AAAAAA]">(optional)</span>
                  </label>
                  <input
                    id="ps-theme"
                    value={themeKeyword}
                    onChange={(e) => setThemeKeyword(e.target.value)}
                    placeholder="e.g. luau, navy & gold, fall"
                    className="mt-1.5 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-2 text-sm text-[#111111] outline-none placeholder:text-[#AAAAAA] focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/25"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="ps-kw" className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">
                  Extra notes <span className="font-normal normal-case tracking-normal text-[#AAAAAA]">(optional)</span>
                </label>
                <input
                  id="ps-kw"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Anything else (we merge this with the fields above)"
                  className="mt-1.5 w-full rounded-xl border border-[#E6E1D8] bg-white px-3 py-2 text-sm text-[#111111] outline-none placeholder:text-[#AAAAAA] focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/25"
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#777777]">Rough guest count</p>
              <div className="mt-2 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                {GUEST_OPTIONS.map((opt) => (
                  <OptionChip key={opt} dense selected={guestBand === opt} onClick={() => setGuestBand(opt)}>
                    {opt}
                  </OptionChip>
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled={!canGenerate}
              onClick={onGenerateClick}
              className="flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-[#111111] py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_-8px_rgba(17,17,17,0.35)] transition enabled:hover:bg-[#252525] disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2"
            >
              Show ideas
            </button>
            {!canGenerate ? (
              <p className="text-center text-[11px] text-[#AAAAAA]">Pick occasion (if needed), crowd, vibe, and headcount.</p>
            ) : null}
          </div>
        </motion.div>
      ) : null}

      {phase === "loading" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative mt-8 flex flex-col items-center justify-center py-12"
        >
          <div className="absolute inset-0 -z-10 mx-auto max-w-sm rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(200,162,74,0.06),transparent_70%)]" aria-hidden />
          <motion.div
            className="relative h-10 w-10 rounded-full border-2 border-[#E8E3DA] border-t-[#C8A24A] border-r-[#C8A24A]/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
          />
          <p className="mt-5 text-base font-medium text-[#111111]">Putting ideas together…</p>
          <p className="mt-1 max-w-xs text-center text-xs text-[#777777]">Almost there.</p>
        </motion.div>
      ) : null}

      {phase === "results" && cards.length > 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-6 sm:space-y-8">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#111111] sm:text-2xl">Here are some options</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[#555555]">
              Flip a card for the full note. Save one by text anytime; it doesn&apos;t change the names.
            </p>
          </div>

          <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-2xl border border-[#0d4530]/20 bg-[linear-gradient(180deg,rgba(13,69,48,0.08)_0%,rgba(250,248,243,0.9)_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <motion.button
              type="button"
              onClick={() => {
                setDiceRolls((n) => n + 1);
                runGenerate("shuffle");
              }}
              className="group flex w-full max-w-sm touch-manipulation items-center justify-center gap-3 rounded-2xl border-2 border-[#d4af37] bg-[#111111] px-4 py-3.5 text-left text-white shadow-[0_10px_32px_-12px_rgba(212,175,55,0.55)] transition hover:bg-[#1c1c1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 sm:px-5"
            >
              <motion.span
                key={diceRolls}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#111111] shadow-inner"
              >
                <IconDice className="h-7 w-7" />
              </motion.span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#d4af37]">Roll the dice</span>
                <span className="block text-sm font-semibold leading-snug">Deal a fresh hand: new names &amp; themes</span>
              </span>
              <IconSpark className="h-5 w-5 shrink-0 text-[#d4af37] opacity-80" />
            </motion.button>
            <p className="text-center text-[11px] leading-relaxed text-[#666666]">
              Keeps your occasion &amp; crowd, then shuffles names and themes. Stuck or feels dull? Roll again anytime.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.14em] text-[#999999]">Want a different flavor?</p>
            <RefinementChips onPick={onRefinement} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setHelpPickOpen((v) => !v)}
              className="rounded-full border border-[#E6E1D8] bg-white px-3 py-1.5 text-xs font-medium text-[#555555] hover:border-[#C8A24A]/60 hover:text-[#111111] focus-visible:ring-2 focus-visible:ring-[#C8A24A]"
            >
              Compare names for a group chat
            </button>
            <button
              type="button"
              onClick={() => setSharePreview(cards[0] ?? null)}
              className="rounded-full border border-[#E6E1D8] bg-white px-3 py-1.5 text-xs font-medium text-[#555555] hover:border-[#C8A24A]/60 hover:text-[#111111] focus-visible:ring-2 focus-visible:ring-[#C8A24A]"
            >
              Copy-friendly preview
            </button>
          </div>

          {helpPickOpen ? (
            <div className="rounded-xl border border-[#E6E1D8] bg-white p-4">
              <p className="text-sm font-medium text-[#111111]">Pick 2–4 names</p>
              <p className="mt-1 text-xs text-[#777777]">We&apos;ll format a short message you can paste.</p>
              <div className="mt-3 space-y-2">
                {cards.map((c) => (
                  <label
                    key={c.partyName + c.badge}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#E6E1D8] bg-[#FFFCF7] px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-[#E6E1D8] text-[#C8A24A] focus:ring-[#C8A24A]"
                      checked={shortlist.has(c.partyName)}
                      onChange={() => toggleShortlist(c.partyName)}
                    />
                    <span className="text-sm text-[#111111]">
                      <span className="font-medium text-[#A8842F]">{c.badge}:</span> {c.partyName}
                    </span>
                  </label>
                ))}
              </div>
              <button
                type="button"
                disabled={shortlist.size < 2 || !voteCopyText}
                onClick={() => copy(voteCopyText)}
                className="mt-4 min-h-[44px] w-full rounded-xl bg-[#111111] text-sm font-medium text-white disabled:opacity-40"
              >
                Copy message
              </button>
            </div>
          ) : null}

          {sharePreview ? (
            <div className="mx-auto max-w-md">
              <ShareIdeaCard card={sharePreview} brandLine={brandLine} />
              <button
                type="button"
                onClick={() => shareIdea(sharePreview)}
                className="mt-3 w-full rounded-xl border border-[#E6E1D8] bg-white py-3 text-sm font-medium text-[#111111] hover:bg-[#FAF8F3] focus-visible:ring-2 focus-visible:ring-[#C8A24A]"
              >
                Share or copy
              </button>
            </div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((c, i) => (
              <ResultFlipCard
                key={`deal-${dealId}-${i}-${c.badge}-${c.partyName}`}
                card={c}
                index={i}
                isBestFit={c.badge === "Best Fit"}
                quoteHref={quoteHref}
                onTextMe={() => setTextCard(c)}
                onShare={() => shareIdea(c)}
              />
            ))}
          </div>

          <div className="flex justify-center pb-2">
            <button
              type="button"
              onClick={resetForm}
              className="text-sm font-medium text-[#777777] underline-offset-2 hover:text-[#111111] hover:underline"
            >
              Clear and start over
            </button>
          </div>
        </motion.div>
      ) : null}

      <TextIdeaModal open={textCard != null} onClose={() => setTextCard(null)} card={textCard} brandShort={brandShort} />

      <div className="mt-16 border-t border-[#E6E1D8] pt-10">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#111111] sm:text-xl">
          Ideas for real celebrations
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#555555]">
          Graduations, birthdays, yards, showers, schools, offices: starting points only. Your crew and site always win.
        </p>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-[#111111]">Questions</h3>
          <div className="mt-3">
            <FAQAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}
