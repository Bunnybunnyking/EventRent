/**
 * Customer help center content for /faq: categories, Q&A, and FAQPage JSON-LD source.
 * Answers are plain text; optional `links` render after the paragraph (same labels appear in schema text).
 */

import { business } from "./site-data";

export type FaqLink = { label: string; href: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links?: FaqLink[];
};

export type FaqCategory = {
  id: string;
  title: string;
  description: string;
  items: FaqItem[];
};

/** Full answer text for FAQPage JSON-LD — must match what users can read on the page (including link labels). */
export function faqAnswerForSchema(item: FaqItem): string {
  const base = item.answer.trim();
  if (!item.links?.length) return base;
  return `${base} Helpful links: ${item.links.map((l) => l.label).join(", ")}.`;
}

export function getFaqPageSchemaItems(): { question: string; answer: string }[] {
  return faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      question: item.question,
      answer: faqAnswerForSchema(item),
    })),
  );
}

export const faqCategories: FaqCategory[] = [
  {
    id: "booking-quotes",
    title: "Booking & quotes",
    description: "How to get a number on paper, what we need from you, and how timing works.",
    items: [
      {
        id: "booking-how-to-start",
        question: "How do I get a tent rental quote in Connecticut?",
        answer:
          "Start by telling us your event date, town or venue, approximate guest count, and what you are planning under the tent (seated dinner, ceremony, buffet, bar, dance floor, DJ or band, head table, etc.). We turn that into a real footprint, not just a size chart. You get clear options, line-item pricing, and next steps so you always know what happens after you email.",
        links: [{ label: "Contact us", href: "/contact#quote" }],
      },
      {
        id: "booking-what-we-need",
        question: "What information helps you quote faster?",
        answer:
          "The big five: date, location, guest count, event style (wedding, corporate picnic, graduation, backyard party), and surface type (lawn, driveway, patio, tennis court). Photos or a rough sketch of the yard help. If your headcount or layout shifts before the event, we adjust the plan with you—we would rather hear about changes early than on load-in day.",
      },
      {
        id: "booking-how-far-ahead",
        question: "How far in advance should I reserve a tent?",
        answer:
          "Prime spring and summer weekends, holidays, and popular wedding dates book first across Connecticut. Once your date and venue are firm, reach out; we will tell you honestly if inventory is tight for tent style and size. Last-minute requests sometimes work, but earlier booking keeps your first-choice footprint and crew window.",
      },
      {
        id: "booking-change-date",
        question: "What if my guest count or date changes after I get a quote?",
        answer:
          "Tell us as soon as you know. We revise tent size, furniture counts, and labor when your numbers or layout change. Small tweaks are normal; major changes may affect availability on busy weekends, so the sooner we hear from you, the more options you keep.",
      },
      {
        id: "booking-deposit-contract",
        question: "How does booking and confirmation work?",
        answer:
          "After you review the quote and want to move forward, we confirm equipment, schedule, delivery and installation timing, and surface or weather notes. Your paperwork spells out what is included, when we arrive, and what we need from the venue or homeowner—no mystery steps.",
      },
    ],
  },
  {
    id: "tent-sizing",
    title: "Tent sizing",
    description: "Guest counts, layout, and why we size to how you use the space—not only a table chart.",
    items: [
      {
        id: "sizing-what-size",
        question: "What size tent do I need for my event?",
        answer:
          "It depends how you use the space: seated versus standing, dance floor, buffet or bar lines, head table, DJ or band, aisles for servers, and whether you need buffer space around poles or stakes. We walk through your Connecticut venue with you and recommend tent dimensions and style that fit. If your count moves before the event, we tweak the plan together.",
        links: [
          { label: "Tent size help", href: "/tent-size-help" },
          { label: "Planning hub", href: "/planning" },
        ],
      },
      {
        id: "sizing-guests-fit",
        question: "How many guests fit under a tent?",
        answer:
          "A practical rule of thumb is about one guest per ten to twelve square feet under cover when people sit at rounds—tighter for ceremony rows, more for lounge or mixed seating. Dance floors, bars, stages, and traffic lanes consume space quickly, so headcount alone is not enough. We translate your count and run-of-show into a footprint that fits real movement, not just chairs on paper.",
        links: [{ label: "Tent size help", href: "/tent-size-help" }],
      },
      {
        id: "sizing-ceremony-vs-reception",
        question: "Do ceremony and reception need different tent sizes?",
        answer:
          "Often yes. Ceremony seating in rows uses space differently than rounds for dinner. Some hosts flip one tent; others use separate areas or stagger timing. We map both programs so you are not surprised when chairs, aisle, and altar depth are all in play.",
      },
      {
        id: "sizing-dance-floor-bar",
        question: "How much room do a dance floor, bar, and buffet need?",
        answer:
          "They are some of the biggest space eaters. Dance floors need clear edge space and safe paths for guests and staff. Buffets need queue space so lines do not block tables. Bars need service access and glassware paths. We bake those zones into the tent footprint up front.",
        links: [{ label: "Planning hub", href: "/planning" }],
      },
      {
        id: "sizing-indoor-venue",
        question: "Can you help if part of my event is indoors and part is tented?",
        answer:
          "Yes. We coordinate flow between house, venue building, and tent so guests are not bottlenecked at doors or steps. Rain backup, flooring transitions, and timing for catering often cross both spaces—we plan for the whole property, not only the tent footprint.",
      },
    ],
  },
  {
    id: "tent-types",
    title: "Tent types",
    description: "Frame tents, pole tents, and how we pick structure for your site and style.",
    items: [
      {
        id: "types-frame-vs-pole",
        question: "What is the difference between a frame tent and a pole tent?",
        answer:
          "Frame tents use a metal skeleton so there are no center poles under the canopy—great when you want open floor plans or tight layouts. Pole tents use central poles and perimeter poles and often have elegant peaks; layout works around those poles. We recommend structure based on space needs, style, surface, and anchoring.",
      },
      {
        id: "types-when-frame",
        question: "When do Connecticut hosts usually choose a frame tent?",
        answer:
          "When you want maximum usable interior space for dining and dancing, need to butt tents to walkways or buildings, or have a layout that does not play well with center poles. Frame styles are common for receptions and corporate programs where every square foot counts.",
      },
      {
        id: "types-when-pole",
        question: "When is a pole tent a strong choice?",
        answer:
          "When you love the classic peaked look and your layout can work with center poles—often for rustic or traditional aesthetics and larger lawns. We map head tables, dance floors, and focal points around poles so sightlines still work.",
      },
      {
        id: "types-marquee-walkway",
        question: "Do you rent walkways or connectors between tents?",
        answer:
          "Yes—many properties use main tents plus connectors to buildings, catering prep, or restrooms. Tell us your flow and we recommend sizing and weather protection for those connections.",
        links: [{ label: "Browse tent inventory", href: "/tents" }],
      },
      {
        id: "types-inventory-range",
        question: "What tent sizes do you carry?",
        answer:
          `We stock a wide range—from compact footprints up to large structures for crowds and programs (${business.tentSizeRange}). Your quote matches inventory we can actually deliver and install for your date.`,
      },
    ],
  },
  {
    id: "delivery-setup",
    title: "Delivery & setup",
    description: "How our crew schedules arrival, installation, and teardown around your venue.",
    items: [
      {
        id: "delivery-full-service",
        question: "Do you deliver, set up, and take down the tent?",
        answer:
          "Yes. Our team delivers, installs, and returns for takedown so you are not juggling rentals on event day. We coordinate timing with your venue or homeowner and align with catering, rentals, and entertainment when you share the run of show.",
      },
      {
        id: "delivery-arrival-window",
        question: "When will your crew arrive?",
        answer:
          "We schedule arrival within an agreed window and confirm ahead of your date so vendors know what to expect. Access paths, parking, slope, and surface type all affect how long setup takes—we bake that into the plan when you book.",
      },
      {
        id: "delivery-access",
        question: "What access do you need for trucks and equipment?",
        answer:
          "Clear paths from staging to the setup area help keep your window predictable. Gates, stairs, narrow alleys, or long carries from parking can add time; tell us early so we plan crew size and schedule realistically.",
      },
      {
        id: "delivery-teardown",
        question: "How does teardown timing work?",
        answer:
          "We align pickup with your venue rules and end-of-event timing—often next-day for evening receptions. If your site has strict noise or exit windows, mention them when you quote so teardown fits your contract.",
      },
    ],
  },
  {
    id: "weather",
    title: "Weather",
    description: "Rain plans, sidewalls, wind, and staying comfortable under cover.",
    items: [
      {
        id: "weather-rain-plan",
        question: "What happens if it rains?",
        answer:
          "We plan weather before the week of your event. That can mean sidewalls, strategic wall placement, anchoring suited to exposure, and layout tweaks so critical areas stay dry. For weddings and timed programs, we talk through a sensible backup so you are not deciding everything in a panic. Window walls and solid walls can be combined for light, views, and wind protection.",
        links: [{ label: "Rain and weather plan", href: "/weather-rain-plan" }, { label: "Planning hub", href: "/planning" }],
      },
      {
        id: "weather-sidewalls",
        question: "Should I add sidewalls?",
        answer:
          "Sidewalls help with rain, wind, and evening chill. Clear window walls keep sightlines; solid sections block wind where you need it. We recommend walls based on season, exposure, and how open you want the tent to feel—not a one-size default for every party.",
      },
      {
        id: "weather-wind",
        question: "What about wind?",
        answer:
          "Proper anchoring matters as much as canopy choice. We assess staking versus ballasting, exposure, and terrain. If your site is elevated or wide open, tell us during quoting so anchoring matches real conditions.",
      },
      {
        id: "weather-heat-cold",
        question: "Can we stay comfortable in heat or cold?",
        answer:
          "Season, time of day, and wall configuration drive comfort. We discuss sidewalls, airflow, and layout so guests and staff are not fighting sun, wind, or cold spots at head tables or buffets.",
      },
    ],
  },
  {
    id: "surfaces-staking",
    title: "Surfaces & staking",
    description: "Lawns, driveways, patios, tennis courts, utilities, and safe anchoring.",
    items: [
      {
        id: "surface-hard",
        question: "Can you set up on a driveway, patio, or pavement?",
        answer:
          "Often yes. When stakes cannot go into the ground, we use weighted ballasts or other approved anchoring so the tent stays secure without damaging the surface. Tennis courts, parking areas, and patios are common—we assess access, slope, and load-in distance when we quote.",
        links: [{ label: "Party packages", href: "/party-packages" }],
      },
      {
        id: "surface-lawn-utilities",
        question: "What should I know about lawn staking and underground utilities?",
        answer:
          "For grass installs we typically stake for stability. Clear furniture, hoses, and debris before we arrive; a level, freshly mowed lawn helps. If you have irrigation, septic, or buried electric, tell us early so we position stakes safely—when in doubt, locate lines before event day. Slopes or soft ground may change anchoring; we cover that in planning.",
      },
      {
        id: "surface-tennis-court",
        question: "Can you install on a tennis court without damaging it?",
        answer:
          "We use surface-appropriate anchoring so courts are protected while the tent stays secure. Share any facility rules or HOA requirements when you book so equipment and ballast match what the site allows.",
      },
      {
        id: "surface-sloped",
        question: "What if my yard is sloped or uneven?",
        answer:
          "Slope affects leveling, seating comfort, and sometimes anchoring. Photos and a site conversation help us recommend layout and structure so tables feel steady and guests move safely.",
      },
    ],
  },
  {
    id: "tables-chairs-addons",
    title: "Tables, chairs & add-ons",
    description: "Inventory beyond the canopy—seating, tables, and coordinating rentals.",
    items: [
      {
        id: "furniture-without-tent",
        question: "Can I rent tables and chairs without renting a tent?",
        answer:
          "Yes. Many hosts order tables, chairs, or both for indoor venues, patios, or events where a tent is not needed. Delivery and pickup follow the same professional scheduling as tent jobs across Connecticut.",
        links: [{ label: "Table and chair rentals", href: "/table-chair-rentals" }],
      },
      {
        id: "furniture-round-banquet",
        question: "What table shapes do you offer?",
        answer:
          "We carry round, banquet, and cocktail setups for different flows—dinner, mingling, stations, or ceremonies. Your quote ties chair counts and table sizes to how guests actually move through the event.",
        links: [{ label: "Table and chair rentals", href: "/table-chair-rentals" }],
      },
      {
        id: "furniture-linens-lighting",
        question: "Do you rent linens, lighting, or other add-ons?",
        answer:
          "We coordinate tables, chairs, and tent accessories so your floor plan reads as one plan—not a pile of separate orders. Ask when you quote if you want lighting, walls, or specialty seating layered in.",
        links: [{ label: "Party packages", href: "/party-packages" }],
      },
      {
        id: "furniture-headcount-change",
        question: "What if my RSVP count changes?",
        answer:
          "Tell us when numbers move. We adjust chair and table counts when inventory allows and refresh delivery notes so setup matches your final guest list.",
      },
    ],
  },
  {
    id: "event-types",
    title: "Event types",
    description: "Weddings, corporate programs, schools, graduations, backyards, and community events.",
    items: [
      {
        id: "events-weddings",
        question: "Do you specialize in wedding tent rentals?",
        answer:
          "Yes. We plan layouts around ceremony and reception timing, vendor traffic, rain backup, and guest comfort—from intimate lawns to full tented receptions. Share your priorities early so tent size, sidewalls, and traffic lanes match your day.",
        links: [{ label: "Wedding tent rentals", href: "/wedding-tent-rentals" }],
      },
      {
        id: "events-backyard",
        question: "Do you rent tents for backyard parties?",
        answer:
          "Yes. We review truck and crew access, staking versus ballasting, neighbor-friendly timing, and how guests move from house to tent so the setup feels intentional—birthdays, anniversaries, showers, and casual celebrations included.",
        links: [{ label: "Planning hub", href: "/planning" }],
      },
      {
        id: "events-graduation",
        question: "Can you help with graduation parties and guest flow?",
        answer:
          "We map arrival, food lines, seating, speeches, and weather backup so the day stays organized when emotions—and guest counts—run high. From Hartford County towns to shoreline communities, we align footprint with your schedule.",
      },
      {
        id: "events-corporate-school",
        question: "Do you support corporate events, schools, and nonprofits?",
        answer:
          "Yes. We align with load-in windows, run-of-show constraints, and presentation standards for company picnics, school functions, fundraisers, and municipal programs. Repeatable layouts and clear facilities communication are built into how we work.",
        links: [{ label: "Events hub", href: "/events" }],
      },
    ],
  },
  {
    id: "pricing-policies",
    title: "Pricing & policies",
    description: "How quotes are built, what affects price, and why line items matter.",
    items: [
      {
        id: "pricing-how-built",
        question: "How does tent rental pricing work?",
        answer:
          "Your quote lists what you are paying for: date and place, tent size and structure, add-ons like sidewalls and lighting, tables and chairs, labor for setup and teardown, and site factors such as long carries, stairs, or special anchoring. You see line items—not one opaque number—so you can compare options and ask questions before event day.",
        links: [{ label: "Party packages", href: "/party-packages" }],
      },
      {
        id: "pricing-what-changes-cost",
        question: "What usually changes the price?",
        answer:
          "Footprint and inventory tier, weekend versus peak demand, delivery distance and labor hours, ballasting or complex anchoring, add-ons like walls and lighting, and furniture counts. We spell out drivers on your quote so surprises are rare.",
      },
      {
        id: "pricing-multiday",
        question: "Do you rent for multi-day festivals or fairs?",
        answer:
          "Multi-day programs are quoted around schedule, anchoring, weather exposure, and teardown windows. Share run dates and site rules early so crew and inventory line up.",
        links: [{ label: "Events hub", href: "/events" }],
      },
      {
        id: "pricing-clarity",
        question: "Can I adjust the quote before I commit?",
        answer:
          "Yes—that is what quoting is for. Swap tent sizes, trim add-ons, or shift furniture counts until the plan fits your budget and timeline. We prefer questions now over confusion later.",
        links: [{ label: "Contact us", href: "/contact#quote" }],
      },
    ],
  },
  {
    id: "service-areas",
    title: "Service areas",
    description: "Where we deliver and install across Connecticut and nearby.",
    items: [
      {
        id: "areas-where",
        question: "Where do Connecticut Party Rentals deliver?",
        answer:
          "We serve Connecticut broadly plus southern Massachusetts, with Bloomfield as our home base. Towns such as Hartford, West Hartford, Farmington, Avon, Glastonbury, Manchester, and shoreline communities are all part of our regular routing—confirm your address when you quote.",
        links: [{ label: "Service areas", href: "/service-areas" }],
      },
      {
        id: "areas-distance",
        question: "Is there a fee for distance or difficult access?",
        answer:
          "Delivery and labor reflect drive time, crew hours, and site difficulty—long carries, tight gates, or urban unload zones take longer. We disclose those factors in quoting so your total matches reality.",
      },
      {
        id: "areas-venue-rules",
        question: "What if my venue has strict rules or insurance requirements?",
        answer:
          "Send requirements when you request a quote. We coordinate certificates and setup constraints with venues and towns so install day matches what the contract allows.",
      },
    ],
  },
];
