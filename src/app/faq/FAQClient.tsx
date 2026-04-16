"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  ArrowRight,
  HelpCircle,
  Droplets,
  Wrench,
  MapPin,
  CreditCard,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const PHONE = "(317) 961-6925";
const PHONE_TEL = "tel:3179616925";

interface FAQ {
  q: string;
  a: string;
}

interface FAQGroup {
  title: string;
  icon: typeof HelpCircle;
  faqs: FAQ[];
}

const faqGroups: FAQGroup[] = [
  {
    title: "Water Testing",
    icon: Droplets,
    faqs: [
      {
        q: "What does the free water test include?",
        a: "Our free in-home water test checks for hardness, iron, pH levels, TDS (total dissolved solids), chlorine, sulfur, and other contaminants specific to your area. We bring all the testing equipment right to your home and walk you through every result in real-time.",
      },
      {
        q: "How long does the water test take?",
        a: "Most water tests take about 20-30 minutes from start to finish. We test multiple parameters, explain what each one means, and answer all your questions. There's no rush - we want you to understand your water quality completely.",
      },
      {
        q: "Is the water test really free? No hidden costs?",
        a: "100% free with zero obligation. We don't charge for the test, and there's absolutely no pressure to purchase anything. We believe in earning your business through honest results and expert recommendations - not high-pressure sales.",
      },
      {
        q: "How do I prepare for a water test?",
        a: "There's almost nothing you need to do! Just make sure we can access your main water line (usually in the basement or utility area) and a kitchen or bathroom faucet. If you have a well, having access to the pressure tank area is helpful. That's it!",
      },
      {
        q: "Is my water safe to drink right now?",
        a: "Without testing, it's impossible to know for sure. Many contaminants that affect taste, odor, and safety are invisible. That's exactly why we offer free testing - so you can know with certainty what's in your water and make informed decisions about treatment.",
      },
    ],
  },
  {
    title: "Treatment & Systems",
    icon: Wrench,
    faqs: [
      {
        q: "What is no-salt water treatment?",
        a: "No-salt water treatment (also called salt-free conditioning) treats hard water without using salt or chemicals. Instead of ion exchange (traditional softeners), these systems use template-assisted crystallization or other technologies to prevent scale buildup while keeping beneficial minerals in your water. It's better for the environment, your health, and your plumbing.",
      },
      {
        q: "What's the difference between well water and city water treatment?",
        a: "City water is pre-treated but often contains chlorine, fluoride, and other chemicals. Well water is untreated and can contain iron, sulfur, bacteria, hardness, and sediment. Treatment approaches differ significantly - well water typically requires more comprehensive filtration, which is why testing is so important.",
      },
      {
        q: "What systems do you carry?",
        a: "We carry a full range of water treatment systems including the Alpha 3000, Quintex 5, dual city softener and filtration systems, all-in-one well water filtration, ozone treatment systems, no-salt hard water treatment, reverse osmosis systems (whole house and under-sink), sediment filters, and more. We match the system to your specific water test results.",
      },
      {
        q: "How long does installation take?",
        a: "Most installations are completed in 2-4 hours, depending on the system and your plumbing setup. We handle everything from start to finish, and we always clean up after ourselves. Your water will be flowing through your new system the same day.",
      },
      {
        q: "Is installation really free?",
        a: "Yes! Free standard installation is included with every system purchase. We believe in transparent pricing - the price you're quoted is the price you pay, with installation included. No surprise fees, no add-on charges.",
      },
      {
        q: "What maintenance do the systems require?",
        a: "Maintenance varies by system type. Salt-based softeners need salt refills. Filter systems need periodic filter changes (typically every 6-12 months). No-salt systems are very low maintenance. We'll walk you through everything during installation and are always a call or text away if you need help.",
      },
      {
        q: "What warranty do your systems come with?",
        a: "Our systems come with manufacturer warranties that vary by product - typically ranging from 5 years to lifetime warranties on tanks and valves. We also stand behind our installation work. If something isn't right, we'll make it right.",
      },
    ],
  },
  {
    title: "Service & Scheduling",
    icon: MapPin,
    faqs: [
      {
        q: "What areas do you serve?",
        a: "We proudly serve five states: Indiana, Michigan, Ohio, Kentucky, and Tennessee. Our service covers major cities and surrounding areas in each state. If you're not sure if we serve your area, just give us a call or text - chances are we do!",
      },
      {
        q: "How do I schedule a water test?",
        a: "Easy! You can fill out our contact form, call us at (317) 961-6925, or text us at the same number. We'll work with your schedule to find a convenient time. Evenings work great for us, so don't worry if you work during the day.",
      },
      {
        q: "Do you offer emergency service?",
        a: "While we primarily focus on water treatment system installation and testing, we understand water emergencies happen. If you're experiencing a sudden change in water quality or a system malfunction, call or text us and we'll do our best to get to you as quickly as possible.",
      },
    ],
  },
  {
    title: "Pricing & Payment",
    icon: CreditCard,
    faqs: [
      {
        q: "How much do water treatment systems cost?",
        a: "Pricing depends on your specific water issues and the system needed. That's why we test first - so we can recommend the right solution at the right price. We offer competitive pricing and never recommend more than you need. Contact us for a free test and honest quote.",
      },
      {
        q: "What payment options do you accept?",
        a: "We accept cash, checks, all major credit cards, and we offer financing options to help make clean water affordable for every family. We'll discuss all payment options during your consultation so you can choose what works best for your budget.",
      },
    ],
  },
];

export default function FAQClient() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main>
      {/* Hero */}
      <Section background="dark" padding="none">
        <div className="min-h-[35vh] flex flex-col items-center justify-center text-center py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/client/otter-thinking.png"
                alt="Aqua Otter thinking"
                width={120}
                height={120}
                className="w-20 h-20 object-contain drop-shadow-lg mx-auto"
              />
            </motion.div>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-block bg-accent/20 text-accent-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
          >
            FAQ
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-tight mb-4"
          >
            Frequently Asked{" "}
            <span className="text-[var(--color-accent)]">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white/70 max-w-xl text-base sm:text-lg"
          >
            Everything you need to know about our water testing, treatment
            systems, service, and more.
          </motion.p>
        </div>
      </Section>

      {/* FAQ Groups */}
      {faqGroups.map((group, gi) => (
        <div key={group.title}>
          <Section
            background={gi % 2 === 0 ? "white" : "surface"}
            gradient={gi % 2 === 0 ? "radial-left" : "radial-right"}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-dark">
                  {group.title}
                </h2>
              </div>
              <div className="space-y-3">
                {group.faqs.map((faq, fi) => {
                  const key = `${gi}-${fi}`;
                  const isOpen = openItems[key];
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fi * 0.05 }}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                      >
                        <span className="font-heading font-bold text-dark text-sm sm:text-base">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
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
                  );
                })}
              </div>
            </div>
          </Section>

          {/* InlineCTA between groups */}
          {gi === 0 && (
            <InlineCTA
              variant="banner"
              text="Have a Question We Didn't Answer?"
              message="Give us a call or text anytime. We love talking water!"
              href="/contact"
            />
          )}
          {gi === 1 && (
            <InlineCTA
              variant="button"
              text="Schedule Your Free Water Test"
              trustLine="100% free, no obligation, takes about 30 minutes"
              href="/contact"
            />
          )}
          {gi === 2 && (
            <InlineCTA
              variant="text"
              text="Ready to get started? Contact us today"
              href="/contact"
            />
          )}
        </div>
      ))}

      {/* Still Have Questions CTA */}
      <Section background="dark">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4 opacity-60" />
            <h2 className="text-2xl sm:text-3xl font-heading font-black mb-3">
              Still Have <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-white/70 mb-6">
              We're real people who love talking about water. Call, text,
              or fill out our form - we'll get back to you fast.
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
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all justify-center"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
