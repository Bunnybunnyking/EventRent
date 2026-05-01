/**
 * Local graduation context for service-area town pages.
 * Keys MUST match `slugify(town)` from app/service-areas/[town]/page.tsx (lowercase, hyphenated).
 *
 * TODO: Add `highSchools` / `nearbyColleges` for towns not yet listed below (Avon, Simsbury, Berlin, …)
 * when you verify names; until then those towns use generic copy (no fake school names).
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
    return `Graduation season is a big deal in ${townName}. Whether your family is celebrating graduates from ${schoolsPhrase}, hosting relatives after commencement, or planning a college send-off, we help make the setup simple with tents, tables, chairs, linens, lighting, and event rentals sized for your yard, guest count, and schedule.`;
  }

  return `Graduation season is a big deal in ${townName}. Whether you are hosting relatives after commencement, planning a college send-off, or celebrating the end of the school year at home, we help make the setup simple with tents, tables, chairs, linens, lighting, and event rentals sized for your yard, guest count, and schedule.`;
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
