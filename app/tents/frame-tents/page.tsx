import type { Metadata } from "next";
import { GoodshuffleRuntime } from "@/components/goodshuffle-runtime";
import { BreadcrumbListSchema } from "@/components/schema";
import { TentFrameFamilyPage } from "@/components/tents/tent-frame-family-page";
import { goodshufflePublicWebsiteKey, isGoodshuffleEnabled } from "@/lib/goodshuffle-env";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: `Frame Tent Rentals | Sizes & Layout Guide | ${business.primaryCity}`, description:
    "Frame tent rentals in Connecticut: clear-span sizes from 10×10 to 30×60, estimated guest ranges, and layout-first guidance, Connecticut Party Rentals.", path: "/tents/frame-tents",
});

export default function FrameTentsFamilyPage() {
  const goodshuffleEnabled = isGoodshuffleEnabled();
  const gsKey = goodshufflePublicWebsiteKey()?.trim();
  const inner = (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" }, { name: "Tents", path: "/tents" }, { name: "Frame tents", path: "/tents/frame-tents" }, ]}
      />
      <TentFrameFamilyPage goodshuffleEnabled={goodshuffleEnabled} />
    </>
  );

  if (goodshuffleEnabled && gsKey) {
    return (
      <GoodshuffleRuntime dataUrl={goodshuffleVendorDataUrl(gsKey)}>
        <div className="ctp-tent-goodshuffle-page">{inner}</div>
      </GoodshuffleRuntime>
    );
  }

  return inner;
}
