import type { RentalNeedOption, SeatingStyleOption } from "./types";

export type AdditionRecommendation = {
  title: string;
  lines: string[];
};

function chairPlanningBase(planningCount: number, seatingStyle: SeatingStyleOption): number {
  if (seatingStyle === "Cocktail style") return Math.max(Math.ceil(planningCount * 0.35), 0);
  if (seatingStyle === "Ceremony only") return Math.max(Math.ceil(planningCount * 0.9), 0);
  return planningCount;
}

/**
 * Rental “recommendations” are scoped to **one optional add-on** the host picks on the dashboard.
 * We do not repeat guidance for categories they already marked as part of their base rental list.
 */
export function recommendationForOptionalAddition(
  addition: RentalNeedOption,
  planningCount: number,
  seatingStyle: SeatingStyleOption,
): AdditionRecommendation {
  const chairBase = chairPlanningBase(planningCount, seatingStyle);
  const chairHigh = Math.ceil(chairBase * 1.05);
  const tableFrom = (n: number) => Math.max(Math.ceil(n / 8), 0);
  const isCocktail = seatingStyle === "Cocktail style";
  const tableBase = isCocktail ? Math.ceil(planningCount * 0.2) : planningCount;
  const banquetTables = tableFrom(tableBase);
  const round60Tables = tableFrom(tableBase);
  const linensMin = Math.max(banquetTables, round60Tables);

  switch (addition) {
    case "Chairs":
      return {
        title: "If you add chairs",
        lines: [
          `Ballpark for your planning count (${planningCount}): about ${chairBase} to ${chairHigh} chairs for seated-style layouts (includes a small buffer).`,
          "Cocktail or mixed layouts change how many seats you need at tables versus standing areas — we align with your food service plan.",
        ],
      };
    case "Tables":
      return {
        title: "If you add tables",
        lines: [
          `Starting counts for ~${planningCount} guests in the planning count: about ${banquetTables} eight-foot banquet tables or ${round60Tables} sixty-inch rounds (eight seats per table rule of thumb).`,
          "Final counts depend on head table, buffet lines, bar placement, and aisle width — we refine with your layout.",
        ],
      };
    case "Linens":
      return {
        title: "If you add linens",
        lines: [
          `Typical minimum linen count tracks table count — often ${linensMin}+ once tables are finalized.`,
          "Fabric, drop length, and napkin style are tied to table size and formality; we match swatches to your tent and lighting.",
        ],
      };
    case "Tent":
      return {
        title: "If you add or grow tenting",
        lines: [
          "Tent size depends on seated versus standing capacity, dance floor, buffet and bar lines, service aisles, and weather backup — not guest count alone.",
          `With about ${planningCount} people in your planning count, start a layout pass with our team before locking size.`,
        ],
      };
    case "Dance floor":
      return {
        title: "If you add a dance floor",
        lines: [
          "Dance floor sizing depends on band or DJ footprint, how much open floor you want, and how it sits inside the tent.",
          `For roughly ${planningCount} guests in the planning count, we size the floor to traffic patterns and your run of show — not a one-line chart.`,
        ],
      };
    case "Lighting":
      return {
        title: "If you add lighting",
        lines: [
          "Packages pair with tent style, guest count, and whether sidewalls are clear or solid.",
          "Tell us if you need dimmable reception light, task light for catering, or pathway lighting for guest safety.",
        ],
      };
    case "Restroom trailer":
      return {
        title: "If you add restroom trailers",
        lines: [
          planningCount > 100
            ? `With about ${planningCount} people in the planning count, trailer count, pump service, placement, and power deserve a dedicated pass.`
            : "Trailer count still depends on run time, alcohol service, and site access — not headcount alone.",
          "We confirm placement distance, leveling, and generator or shore power early so delivery day stays smooth.",
        ],
      };
    case "Heating":
      return {
        title: "If you add heating",
        lines: [
          "Heater sizing ties to enclosed tent volume, forecast, and how open the ends or walls are.",
          "Share tent dimensions, date, and whether sidewalls are solid or clear so we pick safe, effective coverage.",
        ],
      };
    case "Not sure yet":
      return {
        title: "Still deciding",
        lines: ["Pick a specific equipment category from the dropdown above to see tailored starting notes for that add-on only."],
      };
  }
}
