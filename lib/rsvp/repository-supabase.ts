import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { RsvpRepository } from "./repository-types";
import type {
  EventTypeOption,
  GuestSeatingNeed,
  IndoorOutdoorOption,
  RentalNeedOption,
  RsvpEvent,
  RsvpGuest,
  RsvpGuestStatus,
  SeatingStyleOption,
  StoredEventRecord,
} from "./types";

function isConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw new Error("Supabase RSVP client requested without NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}

type EventRow = {
  id: string;
  slug: string;
  host_token: string;
  host_name: string;
  email: string;
  phone: string;
  event_name: string;
  event_type: string;
  event_date: string;
  location: string;
  estimated_guest_count: number;
  indoor_outdoor: string;
  seating_style: string;
  rental_needs: RentalNeedOption[];
  optional_addition: string | null;
  host_message: string;
  quote_update_requested: boolean;
  quote_update_resolved: boolean;
  created_at: string;
};

type GuestRow = {
  id: string;
  event_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  status: string;
  party_size: number;
  adults: number;
  kids: number;
  needs_seat: string;
  meal_choice: string;
  notes: string;
  created_at: string;
};

function rowToEvent(row: EventRow, guests: GuestRow[]): StoredEventRecord {
  const ev: RsvpEvent = {
    id: row.id,
    slug: row.slug,
    hostToken: row.host_token,
    hostName: row.host_name,
    email: row.email,
    phone: row.phone,
    eventName: row.event_name,
    eventType: row.event_type as EventTypeOption,
    eventDate: row.event_date.slice(0, 10),
    location: row.location,
    estimatedGuestCount: row.estimated_guest_count,
    indoorOutdoor: row.indoor_outdoor as IndoorOutdoorOption,
    seatingStyle: row.seating_style as SeatingStyleOption,
    rentalNeeds: Array.isArray(row.rental_needs) ? row.rental_needs : [],
    optionalAddition: (row.optional_addition as RentalNeedOption | null) ?? null,
    hostMessage: row.host_message ?? "",
    quoteUpdateRequested: row.quote_update_requested,
    quoteUpdateResolved: row.quote_update_resolved,
    createdAt: row.created_at,
  };
  const rsvps: RsvpGuest[] = guests.map((g) => ({
    id: g.id,
    eventId: g.event_id,
    guestName: g.guest_name,
    guestEmail: g.guest_email ?? "",
    guestPhone: g.guest_phone ?? "",
    status: g.status as RsvpGuestStatus,
    partySize: g.party_size,
    adults: g.adults,
    kids: g.kids,
    needsSeat: g.needs_seat as GuestSeatingNeed,
    mealChoice: g.meal_choice ?? "",
    notes: g.notes ?? "",
    createdAt: g.created_at,
  }));
  return { ...ev, rsvps };
}

function eventPayload(ev: RsvpEvent): Record<string, unknown> {
  return {
    id: ev.id,
    slug: ev.slug,
    host_token: ev.hostToken,
    host_name: ev.hostName,
    email: ev.email,
    phone: ev.phone,
    event_name: ev.eventName,
    event_type: ev.eventType,
    event_date: ev.eventDate,
    location: ev.location,
    estimated_guest_count: ev.estimatedGuestCount,
    indoor_outdoor: ev.indoorOutdoor,
    seating_style: ev.seatingStyle,
    rental_needs: ev.rentalNeeds,
    optional_addition: ev.optionalAddition,
    host_message: ev.hostMessage,
    quote_update_requested: ev.quoteUpdateRequested,
    quote_update_resolved: ev.quoteUpdateResolved,
    created_at: ev.createdAt,
  };
}

function makeRepository(): RsvpRepository {
  const sb = () => getClient();

  const repo: RsvpRepository = {
    async findEventBySlug(slug) {
      const { data: row, error } = await sb().from("rsvp_events").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (!row) return undefined;
      const e = row as EventRow;
      const { data: guestRows, error: gErr } = await sb().from("rsvp_guests").select("*").eq("event_id", e.id).order("created_at");
      if (gErr) throw gErr;
      return rowToEvent(e, (guestRows ?? []) as GuestRow[]);
    },
    async slugExists(slug) {
      const { count, error } = await sb().from("rsvp_events").select("id", { count: "exact", head: true }).eq("slug", slug);
      if (error) throw error;
      return (count ?? 0) > 0;
    },
    async saveNewEvent(record) {
      const { rsvps: _r, ...ev } = record;
      void _r;
      const { error } = await sb().from("rsvp_events").insert(eventPayload(ev));
      if (error) throw error;
    },
    async updateEventBySlug(slug, mutate) {
      const current = await repo.findEventBySlug(slug);
      if (!current) return undefined;
      const next = mutate(current);
      const { rsvps: _r, ...ev } = next;
      void _r;
      const { error } = await sb().from("rsvp_events").update(eventPayload(ev)).eq("slug", slug);
      if (error) throw error;
      return next;
    },
    async listAllEventsSorted() {
      const { data: rows, error } = await sb().from("rsvp_events").select("*").order("event_date", { ascending: true });
      if (error) throw error;
      const events = (rows ?? []) as EventRow[];
      if (events.length === 0) return [];
      const ids = events.map((e) => e.id);
      const { data: guestRows, error: gErr } = await sb().from("rsvp_guests").select("*").in("event_id", ids);
      if (gErr) throw gErr;
      const guests = (guestRows ?? []) as GuestRow[];
      const byEvent = new Map<string, GuestRow[]>();
      for (const g of guests) {
        const list = byEvent.get(g.event_id) ?? [];
        list.push(g);
        byEvent.set(g.event_id, list);
      }
      return events.map((e) => rowToEvent(e, byEvent.get(e.id) ?? []));
    },
    async appendGuest(slug, guest) {
      const { data: row, error } = await sb().from("rsvp_events").select("id").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (!row?.id) throw new Error(`appendGuest: missing event ${slug}`);
      const { error: iErr } = await sb().from("rsvp_guests").insert({
        id: guest.id,
        event_id: row.id,
        guest_name: guest.guestName,
        guest_email: guest.guestEmail,
        guest_phone: guest.guestPhone,
        status: guest.status,
        party_size: guest.partySize,
        adults: guest.adults,
        kids: guest.kids,
        needs_seat: guest.needsSeat,
        meal_choice: guest.mealChoice,
        notes: guest.notes,
        created_at: guest.createdAt,
      });
      if (iErr) throw iErr;
    },
  };
  return repo;
}

let cachedRepo: RsvpRepository | null = null;

/** Returns Supabase-backed repository when env is configured. */
export function getSupabaseRsvpRepository(): RsvpRepository | null {
  if (!isConfigured()) return null;
  if (!cachedRepo) cachedRepo = makeRepository();
  return cachedRepo;
}
