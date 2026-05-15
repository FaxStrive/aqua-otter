import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteOrb from "@/components/SiteOrb";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
// AskTheOtter (custom Anthropic chat) was removed in favor of AquaOtter's
// GHL-hosted AI chat widget, loaded near the bottom of <body>. Keeping both
// would put two chat bubbles on the page.

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
        {/* GHL-hosted AI chat widget — handles lead conversations and
            routes qualified leads back into AquaOtter's CRM workflows. */}
        <Script
          id="ghl-chat-widget"
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69e278dc06d5d58f3d95c662"
          strategy="afterInteractive"
        />
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wixskf7vo2");`}
        </Script>
      </body>
    </html>
  );
}
