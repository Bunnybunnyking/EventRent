import type { StyleFallbackKey } from "@/lib/quizast/zodiac";

/** Matches flip cards in party-reading (excluding setup row). */
export type GeneratedCardId =
  | "personality"
  | "guestExperience"
  | "theme"
  | "redFlag"
  | "loveLanguage"
  | "meaningfulTouch";

/** Optional planner inputs — quiz may omit; defaults keep combos deterministic */
export type PartyReadingGeneratorInput = {
  sun: number;
  moon: number;
  rising: number | null;
  style: StyleFallbackKey | null;
  occasion?: string;
  guestCountBand?: "small" | "medium" | "large" | "unknown";
  settingType?: "backyard" | "venue" | "mixed" | "unknown";
};

export type GeneratedFlipCard = {
  id: GeneratedCardId;
  categoryLabel: string;
  resultName: string;
  description: string;
  bullets: string[];
};

export type GeneratedSetupCard = {
  categoryLabel: string;
  resultName: string;
  description: string;
  bullets: string[];
};

export type PartyReadingGenerated = {
  comboKey: string;
  comboIndex: number;
  cards: GeneratedFlipCard[];
  setupCard: GeneratedSetupCard;
};
