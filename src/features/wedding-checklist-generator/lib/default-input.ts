import type { WeddingChecklistFormState } from "@/features/wedding-checklist/types";

export function defaultWeddingChecklistForm(): WeddingChecklistFormState {
  return {
    mode: null,
    basics: {
      timeframeKind: "season_month",
      ceremonyScope: "both",
      guestRange: "75_150",
      venueType: "outdoor_venue",
      dayPart: "evening",
      formality: "classic",
      plannerInvolved: false,
      weatherConcern: "medium",
    },
    setup: {
      ceremonySeating: true,
      cocktailArea: true,
      tentedReception: true,
      danceFloor: true,
      bar: true,
      cateringPrepArea: true,
      music: true,
      lighting: true,
      sidewalls: false,
      flooring: false,
      restrooms: true,
      generatorPower: false,
      parkingShuttle: true,
    },
    venue: {
      surface: "grass",
      terrain: "flat",
      accessLimitations: false,
      powerNearby: true,
      parkingLimitations: false,
      venueRestrictions: false,
      weatherBackupConcern: true,
      guestComfortConcern: false,
      loadInConcern: false,
      afterDark: true,
    },
    priorities: ["guest_comfort", "prepare_weather", "avoid_last_minute"],
  };
}
