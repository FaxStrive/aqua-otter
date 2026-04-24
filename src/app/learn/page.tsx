"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Beaker, Droplets, Wrench } from "lucide-react";
import { LIBRARY_ARTICLES, LIBRARY_CATEGORIES } from "@/lib/library-articles";

const categoryIcons: Record<string, React.ReactNode> = {
  Contaminants: <Beaker className="w-4 h-4" />,
  Science: <Droplets className="w-4 h-4" />,
  Systems: <Wrench className="w-4 h-4" />,
  "Local Water": <BookOpen className="w-4 h-4" />,
  Maintenance: <Wrench className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  Contaminants: "#ef4444",
  Science: "#12BDFB",
  Systems: "#f59e0b",
  "Local Water": "#22d3ee",
  Maintenance: "#8b5cf6",
};

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const featured = LIBRARY_ARTICLES.filter(a => a.featured);
  const filtered = activeCategory === "All"
    ? LIBRARY_ARTICLES
    : LIBRARY_ARTICLES.filter(a => a.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(18,189,251,0.08)",
          minHeight: "46vh",
          paddingTop: "clamp(120px, 14vh, 160px)",
          paddingBottom: "clamp(56px, 7vh, 88px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 65% 50%, rgba(18,189,251,0.05) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.022, backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="container-site relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "rgba(18,189,251,0.06)" }}>
              <BookOpen className="w-3.5 h-3.5" style={{ color: "#12BDFB" }} />
              <span className="text-xs font-medium tracking-[0.1em] uppercase" style={{ color: "#12BDFB" }}>Aqua Otter Library</span>
            </div>
            <h1 className="font-display font-bold leading-[0.92] tracking-tight mb-5" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#0C1F2E" }}>
              Know your<br />
              <span style={{ color: "#12BDFB" }}>water.</span>
            </h1>
            <p style={{ color: "rgba(12,31,46,0.5)", maxWidth: "44ch", fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.7 }}>
              Deep guides on contaminants, treatment science, and local water conditions. Written by people who test water for a living.
            </p>
          </motion.div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-2 mt-10"
          >
            {["All", ...LIBRARY_CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === cat ? "#12BDFB" : "transparent",
                  color: activeCategory === cat ? "#0C1F2E" : "rgba(12,31,46,0.5)",
                  borderColor: activeCategory === cat ? "#12BDFB" : "rgba(12,31,46,0.12)",
                }}
              >
                {cat !== "All" && <span style={{ color: activeCategory === cat ? "#0C1F2E" : categoryColors[cat] }}>{categoryIcons[cat]}</span>}
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured articles */}
      {activeCategory === "All" && featured.length > 0 && (
        <section className="pt-20 pb-10" style={{ backgroundColor: "#F0F8FF" }}>
          <div className="container-site">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(12,31,46,0.35)" }}>Featured Guides</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                >
                  <Link
                    href={`/learn/${article.slug}`}
                    className="group flex flex-col rounded-3xl overflow-hidden border bg-white h-full transition-shadow duration-300 hover:shadow-xl"
                    style={{ borderColor: "rgba(18,189,251,0.12)" }}
                  >
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                          style={{ backgroundColor: `${categoryColors[article.category]}15`, color: categoryColors[article.category] }}
                        >
                          {categoryIcons[article.category]}
                          {article.category}
                        </span>
                        <span className="text-xs" style={{ color: "rgba(12,31,46,0.35)" }}>{article.readTime}</span>
                      </div>
                      <h2 className="font-display font-bold mb-3 flex-1" style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", color: "#0C1F2E", lineHeight: 1.2 }}>
                        {article.title}
                      </h2>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(12,31,46,0.55)", maxWidth: "44ch" }}>
                        {article.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#12BDFB" }}>
                        Read guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All / filtered articles */}
      <section ref={gridRef} className={`${activeCategory === "All" ? "py-10 pb-28" : "py-20 pb-28"}`} style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          {activeCategory !== "All" && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(12,31,46,0.35)" }}>
              {filtered.length} article{filtered.length !== 1 ? "s" : ""} in {activeCategory}
            </p>
          )}
          {activeCategory === "All" && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(12,31,46,0.35)" }}>All Guides</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.filter(a => activeCategory !== "All" || !a.featured).map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  href={`/learn/${article.slug}`}
                  className="group flex flex-col rounded-2xl border bg-white h-full p-6 transition-shadow duration-300 hover:shadow-lg"
                  style={{ borderColor: "rgba(18,189,251,0.1)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                      style={{ backgroundColor: `${categoryColors[article.category]}12`, color: categoryColors[article.category] }}
                    >
                      {categoryIcons[article.category]}
                      {article.category}
                    </span>
                    <span className="text-xs" style={{ color: "rgba(12,31,46,0.35)" }}>{article.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold mb-2.5 flex-1" style={{ fontSize: "1.05rem", color: "#0C1F2E", lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(12,31,46,0.5)", fontSize: "0.85rem" }}>
                    {article.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#12BDFB" }}>
                    Read guide <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Also see */}
      <section className="py-16" style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(18,189,251,0.08)" }}>
        <div className="container-site">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h3 className="font-display font-bold mb-2" style={{ fontSize: "1.4rem", color: "#0C1F2E" }}>Looking for specific water terms?</h3>
              <p className="text-sm" style={{ color: "rgba(12,31,46,0.5)" }}>The Aqua Otter Glossary defines every term in plain English.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href="/glossary"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-200"
                style={{ borderColor: "rgba(18,189,251,0.3)", color: "#12BDFB" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(18,189,251,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                View Glossary <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                style={{ backgroundColor: "#0C1F2E", color: "#ffffff" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0C1F2E")}
              >
                Free Water Test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
