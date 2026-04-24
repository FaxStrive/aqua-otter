import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import ConversionBridge from "@/components/sections/ConversionBridge";
import PhotoStrip from "@/components/sections/PhotoStrip";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";
import StickyBar from "@/components/StickyBar";
import ZipLookup from "@/components/sections/ZipLookup";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import CityVsWellFunnel from "@/components/sections/CityVsWellFunnel";
import HouseDiagram from "@/components/sections/HouseDiagram";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ZipLookup />
      <CityVsWellFunnel />
      <HouseDiagram />
      <ConversionBridge />
      <PhotoStrip />
      <Stats />
      <SavingsCalculator />
      <Testimonials />
      <Gallery />
      <CTA />
      <StickyBar />
    </>
  );
}
