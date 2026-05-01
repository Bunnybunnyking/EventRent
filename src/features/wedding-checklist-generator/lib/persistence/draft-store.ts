import {
  WEDDING_CHECKLIST_STORAGE_KEY, WEDDING_CHECKLIST_STORAGE_KEY_LEGACY, } from "@/features/wedding-checklist/lib/persistence/constants";
import { migrateRawDraftToV2, sessionToDraftV2 } from "@/features/wedding-checklist/lib/persistence/migrate-draft";
import type { WeddingChecklistDraftV2 } from "@/features/wedding-checklist/types/persistence";
import type { WeddingChecklistSessionState } from "@/features/wedding-checklist/types/persistence";

function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV === "development") {
    console.debug("[wedding-checklist:draft]", ...args);
  }
}

/** Read and migrate draft from localStorage (tries v2 key, then legacy v1). */
export function loadDraftFromStorage(): WeddingChecklistDraftV2 | null {
  if (typeof window === "undefined") return null;
  try {
    const rawV2 = localStorage.getItem(WEDDING_CHECKLIST_STORAGE_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2) as unknown;
      const d = migrateRawDraftToV2(parsed);
      if (d) return d;
      devLog("invalid v2 draft, removing");
      localStorage.removeItem(WEDDING_CHECKLIST_STORAGE_KEY);
    }
    const rawLegacy = localStorage.getItem(WEDDING_CHECKLIST_STORAGE_KEY_LEGACY);
    if (rawLegacy) {
      const parsed = JSON.parse(rawLegacy) as unknown;
      const d = migrateRawDraftToV2(parsed);
      if (d) {
        saveDraftToStorage(sessionFromDraft(d));
        localStorage.removeItem(WEDDING_CHECKLIST_STORAGE_KEY_LEGACY);
        devLog("migrated legacy v1 draft to v2");
        return d;
      }
      devLog("invalid legacy draft, removing");
      localStorage.removeItem(WEDDING_CHECKLIST_STORAGE_KEY_LEGACY);
    }
  } catch (e) {
    devLog("loadDraft error", e);
  }
  return null;
}

function sessionFromDraft(d: WeddingChecklistDraftV2): WeddingChecklistSessionState {
  return {
    form: d.form, mode: d.mode, stepIndex: d.stepIndex, furthestStep: d.furthestStep, checkedLineIds: d.checkedLineIds, };
}

/** Persist current session; overwrites previous draft. */
export function saveDraftToStorage(session: WeddingChecklistSessionState): void {
  if (typeof window === "undefined") return;
  try {
    const draft = sessionToDraftV2(session);
    localStorage.setItem(WEDDING_CHECKLIST_STORAGE_KEY, JSON.stringify(draft));
  } catch (e) {
    devLog("saveDraft quota or error", e);
  }
}

export function clearDraftStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(WEDDING_CHECKLIST_STORAGE_KEY);
    localStorage.removeItem(WEDDING_CHECKLIST_STORAGE_KEY_LEGACY);
  } catch {
    /* ignore */
  }
}
