"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import FooterOtter from "@/components/ui/FooterOtter";

const links = {
  systems: [
    { label: "Water Softeners", href: "/systems/water-softener" },
    { label: "Whole-Home Filtration", href: "/systems/filtration" },
    { label: "Reverse Osmosis", href: "/systems/reverse-osmosis" },
    { label: "Well Water Systems", href: "/systems/well-water" },
    { label: "UV Purification", href: "/systems/uv-purification" },
    { label: "No-Salt Systems", href: "/systems/no-salt" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Reviews", href: "/reviews" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "Gallery", href: "/gallery" },
  ],
  resources: [
    { label: "Free Water Test", href: "/contact" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Water Library", href: "/learn" },
    { label: "Glossary", href: "/glossary" },
    { label: "Financing", href: "/financing" },
    { label: "Lifetime Warranty", href: "/warranty" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ],
};

const areas = ["Indianapolis", "Fishers", "Carmel", "Noblesville", "Fort Wayne", "Grand Rapids", "Detroit Metro", "Columbus OH", "Nashville", "Lexington", "Raleigh"];

const offices = [
  {
    region: "Headquarters",
    name: "Aqua Otter Headquarters",
    address1: "11216 Fall Creek Road #126",
    city: "Indianapolis, IN 46256",
    phone: "(317) 983-5919",
  },
  {
    region: "Northern Indiana",
    name: "Aqua Otter of Northern Indiana",
    address1: "3201 Stellhorn Road #I140",
    city: "Fort Wayne, IN 46815",
    phone: "(260) 235-4204",
  },
  {
    region: "West Michigan",
    name: "Aqua Otter of Grand Rapids",
    address1: "99 Monroe Avenue NW, Ste 200",
    city: "Grand Rapids, MI 49503",
    phone: "(616) 612-1660",
  },
  {
    region: "SE Michigan",
    name: "Aqua Otter of Detroit",
    address1: "15530 Middlebelt Road",
    city: "Livonia, MI 48154",
    phone: "(248) 621-8411",
  },
  {
    region: "Ohio",
    name: "Aqua Otter of Ohio",
    address1: "175 South Third Street, Ste 200",
    city: "Columbus, OH 43215",
    phone: "(380) 270-2422",
  },
  {
    region: "Kentucky",
    name: "Aqua Otter of Kentucky",
    address1: "710 E Main Street",
    city: "Lexington, KY",
    phone: "(859) 710-9446",
  },
  {
    region: "Tennessee",
    name: "Aqua Otter of Nashville",
    address1: "740C Conference Drive",
    city: "Goodlettsville, TN 37072",
    phone: "(615) 880-9527",
  },
  {
    region: "North Carolina",
    name: "Aqua Otter of North Carolina",
    address1: "5540 Centerview Drive, Ste 200",
    city: "Raleigh, NC 27606",
    phone: "(919) 358-8340",
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#f5f7f9" }}>
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(18,189,251,0.18), transparent)" }}
      />

      <div className="container-site pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/client/Black_Logo.png"
                alt="Aqua Otter"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "rgba(12,31,46,0.38)" }}>
              Custom-engineered water treatment systems for Indiana and Michigan
              homes. Designed from your water. Backed for life.
            </p>
            <div className="space-y-2.5">
              {[
                { icon: Phone, text: "(317) 983-5919", href: "tel:+13179835919" },
                { icon: Mail, text: "info@myaquaotter.com", href: "mailto:info@myaquaotter.com" },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 text-sm transition-colors"
                  style={{ color: "rgba(12,31,46,0.55)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#12BDFB")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.55)")}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
                  {text}
                </a>
              ))}
              <div className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(12,31,46,0.55)" }}>
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#12BDFB" }} />
                Serving IN, MI, OH, KY, TN, NC
              </div>
            </div>
          </div>

          {/* Systems */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: "rgba(12,31,46,0.6)" }}>
              Systems
            </h4>
            <ul className="space-y-2.5">
              {links.systems.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(12,31,46,0.38)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(12,31,46,0.75)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.38)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: "rgba(12,31,46,0.6)" }}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {links.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(12,31,46,0.38)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(12,31,46,0.75)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.38)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: "rgba(12,31,46,0.6)" }}>
              Resources
            </h4>
            <ul className="space-y-2.5">
              {links.resources.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(12,31,46,0.38)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(12,31,46,0.75)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.38)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regional offices */}
        <div className="border-t pt-10 mb-10" style={{ borderColor: "rgba(12,31,46,0.08)" }}>
          <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-1" style={{ color: "#12BDFB" }}>
                Regional Offices
              </h4>
              <p className="text-sm" style={{ color: "rgba(12,31,46,0.55)" }}>
                Eight locations across the Midwest, South, and Southeast. Call your local office direct.
              </p>
            </div>
            <p className="text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>
              {offices.length} offices · 6 states
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {offices.map((o) => {
              const isHQ = o.region === "Headquarters";
              return (
                <div
                  key={o.phone}
                  className="rounded-2xl p-4 border transition-colors"
                  style={{
                    borderColor: isHQ ? "rgba(18,189,251,0.35)" : "rgba(12,31,46,0.08)",
                    backgroundColor: isHQ ? "rgba(18,189,251,0.04)" : "#ffffff",
                  }}
                  onMouseEnter={() => {}}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "#12BDFB" }}>
                      {o.region}
                    </p>
                    {isHQ && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#12BDFB", color: "#ffffff" }}>
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: "#0C1F2E", lineHeight: 1.25 }}>{o.name}</p>
                  <p className="text-xs leading-snug mb-1" style={{ color: "rgba(12,31,46,0.55)" }}>
                    {o.address1}
                  </p>
                  <p className="text-xs mb-2.5" style={{ color: "rgba(12,31,46,0.55)" }}>
                    {o.city}
                  </p>
                  <a
                    href={`tel:${o.phone.replace(/\D/g, "")}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
                    style={{ color: "#12BDFB" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#0a9ed9")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#12BDFB")}
                  >
                    <Phone className="w-3 h-3" />
                    {o.phone}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service areas (short chip list) */}
        <div className="mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(12,31,46,0.25)" }}>
            Cities We Serve
          </h4>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <span
                key={a}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{ color: "rgba(12,31,46,0.38)", borderColor: "rgba(12,31,46,0.1)" }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Sleepy otter */}
        <div className="flex justify-center mb-2 -mt-4">
          <FooterOtter />
        </div>

        {/* Bottom */}
        <div className="border-t pt-7 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(12,31,46,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(12,31,46,0.25)" }}>
            &copy; {new Date().getFullYear()} Aqua Otter Water Systems. All rights reserved. Licensed &amp; Insured.
          </p>
          <div className="flex gap-5">
            {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs transition-colors"
                style={{ color: "rgba(12,31,46,0.25)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(12,31,46,0.75)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.25)")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
