import { business } from "@/lib/site-data";

export const locationSlugs = ["bloomfield", "wethersfield", "marlborough"] as const;
export type LocationSlug = (typeof locationSlugs)[number];

/** Publishable street line when confirmed; omit to show a placeholder on the page. */
export type LocationAddress = {
  streetAddress?: string;
  addressLocality: string;
  addressRegion: "CT";
  postalCode?: string;
};

export type CompanyLocation = {
  slug: LocationSlug;
  city: string;
  /** Card headline on `/locations` */
  cardTitle: string;
  /** Detail page H1 */
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  cardDescription: string;
  bodyCopy: string;
  equipmentFocus: string[];
  detailSections: string[];
  ctaLabel: string;
  path: `/locations/${LocationSlug}`;
  address: LocationAddress | null;
  /** When null, pages show a placeholder — add confirmed hours in this file. */
  hours: string | null;
  /** Google Maps or place URL — null shows placeholder until confirmed. */
  mapsUrl: string | null;
  phone: string;
  phoneHref: string;
};

const sharedPhone = { phone: business.phone, phoneHref: business.phoneHref };

export const locationsOverview = {
  path: "/locations" as const,
  h1: "Our Connecticut Party Rentals Locations",
  metaTitle: "Our Connecticut Party Rentals Locations",
  metaDescription:
    "Three Connecticut Party Rentals locations: Bloomfield main warehouse, Wethersfield bridal and event center, and Marlborough contact center. Company locations, not service-area pages.",
  intro:
    "Connecticut Party Rentals operates multiple locations to support faster delivery, better inventory organization, and stronger service for weddings, corporate events, backyard parties, graduations, festivals, and private events across Connecticut.",
};

export const companyLocations: Record<LocationSlug, CompanyLocation> = {
  bloomfield: {
    slug: "bloomfield",
    city: "Bloomfield",
    cardTitle: "Bloomfield — Main Warehouse & Delivery Center",
    pageTitle: "Bloomfield Main Warehouse & Delivery Center",
    metaTitle: "Bloomfield Main Warehouse & Delivery Center | Connecticut Party Rentals",
    metaDescription:
      "Connecticut Party Rentals Bloomfield location: main tent warehouse, delivery staging, trucks, and large event inventory for weddings and events statewide.",
    cardDescription:
      "Our Bloomfield location is our main warehouse and delivery center. This location supports our larger rental operation, delivery routing, tent staging, truck loading, and major event preparation.",
    bodyCopy:
      "Our Bloomfield location is the main warehouse and delivery center for Connecticut Party Rentals. This is where we organize major event inventory, stage tent jobs, prepare trucks, and support larger deliveries across Connecticut.",
    equipmentFocus: [
      "Main tent warehouse",
      "Large event inventory",
      "Delivery trucks and staging",
      "Tables, chairs, tents, and event equipment",
      "Large-scale event preparation",
    ],
    detailSections: [
      "Main tent warehouse",
      "Delivery and staging center",
      "Large event inventory",
      "Tables, chairs, tents, dance floors, and core rental equipment",
      "Built to support weddings, graduations, corporate events, festivals, and private parties",
    ],
    ctaLabel: "View Bloomfield Location",
    path: "/locations/bloomfield",
    address: {
      streetAddress: business.address,
      addressLocality: "Bloomfield",
      addressRegion: "CT",
      postalCode: business.postalCode,
    },
    hours: null,
    mapsUrl: null,
    ...sharedPhone,
  },
  wethersfield: {
    slug: "wethersfield",
    city: "Wethersfield",
    cardTitle: "Wethersfield — Connecticut Party Rentals Bridal & Event Center",
    pageTitle: "Connecticut Party Rentals Bridal & Event Center — Wethersfield",
    metaTitle: "Wethersfield Bridal & Event Center | Connecticut Party Rentals",
    metaDescription:
      "Wethersfield bridal and event center for Connecticut Party Rentals: wedding and corporate consultations, linens, decor, and customer-facing event support.",
    cardDescription:
      "Our Wethersfield location is designed as a more customer-facing bridal, wedding, and corporate event center. This location helps support event planning, customer consultations, and select event rental inventory.",
    bodyCopy:
      "Our Wethersfield location gives Connecticut Party Rentals a stronger customer-facing presence for bridal, wedding, corporate, and private event customers. This location supports consultations, event planning, and select rental inventory focused on weddings and professional events.",
    equipmentFocus: [
      "Bridal and wedding inventory",
      "Corporate event inventory",
      "Event design support",
      "Linens, decor, and planning-related inventory",
      "Customer-facing event office",
    ],
    detailSections: [
      "Bridal and wedding rental support",
      "Corporate event rental support",
      "Event consultation space",
      "Linens, decor, and bridal-focused inventory",
      "Stronger local presence for Wethersfield, Hartford, Rocky Hill, Newington, Glastonbury, and surrounding towns",
    ],
    ctaLabel: "View Wethersfield Location",
    path: "/locations/wethersfield",
    address: null,
    hours: null,
    mapsUrl: null,
    ...sharedPhone,
  },
  marlborough: {
    slug: "marlborough",
    city: "Marlborough",
    cardTitle: "Marlborough — Contact Center & Backyard Event Inventory",
    pageTitle: "Marlborough Contact Center & Backyard Event Inventory",
    metaTitle: "Marlborough Contact Center | Connecticut Party Rentals",
    metaDescription:
      "Marlborough location for Connecticut Party Rentals: customer contact center, quotes, yard games, and backyard party inventory for smaller private events.",
    cardDescription:
      "Our Marlborough location supports customer communication, event coordination, and select backyard party inventory. This location helps us manage customer calls, quotes, planning questions, and smaller backyard event rentals.",
    bodyCopy:
      "Our Marlborough location supports customer communication, quote coordination, and backyard event inventory. This location helps us stay responsive for customers planning birthdays, graduations, family parties, backyard events, and smaller private gatherings.",
    equipmentFocus: [
      "Contact center",
      "Yard games",
      "Backyard party inventory",
      "Smaller event rental support",
      "Customer coordination and quote support",
    ],
    detailSections: [
      "Customer contact center",
      "Quote and event coordination",
      "Yard games",
      "Backyard party inventory",
      "Smaller event rental support",
    ],
    ctaLabel: "View Marlborough Location",
    path: "/locations/marlborough",
    address: null,
    hours: null,
    mapsUrl: null,
    ...sharedPhone,
  },
};

export const locationList = locationSlugs.map((slug) => companyLocations[slug]);

export function getLocation(slug: string): CompanyLocation | undefined {
  if (locationSlugs.includes(slug as LocationSlug)) {
    return companyLocations[slug as LocationSlug];
  }
  return undefined;
}

export function locationPaths(): string[] {
  return [locationsOverview.path, ...locationSlugs.map((s) => `/locations/${s}`)];
}
