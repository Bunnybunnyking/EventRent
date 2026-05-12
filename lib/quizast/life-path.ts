/**
 * Party Path number uses the common Western numerology reduction (sum birth-date digits YYYYMMDD,
 * reduce to 1–9 or master 11 / 22 / 33). Entertainment use only.
 */
export function computePartyPathNumber(isoDate: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!y || mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const check = new Date(y, mo - 1, d);
  if (check.getFullYear() !== y || check.getMonth() !== mo - 1 || check.getDate() !== d) return null;

  const compact = `${y}${String(mo).padStart(2, "0")}${String(d).padStart(2, "0")}`;
  let n = compact.split("").reduce((acc, ch) => acc + Number(ch), 0);
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split("")
      .reduce((acc, ch) => acc + Number(ch), 0);
  }
  return n;
}

/** @deprecated use computePartyPathNumber — same implementation */
export const computeLifePathNumber = computePartyPathNumber;

export type PartyHostSwatch = { hex: string; name: string };

/** Two décor-friendly colors per Party Path — linens, lighting, florals, signage */
export const PARTY_HOST_PALETTE: Record<number, [PartyHostSwatch, PartyHostSwatch]> = {
  1: [
    { hex: "#b42318", name: "Bold crimson" },
    { hex: "#c9a227", name: "Antique gold" },
  ],
  2: [
    { hex: "#c084a8", name: "Soft blush" },
    { hex: "#6b8f71", name: "Sage green" },
  ],
  3: [
    { hex: "#e8b923", name: "Sunshine yellow" },
    { hex: "#e07a5f", name: "Coral pop" },
  ],
  4: [
    { hex: "#1e3a5f", name: "Classic navy" },
    { hex: "#f4eee6", name: "Warm cream" },
  ],
  5: [
    { hex: "#0d9488", name: "Electric teal" },
    { hex: "#c026d3", name: "Vivid magenta" },
  ],
  6: [
    { hex: "#db7093", name: "Rose quartz" },
    { hex: "#faf7f2", name: "Ivory linen" },
  ],
  7: [
    { hex: "#312e81", name: "Midnight indigo" },
    { hex: "#a78bfa", name: "Soft lavender" },
  ],
  8: [
    { hex: "#374151", name: "Charcoal slate" },
    { hex: "#d4af37", name: "Champagne gold" },
  ],
  9: [
    { hex: "#c2410c", name: "Terracotta" },
    { hex: "#166534", name: "Forest green" },
  ],
  11: [
    { hex: "#94a3b8", name: "Moonlit silver" },
    { hex: "#7c3aed", name: "Iris violet" },
  ],
  22: [
    { hex: "#92400e", name: "Bronze umber" },
    { hex: "#475569", name: "Slate blue" },
  ],
  33: [
    { hex: "#fbcfe8", name: "Blush pink" },
    { hex: "#86efac", name: "Soft mint" },
  ],
};

export function partyHostPalette(n: number): [PartyHostSwatch, PartyHostSwatch] {
  const pair = PARTY_HOST_PALETTE[n];
  if (pair) return pair;
  return [
    { hex: "#6b5b4f", name: "Warm cocoa" },
    { hex: "#e8dcc8", name: "Soft champagne" },
  ];
}

/** One-line flavor text — not predictive; host-energy framing */
export const PARTY_PATH_SNIPPET: Record<number, string> = {
  1: "pioneer pulse: you lead the room when you name the plan.",
  2: "harmony pulse: pairings, pacing, and gentle flow carry you.",
  3: "expressive pulse: wit, music, and memorable lines.",
  4: "structure pulse: grounded layouts and dependable rhythm.",
  5: "movement pulse: variety, outdoor spill, adaptive energy.",
  6: "caretaker pulse: nesting, belonging, beautiful hosting duty.",
  7: "depth pulse: intimacy, atmosphere, meaningful pockets.",
  8: "presence pulse: confidence, scale, executive calm.",
  9: "gathering pulse: generosity, closure arcs, everyone seen.",
  11: "intuitive pulse: elevated vibe-reading; trust timing.",
  22: "builder pulse: big vision with grown-up logistics.",
  33: "heart-forward pulse: tenderness at scale (still real-world limits).",
};

/** @deprecated use partyPathSnippet */
export const LIFE_PATH_SNIPPET = PARTY_PATH_SNIPPET;

export function partyPathSnippet(n: number): string {
  return PARTY_PATH_SNIPPET[n] ?? "party-host pulse: mix warmth with a clear backup plan.";
}

/** @deprecated use partyPathSnippet */
export function lifePathSnippet(n: number): string {
  return partyPathSnippet(n);
}
