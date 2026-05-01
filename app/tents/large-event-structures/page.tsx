import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentLargeFamilyPage } from "@/components/tents/tent-large-family-page";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: `Large Event Structures | 60×60, 60×90, 60×150 | ${business.primaryCity}`, description:
    "Large clear-span event structures for major Connecticut receptions and galas, 60×60, 60×90, and 60×150 class footprints with layout-first planning.", path: "/tents/large-event-structures",
});

export default function LargeEventStructuresPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Tents", path: "/tents" }, { name: "Large event structures", path: "/tents/large-event-structures" }, ]}
      />
      <TentLargeFamilyPage />
    </>
  );
}
