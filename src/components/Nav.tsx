"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const systemLinks = [
  { label: "Water Softeners", href: "/systems/water-softener", desc: "Eliminate hard water" },
  { label: "Whole-Home Filtration", href: "/systems/filtration", desc: "Chlorine and odor removal" },
  { label: "Well Water Solutions", href: "/systems/well-water", desc: "Iron, sulfur, bacteria" },
  { label: "Reverse Osmosis", href: "/systems/reverse-osmosis", desc: "Purest drinking water" },
  { label: "No-Salt Systems", href: "/systems/no-salt", desc: "Eco-friendly hard water" },
  { label: "UV Purification", href: "/systems/uv-purification", desc: "Chemical-free bacteria removal" },
];

const navLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Financing", href: "/financing" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
];

const mobileAllLinks = [
  { label: "Systems Overview", href: "/systems" },
  { label: "Water Softeners", href: "/systems/water-softener" },
  { label: "Whole-Home Filtration", href: "/systems/filtration" },
  { label: "Well Water Solutions", href: "/systems/well-water" },
  { label: "Reverse Osmosis", href: "/systems/reverse-osmosis" },
  { label: "No-Salt Systems", href: "/systems/no-salt" },
  { label: "UV Purification", href: "/systems/uv-purification" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Financing", href: "/financing" },
  { label: "Warranty", href: "/warranty" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Blog", href: "/blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [systemsOpen, setSystemsOpen] = useState(false);
  const systemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (systemsRef.current && !systemsRef.current.contains(e.target as Node)) {
        setSystemsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(18,189,251,0.1)",
          paddingTop: scrolled ? "0.75rem" : "1rem",
          paddingBottom: scrolled ? "0.75rem" : "1rem",
        }}
      >
        <div className="container-site flex items-center justify-between">
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image src="/client/Black_Logo.png" alt="Aqua Otter" width={140} height={48} className="h-9 w-auto object-contain" priority />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            <div ref={systemsRef} className="relative">
              <button
                onClick={() => setSystemsOpen(!systemsOpen)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{ color: systemsOpen ? "#0C1F2E" : "rgba(12,31,46,0.6)" }}
              >
                Systems
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" style={{ transform: systemsOpen ? "rotate(180deg)" : "rotate(0)" }} />
              </button>
              <AnimatePresence>
                {systemsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-72 rounded-2xl border overflow-hidden"
                    style={{ backgroundColor: "#ffffff", borderColor: "rgba(18,189,251,0.15)", boxShadow: "0 16px 48px rgba(0,0,0,0.1)" }}
                  >
                    <div className="p-2">
                      {systemLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setSystemsOpen(false)}
                          className="flex flex-col px-4 py-3 rounded-xl transition-colors duration-150"
                          style={{ color: "#0C1F2E" }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F0F8FF")}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <span className="text-sm font-medium">{link.label}</span>
                          <span className="text-xs mt-0.5" style={{ color: "rgba(12,31,46,0.45)" }}>{link.desc}</span>
                        </Link>
                      ))}
                      <div className="border-t mt-2 pt-2" style={{ borderColor: "rgba(18,189,251,0.1)" }}>
                        <Link href="/systems" onClick={() => setSystemsOpen(false)}
                          className="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                          style={{ color: "#12BDFB" }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F0F8FF")}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          View all systems →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{ color: "rgba(12,31,46,0.6)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0C1F2E")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.6)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+13179835919"
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all duration-200"
              style={{ borderColor: "rgba(18,189,251,0.22)", color: "rgba(12,31,46,0.55)", backgroundColor: "rgba(18,189,251,0.04)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#12BDFB"; e.currentTarget.style.color = "#12BDFB"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(18,189,251,0.22)"; e.currentTarget.style.color = "rgba(12,31,46,0.55)"; }}
            >
              <Phone className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
              (317) 983-5919
            </a>
            <Link href="/contact"
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 2px 12px rgba(18,189,251,0.25)" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#3DCFFF"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#12BDFB"; }}
            >
              Free Water Test
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" style={{ color: "rgba(12,31,46,0.6)" }} aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[min(320px,calc(100vw-48px))] border-l flex flex-col pt-24 px-6 pb-10 overflow-y-auto"
              style={{ backgroundColor: "#ffffff", borderColor: "rgba(18,189,251,0.1)" }}
            >
              <div className="space-y-0.5 flex-1">
                {mobileAllLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 + i * 0.025 }}>
                    <Link href={link.href} onClick={() => setOpen(false)}
                      className="block py-3 text-sm font-medium border-b transition-colors"
                      style={{ color: "rgba(12,31,46,0.65)", borderColor: "rgba(12,31,46,0.06)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#0C1F2E")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(12,31,46,0.65)")}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-3 mt-8">
                <a href="tel:+13179835919" className="flex items-center gap-2 text-sm" style={{ color: "rgba(12,31,46,0.6)" }}>
                  <Phone className="w-4 h-4" style={{ color: "#12BDFB" }} />
                  (317) 983-5919
                </a>
                <Link href="/contact" onClick={() => setOpen(false)} className="block w-full text-center py-3.5 rounded-full text-sm font-semibold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>
                  Free Water Test
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
