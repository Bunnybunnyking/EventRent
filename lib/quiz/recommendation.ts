import type { RentalRecommendation, RentalSignals } from "./types";

/** Turn aggregated quiz signals into practical rental copy (ranges until guest count is known). */
export function buildRentalRecommendation(signals: RentalSignals): RentalRecommendation {
  const guestTier =
    signals.guestScale >= 14 ? "high" : signals.guestScale >= 7 ? "med" : "low";

  let tentSizePrimary: string;
  let tentSizeAlternate: string;

  if (guestTier === "high") {
    tentSizePrimary =
      "40×60 frame tent or larger — or split layouts if your yard needs breathing room.";
    tentSizeAlternate =
      "30×45 plus overflow canopy — tell us your headcount and we'll sanity-check span tables.";
  } else if (guestTier === "med") {
    tentSizePrimary =
      "30×45 frame tent — comfortable mingling, food zone, and seating without feeling cramped.";
    tentSizeAlternate =
      "20×40 + satellite seating — works when space is tight but headcount still flexes.";
  } else {
    tentSizePrimary =
      "20×30 or 20×40 frame tent — intimate backyard energy without renting the county.";
    tentSizeAlternate =
      "Open-air cocktail tables + targeted canopy — if you're keeping it breezy (forecast permitting).";
  }

  if (signals.weatherPrep >= 10) {
    tentSizePrimary +=
      " Expect sidewalls or leg drapes on standby — New England keeps receipts.";
  }

  let tableCount: string;
  let chairCount: string;

  if (guestTier === "high") {
    tableCount =
      "12–18 banquet rounds or 8–12 banquet tables + cocktail rounds — depends on meal style.";
    chairCount =
      "Chair count should exceed headcount by ~10–15% if speeches, gifts, or plus-ones lurk.";
  } else if (guestTier === "med") {
    tableCount =
      "8–12 banquet tables or 8–10 rounds — we'll align once food service style is set.";
    chairCount =
      "Plan chairs for every RSVP plus a sneaky stack for ‘they brought someone.’";
  } else {
    tableCount =
      "4–8 banquet tables or a mix of rounds + highboys — light footprint, still intentional.";
    chairCount =
      "Enough seats for seated moments + a buffer — mingling is cute until nobody can sit.";
  }

  let buffetTables: string;
  if (signals.foodService >= 12) {
    buffetTables =
      "2–3 buffet / serving tables + clear traffic lanes — staging saves the whole vibe.";
  } else if (signals.foodService >= 6) {
    buffetTables =
      "1–2 buffet tables with linens — keeps platters off folding tables that scream yard sale.";
  } else {
    buffetTables =
      "1 buffet or staging table — upgrade if you're doing trays, warmers, or self-serve drinks.";
  }

  const addOns: string[] = [];

  if (signals.weatherPrep >= 8) {
    addOns.push("Sidewalls or roll-up panels + weighted anchoring — rain plan ≠ vibes-only.");
    addOns.push("Covered serving lane so salad doesn't negotiate with drizzle.");
  } else if (signals.weatherPrep >= 4) {
    addOns.push("Rain backup lane — at minimum a covered food handoff.");
  }

  if (signals.stylePremium >= 10) {
    addOns.push("String lighting + linen-forward tables — photos stay forgiving.");
    addOns.push("White folding chairs or chiavari upgrade where cameras linger.");
  } else if (signals.stylePremium >= 5) {
    addOns.push("Accent lighting — instant ‘planned this forever’ energy.");
  }

  if (signals.backyardSocial >= 8) {
    addOns.push("Drink zone + ice backup — hydration prevents democracy breaking out.");
    addOns.push("Yard games staging — keeps loud humans away from the cake.");
  } else if (signals.backyardSocial >= 4) {
    addOns.push("Satellite highboys — gives wanderers a home base.");
  }

  if (signals.foodService >= 8) {
    addOns.push(
      "Trash / recycling barrels tucked near traffic flow — buffet crowds generate debris.",
    );
  }

  if (signals.urgencySimple >= 10 || signals.needsConsult >= 12) {
    addOns.push(
      "Fast-track consult — we'll translate panic into a pickup list you can actually execute.",
    );
  } else if (signals.needsConsult >= 8) {
    addOns.push(
      "Quick site-fit review — tents hate surprises more than group chats do.",
    );
  }

  const seen = new Set<string>();
  const uniqueAddOns = addOns.filter((x) => {
    if (seen.has(x)) return false;
    seen.add(x);
    return true;
  });

  const hostSurvivalTip =
    signals.guestScale >= 10 && signals.foodService < 4
      ? "Lock headcount before you lock layouts — tents scale fast when cousins RSVP in batches."
      : signals.weatherPrep >= 10
        ? "Rain plans beat optimism — sidewalls age better than soggy charcuterie."
        : signals.stylePremium >= 8
          ? "Light the space before guests arrive — panic lighting reads on faces."
          : "Tell us town + date + rough headcount — we'll translate roast energy into a setup list.";

  const softGuestCta =
    "Tell us your town, date, and guest count and we'll confirm the right setup — no vibe-based guessing.";

  return {
    tentSizePrimary,
    tentSizeAlternate,
    tableCount,
    chairCount,
    buffetTables,
    addOns: uniqueAddOns.slice(0, 8),
    hostSurvivalTip,
    softGuestCta,
  };
}
