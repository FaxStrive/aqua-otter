import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";

const SLUG = "cloudy-glassware-indianapolis";
const TITLE = "Cloudy Glassware in Indianapolis: Causes and How to Fix It";
const DESCRIPTION = "Cloudy glasses out of the dishwasher in Indianapolis are almost always hard water at 16 to 19 GPG. Here is the diagnostic, the etching test, and the permanent fix.";
const URL = `https://www.myaquaotter.com/blog/${SLUG}`;
const HERO = `/images/blog-hero/${SLUG}.jpg`;
const DATE_PUBLISHED = "2026-05-17";
const DATE_MODIFIED = "2026-05-17";
const AUTHOR_NAME = "Larry Foster";
const AUTHOR_URL = "https://www.myaquaotter.com/about";

const faqs = [
  {
    q: "Why are my glasses cloudy after the dishwasher in Indianapolis?",
    a: "Indianapolis tap water averages 16 to 19 grains per gallon of hardness, and the dishwasher heats that water above 130 degrees. Hot, mineral-rich water dries on the glass and leaves behind a calcium and magnesium film. Over time, that film becomes permanent etching. A free in-home water test confirms the cause in 30 minutes.",
  },
  {
    q: "How do I tell the difference between hard water film and etching?",
    a: "Soak the glass in plain white vinegar for 15 minutes. If the cloudiness wipes off and the glass looks clear again, it is hard water film and reversible. If the cloudiness stays after vinegar, the glass surface has been micro-etched by years of mineral deposits, and that damage is permanent. The fix in both cases is to stop new hard water from reaching the dishwasher.",
  },
  {
    q: "Will more rinse aid or a stronger detergent fix this?",
    a: "No. Rinse aid masks the look of mineral residue inside the dishwasher cycle, but it cannot remove dissolved calcium and magnesium from the water. As soon as the next load runs, the residue is back. The problem is the water entering the appliance, not the cycle itself. A whole-home softener treats it at the source.",
  },
  {
    q: "Can a water softener actually save my glassware?",
    a: "Yes, if the glass is filmed but not yet etched. A properly sized softener removes the calcium and magnesium before water reaches the dishwasher, so glassware dries clear. New deposits stop forming immediately. Existing film typically wipes off within two weeks of soft water flowing through normal wash cycles.",
  },
  {
    q: "How do I know if my Indianapolis water is causing the problem?",
    a: "Citizens Energy publishes hardness data showing Marion County averages 16 to 19 GPG, which the Water Quality Association classifies as very hard. If you live in Indianapolis, Carmel, Fishers, Westfield, Zionsville, or Greenwood, the answer is almost certainly yes. We confirm exact hardness on site for free.",
  },
  {
    q: "Should I replace my glasses or wait until the water is fixed?",
    a: "Fix the water first. Replacing glasses without treating the supply means the new set is on the same etching path within months. Once a softener is in place, run a vinegar soak on existing glasses. Anything that comes back clear is fine to keep. Only the truly etched pieces need replacement.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  image: [`https://www.myaquaotter.com${HERO}`],
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: { "@type": "Person", name: AUTHOR_NAME, url: AUTHOR_URL, jobTitle: "Founder, Aqua Otter" },
  publisher: { "@type": "Organization", name: "Aqua Otter", logo: { "@type": "ImageObject", url: "https://www.myaquaotter.com/client/Black_Logo.png" } },
  mainEntityOfPage: URL,
};
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.myaquaotter.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.myaquaotter.com/blog" },
    { "@type": "ListItem", position: 3, name: TITLE, item: URL },
  ],
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE, description: DESCRIPTION, url: URL, type: "article",
    images: [{ url: HERO, width: 1200, height: 630 }],
    publishedTime: DATE_PUBLISHED, modifiedTime: DATE_MODIFIED, authors: [AUTHOR_NAME],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="pt-40 pb-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm mb-8" style={{ color: "rgba(12,31,46,0.5)" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>Diagnostic</div>

          <h1 className="font-display font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#0C1F2E" }}>
            Cloudy Glassware in Indianapolis: Causes and How to Fix It
          </h1>

          <p className="text-sm mb-8" style={{ color: "rgba(12,31,46,0.5)" }}>
            May 17, 2026 &nbsp;·&nbsp; 10 min read &nbsp;·&nbsp; By Larry Foster, Founder
          </p>

          <div className="relative w-full mb-10 rounded-3xl overflow-hidden" style={{ aspectRatio: "1200 / 630" }}>
            <Image src={HERO} alt="Diagnosing cloudy glassware caused by Indianapolis hard water" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>

          <div className="space-y-6 text-base leading-relaxed" style={{ color: "rgba(12,31,46,0.75)" }}>
            <p data-bluf className="text-lg font-medium" style={{ color: "#0C1F2E" }}>
              Cloudy glassware out of the dishwasher in Indianapolis is almost always hard water film, the calcium and magnesium left behind when 16 to 19 GPG tap water dries at 130-plus degrees. The vinegar test tells you whether it is reversible film or permanent etching. Either way, the only durable fix is treating the water before it reaches the appliance, not switching detergents.
            </p>

            <div className="rounded-2xl p-6 my-2" style={{ backgroundColor: "#F0F8FF", border: "1px solid rgba(18,189,251,0.18)" }}>
              <p className="text-sm font-semibold mb-2" style={{ color: "#0C1F2E" }}>Confirm the cause in 30 minutes, free</p>
              <p className="text-sm mb-4" style={{ color: "rgba(12,31,46,0.65)" }}>We test hardness, iron, chlorine, and pH in your home. Call <a href="tel:+13179616925" className="font-semibold underline" style={{ color: "#12BDFB" }}>(317) 961-6925</a> or book online.</p>
              <Link href="/get-started" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>
                Schedule free water test <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What is actually on the glass</h2>
            <p>
              Open the dishwasher in a typical Indianapolis home and the wine glasses look like fog rolled through. What you are seeing is mineral residue, mostly calcium carbonate and magnesium carbonate, left behind when the rinse water evaporated. In a softer-water market that residue would barely register. In Marion County, where Citizens Energy water consistently tests 16 to 19 GPG, every cycle deposits visible minerals on every surface. Our <Link href="/learn/water-hardness-gpg-explained" style={{ color: "#12BDFB" }}>hardness explainer</Link> walks through the GPG scale and where Indianapolis falls on it.
            </p>
            <p>
              The dishwasher makes this worse than it would be at a faucet. Inside the tub, water is heated above 130 degrees, which increases mineral precipitation. The drying cycle then bakes that residue onto the glass surface. Over months and years, repeated cycles transition the film from "wipes off with vinegar" to micro-pitting in the glass itself. By the time most homeowners notice, both stages are happening at once. See the related <Link href="/blog/white-spots-on-faucets-indianapolis" style={{ color: "#12BDFB" }}>faucet spotting diagnostic</Link> for the same chemistry playing out on chrome.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Film versus etching: the vinegar test</h2>
            <p>
              Two things look identical at a glance but have different prognoses. Hard water film sits on top of the glass and can be removed. Etching is permanent microscopic damage to the glass surface caused by repeated mineral deposition and dishwasher detergents working in combination. The vinegar test takes five minutes and tells you which one you have.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong style={{ color: "#0C1F2E" }}>Soak one cloudy glass in undiluted white vinegar for 15 minutes.</strong></li>
              <li><strong style={{ color: "#0C1F2E" }}>Rinse with cool water and dry with a clean microfiber cloth.</strong></li>
              <li><strong style={{ color: "#0C1F2E" }}>Hold the glass up to a window.</strong> Clear means film, reversible. Still cloudy means etching, permanent.</li>
            </ul>
            <p>
              Most Indianapolis homes that have been on city water for under 3 years show film only. Homes that have run untreated water through a dishwasher for 5-plus years usually show some etching on heavily used pieces. The good news in either case is identical: once new soft water flows through the cycle, the deposit stops growing. Filmed glass returns to clear within a few cycles. Etched glass stays as-is but does not get worse. Book a <Link href="/contact" style={{ color: "#12BDFB" }}>free water test</Link> to confirm hardness before deciding on next steps.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Recommended method: condition to action</h2>
            <p>
              Match what you see in the dishwasher to the right next step. Each row below maps to a real pattern we see on diagnostic visits across <Link href="/indiana" style={{ color: "#12BDFB" }}>Indiana</Link>.
            </p>
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "#F0F8FF" }}>
                    <th className="text-left p-3 font-semibold" style={{ color: "#0C1F2E" }}>If you see...</th>
                    <th className="text-left p-3 font-semibold" style={{ color: "#0C1F2E" }}>Recommended action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">Cloudy glasses that clear after a vinegar soak</td><td className="p-3">Install an <Link href="/systems/water-softener" style={{ color: "#12BDFB" }}>ion-exchange softener</Link>, run vinegar rinse on existing glasses</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">Cloudy glasses that stay cloudy after vinegar</td><td className="p-3">Softener now to stop further damage, replace heavily etched pieces over time</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">Cloudiness plus orange or brown spots</td><td className="p-3">Softener plus iron filter, paired install</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">Cloudiness only on plastic, not glass</td><td className="p-3">Usually detergent residue, run a hot rinse-only cycle empty first</td>
                  </tr>
                  <tr>
                    <td className="p-3">Drinking water also tastes chalky or flat</td><td className="p-3">Softener plus <Link href="/systems/reverse-osmosis" style={{ color: "#12BDFB" }}>under-sink RO</Link> for kitchen tap</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Why detergent and rinse aid will not solve it</h2>
            <p>
              Almost every homeowner we visit has already tried switching detergents, increasing the dose, and topping off the rinse aid reservoir. None of it works for long. The reason is straightforward: detergent and rinse aid both operate inside the wash cycle. The film on the glass forms during the drying stage, when water evaporates and leaves dissolved minerals behind. There is no detergent on the planet that can prevent calcium and magnesium from staying on the surface once the water is gone.
            </p>
            <p>
              Rinse aid lowers water surface tension so droplets sheet off instead of beading. That helps marginally on glassware in lower-hardness markets. At 16-plus GPG, even a sheeted film still leaves a visible deposit. The same logic applies to "softening" dishwasher detergents that promise a built-in water conditioner. They contain small amounts of chelating agents that can soak up a fraction of the calcium present in one tub of water, but they cannot keep up with the steady supply of minerals coming in through your supply line cycle after cycle. The math just does not work. Read what our customers say after we treated the supply on our <Link href="/reviews" style={{ color: "#12BDFB" }}>reviews page</Link>.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What the dishwasher itself is doing while this happens</h2>
            <p>
              Cloudy glasses are the visible symptom. Inside the appliance, the same minerals are accumulating on parts you cannot see. The heating element on the basin floor scales over first, which slowly forces longer cycle times to reach the same temperature. The spray arms clog at the jet outlets, weakening rinse pressure. The detergent dispenser door spring eventually stiffens with mineral deposit. By year four or five on Indianapolis water, the appliance is running slower, washing weaker, and using more energy than it did new. Dig into the broader pattern in our <Link href="/blog/hard-water-indiana" style={{ color: "#12BDFB" }}>full hard water in Indiana</Link> overview.
            </p>
            <p>
              The water heater is an even bigger problem. When the dishwasher draws hot water, it pulls from a tank where calcium has been precipitating onto the heating element for the entire life of the appliance. In an Indianapolis home, that means hot water entering the dishwasher already carries a load of suspended mineral particulate, which then deposits in the dishwasher in addition to whatever the cold supply brings. Treating the water upstream of the heater addresses both at once. See the chemistry behind it on our <Link href="/learn/how-ion-exchange-softening-works" style={{ color: "#12BDFB" }}>ion-exchange softening</Link> page.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What happens after a softener install</h2>
            <p>
              When we install a properly sized softener in an Indianapolis home, the dishwasher difference is among the fastest things our customers notice. Within the first three cycles after install, glasses come out of the wash with visible improvement. By the end of week one, a glass that was filmed will typically return to clear, because soft water actively redissolves recent mineral deposits during the wash cycle. By week two, most homeowners report they have stopped reaching for rinse aid entirely, since soft water sheets off the glass cleanly on its own.
            </p>
            <p>
              The change extends past the dishwasher. Skin feels less tight after showering because soap rinses off completely rather than leaving a mineral-bound residue. Towels dry softer because the fibers are no longer locked in by precipitated calcium. Coffee makers stop scaling. The kitchen faucet stays bright. Soap doses drop by roughly half across laundry and dish washing because most of what soap was doing before was fighting hardness rather than cleaning. See <Link href="/case-studies" style={{ color: "#12BDFB" }}>case studies</Link> from real Indianapolis installs and look up unfamiliar terms in our <Link href="/glossary" style={{ color: "#12BDFB" }}>glossary</Link>.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Indianapolis neighborhoods where this is worst</h2>
            <p>
              Not every Indianapolis ZIP tests the same. Citizens Energy blends water from multiple sources, and certain northern suburbs consistently run higher hardness than downtown. The patterns are stable year over year and align closely with where we see the worst dishwasher complaints.
            </p>
            <p>
              <Link href="/service-areas/carmel-in" style={{ color: "#12BDFB" }}>Carmel</Link>, <Link href="/service-areas/westfield-in" style={{ color: "#12BDFB" }}>Westfield</Link>, and <Link href="/service-areas/zionsville-in" style={{ color: "#12BDFB" }}>Zionsville</Link> consistently test 19 to 21 GPG. Glassware in untreated homes there typically shows etching by year three. Northern <Link href="/service-areas/fishers-in" style={{ color: "#12BDFB" }}>Fishers</Link> and north-side Indianapolis ZIPs (46220, 46240, 46250, 46260) run 17 to 19 GPG. Downtown and near-east-side homes test slightly lower at 15 to 18 GPG. South-side suburbs like <Link href="/service-areas/greenwood-in" style={{ color: "#12BDFB" }}>Greenwood</Link> drop into the 15 to 17 GPG range. Every one of these exceeds the Water Quality Association "very hard" threshold of 10 GPG, so dishwasher cloudiness is a near-universal problem across our service area. Get the local context in our <Link href="/blog/indianapolis-tap-water-quality-2026" style={{ color: "#12BDFB" }}>Indianapolis tap water quality 2026</Link> article.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>The well water variant of this problem</h2>
            <p>
              If you are on a private well outside the Citizens Energy service area, the diagnostic is similar but the chemistry can be more aggressive. Indiana well water frequently runs 20 to 30 GPG hardness with measurable iron, manganese, and occasionally hydrogen sulfide. Dishwasher cloudiness on well water often shows orange or yellow undertones from iron oxidation, and rinses can carry a metallic smell. The fix is similar (an ion-exchange softener) but sized larger and frequently paired with an iron filter or oxidizing pre-treatment. Read more in our <Link href="/blog/well-water-testing" style={{ color: "#12BDFB" }}>well water testing</Link> guide and our <Link href="/systems/well-water" style={{ color: "#12BDFB" }}>well water systems</Link> overview.
            </p>
            <p>
              Well-water households also benefit more dramatically from softening because the starting condition is worse. We have seen Indiana farmhouse glasses go from permanently etched to clear-after-vinegar within two weeks of a softener and iron filter being commissioned. The dishwasher itself runs noticeably quieter once the mineral load drops, since the heating element no longer has to push through a layer of insulating scale.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>How we approach a diagnostic visit</h2>
            <p>
              Calls about cloudy glassware almost always start with a 30-minute in-home water test. We measure hardness in grains per gallon, iron in parts per million, chlorine, total dissolved solids, and pH. That gives us a verified water profile rather than an assumption. We also walk through the appliances themselves: dishwasher age, water heater age, any softener already present, and whether plumbing is copper, PEX, or galvanized. The full process is laid out on our <Link href="/how-it-works" style={{ color: "#12BDFB" }}>how it works</Link> page.
            </p>
            <p>
              If a softener is the answer, we size the unit using measured GPG times verified daily household water use, not a one-size-fits-all spec sheet. The system is installed at the point of entry to the home with a bypass valve so it can be isolated for service. After commissioning we verify at the kitchen tap that hardness reads 0 to 1 GPG and soap lathers immediately. We follow up at 30 days to confirm regeneration timing is correct and the cloudiness is gone. Installations come with our standard <Link href="/warranty" style={{ color: "#12BDFB" }}>workmanship and equipment warranty</Link>. Browse common questions on our <Link href="/faq" style={{ color: "#12BDFB" }}>FAQ</Link> page before you book.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Call a professional if</h2>
            <p>
              Some patterns in dishwasher cloudiness signal more than a hardness problem. Schedule a diagnostic visit if you notice any of the following.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cloudiness has orange, brown, or yellow undertones, which suggests iron or manganese.</li>
              <li>Glass clouds within a single cycle of a freshly cleaned dishwasher, which indicates extreme hardness or possibly silica.</li>
              <li>The vinegar test does not clear film at all, suggesting the residue is something other than calcium scale.</li>
              <li>Dishwasher cycles have lengthened by more than 15 minutes over the last year, indicating internal scaling.</li>
              <li>Hot water pressure has dropped at fixtures throughout the home, suggesting the water heater is scaled.</li>
              <li>You are on a private well and have not tested water in more than 12 months.</li>
            </ul>
            <p>
              These conditions are common in older Indianapolis homes and across <Link href="/service-areas" style={{ color: "#12BDFB" }}>our 6-state territory</Link>. A free water test rules out the simple causes and isolates the real one before you spend money on the wrong fix.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What you can do today, before the install</h2>
            <p>
              While you wait on a diagnostic, a few short-term steps reduce visible cloudiness without addressing the root cause. Run an empty dishwasher cycle with two cups of white vinegar in the upper rack. That descales the spray arms and heating element temporarily. Soak the worst glasses in undiluted vinegar overnight, then handwash with warm soapy water. Turn down the rinse aid setting one notch, since most Indianapolis homes have it dialed too high in a doomed attempt to compensate for hardness.
            </p>
            <p>
              These are stopgaps. Within a week or two of the next several wash cycles, the cloudiness returns. The reason is unchanged: incoming water is still 16-plus GPG and still depositing minerals every dry cycle. Use this window to test the water and plan the permanent fix rather than chasing the symptom indefinitely. Filter and detergent choices matter less than supply chemistry, which our <Link href="/learn/what-we-filter" style={{ color: "#12BDFB" }}>what we filter</Link> page explains in depth.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Why a no-salt conditioner is a partial answer for glassware</h2>
            <p>
              A common question on diagnostic visits is whether a <Link href="/systems/no-salt" style={{ color: "#12BDFB" }}>no-salt conditioner</Link> will solve the dishwasher problem. The honest answer is "sometimes, depending on hardness." A template-assisted crystallization conditioner changes calcium and magnesium into a non-sticking crystal form, which reduces scale formation on heated surfaces and inside pipes. That helps the water heater and dishwasher heating element live longer. What it does not do, reliably at 16-plus GPG, is prevent the visible film on glassware.
            </p>
            <p>
              The reason is that the minerals are still dissolved in the water when the dishwasher cycle ends. When that water evaporates off a glass, the minerals stay behind, in crystallized form rather than as scale, but still visible. In our experience, no-salt systems perform well on glassware at 10 to 12 GPG, partially at 13 to 15 GPG, and poorly above 16 GPG. Since virtually no Indianapolis address falls below 15 GPG, ion-exchange softening remains the right answer for the dishwasher problem here. Our breakdown of the tradeoffs is in the <Link href="/blog/softener-vs-no-salt" style={{ color: "#12BDFB" }}>softener versus no-salt comparison</Link>.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What to look for when you compare softeners</h2>
            <p>
              Once you have decided to address the water supply, the next decision is which softener to install. The basic ion-exchange chemistry is the same across every brand, but the components vary widely in capacity, control valve quality, and resin life. We focus on three things when sizing a system for an Indianapolis home. First, the grain capacity must match measured hardness times verified daily water use, with enough headroom that the unit regenerates every 4 to 10 days rather than every day or every three weeks. Second, the control valve should be demand-initiated rather than time-clock, so it regenerates based on water used rather than on a fixed schedule. Third, the resin should be a quality cation exchange resin rated for at least a 10-year service life under Indianapolis chlorine levels.
            </p>
            <p>
              The full system specs live on our <Link href="/systems/water-softener" style={{ color: "#12BDFB" }}>water softener page</Link>. The equipment we install is NSF-certified, and our installs come with a written workmanship and equipment <Link href="/warranty" style={{ color: "#12BDFB" }}>warranty</Link>. If you have a private well rather than city water, the conversation also includes iron filtration and possibly oxidation pre-treatment, since well chemistry is more variable than Citizens Energy supply.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Frequently asked questions</h2>
            <div className="space-y-5">
              {faqs.map(f => (
                <div key={f.q}>
                  <p className="font-semibold mb-1" style={{ color: "#0C1F2E" }}>{f.q}</p>
                  <p style={{ color: "rgba(12,31,46,0.7)" }}>{f.a}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl p-8 border mt-10" style={{ backgroundColor: "#F0F8FF", borderColor: "rgba(18,189,251,0.18)" }}>
              <h3 className="font-display font-bold mb-3" style={{ fontSize: "1.3rem", color: "#0C1F2E" }}>Get clear glasses back. Start with a free test.</h3>
              <p className="text-sm mb-5" style={{ color: "rgba(12,31,46,0.7)" }}>4.8 stars across 55 reviews. NSF-certified equipment. Serving <Link href="/service-areas/indianapolis-in" style={{ color: "#12BDFB" }}>Indianapolis</Link>, <Link href="/service-areas/carmel-in" style={{ color: "#12BDFB" }}>Carmel</Link>, <Link href="/service-areas/fishers-in" style={{ color: "#12BDFB" }}>Fishers</Link>, and all of central Indiana.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>
                  Schedule free water test <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+13179616925" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border" style={{ borderColor: "#12BDFB", color: "#0C1F2E" }}>
                  <Phone className="w-4 h-4" /> (317) 961-6925
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
