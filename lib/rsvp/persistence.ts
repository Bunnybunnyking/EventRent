import type { RsvpRepository } from "./repository-types";
import { fileRepository } from "./repository-file";
import { getSupabaseRsvpRepository } from "./repository-supabase";

/**
 * Prefer Supabase when `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are set;
 * otherwise fall back to the local JSON file store (`data/rsvp-events.json`).
 */
export function getRsvpRepository(): RsvpRepository {
  return getSupabaseRsvpRepository() ?? fileRepository;
}
