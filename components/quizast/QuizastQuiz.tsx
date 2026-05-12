"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ascendantLongitude,
  estimatedMoonSign,
  instantInTimezone,
  moonLongitude,
  moonSignAmbiguityOnDay,
  sunLongitude,
} from "@/lib/quizast/astro";
import { OPEN_STYLE_PARTY, MOON_PARTY, RISING_PARTY, SUN_PARTY } from "@/lib/quizast/party-copy";
import { DEFAULT_TZ_FALLBACK, US_STATES } from "@/lib/quizast/us-states";
import {
  type StyleFallbackKey,
  STYLE_FALLBACK_OPTIONS,
  STYLE_FALLBACK_QUESTION,
  ZODIAC,
  longitudeToSignIndex,
  signLabel,
} from "@/lib/quizast/zodiac";
import { BirthDateFields } from "@/components/quizast/BirthDateFields";
import { QuizExperienceShell } from "@/components/quiz-design/QuizExperienceShell";
import { QUIZ_SELECT, QUIZ_SELECT_COMPACT, QUIZ_TIME_INPUT } from "@/lib/quizast/quiz-input-classes";
import { QuizastPartyReading } from "@/components/quizast/party-reading/QuizastPartyReading";
import { TarotCard } from "./TarotCard";

const GLYPH = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

type Step =
  | "intro"
  | "birthday"
  | "accuracy"
  | "manual"
  | "rising"
  | "style"
  | "result";

type Accuracy = 1 | 2 | 3;

export function QuizastQuiz() {
  const [step, setStep] = useState<Step>("intro");
  const [birthDate, setBirthDate] = useState("");
  const [accuracy, setAccuracy] = useState<Accuracy | null>(null);

  const [manualSun, setManualSun] = useState<number>(0);
  const [manualMoon, setManualMoon] = useState<number>(0);
  const [manualRising, setManualRising] = useState<number | "skip">("skip");

  const [birthTime, setBirthTime] = useState("");
  const [stateCode, setStateCode] = useState("CT");

  const [sunIdx, setSunIdx] = useState<number>(0);
  const [moonIdx, setMoonIdx] = useState<number>(0);
  const [moonCandidates, setMoonCandidates] = useState<number[]>([]);
  const [moonEstimated, setMoonEstimated] = useState(false);
  const [risingSuggested, setRisingSuggested] = useState<number | null>(null);
  const [risingChoice, setRisingChoice] = useState<number | "skip" | null>(null);
  const [styleChoice, setStyleChoice] = useState<StyleFallbackKey | null>(null);
  /** When Moon was ambiguous, user must tap a vibe card before choosing Rising */
  const [moonAmbiguityResolved, setMoonAmbiguityResolved] = useState(true);

  function resetQuizast() {
    setMoonCandidates([]);
    setMoonEstimated(false);
    setRisingSuggested(null);
    setRisingChoice(null);
    setStyleChoice(null);
    setSunIdx(0);
    setMoonIdx(0);
    setBirthTime("");
    setStateCode("CT");
    setManualSun(0);
    setManualMoon(0);
    setManualRising("skip");
    setMoonAmbiguityResolved(true);
  }

  function runComputeSimple() {
    setMoonCandidates([]);
    setMoonEstimated(false);
    setRisingSuggested(null);
    setStyleChoice(null);
    const tz = DEFAULT_TZ_FALLBACK;
    const noon = instantInTimezone(birthDate, null, tz);
    setSunIdx(longitudeToSignIndex(sunLongitude(noon)));
    const amb = moonSignAmbiguityOnDay(birthDate, tz);
    if (amb.ambiguous) {
      setMoonCandidates(amb.uniqueSigns);
      setMoonEstimated(true);
      setMoonAmbiguityResolved(false);
    } else {
      setMoonIdx(estimatedMoonSign(birthDate, tz));
      setMoonEstimated(true);
      setMoonAmbiguityResolved(true);
    }
  }

  /** Keeps Sun/Moon/Moon ambiguity/Rising suggestion aligned with date, US state, and optional local birth time on the Rising step */
  useEffect(() => {
    if (step !== "rising" || accuracy === null || accuracy === 3 || !birthDate) return;
    const info = US_STATES[stateCode];
    if (!info) return;

    queueMicrotask(() => {
      if (birthTime) {
        const instant = instantInTimezone(birthDate, birthTime, info.tz);
        setSunIdx(longitudeToSignIndex(sunLongitude(instant)));
        setMoonIdx(longitudeToSignIndex(moonLongitude(instant)));
        setMoonEstimated(false);
        const amb = moonSignAmbiguityOnDay(birthDate, info.tz);
        if (amb.uniqueSigns.length > 1) {
          setMoonCandidates(amb.uniqueSigns);
          setMoonAmbiguityResolved(false);
        } else {
          setMoonCandidates([]);
          setMoonAmbiguityResolved(true);
        }
        const riseDeg = ascendantLongitude(instant, info.lat, info.lon);
        setRisingSuggested(longitudeToSignIndex(riseDeg));
      } else {
        const tz = DEFAULT_TZ_FALLBACK;
        const noon = instantInTimezone(birthDate, null, tz);
        setSunIdx(longitudeToSignIndex(sunLongitude(noon)));
        setRisingSuggested(null);
        const amb = moonSignAmbiguityOnDay(birthDate, tz);
        if (amb.ambiguous) {
          setMoonCandidates(amb.uniqueSigns);
          setMoonEstimated(true);
          setMoonAmbiguityResolved(false);
        } else {
          setMoonCandidates([]);
          setMoonIdx(estimatedMoonSign(birthDate, tz));
          setMoonEstimated(true);
          setMoonAmbiguityResolved(true);
        }
      }
    });
  }, [step, birthDate, birthTime, stateCode, accuracy]);

  /** Changing birth clock or location invalidates a tapped Rising choice */
  useEffect(() => {
    if (step !== "rising") return;
    queueMicrotask(() => setRisingChoice(null));
  }, [birthDate, birthTime, stateCode, step]);

  function nextAfterAccuracy(a: Accuracy) {
    setAccuracy(a);
    setRisingChoice(null);
    setStyleChoice(null);
    if (a === 1) {
      runComputeSimple();
      setStep("rising");
    } else if (a === 2) {
      setStep("rising");
    } else {
      setStep("manual");
    }
  }

  const risingPickEnabled = moonAmbiguityResolved;
  const shell = "relative mx-auto max-w-3xl";
  const risingGridShell = "relative mx-auto max-w-5xl";

  return (
    <QuizExperienceShell variant="tarot">
      <AnimatePresence mode="wait">
        {step === "intro" ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={shell}
          >
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-[#d4bc7a]">
              QUIZAST
            </p>
            <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-semibold text-[#faf6ee] sm:text-4xl">
              Birth-chart party tarot
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-[#cfc6d8] sm:text-base">
              A classy, slightly mystical mini-game: Sun is your party identity, Moon is your emotional mood,
              Rising is your look, or pick a visual style if Rising is unknown. No chart degree math required.
            </p>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setStep("birthday")}
                className="rounded-2xl bg-gradient-to-r from-[#9b7bd6] via-[#c9a8e8] to-[#7c5cb0] px-10 py-4 text-base font-semibold text-[#1a0f24] shadow-[0_18px_50px_-12px_rgba(155,123,214,0.55)]"
              >
                Begin the spread
              </button>
            </div>
          </motion.div>
        ) : null}

        {step === "birthday" ? (
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={shell}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4bc7a]">Step 1</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#fffdf9]">
              Your birthday
            </h3>
            <p className="mt-2 text-sm text-[#bfb6c9]">
              We use this for your Sun sign and Moon estimates. Optional details later improve accuracy; never required.
            </p>
            <BirthDateFields value={birthDate} onChange={setBirthDate} />
            <button
              type="button"
              disabled={!birthDate}
              onClick={() => setStep("accuracy")}
              className="mt-8 rounded-xl bg-[#f5efe6] px-6 py-3 text-sm font-semibold text-[#1f1528] disabled:opacity-40"
            >
              Continue
            </button>
          </motion.div>
        ) : null}

        {step === "accuracy" ? (
          <motion.div key="acc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={shell}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4bc7a]">Depth</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#fffdf9]">
              How precise should we get?
            </h3>
            <div className="mt-6 flex flex-col gap-4">
              <TarotCard
                variant="cream"
                eyebrow="Level 1"
                title="Simple mode"
                subtitle="Birthday only: Sun sign + estimated Moon (with gentle disclaimers). Uses Eastern US noon as a default anchor if we need a time guess."
                onClick={() => nextAfterAccuracy(1)}
              />
              <TarotCard
                variant="cream"
                eyebrow="Level 2"
                title="Better mode"
                subtitle="Next screen: enter birth state + time on the same page as Rising. We suggest a Rising sign when the math cooperates."
                onClick={() => nextAfterAccuracy(2)}
              />
              <TarotCard
                variant="cream"
                eyebrow="Level 3"
                title="Manual chart mode"
                subtitle="You already know your Big Three from Co-Star, Chani, Astro.com… Pick them directly."
                onClick={() => nextAfterAccuracy(3)}
              />
            </div>
            <button type="button" onClick={() => setStep("birthday")} className="mt-6 text-sm text-[#d4bc7a] underline">
              Back
            </button>
          </motion.div>
        ) : null}

        {step === "manual" ? (
          <motion.div key="man" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={shell}>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#fffdf9]">
              Pick your Big Three
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#d4bc7a]">
                Sun
                <select
                  value={manualSun}
                  onChange={(e) => setManualSun(Number(e.target.value))}
                  className={`mt-2 w-full ${QUIZ_SELECT_COMPACT}`}
                >
                  {ZODIAC.map((z, i) => (
                    <option key={z} value={i} className="bg-[#fbf8f2] text-[#141018]">
                      {z}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#d4bc7a]">
                Moon
                <select
                  value={manualMoon}
                  onChange={(e) => setManualMoon(Number(e.target.value))}
                  className={`mt-2 w-full ${QUIZ_SELECT_COMPACT}`}
                >
                  {ZODIAC.map((z, i) => (
                    <option key={z} value={i} className="bg-[#fbf8f2] text-[#141018]">
                      {z}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#d4bc7a]">
                Rising (optional)
                <select
                  value={manualRising === "skip" ? "skip" : manualRising}
                  onChange={(e) =>
                    setManualRising(e.target.value === "skip" ? "skip" : Number(e.target.value))
                  }
                  className={`mt-2 w-full ${QUIZ_SELECT_COMPACT}`}
                >
                  <option value="skip" className="bg-[#fbf8f2] text-[#141018]">
                    Skip, then use style question
                  </option>
                  {ZODIAC.map((z, i) => (
                    <option key={z} value={i} className="bg-[#fbf8f2] text-[#141018]">
                      {z} Rising
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                setSunIdx(manualSun);
                setMoonIdx(manualMoon);
                setMoonEstimated(false);
                if (manualRising === "skip") {
                  setRisingChoice("skip");
                  setStep("style");
                } else {
                  setRisingChoice(manualRising);
                  setStep("result");
                }
              }}
              className="mt-8 rounded-xl bg-[#f5efe6] px-6 py-3 text-sm font-semibold text-[#1f1528]"
            >
              Reveal spread
            </button>
            <button type="button" onClick={() => setStep("accuracy")} className="mt-4 block text-sm text-[#d4bc7a] underline">
              Back
            </button>
          </motion.div>
        ) : null}

        {step === "rising" ? (
          <motion.div key="rs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={risingGridShell}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4bc7a]">
              {accuracy === 2 ? "Better mode · Rising layer" : "Rising layer"}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#fffdf9] sm:text-2xl">
              Birth place &amp; time, then your Rising
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#bfb6c9]">
              US birth state sets timezone and rough coordinates; birth clock sharpens Moon and Rising. Everything lives here so you can see the suggestion and pick in one scroll on phone or desktop.
            </p>

            <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-2 sm:p-5">
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#d4bc7a]">
                Birth state (US)
                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className={`mt-2 w-full ${QUIZ_SELECT} sm:py-3.5`}
                >
                  {Object.entries(US_STATES).map(([code, s]) => (
                    <option key={code} value={code} className="bg-[#fbf8f2] text-[#141018]">
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#d4bc7a]">
                Birth time (optional; unlocks suggestion)
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className={`mt-2 w-full ${QUIZ_TIME_INPUT} sm:py-3.5`}
                />
              </label>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setBirthTime("");
                  setAccuracy(1);
                  runComputeSimple();
                }}
                className="text-sm text-[#d4bc7a] underline underline-offset-4 hover:text-[#f0e6d2]"
              >
                Skip time → estimates only (Simple math)
              </button>
            </div>

            {birthTime && risingSuggested !== null ? (
              <div className="mt-6 rounded-2xl border border-[#c9a8e8]/35 bg-gradient-to-br from-[#2a1f38]/90 to-[#1a1424]/95 px-4 py-4 sm:px-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4bc7a]">
                  Suggested Rising
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#faf6ee] sm:text-3xl">
                  {signLabel(risingSuggested)} Rising{" "}
                  <span aria-hidden className="text-[#e8c96b]">
                    {GLYPH[risingSuggested]}
                  </span>
                </p>
                <p className="mt-2 text-sm text-[#cfc6d8]">
                  From your birthday + birth time + state. Tap the matching card below if it fits, or choose another sign.
                </p>
              </div>
            ) : (
              <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#a898b8]">
                Add a birth time (approximate is fine) to light up a suggested Rising. You can still pick any sign, or skip to style.
              </p>
            )}

            {moonCandidates.length > 1 ? (
              <div className="mt-8">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#fffdf9]">
                  Moon moved that day. Pick your vibe first.
                </p>
                <p className="mt-1 text-sm text-[#bfb6c9]">
                  Then scroll down for Rising. ({moonCandidates.length} possibilities)
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {moonCandidates.map((idx) => (
                    <TarotCard
                      key={idx}
                      compact
                      variant={moonIdx === idx ? "gold" : "midnight"}
                      eyebrow="Moon"
                      title={`${signLabel(idx)}`}
                      subtitle={MOON_PARTY[idx]}
                      ornament={<span aria-hidden>{GLYPH[idx]}</span>}
                      selected={moonIdx === idx}
                      onClick={() => {
                        setMoonIdx(idx);
                        setMoonAmbiguityResolved(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div
              className={`mt-8 transition-opacity duration-200 ${risingPickEnabled ? "opacity-100" : "pointer-events-none opacity-40"}`}
              aria-disabled={!risingPickEnabled}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#fffdf9] sm:text-xl">
                    Choose Rising (or skip)
                  </p>
                  <p className="mt-1 text-xs text-[#9a90a8] sm:text-sm">
                    {risingPickEnabled
                      ? "Compact cards: scan all twelve on one screen."
                      : "Choose a Moon vibe above first."}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {ZODIAC.map((z, i) => (
                  <TarotCard
                    key={z}
                    compact
                    variant={risingSuggested === i ? "gold" : "midnight"}
                    eyebrow="↑"
                    title={z}
                    subtitle={RISING_PARTY[i]}
                    ornament={<span aria-hidden>{GLYPH[i]}</span>}
                    selected={risingSuggested === i}
                    onClick={() => {
                      if (!risingPickEnabled) return;
                      setRisingChoice(i);
                      setStep("result");
                    }}
                  />
                ))}
                <TarotCard
                  compact
                  variant="cream"
                  title="Don't know"
                  subtitle="Style fallback next."
                  className="col-span-2 sm:col-span-3 lg:col-span-6 xl:col-span-6"
                  onClick={() => {
                    if (!risingPickEnabled) return;
                    setRisingChoice("skip");
                    setStep("style");
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep("accuracy")}
              className="mt-8 text-sm text-[#d4bc7a] underline underline-offset-4 hover:text-[#f0e6d2]"
            >
              ← Back to depth
            </button>
          </motion.div>
        ) : null}

        {step === "style" ? (
          <motion.div key="st" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={shell}>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#fffdf9]">
              Open Rising Style
            </h3>
            <p className="mt-2 text-lg text-[#e8dcc8]">{STYLE_FALLBACK_QUESTION}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {STYLE_FALLBACK_OPTIONS.map((o) => (
                <TarotCard
                  key={o.key}
                  variant="cream"
                  eyebrow="Style"
                  title={o.label}
                  onClick={() => {
                    setStyleChoice(o.key);
                    setStep("result");
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : null}

        {step === "result" ? (
          <motion.div key="res" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative mx-auto max-w-5xl pb-6">
            <QuizastPartyReading
              birthDate={birthDate}
              accuracy={accuracy}
              manualSun={manualSun}
              manualMoon={manualMoon}
              manualRising={manualRising}
              sunIdx={sunIdx}
              moonIdx={moonIdx}
              risingChoice={risingChoice}
              styleChoice={styleChoice}
              moonEstimated={moonEstimated}
              onAgain={() => {
                setStep("intro");
                setBirthDate("");
                setAccuracy(null);
                resetQuizast();
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </QuizExperienceShell>
  );
}
