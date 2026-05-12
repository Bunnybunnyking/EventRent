"use client";

import type { PartyHostSwatch } from "@/lib/quizast/life-path";
import type { PartyPathDeep } from "@/lib/quizast/party-path-deep";
import { sentencesForCardBack, stripAiDashes } from "@/lib/quizast/humanizeCopy";
import { motion } from "framer-motion";

/** Same chrome as tarot flip cards */
const GOLD_RING =
  "border-2 border-[#b8892f] shadow-[0_16px_44px_-18px_rgba(184,137,47,0.42),0_0_0_1px_rgba(201,162,39,0.15)_inset] ring-2 ring-[#c9a228]/35 ring-offset-2 ring-offset-[#faf6ef]";

type Props = {
  partyPathNumber: number;
  snippet: string;
  colors: [PartyHostSwatch, PartyHostSwatch];
  deep: PartyPathDeep;
  /** True when showing playbook side */
  unrolled: boolean;
  onToggle: () => void;
};

const PARTY_PATH_EXPLAINER =
  "Birthday math for fun; below is host energy for mood, flow, and staging—not a reading.";

/**
 * Compact teaser front; flip expands the shell so the back fits the full playbook comfortably.
 */
export function PartyPathFlipCard({
  partyPathNumber,
  snippet,
  colors,
  deep,
  unrolled,
  onToggle,
}: Props) {
  const snippetClean = stripAiDashes(snippet);
  const playbookLines = sentencesForCardBack(deep.playbook);
  const rentalClean = stripAiDashes(deep.rentalCue);
  const archetypeClean = stripAiDashes(deep.archetype);

  return (
    <div className="mx-auto mt-3 max-w-xl px-1">
      <div className="perspective-[1100px]">
        <motion.button
          type="button"
          onClick={onToggle}
          aria-pressed={unrolled}
          aria-label={
            unrolled
              ? `Party Path ${partyPathNumber}, showing playbook. Tap to flip back.`
              : `Party Path ${partyPathNumber}. Tap to flip for host playbook.`
          }
          whileHover={{ y: unrolled ? 0 : -4 }}
          whileTap={{ scale: 0.985 }}
          className={`relative z-10 mx-auto block cursor-pointer py-1 transition-[max-width,padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a228]/85 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6ef] ${
            /* Explicit width: faces are position:absolute so the button has no intrinsic width otherwise → invisible layout */
            unrolled
              ? "w-full max-w-xl min-w-0 sm:max-w-2xl"
              : "w-[min(11.5rem,100%)] max-w-[min(11.5rem,100%)] shrink-0"
          }`}
          style={{ perspective: "1100px" }}
        >
          {/* Never use overflow:hidden here — it flattens 3D and breaks backface-visibility (mirrored front text). */}
          <motion.div
            className={`relative w-full rounded-2xl [transform-style:preserve-3d] shadow-[0_14px_36px_-22px_rgba(55,44,30,0.32)] transition-[height,box-shadow,min-height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[height,transform] ${
              unrolled
                ? "min-h-[min(92vh,48rem)] h-[min(92vh,48rem)] max-h-[50rem] shadow-[0_36px_90px_-32px_rgba(55,44,30,0.48),0_18px_44px_-22px_rgba(184,137,47,0.32)]"
                : "h-[200px]"
            }`}
            style={{ transformStyle: "preserve-3d" }}
            initial={false}
            animate={{ rotateY: unrolled ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 210, damping: 27 }}
          >
            {/* Front — Lucky # + palette only */}
            <div
              className={`absolute inset-0 flex flex-col rounded-2xl bg-gradient-to-b from-[#fffefb] via-[#faf4ea] to-[#ebe4dc] ${unrolled ? "p-3" : "p-2.5"} ${GOLD_RING}`}
              style={{
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg) translateZ(3px)",
              }}
            >
              <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#b8892f] sm:text-[10px]">
                Party Path
              </p>
              <span className="sr-only">{snippetClean}</span>
              <div className="mt-1.5 flex min-h-0 flex-1 flex-col items-center justify-center gap-2 px-0.5 pb-0.5">
                <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b7355]">Lucky</p>
                <p
                  className="text-center font-[family-name:var(--font-display)] text-[1.875rem] font-black tabular-nums leading-none tracking-tight text-[#5c4210] sm:text-[2.125rem]"
                  style={{
                    textShadow:
                      "0 1px 0 rgba(255,252,245,0.95), 0 0 20px rgba(184,137,47,0.35)",
                  }}
                  aria-label={`Lucky number ${partyPathNumber}`}
                >
                  {partyPathNumber}
                </p>
                <span className="flex items-center gap-2" aria-hidden>
                  {colors.map((swatch) => (
                    <span
                      key={swatch.hex}
                      className="h-4 w-4 rounded-full border border-black/15 shadow-inner ring-1 ring-white/50 sm:h-[18px] sm:w-[18px]"
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.name}
                    />
                  ))}
                </span>
              </div>
              <p className="shrink-0 pb-0.5 text-center text-[10px] font-bold text-[#6b5428]">Tap to flip</p>
              <span className="shrink-0 text-center text-[7px] font-semibold uppercase tracking-[0.28em] text-[#b8892f]/90 sm:text-[8px]">
                QUIZAST
              </span>
            </div>

            {/* Back — playbook (must stay in 3D layer with translateZ or WebKit shows mirrored front) */}
            <div
              className={`absolute inset-0 flex flex-col rounded-2xl bg-gradient-to-b from-[#fffefb] to-[#f0e8dc] p-2.5 sm:p-3 ${GOLD_RING}`}
              style={{
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(3px)",
              }}
            >
              {/* Tight header: one band, small Lucky #, archetype + dots inline-style */}
              <div className="shrink-0 border-b border-[#d4bc7a]/40 pb-1.5">
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#b8892f]">Party Path</p>
                  <span className="text-[#d4bc7a]/80" aria-hidden>
                    ·
                  </span>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8b7355]">Lucky</p>
                  <span
                    className="font-[family-name:var(--font-display)] text-[1.125rem] font-black tabular-nums leading-none text-[#5c4210] sm:text-[1.25rem]"
                    aria-hidden
                  >
                    {partyPathNumber}
                  </span>
                  <span className="flex items-center gap-1" aria-hidden>
                    {colors.map((swatch) => (
                      <span
                        key={swatch.hex}
                        className="h-2.5 w-2.5 rounded-full border border-black/12 shadow-inner sm:h-3 sm:w-3"
                        style={{ backgroundColor: swatch.hex }}
                        title={swatch.name}
                      />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-center font-[family-name:var(--font-display)] text-[13px] font-extrabold leading-tight tracking-tight text-[#140e0a] sm:text-[14px]">
                  <span className="text-[#b8892f]">{archetypeClean.trim().slice(0, 1)}</span>
                  <span className="text-[#1a1410]">{archetypeClean.trim().slice(1)}</span>
                </p>
                <p className="mt-0.5 text-center text-[8px] font-medium uppercase tracking-[0.08em] text-[#7a6e62]">
                  {deep.keywords.join(" · ")}
                </p>
              </div>

              <p className="mt-1.5 shrink-0 rounded-md border border-[#e8dcc8]/80 bg-[#faf8f3]/90 px-2 py-1 text-center text-[9px] font-medium leading-snug text-[#5c5348]">
                {PARTY_PATH_EXPLAINER}
              </p>

              <p className="mt-1.5 shrink-0 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8b6914]">Playbook</p>

              <div className="mt-1 min-h-0 flex-1 space-y-1 overflow-visible text-left">
                {playbookLines.map((line, i) => (
                  <p key={i} className="text-[10px] font-medium leading-[1.36] text-[#3d362e] sm:text-[11px]">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-1.5 shrink-0 border-t border-[#d4bc7a]/35 pt-1.5">
                <p className="text-[9px] font-medium italic leading-snug text-[#5c5348] sm:text-[10px]">{rentalClean}</p>
                <p className="mt-1 text-center text-[10px] font-bold text-[#8b6914]">Tap to flip back</p>
              </div>
            </div>
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
