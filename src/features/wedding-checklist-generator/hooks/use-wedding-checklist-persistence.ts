"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { defaultWeddingChecklistForm } from "@/features/wedding-checklist/lib/default-input";
import { mergeFormState, type WeddingChecklistFormPatch } from "@/features/wedding-checklist/lib/merge-form";
import {
  PERSIST_DEBOUNCE_MS, WC_URL_PARAM, clearDraftStorage, resolveInitialState, saveDraftToStorage, } from "@/features/wedding-checklist/lib/persistence";
import { parseShareFromSearch } from "@/features/wedding-checklist/lib/share/wedding-share-payload";
import { stripWeddingChecklistShareParam } from "@/features/wedding-checklist/lib/url-state/strip-wc-query";
import {
  buildSharePayload, encodeSharePayload, type WeddingChecklistSharePayload, } from "@/features/wedding-checklist/lib/share/wedding-share-payload";
import { buildWeddingChecklistShareUrl } from "@/features/wedding-checklist/lib/export/wedding-checklist-export";
import type { WeddingChecklistFormState, WeddingMode } from "@/features/wedding-checklist/types";
import type {
  WeddingChecklistHydrationConflict, WeddingChecklistSessionState, } from "@/features/wedding-checklist/types/persistence";

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function sessionFromHookState(
  form: WeddingChecklistFormState, mode: WeddingMode | null, stepIndex: number, furthestStep: number, checkedLineIds: string[], ): WeddingChecklistSessionState {
  return {
    form, mode, stepIndex, furthestStep, checkedLineIds, };
}

export interface WeddingChecklistPersistenceMeta {
  source: "url" | "local" | "default";
  conflict: WeddingChecklistHydrationConflict | null;
  /** True when a share link was unreadable; session fell back to local draft or defaults */
  invalidShareParam: boolean;
  notes: string[];
  /** ISO time of last successful local persist */
  lastSavedAt: string | null;
  /** False until first resolveInitialState has been applied */
  ready: boolean;
}

export function useWeddingChecklistPersistence() {
  const hydrated = useRef(false);

  const [form, setForm] = useState<WeddingChecklistFormState>(() => defaultWeddingChecklistForm());
  const [mode, setMode] = useState<WeddingMode | null>(null);
  const [stepIndex, setStepIndex] = useState(-1);
  const [furthestStep, setFurthestStep] = useState(-1);
  const [checkedLineIds, setCheckedLineIds] = useState<string[]>([]);

  const [ready, setReady] = useState(false);
  const [persistenceMeta, setPersistenceMeta] = useState<WeddingChecklistPersistenceMeta>({
    source: "default", conflict: null, invalidShareParam: false, notes: [], lastSavedAt: null, ready: false, });

  /** One-time: URL > localStorage > defaults; then optional strip ?wc= and sync URL state into local draft */
  useEffect(() => {
    if (typeof window === "undefined" || hydrated.current) return;
    hydrated.current = true;

    const search = window.location.search;
    const resolved = resolveInitialState(search);
    const hadWcParam = new URLSearchParams(search).has(WC_URL_PARAM);

    queueMicrotask(() => {
      const s = resolved.session;
      setForm(s.form);
      setMode(s.mode);
      setStepIndex(s.stepIndex);
      setFurthestStep(s.furthestStep);
      setCheckedLineIds(s.checkedLineIds);

      setPersistenceMeta({
        source: resolved.source, conflict: resolved.conflict, invalidShareParam: resolved.invalidShareParam, notes: resolved.notes, lastSavedAt: resolved.lastSavedAt, ready: true, });
      setReady(true);

      if (resolved.source === "url") {
        stripWeddingChecklistShareParam();
        saveDraftToStorage(s);
      } else if (hadWcParam && !parseShareFromSearch(search)) {
        stripWeddingChecklistShareParam();
      }

      if (process.env.NODE_ENV === "development") {
        console.debug("[wedding-checklist:persistence]", {
          source: resolved.source, conflict: resolved.conflict, invalidShareParam: resolved.invalidShareParam, notes: resolved.notes, });
      }
    });
  }, []);

  const session = useMemo(
    () => sessionFromHookState(form, mode, stepIndex, furthestStep, checkedLineIds), [form, mode, stepIndex, furthestStep, checkedLineIds], );

  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSave = useCallback(() => {
    if (typeof window === "undefined" || !ready) return;
    saveDraftToStorage(session);
    const iso = new Date().toISOString();
    setPersistenceMeta((prev) => ({ ...prev, lastSavedAt: iso }));
  }, [ready, session]);

  useEffect(() => {
    if (!ready) return;
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(runSave, PERSIST_DEBOUNCE_MS);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [ready, runSave, session]);

  const updateForm = useCallback((patch: WeddingChecklistFormPatch) => {
    setForm((prev) => mergeFormState(prev, patch));
  }, []);

  const selectMode = useCallback((m: WeddingMode) => {
    setMode(m);
    setForm((f) => ({ ...f, mode: m }));
    setStepIndex(0);
    setFurthestStep((fs) => Math.max(fs, 0));
  }, []);

  const backToModeSelect = useCallback(() => {
    setMode(null);
    setStepIndex(-1);
    setForm((f) => ({ ...f, mode: null }));
  }, []);

  const goStep = useCallback((next: number, maxStep: number) => {
    const clamped = clamp(next, -1, maxStep);
    setStepIndex(clamped);
    setFurthestStep((fs) => Math.max(fs, clamped));
  }, []);

  const resetDraft = useCallback(() => {
    setForm(defaultWeddingChecklistForm());
    setMode(null);
    setStepIndex(-1);
    setFurthestStep(-1);
    setCheckedLineIds([]);
    clearDraftStorage();
    setPersistenceMeta((prev) => ({
      ...prev, source: "default", conflict: null, invalidShareParam: false, notes: ["user_reset"], lastSavedAt: null, }));
  }, []);

  const sharePayload = useMemo((): WeddingChecklistSharePayload | null => {
    if (!mode) return null;
    return buildSharePayload(form, session);
  }, [form, mode, session]);

  const copyShareLink = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    const url = buildWeddingChecklistShareUrl(session);
    if (!url) {
      if (!sharePayload) return false;
      const enc = encodeSharePayload(sharePayload);
      if (!enc) return false;
      const manual = `${window.location.origin}${window.location.pathname}?wc=${encodeURIComponent(enc)}`;
      try {
        await navigator.clipboard.writeText(manual);
        return true;
      } catch {
        return false;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return false;
    }
  }, [session, sharePayload]);

  const toggleCheckedLine = useCallback((id: string) => {
    setCheckedLineIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const dismissConflictNotice = useCallback(() => {
    setPersistenceMeta((prev) => ({ ...prev, conflict: null }));
  }, []);

  const dismissInvalidShareNotice = useCallback(() => {
    setPersistenceMeta((prev) => ({ ...prev, invalidShareParam: false }));
  }, []);

  return {
    form, mode, stepIndex, furthestStep, checkedLineIds, updateForm, selectMode, goStep, setStepIndex, setFurthestStep, resetDraft, backToModeSelect, copyShareLink, sharePayload, toggleCheckedLine, setCheckedLineIds, persistenceMeta, dismissConflictNotice, dismissInvalidShareNotice, };
}
