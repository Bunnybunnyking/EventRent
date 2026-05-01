import type { ServiceAreaTownPayload } from "@/lib/service-area-town-content";

/**
 * Files live under `public/images/service-areas/`. GPS/IPTC are embedded via
 * `npm run tag:service-area-photos` (uses exiftool; approximate town centroids).
 *
 * Hero fallback: only applied when the archetype rotator would otherwise leave
 * `hero` empty (`heroPick === null`). Does not override PRIORITY towns or stock
 * wedding/Wethersfield heroes.
 */
export const townHeroFillWhenEmpty: Partial<
  Record<string, NonNullable<ServiceAreaTownPayload["hero"]>>
> = {
  Cheshire: {
    src: "/images/service-areas/cheshire-ct-frame-tent-20x40.png",
    alt: "White frame tent on a residential lawn in the Cheshire, Connecticut area",
    caption:
      "20×40 frame line—seating and service lanes follow your headcount and layout",
  },
};

/** Specs for `scripts/tag-service-area-photos.ts` (GPS ~ town center, neutral description). */
export const serviceAreaPhotoTagSpecs: {
  relativePath: string;
  lat: number;
  lon: number;
  keywords: string[];
  description: string;
  title?: string;
}[] = [
  {
    relativePath: "public/images/home-hero-panoramic-tent.jpg",
    lat: 41.7658,
    lon: -72.6734,
    title: "Connecticut event rentals · panoramic white tent on grass",
    keywords: [
      "Connecticut party rentals",
      "frame tent",
      "outdoor event",
      "tent rental",
      "backyard tent",
      "wedding tent",
    ],
    description:
      "Panoramic white event tent on grass with guest tables; approximate geotag references the greater Hartford / Connecticut service area.",
  },
  {
    relativePath: "public/images/service-areas/glastonbury-ct-frame-tent-30x60.png",
    lat: 41.6863,
    lon: -72.6002,
    title: "Glastonbury CT area · frame tent 30x60",
    keywords: [
      "Connecticut party rentals",
      "Glastonbury CT",
      "frame tent",
      "30x60 tent",
      "outdoor event",
      "tent rental",
    ],
    description:
      "Illustrative frame tent installation for outdoor events; approximate location tagged for the Glastonbury, Connecticut community area. Connecticut Party Rentals.",
  },
  {
    relativePath: "public/images/service-areas/glastonbury-ct-navitrac-tent-30x30.png",
    lat: 41.6863,
    lon: -72.6002,
    title: "Glastonbury CT area · Navitrac tent 30x30",
    keywords: [
      "Connecticut party rentals",
      "Glastonbury CT",
      "Navitrac",
      "30x30 tent",
      "outdoor event",
    ],
    description:
      "Illustrative tent setup for outdoor gatherings; approximate location tagged for the Glastonbury, Connecticut community area. Connecticut Party Rentals.",
  },
  {
    relativePath: "public/images/service-areas/middletown-ct-frame-tent-20x40.png",
    lat: 41.5623,
    lon: -72.6507,
    title: "Middletown CT area · frame tent 20x40",
    keywords: [
      "Connecticut party rentals",
      "Middletown CT",
      "frame tent",
      "20x40 tent",
      "outdoor event",
    ],
    description:
      "Illustrative frame tent for outdoor events; approximate location tagged for the Middletown, Connecticut community area. Connecticut Party Rentals.",
  },
  {
    relativePath: "public/images/service-areas/cheshire-ct-frame-tent-20x40.png",
    lat: 41.4987,
    lon: -72.9009,
    title: "Cheshire CT area · frame tent 20x40",
    keywords: [
      "Connecticut party rentals",
      "Cheshire CT",
      "frame tent",
      "20x40 tent",
      "outdoor event",
    ],
    description:
      "Illustrative frame tent on lawn; approximate location tagged for the Cheshire, Connecticut community area. Connecticut Party Rentals.",
  },
  {
    relativePath: "public/images/gallery/ct-frame-tent-16x16.png",
    lat: 41.7658,
    lon: -72.6734,
    title: "Connecticut event area · frame tent 16x16",
    keywords: [
      "Connecticut party rentals",
      "frame tent",
      "16x16 tent",
      "backyard event",
      "outdoor gathering",
    ],
    description:
      "Illustrative compact frame tent setup for a Connecticut outdoor event; approximate geotag references the greater Hartford service area.",
  },
  {
    relativePath: "public/images/gallery/ct-fiesta-frame-tent-20x20.png",
    lat: 41.7658,
    lon: -72.6734,
    title: "Connecticut event area · fiesta frame tent 20x20",
    keywords: [
      "Connecticut party rentals",
      "fiesta frame tent",
      "20x20 tent",
      "outdoor event",
      "backyard party",
    ],
    description:
      "Illustrative fiesta-style frame tent for a Connecticut outdoor event footprint; approximate geotag references the greater Hartford service area.",
  },
  {
    relativePath: "public/images/gallery/ct-fiesta-frame-tent-20x40.png",
    lat: 41.7658,
    lon: -72.6734,
    title: "Connecticut event area · fiesta frame tent 20x40",
    keywords: [
      "Connecticut party rentals",
      "fiesta frame tent",
      "20x40 tent",
      "outdoor event",
      "tent rental",
    ],
    description:
      "Illustrative fiesta-style 20x40 frame tent layout for Connecticut events; approximate geotag references the greater Hartford service area.",
  },
  {
    relativePath: "public/images/gallery/ct-fiesta-frame-tent-30x30.png",
    lat: 41.7658,
    lon: -72.6734,
    title: "Connecticut event area · fiesta frame tent 30x30",
    keywords: [
      "Connecticut party rentals",
      "fiesta frame tent",
      "30x30 tent",
      "outdoor event",
      "tent rental",
    ],
    description:
      "Illustrative fiesta-style 30x30 frame tent setup for Connecticut outdoor programs; approximate geotag references the greater Hartford service area.",
  },
  {
    relativePath: "public/images/white-folding-chair-outdoor-event-ct.jpg",
    lat: 41.7658,
    lon: -72.6734,
    title: "Connecticut event rentals · white folding chairs outdoor seating",
    keywords: [
      "Connecticut party rentals",
      "white folding chair",
      "chair rentals",
      "event seating",
      "outdoor wedding",
      "table and chair rentals",
    ],
    description:
      "Outdoor event seating illustration: white folding chairs and lawn reception setup; approximate geotag references the greater Hartford / Connecticut service area.",
  },
  {
    relativePath: "public/images/60-inch-round-wood-table-outdoor-event-ct.jpg",
    lat: 41.7658,
    lon: -72.6734,
    title: "Connecticut event rentals · 60 inch round wood table outdoor",
    keywords: [
      "Connecticut party rentals",
      "round table rental",
      "60 inch table",
      "wedding table rental",
      "outdoor event",
      "table and chair rentals",
    ],
    description:
      "Illustrative 60-inch wood-style round table for outdoor receptions; approximate geotag references the greater Hartford / Connecticut service area.",
  },
  {
    relativePath: "public/images/gallery/ct-event-tent-professional-setup.png",
    lat: 41.7658,
    lon: -72.6734,
    title: "Connecticut event rentals · professional frame tent exterior",
    keywords: [
      "Connecticut party rentals",
      "frame tent",
      "event tent",
      "outdoor event",
      "tent rental",
      "professional tent",
    ],
    description:
      "Professional event tent exterior on grass; approximate geotag references the greater Hartford / Connecticut service area.",
  },
];
