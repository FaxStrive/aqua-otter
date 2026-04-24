"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";


export default function HardWaterIndianaPost() {
  return (
    <article className="pt-40 pb-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-site max-w-2xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors" style={{ color: "rgba(12,31,46,0.4)" }} onMouseOver={e => (e.currentTarget.style.color = "#12BDFB")} onMouseOut={e => (e.currentTarget.style.color = "rgba(12,31,46,0.4)")}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>Education</div>

        <h1 className="font-display font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#0C1F2E" }}>
          Hard Water in Indiana: What Every Homeowner Needs to Know
        </h1>

        <p className="text-sm mb-10" style={{ color: "rgba(12,31,46,0.4)" }}>April 12, 2026 &nbsp;·&nbsp; 6 min read &nbsp;·&nbsp; By the Aqua Otter Team</p>

        <div className="space-y-6 text-base leading-relaxed" style={{ color: "rgba(12,31,46,0.65)" }}>
          <p>
            If you live in Indiana, there is a very good chance your water is hard. In fact, according to USGS data, approximately 85% of Indiana homes receive water with hardness levels above 7 grains per gallon (GPG) — the threshold at which most water treatment professionals consider water definitively hard.
          </p>
          <p>
            The average Indiana home sits around 12 to 18 GPG. Some well water in central and northern Indiana tests above 25 GPG. That is genuinely extreme, and it causes real problems — slowly, silently, and expensively.
          </p>

          <h2 className="font-display font-bold pt-4" style={{ fontSize: "1.5rem", color: "#0C1F2E" }}>What exactly is hard water?</h2>
          <p>
            Water hardness is measured by the concentration of dissolved calcium and magnesium ions. These minerals are picked up as water moves through limestone and chalk deposits in the ground. Indiana sits on significant limestone geology, which is why our water is so consistently hard.
          </p>
          <p>
            Hard water is not a health hazard in the traditional sense. You can drink it without immediate harm. The problem is what it does to everything it touches over time.
          </p>

          <h2 className="font-display font-bold pt-4" style={{ fontSize: "1.5rem", color: "#0C1F2E" }}>What hard water does to your home</h2>
          <p><strong style={{ color: "#0C1F2E" }}>Your pipes:</strong> Calcium and magnesium deposit on the interior walls of pipes over time, narrowing the diameter and restricting flow. Water heaters are especially vulnerable — a water heater operating on hard water can lose 30% of its efficiency within 5 years. That is money you are spending every month on your energy bill without realizing why.</p>
          <p><strong style={{ color: "#0C1F2E" }}>Your appliances:</strong> Dishwashers, washing machines, ice makers, and coffee makers all see shortened lifespans with hard water. The heating elements scale over, the spray arms clog, and the internal valves seize. Most manufacturers void warranties when they find evidence of scale buildup — because hard water damage is preventable.</p>
          <p><strong style={{ color: "#0C1F2E" }}>Your fixtures:</strong> That white crust around your faucet? The soap scum that won't come off your shower door? Calcium deposits. They are cosmetically annoying and can permanently etch glass and chrome over time.</p>
          <p><strong style={{ color: "#0C1F2E" }}>Your skin and hair:</strong> Hard water reacts with soap to form calcium soap scum — the same stuff on your shower door ends up on your skin. It strips moisture, clogs pores, and leaves hair dull and difficult to manage. Many people with persistent dry skin or scalp issues see dramatic improvement after softening their water.</p>
          <p><strong style={{ color: "#0C1F2E" }}>Your laundry:</strong> Clothes washed in hard water feel stiff, look dingy, and wear out faster. The minerals bond with fabric fibers and with detergent residue that fails to fully rinse out.</p>

          <h2 className="font-display font-bold pt-4" style={{ fontSize: "1.5rem", color: "#0C1F2E" }}>How to know if you have hard water</h2>
          <p>The fastest way is a free water test. We come to your home, test your water in about 30 minutes, and tell you exactly what GPG you are dealing with along with iron, pH, chlorine, and anything else present.</p>
          <p>Without a test, the signs are:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>White or gray scale deposits around faucets, showerheads, or the toilet water line</li>
            <li>Soap that doesn't lather well and leaves a film</li>
            <li>Spots on dishes and glasses even after the dishwasher</li>
            <li>Stiff laundry that fades faster than expected</li>
            <li>Dry skin or hair that's unresponsive to conditioner</li>
          </ul>

          <h2 className="font-display font-bold pt-4" style={{ fontSize: "1.5rem", color: "#0C1F2E" }}>What to do about it</h2>
          <p>There are two main approaches: traditional ion-exchange softening and no-salt conditioning.</p>
          <p><strong style={{ color: "#0C1F2E" }}>Ion-exchange water softeners</strong> replace calcium and magnesium ions with sodium ions, effectively removing the hardness minerals from the water. The result is genuinely soft water that produces lather easily, leaves no scale, and is noticeably different on skin. This is the gold standard for homes with hardness above 10 GPG.</p>
          <p><strong style={{ color: "#0C1F2E" }}>No-salt conditioners</strong> use template-assisted crystallization (TAC) to convert calcium and magnesium into a harmless crystal form that can't stick to surfaces. They don't produce the same silky feel as a traditional softener, but they prevent scale effectively without salt, brine discharge, or regeneration cycles. Best for homes that want scale prevention without the feel of softened water.</p>
          <p>Which is right for your home depends on your specific water hardness, household size, and preferences. That is exactly what a free water test is designed to figure out.</p>

          <div className="rounded-3xl p-8 border mt-8" style={{ backgroundColor: "#F0F8FF", borderColor: "rgba(18,189,251,0.18)" }}>
            <h3 className="font-display font-bold mb-3" style={{ fontSize: "1.2rem", color: "#0C1F2E" }}>Get your water tested — free, in your home</h3>
            <p className="text-sm mb-5" style={{ color: "rgba(12,31,46,0.6)" }}>We test hardness, iron, pH, chlorine, TDS, and more. Takes 30 minutes. No cost, no obligation.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }} onMouseOver={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")} onMouseOut={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}>
              Schedule Free Water Test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
