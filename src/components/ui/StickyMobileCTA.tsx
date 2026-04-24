"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Droplets } from "lucide-react";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="md:hidden fixed left-3 right-3 z-50 rounded-2xl"
          style={{
            bottom: "max(12px, env(safe-area-inset-bottom))",
            backgroundColor: "#0C1F2E",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(18,189,251,0.22)",
          }}
        >
          <div className="grid grid-cols-2 gap-1.5 p-1.5">
            <a
              href="tel:+13179835919"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{ backgroundColor: "rgba(18,189,251,0.08)", color: "#12BDFB", border: "1px solid rgba(18,189,251,0.25)" }}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
              style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}
            >
              <Droplets className="w-4 h-4" />
              Free Test
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
