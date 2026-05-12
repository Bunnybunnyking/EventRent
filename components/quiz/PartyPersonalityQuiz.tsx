"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { QUIZ_QUESTIONS, TOTAL_QUESTIONS } from "@/lib/quiz/questions";
import { buildRentalRecommendation } from "@/lib/quiz/recommendation";
import {
  aggregateRentalSignals,
  scoreAnswers,
} from "@/lib/quiz/scoring";
import type {
  LeadPayload,
  QuizPhase,
  ScoringOutcome,
  RentalRecommendation,
} from "@/lib/quiz/types";
import { LeadCapture } from "./LeadCapture";
import { QuizIntro } from "./QuizIntro";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { ResultReveal } from "./ResultReveal";
import { QuizExperienceShell } from "@/components/quiz-design/QuizExperienceShell";

const TITLE = "What's Your Party Personality?";
const SUBTITLE =
  "Take the quiz, get roasted, and find out what setup your party actually needs.";

type Props = {
  quoteHref?: string;
};

export function PartyPersonalityQuiz({ quoteHref = "/contact#quote" }: Props) {
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [advancing, setAdvancing] = useState(false);
  const [lead, setLead] = useState<LeadPayload | null>(null);

  const [resultBundle, setResultBundle] = useState<{
    outcome: ScoringOutcome;
    rental: RentalRecommendation;
  } | null>(null);

  const question = QUIZ_QUESTIONS[qIndex];

  const resetAll = useCallback(() => {
    setPhase("intro");
    setQIndex(0);
    setSelections({});
    setPickedId(null);
    setAdvancing(false);
    setLead(null);
    setResultBundle(null);
  }, []);

  const goBack = useCallback(() => {
    if (phase === "question") {
      setPickedId(null);
      setAdvancing(false);
      if (qIndex <= 0) {
        setPhase("intro");
        setSelections({});
        return;
      }
      setQIndex((i) => i - 1);
    }
  }, [phase, qIndex]);

  const handleAnswer = useCallback(
    (answerId: string) => {
      if (!question || advancing) return;
      const qid = question.id;
      setSelections((prev) => ({ ...prev, [qid]: answerId }));
      setPickedId(answerId);
      setAdvancing(true);
      window.setTimeout(() => {
        setAdvancing(false);
        setPickedId(null);
        if (qIndex >= TOTAL_QUESTIONS - 1) {
          setPhase("reveal");
        } else {
          setQIndex((i) => i + 1);
        }
      }, 520);
    },
    [question, advancing, qIndex],
  );

  const revealDone = useCallback(() => {
    setPhase("lead");
  }, []);

  const leadSubmit = useCallback((payload: LeadPayload) => {
    setLead(payload);
    const outcome = scoreAnswers(
      Object.fromEntries(
        Object.entries(selections).map(([k, v]) => [k, v]),
      ),
    );
    const rental = buildRentalRecommendation(aggregateRentalSignals(selections));
    setResultBundle({ outcome, rental });
    setPhase("result");
  }, [selections]);

  const showBack = phase === "question" || phase === "lead";

  const headerBack = useMemo(
    () => (
      <div className="mb-6 flex items-center justify-between gap-3">
        {showBack ? (
          <button
            type="button"
            onClick={() => {
              if (phase === "lead") {
                setPhase("question");
                setQIndex(TOTAL_QUESTIONS - 1);
                return;
              }
              goBack();
            }}
            className="text-sm font-medium text-[#d8cdb8] underline-offset-4 hover:text-[#faf6ee] hover:underline"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        {phase === "question" ? (
          <span className="text-right text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9baa5]">
            Roast mode
          </span>
        ) : (
          <span />
        )}
      </div>
    ),
    [phase, showBack, goBack],
  );

  return (
    <QuizExperienceShell variant="personality">
      <div className="relative mx-auto max-w-3xl">
        {phase === "question" || phase === "lead" ? headerBack : null}

        <AnimatePresence mode="wait">
          {phase === "intro" ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizIntro
                title={TITLE}
                subtitle={SUBTITLE}
                onStart={() => setPhase("question")}
              />
            </motion.div>
          ) : null}

          {phase === "question" && question ? (
            <motion.div
              key="q"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizProgress current={qIndex + 1} total={TOTAL_QUESTIONS} />
              <div className="mt-8">
                <QuizQuestion
                  question={question}
                  pickedId={pickedId}
                  advancing={advancing}
                  onAnswer={handleAnswer}
                />
              </div>
            </motion.div>
          ) : null}

          {phase === "reveal" ? (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultReveal onComplete={revealDone} />
            </motion.div>
          ) : null}

          {phase === "lead" ? (
            <motion.div
              key="lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <LeadCapture onSubmit={leadSubmit} />
            </motion.div>
          ) : null}

          {phase === "result" && resultBundle && lead ? (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <QuizResult
                outcome={resultBundle.outcome}
                rental={resultBundle.rental}
                lead={lead}
                quoteHref={quoteHref}
                onAgain={resetAll}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </QuizExperienceShell>
  );
}
