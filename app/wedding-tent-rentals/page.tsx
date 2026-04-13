import { BreadcrumbListSchema, FAQSchemaItems, ServiceSchema } from "@/components/schema";
import {
  WeddingTentRentalsLanding,
  weddingTentOutdoorFaqSchemaItems,
} from "@/components/wedding-tent-rentals-landing";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Wedding Tent Rentals in Connecticut | Outdoor Weddings & Venue Expansions",
  description:
    "Planning an outdoor wedding or expanding a venue? Connecticut Party Rentals helps couples, planners, and venues create elegant, weather-ready wedding spaces with tents, tables, chairs, lighting, and layout support.",
  path: "/wedding-tent-rentals",
  ogImage: "/images/wedding-tent-hero.png",
});

export default function WeddingTentPage() {
  return (
    <>
      <ServiceSchema
        name="Wedding tent rentals for outdoor weddings and venue expansions in Connecticut"
        description="Wedding tent rentals with layout support for outdoor weddings, backyard receptions, and venue expansions, tables, chairs, lighting, weather planning, and coordination for couples, planners, and venues across Connecticut."
        path="/wedding-tent-rentals"
      />
      <FAQSchemaItems items={weddingTentOutdoorFaqSchemaItems} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Wedding tent rentals", path: "/wedding-tent-rentals" },
        ]}
      />

      <WeddingTentRentalsLanding />
    </>
  );
}
