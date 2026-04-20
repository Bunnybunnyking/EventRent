import type { PlanningPriorityId } from "@/features/wedding-checklist/types";

export const PLANNING_PRIORITY_OPTIONS: { id: PlanningPriorityId; label: string; helper?: string }[] = [
  { id: "keep_simple", label: "Keep things simple", helper: "Favor clarity over complexity" },
  { id: "stay_organized", label: "Stay highly organized", helper: "Structured confirmations" },
  { id: "reduce_stress", label: "Reduce stress", helper: "Gentle pacing and priorities" },
  { id: "guest_comfort", label: "Improve guest comfort", helper: "Flow, shade, warmth, restrooms" },
  { id: "prepare_weather", label: "Prepare for weather", helper: "Backup thinking baked in" },
  { id: "polished_tent", label: "Make the tented space feel polished", helper: "Lighting, layout, lounge moments" },
  { id: "avoid_last_minute", label: "Avoid last-minute issues", helper: "Load-in, power, comms tree" },
];

export const priorityLabels: Record<PlanningPriorityId, string> = PLANNING_PRIORITY_OPTIONS.reduce(
  (acc, o) => {
    acc[o.id] = o.label;
    return acc;
  },
  {} as Record<PlanningPriorityId, string>,
);
