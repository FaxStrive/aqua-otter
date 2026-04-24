"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stages = [
  { id: "stage-contamination", n: "01", label: "The Problem"  },
  { id: "stage-filter",        n: "02", label: "How It Works" },
  { id: "stage-systems",       n: "03", label: "The Solution" },
  { id: "stage-result",        n: "04", label: "The Result"   },
];

export default function JourneyNav() {
  const [active, setActive]   = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    /* ── Active stage detection ─────────────────────────────── */
    stages.forEach((stage, i) => {
      const el = document.getElementById(stage.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(i);
            setVisible(true);
          }
        },
        { rootMargin: "-38% 0px -38% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    /* ── Hide before first stage ────────────────────────────── */
    const firstEl = document.getElementById("stage-contamination");
    if (firstEl) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            setVisible(false);
          }
        },
        { threshold: 0 },
      );
      obs.observe(firstEl);
      observers.push(obs);
    }

    /* ── Hide after last stage ──────────────────────────────── */
    const lastEl = document.getElementById("stage-result");
    if (lastEl) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setVisible(false);
          }
        },
        { threshold: 0 },
      );
      obs.observe(lastEl);
      observers.push(obs);
    }

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed right-5 xl:right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end"
          aria-label="Journey progress"
        >
          {/* Vertical track line */}
          <div
            className="absolute right-[5px] top-4 bottom-4 w-px"
            style={{ background: "rgba(18,189,251,0.14)" }}
          />

          {/* Progress fill */}
          <div
            className="absolute right-[5px] top-4 w-px origin-top"
            style={{
              background: "linear-gradient(to bottom, #12BDFB, rgba(18,189,251,0.4))",
              height: active >= 0 ? `calc(${(active / (stages.length - 1)) * 100}% - 2rem + 0.5rem)` : "0%",
              transition: "height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />

          {stages.map((stage, i) => {
            const isDone   = i < active;
            const isActive = i === active;

            return (
              <button
                key={stage.id}
                onClick={() => scrollTo(stage.id)}
                className="relative flex items-center gap-3 py-3.5 group"
                aria-label={`Go to ${stage.label}`}
              >
                {/* Stage label — visible when active, hover on others */}
                <span
                  className="text-xs font-heading font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 pr-1"
                  style={{
                    color: isActive ? "#12BDFB" : "transparent",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateX(0)" : "translateX(6px)",
                    pointerEvents: "none",
                  }}
                >
                  {stage.n} — {stage.label}
                </span>

                {/* Hover label for non-active */}
                {!isActive && (
                  <span
                    className="text-xs font-heading font-medium tracking-[0.08em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pr-1 absolute right-full"
                    style={{ color: "rgba(18,189,251,0.55)", transform: "translateX(-4px)" }}
                  >
                    {stage.n}
                  </span>
                )}

                {/* Dot */}
                <div
                  className="relative z-10 flex items-center justify-center flex-shrink-0"
                  style={{ width: 12, height: 12 }}
                >
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute rounded-full"
                      style={{
                        width: 24,
                        height: 24,
                        border: "1px solid rgba(18,189,251,0.3)",
                        background: "rgba(18,189,251,0.08)",
                      }}
                    />
                  )}
                  <div
                    className="rounded-full transition-all duration-400"
                    style={{
                      width:      isActive ? 10 : isDone ? 7 : 5,
                      height:     isActive ? 10 : isDone ? 7 : 5,
                      background: isDone || isActive ? "#12BDFB" : "rgba(18,189,251,0.22)",
                      boxShadow:  isActive ? "0 0 10px rgba(18,189,251,0.6)" : "none",
                    }}
                  />
                </div>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
