/**
 * Customer-facing inventory snapshot for tent section copy.
 * Numbers are for positioning and realism, not a live availability API.
 */

export const tentInventoryCopy = {
  seating: {
    plasticFoldingChairs: 8_000, whitePaddedChairs: 300, }, tables: {
    banquet8ft: 170, banquet6ft: 140, round60in: 150, round72in: 29, round48in: 30, round36in: 32, cocktailHighTop: 35, }, tents: {
    frame10x10: 52, frame12x12: 12, frame16x16: 16, frame20x20: 18, frame30x30: 12, clearspan60x60: 1, clearspan60x90: 1, clearspan60x150: 1, expandable20ftSystems: 6, expandable30ftJTLite: 3, marqueeTotalLinearFt: 300, marquee40Ends: 6, marquee40Mids: 8, marquee30Ends: 10, marquee30Mids: 10, anchor30x60OnePiece: 2, anchor30x45TwoPiece: 2, },
} as const;

/** Quick table math for planning copy (estimated, layout-dependent). */
export const quickGuestTableCounts = [
  { guests: 40, rounds: 5, banquetTables: 5, chairs: 40 }, { guests: 60, rounds: 8, banquetTables: 8, chairs: 60 }, { guests: 80, rounds: 10, banquetTables: 10, chairs: 80 }, { guests: 100, rounds: 13, banquetTables: "12 to 13", chairs: 100 }, { guests: 120, rounds: 15, banquetTables: 15, chairs: 120 },
] as const;
