"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const dropX = useTransform(scrollYProgress, [0, 1], ["0vw", "100vw"]);
  const dropOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <>
      {/* Fill bar */}
      <motion.div
        aria-hidden
        style={{
          scaleX,
          transformOrigin: "0% 50%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, rgba(18,189,251,0.6) 0%, #12BDFB 40%, #7ed7ff 100%)",
          zIndex: 60,
          pointerEvents: "none",
          boxShadow: "0 0 8px rgba(18,189,251,0.6)",
        }}
      />
      {/* Droplet leading edge */}
      <motion.div
        aria-hidden
        style={{
          x: dropX,
          opacity: dropOpacity,
          position: "fixed",
          top: -4,
          left: 0,
          width: 14,
          height: 14,
          marginLeft: -7,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #7ed7ff 35%, #12BDFB 70%, #0a9ed9 100%)",
          boxShadow: "0 0 10px rgba(18,189,251,0.8), inset -1px -2px 3px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.6)",
          transform: "rotate(180deg)",
          zIndex: 61,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
