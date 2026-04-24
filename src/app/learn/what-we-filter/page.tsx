import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import WaterJourney from "@/components/sections/WaterJourney";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "What's in your water — every contaminant we filter",
  description:
    "Step through every contaminant we pull out of your water: chlorine, sediment, iron, PFAS, lead, bacteria, and more. See how each stage of treatment works.",
};

export default function WhatWeFilterPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16" style={{ backgroundColor: "#07111A" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 30%, rgba(18,189,251,0.08) 0%, transparent 60%)" }} />
        <div className="container-site relative z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold mb-8" style={{ color: "rgba(18,189,251,0.7)" }}>
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "#12BDFB" }}>
            The full breakdown
          </p>
          <h1 className="font-display font-bold leading-[0.9] mb-5" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "#ffffff", letterSpacing: "-0.035em" }}>
            What we filter.<br /><span style={{ color: "#12BDFB" }}>Every contaminant.</span>
          </h1>
          <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Walk through every stage. Every thing pulled out. From sediment and chlorine to lead, PFAS, and bacteria. Not everyone wants this level of detail. If you do, here it is.
          </p>
        </div>
      </section>

      <WaterJourney />

      <section className="py-20 md:py-28" style={{ backgroundColor: "#07111A" }}>
        <div className="container-site text-center">
          <p className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#ffffff" }}>
            Ready to see what&apos;s in your water?
          </p>
          <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.5)" }}>
            A free in-home test takes 30 minutes. You watch every reading.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E", boxShadow: "0 4px 24px rgba(18,189,251,0.35)" }}>
            Book my free test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}
