import type { ContentContext } from "@/features/wedding-checklist/lib/content-context";
import { pickVariant } from "@/features/wedding-checklist/lib/hash-variant";
import type { WeddingChecklistCopyLeads } from "@/features/wedding-checklist/types";

function guestPhrase(ctx: ContentContext): string {
  if (ctx.guestsUnder75) return "an intimate guest list";
  if (ctx.guestsMid) return "a mid-size guest list";
  return "a larger guest list";
}

function venuePhrase(ctx: ContentContext): string {
  if (ctx.backyard) return "a backyard celebration";
  if (ctx.privateEstate) return "a private estate wedding";
  if (ctx.outdoorVenue) return "an outdoor-focused venue";
  if (ctx.mixedIndoorOutdoor) return "mixed indoor and outdoor spaces";
  return "a tented reception forward plan";
}

export function buildHeadline(ctx: ContentContext): string {
  if (ctx.mode === "quick") {
    const variants = [
      "Outdoor & tent essentials checklist", "Your streamlined outdoor wedding checklist", "Tent, weather & flow, your essentials list", ];
    return pickVariant(variants, `${ctx.variantSeed}-h`);
  }
  const variants = [
    "Your outdoor & tented wedding checklist", "A full readiness checklist for tent and lawn celebrations", "Timeline, site & vendors, built for outdoor weddings", ];
  return pickVariant(variants, `${ctx.variantSeed}-hf`);
}

export function buildSubhead(ctx: ContentContext): string {
  const venue = venuePhrase(ctx);
  const guests = guestPhrase(ctx);
  let scope = "";
  if (ctx.ceremonyOnly) {
    scope = " With a ceremony-forward plan, we’ve weighted site lines, guest flow, and audio clarity.";
  } else if (ctx.receptionOnly) {
    scope = " With a reception-focused plan, we’ve emphasized tent, service flow, and guest comfort through the night.";
  } else if (ctx.bothCeremonyReception && ctx.mixedIndoorOutdoor) {
    scope =
      " Because you’re moving guests between indoor and outdoor zones, we’ve emphasized transitions and weather clarity.";
  } else if (ctx.bothCeremonyReception) {
    scope =
      " With ceremony and reception in the picture, we’ve emphasized transitions, weather backup, and timing.";
  }

  const eveningNote =
    ctx.evening || ctx.venue.afterDark
      ? " Evening guest flow means lighting, paths, and power deserve extra attention."
      : " Daytime outdoor flow means shade, hydration, and ceremony sightlines deserve extra attention.";

  const wxNote =
    ctx.wxHigh || ctx.venue.weatherBackupConcern
      ? " Given weather on your mind, tent and backup decisions are surfaced more prominently."
      : ctx.wxLow
        ? ""
        : " We’ve balanced weather-aware items with the rest of your plan.";

  const modeNote =
    ctx.mode === "quick"
      ? " This path keeps the main list shorter and centered on tent, weather, and guest flow."
      : " This path layers in timeline, vendor, and rental prompts, still written for outdoor and tented days.";

  const base = `Tailored for ${venue} with ${guests}.${eveningNote}${wxNote} ${scope}`.replace(/\s+/g, " ").trim();

  const disclaimer =
    ctx.mode === "quick"
      ? " A readiness map, pair with tent sizing and layout tools when you’re ready for numbers."
      : " A readiness map, use tent and inventory tools when you need square footage and counts.";

  return `${base}${modeNote}${disclaimer}`;
}

export function buildCopyLeads(ctx: ContentContext): WeddingChecklistCopyLeads {
  const tfForget = pickVariant(
    [
      "Easy-to-miss details that often surface a week (or a day) before the wedding:", "Practical reminders couples and planners double-check close to the date:", "Small logistics that make a big difference when you’re outdoors or under tent:", ], `${ctx.variantSeed}-tf`, );

  const tfEnh = pickVariant(
    [
      "Thoughtful upgrades that often improve comfort and photos, none are required:", "Optional upgrades that tend to pair well with your selections:", "Polish and comfort ideas that match outdoor and tented receptions:", ], `${ctx.variantSeed}-en`, );

  const tfGuest = pickVariant(
    [
      "Warm touches guests tend to remember, pick what fits your vibe:", "A few guest-forward ideas that work well with outdoor flow:", "Small experience upgrades that pair naturally with tent and lawn settings:", ], `${ctx.variantSeed}-gi`, );

  return {
    thingsForget: tfForget, enhancements: tfEnh, guestIdeas: tfGuest, };
}
