import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteOrb from "@/components/SiteOrb";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import AskTheOtter from "@/components/chat/AskTheOtter";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.myaquaotter.com"),
  title: {
    default: "Aqua Otter Water Systems | Pure Water, Perfected",
    template: "%s | Aqua Otter Water Systems",
  },
  description:
    "Aqua Otter designs and installs custom whole-home water treatment systems across Indiana and Michigan. Free water testing, expert installation, lifetime warranty available.",
  keywords: [
    "water softener",
    "water filtration",
    "whole home water treatment",
    "reverse osmosis",
    "well water treatment",
    "Indiana water treatment",
    "Michigan water systems",
    "Aqua Otter",
  ],
  openGraph: {
    title: "Aqua Otter Water Systems | Pure Water, Perfected",
    description:
      "Custom-designed water treatment systems for Indiana and Michigan homes. Free water testing, expert installation.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ScrollProgress />
        <SiteOrb />
        <Nav />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
        <ExitIntentPopup />
        <AskTheOtter />
      </body>
    </html>
  );
}
