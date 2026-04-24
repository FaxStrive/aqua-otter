"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

const posts = [
  {
    slug: "hard-water-indiana",
    title: "Hard Water in Indiana: What Every Homeowner Needs to Know",
    excerpt: "85% of Indiana homes have hard water above 7 GPG. Here's what that means for your pipes, appliances, skin, and water bill — and what you can actually do about it.",
    category: "Education",
    readTime: "6 min read",
    date: "April 12, 2026",
    img: "/client/service-kitchen-tap.jpg",
    featured: true,
  },
  {
    slug: "well-water-testing",
    title: "Well Water Testing: Why You Should Test Every Year",
    excerpt: "Well water is untreated groundwater. What's in it can change seasonally, after heavy rain, or as your local geology shifts. Here's what to test for and how often.",
    category: "Well Water",
    readTime: "5 min read",
    date: "March 28, 2026",
    img: "/client/service-well-water.jpg",
    featured: false,
  },
  {
    slug: "softener-vs-no-salt",
    title: "Water Softener vs. No-Salt System: Which One Is Right for You?",
    excerpt: "Traditional salt-based softeners and no-salt conditioners both treat hard water — but they work differently and the right choice depends on your specific situation.",
    category: "Systems",
    readTime: "7 min read",
    date: "March 10, 2026",
    img: "/client/service-tap-closeup.jpg",
    featured: false,
  },
];

const categories = ["All", "Education", "Well Water", "Systems", "Maintenance"];

export default function BlogPage() {
  const postsRef = useRef<HTMLDivElement>(null);
  const postsInView = useInView(postsRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(18,189,251,0.08)", minHeight: "42vh", paddingTop: "clamp(120px, 14vh, 160px)", paddingBottom: "clamp(48px, 6vh, 72px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 60% 50%, rgba(18,189,251,0.05) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025, backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="container-site relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>Water Knowledge</span>
            </div>
            <h1 className="font-display font-bold leading-[0.9] tracking-tight mb-5" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "#0C1F2E" }}>
              Learn about<br />
              <span style={{ color: "#12BDFB" }}>your water.</span>
            </h1>
            <p style={{ color: "rgba(12,31,46,0.5)", maxWidth: "40ch" }}>
              Water chemistry, treatment options, and how to spot problems early. Written by specialists who test water for a living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section ref={postsRef} className="py-24 md:py-36" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          {/* Featured post */}
          {posts.filter(p => p.featured).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={postsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Link href={`/blog/${post.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border bg-white transition-shadow duration-300 hover:shadow-xl" style={{ borderColor: "rgba(18,189,251,0.12)" }}>
                <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
                  <Image src={post.img} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>{post.category}</span>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>
                      <Calendar className="w-3.5 h-3.5" />{post.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>
                      <Clock className="w-3.5 h-3.5" />{post.readTime}
                    </span>
                  </div>
                  <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#0C1F2E", lineHeight: 1.15 }}>{post.title}</h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(12,31,46,0.55)" }}>{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#12BDFB" }}>
                    Read article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Other posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.filter(p => !p.featured).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={postsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-3xl overflow-hidden border bg-white h-full transition-shadow duration-300 hover:shadow-xl" style={{ borderColor: "rgba(18,189,251,0.12)" }}>
                  <div className="relative overflow-hidden" style={{ height: 220 }}>
                    <Image src={post.img} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>{post.category}</span>
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>
                        <Calendar className="w-3.5 h-3.5" />{post.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>
                        <Clock className="w-3.5 h-3.5" />{post.readTime}
                      </span>
                    </div>
                    <h2 className="font-display font-bold mb-3 flex-1" style={{ fontSize: "1.2rem", color: "#0C1F2E", lineHeight: 1.25 }}>{post.title}</h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.55)" }}>{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#12BDFB" }}>
                      Read article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#0C1F2E" }}>Ready to test your water?</h2>
          <p className="mb-8" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "36ch", margin: "0 auto 2rem" }}>Knowledge is step one. Step two is finding out exactly what&apos;s in your water — free, in your home.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.28)" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}>
            Get Your Free Water Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
