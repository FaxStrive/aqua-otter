"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Phone, Layers, Droplets, FlaskConical, Wind, Sparkles, ShoppingCart, ShieldAlert, HelpCircle, type LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Answers = {
  waterSource: string;
  concerns: string[];
  household: string;
  ownership: string;
  timeline: string;
  zip: string;
  name: string;
  phone: string;
  email: string;
};

// ─── Step data ────────────────────────────────────────────────────────────────

const WATER_SOURCES = [
  { id: "city",  label: "City / Municipal",  sub: "Water bill from a utility",   img: "/client/service-kitchen-tap.jpg" },
  { id: "well",  label: "Well Water",         sub: "Private well on the property", img: "/client/service-well-water.jpg"  },
];

const CONCERNS: { id: string; label: string; sub: string; icon: LucideIcon }[] = [
  { id: "hardness",     label: "Hard water / Scale",   sub: "White buildup on fixtures",   icon: Layers       },
  { id: "iron_stains",  label: "Iron / rust stains",   sub: "Orange discoloration",        icon: Droplets     },
  { id: "bad_taste",    label: "Bad taste or odor",    sub: "Chlorine or flat flavor",     icon: FlaskConical },
  { id: "sulfur_smell", label: "Sulfur smell",         sub: "Rotten egg odor",             icon: Wind         },
  { id: "dry_skin",     label: "Dry skin or hair",     sub: "After showering or bathing",  icon: Sparkles     },
  { id: "bottled_water",label: "Buying bottled water", sub: "Don't trust the tap",         icon: ShoppingCart },
  { id: "bacteria",     label: "Bacteria / Safety",    sub: "Especially on well water",    icon: ShieldAlert  },
  { id: "not_sure",     label: "Not sure — just test", sub: "Let the results guide us",    icon: HelpCircle   },
];

const HOUSEHOLD_SIZES = [
  { id: "1-2",  label: "1 – 2",  sub: "Just us two"         },
  { id: "3-4",  label: "3 – 4",  sub: "Small family"        },
  { id: "5+",   label: "5 +",    sub: "Bigger household"    },
];

const OWNERSHIP = [
  { id: "own",  label: "I own my home",  sub: "Ready to install" },
  { id: "rent", label: "I rent",         sub: "Checking options" },
];

const TIMELINES = [
  { id: "asap",        label: "As soon as possible", sub: "I want clean water now"      },
  { id: "month",       label: "Within a month",       sub: "Still researching a bit"     },
  { id: "researching", label: "Just exploring",       sub: "No rush, learning my options" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full h-1 rounded-full" style={{ backgroundColor: "rgba(18,189,251,0.15)" }}>
      <motion.div
        className="h-1 rounded-full"
        style={{ backgroundColor: "#12BDFB" }}
        animate={{ width: `${((step + 1) / total) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

function ImageCard({
  img, label, sub, selected, onClick,
}: {
  img: string; label: string; sub: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl text-left transition-all duration-200 w-full"
      style={{
        border: selected ? "2px solid #12BDFB" : "2px solid rgba(12,31,46,0.1)",
        boxShadow: selected ? "0 0 0 4px rgba(18,189,251,0.12)" : "none",
      }}
    >
      <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
        <Image src={img} alt={label} fill className="object-cover" sizes="50vw" />
        <div
          className="absolute inset-0"
          style={{
            background: selected
              ? "linear-gradient(to top, rgba(7,17,26,0.85) 0%, rgba(18,189,251,0.12) 100%)"
              : "linear-gradient(to top, rgba(7,17,26,0.75) 0%, rgba(7,17,26,0.1) 100%)",
          }}
        />
        {selected && (
          <div
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#12BDFB" }}
          >
            <Check className="w-4 h-4" style={{ color: "#07111A" }} />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="font-semibold text-white text-sm leading-tight">{label}</p>
        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{sub}</p>
      </div>
    </button>
  );
}

function IconCard({
  icon: Icon, label, sub, selected, onClick,
}: {
  icon: LucideIcon; label: string; sub: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl p-4 text-left transition-all duration-200 w-full flex flex-col gap-3"
      style={{
        border: selected ? "2px solid #12BDFB" : "2px solid rgba(12,31,46,0.08)",
        backgroundColor: selected ? "rgba(18,189,251,0.06)" : "#ffffff",
        boxShadow: selected ? "0 0 0 4px rgba(18,189,251,0.1)" : "none",
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: selected ? "rgba(18,189,251,0.15)" : "rgba(12,31,46,0.05)" }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: selected ? "#12BDFB" : "rgba(12,31,46,0.45)" }} strokeWidth={1.75} />
        </div>
        <div
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
          style={{
            borderColor: selected ? "#12BDFB" : "rgba(12,31,46,0.15)",
            backgroundColor: selected ? "#12BDFB" : "transparent",
          }}
        >
          {selected && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
      <div>
        <p className="font-semibold text-sm leading-tight" style={{ color: "#0C1F2E" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(12,31,46,0.4)" }}>{sub}</p>
      </div>
    </button>
  );
}

function TextCard({
  label, sub, selected, onClick,
}: {
  label: string; sub: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl p-5 text-left transition-all duration-200"
      style={{
        border: selected ? "2px solid #12BDFB" : "2px solid rgba(12,31,46,0.1)",
        backgroundColor: selected ? "rgba(18,189,251,0.06)" : "#ffffff",
        boxShadow: selected ? "0 0 0 4px rgba(18,189,251,0.1)" : "none",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-base" style={{ color: "#0C1F2E" }}>{label}</p>
          <p className="text-sm mt-0.5" style={{ color: "rgba(12,31,46,0.45)" }}>{sub}</p>
        </div>
        <div
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4"
          style={{
            borderColor: selected ? "#12BDFB" : "rgba(12,31,46,0.2)",
            backgroundColor: selected ? "#12BDFB" : "transparent",
          }}
        >
          {selected && <Check className="w-3.5 h-3.5 text-white" />}
        </div>
      </div>
    </button>
  );
}

// ─── Slide wrapper ────────────────────────────────────────────────────────────

function Slide({ children, dir, stepKey }: { children: React.ReactNode; dir: number; stepKey: string }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" custom={dir}>
      <motion.div
        key={stepKey}
        custom={dir}
        initial={reduce ? {} : { opacity: 0, x: dir > 0 ? 60 : -60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={reduce ? {} : { opacity: 0, x: dir > 0 ? -60 : 60 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7;

export default function GetStartedPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const [answers, setAnswers] = useState<Answers>({
    waterSource: "",
    concerns: [],
    household: "",
    ownership: "",
    timeline: "",
    zip: "",
    name: "",
    phone: "",
    email: "",
  });

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggle = (field: "concerns", val: string) => {
    setAnswers(a => {
      const arr = a[field];
      return { ...a, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  const pick = (field: keyof Answers, val: string) => {
    setAnswers(a => ({ ...a, [field]: val }));
  };

  const canAdvance = () => {
    switch (step) {
      case 0: return !!answers.waterSource;
      case 1: return answers.concerns.length > 0;
      case 2: return !!answers.household;
      case 3: return !!answers.ownership;
      case 4: return !!answers.timeline;
      case 5: return answers.zip.length === 5 && /^\d{5}$/.test(answers.zip);
      case 6: return !!answers.name.trim() && /^\+?[\d\s\-().]{7,}$/.test(answers.phone);
      default: return false;
    }
  };

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const notes = [
        `Water source: ${answers.waterSource}`,
        `Concerns: ${answers.concerns.join(", ")}`,
        `Household size: ${answers.household}`,
        `Ownership: ${answers.ownership}`,
        `Timeline: ${answers.timeline}`,
      ].join(" | ");

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name,
          phone: answers.phone,
          email: answers.email || undefined,
          zip: answers.zip,
          source: "get-started-quiz",
          waterSource: answers.waterSource,
          concern: answers.concerns.join(", "),
          notes,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "unknown");
      setDone(true);
    } catch {
      setError("Something went wrong. Call us directly at (317) 983-5919.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center" style={{ backgroundColor: "#07111A" }}>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(18,189,251,0.15)", border: "2px solid rgba(18,189,251,0.3)" }}>
            <Check className="w-10 h-10" style={{ color: "#12BDFB" }} />
          </div>
          <h1 className="font-display font-bold text-white mb-3" style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}>
            You&apos;re all set.
          </h1>
          <p className="mb-2" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "34ch", margin: "0 auto 1rem" }}>
            We&apos;ll call you within one business day to schedule your free in-home water test.
          </p>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.3)" }}>
            Want to reach us faster?
          </p>
          <a
            href="tel:+13179835919"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
            style={{ backgroundColor: "#12BDFB", color: "#07111A" }}
          >
            <Phone className="w-4 h-4" />
            (317) 983-5919
          </a>
          <div className="mt-8">
            <Link href="/" className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="min-h-screen flex flex-col" style={{ backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div className="sticky top-0 z-20 px-5 pt-5 pb-4" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(12,31,46,0.06)" }}>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <Link href="/">
              <Image src="/client/Black_Logo.png" alt="Aqua Otter" width={110} height={32} className="object-contain" />
            </Link>
            <span className="text-xs font-medium" style={{ color: "rgba(12,31,46,0.35)" }}>
              {step + 1} of {TOTAL_STEPS}
            </span>
          </div>
          <ProgressBar step={step} total={TOTAL_STEPS} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-8 pb-8 max-w-lg mx-auto w-full">
        <Slide dir={dir} stepKey={String(step)}>
          {/* STEP 0 — Water source */}
          {step === 0 && (
            <div>
              <h2 className="font-display font-bold mb-1" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "#0C1F2E" }}>
                What&apos;s your water source?
              </h2>
              <p className="text-sm mb-6" style={{ color: "rgba(12,31,46,0.45)" }}>
                This shapes which systems we recommend.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {WATER_SOURCES.map(s => (
                  <ImageCard
                    key={s.id}
                    img={s.img}
                    label={s.label}
                    sub={s.sub}
                    selected={answers.waterSource === s.id}
                    onClick={() => { pick("waterSource", s.id); setTimeout(() => go(1), 280); }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Concerns */}
          {step === 1 && (
            <div>
              <h2 className="font-display font-bold mb-1" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "#0C1F2E" }}>
                What are you dealing with?
              </h2>
              <p className="text-sm mb-6" style={{ color: "rgba(12,31,46,0.45)" }}>
                Pick everything that applies. Multiple is fine.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {CONCERNS.map(c => (
                  <IconCard
                    key={c.id}
                    icon={c.icon}
                    label={c.label}
                    sub={c.sub}
                    selected={answers.concerns.includes(c.id)}
                    onClick={() => toggle("concerns", c.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Household size */}
          {step === 2 && (
            <div>
              <h2 className="font-display font-bold mb-1" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "#0C1F2E" }}>
                How many people in your home?
              </h2>
              <p className="text-sm mb-6" style={{ color: "rgba(12,31,46,0.45)" }}>
                Helps us size the system correctly.
              </p>
              <div className="flex flex-col gap-3">
                {HOUSEHOLD_SIZES.map(h => (
                  <TextCard
                    key={h.id}
                    label={h.label}
                    sub={h.sub}
                    selected={answers.household === h.id}
                    onClick={() => { pick("household", h.id); setTimeout(() => go(3), 280); }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 — Ownership */}
          {step === 3 && (
            <div>
              <h2 className="font-display font-bold mb-1" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "#0C1F2E" }}>
                Do you own your home?
              </h2>
              <p className="text-sm mb-6" style={{ color: "rgba(12,31,46,0.45)" }}>
                Some systems require landlord approval.
              </p>
              <div className="flex flex-col gap-3">
                {OWNERSHIP.map(o => (
                  <TextCard
                    key={o.id}
                    label={o.label}
                    sub={o.sub}
                    selected={answers.ownership === o.id}
                    onClick={() => { pick("ownership", o.id); setTimeout(() => go(4), 280); }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 — Timeline */}
          {step === 4 && (
            <div>
              <h2 className="font-display font-bold mb-1" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "#0C1F2E" }}>
                When do you want this solved?
              </h2>
              <p className="text-sm mb-6" style={{ color: "rgba(12,31,46,0.45)" }}>
                No pressure either way.
              </p>
              <div className="flex flex-col gap-3">
                {TIMELINES.map(t => (
                  <TextCard
                    key={t.id}
                    label={t.label}
                    sub={t.sub}
                    selected={answers.timeline === t.id}
                    onClick={() => { pick("timeline", t.id); setTimeout(() => go(5), 280); }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 — ZIP */}
          {step === 5 && (
            <div>
              <h2 className="font-display font-bold mb-1" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "#0C1F2E" }}>
                What&apos;s your ZIP code?
              </h2>
              <p className="text-sm mb-6" style={{ color: "rgba(12,31,46,0.45)" }}>
                We&apos;ll check what&apos;s typically in your local water.
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="e.g. 46060"
                value={answers.zip}
                onChange={e => pick("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                className="w-full rounded-2xl px-5 py-4 text-xl font-semibold outline-none transition-all"
                style={{
                  border: "2px solid rgba(12,31,46,0.12)",
                  color: "#0C1F2E",
                  letterSpacing: "0.15em",
                }}
                onFocus={e => (e.target.style.borderColor = "#12BDFB")}
                onBlur={e => (e.target.style.borderColor = "rgba(12,31,46,0.12)")}
                onKeyDown={e => { if (e.key === "Enter" && canAdvance()) go(6); }}
                autoFocus
              />
            </div>
          )}

          {/* STEP 6 — Contact info */}
          {step === 6 && (
            <div>
              <h2 className="font-display font-bold mb-1" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "#0C1F2E" }}>
                Last step — how do we reach you?
              </h2>
              <p className="text-sm mb-6" style={{ color: "rgba(12,31,46,0.45)" }}>
                We&apos;ll call to schedule. No spam, ever.
              </p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "rgba(12,31,46,0.45)" }}>
                    Your name
                  </label>
                  <input
                    type="text"
                    placeholder="First and last name"
                    value={answers.name}
                    onChange={e => pick("name", e.target.value)}
                    className="w-full rounded-xl px-4 py-3.5 outline-none transition-all text-base"
                    style={{ border: "2px solid rgba(12,31,46,0.12)", color: "#0C1F2E" }}
                    onFocus={e => (e.target.style.borderColor = "#12BDFB")}
                    onBlur={e => (e.target.style.borderColor = "rgba(12,31,46,0.12)")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "rgba(12,31,46,0.45)" }}>
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="(317) 555-0100"
                    value={answers.phone}
                    onChange={e => pick("phone", e.target.value)}
                    className="w-full rounded-xl px-4 py-3.5 outline-none transition-all text-base"
                    style={{ border: "2px solid rgba(12,31,46,0.12)", color: "#0C1F2E" }}
                    onFocus={e => (e.target.style.borderColor = "#12BDFB")}
                    onBlur={e => (e.target.style.borderColor = "rgba(12,31,46,0.12)")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "rgba(12,31,46,0.45)" }}>
                    Email <span style={{ color: "rgba(12,31,46,0.3)", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={answers.email}
                    onChange={e => pick("email", e.target.value)}
                    className="w-full rounded-xl px-4 py-3.5 outline-none transition-all text-base"
                    style={{ border: "2px solid rgba(12,31,46,0.12)", color: "#0C1F2E" }}
                    onFocus={e => (e.target.style.borderColor = "#12BDFB")}
                    onBlur={e => (e.target.style.borderColor = "rgba(12,31,46,0.12)")}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 mt-4">{error}</p>
              )}
            </div>
          )}
        </Slide>
      </div>

      {/* Bottom nav */}
      <div
        className="sticky bottom-0 px-5 py-4"
        style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(12,31,46,0.06)" }}
      >
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={() => go(step - 1)}
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ border: "2px solid rgba(12,31,46,0.1)", color: "rgba(12,31,46,0.5)" }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {(step === 1 || step === 5) && (
            <button
              onClick={() => go(step + 1)}
              disabled={!canAdvance()}
              className="flex-1 h-12 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                backgroundColor: canAdvance() ? "#12BDFB" : "rgba(12,31,46,0.06)",
                color: canAdvance() ? "#07111A" : "rgba(12,31,46,0.3)",
              }}
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 6 && (
            <button
              onClick={submit}
              disabled={submitting || !canAdvance()}
              className="flex-1 h-12 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                backgroundColor: canAdvance() && !submitting ? "#12BDFB" : "rgba(12,31,46,0.06)",
                color: canAdvance() && !submitting ? "#07111A" : "rgba(12,31,46,0.3)",
              }}
            >
              {submitting ? "Booking..." : <><span>Book My Free Water Test</span> <ArrowRight className="w-4 h-4" /></>}
            </button>
          )}
        </div>
        {step === 6 && (
          <p className="text-xs text-center mt-2 max-w-lg mx-auto" style={{ color: "rgba(12,31,46,0.3)" }}>
            No spam. No high-pressure sales. Just a technician and a test kit.
          </p>
        )}
      </div>
    </div>
  );
}
