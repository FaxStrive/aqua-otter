"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ScrollRevealCTA() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/contact") return;
    if (sessionStorage.getItem("scroll-reveal-dismissed")) {
      setDismissed(true);
      return;
    }
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct >= 0.4 && !dismissed) setShow(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed, pathname]);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      setDismissed(true);
      sessionStorage.setItem("scroll-reveal-dismissed", "true");
    }, 15000);
    return () => clearTimeout(t);
  }, [show]);

  const close = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("scroll-reveal-dismissed", "true");
  };

  if (pathname === "/contact") return null;

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 180 }}
          className="fixed bottom-0 left-0 right-0 z-30"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-700 to-primary shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
            <div className="relative max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="text-white font-bold text-sm md:text-base text-center md:text-left">
                Your water could be hiding problems you can&apos;t see —{" "}
                <span className="text-accent-300">get a FREE water test today</span>
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="#contact"
                  onClick={close}
                  className="relative inline-flex items-center gap-2 px-5 py-2.5 btn-shimmer-gold text-dark text-sm font-bold rounded-lg transition-colors shadow-lg cta-pulse-gold"
                >
                  Get My FREE Test
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:8124996807"
                  className="hidden md:inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (812) 499-6807
                </a>
              </div>
              <button
                onClick={close}
                className="absolute top-2 right-2 md:static p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close banner"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 15, ease: "linear" }}
              className="h-0.5 bg-accent origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
