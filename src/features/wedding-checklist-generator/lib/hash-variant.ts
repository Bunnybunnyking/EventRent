/** Deterministic “A/B” style picks from inputs, no Math.random. */
export function stableHash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function pickVariant<T>(variants: readonly T[], seed: string): T {
  if (variants.length === 0) throw new Error("pickVariant: empty variants");
  return variants[stableHash(seed) % variants.length]!;
}

export function pickIndex(seed: string, modulo: number): number {
  if (modulo <= 0) return 0;
  return stableHash(seed) % modulo;
}
