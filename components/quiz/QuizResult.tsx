"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { business } from "@/lib/site-data";
import type {
  LeadPayload,
  PersonalityId,
  RentalRecommendation,
  ScoringOutcome,
} from "@/lib/quiz/types";
import { getPersonalityCopy } from "@/lib/quiz/results";
import { RentalRecommendationCard } from "./RentalRecommendationCard";

type Props = {
  outcome: ScoringOutcome;
  rental: RentalRecommendation;
  lead: LeadPayload;
  quoteHref: string;
  onAgain: () => void;
};

export function QuizResult({
  outcome,
  rental,
  lead,
  quoteHref,
  onAgain,
}: Props) {
  const [copied, setCopied] = useState(false);
  const primary = getPersonalityCopy(outcome.primary);
  const secondary = outcome.secondary ? getPersonalityCopy(outcome.secondary) : null;

  const blendLine =
    outcome.secondary && secondary
      ? `${outcome.blendPrimaryPct}% ${primary.title.replace(/^The /, "")} · ${outcome.blendSecondaryPct}% ${secondary.title.replace(/^The /, "")}`
      : "One clear winner — no stressful runner-up.";

  function persistLeadForQuote() {
    try {
      const payload = {
        source: "party-personality-quiz",
        personalityId: outcome.primary,
        submittedAt: new Date().toISOString(),
        ...lead,
        yardPhotoName: lead.yardPhoto?.name ?? null,
      };
      sessionStorage.setItem("party-personality-lead", JSON.stringify(payload));
    } catch {
      /* ignore quota / private mode */
    }
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareTitle = primary.title;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "What's Your Party Personality?",
          text: `I'm ${shareTitle}. Roast courtesy of Connecticut Party Rentals.`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      } catch {
        /* noop */
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto w-full max-w-2xl pb-8"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-[#e8c96b]/20 bg-gradient-to-br from-[#2d261f] via-[#1f1a15] to-[#14110e] px-6 py-10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.75)] sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#e8c96b]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#6c9cff]/10 blur-3xl" />

        <p className="relative text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-[#e8c96b]/90">
          Party personality
        </p>
        <h2 className="relative mt-4 text-center font-[family-name:var(--font-display)] text-[1.85rem] font-semibold leading-[1.12] text-[#fffdf7] sm:text-4xl md:text-[2.35rem]">
          You&apos;re {primary.title}
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-center text-sm font-medium text-[#d8cdb8] sm:text-base">
          {blendLine}
        </p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="relative mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-[#ebe4d9] sm:text-lg"
        >
          {primary.roast}
        </motion.p>

        {secondary ? (
          <p className="relative mx-auto mt-6 max-w-xl border-t border-white/10 pt-6 text-center text-sm italic leading-relaxed text-[#c9bea9]">
            Runner-up energy: <span className="font-semibold not-italic">{secondary.title}</span>{" "}
            — {secondary.roast.slice(0, 120)}
            {secondary.roast.length > 120 ? "…" : ""}
          </p>
        ) : null}
      </div>

      <div className="mt-10">
        <RentalRecommendationCard rental={rental} />
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-[#9a8f7e]">
        Our team will confirm availability, site fit, and final pricing before booking.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Link
          href={quoteHref}
          onClick={persistLeadForQuote}
          className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-[#c9983e] via-[#e8c96b] to-[#b8892f] px-6 py-3.5 text-center text-base font-semibold text-[#1a1410] shadow-[0_16px_50px_-12px_rgba(232,201,107,0.55)] sm:min-w-[220px]"
        >
          Save My Party Setup
        </Link>
        <a
          href={business.phoneHref}
          className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-2xl border border-[#e8c96b]/35 bg-white/[0.04] px-6 py-3.5 text-center text-base font-semibold text-[#faf6ee] sm:min-w-[220px]"
        >
          Book a Free Planning Call
        </a>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => void share()}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-white/15 bg-transparent px-5 py-3 text-sm font-medium text-[#d8cdb8] sm:max-w-xs"
        >
          {copied ? "Link copied" : "Share My Result"}
        </button>
        <button
          type="button"
          onClick={onAgain}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-white/15 bg-transparent px-5 py-3 text-sm font-medium text-[#d8cdb8] sm:max-w-xs"
        >
          Take It Again
        </button>
      </div>

      <p className="mx-auto mt-10 max-w-lg text-center text-xs text-[#7a7165]">
        Prefer email?{" "}
        <a href={`mailto:${business.email}`} className="text-[#e8c96b]/90 underline-offset-2 hover:underline">
          {business.email}
        </a>
      </p>
    </motion.div>
  );
}
