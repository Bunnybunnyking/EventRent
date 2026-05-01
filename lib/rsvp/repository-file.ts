import type { RsvpRepository } from "./repository-types";
import type { RsvpGuest, StoredEventRecord } from "./types";
import {
  findEventBySlug as findFile,
  listAllEvents as listFile,
  slugExists as slugExistsFile,
  updateEventBySlug as updateFile,
  upsertEvent,
} from "./store";

function normalizeGuest(g: RsvpGuest): RsvpGuest {
  return {
    ...g,
    guestEmail: g.guestEmail?.trim() ?? "",
    guestPhone: g.guestPhone?.trim() ?? "",
  };
}

function normalizeRecord(ev: StoredEventRecord): StoredEventRecord {
  return {
    ...ev,
    optionalAddition: ev.optionalAddition ?? null,
    rsvps: ev.rsvps.map(normalizeGuest),
  };
}

export const fileRepository: RsvpRepository = {
  async findEventBySlug(slug) {
    const ev = findFile(slug);
    return ev ? normalizeRecord(ev) : undefined;
  },
  async slugExists(slug) {
    return slugExistsFile(slug);
  },
  async saveNewEvent(record) {
    upsertEvent(normalizeRecord(record));
  },
  async updateEventBySlug(slug, mutate) {
    const current = findFile(slug);
    if (!current) return undefined;
    const next = mutate(normalizeRecord(current));
    upsertEvent(normalizeRecord(next));
    return normalizeRecord(next);
  },
  async listAllEventsSorted() {
    return listFile()
      .map(normalizeRecord)
      .slice()
      .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  },
  async appendGuest(slug, guest) {
    const current = findFile(slug);
    if (!current) throw new Error(`appendGuest: missing event ${slug}`);
    const normalized = normalizeRecord(current);
    upsertEvent(normalizeRecord({ ...normalized, rsvps: [...normalized.rsvps, normalizeGuest(guest)] }));
  },
};
