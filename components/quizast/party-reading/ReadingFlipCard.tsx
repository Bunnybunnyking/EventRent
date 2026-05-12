"use client";

import type { PartyReadingCardKind } from "@/lib/quizast/party-reading";
import { sentencesForCardBack, stripAiDashes } from "@/lib/quizast/humanizeCopy";
import { motion } from "framer-motion";

type IconKind = Exclude<PartyReadingCardKind, "setup">;

/** First-letter tint — semantic hints (love → warm red, growth → green, calm guest flow → blue, etc.) */
const FIRST_LETTER_ACCENT: Record<IconKind, string> = {
  personality: "text-[#c2410c]", // identity / fire-forward
  theme: "text-violet-700", // mood & atmosphere
  redFlag: "text-rose-600", // watch-outs
  loveLanguage: "text-red-600", // heart / care
  guestExperience: "text-sky-700", // ease / flow (“relaxing” lane)
  meaningfulTouch: "text-emerald-700", // growth / meaningful detail
};

/** Site-adjacent royal gold — matches CT nav / CTA accents */
const GOLD_RING =
  "border-2 border-[#b8892f] shadow-[0_16px_44px_-18px_rgba(184,137,47,0.42),0_0_0_1px_rgba(201,162,39,0.15)_inset] ring-2 ring-[#c9a228]/35 ring-offset-2 ring-offset-[#faf6ef]";

export type ReadingFlipCardProps = {
  cardId: IconKind;
  /** Category — face-down title only */
  label: string;
  /** Specific reading title — face-up headline */
  resultName: string;
  body: string;
  bullets?: string[];
  flipped: boolean;
  onToggle: () => void;
};

/** Tighter vertical rhythm on back to reduce scroll */
const CARD_H = "h-[322px]";

/** Compact vertical flip card — category on front; result name + copy on back */
export function ReadingFlipCard({ cardId, label, resultName, body, bullets, flipped, onToggle }: ReadingFlipCardProps) {
  const accent = FIRST_LETTER_ACCENT[cardId];
  const bodyClean = stripAiDashes(body);
  const paragraphs = sentencesForCardBack(bodyClean);
  const titleClean = stripAiDashes(resultName);

  return (
    <div className="perspective-[1100px]">
      <motion.button
        type="button"
        onClick={onToggle}
        aria-pressed={flipped}
        aria-label={flipped ? `${label}, revealed` : `${label}, face down. Tap to reveal.`}
        whileHover={{
          y: -6,
          rotate: [0, -2.5, 2.5, -2, 2, 0],
          transition: {
            y: { type: "spring", stiffness: 400, damping: 22 },
            rotate: { duration: 0.55, ease: "easeInOut" },
          },
        }}
        whileTap={{ scale: 0.97 }}
        className="relative mx-auto block w-full max-w-[220px] cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6ef]"
        style={{ perspective: "1100px" }}
      >
        <motion.div
          className={`relative ${CARD_H} w-full [transform-style:preserve-3d]`}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
        >
          {/* Face-down — title first */}
          <div
            className={`absolute inset-0 flex flex-col rounded-2xl bg-gradient-to-b from-[#fffefb] via-[#faf4ea] to-[#ebe4dc] p-3 ${GOLD_RING} [backface-visibility:hidden]`}
            style={{ WebkitBackfaceVisibility: "hidden" }}
          >
            <div className="shrink-0 border-b border-[#d4bc7a]/35 pb-2 text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#b8892f]">{label}</p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-2">
              <div className="relative h-14 w-14 rounded-full border-2 border-[#d4bc7a]/55 bg-[radial-gradient(circle_at_30%_20%,rgba(255,252,236,0.98),rgba(235,224,206,0.92))] shadow-inner">
                <span className="absolute inset-[6px] rounded-full border border-[#c9a227]/35" />
                <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#b8892f]/45 to-transparent" />
              </div>
              <p className="text-center text-[12px] font-bold text-[#5c4830]">Tap to reveal</p>
            </div>
            <span className="shrink-0 text-center text-[8px] font-semibold uppercase tracking-[0.32em] text-[#b8892f]/95">
              QUIZAST
            </span>
          </div>

          {/* Face-up — gold category strip, result name first, compact tags, body */}
          <div
            className={`absolute inset-0 flex flex-col rounded-2xl bg-gradient-to-b from-[#fffefb] to-[#f0e8dc] p-2.5 ${GOLD_RING} [backface-visibility:hidden] [transform:rotateY(180deg)]`}
            style={{ WebkitBackfaceVisibility: "hidden" }}
          >
            <div className="shrink-0 border-b border-[#d4bc7a]/40 pb-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#b8892f]">{label}</p>
              <p className="mt-1.5 font-[family-name:var(--font-display)] text-[15px] font-extrabold leading-[1.2] tracking-tight text-[#140e0a] drop-shadow-[0_1px_0_rgba(255,252,245,0.9)] sm:text-[16px]">
                <span className={accent}>{titleClean.trim().slice(0, 1)}</span>
                <span className="text-[#1a1410]">{titleClean.trim().slice(1)}</span>
              </p>
              {bullets && bullets.length > 0 ? (
                <ul className="mt-1.5 flex flex-wrap gap-1">
                  {bullets.slice(0, 2).map((b, i) => (
                    <li
                      key={`tag-${cardId}-${i}`}
                      className="rounded-full border border-[#d4bc7a]/40 bg-[#faf8f3] px-1.5 py-px text-[7px] font-semibold uppercase tracking-wide text-[#5c5348] sm:text-[8px]"
                    >
                      {stripAiDashes(b)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="mt-1.5 min-h-0 flex-1 space-y-1 overflow-y-auto pr-0.5 [scrollbar-width:thin]">
              {paragraphs.map((p, i) => (
                <p key={`${cardId}-p-${i}`} className="text-[11px] font-medium leading-[1.34] text-[#3d362e]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}
