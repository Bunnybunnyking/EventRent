import { mergeIntoDefaultForm } from "@/features/wedding-checklist/lib/merge-form";
import { outputStepIndex } from "@/features/wedding-checklist/lib/flow-meta";
import {
  clampFurthestStep,
  clampStepIndex,
  validateBasics,
  validateCheckedLineIds,
  validatePriorities,
  validateSetup,
  validateVenue,
  validateWeddingMode,
} from "@/features/wedding-checklist/lib/persistence/validate-state";
import { WC_URL_PARAM } from "@/features/wedding-checklist/lib/persistence/constants";
import type { WeddingChecklistFormState, WeddingMode } from "@/features/wedding-checklist/types";
import type { WeddingChecklistValidationIssue } from "@/features/wedding-checklist/types/persistence";
import type { WeddingChecklistSessionState } from "@/features/wedding-checklist/types/persistence";

/** Compact URL-safe payload (share link). */
export interface WeddingChecklistSharePayload {
  m: WeddingChecklistFormState["mode"];
  b: WeddingChecklistFormState["basics"];
  s: WeddingChecklistFormState["setup"];
  v: WeddingChecklistFormState["venue"];
  p: WeddingChecklistFormState["priorities"];
  /** Optional session continuation */
  si?: number;
  fs?: number;
  ch?: string[];
}

function toBase64Url(json: string): string {
  if (typeof btoa !== "function") return "";
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): string | null {
  try {
    let b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    return decodeURIComponent(escape(atob(b64)));
  } catch {
    return null;
  }
}

export function validateSharePayload(o: unknown): { ok: true; payload: WeddingChecklistSharePayload } | { ok: false; issues: WeddingChecklistValidationIssue[] } {
  const issues: WeddingChecklistValidationIssue[] = [];
  if (typeof o !== "object" || o === null) {
    return { ok: false, issues: [{ path: "payload", message: "not an object" }] };
  }
  const r = o as Record<string, unknown>;
  if (!validateBasics(r.b, issues)) return { ok: false, issues };
  if (!validateSetup(r.s, issues)) return { ok: false, issues };
  if (!validateVenue(r.v, issues)) return { ok: false, issues };
  if (!validatePriorities(r.p, issues)) return { ok: false, issues };
  if (!validateWeddingMode(r.m)) {
    issues.push({ path: "m", message: "invalid mode" });
    return { ok: false, issues };
  }
  const payload: WeddingChecklistSharePayload = {
    m: r.m as WeddingChecklistSharePayload["m"],
    b: r.b as WeddingChecklistSharePayload["b"],
    s: r.s as WeddingChecklistSharePayload["s"],
    v: r.v as WeddingChecklistSharePayload["v"],
    p: r.p as WeddingChecklistSharePayload["p"],
  };
  if (r.si !== undefined) {
    if (typeof r.si !== "number" || Number.isNaN(r.si)) issues.push({ path: "si", message: "invalid" });
    else payload.si = Math.floor(r.si);
  }
  if (r.fs !== undefined) {
    if (typeof r.fs !== "number" || Number.isNaN(r.fs)) issues.push({ path: "fs", message: "invalid" });
    else payload.fs = Math.floor(r.fs);
  }
  if (r.ch !== undefined) {
    payload.ch = validateCheckedLineIds(r.ch);
  }
  if (issues.length) return { ok: false, issues };
  return { ok: true, payload };
}

export function sharePayloadToForm(payload: WeddingChecklistSharePayload): WeddingChecklistFormState {
  const base = mergeIntoDefaultForm({});
  return {
    mode: payload.m,
    basics: { ...base.basics, ...payload.b },
    setup: { ...base.setup, ...payload.s },
    venue: { ...base.venue, ...payload.v },
    priorities: payload.p?.length ? payload.p : base.priorities,
  };
}

/** Build share payload including optional step + checked state for meaningful restore. */
export function buildSharePayload(
  form: WeddingChecklistFormState,
  session?: Pick<WeddingChecklistSessionState, "stepIndex" | "furthestStep" | "checkedLineIds" | "mode">,
): WeddingChecklistSharePayload {
  const mode = session?.mode ?? form.mode;
  const out: WeddingChecklistSharePayload = {
    m: mode,
    b: form.basics,
    s: form.setup,
    v: form.venue,
    p: form.priorities,
  };
  if (mode && session) {
    out.si = session.stepIndex;
    out.fs = session.furthestStep;
    if (session.checkedLineIds?.length) out.ch = session.checkedLineIds;
  }
  return out;
}

export function sharePayloadToSession(payload: WeddingChecklistSharePayload): WeddingChecklistSessionState {
  const form = sharePayloadToForm(payload);
  const mode = payload.m === "full" || payload.m === "quick" ? payload.m : null;
  const stepIndex = mode ? clampStepIndex(mode, payload.si ?? 0) : -1;
  const furthest = mode ? clampFurthestStep(mode, payload.fs ?? stepIndex, stepIndex) : -1;
  const checked = validateCheckedLineIds(payload.ch);
  return {
    form: { ...form, mode },
    mode,
    stepIndex,
    furthestStep: furthest,
    checkedLineIds: checked,
  };
}

export function encodeSharePayload(payload: WeddingChecklistSharePayload): string {
  return toBase64Url(JSON.stringify(payload));
}

export function decodeSharePayload(encoded: string): WeddingChecklistSharePayload | null {
  const json = fromBase64Url(encoded);
  if (!json) return null;
  try {
    const o = JSON.parse(json) as unknown;
    const v = validateSharePayload(o);
    if (!v.ok) return null;
    return v.payload;
  } catch {
    return null;
  }
}

export function parseShareFromSearch(search: string): WeddingChecklistSharePayload | null {
  const q = search.startsWith("?") ? search.slice(1) : search;
  const p = new URLSearchParams(q).get(WC_URL_PARAM);
  if (!p) return null;
  try {
    return decodeSharePayload(decodeURIComponent(p));
  } catch {
    return null;
  }
}

export function buildShareSearchFromPayload(payload: WeddingChecklistSharePayload): string {
  const enc = encodeSharePayload(payload);
  if (!enc) return "";
  return `?${WC_URL_PARAM}=${encodeURIComponent(enc)}`;
}
