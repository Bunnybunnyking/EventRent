/** URL-safe slug from event name; caller resolves collisions. */
export function slugifyEventName(name: string): string {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return base.length > 0 ? base : "event";
}

export function withSlugSuffix(slug: string, suffix: string): string {
  const trimmed = slug.replace(/-+$/g, "");
  return `${trimmed}-${suffix}`;
}
