import type { Metadata } from "next";
import { GoodshuffleTestEmbed } from "@/components/goodshuffle-test-embed";

export const metadata: Metadata = {
  title: "Goodshuffle integration test",
  description: "Verify Goodshuffle Pro website integration (wishlist config + item gallery).",
  robots: { index: false, follow: false },
};

export default function GoodshuffleTestPage() {
  const publicWebsiteKey = process.env.NEXT_PUBLIC_GOODSHUFFLE_PUBLIC_WEBSITE_KEY;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold text-neutral-900">Goodshuffle website integration</h1>
      <p className="mt-2 text-neutral-600">
        This page follows the{" "}
        <a
          className="text-neutral-900 underline underline-offset-2 hover:no-underline"
          href="https://docs.goodshuffle.dev/docs/setup/custom-setup/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Custom Website Setup
        </a>{" "}
        guide: scripts from unpkg, <code className="rounded bg-neutral-100 px-1">gspro-wishlist-config</code>, then{" "}
        <code className="rounded bg-neutral-100 px-1">gspro-item-gallery</code> for a quick test.
      </p>
      <div className="mt-8">
        <GoodshuffleTestEmbed publicWebsiteKey={publicWebsiteKey} />
      </div>
    </div>
  );
}
