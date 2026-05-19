/**
 * Local graduation context for service-area town pages.
 * Keys MUST match `slugify(town)` from app/service-areas/[town]/page.tsx (lowercase, hyphenated).
 * School names are for local reference only (see disclaimer in the template).
 */

export type TownSchoolMention = {
  townName: string;
  highSchools: string[];
  nearbyColleges: string[];
  /** Optional hand-authored paragraph; otherwise built from fields */
  graduationCopy?: string;
  localNotes?: string;
};

/** Slug keys — same as URL segment e.g. west-hartford, new-britain */
export const townSchoolMentions: Partial<Record<string, TownSchoolMention>> = {
  wethersfield: {
    townName: "Wethersfield",
    highSchools: ["Wethersfield High School"],
    nearbyColleges: ["Trinity College", "Central Connecticut State University", "University of Hartford"],
  },
  glastonbury: {
    townName: "Glastonbury",
    highSchools: ["Glastonbury High School"],
    nearbyColleges: ["Trinity College", "University of Hartford", "Central Connecticut State University"],
  },
  newington: {
    townName: "Newington",
    highSchools: ["Newington High School"],
    nearbyColleges: ["Central Connecticut State University", "Charter Oak State College", "Trinity College"],
  },
  "rocky-hill": {
    townName: "Rocky Hill",
    highSchools: ["Rocky Hill High School"],
    nearbyColleges: ["Central Connecticut State University", "Middlesex Community College", "Trinity College"],
  },
  "west-hartford": {
    townName: "West Hartford",
    highSchools: ["Conard High School", "Hall High School"],
    nearbyColleges: ["University of Hartford", "University of Saint Joseph"],
  },
  hartford: {
    townName: "Hartford",
    highSchools: ["Hartford Public High School", "Bulkeley High School", "Weaver High School"],
    nearbyColleges: ["Trinity College", "Capital Community College", "UConn Hartford"],
  },
  manchester: {
    townName: "Manchester",
    highSchools: ["Manchester High School", "Howell Cheney Technical High School"],
    nearbyColleges: ["Manchester Community College"],
  },
  middletown: {
    townName: "Middletown",
    highSchools: ["Middletown High School"],
    nearbyColleges: ["Wesleyan University", "Middlesex Community College"],
  },
  "new-britain": {
    townName: "New Britain",
    highSchools: ["New Britain High School"],
    nearbyColleges: ["Central Connecticut State University", "Charter Oak State College"],
  },
  farmington: {
    townName: "Farmington",
    highSchools: ["Farmington High School"],
    nearbyColleges: ["UConn Health", "Tunxis Community College"],
  },
  cromwell: {
    townName: "Cromwell",
    highSchools: ["Cromwell High School"],
    nearbyColleges: ["Holy Apostles College and Seminary", "Middlesex Community College"],
  },
  southington: {
    townName: "Southington",
    highSchools: ["Southington High School"],
    nearbyColleges: ["Central Connecticut State University", "Tunxis Community College"],
  },

  enfield: {
    townName: "Enfield",
    highSchools: ["Enfield High School"],
    nearbyColleges: ["Asnuntuck Community College", "Central Connecticut State University"],
    localNotes:
      "Party tent rentals here often pair long driveways with spring wind along the corridor—we size tent anchoring before we lock table and chair counts.",
  },
  "east-windsor": {
    townName: "East Windsor",
    highSchools: ["East Windsor High School"],
    nearbyColleges: ["Central Connecticut State University", "Goodwin University"],
  },
  somers: {
    townName: "Somers",
    highSchools: ["Somers High School"],
    nearbyColleges: ["University of Connecticut", "Central Connecticut State University"],
  },
  suffield: {
    townName: "Suffield",
    highSchools: ["Suffield High School"],
    nearbyColleges: ["University of Connecticut", "Central Connecticut State University"],
  },
  "windsor-locks": {
    townName: "Windsor Locks",
    highSchools: ["Windsor Locks High School"],
    nearbyColleges: ["Central Connecticut State University", "University of Hartford"],
  },
  granby: {
    townName: "Granby",
    highSchools: ["Granby Memorial High School"],
    nearbyColleges: ["University of Connecticut", "Central Connecticut State University"],
  },
  "east-granby": {
    townName: "East Granby",
    highSchools: ["East Granby High School"],
    nearbyColleges: ["Central Connecticut State University", "University of Connecticut"],
  },
  canton: {
    townName: "Canton",
    highSchools: ["Canton High School"],
    nearbyColleges: ["University of Hartford", "Central Connecticut State University"],
  },
  burlington: {
    townName: "Burlington",
    highSchools: ["Lewis S. Mills High School"],
    nearbyColleges: ["Tunxis Community College", "Central Connecticut State University"],
  },
  barkhamsted: {
    townName: "Barkhamsted",
    highSchools: ["Northwestern Regional High School"],
    nearbyColleges: ["Tunxis Community College", "University of Connecticut"],
  },
  hartland: {
    townName: "Hartland",
    highSchools: ["Northwestern Regional High School"],
    nearbyColleges: ["Tunxis Community College", "Central Connecticut State University"],
  },
  "new-hartford": {
    townName: "New Hartford",
    highSchools: ["Northwestern Regional High School"],
    nearbyColleges: ["Central Connecticut State University", "University of Connecticut"],
  },
  norfolk: {
    townName: "Norfolk",
    highSchools: ["Northwestern Regional High School"],
    nearbyColleges: ["Tunxis Community College", "Westfield State University"],
  },

  vernon: {
    townName: "Vernon",
    highSchools: ["Rockville High School"],
    nearbyColleges: ["University of Connecticut", "Manchester Community College"],
    localNotes:
      "For Vernon yards and lots we still lead quotes with tent style and anchoring, then tables and chairs for how your crowd actually moves at peak hour.",
  },
  ellington: {
    townName: "Ellington",
    highSchools: ["Ellington High School"],
    nearbyColleges: ["University of Connecticut", "Manchester Community College"],
  },
  tolland: {
    townName: "Tolland",
    highSchools: ["Tolland High School"],
    nearbyColleges: ["University of Connecticut", "Eastern Connecticut State University"],
  },
  bolton: {
    townName: "Bolton",
    highSchools: ["Bolton High School"],
    nearbyColleges: ["University of Connecticut", "Manchester Community College"],
  },
  andover: {
    townName: "Andover",
    highSchools: ["RHAM High School"],
    nearbyColleges: ["University of Connecticut", "Eastern Connecticut State University"],
  },
  stafford: {
    townName: "Stafford",
    highSchools: ["Stafford High School"],
    nearbyColleges: ["University of Connecticut", "Eastern Connecticut State University"],
  },
  columbia: {
    townName: "Columbia",
    highSchools: ["RHAM High School"],
    nearbyColleges: ["Eastern Connecticut State University", "University of Connecticut"],
  },
  coventry: {
    townName: "Coventry",
    highSchools: ["Coventry High School"],
    nearbyColleges: ["University of Connecticut", "Manchester Community College"],
  },
  willington: {
    townName: "Willington",
    highSchools: ["E. O. Smith High School"],
    nearbyColleges: ["University of Connecticut", "Eastern Connecticut State University"],
  },
  union: {
    townName: "Union",
    highSchools: ["Woodstock Academy"],
    nearbyColleges: ["Eastern Connecticut State University", "University of Connecticut"],
  },

  "east-hampton": {
    townName: "East Hampton",
    highSchools: ["East Hampton High School"],
    nearbyColleges: ["Middlesex Community College", "Wesleyan University"],
  },
  portland: {
    townName: "Portland",
    highSchools: ["Portland High School"],
    nearbyColleges: ["Middlesex Community College", "Wesleyan University"],
  },
  durham: {
    townName: "Durham",
    highSchools: ["Coginchaug Regional High School"],
    nearbyColleges: ["Wesleyan University", "Middlesex Community College"],
  },
  middlefield: {
    townName: "Middlefield",
    highSchools: ["Coginchaug Regional High School"],
    nearbyColleges: ["Middlesex Community College", "Wesleyan University"],
  },
  haddam: {
    townName: "Haddam",
    highSchools: ["Nathan Hale-Ray High School"],
    nearbyColleges: ["Middlesex Community College", "Wesleyan University"],
  },
  "east-haddam": {
    townName: "East Haddam",
    highSchools: ["Nathan Hale-Ray High School"],
    nearbyColleges: ["Middlesex Community College", "Wesleyan University"],
  },
  chester: {
    townName: "Chester",
    highSchools: ["Valley Regional High School"],
    nearbyColleges: ["Wesleyan University", "Middlesex Community College"],
  },
  "deep-river": {
    townName: "Deep River",
    highSchools: ["Valley Regional High School"],
    nearbyColleges: ["Middlesex Community College", "Wesleyan University"],
  },
  killingworth: {
    townName: "Killingworth",
    highSchools: ["Haddam-Killingworth High School"],
    nearbyColleges: ["Middlesex Community College", "Wesleyan University"],
  },
  essex: {
    townName: "Essex",
    highSchools: ["Valley Regional High School"],
    nearbyColleges: ["Middlesex Community College", "Wesleyan University"],
  },
  westbrook: {
    townName: "Westbrook",
    highSchools: ["Westbrook High School"],
    nearbyColleges: ["Middlesex Community College", "Wesleyan University"],
  },

  hebron: {
    townName: "Hebron",
    highSchools: ["RHAM High School"],
    nearbyColleges: ["Eastern Connecticut State University", "University of Connecticut"],
    localNotes:
      "Larger lots still need tent-first planning: stake lines, vendor carry paths, then rounds and chairs sized to dinner style—not the other way around.",
  },
  marlborough: {
    townName: "Marlborough",
    highSchools: ["RHAM High School"],
    nearbyColleges: ["Eastern Connecticut State University", "University of Connecticut"],
  },
};

function joinSchoolsReadable(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

export function getTownSchoolMention(slug: string, displayTownName: string): TownSchoolMention {
  const row = townSchoolMentions[slug];
  if (row) {
    return { ...row, townName: displayTownName };
  }
  return {
    townName: displayTownName,
    highSchools: [],
    nearbyColleges: [],
  };
}

/** Opening paragraph — warm, local; avoids implying school endorsement */
export function buildGraduationLeadParagraph(data: TownSchoolMention): string {
  if (data.graduationCopy) return data.graduationCopy;

  const { townName, highSchools } = data;
  const schoolsPhrase = joinSchoolsReadable(highSchools);

  if (highSchools.length > 0) {
    return `Party tent rentals and party rentals for graduation season in ${townName}: we plan tent footprint, weather backup, and anchoring first, then tables and chairs for open houses and lawn gatherings. Families celebrating graduates from ${schoolsPhrase}—and neighbors doing the same on your street—get layouts sized to peak arrivals, not just average headcount. Linens, lighting, and add-ons layer on once the shell and seating path are steady.`;
  }

  return `Graduation season in ${townName} fills calendars fast. We still start with tent coverage and anchoring when you want outdoor space, then tables and chairs for guests, plus linens and lighting when your layout calls for them—sized to your yard, guest count, and schedule.`;
}

/** Second paragraph when colleges are listed — reference once, natural phrasing */
export function buildNearbyCollegeSentence(data: TownSchoolMention): string | null {
  if (data.nearbyColleges.length === 0) return null;
  return `We also help families hosting college send-offs or graduation gatherings for students connected to ${joinSchoolsReadable(data.nearbyColleges)}.`;
}

export const graduationOccasionBullets = [
  "Backyard graduation parties",
  "College send-off parties",
  "Senior nights and team banquets",
  "End-of-school-year celebrations",
  "Family cookouts and open houses",
  "Tents, tables, chairs, linens, lighting, and layout help",
] as const;
