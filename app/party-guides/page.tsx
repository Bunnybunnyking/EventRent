import type { Metadata } from "next";
import { PartyGuidesArchive } from "@/components/party-guides/party-guides-archive";
import { BreadcrumbListSchema, CollectionItemListSchema, ServiceSchema } from "@/components/schema";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { getPartyGuide, partyGuideSlugs } from "@/lib/party-guides-data";
import { business } from "@/lib/site-data";

const partyGuidesHubDescription =
  "The canonical Connecticut tent and party planning library: sizing, layouts, rain and surface prep, backyard and venue logistics, quotes, and links to planners, wishlists, and rental inventory.";

export const metadata: Metadata = createPageMetadata({
  title: "Party Guides & Tent Planning Library | Sizing, Layout, Weather & Quotes", description: partyGuidesHubDescription, path: "/party-guides", ogImage: defaultOgImagePath,
});

export default function PartyGuidesPage() {
  const listItems = partyGuideSlugs.map((slug) => {
    const guide = getPartyGuide(slug);
    return guide
      ? { name: guide.title, path: `/party-guides/${slug}`, description: guide.metaDescription }
      : { name: slug, path: `/party-guides/${slug}` };
  });

  return (
    <>
      <ServiceSchema
        name="Party planning guides and tent layout resources"
        description={`Curated tent rental and event planning guides for ${business.state}: sizing, layouts, weather and surfaces, quotes, and clear paths to planners, inventory, and wishlists.`}
        path="/party-guides"
      />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Party guides", path: "/party-guides" }, ]}
      />
      <CollectionItemListSchema
        name="Party guides and tent planning library"
        description={partyGuidesHubDescription}
        path="/party-guides"
        items={listItems}
      />
      <PartyGuidesArchive />
    </>
  );
}
