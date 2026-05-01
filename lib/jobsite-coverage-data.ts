/**
 * Jobsite coverage pricing. Weekday jobsite rates are ~10% below prior list;
 * eligibility copy explains Mon–Fri through Friday 11 AM (see `jobsiteWeekdayPricingNote`).
 */

export const jobsiteWeekdayPricingNote =
  "About 10% below our standard jobsite list when your rental is for a Monday–Friday jobsite window and pickup or on-site wrap is scheduled by Friday 11:00 AM. Weekend use, late-Friday holds, or party timelines are quoted at standard jobsite rates.";

export const jobsitePackages: readonly { name: string; price: string; items: readonly string[] }[] = [
  {
    name: "Shade Station",
    price: "Starting at $270",
    items: ["Tent coverage", "Delivery", "Setup", "Pickup"],
  },
  {
    name: "Hydration Station",
    price: "Starting at $383",
    items: ["Tent coverage", "Coolers", "Water", "Ice", "Cups", "Table", "Delivery, setup, and pickup"],
  },
  {
    name: "Heat Relief Station",
    price: "Starting at $563",
    items: [
      "Tent coverage",
      "Coolers",
      "Water",
      "Ice",
      "Cups",
      "Table",
      "Fan or misting fan options",
      "Delivery, setup, and pickup",
    ],
  },
];

export const jobsiteFourteenDayRates: readonly { size: string; price: string }[] = [
  { size: "10' x 10'", price: "$445" },
  { size: "10' x 20'", price: "$540" },
  { size: "10' x 30'", price: "$810" },
  { size: "20' x 20'", price: "$1,080" },
  { size: "20' x 30'", price: "$1,620" },
  { size: "20' x 40'", price: "$2,160" },
  { size: "20' x 50'", price: "$2,700" },
  { size: "30' x 30'", price: "$2,430" },
  { size: "30' x 40'", price: "$3,240" },
  { size: "30' x 50'", price: "$4,050" },
  { size: "40' x 40'", price: "$4,320" },
];

/** Minimum order for weekday jobsite packages (10% off prior $300). */
export const jobsiteMinimumOrderDisplay = "$270";

/** Delivery line item, ~10% off prior $195. */
export const jobsiteDeliveryFeeDisplay = "$175";
