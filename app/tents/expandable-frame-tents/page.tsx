import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentExpandablePage } from "@/components/tents/tent-expandable-page";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: `Expandable Modular Frame Tents | Connecticut | ${business.name}`, description:
    "Expandable modular frame tent systems in Connecticut, scalable footprints, gutters, and connectors for growing layouts. Inventory-aware positioning with Connecticut Party Rentals.", path: "/tents/expandable-frame-tents",
});

export default function ExpandableFrameTentsPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Tents", path: "/tents" }, { name: "Expandable frame tents", path: "/tents/expandable-frame-tents" }, ]}
      />
      <TentExpandablePage />
    </>
  );
}
