import { defaultWeddingChecklistForm } from "@/features/wedding-checklist/lib/default-input";
import type { WeddingBasics, WeddingChecklistFormState, WeddingMode } from "@/features/wedding-checklist/types";

export type WeddingChecklistFormPatch = Partial<{
  mode: WeddingMode | null;
  basics: Partial<WeddingBasics>;
  setup: Partial<WeddingChecklistFormState["setup"]>;
  venue: Partial<WeddingChecklistFormState["venue"]>;
  priorities: WeddingChecklistFormState["priorities"];
}>;

export function mergeIntoDefaultForm(patch: WeddingChecklistFormPatch): WeddingChecklistFormState {
  const d = defaultWeddingChecklistForm();
  return mergeFormState(d, patch);
}

export function mergeFormState(prev: WeddingChecklistFormState, patch: WeddingChecklistFormPatch): WeddingChecklistFormState {
  return {
    mode: patch.mode !== undefined ? patch.mode : prev.mode, basics: { ...prev.basics, ...patch.basics }, setup: { ...prev.setup, ...patch.setup }, venue: { ...prev.venue, ...patch.venue }, priorities: patch.priorities ?? prev.priorities, };
}

/** Merge saved state onto defaults so new fields get sane defaults. */
export function normalizeLoadedForm(raw: Partial<WeddingChecklistFormState>): WeddingChecklistFormState {
  const d = defaultWeddingChecklistForm();
  return {
    mode: raw.mode ?? d.mode, basics: { ...d.basics, ...raw.basics }, setup: { ...d.setup, ...raw.setup }, venue: { ...d.venue, ...raw.venue }, priorities: raw.priorities?.length ? raw.priorities : d.priorities, };
}
