import type { WeddingMode } from "@/features/wedding-checklist/types";

/** Intake steps before output (full: 4, quick: 3). */
export function intakeStepCount(mode: WeddingMode): number {
  return mode === "full" ? 4 : 3;
}

/** Last step index (output screen). */
export function outputStepIndex(mode: WeddingMode): number {
  return mode === "full" ? 4 : 3;
}

export function stepTitle(mode: WeddingMode, stepIndex: number): string {
  if (mode === "full") {
    const titles = ["Basics & scope", "What you’re planning under tent", "Site & logistics", "What matters most", "Your checklist"];
    return titles[stepIndex] ?? "Checklist";
  }
  const titles = ["Basics & scope", "Tent, site & weather", "What matters most", "Your checklist"];
  return titles[stepIndex] ?? "Checklist";
}

export function stepHint(mode: WeddingMode, stepIndex: number): string {
  if (mode === "full") {
    const hints = [
      "Timing and guest count shape how we phrase milestones, not a quiz, just context.", "Toggle what’s in play so we don’t miss outdoor or tent logistics. Not a rental order.", "Ground, access, and backup worries become concrete checklist lines here.", "Pick a few priorities, we’ll echo them in enhancements and next steps.", "Your personalized checklist, save, share, or print when you’re ready.", ];
    return hints[stepIndex] ?? "";
  }
  const hints = [
    "Just enough context to tune an outdoor-first plan, usually a few minutes.", "One combined pass for setup toggles and site realities (tent, weather, power, flow).", "Choose what “done well” means for you, we’ll reflect it in tone and suggestions.", "A shorter main checklist with outdoor and tent emphasis; rerun in detailed mode if logistics stack up.", ];
  return hints[stepIndex] ?? "";
}
