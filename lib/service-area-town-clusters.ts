/** Same shape as `ServiceAreaLocalEventPatternsBlock` in service-area-town-content (avoids circular imports). */
export type ClusterLocalPatternBlock = {
  title: string;
  intro?: string;
  items: { label: string; text: string }[];
};

/**
 * Geographic "voice" clusters for service-area SEO pages.
 * Copy is authored per cluster so pages read differently from town_corridor-only templates.
 * Keys are display names matching `townList` in site-data.ts.
 */
export type ServiceAreaClusterId =
  | "north_i91_hartford"
  | "tolland_eastern"
  | "middlesex_river"
  | "hartford_scenic_rural";

export const TOWN_SERVICE_AREA_CLUSTER: Partial<Record<string, ServiceAreaClusterId>> = {
  Enfield: "north_i91_hartford",
  "East Windsor": "north_i91_hartford",
  Somers: "north_i91_hartford",
  Suffield: "north_i91_hartford",
  "Windsor Locks": "north_i91_hartford",
  Granby: "north_i91_hartford",
  "East Granby": "north_i91_hartford",
  Canton: "north_i91_hartford",
  Burlington: "north_i91_hartford",
  Barkhamsted: "north_i91_hartford",
  Hartland: "north_i91_hartford",
  "New Hartford": "north_i91_hartford",
  Norfolk: "north_i91_hartford",

  Vernon: "tolland_eastern",
  Ellington: "tolland_eastern",
  Tolland: "tolland_eastern",
  Bolton: "tolland_eastern",
  Andover: "tolland_eastern",
  Stafford: "tolland_eastern",
  Columbia: "tolland_eastern",
  Coventry: "tolland_eastern",
  Willington: "tolland_eastern",
  Union: "tolland_eastern",

  "East Hampton": "middlesex_river",
  Portland: "middlesex_river",
  Durham: "middlesex_river",
  Middlefield: "middlesex_river",
  Haddam: "middlesex_river",
  "East Haddam": "middlesex_river",
  Chester: "middlesex_river",
  "Deep River": "middlesex_river",
  Killingworth: "middlesex_river",
  Essex: "middlesex_river",
  Westbrook: "middlesex_river",

  Hebron: "hartford_scenic_rural",
  Marlborough: "hartford_scenic_rural",
};

export function getTownServiceAreaCluster(townName: string): ServiceAreaClusterId | null {
  return TOWN_SERVICE_AREA_CLUSTER[townName] ?? null;
}

/** Stable 0..mod-1 from town + salt (different salts → different rotations). */
export function seedMod(townName: string, salt: string, mod: number): number {
  if (mod <= 0) return 0;
  let h = 0;
  for (let i = 0; i < salt.length; i++) h = (h + salt.charCodeAt(i) * (i + 3)) % 2147483647;
  for (let i = 0; i < townName.length; i++) h = (h + townName.charCodeAt(i) * (i + 5)) % 2147483647;
  return Math.abs(h) % mod;
}

function block(
  cluster: ServiceAreaClusterId,
  variant: number,
  townName: string,
): ClusterLocalPatternBlock {
  const v = variant % 4;

  if (cluster === "north_i91_hartford") {
    const blocks: ClusterLocalPatternBlock[] = [
      {
        title: `Party tent rentals & outdoor flow · ${townName}`,
        intro: `North of Hartford, lots in ${townName} often mix long driveways, mature trees, and school or church calendars that do not flex. We plan tent footprint first, then tables and chairs so food lines and exits stay honest.`,
        items: [
          {
            label: "Frame tents on larger lawns",
            text: "Weddings and family receptions where tent width, stake lines, and a clear vendor or buffet lane are decided before chair counts lock.",
          },
          {
            label: "Graduation and open-house weekends",
            text: "Peak arrivals for a few hours: extra chairs, optional tent shell for drizzle, tables that keep mud and cake traffic off the siding.",
          },
          {
            label: "School, church, and fairgrounds timing",
            text: "Rows and simple stages with teardown that matches custodial or volunteer windows—anchoring spelled for turf or lot pavement.",
          },
        ],
      },
      {
        title: `Tent-first installs near ${townName}`,
        intro: `In ${townName} we see fewer “flat soccer field only” sites and more split surfaces: apron, walk, then grass. That mix changes anchoring before it changes tent style.`,
        items: [
          {
            label: "Tents tied to patios and walks",
            text: "Ballast near hardscape, stakes in turf when it is safe, one diagram guests and vendors can read the same way.",
          },
          {
            label: "Tables and chairs after the shell",
            text: "Once coverage and weather backup are set, we size rounds or banquet rows to meal style and headcount without squeezing aisles.",
          },
          {
            label: "Community nights and fundraisers",
            text: "Open-sided tents, controlled food lines, lighting at exits when programs run past dusk.",
          },
        ],
      },
      {
        title: `What ${townName} hosts ask us to solve`,
        intro: "Same crew standards as Bloomfield-base routes—different geometry once you get north of the city.",
        items: [
          {
            label: "Wind across open lots",
            text: "Sidewall strategy tied to tent orientation—not a last-minute clip-on when the forecast shifts.",
          },
          {
            label: "Carrying gear past garages and beds",
            text: "Gate width and path photos change panel plans faster than a guest count revision.",
          },
          {
            label: "Corporate or company yards",
            text: "Compact tents with presentable seating and remarks lighting, strike that clears the lawn for Monday.",
          },
        ],
      },
      {
        title: `Party rentals with tent discipline · ${townName}`,
        intro: `Party tent rentals are more than a SKU: in ${townName} we anchor the weather story first, then layer tables, chairs, and lighting so the footprint still breathes at peak hour.`,
        items: [
          {
            label: "Backyard milestones",
            text: "Birthdays and anniversaries with grill zones separated from seating and stakes buffered from play paths.",
          },
          {
            label: "Rain-smart receptions",
            text: "Frame tent with optional window walls when you still want light while cutting wind.",
          },
          {
            label: "Inventory add-ons",
            text: "After tent and seating, we talk lighting, heaters, and dance areas only if the lot still supports them.",
          },
        ],
      },
    ];
    return blocks[v]!;
  }

  if (cluster === "tolland_eastern") {
    const blocks: ClusterLocalPatternBlock[] = [
      {
        title: `Tolland County gatherings · ${townName}`,
        intro: `East of the river, ${townName} events often mean more lawn, more field edge, and drives that compete with fire company or school parking on the same weekend.`,
        items: [
          {
            label: "Field-adjacent tents",
            text: "Sports banquets and school awards where we map stake lines away from irrigation and infield wear.",
          },
          {
            label: "Residential graduations",
            text: "Open-house spikes: tent optional, chair buffers real, buffet lane away from mud tracks to the foyer.",
          },
          {
            label: "Town green or church lawn programs",
            text: "Permit windows, power paths, and guest lighting bundled with tent size—not guessed at strike time.",
          },
        ],
      },
      {
        title: `Tents, then tables & chairs · ${townName}`,
        intro: "We keep language boring on purpose: the tent answers weather and flow; tables and chairs answer how people actually eat.",
        items: [
          {
            label: "Company picnics",
            text: "Shade, lunch rounds, beverage tables, and activity lanes that do not bottleneck at one tent opening.",
          },
          {
            label: "Family reunions",
            text: "Mixed seating clusters with a covered rain lane near the house for food service.",
          },
          {
            label: "Smaller municipal or club events",
            text: "Simple rows, registration tables, anchoring suited to turf or asphalt mix.",
          },
        ],
      },
      {
        title: `Outdoor parties in ${townName} · realistic carry plans`,
        intro: "Longer carries from truck to stake line change crew size the same way tent width changes chair math.",
        items: [
          {
            label: "Horse properties and larger lots",
            text: "We flag gate clearance and soft shoulders early so panels and ballast routes stay safe.",
          },
          {
            label: "School parking overlays",
            text: "When cars share space with chair zones, we redesign aisles on paper before install day.",
          },
          {
            label: "Evening wrap-up",
            text: "Exit lighting and food-line lighting planned with the tent so cords are not an afterthought.",
          },
        ],
      },
      {
        title: `Party tent rentals · ${townName} rhythm`,
        intro: `For ${townName}, peak season weekends stack together. Early tent and table decisions protect your date more than last-minute add-ons.`,
        items: [
          {
            label: "Wedding tents on private land",
            text: "Service aisles, dance wedges, and vendor parking called out before we lock width.",
          },
          {
            label: "Fundraisers with silent auction + tent",
            text: "Table clusters for bidding, then seated program zones when the agenda shifts.",
          },
          {
            label: "Backyard birthdays",
            text: "Compact canopies, chairs to headcount, neighbor-friendly arrival timing.",
          },
        ],
      },
    ];
    return blocks[v]!;
  }

  if (cluster === "middlesex_river") {
    const blocks: ClusterLocalPatternBlock[] = [
      {
        title: `River towns & shoreline breeze · ${townName}`,
        intro: `${townName} sits in a Middlesex band where humidity, river breeze, and tighter side yards all show up in the same Saturday. Tents drive the weather plan; tables and chairs follow guest flow.`,
        items: [
          {
            label: "Lawn receptions near water or low land",
            text: "Footprint and anchoring that respect soft ground after rain, with dance and buffet lanes still wide enough at rush.",
          },
          {
            label: "Graduation open houses",
            text: "Peak chairs, optional tent for drizzle, gift and dessert tables routed so guests are not stacking at one door.",
          },
          {
            label: "Community concerts or movie nights",
            text: "Open-sided tents, seating clusters, cords routed for foot traffic and exit lighting at lot edges.",
          },
        ],
      },
      {
        title: `Tent coverage first · ${townName}`,
        intro: "When salt air or river wind picks up, wall strategy and leg placement matter as much as tent size.",
        items: [
          {
            label: "Wedding tent rentals",
            text: "Frame tent, rounds, lighting paths, optional window walls when you want light without giving up wind cut.",
          },
          {
            label: "Tables and chairs for split indoor/outdoor",
            text: "Coordinated counts when part of the crowd stays inside during peak arrivals.",
          },
          {
            label: "Corporate or nonprofit outdoors",
            text: "Timed installs, teardown aligned to venue rules, inventory that still looks intentional on camera.",
          },
        ],
      },
      {
        title: `Party rentals with a clear sequence · ${townName}`,
        intro: `In ${townName} we still start with: coverage area, surface mix, then seated vs. standing vs. dance. That order prevents rework.`,
        items: [
          {
            label: "Backyard parties",
            text: "Shade or rain shell, seating zones spaced from grill smoke, stakes away from kids’ game lanes.",
          },
          {
            label: "School or church lots",
            text: "Rows, simple stages, registration tables, custodial-friendly strike times.",
          },
          {
            label: "Fundraisers and seated programs",
            text: "Rounds with service aisles, head tables, lighting when programs run past sunset.",
          },
        ],
      },
      {
        title: `What makes ${townName} quotes accurate`,
        intro: "Photos of grade, trees, and any patio transition beat adjectives every time.",
        items: [
          {
            label: "Mixed turf and pavement",
            text: "Ballast where stakes will not go, stake plan where turf allows, spelled in the quote.",
          },
          {
            label: "Narrow side yards",
            text: "Panel sizes chosen for gate width before we promise a tent family.",
          },
          {
            label: "Party tent rentals vs. quick canopies",
            text: "When wind or guest count rises, we steer hosts to engineered frame lines and proper anchoring.",
          },
        ],
      },
    ];
    return blocks[v]!;
  }

  // hartford_scenic_rural
  const blocks: ClusterLocalPatternBlock[] = [
    {
      title: `Hebron–Marlborough style lots · ${townName}`,
      intro: `In ${townName}, acreage, tree lines, and seasonal mud windows show up in the same RSVP thread. We still sequence tent first, tables and chairs second, lighting last.`,
      items: [
        {
          label: "Spread-out lawn receptions",
          text: "Tent placement that respects septic guesses, well caps, and the path caterers will actually walk.",
        },
        {
          label: "Graduation weekends",
          text: "Chair buffers for peak hour, optional tent, tables that keep the buffet off the back steps.",
        },
        {
          label: "Family milestones and reunions",
          text: "Mixed seating, optional dance wedge, weather language guests can understand without panic.",
        },
      ],
    },
    {
      title: `Rural hosting, commercial tent standards · ${townName}`,
      intro: "Long drives for guests often mean late arrivals in one clump—layout has to survive that hour.",
      items: [
        {
          label: "Parking vs. chair zones",
          text: "If those zones touch, we widen aisles or shift the frame line before invitations print.",
        },
        {
          label: "Spring and fall temperature swings",
          text: "Walls and heaters considered with tent width so you are not heating the whole forest.",
        },
        {
          label: "Vendor lanes",
          text: "Catering and DJ footprints on paper so service aisles stay honest at dinner rush.",
        },
      ],
    },
    {
      title: `Party tent rentals · ${townName}`,
      intro: `We serve ${townName} with the same itemized quoting style as the rest of our Connecticut service area—just expect more talk about carry distance and grade.`,
      items: [
        {
          label: "Tents for weather backup",
          text: "Frame lines, anchoring, and sidewall options chosen with your specific lot—not a generic chart.",
        },
        {
          label: "Tables and chairs",
          text: "Rounds, banquets, or mixed high tops once the shell and flow are stable.",
        },
        {
          label: "Lighting",
          text: "Steps, buffet lines, and tent exits visible after dark without improvising extension cords.",
        },
      ],
    },
    {
      title: `Why hosts in ${townName} lead with photos`,
      intro: "Flat on a map is not flat on the ground. A corner-to-corner lawn photo saves one full revision cycle.",
      items: [
        {
          label: "Gentle grade",
          text: "Even modest slope shifts stake lines; we hunt safe rings before recommending width.",
        },
        {
          label: "Tree canopy",
          text: "Pretty shade and dark tent interiors—lighting paths get decided with tent size.",
        },
        {
          label: "Corporate picnics on private land",
          text: "Compact, presentable installs with strike timed to your real deadline.",
        },
      ],
    },
  ];
  return blocks[v]!;
}

export function buildClusterLocalEventPatterns(
  townName: string,
  cluster: ServiceAreaClusterId,
): ClusterLocalPatternBlock {
  const variant = seedMod(townName, "localpat", 4);
  return block(cluster, variant, townName);
}
