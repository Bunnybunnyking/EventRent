/** Wizard & generator domain types for Party Spark Generator */

export type FlowMode = "know" | "surprise";

export type EventPlanOption =
  | "Graduation Party"
  | "Birthday Party"
  | "Backyard Party"
  | "Baby Shower"
  | "Bridal Shower"
  | "Wedding Shower"
  | "Game Night"
  | "Pizza Night"
  | "Cookout"
  | "Corporate Event"
  | "School Event"
  | "Surprise Me";

export type AudienceOption = "Family" | "Friends" | "Kids" | "Adults" | "Coworkers" | "Mixed Crowd";

export type VibeOption =
  | "Family-Friendly"
  | "Classy"
  | "Fun"
  | "Chill"
  | "Bold"
  | "Playful Adults-Only";

export type GuestBandOption = "5–10" | "10–20" | "20–40" | "40–60" | "60–80" | "100+";

export interface PartySparkInputs {
  flowMode: FlowMode;
  eventPlan: EventPlanOption | null;
  audience: AudienceOption | null;
  /** Defaults to Family-Friendly in UI */
  vibe: VibeOption;
  /** Honoree — full name, “Class of …”, etc. */
  whoFor: string;
  nickname: string;
  town: string;
  school: string;
  classYear: string;
  /** Color, season, theme word — optional */
  themeKeyword: string;
  /** Legacy catch-all; merged with structured fields in generator */
  keywords: string;
  guestBand: GuestBandOption | null;
}

export type ResultBadge =
  | "Best Fit"
  | "Most Fun"
  | "Family Pick"
  | "Classy Pick"
  | "Weekend Wild Card"
  | "Easy at Home";

export interface PartySparkCard {
  badge: ResultBadge;
  partyName: string;
  /** Short label for UI (e.g. “Weekend Idea”, “Corporate”) */
  eventTypeLabel: string;
  /** Same as tone selector — Family-Friendly, Classy, … */
  vibeLabel: string;
  audienceLabel: string;
  /** “Graduation · Summer · Hartford” style hook */
  contextLine: string;
  guestCountLabel: string;
  shortTeaser: string;
  whyItWorks: string;
  /** Who / situation this name shines for */
  bestFor: string;
  inviteLine: string;
  setupIdea: string;
  hashtag: string;
  /** Human-readable theme title (derived from inputs + generated name) */
  themeName: string;
  /** One-line “theme” hook for the party look & feel */
  themeLine: string;
  /** 2–3 short labels for the mood strip (chips) */
  moodChips: string[];
  /** 3–4 concrete “try this” ideas for the host */
  playbook: string[];
  /** Decor / music / energy — one line */
  visualMood: string;
}

export type RefinementIntent =
  | "shuffle"
  | "funnier"
  | "classier"
  | "family"
  | "local"
  | "lastMinute"
  | "simple"
  | "adultsPlayful";
