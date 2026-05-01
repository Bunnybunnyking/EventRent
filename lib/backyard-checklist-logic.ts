/**
 * Backyard & private party checklist, readiness-focused.
 * Keeps sizing/layout/quote in other tools; this is confirm, remember, soft ideas.
 */

export type PrivateEventType =
  | "birthday"
  | "graduation"
  | "anniversary"
  | "family_gathering"
  | "shower"
  | "retirement"
  | "religious_family"
  | "backyard_social"
  | "other_private";

export type GuestRange = "under25" | "25_50" | "50_100" | "100_plus";
export type DayPart = "day" | "evening";
export type VenueKind = "backyard_home" | "private_venue";
export type FoodLevel = "full" | "light" | "none";
export type WeatherConcernLevel = "low" | "medium" | "high";
export type Timeframe = "this_month" | "next_3_months" | "later" | "not_sure";
export type MusicPlan = "none" | "speakers" | "dj_or_live";
export type KidsLevel = "none" | "some" | "many";

/** Step 2: granular “what you expect to have” (on/off) */
export interface SetupConfirm {
  tentOrCover: boolean;
  tables: boolean;
  chairs: boolean;
  buffetServing: boolean;
  dessertCakeTable: boolean;
  barDrinkStation: boolean;
  musicSpeakerZone: boolean;
  danceFloor: boolean;
  lighting: boolean;
  sidewalls: boolean;
  generatorPower: boolean;
  restroomPlan: boolean;
  parkingPlan: boolean;
  trashCleanup: boolean;
}

export const setupFieldOrder: (keyof SetupConfirm)[] = [
  "tentOrCover", "tables", "chairs", "buffetServing", "dessertCakeTable", "barDrinkStation", "musicSpeakerZone", "danceFloor", "lighting", "sidewalls", "generatorPower", "restroomPlan", "parkingPlan", "trashCleanup", ];

/** Step 2: site & crowd */
export interface SiteGuestQuick {
  spaceTightOrTricky: boolean;
  powerFarOrUnsure: boolean;
  expectLotsOfMingling: boolean;
}

/** Step 3: optional inspiration */
export interface PrefQuick {
  wantEnhancementIdeas: boolean;
  wantFunIdeas: boolean;
  vibe: "keep_simple" | "balanced" | "make_special";
}

export interface BackyardChecklistInput {
  eventType: PrivateEventType;
  guestRange: GuestRange;
  dayPart: DayPart;
  venue: VenueKind;
  food: FoodLevel;
  weatherConcern: WeatherConcernLevel;
  timeframe: Timeframe;
  music: MusicPlan;
  kids: KidsLevel;
  setup: SetupConfirm;
  site: SiteGuestQuick;
  prefs: PrefQuick;
}

/** Partial state from URL or storage; nested objects merge shallowly into defaults */
export type BackyardChecklistInputPatch = Partial<Omit<BackyardChecklistInput, "setup" | "site" | "prefs">> & {
  setup?: Partial<SetupConfirm>;
  site?: Partial<SiteGuestQuick>;
  prefs?: Partial<PrefQuick>;
};

export type ChecklistCategoryId =
  | "planning_timeline"
  | "site_readiness"
  | "guest_comfort"
  | "food_drink"
  | "weather_lighting_power"
  | "day_of_setup"
  | "final_confirmation";

export const checklistCategoryLabels: Record<ChecklistCategoryId, string> = {
  planning_timeline: "Planning, schedule & timeline", site_readiness: "Site readiness", guest_comfort: "Guest comfort", food_drink: "Food, drinks, coolers & supplies", weather_lighting_power: "Weather, lighting & power", day_of_setup: "Day-of timing & setup", final_confirmation: "Final checks (week of)", };

export const checklistCategoryOrder: ChecklistCategoryId[] = [
  "planning_timeline", "site_readiness", "guest_comfort", "food_drink", "weather_lighting_power", "day_of_setup", "final_confirmation", ];

export interface ChecklistLineItem {
  id: string;
  text: string;
}

export interface EnhancementItem {
  id: string;
  title: string;
  why: string;
  badge?: string;
}

export interface FunIdeaItem {
  id: string;
  title: string;
  tags: string[];
}

export interface BackyardChecklistResult {
  headline: string;
  subhead: string;
  checklistByCategory: Record<ChecklistCategoryId, ChecklistLineItem[]>;
  confirmedItems: string[];
  stillToConfirm: string[];
  thingsPeopleForget: string[];
  popularEnhancements: EnhancementItem[];
  funIdeas: FunIdeaItem[];
  nextStepHints: string[];
}

const uid = (prefix: string, i: number) => `${prefix}-${i}`;

export function defaultBackyardChecklistInput(): BackyardChecklistInput {
  return {
    eventType: "backyard_social", guestRange: "25_50", dayPart: "evening", venue: "backyard_home", food: "light", weatherConcern: "medium", timeframe: "next_3_months", music: "speakers", kids: "some", setup: {
      tentOrCover: true, tables: true, chairs: true, buffetServing: false, dessertCakeTable: true, barDrinkStation: true, musicSpeakerZone: true, danceFloor: false, lighting: false, sidewalls: false, generatorPower: false, restroomPlan: false, parkingPlan: true, trashCleanup: true, }, site: {
      spaceTightOrTricky: false, powerFarOrUnsure: true, expectLotsOfMingling: true, }, prefs: {
      wantEnhancementIdeas: true, wantFunIdeas: true, vibe: "balanced", }, };
}

function guestLabel(g: GuestRange): string {
  switch (g) {
    case "under25":
      return "under ~25 guests";
    case "25_50":
      return "~25 to 50 guests";
    case "50_100":
      return "~50 to 100 guests";
    case "100_plus":
      return "100+ guests";
    default:
      return "your guest count";
  }
}

function eventTypeLabel(t: PrivateEventType): string {
  const map: Record<PrivateEventType, string> = {
    birthday: "a birthday", graduation: "a graduation", anniversary: "an anniversary", family_gathering: "a family gathering", shower: "a shower", retirement: "a retirement party", religious_family: "a family or religious celebration", backyard_social: "a backyard party", other_private: "a private celebration", };
  return map[t];
}

function kidsLikely(inp: BackyardChecklistInput): boolean {
  if (inp.kids !== "none") return true;
  return inp.eventType === "birthday" || inp.eventType === "shower" || inp.eventType === "family_gathering";
}

export function computeBackyardChecklistResult(inp: BackyardChecklistInput): BackyardChecklistResult {
  const { setup, venue, food, weatherConcern, dayPart, guestRange, eventType, site, prefs, music, timeframe } = inp;
  const evening = dayPart === "evening";
  const largerParty = guestRange === "50_100" || guestRange === "100_plus";
  const foodServed = food !== "none";
  const rainWorried = weatherConcern !== "low";
  const backyard = venue === "backyard_home";
  const musicOn = music !== "none";
  const musicLikely = musicOn || setup.musicSpeakerZone || eventType === "graduation" || eventType === "birthday";

  const headline = "Your party checklist";
  const subhead = `Built for ${eventTypeLabel(eventType)} · ${guestLabel(guestRange)}. Each line is something concrete to do or buy. Use our other tools when you need tent sizes or counts.`;

  const checklistByCategory: Record<ChecklistCategoryId, ChecklistLineItem[]> = {
    planning_timeline: [], site_readiness: [], guest_comfort: [], food_drink: [], weather_lighting_power: [], day_of_setup: [], final_confirmation: [], };

  let n = 0;
  const add = (cat: ChecklistCategoryId, text: string) => {
    checklistByCategory[cat].push({ id: uid(cat, n++), text });
  };

  add(
    "planning_timeline", "Write a simple run-of-show with times: guest arrival, food or apps out, speeches or cake, music/DJ, planned end. One page is enough.", );
  add("planning_timeline", "Put an RSVP or headcount date on the invite so you can finalize food, ice, and seating before the last minute.");
  add("planning_timeline", "Send address, where to park, and start time (invite, email, or group text). Repeat it in a week-of reminder.");
  add("planning_timeline", "Give helpers gate codes, Wi‑Fi password, and one day-of phone number that will actually be answered.");
  if (timeframe === "this_month") {
    add(
      "planning_timeline", "Short runway: confirm rental delivery or pickup windows in writing, plus morning vs afternoon arrival for tents or tables.", );
  } else {
    add(
      "planning_timeline", "2 to 3 weeks out: lock rentals, delivery or pickup, and who signs for what. Put it on the same calendar as your run-of-show.", );
  }
  if (venue === "private_venue") {
    add(
      "planning_timeline", "Get venue rules in writing: stakes, noise cutoff, hard end time, load-in door, and where trucks stage without blocking exits.", );
  }

  add("site_readiness", "Walk the yard or room at the same time of day as the party; note sun, shade, and mud.");
  add(
    "site_readiness", "Power washing: house exterior, driveway, and venue or party space (walks, patio, parking guests use). Schedule or DIY well before the event so surfaces dry; most hosts forget this until the last minute.", );
  if (backyard) {
    add("site_readiness", "Mark sprinklers, septic, and soft spots before stakes or heavy traffic.");
  }
  if (site.spaceTightOrTricky || !setup.tentOrCover) {
    add("site_readiness", "Plan load-in: gate width, slope, and where trucks can wait without blocking guests.");
  }
  if (!setup.tentOrCover && backyard) {
    add("site_readiness", "Decide what happens in a quick shower: partial cover or a clear backup area.");
  }

  add("guest_comfort", "Keep seating reachable, not only at the far edge. Older guests and anyone with mobility need easy access.");
  if (kidsLikely(inp)) {
    add("guest_comfort", "Add a calmer pocket for kids, strollers, or anyone who needs a break from noise.");
  }
  if (site.expectLotsOfMingling || largerParty) {
    add("guest_comfort", "Balance standing room with places to sit; long stand-only parties wear people out.");
  }
  if (largerParty) {
    add(
      "guest_comfort", "Before doors open: extra toilet paper, hand soap, and a small lined trash bin in each bathroom. Restock once mid-party if it’s long.", );
  }
  if (largerParty || backyard) {
    add("guest_comfort", "Parking: overflow, neighbor courtesy, and a visible path to the party.");
  }

  if (foodServed) {
    add(
      "food_drink", "Assign one person (not only the host) to refresh chafers, refill water, and reset the food table during the party.", );
    if (food === "full") {
      add(
        "food_drink", "Full meal: confirm final headcount 3 to 5 days ahead; plan serving utensils, dinner plates, forks, napkins, and a labeled allergy-safe option if needed.", );
      add("food_drink", "Leftovers: foil, containers, or bags ready before dinner so food moves off tables safely when you wind down.");
    } else {
      add(
        "food_drink", "Light bites: small plates, napkins, toothpicks or forks, and trays so food isn’t balanced on knees. Pack extra napkins for saucy items.", );
    }
    add(
      "food_drink", "Coolers or drink tubs: use at least one with a drain plug; keep drinks in one zone so guests aren’t hunting through the house.", );
    add(
      "food_drink", "Ice: buy or order more than you think. Use separate bags for drink coolers vs. keeping cold food cold until service.", );
    add("food_drink", "Water station: large dispenser or bottled water, refills planned if it’s hot or the party runs long.");
  } else {
    add(
      "food_drink", "Drinks-focused: ice, coolers or tubs, bottle/wine opener, cups, and a salty snack or cheese-fruit tray so people aren’t drinking on empty stomachs.", );
    add("food_drink", "Water and kid-friendly drinks in the same spot as beer and wine, not in a different room.");
  }
  if (foodServed || setup.barDrinkStation) {
    add(
      "food_drink", "Bar zone: mixers, garnishes, ice scoop, and non-alcoholic options visibly beside alcohol: same table, same cooler row.", );
  }
  if (setup.buffetServing && foodServed) {
    add(
      "food_drink", "Buffet line: flow so guests don’t back into a door; hot food stays hot and cold salads on ice. Use serving spoons for every dish.", );
  }
  if (setup.dessertCakeTable) {
    add(
      "food_drink", "Cake or dessert table: knife, server, small plates, and a stable surface out of direct sun and away from bump zones.", );
  }
  add(
    "food_drink", "Trash and recycling: lined bins next to food and drink with extras bags nearby before the first guest arrives.", );

  if (rainWorried) {
    add(
      "weather_lighting_power", "Rain plan: one sentence you can text guests (where to go, whether time moved). Draft it before the morning of.", );
  }
  if (evening) {
    add(
      "weather_lighting_power", "Path lighting: stake lights, lanterns, or string from parking to the tent. Guests should never step into black grass.", );
  }
  if (evening || foodServed || musicLikely) {
    add(
      "weather_lighting_power", "Extension cords: outdoor-rated, GFCI where required, taped flat across walks. Label which cord powers food vs. sound.", );
  }
  if (site.powerFarOrUnsure || (!setup.generatorPower && (evening || musicOn))) {
    add(
      "weather_lighting_power", "Power math: list what draws amps (chafers, fridge, speakers) and which outlet or generator leg each uses. No guessing on the day.", );
  }
  if (!setup.lighting && evening) {
    add(
      "weather_lighting_power", "Add temporary lights for food tables and the bar. Overhead patio floods alone often leave plates in shadow.", );
  }

  add("day_of_setup", "Name one day-of point person for vendors and deliveries. The host shouldn’t be the only contact on a dead battery.");
  add(
    "day_of_setup", "2 to 3 hours before guests: coolers in place, first ice in, water station filled, trash bags in bins, food holding plan ready.", );
  add("day_of_setup", "About 45 to 60 minutes before: sound check if you have music, quick photo spot check, trip-hazard sweep on paths.");
  if (musicLikely || setup.danceFloor) {
    add("day_of_setup", "Angle speakers away from neighbors; put dance floor or DJ between food and exits so lines don’t block escape routes.");
  }
  add(
    "day_of_setup", "Day-of kit in one tote: tape, scissors, stain pen, phone chargers, paper towels, and a printed copy of your run-of-show.", );

  add(
    "final_confirmation", "72 hours out: text or email vendors and key helpers with address, arrival window, and your cell. Confirm they reply once.", );
  add("final_confirmation", "Reconfirm headcount, surprise moments, and who introduces speeches or cuts the cake.");
  add("final_confirmation", "If weather or parking changed the plan, send one short group text the night before so no one shows to the wrong spot.");
  add("final_confirmation", "After the party: thank anyone who helped and jot one note on what to fix next time while it’s fresh.");

  const confirmedLabels: [keyof SetupConfirm, string][] = [
    ["tentOrCover", "Tent or covered area"], ["tables", "Tables"], ["chairs", "Chairs / seating"], ["buffetServing", "Buffet or serving tables"], ["dessertCakeTable", "Dessert or cake table"], ["barDrinkStation", "Bar or drink station"], ["musicSpeakerZone", "Music / speaker zone"], ["danceFloor", "Dance floor or dance space"], ["lighting", "Lighting beyond porch floods"], ["sidewalls", "Sidewalls or weather panels"], ["generatorPower", "Generator or power plan"], ["restroomPlan", "Restroom plan for crowd size"], ["parkingPlan", "Parking plan"], ["trashCleanup", "Trash & cleanup plan"], ];
  const confirmedItems: string[] = [];
  for (const [key, label] of confirmedLabels) {
    if (setup[key]) confirmedItems.push(label);
  }

  const stillToConfirm: string[] = [];
  const push = (s: string) => {
    if (!stillToConfirm.includes(s)) stillToConfirm.push(s);
  };
  if (!setup.tentOrCover) push("Cover or rain-backup plan");
  if (!setup.lighting && evening) push("Evening lighting for paths and gathering areas");
  if (!setup.sidewalls && rainWorried) push("Sidewalls or panels if weather is a worry");
  if (!setup.generatorPower && site.powerFarOrUnsure && (evening || musicOn || foodServed)) push("How you’ll power lights, food, or sound safely");
  if (!setup.restroomPlan && largerParty) push("Restrooms for headcount and duration");
  if (!setup.parkingPlan && largerParty) push("Parking flow and overflow");
  if (!setup.trashCleanup && foodServed) push("Trash and end-of-night cleanup");
  if (!setup.musicSpeakerZone && musicOn) push("Where music or announcements live");
  if (!stillToConfirm.length) {
    push("Nothing major missing from your setup check. Use the list below for last details.");
  }

  const forget: { text: string; w: number }[] = [
    { text: "Power washing house, driveway, and venue or yard space before guests arrive", w: 3 }, { text: "Extra ice, backup cooler, and ice scoop (separate drink ice from food ice)", w: foodServed || setup.barDrinkStation ? 3 : 2 }, { text: "Heavy trash bags and spare bin liners next to food and bar", w: foodServed ? 3 : 2 }, { text: "Bathroom paper, soap, and a small trash bin in each bath", w: largerParty ? 3 : 2 }, { text: "Parking overflow + quick neighbor heads-up", w: largerParty || backyard ? 3 : 1 }, { text: "Weather backup text for guests (group text or short link)", w: rainWorried ? 3 : 1 }, { text: "Pathway lighting after sunset", w: evening ? 3 : 1 }, { text: "Bug relief for dusk near lawn or trees", w: backyard ? 2 : 1 }, { text: "Vendor arrival window written down + who opens the gate", w: 3 }, { text: "Day-of phone that actually gets answered", w: 3 }, { text: "Outdoor-rated extension cords and cord covers", w: evening || musicLikely ? 3 : 2 }, ];
  if (kidsLikely(inp)) {
    forget.push({ text: "Kid-friendly drinks and a simple activity or safe corner", w: 3 });
  }
  forget.sort((a, b) => b.w - a.w);
  const thingsPeopleForget = forget.slice(0, 8).map((x) => x.text);

  const popularEnhancements: EnhancementItem[] = [];
  let ei = 0;
  const enh = (title: string, why: string, badge?: string) =>
    popularEnhancements.push({ id: `en-${ei++}`, title, why, badge });

  /* Party enhancements: always included (trending picks on checklist); vibe and setup still shape the list */
  if (evening || prefs.vibe === "make_special") {
    enh("Bistro or string lighting", "Warm, even light for paths and dining after dark.", "Great for evening events");
  }
  if (rainWorried) {
    enh("Clear sidewalls or window panels", "Weather buffer without blocking all light.", "Helpful upgrade");
  }
  if (largerParty || site.expectLotsOfMingling) {
    enh("Cocktail tables or highboys", "Somewhere to rest a drink when everyone’s standing.", "Popular choice");
  }
  if (site.powerFarOrUnsure || !setup.generatorPower) {
    enh("Generator consult", "Peace of mind when house circuits are already busy.", "Helpful upgrade");
  }
  if (music === "dj_or_live" || setup.musicSpeakerZone) {
    enh("DJ or band cover tent", "Keeps gear dry and defines the music zone.", "Great for backyard parties");
  }
  if (foodServed && prefs.vibe !== "keep_simple") {
    enh("Prep or satellite tent", "Staging for trays and backups away from the dance floor.", "Popular choice");
  }
  if (prefs.vibe === "make_special") {
    enh("Upgraded chairs", "More comfort for seated moments and photos.", "Helpful upgrade");
  }
  if (rainWorried || backyard) {
    enh("Marquee or walkway cover", "Dry feet from parking to the tent.", "Great for backyard parties");
  }
  if (popularEnhancements.length === 0) {
    enh("Pathway lanterns", "Small, affordable polish for arrivals.", "Easy win");
  }

  const funIdeas: FunIdeaItem[] = [];
  let fi = 0;
  const fun = (title: string, tags: string[]) => funIdeas.push({ id: `fun-${fi++}`, title, tags });

  if (prefs.wantFunIdeas) {
    fun("Lawn game corner", ["Easy win", "Great for backyard parties"]);
    fun("Photo backdrop or memory table", ["Guest favorite", "Great for milestones"]);
    if (evening) fun("Lanterns or café lights along the walk", ["Great for evening events", "Simple upgrade"]);
    if (foodServed || setup.buffetServing) fun("Signature drink or mocktail pitcher", ["Guest favorite"]);
    if (kidsLikely(inp)) fun("Kids’ snack or activity spot", ["Great for kids", "Easy win"]);
    if (prefs.vibe === "make_special") fun("Lounge corner with low tables", ["Polished feel", "Helpful upgrade"]);
    fun("Welcome sign with Wi-Fi and timeline", ["Easy win"]);
    if (setup.barDrinkStation) fun("Late-night snack or dessert to-go", ["Guest favorite"]);
  }

  const nextStepHints = [
    "Share this list with a co-host: split who owns timeline, food run-of-show, and bar/cooler refills.", "For tent size and counts, use the tent calculator and Quick Event Planner. This checklist is the week-of execution list.", "Ready to talk rentals or delivery windows? Call or request a quote when you’re ready.", ];

  return {
    headline, subhead, checklistByCategory, confirmedItems, stillToConfirm, thingsPeopleForget, popularEnhancements: popularEnhancements.slice(0, 8), funIdeas: funIdeas.slice(0, 8), nextStepHints, };
}

export function formatBackyardChecklistPlainText(_inp: BackyardChecklistInput, result: BackyardChecklistResult): string {
  const lines: string[] = [];
  lines.push(result.headline.toUpperCase());
  lines.push("");
  lines.push(result.subhead);
  lines.push("");
  lines.push("=== YOUR PARTY CHECKLIST ===");
  for (const cat of checklistCategoryOrder) {
    const items = result.checklistByCategory[cat];
    if (!items.length) continue;
    lines.push("");
    lines.push(checklistCategoryLabels[cat].toUpperCase());
    items.forEach((it) => lines.push(`☐ ${it.text}`));
  }
  lines.push("");
  lines.push("=== CONFIRMED ITEMS ===");
  result.confirmedItems.forEach((c) => lines.push(`✓ ${c}`));
  lines.push("");
  lines.push("=== STILL TO CONFIRM ===");
  result.stillToConfirm.forEach((c) => lines.push(`• ${c}`));
  lines.push("");
  lines.push("=== THINGS PEOPLE FORGET ===");
  result.thingsPeopleForget.forEach((c) => lines.push(`• ${c}`));
  lines.push("");
  lines.push("=== TRENDING PARTY ENHANCEMENTS ===");
  result.popularEnhancements.forEach((e) => lines.push(`• ${e.title}: ${e.why}`));
  lines.push("");
  lines.push("=== FUN IDEAS FOR YOUR EVENT ===");
  result.funIdeas.forEach((f) => lines.push(`• ${f.title} [${f.tags.join(", ")}]`));
  lines.push("");
  lines.push("=== NEXT STEPS ===");
  result.nextStepHints.forEach((n) => lines.push(`• ${n}`));
  return lines.join("\n");
}

function setupToBitString(s: SetupConfirm): string {
  return setupFieldOrder.map((k) => (s[k] ? "1" : "0")).join("");
}

function bitStringToSetup(bits: string): Partial<SetupConfirm> | null {
  if (bits.length !== 14) return null;
  const o: Partial<SetupConfirm> = {};
  setupFieldOrder.forEach((k, i) => {
    o[k] = bits[i] === "1";
  });
  return o;
}

/** Legacy 5-char pulse → rough setup */
function legacyPuToSetup(pu: string): Partial<SetupConfirm> {
  if (pu.length !== 5) return {};
  return {
    tentOrCover: pu[0] === "1", tables: pu[1] === "1", chairs: pu[1] === "1", buffetServing: pu[2] === "1", dessertCakeTable: pu[2] === "1", barDrinkStation: pu[3] === "1", musicSpeakerZone: pu[3] === "1", danceFloor: false, lighting: pu[4] === "1", sidewalls: pu[4] === "1", generatorPower: pu[4] === "1", restroomPlan: false, parkingPlan: true, trashCleanup: true, };
}

export function serializeChecklistInput(inp: BackyardChecklistInput): string {
  const p = new URLSearchParams();
  p.set("et", inp.eventType);
  p.set("gr", inp.guestRange);
  p.set("dp", inp.dayPart);
  p.set("vn", inp.venue);
  p.set("fd", inp.food);
  p.set("wx", inp.weatherConcern);
  p.set("tf", inp.timeframe);
  p.set("mu", inp.music);
  p.set("kd", inp.kids);
  p.set("st", setupToBitString(inp.setup));
  p.set(
    "sg", [inp.site.spaceTightOrTricky, inp.site.powerFarOrUnsure, inp.site.expectLotsOfMingling].map((x) => (x ? "1" : "0")).join(""), );
  const vibeCode = inp.prefs.vibe === "keep_simple" ? "0" : inp.prefs.vibe === "balanced" ? "1" : "2";
  p.set("pr", `${inp.prefs.wantEnhancementIdeas ? "1" : "0"}${inp.prefs.wantFunIdeas ? "1" : "0"}${vibeCode}`);
  p.set("v", "2");
  return p.toString();
}

export function parseChecklistSearchParams(search: string): BackyardChecklistInputPatch | null {
  try {
    const p = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    if (!p.has("et")) return null;
    const prStr = p.get("pr") ?? "110";
    const vibeN = prStr[2] ?? "1";
    const vibe = vibeN === "0" ? "keep_simple" : vibeN === "2" ? "make_special" : "balanced";
    const sg = p.get("sg") ?? "000";
    const st = p.get("st");
    const pu = p.get("pu");

    let setupPartial: Partial<SetupConfirm> = {};
    if (st && st.length === 14) {
      setupPartial = bitStringToSetup(st) ?? {};
    } else if (pu && pu.length === 5) {
      setupPartial = legacyPuToSetup(pu);
    }

    return {
      eventType: p.get("et") as PrivateEventType, guestRange: p.get("gr") as GuestRange, dayPart: p.get("dp") as DayPart, venue: p.get("vn") as VenueKind, food: p.get("fd") as FoodLevel, weatherConcern: p.get("wx") as WeatherConcernLevel, timeframe: (p.get("tf") as Timeframe) ?? undefined, music: (p.get("mu") as MusicPlan) ?? undefined, kids: (p.get("kd") as KidsLevel) ?? undefined, setup: setupPartial, site: {
        spaceTightOrTricky: sg[0] === "1", powerFarOrUnsure: sg[1] === "1", expectLotsOfMingling: sg[2] === "1", }, prefs: {
        wantEnhancementIdeas: prStr[0] === "1", wantFunIdeas: prStr[1] === "1", vibe, }, };
  } catch {
    return null;
  }
}

export function mergeParsedIntoDefault(parsed: BackyardChecklistInputPatch): BackyardChecklistInput {
  const d = defaultBackyardChecklistInput();
  return {
    ...d, ...parsed, setup: { ...d.setup, ...parsed.setup }, site: { ...d.site, ...parsed.site }, prefs: { ...d.prefs, ...parsed.prefs, wantEnhancementIdeas: true }, };
}
