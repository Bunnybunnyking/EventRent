/**
 * Quick Event Planner — safe-side rules (editable).
 * 3-step flow: infer tent/coverage; lighting included by default in copy.
 */

export type EventTypeId =
  | "wedding"
  | "graduation"
  | "backyard"
  | "sweet16"
  | "quince"
  | "corporate"
  | "fundraiser"
  | "festival"
  | "community"
  | "tailgate"
  | "birthday"
  | "other";

/** TAB 1 — event style (maps to internal footprint behavior) */
export type EventStyleId = "seated" | "cocktail" | "ceremony" | "buffet_casual" | "dance" | "mixed";

export type QuickPlannerInput = {
  eventType: EventTypeId;
  guestCount: number;
  eventTime: "morning" | "afternoon" | "evening" | "night";
  eventStyle: EventStyleId;
  seatingStyle: "rounds" | "banquet" | "mixed" | "standing";
  food: "none" | "dessert_only" | "buffet" | "plated" | "stations";
  drinks: "none" | "self" | "bar";
  music: "none" | "background" | "mic" | "dj" | "live";
  danceFloor: "yes" | "no" | "maybe";
  extraGames: boolean;
  extraGiftCake: boolean;
  extraLounge: boolean;
  extraRestroom: boolean;
  extraFoodServiceTent: boolean;
  comfortableBoost: boolean;
};

export type RentalPackageBlock = {
  name: string;
  why: string;
  includes: string[];
  optionalAddOns: string[];
};

export type AddOnWithWhy = { title: string; why: string };

export type QuickPlannerResult = {
  summaryLine: string;
  recommendedSetup: string[];
  rentalPackage: RentalPackageBlock;
  helpfulAddOns: AddOnWithWhy[];
  planningNotes: string[];
  disclaimer: string;
};

const TENT_PRESETS: { label: string; sqFt: number }[] = [
  { label: "20×30", sqFt: 600 },
  { label: "20×40", sqFt: 800 },
  { label: "30×40", sqFt: 1200 },
  { label: "30×60", sqFt: 1800 },
  { label: "40×60", sqFt: 2400 },
  { label: "40×80", sqFt: 3200 },
];

function ceilTo(n: number, step: number) {
  return Math.ceil(n / step) * step;
}

type InternalFormat = "seated" | "cocktail" | "ceremony" | "buffet" | "dance" | "mixed";

function toInternalFormat(style: EventStyleId): InternalFormat {
  switch (style) {
    case "buffet_casual":
      return "buffet";
    case "seated":
      return "seated";
    case "cocktail":
      return "cocktail";
    case "ceremony":
      return "ceremony";
    case "dance":
      return "dance";
    default:
      return "mixed";
  }
}

function perGuestSqFt(f: InternalFormat): number {
  switch (f) {
    case "ceremony":
      return 7;
    case "cocktail":
      return 9;
    case "buffet":
    case "seated":
      return 14;
    case "dance":
      return 13;
    default:
      return 11;
  }
}

function eventTypeMult(t: EventTypeId): number {
  switch (t) {
    case "wedding":
    case "sweet16":
    case "quince":
      return 1.12;
    case "festival":
    case "fundraiser":
      return 1.15;
    case "corporate":
      return 1.08;
    case "community":
      return 1.1;
    case "tailgate":
      return 1.05;
    default:
      return 1.06;
  }
}

function wantsDanceFloor(inp: QuickPlannerInput): boolean {
  if (inp.danceFloor === "yes") return true;
  if (inp.danceFloor === "maybe") {
    return ["wedding", "sweet16", "quince", "fundraiser", "birthday"].includes(inp.eventType) || inp.eventStyle === "dance";
  }
  return false;
}

function danceFloorSize(guests: number, inp: QuickPlannerInput): string {
  const strong =
    ["wedding", "sweet16", "quince", "fundraiser"].includes(inp.eventType) || inp.music === "dj" || inp.eventStyle === "dance";
  if (guests < 50) return strong ? "12×12 ft (size up if you expect a big dance crowd)" : "12×12 ft";
  if (guests < 100) return "12×16 or 16×16 ft";
  if (guests < 150) return "16×16 or 16×20 ft";
  return "16×20 ft or larger — we’ll fit to your floor plan";
}

/** Prefer rounds vs banquet when user hasn’t forced one style */
function defaultPreferRounds(eventType: EventTypeId, eventStyle: EventStyleId): boolean {
  if (["wedding", "graduation", "fundraiser", "sweet16", "quince"].includes(eventType)) return true;
  if (["backyard", "community", "tailgate", "festival"].includes(eventType)) return false;
  if (eventStyle === "buffet_casual" || eventStyle === "cocktail") return false;
  if (eventStyle === "seated" || eventStyle === "ceremony") return true;
  return true;
}

function resolveTableMode(inp: QuickPlannerInput): "rounds" | "banquet" | "mixed" | "standing" {
  if (inp.seatingStyle === "mixed") return "mixed";
  if (inp.seatingStyle === "standing") return "standing";
  if (inp.seatingStyle === "rounds" || inp.seatingStyle === "banquet") return inp.seatingStyle;
  return defaultPreferRounds(inp.eventType, inp.eventStyle) ? "rounds" : "banquet";
}

export function computeQuickPlannerResult(inp: QuickPlannerInput): QuickPlannerResult {
  const guests = Math.max(10, Math.min(500, inp.guestCount || 50));
  const boost = inp.comfortableBoost ? 1.08 : 1;
  const internal = toInternalFormat(inp.eventStyle);

  let baseSq = guests * perGuestSqFt(internal) * eventTypeMult(inp.eventType);

  const mode = resolveTableMode(inp);
  if (mode === "rounds" && (internal === "seated" || internal === "buffet")) baseSq *= 1.06;
  if (mode === "banquet") baseSq *= 0.98;
  if (inp.eventStyle === "seated" || inp.eventStyle === "ceremony") baseSq *= 1.06;

  if (inp.food === "buffet" || inp.food === "stations") baseSq += 220;
  if (inp.food === "plated") baseSq += 130;
  if (inp.food === "dessert_only") baseSq += 70;
  if (inp.drinks === "bar") baseSq += 140;
  if (inp.drinks === "self") baseSq += 60;

  if (wantsDanceFloor(inp)) baseSq += Math.max(280, Math.round(guests * 2.8));
  if (inp.extraFoodServiceTent) baseSq += 420;

  // Outdoor tented event: safe-side coverage (no “do you need a tent?” question)
  baseSq *= 1.08;
  if (inp.eventTime === "evening" || inp.eventTime === "night") baseSq *= 1.05;
  if (internal === "cocktail" || inp.eventStyle === "mixed") baseSq *= 1.04;

  baseSq *= boost;

  const needSq = Math.round(baseSq * 1.06);
  let tentPick = TENT_PRESETS.find((p) => p.sqFt >= needSq) ?? TENT_PRESETS[TENT_PRESETS.length - 1];
  const tentIdx = TENT_PRESETS.findIndex((p) => p.label === tentPick.label);
  if (inp.comfortableBoost && tentIdx >= 0 && tentIdx < TENT_PRESETS.length - 1) {
    tentPick = TENT_PRESETS[tentIdx + 1];
  }

  // ~5–12% buffer on chairs; bump for ceremony, fundraiser, community, or “mixed / not sure” layout
  let chairBuffer = 1.07;
  if (internal === "ceremony" || inp.eventType === "community" || inp.eventType === "festival") chairBuffer += 0.05;
  if (inp.eventStyle === "mixed") chairBuffer += 0.04;
  if (inp.eventType === "fundraiser") chairBuffer += 0.03;

  if (mode === "standing" || internal === "cocktail") {
    chairBuffer = 0.4;
  }

  let chairs = Math.ceil(guests * chairBuffer);
  if (mode !== "standing" && internal !== "cocktail") {
    chairs = ceilTo(chairs + (inp.comfortableBoost ? 8 : 5), 5);
  } else {
    chairs = Math.max(24, ceilTo(Math.ceil(guests * 0.38) + 20, 5));
  }

  const seatedPad = inp.eventStyle === "seated" || inp.food === "plated" ? 1 : 0;

  let roundTables = 0;
  let banquetTables = 0;

  if (mode === "mixed") {
    roundTables = Math.ceil((guests * 0.56) / 8) + seatedPad;
    banquetTables = Math.max(1, Math.ceil((guests * 0.36) / 8) + (seatedPad ? 1 : 0));
  } else if (mode === "banquet") {
    banquetTables = Math.ceil(guests / 8) + (seatedPad ? 1 : 0);
  } else if (mode === "rounds") {
    if (internal === "cocktail") {
      roundTables = Math.max(2, Math.ceil((guests * 0.42) / 8));
    } else {
      roundTables = Math.ceil(guests / 8) + (seatedPad ? 1 : 0);
    }
  } else {
    roundTables = Math.max(0, Math.ceil((guests * 0.28) / 8));
  }

  let cocktailTables = 0;
  if (internal === "cocktail" || inp.eventStyle === "mixed" || inp.drinks === "bar") {
    cocktailTables = Math.max(2, Math.ceil(guests / 10));
  }

  let buffetTables = 0;
  if (inp.food === "buffet" || inp.food === "stations") {
    if (guests < 60) buffetTables = 2;
    else if (guests < 120) buffetTables = 3;
    else buffetTables = 4;
  } else if (inp.food === "dessert_only") {
    buffetTables = 1;
  }

  const barTables = inp.drinks === "bar" ? (guests > 100 ? 2 : 1) : 0;

  let giftCakeTables = 0;
  if (inp.extraGiftCake || ["wedding", "graduation", "sweet16", "quince", "birthday"].includes(inp.eventType)) {
    giftCakeTables = 1;
  }

  const isEvening = inp.eventTime === "evening" || inp.eventTime === "night";

  const lightingBullet = isEvening
    ? "Bistro / tent lighting (especially if evening) — standard for visibility, safety, and atmosphere after dark"
    : "Bistro / tent lighting — recommended for ambiance and visibility under the tent (plan it from the start)";

  let audioBullet = "";
  if (inp.music === "none") audioBullet = "Sound: add speakers or a mic later if you add music or speeches";
  else if (inp.music === "background") audioBullet = "Speaker setup: one or two small speakers for background music";
  else if (inp.music === "mic") audioBullet = "Speaker + wireless mic for announcements and toasts";
  else audioBullet = "Power and placement for DJ or live music — we coordinate with your entertainment";

  const recommendedSetup: string[] = [
    `Tent: ${tentPick.label} — a safer, more comfortable starting fit (~${tentPick.sqFt.toLocaleString()} sq ft covered)`,
    `Chairs: ${chairs} (~8–10% buffer for real-world seating${inp.eventStyle === "mixed" ? "; extra flexibility because your program is mixed" : ""})`,
  ];
  if (roundTables > 0) recommendedSetup.push(`Tables: ${roundTables} round tables (~8 guests each, rounded up)`);
  if (banquetTables > 0) recommendedSetup.push(`Tables: ${banquetTables} eight-foot banquet tables (~8 guests per table)`);
  if (cocktailTables > 0) recommendedSetup.push(`Cocktail / high-top tables: ${cocktailTables}`);
  if (buffetTables > 0) recommendedSetup.push(`Buffet / service tables: ${buffetTables}`);
  if (barTables > 0) recommendedSetup.push(`Bar tables: ${barTables}`);
  if (giftCakeTables > 0) recommendedSetup.push(`Gift / cake table: ${giftCakeTables}`);
  recommendedSetup.push(lightingBullet);
  if (audioBullet) recommendedSetup.push(audioBullet);
  if (wantsDanceFloor(inp)) recommendedSetup.push(`Dance floor: ${danceFloorSize(guests, inp)}`);

  const rentalPackage = buildRentalPackage(inp, tentPick.label, wantsDanceFloor(inp), isEvening);

  const helpfulAddOns = buildHelpfulAddOns(inp, guests, wantsDanceFloor(inp), isEvening);

  const planningNotes: string[] = [
    "This setup is estimated on the safe side for better comfort and flow.",
    "If you want more circulation or extra weather flexibility, sizing up is often worth it.",
  ];
  if (inp.eventStyle === "mixed") {
    planningNotes.push("Mixed program? We’re leaving flexibility in the layout—we’ll tighten flow when we see your site.");
  }
  if (inp.food !== "none") {
    planningNotes.push("When food is part of the day, covered service space usually helps the event run more smoothly.");
  }
  if (isEvening) {
    planningNotes.push("For evening events, lighting should be part of the plan from the beginning—not a week-of add.");
  }
  if (wantsDanceFloor(inp)) {
    planningNotes.push("Dance floor in the plan—we’ve allowed tent space so the layout doesn’t feel tight around the floor.");
  }
  if (inp.extraGames) {
    planningNotes.push("If games or activities matter, we’ll leave open space in the layout for exits and flow.");
  }
  if (inp.extraRestroom || guests > 85 || (guests > 55 && ["festival", "fundraiser", "community", "wedding"].includes(inp.eventType))) {
    planningNotes.push("For larger or longer outdoor events, restroom planning is worth a quick conversation.");
  }

  const summaryLine =
    "Based on what you shared, here’s a starting plan we’re comfortable recommending—then we fine-tune for your site and date.";

  const disclaimer =
    "This is a smart starting plan based on your event details. Final recommendations may change based on layout, site conditions, and weather planning.";

  return {
    summaryLine,
    recommendedSetup,
    rentalPackage,
    helpfulAddOns,
    planningNotes,
    disclaimer,
  };
}

function buildRentalPackage(
  inp: QuickPlannerInput,
  tentLabel: string,
  dance: boolean,
  evening: boolean,
): RentalPackageBlock {
  const { name, why } = packageNameAndWhy(inp);
  const includes: string[] = [
    `Recommended tent: ${tentLabel}`,
    "Guest tables and chairs (with buffer)",
    evening
      ? "Bistro / tent lighting (especially if evening) — built into the plan, not an afterthought"
      : "Bistro / tent lighting for ambiance and visibility under the tent",
    "Basic layout guidance for your property",
  ];
  if (inp.food !== "none") {
    includes.push("Buffet, bar, cake, or service tables as your answers suggest");
  }
  if (dance) includes.push("Dance floor sizing matched to your guest count");

  const optionalAddOns: string[] = [];
  if (inp.drinks === "bar" || inp.food === "buffet" || inp.food === "stations") {
    optionalAddOns.push("Sidewalls for wind, light rain, and flexibility");
  }
  if (inp.extraFoodServiceTent) optionalAddOns.push("Extra food-service or prep tent");
  if (inp.extraLounge) optionalAddOns.push("Lounge seating cluster");
  if (optionalAddOns.length === 0) optionalAddOns.push("Sidewalls, fans or heaters by weather, upgraded linens");
  else optionalAddOns.push("Upgraded linens or climate options depending on date");

  return { name, why, includes, optionalAddOns };
}

function packageNameAndWhy(inp: QuickPlannerInput): { name: string; why: string } {
  const g = inp.guestCount;
  switch (inp.eventType) {
    case "wedding":
      return {
        name: "Wedding Reception Starter Package",
        why: "Balances dining space, service flow, and room to move—typical for Connecticut outdoor receptions.",
      };
    case "graduation":
      return {
        name: "Graduation Party Package",
        why: "A smart mix of seating, food service, and gathering space for family and friends.",
      };
    case "backyard":
      return {
        name: "Backyard Celebration Package",
        why: "Relaxed seating and service layout that fits most lawns and driveways without feeling cramped.",
      };
    case "sweet16":
    case "quince":
      return {
        name: inp.eventType === "quince" ? "Quinceañera Celebration Package" : "Sweet 16 Celebration Package",
        why: "Designed for photos, food, and dancing with age-appropriate flow and extra comfort built in.",
      };
    case "corporate":
      return {
        name: "Corporate Event Package",
        why: "Professional footprint for programs, networking, and branded service areas.",
      };
    case "fundraiser":
      return {
        name: inp.eventStyle === "cocktail" ? "Cocktail Fundraiser Package" : "Fundraiser Event Package",
        why: "Supports mingling, remarks, and service so donors move easily and the program stays on track.",
      };
    case "community":
    case "festival":
      return {
        name: "Community Event Package",
        why: "Scales for town and school events with flexible seating and service staging.",
      };
    case "tailgate":
      return {
        name: "Tailgate Package",
        why: "Compact, social layout for standing, drinks, and casual food.",
      };
    case "birthday":
      return {
        name: "Birthday Celebration Package",
        why: "Flexible layout for cake, gifts, and guests—without over-building the footprint.",
      };
    default:
      if (inp.eventStyle === "cocktail") {
        return {
          name: "Cocktail & Mingling Package",
          why: "Emphasizes high-tops, bar flow, and open movement for " + g + " guests.",
        };
      }
      return {
        name: "Outdoor Celebration Package",
        why: "A balanced starting setup for your guest count and program style.",
      };
  }
}

function buildHelpfulAddOns(inp: QuickPlannerInput, guests: number, dance: boolean, evening: boolean): AddOnWithWhy[] {
  const out: AddOnWithWhy[] = [];

  if (!evening) {
    out.push({
      title: "Bistro / tent lighting",
      why: "Even for daytime events, under-tent lighting finishes the look and helps vendors and guests see clearly as the day goes on.",
    });
  }

  if (inp.drinks === "bar" || inp.food === "buffet" || inp.food === "stations" || guests > 75 || evening) {
    out.push({
      title: "Sidewalls",
      why: "Helps with wind, light rain, and weather flexibility—worth discussing for Connecticut outdoor dates.",
    });
  }

  if (inp.food === "buffet" || inp.food === "stations") {
    out.push({
      title: "Buffet / service tables",
      why: "Keeps lines organized and gives staff room to refresh without crowding guests.",
    });
  }

  if (dance) {
    out.push({
      title: "Dance floor",
      why: "Keeps dancing contained and gives the event a clear focal point—especially on grass.",
    });
  }

  if (inp.music !== "none") {
    out.push({
      title: inp.music === "mic" ? "Speakers & microphone" : "Sound support",
      why: "So toasts, playlists, or your DJ land evenly across the tent without last-minute cable runs.",
    });
  }

  if (inp.extraFoodServiceTent || inp.food === "stations") {
    out.push({
      title: "Extra food-service tent",
      why: "Protects prep and staging so heat and traffic stay out of the guest area.",
    });
  }

  if (inp.drinks === "bar") {
    out.push({
      title: "Bar tables & beverage layout",
      why: "Keeps drink service organized and off the main walkways.",
    });
  }

  out.push({
    title: "Linens",
    why: "A more finished, coordinated look—especially for buffet, bar, gift, and cake.",
  });

  out.push({
    title: "Trash & service stations",
    why: "Keeps the site tidy through service and breakdown.",
  });

  if (inp.extraGames || inp.eventType === "backyard" || inp.eventType === "graduation") {
    out.push({
      title: "Games / activity area",
      why: "Great for backyard and family events—plan footprint so exits and paths stay clear.",
    });
  }

  if (inp.extraRestroom || guests > 90) {
    out.push({
      title: "Restroom planning",
      why: "Larger or longer outdoor events are easier when restrooms are near guest flow.",
    });
  }

  if (inp.eventTime === "afternoon") {
    out.push({
      title: "Fans or airflow",
      why: "Warm afternoons are more comfortable with a little air movement under the tent.",
    });
  }

  if (evening || inp.eventTime === "night") {
    out.push({
      title: "Heaters or cool-evening planning",
      why: "Connecticut evenings can cool off fast—climate options keep guests comfortable after sunset.",
    });
  }

  const seen = new Set<string>();
  const deduped = out.filter((a) => {
    if (seen.has(a.title)) return false;
    seen.add(a.title);
    return true;
  });
  return deduped.slice(0, 9);
}

export function defaultQuickPlannerInput(): QuickPlannerInput {
  return {
    eventType: "wedding",
    guestCount: 75,
    eventTime: "afternoon",
    eventStyle: "mixed",
    seatingStyle: "rounds",
    food: "buffet",
    drinks: "bar",
    music: "background",
    danceFloor: "maybe",
    extraGames: false,
    extraGiftCake: false,
    extraLounge: false,
    extraRestroom: false,
    extraFoodServiceTent: false,
    comfortableBoost: false,
  };
}

export function formatQuickPlannerSummary(inp: QuickPlannerInput, res: QuickPlannerResult): string {
  const pkg = res.rentalPackage;
  const lines = [
    "Quick Event Planner",
    "",
    res.summaryLine,
    "",
    "YOUR RECOMMENDED SETUP",
    ...res.recommendedSetup.map((s) => `• ${s}`),
    "",
    "RENTAL PACKAGE WE RECOMMEND",
    pkg.name,
    pkg.why,
    "Includes:",
    ...pkg.includes.map((i) => `• ${i}`),
    "Optional add-ons:",
    ...pkg.optionalAddOns.map((i) => `• ${i}`),
    "",
    "HELPFUL ADD-ONS",
    ...res.helpfulAddOns.map((a) => `• ${a.title} — ${a.why}`),
    "",
    "PLANNING NOTES",
    ...res.planningNotes.map((n) => `• ${n}`),
    "",
    res.disclaimer,
  ];
  return lines.join("\n");
}
