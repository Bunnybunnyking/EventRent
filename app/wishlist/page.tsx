import { GoodshuffleRuntime } from "@/components/goodshuffle-runtime";
import { WishlistPageContent } from "@/components/wishlist-page-content";
import { goodshufflePublicWebsiteKey } from "@/lib/goodshuffle-env";
import { goodshuffleVendorDataUrl } from "@/lib/goodshuffle";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Wishlist",
  description: `Browse the live rental catalog, save items to your list, and send ${business.name} everything we need for an accurate quote.`,
  path: "/wishlist",
});

export default function WishlistPage() {
  const publicWebsiteKey = goodshufflePublicWebsiteKey()?.trim();
  const body = <WishlistPageContent publicWebsiteKey={publicWebsiteKey} />;

  if (!publicWebsiteKey) {
    return body;
  }

  return <GoodshuffleRuntime dataUrl={goodshuffleVendorDataUrl(publicWebsiteKey)}>{body}</GoodshuffleRuntime>;
}
