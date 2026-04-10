/**
 * Quick Event Planner — safe-side recommendation rules (editable).
 * Connecticut & New York outdoor events; conservative counts.
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

export type QuickPlannerInput = {
  eventType: EventTypeId;
  guestCount: number;
  eventTime: "morning" | "afternoon" | "evening" | "night";
  season: "spring" | "summer" | "fall" | "winter" | "";
  format:
    | "seated"
    | "cocktail"
    | "ceremony"
    | "buffet"
    | "open_house"
    | "dance"
    | "mixed";
  seatingStyle: "rounds" | "banquet" | "mixed" | "standing";
  allSeated: "yes" | "no" | "unsure";
  food: "none" | "light" | "buffet" | "plated" | "stations";
  cateringHelp: "yes" | "no" | "maybe";
  drinks: "none" | "self" | "bar";
  music: "none" | "background" | "mic" | "dj" | "live";
  danceFloor: "yes" | "no" | "maybe";
  tentKnown: "yes" | "unsure" | "no";
  weatherGoal: "basic" | "rain" | "comfort" | "full";
  separateFoodTent: "yes" | "no" | "unsure";
  eveningExtended: "yes" | "no";
  extraRestroom: boolean;
  extraGames: boolean;
  extraGiftCake: boolean;
  extraServiceTables: boolean;
  extraLounge: boolean;
  extraPhoto: boolean;
  comfortableBoost: boolean;
};

export type QuickPlannerResult = {
  headline: string;
  startingSetup: { label: string; value: string }[];
  addOns: string[];
  foodNotes: string[];
  comfortNotes: string[];
  forgottenItems: string[];
  audioNote: string;
  lightingNote: string;
  weatherItems: string[];
  danceFloorRec: string | null;
  partnershipNote: string | null;
  restroomNote: string | null;
  gamesNote: string | null;
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

function perGuestSqFt(format: QuickPlannerInput["format"]): number {
  switch (format) {
    case "ceremony":
      return 7;
    case "cocktail":
      return 9;
    case "buffet":
    case "seated":
      return 14;
    case "open_house":
      return 10;
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
    return ["wedding", "sweet16", "quince", "fundraiser", "birthday"].includes(inp.eventType) || inp.format === "dance";
  }
  return false;
}

function danceFloorSize(guests: number, inp: QuickPlannerInput): string {
  const strong =
    ["wedding", "sweet16", "quince", "fundraiser"].includes(inp.eventType) || inp.music === "dj" || inp.format === "dance";
  if (guests < 50) return strong ? "12×12 ft (minimum; size up if you expect a big dance crowd)" : "12×12 ft";
  if (guests < 100) return "12×16 ft or 16×16 ft";
  if (guests < 150) return "16×16 ft or 16×20 ft";
  return "16×20 ft or larger — we’ll custom-fit to your floor plan";
}

export function computeQuickPlannerResult(inp: QuickPlannerInput): QuickPlannerResult {
  const guests = Math.max(10, Math.min(500, inp.guestCount || 50));
  const boost = inp.comfortableBoost ? 1.08 : 1;

  let baseSq = guests * perGuestSqFt(inp.format) * eventTypeMult(inp.eventType);

  if (inp.seatingStyle === "rounds" && (inp.format === "seated" || inp.format === "buffet")) baseSq *= 1.06;
  if (inp.seatingStyle === "banquet") baseSq *= 0.98;
  if (inp.allSeated === "yes") baseSq *= 1.1;

  if (inp.food === "buffet" || inp.food === "stations") baseSq += 220;
  if (inp.food === "plated") baseSq += 120;
  if (inp.food === "light") baseSq += 80;
  if (inp.drinks === "bar") baseSq += 140;
  if (inp.drinks === "self") baseSq += 60;

  if (wantsDanceFloor(inp)) {
    baseSq += Math.max(280, Math.round(guests * 2.8));
  }

  if (inp.separateFoodTent === "yes" || (inp.separateFoodTent === "unsure" && (inp.food === "buffet" || inp.food === "stations"))) {
    baseSq += 420;
  }

  switch (inp.weatherGoal) {
    case "full":
      baseSq *= 1.14;
      break;
    case "rain":
      baseSq *= 1.1;
      break;
    case "comfort":
      baseSq *= 1.08;
      break;
    default:
      baseSq *= 1.04;
  }

  if (inp.tentKnown === "unsure" || inp.tentKnown === "no") baseSq *= 1.06;
  if (inp.eveningExtended === "yes") baseSq *= 1.05;

  baseSq *= boost;

  const needSq = Math.round(baseSq * 1.06);
  let tentPick = TENT_PRESETS.find((p) => p.sqFt >= needSq) ?? TENT_PRESETS[TENT_PRESETS.length - 1];
  const tentIdx = TENT_PRESETS.findIndex((p) => p.label === tentPick.label);
  if (inp.comfortableBoost && tentIdx >= 0 && tentIdx < TENT_PRESETS.length - 1) {
    tentPick = TENT_PRESETS[tentIdx + 1];
  }

  let chairBuffer = 1.08;
  if (inp.format === "ceremony" || inp.eventType === "community" || inp.eventType === "festival") chairBuffer += 0.06;
  if (inp.allSeated === "yes") chairBuffer += 0.04;
  if (inp.seatingStyle === "standing" || inp.format === "cocktail") {
    chairBuffer = 0.42;
  }
  let chairs = Math.ceil(guests * chairBuffer);
  if (inp.seatingStyle !== "standing") chairs = ceilTo(chairs + (inp.comfortableBoost ? 8 : 4), 5);
  else chairs = Math.max(20, ceilTo(Math.ceil(guests * 0.35) + 24, 5));

  let roundTables = 0;
  let banquetTables = 0;
  if (inp.seatingStyle !== "standing") {
    const seatedPad = inp.allSeated === "yes" ? 1 : 0;
    if (inp.seatingStyle === "mixed") {
      roundTables = Math.ceil((guests * 0.58) / 8) + seatedPad;
      banquetTables = Math.max(1, Math.ceil((guests * 0.38) / 8) + seatedPad);
    } else if (inp.seatingStyle === "banquet") {
      banquetTables = Math.ceil(guests / 8) + seatedPad;
    } else {
      roundTables = Math.ceil(guests / 8) + seatedPad;
    }
  }

  let cocktailTables = 0;
  if (["cocktail", "mixed", "open_house"].includes(inp.format) || inp.drinks === "bar") {
    cocktailTables = Math.max(2, Math.ceil(guests / 10));
  }

  let buffetTables = 0;
  if (inp.food === "buffet" || inp.food === "stations") {
    if (guests < 60) buffetTables = 2;
    else if (guests < 120) buffetTables = 3;
    else buffetTables = 4;
  } else if (inp.food === "light") {
    buffetTables = 1;
  }

  const barTables = inp.drinks === "bar" ? (guests > 100 ? 2 : 1) : 0;
  let serviceExtra = 0;
  if (inp.extraServiceTables) serviceExtra += 2;
  if (inp.cateringHelp === "yes" || inp.cateringHelp === "maybe") serviceExtra += 1;

  let giftCakeTables = 0;
  if (inp.extraGiftCake || ["wedding", "graduation", "sweet16", "quince", "birthday"].includes(inp.eventType)) {
    giftCakeTables = 1;
  }

  const linenSets =
    roundTables +
    banquetTables +
    buffetTables +
    barTables +
    giftCakeTables +
    (inp.extraPhoto ? 1 : 0) +
    serviceExtra;

  const needsLighting =
    inp.eventTime === "night" ||
    inp.eventTime === "evening" ||
    inp.eveningExtended === "yes" ||
    inp.format === "dance" ||
    ["wedding", "fundraiser", "sweet16", "quince"].includes(inp.eventType) ||
    (inp.eventType === "backyard" && inp.eventTime !== "morning");

  const addOns: string[] = [];
  if (inp.weatherGoal === "rain" || inp.weatherGoal === "full" || inp.weatherGoal === "comfort") {
    addOns.push("Sidewalls or window panels for weather flexibility");
  }
  if (
    (inp.eveningExtended === "yes" || inp.eventTime === "evening" || inp.eventTime === "night") &&
    !needsLighting
  ) {
    addOns.push("Tent lighting package (evening and night events)");
  }
  if (wantsDanceFloor(inp)) {
    addOns.push(`Dance floor: ${danceFloorSize(guests, inp)}`);
  }

  if (inp.music === "background") addOns.push("Compact speaker setup for background music");
  if (inp.music === "mic") addOns.push("Speaker plus wireless microphone for announcements");
  if (inp.music === "dj" || inp.music === "live") {
    addOns.push(inp.eventType === "festival" || inp.eventType === "community" ? "Professional sound support recommended" : "DJ-ready power and placement — confirm with your entertainment");
  }

  if (inp.season === "winter" || inp.season === "fall") addOns.push("Heaters or climate planning for cool weather");
  if (inp.season === "summer") addOns.push("Fans or airflow planning for warm afternoons");

  let audioNote = "";
  if (inp.music === "none") audioNote = "No sound gear suggested from your answers; add if you change plans.";
  else if (inp.music === "background") audioNote = "Background music: one or two powered speakers usually cover a tent this size.";
  else if (inp.music === "mic") audioNote = "Announcements: we’ll help you place speakers and a mic so everyone hears toasts and cues.";
  else if (inp.music === "dj" || inp.music === "live") {
    audioNote =
      inp.eventType === "festival" || guests > 150
        ? "Larger crowds call for professional audio; we coordinate power and tent placement with your vendor."
        : "DJ or band: plan power drops, covered equipment space, and cable paths away from guest traffic.";
  }

  let lightingNote = "";
  if (inp.eventTime === "night" || inp.eventTime === "evening" || inp.eveningExtended === "yes") {
    lightingNote = "Evening or night timing: tent lighting is strongly recommended for safety, food service, and photos.";
  } else if (inp.format === "dance" || inp.music === "dj") {
    lightingNote = "Dance-focused program: add ambient plus task lighting so the floor and paths stay safe after dark.";
  } else {
    lightingNote = "If your event runs past sunset, add lighting early so you are not scrambling week-of.";
  }

  const comfortNotes: string[] = [];
  if (inp.weatherGoal === "rain" || inp.weatherGoal === "full") {
    comfortNotes.push("Rain backup: covered food service and protected transitions between tents beat a last-minute scramble.");
  }
  if (inp.separateFoodTent === "yes") {
    comfortNotes.push("Separate food-service or prep coverage keeps cooking and heat out of the guest tent and protects your meal service.");
  }
  comfortNotes.push(
    "If you want more circulation, weather flexibility, or a more comfortable guest experience, sizing up is usually the better fit.",
  );

  const foodNotes: string[] = [];
  if (inp.food !== "none") {
    foodNotes.push("Serving stays under the guest tent; open flame and full cooking belong in designated prep areas — tell us if you need that layout.");
  }
  if (inp.cateringHelp === "yes" || inp.cateringHelp === "maybe") {
    foodNotes.push("We may be able to connect you with food or catering partners — ask when you call.");
  }
  if (inp.separateFoodTent === "yes" || (inp.separateFoodTent === "unsure" && inp.food !== "none")) {
    foodNotes.push("Buffet or stations with a crowd often work better with a satellite canopy for lines and staging.");
  }

  const forgottenItems = [
    "Trash and recycling stations near food and bar",
    "Extra linens for buffet, bar, cake, or gift tables",
    "Non-slip surfacing or flooring if grass may be soft",
    "Clear access path for catering and rental delivery",
  ];
  if (inp.extraLounge) forgottenItems.push("Lounge seating and side tables for overflow mingling");
  if (inp.extraGames) forgottenItems.push("Open lawn or paved area for games without blocking exits");

  let restroomNote: string | null = null;
  if (inp.extraRestroom || guests > 90 || (guests > 60 && ["festival", "fundraiser", "community", "wedding"].includes(inp.eventType))) {
    restroomNote =
      "For larger or longer outdoor events, it is worth planning restroom access or portable restroom support near guest flow.";
  }

  let gamesNote: string | null = null;
  if (inp.extraGames) {
    gamesNote = "Games and activities need open footprint — we’ll leave buffer in the layout so lanes stay clear.";
  } else if (inp.eventType === "backyard" || inp.eventType === "graduation" || inp.eventType === "birthday") {
    gamesNote = "Optional: lawn games or a kids’ zone — say the word and we’ll reserve space in the plan.";
  }

  const partnershipNote =
    inp.cateringHelp === "yes" || inp.cateringHelp === "maybe"
      ? "Partners: we can discuss trusted food and service vendors when you book."
      : null;

  const weatherItems: string[] = [];
  if (inp.weatherGoal !== "basic") weatherItems.push("Sidewalls or panels matched to wind and rain exposure");
  if (inp.eveningExtended === "yes") weatherItems.push("Temperature often drops after sunset — plan layers for staff and guests");

  const startingSetup: { label: string; value: string }[] = [
    { label: "Main tent (starting point)", value: `${tentPick.label} class (~${tentPick.sqFt.toLocaleString()} sq ft covered)` },
    { label: "Chairs (with buffer)", value: `${chairs} chairs` },
  ];
  if (roundTables > 0) startingSetup.push({ label: "60″ round guest tables", value: `${roundTables} tables (~8 guests each, rounded up)` });
  if (banquetTables > 0) startingSetup.push({ label: "8′ banquet tables", value: `${banquetTables} tables` });
  if (cocktailTables > 0) startingSetup.push({ label: "Cocktail / high-top tables", value: `${cocktailTables} tables` });
  if (buffetTables > 0) startingSetup.push({ label: "Buffet / food tables", value: `${buffetTables} tables` });
  if (barTables > 0) startingSetup.push({ label: "Bar tables", value: `${barTables}` });
  if (giftCakeTables > 0) startingSetup.push({ label: "Gift / cake / display", value: `${giftCakeTables} table` });
  if (serviceExtra > 0) startingSetup.push({ label: "Extra service / staging tables", value: `${serviceExtra}` });
  if (needsLighting) {
    startingSetup.push({
      label: "Tent lighting",
      value: inp.eventTime === "night" || inp.format === "dance" ? "Strongly recommended" : "Recommended",
    });
  }

  startingSetup.push({ label: "Linens (planning count)", value: `About ${linenSets}+ linen sets — confirm final counts when you order` });

  const headline = "Based on your answers, here is a smart, comfortable starting plan.";

  const disclaimer =
    "This is a starting plan from your event details. Final recommendations can change with layout, site conditions, weather, and town or venue rules.";

  return {
    headline,
    startingSetup,
    addOns,
    foodNotes,
    comfortNotes,
    forgottenItems,
    audioNote,
    lightingNote,
    weatherItems,
    danceFloorRec: wantsDanceFloor(inp) ? danceFloorSize(guests, inp) : null,
    partnershipNote,
    restroomNote,
    gamesNote,
    disclaimer,
  };
}

export function defaultQuickPlannerInput(): QuickPlannerInput {
  return {
    eventType: "wedding",
    guestCount: 75,
    eventTime: "afternoon",
    season: "",
    format: "mixed",
    seatingStyle: "rounds",
    allSeated: "unsure",
    food: "buffet",
    cateringHelp: "maybe",
    drinks: "bar",
    music: "background",
    danceFloor: "maybe",
    tentKnown: "unsure",
    weatherGoal: "comfort",
    separateFoodTent: "unsure",
    eveningExtended: "no",
    extraRestroom: false,
    extraGames: false,
    extraGiftCake: false,
    extraServiceTables: false,
    extraLounge: false,
    extraPhoto: false,
    comfortableBoost: false,
  };
}

/** Plain-text plan for email, clipboard, or sessionStorage prefill. */
export function formatQuickPlannerSummary(inp: QuickPlannerInput, res: QuickPlannerResult): string {
  const lines = [
    "Quick Event Planner — starting plan",
    "",
    res.headline,
    "",
    "YOUR STARTING SETUP",
    ...res.startingSetup.map((r) => `• ${r.label}: ${r.value}`),
    "",
    "RECOMMENDED ADD-ONS",
    ...(res.addOns.length ? res.addOns.map((a) => `• ${a}`) : ["• (none flagged beyond your setup)"]),
    "",
    "FOOD & SERVICE",
    ...res.foodNotes.map((n) => `• ${n}`),
    res.partnershipNote ? `• ${res.partnershipNote}` : "",
    "",
    "COMFORT & WEATHER",
    ...res.comfortNotes.map((n) => `• ${n}`),
    res.lightingNote ? `• ${res.lightingNote}` : "",
    ...res.weatherItems.map((w) => `• ${w}`),
    "",
    "AUDIO",
    `• ${res.audioNote}`,
    "",
    "COMMONLY FORGOTTEN",
    ...res.forgottenItems.map((f) => `• ${f}`),
    res.restroomNote ? `• ${res.restroomNote}` : "",
    res.gamesNote ? `• ${res.gamesNote}` : "",
    "",
    res.disclaimer,
  ].filter(Boolean);
  return lines.join("\n");
}
