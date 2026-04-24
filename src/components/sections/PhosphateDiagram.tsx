"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function PhosphateDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: "#07111A" }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(18,189,251,0.06) 0%, transparent 65%)" }} />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "#12BDFB" }}>
            The technology
          </p>
          <h2
            className="font-display font-bold leading-[0.9] mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#ffffff", letterSpacing: "-0.03em" }}
          >
            Food-grade phosphate.<br />
            <span style={{ color: "#12BDFB" }}>Better than TAC.</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Most no-salt systems use TAC (template-assisted crystallization). We stopped using it. Food-grade phosphate is a sequestering agent that binds calcium and magnesium ions so they can&apos;t deposit on pipes, fixtures, or heating elements. Higher performance. Zero media degradation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* LEFT — Animated diagram */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-3xl p-6 md:p-8"
            style={{
              background: "linear-gradient(180deg, rgba(18,189,251,0.05) 0%, rgba(7,17,26,0.6) 100%)",
              border: "1px solid rgba(18,189,251,0.12)",
            }}
          >
            <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
              <defs>
                <linearGradient id="pipe-fill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#12BDFB" />
                </linearGradient>
                <linearGradient id="cartridge-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(18,189,251,0.35)" />
                  <stop offset="100%" stopColor="rgba(18,189,251,0.1)" />
                </linearGradient>
              </defs>

              {/* IN pipe */}
              <rect x={20} y={155} width={140} height={14} rx={2} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
              <text x={90} y={145} textAnchor="middle" fontSize="10" fontWeight="bold" letterSpacing="1.5" fill="#ef4444">HARD WATER IN</text>

              {/* Flowing calcium/magnesium "before" particles */}
              <g>
                {[28, 52, 76, 100, 124, 148].map((cx, i) => (
                  <g key={i}>
                    <circle cx={cx} cy={162} r={3.6} fill="#ef4444">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                    </circle>
                    <text x={cx} y={164.5} textAnchor="middle" fontSize="4" fontWeight="bold" fill="#fff">Ca</text>
                  </g>
                ))}
              </g>

              {/* Cartridge body */}
              <g>
                <rect x={170} y={80} width={220} height={160} rx={14} fill="url(#cartridge-gradient)" stroke="rgba(18,189,251,0.5)" strokeWidth={2} />
                <rect x={180} y={70} width={200} height={16} rx={6} fill="rgba(18,189,251,0.3)" stroke="rgba(18,189,251,0.5)" strokeWidth={1} />
                <rect x={180} y={234} width={200} height={16} rx={6} fill="rgba(18,189,251,0.3)" stroke="rgba(18,189,251,0.5)" strokeWidth={1} />
                <text x={280} y={62} textAnchor="middle" fontSize="10" fontWeight="bold" letterSpacing="1.8" fill="rgba(18,189,251,0.9)">QUINTEX 5 CARTRIDGE</text>
                <text x={280} y={260} textAnchor="middle" fontSize="8" fontWeight="bold" letterSpacing="1.5" fill="rgba(255,255,255,0.45)">FOOD-GRADE PHOSPHATE MEDIA</text>

                {/* Media beads */}
                {Array.from({ length: 9 }).map((_, row) =>
                  Array.from({ length: 12 }).map((_, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={182 + col * 18 + (row % 2) * 9}
                      cy={96 + row * 15}
                      r={4.5}
                      fill="rgba(18,189,251,0.55)"
                      opacity={0.6 + ((row + col) % 3) * 0.12}
                    />
                  ))
                )}

                {/* Core label */}
                <rect x={222} y={144} width={116} height={32} rx={8} fill="rgba(7,17,26,0.7)" />
                <text x={280} y={157} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#12BDFB">CA + MG</text>
                <text x={280} y={170} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.7)">sequestered, can&apos;t stick</text>
              </g>

              {/* OUT pipe */}
              <rect x={400} y={155} width={140} height={14} rx={2} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
              <text x={470} y={145} textAnchor="middle" fontSize="10" fontWeight="bold" letterSpacing="1.5" fill="#12BDFB">CONDITIONED OUT</text>

              {/* Transformed particles on the right side — bound to phosphate, can't scale */}
              {[408, 432, 456, 480, 504, 528].map((cx, i) => (
                <g key={i}>
                  <circle cx={cx} cy={162} r={5} fill="none" stroke="#12BDFB" strokeWidth={1.5}>
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin={`${0.2 + i * 0.15}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={cx} cy={162} r={2} fill="#7ed7ff">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin={`${0.2 + i * 0.15}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}

              {/* Arrows between */}
              <g>
                {[190, 220, 250, 280, 310, 340, 370].map((x, i) => (
                  <path
                    key={i}
                    d={`M ${x} 162 l 8 0 l -3 -3 m 3 3 l -3 3`}
                    stroke="rgba(18,189,251,0.5)"
                    strokeWidth={1.4}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.6}
                  >
                    <animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.5s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
                  </path>
                ))}
              </g>

              {/* Legend */}
              <g transform="translate(20, 285)">
                <circle cx={6} cy={4} r={4} fill="#ef4444" />
                <text x={16} y={7} fontSize="8" fill="rgba(255,255,255,0.65)">Free Ca/Mg ions = scale</text>
                <circle cx={200} cy={4} r={4} fill="none" stroke="#12BDFB" strokeWidth={1.4} />
                <circle cx={200} cy={4} r={1.6} fill="#7ed7ff" />
                <text x={210} y={7} fontSize="8" fill="rgba(255,255,255,0.65)">Sequestered ions = no scale</text>
              </g>
            </svg>
          </motion.div>

          {/* RIGHT — Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: "#0C1F2E", border: "1px solid rgba(18,189,251,0.18)" }}>
              <div style={{ height: 3, background: "linear-gradient(90deg, #ef4444 0%, #12BDFB 100%)" }} />
              <div className="grid grid-cols-2 divide-x" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "rgba(239,68,68,0.9)" }}>Traditional TAC</p>
                  <ul className="space-y-2.5 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <li>Crystallization media</li>
                    <li>Performance drops after 18 to 24 months</li>
                    <li>Media replacement required</li>
                    <li>Lower scale resistance at higher hardness</li>
                    <li>Sensitive to chlorine</li>
                  </ul>
                </div>
                <div className="p-6" style={{ backgroundColor: "rgba(18,189,251,0.05)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#12BDFB" }}>Food-Grade Phosphate</p>
                  <ul className="space-y-2.5 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <li><b style={{ color: "#12BDFB" }}>Ion sequestration</b></li>
                    <li>Consistent performance for the life of the cartridge</li>
                    <li>Annual cartridge swap only</li>
                    <li>Handles higher hardness without drop-off</li>
                    <li>Chlorine-tolerant core</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-xs mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              Food-grade phosphate is FDA-approved for drinking water systems. It&apos;s used by municipalities worldwide to prevent corrosion and scale in pipe networks. In your home, the same science keeps scale off your fixtures.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
