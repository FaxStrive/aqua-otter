"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";


export default function WellWaterTestingPost() {
  return (
    <article className="pt-40 pb-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-site max-w-2xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors" style={{ color: "rgba(12,31,46,0.4)" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>Well Water</div>

        <h1 className="font-display font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#0C1F2E" }}>
          Well Water Testing: Why You Should Test Every Year
        </h1>

        <p className="text-sm mb-10" style={{ color: "rgba(12,31,46,0.4)" }}>March 28, 2026 &nbsp;·&nbsp; 5 min read &nbsp;·&nbsp; By the Aqua Otter Team</p>

        <div className="space-y-6 text-base leading-relaxed" style={{ color: "rgba(12,31,46,0.65)" }}>
          <p>
            If your home is on a private well, you are your own water utility. The EPA sets standards for municipal water suppliers and requires regular testing. No one is watching your well.
          </p>
          <p>
            This is not meant to alarm you — most well water in Indiana and Michigan is safe. But it can change. And you won't know until something goes wrong, or until you test.
          </p>

          <h2 className="font-display font-bold pt-4" style={{ fontSize: "1.5rem", color: "#0C1F2E" }}>Why well water quality changes over time</h2>
          <p>Your well draws water from an aquifer — essentially an underground layer of rock and sediment saturated with water. What's in that water depends on the local geology, what's happening on the surface above it, and how your well is constructed and maintained.</p>
          <p>Several things can shift your water quality without any warning:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong style={{ color: "#0C1F2E" }}>Seasonal changes:</strong> Spring runoff and heavy rain can introduce bacteria, agricultural chemicals, and sediment into shallow aquifers. This is the time of year when coliform contamination is most common in Indiana wells.</li>
            <li><strong style={{ color: "#0C1F2E" }}>Drought:</strong> When water tables drop, minerals become more concentrated. Iron, manganese, and hardness levels can spike significantly during dry periods.</li>
            <li><strong style={{ color: "#0C1F2E" }}>Nearby agricultural activity:</strong> Fertilizers and pesticides can migrate through soil into groundwater, especially in areas with clay-heavy soil that doesn't filter effectively.</li>
            <li><strong style={{ color: "#0C1F2E" }}>Well casing degradation:</strong> Older wells can develop cracks or gaps in the casing that allow surface water or contaminants to enter directly.</li>
            <li><strong style={{ color: "#0C1F2E" }}>Nearby construction or development:</strong> Ground disturbance can alter groundwater flow patterns and introduce new contaminants.</li>
          </ul>

          <h2 className="font-display font-bold pt-4" style={{ fontSize: "1.5rem", color: "#0C1F2E" }}>What to test for</h2>
          <p>At minimum, well water should be tested annually for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong style={{ color: "#0C1F2E" }}>Coliform bacteria</strong> — the presence of coliform (including E. coli) indicates potential fecal contamination. This is the most critical test.</li>
            <li><strong style={{ color: "#0C1F2E" }}>Nitrates</strong> — especially important for households with infants under 6 months. High nitrates can cause blue baby syndrome.</li>
            <li><strong style={{ color: "#0C1F2E" }}>Iron and manganese</strong> — the source of orange and black staining, metallic taste, and appliance damage.</li>
            <li><strong style={{ color: "#0C1F2E" }}>pH</strong> — acidic water (below 7.0) corrodes copper pipes from the inside. This shows up as blue-green staining around drains.</li>
            <li><strong style={{ color: "#0C1F2E" }}>Hardness</strong> — well water is often harder than city water. Knowing your GPG is essential for choosing the right treatment.</li>
            <li><strong style={{ color: "#0C1F2E" }}>Hydrogen sulfide (sulfur)</strong> — the rotten egg smell. Very low concentrations are detectable by smell; testing confirms the concentration.</li>
          </ul>
          <p>If you've never had your well tested, or it's been more than 3 years, you should also consider testing for arsenic and VOCs (volatile organic compounds), which are less common but serious where they exist.</p>

          <h2 className="font-display font-bold pt-4" style={{ fontSize: "1.5rem", color: "#0C1F2E" }}>What to do if you find a problem</h2>
          <p>The right treatment depends entirely on what you find. Iron requires a different approach than bacteria, which requires a different approach than hard water or pH imbalance. Many wells have multiple issues simultaneously.</p>
          <p>Our well water systems are designed to handle the specific combinations we see most often in Indiana and Michigan: iron and hardness together, iron and sulfur, bacteria with iron, pH correction paired with filtration. We design the system after seeing your test results — not before.</p>

          <div className="rounded-3xl p-8 border mt-8" style={{ backgroundColor: "#F0F8FF", borderColor: "rgba(18,189,251,0.18)" }}>
            <h3 className="font-display font-bold mb-3" style={{ fontSize: "1.2rem", color: "#0C1F2E" }}>We test well water. Free.</h3>
            <p className="text-sm mb-5" style={{ color: "rgba(12,31,46,0.6)" }}>We come to your home and run a comprehensive well water panel — iron, sulfur, bacteria indicators, pH, hardness, TDS, and more. No cost, no obligation.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }} onMouseOver={e => (e.currentTarget.style.backgroundColor = "#3DCFFF")} onMouseOut={e => (e.currentTarget.style.backgroundColor = "#12BDFB")}>
              Schedule Free Well Water Test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
