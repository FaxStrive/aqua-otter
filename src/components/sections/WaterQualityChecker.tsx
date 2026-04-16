"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  AlertTriangle,
  ShieldAlert,
  Droplets,
  FlaskConical,
  Beaker,
  Lock,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";

const PHONE = "(317) 961-6925";
const PHONE_TEL = "tel:3179616925";

interface Contaminant {
  name: string;
  severity: "high" | "medium" | "low";
  icon: typeof AlertTriangle;
  description: string;
}

const contaminants: Contaminant[] = [
  {
    name: "Hard Water Minerals",
    severity: "high",
    icon: Droplets,
    description:
      "Calcium and magnesium buildup damages appliances, leaves scale on fixtures, and dries out skin and hair.",
  },
  {
    name: "Iron & Manganese",
    severity: "high",
    icon: ShieldAlert,
    description:
      "Causes orange/brown staining on sinks, toilets, and laundry. Gives water a metallic taste.",
  },
  {
    name: "Hydrogen Sulfide",
    severity: "medium",
    icon: FlaskConical,
    description:
      'Produces a strong "rotten egg" smell. Common in well water and can corrode plumbing over time.',
  },
  {
    name: "Chlorine / Chloramine",
    severity: "medium",
    icon: Beaker,
    description:
      "City water disinfectants that dry out skin, fade laundry, and leave an unpleasant taste and odor.",
  },
  {
    name: "Nitrates",
    severity: "low",
    icon: AlertTriangle,
    description:
      "Agricultural runoff contaminant. Particularly dangerous for infants and pregnant women at elevated levels.",
  },
];

const severityConfig = {
  high: { color: "bg-red-500", label: "High", barWidth: "w-[90%]", text: "text-red-600" },
  medium: { color: "bg-amber-500", label: "Moderate", barWidth: "w-[60%]", text: "text-amber-600" },
  low: { color: "bg-blue-500", label: "Low", barWidth: "w-[35%]", text: "text-blue-600" },
};

export default function WaterQualityChecker() {
  const [zip, setZip] = useState("");
  const [stage, setStage] = useState<"input" | "loading" | "results" | "unlocked">("input");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSearch = () => {
    if (zip.length < 5) return;
    setStage("loading");
    setTimeout(() => setStage("results"), 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setStage("unlocked");
  };

  return (
    <Section background="surface" gradient="radial-center" id="water-checker">
      <div className="flex flex-col items-center text-center gap-4 mb-8">
        {/* Thinking otter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/client/otter-thinking.png" alt="Aqua Otter wondering about your water" width={160} height={160} className="w-24 h-24 object-contain drop-shadow-lg" />
          </motion.div>
        </motion.div>
        <div>
          <span className="inline-block text-sm font-medium text-[var(--color-primary)] uppercase tracking-wide mb-2">
            Free Instant Check
          </span>
          <h2 className="font-heading font-semibold text-[var(--color-text)] mb-2" style={{ fontSize: "var(--text-h2)" }}>
            What's In <span className="text-[var(--color-primary)]">Your</span> Water?
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto" style={{ fontSize: "var(--text-body)" }}>
            Enter your zip code to see common water quality issues reported in your area.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Zip code input */}
        <div className="flex items-center gap-3 mb-8 max-w-md mx-auto">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={zip}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                setZip(val);
              }}
              placeholder="Enter your zip code"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-dark font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              disabled={stage !== "input"}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={zip.length < 5 || stage !== "input"}
            className="inline-flex items-center gap-2 btn-shimmer-gold text-dark font-bold px-6 py-4 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-md"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Check</span>
          </button>
        </div>

        {/* Loading state */}
        <AnimatePresence>
          {stage === "loading" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Loader2 className="w-10 h-10 text-primary mx-auto animate-spin mb-4" />
              <p className="text-gray-600 font-medium">
                Analyzing water quality data for {zip}...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {(stage === "results" || stage === "unlocked") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-primary-50 to-primary-100/50 border-b border-gray-100">
                  <p className="text-sm font-semibold text-primary-800">
                    Water Quality Report for ZIP: {zip}
                  </p>
                  <p className="text-xs text-primary-600/70 mt-0.5">
                    {contaminants.length} potential contaminants identified
                  </p>
                </div>

                <div className="divide-y divide-gray-100">
                  {contaminants.map((c, idx) => {
                    const config = severityConfig[c.severity];
                    const isLocked = stage === "results" && idx >= 2;
                    const Icon = c.icon;

                    return (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        className={`px-6 py-5 relative ${isLocked ? "select-none" : ""}`}
                      >
                        {isLocked && (
                          <div className="absolute inset-0 backdrop-blur-[6px] bg-white/60 z-10 flex items-center justify-center">
                            {idx === 2 && (
                              <div className="flex items-center gap-2 text-gray-500">
                                <Lock className="w-5 h-5" />
                                <span className="font-medium text-sm">
                                  Unlock full report below
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                            <Icon className={`w-5 h-5 ${config.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-heading font-semibold text-dark">
                                {c.name}
                              </h4>
                              <span
                                className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.color} text-white`}
                              >
                                {config.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                              {c.description}
                            </p>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${config.color} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: isLocked ? "0%" : "100%" }}
                                transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                                style={{ maxWidth: config.barWidth === "w-[90%]" ? "90%" : config.barWidth === "w-[60%]" ? "60%" : "35%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Lead capture form */}
              {stage === "results" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 bg-gradient-to-br from-dark via-primary-950 to-primary-900 rounded-2xl p-6 sm:p-8"
                >
                  <div className="text-center mb-6">
                    <Lock className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h3 className="font-heading font-bold text-xl text-white mb-2">
                      Unlock Your Full Water Report
                    </h3>
                    <p className="text-sm text-white/60">
                      See all {contaminants.length} contaminants and get a personalized
                      recommendation. 100% free, no obligation.
                    </p>
                  </div>
                  <form
                    ref={formRef}
                    onSubmit={handleFormSubmit}
                    className="grid sm:grid-cols-3 gap-3 mb-4"
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <div className="sm:col-span-3">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl hover:scale-[1.02] transition-all shadow-lg"
                      >
                        Unlock Full Report
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                  <p className="text-xs text-white/40 text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </motion.div>
              )}

              {/* Unlocked state */}
              {stage === "unlocked" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-5 py-2.5 mb-5">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold text-sm">
                      Full report unlocked!
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                    Your area shows {contaminants.filter((c) => c.severity === "high").length} high-severity
                    contaminants. A free in-home water test will reveal exactly what's in
                    your water.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg cta-pulse-gold"
                    >
                      Schedule My FREE Water Test
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <a
                      href={PHONE_TEL}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-700 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Or Call {PHONE}
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
