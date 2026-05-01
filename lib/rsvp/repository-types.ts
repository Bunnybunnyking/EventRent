import type { StoredEventRecord } from "./types";

/** Persistence layer for RSVP planner (Supabase in prod, JSON file fallback in dev). */
export type RsvpRepository = {
  findEventBySlug(slug: string): Promise<StoredEventRecord | undefined>;
  slugExists(slug: string): Promise<boolean>;
  /** Insert a new event (rsvps array ignored or must be empty). */
  saveNewEvent(record: StoredEventRecord): Promise<void>;
  updateEventBySlug(slug: string, mutate: (ev: StoredEventRecord) => StoredEventRecord): Promise<StoredEventRecord | undefined>;
  listAllEventsSorted(): Promise<StoredEventRecord[]>;
  appendGuest(slug: string, guest: StoredEventRecord["rsvps"][number]): Promise<void>;
};
