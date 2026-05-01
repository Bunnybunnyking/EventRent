import { selectEnhancements } from "@/features/wedding-checklist/data/enhancement-catalog";
import { selectGuestIdeas } from "@/features/wedding-checklist/data/guest-ideas-catalog";
import { buildNextSteps } from "@/features/wedding-checklist/data/next-step-copy";
import { priorityLabels } from "@/features/wedding-checklist/data/priority-options";
import { setupLabels } from "@/features/wedding-checklist/data/setup-labels";
import { selectThingsForget } from "@/features/wedding-checklist/data/things-forget-rules";
import { buildCopyLeads, buildHeadline, buildSubhead } from "@/features/wedding-checklist/data/tone-copy";
import { buildConfirmedAndStill } from "@/features/wedding-checklist/lib/assemble-confirmed-still";
import { buildFullChecklistSections, buildQuickChecklistSections } from "@/features/wedding-checklist/lib/assemble-checklist-sections";
import { buildContentContext } from "@/features/wedding-checklist/lib/content-context";
import type { WeddingChecklistFormState, WeddingChecklistResult, WeddingMode } from "@/features/wedding-checklist/types";

export function computeWeddingChecklistResult(inp: WeddingChecklistFormState, mode: WeddingMode): WeddingChecklistResult {
  const ctx = buildContentContext(inp, mode);
  const { confirmed, still } = buildConfirmedAndStill(ctx);

  const checklistSections =
    mode === "full" ? buildFullChecklistSections(ctx) : buildQuickChecklistSections(ctx);

  return {
    headline: buildHeadline(ctx), subhead: buildSubhead(ctx), mode, checklistSections, confirmedItems: confirmed, stillToConfirm: still, thingsCouplesForget: selectThingsForget(ctx, mode), recommendedEnhancements: selectEnhancements(ctx, mode), optionalGuestIdeas: selectGuestIdeas(ctx, mode), nextSteps: buildNextSteps(ctx, mode), copyLeads: buildCopyLeads(ctx), };
}

export function formatWeddingChecklistPlainText(result: WeddingChecklistResult): string {
  const lines: string[] = [];
  lines.push(result.headline.toUpperCase());
  lines.push("");
  lines.push(result.subhead);
  lines.push("");
  lines.push("=== YOUR WEDDING CHECKLIST ===");
  for (const sec of result.checklistSections) {
    lines.push("");
    lines.push(sec.title.toUpperCase());
    sec.items.forEach((it) => lines.push(`☐ ${it.text}`));
  }
  lines.push("");
  lines.push("=== CAPTURED FROM YOUR ANSWERS ===");
  result.confirmedItems.forEach((c) => lines.push(`✓ ${c}`));
  lines.push("");
  lines.push("=== WORTH CONFIRMING NEXT ===");
  result.stillToConfirm.forEach((c) => lines.push(`• ${c}`));
  lines.push("");
  lines.push("=== EASY-TO-MISS DETAILS ===");
  if (result.copyLeads?.thingsForget) {
    lines.push(result.copyLeads.thingsForget);
    lines.push("");
  }
  result.thingsCouplesForget.forEach((c) => lines.push(`• ${c}`));
  lines.push("");
  lines.push("=== THOUGHTFUL ENHANCEMENTS ===");
  if (result.copyLeads?.enhancements) {
    lines.push(result.copyLeads.enhancements);
    lines.push("");
  }
  result.recommendedEnhancements.forEach((e) => {
    const badge = e.badge ? ` [${e.badge}]` : "";
    lines.push(`• ${e.title}${badge}: ${e.why}`);
  });
  lines.push("");
  lines.push("=== GUEST EXPERIENCE IDEAS ===");
  if (result.copyLeads?.guestIdeas) {
    lines.push(result.copyLeads.guestIdeas);
    lines.push("");
  }
  result.optionalGuestIdeas.forEach((g) => lines.push(`• ${g.title}${g.note ? `, ${g.note}` : ""}`));
  lines.push("");
  lines.push("=== NEXT STEPS ===");
  result.nextSteps.forEach((n) => lines.push(`• ${n}`));
  return lines.join("\n");
}

export { priorityLabels, setupLabels };
