"use client";

import { motion } from "framer-motion";
import {
  Star,
  ArrowRight,
  Phone,
  ShieldCheck,
  Award,
  ThumbsUp,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";

const reviews = [
  {
    name: "Daniel Hernandez",
    location: "Google Review",
    date: "April 2026",
    text: "Aqua Otter exceeded my expectations. Morgan took the time to walk me through all the options and helped me find the perfect system for my home. Professional, knowledgeable, and genuinely cared about getting it right.",
  },
  {
    name: "Travis Stelly",
    location: "Google Review",
    date: "April 2026",
    text: "Had a really smooth experience with Aqua Otter from start to finish. Sierra was super helpful and made the whole process easy to understand. Great team, great product.",
  },
  {
    name: "Ernie Bojrab",
    location: "Google Review",
    date: "March 2026",
    text: "Justin Robb did an incredible job handling the situation I had replacing our water filter. Very professional and knowledgeable. Highly recommend Aqua Otter for anyone needing water treatment.",
  },
  {
    name: "Jeff Krauter",
    location: "Google Review",
    date: "December 2025",
    text: "These guys are great. Had service guy here a couple times, they are very knowledgeable and professional. Excellent customer service and the water quality has been fantastic since installation.",
  },
  {
    name: "Benjamin",
    location: "Google Review",
    date: "December 2025",
    text: "I purposely waited a few years to leave this review to see how things would shake out. The system has been running perfectly with zero issues. Best investment we made for our home.",
  },
  {
    name: "Gerald Mitchell",
    location: "Google Review",
    date: "November 2025",
    text: "Wonderful and personable. Above and beyond on the install. The team was professional and took the time to explain everything about the system and how to maintain it.",
  },
  {
    name: "Brittany Hobbs",
    location: "Google Review",
    date: "October 2025",
    text: "Justin has been wonderful to work with. Aqua Otter came out, tested our water, and recommended the perfect solution. The difference in our water quality is night and day.",
  },
  {
    name: "Shelly Ganger",
    location: "Google Review",
    date: "August 2025",
    text: "We purchased our saltless water tank in Sept 2022, best purchase we've made. The water quality is amazing and we haven't had a single issue in over three years.",
  },
  {
    name: "Michelle Rhodes",
    location: "Google Review",
    date: "February 2025",
    text: "Great service! We had been dealing with a sediment problem in our water for years. Aqua Otter solved it completely. The team was professional, on time, and thorough.",
  },
  {
    name: "Val Fowler",
    location: "Google Review",
    date: "October 2024",
    text: "I recently had the Aqua Otter saltless whole house water filter system installed. The installation was clean and professional. Our water tastes incredible now — better than bottled.",
  },
  {
    name: "Mike Jameson",
    location: "Google Review",
    date: "June 2024",
    text: "This is a nice water filtration and softener system. The water tastes great and our appliances are already showing less scale buildup. Very happy with the investment.",
  },
  {
    name: "Cathy Tooley",
    location: "Google Review",
    date: "July 2023",
    text: "We had this system installed almost two years ago and have not had a single issue. The water quality is consistently excellent and the system runs quietly. Couldn't be happier.",
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
    desc: "We stand behind every installation. If you're not happy, we make it right.",
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
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/client/reviews-hero.jpg"
          alt="Customer consultation — reviews"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-primary-dark)]/80" />
        <div className="relative z-10 max-w-content mx-auto px-6 py-16 md:py-24 text-center" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
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
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            What Our Customers{" "}
            <span className="text-[var(--color-accent)]">Say</span>
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
        </div>
      </section>

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
              href="tel:6166121660"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              (616) 612-1660
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
