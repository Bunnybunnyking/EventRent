import { business } from "@/lib/site-data";

/** Prefilled SMS body for tent reservation inquiries (plain ASCII apostrophe for wide device support). */
export const TENT_RESERVATION_SMS_BODY = `Hi, I'm interested in reserving a tent.
Event date:
Event time:
Town or pin:
Guest count:
I can also send a yard photo.`;

/** E.164 digits for `sms:` links — derived from public site phone. */
export function tentReservationSmsTel(): string {
  const digits = business.phone.replace(/\D/g, "");
  if (digits.length >= 10) {
    return digits.length === 10 ? `+1${digits}` : `+${digits}`;
  }
  return "+12038937078";
}

export function tentReservationSmsHref(): string {
  const tel = tentReservationSmsTel();
  return `sms:${tel}?body=${encodeURIComponent(TENT_RESERVATION_SMS_BODY)}`;
}
