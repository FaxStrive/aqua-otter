import Link from "next/link";
import { Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";
import type { StateHub } from "./_data";

const PHONE_DISPLAY = "(317) 961-6925";
const PHONE_TEL = "tel:3179616925";

export default function StateHubPage({ hub }: { hub: StateHub }) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Plumber"],
    "@id": `https://www.myaquaotter.com/${hub.slug}#localbusiness`,
    parentOrganization: { "@id": "https://www.myaquaotter.com/#organization" },
    name: hub.office.name,
    url: `https://www.myaquaotter.com/${hub.slug}`,
    telephone: hub.office.telephone,
    priceRange: "$$",
    description: `Whole-home water treatment, softeners, reverse osmosis, and well water systems serving ${hub.state}. Free in-home water testing.`,
    address: {
      "@type": "PostalAddress",
      ...(hub.office.streetAddress
        ? { streetAddress: hub.office.streetAddress }
        : {}),
      addressRegion: hub.abbr,
      ...(hub.office.postalCode ? { postalCode: hub.office.postalCode } : {}),
      addressCountry: "US",
    },
    areaServed: { "@type": "State", name: hub.state },
  };

  return (
    <main>
      {/* Hero */}
      <Section background="dark" padding="none">
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center py-16 sm:py-24">
          <span className="inline-block bg-accent/20 text-accent-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            {hub.state} Service Area
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black leading-tight mb-4">
            {hub.h1}
          </h1>
          <p data-bluf className="text-white/80 max-w-2xl text-base sm:text-lg px-4">
            {hub.intro}
          </p>
        </div>
      </Section>

      {/* Cities */}
      <Section background="white" gradient="radial-left">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-dark mb-6">
            Cities We Serve in {hub.state}
          </h2>
          <p className="text-gray-600 mb-6">
            Aqua Otter brings free in-home water testing and full water
            treatment service to homeowners across {hub.state}. If your city
            is not listed below, call us at {PHONE_DISPLAY}, chances are we
            still cover your area.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {hub.cities.map((city) => (
              <div
                key={city}
                className="flex items-center gap-2 text-sm text-gray-700 bg-primary-50 px-3 py-2 rounded-lg"
              >
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Local office card */}
      <Section background="surface" gradient="radial-center">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-black text-dark mb-2">
                {hub.office.name}
              </h2>
              {hub.office.streetAddress && (
                <p className="text-gray-600 text-sm mb-1">
                  {hub.office.streetAddress}
                  {hub.office.postalCode ? `, ${hub.office.postalCode}` : ""}
                </p>
              )}
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 text-primary font-bold mt-2"
              >
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Services links */}
      <Section background="white" gradient="radial-right">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-dark mb-6">
            Water Treatment Systems Installed Across {hub.state}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: "/services/water-softeners", label: "Whole-Home Water Softeners" },
              { href: "/services/no-salt-hard-water", label: "No-Salt Hard Water Treatment" },
              { href: "/services/well-water-treatment", label: "Well Water Treatment" },
              { href: "/services/whole-house-filtration", label: "Whole-House Filtration" },
              { href: "/services/reverse-osmosis", label: "Reverse Osmosis Drinking Water" },
              { href: "/services/free-water-test", label: "Free In-Home Water Test" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center justify-between gap-3 bg-primary-50 hover:bg-primary-100 transition-colors px-5 py-4 rounded-xl text-dark font-semibold text-sm"
              >
                {s.label}
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text={`Free Water Test, ${hub.state} Homes`}
        message={`Find out exactly what is in your water. No obligation, no pressure, no charge. Call ${PHONE_DISPLAY}.`}
        href="/contact"
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </main>
  );
}
