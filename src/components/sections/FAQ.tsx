"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import Section from "@/components/ui/Section";

const faqs = [
  {
    question: "What does the free water test include?",
    answer:
      "Our free in-home water test analyzes your water for hardness, iron, pH, TDS (total dissolved solids), chlorine, sulfur, and more. We bring professional testing equipment to your home, and you get instant results on the spot. There's no cost and no obligation — we simply want you to know what's in your water.",
  },
  {
    question: "What is a no-salt water system?",
    answer:
      "A no-salt water conditioner treats hard water without using sodium or potassium chloride. Instead of ion exchange (like a traditional softener), it uses template-assisted crystallization to prevent scale buildup. It's maintenance-free, eco-friendly, and keeps beneficial minerals in your water while protecting your pipes and appliances.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve families across five states: Indiana, Michigan, Ohio, Kentucky, and Tennessee. Whether you're on city water or well water, our team can reach you. Contact us to confirm service availability in your specific area.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most installations are completed in 2 to 3 hours. Our certified technicians handle everything professionally, and installation is included free with every system purchase. We clean up after ourselves and walk you through how everything works before we leave.",
  },
  {
    question: "Is installation really free?",
    answer:
      "Yes, 100%. Professional installation is included at no additional cost with every Aqua Otter water system. There are no hidden fees, no surprise charges. The price we quote is the price you pay, installation included.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section background="surface" gradient="radial-left" id="faq">
      <div className="text-center mb-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider mb-3"
        >
          <HelpCircle className="w-4 h-4" />
          FAQ
        </motion.span>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-dark mb-3">
          Common <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Get answers to the questions we hear most.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3 mb-8">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-heading font-semibold text-dark text-base">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          See All FAQs
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}
