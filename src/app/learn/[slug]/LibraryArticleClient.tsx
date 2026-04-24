"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, BookOpen, Clock } from "lucide-react";
import type { LibraryArticle } from "@/lib/library-articles";
import { LIBRARY_ARTICLES } from "@/lib/library-articles";

const categoryColors: Record<string, string> = {
  Contaminants: "#ef4444",
  Science: "#12BDFB",
  Systems: "#f59e0b",
  "Local Water": "#22d3ee",
  Maintenance: "#8b5cf6",
};

export default function LibraryArticleClient({ article }: { article: LibraryArticle }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-80px" });
  const related = LIBRARY_ARTICLES.filter(a => article.relatedSlugs.includes(a.slug));

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(18,189,251,0.08)",
          paddingTop: "clamp(120px, 14vh, 160px)",
          paddingBottom: "clamp(56px, 7vh, 80px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 70% at 70% 40%, rgba(18,189,251,0.05) 0%, transparent 60%)" }} />
        <div className="container-site relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs mb-8" style={{ color: "rgba(12,31,46,0.4)" }}>
            <Link href="/learn" className="flex items-center gap-1 hover:text-[#12BDFB] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Library
            </Link>
            <span>/</span>
            <span style={{ color: "rgba(12,31,46,0.6)" }}>{article.category}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: `${categoryColors[article.category]}15`, color: categoryColors[article.category] }}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>
                <Clock className="w-3.5 h-3.5" />{article.readTime}
              </span>
              <span className="text-xs" style={{ color: "rgba(12,31,46,0.35)" }}>{article.date}</span>
            </div>

            <h1 className="font-display font-bold leading-[1.05] mb-5" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "#0C1F2E" }}>
              {article.title}
            </h1>
            <p className="leading-relaxed" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", color: "rgba(12,31,46,0.55)", maxWidth: "54ch" }}>
              {article.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-10" style={{ backgroundColor: "#F0F8FF", borderBottom: "1px solid rgba(18,189,251,0.08)" }}>
        <div className="container-site max-w-4xl">
          <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(18,189,251,0.15)", backgroundColor: "#ffffff" }}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4" style={{ color: "#12BDFB" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(12,31,46,0.45)" }}>In this guide</span>
            </div>
            <ol className="space-y-2">
              {article.sections.map((s, i) => (
                <li key={s.heading} className="flex items-center gap-3 text-sm" style={{ color: "rgba(12,31,46,0.6)" }}>
                  <span className="text-xs font-bold w-5 text-right flex-shrink-0" style={{ color: "rgba(12,31,46,0.3)" }}>{i + 1}.</span>
                  <a href={`#section-${i}`} className="hover:text-[#12BDFB] transition-colors">{s.heading}</a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section ref={bodyRef} className="py-16 pb-24" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site max-w-4xl">
          <div className="space-y-14">
            {article.sections.map((section, i) => (
              <motion.div
                key={section.heading}
                id={`section-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="scroll-mt-28"
              >
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-xs font-bold mt-1 w-5 text-right flex-shrink-0" style={{ color: "rgba(12,31,46,0.25)" }}>{(i + 1).toString().padStart(2, "0")}</span>
                  <h2 className="font-display font-bold" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.7rem)", color: "#0C1F2E", lineHeight: 1.2 }}>
                    {section.heading}
                  </h2>
                </div>

                <div className="pl-9">
                  <p className="leading-relaxed mb-6" style={{ color: "rgba(12,31,46,0.65)", fontSize: "1rem", maxWidth: "68ch" }}>
                    {section.body}
                  </p>

                  {section.list && (
                    <ul className="space-y-3 mb-6">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.6)", maxWidth: "64ch" }}>
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: categoryColors[article.category] ?? "#12BDFB" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div className="rounded-2xl p-6 border-l-4" style={{ backgroundColor: "rgba(18,189,251,0.05)", borderLeftColor: "#12BDFB", borderTop: "1px solid rgba(18,189,251,0.12)", borderRight: "1px solid rgba(18,189,251,0.12)", borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#12BDFB" }}>{section.callout.label}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(12,31,46,0.65)" }}>{section.callout.text}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA insert */}
          <div className="mt-16 rounded-3xl border p-10 text-center" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "#ffffff" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#12BDFB" }}>Have questions about your water?</p>
            <h3 className="font-display font-bold mb-3" style={{ fontSize: "1.5rem", color: "#0C1F2E" }}>
              We test your water in-home. Free.
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(12,31,46,0.5)", maxWidth: "38ch", margin: "0 auto 1.5rem" }}>
              Everything discussed in this guide is testable. We bring the equipment, show you the results on-site, and design a system around your actual water.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 20px rgba(18,189,251,0.28)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}
            >
              Schedule Free Water Test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(18,189,251,0.08)" }}>
          <div className="container-site max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(12,31,46,0.35)" }}>Related Guides</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/learn/${r.slug}`}
                  className="group flex gap-4 rounded-2xl border p-5 bg-white transition-shadow duration-300 hover:shadow-md"
                  style={{ borderColor: "rgba(18,189,251,0.1)" }}
                >
                  <div className="flex-1">
                    <span className="text-xs font-medium mb-1 block" style={{ color: categoryColors[r.category] }}>{r.category}</span>
                    <h4 className="font-semibold mb-1" style={{ fontSize: "0.95rem", color: "#0C1F2E", lineHeight: 1.3 }}>{r.title}</h4>
                    <p className="text-xs" style={{ color: "rgba(12,31,46,0.4)" }}>{r.readTime}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" style={{ color: "#12BDFB" }} />
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/learn" className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "#12BDFB" }}>
                Browse all guides <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
