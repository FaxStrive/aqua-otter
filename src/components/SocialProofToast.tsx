"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

const FIRST_NAMES = [
  "James", "Maria", "David", "Jessica", "Robert", "Ashley",
  "Michael", "Sarah", "Carlos", "Emily", "Daniel", "Laura",
  "Anthony", "Nicole", "Brian", "Angela", "Kevin", "Stephanie",
  "Richard", "Michelle",
];

const CITIES = [
  "Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Bloomington",
  "Lafayette", "Muncie", "Terre Haute", "Columbus", "Cincinnati",
  "Louisville", "Lexington", "Nashville", "Detroit", "Grand Rapids",
  "Lansing", "Carmel", "Fishers", "Noblesville", "Greenwood",
];

const SERVICES = [
  "free water test",
  "well water treatment system",
  "no-salt hard water solution",
  "whole house water filtration",
  "water softener installation",
  "iron removal system",
  "water quality consultation",
  "AiO filtration system",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNotification() {
  return {
    name: randomItem(FIRST_NAMES),
    city: randomItem(CITIES),
    service: randomItem(SERVICES),
    id: Date.now(),
  };
}

export default function SocialProofToast() {
  const [toast, setToast] = useState<ReturnType<typeof generateNotification> | null>(null);
  const [visible, setVisible] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(() => {
    const notification = generateNotification();
    setToast(notification);
    setVisible(true);
    dismissTimer.current = setTimeout(() => setVisible(false), 5000);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      showToast();
      const interval = setInterval(showToast, 25000);
      return () => clearInterval(interval);
    }, 15000);
    return () => {
      clearTimeout(initialTimer);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [showToast]);

  return (
    <AnimatePresence>
      {visible && toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, x: -80, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed left-4 right-4 sm:right-auto z-40 bottom-20 lg:bottom-6"
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 flex items-start gap-3 w-full sm:w-auto sm:max-w-xs">
            <div className="flex-shrink-0 w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 leading-snug">
                <span className="font-semibold">{toast.name}</span> in{" "}
                <span className="font-semibold">{toast.city}</span> just booked a{" "}
                <span className="text-primary font-semibold">{toast.service}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Just now</p>
            </div>
            <button
              onClick={dismiss}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
