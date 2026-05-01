import { randomUUID } from "crypto";
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
import { optionalAdditionDropdownOptions } from "./addition-options";
import { getRsvpRepository } from "./persistence";
import { slugifyEventName, withSlugSuffix } from "./slug";
import { generateHostToken, timingSafeTokenEqual } from "./tokens";
import { planningCountFromRollup, rollupRsvps } from "./planning";
import { sendRsvpCreatedEmail } from "./email";
import { siteBaseUrl } from "@/lib/metadata";

export type CreateEventInput = {
  hostName: string;
  email: string;
  phone: string;
  eventName: string;
  eventType: EventTypeOption;
  eventDate: string;
  location: string;
  estimatedGuestCount: number;
  indoorOutdoor: IndoorOutdoorOption;
  seatingStyle: SeatingStyleOption;
  rentalNeeds: RentalNeedOption[];
  hostMessage: string;
};

export type CreateEventResult =
  | {
      ok: true;
      slug: string;
      hostToken: string;
      publicRsvpPath: string;
      hostDashboardPath: string;
      publicRsvpUrl: string;
      hostDashboardUrl: string;
    }
  | { ok: false; error: string };

export type GuestRsvpInput = {
  slug: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: RsvpGuestStatus;
  partySize: number;
  adults: number;
  kids: number;
  needsSeat: GuestSeatingNeed;
  mealChoice: string;
  notes: string;
};

export type GuestRsvpResult = { ok: true } | { ok: false; error: string };

async function uniqueSlugFromName(eventName: string): Promise<string> {
  const repo = getRsvpRepository();
  let base = slugifyEventName(eventName);
  if (!(await repo.slugExists(base))) return base;
  for (let n = 0; n < 12; n += 1) {
    const suffix = randomUUID().slice(0, 6).toLowerCase();
    const candidate = withSlugSuffix(base, suffix);
    if (!(await repo.slugExists(candidate))) return candidate;
  }
  return withSlugSuffix(base, randomUUID().slice(0, 8).toLowerCase());
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

export async function createHostedEvent(input: CreateEventInput): Promise<CreateEventResult> {
  const repo = getRsvpRepository();
  const hostName = input.hostName.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const eventName = input.eventName.trim();
  const location = input.location.trim();
  const hostMessage = input.hostMessage.trim();

  if (!hostName || !email || !phone || !eventName || !location || !input.eventDate?.trim()) {
    return { ok: false, error: "Please fill in host name, email, phone, event name, event date, and town or address." };
  }
  if (!Number.isFinite(input.estimatedGuestCount) || input.estimatedGuestCount < 1) {
    return { ok: false, error: "Estimated guest count should be at least 1." };
  }

  try {
    const slug = await uniqueSlugFromName(eventName);
    const hostToken = generateHostToken();
    const now = new Date().toISOString();

    const event: RsvpEvent = {
      id: randomUUID(),
      slug,
      hostToken,
      hostName,
      email,
      phone,
      eventName,
      eventType: input.eventType,
      eventDate: input.eventDate,
      location,
      estimatedGuestCount: Math.round(input.estimatedGuestCount),
      indoorOutdoor: input.indoorOutdoor,
      seatingStyle: input.seatingStyle,
      rentalNeeds: input.rentalNeeds,
      optionalAddition: null,
      hostMessage,
      quoteUpdateRequested: false,
      quoteUpdateResolved: false,
      createdAt: now,
    };

    const record: StoredEventRecord = { ...event, rsvps: [] };
    await repo.saveNewEvent(record);

    const publicRsvpPath = `/rsvp/${slug}`;
    const hostDashboardPath = `/rsvp/${slug}/dashboard?token=${encodeURIComponent(hostToken)}`;

    await sendRsvpCreatedEmail({
      event,
      publicRsvpUrl: `${siteBaseUrl}${publicRsvpPath}`,
      hostDashboardUrl: `${siteBaseUrl}${hostDashboardPath}`,
    });

    return {
      ok: true,
      slug,
      hostToken,
      publicRsvpPath,
      hostDashboardPath,
      publicRsvpUrl: `${siteBaseUrl}${publicRsvpPath}`,
      hostDashboardUrl: `${siteBaseUrl}${hostDashboardPath}`,
    };
  } catch (e) {
    console.error("[rsvp] createHostedEvent", e);
    return { ok: false, error: "We could not save your event right now. Please try again or contact our team." };
  }
}

export type PublicEventView = Pick<
  RsvpEvent,
  "eventName" | "eventDate" | "location" | "hostMessage" | "slug"
>;

export async function getPublicEvent(slug: string): Promise<PublicEventView | undefined> {
  const ev = await getRsvpRepository().findEventBySlug(slug);
  if (!ev) return undefined;
  return {
    slug: ev.slug,
    eventName: ev.eventName,
    eventDate: ev.eventDate,
    location: ev.location,
    hostMessage: ev.hostMessage,
  };
}

export async function getDashboardEvent(
  slug: string,
  token: string | undefined,
): Promise<StoredEventRecord | "missing" | "invalid"> {
  if (!token) return "missing";
  const ev = await getRsvpRepository().findEventBySlug(slug);
  if (!ev) return "invalid";
  if (!timingSafeTokenEqual(token, ev.hostToken)) return "invalid";
  return ev;
}

export async function addGuestRsvp(input: GuestRsvpInput): Promise<GuestRsvpResult> {
  const repo = getRsvpRepository();
  const guestName = input.guestName.trim();
  const guestEmail = input.guestEmail.trim();
  const guestPhone = input.guestPhone.trim();
  if (!guestName) return { ok: false, error: "Please add a guest name." };
  if (!guestEmail || !isValidEmail(guestEmail)) {
    return { ok: false, error: "Please enter a valid email so the host can reach you if plans change." };
  }
  if (!guestPhone || !isValidPhone(guestPhone)) {
    return { ok: false, error: "Please enter a phone number with area code (at least 10 digits) so the host can reach you if needed." };
  }
  if (!Number.isFinite(input.partySize) || input.partySize < 1) {
    return { ok: false, error: "Party size should be at least 1." };
  }
  const adults = Math.max(0, Math.round(input.adults));
  const kids = Math.max(0, Math.round(input.kids));
  if (adults + kids > input.partySize) {
    return { ok: false, error: "Adults and kids cannot add up to more than the number in your party." };
  }

  const ev = await repo.findEventBySlug(input.slug);
  if (!ev) return { ok: false, error: "We could not find that event." };

  const guest: RsvpGuest = {
    id: randomUUID(),
    eventId: ev.id,
    guestName,
    guestEmail,
    guestPhone,
    status: input.status,
    partySize: Math.round(input.partySize),
    adults,
    kids,
    needsSeat: input.needsSeat,
    mealChoice: input.mealChoice.trim(),
    notes: input.notes.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    await repo.appendGuest(input.slug, guest);
    return { ok: true };
  } catch (e) {
    console.error("[rsvp] addGuestRsvp", e);
    return { ok: false, error: "We could not save your RSVP. Please try again." };
  }
}

export async function requestQuoteUpdate(slug: string, token: string | undefined): Promise<{ ok: boolean }> {
  const gate = await getDashboardEvent(slug, token);
  if (gate === "missing" || gate === "invalid") return { ok: false };
  await getRsvpRepository().updateEventBySlug(slug, (e) => ({ ...e, quoteUpdateRequested: true, quoteUpdateResolved: false }));
  return { ok: true };
}

export async function updateOptionalAddition(
  slug: string,
  token: string | undefined,
  raw: string | null,
): Promise<{ ok: boolean; error?: string }> {
  const gate = await getDashboardEvent(slug, token);
  if (gate === "missing" || gate === "invalid") return { ok: false, error: "unauthorized" };

  const cleared = raw == null || raw === "" || raw === "__none__";
  if (cleared) {
    await getRsvpRepository().updateEventBySlug(slug, (e) => ({ ...e, optionalAddition: null }));
    return { ok: true };
  }

  const allowed = optionalAdditionDropdownOptions(gate.rentalNeeds);
  if (!allowed.includes(raw as RentalNeedOption)) {
    return { ok: false, error: "That add-on is not available for this event (it may already be part of your base rental list)." };
  }

  await getRsvpRepository().updateEventBySlug(slug, (e) => ({ ...e, optionalAddition: raw as RentalNeedOption }));
  return { ok: true };
}

export async function adminSetQuoteResolved(slug: string): Promise<void> {
  await getRsvpRepository().updateEventBySlug(slug, (e) => ({ ...e, quoteUpdateResolved: true }));
}

export async function adminSetQuoteRequestedFlag(slug: string, requested: boolean): Promise<void> {
  await getRsvpRepository().updateEventBySlug(slug, (e) => ({
    ...e,
    quoteUpdateRequested: requested,
    quoteUpdateResolved: requested ? false : e.quoteUpdateResolved,
  }));
}

export async function listEventsForAdmin(): Promise<StoredEventRecord[]> {
  return getRsvpRepository().listAllEventsSorted();
}

export function adminPlanningCount(ev: StoredEventRecord): number {
  return planningCountFromRollup(rollupRsvps(ev.rsvps));
}
