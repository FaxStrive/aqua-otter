"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function FooterOtter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const [waved, setWaved] = useState(false);

  // When it enters view, switch from "sleeping" (thinking) to "waving" briefly
  if (inView && !waved) {
    setTimeout(() => setWaved(true), 400);
  }

  return (
    <div ref={ref} className="relative pointer-events-none select-none flex items-end justify-center">
      <AnimatePresence mode="wait">
        {!waved ? (
          <motion.div
            key="sleeping"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <Image
              src="/client/otter-thinking.png"
              alt="Aqua Otter resting"
              width={140}
              height={170}
              className="h-auto object-contain"
              style={{ width: 140, filter: "drop-shadow(0 6px 20px rgba(12,31,46,0.15))" }}
            />
            {/* Zzz animated dots */}
            <div className="absolute -top-2 -right-2 flex items-end gap-1">
              {["Z", "z", "z"].map((c, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2.2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  className="font-display font-bold"
                  style={{ color: "#12BDFB", fontSize: `${14 - i * 2}px` }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="waving"
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, -4, 4, -3, 0] }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src="/client/otter-waving.png"
              alt="Aqua Otter waving goodbye"
              width={140}
              height={170}
              className="h-auto object-contain"
              style={{ width: 140, filter: "drop-shadow(0 6px 20px rgba(12,31,46,0.15))" }}
            />
            {/* Little "bye!" speech bubble */}
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="absolute -top-3 -right-5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 12px rgba(18,189,251,0.3)" }}
            >
              See you soon!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
