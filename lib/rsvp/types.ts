/** Domain models for the on-site Event Guest Count Planner. Shaped for a future Supabase (or other DB) swap. */

export type EventTypeOption =
  | "Wedding"
  | "Graduation"
  | "Birthday"
  | "Backyard Party"
  | "Corporate Event"
  | "Fundraiser"
  | "Festival"
  | "Other";

export type IndoorOutdoorOption = "Indoor" | "Outdoor" | "Mixed";

export type SeatingStyleOption =
  | "Seated dinner"
  | "Cocktail style"
  | "Ceremony only"
  | "Mixed layout"
  | "Not sure yet";

export type RentalNeedOption =
  | "Tent"
  | "Tables"
  | "Chairs"
  | "Linens"
  | "Dance floor"
  | "Lighting"
  | "Restroom trailer"
  | "Heating"
  | "Not sure yet";

export type RsvpGuestStatus = "yes" | "no" | "maybe";

export type GuestSeatingNeed = "yes" | "no" | "not_sure";

/** Persisted event (host + planning fields). */
export type RsvpEvent = {
  id: string;
  slug: string;
  hostToken: string;
  hostName: string;
  email: string;
  phone: string;
  eventName: string;
  eventType: EventTypeOption;
  /** ISO date string YYYY-MM-DD from the create form */
  eventDate: string;
  location: string;
  estimatedGuestCount: number;
  indoorOutdoor: IndoorOutdoorOption;
  seatingStyle: SeatingStyleOption;
  rentalNeeds: RentalNeedOption[];
  /** Optional add-on category selected on the host dashboard — recommendations are scoped to this only. */
  optionalAddition: RentalNeedOption | null;
  hostMessage: string;
  quoteUpdateRequested: boolean;
  quoteUpdateResolved: boolean;
  createdAt: string;
};

export type RsvpGuest = {
  id: string;
  eventId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: RsvpGuestStatus;
  partySize: number;
  adults: number;
  kids: number;
  needsSeat: GuestSeatingNeed;
  mealChoice: string;
  notes: string;
  createdAt: string;
};

/** Full record as stored on disk (V1 file store). */
export type StoredEventRecord = RsvpEvent & { rsvps: RsvpGuest[] };

export type RsvpDatabaseFile = {
  version: 1;
  events: StoredEventRecord[];
};
