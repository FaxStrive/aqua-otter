import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const ExitIntentPopup = dynamic(
  () => import("@/components/ExitIntentPopup"),
  { ssr: false }
);
const SocialProofToast = dynamic(
  () => import("@/components/SocialProofToast"),
  { ssr: false }
);
const ScrollRevealCTA = dynamic(
  () => import("@/components/ScrollRevealCTA"),
  { ssr: false }
);
const CornerOfferPeek = dynamic(
  () => import("@/components/CornerOfferPeek"),
  { ssr: false }
);

const heading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.myaquaotter.com"),
  title: {
    default: "Aqua Otter Water Systems | The LAST Water System You Will EVER Need",
    template: "%s | Aqua Otter Water Systems",
  },
  description:
    "Family-owned water treatment experts serving IN, MI, OH, KY, TN, and NC. Specializing in well water treatment and no-salt hard water solutions. Free water test, call (317) 961-6925.",
  keywords:
    "water treatment Michigan, well water filtration, no-salt water softener, hard water solutions, water testing near me, Aqua Otter, water filtration systems, whole house water filter",
  openGraph: {
    title: "Aqua Otter Water Systems | The LAST Water System You Will EVER Need",
    description:
      "Family-owned water treatment experts. Free in-home water test with instant results. Serving 5 states.",
    type: "website",
    url: "https://www.myaquaotter.com",
    siteName: "Aqua Otter Water Systems",
    images: [
      {
        url: "/client/Product_Banner__1_.png",
        width: 1200,
        height: 630,
        alt: "Aqua Otter Water Systems",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.myaquaotter.com" },
};

// Site-wide canonical entity declaration. AI crawlers and search engines
// resolve all LocalBusiness/Service/Article blocks back to this @id.
// NOTE: founder is intentionally omitted (owner identity not yet confirmed
// by client, per SEOMAN no-fabrication policy). sameAs is left as a
// commented placeholder until verified profile URLs are supplied.
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
    url: "https://www.myaquaotter.com/client/Product_Banner__1_.png",
  },
  image: { "@id": "https://www.myaquaotter.com/#logo" },
  description:
    "Family-owned water treatment company serving homeowners across Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina since 1999. Free in-home water testing, USA-made systems, free standard installation.",
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
  slogan: "The LAST Water System You Will EVER Need.",
  telephone: "+1-317-961-6925",
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
    "Whole-home water filtration",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-317-961-6925",
      contactType: "customer service",
      areaServed: ["US-IN", "US-MI", "US-OH", "US-KY", "US-TN", "US-NC"],
      availableLanguage: "en-US",
    },
  ],
  inLanguage: "en-US",
  // sameAs: [REPLACE: array of verified profile URLs, GBP, Facebook, Instagram, LinkedIn, YouTube, BBB, Yelp]
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* Organization + WebSite JSON-LD (site-wide canonical entity) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
        {/* Google Tag Manager, HomePros Site-ID GTM-5WH7DWHM */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5WH7DWHM');` }} />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${heading.variable} ${body.variable} font-body antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5WH7DWHM" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main>{children}</main>
        <Footer />
        <ExitIntentPopup />
        <SocialProofToast />
        <ScrollRevealCTA />
        <CornerOfferPeek />
      </body>
    </html>
  );
}
