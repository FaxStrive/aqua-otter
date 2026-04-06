import Hero from "@/components/sections/Hero";
import WaterQualityChecker from "@/components/sections/WaterQualityChecker";
import TrustBar from "@/components/sections/TrustBar";
import { InlineCTA } from "@/components/InlineCTA";
import { TestimonialStrip } from "@/components/TestimonialStrip";
import { FactStrip } from "@/components/FactStrip";
import { ActivityFeed } from "@/components/ActivityFeed";
import { BeforeAfter } from "@/components/BeforeAfter";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";
import WaveDivider from "@/components/ui/WaveDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <WaterQualityChecker />
      <TrustBar />

      <FactStrip
        variant="warning"
        text="Indiana well water contains 3x the national average of iron and hardness — is your family protected?"
        highlight="3x the national average"
      />

      <InlineCTA
        variant="banner"
        text="Your Water Could Be Affecting Your Family's Health"
        message="Schedule a free in-home water test and find out exactly what's in your water. No cost, no obligation."
      />

      <Services />

      <TestimonialStrip
        quote="Best decision we ever made for our family. The water tastes incredible and our skin feels so much better."
        author="The Johnson Family"
        location="Fishers, IN"
      />

      {/* white → surface */}
      <WaveDivider variant="wave2" topColor="#ffffff" bottomColor="#f8fafb" />
      <About />

      <FactStrip
        variant="didyouknow"
        text="The average American family spends $1,200/year on bottled water. A whole-home system costs less than $1/day."
        highlight="$1,200/year"
      />

      <InlineCTA
        variant="button"
        text="Get My FREE Water Test"
        trustLine="No cost, no obligation — takes less than 30 minutes"
      />

      {/* white (InlineCTA bg) → dark */}
      <WaveDivider variant="ripple" topColor="#ffffff" bottomColor="#164e63" />
      <Process />

      {/* dark → white */}
      <WaveDivider variant="wave1" topColor="#164e63" bottomColor="#ffffff" />

      <TestimonialStrip
        quote="We had orange stains everywhere. After Aqua Otter installed our system, it was like moving into a new house."
        author="Mike & Sarah T."
        location="Noblesville, IN"
      />

      <SavingsCalculator />

      <BeforeAfter />

      <ActivityFeed />

      <InlineCTA
        variant="banner"
        text="Stop Spending on Bottled Water"
        message="A whole-home water system pays for itself. Get started with a free water test today."
      />

      <Gallery />

      <FactStrip
        variant="stat"
        text="Hard water reduces appliance lifespan by up to 30% — costing homeowners thousands in early replacements."
        highlight="30%"
      />

      <TestimonialStrip
        quote="I was skeptical, but the free water test showed things I never expected. So glad we made the switch."
        author="David R."
        location="Carmel, IN"
      />

      {/* white → surface */}
      <WaveDivider variant="wave3" topColor="#ffffff" bottomColor="#f8fafb" />
      <FAQ />

      <InlineCTA
        variant="text"
        text="Have more questions? Talk to a water expert today"
        href="/contact"
      />

      {/* white (InlineCTA bg) → dark */}
      <WaveDivider variant="wave2" topColor="#ffffff" bottomColor="#164e63" />
      <Stats />
      <CTA />
    </>
  );
}
