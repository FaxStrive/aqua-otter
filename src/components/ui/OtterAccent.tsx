"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const otters = {
  // Original set
  testing: "/client/Testing_Otter-removebg-preview.png",
  serious: "/client/Serious_Otter-removebg-preview.png",
  result: "/client/Result_Otter-removebg-preview.png",
  // New Gemini set (transparent bg)
  armsCrossed: "/client/otter-arms-crossed.png",
  closeup: "/client/otter-closeup.png",
  thumbsup: "/client/otter-thumbsup.png",
  wrench: "/client/otter-wrench.png",
  clipboard: "/client/otter-clipboard.png",
  thinking: "/client/otter-thinking.png",
  pointing: "/client/otter-pointing.png",
  waving: "/client/otter-waving.png",
  piggybank: "/client/otter-piggybank.png",
  globe: "/client/otter-globe-1.png",
};

export type OtterName = keyof typeof otters;

interface OtterAccentProps {
  otter?: OtterName;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  float?: boolean;
}

const sizeMap = {
  sm: { w: 64, h: 64, cls: "w-16 h-16" },
  md: { w: 96, h: 96, cls: "w-24 h-24" },
  lg: { w: 160, h: 160, cls: "w-40 h-40" },
  xl: { w: 220, h: 220, cls: "w-56 h-56" },
};

export default function OtterAccent({
  otter = "testing",
  size = "md",
  className = "",
  float = true,
}: OtterAccentProps) {
  const s = sizeMap[size];

  const content = (
    <Image
      src={otters[otter]}
      alt="Aqua Otter mascot"
      width={s.w}
      height={s.h}
      className={`${s.cls} object-contain drop-shadow-lg`}
    />
  );

  if (float) {
    return (
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className={className}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={className}>{content}</div>;
}
