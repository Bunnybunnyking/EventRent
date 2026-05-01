import Link from "next/link";
import { cardRowHintClass, interactiveCardClass } from "@/lib/interactive-styles";

const looks = [
  {
    href: "/tents/gallery", title: "Tent gallery", description: "Real Connecticut setups: weddings, backyards, corporate, and community events. Click any photo for full size.", hint: "Browse photos", }, {
    href: "/tents", title: "Tent families & sizes", description: "Frame, expandable, pole, large structures, and marquee walkways. Match structure to your layout and surface.", hint: "Explore tents", }, {
    href: "/party-guides", title: "Party guides", description: "Short reads on sizing mindset, backyard checklists, rain plans, and flow before you quote.", hint: "Read guides", }, {
    href: "/planning#size-guide", title: "Planning tools", description: "Square-footage calculator, capacity chart, and Quick Event Planner in one place.", hint: "Open tools", },
] as const;

type Variant = "planning" | "guides";

const copy: Record<Variant, { eyebrow: string; title: string; intro: string }> = {
  planning: {
    eyebrow: "Editorial", title: "Explore Event Looks", intro:
      "Start with real photography and structure choices, then connect ideas to sizing and layout. This is your bridge between inspiration and a quote that matches your property.", }, guides: {
    eyebrow: "Editorial", title: "Explore Event Looks", intro:
      "Guides explain the why behind tent choices. Pair them with our gallery and tent family pages to see how setups translate to real inventory.", },
};

export function EventLooksSection({ variant }: { variant: Variant }) {
  const c = copy[variant];
  return (
    <section className="border-b border-stone-200 bg-gradient-to-b from-[#fffefb] to-[#faf8f5] py-8 sm:py-10" aria-labelledby="event-looks-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7328]">{c.eyebrow}</p>
          <h2 id="event-looks-heading" className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            {c.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600 sm:text-lg">{c.intro}</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {looks.map((item) => (
            <Link key={item.href} href={item.href} className={`${interactiveCardClass} flex flex-col p-5 sm:p-6`}>
              <h3 className="text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.description}</p>
              <span className={cardRowHintClass}>
                {item.hint} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
