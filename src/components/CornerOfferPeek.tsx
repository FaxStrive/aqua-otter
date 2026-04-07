"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, ArrowRight } from "lucide-react";

export default function CornerOfferPeek() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("corner-offer-dismissed")) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      setDismissed(true);
      sessionStorage.setItem("corner-offer-dismissed", "true");
    }, 12000);
    return () => clearTimeout(t);
  }, [show]);

  const close = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("corner-offer-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 14, stiffness: 200 }}
          className="fixed bottom-4 right-4 max-md:left-4 max-md:right-4 z-[35]"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-full max-w-[220px]"
          >
            <button
              onClick={close}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:brightness-110 transition-all"
              aria-label="Close"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-dark">Free Water Test</p>
                <p className="text-xs text-gray-500 mt-0.5">Instant results</p>
              </div>
            </div>

            <a
              href="#contact"
              onClick={close}
              className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 text-xs font-bold text-dark bg-accent hover:brightness-110 rounded-lg transition-all"
            >
              Book Now
              <ArrowRight className="w-3 h-3" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
