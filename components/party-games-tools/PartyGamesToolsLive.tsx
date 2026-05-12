"use client";

import { QuickEventPlanner } from "@/components/quick-event-planner";
import { PartySparkGenerator } from "@/components/party-spark/PartySparkGenerator";
import { TentSizeEstimator } from "@/components/tent-size-estimator";
import { business } from "@/lib/site-data";
import { TentLayoutPlannerPanel } from "./TentLayoutPlannerPanel";

/**
 * Embedded interactive tools on the games & tools hub (not link-only).
 */
export function PartyGamesToolsLive() {
  return (
    <section
      id="live-tools"
      className="scroll-mt-28 border-b border-[#e6dfd3]/90 bg-[linear-gradient(180deg,#faf8f3_0%,#fffdfb_45%,#f7f4ee_100%)] px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
      aria-labelledby="live-tools-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8a7d68]">Use them here</p>
          <h2
            id="live-tools-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#221c16] sm:text-[1.85rem]"
          >
            Live planning &amp; party tools
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6b6156] sm:text-base">
            Tent sizing, quick planning, Party Spark, and (when configured) the canvas layout planner. Scroll and run
            them on this page. Quizzes stay on their own links so results and share URLs stay clean.
          </p>
        </div>

        <div className="mt-10 space-y-14">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#2c241c] sm:text-xl">
              Tent size calculator
            </h3>
            <p className="mt-1 text-sm text-[#6b6156]">Rough square-footage from guests, seating style, and add-ons.</p>
            <div className="mt-5 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm sm:p-6">
              <TentSizeEstimator />
            </div>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#2c241c] sm:text-xl">
              Quick Event Planner
            </h3>
            <p className="mt-1 text-sm text-[#6b6156]">Three steps to a starter package idea and add-ons.</p>
            <div className="mt-5 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm sm:p-6">
              <QuickEventPlanner />
            </div>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#2c241c] sm:text-xl">
              Frame tent layout planner
            </h3>
            <p className="mt-1 text-sm text-[#6b6156]">
              Canvas seating / floorplan builder (separate app; embeds when a public URL is configured).
            </p>
            <div className="mt-5">
              <TentLayoutPlannerPanel />
            </div>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#2c241c] sm:text-xl">
              Party Spark Generator
            </h3>
            <p className="mt-1 text-sm text-[#6b6156]">Names, themes, flip cards: same tool as the standalone page.</p>
            <div className="mt-5 rounded-2xl border border-[#e8dfd3]/90 bg-[#fffdf9]/90 p-3 shadow-sm sm:p-5">
              <PartySparkGenerator quoteHref="/contact#quote" brandLine="Connecticut Party Rentals" brandShort={business.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
