"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { buildWeddingChecklistMailtoHref } from "@/features/wedding-checklist/lib/export/wedding-checklist-export";
import { computeWeddingChecklistResult } from "@/features/wedding-checklist/lib/generate-output";
import type { WeddingChecklistFormState } from "@/features/wedding-checklist/types";

function CheckRow({
  id, text, checked, onToggle, }: {
  id: string;
  text: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={`group flex min-h-[48px] cursor-pointer touch-manipulation gap-3 rounded-xl border px-3 py-2.5 transition ${
        checked
          ? "border-[#c9a227]/55 bg-[#fffbf0] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] hover:bg-[#fff8e8]"
          : "border-transparent hover:border-stone-200/90 hover:bg-white"
      }`}
    >
      <input
        type="checkbox"
        className="mt-0.5 h-[1.1rem] w-[1.1rem] shrink-0 rounded border-stone-400 accent-[#9f7322] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227]/45"
        checked={checked}
        onChange={onToggle}
      />
      <span
        className={`text-[0.9375rem] leading-relaxed transition ${checked ? "text-stone-800" : "text-stone-800"}`}
      >
        {text}
      </span>
    </label>
  );
}

export function ChecklistOutput({
  form, mode, checkedLineIds, onToggleLine, onCopyLink, onBackToStart, setCheckedLineIds, }: {
  form: WeddingChecklistFormState;
  mode: NonNullable<WeddingChecklistFormState["mode"]>;
  checkedLineIds: string[];
  onToggleLine: (id: string) => void;
  onCopyLink: () => Promise<boolean>;
  onBackToStart: () => void;
  setCheckedLineIds: Dispatch<SetStateAction<string[]>>;
}) {
  const result = useMemo(() => computeWeddingChecklistResult(form, mode), [form, mode]);
  const [copyOk, setCopyOk] = useState(false);
  const checkedSet = useMemo(() => new Set(checkedLineIds), [checkedLineIds]);

  /** Stable key whenever the generated checklist line IDs change (new answers / mode). */
  const checklistContentKey = useMemo(
    () =>
      result.checklistSections.map((s) => s.items.map((i) => i.id).join(",")).join("|"), [result.checklistSections], );

  /**
   * Checkboxes mean “done”: only IDs in checkedLineIds render checked.
   * New checklist → start with nothing checked. When line IDs change (edits / new plan), * drop stale IDs and keep any that still exist (e.g. restored session or share link).
   */
  useLayoutEffect(() => {
    const allIds = result.checklistSections.flatMap((s) => s.items.map((it) => it.id));
    if (allIds.length === 0) return;

    const allSet = new Set(allIds);
    setCheckedLineIds((prev) => prev.filter((id) => allSet.has(id)));
    // checklistContentKey captures line identity; omit result.checklistSections so a churning array ref cannot re-sync after every toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync only when generated line ids change (checklistContentKey)
  }, [checklistContentKey, setCheckedLineIds]);

  const handleCopy = async () => {
    const ok = await onCopyLink();
    setCopyOk(ok);
    setTimeout(() => setCopyOk(false), 2500);
  };

  const mailto = useMemo(() => buildWeddingChecklistMailtoHref(form, mode), [form, mode]);

  const modeLabel = mode === "quick" ? "Essentials path" : "Detailed path";

  return (
    <div className="mx-auto max-w-4xl print:max-w-none">
      <header className="rounded-2xl border border-stone-200/90 bg-white px-5 py-8 shadow-[0_2px_12px_rgba(15,23,42,0.06)] sm:px-8 sm:py-10 text-center sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#8a6218] sm:text-xs">Your checklist</p>
          <span className="hidden h-4 w-px bg-gradient-to-b from-transparent via-[#c9a227]/70 to-transparent sm:block" aria-hidden />
          <span className="rounded-full border-2 border-stone-900/90 bg-white px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-stone-900">
            {modeLabel}
          </span>
        </div>
        <h2 className="mt-5 text-[1.65rem] font-bold leading-[1.15] tracking-tight text-stone-900 [font-family:var(--font-display)] sm:mt-6 sm:text-4xl sm:leading-[1.12] md:text-[2.35rem]">
          {result.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-stone-700 sm:mx-0 sm:text-[1.05rem]">
          {result.subhead}
        </p>
        <div className="mx-auto mt-7 max-w-2xl border-l-4 border-[#c9a227] bg-[#fffdf8] px-4 py-4 text-left text-sm leading-relaxed text-stone-800 shadow-sm sm:mx-0 sm:px-5">
          <p className="text-base font-bold text-stone-900 [font-family:var(--font-display)]">How this checklist works</p>
          <p className="mt-2 text-stone-800">
            <span className="font-semibold text-stone-900">Unchecked</span> = still to do.{" "}
            <span className="font-semibold text-stone-900">Checked</span> = handled or not applicable, you’re marking it complete. Tap any row to update; progress saves on
            this device.
          </p>
        </div>
      </header>

      <section className="mt-12 space-y-8 print:space-y-6" aria-labelledby="checklist-main-heading">
        <h3 id="checklist-main-heading" className="sr-only">
          Your wedding checklist
        </h3>
        {result.checklistSections.map((sec) => (
          <div
            key={sec.id}
            className="rounded-2xl border-2 border-stone-200/90 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.05)] print:break-inside-avoid sm:p-7"
          >
            <h4 className="border-b-2 border-[#c9a227]/35 pb-3 text-xl font-bold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-[1.35rem]">
              {sec.title}
            </h4>
            <ul className="mt-5 space-y-1.5">
              {sec.items.map((it) => (
                <li key={it.id}>
                  <CheckRow id={it.id} text={it.text} checked={checkedSet.has(it.id)} onToggle={() => onToggleLine(it.id)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="mt-12 space-y-6 print:block">
        <p className="text-center text-[0.7rem] font-bold uppercase tracking-[0.2em] text-stone-500 sm:text-left">
          Snapshot &amp; recommendations
        </p>
        <div className="grid gap-6 print:grid-cols-1 sm:grid-cols-2">
          <OutputCard title="Captured from your answers" tone="gold">
            <ul className="space-y-2.5">
              {result.confirmedItems.map((c, i) => (
                <li key={i} className="flex gap-2 text-[0.9375rem] leading-relaxed text-stone-800">
                  <span className="font-bold text-[#9f7322]" aria-hidden>
                    ✓
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </OutputCard>
          <OutputCard title="Worth confirming next" tone="light">
            <ul className="space-y-2.5">
              {result.stillToConfirm.map((c, i) => (
                <li key={i} className="flex gap-2 text-[0.9375rem] leading-relaxed text-stone-800">
                  <span className="font-bold text-stone-900" aria-hidden>
                    •
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </OutputCard>
        </div>
      </div>

      <OutputCard title="Easy-to-miss details" className="mt-2 border-2 border-[#c9a227]/35 bg-[#fffdf8]">
        {result.copyLeads?.thingsForget ? (
          <p className="text-[0.9375rem] italic leading-relaxed text-stone-700">{result.copyLeads.thingsForget}</p>
        ) : null}
        <ul className={`space-y-3 ${result.copyLeads?.thingsForget ? "mt-4" : ""}`}>
          {result.thingsCouplesForget.map((c, i) => (
            <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed text-stone-800">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#c9a227]/50 bg-white text-xs font-bold text-[#6b5420]"
                aria-hidden
              >
                ✓
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </OutputCard>

      <OutputCard title="Thoughtful enhancements" className="mt-6">
        {result.copyLeads?.enhancements ? (
          <p className="text-[0.9375rem] italic leading-relaxed text-stone-700">{result.copyLeads.enhancements}</p>
        ) : (
          <p className="text-sm text-stone-600">Optional upgrades, none required for a beautiful day.</p>
        )}
        <ul className="mt-5 space-y-5">
          {result.recommendedEnhancements.map((e) => (
            <li key={e.id} className="border-l-2 border-[#c9a227]/40 pl-4">
              <p className="font-bold text-stone-900 [font-family:var(--font-display)]">
                {e.title}
                {e.badge ? (
                  <span className="ml-2 inline-block rounded-full border border-[#c9a227]/45 bg-[#fffbf0] px-2.5 py-0.5 text-xs font-semibold text-[#5c4a1c]">
                    {e.badge}
                  </span>
                ) : null}
              </p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-stone-700">{e.why}</p>
            </li>
          ))}
        </ul>
      </OutputCard>

      <OutputCard title="Guest experience ideas" className="mt-6">
        {result.copyLeads?.guestIdeas ? (
          <p className="text-[0.9375rem] italic leading-relaxed text-stone-700">{result.copyLeads.guestIdeas}</p>
        ) : null}
        <ul className={`space-y-3 ${result.copyLeads?.guestIdeas ? "mt-4" : ""}`}>
          {result.optionalGuestIdeas.map((g) => (
            <li key={g.id} className="text-[0.9375rem] text-stone-800">
              <span className="font-bold text-stone-900">{g.title}</span>
              {g.note ? <span className="text-stone-700">, {g.note}</span> : null}
            </li>
          ))}
        </ul>
      </OutputCard>

      <OutputCard title="Next steps" className="mt-6 border-2 border-stone-900/15 bg-gradient-to-br from-[#fffdf8] to-white">
        <ul className="space-y-3">
          {result.nextSteps.map((n, i) => (
            <li key={i} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-stone-800">
              <span className="font-bold text-[#9f7322]" aria-hidden>
                →
              </span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </OutputCard>

      <footer className="mt-14 overflow-hidden rounded-2xl border-2 border-stone-900/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] print:hidden">
        <div className="bg-stone-900 px-5 py-5 sm:px-8 sm:py-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#e4c96e] sm:text-sm">Save &amp; share</p>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm leading-relaxed text-white/90">
            Keep a copy for yourself and anyone helping you plan, link, email, or print.
          </p>
        </div>
        <div className="bg-gradient-to-b from-white to-[#fffdf8] px-4 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              className="touch-manipulation min-h-[48px] rounded-xl border-2 border-stone-900/90 bg-white px-4 py-3 text-center text-sm font-bold text-stone-900 shadow-sm transition hover:border-[#9f7322] hover:bg-[#fffbf0]"
              onClick={() => {
                void handleCopy();
              }}
            >
              {copyOk ? "Link copied" : "Copy share link"}
            </button>
            <a
              href={mailto}
              className="touch-manipulation flex min-h-[48px] items-center justify-center rounded-xl border-2 border-stone-900/90 bg-white px-4 py-3 text-center text-sm font-bold text-stone-900 shadow-sm transition hover:border-[#9f7322] hover:bg-[#fffbf0]"
            >
              Email checklist
            </a>
            <button
              type="button"
              className="touch-manipulation min-h-[48px] rounded-xl border-2 border-stone-900/90 bg-white px-4 py-3 text-sm font-bold text-stone-900 shadow-sm transition hover:border-[#9f7322] hover:bg-[#fffbf0]"
              onClick={() => window.print()}
            >
              Print
            </button>
          </div>
          <div className="mt-5 grid gap-3 border-t border-stone-200/90 pt-5 sm:grid-cols-2">
            <Link
              href="/planning#quick-event-planner"
              className="touch-manipulation flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-b from-[#faf6eb] via-[#e4c96e] to-[#9f7322] px-4 py-3 text-center text-sm font-bold tracking-wide text-[#1a140c] shadow-md ring-1 ring-inset ring-white/35 transition hover:brightness-[1.03] active:scale-[0.99] [font-family:var(--font-display)]"
            >
              Continue to planner
            </Link>
            <Link
              href="/contact#quote"
              className="touch-manipulation flex min-h-[48px] items-center justify-center rounded-xl border-2 border-[#6b5420] bg-[#fffbf0] px-4 py-3 text-center text-sm font-bold text-stone-900 transition hover:bg-[#fff4d6]"
              prefetch={true}
            >
              Request a quote
            </Link>
          </div>
          <p className="mt-6 text-center text-sm leading-relaxed text-stone-600">
            Progress saves on this device. Use the link to open this checklist on a phone or another computer.
          </p>
          <div className="mt-6 flex justify-center border-t border-stone-200/80 pt-5">
            <button
              type="button"
              onClick={onBackToStart}
              className="touch-manipulation text-sm font-bold text-stone-700 underline decoration-[#c9a227]/60 decoration-2 underline-offset-[5px] hover:text-stone-900"
            >
              Start over or change mode
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function OutputCard({
  title, children, className = "", tone, }: {
  title: string;
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "light";
}) {
  const toneClass =
    tone === "gold"
      ? "border-[#c9a227]/40 bg-[#fffdf8]"
      : tone === "light"
        ? "border-stone-200/90 bg-white"
        : "";
  return (
    <div
      className={`rounded-2xl border-2 border-stone-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.05)] print:break-inside-avoid sm:p-6 ${toneClass} ${className}`}
    >
      <h4 className="text-lg font-bold tracking-tight text-stone-900 [font-family:var(--font-display)] sm:text-xl">{title}</h4>
      <div className="mt-4 border-t border-stone-200/80 pt-4">{children}</div>
    </div>
  );
}
