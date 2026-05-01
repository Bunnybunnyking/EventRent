/**
 * Embeds GPS (approximate town centroids) and XMP/IPTC description + keywords
 * for service-area PNGs. Run from repo root: `npm run tag:service-area-photos`
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exiftool } from "exiftool-vendored";
import { serviceAreaPhotoTagSpecs } from "../lib/service-area-town-photo-assets";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function main() {
  for (const spec of serviceAreaPhotoTagSpecs) {
    const abs = path.join(root, spec.relativePath);
    const kw = spec.keywords.join(", ");
    await exiftool.write(abs, {
      ImageDescription: spec.description,
      Description: spec.description,
      XPSubject: kw,
      XPKeywords: kw,
      Title: spec.title ?? "",
      ObjectName: spec.title ?? "",
      Keywords: spec.keywords,
      Subject: spec.keywords,
      GPSLatitude: spec.lat,
      GPSLongitude: spec.lon,
    });
    console.log("Tagged:", spec.relativePath);
  }
}

main()
  .then(() => exiftool.end())
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
    return exiftool.end();
  });
