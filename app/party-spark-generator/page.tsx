import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PartySparkGenerator } from "@/components/party-spark/PartySparkGenerator";
import { business } from "@/lib/site-data";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Party Spark Generator — names, invites, setup ideas",
  description:
    "Quick picks for party names, invite lines, and simple setup ideas. Optional text to your phone to save a favorite. No email required to see results.",
  path: "/party-spark-generator",
  ogImage: defaultOgImagePath,
});

export default function PartySparkGeneratorPage() {
  const brandShort = business.name;

  return (
    <section className="min-h-[70vh] border-b border-[#E6E1D8] bg-[linear-gradient(180deg,#FFFDFB_0%,#FAF8F3_38%,#F7F4EE_100%)] py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Party games & tools", href: "/party-games-tools" },
            { label: "Party Spark Generator" },
          ]}
        />
        <div className="mt-6">
          <PartySparkGenerator quoteHref="/contact#quote" brandLine="Connecticut Party Rentals" brandShort={brandShort} />
        </div>
      </div>
    </section>
  );
}
