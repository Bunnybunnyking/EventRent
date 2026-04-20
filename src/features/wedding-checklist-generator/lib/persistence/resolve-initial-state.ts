import { defaultWeddingChecklistForm } from "@/features/wedding-checklist/lib/default-input";
import { WC_URL_PARAM } from "@/features/wedding-checklist/lib/persistence/constants";
import { loadDraftFromStorage } from "@/features/wedding-checklist/lib/persistence/draft-store";
import { draftToSession } from "@/features/wedding-checklist/lib/persistence/migrate-draft";
import { parseShareFromSearch, sharePayloadToSession } from "@/features/wedding-checklist/lib/share/wedding-share-payload";
import type {
  WeddingChecklistHydrationConflict,
  WeddingChecklistResolveResult,
  WeddingChecklistSessionState,
} from "@/features/wedding-checklist/types/persistence";

function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV === "development") {
    console.debug("[wedding-checklist:resolve]", ...args);
  }
}

function sessionSignature(s: WeddingChecklistSessionState): string {
  return JSON.stringify({
    m: s.mode,
    si: s.stepIndex,
    fs: s.furthestStep,
    basics: s.form.basics,
    setup: s.form.setup,
    venue: s.form.venue,
    priorities: s.form.priorities,
    ch: [...s.checkedLineIds].sort(),
  });
}

/**
 * Single source of truth for startup:
 * 1. Valid `?wc=` wins over localStorage (intentional open/share).
 * 2. Else valid local draft.
 * 3. Else empty default session.
 */
export function resolveInitialState(search: string): WeddingChecklistResolveResult {
  const notes: string[] = [];
  const q = search.startsWith("?") ? search.slice(1) : search;
  const wcParamPresent = new URLSearchParams(q).has(WC_URL_PARAM);
  const urlPayload = parseShareFromSearch(search);
  const invalidShareParam = wcParamPresent && !urlPayload;
  if (invalidShareParam) {
    notes.push("invalid_share_param");
    devLog("Invalid or unreadable ?wc= param; falling back to local or defaults");
  }

  if (urlPayload) {
    const sessionFromUrl = sharePayloadToSession(urlPayload);
    let conflict: WeddingChecklistHydrationConflict | null = null;

    const localDraft = loadDraftFromStorage();
    if (localDraft) {
      const localSession = draftToSession(localDraft);
      if (sessionSignature(localSession) !== sessionSignature(sessionFromUrl)) {
        conflict = {
          type: "url_over_local_draft",
          localDraftUpdatedAt: localDraft.updatedAt,
        };
        notes.push("conflict_url_replaces_local");
        devLog("URL share differs from local draft; applying URL", { localUpdatedAt: localDraft.updatedAt });
      }
    }
    notes.push("restore_from_url");
    return {
      session: sessionFromUrl,
      source: "url",
      conflict,
      invalidShareParam: false,
      notes,
      lastSavedAt: new Date().toISOString(),
    };
  }

  const localDraft = loadDraftFromStorage();
  if (localDraft) {
    notes.push("restore_from_local");
    return {
      session: draftToSession(localDraft),
      source: "local",
      conflict: null,
      invalidShareParam,
      notes,
      lastSavedAt: localDraft.updatedAt,
    };
  }

  const empty: WeddingChecklistSessionState = {
    form: defaultWeddingChecklistForm(),
    mode: null,
    stepIndex: -1,
    furthestStep: -1,
    checkedLineIds: [],
  };
  notes.push("default_empty");
  return {
    session: empty,
    source: "default",
    conflict: null,
    invalidShareParam,
    notes,
    lastSavedAt: null,
  };
}
