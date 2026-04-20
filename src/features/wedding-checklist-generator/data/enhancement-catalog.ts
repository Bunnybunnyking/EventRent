import type { ContentContext } from "@/features/wedding-checklist/lib/content-context";
import type { EnhancementItem, WeddingMode } from "@/features/wedding-checklist/types";

type EnhRule = { item: EnhancementItem; score: (ctx: ContentContext) => number };

const catalog: EnhRule[] = [
  {
    item: {
      id: "bistro",
      title: "Layered bistro or café lighting",
      why: "Creates soft, even light for photos and helps guests feel oriented after sunset—without harsh flood glare.",
      badge: "Popular for evening weddings",
    },
    score: (ctx) => (ctx.evening || ctx.venue.afterDark) && !ctx.setup.lighting ? 95 : ctx.evening ? 40 : 0,
  },
  {
    item: {
      id: "path-lit",
      title: "Dedicated path lighting",
      why: "Guides guests safely between parking, ceremony, tent, and restrooms—especially when heels meet grass or gravel.",
      badge: "Guest comfort",
    },
    score: (ctx) =>
      (ctx.evening || ctx.venue.afterDark) && (ctx.venue.surface !== "hard" || ctx.venue.terrain === "uneven") ? 92 : ctx.evening ? 70 : 0,
  },
  {
    item: {
      id: "clear-walls",
      title: "Clear sidewall panels",
      why: "Buffers wind and light rain while keeping views—useful when weather is uncertain but you want an open feel.",
      badge: "Useful for weather backup",
    },
    score: (ctx) =>
      (ctx.wxMedium || ctx.wxHigh || ctx.venue.weatherBackupConcern) && !ctx.setup.sidewalls ? 93 : ctx.tentHeavy && !ctx.setup.sidewalls ? 75 : 0,
  },
  {
    item: {
      id: "flooring",
      title: "Strategic tent flooring or dance-floor island",
      why: "Stabilizes seating and dancing on soft or sloped ground—also kinder to heels and elderly guests.",
      badge: "Good for outdoor venues",
    },
    score: (ctx) =>
      ctx.venue.terrain === "uneven" || ctx.venue.surface === "grass" || !ctx.setup.flooring ? 88 : 0,
  },
  {
    item: {
      id: "generator",
      title: "Right-sized generator conversation (early)",
      why: "Prevents last-minute surprises when catering, entertainment, and tent lighting share the same load window.",
      badge: "Planner favorite",
    },
    score: (ctx) => (!ctx.venue.powerNearby || !ctx.setup.generatorPower ? 90 : 0) + (ctx.setup.music ? 5 : 0),
  },
  {
    item: {
      id: "cocktail-sat",
      title: "Satellite bar or expanded cocktail footprint",
      why: "Reduces bottlenecks during the ceremony-to-cocktail handoff—especially for mid-size and larger lists.",
      badge: "Guest comfort",
    },
    score: (ctx) => (ctx.guestsMid || ctx.guestsLarge) && ctx.setup.bar ? 82 : ctx.guestsLarge ? 70 : 0,
  },
  {
    item: {
      id: "lounge",
      title: "Small lounge vignette inside or just outside the tent",
      why: "Adds depth to the floor plan and gives guests a quieter pocket away from the band.",
      badge: "Helpful upgrade",
    },
    score: (ctx) =>
      ctx.priorities.includes("polished_tent") || ctx.formal || ctx.privateEstate ? 85 : ctx.classic ? 55 : 0,
  },
  {
    item: {
      id: "marquee",
      title: "Marquee walkway or covered connector",
      why: "Smooths transitions if weather shifts—or if guests move between indoor and outdoor zones.",
      badge: "Good for mixed indoor/outdoor",
    },
    score: (ctx) => (ctx.mixedIndoorOutdoor || ctx.venue.weatherBackupConcern ? 87 : 0) + (ctx.wxHigh ? 8 : 0),
  },
  {
    item: {
      id: "prep-tent",
      title: "Catering prep tent or enclosed staging",
      why: "Keeps trays, racks, and hot boxes under cover when the walk from kitchen to tent is long or exposed.",
      badge: "Planner favorite",
    },
    score: (ctx) => (ctx.setup.cateringPrepArea && ctx.tentHeavy ? 84 : 0) + (ctx.guestsLarge ? 6 : 0),
  },
  {
    item: {
      id: "restroom-trailer",
      title: "Restroom trailer or comfort-station upgrade",
      why: "Improves lines and comfort for larger counts or estate settings where indoor restrooms are distant.",
      badge: "Guest comfort",
    },
    score: (ctx) => (ctx.guestsLarge || !ctx.setup.restrooms ? 86 : 0) + (ctx.privateEstate ? 5 : 0),
  },
  {
    item: {
      id: "ceremony-shade",
      title: "Ceremony shade or umbrella plan (daytime)",
      why: "Keeps the wedding party and front rows comfortable—and photos more predictable in harsh sun.",
      badge: "Good for outdoor venues",
    },
    score: (ctx) => ctx.day && ctx.bothCeremonyReception ? 80 : 0,
  },
  {
    item: {
      id: "heat-cool",
      title: "Targeted heating or cooling inside the tent",
      why: "Makes the tent feel intentional when temperatures swing—guests stay longer and dance more comfortably.",
      badge: "Guest comfort",
    },
    score: (ctx) => ctx.tentHeavy && (ctx.wxMedium || ctx.wxHigh || ctx.venue.guestComfortConcern) ? 78 : 0,
  },
];

export function selectEnhancements(ctx: ContentContext, mode: WeddingMode): EnhancementItem[] {
  const cap = mode === "quick" ? 5 : 9;
  const ranked = catalog
    .map((c) => ({ item: c.item, s: c.score(ctx) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  const out: EnhancementItem[] = [];
  const ids = new Set<string>();
  for (const { item } of ranked) {
    if (ids.has(item.id)) continue;
    ids.add(item.id);
    out.push(item);
    if (out.length >= cap) break;
  }
  return out;
}
