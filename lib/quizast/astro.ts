import * as Astronomy from "astronomy-engine";
import { toDate } from "date-fns-tz";
import { longitudeToSignIndex } from "./zodiac";

/** Mean obliquity approximation (degrees) — adequate for party quiz */
const OBL = (23.4392911 * Math.PI) / 180;

/**
 * Tropical ascendant ecliptic longitude (0–360°), computed from local sidereal time.
 * Uses standard atan2 formulation (Meeus-style).
 */
export function ascendantLongitude(date: Date, latDeg: number, lonEastDeg: number): number {
  const gstHours = Astronomy.SiderealTime(date);
  const gstDeg = gstHours * 15;
  const thetaDeg = gstDeg + lonEastDeg;
  const ramc = ((thetaDeg % 360) + 360) % 360;
  const ramr = (ramc * Math.PI) / 180;
  const phi = (latDeg * Math.PI) / 180;

  const asc = Math.atan2(
    Math.cos(ramr),
    -(Math.sin(ramr) * Math.cos(OBL) + Math.tan(phi) * Math.sin(OBL)),
  );
  let deg = (asc * 180) / Math.PI;
  deg = (deg + 360) % 360;
  return deg;
}

/** Geocentric solar ecliptic longitude; use `SunPosition` — `EclipticLongitude(Body.Sun)` throws in astronomy-engine. */
export function sunLongitude(date: Date): number {
  return Astronomy.SunPosition(date).elon;
}

export function moonLongitude(date: Date): number {
  return Astronomy.EclipticLongitude(Astronomy.Body.Moon, date);
}

export function instantInTimezone(isoDate: string, hhmm: string | null, tz: string): Date {
  let timePart = "12:00:00";
  if (hhmm && hhmm.includes(":")) {
    const parts = hhmm.split(":");
    const h = parts[0]?.padStart(2, "0") ?? "12";
    const m = parts[1]?.padStart(2, "0") ?? "00";
    timePart = `${h}:${m}:00`;
  }
  const wall = `${isoDate}T${timePart}`;
  return toDate(wall, { timeZone: tz });
}

/** Sample Moon sign each hour across the calendar day to detect sign changes in tz */
export function moonSignAmbiguityOnDay(isoDate: string, tz: string): {
  uniqueSigns: number[];
  ambiguous: boolean;
} {
  const signs = new Set<number>();
  for (let h = 0; h < 24; h++) {
    const hh = `${h}`.padStart(2, "0");
    const d = toDate(`${isoDate}T${hh}:30:00`, { timeZone: tz });
    signs.add(longitudeToSignIndex(moonLongitude(d)));
  }
  const uniqueSigns = [...signs].sort((a, b) => a - b);
  return {
    uniqueSigns,
    ambiguous: uniqueSigns.length > 1,
  };
}

/** Estimated moon when user has no time — uses noon in tz */
export function estimatedMoonSign(isoDate: string, tz: string): number {
  const d = instantInTimezone(isoDate, "12:00", tz);
  return longitudeToSignIndex(moonLongitude(d));
}
