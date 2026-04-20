import { RentalInventoryBrowser } from "@/components/rental-inventory-browser";
import { BreadcrumbListSchema } from "@/components/schema";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: `Browse Event Rental Inventory | Tents, Tables & Chairs | ${business.primaryCity} CT`,
  description:
    "Browse Connecticut event rental inventory: tents, chair styles, banquet and round tables, lighting, heating, and planning notes. Customer-friendly guide with quote and wishlist paths—availability confirmed on your date.",
  path: "/rental-inventory",
});

export default function RentalInventoryPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Rental inventory", path: "/rental-inventory" },
        ]}
      />
      <RentalInventoryBrowser />
    </>
  );
}
