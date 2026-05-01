import { createPageMetadata, homePageHeroImagePath } from "@/lib/metadata";
import {
  GalleryPreview, HomeFooterCTA, HomeHeroFullBleed, HomeIntroDark, HomeWhatEventsWeDo, HomeWhatWeRent, HowItWorks, PlanningTools, TrustStrip,
} from "@/components/home";

export const metadata = createPageMetadata({
  title: "Tent & party rentals, Wethersfield, Hartford & statewide", description:
    "Marquee and frame tents, tables, chairs, lighting, and dance floors with delivery and professional setup. Family business since 1974, roots in tent lending since 1946; weddings, backyards, graduations, and corporate events across Connecticut.", path: "/", ogImage: homePageHeroImagePath,
});

export default function HomePage() {
  return (
    <>
      <HomeHeroFullBleed />
      <HomeIntroDark />
      <HomeWhatWeRent />
      <HomeWhatEventsWeDo />
      <TrustStrip />
      <HowItWorks />
      <GalleryPreview />
      <PlanningTools />
      <HomeFooterCTA />
    </>
  );
}
