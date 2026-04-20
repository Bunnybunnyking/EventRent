import type { ContentContext } from "@/features/wedding-checklist/lib/content-context";
import type { ChecklistLineItem, WeddingChecklistResult } from "@/features/wedding-checklist/types";

function line(id: string, text: string): ChecklistLineItem {
  return { id, text };
}

/** Build unique ids per run */
function createIdGen() {
  let n = 0;
  return (prefix: string) => `${prefix}-${++n}`;
}

export function buildFullChecklistSections(ctx: ContentContext): WeddingChecklistResult["checklistSections"] {
  const id = createIdGen();
  const s = ctx.setup;
  const v = ctx.venue;

  const timeline: ChecklistLineItem[] = [
    line(id("tl"), "Anchor booking windows to your date or season: venue, tent, catering, photo, entertainment."),
    line(id("tl"), "Add a tent or site walk-through once layout goals are roughly known (before final counts lock)."),
    line(id("tl"), "Draft a week-of timeline: load-in, flip, ceremony, cocktail, reception, speeches, send-off, strike."),
  ];
  if (ctx.plannerInvolved) {
    timeline.push(
      line(id("tl"), "Sync planner check-ins with rental confirmations, weather backup decisions, and vendor arrivals."),
    );
  }
  if (ctx.ceremonyOnly) {
    timeline.push(line(id("tl"), "Ceremony-only focus: build buffer for audio checks, processional timing, and guest seating."));
  }
  if (ctx.receptionOnly) {
    timeline.push(line(id("tl"), "Reception-only focus: align grand entrance, first dance, and dinner service with tent readiness."));
  }
  if (ctx.bothCeremonyReception) {
    timeline.push(
      line(
        id("tl"),
        "Define the ceremony-to-cocktail transition: who moves first, how signage works, and what happens if weather shifts.",
      ),
    );
  }

  const venueSite: ChecklistLineItem[] = [
    line(id("vs"), `Surface: ${v.surface} — confirm staking vs. ballast, mud management, and any buried utilities.`),
    line(
      id("vs"),
      v.terrain === "uneven"
        ? "Uneven grade: schedule leveling discussion with your tent vendor before locking dance floor and seating."
        : "Reconfirm tent orientation for sun arc, prevailing wind, and guest arrival sightlines.",
    ),
    line(id("vs"), "Map truck staging, material storage, and the path from curb to tent line for every vendor class."),
  ];
  if (ctx.backyard) {
    venueSite.push(
      line(id("vs"), "Backyard-specific: neighbor courtesy, street parking plan, and quiet hours / noise expectations."),
    );
  }
  if (ctx.privateEstate) {
    venueSite.push(
      line(
        id("vs"),
        "Estate arrival experience: guest direction from gate to ceremony, valet or shuttle cues, and photo staging that doesn’t block service.",
      ),
    );
  }
  if (ctx.mixedIndoorOutdoor) {
    venueSite.push(
      line(
        id("vs"),
        "Mixed venue: write down which moments live indoors vs. outdoors and where guests wait during flips.",
      ),
    );
  }
  if (v.accessLimitations) {
    venueSite.push(line(id("vs"), "Document narrow drives, low branches, gate codes, and weight limits for each delivery."));
  }
  if (v.loadInConcern) {
    venueSite.push(line(id("vs"), "Negotiate realistic load-in windows with tent install vs. catering vs. entertainment."));
  }

  const tentWeather: ChecklistLineItem[] = [
    line(
      id("tw"),
      ctx.tentHeavy
        ? "Tent-specific weather talk: wind ratings, sidewall strategy, drainage, and rain egress paths."
        : "Decide if any segment of the day requires cover for guest comfort or food service.",
    ),
    line(
      id("tw"),
      ctx.wxHigh || v.weatherBackupConcern
        ? "Define backup real estate on-site: where guests move, how fast, and who communicates the change."
        : "Note seasonal wind patterns if using open sides, drapery, or tall floral.",
    ),
    line(id("tw"), "Plan heat/cold mitigation: fans, heaters, enclosed lounge pockets, or cocktail reroutes."),
  ];
  if (!s.sidewalls && (ctx.wxMedium || ctx.wxHigh)) {
    tentWeather.push(line(id("tw"), "If sidewalls are optional, decide the trigger for deployment—and who can execute it quickly."));
  }

  const powerLightFloor: ChecklistLineItem[] = [
    line(
      id("pl"),
      s.lighting
        ? "Lighting plot: paths first, then bar, dance, cake, and feature moments—dimming where possible."
        : "If the event runs past dusk, prioritize path lighting before decorative accents.",
    ),
    line(
      id("pl"),
      s.generatorPower
        ? "Generator: placement, refuel plan, noise buffer for neighbors, and cable runs away from guest lanes."
        : "Validate total amperage for catering, band/DJ, and tent lighting together—don’t size in silos.",
    ),
    line(
      id("pl"),
      s.flooring
        ? "Flooring scope: full tent, dance island, aisles—aligned to peaks, stakes, and high-traffic corners."
        : "Decide if grass or grade demands flooring for seating stability, elderly guests, and dance safety.",
    ),
    line(id("pl"), "Extension cords and distro: keep runs out of trip lanes and covered where guests walk in heels."),
  ];

  const guestComfort: ChecklistLineItem[] = [
    line(
      id("gc"),
      s.restrooms
        ? "Match restroom count and servicing to peak moments—not just averages."
        : "Upgrade restroom plan for guest count, cocktail density, and line risk at peak.",
    ),
    line(
      id("gc"),
      ctx.evening || v.afterDark
        ? "After-dark comfort: temperature swings, wrap baskets, and visibility on steps or grade changes."
        : "Daytime comfort: shade for ceremony, hydration, and elderly guests on sun-exposed routes.",
    ),
    line(
      id("gc"),
      "Wayfinding between ceremony, cocktail, and tent—especially if guests cross grass, gravel, or multiple doors.",
    ),
  ];
  if (v.guestComfortConcern || ctx.guestsLarge) {
    guestComfort.push(
      line(id("gc"), "Crowd flow: bar lines, buffet timing, and dance floor density for your expected energy."),
    );
  }

  const parkingTransport: ChecklistLineItem[] = [
    line(
      id("pt"),
      s.parkingShuttle
        ? "Shuttle frequency, pickup signage, and a late-night plan aligned with bar close."
        : "Parking plan with overflow, rideshare pickup zone, and elderly-friendly routes.",
    ),
    line(id("pt"), "If streets are tight: communicate staging rules so shuttles don’t block vendor trucks."),
  ];
  if (v.parkingLimitations || ctx.backyard) {
    parkingTransport.push(line(id("pt"), "Neighbor-aware parking: cones, attendants, or block-by-block directions on the website."));
  }

  const vendorCoord: ChecklistLineItem[] = [
    line(id("vd"), "Catering: load-in relative to tent completion, hot-hold path length, and breakdown timing."),
    line(
      id("vd"),
      s.music
        ? "Entertainment: stage footprint, power drops, shelter for gear, and rain plan for outdoor speakers."
        : "Ceremony audio and speech reinforcement—even if dancing is minimal.",
    ),
    line(id("vd"), "Photo/film: sunset timing, tent readiness before room shots, and family portrait line efficiency."),
    line(id("vd"), "Florals and décor: wind ratings, tie-offs, and strike expectations night-of vs. next day."),
  ];

  const rentalsSetup: ChecklistLineItem[] = [
    line(id("rt"), "Linens, chairs, and tables aligned to final headcount bands and layout revisions."),
    line(id("rt"), "Dance floor sizing vs. expected dancing density, dress shoes, and tent pole placement."),
    line(
      id("rt"),
      s.sidewalls
        ? "Sidewall style and quantity in writing—including who installs and when."
        : "Sidewall decision before peak season inventory tightens.",
    ),
    line(id("rt"), "Place settings, glassware, and bussing plan for outdoor service wind and low light."),
  ];

  const transitions: ChecklistLineItem[] = [];
  if (ctx.bothCeremonyReception || ctx.mixedIndoorOutdoor) {
    transitions.push(
      line(
        id("tr"),
        "Ceremony → cocktail → reception: music cues, seating resets, and who resets signage if weather changes.",
      ),
    );
  }
  if (ctx.setup.cocktailArea) {
    transitions.push(
      line(id("tr"), "Cocktail density: standing room, passed bites timing, and bar throughput while photos finish."),
    );
  }

  const dayOf: ChecklistLineItem[] = [
    line(id("dy"), "Day-of contacts: couple, planner, venue, tent lead, catering captain, entertainment."),
    line(id("dy"), "Weather call chain: who decides, by what time, and how guests hear a change."),
    line(id("dy"), "Emergency kit: tape, scissors, stain pen, phone chargers, snacks for vendors, backup timeline printouts."),
    line(id("dy"), "Point person for non-emergency questions so the couple isn’t pulled in ten directions."),
  ];

  const finalC: ChecklistLineItem[] = [
    line(id("fn"), "Final headcount and meal locks tied to rental quantities and seating chart."),
    line(id("fn"), "Walk every guest path after dark if any portion runs past sunset."),
    line(id("fn"), "Strike timing: who breaks down tent vs. who returns next day—spelled out in writing."),
    line(id("fn"), "Confirm gratuities, final payments, and vendor meals in one place."),
  ];

  const sections: WeddingChecklistResult["checklistSections"] = [
    { id: "timeline", title: "Wedding timeline & milestones", items: timeline },
    { id: "venue_site", title: "Venue & site readiness", items: venueSite },
    { id: "tent_weather", title: "Tent & weather planning", items: tentWeather },
    { id: "power_light", title: "Power, lighting & flooring", items: powerLightFloor },
    { id: "guest", title: "Guest comfort & flow", items: guestComfort },
    { id: "parking", title: "Parking & transportation", items: parkingTransport },
    { id: "vendor", title: "Vendor coordination", items: vendorCoord },
    { id: "rentals", title: "Rentals & setup", items: rentalsSetup },
  ];
  if (transitions.length) {
    sections.push({ id: "transitions", title: "Ceremony, cocktail & reception transitions", items: transitions });
  }
  sections.push(
    { id: "dayof", title: "Day-of logistics", items: dayOf },
    { id: "final", title: "Final confirmations", items: finalC },
  );
  return sections;
}

export function buildQuickChecklistSections(ctx: ContentContext): WeddingChecklistResult["checklistSections"] {
  const id = createIdGen();
  const s = ctx.setup;
  const v = ctx.venue;

  const leadEssential =
    ctx.ceremonyOnly
      ? "Ceremony outdoors: audio, seating, shade, and guest arrival path from parking."
      : ctx.receptionOnly
        ? "Reception under tent: prioritize power, lighting, and service flow from guest arrival to last song."
        : "Lock the outdoor story: where ceremony, cocktail, and tent live—and how guests move between them.";

  const essentials: ChecklistLineItem[] = [
    line(id("qk"), leadEssential),
    line(id("qk"), "Guest count drives restrooms, bar lines, and seating—revisit after RSVP final."),
    line(id("qk"), "Name one person for the weather decision and share the deadline with tent + venue."),
  ];

  const outdoorTent: ChecklistLineItem[] = [
    line(
      id("qo"),
      ctx.tentHeavy
        ? "Tent line and peaks vs. staking or ballast—confirm nothing sits on unknown utilities."
        : "Confirm whether you need cover for food, speeches, or sun—not just rain.",
    ),
    line(
      id("qo"),
      s.sidewalls
        ? "Sidewalls staged, labeled, and assigned to a team for fast deployment."
        : "Pick a sidewall strategy before inventory gets tight in peak season.",
    ),
    line(
      id("qo"),
      s.flooring
        ? "Flooring where heels and chairs need stability—especially dance and head table."
        : "Grass or slope: decide minimum flooring for safety and comfort.",
    ),
    line(
      id("qo"),
      s.generatorPower
        ? "Generator placement and cabling that stays out of guest lanes."
        : "One power conversation covering catering + entertainment + tent lighting together.",
    ),
    line(id("qo"), "Wind plan for décor, signage, and open sides—especially if forecasts shift day-of."),
  ];

  const guestFlow: ChecklistLineItem[] = [
    line(id("qg"), "Parking, shuttle, or rideshare pickup: make it obvious on the invite or website."),
    line(
      id("qg"),
      s.restrooms
        ? "Restrooms sized for peaks (cocktail and post-ceremony)."
        : "Restroom upgrade path for your count and cocktail style.",
    ),
    line(id("qg"), "Cocktail space that fits the hand-off from ceremony—or from doors if mixed venue."),
  ];
  if (ctx.guestsLarge) {
    guestFlow.push(line(id("qg"), "Crowd moments: where lines form and how you prevent bottlenecks at bar and tent entry."));
  }

  const weatherPower: ChecklistLineItem[] = [
    line(
      id("qw"),
      ctx.wxHigh || v.weatherBackupConcern
        ? "Backup route guests can execute in minutes—not a vague ‘we’ll figure it out.’"
        : "Light wind/rain posture: what stays, what moves, and who moves it.",
    ),
    line(
      id("qw"),
      ctx.evening || v.afterDark
        ? "Lighting order: paths → safety → bar → dance → pretty accents."
        : "Midday sun and heat: ceremony comfort first, then dinner shade.",
    ),
    line(id("qw"), "Rain threshold: when sidewalls go up relative to wind—written and shared."),
  ];

  const final: ChecklistLineItem[] = [
    line(id("qf"), "48-hour pass: tent, catering, and entertainment aligned on timing and contacts."),
    line(id("qf"), "Print or share day-of contacts with partner, planner, or family lead."),
    line(
      id("qf"),
      ctx.readinessRisk > 55
        ? "You have several open items—book a focused call with your tent or planner lead this week."
        : "Quick sanity check: walk the guest path once more before the week-of.",
    ),
  ];

  return [
    { id: "essentials", title: "Essentials (outdoor & tent)", items: essentials },
    { id: "outdoor_tent", title: "Outdoor & tent readiness", items: outdoorTent },
    { id: "guest_flow", title: "Guest comfort & flow", items: guestFlow },
    { id: "wx_pow", title: "Weather & power", items: weatherPower },
    { id: "final", title: "Final checks", items: final },
  ];
}
