import { defaultWeddingChecklistForm } from "@/features/wedding-checklist/lib/default-input";
import { normalizeLoadedForm } from "@/features/wedding-checklist/lib/merge-form";
import type { WeddingChecklistDraftV2, WeddingChecklistStoredDraft } from "@/features/wedding-checklist/types/persistence";
import type { WeddingChecklistFormState } from "@/features/wedding-checklist/types";
import {
  clampFurthestStep, clampStepIndex, validateCheckedLineIds, validateFormShape, } from "@/features/wedding-checklist/lib/persistence/validate-state";
import type { WeddingChecklistValidationIssue } from "@/features/wedding-checklist/types/persistence";

function emptyIssues(): WeddingChecklistValidationIssue[] {
  return [];
}

/** Migrate any recognized shape to a valid v2 draft or null if unusable. */
export function migrateRawDraftToV2(raw: unknown): WeddingChecklistDraftV2 | null {
  if (typeof raw !== "object" || raw === null) return null;
  const o = raw as Record<string, unknown>;
  const v = o.v;

  if (v === 2) return normalizeV2Record(o);
  if (v === 1) return migrateV1ToV2(o);
  return null;
}

function migrateV1ToV2(o: Record<string, unknown>): WeddingChecklistDraftV2 | null {
  const issues = emptyIssues();
  const formRaw = o.form;
  if (!formRaw || typeof formRaw !== "object") return null;
  const form = normalizeLoadedForm(formRaw as Partial<WeddingChecklistFormState>);
  if (!validateFormShape(form, issues)) return null;

  const mode = o.mode === "full" || o.mode === "quick" ? o.mode : form.mode ?? null;
  const stepIndex = clampStepIndex(mode, o.stepIndex);
  const furthestStep = clampFurthestStep(mode, o.furthestStep, stepIndex);

  return {
    v: 2, updatedAt: new Date().toISOString(), mode, stepIndex, furthestStep, form: { ...form, mode }, checkedLineIds: validateCheckedLineIds(o.checkedLineIds), };
}

function normalizeV2Record(o: Record<string, unknown>): WeddingChecklistDraftV2 | null {
  const issues = emptyIssues();
  const formRaw = o.form;
  if (!formRaw || typeof formRaw !== "object") return null;
  const form = normalizeLoadedForm(formRaw as Partial<WeddingChecklistFormState>);
  if (!validateFormShape(form, issues)) return null;

  const mode = o.mode === "full" || o.mode === "quick" ? o.mode : form.mode ?? null;
  const stepIndex = clampStepIndex(mode, o.stepIndex);
  const furthestStep = clampFurthestStep(mode, o.furthestStep, stepIndex);
  const updatedAt = typeof o.updatedAt === "string" ? o.updatedAt : new Date().toISOString();

  return {
    v: 2, updatedAt, mode, stepIndex, furthestStep, form: { ...form, mode }, checkedLineIds: validateCheckedLineIds(o.checkedLineIds), };
}

export function draftToSession(draft: WeddingChecklistDraftV2): import("@/features/wedding-checklist/types/persistence").WeddingChecklistSessionState {
  return {
    form: draft.form, mode: draft.mode, stepIndex: draft.stepIndex, furthestStep: draft.furthestStep, checkedLineIds: draft.checkedLineIds, };
}

export function sessionToDraftV2(session: import("@/features/wedding-checklist/types/persistence").WeddingChecklistSessionState): WeddingChecklistDraftV2 {
  return {
    v: 2, updatedAt: new Date().toISOString(), mode: session.mode, stepIndex: session.stepIndex, furthestStep: session.furthestStep, form: session.form, checkedLineIds: session.checkedLineIds, };
}
