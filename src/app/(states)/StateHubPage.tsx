import Link from "next/link";
import { ArrowRight, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/service-areas";
import type { StateHub } from "./_data";
import { getCitiesInState } from "./_data";

export default function StateHubPage({ hub }: { hub: StateHub }) {
  const cities = getCitiesInState(hub.abbr);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Plumber"],
    "@id": `https://www.myaquaotter.com/${hub.slug}#localbusiness`,
    parentOrganization: { "@id": "https://www.myaquaotter.com/#organization" },
    name: hub.office.name,
    url: `https://www.myaquaotter.com/${hub.slug}`,
    telephone: hub.office.telephone,
    priceRange: "$$",
    description: `Whole-home water treatment, softeners, reverse osmosis, well water systems, and free in-home water testing serving ${hub.state}.`,
    address: {
      "@type": "PostalAddress",
      ...(hub.office.streetAddress
        ? { streetAddress: hub.office.streetAddress }
        : {}),
      ...(hub.office.addressLocality
        ? { addressLocality: hub.office.addressLocality }
        : {}),
      addressRegion: hub.abbr,
      ...(hub.office.postalCode ? { postalCode: hub.office.postalCode } : {}),
      addressCountry: "US",
    },
    areaServed: { "@type": "State", name: hub.state },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.myaquaotter.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.myaquaotter.com/service-areas" },
      { "@type": "ListItem", position: 3, name: hub.state, item: `https://www.myaquaotter.com/${hub.slug}` },
    ],
  };

  const phoneTel = `tel:+1${hub.office.telephone.replace(/\D/g, "")}`;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F7FBFD" }}>
      {/* Hero */}
      <section className="px-6 pt-24 pb-12" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="max-w-content mx-auto text-center">
          <span
            className="inline-block text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: "#12BDFB" }}
          >
            {hub.state} Service Area
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight mb-6"
            style={{ color: "#FFFFFF" }}
          >
            {hub.h1}
          </h1>
          <p
            data-bluf
            className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            {hub.intro}
          </p>
        </div>
      </section>

      {/* Cities */}
      <section className="px-6 py-16">
        <div className="max-w-content mx-auto">
          <h2
            className="text-3xl font-medium mb-2"
            style={{ color: "#0C1F2E" }}
          >
            Cities we serve in {hub.state}
          </h2>
          <p
            className="text-sm mb-8"
            style={{ color: "rgba(12,31,46,0.58)", maxWidth: "60ch" }}
          >
            Aqua Otter brings free in-home water testing to homeowners across
            {" "}{hub.state}. Don&apos;t see your city below? Call us at{" "}
            <a
              href={phoneTel}
              className="font-medium"
              style={{ color: "#12BDFB" }}
            >
              {hub.office.telephone}
            </a>
            , chances are we still cover your area.
          </p>
          {cities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/service-areas/${c.slug}`}
                  className="flex items-center justify-between gap-3 px-5 py-4 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(18,189,251,0.12)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: "#12BDFB" }} />
                    <span className="text-sm font-medium" style={{ color: "#0C1F2E" }}>
                      {c.city}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4" style={{ color: "rgba(12,31,46,0.3)" }} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: "rgba(12,31,46,0.58)" }}>
              Statewide service via our regional office. Call{" "}
              <a href={phoneTel} className="font-medium" style={{ color: "#12BDFB" }}>
                {hub.office.telephone}
              </a>{" "}
              to confirm coverage for your city.
            </p>
          )}
        </div>
      </section>

      {/* Local office */}
      <section className="px-6 py-12" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-content mx-auto">
          <div
            className="p-8 rounded-2xl flex flex-col sm:flex-row items-start gap-6"
            style={{ backgroundColor: "#F7FBFD" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(18,189,251,0.1)" }}
            >
              <MapPin className="w-6 h-6" style={{ color: "#12BDFB" }} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium mb-2" style={{ color: "#0C1F2E" }}>
                {hub.office.name}
              </h2>
              {hub.office.streetAddress && (
                <p className="text-sm mb-1" style={{ color: "rgba(12,31,46,0.7)" }}>
                  {hub.office.streetAddress}
                  {hub.office.addressLocality
                    ? `, ${hub.office.addressLocality}, ${hub.abbr}`
                    : ""}
                  {hub.office.postalCode ? ` ${hub.office.postalCode}` : ""}
                </p>
              )}
              <a
                href={phoneTel}
                className="inline-flex items-center gap-2 text-sm font-medium mt-3"
                style={{ color: "#12BDFB" }}
              >
                <Phone className="w-4 h-4" />
                {hub.office.telephone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="px-6 py-16">
        <div className="max-w-content mx-auto">
          <h2 className="text-3xl font-medium mb-2" style={{ color: "#0C1F2E" }}>
            Water treatment systems we install across {hub.state}
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(12,31,46,0.58)", maxWidth: "60ch" }}>
            Every Aqua Otter install starts with a free in-home water test, so
            the system we recommend matches what is actually in your water.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/systems/water-softener", label: "Water Softener" },
              { href: "/systems/no-salt", label: "No-Salt Water Treatment" },
              { href: "/systems/filtration", label: "Whole-Home Filtration" },
              { href: "/systems/reverse-osmosis", label: "Reverse Osmosis" },
              { href: "/systems/well-water", label: "Well Water Treatment" },
              { href: "/systems/uv-purification", label: "UV Purification" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center justify-between gap-3 px-5 py-4 rounded-lg transition-colors"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(18,189,251,0.12)",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "#0C1F2E" }}>
                  {s.label}
                </span>
                <ArrowRight className="w-4 h-4" style={{ color: "#12BDFB" }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="max-w-content mx-auto text-center">
          <h2 className="text-3xl font-medium mb-3" style={{ color: "#FFFFFF" }}>
            Free water test in {hub.state}
          </h2>
          <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            Find out exactly what is in your water. No obligation, no pressure,
            no charge.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-medium"
              style={{ backgroundColor: "#12BDFB", color: "#07111A" }}
            >
              Book my free water test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={phoneTel}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-medium"
              style={{ color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <Phone className="w-4 h-4" />
              Call {hub.office.telephone}
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}

// Suppress unused-import warning during initial dev. SERVICE_AREAS is
// re-exported via getCitiesInState, but keeping the import explicit
// makes the data dependency obvious.
void SERVICE_AREAS;
