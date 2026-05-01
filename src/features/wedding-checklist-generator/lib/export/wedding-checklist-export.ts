import { computeWeddingChecklistResult, formatWeddingChecklistPlainText } from "@/features/wedding-checklist/lib/generate-output";
import {
  buildSharePayload, buildShareSearchFromPayload, encodeSharePayload, } from "@/features/wedding-checklist/lib/share/wedding-share-payload";
import type { WeddingChecklistFormState, WeddingMode } from "@/features/wedding-checklist/types";
import type { WeddingChecklistSessionState } from "@/features/wedding-checklist/types/persistence";

/** Plain-text export for email, print, or future PDF. */
export function getWeddingChecklistPlainTextExport(form: WeddingChecklistFormState, mode: WeddingMode): string {
  return formatWeddingChecklistPlainText(computeWeddingChecklistResult(form, mode));
}

/** `mailto:` href with body = plain checklist (user still sends from their client). */
export function buildWeddingChecklistMailtoHref(
  form: WeddingChecklistFormState, mode: WeddingMode, subject = "My wedding checklist", ): string {
  const body = getWeddingChecklistPlainTextExport(form, mode);
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Full absolute share URL for the current path including session continuation fields. */
export function buildWeddingChecklistShareUrl(session: WeddingChecklistSessionState): string | null {
  if (typeof window === "undefined") return null;
  if (!session.mode) return null;
  const payload = buildSharePayload(session.form, session);
  const enc = encodeSharePayload(payload);
  if (!enc) return null;
  const search = buildShareSearchFromPayload(payload);
  return `${window.location.origin}${window.location.pathname}${search}`;
}

/**
 * Future: plug PDF generation, CRM handoff, or server-side short links here.
 * For now, re-exports are stable extension points.
 */
export const weddingChecklistExportApi = {
  getPlainText: getWeddingChecklistPlainTextExport, buildMailto: buildWeddingChecklistMailtoHref, buildShareUrl: buildWeddingChecklistShareUrl, };
