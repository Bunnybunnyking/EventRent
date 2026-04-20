import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentHubPage } from "@/components/tents/tent-hub-page";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: `Connecticut Tent Rentals | Largest Tent Fleet in CT | ${business.primaryCity}`,
  description:
    "Connecticut Party Rentals tent guide: one of the largest tent fleets in the state—frame tents, modular systems, pole tents, large structures, and marquee walkways—plus layout-first sizing, popular footprints, and links to inventory and quotes.",
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
