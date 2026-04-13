import Link from "next/link";
import type { PartyGuideArticle } from "@/lib/party-guides-data";
import { cardRowHintClass, interactiveCardClass } from "@/lib/interactive-styles";

export function RelatedGuides({ guides }: { guides: PartyGuideArticle[] }) {
  if (guides.length === 0) return null;
  return (
    <section className="border-t border-stone-200 bg-[#faf8f5] py-12 sm:py-14" aria-labelledby="related-guides-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 id="related-guides-heading" className="text-xl font-semibold text-stone-900 sm:text-2xl">
          Related guides
        </h2>
        <ul className="mt-6 space-y-4">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/party-guides/${g.slug}`} className={`${interactiveCardClass} block p-4 sm:p-5`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8a6d3a]">{g.categoryLabel}</p>
                <p className="mt-1 text-lg font-semibold text-stone-900 [font-family:var(--font-display)]">{g.title}</p>
                <p className="mt-1 text-sm text-stone-600 line-clamp-2">{g.excerpt}</p>
                <span className={cardRowHintClass}>
                  Read guide <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
