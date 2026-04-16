"use client";

import { Phone, MapPin, Droplets, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PHONE = "(317) 961-6925";
const PHONE_TEL = "tel:3179616925";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/savings-calculator", label: "Savings Calculator" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/free-water-test", label: "Free Water Test" },
  { href: "/services/well-water-treatment", label: "Well Water Treatment" },
  { href: "/services/no-salt-hard-water", label: "No-Salt Hard Water" },
  { href: "/services/water-softeners", label: "Water Softeners" },
  { href: "/services/reverse-osmosis", label: "Reverse Osmosis" },
  { href: "/services/whole-house-filtration", label: "Whole House Filtration" },
  { href: "/services/maintenance", label: "Maintenance" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white">
      {/* Wave top edge */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-[32px] sm:h-[48px] block">
          <path d="M0,48 L0,16 Q360,0 720,16 Q1080,32 1440,16 L1440,48 Z" fill="var(--color-primary-dark)" />
        </svg>
      </div>

      <div className="max-w-content mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/client/Vector_Quality_LOGO_with_shadow_wording__1__-_Copy.png"
              alt="Aqua Otter Water Systems"
              width={180}
              height={60}
              className="h-14 w-auto brightness-110"
            />
            <p className="text-sm text-white/60 leading-relaxed">
              Family-owned water treatment experts. The LAST water system you will EVER need.
            </p>
            <div className="flex items-center gap-2 text-[var(--color-accent)]">
              <Droplets className="w-4 h-4" />
              <span className="text-sm font-medium">Serving 6 States</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white/90 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white/90 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href={PHONE_TEL} className="flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {PHONE}
                </a>
              </li>
              <li>
                <a href="mailto:info@myaquaotter.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  info@myaquaotter.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                IN, MI, OH, KY, TN &amp; NC
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.facebook.com/MyAquaOtter" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/therealaquaotter" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.youtube.com/@AquaOtterWaterSystems" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Aqua Otter Water Systems LLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
