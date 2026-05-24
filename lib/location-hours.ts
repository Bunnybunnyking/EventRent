/** Days in calendar order — keep in sync with GBP / schema.org dayOfWeek. */
export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type DayOfWeek = (typeof daysOfWeek)[number];

export type LocationDayHours =
  | { status: "closed" }
  | { status: "open"; opens: string; closes: string };

export type LocationWeeklyHours = Record<DayOfWeek, LocationDayHours>;

/** Human-readable lines (Google-style), e.g. "Monday–Friday: 9:00 AM – 7:00 PM". */
export function formatWeeklyHoursLines(schedule: LocationWeeklyHours): string[] {
  const lines: string[] = [];
  let i = 0;

  while (i < daysOfWeek.length) {
    const day = daysOfWeek[i];
    const slot = schedule[day];
    let j = i + 1;
    while (j < daysOfWeek.length) {
      const next = daysOfWeek[j];
      if (JSON.stringify(schedule[next]) !== JSON.stringify(slot)) break;
      j++;
    }

    const rangeLabel =
      i === j - 1 ? day : `${day}–${daysOfWeek[j - 1]}`;

    if (slot.status === "closed") {
      lines.push(`${rangeLabel}: Closed`);
    } else {
      lines.push(`${rangeLabel}: ${slot.opens} – ${slot.closes}`);
    }
    i = j;
  }

  return lines;
}

export function formatWeeklyHours(schedule: LocationWeeklyHours): string {
  return formatWeeklyHoursLines(schedule).join("\n");
}

/** schema.org OpeningHoursSpecification[] */
export function openingHoursSpecification(
  schedule: LocationWeeklyHours,
): Array<Record<string, unknown>> {
  const specs: Array<Record<string, unknown>> = [];
  let i = 0;

  while (i < daysOfWeek.length) {
    const day = daysOfWeek[i];
    const slot = schedule[day];
    let j = i + 1;
    while (j < daysOfWeek.length) {
      const next = daysOfWeek[j];
      if (JSON.stringify(schedule[next]) !== JSON.stringify(slot)) break;
      j++;
    }

    const dayOfWeek = daysOfWeek.slice(i, j);
    if (slot.status === "open") {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: to24h(slot.opens),
        closes: to24h(slot.closes),
      });
    }
    i = j;
  }

  return specs;
}

function to24h(label: string): string {
  const m = label.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!m) return label;
  let h = parseInt(m[1], 10);
  const min = m[2] ?? "00";
  const pm = m[3].toUpperCase() === "PM";
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}`;
}

/** Bloomfield warehouse — Connecticut Party Rentals LLC on Google Maps (79 Old Windsor Rd). */
export const bloomfieldGoogleHours: LocationWeeklyHours = {
  Monday: { status: "open", opens: "9:00 AM", closes: "7:00 PM" },
  Tuesday: { status: "open", opens: "9:00 AM", closes: "7:00 PM" },
  Wednesday: { status: "open", opens: "9:00 AM", closes: "7:00 PM" },
  Thursday: { status: "open", opens: "9:00 AM", closes: "7:00 PM" },
  Friday: { status: "open", opens: "9:00 AM", closes: "7:00 PM" },
  Saturday: { status: "closed" },
  Sunday: { status: "closed" },
};

/** Shown when a GBP listing exists but has no hours published yet. */
export const hoursNotOnGoogleNote =
  "Hours are not published on this location’s Google Business Profile yet. Please call before visiting.";
