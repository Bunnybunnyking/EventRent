import { setupLabels } from "@/features/wedding-checklist/data/setup-labels";
import type { ContentContext } from "@/features/wedding-checklist/lib/content-context";
import { pickVariant } from "@/features/wedding-checklist/lib/hash-variant";

export function buildConfirmedAndStill(ctx: ContentContext): { confirmed: string[]; still: string[] } {
  const confirmed: string[] = [];
  const still: string[] = [];

  const confirmPrefix = pickVariant(["On your radar: ", "You’ve flagged: ", "Captured in your plan: "], `${ctx.variantSeed}-cp`);
  const stillPrefix = pickVariant(["Still worth locking: ", "Open loop: ", "Confirm or assign: "], `${ctx.variantSeed}-sp`);

  (Object.keys(ctx.setup) as (keyof typeof ctx.setup)[]).forEach((key) => {
    const label = setupLabels[key];
    if (ctx.setup[key]) confirmed.push(`${confirmPrefix}${label}`);
    else still.push(`${stillPrefix}${label}`);
  });

  if (ctx.venue.accessLimitations) {
    still.push(`${stillPrefix}vendor load-in, gate access, and narrow-path logistics`);
  }
  if (!ctx.venue.powerNearby) {
    still.push(`${stillPrefix}power source, distro layout, and whether a generator is in scope`);
  }
  if (ctx.venue.parkingLimitations) {
    still.push(`${stillPrefix}parking overflow, shuttle staging, and neighbor-friendly traffic flow`);
  }
  if (ctx.venue.venueRestrictions) {
    still.push(`${stillPrefix}noise, curfew, or venue timing rules with entertainment and catering`);
  }
  if (ctx.venue.weatherBackupConcern || ctx.wxMedium || ctx.wxHigh) {
    still.push(`${stillPrefix}weather backup timing, trigger, and guest communication plan`);
  }
  if (ctx.venue.guestComfortConcern) {
    still.push(`${stillPrefix}guest comfort across heat/cold, distance, and after-dark visibility`);
  }
  if (ctx.venue.loadInConcern) {
    still.push(`${stillPrefix}load-in order, service access windows, and strike timing`);
  }
  if (ctx.venue.terrain === "uneven" || ctx.venue.surface !== "hard") {
    still.push(`${stillPrefix}flooring or walkway stability for seating, dancing, and elderly guests`);
  }

  if (ctx.venue.powerNearby) {
    confirmed.push(pickVariant(["Power location identified for main zones", "Main power path identified for vendors"], `${ctx.variantSeed}-pwr`));
  }
  if (!ctx.venue.accessLimitations) {
    confirmed.push("Access and load-in described as workable for vendors as of now");
  }
  if (ctx.plannerInvolved) {
    confirmed.push("Planner or coordinator looped into logistics and confirmations");
  }

  return {
    confirmed: [...new Set(confirmed)].slice(0, 28), still: [...new Set(still)].slice(0, 32), };
}
