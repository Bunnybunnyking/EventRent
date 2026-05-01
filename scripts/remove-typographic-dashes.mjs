/**
 * Replace em dash (—) and en dash (–) in user-facing copy only.
 *
 * Do NOT walk the whole repo: replacing typographic dashes inside arbitrary
 * TypeScript can break spread syntax (`...`), regex, and numeric ranges.
 *
 * Add paths here when you need another pass (then run from repo root):
 *   node scripts/remove-typographic-dashes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Relative paths under root that are safe to treat as mostly prose / string copy */
const ALLOWLIST = new Set([
  "lib/event-landing-data.ts",
  "lib/marketing-pages-data.ts",
  "lib/party-guides-data.ts",
  "lib/planning-hub-content.ts",
  "lib/planning-popular-sizes.ts",
  "lib/planning-faq.ts",
  "lib/service-area-town-content.ts",
  "lib/tent-large-pages.ts",
  "lib/tent-frame-pages.ts",
  "lib/tent-section-types.ts",
  "lib/rental-inventory-browser-data.ts",
  "lib/backyard-checklist-logic.ts",
  "lib/site-data.ts",
]);

function transform(content) {
  let s = content;

  s = s.replace(/(\d+×\d+)–(\d+×\d+)/g, "$1 to $2");
  s = s.replace(/~(\d[\d,]*)–(\d[\d,]*)/g, "~$1 to $2");
  s = s.replace(/(\d[\d,]*)–(\d[\d,]*)/g, "$1 to $2");
  s = s.replace(/([A-Z])–([A-Z])/g, "$1 to $2");
  s = s.replace(/([a-z])–([a-z])/gi, "$1 $2");
  s = s.replace(/–/g, " to ");
  s = s.replace(/—/g, ", ");
  s = s.replace(/,\s*,/g, ",");
  s = s.replace(/,\s*\./g, ".");
  s = s.replace(/\(\s*,/g, "(");

  return s;
}

let changed = 0;
for (const rel of ALLOWLIST) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes("—") && !before.includes("–")) continue;
  const after = transform(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed++;
    console.log(rel);
  }
}
console.log(`Done. Updated ${changed} allowlisted files.`);
