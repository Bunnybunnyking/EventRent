"use client";

import type { RecommendedSetupDetail } from "@/lib/quizast/party-reading";
import { stripAiDashes } from "@/lib/quizast/humanizeCopy";
import { motion } from "framer-motion";

type Props = {
  setup: RecommendedSetupDetail;
  flipped: boolean;
  onToggle: () => void;
  metaNote?: string | null;
};

const GOLD_FRAME =
  "border-[3px] border-[#b8892f] shadow-[0_22px_56px_-20px_rgba(184,137,47,0.48),0_0_0_1px_rgba(201,162,39,0.2)_inset] ring-2 ring-[#d4bc7a]/50 ring-offset-[3px] ring-offset-[#faf6ef]";

function FeaturedHeading({ large }: { large?: boolean }) {
  const sz = large ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl";
  return (
    <span className={`font-[family-name:var(--font-display)] font-extrabold tracking-tight ${sz}`}>
      <span className="text-[#b8892f]">R</span>
      <span className="text-[#1f1610]">ecommended Setup</span>
    </span>
  );
}

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="border-b border-[#d4bc7a]/40 py-2.5 last:border-0">
    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#6b5420]">{k}</p>
    <p className="mt-1 text-[14px] font-semibold leading-snug text-[#2c241c]">{stripAiDashes(v)}</p>
  </div>
);

/** Featured flip card — large matched faces so reveal fits comfortably with scroll only if viewport is short */
export function RecommendedSetupCard({ setup, flipped, onToggle, metaNote }: Props) {
  return (
    <div className="perspective-[1300px]">
      <motion.button
        type="button"
        onClick={onToggle}
        aria-pressed={flipped}
        aria-label={flipped ? "Recommended setup, revealed" : "Recommended setup. Tap to reveal."}
        whileHover={{
          y: -6,
          rotate: [0, -1.8, 1.8, -1.2, 1.2, 0],
          transition: {
            y: { type: "spring", stiffness: 320, damping: 24 },
            rotate: { duration: 0.55, ease: "easeInOut" },
          },
        }}
        whileTap={{ scale: 0.985 }}
        className="relative mx-auto block w-full max-w-3xl cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228]/85 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6ef]"
      >
        {/* Single fixed height = both faces — expands visually when flipped without breaking 3D */}
        <motion.div
          className="relative h-[min(85vh,760px)] min-h-[440px] w-full max-w-3xl [transform-style:preserve-3d] sm:min-h-[520px]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
        >
          {/* Back */}
          <div
            className={`absolute inset-0 flex flex-col rounded-[1.5rem] bg-gradient-to-br from-[#fffefb] via-[#faf3e4] to-[#ebe4dc] p-6 sm:p-8 ${GOLD_FRAME} [backface-visibility:hidden]`}
            style={{ WebkitBackfaceVisibility: "hidden" }}
          >
            <div className="shrink-0 border-b-2 border-[#d4bc7a]/45 pb-4 text-center">
              <div className="flex justify-center px-2">
                <FeaturedHeading large />
              </div>
              <p className="mt-3 text-[14px] font-semibold text-[#5c5348]">
                Tent sizing · seating math · add-ons · host calm
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#c9a227]/55 to-transparent" />
              <svg viewBox="0 0 24 24" className="h-14 w-14 text-[#b8892f]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M4 21h16M6 17l6-11 6 11M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#c9a227]/55 to-transparent" />
            </div>
            <p className="shrink-0 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b7355]">Tap to reveal</p>
          </div>

          {/* Front */}
          <div
            className={`absolute inset-0 flex flex-col rounded-[1.5rem] bg-gradient-to-b from-[#fffefb] to-[#efe8dc] p-5 sm:p-8 ${GOLD_FRAME} [backface-visibility:hidden] [transform:rotateY(180deg)]`}
            style={{ WebkitBackfaceVisibility: "hidden" }}
          >
            <div className="shrink-0 border-b-2 border-[#d4bc7a]/50 pb-3">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#b8892f]">Recommended Setup</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-extrabold leading-tight tracking-tight text-[#140e0a] drop-shadow-[0_1px_0_rgba(255,252,245,0.9)] sm:text-xl">
                <span className="text-[#b8892f]">{setup.resultName.trim().slice(0, 1)}</span>
                <span className="text-[#1f1610]">{setup.resultName.trim().slice(1)}</span>
              </p>
              <p className="mt-2 text-[12px] font-semibold leading-snug text-[#4a4238] sm:text-[13px]">
                {stripAiDashes(setup.flavorLine)}
              </p>
              {setup.bullets.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {setup.bullets.slice(0, 2).map((b, i) => (
                    <li
                      key={`setup-bullet-${i}`}
                      className="rounded-full border border-[#d4bc7a]/45 bg-[#faf8f3] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-[#5c5348] sm:text-[9px]"
                    >
                      {stripAiDashes(b)}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8b6914]">Rental-ready snapshot</p>
            </div>

            <div className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
              <Row k="Primary tent" v={setup.tent} />
              <Row k="Alternate / pivot" v={setup.tentAlternate} />
              <Row k="Tables" v={setup.tables} />
              <Row k="Chairs" v={setup.chairs} />
              <Row k="Add-ons" v={setup.addOns} />
              <Row k="Host survival tip" v={setup.survivalTip} />
              {metaNote ? (
                <p className="mt-4 rounded-xl border border-[#e8dcc8]/80 bg-[#faf8f3] px-4 py-3 text-[12px] font-medium leading-relaxed text-[#5c5348]">
                  {stripAiDashes(metaNote)}
                </p>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}
