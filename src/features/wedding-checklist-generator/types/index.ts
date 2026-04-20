/**
 * Wedding checklist generator — shared types (local feature).
 */

export type WeddingMode = "quick" | "full";

export type CeremonyScope = "ceremony_only" | "reception_only" | "both";

export type GuestRange = "under_75" | "75_150" | "150_plus";

export type VenueType =
  | "backyard"
  | "private_estate"
  | "outdoor_venue"
  | "mixed_indoor_outdoor"
  | "tented_reception_only";

export type DayPart = "day" | "evening";

export type Formality = "casual" | "classic" | "formal";

export type TimeframeKind = "date_set" | "season_month" | "unsure";

export type WeatherConcern = "low" | "medium" | "high";

export interface WeddingBasics {
  timeframeKind: TimeframeKind;
  /** ISO yyyy-mm-dd when date_set */
  weddingDate?: string;
  seasonNote?: string;
  ceremonyScope: CeremonyScope;
  guestRange: GuestRange;
  venueType: VenueType;
  dayPart: DayPart;
  formality: Formality;
  plannerInvolved: boolean;
  weatherConcern: WeatherConcern;
}

/** Step 2 — high-level element confirmations */
export interface SetupSnapshot {
  ceremonySeating: boolean;
  cocktailArea: boolean;
  tentedReception: boolean;
  danceFloor: boolean;
  bar: boolean;
  cateringPrepArea: boolean;
  music: boolean;
  lighting: boolean;
  sidewalls: boolean;
  flooring: boolean;
  restrooms: boolean;
  generatorPower: boolean;
  parkingShuttle: boolean;
}

/** Step 3 — site realities */
export interface VenueSiteReadiness {
  surface: "grass" | "hard" | "mixed";
  terrain: "flat" | "uneven";
  accessLimitations: boolean;
  powerNearby: boolean;
  parkingLimitations: boolean;
  venueRestrictions: boolean;
  weatherBackupConcern: boolean;
  guestComfortConcern: boolean;
  loadInConcern: boolean;
  afterDark: boolean;
}

export type PlanningPriorityId =
  | "keep_simple"
  | "stay_organized"
  | "reduce_stress"
  | "guest_comfort"
  | "prepare_weather"
  | "polished_tent"
  | "avoid_last_minute";

export interface WeddingChecklistFormState {
  mode: WeddingMode | null;
  basics: WeddingBasics;
  setup: SetupSnapshot;
  venue: VenueSiteReadiness;
  priorities: PlanningPriorityId[];
}

export interface ChecklistLineItem {
  id: string;
  text: string;
}

export interface EnhancementItem {
  id: string;
  title: string;
  why: string;
  /** Short label for UI, e.g. "Guest comfort", "Weather backup" */
  badge?: string;
}

export interface GuestExperienceIdea {
  id: string;
  title: string;
  note?: string;
}

/** Optional one-line intros for sections (content engine; UI may show sparingly). */
export interface WeddingChecklistCopyLeads {
  thingsForget?: string;
  enhancements?: string;
  guestIdeas?: string;
}

export interface WeddingChecklistResult {
  headline: string;
  subhead: string;
  mode: WeddingMode;
  checklistSections: { id: string; title: string; items: ChecklistLineItem[] }[];
  confirmedItems: string[];
  stillToConfirm: string[];
  thingsCouplesForget: string[];
  recommendedEnhancements: EnhancementItem[];
  optionalGuestIdeas: GuestExperienceIdea[];
  nextSteps: string[];
  copyLeads?: WeddingChecklistCopyLeads;
}

export type FlowStepIndex = number;
