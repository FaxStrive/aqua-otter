import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Phone, Sparkles } from "lucide-react";
import { getServiceArea, SERVICE_AREAS } from "@/lib/service-areas";
import { getService, SERVICES, SERVICE_SLUGS } from "@/lib/services";
import { hardnessLevel } from "@/lib/water-data";
import CTA from "@/components/sections/CTA";

type Props = { params: { slug: string; service: string } };

export function generateStaticParams() {
  return SERVICE_AREAS.flatMap(a =>
    SERVICE_SLUGS.map(s => ({ slug: a.slug, service: s }))
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const area = getServiceArea(params.slug);
  const service = getService(params.service);
  if (!area || !service) return {};

  return {
    title: `${service.name} in ${area.city}, ${area.state} | Aqua Otter`,
    description: `${service.name} in ${area.city}, ${area.state}. ${service.tagline} Free in-home water test. Lifetime warranty. Serving ${area.county} County homeowners.`,
    alternates: { canonical: `/service-areas/${area.slug}/${service.slug}` },
    openGraph: {
      title: `${service.name} in ${area.city} — Aqua Otter`,
      description: service.tagline,
      type: "website",
    },
  };
}

export default function CityServicePage({ params }: Props) {
  const area = getServiceArea(params.slug);
  const service = getService(params.service);
  if (!area || !service) notFound();

  const hl = hardnessLevel(area.hardness_gpg);
  const localCopy = service.localCopy(area);
  const otherServices = SERVICE_SLUGS.filter(s => s !== service.slug).slice(0, 4).map(s => SERVICES[s]);
  const nearbyCities = area.nearby
    .map(s => SERVICE_AREAS.find(a => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "LocalBusiness",
      name: "Aqua Otter Water Systems",
      telephone: area.office_phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: area.city,
        addressRegion: area.state,
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: area.city,
      containedInPlace: { "@type": "State", name: area.state },
    },
    description: `${service.name} installation and service in ${area.city}, ${area.state}. ${service.tagline}`,
    offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD" } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ backgroundColor: "#07111A" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 55% at 25% 40%, ${service.color}18 0%, transparent 60%)` }} />

        <div className="container-site relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Link href="/service-areas" className="hover:text-white">Service Areas</Link>
            <span>›</span>
            <Link href={`/service-areas/${area.slug}`} className="hover:text-white">{area.city}</Link>
            <span>›</span>
            <span style={{ color: service.color }}>{service.shortName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-4 h-4" style={{ color: service.color }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: service.color }}>
                  {area.county} County, {area.state}
                </span>
              </div>
              <h1 className="font-display font-bold leading-[0.88] mb-5" style={{ fontSize: "clamp(2.6rem, 7vw, 5.8rem)", color: "#ffffff", letterSpacing: "-0.035em" }}>
                {service.name}<br />
                <span style={{ color: service.color }}>in {area.city}.</span>
              </h1>
              <p className="text-lg leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.62)", maxWidth: "56ch" }}>
                {service.tagline}
              </p>
              <p className="text-base leading-relaxed mb-9" style={{ color: "rgba(255,255,255,0.48)", maxWidth: "56ch" }}>
                {localCopy}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold transition-all" style={{ backgroundColor: service.color, color: "#0C1F2E", boxShadow: `0 4px 24px ${service.color}50` }}>
                  Book a free water test <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={`tel:${area.office_phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold" style={{ border: `1.5px solid ${service.color}50`, color: service.color }}>
                  <Phone className="w-4 h-4" /> {area.office_phone}
                </a>
              </div>
            </div>

            {/* Hero product visual */}
            <div
              className="relative rounded-3xl p-8 flex items-center justify-center"
              style={{
                background: `linear-gradient(165deg, ${service.color}16 0%, rgba(7,17,26,0.8) 100%)`,
                border: `1px solid ${service.color}30`,
                minHeight: 320,
              }}
            >
              <Image
                src={service.image}
                alt={service.name}
                width={360}
                height={360}
                className="object-contain max-h-72 w-auto"
                style={{ filter: `drop-shadow(0 18px 40px ${service.color}40)` }}
              />
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ backgroundColor: `${service.color}22`, color: service.color, border: `1px solid ${service.color}50` }}
              >
                Recommended for {area.city}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT FIXES */}
      <section className="py-20 md:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site">
          <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: service.color }}>What it fixes</p>
              <h2 className="font-display font-bold leading-[0.9]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}>
                The problems {service.shortName} solves<br />
                <span style={{ color: "rgba(12,31,46,0.3)" }}>for homes in {area.city}.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {service.targets.map(t => (
              <div
                key={t}
                className="rounded-2xl p-4 flex items-start gap-2.5"
                style={{ backgroundColor: `${service.color}0a`, border: `1px solid ${service.color}24` }}
              >
                <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: service.color }} />
                <span className="text-sm font-semibold" style={{ color: "#0C1F2E" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL WATER CONTEXT */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#0C1F2E" }}>
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${hl.color}40` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Local hardness</p>
              <p className="font-display font-bold tabular-nums leading-none mb-1" style={{ fontSize: "2.8rem", color: hl.color, letterSpacing: "-0.02em" }}>
                {area.hardness_gpg}
                <span className="text-sm font-medium ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>GPG</span>
              </p>
              <p className="text-xs font-bold" style={{ color: hl.color }}>{hl.label}</p>
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Water source</p>
              <p className="font-display font-bold" style={{ fontSize: "1.2rem", color: "#ffffff" }}>{area.source}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{area.zips.length} ZIP codes served</p>
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Flagged contaminants</p>
              <div className="flex flex-wrap gap-1.5">
                {area.notable_contaminants.map(c => (
                  <span key={c} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(239,68,68,0.14)", color: "#fca5a5" }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY AQUA OTTER / HOW IT WORKS */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: service.color }}>Why us</p>
            <h2 className="font-display font-bold leading-[0.9] mb-5" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}>
              How we do {service.shortName}<br />
              <span style={{ color: "rgba(12,31,46,0.3)" }}>in {area.city}.</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(12,31,46,0.58)", maxWidth: "52ch" }}>
              We test your specific water first. We size the system to your specific home. We install it ourselves. Every piece is American made and backed for life.
            </p>
            <Link href={service.systemPageHref} className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: service.color }}>
              See the full {service.shortName} page <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {service.bullets.map((b, i) => (
              <div
                key={b}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: "#F7FAFC", border: "1px solid rgba(12,31,46,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-black"
                  style={{ backgroundColor: `${service.color}16`, color: service.color, fontSize: "1rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(12,31,46,0.78)" }}>
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT OPTIONS */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-[0.22em] mb-2" style={{ color: service.color }}>Systems we install</p>
          <h2 className="font-display font-bold leading-[0.9] mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}>
            Your {service.shortName} options.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.productMentions.map(p => (
              <div key={p} className="rounded-2xl p-5" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(12,31,46,0.08)" }}>
                <CheckCircle2 className="w-5 h-5 mb-3" style={{ color: service.color }} />
                <p className="font-semibold" style={{ color: "#0C1F2E" }}>{p}</p>
              </div>
            ))}
          </div>
          <Link href={service.systemPageHref} className="inline-flex items-center gap-2 mt-8 text-sm font-bold" style={{ color: service.color }}>
            See full specs, pricing, and install details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* OTHER SERVICES WE OFFER HERE */}
      <section className="py-20 md:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site">
          <h2 className="font-display font-bold mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#0C1F2E", letterSpacing: "-0.02em" }}>
            Other services in {area.city}
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(12,31,46,0.55)", maxWidth: "48ch" }}>
            Most homes end up with a combination. Your test will confirm what you actually need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map(s => (
              <Link
                key={s.slug}
                href={`/service-areas/${area.slug}/${s.slug}`}
                className="group rounded-2xl p-5 transition-all"
                style={{ backgroundColor: "#F7FAFC", border: "1px solid rgba(12,31,46,0.06)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${s.color}14` }}>
                  <Sparkles className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <p className="font-display font-bold mb-1" style={{ fontSize: "1rem", color: "#0C1F2E" }}>{s.name}</p>
                <p className="text-xs mb-2" style={{ color: "rgba(12,31,46,0.55)" }}>{s.tagline}</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: s.color }}>
                  Learn more <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY CITIES */}
      {nearbyCities.length > 0 && (
        <section className="py-14 md:py-16" style={{ backgroundColor: "#F0F8FF" }}>
          <div className="container-site">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: service.color }}>
              {service.shortName} in nearby cities
            </h3>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map(n => (
                <Link
                  key={n.slug}
                  href={`/service-areas/${n.slug}/${service.slug}`}
                  className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                  style={{ backgroundColor: "#ffffff", color: "#0C1F2E", border: `1px solid ${service.color}26` }}
                >
                  {service.shortName} in {n.city}
                </Link>
              ))}
            </div>
            <Link href={`/service-areas/${area.slug}`} className="inline-flex items-center gap-2 mt-6 text-sm font-bold" style={{ color: service.color }}>
              ← All services in {area.city}
            </Link>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
