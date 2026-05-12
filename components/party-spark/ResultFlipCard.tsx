"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { PartySparkCard } from "@/lib/party-spark-types";

type ResultFlipCardProps = {
  card: PartySparkCard;
  index: number;
  isBestFit?: boolean;
  quoteHref: string;
  onTextMe: () => void;
  onShare: () => void;
};

const SUITS = [
  { sym: "♠", red: false },
  { sym: "♥", red: true },
  { sym: "♦", red: true },
  { sym: "♣", red: false },
] as const;

const RANKS = ["A", "K", "Q", "J", "10", "9"] as const;

const staggerFast = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 420, damping: 30 },
  },
};

function CornerPip({
  rank,
  suit,
  corner,
}: {
  rank: string;
  suit: (typeof SUITS)[number];
  corner: "tl" | "br";
}) {
  const color = suit.red ? "text-[#c62828]" : "text-neutral-800";
  return (
    <div
      className={[
        "flex select-none flex-col items-center leading-none",
        color,
        corner === "br" ? "rotate-180" : "",
      ].join(" ")}
    >
      <span className="font-[system-ui] text-[10px] font-black tracking-tight">{rank}</span>
      <span className="mt-0.5 text-base leading-none" aria-hidden>
        {suit.sym}
      </span>
    </div>
  );
}

export function ResultFlipCard({ card, index, isBestFit, quoteHref, onTextMe, onShare }: ResultFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const flipSpring = { type: "spring" as const, stiffness: 200, damping: 26, mass: 0.72 };
  const suit = SUITS[index % SUITS.length]!;
  const rank = RANKS[index % RANKS.length]!;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36, rotate: index % 2 === 0 ? -2 : 2 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
      whileHover={{
        y: -5,
        rotate: index % 2 === 0 ? -0.5 : 0.5,
        transition: { type: "spring", stiffness: 280, damping: 22 },
      }}
      transition={{
        delay: index * 0.06,
        type: "spring",
        stiffness: 260,
        damping: 24,
      }}
      className="mx-auto w-full max-w-[340px]"
    >
      {/* Light casino pad */}
      <div
        className={[
          "rounded-[1.1rem] p-3 sm:p-4",
          "bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.95)_0%,rgba(225,236,230,0.92)_40%,rgba(200,220,208,0.95)_100%)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_44px_-18px_rgba(15,45,30,0.18)]",
        ].join(" ")}
      >
        <div
          className={[
            "relative rounded-[0.5rem] p-[2px]",
            isBestFit
              ? "bg-gradient-to-br from-[#f5e6b8] via-[#e8d088] to-[#c9a227]"
              : "bg-gradient-to-b from-neutral-400 via-neutral-500 to-neutral-600",
          ].join(" ")}
        >
          <div
            className={[
              "relative overflow-hidden rounded-[9px] shadow-[0_14px_36px_-14px_rgba(0,0,0,0.28)]",
              "ring-1 ring-neutral-900/15",
            ].join(" ")}
            style={{ perspective: "1600px" }}
          >
            <div className="relative min-h-[400px] w-full sm:min-h-[420px]" style={{ perspective: "1600px" }}>
                {/* —— Front —— */}
                <motion.div
                  role="button"
                  tabIndex={0}
                  onClick={() => setFlipped(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setFlipped(true);
                    }
                  }}
                  className="absolute inset-0 flex cursor-pointer flex-col bg-[linear-gradient(170deg,#ffffff_0%,#fafaf8_48%,#f3f1ec_100%)] p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#c62828]/70 focus-visible:ring-offset-2"
                  animate={{ rotateY: flipped ? 180 : 0, opacity: flipped ? 0 : 1 }}
                  transition={flipSpring}
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  aria-hidden={flipped}
                  aria-label={`Turn card to see details for ${card.partyName}`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.03)_3px,rgba(0,0,0,0.03)_4px)]" aria-hidden />
                  <div className="pointer-events-none absolute left-10 right-3 top-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="rounded-full border border-amber-300/80 bg-amber-50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-amber-800 whitespace-nowrap">
                        {card.badge}
                      </span>
                      <span className="rounded-full border border-sky-200/90 bg-sky-50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-sky-800 whitespace-nowrap">
                        {card.vibeLabel}
                      </span>
                    </div>
                    <div className="rounded-full border border-neutral-200/90 bg-white/92 px-2 py-0.5 text-right shadow-sm">
                      <p className="text-[7px] font-bold uppercase tracking-[0.1em] text-neutral-500">Guests</p>
                      <p className="text-[9px] font-semibold leading-none text-neutral-800">{card.guestCountLabel}</p>
                    </div>
                  </div>

                  <div className="flex shrink-0 justify-between">
                    <CornerPip rank={rank} suit={suit} corner="tl" />
                    <div className="w-7" aria-hidden />
                    <div className="w-7" aria-hidden />
                  </div>

                  <div className="relative mt-0.5 flex min-h-0 flex-1 flex-col px-0.5 pt-1.5">

                    <h3 className="mt-0 text-center font-[family-name:var(--font-display)] text-[1.58rem] font-bold leading-[1.06] tracking-tight text-neutral-950 antialiased sm:text-[1.72rem]">
                      {card.partyName}
                    </h3>

                    <motion.div className="mt-2 flex flex-wrap justify-center gap-1.5" variants={staggerFast} initial="hidden" animate="show">
                      {card.moodChips.map((chip, ci) => (
                        <motion.span
                          key={`${chip}-${ci}`}
                          variants={rise}
                          className="rounded-full border border-violet-200/90 bg-violet-50 px-1.5 py-[2px] text-[8px] font-semibold uppercase tracking-[0.07em] text-violet-800"
                        >
                          {chip}
                        </motion.span>
                      ))}
                    </motion.div>

                    <div className="mt-1.5 rounded-lg border border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,253,248,0.98)_0%,rgba(250,245,235,0.95)_100%)] px-3 py-2">
                      <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-amber-900/90">Theme</p>
                      <p className="mt-0.5 text-[10px] font-semibold leading-snug text-amber-800/95">{card.themeName}</p>
                      <p className="mt-1 text-[12px] font-medium leading-relaxed text-neutral-800 antialiased">{card.themeLine}</p>
                    </div>

                    <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-700 antialiased">{card.shortTeaser}</p>

                    <p className="mt-auto pt-2.5 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-[#c62828]/90">Tap for host playbook</p>
                  </div>

                  <div className="pointer-events-none absolute bottom-3 right-3">
                    <CornerPip rank={rank} suit={suit} corner="br" />
                  </div>
                </motion.div>

                {/* —— Back: light “house rules” for readability —— */}
                <motion.div
                  role="button"
                  tabIndex={0}
                  onClick={() => setFlipped(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setFlipped(false);
                    }
                  }}
                  className="absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-[9px] border border-neutral-200 bg-[linear-gradient(165deg,#f8fafc_0%,#f1f5f9_55%,#e8eef5_100%)] outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2"
                  animate={{ rotateY: flipped ? 0 : -180, opacity: flipped ? 1 : 0 }}
                  transition={flipSpring}
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  aria-hidden={!flipped}
                  aria-label="Turn card back"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent 0, transparent 10px, rgba(30,58,95,0.15) 10px, rgba(30,58,95,0.15) 11px)",
                    }}
                    aria-hidden
                  />

                  <div className="relative flex min-h-0 flex-1 flex-col p-4">
                    <p className="text-center text-[9px] font-bold uppercase tracking-[0.22em] text-neutral-600">Host playbook</p>

                    <div className="mt-2 min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain pr-1 text-[12px] leading-relaxed text-neutral-900 antialiased">
                      <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm">
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-amber-900/85">Look &amp; sound</p>
                        <p className="mt-1 text-neutral-800">{card.visualMood}</p>
                      </div>

                      <motion.ul className="space-y-2" variants={staggerFast} initial="hidden" animate={flipped ? "show" : "hidden"}>
                        {card.playbook.map((line, pi) => (
                          <motion.li key={`${line.slice(0, 24)}-${pi}`} variants={rise} className="flex gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" aria-hidden />
                            <span className="text-neutral-800">{line}</span>
                          </motion.li>
                        ))}
                      </motion.ul>

                      <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Why it works</p>
                        <p className="mt-1 text-neutral-800">{card.whyItWorks}</p>
                      </div>
                      <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Invite line</p>
                        <p className="mt-1 font-medium italic text-neutral-950">&ldquo;{card.inviteLine}&rdquo;</p>
                      </div>
                      <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Suggested setup</p>
                        <p className="mt-1 whitespace-pre-line text-neutral-800">{card.setupIdea}</p>
                      </div>
                      <p className="text-center text-[11px] font-medium text-neutral-600">{card.hashtag}</p>
                    </div>

                    <p className="mt-2 shrink-0 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Tap to flip back</p>
                  </div>
                </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-stretch justify-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onTextMe}
          className="min-h-[38px] min-w-[6.5rem] flex-1 rounded-full border border-[#d4af37] bg-white px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-[#111111] shadow-[0_4px_14px_-6px_rgba(212,175,55,0.35)] transition hover:bg-[#fffdf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] sm:min-h-[40px] sm:text-xs"
        >
          Text me this party idea
        </button>
        <a
          href={quoteHref}
          className="flex min-h-[38px] min-w-[6.5rem] flex-1 items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.35)] transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 sm:min-h-[40px] sm:text-xs"
        >
          Reserve
        </a>
        <button
          type="button"
          onClick={onShare}
          className="min-h-[38px] min-w-[6.5rem] flex-1 rounded-full border border-neutral-300 bg-white px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-neutral-700 transition hover:border-[#d4af37]/60 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] sm:min-h-[40px] sm:text-xs"
        >
          Share idea
        </button>
      </div>
    </motion.article>
  );
}



