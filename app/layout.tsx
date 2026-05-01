import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAdsGtag } from "@/components/google-ads-gtag";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StickyMobileCTA } from "@/components/sticky-mobile-cta";
import { LocalBusinessSchema, WebSiteSchema } from "@/components/schema";
import { business } from "@/lib/site-data";
import { defaultOgImagePath, siteBaseUrl } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const defaultOgUrl = `${siteBaseUrl}${defaultOgImagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: `${business.name} | Connecticut Tent & Event Rentals`,
    template: `%s | ${business.name}`,
  },
  description:
    "Connecticut tent rentals and event rentals: weddings, backyard parties, graduations, corporate events. Table and chair rentals, delivery, and professional setup statewide.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    images: [
      {
        url: defaultOgUrl,
        width: 1200,
        height: 630,
        alt: "Elegant outdoor wedding tent rental in Wethersfield, CT: white marquee reception with paper lantern lighting and polished table decor.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgUrl],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0e10" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <GoogleAdsGtag />
        <LocalBusinessSchema />
        <WebSiteSchema />
        <ScrollToTop />
        <Header />
        <main className="pb-28 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
