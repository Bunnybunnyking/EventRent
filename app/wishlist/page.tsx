import { GoodshuffleWishlistView } from "@/components/goodshuffle-wishlist-view";
import { createPageMetadata, siteBaseUrl } from "@/lib/metadata";
import { textLinkNeutralClass } from "@/lib/interactive-styles";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Wishlist",
  description: `How the ${business.name} wishlist works: save rental ideas, send your list, and our team follows up with a quote.`,
  path: "/wishlist",
});

export default function WishlistPage() {
  const publicWebsiteKey = process.env.NEXT_PUBLIC_GOODSHUFFLE_PUBLIC_WEBSITE_KEY;

  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 border-b border-stone-200 pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Wishlist</h1>
          <p className="mt-3 text-lg text-stone-700">
            Save rental ideas from our catalog and send them to <strong className="font-semibold text-stone-900">{business.name}</strong> in one step.
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-stone-600">
            <a href="#wishlist" className={textLinkNeutralClass}>
              View your wishlist
            </a>
            <span className="text-stone-300" aria-hidden>
              ·
            </span>
            <span>
              Page link to save or share:{" "}
              <code className="rounded-md bg-stone-100 px-2 py-1 text-xs text-stone-800 [word-break:break-all] sm:text-sm">
                {siteBaseUrl}/wishlist
              </code>
            </span>
          </p>

          <h2 className="mt-8 text-lg font-semibold text-stone-900">How it works</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            The wishlist below is powered by <strong className="text-stone-800">EventRentAI</strong>—the same platform we use to run our rental inventory and customer requests. When you build a list on our website, you are working directly against what{" "}
            <strong className="text-stone-800">{business.name}</strong> can supply—quantities, options, and your event details stay tied together so nothing gets lost between your screen and our team.
          </p>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-stone-600">
            <li>
              <strong className="text-stone-800">Add items.</strong> Browse our integrated catalog and add tents, tables, chairs, and other items to your list.
            </li>
            <li>
              <strong className="text-stone-800">Complete the details.</strong> Choose dates, delivery or venue information, and your contact info in the EventRentAI wishlist flow—this is the handoff into our system.
            </li>
            <li>
              <strong className="text-stone-800">We take it from there.</strong> {business.name} receives your wishlist in our EventRentAI-powered rental CRM. We review availability, logistics, and pricing, then reach out with a quote or follow-up questions—often by email or phone, depending on what you provide.
            </li>
          </ol>
          <p className="mt-5 text-sm leading-relaxed text-stone-500">
            A wishlist is not a final contract or guaranteed reservation; it is the fastest way to start an accurate quote with {business.name}.
          </p>
        </header>

        <div id="wishlist" className="scroll-mt-28">
          <GoodshuffleWishlistView publicWebsiteKey={publicWebsiteKey} />
        </div>
      </div>
    </section>
  );
}
