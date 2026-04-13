import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentHubPage } from "@/components/tents/tent-hub-page";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: `Tent Rentals Guide | Frame, Pole, Modular & Large Structures | ${business.primaryCity}`,
  description:
    "Connecticut Party Rentals tent guide: frame tents, expandable modular systems, pole tents, large structures, and marquee walkways, layout-first sizing, popular footprints, and links to planning and quotes.",
  path: "/tents",
});

export default function TentsHubPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tents", path: "/tents" },
        ]}
      />
      <TentHubPage />
    </>
  );
}
