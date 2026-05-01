import type { WeddingChecklistFormState, WeddingMode } from "@/features/wedding-checklist/types";

/** Discriminated persistence versions stored in localStorage */
export type WeddingChecklistDraftVersion = 1 | 2;

/** Normalized session slice the hook keeps in React state */
export interface WeddingChecklistSessionState {
  form: WeddingChecklistFormState;
  mode: WeddingMode | null;
  /** -1 = mode selection */
  stepIndex: number;
  furthestStep: number;
  checkedLineIds: string[];
}

/** v2 local draft (localStorage) */
export interface WeddingChecklistDraftV2 {
  v: 2;
  updatedAt: string;
  mode: WeddingMode | null;
  stepIndex: number;
  furthestStep: number;
  form: WeddingChecklistFormState;
  checkedLineIds: string[];
}

/** v1 legacy, migrated to v2 on read */
export interface WeddingChecklistDraftV1 {
  v: 1;
  mode: WeddingMode | null;
  stepIndex: number;
  furthestStep: number;
  form: WeddingChecklistFormState;
  checkedLineIds: string[];
}

export type WeddingChecklistStoredDraft = WeddingChecklistDraftV1 | WeddingChecklistDraftV2;

export type WeddingChecklistRestoreSource = "url" | "local" | "default";

export interface WeddingChecklistHydrationConflict {
  type: "url_over_local_draft";
  /** ISO timestamp of the local draft that was not auto-merged */
  localDraftUpdatedAt: string | null;
}

/** Result of initial load resolution (URL vs localStorage) */
export interface WeddingChecklistResolveResult {
  session: WeddingChecklistSessionState;
  source: WeddingChecklistRestoreSource;
  /** Present when a valid ?wc= was opened while a different valid local draft existed */
  conflict: WeddingChecklistHydrationConflict | null;
  /** True when `?wc=` was present but could not be decoded or failed validation */
  invalidShareParam: boolean;
  /** Human-readable notes for dev or future UI */
  notes: string[];
  /** ISO timestamp for “last saved” display when restoring local; set when URL wins after sync save */
  lastSavedAt: string | null;
}

export interface WeddingChecklistValidationIssue {
  path: string;
  message: string;
}
