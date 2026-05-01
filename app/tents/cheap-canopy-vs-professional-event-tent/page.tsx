import type { Metadata } from "next";
import { CheapCanopyVsProfessionalLanding } from "@/components/tents/cheap-canopy-vs-professional-landing";
import { BreadcrumbListSchema } from "@/components/schema";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

const path = "/tents/cheap-canopy-vs-professional-event-tent";

export const metadata: Metadata = createPageMetadata({
  title: "Cheap Canopy vs. Professional Event Tent | Connecticut Tent Education",
  description:
    "Why same-size pop-up canopies and professional frame tents are not the same: structure, anchoring, weather, and safety—educational guide from Connecticut Party Rentals.",
  path,
});

export default function CheapCanopyVsProfessionalPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tents", path: "/tents" },
          { name: "Cheap canopy vs. professional tent", path },
        ]}
      />
      <CheapCanopyVsProfessionalLanding />
    </>
  );
}
