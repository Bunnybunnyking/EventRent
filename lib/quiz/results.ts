import type { PersonalityId } from "./types";

export type PersonalityResultCopy = {
  title: string;
  roast: string;
};

export const PERSONALITY_RESULTS: Record<PersonalityId, PersonalityResultCopy> = {
  chaos_coordinator: {
    title: "The Chaos Coordinator",
    roast:
      "You are not throwing a party. You are managing a temporary outdoor venue with snacks, cousins, coolers, and at least one person asking where the extra chairs are.",
  },
  weather_worrier: {
    title: "The Weather Worrier",
    roast:
      "You do not trust clouds, forecasts, or outdoor events without a backup plan. Honestly, smart.",
  },
  backyard_bro: {
    title: "The Backyard Bro",
    roast:
      "You want music, food, games, drinks, and people staying later than planned. Seating chart? Optional. Fun? Mandatory.",
  },
  pinterest_drill_sergeant: {
    title: "The Pinterest Drill Sergeant",
    roast:
      "You have screenshots, a vision, and strong opinions about lighting. The setup must look effortless, which somehow requires intense effort.",
  },
  last_minute_magician: {
    title: "The Last-Minute Magician",
    roast:
      "You did not procrastinate. You created urgency with confidence.",
  },
  food_first_host: {
    title: "The Food-First Hostess / Host",
    roast:
      "You understand the truth: people remember the food table, the seating, and whether they had somewhere to put their plate.",
  },
  guest_list_criminal: {
    title: "The Guest List Criminal",
    roast:
      "You invited with your heart, not your yard size. Respectfully, your backyard is now under pressure.",
  },
  casual_liar: {
    title: "The ‘It’s Casual’ Liar",
    roast:
      "You said casual, then asked about lighting, linens, a photo area, and maybe a dance floor.",
  },
  chair_shortage_menace: {
    title: "The Chair Shortage Menace",
    roast:
      "You thought people would mingle. They thought they would sit. This is how rebellions start.",
  },
  family_group_chat_survivor: {
    title: "The Family Group Chat Survivor",
    roast:
      "You are not planning a party. You are managing opinions, side comments, surprise plus-ones, and three people asking the same question.",
  },
};

export function getPersonalityCopy(id: PersonalityId): PersonalityResultCopy {
  return PERSONALITY_RESULTS[id];
}
