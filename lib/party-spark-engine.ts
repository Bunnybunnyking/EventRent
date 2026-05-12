/**
 * Structured party name engine: word banks, templates, slot strategies, PG-13 safety.
 * “Real human” humor: light rhymes, family-table jokes, local pride — not internet-cringe.
 */

import type { EventPlanOption, PartySparkInputs, ResultBadge, VibeOption } from "./party-spark-types";

// —— local micro-helpers (avoid circular imports with party-spark-logic) —————————

function pick<T>(arr: readonly T[], seed: number, salt: number): T {
  const i = (seed + salt * 2654435761) % arr.length;
  return arr[i]!;
}

function clean(s: string): string {
  return s.replace(/\s+/g, " ").replace(/\s+'/g, "'").trim();
}

function titleCase(s: string): string {
  if (!s.trim()) return s;
  return s
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function firstToken(name: string): string {
  const t = name.split(/[\s,]+/)[0]?.trim() || "";
  return t || "Guest";
}

/** Disallow output that could read as explicit / hateful (brand-safe, PG-13) */
const UNSAFE =
  /(sex|porn|fuck|shit|slut|bitch|nazi|rape|kill yourself|crack cocaine|heroin|meth)\b/i;

export function isSafePublicName(s: string): boolean {
  if (UNSAFE.test(s)) return false;
  if (s.length > 64) return false;
  return true;
}

// —— personalization ————————————————————————————————————————————————

export type Personalization = {
  honor: string;
  first: string;
  nickname: string;
  displayName: string;
  town: string;
  school: string;
  classYear: string;
  themeWord: string;
  hasPerson: boolean;
  hasLocal: boolean;
};

function parseKeywordsLoose(raw: string): { town: string; theme: string; school: string } {
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
  const town = parts.find((p) => /hartford|avon|west|east|north|bury|field|connecticut|ct\b|town|city/i.test(p)) || "";
  const theme =
    parts.find((p) => /summer|winter|spring|fall|pizza|taco|luau|glow|retro|tropical|beach|navy|blush|rustic/i.test(p)) ||
    parts[0] ||
    "";
  return { town: town || "", theme: theme || "", school: school || "" };
}

function honorFromWhoFor(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  const comma = t.split(",")[0]?.trim();
  if (comma && comma.length < 40) return titleCase(comma);
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length >= 2 && /^class\b/i.test(t)) return t.split(/\s+/).slice(0, 4).join(" ");
  return titleCase(words.slice(0, 3).join(" "));
}

export function buildPersonalization(input: PartySparkInputs): Personalization {
  const honor = honorFromWhoFor(input.whoFor);
  const kw = parseKeywordsLoose(input.keywords);
  const town = (input.town && input.town.trim()) || kw.town;
  const school = (input.school && input.school.trim()) || kw.school;
  const themeWord = (input.themeKeyword && input.themeKeyword.trim()) || kw.theme;
  const nick = (input.nickname && input.nickname.trim()) || "";
  const classYear = (input.classYear && input.classYear.trim()) || "";
  const first = firstToken(nick || honor);
  const displayName = nick || firstToken(honor) || "the crew";
  return {
    honor,
    first,
    nickname: nick,
    displayName: titleCase(displayName) || displayName,
    town: town ? titleCase(town) : "",
    school: school,
    classYear,
    themeWord: themeWord ? titleCase(themeWord) : "",
    hasPerson: Boolean(honor || nick),
    hasLocal: Boolean(town || school),
  };
}

// —— word banks: warm, say-out-loud friendly; rhymes & mischief without meme-speak —————————

const RHYME_SNACKS = [
  "S’more the Merrier",
  "Taco ‘Bout a Party",
  "Cake by the Gate",
  "Dessert First Rehearsal",
  "Porch Supper Club",
  "Lawn & Order",
  "Chairs in the Air (Almost)",
  "Burgers, Beats & Blessings",
  "The Nice Slice Night",
  "Fries Before Guys (Family Edition)",
  "Shake, Bake, Celebrate",
  "Grill Thrill Chill",
  "Sip, Dip, Hooray",
  "Chips, Dips & Friendships",
  "Wrap, Clap, Recap",
  "Toast Most Host",
  "Snack Attack Bash",
  "Slice Twice Night",
  "Plates & Playdates",
  "Bite Night Delight",
] as const;

const CLASSY_CORE = [
  "Golden Hour Social",
  "Garden Toast",
  "Courtyard Supper",
  "Evening on the Terrace",
  "Candlelight Welcome",
  "Veranda Supper Club",
  "Heritage Table Dinner",
  "Champagne & Conversation",
] as const;

const EASY_HOME = [
  "Kitchen Table Friends Night",
  "Front Porch Potluck",
  "Garage Door Open House",
  "Driveway Meet & Eat",
  "Back Deck Hang",
  "Sunday Sauce Social",
  "Countertop Cheers",
  "Screen Door Supper",
] as const;

const WEEKEND_SPARK = [
  "Saturday Yard Session",
  "Sunday Slow Roast",
  "Sunset on the Lawn",
  "Weekend Permission Slip",
  "Two-Day Chill Pass",
  "Spontaneous Smoke Signal BBQ",
  "Low-Rules Lawn Hang",
] as const;

/** PG-13 playful adults — witty, never explicit */
const ADULTS_PLAYFUL_NAMES = [
  "Mocktails & Moonlight",
  "Deck Shoes Optional",
  "Chefs Without Stress",
  "Laughs After Eight",
  "Patio Plot Twist",
  "Grilled & Thrilled",
  "Friends Who Flame Food Well",
  "The Quiet Chaos Cookout",
  "Seltzer & Stories",
  "No Kids, Just Skewers",
  "Pour Decisions, Good Friends",
  "Grown Up Snack League",
  "Late Plate Social Club",
  "Suns Out, Buns Out (Burgers)",
  "Sip Back and Relax",
  "After Hours Appetizers",
] as const;

const FAMILY_SAFE_FUN = [
  "All-Ages Yard Olympics",
  "The Big Tent Pep Rally",
  "Grass Stains & Good Times",
  "Three-Leg Race Retirement Plan",
  "Hot Dogs & High Fives",
  "Sidewalk Chalk Championships",
  "Popsicles & Porch Games",
  "Backyard Giggle Games",
  "Pajamas to Patio Party",
  "Scooters, Snacks & Smiles",
  "Freeze Tag Finale",
] as const;

type EventCore = { fit: string[]; fun: string[]; classy: string[] };

const EVENT_CORE: Record<EventPlanOption, EventCore> = {
  "Graduation Party": {
    fit: ["Cap & Confetti Send-Off", "Diploma Day Picnic", "Tassel Turn Celebration", "Senior Lawn Ceremony"],
    fun: ["Caps in the Air Fair", "Parents Cry Happy Hour", "Grad Gang Grill Out", "Pomp & Circumstance Dance", "Tassel Hassle Bash"],
    classy: ["Commencement Garden Reception", "Senior Evening Honors"],
  },
  "Birthday Party": {
    fit: ["Another Lap Around the Sun", "Candles & Chaos (PG)", "Wish Upon a Plate"],
    fun: ["Cake O’Clock Shock", "Birthday Boss Rodeo", "Age Upgrade Parade", "Candles, Sprinkles, Cheers"],
    classy: ["Birthday Garden Lunch", "Evening for the Birthday Star"],
  },
  "Backyard Party": {
    fit: ["Fence-Line Fiesta", "Grass Between Your Toes Bash"],
    fun: ["Sprinkler Adjacent Social", "Bug Spray & Best Friends", "Yard Card Party", "Patio Party Posse"],
    classy: ["Back Lawn Reception", "Garden Gathering"],
  },
  "Baby Shower": {
    fit: ["Bundles & Bubbles Brunch", "Tiny Socks Welcome Party"],
    fun: ["Guess the Baby Food Derby"],
    classy: ["Garden Shower Tea"],
  },
  "Bridal Shower": {
    fit: ["Bride Tribe Brunch", "Something Borrowed Sunday"],
    fun: ["Recipe for Marriage Potluck"],
    classy: ["Rose Garden Shower"],
  },
  "Wedding Shower": {
    fit: ["Together Forever Potluck", "Two Spoons Kitchen Shower"],
    fun: ["Couple’s Cook-Off Kickoff"],
    classy: ["Courtyard Couples Tea"],
  },
  "Game Night": {
    fit: ["Dice & Diplomacy Night", "Card Table Conviction"],
    fun: ["Snacks Beat Strategies", "Roll for Seconds", "Uno Reverse Universe", "Checkmate and Cheesecake"],
    classy: ["Parlor Games & Pinot"],
  },
  "Pizza Night": {
    fit: ["Slice & Celebrate", "Pie Chart Party"],
    fun: ["Crust Fund Benefit", "Cheese Pull Championships", "Slice, Slice Baby", "Pepperoni Party Theory"],
    classy: ["Wood-Fired Welcome Night"],
  },
  Cookout: {
    fit: ["Smoke Ring Social", "Charcoal Confessional"],
    fun: ["Grillmaster Flex Fest", "Smoke Signals BBQ", "Flips, Tongs, Songs", "Buns and Fun Run"],
    classy: ["Supper Off the Grill"],
  },
  "Corporate Event": {
    fit: ["Team Table Summit", "Quarterly Patio Meet"],
    fun: ["Mandatory Fun Picnic", "Synergy Sausage Fest"],
    classy: ["Executive Garden Reception"],
  },
  "School Event": {
    fit: ["Spirit Lawn Rally", "PTA Power Hour"],
    fun: ["Field Day Flavor Tour"],
    classy: ["Community Courtyard Night"],
  },
  "Surprise Me": {
    fit: ["Weekend Permission Slip", "Surprise-Adjacent Hang"],
    fun: ["Plot Twist Patio Party", "Random Acts of Hot Dog"],
    classy: ["Impromptu Garden Toast"],
  },
};

type FunnyContext = {
  arrivals: string[];
  food: string[];
  photos: string[];
  energy: string[];
};

/** Real-life funny hooks people actually relate to at parties */
const EVENT_FUNNY_CONTEXT: Record<EventPlanOption, FunnyContext> = {
  "Graduation Party": {
    arrivals: ["late auntie entrance", "last-minute cap fix", "everyone asks 'what's next?'"],
    food: ["seconds before speeches", "snack table getting raided", "cake line doing traffic control"],
    photos: ["whole-family photo wrangle", "cap toss retake", "grandparent selfie training"],
    energy: ["happy tears then dance floor", "throwback songs and proud faces", "one mic, ten toasts, all love"],
  },
  "Birthday Party": {
    arrivals: ["gift bags in every hand", "kids sprinting to balloons", "friends pretending the age is a rumor"],
    food: ["who got the corner slice debate", "frosting before dinner behavior", "cupcake tower disappearance"],
    photos: ["candle wish close-up", "group selfie with no blinks", "photo bombed by someone’s cousin"],
    energy: ["cake countdown chaos", "playlist that gets louder by sunset", "one game that gets too competitive"],
  },
  "Backyard Party": {
    arrivals: ["flip-flops at the door", "neighbors peeking over the fence", "people asking where to put coolers"],
    food: ["grill smoke applause", "everyone circles the snack table", "someone guarding the last slider"],
    photos: ["golden-hour porch shots", "string-lights group pic", "dog stealing the photo spotlight"],
    energy: ["yard game rematch energy", "lawn chair storytelling", "sunset turns into dance time"],
  },
  "Baby Shower": {
    arrivals: ["gift bags and hugs queue", "name-guessing game starts early", "grandma already organizing tables"],
    food: ["mocktail refills nonstop", "dessert table admiration tour", "tea sandwiches gone first"],
    photos: ["belly photo station", "onesie selfie line", "three generations one frame"],
    energy: ["sweet and silly games", "soft playlist and loud laughs", "happy tears near gift opening"],
  },
  "Bridal Shower": {
    arrivals: ["brunch clutch arrivals", "flower crown compliments", "group chat finally in real life"],
    food: ["mimosa refill diplomacy", "pastry table strategy", "charcuterie vanishes first"],
    photos: ["bride tribe pose checks", "bouquet pass-around pics", "ring hand closeups everywhere"],
    energy: ["toasts with inside jokes", "one game everyone actually likes", "sweet speeches and loud cheering"],
  },
  "Wedding Shower": {
    arrivals: ["couple walk-in applause", "families meeting and bonding", "friends from both sides syncing"],
    food: ["buffet line matchmaking", "dessert table negotiations", "signature drink reviews"],
    photos: ["couple backdrop portraits", "group photo puzzle", "parents requesting one more photo"],
    energy: ["warm toast momentum", "story time from each side", "gentle chaos and big smiles"],
  },
  "Game Night": {
    arrivals: ["house rules negotiation", "someone brings the wrong game", "everyone says they are 'just here to hang'"],
    food: ["chip bowl diplomacy", "no-grease card handling policy", "pizza as peace treaty"],
    photos: ["victory face screenshots", "dramatic dice roll replay", "scoreboard evidence photos"],
    energy: ["friendly trash talk", "rematch demands", "one round that takes forever"],
  },
  "Pizza Night": {
    arrivals: ["sauce opinions ready", "everyone asks thin or thick", "boxes stack like trophies"],
    food: ["last slice standoff", "extra ranch requests", "cheese pull applause moments"],
    photos: ["slice selfie trend", "pizza tower portrait", "sauce stain bloopers"],
    energy: ["playlist and pepperoni", "table talk gets loud", "dessert rescue mission"],
  },
  Cookout: {
    arrivals: ["cooler drop-off parade", "grillmaster handshake line", "chairs claimed fast"],
    food: ["burger timing drama", "who brought the secret sauce", "corn and ribs popularity contest"],
    photos: ["grill glow portraits", "plate stack brag photos", "sunset smoke aesthetic"],
    energy: ["yard game finals", "playlist bump after dusk", "firepit overtime storytelling"],
  },
  "Corporate Event": {
    arrivals: ["name tag confidence checks", "coworkers out of office mode", "manager in sneakers moment"],
    food: ["networking near the apps", "line talk turns into ideas", "dessert table team building"],
    photos: ["team photo retries", "department reunion shots", "boss finally smiling pics"],
    energy: ["small talk to real talk", "friendly work-story roast", "wrap-up that runs long because fun"],
  },
  "School Event": {
    arrivals: ["teacher and parent high fives", "kids racing to activity tables", "volunteers doing miracles"],
    food: ["pizza line strategy", "snack table teamwork", "juice box restock panic"],
    photos: ["spirit wear photos", "class group snapshots", "principal cameo moments"],
    energy: ["field game hype", "dance break in sneakers", "community cheer section"],
  },
  "Surprise Me": {
    arrivals: ["everyone asks 'what's the plan?'", "host says 'we'll figure it out'", "show-up-and-smile mood"],
    food: ["whatever works buffet", "snacks become the hero", "late-night treat pivot"],
    photos: ["candids over perfection", "group pic when we remember", "best shots happen by accident"],
    energy: ["go-with-the-flow fun", "one spontaneous game", "night gets better as it goes"],
  },
};

function buildRelatableFunName(ep: EventPlanOption, p: Personalization, seed: number, salt: number): string {
  const c = EVENT_FUNNY_CONTEXT[ep] || EVENT_FUNNY_CONTEXT["Backyard Party"];
  const first = p.hasPerson && p.first && p.first.toLowerCase() !== "guest" ? `${p.first}'s ` : "";
  const lead = pick(
    [
      "Main Character",
      "No-Stress",
      "Group Chat",
      "Everybody Pull Up",
      "Worth Showing Up Early",
      "Late Arrival Friendly",
    ],
    seed,
    salt + 1
  );
  const scene = pick([...c.arrivals, ...c.food, ...c.photos, ...c.energy], seed, salt + 3);
  const closer = pick(["Party", "Social", "Night", "Celebration", "Edition", "Energy"], seed, salt + 5);
  return clean(`${first}${lead} ${titleCase(scene)} ${closer}`);
}

function localTail(p: Personalization, seed: number, salt: number): string {
  if (p.town) return `${p.town} `;
  if (p.school) return `${pick([p.school, titleCase(p.school.split(/\s+/)[0] || "")], seed, salt)} `;
  return "";
}

function personPrefix(p: Personalization): string {
  if (p.nickname) return `${p.nickname}’s `;
  if (p.honor) return `${firstToken(p.honor)}’s `;
  return "";
}

function themeHook(p: Personalization, seed: number): string {
  if (!p.themeWord) return "";
  return `${p.themeWord} `;
}

/** Slot-specific names — six deliberate personalities */
export function generateSlotPartyName(
  slot: ResultBadge,
  ep: EventPlanOption,
  vibe: VibeOption,
  p: Personalization,
  seed: number,
  idx: number,
  runSalt: number
): string {
  const salt = idx * 17 + runSalt * 31;
  const core = EVENT_CORE[ep] || EVENT_CORE["Backyard Party"];
  const adultMode = vibe === "Playful Adults-Only";

  let raw = "";

  switch (slot) {
    case "Best Fit": {
      const bits: string[] = [];
      const pp = personPrefix(p);
      const loc = localTail(p, seed, salt);
      const th = themeHook(p, seed);
      if (pp && (loc || th)) {
        raw = clean(`${pp}${loc}${th}${pick(core.fit, seed, salt)}`);
      } else if (pp) {
        raw = clean(`${pp}${pick(core.fit, seed, salt + 1)}`);
      } else if (p.classYear) {
        raw = clean(`Class of ${p.classYear} ${pick(core.fit, seed, salt + 2)}`);
      } else if (loc) {
        raw = clean(`${loc}${pick(core.fit, seed, salt + 3)}`);
      } else if (th) {
        raw = clean(`${th}${pick(core.fit, seed, salt + 4)}`);
      } else {
        raw = clean(`${pick(core.fit, seed, salt + 5)}`);
      }
      break;
    }
    case "Most Fun": {
      if (adultMode) {
        const playful = pick([...ADULTS_PLAYFUL_NAMES, ...core.fun], seed, salt);
        const relatable = buildRelatableFunName(ep, p, seed, salt + 11);
        raw = clean(`${personPrefix(p) || ""}${pick([playful, relatable], seed, salt + 17)}`);
      } else if (p.hasPerson) {
        const rhyme = pick([...RHYME_SNACKS, ...core.fun], seed, salt);
        const relatable = buildRelatableFunName(ep, p, seed, salt + 13);
        raw = clean(`${personPrefix(p)}${pick([rhyme, relatable], seed, salt + 19)}`);
      } else {
        raw = clean(`${pick([...RHYME_SNACKS, ...core.fun, buildRelatableFunName(ep, p, seed, salt + 23)], seed, salt)}`);
      }
      if (!isSafePublicName(raw)) raw = clean(pick(FAMILY_SAFE_FUN, seed, salt + 9));
      break;
    }
    case "Classy Pick": {
      const loc = p.town ? `${p.town} ` : "";
      raw = clean(`${loc}${pick(CLASSY_CORE, seed, salt)}`);
      if (ep === "Graduation Party" || ep === "Bridal Shower" || ep === "Wedding Shower") {
        raw = clean(`${pick(["Rose & Ribbon", "Garden Gate"], seed, salt)} ${pick(core.classy, seed, salt + 1)}`);
      }
      break;
    }
    case "Family Pick": {
      raw = clean(
        p.hasPerson
          ? `${personPrefix(p)}${pick(FAMILY_SAFE_FUN, seed, salt)}`
          : `${pick(FAMILY_SAFE_FUN, seed, salt)}`
      );
      break;
    }
    case "Weekend Wild Card": {
      raw = clean(`${localTail(p, seed, salt)}${pick(WEEKEND_SPARK, seed, salt)}`);
      break;
    }
    case "Easy at Home": {
      raw = clean(`${pick(EASY_HOME, seed, salt)}`);
      break;
    }
    default:
      raw = clean(pick(core.fit, seed, salt));
  }

  if (!isSafePublicName(raw)) {
    raw = clean(`${pick(core.fit, seed, salt + 99)}`);
  }
  return raw;
}

/** One line: who this name is for */
export function buildBestForLine(slot: ResultBadge, input: PartySparkInputs, p: Personalization): string {
  const ep = input.eventPlan || "Backyard Party";
  const aud = input.audience || "Mixed Crowd";
  const gb = input.guestBand || "20–40";
  const loc = p.town ? `${p.town} ` : p.school ? `${p.school} area · ` : "";

  const slotHint: Record<ResultBadge, string> = {
    "Best Fit": "Your strongest match for invites and signs when you want it personal and clear.",
    "Most Fun": "Groups who want a laugh-out-loud printout for the group chat—still photo-safe.",
    "Classy Pick": "Showers, milestones, or anytime you want the name to sound polished on paper.",
    "Family Pick": "All ages, grandparents to kids—easy to say at the door and in the car ride over.",
    "Weekend Wild Card": "Loose plans, flexible headcount, “show up hungry” energy.",
    "Easy at Home": "Low lift at your place—great when you want cozy, not production.",
  };

  return clean(`${loc}${aud} · ${gb} guests · ${slotHint[slot]} (${ep.replace("Surprise Me", "Weekend idea")})`);
}
