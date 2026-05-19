/**
 * Shared imagery for service-area town “Explore resources” cards.
 * Paths are under `public/` — keep alts literal and location-neutral unless the file is town-specific.
 */
export const serviceAreaFeaturedImages = {
  navitracField: {
    src: "/images/gallery/ct-navitrac-frame-tent-30x60-spring-field.png",
    alt: "White Navitrac-style frame tent on grass for a Connecticut outdoor event",
  },
  eventSetup: {
    src: "/images/gallery/ct-event-tent-professional-setup.png",
    alt: "Professional white frame event tent exterior on grass in Connecticut",
  },
  fiesta2040: {
    src: "/images/gallery/ct-fiesta-frame-tent-20x40.png",
    alt: "20x40 fiesta-style frame tent on a lawn for a Connecticut outdoor gathering",
  },
  /** Tent plus guest tables — use when the card is about seating but the photo must still show the tent. */
  tentWithGuestTables: {
    src: "/images/wedding-tent-hero.png",
    alt: "White frame tent with round guest tables at an outdoor Connecticut reception",
  },
  fiesta3030: {
    src: "/images/gallery/ct-fiesta-frame-tent-30x30.png",
    alt: "30x30 white fiesta-style frame tent on grass for a Connecticut outdoor event",
  },
  frame1616: {
    src: "/images/gallery/ct-frame-tent-16x16.png",
    alt: "Compact 16x16 white frame tent for a Connecticut backyard or patio footprint",
  },
  highPeakBallast: {
    src: "/images/gallery/ct-high-peak-frame-10x10-pavement-ballast.png",
    alt: "High-peak frame tent on pavement with ballast blocks for a Connecticut outdoor setup",
  },
  roundTable: {
    src: "/images/60-inch-round-wood-table-outdoor-event-ct.jpg",
    alt: "60-inch round wood-grain folding table on a lawn at a Connecticut outdoor event",
  },
  foldingChair: {
    src: "/images/white-folding-chair-outdoor-event-ct.jpg",
    alt: "White folding chair on grass at an outdoor Connecticut reception",
  },
  panoramicTent: {
    src: "/images/home-hero-panoramic-tent.jpg",
    alt: "Wide white Connecticut event tent on grass with guest tables and string lights",
  },
} as const;
