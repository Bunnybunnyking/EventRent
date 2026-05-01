import type { RsvpGuest } from "./types";

export type RsvpRollup = {
  confirmedPeople: number;
  maybePeople: number;
  declinedPeople: number;
  adults: number;
  kids: number;
  responseCount: number;
};

export function rollupRsvps(rsvps: RsvpGuest[]): RsvpRollup {
  let confirmedPeople = 0;
  let maybePeople = 0;
  let declinedPeople = 0;
  let adults = 0;
  let kids = 0;
  for (const r of rsvps) {
    if (r.status === "yes") confirmedPeople += r.partySize;
    else if (r.status === "maybe") maybePeople += r.partySize;
    else declinedPeople += r.partySize;
    adults += r.adults;
    kids += r.kids;
  }
  return {
    confirmedPeople,
    maybePeople,
    declinedPeople,
    adults,
    kids,
    responseCount: rsvps.length,
  };
}

/** Planning count = confirmed + 50% of maybe, rounded up. */
export function planningCountFromRollup(r: RsvpRollup): number {
  return Math.ceil(r.confirmedPeople + 0.5 * r.maybePeople);
}

export function daysUntilEventLocal(eventDateYmd: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(eventDateYmd.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const eventDay = new Date(y, mo - 1, d);
  eventDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((eventDay.getTime() - today.getTime()) / 86_400_000);
}

export function finalCountMessage(days: number | null): string {
  if (days == null) {
    return "Add your event date on the create form next time so we can line this message up with your final count window.";
  }
  if (days < 0) {
    return "This event date has passed. If you are still planning rentals, reach out and we will help you line up what is realistic on the calendar.";
  }
  if (days > 14) {
    return "Your final guest count window is coming. We recommend reviewing your rental order 10 to 14 days before the event.";
  }
  if (days > 7) {
    return "Final count window is approaching. This is the right time to update tables, chairs, linens, and layout needs.";
  }
  return "Changes may be limited based on inventory, prep, and delivery scheduling.";
}
