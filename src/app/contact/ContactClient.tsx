"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const PHONE = "(616) 612-1660";
const PHONE_TEL = "tel:6166121660";
const SMS_TEL = "sms:6166121660";
const EMAIL = "info@myaquaotter.com";

const faqs = [
  {
    q: "What happens during a free water test?",
    a: "We come to your home, test your water right on the spot for hardness, iron, pH, TDS, and more. You'll see the results in real-time, and we'll explain exactly what they mean - no charge, no obligation.",
  },
  {
    q: "How long does the water test take?",
    a: "Most tests take about 20-30 minutes. We test multiple parameters and walk you through every result so you understand your water quality completely.",
  },
  {
    q: "Is there really no cost or obligation?",
    a: "Absolutely none. The water test is 100% free, and there's zero pressure to buy anything. We believe once you see what's in your water, you'll want to fix it - but that's always your choice.",
  },
];

const trustSignals = [
  { icon: Star, label: "5-Star Rated" },
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "A+ BBB" },
  { icon: CheckCircle, label: "Free Installation" },
];

export default function ContactClient() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

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
          {/* Left: Embedded Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/LXjbJ2Iy3pwot2oURuyb"
                style={{ width: "100%", height: "1051px", border: "none", borderRadius: "3px" }}
                id="inline-LXjbJ2Iy3pwot2oURuyb"
                data-layout='{"id":"INLINE"}'
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="A2P Compliant Form"
                data-height="1051"
                data-layout-iframe-id="inline-LXjbJ2Iy3pwot2oURuyb"
                data-form-id="LXjbJ2Iy3pwot2oURuyb"
                title="A2P Compliant Form"
              />
              <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
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
