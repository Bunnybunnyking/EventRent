import type { ContentContext } from "@/features/wedding-checklist/lib/content-context";
import type { WeddingMode } from "@/features/wedding-checklist/types";

export type ForgetRule = {
  id: string;
  text: string;
  /** Higher = more likely to appear when multiple match */
  weight: number;
  when: (ctx: ContentContext, mode: WeddingMode) => boolean;
};

export const THINGS_FORGET_RULES: ForgetRule[] = [
  {
    id: "wx-deadline", text: "A written weather decision deadline and a single point person for the call (not a group chat).", weight: 95, when: (ctx) => ctx.wxMedium || ctx.wxHigh || ctx.venue.weatherBackupConcern || !ctx.setup.sidewalls, }, {
    id: "sidewall-timing", text: "Sidewall deployment timing, when panels go up vs. when wind typically picks up on your site.", weight: 88, when: (ctx) => ctx.tentHeavy || ctx.setup.tentedReception, }, {
    id: "path-light", text: "Path lighting from parking to tent, bar, and restrooms, especially where cords could trip guests.", weight: 90, when: (ctx) => ctx.evening || ctx.venue.afterDark, }, {
    id: "gen-load", text: "Generator load math with catering, band/DJ, and lighting stacked, not a last-minute guess.", weight: 85, when: (ctx) => !ctx.setup.generatorPower || !ctx.venue.powerNearby || ctx.setup.music, }, {
    id: "cable-ramps", text: "Cable ramps or covers on any crosswalks guests will use after dark.", weight: 82, when: (ctx) => (ctx.evening || ctx.venue.afterDark) && (ctx.setup.generatorPower || !ctx.venue.powerNearby), }, {
    id: "noise-curfew", text: "Noise curfew and hard cut-off time, shared with DJ/band and catering for a clean wind-down.", weight: 80, when: (ctx) => ctx.backyard || ctx.venue.venueRestrictions || ctx.privateEstate, }, {
    id: "neighbor-parking", text: "Neighbor heads-up for parking overflow or shuttle staging (if streets are tight).", weight: 78, when: (ctx) => ctx.backyard || ctx.venue.parkingLimitations, }, {
    id: "restroom-peak", text: "Restroom throughput at cocktail and post-ceremony peaks, not just average count.", weight: 88, when: (ctx) => ctx.guestsLarge || ctx.guestsMid || !ctx.setup.restrooms, }, {
    id: "shuttle-sync", text: "Shuttle timing synced to ceremony end and late-night departures (if guests drink).", weight: 75, when: (ctx) => ctx.setup.parkingShuttle || ctx.venue.parkingLimitations, }, {
    id: "vendor-staging", text: "Where each vendor truck stages and in what order, especially if the drive is narrow.", weight: 84, when: (ctx) => ctx.venue.accessLimitations || ctx.venue.loadInConcern, }, {
    id: "flip-window", text: "Catering prep or staging tent proximity if the kitchen path is long or weather-exposed.", weight: 80, when: (ctx) => ctx.setup.cateringPrepArea || ctx.tentHeavy, }, {
    id: "ceremony-cocktail", text: "Ceremony-to-cocktail movement: who cues guests, and what happens if weather shifts mid-flip.", weight: 86, when: (ctx) => ctx.bothCeremonyReception || ctx.ceremonyOnly, }, {
    id: "heel-paths", text: "Heel-friendly paths or flooring cues for lawn, gravel, or uneven transitions.", weight: 78, when: (ctx) => ctx.venue.surface !== "hard" || ctx.venue.terrain === "uneven" || !ctx.setup.flooring, }, {
    id: "bug-comfort", text: "Seasonal bug plan for ceremony and dinner (repellent station, fans, or timing tweaks).", weight: 70, when: (ctx) => ctx.backyard || ctx.outdoorVenue || ctx.privateEstate, }, {
    id: "dayof-tree", text: "Day-of communication tree: who answers vendor questions, family questions, and weather calls.", weight: 80, when: (ctx) => ctx.plannerInvolved || ctx.guestsLarge, }, {
    id: "photo-tent", text: "Photo timeline vs. tent readiness, avoid guests seated before the space is guest-safe.", weight: 72, when: (ctx) => ctx.mode === "full", }, {
    id: "escort-rain", text: "Escort plan for elderly guests or kids if weather forces a sudden route change.", weight: 76, when: (ctx) => ctx.wxHigh || ctx.venue.weatherBackupConcern || ctx.mixedIndoorOutdoor, }, {
    id: "water-stations", text: "Water stations for daytime heat and late-night dancing, especially outdoors.", weight: 68, when: (ctx) => ctx.day || ctx.setup.bar, }, {
    id: "sparkler-exit", text: "If you’re doing a sparkler or send-off outdoors, confirm venue rules and wind safety.", weight: 65, when: (ctx) => ctx.evening && (ctx.outdoorVenue || ctx.privateEstate), }, {
    id: "week-walk", text: "Week-of walk-through with tent lead and catering captain on the same path guests will walk.", weight: 90, when: (ctx) => ctx.mode === "full", }, {
    id: "quick-rain", text: "Rain threshold: at what point do you deploy sidewalls vs. move guests, written down.", weight: 92, when: (ctx, mode) => mode === "quick" && (ctx.wxMedium || ctx.wxHigh), }, {
    id: "quick-power", text: "One-line power diagram: where power enters, where it splits, and who owns each distro.", weight: 88, when: (ctx, mode) => mode === "quick" && (!ctx.venue.powerNearby || !ctx.setup.generatorPower), }, ];

export function selectThingsForget(ctx: ContentContext, mode: WeddingMode) {
  const cap = mode === "full" ? 18 : 12;
  const scored = THINGS_FORGET_RULES.filter((r) => r.when(ctx, mode))
    .map((r) => ({ r, score: r.weight + (stableTie(r.id, ctx.variantSeed) % 7) }))
    .sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const { r } of scored) {
    if (seen.has(r.text)) continue;
    seen.add(r.text);
    out.push(r.text);
    if (out.length >= cap) break;
  }
  return out;
}

function stableTie(id: string, seed: string): number {
  let h = 0;
  const s = id + seed;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
