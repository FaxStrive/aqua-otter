"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "aquaotter:exit-intent:v1";
const GUIDE_URL = "/downloads/10-signs-your-water-is-damaging-your-home.pdf";

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen) return;

    let armed = false;
    const armTimer = setTimeout(() => { armed = true; }, 6000);

    const onMouseLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 0 && e.relatedTarget === null) {
        setOpen(true);
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      }
    };

    // Mobile fallback: show after 45s if unseen
    const mobileTimer = setTimeout(() => {
      if (window.matchMedia("(max-width: 768px)").matches && !localStorage.getItem(STORAGE_KEY)) {
        setOpen(true);
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      }
    }, 45000);

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      clearTimeout(armTimer);
      clearTimeout(mobileTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const close = () => setOpen(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("That email doesn't look quite right.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent-guide" }),
      }).catch(() => {}); // fail-open for MVP
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(7,17,26,0.8)", backdropFilter: "blur(8px)" }}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-3xl overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(18,189,251,0.25)",
            }}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "rgba(12,31,46,0.06)", color: "rgba(12,31,46,0.5)" }}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top accent */}
            <div style={{ height: 4, background: "linear-gradient(90deg, #12BDFB 0%, #f59e0b 100%)" }} />

            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-0">
              {/* Otter panel */}
              <div
                className="hidden sm:flex items-end justify-center pt-6"
                style={{
                  background: "linear-gradient(180deg, rgba(18,189,251,0.08) 0%, rgba(18,189,251,0) 100%)",
                }}
              >
                <Image src="/client/otter-pointing.png" alt="Aqua Otter mascot" width={110} height={140} className="h-auto w-auto max-h-40 object-contain" />
              </div>

              {/* Content */}
              <div className="p-7 sm:p-8">
                {!submitted ? (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#12BDFB" }}>
                      Before you go
                    </p>
                    <h2 className="font-display font-bold leading-[1] mb-3" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)", color: "#0C1F2E" }}>
                      10 signs your water<br />is damaging your home.
                    </h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.55)" }}>
                      A free PDF guide. What to look for, what it costs you every month, and when to do something about it.
                    </p>
                    <form onSubmit={onSubmit} className="space-y-3">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@homeowner.com"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                        style={{
                          border: `1.5px solid ${error ? "#ef4444" : "rgba(12,31,46,0.12)"}`,
                          backgroundColor: "#fafbfc",
                          color: "#0C1F2E",
                        }}
                      />
                      {error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3.5 rounded-xl text-sm font-bold transition-all"
                        style={{
                          backgroundColor: submitting ? "#7ed7ff" : "#12BDFB",
                          color: "#0C1F2E",
                          boxShadow: "0 4px 16px rgba(18,189,251,0.3)",
                        }}
                      >
                        {submitting ? "Sending..." : "Send me the free guide"}
                      </button>
                    </form>
                    <p className="text-[11px] mt-3" style={{ color: "rgba(12,31,46,0.38)" }}>
                      No spam. Unsubscribe any time. We hate spam too.
                    </p>
                  </>
                ) : (
                  <div className="py-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(34,197,94,0.12)" }}>
                      <CheckCircle2 className="w-7 h-7" style={{ color: "#22c55e" }} />
                    </div>
                    <h2 className="font-display font-bold leading-tight mb-2" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>
                      Check your inbox.
                    </h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(12,31,46,0.6)" }}>
                      We sent the guide to <b>{email}</b>. Takes 2 minutes to read. Might save you thousands.
                    </p>
                    <a
                      href={GUIDE_URL}
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: "#12BDFB" }}
                    >
                      Download now →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
