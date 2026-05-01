import type {
  PlanningPriorityId, WeddingBasics, WeddingChecklistFormState, WeddingMode, } from "@/features/wedding-checklist/types";

/**
 * Derived flags for checklist / copy / rules. Single source of truth for conditionals.
 */
export interface ContentContext {
  mode: WeddingMode;
  basics: WeddingBasics;
  evening: boolean;
  day: boolean;
  ceremonyOnly: boolean;
  receptionOnly: boolean;
  bothCeremonyReception: boolean;
  guestRange: WeddingBasics["guestRange"];
  guestsUnder75: boolean;
  guestsMid: boolean;
  guestsLarge: boolean;
  venueType: WeddingBasics["venueType"];
  backyard: boolean;
  privateEstate: boolean;
  outdoorVenue: boolean;
  mixedIndoorOutdoor: boolean;
  tentedReceptionOnly: boolean;
  formality: WeddingBasics["formality"];
  casual: boolean;
  classic: boolean;
  formal: boolean;
  plannerInvolved: boolean;
  weatherConcern: WeddingBasics["weatherConcern"];
  wxLow: boolean;
  wxMedium: boolean;
  wxHigh: boolean;
  setup: WeddingChecklistFormState["setup"];
  venue: WeddingChecklistFormState["venue"];
  priorities: PlanningPriorityId[];
  tentHeavy: boolean;
  /** Count of setup toggles still off */
  openSetupKeys: number;
  /** Rough 0 to 100: higher = more gaps / site risk */
  readinessRisk: number;
  /** Stable string for tone variant selection */
  variantSeed: string;
}

function countOpenSetup(setup: WeddingChecklistFormState["setup"]): number {
  return (Object.keys(setup) as (keyof typeof setup)[]).filter((k) => !setup[k]).length;
}

function computeRisk(
  setup: WeddingChecklistFormState["setup"], venue: WeddingChecklistFormState["venue"], wx: WeddingBasics["weatherConcern"], ): number {
  let r = 0;
  (Object.keys(setup) as (keyof typeof setup)[]).forEach((k) => {
    if (!setup[k]) r += 4;
  });
  if (!venue.powerNearby) r += 12;
  if (venue.accessLimitations) r += 8;
  if (venue.parkingLimitations) r += 6;
  if (venue.loadInConcern) r += 8;
  if (venue.weatherBackupConcern) r += 6;
  if (venue.guestComfortConcern) r += 5;
  if (venue.venueRestrictions) r += 5;
  if (wx === "high") r += 10;
  else if (wx === "medium") r += 4;
  if (venue.terrain === "uneven") r += 5;
  return Math.min(100, r);
}

export function buildContentContext(inp: WeddingChecklistFormState, mode: WeddingMode): ContentContext {
  const { basics, setup, venue, priorities } = inp;
  const cs = basics.ceremonyScope;
  const evening = basics.dayPart === "evening";
  const gr = basics.guestRange;

  const variantSeed = `${mode}|${basics.venueType}|${cs}|${gr}|${basics.dayPart}|${basics.formality}|${basics.weatherConcern}`;

  return {
    mode, basics, evening, day: !evening, ceremonyOnly: cs === "ceremony_only", receptionOnly: cs === "reception_only", bothCeremonyReception: cs === "both", guestRange: gr, guestsUnder75: gr === "under_75", guestsMid: gr === "75_150", guestsLarge: gr === "150_plus", venueType: basics.venueType, backyard: basics.venueType === "backyard", privateEstate: basics.venueType === "private_estate", outdoorVenue: basics.venueType === "outdoor_venue", mixedIndoorOutdoor: basics.venueType === "mixed_indoor_outdoor", tentedReceptionOnly: basics.venueType === "tented_reception_only", formality: basics.formality, casual: basics.formality === "casual", classic: basics.formality === "classic", formal: basics.formality === "formal", plannerInvolved: basics.plannerInvolved, weatherConcern: basics.weatherConcern, wxLow: basics.weatherConcern === "low", wxMedium: basics.weatherConcern === "medium", wxHigh: basics.weatherConcern === "high", setup, venue, priorities, tentHeavy:
      setup.tentedReception ||
      basics.venueType === "tented_reception_only" ||
      basics.venueType === "backyard" ||
      basics.venueType === "private_estate", openSetupKeys: countOpenSetup(setup), readinessRisk: computeRisk(setup, venue, basics.weatherConcern), variantSeed, };
}
