import { generatePartyReadingCore } from "@/lib/quizast/party-result/generator";
import { stripAiDashes } from "@/lib/quizast/humanizeCopy";
import type { StyleFallbackKey } from "./zodiac";
import { signLabel } from "./zodiac";

export type RecommendedSetupDetail = {
  tent: string;
  tentAlternate: string;
  tables: string;
  chairs: string;
  addOns: string;
  survivalTip: string;
  /** Tarot-style headline on setup card back */
  resultName: string;
  flavorLine: string;
  bullets: string[];
};

export type PartyReadingCardKind =
  | "personality"
  | "theme"
  | "redFlag"
  | "loveLanguage"
  | "guestExperience"
  | "meaningfulTouch"
  | "setup";

export type PartyReadingFlipPayload = {
  id: PartyReadingCardKind;
  /** Category label — shown on card front only */
  label: string;
  /** Specific reading title — shown on card back (not the category) */
  resultName: string;
  /** Paragraph copy — card back */
  body: string;
  bullets?: string[];
};

function seed(sun: number, moon: number, rising: number | null, style: StyleFallbackKey | null): number {
  const r = rising ?? 7;
  const sk = style ? (style.length % 11) + 3 : 0;
  return Math.abs((sun * 17 + moon * 31 + r * 13 + sk * 7) % 997);
}

const TENTS = [
  "40×60 frame tent — hero footprint for mingling, buffet, and dance spillover without crowding cake.",
  "40×80 frame tent — extra depth when guest count skews high or you want lounge clusters.",
  "30×50 frame tent — intimate-premium layout for tighter yards with upgraded seating.",
  "30×60 frame tent — balanced lane for ceremony flip + seated dinner in one skin.",
  "20×40 frame tent — satellite lounge or rain-backup expansion paired with a main sail.",
  "20×60 frame tent — long runway layout — great for yard depth, tricky on narrow lots.",
] as const;

const TENTS_ALT = [
  "Backup: pair a 20×30 satellite for bar + escape-valve mingling if weather pins guests under cover.",
  "Alternate: 30×40 core + open-air cocktail wedge when breeze allows and bugs behave.",
  "Alternate: sail shade + 20×20 tech tent for DJ/band gear to keep audio dry.",
  "Alternate: twin 20×40s with a lit walkway if stake lines split your lawn.",
  "Alternate: high-peak center + sidewall kit staged — deploy only if radar disagrees.",
  "Alternate: clearspan panel upgrade on one wall for golden-hour photos without leaving shelter.",
] as const;

const TABLES_CHAIRS = [
  { t: "8–10 sixty-inch rounds + 2 banquet tables (gift / dessert)", c: "72–88 padded folding chairs + 12 ceremony overflow" },
  { t: "6–8 rounds + 3 banquet / harvest tables for family style", c: "64–80 chairs + 16 chiavari upgrades for head table" },
  { t: "10 rounds + 1 sweetheart + 2 buffets", c: "90–110 chairs staged in rental waves to match RSVP tiers" },
  { t: "8 rounds + cocktail perimeter highboys ×10", c: "70–85 chairs + 12 barstools" },
  { t: "12 rounds for peak RSVP + head table platform", c: "110–130 chairs with early strike plan for dance floor" },
  { t: "6 rounds + classroom rows for ceremony-in-the-round", c: "60–72 chairs dual-purpose for ceremony + dinner" },
] as const;

const ADDONS = [
  "Sidewalls on half the perimeter, weighted ballasts, perimeter lighting, and a compact generator whisper kit.",
  "Chandelier cluster over dance floor, cafe lighting perimeter, dimmers on uplights.",
  "Fan kit + mist-safe zone near kitchen; portable coat rack & umbrella stand at entry.",
  "Stage deck 8×12, skirting, and cable ramps as needed for band footprint.",
  "Heaters staged — two radiant units pointed at seating, not tent skin.",
  "Dance floor 16×16 + subfloor shim pack for gentle yard slope.",
] as const;

const TIPS = [
  "Assign one calm logistics speaker — weather, parking, bathroom — so you’re never hunting answers mid-hug.",
  "Pack a host bin: tape, Sharpie, stain pen, phone cords, safety pins, lint roller.",
  "Do a 30-minute guest-arrival rehearsal — where signs aim, where trash lives, where quiet sits.",
  "Water stations beat cocktail queues — place two before speeches.",
  "Print weather grace lines — if rain wins, you already sound composed.",
] as const;

export function buildRecommendedSetup(
  sun: number,
  moon: number,
  rising: number | null,
  style: StyleFallbackKey | null,
): Omit<RecommendedSetupDetail, "resultName" | "flavorLine" | "bullets"> {
  const s = seed(sun, moon, rising, style);
  const ti = s % TABLES_CHAIRS.length;
  return {
    tent: TENTS[s % TENTS.length],
    tentAlternate: TENTS_ALT[(s + 3) % TENTS_ALT.length],
    tables: TABLES_CHAIRS[ti].t,
    chairs: TABLES_CHAIRS[ti].c,
    addOns: ADDONS[(s + moon) % ADDONS.length],
    survivalTip: TIPS[(s + sun) % TIPS.length],
  };
}

export type BuildPartyReadingInput = {
  sun: number;
  moon: number;
  rising: number | null;
  style: StyleFallbackKey | null;
};

/** Seven-card reading: fronts show category; backs show resultName + body (+ bullets). Combo-stable across 12³ Big Three. */
export function buildPartyReading(input: BuildPartyReadingInput): {
  cards: PartyReadingFlipPayload[];
  setup: RecommendedSetupDetail;
  shareSummary: string;
} {
  const { sun, moon, rising, style } = input;
  const gen = generatePartyReadingCore({ sun, moon, rising, style });
  const hardware = buildRecommendedSetup(sun, moon, rising, style);

  const setup: RecommendedSetupDetail = {
    tent: stripAiDashes(hardware.tent),
    tentAlternate: stripAiDashes(hardware.tentAlternate),
    tables: stripAiDashes(hardware.tables),
    chairs: stripAiDashes(hardware.chairs),
    addOns: stripAiDashes(hardware.addOns),
    survivalTip: stripAiDashes(hardware.survivalTip),
    resultName: stripAiDashes(gen.setupCard.resultName),
    flavorLine: stripAiDashes(gen.setupCard.description),
    bullets: (gen.setupCard.bullets ?? []).map(stripAiDashes).filter((b) => b.length > 0),
  };

  const flipCards: PartyReadingFlipPayload[] = gen.cards.map((c) => ({
    id: c.id,
    label: stripAiDashes(c.categoryLabel),
    resultName: stripAiDashes(c.resultName),
    body: stripAiDashes(c.description),
    bullets: (c.bullets ?? []).map(stripAiDashes).filter((b) => b.length > 0),
  }));

  const cards: PartyReadingFlipPayload[] = [
    ...flipCards,
    {
      id: "setup",
      label: "Recommended Setup",
      resultName: setup.resultName,
      body: setup.flavorLine,
      bullets: setup.bullets,
    },
  ];

  const sunLab = signLabel(sun);
  const moonLab = signLabel(moon);

  const shareSummary = [
    `QUIZAST · ${sunLab} Sun · ${moonLab} Moon`,
    rising !== null ? `${signLabel(rising)} Rising` : "Open Rising Style",
    `combo ${gen.comboKey}`,
    "",
    flipCards
      .map((c) => `• ${c.label}: ${c.resultName}. ${c.body.slice(0, 180)}${c.body.length > 180 ? "…" : ""}`)
      .join("\n"),
    "",
    `${setup.resultName}`,
    setup.flavorLine,
    "",
    "Rental snapshot:",
    setup.tent,
    `Alternate: ${setup.tentAlternate}`,
    `Tables: ${setup.tables}`,
    `Chairs: ${setup.chairs}`,
    `Add-ons: ${setup.addOns}`,
    `Tip: ${setup.survivalTip}`,
  ].join("\n");

  return { cards, setup, shareSummary };
}
