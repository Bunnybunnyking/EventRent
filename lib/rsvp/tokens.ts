import { randomBytes, timingSafeEqual } from "crypto";

/** Opaque host dashboard token (do not derive from predictable inputs). */
export function generateHostToken(): string {
  return randomBytes(24).toString("base64url");
}

export function timingSafeTokenEqual(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "utf8");
    const bb = Buffer.from(b, "utf8");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}
