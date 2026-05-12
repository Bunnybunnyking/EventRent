/**
 * Party Path — expanded host playbook (entertainment / party-planning flavor only).
 * Front-of-card stays snackable; flip reveals archetype + staging advice.
 */

export type PartyPathDeep = {
  archetype: string;
  /** Keywords guests might throw at your hosting vibe */
  keywords: string[];
  /** 2–4 sentences: how to throw parties that feel “you” */
  playbook: string;
  /** One line tying energy to tents, layout, or rentals without sounding like a catalog */
  rentalCue: string;
};

export const PARTY_PATH_DEEP: Record<number, PartyPathDeep> = {
  1: {
    archetype: "The Opening Act",
    keywords: ["decisive", "signature entrance", "clean momentum"],
    playbook:
      "Your parties win when you name the first beat — arrival drink, welcome line, where coats go. Pick one bold focal moment (microphone, playlist kick, lawn game whistle) and let the rest breathe. Delegation is glamour: one trusted runner beats you sprinting every crisis.",
    rentalCue:
      "Strong sightlines from the tent mouth to the dance pocket — guests should feel your plan without reading a map.",
  },
  2: {
    archetype: "The Duo Diplomat",
    keywords: ["pairings", "soft pacing", "everyone included"],
    playbook:
      "Lean into chemistry — seating that prevents beef, playlists that hug conversation, and two bars before lines form. Your gift is reading who feels stranded; rescue with introductions, not apologies. Small thoughtful beats beat giant spectacle.",
    rentalCue:
      "Mirrored tent wings or balanced table clusters keep ‘fairness’ obvious — nobody stuck at the fringe.",
  },
  3: {
    archetype: "The Mic Drop Host",
    keywords: ["wit", "color", "story-ready"],
    playbook:
      "Give people permission to laugh — short speeches, playful signage, dessert worth gossiping about. Variety is oxygen: stations, outdoor spill, a playlist curveball. Guard against chaos by timeboxing the wild bits so dinner still lands.",
    rentalCue:
      "Stage lighting + one playful focal wall — photos happen naturally without a photographer hunt.",
  },
  4: {
    archetype: "The Floorplan Romantic",
    keywords: ["rhythm", "reliability", "grown-up calm"],
    playbook:
      "Your guests relax when the basics hum — trash rhythm, bathroom clarity, rain voice printed in your head. Build beauty on structure: one hero tablescape, predictable transitions, backup lanes when buffet backs up. Pride lives in details that never shout.",
    rentalCue:
      "Choose tent sizing that honors seated sightlines — speeches shouldn’t fight center poles or dim edges.",
  },
  5: {
    archetype: "The Remix Ranger",
    keywords: ["flex", "spontaneous spill", "motion"],
    playbook:
      "Weather your secret costar — lean outdoor spill, portable bars, and ‘choose your lane’ zones. Keep snacks ruthless so movement feels fun, not hangry. Endings optional on purpose, but exits graceful — rides, coats, thank-you visible.",
    rentalCue:
      "Sidewall staging + perimeter uplight — roaming energy still reads intentional after sunset.",
  },
  6: {
    archetype: "The Heart-Forward Host",
    keywords: ["care", "belonging", "beautiful duty"],
    playbook:
      "People remember how held they felt — elders shaded, kids predictable, dietary dignity spoken calmly. Splurge where tenderness shows: comfortable chairs, calm acoustics under tent peaks. Say no to martyrdom — delegate cleanup pride.",
    rentalCue:
      "Buffet depth + soft seating pockets — hospitality reads luxury when nobody queues into weather.",
  },
  7: {
    archetype: "The Mood Scientist",
    keywords: ["intimate pockets", "audio EQ", "meaning"],
    playbook:
      "Fewer beats, deeper payoff — candle-grade glow, playlist arcs, speeches that earn silence. Guard introvert oxygen: quieter corners, slower bass under vows. Mystery isn’t aloofness — name one thoughtful ritual so guests aren’t guessing your heart.",
    rentalCue:
      "Lower peaks under tent canvas + uplight drama — intimacy scales without shrinking the guest list.",
  },
  8: {
    archetype: "The Velvet Mogul",
    keywords: ["presence", "premium staging", "confident scale"],
    playbook:
      "Eight energy reads ‘investment’ — not snobbery, but intention: weight in linens, confident spacing, signage that looks bought-in. Lean elegance over clutter; one costly centerpiece beats twelve anxious extras. Wealth here means executive calm — budgets spoken plainly, vendors respected, timeline honored.",
    rentalCue:
      "Frame tent lines, chiavari upgrades where photos hit, and lighting that flatters spend — high-end is sightlines + restraint.",
  },
  9: {
    archetype: "The Gather & Release",
    keywords: ["generosity", "closure arcs", "everyone seen"],
    playbook:
      "Your hosting shines at hello and goodbye — gratitude visible, favors thoughtful, last-call kindness. Mix circles so strangers leave friends; rotate intros before speeches stiffen. Let sentiment land — just pad transitions so tears don’t eat dinner.",
    rentalCue:
      "Generous tent footprint + obvious egress lighting — warmth scales when exits feel cared-for too.",
  },
  11: {
    archetype: "The Intuition DJ",
    keywords: ["timing", "vibe literacy", "elevated hunch"],
    playbook:
      "Trust micro-adjustments — dim when speeches start, swap playlist lanes when energy dips. You read rooms fast; write three ‘if this, then that’ cues your crew can execute so you’re not lone-wolf hosting. Mystique needs anchors — one printed timeline beats psychic exhaustion.",
    rentalCue:
      "Dimming-ready tent lighting packages — your reads land when tech can follow your instincts.",
  },
  22: {
    archetype: "The Blueprint Host",
    keywords: ["scale", "systems", "legacy polish"],
    playbook:
      "Big vision demands boring excellence — stake maps, generator etiquette, rain exec summary. Choreograph peaks (ceremony → cocktail → dance) so each earns the next. Show humility in logistics — guests feel safe when adults are visibly in charge.",
    rentalCue:
      "Multi-tent or satellite lounge plans shine here — separate noise from nurture without splitting the party’s soul.",
  },
  33: {
    archetype: "The Tender Amplifier",
    keywords: ["compassion", "community care", "soft power"],
    playbook:
      "Warmth at scale needs boundaries — accessible cues, inclusive seating, speeches that protect vulnerable guests. Lead with hospitality ethics: sober-forward options, sensory kindness, vendors thanked by name. Soft isn’t weak — it’s coordinated mercy.",
    rentalCue:
      "Quiet tent pockets + gentle acoustic zones — tenderness reads premium when logistics whisper underneath.",
  },
};

export function partyPathDeep(n: number): PartyPathDeep {
  const row = PARTY_PATH_DEEP[n];
  if (row) return row;
  return {
    archetype: "The Thoughtful Host",
    keywords: ["warmth", "backup plans", "guest-first"],
    playbook:
      "Lead with clarity — arrivals, allergies, weather voice — then layer delight. One meaningful ritual beats ten frantic upgrades.",
    rentalCue: "Defined tent room + obvious hospitality lanes — comfort reads expensive before décor does.",
  };
}
