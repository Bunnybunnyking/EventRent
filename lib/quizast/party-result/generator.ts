import {
  HOSTING_RED_FLAG_NAMES,
  MEANINGFUL_TOUCH_NAMES,
  PARTY_ATMOSPHERE_NAMES,
  PARTY_LOVE_LANGUAGE_NAMES,
  PARTY_PERSONALITY_NAMES,
  PERFECT_THEME_NAMES,
  QUIZAST_PARTY_TAGS,
  QUIZAST_SETUP_TAGS,
  RECOMMENDED_SETUP_NAMES,
} from "@/lib/quizast/party-result/cardNameBanks";
import {
  getComboIndex,
  getComboKey,
  risingOrProxy,
  saltSeed,
  stablePick,
  stablePickMany,
} from "@/lib/quizast/party-result/combo";
import type {
  GeneratedFlipCard,
  GeneratedSetupCard,
  PartyReadingGenerated,
  PartyReadingGeneratorInput,
} from "@/lib/quizast/party-result/types";
import { atlasEntryForSignIndex } from "@/lib/quizast/sign-party-atlas";
import { STYLE_FALLBACK_OPTIONS, signLabel } from "@/lib/quizast/zodiac";

function bulletsFrom(seed: number): string[] {
  return stablePickMany(QUIZAST_PARTY_TAGS, seed, 2);
}

export function generatePartyReadingCore(input: PartyReadingGeneratorInput): PartyReadingGenerated {
  const { sun, moon, rising, style } = input;
  const rProxy = risingOrProxy(rising, style);
  const comboIndex = getComboIndex(sun, moon, rProxy);
  const comboKey = getComboKey(sun, moon, rProxy);

  const sunE = atlasEntryForSignIndex(sun);
  const moonE = atlasEntryForSignIndex(moon);
  const riseE = atlasEntryForSignIndex(rProxy);
  const sunLab = signLabel(sun);
  const moonLab = signLabel(moon);
  const riseLab = signLabel(rProxy);
  const styleLabel =
    style !== null ? STYLE_FALLBACK_OPTIONS.find((o) => o.key === style)?.label ?? style.replace(/_/g, " ") : "";

  const risingClause =
    rising !== null
      ? `Your ${riseLab} Rising leads with ${riseE.visualStyle.toLowerCase()}`
      : `Your Open Rising Style (${styleLabel || "visual overlay"}) reads ${riseE.visualStyle.toLowerCase()}`;

  const pn = stablePick(PARTY_PERSONALITY_NAMES, saltSeed(comboIndex, "personality-name"));
  const personalityDesc = [
    `Your ${sunLab} Sun shows up as ${sunE.corePartyIdentity.toLowerCase()} Your ${moonLab} Moon softens the night toward ${moonE.emotionalComfortStyle.toLowerCase()}`,
    `${risingClause} — so the party should feel intentional without turning into a spreadsheet costume.`,
  ].join(" ");

  const an = stablePick(PARTY_ATMOSPHERE_NAMES, saltSeed(comboIndex, "atmosphere-name"));
  const atmosphereDesc = [
    `${moonE.bestPartyAtmosphere}.`,
    rising !== null
      ? RISING_PARTY_SENTENCE(rising)
      : `Without a timed birth chart, your Open Rising Style borrows ${riseLab} “threshold” energy — ${riseE.bestPartyAtmosphere.toLowerCase()}`,
  ].join(" ");

  const tn = stablePick(PERFECT_THEME_NAMES, saltSeed(comboIndex, "theme-name"));
  const themeDesc = [
    `Theme energy: ${sunE.bestPartyAtmosphere.toLowerCase()} meets ${riseE.visualStyle.toLowerCase()} — less “Pinterest board,” more ${moonE.shortResultPhrase.toLowerCase()}.`,
    `Anchor one focal moment (food, toast, or photo) so guests feel guided, not staged.`,
  ].join(" ");

  const rn = stablePick(HOSTING_RED_FLAG_NAMES, saltSeed(comboIndex, "red-name"));
  const redDesc = roastFromTension(sunE, moonE, riseE, sunLab, moonLab);

  const ln = stablePick(PARTY_LOVE_LANGUAGE_NAMES, saltSeed(comboIndex, "love-name"));
  const loveDesc = [
    `${moonE.partyLoveLanguage}.`,
    `Your ${sunLab} Sun still wants ${sunE.partyLoveLanguage.toLowerCase()} — balance both without inventing new chaos.`,
  ].join(" ");

  const mn = stablePick(MEANINGFUL_TOUCH_NAMES, saltSeed(comboIndex, "touch-name"));
  const meaningfulDesc = [
    `${moonE.meaningfulTouch}.`,
    `Borrow ${sunE.meaningfulTouch.toLowerCase()} if you need one showstopper that isn’t expensive.`,
  ].join(" ");

  const cards: GeneratedFlipCard[] = [
    {
      id: "personality",
      categoryLabel: "Party Personality",
      resultName: pn,
      description: personalityDesc,
      bullets: bulletsFrom(saltSeed(comboIndex, "bullets-p")),
    },
    {
      id: "guestExperience",
      categoryLabel: "Party Atmosphere",
      resultName: an,
      description: atmosphereDesc,
      bullets: bulletsFrom(saltSeed(comboIndex, "bullets-a")),
    },
    {
      id: "theme",
      categoryLabel: "Perfect Party Theme",
      resultName: tn,
      description: themeDesc,
      bullets: bulletsFrom(saltSeed(comboIndex, "bullets-t")),
    },
    {
      id: "redFlag",
      categoryLabel: "Hosting Red Flag",
      resultName: rn,
      description: redDesc,
      bullets: bulletsFrom(saltSeed(comboIndex, "bullets-r")),
    },
    {
      id: "loveLanguage",
      categoryLabel: "Party Love Language",
      resultName: ln,
      description: loveDesc,
      bullets: bulletsFrom(saltSeed(comboIndex, "bullets-l")),
    },
    {
      id: "meaningfulTouch",
      categoryLabel: "Meaningful Touch",
      resultName: mn,
      description: meaningfulDesc,
      bullets: bulletsFrom(saltSeed(comboIndex, "bullets-m")),
    },
  ];

  const setupName = stablePick(RECOMMENDED_SETUP_NAMES, saltSeed(comboIndex, "setup-name"));
  const setupDesc = setupFlavorParagraph(comboIndex, sunE, moonE);

  const setupCard: GeneratedSetupCard = {
    categoryLabel: "Recommended Setup",
    resultName: setupName,
    description: setupDesc,
    bullets: [...stablePickMany(QUIZAST_SETUP_TAGS, saltSeed(comboIndex, "setup-b"), 2)],
  };

  return { comboKey, comboIndex, cards, setupCard };
}

function RISING_PARTY_SENTENCE(rising: number): string {
  const lab = signLabel(rising);
  const lines: Record<number, string> = {
    0: `Guests clock ${lab} Rising energy fast — bold greeting beats shy signage.`,
    1: `${lab} Rising wants tactile first impressions — linens and seating say “stay.”`,
    2: `${lab} Rising thrives on conversational lanes — zones beat one noisy blob.`,
    3: `${lab} Rising asks for warmth at the door — softness before spectacle.`,
    4: `${lab} Rising wants the hero sightline — give photos a generous backdrop.`,
    5: `${lab} Rising notices tidy flow — labeled beats beat chaos.`,
    6: `${lab} Rising reads balance instantly — symmetry calms social anxiety.`,
    7: `${lab} Rising prefers intimate contrast — fewer watts, more mood.`,
    8: `${lab} Rising breathes when there’s space — yard spill matters.`,
    9: `${lab} Rising respects structure — polish reads as care.`,
    10: `${lab} Rising likes clever cues — signage can be witty, not loud.`,
    11: `${lab} Rising softens edges — sound and light should hug.`,
  };
  return lines[rising % 12] ?? "";
}

function roastFromTension(
  sunE: ReturnType<typeof atlasEntryForSignIndex>,
  moonE: ReturnType<typeof atlasEntryForSignIndex>,
  riseE: ReturnType<typeof atlasEntryForSignIndex>,
  sunLab: string,
  moonLab: string,
): string {
  const roastBank = [
    `${sunLab} wants momentum while ${moonLab} wants sanctuary — name transitions so nobody emotionally speedruns dinner.`,
    `${moonLab} feels crowded fast; ${sunLab} forgets personal space — assign quiet pockets before speeches.`,
    `${sunLab} dreams spectacle; ${moonLab} tracks cups and coats — delegate one logistics buddy early.`,
    `${riseE.hostingRedFlag} Stack ${moonE.hostingRedFlag.toLowerCase()} — fix small leaks before they meme.`,
  ];
  const pick = stablePick(roastBank, saltSeed(sunE.index * 100 + moonE.index * 10 + riseE.index, "roast"));
  return `${pick} Guests forgive vibes faster than hunger — feed early, toast later.`;
}

function setupFlavorParagraph(
  comboIndex: number,
  sunE: ReturnType<typeof atlasEntryForSignIndex>,
  moonE: ReturnType<typeof atlasEntryForSignIndex>,
): string {
  const tentDice = saltSeed(comboIndex, "tentcopy") % 10;
  const cozy = tentDice < 4;
  const outdoorLean = sunE.bestSetting.toLowerCase().includes("yard") || moonE.bestSetting.toLowerCase().includes("yard");

  if (cozy) {
    return [
      `This combo skews ${moonE.shortResultPhrase.toLowerCase()} — prioritize seating honesty, food lanes, and lighting that flatters faces.`,
      outdoorLean
        ? `If headcount or weather pushes you outdoors with intent, think “defined outdoor room” (coverage optional) rather than building a mall on the lawn.`
        : `Let the venue breathe — expand flow before you expand footprint.`,
      `${sunE.bestAddOns.split(".")[0] ?? "Stage basics first"} — sparkle comes after trash and bathrooms behave.`,
    ].join(" ");
  }

  return [
    `You’re balancing ${sunE.corePartyIdentity.toLowerCase()} with ${moonE.emotionalComfortStyle.toLowerCase()} — structure supports vibe.`,
    tentDice < 7
      ? `When guest count, evening lighting, or weather risk asks for a clearer footprint, a frame-style outdoor room can hold speeches, buffet depth, and dance spill without vibe chaos — not mandatory for every backyard, but powerful when coverage earns its keep.`
      : `Often the win is patio rhythm + golden-hour patience + circulation clarity — add shelter when the forecast or guest count refuses to play cute.`,
    `${moonE.bestAddOns.split(".")[0] ?? "Comfort cues"} keep people grateful.`,
  ].join(" ");
}
