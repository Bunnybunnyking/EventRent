/**
 * V1 staff gate: shared secret in env, passed as `?key=` on `/admin/rsvps`.
 *
 * Replace with real staff authentication (e.g. session cookie via NextAuth, Clerk, or
 * internal SSO) before production. Do not ship a long-lived secret in the client.
 */
export function isStaffAdminKeyValid(key: string | undefined): boolean {
  const expected = (process.env.RSVP_ADMIN_SECRET ?? process.env.RSVP_STAFF_KEY)?.trim();
  if (!expected || !key) return false;
  if (expected.length < 8) return false;
  return key === expected;
}
