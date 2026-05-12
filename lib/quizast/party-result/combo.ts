import type { StyleFallbackKey } from "@/lib/quizast/zodiac";
import { STYLE_FALLBACK_OPTIONS } from "@/lib/quizast/zodiac";

/** 12 × 12 × 12 = 1,728 ordered combos */
export function getComboIndex(sun: number, moon: number, rising: number): number {
  const s = ((sun % 12) + 12) % 12;
  const m = ((moon % 12) + 12) % 12;
  const r = ((rising % 12) + 12) % 12;
  return s * 144 + m * 12 + r;
}

export function getComboKey(sun: number, moon: number, rising: number): string {
  return `${sun}-${moon}-${rising}`;
}

/** When Rising is skipped, proxy from Open Rising Style so combos stay in 0..1727 */
export function risingOrProxy(rising: number | null, style: StyleFallbackKey | null): number {
  if (rising !== null && rising !== undefined) return ((rising % 12) + 12) % 12;
  if (style) {
    const keys = STYLE_FALLBACK_OPTIONS.map((o) => o.key);
    const idx = keys.indexOf(style);
    if (idx >= 0) return idx % 12;
    let h = 0;
    for (let i = 0; i < style.length; i++) h = (h * 31 + style.charCodeAt(i)) >>> 0;
    return h % 12;
  }
  return 7;
}

/** FNV-1a style mixing for per-card seeds */
export function saltSeed(comboIndex: number, salt: string): number {
  let h = 2166136261 ^ comboIndex;
  for (let i = 0; i < salt.length; i++) h = Math.imul(h ^ salt.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function stablePick<T>(arr: readonly T[], seed: number): T {
  if (arr.length === 0) throw new Error("stablePick: empty array");
  return arr[seed % arr.length]!;
}

export function stablePickMany<T>(arr: readonly T[], seed: number, count: number): T[] {
  if (count <= 0) return [];
  const out: T[] = [];
  const used = new Set<number>();
  let s = seed;
  while (out.length < count && used.size < arr.length) {
    const i = s % arr.length;
    if (!used.has(i)) {
      used.add(i);
      out.push(arr[i]!);
    }
    s = Math.imul(s + 7919, 1103515245);
  }
  return out;
}
