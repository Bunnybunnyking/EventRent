import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/marketing-pages/MarketingPageShell";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { marketingPagesByPath } from "@/lib/marketing-pages-data";

const page = marketingPagesByPath["/packages/most-booked-event-setups"];

export const metadata: Metadata = createPageMetadata({
  title: page.metaTitle, description: page.metaDescription, path: page.path, ogImage: defaultOgImagePath,
});

export default function MostBookedEventSetupsPage() {
  return (
    <MarketingPageShell
      page={page}
      breadcrumbSchema={[
        { name: "Home", path: "/" }, { name: "Party packages", path: "/party-packages" }, { name: page.h1, path: page.path }, ]}
      breadcrumbView={[
        { label: "Home", href: "/" }, { label: "Party packages", href: "/party-packages" }, { label: page.h1 }, ]}
    />
  );
}
