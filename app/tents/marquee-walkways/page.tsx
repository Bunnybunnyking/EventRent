import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentMarqueePage } from "@/components/tents/tent-marquee-page";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: `Marquee Tents & Walkways | Entries & Connectors | ${business.name}`,
  description:
    "Marquee tent walkways for entries, tent-to-building transitions, rain-protected routes, and L-shape connections, Connecticut Party Rentals.",
  path: "/tents/marquee-walkways",
});

export default function MarqueeWalkwaysPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tents", path: "/tents" },
          { name: "Marquee walkways", path: "/tents/marquee-walkways" },
        ]}
      />
      <TentMarqueePage />
    </>
  );
}
