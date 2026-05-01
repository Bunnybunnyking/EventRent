import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/schema";
import { GoodshuffleRuntime } from "@/components/goodshuffle-runtime";
import { TentHubPage } from "@/components/tents/tent-hub-page";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";
import { goodshufflePublicWebsiteKey, isGoodshuffleEnabled } from "@/lib/goodshuffle-env";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: `Connecticut Tent Rentals | Largest Tent Fleet in CT | ${business.primaryCity}`, description:
    "Connecticut Party Rentals tent guide: one of the largest tent fleets in the state, frame tents, modular systems, pole tents, large structures, and marquee walkways, plus layout-first sizing, popular footprints, and links to inventory and quotes.", path: "/tents", });

export default function TentsHubPage() {
  const gsKey = goodshufflePublicWebsiteKey()?.trim();
  const wrapGoodshuffle = isGoodshuffleEnabled() && Boolean(gsKey);

  const inner = (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Tents", path: "/tents" }, ]}
      />
      <TentHubPage goodshuffleEmbedGallery={wrapGoodshuffle} />
    </>
  );

  if (wrapGoodshuffle && gsKey) {
    return <GoodshuffleRuntime dataUrl={goodshuffleVendorDataUrl(gsKey)}>{inner}</GoodshuffleRuntime>;
  }

  return inner;
}
