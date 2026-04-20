import { outputStepIndex } from "@/features/wedding-checklist/lib/flow-meta";
import type {
  WeddingBasics,
  WeddingChecklistFormState,
  WeddingMode,
  PlanningPriorityId,
} from "@/features/wedding-checklist/types";
import type { WeddingChecklistValidationIssue } from "@/features/wedding-checklist/types/persistence";

const CEREMONY: WeddingBasics["ceremonyScope"][] = ["ceremony_only", "reception_only", "both"];
const GUEST: WeddingBasics["guestRange"][] = ["under_75", "75_150", "150_plus"];
const VENUE: WeddingBasics["venueType"][] = [
  "backyard",
  "private_estate",
  "outdoor_venue",
  "mixed_indoor_outdoor",
  "tented_reception_only",
];
const DAY: WeddingBasics["dayPart"][] = ["day", "evening"];
const FORM: WeddingBasics["formality"][] = ["casual", "classic", "formal"];
const TF: WeddingBasics["timeframeKind"][] = ["date_set", "season_month", "unsure"];
const WX: WeddingBasics["weatherConcern"][] = ["low", "medium", "high"];
const PRI: PlanningPriorityId[] = [
  "keep_simple",
  "stay_organized",
  "reduce_stress",
  "guest_comfort",
  "prepare_weather",
  "polished_tent",
  "avoid_last_minute",
];

const SURFACE: WeddingChecklistFormState["venue"]["surface"][] = ["grass", "hard", "mixed"];
const TERRAIN: WeddingChecklistFormState["venue"]["terrain"][] = ["flat", "uneven"];

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function validateWeddingMode(m: unknown): m is WeddingMode | null {
  return m === null || m === "full" || m === "quick";
}

export function validateBasics(b: unknown, issues: WeddingChecklistValidationIssue[]): b is WeddingBasics {
  if (!isRecord(b)) {
    issues.push({ path: "basics", message: "expected object" });
    return false;
  }
  let ok = true;
  if (!TF.includes(b.timeframeKind as WeddingBasics["timeframeKind"])) {
    issues.push({ path: "basics.timeframeKind", message: "invalid" });
    ok = false;
  }
  if (!CEREMONY.includes(b.ceremonyScope as WeddingBasics["ceremonyScope"])) {
    issues.push({ path: "basics.ceremonyScope", message: "invalid" });
    ok = false;
  }
  if (!GUEST.includes(b.guestRange as WeddingBasics["guestRange"])) {
    issues.push({ path: "basics.guestRange", message: "invalid" });
    ok = false;
  }
  if (!VENUE.includes(b.venueType as WeddingBasics["venueType"])) {
    issues.push({ path: "basics.venueType", message: "invalid" });
    ok = false;
  }
  if (!DAY.includes(b.dayPart as WeddingBasics["dayPart"])) {
    issues.push({ path: "basics.dayPart", message: "invalid" });
    ok = false;
  }
  if (!FORM.includes(b.formality as WeddingBasics["formality"])) {
    issues.push({ path: "basics.formality", message: "invalid" });
    ok = false;
  }
  if (typeof b.plannerInvolved !== "boolean") {
    issues.push({ path: "basics.plannerInvolved", message: "invalid" });
    ok = false;
  }
  if (!WX.includes(b.weatherConcern as WeddingBasics["weatherConcern"])) {
    issues.push({ path: "basics.weatherConcern", message: "invalid" });
    ok = false;
  }
  return ok;
}

export function validateSetup(s: unknown, issues: WeddingChecklistValidationIssue[]): s is WeddingChecklistFormState["setup"] {
  if (!isRecord(s)) {
    issues.push({ path: "setup", message: "expected object" });
    return false;
  }
  const keys: (keyof WeddingChecklistFormState["setup"])[] = [
    "ceremonySeating",
    "cocktailArea",
    "tentedReception",
    "danceFloor",
    "bar",
    "cateringPrepArea",
    "music",
    "lighting",
    "sidewalls",
    "flooring",
    "restrooms",
    "generatorPower",
    "parkingShuttle",
  ];
  let ok = true;
  for (const k of keys) {
    if (typeof s[k] !== "boolean") {
      issues.push({ path: `setup.${String(k)}`, message: "expected boolean" });
      ok = false;
    }
  }
  return ok;
}

export function validateVenue(v: unknown, issues: WeddingChecklistValidationIssue[]): v is WeddingChecklistFormState["venue"] {
  if (!isRecord(v)) {
    issues.push({ path: "venue", message: "expected object" });
    return false;
  }
  let ok = true;
  if (!SURFACE.includes(v.surface as WeddingChecklistFormState["venue"]["surface"])) {
    issues.push({ path: "venue.surface", message: "invalid" });
    ok = false;
  }
  if (!TERRAIN.includes(v.terrain as WeddingChecklistFormState["venue"]["terrain"])) {
    issues.push({ path: "venue.terrain", message: "invalid" });
    ok = false;
  }
  const bools = [
    "accessLimitations",
    "powerNearby",
    "parkingLimitations",
    "venueRestrictions",
    "weatherBackupConcern",
    "guestComfortConcern",
    "loadInConcern",
    "afterDark",
  ] as const;
  for (const k of bools) {
    if (typeof v[k] !== "boolean") {
      issues.push({ path: `venue.${k}`, message: "expected boolean" });
      ok = false;
    }
  }
  return ok;
}

export function validatePriorities(p: unknown, issues: WeddingChecklistValidationIssue[]): p is PlanningPriorityId[] {
  if (!Array.isArray(p) || p.length === 0) {
    issues.push({ path: "priorities", message: "non-empty array required" });
    return false;
  }
  for (const x of p) {
    if (!PRI.includes(x as PlanningPriorityId)) {
      issues.push({ path: "priorities", message: "invalid id" });
      return false;
    }
  }
  return true;
}

export function validateFormShape(form: unknown, issues: WeddingChecklistValidationIssue[]): form is WeddingChecklistFormState {
  if (!isRecord(form)) {
    issues.push({ path: "form", message: "expected object" });
    return false;
  }
  if (!validateBasics(form.basics, issues)) return false;
  if (!validateSetup(form.setup, issues)) return false;
  if (!validateVenue(form.venue, issues)) return false;
  if (!validatePriorities(form.priorities, issues)) return false;
  if (!validateWeddingMode(form.mode)) {
    issues.push({ path: "form.mode", message: "invalid mode" });
    return false;
  }
  return true;
}

/** Clamp step to valid range for mode; -1 allowed for mode selection */
export function clampStepIndex(mode: WeddingMode | null, stepIndex: unknown): number {
  if (mode === null) return -1;
  if (typeof stepIndex !== "number" || Number.isNaN(stepIndex)) return 0;
  const max = outputStepIndex(mode);
  return Math.max(-1, Math.min(max, Math.floor(stepIndex)));
}

export function clampFurthestStep(mode: WeddingMode | null, furthest: unknown, stepIndex: number): number {
  if (mode === null) return -1;
  if (typeof furthest !== "number" || Number.isNaN(furthest)) return stepIndex;
  const max = outputStepIndex(mode);
  return Math.max(-1, Math.min(max, Math.floor(furthest)));
}

export function validateCheckedLineIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  return ids.filter((x): x is string => typeof x === "string" && x.length > 0 && x.length < 200);
}
