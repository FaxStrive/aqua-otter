"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialStripProps {
  quote: string;
  author: string;
  location: string;
  stars?: number;
}

export function TestimonialStrip({
  quote,
  author,
  location,
  stars = 5,
}: TestimonialStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="py-6 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center gap-0.5 mb-3">
          {Array.from({ length: stars }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
            />
          ))}
        </div>
        <blockquote className="text-lg md:text-xl font-medium text-[var(--color-text)] italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          <span className="font-semibold text-[var(--color-text)]">{author}</span>
          {" — "}
          {location}
        </p>
      </motion.div>
    </div>
  );
}
