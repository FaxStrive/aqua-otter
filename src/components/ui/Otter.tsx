"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

type Pose =
  | "waving"
  | "thumbsup"
  | "pointing"
  | "clipboard"
  | "thinking"
  | "wrench"
  | "piggybank"
  | "globe-1"
  | "globe-2"
  | "arms-crossed";

type Props = {
  pose: Pose;
  width?: number;
  className?: string;
  style?: CSSProperties;
  float?: boolean;
  flip?: boolean;
  priority?: boolean;
  alt?: string;
  shadow?: "none" | "soft" | "strong";
  rotate?: number;
};

const SRC: Record<Pose, string> = {
  waving: "/client/otter-waving.png",
  thumbsup: "/client/otter-thumbsup.png",
  pointing: "/client/otter-pointing.png",
  clipboard: "/client/otter-clipboard.png",
  thinking: "/client/otter-thinking.png",
  wrench: "/client/otter-wrench.png",
  piggybank: "/client/otter-piggybank.png",
  "globe-1": "/client/otter-globe-1.png",
  "globe-2": "/client/otter-globe-2.png",
  "arms-crossed": "/client/otter-arms-crossed.png",
};

const SHADOW: Record<NonNullable<Props["shadow"]>, string> = {
  none: "none",
  soft: "drop-shadow(0 6px 18px rgba(0,0,0,0.18))",
  strong: "drop-shadow(0 12px 34px rgba(0,0,0,0.35))",
};

export default function Otter({
  pose,
  width = 140,
  className = "",
  style,
  float = true,
  flip = false,
  priority = false,
  alt,
  shadow = "soft",
  rotate = 0,
}: Props) {
  const reduce = useReducedMotion();
  const height = Math.round(width * 1.28);
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ width, height, ...style }}
      animate={float && !reduce ? { y: [0, -4, 0] } : undefined}
      transition={float && !reduce ? { duration: 4.8, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      <Image
        src={SRC[pose]}
        alt={alt || `Otter ${pose}`}
        width={width}
        height={height}
        priority={priority}
        style={{
          width: "100%",
          height: "auto",
          transform: `${flip ? "scaleX(-1) " : ""}${rotate ? `rotate(${rotate}deg)` : ""}`.trim() || undefined,
          filter: SHADOW[shadow],
        }}
      />
    </motion.div>
  );
}
