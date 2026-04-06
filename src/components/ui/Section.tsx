"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "surface" | "primary-light" | "dark" | "accent-light";
  id?: string;
  gradient?: "radial-left" | "radial-right" | "radial-center" | "none";
  padding?: "default" | "lg" | "tight" | "none";
}

const bgMap = {
  white: "bg-white",
  surface: "bg-[var(--color-surface)]",
  "primary-light": "bg-[var(--color-primary-light)]",
  "accent-light": "bg-[var(--color-accent-light)]",
  dark: "bg-[var(--color-primary-dark)] text-white",
};

const paddingMap = {
  default: "section-padding",
  lg: "section-padding-lg",
  tight: "py-6 lg:py-8",
  none: "",
};

export default function Section({
  children,
  className,
  background = "white",
  id,
  gradient = "none",
  padding = "default",
}: SectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id={id}
      className={cn(paddingMap[padding], "relative overflow-hidden", bgMap[background], className)}
    >
      {gradient !== "none" && background !== "dark" && (
        <div
          className={cn("absolute inset-0 pointer-events-none", {
            "bg-[radial-gradient(ellipse_at_30%_50%,rgba(18,189,251,0.04),transparent_70%)]":
              gradient === "radial-left",
            "bg-[radial-gradient(ellipse_at_70%_50%,rgba(18,189,251,0.04),transparent_70%)]":
              gradient === "radial-right",
            "bg-[radial-gradient(ellipse_at_50%_50%,rgba(18,189,251,0.04),transparent_70%)]":
              gradient === "radial-center",
          })}
        />
      )}
      {background === "dark" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(18,189,251,0.15),transparent_60%)] pointer-events-none" />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-content mx-auto px-6 relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
