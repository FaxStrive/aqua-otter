"use client";

import { motion } from "framer-motion";
import {
  Shield,
  MapPin,
  Star,
  Award,
  FlaskConical,
  Droplets,
  Wrench,
  Home,
  Settings,
  ThumbsUp,
} from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Family-Owned & Operated" },
  { icon: MapPin, label: "Serving 6 States" },
  { icon: Star, label: "5-Star Google Rating" },
  { icon: Award, label: "BBB A+ Accredited" },
  { icon: FlaskConical, label: "Free In-Home Water Testing" },
  { icon: Droplets, label: "No-Salt Solutions Available" },
  { icon: Wrench, label: "Free Installation" },
  { icon: Home, label: "Well Water Specialists" },
  { icon: Settings, label: "Customized Systems" },
  { icon: ThumbsUp, label: "Lifetime Warranty" },
];

const doubled = [...trustItems, ...trustItems];

export default function TrustBar() {
  return (
    <div className="bg-[var(--color-primary-dark)] py-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(8,145,178,0.12),transparent_70%)]" />
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap relative z-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" },
        }}
      >
        {doubled.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 flex-shrink-0 px-2">
            <item.icon className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
            <span className="text-sm font-medium text-white/80">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
