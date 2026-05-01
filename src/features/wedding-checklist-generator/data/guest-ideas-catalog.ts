import type { ContentContext } from "@/features/wedding-checklist/lib/content-context";
import type { GuestExperienceIdea, WeddingMode } from "@/features/wedding-checklist/types";

type IdeaRule = { idea: GuestExperienceIdea; score: (ctx: ContentContext) => number };

const rules: IdeaRule[] = [
  {
    idea: {
      id: "welcome-drink", title: "Welcome drink station near arrival", note: "Smooths early crowding and sets tone before guests reach the tent.", }, score: (ctx) => (ctx.outdoorVenue || ctx.backyard ? 80 : 60) + (ctx.guestsLarge ? 8 : 0), }, {
    idea: {
      id: "lounge", title: "Quiet lounge pocket with soft seating", note: "Gives guests a place to chat away from the band, especially nice for estates.", }, score: (ctx) => (ctx.formal || ctx.privateEstate ? 78 : 50) + (ctx.priorities.includes("polished_tent") ? 10 : 0), }, {
    idea: {
      id: "comfort-basket", title: "Seasonal comfort basket (wraps, fans, or sunscreen)", note: "Small touch that reads thoughtful for outdoor timelines.", }, score: (ctx) =>
      ctx.wxMedium || ctx.wxHigh || ctx.outdoorVenue || ctx.backyard ? 82 : ctx.day ? 70 : 45, }, {
    idea: {
      id: "photo-moment", title: "Simple photo moment with soft light", note: "Even a modest backdrop elevates guest candids in tent settings.", }, score: (ctx) => (ctx.evening ? 75 : 65) + (ctx.setup.lighting ? 5 : 0), }, {
    idea: {
      id: "espresso", title: "Espresso or dessert coffee moment", note: "Pairs naturally with evening tent receptions and cake timing.", }, score: (ctx) => (ctx.setup.bar ? 72 : 40) + (ctx.evening ? 10 : 0), }, {
    idea: {
      id: "late-snack", title: "Late-night snack or savory bite", note: "High impact after dancing, especially with open-air departures.", }, score: (ctx) => (ctx.evening && ctx.setup.danceFloor ? 78 : 0) + (ctx.guestsMid || ctx.guestsLarge ? 5 : 0), }, {
    idea: {
      id: "kids", title: "Kids’ corner with activities (if children attend)", note: "Keeps parents relaxed during cocktail and speeches.", }, score: (ctx) => (ctx.guestsLarge ? 55 : 35), }, {
    idea: {
      id: "memory", title: "Memory or guestbook table with clear signage", note: "Helps flow when guests arrive from mixed parking or shuttles.", }, score: (ctx) => 60 + (ctx.mixedIndoorOutdoor ? 10 : 0), }, {
    idea: {
      id: "transition-signs", title: "Elegant wayfinding between ceremony, cocktail, and tent", note: "Especially helpful for mixed indoor/outdoor venues and large sites.", }, score: (ctx) => (ctx.mixedIndoorOutdoor || ctx.privateEstate ? 76 : 45) + (ctx.guestsLarge ? 8 : 0), }, ];

export function selectGuestIdeas(ctx: ContentContext, mode: WeddingMode): GuestExperienceIdea[] {
  const cap = mode === "quick" ? 4 : 7;
  const ranked = rules
    .map((r) => ({ idea: r.idea, s: r.score(ctx) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  return ranked.slice(0, cap).map((x) => x.idea);
}
