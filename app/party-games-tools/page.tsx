import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbListSchema } from "@/components/schema";
import { PartyGamesToolsHub } from "@/components/party-games-tools-hub";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Party games & tools — quizzes, planners, checklists",
  description:
    "Fun party quizzes, the Party Spark name generator, Quick Event Planner, backyard and wedding checklists, site checks, and tent sizing — all in one hub from Connecticut Party Rentals.",
  path: "/party-games-tools",
  ogImage: defaultOgImagePath,
});

export default function PartyGamesToolsPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Party games & tools", path: "/party-games-tools" },
        ]}
      />

      <div className="min-h-[72vh]">
        <div className="mx-auto max-w-6xl px-4 pb-2 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Party games & tools" }]}
          />
        </div>
        <PartyGamesToolsHub />
      </div>
    </>
  );
}
