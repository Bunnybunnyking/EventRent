/** Tropical zodiac index 0 = Aries … 11 = Pisces */
export const ZODIAC = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ZodiacIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type ZodiacLabel = (typeof ZODIAC)[number];

export function longitudeToSignIndex(longitudeDeg: number): number {
  let x = longitudeDeg % 360;
  if (x < 0) x += 360;
  return Math.floor(x / 30) % 12;
}

export function signLabel(index: number): ZodiacLabel {
  return ZODIAC[((index % 12) + 12) % 12] as ZodiacLabel;
}

export const RISING_OPTIONS = [
  ...ZODIAC.map((s) => `${s} Rising`),
  "I don't know / Skip",
] as const;

export type StyleFallbackKey =
  | "bold_fun"
  | "cozy_pretty"
  | "social_bright"
  | "elegant_photo"
  | "moody_dramatic"
  | "clean_polished"
  | "weird_unique"
  | "dreamy_soft";

export const STYLE_FALLBACK_QUESTION =
  "What kind of party look feels most like you?" as const;

export const STYLE_FALLBACK_OPTIONS: {
  key: StyleFallbackKey;
  label: string;
}[] = [
  { key: "bold_fun", label: "Bold, loud, and fun" },
  { key: "cozy_pretty", label: "Cozy, pretty, and comfortable" },
  { key: "social_bright", label: "Social, bright, and playful" },
  { key: "elegant_photo", label: "Elegant, balanced, and photo-ready" },
  { key: "moody_dramatic", label: "Moody, dramatic, and intimate" },
  { key: "clean_polished", label: "Clean, organized, and polished" },
  { key: "weird_unique", label: "Weird, unique, and unexpected" },
  { key: "dreamy_soft", label: "Dreamy, soft, and emotional" },
];
