import type { TentPairedRental, TentSizePageData } from "./tent-section-types";

const disclaimer =
  "Counts are estimates. Tables, aisles, dance floor, buffet, bar, and site layout change what is safe and comfortable.";

function pr(title: string, note?: string): TentPairedRental {
  return note ? { title, note } : { title };
}

export const frameTentPages: Record<string, TentSizePageData> = {
  "10x10-frame-tent-rental": {
    slug: "10x10-frame-tent-rental",
    sizeLabel: "10×10",
    sqft: 100,
    heroHeadline: "10×10 frame tent rentals in Connecticut",
    pageTitle: "10×10 Frame Tent Rental | Vendor, Entry & Small Cover | CT",
    metaDescription:
      "10×10 frame tent in Connecticut: about 100 sq ft clear-span for bars, DJs, check-in, vendors, and small shade— not a seated dinner tent. Quote with layout.",
    heroSubhead: "Small clear-span cover for a defined job: sound, drinks, gifts, or registration—not a main reception span.",
    quickAnswer:
      "A 10×10 frame tent is roughly 100 square feet with no center pole. It is best for vendor booths, DJ or gear cover, registration, bar or dessert stations, and other add-on zones beside a larger tent—not for full seated dinners.",
    bestForWho: ["Hosts who already have a main tent", "Vendor and festival rows", "DJs needing weather-safe gear space", "Check-in and gift tables"],
    tentOverview:
      "Frame construction keeps the whole box usable—no pole in the middle—so equipment and tight furniture line up predictably. Compared with larger sizes, a 10×10 trades almost all guest seating for simplicity: easy to place on patios or driveways when anchoring is planned, too small when dinner and dancing must live under one roof.",
    commonEventUses: [
      "Vendor or craft booth",
      "DJ, ceremony musicians, or small PA cover",
      "Bar, dessert, or coffee station",
      "Registration, ticketing, or welcome table",
    ],
    planningNotes: [
      "Leave queue space outside the canopy if guests line up for drinks or IDs.",
      "Run power and audio paths before locking orientation—doors and walls need a plan.",
      "If dinner is under another tent, match style and lighting so the pair reads as one event.",
      "Hard surfaces usually mean ballast; say so early when you request a quote.",
    ],
    guestSeatedEstimate: "Usually cover and service, not full rounds—at most a few small tables if the list is tiny.",
    guestCocktailEstimate: "Standing clusters or a single service island; keep lines short so guests are not trapped.",
    surfacesNote: "Common on patios, asphalt, and lawns when the footprint must stay small and stakes or weights are manageable.",
    whatFits: [
      "Splits the program: main tent handles dinner, 10×10 handles bar, DJ, or dessert in cleaner flow.",
      "Shields gear and staff from sun or quick rain without renting more canopy than the job needs.",
    ],
    layoutExamples: [
      { title: "DJ or tech shell", body: "Keeps controllers and speakers dry while guests sit or dance under a larger tent nearby." },
      { title: "Satellite bar", body: "Pulls drink service away from buffet lines so aisles in the main tent stay calmer." },
      { title: "Check-in or gifts", body: "Short visits, small footprint, easy for guests to find at the edge of the lawn." },
    ],
    whenToSizeUp: [
      "You want seated rounds for more than a handful of guests in the same tent—start at 16×16 or 20×20.",
      "You need buffet line and bar inside with comfortable circulation—move up a size class.",
    ],
    bestAddOns: ["Sidewalls for wind-driven rain", "Lighting for evening service", "Weights or ballast on hardscape", "Cocktail tables and folding chairs from inventory"],
    pairedRentals: [
      pr("Sidewalls / window walls", "Cut wind when the station runs late."),
      pr("Bistro or work lighting", "Enough light for safe pours and signatures after sunset."),
      pr("Cocktail tables", "Standing drinks beside a satellite bar."),
      pr("Beige folding chairs", "A few seats for older guests near check-in or gifts."),
      pr("Surface ballast plan", "When stakes are not an option—we coordinate with your surface photos."),
    ],
    faqs: [
      {
        question: "What is a 10×10 tent best used for?",
        answer:
          "Focused jobs: vendor booth, DJ cover, registration, bar, or dessert—not a full seated reception. Tell us what you are covering and we confirm anchoring and neighbors.",
      },
      {
        question: "Is a 10×10 enough for seating?",
        answer:
          "Only for very small clusters. If you expect real rounds or a buffet line inside the same tent, size up so aisles and exits stay safe.",
      },
      {
        question: "Can it sit on a driveway or patio?",
        answer:
          "Often yes, that is a common ask. Photos and measurements help us choose weights or stakes so the install matches the surface.",
      },
      {
        question: "Can we add sidewalls later?",
        answer:
          "Sometimes inventory allows it, but walls are easier when planned up front with anchoring. Mention it in your first note so we reserve the right hardware.",
      },
    ],
  },

  "12x12-frame-tent-rental": {
    slug: "12x12-frame-tent-rental",
    sizeLabel: "12×12",
    sqft: 144,
    heroHeadline: "12×12 frame tent rentals in Connecticut",
    pageTitle: "12×12 Frame Tent Rental | Tight Sites & Service Cover | CT",
    metaDescription:
      "12×12 frame tent rentals in Connecticut: 144 sq ft clear-span—slightly wider than 10×10 for bar lines, compact lounges, or satellite cover next to a main tent.",
    heroSubhead: "A modest bump in width over 10×10—still a service-first footprint, not a default dinner tent.",
    quickAnswer:
      "A 12×12 frame tent is about 144 square feet clear-span. It is still sized for auxiliary cover—wider bar back-stock, a compact lounge, or sideyard service—more than 10×10, but not where we plan full seated receptions.",
    bestForWho: ["Sideyard or tight lot hosts", "Couples splitting bar from dinner tent", "Small hospitality or lounge vignettes"],
    tentOverview:
      "Frame means no center pole: you keep a simple rectangle for furniture and lines. Versus 10×10 you gain a little breathing room for dual service points; versus 16×16 or 20×20 you still lack span for rounds plus dance. Think of it as precision cover, not your main party roof.",
    commonEventUses: ["Expanded bar or dessert island", "Soft seating nook", "Satellite cover beside a larger frame tent"],
    planningNotes: [
      "If two service roles share the tent, sketch traffic so staff are not back-to-back.",
      "Marquee or frame connectors sometimes bridge this tent to a larger box—photos help.",
      "Lighting matters when the nook runs past sunset—plan one practical layer minimum.",
      "Snow fencing or neighbor sightlines: keep exits obvious.",
    ],
    guestSeatedEstimate: "Limited—small clusters only; most bookings stay standing or service-heavy.",
    guestCocktailEstimate: "Modest standing groups when furniture stays light.",
    whatFits: [
      "Adds width when 10×10 feels tight for bar storage or guest approach.",
      "Pairs with 20×20+ when dinner lives under the big tent and this handles spillover service.",
    ],
    layoutExamples: [
      { title: "Dual-line bar", body: "Extra width for back bar and ice without stealing dinner space." },
      { title: "Lounge vignette", body: "Two love seats and a coffee table for quiet conversation away from the band." },
      { title: "Connector end-cap", body: "Weather break at the end of a marquee run into the yard." },
    ],
    whenToSizeUp: [
      "You want seated rounds for more than a very small group—look at 16×16 or 20×20.",
      "Dance floor and seated dinner must share one tent—jump to 20×30 or larger.",
    ],
    bestAddOns: ["Sidewalls", "Lighting", "Low turf protection if needed", "Marquee connector hardware"],
    pairedRentals: [
      pr("Sidewalls", "Windy side yards or late-season evenings."),
      pr("Bistro lighting", "Defines the nook without glare in guests' eyes."),
      pr("Cocktail tables & stools", "Standing drinks beside a compact bar."),
      pr("Marquee connector", "When this box meets a walkway or larger tent."),
    ],
    faqs: [
      {
        question: "12×12 vs 10×10—which should I pick?",
        answer:
          "Choose 12×12 when bar storage, two service faces, or a tiny lounge needs a few extra feet. Stay at 10×10 when the job is strictly single-purpose and space is razor tight.",
      },
      {
        question: "How many people fit seated?",
        answer: `Very small counts only. ${disclaimer}`,
      },
      {
        question: "Can this be my only tent?",
        answer:
          "Only for micro guest lists or standing-only programs. Most Connecticut backyards that seat guests choose 20×20 or larger as the main tent.",
      },
      {
        question: "Do you deliver and stake it?",
        answer:
          "Yes—delivery and install are quoted with the tent. Surface type decides stakes vs ballast; send photos with your request.",
      },
    ],
  },

  "16x16-frame-tent-rental": {
    slug: "16x16-frame-tent-rental",
    sizeLabel: "16×16",
    sqft: 256,
    heroHeadline: "16×16 frame tent rentals in Connecticut",
    pageTitle: "16×16 Frame Tent Rental | Micro-Seated & Service Layouts | CT",
    metaDescription:
      "16×16 frame tent in Connecticut: 256 sq ft clear-span—buffet, DJ, or very small seated lists. Honest guidance before you commit vs 20×20.",
    heroSubhead: "Still a specialty footprint: very small seated counts, or service-forward layouts—not our default main backyard reception size.",
    quickAnswer:
      "A 16×16 frame tent is about 256 square feet clear-span. It can seat a very small dinner list when the layout is disciplined, but most hosts who want a typical backyard party choose 20×20 or larger. It shines as buffet, DJ, lounge, or tight-lot cover.",
    bestForWho: ["Lists around two dozen seated or fewer", "Hosts who need service-first space on a tight lot", "Add-on zones beside a larger tent"],
    tentOverview:
      "Frame keeps the interior open—plan tables without working around a pole. Smaller than 20×20, you trade guest buffer and service lanes; larger than 12×12, you can fit a modest round cluster if the program is honest about aisles. We compare this to 20×20 early so you are not surprised on install day.",
    commonEventUses: ["Very small seated dinner", "Buffet or DJ-forward layout", "Graduation dessert and gift zone", "Corporate meet-and-greet with tight footprint"],
    planningNotes: [
      "If seated, confirm head table, cake, and aisle width before you lock size—there is little margin.",
      "Dance usually wants to live just outside the edge or in the next size up.",
      "Buffet lines need approach space; do not hug the perimeter with chairs.",
      "Photography and emergency egress still matter at small sizes.",
    ],
    guestSeatedEstimate: "Often about two dozen or fewer for rounds when aisles stay realistic; otherwise service-first.",
    guestCocktailEstimate: "Standing or mixed furniture can go higher when tables do not eat the floor.",
    whatFits: [
      "Bridges the gap when 12×12 is tight but 20×20 will not fit the lot.",
      "Still frequently paired with a larger tent when dinner scales past this box.",
    ],
    layoutExamples: [
      { title: "Micro seated dinner", body: "Few rounds, short head table, cake staged with a clear aisle." },
      { title: "Buffet + standing", body: "Food line hugging one wall, mingling elsewhere under the same roof." },
      { title: "DJ + lounge", body: "Sound at one end, soft seating opposite, guests rotate through." },
    ],
    whenToSizeUp: [
      "Guest list or service plan outgrows tight aisles—20×20 is the usual backyard main-tent floor.",
      "You want dance, buffet, and full rounds together—plan 20×30+.",
    ],
    bestAddOns: ["Sidewalls", "Lighting", "Adjacent dance floor on lawn or patio", "Marquee connector to main tent"],
    pairedRentals: [
      pr("Round tables", "Only when counts stay small— we map aisles in quoting."),
      pr("Banquet tables", "Head table or buffet when depth matters more than width."),
      pr("Sidewalls", "Spring graduations and breezy ridge lines."),
      pr("Heaters", "If walls close for part of the night—plan volume and airflow with us."),
      pr("Bistro lighting", "Warm light without washing out photos."),
    ],
    faqs: [
      {
        question: "Is 16×16 enough for a backyard party?",
        answer:
          "It can be—for very small seated lists or standing-heavy programs. For a typical Connecticut backyard reception with rounds and a dance plan, we usually start the conversation at 20×20.",
      },
      {
        question: "How many people fit seated?",
        answer: `Often roughly two dozen or fewer when rounds are realistic. ${disclaimer}`,
      },
      {
        question: "Can I fit a dance floor inside?",
        answer:
          "Rarely comfortably with full rounds. Most layouts set dance just outside the edge or move to a longer footprint like 20×30.",
      },
      {
        question: "Can it go on a patio?",
        answer:
          "Sometimes, if the pad is rated for the load and anchoring plan. Photos and dimensions keep surprises off the calendar.",
      },
    ],
  },

  "20x20-frame-tent-rental": {
    slug: "20x20-frame-tent-rental",
    sizeLabel: "20×20",
    sqft: 400,
    heroHeadline: "20×20 frame tent rentals in Connecticut",
    pageTitle: "20×20 Frame Tent Rental | Backyard Main-Tent Starting Point | CT",
    metaDescription:
      "20×20 frame tent rental in Connecticut: 400 sq ft clear-span—common starting point for backyard parties when you want real seated room, not just service cover.",
    heroSubhead: "Four hundred square feet clear-span—often the first size we treat as a true main-tent candidate for backyards.",
    quickAnswer:
      "A 20×20 frame tent is 400 square feet with no center pole. For many Connecticut backyards it is the practical minimum when you want seated guests, aisles, and a little breathing room under one roof—smaller tents stay better for bars, DJs, and add-ons.",
    bestForWho: ["Backyard hosts with modest guest counts", "Grad parties needing one central tent", "Small corporate dinners", "Hosts pairing a satellite bar elsewhere"],
    tentOverview:
      "Frame construction keeps the floor flexible: rounds, banquet, or a tight dance slice when the plan is honest about priorities. Versus 16×16 you gain real guest buffer; versus 20×30 you trade length that helps separate buffet lines from dance. We still compare to 20×30 when buffet and dance both insist on living inside.",
    commonEventUses: ["Backyard birthday or anniversary dinner", "Graduation with rounds and gift table", "Small wedding reception", "Cocktail-to-dinner flip with tight reset"],
    planningNotes: [
      "Decide early if dance lives inside, just outside the edge, or in the next size.",
      "Buffet and bar lines need approach lanes—do not fill the rectangle edge-to-edge with rounds.",
      "Sidewalls change airflow—say if you want partial walls for wind only.",
      "Driveway installs need ballast planning; grass may allow stakes—photos speed quoting.",
    ],
    guestSeatedEstimate: "Often roughly 32–48 seated at rounds when aisles and service stay realistic.",
    guestCocktailEstimate: "Standing counts go higher when tables stay minimal—still plan bar egress.",
    surfacesNote: "Works on many surfaces with the right anchoring; send driveway or patio photos early.",
    whatFits: [
      "A credible main tent for many backyard lists when the program is dinner-forward, not festival-scale.",
      "Still works as a satellite when a larger tent handles the crowd and you want a quiet dinner pod.",
    ],
    layoutExamples: [
      { title: "Compact seated dinner", body: "Rounds with a slim dance slice or dance just beyond the perimeter." },
      { title: "Cocktail-first", body: "High-tops and a small bar wall when mingling dominates." },
      { title: "Buffet + rounds", body: "Food along one side, queue space modeled before chairs lock in." },
    ],
    whenToSizeUp: [
      "Buffet, dance, and full rounds all want air—20×30 or 20×40 is usually calmer.",
      "Guest count climbs past the mid-forties seated with generous aisles—re-layout before you commit.",
    ],
    bestAddOns: ["Sidewalls for weather", "Lighting package", "10×10 satellite for DJ when splitting sound from dinner", "Marquee connector when flow crosses pavement"],
    pairedRentals: [
      pr("Round tables", "Most common guest seating for backyard dinners."),
      pr("Beige folding chairs", "Practical backyard default—upgrade paths available."),
      pr("Buffet tables", "Food service with depth for warmers and linens."),
      pr("Bistro lighting", "Evening ambiance without harsh wash."),
      pr("Sidewalls", "Wind and quick-rain backup when the forecast wobbles."),
    ],
    faqs: [
      {
        question: "How many people fit under a 20×20 tent?",
        answer:
          "Often roughly 32–48 seated at rounds when aisles and head table stay reasonable. Cocktail counts run higher. We confirm with your actual layout, not a chart alone.",
      },
      {
        question: "Is a 20×20 good for a backyard party?",
        answer:
          "Yes, for many modest guest counts it is the right starting point as the main tent. If you need buffet, dance, and full rounds inside with space to breathe, we may steer you longer before you book.",
      },
      {
        question: "Can a 20×20 go on a driveway or patio?",
        answer:
          "Often, with ballast or protection matched to the surface. Send measurements and photos so anchoring and door swing are planned, not guessed.",
      },
      {
        question: "What tables and chairs pair well?",
        answer:
          "Rounds with folding chairs are common; head tables sometimes use banquet tables. We align chair style and linen level with your event tone when we quote.",
      },
    ],
  },

  "20x30-frame-tent-rental": {
    slug: "20x30-frame-tent-rental",
    sizeLabel: "20×30",
    sqft: 600,
    heroHeadline: "20×30 frame tent rentals in Connecticut",
    pageTitle: "20×30 Frame Tent Rental | Extra Length for Flow | CT",
    metaDescription:
      "20×30 frame tent rentals in Connecticut: 600 sq ft clear-span—extra length for aisles, buffet lines, or a modest interior dance floor without jumping to 20×40.",
    heroSubhead: "Six hundred square feet stretched longer than 20×20—helpful when lines, aisles, or a tight dance floor need length.",
    quickAnswer:
      "A 20×30 frame tent is 600 square feet clear-span with more length than 20×20. It helps when you need better queue space for buffet or bar, cleaner aisles, or a small dance floor inside without committing to a full 20×40 yet.",
    bestForWho: ["Weddings with dinner and compact dance inside", "Graduations with gift and dessert traffic", "Corporate dinners needing service lanes"],
    tentOverview:
      "Still a single rectangle without center poles, so designers keep rows predictable. Compared with 20×20 you buy length for circulation; compared with 20×40 you keep a slightly smaller footprint on tight lots. We still check head table, stage, and bar count before we bless the size.",
    commonEventUses: ["Seated dinner with slim dance floor", "Buffet hugging one long wall", "Ceremony-to-reception flip with disciplined reset"],
    planningNotes: [
      "Length helps buffet queues—place lines so they do not face the band subs.",
      "Dance floor width should be chosen before chairs finalize—no last-minute shrinking.",
      "Sidewalls on one wind side sometimes beat zipping everything closed.",
      "Power for band and caterer should be mapped before orientation locks.",
    ],
    guestSeatedEstimate: "Often roughly 48–72 seated at rounds when dance and service zones are sized intentionally.",
    guestCocktailEstimate: "Standing counts rise when furniture thins—still watch exits.",
    whatFits: [
      "A practical middle step when 20×20 math feels tight but the lot will not take 20×40.",
      "Strong when length separates functions along the long walls instead of cramming the center.",
    ],
    layoutExamples: [
      { title: "Dinner + slim dance", body: "Dance at one end, rounds clustered with aisles for photography." },
      { title: "Buffet + rounds", body: "Queue runs the long side so guests re-enter without crossing the head table." },
      { title: "Hybrid high-tops + rounds", body: "Early cocktail inside, then tables open after a quick reset." },
    ],
    whenToSizeUp: [
      "You want a comfortable dance floor and wide aisles with buffet inside—20×40 is often smoother.",
      "Guest count pushes well past sixties seated with generous rounds—validate early.",
    ],
    bestAddOns: ["Sidewalls", "Lighting", "Dance floor sized to band needs", "10×20 prep tent when splitting catering"],
    pairedRentals: [
      pr("Dance floor", "Sized to your band or DJ footprint—quoted with perimeter clearance."),
      pr("Round tables", "Guest seating with aisle plan."),
      pr("Buffet tables", "Food lines along the long dimension."),
      pr("Lighting upgrade", "Practical work light plus bistro layer."),
      pr("Sidewalls", "Weather backup without sealing guests in on warm nights."),
    ],
    faqs: [
      {
        question: "20×30 vs 20×20—which do I need?",
        answer:
          "Choose 20×30 when buffet lines, head table depth, or a modest interior dance floor needs more length. Stay at 20×20 when the guest list and program are simpler.",
      },
      {
        question: "Can I fit a dance floor inside?",
        answer:
          "Often a modest floor fits when rounds and service lanes are disciplined. If you want a large floor plus buffet inside, we usually look at 20×40 or wider.",
      },
      {
        question: "Is this enough for a wedding?",
        answer:
          "For smaller guest counts and a tight-but-fair layout, yes. For larger lists, wide aisles, and big dance energy, we usually add length or width before locking inventory.",
      },
      {
        question: "Can I add lighting and sidewalls?",
        answer:
          "Yes—both are common. Tell us how enclosed you want to be at night so heating and airflow stay sensible.",
      },
    ],
  },

  "20x40-frame-tent-rental": {
    slug: "20x40-frame-tent-rental",
    sizeLabel: "20×40",
    sqft: 800,
    heroHeadline: "20×40 frame tent rentals in Connecticut",
    pageTitle: "20×40 Frame Tent Rental | Popular Dinner Footprint | CT",
    metaDescription:
      "20×40 frame tent rental in Connecticut: ~800 sq ft clear-span—popular seated-dinner footprint when buffet, bar, and dance need realistic room in one tent.",
    heroSubhead: "About eight hundred square feet clear-span—one of the most asked-about dinner layouts we quote.",
    quickAnswer:
      "A 20×40 frame tent is roughly 800 square feet with no center pole. It is a common answer when Connecticut hosts want seated rounds, buffet or bar lines, and at least a conversation-sized dance plan inside one tent—still layout-dependent, not magic.",
    bestForWho: ["Weddings in the dozens to mid-sixties seated range", "Corporate awards or donor dinners", "Family celebrations with full service inside"],
    tentOverview:
      "Frame keeps the long sides workable for buffet queues, head tables, and band corners without a pole grid. Versus 20×30 you gain length for calmer aisles; versus 30×30 you stay narrower on tighter lots. We still challenge the plan if dance, stage, and dual bars all demand maximum size simultaneously.",
    commonEventUses: ["Tented wedding reception", "Seated fundraiser", "Backyard reception with buffet inside", "Dinner with compact interior dance"],
    planningNotes: [
      "Head table focal wall vs buffet wall—pick early so photography and traffic agree.",
      "Dance floor area should be chosen before rounds finalize—avoid shoehorning.",
      "Sidewalls: decide full enclosure vs wind side only before heater talks.",
      "Marquee to building or parking can change door placement—send site photos.",
    ],
    guestSeatedEstimate: "Often roughly 50–65 seated at rounds when dance, buffet, and aisles stay intentional.",
    guestCocktailEstimate: "Standing counts climb when tables thin—bar placement still drives comfort.",
    surfacesNote: "Grass, asphalt, and some patios work with the right anchoring plan—site photos matter.",
    whatFits: [
      "The tent people mean when they ask what fits in a 20×40 for real Connecticut yards.",
      "Buffet and bar can live inside when lines are modeled—otherwise we split functions to a satellite tent.",
    ],
    layoutExamples: [
      { title: "Seated dinner", body: "Rounds, defined head table lane, aisles wide enough for service and guests." },
      { title: "Dinner + dance", body: "Dance sized intentionally—if the floor grows, rounds or buffet may need to flex." },
      { title: "Hybrid cocktail start", body: "Some high-tops early, then flip to rounds if timeline and staff path allow." },
    ],
    whenToSizeUp: [
      "Guest list pushes past mid-sixties seated with comfortable aisles.",
      "You want a large dance floor, big stage, and dual bars all fully inside—look wider or longer.",
    ],
    bestAddOns: ["Sidewalls or window walls", "Layered lighting", "Dance floor", "10×10 DJ satellite or marquee to parking"],
    pairedRentals: [
      pr("Round tables", "Guest seating with layout map."),
      pr("White padded chairs", "When the look steps up from backyard default."),
      pr("Buffet & head tables", "Banquet lengths for food and family."),
      pr("Dance floor", "Sized with band or DJ footprint in mind."),
      pr("Marquee connector", "Dry walk from parking or venue doors."),
    ],
    faqs: [
      {
        question: "What size tent for 60 guests?",
        answer:
          "A 20×40 is often in the conversation for seated rounds, but 60 people is not a guarantee—dance, buffet, head table, and aisle width decide. We quote from a layout conversation, not a headline count.",
      },
      {
        question: "Is a 20×40 good for a wedding?",
        answer:
          "Yes, for many guest counts and programs it is a strong fit. If your list, dance floor, and service plan need more span, we say so before you book.",
      },
      {
        question: "Can buffet and dance both be inside?",
        answer:
          "Often yes when each zone is sized intentionally. If both want to be large, we may add length, width, or a small satellite tent.",
      },
      {
        question: "Do sidewalls change heating?",
        answer:
          "Yes—more enclosure changes airflow and heater planning. Tell us how closed you want to be at night so we plan responsibly.",
      },
    ],
  },

  "30x30-frame-tent-rental": {
    slug: "30x30-frame-tent-rental",
    sizeLabel: "30×30",
    sqft: 900,
    heroHeadline: "30×30 frame tent rentals in Connecticut",
    pageTitle: "30×30 Frame Tent Rental | Wider Reception Footprint | CT",
    metaDescription:
      "30×30 frame tent rentals in Connecticut: ~900 sq ft clear-span—extra width and depth vs 20×40 for dance, lounge, or larger seated counts when the lot allows.",
    heroSubhead: "Nine hundred square feet clear-span—more room to separate dance, service, and seating than long narrow boxes alone.",
    quickAnswer:
      "A 30×30 frame tent is about 900 square feet square clear-span. It helps when 20×40 feels tight for dance floor separation, lounge furniture, or larger seated counts—still a single-tent backyard option when the pad is wide enough.",
    bestForWho: ["Mid-size weddings", "Large backyard celebrations", "School or community events on generous lawns", "Corporate galas when footprint is square"],
    tentOverview:
      "Frame keeps the interior pole-free, so rounds, dance, and buffet walls negotiate in two directions, not just along a long rectangle. Versus 20×40 you trade length for width—sometimes easier on square lawns; versus 30×45 you have less length for deep buffet lines. We pick with your satellite plan and property lines in hand.",
    commonEventUses: ["Wedding reception with dance inside", "Graduation with high traffic", "Corporate awards with stage sightlines", "Large family reunion"],
    planningNotes: [
      "Square footprints still need door placement for weather and wind.",
      "Lounge plus dance plus rounds is possible—priority order matters.",
      "Power distro for band and caterer grows with tent size—flag vendors early.",
      "Photography sightlines from corners—avoid stacking tall decor in blind spots.",
    ],
    guestSeatedEstimate: "Often roughly 60–80 seated at rounds when dance, head table, and buffet are balanced.",
    guestCocktailEstimate: "Standing counts can rise—still plan bar count and egress.",
    whatFits: [
      "A common upgrade when 20×40 math gets tight for interior dance and comfortable aisles.",
      "Strong when the lot is naturally square and you want one central roof.",
    ],
    layoutExamples: [
      { title: "Dance separated from rounds", body: "Width helps keep the floor from eating every aisle." },
      { title: "Buffet + rounds", body: "Queue along one side with re-entry lanes that avoid the head table." },
      { title: "Lounge pocket", body: "Soft seating zone without stealing the whole dance footprint." },
    ],
    whenToSizeUp: [
      "Guest list and service plan need more continuous length—30×45 or modular expansion.",
      "You want very wide aisles plus large dance plus dual bars—validate width early.",
    ],
    bestAddOns: ["Sidewalls", "Flooring for grade changes", "Marquee entry", "Satellite prep tent"],
    pairedRentals: [
      pr("Larger dance floor", "When the band footprint is part of the quote."),
      pr("Round tables & linens", "Guest seating with upgraded textile plan."),
      pr("Lighting design", "Layer practical and decorative fixtures."),
      pr("Sidewalls / window walls", "Wind and rain strategy."),
      pr("Flooring", "When grade or chair stability needs help."),
    ],
    faqs: [
      {
        question: "Is a 30×30 big enough for a wedding or graduation?",
        answer:
          "For many mid-size guest counts, yes—especially when dance and buffet are sized with discipline. Very large lists or huge dance goals may need more length or modular width.",
      },
      {
        question: "What layout works best?",
        answer:
          "One that names priorities: dance size, buffet approach, head table focal line, and exits. We model those before we lock tent size.",
      },
      {
        question: "Can I add lighting and sidewalls?",
        answer:
          "Yes—both are common. Tell us how late you run and how enclosed you want to be so airflow and heaters stay sensible.",
      },
      {
        question: "30×30 vs 20×40?",
        answer:
          "30×30 is squarer and wider; 20×40 is longer and narrower. Lot shape, where doors should face, and how you want dance separated from rounds usually pick the winner.",
      },
    ],
  },

  "30x45-frame-tent-rental": {
    slug: "30x45-frame-tent-rental",
    sizeLabel: "30×45",
    sqft: 1350,
    heroHeadline: "30×45 frame tent rentals in Connecticut",
    pageTitle: "30×45 Frame Tent Rental | Dinner + Dance Inside | CT",
    metaDescription:
      "30×45 frame tent rental in Connecticut: ~1,350 sq ft clear-span—strong when dinner, dance, and service want generous room in one tent without jumping to the largest structures.",
    heroSubhead: "Thirteen-fifty square feet clear-span—length and width for serious reception flow.",
    quickAnswer:
      "A 30×45 frame tent is about 1,350 square feet clear-span. It is built for dinner-plus-dance receptions that want realistic aisles, buffet or bar lines, and head table depth inside one roof—still quoted from layout, not guest count alone.",
    bestForWho: ["Weddings with full reception under one tent", "Fundraisers with program + dinner", "Large family events with dance priority"],
    tentOverview:
      "Frame construction keeps the floor open for stage sightlines, dance energy, and service carts. Versus 30×30 you gain length for queues and band spread; versus 30×60 you stay slightly smaller for lots that cannot swallow the next jump. We still talk modular options when guest counts climb fast.",
    commonEventUses: ["Wedding reception with interior dance", "Corporate gala with stage", "Large graduation open house", "Community donor dinner"],
    planningNotes: [
      "Band power, stage size, and subwoofer placement belong in the first layout pass.",
      "Dual bars only when lines can face different walls—otherwise queues collide.",
      "Head table focal wall vs dance sightlines—pick the winner early.",
      "Marquee arrival paths help when parking is far from the lawn.",
    ],
    guestSeatedEstimate: "Often roughly 90–120 seated at rounds when dance, stage, and buffet are modeled—not guaranteed maximums.",
    guestCocktailEstimate: "Hybrid formats scale with bar placement and egress discipline.",
    whatFits: [
      "When you want dinner, dance, and service zones to coexist without constantly bumping chairs.",
      "Pairs with marquee connectors when guests walk from parking or venue doors in weather.",
    ],
    layoutExamples: [
      { title: "Dinner + dance + band", body: "Length separates subs from head table while aisles stay passable." },
      { title: "Dual buffet", body: "When counts warrant two lines—length is your friend." },
      { title: "Stage-forward program", body: "Sightlines and speaker delay mapped with rental footprint." },
    ],
    whenToSizeUp: [
      "Guest list and furniture plan exceed comfortable low triple digits seated with large dance.",
      "You want very wide lounge, two large stages, or exhibition rows—look at 30×60 or modular systems.",
    ],
    bestAddOns: ["Sidewalls", "Premium lighting", "Large dance floor", "Marquee connector", "Satellite prep tents"],
    pairedRentals: [
      pr("Stage & dance package", "Quoted with clearance and skirt boards in mind."),
      pr("Head table & rounds", "Family focal line plus guest seating."),
      pr("Buffet tables", "Dual lines when the guest count warrants it."),
      pr("Chivari or padded chairs", "When the look matches the program."),
      pr("Marquee walkway", "Rain-protected arrival from parking or building."),
    ],
    faqs: [
      {
        question: "When should I pick 30×45 over 30×30?",
        answer:
          "When length helps separate dance, buffet lines, or stage from guest seating, or when counts need more circulation than a square 30×30 comfortably allows.",
      },
      {
        question: "Can we fit a large dance floor inside?",
        answer:
          "Often yes, but the floor size has to be chosen against rounds and service lanes. We model it before you commit.",
      },
      {
        question: "Do you help with layout?",
        answer:
          "Yes—layout-first quoting is how we avoid the wrong tent on the truck. Bring guest count, must-haves, and photos.",
      },
      {
        question: "What add-ons are most common?",
        answer:
          "Sidewalls, layered lighting, dance floor, marquee connectors, and upgraded seating are frequent companions—we pair to your run of show.",
      },
    ],
  },

  "30x60-frame-tent-rental": {
    slug: "30x60-frame-tent-rental",
    sizeLabel: "30×60",
    sqft: 1800,
    heroHeadline: "30×60 frame tent rentals in Connecticut",
    pageTitle: "30×60 Frame Tent Rental | Large Single-Roof Receptions | CT",
    metaDescription:
      "30×60 frame tent rentals in Connecticut: ~1,800 sq ft clear-span for larger seated programs, wide dance floors, and complex service when one tent must carry the night.",
    heroSubhead: "Eighteen hundred square feet clear-span—large single-roof receptions before you jump to dedicated large structures.",
    quickAnswer:
      "A 30×60 frame tent is about 1,800 square feet clear-span. It suits larger seated lists, wide dance floors, and busier service plans that still want one frame footprint—access and anchoring must agree with the property before we lock it.",
    bestForWho: ["Large weddings", "Community galas", "Corporate celebrations", "School events with big guest movement"],
    tentOverview:
      "Frame keeps the span open for complex furniture maps—lounge pockets, big dance, dual bars when lines are disciplined. Versus 30×45 you add length for bigger counts or production; versus 60-foot-class structures you stay in frame-system logistics until the program truly needs clearspan engineering. Site access and stake vs ballast drive feasibility.",
    commonEventUses: ["Large tented wedding", "Community fundraiser with auction", "Corporate party with stage", "School celebration with multiple service zones"],
    planningNotes: [
      "Truck approach and crew path grow in importance—long tents need staging room.",
      "Generator or house power locations affect orientation—flag early.",
      "Weather plans for walls and heaters scale with volume—tell us your comfort goals.",
      "Photography, EMS, and egress stay non-negotiable at this size.",
    ],
    guestSeatedEstimate: "Often roughly 100–140+ seated at rounds when stage, dance, and buffet are balanced—always layout-dependent.",
    guestCocktailEstimate: "Hybrid formats need professional bar egress planning—counts are not the only variable.",
    whatFits: [
      "When one tent must carry dinner, dance, and major service without splitting guests across disconnected roofs.",
      "Often staged with marquee entries and satellite prep tents when the site is large.",
    ],
    layoutExamples: [
      { title: "Full reception in one roof", body: "Dance, rounds, head table, and service lanes mapped together." },
      { title: "Wide stage + dance", body: "Production and guest seating separated with sightline checks." },
      { title: "Dual buffet + high traffic", body: "Queue design uses length to reduce bottlenecks." },
    ],
    whenToSizeUp: [
      "Continuous clearspan needs exceed frame-class logistics—review large structures or modular expansion.",
      "You want separate ceremony and full reception without reset—often two footprints or a bigger system.",
    ],
    bestAddOns: ["Sidewalls", "Premium lighting and power distro", "Flooring", "Marquee arrival", "Climate planning"],
    pairedRentals: [
      pr("Flooring & leveling", "When grade or chair stability needs help at scale."),
      pr("Climate & sidewall plan", "Walls, fans, heaters—planned together."),
      pr("Large dance + stage", "Quoted with clearance paths."),
      pr("Premium seating", "Padded chairs and linen upgrades."),
      pr("Satellite prep tent", "When catering wants separation from guest floor."),
    ],
    faqs: [
      {
        question: "Is 30×60 the biggest frame option?",
        answer:
          "It is among the largest single-frame footprints we highlight here; beyond this class we often discuss large structures or modular systems. Your lot and access tell us which is real.",
      },
      {
        question: "What kinds of events use a 30×60?",
        answer:
          "Large weddings, galas, and community events that want one roof for dinner, dance, and service—when the program needs width and length together.",
      },
      {
        question: "Can the layout be reconfigured?",
        answer:
          "Furniture maps change with your priorities—we quote the footprint first, then refine rounds, dance, and buffet placement with you.",
      },
      {
        question: "What should I send for a quote?",
        answer:
          "Date, town, guest count, surface photos, and how you want the night to flow. We respond with questions if anything is still ambiguous.",
      },
    ],
  },
};

export const frameTentSlugs = Object.keys(frameTentPages);
