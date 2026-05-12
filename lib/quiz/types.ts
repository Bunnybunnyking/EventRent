/** Personality archetypes returned by the quiz */
export const PERSONALITY_IDS = [
  "chaos_coordinator",
  "weather_worrier",
  "backyard_bro",
  "pinterest_drill_sergeant",
  "last_minute_magician",
  "food_first_host",
  "guest_list_criminal",
  "casual_liar",
  "chair_shortage_menace",
  "family_group_chat_survivor",
] as const;

export type PersonalityId = (typeof PERSONALITY_IDS)[number];

/** Rental logic buckets aggregated from answers (separate from personality) */
export type RentalSignals = {
  /** Larger tent / more seating pressure */
  guestScale: number;
  /** Sidewalls, rain plan, covered serving */
  weatherPrep: number;
  /** Buffet layout, serving zones, trash */
  foodService: number;
  /** Lighting, linens, layout polish */
  stylePremium: number;
  /** Games, cooler zone, social vibe */
  backyardSocial: number;
  /** Prefer simple package / fast planning */
  urgencySimple: number;
  /** Push toward human consult */
  needsConsult: number;
};

export type AnswerOption = {
  id: string;
  label: string;
  personalityWeights: Partial<Record<PersonalityId, number>>;
  rentalSignals: Partial<RentalSignals>;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  answers: AnswerOption[];
};

export type QuizPhase = "intro" | "question" | "reveal" | "lead" | "result";

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  eventTown: string;
  eventDate: string;
  guestCount: string;
  notes: string;
  yardPhoto: File | null;
};

export type PersonalityScoreboard = Record<PersonalityId, number>;

export type ScoringOutcome = {
  scores: PersonalityScoreboard;
  ordered: { id: PersonalityId; score: number }[];
  primary: PersonalityId;
  secondary: PersonalityId | null;
  /** e.g. 68 / 32 when secondary exists */
  blendPrimaryPct: number;
  blendSecondaryPct: number;
};

export type RentalRecommendation = {
  tentSizePrimary: string;
  tentSizeAlternate: string;
  tableCount: string;
  chairCount: string;
  buffetTables: string;
  addOns: string[];
  hostSurvivalTip: string;
  softGuestCta: string;
};
