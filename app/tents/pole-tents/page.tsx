import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentPolePage } from "@/components/tents/tent-pole-page";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: `Pole Tent Rentals | Classic vs Frame | ${business.primaryCity}`,
  description:
    "Pole tent rentals in Connecticut: classic peaked style, often on grass, plus frame vs pole guidance so you pick the right structure for your layout.",
  path: "/tents/pole-tents",
});

export default function PoleTentsPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tents", path: "/tents" },
          { name: "Pole tents", path: "/tents/pole-tents" },
        ]}
      />
      <TentPolePage />
    </>
  );
}
