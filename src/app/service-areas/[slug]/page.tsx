import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Phone, Droplets } from "lucide-react";
import { getServiceArea, SERVICE_AREAS } from "@/lib/service-areas";
import { SERVICES, SERVICE_SLUGS } from "@/lib/services";
import { hardnessLevel } from "@/lib/water-data";
import CTA from "@/components/sections/CTA";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return SERVICE_AREAS.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getServiceArea(params.slug);
  if (!a) return {};
  return {
    title: `Water Treatment in ${a.city}, ${a.state} — Free Water Test | Aqua Otter`,
    description: `Custom water softener, filtration, reverse osmosis, and well water treatment in ${a.city}, ${a.state}. Free in-home water test. Lifetime warranty. Serving ${a.county} County.`,
    alternates: { canonical: `/service-areas/${a.slug}` },
  };
}

export default function ServiceAreaPage({ params }: Props) {
  const area = getServiceArea(params.slug);
  if (!area) notFound();

  const hl = hardnessLevel(area.hardness_gpg);
  const nearby = area.nearby
    .map(s => SERVICE_AREAS.find(a => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Aqua Otter Water Systems — ${area.city}`,
    image: "https://www.myaquaotter.com/client/service-tech-consult.jpg",
    "@id": `https://www.myaquaotter.com/service-areas/${area.slug}`,
    url: `https://www.myaquaotter.com/service-areas/${area.slug}`,
    telephone: area.office_phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: area.city,
      addressRegion: area.state,
      postalCode: area.zips[0],
      addressCountry: "US",
    },
    areaServed: area.zips.map(z => ({ "@type": "PostalCodeSpecification", postalCode: z })),
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-20" style={{ backgroundColor: "#07111A" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 30% 40%, rgba(18,189,251,0.12) 0%, transparent 60%)" }} />
        <div className="container-site relative z-10">
          <Link href="/service-areas" className="inline-flex items-center gap-2 text-xs font-semibold mb-6" style={{ color: "rgba(18,189,251,0.75)" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> All service areas
          </Link>
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4" style={{ color: "#12BDFB" }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#12BDFB" }}>{area.county} County, {area.state}</span>
          </div>
          <h1 className="font-display font-bold leading-[0.88] mb-5" style={{ fontSize: "clamp(2rem, 7vw, 6.5rem)", color: "#ffffff", letterSpacing: "-0.035em" }}>
            Water treatment in<br /><span style={{ color: "#12BDFB" }}>{area.city}.</span>
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "56ch" }}>
            {area.local_hook}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 24px rgba(18,189,251,0.35)" }}>
              Book a free water test <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${area.office_phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold" style={{ border: "1.5px solid rgba(18,189,251,0.35)", color: "#12BDFB" }}>
              <Phone className="w-4 h-4" /> {area.office_phone}
            </a>
          </div>
        </div>
      </section>

      {/* WATER FACTS */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-[0.22em] mb-8" style={{ color: "#12BDFB" }}>
            What&apos;s in the water in {area.city}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${hl.color}40` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Hardness</p>
              <p className="font-display font-bold tabular-nums leading-none mb-1" style={{ fontSize: "3rem", color: hl.color, letterSpacing: "-0.02em" }}>
                {area.hardness_gpg}
                <span className="text-base font-medium ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>GPG</span>
              </p>
              <p className="text-sm font-bold" style={{ color: hl.color }}>{hl.label}</p>
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Water source</p>
              <p className="font-display font-bold mb-1" style={{ fontSize: "1.3rem", color: "#ffffff" }}>{area.source}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Most homes in {area.county} County</p>
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Flagged contaminants</p>
              <div className="flex flex-wrap gap-1.5">
                {area.notable_contaminants.map(c => (
                  <span key={c} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(239,68,68,0.14)", color: "#fca5a5" }}>{c}</span>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>Per latest CCR + EWG data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEMS WE INSTALL HERE */}
      <section className="py-20 md:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site">
          <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#12BDFB" }}>Tailored for {area.city}</p>
              <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}>
                Every system we offer.<br />
                <span style={{ color: "rgba(12,31,46,0.3)" }}>Ranked for your water.</span>
              </h2>
            </div>
            <p className="text-sm max-w-sm" style={{ color: "rgba(12,31,46,0.55)" }}>
              Click any service to see exactly why we recommend it in {area.city} and what it solves for {area.county} County homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_SLUGS.map(slug => {
              const s = SERVICES[slug];
              const rel = s.relevanceFor(area);
              const isPrimary = rel === "primary";
              const isNiche = rel === "niche";
              return (
                <Link
                  key={s.slug}
                  href={`/service-areas/${area.slug}/${s.slug}`}
                  className="group relative rounded-2xl p-6 transition-all flex flex-col"
                  style={{
                    backgroundColor: isPrimary ? `${s.color}08` : "#F7FAFC",
                    border: `1px solid ${isPrimary ? s.color + "40" : "rgba(12,31,46,0.06)"}`,
                    boxShadow: isPrimary ? `0 4px 20px ${s.color}14` : "none",
                  }}
                >
                  {isPrimary && (
                    <span
                      className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: s.color, color: "#ffffff" }}
                    >
                      Recommended
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${s.color}14`, border: `1px solid ${s.color}26` }}>
                    <Droplets className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <p className="font-display font-bold mb-1" style={{ fontSize: "1.2rem", color: "#0C1F2E", letterSpacing: "-0.01em" }}>
                    {s.name}
                  </p>
                  <p className="text-sm mb-4" style={{ color: "rgba(12,31,46,0.55)" }}>{s.tagline}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: s.color }}>
                      {s.shortName} in {area.city} <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    {isNiche && (
                      <span className="text-[10px] font-semibold" style={{ color: "rgba(12,31,46,0.35)" }}>
                        Niche fit
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ZIPS + NEARBY */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#12BDFB" }}>ZIP codes we serve</h3>
            <div className="flex flex-wrap gap-2">
              {area.zips.map(z => (
                <Link
                  key={z}
                  href="/#zip-lookup"
                  className="text-sm font-semibold px-4 py-2 rounded-full tabular-nums"
                  style={{ backgroundColor: "#ffffff", color: "#0C1F2E", border: "1px solid rgba(18,189,251,0.2)" }}
                >
                  {z}
                </Link>
              ))}
            </div>
          </div>

          {nearby.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#12BDFB" }}>Nearby service areas</h3>
              <div className="flex flex-wrap gap-2">
                {nearby.map(n => (
                  <Link
                    key={n.slug}
                    href={`/service-areas/${n.slug}`}
                    className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                    style={{ backgroundColor: "#ffffff", color: "#0C1F2E", border: "1px solid rgba(18,189,251,0.2)" }}
                  >
                    {n.city}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
