import type { ContentContext } from "@/features/wedding-checklist/lib/content-context";
import { pickVariant } from "@/features/wedding-checklist/lib/hash-variant";
import type { WeddingMode } from "@/features/wedding-checklist/types";

export function buildNextSteps(ctx: ContentContext, mode: WeddingMode): string[] {
  const steps: string[] = [];

  if (ctx.readinessRisk >= 62 || ctx.openSetupKeys >= 6) {
    steps.push(
      pickVariant(
        [
          "You have several open logistics items—schedule a focused hour with your tent lead or planner to assign owners and deadlines.",
          "A few important items are still open: carve time this week to close loops with tent, venue, or planner so nothing waits on ‘later.’",
        ],
        `${ctx.variantSeed}-nx1`,
      ),
    );
  } else if (ctx.readinessRisk <= 35) {
    steps.push(
      "Most of your snapshot looks intentional—shift energy to saving, sharing, and week-of execution rather than big structural changes.",
    );
  }

  if (ctx.wxHigh || ctx.venue.weatherBackupConcern || ctx.priorities.includes("prepare_weather")) {
    steps.push(
      pickVariant(
        [
          "Put a weather-backup conversation on the calendar with tent and venue—end with a written trigger and messenger for guests.",
          "Align tent and venue on the rain/wind plan: where guests go, how fast it happens, and who communicates it.",
        ],
        `${ctx.variantSeed}-nxw`,
      ),
    );
  }

  steps.push(
    pickVariant(
      [
        "Share this checklist with your partner or planner and put names next to open items.",
        "Assign each open item to one person—avoid ‘someone will handle it’ for tent, power, and weather.",
      ],
      `${ctx.variantSeed}-nxshare`,
    ),
  );

  steps.push(
    mode === "quick"
      ? "When you need sizes and counts, open your tent calculator and layout tools—this list stays in the “think it through” lane."
      : "When you’re ready for square footage and rental quantities, move to your tent calculator and layout tools—this checklist stays in the readiness lane.",
  );

  if (mode === "quick") {
    steps.push(
      pickVariant(
        [
          "If logistics are getting layered (multiple vendors, estate rules, or tight load-in), rerun in detailed mode for fuller coordination prompts.",
          "If guest count climbs or weather worry increases, switch to the full checklist to add vendor and rental confirmation depth.",
        ],
        `${ctx.variantSeed}-nxq`,
      ),
    );
  } else {
    steps.push(
      pickVariant(
        [
          "Email or print a copy for your week-of binder—even a simple export keeps family and vendors aligned.",
          "Keep a printed contact sheet with this list for day-of: tent, catering, entertainment, venue.",
        ],
        `${ctx.variantSeed}-nxf`,
      ),
    );
  }

  if (ctx.venue.accessLimitations || !ctx.venue.powerNearby) {
    steps.push(
      "Because access or power looks tight on paper, consider a short site visit with tent and catering leads to walk cables and truck paths.",
    );
  }

  return [...new Set(steps)].slice(0, 7);
}
