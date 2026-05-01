import type {
  EventTypeOption,
  IndoorOutdoorOption,
  RentalNeedOption,
  SeatingStyleOption,
} from "./types";

export const EVENT_TYPE_OPTIONS: EventTypeOption[] = [
  "Wedding",
  "Graduation",
  "Birthday",
  "Backyard Party",
  "Corporate Event",
  "Fundraiser",
  "Festival",
  "Other",
];

export const INDOOR_OUTDOOR_OPTIONS: IndoorOutdoorOption[] = ["Indoor", "Outdoor", "Mixed"];

export const SEATING_STYLE_OPTIONS: SeatingStyleOption[] = [
  "Seated dinner",
  "Cocktail style",
  "Ceremony only",
  "Mixed layout",
  "Not sure yet",
];

export const RENTAL_NEED_OPTIONS: RentalNeedOption[] = [
  "Tent",
  "Tables",
  "Chairs",
  "Linens",
  "Dance floor",
  "Lighting",
  "Restroom trailer",
  "Heating",
  "Not sure yet",
];
