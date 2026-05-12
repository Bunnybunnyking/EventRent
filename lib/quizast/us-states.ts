/** Approximate centroid + primary IANA timezone for party-quiz math (not survey-grade). */

export type StateInfo = {
  lat: number;
  /** East-positive, degrees */
  lon: number;
  tz: string;
  label: string;
};

export const US_STATES: Record<string, StateInfo> = {
  AL: { lat: 32.806671, lon: -86.79113, tz: "America/Chicago", label: "Alabama" },
  AK: { lat: 61.370716, lon: -152.404419, tz: "America/Anchorage", label: "Alaska" },
  AZ: { lat: 33.729759, lon: -111.431221, tz: "America/Phoenix", label: "Arizona" },
  AR: { lat: 34.969704, lon: -92.373123, tz: "America/Chicago", label: "Arkansas" },
  CA: { lat: 36.116203, lon: -119.681564, tz: "America/Los_Angeles", label: "California" },
  CO: { lat: 39.059811, lon: -105.311104, tz: "America/Denver", label: "Colorado" },
  CT: { lat: 41.597782, lon: -72.755371, tz: "America/New_York", label: "Connecticut" },
  DE: { lat: 39.318523, lon: -75.507141, tz: "America/New_York", label: "Delaware" },
  DC: { lat: 38.897438, lon: -77.026817, tz: "America/New_York", label: "District of Columbia" },
  FL: { lat: 27.766279, lon: -81.686783, tz: "America/New_York", label: "Florida" },
  GA: { lat: 33.040619, lon: -83.643074, tz: "America/New_York", label: "Georgia" },
  HI: { lat: 21.094318, lon: -157.498337, tz: "Pacific/Honolulu", label: "Hawaii" },
  ID: { lat: 44.240459, lon: -114.478828, tz: "America/Boise", label: "Idaho" },
  IL: { lat: 40.349457, lon: -88.986137, tz: "America/Chicago", label: "Illinois" },
  IN: { lat: 39.849426, lon: -86.258278, tz: "America/Indiana/Indianapolis", label: "Indiana" },
  IA: { lat: 42.011539, lon: -93.210526, tz: "America/Chicago", label: "Iowa" },
  KS: { lat: 38.5266, lon: -96.726486, tz: "America/Chicago", label: "Kansas" },
  KY: { lat: 37.66814, lon: -84.670067, tz: "America/New_York", label: "Kentucky" },
  LA: { lat: 31.169546, lon: -91.867805, tz: "America/Chicago", label: "Louisiana" },
  ME: { lat: 44.693947, lon: -69.381927, tz: "America/New_York", label: "Maine" },
  MD: { lat: 39.063946, lon: -76.802101, tz: "America/New_York", label: "Maryland" },
  MA: { lat: 42.230171, lon: -71.530106, tz: "America/New_York", label: "Massachusetts" },
  MI: { lat: 43.326618, lon: -84.536095, tz: "America/Detroit", label: "Michigan" },
  MN: { lat: 45.694454, lon: -93.900192, tz: "America/Chicago", label: "Minnesota" },
  MS: { lat: 32.741646, lon: -89.678696, tz: "America/Chicago", label: "Mississippi" },
  MO: { lat: 38.456085, lon: -92.288368, tz: "America/Chicago", label: "Missouri" },
  MT: { lat: 46.921925, lon: -110.454353, tz: "America/Denver", label: "Montana" },
  NE: { lat: 41.12537, lon: -98.268082, tz: "America/Chicago", label: "Nebraska" },
  NV: { lat: 38.313515, lon: -117.055374, tz: "America/Los_Angeles", label: "Nevada" },
  NH: { lat: 43.452492, lon: -71.563896, tz: "America/New_York", label: "New Hampshire" },
  NJ: { lat: 40.298904, lon: -74.521011, tz: "America/New_York", label: "New Jersey" },
  NM: { lat: 34.840515, lon: -106.248482, tz: "America/Denver", label: "New Mexico" },
  NY: { lat: 42.165726, lon: -74.948051, tz: "America/New_York", label: "New York" },
  NC: { lat: 35.630066, lon: -79.806419, tz: "America/New_York", label: "North Carolina" },
  ND: { lat: 47.528912, lon: -99.784012, tz: "America/Chicago", label: "North Dakota" },
  OH: { lat: 40.388783, lon: -82.764915, tz: "America/New_York", label: "Ohio" },
  OK: { lat: 35.565342, lon: -96.928917, tz: "America/Chicago", label: "Oklahoma" },
  OR: { lat: 44.572021, lon: -122.070938, tz: "America/Los_Angeles", label: "Oregon" },
  PA: { lat: 40.590752, lon: -77.209755, tz: "America/New_York", label: "Pennsylvania" },
  RI: { lat: 41.680893, lon: -71.51178, tz: "America/New_York", label: "Rhode Island" },
  SC: { lat: 33.856892, lon: -80.945007, tz: "America/New_York", label: "South Carolina" },
  SD: { lat: 44.299782, lon: -99.438828, tz: "America/Chicago", label: "South Dakota" },
  TN: { lat: 35.747845, lon: -86.692345, tz: "America/Chicago", label: "Tennessee" },
  TX: { lat: 31.054487, lon: -97.563461, tz: "America/Chicago", label: "Texas" },
  UT: { lat: 40.150032, lon: -111.862434, tz: "America/Denver", label: "Utah" },
  VT: { lat: 44.045876, lon: -72.710686, tz: "America/New_York", label: "Vermont" },
  VA: { lat: 37.769337, lon: -78.169968, tz: "America/New_York", label: "Virginia" },
  WA: { lat: 47.400902, lon: -121.490494, tz: "America/Los_Angeles", label: "Washington" },
  WV: { lat: 38.491226, lon: -80.954453, tz: "America/New_York", label: "West Virginia" },
  WI: { lat: 44.268543, lon: -89.616508, tz: "America/Chicago", label: "Wisconsin" },
  WY: { lat: 42.755966, lon: -107.30249, tz: "America/Denver", label: "Wyoming" },
};

export const DEFAULT_TZ_FALLBACK = "America/New_York";
