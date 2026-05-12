/**
 * Serialize structured data for `<script type="application/ld+json">`.
 * Escapes `<` so a stray `</script>` inside a string cannot break the HTML document.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
