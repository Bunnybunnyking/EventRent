/** Replace em dashes with natural punctuation so UI copy reads less “template-y”. En dashes in ranges (e.g. 8–10) are left intact. */
export function stripAiDashes(s: unknown): string {
  const str = typeof s === "string" ? s : "";
  return str
    .replace(/\s*—\s*/g, ". ")
    .replace(/\s{2,}/g, " ")
    .replace(/\.\s+\./g, ".")
    .trim();
}

/** Split into short paragraphs for card backs (sentences). */
export function sentencesForCardBack(s: unknown): string[] {
  const t = stripAiDashes(s);
  const parts = t
    .split(/\.\s+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => (x.endsWith(".") ? x : `${x}.`));
  return parts.length ? parts : [t];
}
