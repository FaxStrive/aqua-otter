"use client";

import { motion } from "framer-motion";
import {
  Star,
  ArrowRight,
  Phone,
  ChevronDown,
  ShieldCheck,
  Award,
  ThumbsUp,
  Quote,
} from "lucide-react";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const reviews = [
  {
    name: "Mike Henderson",
    location: "Jasper, IN",
    date: "March 2026",
    text: "Our well water had terrible iron staining — orange toilets, orange sinks, orange everything. Aqua Otter installed an AiO filtration system and the staining was gone within a day. Absolutely life-changing.",
  },
  {
    name: "Sarah Collins",
    location: "Evansville, IN",
    date: "February 2026",
    text: "The sulfur smell from our well was so bad we couldn&apos;t drink the water or even shower comfortably. After the install, zero smell. Our water actually tastes good now. Highly recommend these guys.",
  },
  {
    name: "James & Laura Patterson",
    location: "Owensboro, KY",
    date: "January 2026",
    text: "Hard water had been destroying our appliances for years. The no-salt conditioner they recommended was perfect — no more scale, no heavy salt bags to carry. Honest advice, fair price.",
  },
  {
    name: "David Reeves",
    location: "Tell City, IN",
    date: "December 2025",
    text: "From the water test to the installation, everything was professional and on time. The technician explained every step and didn&apos;t try to upsell us on anything we didn&apos;t need. Refreshing experience.",
  },
  {
    name: "Karen Mitchell",
    location: "Bloomington, IN",
    date: "November 2025",
    text: "We were buying 5 cases of bottled water a week. Now we have an RO system under the sink and the water tastes better than any bottle we ever bought. Already saving money.",
  },
  {
    name: "Tom Brewer",
    location: "Louisville, KY",
    date: "October 2025",
    text: "Best customer service I&apos;ve experienced in years. They showed up on time, were friendly, cleaned up after themselves, and even followed up a week later to make sure everything was working perfectly.",
  },
  {
    name: "Angela Pearson",
    location: "Vincennes, IN",
    date: "September 2025",
    text: "Our well water was a nightmare — iron, sulfur, hardness, the works. Aqua Otter designed a custom system that handles all of it. Our water went from unusable to perfect. Can&apos;t thank them enough.",
  },
  {
    name: "Robert & Diane Schultz",
    location: "Paducah, KY",
    date: "August 2025",
    text: "We got quotes from three companies. Aqua Otter was the most honest and their pricing was the most straightforward — no hidden fees, no pressure. The system works flawlessly.",
  },
  {
    name: "Jennifer Walsh",
    location: "Ferdinand, IN",
    date: "July 2025",
    text: "My eczema has improved dramatically since we got the whole house system installed. No more chlorine in the shower water. My dermatologist even noticed the difference. Worth every penny.",
  },
  {
    name: "Chris Underwood",
    location: "Lexington, KY",
    date: "June 2025",
    text: "Moved to a property with well water for the first time and had no idea where to start. Aqua Otter tested everything, explained the results clearly, and installed the right system. Our well water is better than city water now.",
  },
];

const trustItems = [
  {
    icon: Award,
    title: "Licensed & Insured",
    desc: "Fully licensed water treatment professionals with comprehensive insurance coverage.",
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction Guaranteed",
    desc: "We stand behind every installation. If you&apos;re not happy, we make it right.",
  },
  {
    icon: ThumbsUp,
    title: "No-Pressure Sales",
    desc: "We test your water, explain the results, and give you honest options. Your choice, always.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function ReviewsClient() {
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
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm text-white/80">Customer Reviews</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6"
          >
            What Our Customers{" "}
            <span className="gradient-text">Say</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Real reviews from real homeowners who transformed their water quality
            with Aqua Otter Water Systems.
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

      {/* Overall Rating */}
      <Section background="white" padding="tight">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
          <div className="text-center">
            <p className="text-6xl font-heading font-bold text-dark mb-2">5.0</p>
            <div className="flex gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">Based on customer reviews</p>
          </div>
          <div className="h-px md:h-16 w-full md:w-px bg-gray-200" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-semibold text-dark">Google Reviews</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
              <div className="w-6 h-6 bg-blue-700 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">BBB</span>
              </div>
              <span className="text-sm font-semibold text-dark">A+ Rating</span>
            </div>
          </div>
        </div>
      </Section>

      <InlineCTA
        variant="button"
        text="Join Our Satisfied Customers"
        trustLine="Free water test — see the difference for yourself."
        href="/contact"
      />

      {/* Review Cards */}
      <Section background="surface">
        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading font-bold text-dark text-sm">
                    {review.name}
                  </h3>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{review.date}</span>
              </div>
              <StarRating />
              <div className="relative mt-3">
                <Quote className="absolute -top-1 -left-1 w-5 h-5 text-primary/10" />
                <p className="text-sm text-gray-600 leading-relaxed pl-3">
                  {review.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <InlineCTA
        variant="banner"
        text="Ready to Transform Your Water?"
        message="Join hundreds of satisfied homeowners. Start with a free water test and see what Aqua Otter can do for you."
        href="/contact"
      />

      {/* Trust Section */}
      <Section background="white" gradient="radial-center">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Why Trust Us</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mt-2 mb-4">
            The Aqua Otter Difference
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-5"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-dark mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
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
            Join Our <span className="gradient-text">Satisfied Customers</span>
          </motion.h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Your water quality journey starts with a free test. Let us show you
            why homeowners across the region trust Aqua Otter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Get My Free Water Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:8124996807"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              (812) 499-6807
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
