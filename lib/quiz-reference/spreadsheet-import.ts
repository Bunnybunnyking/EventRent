/**
 * Reference layer for mapping an exported Excel / CSV “party quiz logic” sheet into code.
 *
 * Your spreadsheet was not found in this repo (`.xlsx` search returned no files). When you add it:
 *   1. Export **CSV** from Excel into `ct-premier-rentals/data/` (or paste rows here).
 *   2. Match columns to the shapes below — then wire weights into `lib/quiz/questions.ts`
 *      (Party Personality) or `lib/quizast/party-copy.ts` / scoring helpers (QUIZAST).
 *
 * Suggested sheet layout (one row per answer option):
 *   - question_id, answer_id, label,
 *   - weight_chaos, weight_weather, … (one column per personality bucket),
 *   - rental_guest_scale, rental_weather_prep, … (optional rental signals).
 *
 * This file stays **typed documentation + helpers** only — no runtime dependency on Excel.
 */

export type SpreadsheetAnswerRow = {
  questionId: string;
  answerId: string;
  label: string;
  /** Maps to `PersonalityId` keys in `lib/quiz/types.ts` */
  personalityWeights: Record<string, number>;
  /** Maps to `RentalSignals` keys in `lib/quiz/types.ts` */
  rentalSignals?: Record<string, number>;
};

/** Placeholder: paste parsed rows here after CSV import, or replace questions.ts generation. */
export const PARTY_PERSONALITY_ROWS_FROM_SHEET: SpreadsheetAnswerRow[] = [];
