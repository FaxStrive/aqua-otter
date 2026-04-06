"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DollarSign, Minus, Plus, ArrowRight, Phone, Trash2, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const PHONE = "(812) 499-6807";
const PHONE_TEL = "tel:8124996807";

export default function SavingsCalculator() {
  const [household, setHousehold] = useState(3);
  const [bottles, setBottles] = useState(20);
  const [costPerBottle, setCostPerBottle] = useState(1.5);

  const results = useMemo(() => {
    const weeklySpend = bottles * costPerBottle;
    const annualCost = Math.round(weeklySpend * 52);
    const systemCost = 2000;
    const fiveYearBottled = annualCost * 5;
    const fiveYearSavings = fiveYearBottled - systemCost;
    const annualBottles = bottles * 52;
    return { annualCost, fiveYearSavings, annualBottles };
  }, [bottles, costPerBottle]);

  return (
    <Section background="white" gradient="radial-right" id="savings">
      <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
        {/* Piggybank otter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/client/otter-piggybank.png" alt="Aqua Otter with piggy bank — save money on water" width={160} height={160} className="w-28 h-28 lg:w-36 lg:h-36 object-contain drop-shadow-lg" />
          </motion.div>
        </motion.div>
        <div className="text-center lg:text-left">
          <span className="inline-block text-sm font-medium text-[var(--color-primary)] uppercase tracking-wide mb-2">
            Savings Calculator
          </span>
          <h2 className="font-heading font-semibold text-[var(--color-text)] mb-2" style={{ fontSize: "var(--text-h2)" }}>
            See How Much You Could <span className="text-[var(--color-primary)]">Save</span>
          </h2>
          <p className="text-[var(--color-text-muted)]" style={{ fontSize: "var(--text-body)" }}>
            Stop spending on bottled water. A whole-home system pays for itself.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Inputs */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Household size */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-3">
              Household Size
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => setHousehold(n)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                    household === n
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Bottles per week */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-3">
              Bottles Per Week:{" "}
              <span className="text-primary">{bottles}</span>
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setBottles(Math.max(5, bottles - 5))}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-primary/30 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="range"
                min={5}
                max={50}
                step={1}
                value={bottles}
                onChange={(e) => setBottles(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-full accent-primary cursor-pointer"
              />
              <button
                onClick={() => setBottles(Math.min(50, bottles + 5))}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-primary/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cost per bottle */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-3">
              Cost Per Bottle:{" "}
              <span className="text-primary">${costPerBottle.toFixed(2)}</span>
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setCostPerBottle(Math.max(0.5, +(costPerBottle - 0.25).toFixed(2)))
                }
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-primary/30 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.25}
                value={costPerBottle}
                onChange={(e) => setCostPerBottle(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-full accent-primary cursor-pointer"
              />
              <button
                onClick={() =>
                  setCostPerBottle(Math.min(3, +(costPerBottle + 0.25).toFixed(2)))
                }
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-primary/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          <motion.div
            className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-6 border border-red-100"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-red-700">
                Annual Bottled Water Cost
              </span>
            </div>
            <div className="text-4xl font-heading font-extrabold text-red-600">
              <AnimatedCounter end={results.annualCost} prefix="$" suffix="/yr" duration={1} />
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-100"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                5-Year Savings vs. $2,000 System
              </span>
            </div>
            <div className="text-4xl font-heading font-extrabold text-green-600">
              <AnimatedCounter
                end={Math.max(0, results.fiveYearSavings)}
                prefix="$"
                duration={1.5}
              />
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-100"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trash2 className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">
                Plastic Bottles Eliminated Annually
              </span>
            </div>
            <div className="text-4xl font-heading font-extrabold text-blue-600">
              <AnimatedCounter
                end={results.annualBottles}
                suffix=" bottles"
                duration={1.5}
              />
            </div>
          </motion.div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg mt-2"
          >
            Get My FREE Water Test
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="text-center">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
