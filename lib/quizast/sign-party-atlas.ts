/**
 * QUIZAST — informational bank: per-sign party psychology + placement guidance.
 * Use for copy, prompts, and future result wiring. Do not force tent language into every line.
 */

export type Element = "Fire" | "Earth" | "Air" | "Water";
export type Modality = "Cardinal" | "Fixed" | "Mutable";

export type SignPartyAtlasEntry = {
  /** 0 = Aries … 11 = Pisces — matches zodiac index elsewhere */
  index: number;
  sign: string;
  element: Element;
  modality: Modality;
  /** One tight line: how they host */
  corePartyIdentity: string;
  /** Moon-adjacent: what soothes them as host */
  emotionalComfortStyle: string;
  /** Rising-adjacent: first-impression / décor bias */
  visualStyle: string;
  bestPartyAtmosphere: string;
  bestSetting: string;
  hostingRedFlag: string;
  partyLoveLanguage: string;
  meaningfulTouch: string;
  bestAddOns: string;
  avoid: string;
  /** Ultra-short shareable hook */
  shortResultPhrase: string;
};

/**
 * When tent language is warranted (pick 0–2 reasons; don’t stack every clause in one sentence).
 * Prefer “outdoor room” framing over dry coverage talk unless weather is the honest driver.
 */
export const WHEN_TO_MENTION_TENTS = [
  "Wedding, shower, rehearsal dinner, or formal seated meal outdoors.",
  "Graduation, open house, fundraiser, or corporate field event with structured flow.",
  "Guest count roughly 50+ or unpredictable headcount — need defined footprint.",
  "Outdoor-only venue with no indoor backup or meaningful weather risk.",
  "Formal or editorial visual style where sightlines, lighting, and layout read ‘designed.’",
  "Strong Libra / Taurus / Leo / Capricorn emphasis in the reading — polish, structure, or centerpiece drama.",
  "Evening event where lighting design matters as much as shelter.",
  "Venue needs outdoor expansion — lawn reception attached to a hall, patio spillover, pool surround.",
] as const;

/** Example line — elegant, optional, not mandatory for every result */
export const TENT_RECOMMENDATION_EXAMPLE_LINE =
  "An elegant tented layout would fit this result well — not just for coverage, but to create a defined outdoor room with lighting, tables, and flow.";

/**
 * When to lean cozy backyard / home / garden without pushing a tent in copy.
 */
export const WHEN_COZY_BACKYARD_WITHOUT_TENT = [
  "Intimate guest lists (often fewer than ~40 guests) where warmth beats scale.",
  "Strong Cancer / Taurus / Pisces lean — memory, comfort, softness over spectacle.",
  "Daytime casual: BBQ, pool hang, kids’ party, neighborhood drop-in.",
  "Host explicitly prioritizes ‘backyard simplicity’ or potluck energy.",
  "Budget-first messaging — frame sidewalls or popup canopy as optional ‘just in case,’ not the hero.",
] as const;

/** All twelve signs — concise, scannable, host-actionable */
export const SIGN_PARTY_ATLAS: Record<number, SignPartyAtlasEntry> = {
  0: {
    index: 0,
    sign: "Aries",
    element: "Fire",
    modality: "Cardinal",
    corePartyIdentity: "Bold opener — starts hot, wants momentum and honest energy.",
    emotionalComfortStyle: "Needs agency — clear start time, no awkward waiting, permission to be loud.",
    visualStyle: "High contrast, sporty polish, statement entrance — looks intentional fast.",
    bestPartyAtmosphere: "Kickoff energy — games, playlists with punch, short speeches, dance-ready.",
    bestSetting: "Yard, rooftop bar vibe at home, outdoor lounge, trail-off patio.",
    hostingRedFlag: "Starts strong then disappears — forgets food timing or guest stranded at greeting.",
    partyLoveLanguage: "Action, initiation, playful competition, instant inclusion.",
    meaningfulTouch: "Welcome drink station, printed ‘first song’ moment, host-led toast under 60 seconds.",
    bestAddOns: "Highboys near music, defined dance pocket, generator plan if outdoors.",
    avoid: "Long unstructured mingling with no focal beat — reads as ‘drifting.’",
    shortResultPhrase: "Start loud, stay kind, keep the night moving.",
  },
  1: {
    index: 1,
    sign: "Taurus",
    element: "Earth",
    modality: "Fixed",
    corePartyIdentity: "Sensory host — comfort, quality bites, nobody leaves hungry or rushed.",
    emotionalComfortStyle: "Predictable rhythm — seating that feels premium, temperature control, soft sound.",
    visualStyle: "Tactile luxury — linens, warm metallics, florals, steady palette.",
    bestPartyAtmosphere: "Slow-burn elegance — seated dinner, grazing tables, candle-grade glow.",
    bestSetting: "Garden tent line, patio long-table, winery-adjacent lawn, cozy indoor overflow.",
    hostingRedFlag: "Rigid timeline meltdown when one station backs up — queue shame spirals.",
    partyLoveLanguage: "Quality food paths, plush seating, playlist that doesn’t fight conversation.",
    meaningfulTouch: "Bread-and-butter moment (literally), butter upgrades, named seating if drama-prone families.",
    bestAddOns: "Buffet depth, heater or fan reality check, floor plan that protects speech sightlines.",
    avoid: "Cheap disposables-only aesthetics flashed as ‘fine dining’ — reads disjointed.",
    shortResultPhrase: "Feed them beautifully; let comfort do the flex.",
  },
  2: {
    index: 2,
    sign: "Gemini",
    element: "Air",
    modality: "Mutable",
    corePartyIdentity: "Connector host — routes conversations, remixes energy room-to-room.",
    emotionalComfortStyle: "Variety without chaos — short beats, optional lanes, escape valves for introverts.",
    visualStyle: "Playful signage, zone labels, mixed heights — visual rhythm over matchy-matchy.",
    bestPartyAtmosphere: "Mingle-forward — stations, lawn games, rotating micro-toasts.",
    bestSetting: "Split yard zones, indoor/outdoor handoff, porch DJ window.",
    hostingRedFlag: "Too many announcements — mic fatigue and nobody remembers the plan.",
    partyLoveLanguage: "Curiosity, introductions, playlist collaboration, trivia beats.",
    meaningfulTouch: "Icebreaker card at place setting, ‘two truths’ coaster, SMS song request slip.",
    bestAddOns: "Extra bars split load, mic + compact speaker redundancy, clear trash rhythm.",
    avoid: "One giant circle talk — Gemini guests need lanes and refresh.",
    shortResultPhrase: "Zones beat rows — keep them circulating kindly.",
  },
  3: {
    index: 3,
    sign: "Cancer",
    element: "Water",
    modality: "Cardinal",
    corePartyIdentity: "Sentimental, family-centered, memory-driven.",
    emotionalComfortStyle: "Safety-first — shade for elders, kid empathy, emotional check-ins.",
    visualStyle: "Soft glam — candles (safely), textiles, heirlooms on display.",
    bestPartyAtmosphere: "Cozy backyard gathering, family dinner energy, soft lighting, memory table.",
    bestSetting: "Backyard, home, garden, family venue — anywhere ‘belonging’ reads instantly.",
    hostingRedFlag: "Gets emotional before appetizers — tension lands before snacks land.",
    partyLoveLanguage: "Comfort, memories, familiar faces, gentle pacing.",
    meaningfulTouch: "Photo wall, memory cards, short family toast with guardrails.",
    bestAddOns: "Soft lighting, comfortable seating, buffet tables, sidewalls if weather risk.",
    avoid: "Cold, overly formal, impersonal setups — reads like a rental catalogue, not a home.",
    shortResultPhrase: "Light it softly; feed them like family.",
  },
  4: {
    index: 4,
    sign: "Leo",
    element: "Fire",
    modality: "Fixed",
    corePartyIdentity: "Spotlight-aware — generous host who wants guests glowing too.",
    emotionalComfortStyle: "Recognition — speeches that land, photos that flatter, nobody sidelined.",
    visualStyle: "Centerpiece drama — focal tent line, statement florals, golden-hour readiness.",
    bestPartyAtmosphere: "Celebration arcs — entrance moment, toast peak, dance release.",
    bestSetting: "Garden focal wall, marquee sightline, dance floor as intentional stage.",
    hostingRedFlag: "Performance anxiety disguised as control — schedule fights steal joy.",
    partyLoveLanguage: "Cheers, spotlight turns, thoughtful honors, playlist peaks.",
    meaningfulTouch: "Grand entrance timing, golden-hour photo cue, thank-you visible on signage.",
    bestAddOns: "Stage lighting literacy, tent peak as backdrop, backup indoor toast plan.",
    avoid: "Dim mushy lighting that kills photos — Leo reads as ‘why did we bother?’",
    shortResultPhrase: "Give them a generous spotlight — share it intentionally.",
  },
  5: {
    index: 5,
    sign: "Virgo",
    element: "Earth",
    modality: "Mutable",
    corePartyIdentity: "Systems host — caring through logistics; panic is the enemy.",
    emotionalComfortStyle: "Calm competence — labeled flows, allergy clarity, realistic timelines.",
    visualStyle: "Clean polish — restrained palette, tidy cables, sensible signage.",
    bestPartyAtmosphere: "Well-paced dinner service, hydration omnipresent, bathrooms mapped.",
    bestSetting: "Garden with functional layout, patio service corridor, backup rain lane spelled out.",
    hostingRedFlag: "Apology-loop hosting — over-explaining instead of delegating fixes.",
    partyLoveLanguage: "Helpful maps, dietary dignity, quiet corners for overwhelm.",
    meaningfulTouch: "Printed timeline tent card at entry, QR for allergen sheet, calm vendor gate.",
    bestAddOns: "Cable ramps, trash cadence, spare ice math, sidewalls staged not chaotic.",
    avoid: "Ornamental chaos hiding missing basics — bathrooms beat balloon arches.",
    shortResultPhrase: "Make the invisible stuff seamless — they’ll feel cared for.",
  },
  6: {
    index: 6,
    sign: "Libra",
    element: "Air",
    modality: "Cardinal",
    corePartyIdentity: "Harmony host — aesthetics + fairness; hates lopsided seating drama.",
    emotionalComfortStyle: "Grace — nobody stranded at the edges; visually balanced pairs.",
    visualStyle: "Editorial symmetry — aisle sightlines, paired heights, camera-ready palette.",
    bestPartyAtmosphere: "Polished cocktail → seated rhythm — music supports conversation.",
    bestSetting: "Garden aisle, tent wings mirrored, patio symmetry toward focal.",
    hostingRedFlag: "Conflict avoidance until explosion — passive seating beef.",
    partyLoveLanguage: "Beauty with fairness — invitations that feel personal, balanced tables.",
    meaningfulTouch: "Escort clarity, thoughtful pairings on place cards, dispute-proof seating chart.",
    bestAddOns: "Even uplighting, dance floor proportionate to tent, chic trash concealment.",
    avoid: "Visual clutter fights — too many competing focal points.",
    shortResultPhrase: "Balance the room like you mean it — sightlines first.",
  },
  7: {
    index: 7,
    sign: "Scorpio",
    element: "Water",
    modality: "Fixed",
    corePartyIdentity: "Intensity host — intimacy, loyalty, atmosphere over noise.",
    emotionalComfortStyle: "Trust zones — privacy pockets, controlled lighting, honest vibe.",
    visualStyle: "Cinematic contrast — shadow + accent, selective saturation.",
    bestPartyAtmosphere: "Late-energy honesty — fewer speeches, deeper playlists, memorable endings.",
    bestSetting: "Smaller footprint done right — tent sidewalls as mood, fire pit etiquette.",
    hostingRedFlag: "Ice-out energy when slighted — tension metastasizes quietly.",
    partyLoveLanguage: "Exclusivity done kindly — inner-circle moments without excluding rudely.",
    meaningfulTouch: "Private toast alcove, curated playlist arc, intentional seating chemistry.",
    bestAddOns: "Controlled uplighting, wind-safe candles alternative (LED), discrete security at cash bar.",
    avoid: "Forced cheer — reads hollow; respect mood gradients.",
    shortResultPhrase: "Depth beats volume — design for trust.",
  },
  8: {
    index: 8,
    sign: "Sagittarius",
    element: "Fire",
    modality: "Mutable",
    corePartyIdentity: "Explorer host — spacious flow, honest storytelling, low shame.",
    emotionalComfortStyle: "Freedom — outdoor spill, flexible end time, humor-forward saves.",
    visualStyle: "Wide-angle casual luxe — lawn runway, yard games that don’t feel kiddie.",
    bestPartyAtmosphere: "Open-air optimism — bonfire-adjacent rules, grill theology, travel toast.",
    bestSetting: "Big yard arcs, festival spacing, parking realism.",
    hostingRedFlag: "Over-promising novelty — ‘surprise act’ becomes awkward pause.",
    partyLoveLanguage: "Adventure cues — dessert safari, roaming mic lite, playlist geography.",
    meaningfulTouch: "Fire pit permit clarity, s’mores adult tier, lawn game bracket.",
    bestAddOns: "Outdoor bar split, generator etiquette, perimeter lighting for trip hazards.",
    avoid: "Cramped indoor-only when the soul of the party is horizon lines.",
    shortResultPhrase: "Give them sky — and a backup plan with grace.",
  },
  9: {
    index: 9,
    sign: "Capricorn",
    element: "Earth",
    modality: "Cardinal",
    corePartyIdentity: "Executive host — credibility, schedule integrity, grown-up calm.",
    emotionalComfortStyle: "Respect — starts/endings on time, elders buffered, vendor professionalism.",
    visualStyle: "Structured polish — crisp tent lines, restrained glam, earned centerpiece.",
    bestPartyAtmosphere: "Ceremony-to-reception ladder — each beat earns the next.",
    bestSetting: "Legacy venues, lawn with stakes plan, rain exec summary ready.",
    hostingRedFlag: "Work-mode mic — corporate tone at cousin parties.",
    partyLoveLanguage: "Reliability — vetted vendors, realistic budgets spoken plainly.",
    meaningfulTouch: "Printed rain decision tree, parking chief named, vendor gratitude line in toast.",
    bestAddOns: "Sidewall staging, flooring truth for slope, coat/logistics tent.",
    avoid: "Ambitious décor debt — polish what matters; skip hollow scale.",
    shortResultPhrase: "Make it feel inevitable — timeline first, vibe follows.",
  },
  10: {
    index: 10,
    sign: "Aquarius",
    element: "Air",
    modality: "Fixed",
    corePartyIdentity: "Original host — inclusive rules, unexpected pairings, community spirit.",
    emotionalComfortStyle: "Belonging without conformity — pronouns/cues, accessibility non-performative.",
    visualStyle: "Modern edge — asymmetry on purpose, clever lighting, ethical flair.",
    bestPartyAtmosphere: "Social innovation — charity tie-in, silent disco option, cause-first toast.",
    bestSetting: "Flexible footprint — yard lab, indoor spill zones, donation table integrated.",
    hostingRedFlag: "Too cool for warmth — guests feel judged for classic choices.",
    partyLoveLanguage: "Shared causes, collaborative playlists, inclusive games.",
    meaningfulTouch: "Gender-neutral signage, quiet sensory corner, donation QR with transparency.",
    bestAddOns: "Power budget honest, cable management as ethics, sustainable disposables tier.",
    avoid: "Irony-as-personality — kindness still wins.",
    shortResultPhrase: "Invite the future — keep the welcome obvious.",
  },
  11: {
    index: 11,
    sign: "Pisces",
    element: "Water",
    modality: "Mutable",
    corePartyIdentity: "Dream host — mood-first, empathy-led, soft landing for overwhelm.",
    emotionalComfortStyle: "Gentle containment — sound empathy, seating escape, water/tea grace.",
    visualStyle: "Ethereal soften — gauze light, pastel shimmer, acoustic-first pockets.",
    bestPartyAtmosphere: "Slow shimmer — acoustic set, barefoot grass moment, ocean/water motif.",
    bestSetting: "Garden twilight, pond-adjacent lawn, tent as glow shell not bunker.",
    hostingRedFlag: "Absorbing everyone’s stress — host burnout before cake.",
    partyLoveLanguage: "Tenderness — lyric-forward playlist, gentler speech slots.",
    meaningfulTouch: "Hydration altar, blanket basket, quiet recovery chairs off-dance.",
    bestAddOns: "Soft floor if heels sink, bug strategy humane, fog/haze machines only if safe.",
    avoid: "Harsh strobing, aggro bass under speeches — sensory betrayal.",
    shortResultPhrase: "Float the mood — anchor logistics quietly underneath.",
  },
};

export function atlasEntryForSignIndex(index: number): SignPartyAtlasEntry {
  const i = ((index % 12) + 12) % 12;
  return SIGN_PARTY_ATLAS[i]!;
}
