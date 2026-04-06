"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CheckCircle2, Calendar, Wrench } from "lucide-react";

const activities = [
  {
    icon: Calendar,
    text: "A family in Carmel, IN just booked a free water test",
    time: "2 min ago",
  },
  {
    icon: Wrench,
    text: "System installed for the Martinez family in Fishers",
    time: "18 min ago",
  },
  {
    icon: CheckCircle2,
    text: "Water quality improved 94% for a home in Westfield",
    time: "35 min ago",
  },
  {
    icon: Calendar,
    text: "New well water consultation booked in Noblesville",
    time: "1 hr ago",
  },
  {
    icon: Wrench,
    text: "No-salt softener installed in Zionsville",
    time: "2 hr ago",
  },
  {
    icon: CheckCircle2,
    text: "The Thompson family in Greenwood is now contaminant-free",
    time: "3 hr ago",
  },
];

export function ActivityFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  const activity = activities[current];
  const Icon = activity.icon;

  return (
    <div ref={ref} className="py-6 px-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm px-5 py-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Live Activity
          </span>
        </div>
        <div className="h-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center gap-3"
            >
              <Icon className="w-4.5 h-4.5 text-[var(--color-primary)] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text)] truncate">
                  {activity.text}
                </p>
                <p className="text-[10px] text-[var(--color-text-muted)]">
                  {activity.time}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {activities.map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                i === current ? "bg-[var(--color-primary)]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
