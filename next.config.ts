import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false, async redirects() {
    return [
      { source: "/gallery", destination: "/tents/gallery", permanent: true }, { source: "/event-planner", destination: "/quick-event-planner", permanent: false }, { source: "/guides", destination: "/party-guides", permanent: true }, { source: "/guides/what-size-tent-do-i-need", destination: "/party-guides/what-size-tent-do-i-need", permanent: true }, { source: "/guides/tent-rental-pricing", destination: "/party-guides/tent-rental-pricing", permanent: true }, {
        source: "/guides/rain-backup-and-sidewalls", destination: "/party-guides/outdoor-wedding-rain-plan-basics", permanent: true, }, {
        source: "/guides/tents-on-driveways-and-pavement", destination: "/party-guides/tents-on-driveways-and-pavement", permanent: true, }, {
        source: "/tent-size-help", destination: "/party-guides/what-size-tent-do-i-need", permanent: true, }, {
        source: "/weather-rain-plan", destination: "/party-guides/outdoor-wedding-rain-plan-basics", permanent: true, }, ];
  }, images: {
    formats: ["image/avif", "image/webp"], deviceSizes: [640, 750, 828, 1080, 1200, 1920], imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], },
};

export default nextConfig;