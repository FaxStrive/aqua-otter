"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

// Step data
const SOURCES = [
  { id: "city", label: "City / Municipal", sub: "Water comes from a utility", img: "/client/hero-water-problems.jpg" },
  { id: "well", label: "Private Well", sub: "Untreated groundwater", img: "/client/hero-well-water.png" },
  { id: "unsure", label: "Not Sure", sub: "We'll figure it out at the test", img: "/client/hero-drinking-water.jpg" },
];

const CONCERNS = [
  { id: "scale",    label: "Scale & hard water" },
  { id: "iron",     label: "Iron / rust stains" },
  { id: "taste",    label: "Taste or smell" },
  { id: "bacteria", label: "Bacteria / safety" },
  { id: "drinking", label: "Drinking water quality" },
  { id: "unsure",   label: "Not sure — just test it" },
];

// Otter per step
const OTTERS = [
  "/client/otter-waving.png",
  "/client/otter-thinking.png",
  "/client/otter-clipboard.png",
  "/client/otter-wrench.png",
  "/client/otter-thumbsup.png",
];

const slide = {
  initial: (dir: number) => ({ opacity: 0, x: dir * 60 }),
  animate: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
};

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [source, setSource] = useState("");
  const [concern, setConcern] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function next(n: number = 1) {
    setDir(1);
    setStep(s => s + n);
  }
  function back() {
    setDir(-1);
    setStep(s => s - 1);
  }
  async function submit() {
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          city,
          source: "contact-form",
          waterSource: source,
          concern,
        }),
      });
    } catch {
      // fail open — user still sees confirmation
    } finally {
      setSubmitting(false);
      setDone(true);
      setStep(4);
    }
  }

  const totalSteps = 4;
  const pct = Math.round(((step) / totalSteps) * 100);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#ffffff" }}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ height: 3, backgroundColor: "rgba(18,189,251,0.1)" }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: "#12BDFB" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col md:flex-row">

        {/* LEFT: Otter + context */}
        <div
          className="md:w-2/5 flex-shrink-0 relative hidden md:flex flex-col justify-between overflow-hidden"
          style={{ backgroundColor: "#07111A", minHeight: "100vh" }}
        >
          {/* Background layers */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 55%, rgba(18,189,251,0.11) 0%, transparent 65%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(18,189,251,0.06) 0%, transparent 60%)" }} />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04, backgroundImage: "radial-gradient(rgba(18,189,251,1) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          {/* TOP: Logo + headline */}
          <div className="relative z-10 p-10 pb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ backgroundColor: "rgba(18,189,251,0.1)", border: "1px solid rgba(18,189,251,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#12BDFB" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#12BDFB" }}>Free water test</span>
            </div>
            <h2 className="font-display font-bold leading-[0.9] mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#ffffff" }}>
              Know what&apos;s<br />in your water.<br />
              <span style={{ color: "#12BDFB" }}>In 24 hours.</span>
            </h2>

            {/* Trust pills */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: "✓", text: "No cost, ever" },
                { icon: "✓", text: "Licensed technician at your door" },
                { icon: "✓", text: "Results explained on-site" },
                { icon: "✓", text: "No pressure to buy anything" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ backgroundColor: "rgba(18,189,251,0.15)", color: "#12BDFB" }}>
                    {item.icon}
                  </div>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE: Otter mascot */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 flex justify-center items-end"
              style={{ flex: "1 1 auto" }}
            >
              <Image
                src={OTTERS[Math.min(step, OTTERS.length - 1)]}
                alt=""
                width={260}
                height={300}
                className="object-contain drop-shadow-2xl"
                style={{ maxHeight: 300 }}
              />
            </motion.div>
          </AnimatePresence>

          {/* BOTTOM: Social proof */}
          <div className="relative z-10 p-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex">{[...Array(5)].map((_, i) => <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#fbbf24"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}</div>
              <span className="text-sm font-semibold text-white">5.0</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>· BBB A+ · 5,000+ families</span>
            </div>
            <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
              &ldquo;Came out the next day, tested everything, explained it all. Zero pressure. Best home service experience I&apos;ve had.&rdquo;
            </p>
            <p className="text-xs mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
              — Sarah M., Fishers IN
            </p>
          </div>
        </div>

        {/* RIGHT: Steps */}
        <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-0" style={{ minHeight: "100vh" }}>
          <div className="w-full max-w-lg">

            {/* Step dots */}
            {!done && (
              <div className="flex items-center gap-2 mb-12">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === step ? 24 : 8,
                      height: 8,
                      backgroundColor: i <= step ? "#12BDFB" : "rgba(18,189,251,0.15)",
                    }}
                  />
                ))}
                <span className="text-xs ml-2" style={{ color: "rgba(12,31,46,0.35)" }}>{step + 1} of {totalSteps}</span>
              </div>
            )}

            <AnimatePresence mode="wait" custom={dir}>

              {/* STEP 0: Water Source */}
              {step === 0 && (
                <motion.div key="step0" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#12BDFB" }}>Step 1 of 4</p>
                  <h2 className="font-display font-bold leading-[0.9] mb-3" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#0C1F2E" }}>
                    City water or<br />well water?
                  </h2>
                  <p className="text-sm mb-10" style={{ color: "rgba(12,31,46,0.48)" }}>This tells us which tests to run and what systems to consider.</p>
                  <div className="space-y-3">
                    {SOURCES.map(s => (
                      <button
                        key={s.id}
                        onClick={() => { setSource(s.id); next(); }}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-200 group"
                        style={{ borderColor: "rgba(18,189,251,0.18)", backgroundColor: "#FAFCFF" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#12BDFB"; e.currentTarget.style.backgroundColor = "rgba(18,189,251,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(18,189,251,0.18)"; e.currentTarget.style.backgroundColor = "#FAFCFF"; }}
                      >
                        <div className="flex-1">
                          <p className="font-semibold" style={{ color: "#0C1F2E" }}>{s.label}</p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(12,31,46,0.45)" }}>{s.sub}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#12BDFB" }} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 1: Main Concern */}
              {step === 1 && (
                <motion.div key="step1" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#12BDFB" }}>Step 2 of 4</p>
                  <h2 className="font-display font-bold leading-[0.9] mb-3" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#0C1F2E" }}>
                    What&apos;s your<br />biggest concern?
                  </h2>
                  <p className="text-sm mb-10" style={{ color: "rgba(12,31,46,0.48)" }}>Pick the one that bothers you most. We&apos;ll address everything at the test.</p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {CONCERNS.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setConcern(c.id); next(); }}
                        className="p-4 rounded-2xl border text-left transition-all duration-200"
                        style={{ borderColor: "rgba(18,189,251,0.18)", backgroundColor: "#FAFCFF" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#12BDFB"; e.currentTarget.style.backgroundColor = "rgba(18,189,251,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(18,189,251,0.18)"; e.currentTarget.style.backgroundColor = "#FAFCFF"; }}
                      >
                        <p className="text-sm font-medium" style={{ color: "#0C1F2E" }}>{c.label}</p>
                      </button>
                    ))}
                  </div>
                  <button onClick={back} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(12,31,46,0.38)" }}>
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Location */}
              {step === 2 && (
                <motion.div key="step2" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#12BDFB" }}>Step 3 of 4</p>
                  <h2 className="font-display font-bold leading-[0.9] mb-3" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#0C1F2E" }}>
                    Where should<br />we come test?
                  </h2>
                  <p className="text-sm mb-10" style={{ color: "rgba(12,31,46,0.48)" }}>We cover Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina.</p>
                  <input
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && city.trim() && next()}
                    placeholder="City or Zip Code"
                    className="w-full px-5 py-4 rounded-2xl border text-lg outline-none mb-6"
                    style={{ borderColor: "rgba(18,189,251,0.25)", backgroundColor: "#FAFCFF", color: "#0C1F2E", transition: "border-color 0.2s" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#12BDFB")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(18,189,251,0.25)")}
                    autoFocus
                  />
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => city.trim() && next()}
                      className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200"
                      style={{ backgroundColor: city.trim() ? "#12BDFB" : "rgba(18,189,251,0.2)", color: city.trim() ? "#0C1F2E" : "rgba(18,189,251,0.5)", cursor: city.trim() ? "pointer" : "default" }}
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={back} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(12,31,46,0.38)" }}>
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Contact info */}
              {step === 3 && (
                <motion.div key="step3" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#12BDFB" }}>Step 4 of 4 — Last one</p>
                  <h2 className="font-display font-bold leading-[0.9] mb-3" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#0C1F2E" }}>
                    How do we<br />reach you?
                  </h2>
                  <p className="text-sm mb-10" style={{ color: "rgba(12,31,46,0.48)" }}>We&apos;ll call or text within one business day to lock in your test.</p>
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(12,31,46,0.4)" }}>Full Name *</label>
                      <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith"
                        className="w-full px-5 py-4 rounded-2xl border text-base outline-none"
                        style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "#FAFCFF", color: "#0C1F2E", transition: "border-color 0.2s" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#12BDFB")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(18,189,251,0.2)")} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(12,31,46,0.4)" }}>Phone Number *</label>
                      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(317) 555-0100" type="tel"
                        className="w-full px-5 py-4 rounded-2xl border text-base outline-none"
                        style={{ borderColor: "rgba(18,189,251,0.2)", backgroundColor: "#FAFCFF", color: "#0C1F2E", transition: "border-color 0.2s" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#12BDFB")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(18,189,251,0.2)")} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => name.trim() && phone.trim() && submit()}
                      disabled={submitting}
                      className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
                      style={{ backgroundColor: name.trim() && phone.trim() ? "#12BDFB" : "rgba(18,189,251,0.2)", color: name.trim() && phone.trim() ? "#0C1F2E" : "rgba(18,189,251,0.5)", cursor: name.trim() && phone.trim() ? "pointer" : "default", boxShadow: name.trim() && phone.trim() ? "0 4px 20px rgba(18,189,251,0.3)" : "none", opacity: submitting ? 0.7 : 1 }}
                    >
                      {submitting ? "Sending..." : "Schedule My Free Test"} {!submitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                    <button onClick={back} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(12,31,46,0.38)" }}>
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>
                  <p className="mt-4 text-xs" style={{ color: "rgba(12,31,46,0.3)" }}>No spam. We respond within 1 business day.</p>
                </motion.div>
              )}

              {/* STEP 4: Done */}
              {step === 4 && (
                <motion.div key="step4" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }} className="text-center">
                  <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(18,189,251,0.1)", border: "2px solid rgba(18,189,251,0.25)" }}>
                      <CheckCircle className="w-10 h-10" style={{ color: "#12BDFB" }} />
                    </div>
                  </motion.div>
                  <h2 className="font-display font-bold mb-3" style={{ fontSize: "2.5rem", color: "#0C1F2E" }}>You&apos;re all set.</h2>
                  <p className="text-base mb-2" style={{ color: "rgba(12,31,46,0.58)" }}>We&apos;ll call or text <strong style={{ color: "#0C1F2E" }}>{phone}</strong> within one business day to schedule your free water test.</p>
                  <p className="text-sm mb-10" style={{ color: "rgba(12,31,46,0.38)" }}>
                    {source === "well" ? "Well water test" : "City water test"} scheduled for {city}.
                  </p>
                  <p className="text-sm" style={{ color: "rgba(12,31,46,0.45)" }}>
                    Need to talk now? Call <a href="tel:+13179835919" className="font-semibold" style={{ color: "#12BDFB" }}>(317) 983-5919</a>
                  </p>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Direct contact strip — always visible */}
            {!done && (
              <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(18,189,251,0.08)" }}>
                <p className="text-xs mb-3" style={{ color: "rgba(12,31,46,0.32)" }}>Prefer to call directly?</p>
                <a href="tel:+13179835919" className="text-sm font-semibold" style={{ color: "#12BDFB" }}>(317) 983-5919</a>
                <span className="text-xs mx-2" style={{ color: "rgba(12,31,46,0.25)" }}>·</span>
                <a href="mailto:info@myaquaotter.com" className="text-sm" style={{ color: "rgba(12,31,46,0.4)" }}>info@myaquaotter.com</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
