import type { RsvpEvent } from "./types";

export type RsvpCreatedEmailPayload = {
  event: RsvpEvent;
  publicRsvpUrl: string;
  hostDashboardUrl: string;
};

/**
 * Placeholder for transactional email (Resend, SendGrid, Postmark, etc.).
 *
 * Integration steps (when ready):
 * 1. Add API key env var and provider SDK.
 * 2. Send HTML + text templates with public RSVP link and private dashboard link.
 * 3. Log failures to your monitoring tool; never log the host token in plaintext in client bundles.
 */
export async function sendRsvpCreatedEmail(_payload: RsvpCreatedEmailPayload): Promise<{ ok: boolean; skipped: boolean }> {
  void _payload;
  return { ok: false, skipped: true };
}
