/**
 * Deep-but-playful party naming + copy generation.
 * Tone is adjustable via refinement intents; PG-13 only for adults-playful path.
 */

import type {
  AudienceOption,
  EventPlanOption,
  GuestBandOption,
  PartySparkCard,
  PartySparkInputs,
  RefinementIntent,
  ResultBadge,
  VibeOption,
} from "./party-spark-types";
import { buildBestForLine, buildPersonalization, generateSlotPartyName } from "./party-spark-engine";

// —— helpers ——————————————————————————————————————————————————————————————

function hashSeed(parts: string[]): number {
  let h = 2166136261;
  for (const p of parts) {
    for (let i = 0; i < p.length; i++) {
      h ^= p.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
  }
  return Math.abs(h);
}

function pick<T>(arr: readonly T[], seed: number, salt: number): T {
  const i = (seed + salt * 2654435761) % arr.length;
  return arr[i]!;
}

function cleanPhrase(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function titleCase(s: string): string {
  if (!s.trim()) return s;
  return s
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** Extract first usable token for titles (Emma, Johnson, Class of 2026) */
function honorName(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  const comma = t.split(",")[0]?.trim();
  if (comma && comma.length < 40) return titleCase(comma);
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length >= 2 && /^class\b/i.test(t)) return t.split(/\s+/).slice(0, 4).join(" ");
  return titleCase(words.slice(0, 3).join(" "));
}

function slugHashtag(name: string): string {
  const inner = name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
  return inner ? `#${inner}` : "#PartySpark";
}

function parseKeywords(raw: string): { town: string; theme: string; school: string } {
  const t = raw.toLowerCase();
  const schoolHints = ["uconn", "high school", "academy", "college", "university", "hs "];
  let school = "";
  for (const h of schoolHints) {
    if (t.includes(h)) {
      const m = raw.match(new RegExp(`[^,]+${h}[^,]*`, "i"));
      if (m) school = m[0].trim();
    }
  }
  const parts = raw.split(/[,;]+/).map((p) => p.trim()).filter(Boolean);
  const town = parts.find((p) => /hartford|avon|west|east|north|bury|field|bury|connecticut|ct\b/i.test(p)) || "";
  const theme = parts.find((p) => /summer|winter|spring|fall|pizza|taco|luau|glow|retro|tropical|beach/i.test(p)) || parts[0] || "";
  return { town: town || "", theme: theme || "", school: school || "" };
}

// —— setup copy (guest count) —————————————————————————————————————————————

export function getSetupIdeaText(guestBand: GuestBandOption, eventPlan: EventPlanOption, seed: number): string {
  const ep = eventPlan === "Surprise Me" ? "Backyard Party" : eventPlan;
  const intro = "Suggested starting point (our team can confirm the best size and layout for your site):";
  const lines: Record<GuestBandOption, string[]> = {
    "5–10": [
      "Cozy at-home layout with a drink station, one food table, and lounge or high-top seating",
      "Optional 10x10 cover if you want shade or light rain backup",
    ],
    "10–20": [
      "Small backyard layout with seating zones, one main food table, optional 10x10 or 12x12 cover",
      "High tops or rounds for mingling; simple buffet line to keep flow easy",
    ],
    "20–40": [
      "20x20 tent as a starting point for coverage",
      "Mix of banquet or round tables, chairs to match your meal style, food and gift tables as needed",
    ],
    "40–60": [
      "20x30 tent as a starting point for coverage",
      "6–8 banquet tables, 50–60 chairs, buffet and gift tables, optional lighting if the party runs past dusk",
    ],
    "60–80": [
      "30x30 tent as a starting point for guest count",
      "Tables and chairs staged for your service style, buffet and bar areas, gift zone, lighting plan for evening",
    ],
    "100+": [
      "Custom layout review for larger guest counts",
      "Larger tent footprint, seating plan, food flow, lighting, sidewalls if weather calls for it",
    ],
  };
  const extra =
    ep === "Corporate Event" || ep === "School Event"
      ? "\nAdd registration or welcome tables if check-in matters for your crowd."
      : "";
  return `${intro}\n${pick(lines[guestBand], seed, 3)}\n${pick(lines[guestBand], seed, 7)}${extra}`;
}

// —— name fragments by event + vibe ———————————————————————————————————————

/** Invite-friendly: playful but readable on a save-the-date */
const FUNNY_ADJECTIVES = [
  "Big Laugh",
  "High Energy",
  "All Out",
  "Squad Goals",
  "Sunshine",
  "Photo Ready",
  "Dance Floor",
  "Friends Night",
  "Snack Table",
  "Confetti",
  "Summer Night",
  "Laugh Out Loud",
];

const CLASSY_ADJECTIVES = [
  "Golden Hour",
  "Garden",
  "Evening",
  "Heritage",
  "Veranda",
  "Candlelight",
  "Champagne Toast",
  "Silver & Sage",
  "Summer Soirée",
  "Refined",
  "Courtyard",
  "Milestone",
];

const FAMILY_ADJECTIVES = [
  "All Ages",
  "Neighborhood",
  "Sunset",
  "Welcome Home",
  "Generations",
  "Game Day",
  "Family Fun",
  "Sunday Fun",
  "Pizza & Play",
  "Lawn & Laughs",
  "Front Porch",
];

const BOLD_ADJECTIVES = [
  "Main Event",
  "Full Send",
  "Afterglow",
  "Spotlight",
  "Big Swing",
  "Turn Up",
  "Victory Lap",
  "Hype",
  "Encore",
  "Epic",
  "All Eyes On",
];

const CHILL_ADJECTIVES = [
  "Slow Roll",
  "Sunday Soft",
  "Lowkey",
  "Porch Lights",
  "Acoustic",
  "Lantern Light",
  "Easy Does It",
  "Breeze & Bites",
  "No Rush",
  "Fireside",
  "Soft Sunset",
];

const ADULTS_PLAYFUL = [
  "After Dark",
  "Grown Up",
  "Mocktails & Mischief",
  "Deck Night",
  "Patio After Hours",
  "Cheeky & Chill",
  "Squad Night",
  "Twilight",
  "Late Summer",
];

function vibeAdjectives(vibe: VibeOption, intent: RefinementIntent | null, seed: number): readonly string[] {
  if (intent === "classier" || vibe === "Classy") return CLASSY_ADJECTIVES;
  if (intent === "funnier" || vibe === "Fun") return FUNNY_ADJECTIVES;
  if (intent === "family" || vibe === "Family-Friendly") return FAMILY_ADJECTIVES;
  if (intent === "simple") return FAMILY_ADJECTIVES;
  if (vibe === "Chill") return CHILL_ADJECTIVES;
  if (vibe === "Bold") return BOLD_ADJECTIVES;
  if (vibe === "Playful Adults-Only" || intent === "adultsPlayful") return ADULTS_PLAYFUL;
  return FAMILY_ADJECTIVES;
}

function eventNoun(eventPlan: EventPlanOption, seed: number): string {
  if (eventPlan === "Surprise Me") {
    return pick(
      [
        "Weekend Get-Together",
        "Summer Hangout",
        "Patio Party",
        "Lawn Party",
        "Neighborhood Night",
        "Friends & Family Bash",
        "Sunset Gathering",
        "Cookout",
      ],
      seed,
      2
    );
  }
  const map: Partial<Record<EventPlanOption, string[]>> = {
    "Graduation Party": [
      "Graduation Bash",
      "Cap & Gown Party",
      "The Send-Off",
      "Senior Celebration",
      "Next Chapter Party",
    ],
    "Birthday Party": [
      "Birthday Bash",
      "Birthday Celebration",
      "Candles & Cake",
      "Another Year",
      "Birthday Blowout",
    ],
    /** Nouns avoid leading “Backyard” so adjectives like “Neighborhood” don’t stack awkwardly */
    "Backyard Party": ["Lawn Party", "Patio Party", "Yard Games Day", "Cookout", "Open House BBQ"],
    "Baby Shower": ["Baby Shower", "Welcome Baby Party", "Little One Celebration", "Shower for Baby"],
    "Bridal Shower": ["Bridal Shower", "Brunch Shower", "Bride-to-Be Bash", "Something Blue Shower"],
    "Wedding Shower": ["Couples Shower", "Wedding Shower", "Together Shower", "Engagement Celebration"],
    "Game Night": ["Game Night", "Board Game Night", "Dice & Cards Night", "Game Night In", "Tournament Night"],
    "Pizza Night": ["Pizza Party", "Pizza Night", "Slice Night", "Pizza & Friends"],
    Cookout: ["Cookout", "BBQ Bash", "Grill Night", "Smoke & Sizzle BBQ"],
    "Corporate Event": ["Team Event", "Company Cookout", "Team Celebration", "Offsite Gathering"],
    "School Event": ["School Celebration", "Community Night", "School Spirit Night", "Family Night"],
  };
  const list = map[eventPlan] || ["Celebration", "Gathering", "Get-Together"];
  return pick(list, seed, 5);
}

function buildPartyName(
  input: PartySparkInputs,
  seed: number,
  variant: number,
  intent: RefinementIntent | null
): string {
  const { eventPlan, vibe, whoFor, keywords, flowMode, audience } = input;
  const ep = eventPlan || "Backyard Party";
  const honor = honorName(whoFor);
  const kw = parseKeywords(keywords);
  const adjPool = vibeAdjectives(vibe, intent, seed);
  const adj = pick(adjPool, seed, variant + 1);
  const noun = eventNoun(ep, seed + variant * 17);

  const localBoost = intent === "local" && (kw.town || kw.school);
  const townBit = localBoost && kw.town ? `${kw.town} ` : "";
  const schoolBit = localBoost && kw.school && !kw.town ? `${kw.school} ` : "";

  const lastMinute = intent === "lastMinute";
  const lm = lastMinute ? pick(["Tonight", "This Weekend", "Saturday Sprint", "Sunday Flex"], seed, variant) : "";

  if (honor && !lastMinute) {
    return cleanPhrase(`${honor}'s ${townBit}${adj} ${noun}`);
  }
  if (flowMode === "surprise" && !honor) {
    return cleanPhrase(`${lm ? lm + " · " : ""}${adj} ${noun}${schoolBit ? " · " + schoolBit.trim() : ""}`);
  }
  if (kw.theme && variant % 3 === 0) {
    return cleanPhrase(`${titleCase(kw.theme)} ${noun}`);
  }
  return cleanPhrase(`${townBit}${adj} ${noun}`);
}

function inviteFor(
  input: PartySparkInputs,
  name: string,
  seed: number,
  variant: number,
  intent: RefinementIntent | null
): string {
  const honor = honorName(input.whoFor);
  const ep = input.eventPlan || "gathering";
  const casual = pick(
    [
      `Join us for food, fun, and a ${ep.toLowerCase()} worth RSVPing for.`,
      `Bring your appetite and your best story—we’re celebrating ${honor || "the crew"} in style.`,
      `Save the date: ${name.split("·")[0]?.trim() || "our party"} is happening and you’re invited.`,
    ],
    seed,
    variant
  );
  const classy = pick(
    [
      `You’re warmly invited to ${name}. Cocktails, bites, and great company.`,
      `Please join us for an evening celebrating ${honor || "this milestone"}.`,
    ],
    seed,
    variant + 3
  );
  if (intent === "classier" || input.vibe === "Classy") return classy;
  if (intent === "simple") {
    return `Join us for ${ep}. Food, friends, and easy hangs—details to follow.`;
  }
  return casual;
}

function teaserFor(badge: ResultBadge, name: string, vibe: VibeOption): string {
  const short = name.length > 42 ? `${name.slice(0, 40)}…` : name;
  switch (badge) {
    case "Best Fit":
      return `A tight match for your vibe: ${short} reads clear on invites and group chats.`;
    case "Most Fun":
      return `High smile-per-minute energy—${short} feels ready for stories and photos.`;
    case "Family Pick":
      return `All-ages friendly naming with ${vibe.toLowerCase()} energy baked in.`;
    case "Classy Pick":
      return `Polished without being stiff—${short} works on paper and in conversation.`;
    case "Weekend Wild Card":
      return `A playful swing: ${short} is memorable even if you shuffle the plan later.`;
    case "Easy at Home":
      return `Low-friction hosting vibes—${short} pairs with a simple setup and good snacks.`;
    default:
      return short;
  }
}

function whyFor(badge: ResultBadge, input: PartySparkInputs): string {
  const aud = input.audience || "guests";
  const vb = input.vibe;
  switch (badge) {
    case "Best Fit":
      return `Balances ${vb} tone with your ${aud.toLowerCase()} crowd and keeps the name easy to say out loud.`;
    case "Most Fun":
      return `Adds just enough humor to spark curiosity without feeling random or inside-joke heavy.`;
    case "Family Pick":
      return `Reads friendly for mixed ages, photo captions, and yard signs without trying too hard.`;
    case "Classy Pick":
      return `Feels intentional on invites—easy to pair with simple typography and a clean palette.`;
    case "Weekend Wild Card":
      return `Gives you a memorable hook when the plan is flexible and the guest list is still forming.`;
    case "Easy at Home":
      return `Keeps expectations cozy: great when you want impact without a complicated production.`;
    default:
      return "Works across invites, texts, and casual announcements.";
  }
}

/** Order matches product: best overall → funnier → classier → family → wild card → easy at home */
const BADGES: ResultBadge[] = [
  "Best Fit",
  "Most Fun",
  "Classy Pick",
  "Family Pick",
  "Weekend Wild Card",
  "Easy at Home",
];

function buildThemeName(input: PartySparkInputs, name: string, badge: ResultBadge, seed: number, idx: number): string {
  const ep = input.eventPlan || "Backyard Party";
  const v = input.vibe;
  const p = buildPersonalization(input);
  const kw = parseKeywords(input.keywords);
  const themeWord = (input.themeKeyword || kw.theme || "").trim();

  type ThemeCandidate = { key: string; title: string; cues: string[] };
  const THEME_BANK: ThemeCandidate[] = [
    { key: "enchanted", title: "Enchanted Forest Evening", cues: ["forest", "enchanted", "fairy", "woodland", "lantern", "garden"] },
    { key: "cancun", title: "Resort Cancun Night", cues: ["cancun", "resort", "tropical", "beach", "mexican", "fiesta", "tequila", "margarita", "taco"] },
    { key: "old-hollywood", title: "Old Hollywood Spotlight", cues: ["hollywood", "glam", "red carpet", "spotlight", "classic"] },
    { key: "golden-hour", title: "Golden Hour Garden Party", cues: ["golden", "sunset", "garden", "floral", "bloom"] },
    { key: "coastal", title: "Coastal Breeze Social", cues: ["coastal", "ocean", "nautical", "blue", "seaside"] },
    { key: "backyard-bbq", title: "Backyard Smoke & Strings", cues: ["grill", "bbq", "smoke", "cookout", "charcoal", "backyard"] },
    { key: "pizza-club", title: "Neighborhood Pizza Club", cues: ["pizza", "slice", "crust", "pepperoni", "pie"] },
    { key: "game-house", title: "House Rules Game Lounge", cues: ["game", "dice", "cards", "board", "round"] },
    { key: "school-spirit", title: "School Spirit Rally Night", cues: ["school", "spirit", "campus", "class", "mascot"] },
    { key: "grad-sendoff", title: "Next Chapter Send-Off", cues: ["grad", "graduation", "cap", "diploma", "senior", "class of"] },
    { key: "birthday-cake", title: "Cake & Confetti Club", cues: ["birthday", "cake", "candles", "wish"] },
    { key: "baby-bloom", title: "Little Sprout Shower", cues: ["baby", "shower", "tiny", "bundle", "stork"] },
    { key: "bridal-bloom", title: "Brunch & Bloom Shower", cues: ["bridal", "bride", "bloom", "shower"] },
    { key: "wedding-toast", title: "Together & Toasted", cues: ["wedding", "couple", "engagement", "ring"] },
    { key: "cozy-home", title: "Cozy At-Home Social", cues: ["home", "porch", "kitchen", "cozy", "easy"] },
  ];

  const PARTY_MENU_PAIR: Partial<Record<string, string>> = {
    cancun: "Mexican bites and citrus mocktails",
    "backyard-bbq": "Grill favorites and cold lemonades",
    "pizza-club": "Pizza flights and crunchy salad",
    "enchanted": "Wood-fired bites and herb lemonade",
    "game-house": "Finger foods and dip trio",
  };

  const sourceBlob = `${name} ${themeWord} ${kw.theme} ${kw.town} ${kw.school} ${input.eventPlan || ""} ${input.vibe}`.toLowerCase();
  const rankedThemes = THEME_BANK
    .map((t) => ({
      t,
      score: t.cues.reduce((acc, cue) => (sourceBlob.includes(cue.toLowerCase()) ? acc + 2 : acc), 0),
    }))
    .sort((a, b) => b.score - a.score);

  const eventBase: Record<EventPlanOption, string[]> = {
    "Graduation Party": ["Cap & Confetti", "Senior Spotlight", "Next Chapter"],
    "Birthday Party": ["Cake & Confetti", "Birthday Spotlight", "Wish List Energy"],
    "Backyard Party": ["Lawn Lights", "Patio Social", "Backyard Glow"],
    "Baby Shower": ["Tiny Toasts", "Welcome Little One", "Soft Bloom"],
    "Bridal Shower": ["Brunch & Bloom", "Bride Tribe Garden", "Something Lovely"],
    "Wedding Shower": ["Together Table", "Ring & Ribbon", "Couples Celebration"],
    "Game Night": ["Dice & Delight", "Cards & Snacks", "Final Round"],
    "Pizza Night": ["Slice Society", "Red Sauce Social", "Cheese Pull"],
    Cookout: ["Smoke & Sunset", "Grill & Gather", "Backyard BBQ"],
    "Corporate Event": ["Team Table", "Office Offsite", "Workday Wind-Down"],
    "School Event": ["School Spirit", "Community Night", "Campus Celebration"],
    "Surprise Me": ["Weekend Spark", "Spontaneous Social", "Open-Air Party"],
  };

  const toneTag: Record<VibeOption, string[]> = {
    "Family-Friendly": ["All-Ages", "Family", "Friendly"],
    Classy: ["Signature", "Luxe", "Evening"],
    Fun: ["Party", "High-Energy", "Dance"],
    Chill: ["Low-Key", "Easy", "Sunset"],
    Bold: ["Spotlight", "Big Energy", "Statement"],
    "Playful Adults-Only": ["After-Hours", "Grown-Up", "Late-Night"],
  };

  if (themeWord) {
    const matched = rankedThemes[0];
    if (matched && matched.score >= 2) {
      const menuHint = PARTY_MENU_PAIR[matched.t.key];
      return cleanPhrase(menuHint ? `${matched.t.title} (${menuHint})` : matched.t.title);
    }
    return cleanPhrase(`${titleCase(themeWord)} ${pick(["Edition", "Social", "Theme", "Vibes"], seed, idx + 19)}`);
  }
  if (ep === "Graduation Party" && p.classYear) {
    return cleanPhrase(`Class of ${p.classYear} ${pick(["Celebration", "Spotlight", "Send-Off"], seed, idx + 23)}`);
  }
  if (rankedThemes[0] && rankedThemes[0].score >= 2) {
    const picked = rankedThemes[(seed + idx) % Math.min(3, rankedThemes.length)]?.t || rankedThemes[0].t;
    const menuHint = PARTY_MENU_PAIR[picked.key];
    return cleanPhrase(menuHint ? `${picked.title} (${menuHint})` : picked.title);
  }
  if (p.town && badge !== "Easy at Home") {
    return cleanPhrase(`${p.town} ${pick(eventBase[ep] || eventBase["Backyard Party"], seed, idx + 3)}`);
  }
  if ((badge === "Most Fun" || badge === "Best Fit") && p.first && p.first.toLowerCase() !== "guest") {
    return cleanPhrase(`${p.first}'s ${pick(eventBase[ep] || eventBase["Backyard Party"], seed, idx + 7)}`);
  }

  const core = pick(eventBase[ep] || eventBase["Backyard Party"], seed, idx + 11);
  const tag = pick(toneTag[v], seed, idx + 13);
  const fromName = name.split("·")[0]?.split(" ").slice(0, 2).join(" ") || core;
  if (badge === "Classy Pick") return cleanPhrase(`${core} Soiree`);
  if (badge === "Most Fun") return cleanPhrase(`${core} Party`);
  return cleanPhrase(`${fromName} ${tag}`);
}

function buildThemeLine(
  input: PartySparkInputs,
  _name: string,
  seed: number,
  idx: number,
  badge: ResultBadge
): string {
  const ep = input.eventPlan || "Backyard Party";
  const v = input.vibe;
  const honor = honorName(input.whoFor);
  const kw = parseKeywords(input.keywords);
  const gb = input.guestBand || "20–40";
  const small = gb === "5–10" || gb === "10–20";
  const large = gb === "60–80" || gb === "100+";

  const scaleNote = large
    ? "Split drinks and food to two zones so nobody hikes across the whole yard."
    : small
      ? "One focal table + one lounge cluster beats spreading thin."
      : "Sketch arrows for buffet flow before guests arrive—saves awkward crossings.";

  if (badge === "Classy Pick") {
    return pick(
      [
        `Palette: navy or charcoal linens, warm candlelight, metallic flatware—music stays under conversation until you open a dance pocket.`,
        `Place cards or a simple seating chart: guests relax faster when they’re not hovering with plates. Welcome drink at entry, timeline card optional.`,
        `Photo spot: one floral or greenery panel + warm wash light—skip clutter behind heads for invites-worthy shots.`,
      ],
      seed,
      idx + 3
    );
  }
  if (badge === "Weekend Wild Card") {
    return pick(
      [
        `Loose run-of-show: yard games on demand, someone else DJs for one hour, and one sunset group photo before anyone slips away.`,
        `Food in two waves—apps early, mains or grill at dusk—so nobody hits a hunger wall during toasts.`,
      ],
      seed,
      idx
    );
  }

  if (kw.theme) {
    const themed = pick(
      [
        `${titleCase(kw.theme)} thread: match napkins, playlist opener, and welcome sign so the vibe reads intentional in photos.`,
        `${titleCase(kw.theme)} carry-through—one backdrop color + labeled snack station so guests see the theme without reading a paragraph.`,
      ],
      seed,
      idx + 19
    );
    if (idx % 2 === 0) return cleanPhrase(`${themed} ${scaleNote}`);
  }

  const gradHonor = honor ? `${honor}'s` : "the grad’s";
  const babyHonor = honor ? honor : "parents-to-be";

  const byEvent: Record<EventPlanOption, string[]> = {
    "Graduation Party": [
      `Photo lane with yard sign + year; cake and gifts under cover${large ? " with two approach sides so lines don’t collide" : ""}.`,
      `Toast queue: mic or loud voice + one friend wrangler—${gradHonor} moment stays short so cousins actually hear it.`,
      `School colors on dessert table + playlist arc: throwbacks at arrival, energy up for golden hour, chill after cake.`,
    ],
    "Birthday Party": [
      `Hero spot for cake${v === "Bold" ? " + one sparkle or candle countdown" : " under warm string lights"}; snacks that skip forks when kids are on the list.`,
      `Two-color palette max—plates, cups, one balloon garland or backdrop—everything else neutral so cleanup’s fast.`,
      `${scaleNote} Ice cream or cupcake finale so the night has a second “peak” photo.`,
    ],
    "Backyard Party": [
      `Zones: drinks away from the kitchen door, food with step-back space, trash/recycling visible so the lawn stays photo-clean.`,
      `Lighting layers—twinkle + one brighter prep zone—plus bug spray and sunscreen on a side table if it’s summer.`,
      `${v === "Chill" ? "Low chairs + blankets in a corner; acoustic playlist that won’t fight conversation." : "Mark a dance pocket with rugs or rope light so energy has a home."}`,
    ],
    "Baby Shower": [
      `Gift table with “in / out” flow so hugs don’t block traffic; ${babyHonor} chair faces the group for opening gifts.`,
      `Bites that don’t need forks in every hand—mingling wins. Mocktail pitcher station if you want sparkle without pressure.`,
      `One cute backdrop (banner or florals) for group pics—games capped at one short round unless the crowd’s game-heavy.`,
    ],
    "Bridal Shower": [
      `Program shape: mingle → quick activity → cake—late arrivals aren’t embarrassed walking in.`,
      `Brunch-height tables + floral or linen backdrop for photos; favors near the door so nobody forgets.`,
      scaleNote,
    ],
    "Wedding Shower": [
      `Co-host huddle: who runs food, mic, gifts—ten minutes saves two hours of confusion.`,
      `Icebreaker that’s kind to the couple—no embarrassing prompts—then open floor for stories.`,
      `Two beverage heights: seated rounds + a few cocktail tables for people who’d rather stand.`,
    ],
    "Game Night": [
      `Table map: one loud game zone, one quieter table, one walk-up—groups rotate without resetting the whole house.`,
      `Snacks that won’t grease cards—napkins everywhere—and a hard “we’re done” time so the night doesn’t ramble.`,
      small ? "One speaker; dimmable lights so boards read clean." : "Label tables by game so newcomers aren’t lost.",
    ],
    "Pizza Night": [
      `Timing plan: pies land in two drops so cheese stays stretchy—salad or veg tray covers picky eaters.`,
      `Seating in a C or U so nobody’s yelling corner-to-corner; paper runners for easy crumb sweep.`,
      scaleNote,
    ],
    Cookout: [
      `Grill buffer zone—three feet clear—for smoke and kids. Condiments in a caddy so the line moves.`,
      `Coolers away from the grill; labeled bins “cooked here” vs “bring your own” if it’s potluck-adjacent.`,
      `Sunset layer: throw blankets or patio heaters so people stay through dessert.`,
    ],
    "Corporate Event": [
      `Arrival table: name tags or team stickers if half the room’s new to each other—posted wrap time keeps goodwill.`,
      `One visible host for announcements; buffet direction if you’re over ${large ? "40" : "25"} people.`,
      `Music low until you declare “open mingling”—then playlist can lift without stealing focus from speakers.`,
    ],
    "School Event": [
      `Volunteer roles written down: setup, line control, trash sweep—plus megaphone or PA if you’re on a field.`,
      `Photo rules posted once at check-in if minors are involved—gentle wording, big font.`,
      scaleNote,
    ],
    "Surprise Me": [
      `Flexible backbone: one anchor—great playlist, great food, or one lawn game—then let the night wander.`,
      `Start time + map pin in the group chat; two drink stations if headcount creeps past a single table.`,
      `${scaleNote} One optional surprise moment (dessert reveal, fire pit on, playlist handoff).`,
    ],
  };

  const vibeExtra: Partial<Record<VibeOption, string>> = {
    "Family-Friendly": "Juice and water pitchers at kid height; alcohol optional at a separate table.",
    Classy: "Glassware upgrade beats disposable—same budget reads richer in photos.",
    Fun: "Prop tub for photos—hats or sunglasses—if your crowd actually uses them.",
    Chill: "No rigid schedule on invites—arrival window + “main eats” window is enough.",
    Bold: "One dramatic entrance or backdrop—then simplify everything else so it doesn’t feel chaotic.",
    "Playful Adults-Only": "Mocktails with fun names in real glassware—same energy, lighter heads tomorrow.",
  };

  const pool = byEvent[ep] || byEvent["Backyard Party"]!;
  const base = pick(pool, seed, idx + 11);
  const extra = vibeExtra[v];
  if (extra && idx % 3 === 0) {
    return cleanPhrase(`${base} ${extra}`);
  }
  return cleanPhrase(base);
}

function buildMoodChips(input: PartySparkInputs, seed: number, idx: number): string[] {
  const v = input.vibe;
  const sets: Record<VibeOption, readonly [string, string, string][]> = {
    "Family-Friendly": [
      ["All ages", "Group games", "Easy eats"],
      ["Sunset hour", "Yard games", "Photo spot"],
      ["Snack bar", "Kids zone", "Good playlist"],
    ],
    Classy: [
      ["Soft lights", "Good glassware", "Slow playlist"],
      ["Florals", "Neutral linens", "Welcome drink"],
      ["Timeline", "Toast moment", "Calm MC"],
    ],
    Fun: [
      ["Dance pocket", "Photo wall", "Big laughs"],
      ["Color pop", "Selfie spot", "Late snack"],
      ["Playlist arc", "Icebreaker", "Confetti OK"],
    ],
    Chill: [
      ["Lowkey", "Blankets", "Acoustic"],
      ["Fire pit", "String lights", "Slow food"],
      ["No rush", "Porch hang", "Sunset"],
    ],
    Bold: [
      ["Big entrance", "Bold sign", "Spotlight"],
      ["High energy", "Statement cake", "After-dark"],
      ["Crowd moment", "Loud joy", "Epic group pic"],
    ],
    "Playful Adults-Only": [
      ["Mocktails", "Late bite", "Patio"],
      ["Playlist twist", "Games optional", "Soft spotlight"],
      ["Cheeky toast", "Comfy seats", "No lectures"],
    ],
  };
  const group = sets[v] || sets["Family-Friendly"];
  const triplet = pick([...group], seed, idx);
  return [triplet[0], triplet[1], triplet[2]];
}

function buildPlaybook(input: PartySparkInputs, badge: ResultBadge, seed: number, idx: number): string[] {
  const ep = input.eventPlan || "Backyard Party";
  const g = input.guestBand || "20–40";
  const byEvent: Partial<Record<EventPlanOption, string[]>> = {
    "Graduation Party": [
      "Designate a “grad moment” (yard, deck, or tent) for photos and a short toast.",
      "Food that moves: two stations or a long table so the line never feels stuck.",
      "Music arc: throwbacks early, energy up when the sun drops.",
    ],
    "Birthday Party": [
      "One signature element: cake table, DIY topping bar, or glow corner—pick one hero.",
      "Seating in clusters so people can catch up without yelling across the whole yard.",
      "Backup for weather: a dry spot for gifts and a place to chill if it sprinkles.",
    ],
    "Backyard Party": [
      "Map flow: drinks away from the kitchen door, food with space to step back.",
      "Three light layers: string lights, one brighter prep zone, safe paths after dark.",
      "Kid or pet plan if they’re coming—one zone that’s easy to watch.",
    ],
    "Game Night": [
      "Table zones: one “loud” game, one quiet, one walk-up so groups can rotate.",
      "Snacks that don’t ruin cards—napkins, coasters, and a clear “reset” between rounds.",
      "Timer + one MC moment so the night has a shape without feeling rigid.",
    ],
    "Pizza Night": [
      "Two oven moments or a pickup plan so pies land hot, not all at once.",
      "Toppings or salad side so guests with preferences feel covered.",
      "Seating in a C or U so conversation isn’t a shout across the whole space.",
    ],
    Cookout: [
      "Grill zone with a 3-foot “no-crowd” buffer so smoke and kids stay safer.",
      "Label the basics: “burgers here,” “veg there,” and one clear drinks table.",
      "Throw blanket or two for when the sun sets—people stay longer when it’s cozy.",
    ],
    "Baby Shower": [
      "Gift + card table with a single line in, line out so hugs don’t block traffic.",
      "Seating for opening gifts that still faces the group—no backs to half the room.",
      "Bathroom + changing reality check if little ones are on the list.",
    ],
    "Bridal Shower": [
      "One beautiful backdrop for group photos—florals, arch, or simple drape.",
      "Activity length capped: one game, one open mingle block, one send-off feel.",
      "Bites that don’t require a fork in every hand—mingling wins.",
    ],
    "Wedding Shower": [
      "Co-hosts get a 10-minute huddle: who wrangles food, photos, and gifts.",
      "Clear “start social / start program” so late arrivers don’t feel rude.",
      "A couple-specific icebreaker that doesn’t embarrass—keep it kind.",
    ],
    "Corporate Event": [
      "Arrival: name or team tags if people don’t all know each other yet.",
      "One obvious “head of house” for mic or announcements if speeches happen.",
      "Wrap time posted—teams leave happy, not antsy.",
    ],
    "School Event": [
      "Volunteer roles on paper: setup, line control, trash sweep—so nothing’s fuzzy.",
      "PA or megaphone plan if you’re in a field or lot without good coverage.",
      "Photo policy clear for kids if that’s a school rule—post it once, gently.",
    ],
    "Surprise Me": [
      "Pick a “north star” for the day: food, music, or games—one anchor, not five.",
      "Text a start time and a “we’re here” pin so stragglers don’t miss the vibe.",
      "One low-lift surprise: playlist handoff, dessert reveal, or fire pit on at dusk.",
    ],
  };
  const base = byEvent[ep] || byEvent["Backyard Party"]!;
  const extra =
    g === "5–10" || g === "10–20"
      ? "With a small headcount, one great circle beats rows of empty chairs."
      : "With this headcount, sketch a rough floor plan on paper before you buy a single extra table.";

  const out = [pick(base, seed, idx), pick(base, seed, idx + 2), pick(base, seed, idx + 4), extra];
  if (badge === "Easy at Home") {
    return [
      out[0]!,
      "Keep the kitchen off-limits to traffic: all drinks and apps live outside that door.",
      out[1]!,
      "Trash + recycling in two obvious spots so cleanup isn’t a midnight hunt.",
    ];
  }
  if (badge === "Most Fun") {
    return [
      out[0]!,
      "Add one silly prop tub—hats, boas, or big sunglasses—for photos people actually use.",
      out[1]!,
      "Dessert or treat as a “finale” moment so the night has a second peak.",
    ];
  }
  return out;
}

function buildVisualMood(input: PartySparkInputs, seed: number, idx: number): string {
  const v = input.vibe;
  const ep = input.eventPlan || "Backyard Party";
  const eventLook: Partial<Record<EventPlanOption, string[]>> = {
    "Graduation Party": [
      "School-color balloons framing the cake table, congrats banner readable in photos, trophy-year yard sign near the photo line",
      "White or kraft table linens so diploma props pop; warm wash lights on the gift table for evening shots",
    ],
    "Birthday Party": [
      "Age-appropriate palette on cake + dessert risers; streamers or garland on the fence at kid sight-lines",
      "String lights in a single arc behind the main table—simple depth for phone cameras",
    ],
    "Backyard Party": [
      "Fairy or bistro lights along the fence line; food + drink on separate tables to keep flow",
      "Rug or outdoor mat under the main eat zone—grounds the photo and defines “the party”",
    ],
    "Baby Shower": [
      "Soft florals or paper lanterns over the gift zone; onesie clothesline or letter board with due date",
      "Round tables with low centerpieces so faces aren’t blocked in group photos",
    ],
    "Bridal Shower": [
      "Pastel or green-and-white tablescape, champagne coupes if you’re pouring, floral hoop or arch for pics",
      "Place cards or menus even for buffet—reads upscale without feeling stiff",
    ],
    "Wedding Shower": [
      "Shared sweetheart accent—two chairs or bench with signage—for couple photos",
      "Neutral linens + one bold runner so platters read clean on camera",
    ],
    "Game Night": [
      "Zones labeled by noise level; lamp pools on tables so boards stay readable after dusk",
      "Snack boards at elbow height—people stand, play, graze without hovering over one sad chip bowl",
    ],
    "Pizza Night": [
      "Checkered runners + red taper candles (LED ok)—instant pizza-party story without clutter",
      "Stacked pizza boards at staggered heights so boxes aren’t one sad flat row",
    ],
    Cookout: [
      "Checker picnic blankets + galvanized tubs for drinks—classic cookout silhouette",
      "Warm lights strung from house to fence so smoke and smiles both read in photos",
    ],
    "Corporate Event": [
      "Branded table tent optional; crisp white + one brand color on napkins or cups",
      "Directional signage on easels—registration → food → seating—so nobody hunts",
    ],
    "School Event": [
      "Spirit banner + table clusters by grade or team if it helps crowd control",
      "High-vis cones or rope if lines form—keeps kids visible near parking",
    ],
    "Surprise Me": [
      "Mixed textures: wood platters, linen napkins, one neon or metallic accent so photos aren’t flat",
      "Two light temperatures—warm food zone, cooler mingling zone—for depth after sunset",
    ],
  };
  const vibePool: Record<VibeOption, string[]> = {
    "Family-Friendly": [
      "Bright paper lanterns or bunting, lawn dice or cornhole off to the side, playlist that skips explicit tracks",
      "Kid-height snack tub + sunscreen pump; parents relax when basics are obvious",
    ],
    Classy: [
      "Low jazz or soul, florals at varied heights, candle clusters with LED where open flame isn’t allowed",
      "Charger optional—matching glassware isn’t; one metallic candle tray pulls the table together",
    ],
    Fun: [
      "Neon yard word or oversize frame for selfies; dance floor marked with rugs or glow rope",
      "Color blocked cups + napkins so group shots read festive without busy patterns",
    ],
    Chill: [
      "Adirondack ring or poufs around a low table; acoustic covers + lo-fi between sets",
      "Lanterns at knee height—warmer than only overhead string—plus soft throw basket",
    ],
    Bold: [
      "Matte black or charcoal linens with one hot accent color on desserts or signage",
      "Uplight a tree or tent leg; entrance path lit so arrivals feel like an entrance",
    ],
    "Playful Adults-Only": [
      "Charcuterie boards with labeled cheese markers; mocktails in coupe glasses with citrus peel",
      "Heaters or fire feature at standing height—people linger where it’s warm",
    ],
  };

  const hook = eventLook[ep];
  if (hook && idx % 2 === 0) {
    return pick(hook, seed, idx + 9);
  }
  return pick(vibePool[v] || vibePool["Family-Friendly"], seed, idx + 17);
}

/** Short labels for UI + share (matches marketing list) */
export function formatEventDisplayLabel(plan: EventPlanOption): string {
  const map: Record<EventPlanOption, string> = {
    "Graduation Party": "Graduation",
    "Birthday Party": "Birthday",
    "Backyard Party": "Backyard Party",
    "Baby Shower": "Baby Shower",
    "Bridal Shower": "Bridal Shower",
    "Wedding Shower": "Wedding Shower",
    "Game Night": "Game Night",
    "Pizza Night": "Pizza Night",
    Cookout: "Cookout",
    "Corporate Event": "Corporate",
    "School Event": "School Event",
    "Surprise Me": "Weekend Idea",
  };
  return map[plan] || plan;
}

function buildContextLine(input: PartySparkInputs, _seed: number): string {
  const p = buildPersonalization(input);
  const ep = formatEventDisplayLabel(input.eventPlan || "Backyard Party");
  const parts: string[] = [ep];
  if (p.themeWord) parts.push(p.themeWord);
  if (p.town) parts.push(p.town);
  if (p.classYear) parts.push(`Class of ${p.classYear}`);
  if (p.school && !parts.includes(p.school)) parts.push(p.school);
  if (parts.length < 2) parts.push(input.vibe);
  return parts.slice(0, 4).join(" · ");
}

function badgeIntent(badge: ResultBadge): RefinementIntent | null {
  if (badge === "Classy Pick") return "classier";
  if (badge === "Most Fun" || badge === "Weekend Wild Card") return "funnier";
  if (badge === "Family Pick" || badge === "Easy at Home") return "family";
  return null;
}

/**
 * Scoring rubric (starts at 0). Use for QA/tuning — six curated slot results are not re-sorted by score.
 */
export function scorePartyIdea(card: PartySparkCard, input: PartySparkInputs): number {
  let s = 0;
  const name = card.partyName;
  const nameL = name.toLowerCase();
  const blob = `${nameL} ${card.themeLine.toLowerCase()} ${card.shortTeaser.toLowerCase()}`;
  const ep = input.eventPlan || "Backyard Party";
  const vibe = input.vibe;
  const kw = parseKeywords(input.keywords);
  const p = buildPersonalization(input);

  const eventPat: Partial<Record<EventPlanOption, RegExp>> = {
    "Graduation Party": /grad|cap|diploma|senior|tassel|class|school|send/,
    "Birthday Party": /birthday|cake|candle|wish|year/,
    "Backyard Party": /yard|lawn|patio|back|fence|grass/,
    "Baby Shower": /baby|shower|welcome|tiny|bundle/,
    "Bridal Shower": /bridal|bride|shower|bloom/,
    "Wedding Shower": /wedding|couple|engagement|together/,
    "Game Night": /game|dice|card|board|roll/,
    "Pizza Night": /pizza|slice|pie|crust|cheese/,
    Cookout: /grill|bbq|smoke|charcoal|flame/,
    "Corporate Event": /team|company|corporate|quarter|office/,
    "School Event": /school|spirit|field|pta|student/,
    "Surprise Me": /weekend|sunset|saturday|sunday|spont|yard/,
  };
  if (eventPat[ep]?.test(blob)) s += 5;

  const toneRe: Record<string, RegExp> = {
    "Family-Friendly": /family|kid|all age|yard|game|photo|mixed|grand/,
    Classy: /garden|toast|champagne|linen|floral|veranda|evening|reception/,
    Fun: /laugh|fun|dance|playlist|game|merrier|taco/,
    Chill: /porch|slow|acoustic|sunset|quiet|cozy/,
    Bold: /bold|main|spotlight|energy|victory|championship/,
    "Playful Adults-Only": /mocktail|deck|patio|moonlight|after|night|grill|thrill|seltzer/,
  };
  if (toneRe[vibe]?.test(blob)) s += 5;

  if (input.audience && card.whyItWorks.toLowerCase().includes(input.audience.toLowerCase())) s += 4;
  else if (input.audience === "Family" && /age|photo|yard|kid/i.test(blob)) s += 3;

  if (p.hasPerson && p.first && nameL.includes(p.first.toLowerCase())) s += 4;
  if (p.nickname && nameL.includes(p.nickname.toLowerCase())) s += 2;
  if (p.town && nameL.includes(p.town.toLowerCase())) s += 2;
  if (p.themeWord && nameL.includes(p.themeWord.toLowerCase())) s += 2;

  if (/\d|tent|table|chair|buffet|banquet|layout|20x|10x|12x|30x/i.test(card.setupIdea)) s += 3;

  const w = name.trim().split(/\s+/).length;
  if (w >= 2 && w <= 8) s += 3;

  if (name.length >= 10 && name.length <= 48) s += 3;

  if (card.inviteLine.length > 18 && card.inviteLine.length < 240) s += 3;

  if (card.hashtag.length > 2 && card.hashtag.length < 40) s += 2;

  if (kw.town && blob.includes(kw.town.toLowerCase())) s += 2;
  if (/summer|spring|fall|winter|july|december/i.test(blob)) s += 1;

  if (vibe === "Family-Friendly" && /adults-only|21\+|after dark only|nights only|pg-13 sex/i.test(nameL)) s -= 5;
  if (/^celebration$|^party$|^event$/i.test(name.trim())) s -= 4;
  if (name.length > 58) s -= 4;
  if (name.length < 5) s -= 3;
  if (/[bcdfghjklmnpqrstvwxz]{5,}/i.test(name.replace(/\s/g, ""))) s -= 3;
  if (vibe === "Classy" && /yeet|lol|chaos party|fries before guys/i.test(nameL)) s -= 3;
  if ((vibe === "Chill" || vibe === "Fun") && /\b(black-tie|gala|symposium|summit)\b/i.test(nameL)) s -= 3;

  return s;
}

function removeDashTone(s: string): string {
  return s
    .replace(/[—–]+/g, ", ")
    .replace(/(?<=\w)-(?=\w)/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ", ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function sanitizeCardCopy(card: PartySparkCard): PartySparkCard {
  return {
    ...card,
    partyName: removeDashTone(card.partyName),
    shortTeaser: removeDashTone(card.shortTeaser),
    whyItWorks: removeDashTone(card.whyItWorks),
    bestFor: removeDashTone(card.bestFor),
    inviteLine: removeDashTone(card.inviteLine),
    setupIdea: removeDashTone(card.setupIdea),
    hashtag: removeDashTone(card.hashtag),
    themeName: removeDashTone(card.themeName),
    themeLine: removeDashTone(card.themeLine),
    moodChips: card.moodChips.map(removeDashTone),
    playbook: card.playbook.map(removeDashTone),
    visualMood: removeDashTone(card.visualMood),
  };
}

/** Public: six curated slot results (not a random list) */
export function generatePartyIdeas(
  input: PartySparkInputs,
  refinement: RefinementIntent | null,
  runIndex: number
): PartySparkCard[] {
  const seed = hashSeed([
    input.flowMode,
    input.eventPlan || "",
    input.audience || "",
    input.vibe,
    input.whoFor,
    input.nickname,
    input.town,
    input.school,
    input.classYear,
    input.themeKeyword,
    input.keywords,
    input.guestBand || "",
    refinement || "",
    String(runIndex),
  ]);

  const gb = input.guestBand || "20–40";
  const ep = input.eventPlan || "Backyard Party";
  const eventDisplay = formatEventDisplayLabel(ep);
  const vibeLabel = input.vibe;
  const guestCountLabel = gb;
  const audienceLabel = input.audience || "Mixed Crowd";
  const contextLine = buildContextLine(input, seed);
  const pers = buildPersonalization(input);

  return BADGES.map((badge, i) => {
    const vShift = badgeIntent(badge);
    const effectiveIntent: RefinementIntent | null =
      refinement && refinement !== "shuffle" ? refinement : vShift;

    const name = generateSlotPartyName(badge, ep, input.vibe, pers, seed, i, runIndex);
    const setupIdea = getSetupIdeaText(gb, ep, seed + i * 31);
    const card: PartySparkCard = {
      badge,
      partyName: name,
      eventTypeLabel: eventDisplay,
      vibeLabel,
      audienceLabel,
      contextLine,
      guestCountLabel,
      shortTeaser: teaserFor(badge, name, input.vibe),
      whyItWorks: whyFor(badge, input),
      bestFor: buildBestForLine(badge, input, pers),
      inviteLine: inviteFor(input, name, seed, i, effectiveIntent),
      setupIdea,
      hashtag: slugHashtag(name.split("·")[0]?.trim() || name),
      themeName: buildThemeName(input, name, badge, seed, i),
      themeLine: buildThemeLine(input, name, seed, i, badge),
      moodChips: buildMoodChips(input, seed, i),
      playbook: buildPlaybook(input, badge, seed, i),
      visualMood: buildVisualMood(input, seed, i),
    };
    return sanitizeCardCopy(card);
  });
}

export {
  honorName,
  parseKeywords,
  slugHashtag,
  hashSeed,
};
