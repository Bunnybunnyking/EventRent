import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbListSchema, CollectionItemListSchema } from "@/components/schema";
import { bookNowHeaderClass } from "@/lib/cta-styles";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { guideSlugs, marketingPagesByPath } from "@/lib/marketing-pages-data";

const guidesHubDescription =
  "Connecticut tent guides: sizing, pricing drivers, driveway installs, and weather backups. Pairs with the planning hub and party guides for tools plus deep links.";

export const metadata: Metadata = createPageMetadata({
  title: "Tent & Event Guides (CT)",
  description: guidesHubDescription,
  path: "/guides",
  ogImage: defaultOgImagePath,
});

export default function GuidesHubPage() {
  const listItems = guideSlugs.map((slug) => {
    const page = marketingPagesByPath[`/guides/${slug}`];
    return page
      ? { name: page.h1, path: page.path, description: page.metaDescription }
      : { name: slug, path: `/guides/${slug}`, description: undefined };
  });

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ]}
      />
      <CollectionItemListSchema
        name="Tent and event planning guides"
        description={guidesHubDescription}
        path="/guides"
        items={listItems}
      />
      <main id="main-content" tabIndex={-1}>
        <div className="border-b border-stone-200 bg-gradient-to-b from-[#f7f5f1] to-[#faf8f5] py-10 sm:py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb className="mb-8" items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6d3a]">Planning hub companion</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-[2.125rem] sm:leading-tight [font-family:var(--font-display)]">
              Tent & event guides
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-700 sm:text-lg">
              Longer, search-friendly explainers on sizing, pricing, hard surfaces, and weather. For shorter layout articles and calculators, use the{" "}
              <Link href="/party-guides" className="font-medium text-[#6b5420] underline decoration-stone-300 underline-offset-[3px] hover:decoration-stone-500">
                party guides library
              </Link>{" "}
              and{" "}
              <Link href="/planning" className="font-medium text-[#6b5420] underline decoration-stone-300 underline-offset-[3px] hover:decoration-stone-500">
                planning hub
              </Link>
              .
            </p>
            <div className="mt-8">
              <Link href="/contact#quote" className={bookNowHeaderClass}>
                Request a quote
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <h2 className="text-sm font-semibold tracking-tight text-stone-900">Guides in this collection</h2>
          <ul className="mt-4 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white shadow-sm ring-1 ring-stone-900/[0.03]">
            {guideSlugs.map((slug) => {
              const page = marketingPagesByPath[`/guides/${slug}`];
              if (!page) return null;
              return (
                <li key={slug}>
                  <Link
                    href={page.path}
                    className="block px-5 py-5 transition hover:bg-stone-50 sm:px-6 sm:py-6"
                  >
                    <span className="text-base font-semibold tracking-tight text-stone-900">{page.h1}</span>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{page.metaDescription}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}
