"use server";

import { revalidatePath } from "next/cache";
import { isStaffAdminKeyValid } from "@/lib/rsvp/admin-auth";
import type { CreateEventInput } from "@/lib/rsvp/service";
import {
  addGuestRsvp,
  adminSetQuoteRequestedFlag,
  adminSetQuoteResolved,
  createHostedEvent,
  requestQuoteUpdate,
  updateOptionalAddition,
} from "@/lib/rsvp/service";
import type { GuestRsvpInput } from "@/lib/rsvp/service";

export async function createHostedEventAction(input: CreateEventInput) {
  return createHostedEvent(input);
}

export async function submitGuestRsvpAction(input: GuestRsvpInput) {
  const res = await addGuestRsvp(input);
  if (!res.ok) return res;
  revalidatePath(`/rsvp/${input.slug}`);
  revalidatePath(`/rsvp/${input.slug}/dashboard`);
  return { ok: true as const };
}

export async function requestQuoteUpdateAction(slug: string, token: string) {
  const out = await requestQuoteUpdate(slug, token);
  revalidatePath(`/rsvp/${slug}/dashboard`);
  return out;
}

export async function updateOptionalAdditionAction(slug: string, token: string, value: string | null) {
  const out = await updateOptionalAddition(slug, token, value);
  revalidatePath(`/rsvp/${slug}/dashboard`);
  return out;
}

export async function adminResolveQuoteAction(slug: string, staffKey: string) {
  if (!isStaffAdminKeyValid(staffKey)) return { ok: false as const };
  await adminSetQuoteResolved(slug);
  revalidatePath("/admin/rsvps");
  revalidatePath(`/rsvp/${slug}/dashboard`);
  return { ok: true as const };
}

export async function adminSetQuoteRequestedAction(slug: string, staffKey: string, requested: boolean) {
  if (!isStaffAdminKeyValid(staffKey)) return { ok: false as const };
  await adminSetQuoteRequestedFlag(slug, requested);
  revalidatePath("/admin/rsvps");
  revalidatePath(`/rsvp/${slug}/dashboard`);
  return { ok: true as const };
}
