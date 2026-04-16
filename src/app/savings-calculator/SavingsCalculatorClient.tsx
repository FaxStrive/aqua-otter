"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  Phone,
  ChevronDown,
  DollarSign,
  Leaf,
  Droplets,
  Trash2,
  Minus,
  Plus,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const SYSTEM_COST = 2000;
const LBS_PER_BOTTLE = 0.025;

export default function SavingsCalculatorClient() {
  const [household, setHousehold] = useState(3);
  const [bottlesPerWeek, setBottlesPerWeek] = useState(20);
  const [costPerBottle, setCostPerBottle] = useState(1.5);

  const annualCost = Math.round(bottlesPerWeek * costPerBottle * 52);
  const fiveYearCost = annualCost * 5;
  const fiveYearSavings = fiveYearCost - SYSTEM_COST;
  const annualBottles = bottlesPerWeek * 52;
  const annualPlasticLbs = Math.round(annualBottles * LBS_PER_BOTTLE * 10) / 10;

  return (
    <>
      {/* Hero */}
      <Section background="dark" padding="default">
        <div className="text-center py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
          >
            <Calculator className="w-4 h-4 text-primary-300" />
            <span className="text-sm text-white/80">Savings Calculator</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6"
          >
            Stop Buying <span className="gradient-text">Bottled Water</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            See exactly how much your bottled water habit costs you every year — and
            how much you'd save with a home filtration system.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8"
          >
            <ChevronDown className="w-6 h-6 text-white/40 mx-auto bounce-arrow" />
          </motion.div>
        </div>
      </Section>

      {/* Calculator */}
      <Section background="white" gradient="radial-center">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-dark mb-6">
                Your Bottled Water Usage
              </h2>

              {/* Household Size */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-dark mb-3">
                  Household Size
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => setHousehold(n)}
                      className={`w-12 h-12 rounded-xl font-bold text-sm transition-all ${
                        household === n
                          ? "bg-primary text-white shadow-lg scale-105"
                          : "bg-gray-100 text-dark hover:bg-gray-200"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1.5">
                  {household} {household === 1 ? "person" : "people"} in your home
                </p>
              </div>

              {/* Bottles Per Week */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-dark mb-3">
                  Bottles Per Week: <span className="text-primary">{bottlesPerWeek}</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBottlesPerWeek(Math.max(1, bottlesPerWeek - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4 text-dark" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min={1}
                      max={60}
                      value={bottlesPerWeek}
                      onChange={(e) => setBottlesPerWeek(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <button
                    onClick={() => setBottlesPerWeek(Math.min(60, bottlesPerWeek + 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4 text-dark" />
                  </button>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>60</span>
                </div>
              </div>

              {/* Cost Per Bottle */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-dark mb-3">
                  Cost Per Bottle:{" "}
                  <span className="text-primary">${costPerBottle.toFixed(2)}</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCostPerBottle(Math.max(0.5, Math.round((costPerBottle - 0.25) * 100) / 100))
                    }
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4 text-dark" />
                  </button>
                  <div className="flex-1">
                    <input
                      type="range"
                      min={50}
                      max={300}
                      step={25}
                      value={costPerBottle * 100}
                      onChange={(e) => setCostPerBottle(Number(e.target.value) / 100)}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <button
                    onClick={() =>
                      setCostPerBottle(Math.min(3, Math.round((costPerBottle + 0.25) * 100) / 100))
                    }
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4 text-dark" />
                  </button>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0.50</span>
                  <span>$3.00</span>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-dark mb-6">
                Your Results
              </h2>
              <div className="bg-gradient-to-br from-primary-800 via-primary to-primary-600 rounded-2xl p-6 text-white">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <DollarSign className="w-5 h-5 text-primary-200 mx-auto mb-1" />
                    <p className="text-xs text-white/60 mb-1">Annual Cost</p>
                    <p className="text-2xl md:text-3xl font-heading font-bold">
                      <AnimatedCounter end={annualCost} prefix="$" className="text-white" />
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <TrendingDown className="w-5 h-5 text-green-300 mx-auto mb-1" />
                    <p className="text-xs text-white/60 mb-1">5-Year Savings</p>
                    <p className="text-2xl md:text-3xl font-heading font-bold">
                      {fiveYearSavings > 0 ? (
                        <AnimatedCounter
                          end={fiveYearSavings}
                          prefix="$"
                          className="text-green-300"
                        />
                      ) : (
                        <span className="text-white/60">—</span>
                      )}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Trash2 className="w-5 h-5 text-amber-300 mx-auto mb-1" />
                    <p className="text-xs text-white/60 mb-1">Bottles / Year</p>
                    <p className="text-2xl md:text-3xl font-heading font-bold">
                      <AnimatedCounter end={annualBottles} className="text-white" />
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Leaf className="w-5 h-5 text-green-300 mx-auto mb-1" />
                    <p className="text-xs text-white/60 mb-1">Plastic Saved</p>
                    <p className="text-2xl md:text-3xl font-heading font-bold">
                      <AnimatedCounter end={annualPlasticLbs} suffix=" lbs" className="text-white" />
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/80 leading-relaxed">
                    At your current rate, you spend{" "}
                    <strong className="text-white">${annualCost.toLocaleString()}/year</strong> on
                    bottled water. A whole house system at ~$2,000 pays for itself in{" "}
                    <strong className="text-white">
                      {annualCost > 0
                        ? `${Math.ceil(SYSTEM_COST / annualCost)} ${
                            Math.ceil(SYSTEM_COST / annualCost) === 1 ? "year" : "years"
                          }`
                        : "—"}
                    </strong>{" "}
                    and saves you{" "}
                    <strong className="text-green-300">
                      ${fiveYearSavings > 0 ? fiveYearSavings.toLocaleString() : 0}
                    </strong>{" "}
                    over 5 years.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="mt-4 w-full btn-shimmer-gold text-dark font-bold px-6 py-3.5 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <InlineCTA
        variant="text"
        text="Want an exact quote for your home? Get a free consultation"
        href="/contact"
      />

      {/* Environmental Impact */}
      <Section background="surface">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            Environmental Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            It's Not Just About Money
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every bottle you don't buy is one less in a landfill. Here's the
            environmental impact of your household's bottled water habit.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 text-center border border-gray-100"
          >
            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <p className="text-3xl font-heading font-bold text-dark mb-1">
              {annualBottles.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">bottles eliminated per year</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 text-center border border-gray-100"
          >
            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-7 h-7 text-green-500" />
            </div>
            <p className="text-3xl font-heading font-bold text-dark mb-1">
              {annualPlasticLbs} lbs
            </p>
            <p className="text-sm text-gray-600">of plastic kept out of landfills</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 text-center border border-gray-100"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
              <Droplets className="w-7 h-7 text-blue-500" />
            </div>
            <p className="text-3xl font-heading font-bold text-dark mb-1">
              {(annualBottles * 3).toLocaleString()}x
            </p>
            <p className="text-sm text-gray-600">more water used to make the bottles</p>
          </motion.div>
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Better Water. Zero Plastic."
        message="A home filtration system gives you unlimited clean water for a fraction of the cost of bottled — and zero waste."
        href="/contact"
      />

      {/* The Better Alternative */}
      <Section background="white" gradient="radial-left">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              The Better Alternative
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
              Whole House Filtration
            </h2>
            <p className="text-gray-600 mb-4">
              Instead of buying water in single-use plastic, get unlimited clean water from
              every tap in your home. A whole house filtration system treats your water at the
              point of entry — so every faucet, shower, and appliance gets filtered water.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Unlimited clean water from every faucet",
                "One-time investment, years of savings",
                "Better for your health, skin, and hair",
                "Zero plastic waste — better for the planet",
                "Professional installation in just a few hours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 btn-shimmer-gold text-dark font-bold px-6 py-3.5 rounded-xl text-sm hover:scale-105 transition-all"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50/30 rounded-2xl p-8 w-full max-w-sm text-center">
              <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-5xl font-heading font-bold text-dark mb-2">
                ${fiveYearSavings > 0 ? fiveYearSavings.toLocaleString() : "0"}
              </p>
              <p className="text-gray-600 font-medium">saved over 5 years</p>
              <p className="text-xs text-gray-400 mt-2">
                vs. ${fiveYearCost.toLocaleString()} on bottled water
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="dark" padding="default">
        <div className="text-center py-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
          >
            Ready to <span className="gradient-text">Stop Wasting Money</span>?
          </motion.h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Schedule a free water test and get a personalized quote for a whole
            house filtration system that pays for itself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Get My Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:3179616925"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              (317) 961-6925
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
