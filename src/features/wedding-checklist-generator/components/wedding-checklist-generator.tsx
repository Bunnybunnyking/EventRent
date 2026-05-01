"use client";

import { ChecklistOutput } from "@/features/wedding-checklist/components/checklist-output";
import { IntakeStepRouter } from "@/features/wedding-checklist/components/intake-steps";
import { ModeSelection } from "@/features/wedding-checklist/components/mode-selection";
import { StepShell } from "@/features/wedding-checklist/components/step-shell";
import { useWeddingChecklistPersistence } from "@/features/wedding-checklist/hooks/use-wedding-checklist-persistence";
import { intakeStepCount, outputStepIndex } from "@/features/wedding-checklist/lib/flow-meta";
import type { WeddingMode } from "@/features/wedding-checklist/types";

export function WeddingChecklistGenerator() {
  const {
    form, mode, stepIndex, updateForm, selectMode, goStep, resetDraft, backToModeSelect, copyShareLink, checkedLineIds, toggleCheckedLine, setCheckedLineIds, persistenceMeta, dismissConflictNotice, dismissInvalidShareNotice, } = useWeddingChecklistPersistence();

  const showMode = stepIndex < 0 || mode == null;
  const outIdx = mode ? outputStepIndex(mode) : -1;
  const onOutput = mode != null && stepIndex === outIdx;

  const lastIntake = mode != null ? intakeStepCount(mode) - 1 : -1;

  const handleContinue = () => {
    if (!mode) return;
    if (stepIndex < lastIntake) goStep(stepIndex + 1, outIdx);
    else if (stepIndex === lastIntake) goStep(outIdx, outIdx);
  };

  const handleBack = () => {
    if (stepIndex <= 0) {
      backToModeSelect();
      return;
    }
    goStep(stepIndex - 1, outIdx);
  };

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-amber-200/60 bg-[#fffbf0] px-4 py-3 text-center text-sm text-stone-700">
        <span className="font-semibold text-stone-900">Local preview</span>, this route is for development and testing. Not linked from the main site navigation yet.
      </div>

      {!persistenceMeta.ready ? (
        <div
          className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-stone-200/80 bg-white/70 px-6 py-14 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          role="status"
          aria-live="polite"
        >
          <div
            className="h-9 w-9 animate-spin rounded-full border-2 border-stone-200 border-t-emerald-800/85"
            aria-hidden
          />
          <p className="text-sm font-medium text-stone-800">Loading your draft…</p>
          <p className="max-w-sm text-xs leading-relaxed text-stone-500">
            Restoring saved progress from this device (or a share link). Buttons stay disabled for a moment so nothing you tap gets overwritten.
          </p>
        </div>
      ) : null}

      {persistenceMeta.ready && persistenceMeta.lastSavedAt ? (
        <p className="text-center text-xs text-stone-500">
          Draft saved locally
          {persistenceMeta.source === "url" ? " (opened from share link)" : persistenceMeta.source === "local" ? " (restored)" : ""}
          {" · "}
          {new Date(persistenceMeta.lastSavedAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
        </p>
      ) : null}

      {persistenceMeta.ready && persistenceMeta.invalidShareParam ? (
        <div
          className="flex flex-col gap-2 rounded-xl border border-stone-200/90 bg-stone-50/95 px-4 py-3 text-sm text-stone-800 sm:flex-row sm:items-center sm:justify-between"
          role="status"
        >
          <span>
            We couldn’t read that <strong>share link</strong>. Your saved draft on this device is shown instead (or a fresh start if nothing was saved). The broken
            link was removed from the address bar.
          </span>
          <button
            type="button"
            onClick={dismissInvalidShareNotice}
            className="shrink-0 rounded-lg border border-stone-300/80 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800"
          >
            Okay
          </button>
        </div>
      ) : null}

      {persistenceMeta.ready && persistenceMeta.conflict ? (
        <div
          className="flex flex-col gap-2 rounded-xl border border-amber-300/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950 sm:flex-row sm:items-center sm:justify-between"
          role="status"
        >
          <span>
            You opened a <strong>shared link</strong> while a different draft was saved on this device. The shared checklist is now active and your previous
            draft was replaced in storage.
            {persistenceMeta.conflict.localDraftUpdatedAt ? (
              <span className="block text-xs text-amber-900/85 mt-1">
                Previous draft had been saved {new Date(persistenceMeta.conflict.localDraftUpdatedAt).toLocaleString()}.
              </span>
            ) : null}
          </span>
          <button
            type="button"
            onClick={dismissConflictNotice}
            className="shrink-0 rounded-lg border border-amber-400/60 bg-white px-3 py-1.5 text-xs font-semibold text-amber-950"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {persistenceMeta.ready && showMode ? (
        <ModeSelection
          onSelect={(m: WeddingMode) => {
            selectMode(m);
          }}
        />
      ) : null}

      {persistenceMeta.ready && !showMode && mode && !onOutput ? (
        <StepShell mode={mode} stepIndex={stepIndex}>
          <IntakeStepRouter mode={mode} stepIndex={stepIndex} form={form} updateForm={updateForm} />
          <footer className="mt-10 flex flex-col gap-3 border-t border-stone-200/90 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="text-sm font-semibold text-stone-600 underline underline-offset-2 hover:text-stone-900"
            >
              {stepIndex === 0 ? "← Change mode" : "← Back"}
            </button>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetDraft}
                className="touch-manipulation rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 hover:border-stone-300"
              >
                Clear draft
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className="touch-manipulation min-h-[44px] rounded-xl bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 active:scale-[0.99]"
              >
                {stepIndex >= lastIntake ? "View checklist" : "Continue"}
              </button>
            </div>
          </footer>
        </StepShell>
      ) : null}

      {persistenceMeta.ready && !showMode && mode && onOutput ? (
        <div className="pb-4 md:pb-2">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => goStep(lastIntake, outIdx)}
              className="text-sm font-semibold text-stone-600 underline underline-offset-2 hover:text-stone-900"
            >
              ← Edit answers
            </button>
            <button
              type="button"
              onClick={resetDraft}
              className="self-start rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 sm:self-auto"
            >
              Reset &amp; start over
            </button>
          </div>
          <ChecklistOutput
            form={form}
            mode={mode}
            checkedLineIds={checkedLineIds}
            onToggleLine={toggleCheckedLine}
            setCheckedLineIds={setCheckedLineIds}
            onCopyLink={copyShareLink}
            onBackToStart={backToModeSelect}
          />
        </div>
      ) : null}
    </div>
  );
}
