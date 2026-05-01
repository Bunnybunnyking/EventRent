import type { WeddingChecklistFormState } from "@/features/wedding-checklist/types";

export const setupLabels: Record<keyof WeddingChecklistFormState["setup"], string> = {
  ceremonySeating: "Ceremony seating plan", cocktailArea: "Cocktail hour area", tentedReception: "Tented reception space", danceFloor: "Dance floor", bar: "Bar service / station", cateringPrepArea: "Catering prep or staging area", music: "Music (DJ, band, or ceremony sound)", lighting: "Lighting beyond daylight (bistro, uplighting, tent washes)", sidewalls: "Sidewalls / weather panels", flooring: "Tent flooring or walkway comfort", restrooms: "Restroom plan for guest count", generatorPower: "Generator or confirmed adequate power", parkingShuttle: "Parking, shuttle, or arrival flow", };
