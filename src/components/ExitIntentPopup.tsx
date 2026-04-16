"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Droplets, BadgeCheck, Shield, ArrowRight } from "lucide-react";

const PHONE = "(317) 961-6925";
const PHONE_TEL = "tel:3179616925";
const STORAGE_KEY = "aquaotter_exit_popup_shown";

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const hasShown = useRef(false);

  const show = useCallback(() => {
    if (hasShown.current) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    hasShown.current = true;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(true);
  }, []);

  useEffect(() => {
    let handler: ((e: MouseEvent) => void) | null = null;
    const enableTimer = setTimeout(() => {
      handler = (e: MouseEvent) => {
        if (e.clientY <= 0 && e.relatedTarget === null) show();
      };
      document.documentElement.addEventListener("mouseout", handler);
    }, 2000);
    return () => {
      clearTimeout(enableTimer);
      if (handler) document.documentElement.removeEventListener("mouseout", handler);
    };
  }, [show]);

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    let hasPaused = false;
    const onScroll = () => {
      if (hasShown.current) return;
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (pct >= 0.6 && !hasPaused) {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          hasPaused = true;
          show();
        }, 3000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [show]);

  const trustSignals = [
    { icon: Droplets, label: "Free Water Testing" },
    { icon: BadgeCheck, label: "5-Star Google Rating" },
    { icon: Shield, label: "Family-Owned & Trusted" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="bg-gradient-to-r from-primary-800 to-primary px-6 py-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-6 h-6 text-accent" />
                <span className="text-accent font-bold text-sm uppercase tracking-wider">
                  Free Water Test
                </span>
              </div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl leading-tight">
                Wait — Don't Leave Without Your Free Water Test!
              </h2>
              <p className="text-white/80 text-sm mt-1">
                Find out exactly what's in your water. No obligation, no pressure.
              </p>
            </div>

            <div className="px-6 py-5">
              <p className="text-gray-600 text-sm mb-4">
                Get a free in-home water test with instant results. We'll show you exactly what's in your water and recommend the perfect solution for your home.
              </p>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full btn-shimmer-gold text-dark font-bold py-3.5 rounded-xl text-sm tracking-wide hover:brightness-110 transition-all active:scale-[0.98]"
              >
                Get My FREE Water Test
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="mt-4 text-center">
                <p className="text-gray-500 text-xs mb-1">Prefer to talk? Call us directly:</p>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2 text-primary font-bold text-base hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE}
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap justify-center gap-x-4 gap-y-2">
                {trustSignals.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <s.icon className="w-3.5 h-3.5 text-primary" />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
