"use client";

import { stripAiDashes } from "@/lib/quizast/humanizeCopy";
import {
  computePartyPathNumber,
  partyHostPalette,
  partyPathSnippet,
} from "@/lib/quizast/life-path";
import { partyPathDeep } from "@/lib/quizast/party-path-deep";
import { buildPartyReading } from "@/lib/quizast/party-reading";
import type { StyleFallbackKey } from "@/lib/quizast/zodiac";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { PartyPathFlipCard } from "./PartyPathFlipCard";
import { PartyReadingIntro } from "./PartyReadingIntro";
import { ResultCTA } from "./ResultCTA";
import { TarotSpread } from "./TarotSpread";

const CARD_KEYS = ["personality", "theme", "redFlag", "loveLanguage", "guestExperience", "meaningfulTouch", "setup"] as const;

type Accuracy = 1 | 2 | 3;

type Props = {
  birthDate: string;
  accuracy: Accuracy | null;
  manualSun: number;
  manualMoon: number;
  manualRising: number | "skip";
  sunIdx: number;
  moonIdx: number;
  risingChoice: number | "skip" | null;
  styleChoice: StyleFallbackKey | null;
  moonEstimated: boolean;
  onAgain: () => void;
};

export function QuizastPartyReading({
  birthDate,
  accuracy,
  manualSun,
  manualMoon,
  manualRising,
  sunIdx,
  moonIdx,
  risingChoice,
  styleChoice,
  moonEstimated,
  onAgain,
}: Props) {
  const [phase, setPhase] = useState<"intro" | "spread">("intro");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [partyPathUnrolled, setPartyPathUnrolled] = useState(false);

  const resolved = useMemo(() => {
    const sun = accuracy === 3 ? manualSun : sunIdx;
    const moon = accuracy === 3 ? manualMoon : moonIdx;
    let rising: number | null = null;
    if (accuracy === 3) {
      rising = manualRising === "skip" ? null : manualRising;
    } else if (risingChoice !== null && risingChoice !== "skip") {
      rising = risingChoice;
    }
    const risingSkipped =
      accuracy === 3
        ? manualRising === "skip"
        : risingChoice === "skip" || (risingChoice === null && Boolean(styleChoice));
    return { sun, moon, rising, risingSkipped };
  }, [accuracy, manualMoon, manualRising, manualSun, moonIdx, risingChoice, styleChoice, sunIdx]);

  const reading = useMemo(
    () =>
      buildPartyReading({
        sun: resolved.sun,
        moon: resolved.moon,
        rising: resolved.rising,
        style: resolved.rising === null ? styleChoice : null,
      }),
    [resolved.moon, resolved.rising, resolved.sun, styleChoice],
  );

  const partyPathNumber = useMemo(() => computePartyPathNumber(birthDate), [birthDate]);

  const partyHostColors = useMemo(
    () => (partyPathNumber === null ? null : partyHostPalette(partyPathNumber)),
    [partyPathNumber],
  );

  const partyPathPlaybook = useMemo(
    () => (partyPathNumber === null ? null : partyPathDeep(partyPathNumber)),
    [partyPathNumber],
  );

  const shareWithPartyPath = useMemo(() => {
    if (partyPathNumber === null || !partyHostColors || !partyPathPlaybook) return reading.shareSummary;
    const [a, b] = partyHostColors;
    const d = partyPathPlaybook;
    return [
      reading.shareSummary,
      "",
      `Party Path ${partyPathNumber}: ${partyPathSnippet(partyPathNumber)}`,
      `${d.archetype}: ${d.keywords.join(", ")}`,
      stripAiDashes(d.playbook),
      `Staging cue: ${stripAiDashes(d.rentalCue)}`,
      `Host palette: ${a.name} (${a.hex}) & ${b.name} (${b.hex})`,
    ].join("\n");
  }, [partyHostColors, partyPathNumber, partyPathPlaybook, reading.shareSummary]);

  const setupMetaNote = useMemo(() => {
    const bits: string[] = [];
    if (moonEstimated) bits.push("Moon may be estimated from birthday anchor.");
    if (resolved.risingSkipped && styleChoice) bits.push("Rising replaced by your Open Rising Style pick.");
    return bits.length ? bits.join(" ") : null;
  }, [moonEstimated, resolved.risingSkipped, styleChoice]);

  const allFlipped = CARD_KEYS.every((k) => flipped[k]);

  const toggleFlip = useCallback((id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSave = useCallback(() => {
    void navigator.clipboard.writeText(shareWithPartyPath).catch(() => {
      /* ignore */
    });
  }, [shareWithPartyPath]);

  const handleShare = useCallback(async () => {
    const text = shareWithPartyPath;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "My QUIZAST party reading", text });
        return;
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(text).catch(() => {
      /* ignore */
    });
  }, [shareWithPartyPath]);

  return (
    <div className="relative mx-auto max-w-5xl px-1">
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <PartyReadingIntro onComplete={() => setPhase("spread")} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {phase === "spread" ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border border-[#e8dcc8]/80 bg-gradient-to-b from-[#fffefb] via-[#faf6ef] to-[#efe8dc] p-5 shadow-[0_28px_80px_-40px_rgba(55,44,30,0.35)] sm:p-8"
        >
          <header className="mb-6 text-center sm:mb-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.38em] text-[#a67c1a]">QUIZAST</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.75rem] font-extrabold tracking-tight text-[#1f1610] sm:text-[2.25rem]">
              Party Reading
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-[15px] font-semibold leading-relaxed text-[#5c5348]">
              Flip the deck to meet your Party Self: hot takes, cold drinks, and zero birth-chart finals.
            </p>
            {partyPathNumber !== null && partyHostColors && partyPathPlaybook ? (
              <>
                <p className="mx-auto mt-2 max-w-lg text-[13px] font-medium leading-snug text-[#7a6e62] sm:text-[14px]">
                  Your Party Path card opens to a roomier host playbook. Lucky number, colors, and staging ideas expand to fit your
                  screen.
                </p>
                <PartyPathFlipCard
                  partyPathNumber={partyPathNumber}
                  snippet={partyPathSnippet(partyPathNumber)}
                  colors={partyHostColors}
                  deep={partyPathPlaybook}
                  unrolled={partyPathUnrolled}
                  onToggle={() => setPartyPathUnrolled((v) => !v)}
                />
              </>
            ) : null}
          </header>

          <TarotSpread
            cards={reading.cards}
            setup={reading.setup}
            flipped={flipped}
            onFlip={toggleFlip}
            setupMetaNote={setupMetaNote}
          />

          <p className="mx-auto mt-10 max-w-xl text-center text-[11px] leading-relaxed text-[#9a9088]">
            Entertainment and planning flavor only, not a certified birth chart. We don&apos;t collect your quiz answers on our servers—copy
            or share below stays on your device unless you open contact yourself. Adjust tents and counts with your rental team after a site
            visit.
          </p>

          <AnimatePresence>
            {allFlipped ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ResultCTA onSave={handleSave} onShare={handleShare} onAgain={onAgain} />
              </motion.div>
            ) : (
              <p className="mt-10 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#b5a896]">
                Flip all seven cards to unlock next steps
              </p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
