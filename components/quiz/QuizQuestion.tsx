"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz/types";
import { AnswerCard } from "./AnswerCard";

type Props = {
  question: QuizQuestionType;
  pickedId: string | null;
  advancing: boolean;
  onAnswer: (answerId: string) => void;
};

export function QuizQuestion({ question, pickedId, advancing, onAnswer }: Props) {
  const locked = advancing || pickedId != null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight tracking-tight text-[#fffdf7] drop-shadow-sm sm:text-[1.65rem] md:text-3xl">
          {question.prompt}
        </p>
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {question.answers.map((opt, i) => (
            <AnswerCard
              key={opt.id}
              option={opt}
              index={i}
              disabled={locked}
              pickedId={pickedId}
              onPick={(o) => onAnswer(o.id)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
