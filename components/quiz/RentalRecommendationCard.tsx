"use client";

import { motion } from "framer-motion";
import type { RentalRecommendation } from "@/lib/quiz/types";

type Props = {
  rental: RentalRecommendation;
};

export function RentalRecommendationCard({ rental }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] sm:p-8"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e8c96b]/90">
        Recommended setup
      </p>
      <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#fffdf7] sm:text-2xl">
        Rental starting point
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#d8cdb8]">{rental.softGuestCta}</p>

      <dl className="mt-6 space-y-5 text-sm sm:text-[15px]">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b5a995]">
            Tent (primary)
          </dt>
          <dd className="mt-1.5 leading-relaxed text-[#faf6ee]">{rental.tentSizePrimary}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b5a995]">
            Alternate layout
          </dt>
          <dd className="mt-1.5 leading-relaxed text-[#faf6ee]">{rental.tentSizeAlternate}</dd>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b5a995]">
              Tables
            </dt>
            <dd className="mt-1.5 leading-relaxed text-[#faf6ee]">{rental.tableCount}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b5a995]">
              Chairs
            </dt>
            <dd className="mt-1.5 leading-relaxed text-[#faf6ee]">{rental.chairCount}</dd>
          </div>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b5a995]">
            Buffet / staging
          </dt>
          <dd className="mt-1.5 leading-relaxed text-[#faf6ee]">{rental.buffetTables}</dd>
        </div>
        {rental.addOns.length > 0 ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b5a995]">
              Smart add-ons
            </dt>
            <dd className="mt-1.5">
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-[#faf6ee] marker:text-[#e8c96b]/80">
                {rental.addOns.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
        <div className="rounded-2xl border border-[#e8c96b]/20 bg-[#e8c96b]/5 px-4 py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8c96b]/95">
            Host survival tip
          </dt>
          <dd className="mt-2 leading-relaxed text-[#faf6ee]">{rental.hostSurvivalTip}</dd>
        </div>
      </dl>
    </motion.div>
  );
}
