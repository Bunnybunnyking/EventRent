/**
 * V1 persistence: JSON file under `data/rsvp-events.json`.
 *
 * Primary persistence when Supabase env vars are **not** set: see `lib/rsvp/persistence.ts`
 * and `supabase/migrations/20260224120000_rsvp_planner.sql` for the hosted database path.
 *
 * Note: ephemeral filesystems (e.g. some serverless hosts) will not retain this file
 * between deploys or instances; use a real database before relying on this in prod.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { RsvpDatabaseFile, StoredEventRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "rsvp-events.json");

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function emptyDb(): RsvpDatabaseFile {
  return { version: 1, events: [] };
}

export function readDb(): RsvpDatabaseFile {
  try {
    const raw = readFileSync(DB_PATH, "utf8");
    const parsed = JSON.parse(raw) as RsvpDatabaseFile;
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.events)) {
      return emptyDb();
    }
    return parsed;
  } catch {
    return emptyDb();
  }
}

export function writeDb(db: RsvpDatabaseFile): void {
  ensureDataDir();
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export function listAllEvents(): StoredEventRecord[] {
  return readDb().events;
}

export function findEventBySlug(slug: string): StoredEventRecord | undefined {
  return readDb().events.find((e) => e.slug === slug);
}

export function slugExists(slug: string): boolean {
  return findEventBySlug(slug) !== undefined;
}

export function upsertEvent(record: StoredEventRecord): void {
  const db = readDb();
  const idx = db.events.findIndex((e) => e.id === record.id);
  if (idx === -1) {
    db.events.push(record);
  } else {
    db.events[idx] = record;
  }
  writeDb(db);
}

export function updateEventBySlug(
  slug: string,
  mutate: (ev: StoredEventRecord) => StoredEventRecord,
): StoredEventRecord | undefined {
  const db = readDb();
  const idx = db.events.findIndex((e) => e.slug === slug);
  if (idx === -1) return undefined;
  const next = mutate(db.events[idx]);
  db.events[idx] = next;
  writeDb(db);
  return next;
}
