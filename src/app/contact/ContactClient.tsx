"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
  Shield,
  Award,
  MessageCircle,
  Send,
  Droplets,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const PHONE = "(616) 612-1660";
const PHONE_TEL = "tel:6166121660";
const SMS_TEL = "sms:6166121660";
const EMAIL = "info@myaquaotter.com";

const WATER_SOURCES = ["City Water", "Well Water", "Not Sure"];
const ISSUES = [
  "Hard Water / Scale Buildup",
  "Iron Stains / Rust",
  "Sulfur / Rotten Egg Smell",
  "Chlorine Taste / Smell",
  "Sediment / Cloudy Water",
  "Bad Taste or Odor",
  "Bacteria / Safety Concerns",
  "Just Want a Test / Peace of Mind",
  "Other",
];

const faqs = [
  {
    q: "What happens during a free water test?",
    a: "We come to your home, test your water right on the spot for hardness, iron, pH, TDS, and more. You&apos;ll see the results in real-time, and we&apos;ll explain exactly what they mean - no charge, no obligation.",
  },
  {
    q: "How long does the water test take?",
    a: "Most tests take about 20-30 minutes. We test multiple parameters and walk you through every result so you understand your water quality completely.",
  },
  {
    q: "Is there really no cost or obligation?",
    a: "Absolutely none. The water test is 100% free, and there&apos;s zero pressure to buy anything. We believe once you see what&apos;s in your water, you&apos;ll want to fix it - but that&apos;s always your choice.",
  },
];

const trustSignals = [
  { icon: Star, label: "5-Star Rated" },
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "A+ BBB" },
  { icon: CheckCircle, label: "Free Installation" },
];

export default function ContactClient() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [waterSource, setWaterSource] = useState("");
  const [issues, setIssues] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleIssue = (issue: string) => {
    setIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
  };

  const canAdvance =
    step === 0
      ? waterSource !== ""
      : step === 1
        ? issues.length > 0
        : name && phone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero */}
      <Section background="dark" padding="none">
        <div className="min-h-[35vh] flex flex-col items-center justify-center text-center py-16 sm:py-24">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block bg-accent/20 text-accent-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
          >
            Free Water Testing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-black leading-tight mb-4"
          >
            Let&apos;s Get Your Water{" "}
            <span className="gradient-text">Tested</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white/70 max-w-xl text-base sm:text-lg"
          >
            Fill out the form below, give us a call, or shoot us a text.
            We&apos;ll get your free water test scheduled fast.
          </motion.p>
        </div>
      </Section>

      {/* Form + Contact Info */}
      <Section background="surface" gradient="radial-left">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-heading font-black text-dark mb-2">
                    Request Received!
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Thanks, {name}! We&apos;ll be in touch shortly to schedule
                    your free water test. Expect a call or text from us within
                    24 hours.
                  </p>
                  <a
                    href={PHONE_TEL}
                    className="inline-flex items-center gap-2 btn-shimmer-gold text-dark font-bold px-6 py-3 rounded-xl text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us Now: {PHONE}
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 mb-6">
                    {[0, 1, 2].map((s) => (
                      <div key={s} className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: step >= s ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider font-bold">
                    Step {step + 1} of 3
                  </p>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute opacity-0 pointer-events-none h-0 w-0"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h3 className="text-xl font-heading font-bold text-dark mb-1">
                          What&apos;s your water source?
                        </h3>
                        <p className="text-gray-400 text-sm mb-5">
                          This helps us prepare the right testing equipment.
                        </p>
                        <div className="grid gap-3">
                          {WATER_SOURCES.map((src) => (
                            <button
                              key={src}
                              type="button"
                              onClick={() => setWaterSource(src)}
                              className={`w-full text-left px-5 py-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                                waterSource === src
                                  ? "border-primary bg-primary-50 text-primary-700"
                                  : "border-gray-100 text-gray-600 hover:border-gray-200"
                              }`}
                            >
                              <Droplets
                                className={`w-4 h-4 inline mr-2 ${
                                  waterSource === src
                                    ? "text-primary"
                                    : "text-gray-300"
                                }`}
                              />
                              {src}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h3 className="text-xl font-heading font-bold text-dark mb-1">
                          What issues are you experiencing?
                        </h3>
                        <p className="text-gray-400 text-sm mb-5">
                          Select all that apply.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {ISSUES.map((issue) => (
                            <button
                              key={issue}
                              type="button"
                              onClick={() => toggleIssue(issue)}
                              className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                issues.includes(issue)
                                  ? "border-primary bg-primary-50 text-primary-700"
                                  : "border-gray-100 text-gray-600 hover:border-gray-200"
                              }`}
                            >
                              {issues.includes(issue) ? (
                                <CheckCircle className="w-3.5 h-3.5 inline mr-1.5 text-primary" />
                              ) : (
                                <span className="inline-block w-3.5 h-3.5 mr-1.5 border-2 border-gray-200 rounded-full align-middle" />
                              )}
                              {issue}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h3 className="text-xl font-heading font-bold text-dark mb-1">
                          Your contact info
                        </h3>
                        <p className="text-gray-400 text-sm mb-5">
                          We&apos;ll reach out to schedule your free test.
                        </p>
                        <div className="grid gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-0 outline-none transition-colors"
                              placeholder="John Smith"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-0 outline-none transition-colors"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-0 outline-none transition-colors"
                              placeholder="john@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Address / City
                            </label>
                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-0 outline-none transition-colors"
                              placeholder="123 Main St, Indianapolis, IN"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Anything else?
                            </label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={3}
                              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-0 outline-none transition-colors resize-none"
                              placeholder="Tell us more about your water situation..."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* SMS Consent (visible on final step) */}
                  {step === 2 && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-[10px] leading-relaxed text-gray-400">
                        By submitting this form, you agree to receive text
                        messages from Aqua Otter Water Systems LLC at the phone
                        number provided. Message frequency varies. Message and
                        data rates may apply. Reply STOP to opt out at any time.
                        Reply HELP for assistance. View our{" "}
                        <a href="/privacy" className="text-primary underline">
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="/terms" className="text-primary underline">
                          Terms of Service
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  {/* Nav Buttons */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 font-medium hover:text-gray-700 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}
                    {step < 2 ? (
                      <button
                        type="button"
                        disabled={!canAdvance}
                        onClick={() => setStep(step + 1)}
                        className="inline-flex items-center gap-1.5 btn-shimmer-gold text-dark font-bold px-6 py-3 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-all"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!canAdvance}
                        className="inline-flex items-center gap-1.5 btn-shimmer-gold text-dark font-bold px-6 py-3 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-all"
                      >
                        <Send className="w-4 h-4" />
                        Submit Request
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary phone-ring" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Call or Text
                  </p>
                  <a
                    href={PHONE_TEL}
                    className="text-lg font-heading font-bold text-dark hover:text-primary transition-colors"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={PHONE_TEL}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-white font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>
                <a
                  href={SMS_TEL}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 border-2 border-primary text-primary font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Text Us
                </a>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-heading font-bold text-dark hover:text-primary transition-colors text-sm"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Service Area Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Service Area
                  </p>
                  <p className="font-heading font-bold text-dark text-sm">
                    5 States Covered
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Indiana", "Michigan", "Ohio", "Kentucky", "Tennessee"].map(
                  (s) => (
                    <span
                      key={s}
                      className="bg-gray-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Hours
                  </p>
                  <p className="font-heading font-bold text-dark text-sm">
                    Call or text anytime
                  </p>
                  <p className="text-xs text-gray-400">
                    Evenings preferred
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-2.5"
            >
              {trustSignals.map((t) => (
                <div
                  key={t.label}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center"
                >
                  <t.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs font-bold text-dark">{t.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <p className="text-xs text-gray-400 font-bold uppercase mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors text-sm font-bold"
                >
                  f
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors text-sm font-bold"
                >
                  IG
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 hover:bg-red-100 transition-colors text-sm font-bold"
                >
                  YT
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Prefer to Just Call?"
        message="Give us a ring or shoot us a text anytime. Evenings work great for us!"
        href="/contact"
      />

      {/* FAQ Mini */}
      <Section background="white" gradient="radial-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-dark">
              Quick <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between"
                >
                  <span className="font-heading font-bold text-dark text-sm pr-4">
                    {faq.q}
                  </span>
                  {faqOpen === i ? (
                    <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="dark">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-black mb-4">
              Don&apos;t Wait -{" "}
              <span className="gradient-text">Your Water Won&apos;t Fix Itself</span>
            </h2>
            <p className="text-white/70 mb-6">
              Every day with bad water is a day your family deserves better.
              Reach out now - the test is free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_TEL}
                className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2 justify-center"
              >
                <Phone className="w-4 h-4" />
                Call {PHONE}
              </a>
              <a
                href={SMS_TEL}
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                Text Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
