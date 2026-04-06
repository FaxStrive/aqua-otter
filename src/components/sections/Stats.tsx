"use client";

import { motion } from "framer-motion";
import { MapPin, ThumbsUp, Clock, Star } from "lucide-react";
import Section from "@/components/ui/Section";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  {
    icon: MapPin,
    end: 6,
    suffix: "",
    label: "States Served",
  },
  {
    icon: ThumbsUp,
    end: 100,
    suffix: "%",
    label: "Satisfaction",
  },
  {
    icon: Clock,
    end: 2.5,
    suffix: " hr",
    label: "Avg Install",
  },
  {
    icon: Star,
    end: 5,
    suffix: "",
    label: "Star Rating",
  },
];

export default function Stats() {
  return (
    <Section background="dark" id="stats" padding="tight">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <Icon className="w-6 h-6 text-accent mx-auto mb-3" />
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-1">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <p className="text-sm text-white/50 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
