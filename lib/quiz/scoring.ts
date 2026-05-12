import { PERSONALITY_IDS } from "./types";
import type {
  PersonalityId,
  PersonalityScoreboard,
  RentalSignals,
  ScoringOutcome,
} from "./types";
import { QUIZ_QUESTIONS } from "./questions";

function emptyScores(): PersonalityScoreboard {
  return Object.fromEntries(PERSONALITY_IDS.map((id) => [id, 0])) as PersonalityScoreboard;
}

/** Show a blend when #2 is close to #1 (ratio and/or small absolute gap). */
const SECONDARY_RATIO = 0.68;
const SECONDARY_GAP_MAX = 6;

export function scoreAnswers(
  selections: Record<string, string | undefined>,
): ScoringOutcome {
  const scores = emptyScores();

  for (const q of QUIZ_QUESTIONS) {
    const answerId = selections[q.id];
    if (!answerId) continue;
    const opt = q.answers.find((a) => a.id === answerId);
    if (!opt) continue;
    for (const [pid, w] of Object.entries(opt.personalityWeights)) {
      const key = pid as PersonalityId;
      scores[key] += w ?? 0;
    }
  }

  const ordered = PERSONALITY_IDS.map((id) => ({ id, score: scores[id] })).sort(
    (a, b) => b.score - a.score,
  );

  const top = ordered[0];
  const second = ordered[1];

  let secondary: PersonalityId | null = null;
  let blendPrimaryPct = 100;
  let blendSecondaryPct = 0;

  const closeEnough =
    second &&
    top &&
    second.score > 0 &&
    (second.score >= top.score * SECONDARY_RATIO ||
      top.score - second.score <= SECONDARY_GAP_MAX);

  if (closeEnough && second) {
    secondary = second.id;
    const sum = top.score + second.score;
    blendPrimaryPct = Math.round((top.score / sum) * 100);
    blendSecondaryPct = 100 - blendPrimaryPct;
  }

  return {
    scores,
    ordered,
    primary: top.id,
    secondary,
    blendPrimaryPct,
    blendSecondaryPct,
  };
}

export function aggregateRentalSignals(
  selections: Record<string, string | undefined>,
): RentalSignals {
  const base: RentalSignals = {
    guestScale: 0,
    weatherPrep: 0,
    foodService: 0,
    stylePremium: 0,
    backyardSocial: 0,
    urgencySimple: 0,
    needsConsult: 0,
  };

  for (const q of QUIZ_QUESTIONS) {
    const answerId = selections[q.id];
    if (!answerId) continue;
    const opt = q.answers.find((a) => a.id === answerId);
    if (!opt) continue;
    for (const [k, v] of Object.entries(opt.rentalSignals)) {
      const key = k as keyof RentalSignals;
      base[key] += v ?? 0;
    }
  }

  return base;
}
