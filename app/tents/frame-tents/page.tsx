import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentFrameFamilyPage } from "@/components/tents/tent-frame-family-page";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: `Frame Tent Rentals | Sizes & Layout Guide | ${business.primaryCity}`,
  description:
    "Frame tent rentals in Connecticut: clear-span sizes from 10×10 to 30×60, estimated guest ranges, and layout-first guidance, Connecticut Party Rentals.",
  path: "/tents/frame-tents",
});

export default function FrameTentsFamilyPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tents", path: "/tents" },
          { name: "Frame tents", path: "/tents/frame-tents" },
        ]}
      />
      <TentFrameFamilyPage />
    </>
  );
}
