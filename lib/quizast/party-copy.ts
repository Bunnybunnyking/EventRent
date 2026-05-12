import type { StyleFallbackKey } from "./zodiac";
import { signLabel } from "./zodiac";

/** Short party-energy line per sign */
export const SUN_PARTY: Record<number, string> = {
  0: "Your party identity runs hot and fast — start strong, keep momentum, and let people feel your confidence.",
  1: "You throw gatherings that feel grounded: good food, comfy pacing, and furniture nobody wants to leave.",
  2: "You’re the host who keeps conversations sparking — mix zones, playlists, and little surprises.",
  3: "Home-field advantage matters to you — softer lighting, familiar faces, and emotional safety.",
  4: "You want the room to notice — bold focal points, celebration energy, and photos that pop.",
  5: "Your hosting brain loves a plan — tidy flow, thoughtful details, and nothing embarrassing mid-toast.",
  6: "Balance is your aesthetic — symmetry in layout, playlist polish, and vibes that feel effortless.",
  7: "You like parties with atmosphere — moody corners, real conversations, and memorable entrances.",
  8: "You want space to roam — outdoor energy, spontaneous plans, and zero cramped awkward clusters.",
  9: "Your gatherings feel intentional — timelines that work, seating that makes sense, grown-up calm.",
  10: "You host like a curator — unexpected pairings, clever layouts, and rules rewritten tastefully.",
  11: "You lean dreamy — softer textures, thoughtful playlists, and escape-from-the-week energy.",
};

export const MOON_PARTY: Record<number, string> = {
  0: "Emotional comfort for you = excitement without shame — games, laughter, and nobody bored.",
  1: "Your mood needs sensory calm — comfortable seating, predictable timing, and snacks that hug.",
  2: "You recharge through chatter — mingling lanes, snack stations, and friendly introductions.",
  3: "You need people to feel looked-after — shade, seating for shy guests, and hosts who check in.",
  4: "You want your gathering to feel celebratory — spotlight moments that still feel kind.",
  5: "Stress relief looks like organization — clear directions, labeled zones, and calm transitions.",
  6: "Harmony matters — seating that prevents drama, balanced playlists, and pretty photo spots.",
  7: "You want intimacy without chaos — lighting control, privacy pockets, and memorable detail.",
  8: "Freedom matters — outdoor overflow, flexible seating, and room for spontaneity.",
  9: "You relax when logistics feel senior-level — backup plans, sober timelines, adult seating.",
  10: "You want novelty — styling twists, playlist curveballs, and conversation that stays interesting.",
  11: "You want tenderness — softer sound, slower pacing, and emotional space to actually enjoy.",
};

export const RISING_PARTY: Record<number, string> = {
  0: "First impression energy: bold signage, bright greeting, and a party that announces itself.",
  1: "First impression energy: tactile luxury — linens, warm lighting, and seating that invites lingering.",
  2: "First impression energy: playful pathways — stations, signage with personality, social buzz.",
  3: "First impression energy: welcoming thresholds — gentle lighting and a host who greets like family.",
  4: "First impression energy: centerpiece drama — focal tent line, statement entrance, photo-forward.",
  5: "First impression energy: crisp coordination — tidy zones, intentional palette, calm confidence.",
  6: "First impression energy: curated symmetry — balanced layout, polished palette, effortlessly chic.",
  7: "First impression energy: cinematic tone — contrast lighting, intimate vignettes, vibe-first.",
  8: "First impression energy: wide-open energy — lawn flow, tent wings, space to circulate.",
  9: "First impression energy: elevated restraint — structured layout, premium basics, trusted flow.",
  10: "First impression energy: modern edge — unexpected focal points, clever lighting, fresh layout.",
  11: "First impression energy: ethereal softness — draping, glow, and romance without trying too hard.",
};

export const OPEN_STYLE_PARTY: Record<StyleFallbackKey, string> = {
  bold_fun:
    "Visual overlay — Open Rising Style: loud joy, saturated color pops, and energy that refuses to whisper.",
  cozy_pretty:
    "Visual overlay — Open Rising Style: candlelit warmth, tactile textiles, and intimate tablescapes.",
  social_bright:
    "Visual overlay — Open Rising Style: cheerful zones, dance-floor spill light, and mingle-first layout.",
  elegant_photo:
    "Visual overlay — Open Rising Style: editorial-ready sightlines, balanced tent lines, camera-friendly tones.",
  moody_dramatic:
    "Visual overlay — Open Rising Style: dramatic shadows, intimate pockets, and spotlight storytelling.",
  clean_polished:
    "Visual overlay — Open Rising Style: structured spacing, refined neutrals, and quietly expensive calm.",
  weird_unique:
    "Visual overlay — Open Rising Style: eclectic focal points, playful asymmetry, and memorable weird-good.",
  dreamy_soft:
    "Visual overlay — Open Rising Style: gauzy light, pastel shimmer, and emotion-forward ambiance.",
};

export function paragraphForIndices(sun: number, moon: number, rising: number | null, style: StyleFallbackKey | null): string {
  const s = SUN_PARTY[sun] ?? "";
  const m = MOON_PARTY[moon] ?? "";
  const r =
    rising !== null && rising !== undefined
      ? RISING_PARTY[rising] ?? ""
      : style !== null
        ? OPEN_STYLE_PARTY[style] ?? ""
        : "";
  return [s, m, r].filter(Boolean).join("\n\n");
}

