import type { Metadata } from "next";
import { PartyGuidesArchive } from "@/components/party-guides/party-guides-archive";
import { BreadcrumbListSchema, CollectionItemListSchema, ServiceSchema } from "@/components/schema";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { getPartyGuide, partyGuideSlugs } from "@/lib/party-guides-data";
import { business } from "@/lib/site-data";

const partyGuidesHubDescription =
  "Premium planning guides for Connecticut events: tent sizing context, backyard checklists, wedding rain plans, corporate flow, and links to our planners and quotes.";

export const metadata: Metadata = createPageMetadata({
  title: "Party Guides | Tent Sizing, Layout, and Outdoor Event Planning",
  description: partyGuidesHubDescription,
  path: "/party-guides",
  ogImage: defaultOgImagePath,
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
        description={`Practical guides for tent sizing, backyard hosting, weather backup, and event flow across ${business.state}, with clear paths to planning tools and quotes.`}
        path="/party-guides"
      />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Party guides", path: "/party-guides" },
        ]}
      />
      <CollectionItemListSchema
        name="Party planning guides"
        description={partyGuidesHubDescription}
        path="/party-guides"
        items={listItems}
      />
      <PartyGuidesArchive />
    </>
  );
}
