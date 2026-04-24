"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past hero (roughly 100vh)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        >
          <div
            className="pointer-events-auto"
            style={{
              backgroundColor: "rgba(12,31,46,0.95)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(18,189,251,0.15)",
              boxShadow: "0 -4px 32px rgba(0,0,0,0.2)",
            }}
          >
            <div className="container-site flex items-center justify-between py-3 gap-4">
              {/* Left: value prop */}
              <div className="hidden sm:flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#12BDFB", boxShadow: "0 0 8px rgba(18,189,251,0.5)" }}
                />
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Free water test. Same-week install. Lifetime warranty.
                </p>
              </div>

              {/* Right: CTAs */}
              <div className="flex items-center gap-3 ml-auto">
                <a
                  href="tel:+13179835919"
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all duration-200"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(18,189,251,0.4)";
                    e.currentTarget.style.color = "#12BDFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  <Phone className="w-3 h-3" style={{ color: "#12BDFB" }} />
                  (317) 983-5919
                </a>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200"
                  style={{
                    backgroundColor: "#12BDFB",
                    color: "#0C1F2E",
                    boxShadow: "0 2px 16px rgba(18,189,251,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,255,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#12BDFB";
                    e.currentTarget.style.boxShadow = "0 2px 16px rgba(18,189,251,0.35)";
                  }}
                >
                  Get Free Water Test
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
