"use client";

import { motion } from "framer-motion";
import type { AnswerOption } from "@/lib/quiz/types";

type Props = {
  option: AnswerOption;
  index: number;
  disabled: boolean;
  pickedId: string | null;
  onPick: (option: AnswerOption) => void;
};

export function AnswerCard({ option, index, disabled, pickedId, onPick }: Props) {
  const isPicked = pickedId === option.id;
  const showWrong = pickedId != null && !isPicked;

  return (
    <motion.button
      type="button"
      disabled={disabled}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{
        opacity: showWrong ? 0.72 : 1,
        y: 0,
        scale: isPicked ? 1.02 : 1,
      }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 380,
        damping: 28,
      }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={() => !disabled && onPick(option)}
      className={`relative w-full rounded-2xl border px-4 py-4 text-left text-[15px] font-medium leading-snug text-[#f7f2ea] antialiased shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] transition-colors sm:px-5 sm:py-5 sm:text-base ${
        isPicked
          ? "border-[#e8c96b]/90 bg-gradient-to-br from-[#4a4034] to-[#353028] text-[#fffdf9] ring-2 ring-[#e8c96b]/55"
          : "border-white/20 bg-gradient-to-br from-[#353028]/95 to-[#28231e]/95 text-[#f7f2ea] hover:border-[#e8c96b]/45 hover:bg-[#3d362f]/95 hover:text-[#fffdf9]"
      } ${disabled ? "cursor-default" : "cursor-pointer"} `}
    >
      <span className="pointer-events-none absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/35 text-xs font-semibold text-[#fce9a8] ring-1 ring-white/15 sm:left-4 sm:top-4">
        {String.fromCharCode(65 + index)}
      </span>
      <span className="block pl-9 sm:pl-10">{option.label}</span>
    </motion.button>
  );
}
