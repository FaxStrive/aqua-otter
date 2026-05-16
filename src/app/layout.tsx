import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteOrb from "@/components/SiteOrb";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import AskTheOtter from "@/components/chat/AskTheOtter";

// Site-wide canonical entity declaration. AI crawlers and search engines
// resolve all LocalBusiness, Service, and Article blocks back to this @id.
// NOTE: founder is intentionally omitted (owner identity not yet confirmed
// per SEOMAN no-fabrication policy). sameAs is left as a commented
// placeholder until verified profile URLs are supplied. aggregateRating
// is deferred until a verified Google review count is supplied.
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.myaquaotter.com/#organization",
  name: "Aqua Otter Water Systems",
  alternateName: "Aqua Otter",
  url: "https://www.myaquaotter.com",
  logo: {
    "@type": "ImageObject",
    "@id": "https://www.myaquaotter.com/#logo",
    url: "https://www.myaquaotter.com/icon.png",
  },
  image: { "@id": "https://www.myaquaotter.com/#logo" },
  description:
    "Family-owned water treatment company serving homeowners across Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina since 1999. Free in-home water testing, USA-made systems, lifetime warranty available.",
  foundingDate: "1999",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noblesville",
      addressRegion: "IN",
      addressCountry: "US",
    },
  },
  slogan: "Pure Water, Perfected.",
  telephone: "+1-317-983-5919",
  areaServed: [
    { "@type": "State", name: "Indiana" },
    { "@type": "State", name: "Michigan" },
    { "@type": "State", name: "Ohio" },
    { "@type": "State", name: "Kentucky" },
    { "@type": "State", name: "Tennessee" },
    { "@type": "State", name: "North Carolina" },
  ],
  knowsAbout: [
    "Water softening",
    "Reverse osmosis",
    "Well water treatment",
    "UV water purification",
    "Iron filtration",
    "Hard water (calcium and magnesium removal)",
    "PFAS removal",
    "Chromium-6 in drinking water",
    "Whole-home water filtration",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-317-983-5919",
      contactType: "customer service",
      email: "info@myaquaotter.com",
      areaServed: ["US-IN", "US-MI", "US-OH", "US-KY", "US-TN", "US-NC"],
      availableLanguage: "en-US",
    },
  ],
  inLanguage: "en-US",
  // sameAs: [REPLACE: verified profile URLs, GBP, Facebook, Instagram, LinkedIn, YouTube, BBB, Yelp]
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.myaquaotter.com/#website",
  url: "https://www.myaquaotter.com",
  name: "Aqua Otter Water Systems",
  publisher: { "@id": "https://www.myaquaotter.com/#organization" },
  inLanguage: "en-US",
};

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

// Site-wide Organization + Person (founder Larry) JSON-LD.
// TODO: confirm Larry's last name and update larryPerson.name accordingly.
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.myaquaotter.com/#organization",
      name: "Aqua Otter Water Systems",
      url: "https://www.myaquaotter.com",
      logo: "https://www.myaquaotter.com/client/Black_Logo.png",
      telephone: "+1-317-961-6925",
      sameAs: [
        "https://www.facebook.com/MyAquaOtter/",
        "https://www.instagram.com/therealaquaotter/",
        "https://www.youtube.com/@AquaOtterWaterSystems",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "55",
      },
      areaServed: ["Indiana", "Michigan", "Ohio", "Kentucky", "Tennessee", "North Carolina"],
      founder: { "@id": "https://www.myaquaotter.com/#larry" },
    },
    {
      "@type": "Person",
      "@id": "https://www.myaquaotter.com/#larry",
      name: "Larry",
      jobTitle: "Founder",
      worksFor: { "@id": "https://www.myaquaotter.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Organization + WebSite JSON-LD (site-wide canonical entity) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ScrollProgress />
        <SiteOrb />
        <Nav />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
        <ExitIntentPopup />
        <AskTheOtter />
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
