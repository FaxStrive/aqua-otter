"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Free Water Test", href: "/services/free-water-test" },
      { label: "Well Water Treatment", href: "/services/well-water-treatment" },
      { label: "No-Salt Hard Water", href: "/services/no-salt-hard-water" },
      { label: "Water Softeners", href: "/services/water-softeners" },
      { label: "Reverse Osmosis", href: "/services/reverse-osmosis" },
      { label: "Whole House Filtration", href: "/services/whole-house-filtration" },
      { label: "Maintenance", href: "/services/maintenance" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)] shadow-sm"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={scrolled ? "/client/Black_Logo.png" : "/client/Vector_Quality_LOGO_with_shadow_wording__1__-_Copy.png"}
              alt="Aqua Otter Water Systems"
              width={200}
              height={60}
              className="h-12 w-auto transition-all duration-300"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`text-[15px] font-medium transition-colors inline-flex items-center gap-1 ${
                      scrolled
                        ? "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-white rounded-lg shadow-lg border border-[var(--color-border)] py-2 min-w-[240px]">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors ${
                    scrolled
                      ? "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:3179616925"
              className={`text-[15px] transition-colors inline-flex items-center gap-1.5 font-medium ${
                scrolled
                  ? "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              (317) 961-6925
            </a>
            <Link
              href="/contact"
              className="bg-[var(--color-accent)] text-[var(--color-text)] rounded-lg px-6 py-3 text-[15px] font-semibold hover:brightness-110 transition-all"
            >
              Free Water Test
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden p-2 ${scrolled ? "text-[var(--color-text)]" : "text-white"}`}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                <span className="text-lg font-semibold font-heading">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-6 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-180px)]">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-base font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pl-4 border-l-2 border-[var(--color-border)] ml-2 mb-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[var(--color-border)] space-y-3 bg-white">
                <a
                  href="tel:3179616925"
                  className="flex items-center justify-center gap-2 py-3 border border-[var(--color-border)] rounded-lg text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  (317) 961-6925
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center bg-[var(--color-accent)] text-[var(--color-text)] rounded-lg py-3 text-sm font-semibold"
                >
                  Free Water Test
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
