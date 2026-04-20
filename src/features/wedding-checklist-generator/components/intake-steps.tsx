"use client";

import { PLANNING_PRIORITY_OPTIONS } from "@/features/wedding-checklist/data/priority-options";
import { FieldLabel, SectionDivider, Segmented, ToggleRow } from "@/features/wedding-checklist/components/form-primitives";
import type { PlanningPriorityId, WeddingChecklistFormState, WeddingMode } from "@/features/wedding-checklist/types";

type Patch = {
  basics?: Partial<WeddingChecklistFormState["basics"]>;
  setup?: Partial<WeddingChecklistFormState["setup"]>;
  venue?: Partial<WeddingChecklistFormState["venue"]>;
  priorities?: PlanningPriorityId[];
};

export function StepBasics({
  form,
  updateForm,
  mode,
}: {
  form: WeddingChecklistFormState;
  updateForm: (p: Patch) => void;
  mode: WeddingMode;
}) {
  const b = form.basics;
  return (
    <div className="space-y-8">
      <div>
        <FieldLabel hint="Rough timing is fine—this helps us phrase milestones.">When is the wedding?</FieldLabel>
        <Segmented
          options={[
            { id: "date_set", label: "I have a date" },
            { id: "season_month", label: "Season / month" },
            { id: "unsure", label: "Still deciding" },
          ]}
          value={b.timeframeKind}
          onChange={(timeframeKind) => updateForm({ basics: { timeframeKind } })}
        />
        {b.timeframeKind === "date_set" ? (
          <div className="mt-4">
            <label className="sr-only" htmlFor="wedding-date">
              Wedding date
            </label>
            <input
              id="wedding-date"
              type="date"
              value={b.weddingDate ?? ""}
              onChange={(e) => updateForm({ basics: { weddingDate: e.target.value } })}
              className="mt-1 w-full max-w-xs rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 shadow-sm focus:border-[#c9a227]/60 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/25"
            />
          </div>
        ) : null}
        {b.timeframeKind === "season_month" ? (
          <div className="mt-4">
            <label className="sr-only" htmlFor="season-note">
              Season or month
            </label>
            <input
              id="season-note"
              type="text"
              placeholder="e.g. early fall, June 2027"
              value={b.seasonNote ?? ""}
              onChange={(e) => updateForm({ basics: { seasonNote: e.target.value } })}
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-[#c9a227]/60 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/25"
            />
          </div>
        ) : null}
      </div>

      <div>
        <FieldLabel>What are you planning?</FieldLabel>
        <Segmented
          options={[
            { id: "both", label: "Ceremony & reception" },
            { id: "ceremony_only", label: "Ceremony only" },
            { id: "reception_only", label: "Reception only" },
          ]}
          value={b.ceremonyScope}
          onChange={(ceremonyScope) => updateForm({ basics: { ceremonyScope } })}
        />
      </div>

      <div>
        <FieldLabel>Guest count (approximate)</FieldLabel>
        <Segmented
          options={[
            { id: "under_75", label: "Under ~75" },
            { id: "75_150", label: "~75–150" },
            { id: "150_plus", label: "150+" },
          ]}
          value={b.guestRange}
          onChange={(guestRange) => updateForm({ basics: { guestRange } })}
        />
      </div>

      <div>
        <FieldLabel>Venue type</FieldLabel>
        <Segmented
          columns="grid-cols-1 sm:grid-cols-2"
          options={[
            { id: "backyard", label: "Backyard" },
            { id: "private_estate", label: "Private estate" },
            { id: "outdoor_venue", label: "Outdoor venue" },
            { id: "mixed_indoor_outdoor", label: "Mixed indoor / outdoor" },
            { id: "tented_reception_only", label: "Primarily tented reception" },
          ]}
          value={b.venueType}
          onChange={(venueType) => updateForm({ basics: { venueType } })}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel>Day or evening focus</FieldLabel>
          <Segmented
            options={[
              { id: "day", label: "Daytime" },
              { id: "evening", label: "Evening" },
            ]}
            value={b.dayPart}
            onChange={(dayPart) => updateForm({ basics: { dayPart } })}
          />
        </div>
        <div>
          <FieldLabel>Formality</FieldLabel>
          <Segmented
            options={[
              { id: "casual", label: "Casual" },
              { id: "classic", label: "Classic" },
              { id: "formal", label: "Formal" },
            ]}
            value={b.formality}
            onChange={(formality) => updateForm({ basics: { formality } })}
          />
        </div>
      </div>

      <ToggleRow
        label="Planner or coordinator involved"
        helper={
          mode === "quick"
            ? "Optional—copy stays practical either way."
            : "We’ll add coordinator-friendly checkpoints in your detailed checklist."
        }
        checked={b.plannerInvolved}
        onChange={(plannerInvolved) => updateForm({ basics: { plannerInvolved } })}
      />

      <div>
        <FieldLabel hint="No judgment—just helps us surface the right weather and tent prompts.">Weather on your mind?</FieldLabel>
        <Segmented
          options={[
            { id: "low", label: "Low concern" },
            { id: "medium", label: "Moderate" },
            { id: "high", label: "High concern" },
          ]}
          value={b.weatherConcern}
          onChange={(weatherConcern) => updateForm({ basics: { weatherConcern } })}
        />
      </div>
    </div>
  );
}

const setupFields: { key: keyof WeddingChecklistFormState["setup"]; label: string; helper?: string }[] = [
  { key: "ceremonySeating", label: "Ceremony seating" },
  { key: "cocktailArea", label: "Cocktail hour area" },
  { key: "tentedReception", label: "Tented reception" },
  { key: "danceFloor", label: "Dance floor" },
  { key: "bar", label: "Bar" },
  { key: "cateringPrepArea", label: "Catering / prep area" },
  { key: "music", label: "Music / DJ / band" },
  { key: "lighting", label: "Lighting (beyond daylight)" },
  { key: "sidewalls", label: "Sidewalls / weather panels" },
  { key: "flooring", label: "Flooring under tent or key paths" },
  { key: "restrooms", label: "Restrooms for guest count" },
  { key: "generatorPower", label: "Generator / power plan" },
  { key: "parkingShuttle", label: "Parking / shuttle" },
];

export function StepSetup({
  form,
  updateForm,
}: {
  form: WeddingChecklistFormState;
  updateForm: (p: Patch) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-stone-600">
        Toggle what you’re planning to include. This isn’t a rental list—it’s a snapshot so we don’t miss outdoor and tent logistics.
      </p>
      <div className="space-y-2 pt-2">
        {setupFields.map((f) => (
          <ToggleRow
            key={f.key}
            label={f.label}
            helper={f.helper}
            checked={form.setup[f.key]}
            onChange={(v) => updateForm({ setup: { [f.key]: v } })}
          />
        ))}
      </div>
    </div>
  );
}

export function StepVenue({
  form,
  updateForm,
}: {
  form: WeddingChecklistFormState;
  updateForm: (p: Patch) => void;
}) {
  const v = form.venue;
  return (
    <div className="space-y-8">
      <div>
        <FieldLabel>Ground surface</FieldLabel>
        <Segmented
          options={[
            { id: "grass", label: "Grass / lawn" },
            { id: "hard", label: "Hard surface" },
            { id: "mixed", label: "Mixed" },
          ]}
          value={v.surface}
          onChange={(surface) => updateForm({ venue: { surface } })}
        />
      </div>
      <div>
        <FieldLabel>Terrain</FieldLabel>
        <Segmented
          options={[
            { id: "flat", label: "Mostly flat" },
            { id: "uneven", label: "Uneven or sloped" },
          ]}
          value={v.terrain}
          onChange={(terrain) => updateForm({ venue: { terrain } })}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel hint="We’ll turn concerns into clear checklist lines—no drama, just readiness.">Site & logistics</FieldLabel>
        <ToggleRow label="Access or load-in limitations" checked={v.accessLimitations} onChange={(x) => updateForm({ venue: { accessLimitations: x } })} />
        <ToggleRow label="Power is nearby / straightforward" checked={v.powerNearby} onChange={(x) => updateForm({ venue: { powerNearby: x } })} />
        <ToggleRow label="Parking limitations or neighbor constraints" checked={v.parkingLimitations} onChange={(x) => updateForm({ venue: { parkingLimitations: x } })} />
        <ToggleRow label="Venue timing or noise restrictions" checked={v.venueRestrictions} onChange={(x) => updateForm({ venue: { venueRestrictions: x } })} />
        <ToggleRow label="Weather backup is a real concern" checked={v.weatherBackupConcern} onChange={(x) => updateForm({ venue: { weatherBackupConcern: x } })} />
        <ToggleRow label="Guest comfort after dark or across distances" checked={v.guestComfortConcern} onChange={(x) => updateForm({ venue: { guestComfortConcern: x } })} />
        <ToggleRow label="Load-in / vendor access worries" checked={v.loadInConcern} onChange={(x) => updateForm({ venue: { loadInConcern: x } })} />
        <ToggleRow label="Event runs meaningfully after dark" checked={v.afterDark} onChange={(x) => updateForm({ venue: { afterDark: x } })} />
      </div>
    </div>
  );
}

export function StepPriorities({
  form,
  updateForm,
}: {
  form: WeddingChecklistFormState;
  updateForm: (p: Patch) => void;
}) {
  const selected = new Set(form.priorities);
  const toggle = (id: PlanningPriorityId) => {
    const next = selected.has(id) ? form.priorities.filter((x) => x !== id) : [...form.priorities, id];
    if (next.length === 0) return;
    updateForm({ priorities: next });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-stone-600">Choose a few priorities—we’ll echo them in enhancements and next steps.</p>
      <div className="flex flex-wrap gap-2">
        {PLANNING_PRIORITY_OPTIONS.map((o) => {
          const on = selected.has(o.id);
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => toggle(o.id)}
              className={`touch-manipulation rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                on
                  ? "border-emerald-900/80 bg-emerald-50 text-emerald-950"
                  : "border-stone-200 bg-white text-stone-700 hover:border-[#c9a227]/45"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-stone-500">Most people pick 3–5. Keep at least one selected—tap another to switch.</p>
    </div>
  );
}

export function QuickOutdoorCombined({
  form,
  updateForm,
}: {
  form: WeddingChecklistFormState;
  updateForm: (p: Patch) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="mb-4 text-sm leading-relaxed text-stone-600">
        Tent, weather, power, and how guests move—streamlined so you’re not buried in generic wedding noise.
      </p>
      <SectionDivider title="Planned elements" />
      <StepSetup form={form} updateForm={updateForm} />
      <SectionDivider title="Site readiness" />
      <StepVenue form={form} updateForm={updateForm} />
    </div>
  );
}

export function IntakeStepRouter({
  mode,
  stepIndex,
  form,
  updateForm,
}: {
  mode: "full" | "quick";
  stepIndex: number;
  form: WeddingChecklistFormState;
  updateForm: (p: Patch) => void;
}) {
  if (mode === "full") {
    if (stepIndex === 0) return <StepBasics form={form} updateForm={updateForm} mode={mode} />;
    if (stepIndex === 1) return <StepSetup form={form} updateForm={updateForm} />;
    if (stepIndex === 2) return <StepVenue form={form} updateForm={updateForm} />;
    if (stepIndex === 3) return <StepPriorities form={form} updateForm={updateForm} />;
  }
  if (mode === "quick") {
    if (stepIndex === 0) return <StepBasics form={form} updateForm={updateForm} mode={mode} />;
    if (stepIndex === 1) return <QuickOutdoorCombined form={form} updateForm={updateForm} />;
    if (stepIndex === 2) return <StepPriorities form={form} updateForm={updateForm} />;
  }
  return null;
}
