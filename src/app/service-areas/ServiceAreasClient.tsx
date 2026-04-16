"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const PHONE = "(317) 961-6925";
const PHONE_TEL = "tel:3179616925";

interface StateArea {
  state: string;
  abbr: string;
  cities: string[];
  color: string;
}

const serviceAreas: StateArea[] = [
  {
    state: "Indiana",
    abbr: "IN",
    cities: [
      "Indianapolis",
      "Fort Wayne",
      "Evansville",
      "South Bend",
      "Bloomington",
      "Lafayette",
      "Muncie",
      "Terre Haute",
      "Carmel",
      "Fishers",
      "Noblesville",
      "Greenwood",
    ],
    color: "from-primary to-primary-600",
  },
  {
    state: "Michigan",
    abbr: "MI",
    cities: ["Detroit", "Grand Rapids", "Lansing"],
    color: "from-blue-500 to-blue-600",
  },
  {
    state: "Ohio",
    abbr: "OH",
    cities: ["Columbus", "Cincinnati"],
    color: "from-emerald-500 to-emerald-600",
  },
  {
    state: "Kentucky",
    abbr: "KY",
    cities: ["Louisville", "Lexington"],
    color: "from-violet-500 to-violet-600",
  },
  {
    state: "Tennessee",
    abbr: "TN",
    cities: ["Nashville"],
    color: "from-amber-500 to-amber-600",
  },
];

export default function ServiceAreasClient() {
  return (
    <main>
      {/* Hero */}
      <Section background="dark" padding="none">
        <div className="min-h-[38vh] flex flex-col items-center justify-center text-center py-16 sm:py-24">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block bg-accent/20 text-accent-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
          >
            Where We Serve
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-black leading-tight mb-4"
          >
            Proudly Serving{" "}
            <span className="gradient-text">5 States</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white/70 max-w-xl text-base sm:text-lg mb-6"
          >
            From Indiana to Tennessee, Aqua Otter brings free water testing
            and expert treatment solutions right to your door.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {serviceAreas.map((area) => (
              <span
                key={area.abbr}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full"
              >
                <MapPin className="w-3 h-3" />
                {area.state}
              </span>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* State Cards */}
      <Section background="surface" gradient="radial-center">
        <div className="grid md:grid-cols-2 gap-5">
          {serviceAreas.map((area, i) => (
            <motion.div
              key={area.state}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all ${
                area.state === "Indiana" ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`bg-gradient-to-r ${area.color} px-6 py-4 flex items-center justify-between`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-black text-white">
                      {area.state}
                    </h3>
                    <p className="text-white/70 text-xs font-medium">
                      {area.cities.length}{" "}
                      {area.cities.length === 1 ? "city" : "cities"} & surrounding
                      areas
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-heading font-black text-white/30">
                  {area.abbr}
                </span>
              </div>
              <div className="p-5">
                <div
                  className={`grid ${
                    area.state === "Indiana"
                      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-2 sm:grid-cols-3"
                  } gap-2`}
                >
                  {area.cities.map((city) => (
                    <div
                      key={city}
                      className="flex items-center gap-1.5 text-sm text-gray-600"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {city}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 italic">
                  + surrounding communities and rural areas
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="We're Probably in Your Area"
        message="Even if you don't see your exact city listed, give us a call. We cover a wide service radius in all 5 states."
        href="/contact"
      />

      {/* Don't See Your City */}
      <Section background="white" gradient="radial-left">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-dark mb-3">
              Don't See Your{" "}
              <span className="gradient-text">City?</span>
            </h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Our service areas are always expanding. If your city isn't
              listed, there's a good chance we still serve your area. Give
              us a quick call or text and we'll let you know!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2 justify-center"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-4 rounded-xl text-sm font-bold hover:bg-primary-50 transition-all justify-center"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      <InlineCTA
        variant="text"
        text="Learn more about our water treatment services"
        href="/contact"
      />

      {/* Why Local Matters */}
      <Section background="primary-light" gradient="radial-right">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-dark">
              Why <span className="gradient-text">Local</span> Matters
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "We Know Your Water",
                desc: "Every region has unique water challenges. We understand the specific issues in Indiana well water, Michigan city supplies, and everything in between.",
              },
              {
                title: "Fast Response",
                desc: "Because we're local, we can get to your home quickly. No waiting weeks for a corporate chain to schedule you in.",
              },
              {
                title: "Community Trust",
                desc: "We live where we work. Our reputation in your community matters to us, which is why we go above and beyond for every customer.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <h3 className="font-heading font-bold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
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
              Clean Water Is{" "}
              <span className="gradient-text">Closer Than You Think</span>
            </h2>
            <p className="text-white/70 mb-6">
              No matter which state you're in, we'll come to you with
              a free water test and honest recommendations. Let's get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2 justify-center"
              >
                Schedule My Free Test
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all justify-center"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
            <p className="text-white/40 text-xs mt-4">
              Free installation - No obligation - 5-star service
            </p>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
