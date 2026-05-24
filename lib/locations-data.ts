import {
  bloomfieldGoogleHours,
  formatWeeklyHours,
  hoursNotOnGoogleNote,
  type LocationWeeklyHours,
} from "@/lib/location-hours";
import { business } from "@/lib/site-data";

export const locationSlugs = ["bloomfield", "wethersfield", "marlborough"] as const;
export type LocationSlug = (typeof locationSlugs)[number];

export type LocationAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: "CT";
  postalCode?: string;
};

export type LocationPhone = {
  label: string;
  phone: string;
  phoneHref: string;
};

export type LocationEmail = {
  label: string;
  address: string;
};

export type CompanyLocation = {
  slug: LocationSlug;
  city: string;
  cardTitle: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  cardDescription: string;
  bodyCopy: string;
  businessRole: string;
  purposeItems: string[];
  equipmentFocus: string[];
  customerBenefit: string;
  whyThisLocationMatters: string;
  ctaLabel: string;
  path: `/locations/${LocationSlug}`;
  address: LocationAddress | null;
  addressNote: string | null;
  /** Weekly hours aligned with this location’s Google Business Profile when published. */
  hoursSchedule: LocationWeeklyHours | null;
  /** Display when GBP has no hours (matches “Add hours” on Google). */
  hoursNote: string | null;
  mapsUrl: string | null;
  phones: LocationPhone[];
  email: LocationEmail;
};

function tel(digits: string): string {
  const d = digits.replace(/\D/g, "");
  return `tel:+1${d}`;
}

function fmt860(n: string): string {
  const d = n.replace(/\D/g, "");
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return n;
}

const mainLine: LocationPhone = {
  label: "Main line",
  phone: business.phone,
  phoneHref: business.phoneHref,
};

function mapsQuery(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function locationEmail(label: string): LocationEmail {
  return { label, address: business.email };
}

export const locationsTrustCopy = {
  sectionTitle: "Why our locations matter",
  intro:
    "Each Connecticut Party Rentals location plays a specific role in helping us serve customers better. From warehouse staging and delivery preparation to bridal consultations and customer coordination, our locations help us stay organized, responsive, and prepared for events across Connecticut.",
  bullets: [
    "Organize inventory more efficiently across tents, tables, chairs, and event gear",
    "Improve delivery planning and truck staging for on-time setups",
    "Support faster customer communication and quote follow-up",
    "Prepare weddings, corporate programs, and backyard parties with clearer workflows",
    "Serve different customer needs with the right team and the right inventory",
    "Maintain a stronger, more transparent local presence across Connecticut",
  ],
  rolesIntro:
    "Each Connecticut Party Rentals location has a specific role in helping us serve customers. Our locations support delivery, customer communication, bridal and corporate planning, tent staging, and event inventory organization.",
};

export const locationsOverview = {
  path: "/locations" as const,
  h1: "Our Connecticut Party Rentals Locations",
  metaTitle: "Connecticut Party Rentals Locations",
  metaDescription:
    "View Connecticut Party Rentals locations supporting event rentals, delivery, bridal planning, corporate events, backyard parties, and customer service across Connecticut.",
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
      "Connecticut Party Rentals’ Bloomfield location supports tent staging, delivery operations, truck loading, and major event rental inventory.",
    cardDescription:
      "Our Bloomfield location is our main warehouse and delivery center. This location supports our larger rental operation, delivery routing, tent staging, truck loading, and major event preparation.",
    bodyCopy:
      "Our Bloomfield location is the main warehouse and delivery center for Connecticut Party Rentals. This is where we organize major event inventory, stage tent jobs, prepare trucks, and support larger deliveries across Connecticut.",
    businessRole: "Main warehouse, tent staging, and statewide delivery operations",
    purposeItems: [
      "Main tent warehouse",
      "Delivery staging",
      "Truck loading",
      "Large event preparation",
      "Core tables, chairs, tents, dance floors, and rental inventory",
    ],
    equipmentFocus: [
      "Main tent warehouse",
      "Large event inventory",
      "Delivery trucks and staging",
      "Tables, chairs, tents, and event equipment",
      "Large-scale event preparation",
    ],
    customerBenefit:
      "Customers benefit from a central hub where large jobs are staged carefully — so delivery crews leave with the right footprint, hardware, and inventory for weddings, graduations, and corporate events.",
    whyThisLocationMatters:
      "Bloomfield is where Connecticut Party Rentals turns confirmed orders into real setups. Staging tents, loading trucks, and organizing core inventory here keeps delivery predictable and helps our team support larger programs across the state.",
    ctaLabel: "View Bloomfield Location",
    path: "/locations/bloomfield",
    address: {
      streetAddress: business.address,
      addressLocality: "Bloomfield",
      addressRegion: "CT",
      postalCode: business.postalCode,
    },
    addressNote: null,
    hoursSchedule: bloomfieldGoogleHours,
    hoursNote: null,
    mapsUrl: mapsQuery(`${business.address}, Bloomfield, CT ${business.postalCode}`),
    phones: [
      mainLine,
      {
        label: "Delivery & warehouse line (current customers)",
        phone: fmt860("8606581600"),
        phoneHref: tel("8606581600"),
      },
    ],
    email: locationEmail("Email (warehouse & delivery)"),
  },
  wethersfield: {
    slug: "wethersfield",
    city: "Wethersfield",
    cardTitle: "Wethersfield — Connecticut Party Rentals Bridal & Event Center",
    pageTitle: "Connecticut Party Rentals Bridal & Event Center — Wethersfield",
    metaTitle: "Wethersfield Bridal & Event Center | Connecticut Party Rentals",
    metaDescription:
      "Connecticut Party Rentals’ Wethersfield Bridal & Event Center supports wedding customers, corporate events, consultations, linens, decor, and event planning.",
    cardDescription:
      "Our Wethersfield location is designed as a more customer-facing bridal, wedding, and corporate event center. This location helps support event planning, customer consultations, and select event rental inventory.",
    bodyCopy:
      "Our Wethersfield location gives Connecticut Party Rentals a stronger customer-facing presence for bridal, wedding, corporate, and private event customers. This location supports consultations, event planning, and select rental inventory focused on weddings and professional events.",
    businessRole: "Bridal, wedding, and corporate event customer center",
    purposeItems: [
      "Bridal consultations",
      "Wedding planning support",
      "Corporate event planning",
      "Customer-facing event office",
      "Bridal, linen, decor, and event-focused inventory",
    ],
    equipmentFocus: [
      "Bridal and wedding inventory",
      "Corporate event inventory",
      "Event design support",
      "Linens, decor, and planning-related inventory",
      "Customer-facing event office",
    ],
    customerBenefit:
      "Couples and corporate planners get a dedicated place to talk through layout, timing, and presentation — with inventory and planning support aligned to professional events, not just a phone quote.",
    whyThisLocationMatters:
      "Wethersfield strengthens how we serve wedding and corporate customers face-to-face. Consultations, linens, decor, and planning conversations happen here so programs feel coordinated before install day.",
    ctaLabel: "View Wethersfield Location",
    path: "/locations/wethersfield",
    address: {
      streetAddress: "1233 Silas Deane Hwy",
      addressLocality: "Wethersfield",
      addressRegion: "CT",
      postalCode: "06109",
    },
    addressNote: null,
    hoursSchedule: null,
    hoursNote: hoursNotOnGoogleNote,
    mapsUrl: mapsQuery("1233 Silas Deane Hwy, Wethersfield, CT 06109"),
    phones: [
      mainLine,
      {
        label: "Large events & corporate line",
        phone: fmt860("8603281930"),
        phoneHref: tel("8603281930"),
      },
    ],
    email: locationEmail("Email (bridal & corporate events)"),
  },
  marlborough: {
    slug: "marlborough",
    city: "Marlborough",
    cardTitle: "Marlborough — Contact Center & Backyard Event Inventory",
    pageTitle: "Marlborough Contact Center & Backyard Event Inventory",
    metaTitle: "Marlborough Contact Center & Backyard Inventory | Connecticut Party Rentals",
    metaDescription:
      "Connecticut Party Rentals’ Marlborough location supports customer communication, quote coordination, yard games, backyard inventory, and private event rentals.",
    cardDescription:
      "Our Marlborough location supports customer communication, event coordination, and select backyard party inventory. This location helps us manage customer calls, quotes, planning questions, and smaller backyard event rentals.",
    bodyCopy:
      "Our Marlborough location supports customer communication, quote coordination, and backyard event inventory. This location helps us stay responsive for customers planning birthdays, graduations, family parties, backyard events, and smaller private gatherings.",
    businessRole: "Customer contact center and backyard event inventory",
    purposeItems: [
      "Customer contact center",
      "Quote coordination",
      "Event planning communication",
      "Yard games",
      "Backyard party inventory",
      "Smaller private event support",
    ],
    equipmentFocus: [
      "Contact center",
      "Yard games",
      "Backyard party inventory",
      "Smaller event rental support",
      "Customer coordination and quote support",
    ],
    customerBenefit:
      "Hosts planning backyard parties and smaller gatherings get responsive quote support and inventory geared to practical, family-scale events — without navigating a large warehouse on their own.",
    whyThisLocationMatters:
      "Marlborough keeps Connecticut Party Rentals accessible for everyday hosts. Calls, quotes, and backyard-focused inventory are coordinated here so smaller events still get organized, professional support.",
    ctaLabel: "View Marlborough Location",
    path: "/locations/marlborough",
    address: {
      streetAddress: "29 North Main Street",
      addressLocality: "Marlborough",
      addressRegion: "CT",
    },
    addressNote: "Near Marlborough Town Hall and the lake — a local customer-facing office for Connecticut Party Rentals.",
    hoursSchedule: null,
    hoursNote: hoursNotOnGoogleNote,
    mapsUrl: mapsQuery("29 North Main Street, Marlborough, CT"),
    phones: [mainLine],
    email: locationEmail("Email (quotes & event coordination)"),
  },
};

export const locationList = locationSlugs.map((slug) => companyLocations[slug]);

export function locationHoursDisplay(location: CompanyLocation): string | null {
  if (location.hoursSchedule) return formatWeeklyHours(location.hoursSchedule);
  return location.hoursNote;
}

export function getLocation(slug: string): CompanyLocation | undefined {
  if (locationSlugs.includes(slug as LocationSlug)) {
    return companyLocations[slug as LocationSlug];
  }
  return undefined;
}

export function locationPaths(): string[] {
  return [locationsOverview.path, ...locationSlugs.map((s) => `/locations/${s}`)];
}
