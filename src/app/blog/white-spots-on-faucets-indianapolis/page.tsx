import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";

const SLUG = "white-spots-on-faucets-indianapolis";
const TITLE = "White Spots on Faucets Indianapolis: Hard Water Diagnostic";
const DESCRIPTION = "White spots on Indianapolis faucets are almost always hard water scale. Use this diagnostic to confirm and fix it. Free water test from Aqua Otter.";
const URL = `https://www.myaquaotter.com/blog/${SLUG}`;
const HERO = `/images/blog-hero/${SLUG}.jpg`;
const DATE_PUBLISHED = "2026-05-17";
const DATE_MODIFIED = "2026-05-17";
const AUTHOR_NAME = "Larry Foster";
const AUTHOR_URL = "https://www.myaquaotter.com/about";

const faqs = [
  {
    q: "Why are there white spots on my Indianapolis faucets?",
    a: "White spots on Indianapolis faucets are almost always calcium and magnesium scale left behind when hard water evaporates. Citizens Energy water typically tests 16 to 19 GPG, so any time tap water dries on chrome, it leaves visible mineral residue that builds up over weeks.",
  },
  {
    q: "How do I tell if it is hard water scale or something else?",
    a: "Hard water scale is chalky white, slightly powdery, and wipes off easier with vinegar than with soap. If the spots are rust-colored or brown, you likely have iron. If it is a slick film that smears, it is more likely soap scum. A free water test confirms the cause in 30 minutes.",
  },
  {
    q: "Will a water softener stop the white spots completely?",
    a: "Yes. A properly sized ion-exchange softener removes calcium and magnesium before they reach your fixtures, so water dries clean with no spotting on faucets, showers, or glass. Most Indianapolis customers see fixtures stay clean for the first time within days of the install.",
  },
  {
    q: "Can hard water actually damage my faucets?",
    a: "Yes. Long-term scale buildup pits chrome, clogs aerators, and seizes valve cartridges. Many Indianapolis faucets fail 3 to 7 years earlier on untreated water. Replacing the water source is far cheaper than replacing fixtures every few years.",
  },
  {
    q: "How do I clean white scale off my faucets right now?",
    a: "Soak a cloth in white vinegar, wrap it around the faucet for 15 minutes, then wipe with a soft cloth. Avoid abrasive scrubbers on chrome or brushed-nickel finishes. This is a short-term fix only. If the spots are back within a week, you need to treat the water itself.",
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
            White Spots on Faucets Indianapolis: Hard Water Diagnostic
          </h1>

          <p className="text-sm mb-8" style={{ color: "rgba(12,31,46,0.5)" }}>
            May 17, 2026 &nbsp;·&nbsp; 8 min read &nbsp;·&nbsp; By Larry Foster, Founder
          </p>

          <div className="relative w-full mb-10 rounded-3xl overflow-hidden" style={{ aspectRatio: "1200 / 630" }}>
            <Image src={HERO} alt="Diagnosing white spots on faucets in Indianapolis from hard water" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>

          <div className="space-y-6 text-base leading-relaxed" style={{ color: "rgba(12,31,46,0.75)" }}>
            <p data-bluf className="text-lg font-medium" style={{ color: "#0C1F2E" }}>
              White spots on Indianapolis faucets are almost always hard-water scale, the chalky residue calcium and magnesium leave behind when tap water evaporates. With Citizens Energy water testing 16 to 19 GPG, every drip dries to a visible deposit. The fix is treating the water at the point of entry, not endlessly polishing fixtures.
            </p>

            <div className="rounded-2xl p-6 my-2" style={{ backgroundColor: "#F0F8FF", border: "1px solid rgba(18,189,251,0.18)" }}>
              <p className="text-sm font-semibold mb-2" style={{ color: "#0C1F2E" }}>Get the cause confirmed in 30 minutes</p>
              <p className="text-sm mb-4" style={{ color: "rgba(12,31,46,0.65)" }}>We test hardness, iron, chlorine, and pH free in your home. Call <a href="tel:+13179616925" className="font-semibold underline" style={{ color: "#12BDFB" }}>(317) 961-6925</a>.</p>
              <Link href="/get-started" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>
                Schedule free water test <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What those white spots actually are</h2>
            <p>
              The chalky white residue you scrape off Indianapolis faucets is calcium carbonate and magnesium carbonate. When mineral-rich water sits on a fixture and evaporates, the water leaves but the dissolved minerals stay, drying into a thin crust. On chrome it looks dull and spotted. On brushed nickel it looks foggy. On glass shower doors it etches in over time.
            </p>
            <p>
              Indianapolis is a near-perfect storm for this. Marion County water averages 17 GPG. <Link href="/service-areas/carmel-in" style={{ color: "#12BDFB" }}>Carmel</Link> averages 19. <Link href="/service-areas/zionsville-in" style={{ color: "#12BDFB" }}>Zionsville</Link> regularly hits 21. The Water Quality Association classifies anything above 10 GPG as "very hard," so virtually every Marion and Hamilton County home has visible scale within weeks of a fixture being installed. If you have ever wondered why a brand-new faucet looks dull in a month, the water is the answer. Our <Link href="/learn/water-hardness-gpg-explained" style={{ color: "#12BDFB" }}>hardness explainer</Link> goes deeper.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Confirm it is hard water and not something else</h2>
            <p>
              Most white spots are scale, but not all. Walk through this short checklist before assuming a softener is the fix.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong style={{ color: "#0C1F2E" }}>Color test.</strong> Pure scale is chalky white or gray. Brown or orange tints mean iron is in the water too. Greenish tints can indicate copper from corroding plumbing.</li>
              <li><strong style={{ color: "#0C1F2E" }}>Vinegar test.</strong> Soak a paper towel in white vinegar and lay it on the spot for 10 minutes. If the residue dissolves, it is calcium scale. If it does not budge, it is something else (possibly silica or soap scum).</li>
              <li><strong style={{ color: "#0C1F2E" }}>Glass test.</strong> Check your dishwasher glassware. Spotted glass and a film on dark plates almost always confirm hardness as the cause.</li>
              <li><strong style={{ color: "#0C1F2E" }}>Shower test.</strong> Run your shower for one minute, dry the wall, and check for visible spotting as it dries. Indianapolis homes without softening always spot.</li>
            </ul>
            <p>
              If two or more of these tests come back positive for scale, you almost certainly have a hardness problem. A <Link href="/contact" style={{ color: "#12BDFB" }}>free 30-minute water test</Link> from Aqua Otter gives you a verified GPG number, plus iron, chlorine, and TDS.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Recommended method: condition to action</h2>
            <p>
              Match your situation to the right next step. Each row below corresponds to what we see on real diagnostic visits across <Link href="/indiana" style={{ color: "#12BDFB" }}>Indiana</Link>.
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
                    <td className="p-3">White spots on chrome that wipe off with vinegar</td><td className="p-3">Install an <Link href="/systems/water-softener" style={{ color: "#12BDFB" }}>ion-exchange softener</Link></td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">White scale plus orange or brown staining</td><td className="p-3">Softener plus iron filter, paired install</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">Spots on glass shower door, etched in</td><td className="p-3">Softener now, refinish or replace glass after</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">Hate the feel of softened water</td><td className="p-3"><Link href="/systems/no-salt" style={{ color: "#12BDFB" }}>No-salt conditioner</Link> if hardness is 15 GPG or below</td>
                  </tr>
                  <tr>
                    <td className="p-3">Drinking water tastes chalky too</td><td className="p-3">Softener plus <Link href="/systems/reverse-osmosis" style={{ color: "#12BDFB" }}>under-sink RO</Link> for taste</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Why polishing your fixtures will not fix it</h2>
            <p>
              The most common thing we hear on a service call is "I clean the faucets every weekend." That works for about three days. The reason: in an Indianapolis home, every gallon of water that hits a fixture deposits roughly 17 grains of dissolved hardness, and a four-person household passes 250 to 400 gallons across faucets and showerheads every single day. You are not losing the cleaning war because you are doing it wrong. You are losing it because the water keeps refilling the deposit.
            </p>
            <p>
              Treating the water at the point of entry stops the problem at the source. Once a properly sized softener is dialed in, the calcium and magnesium are removed before water ever reaches your faucet. Fixtures dry clean. Glass stays clear. Aerators stop clogging. Most of our Indianapolis customers tell us within the first week that they cannot remember the last time the bathroom looked this clean. Read what they say on our <Link href="/reviews" style={{ color: "#12BDFB" }}>reviews page</Link>.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What it looks like to fix it for good</h2>
            <p>
              When an Indianapolis homeowner books an Aqua Otter install for the white-spot problem, here is what the day actually looks like.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>30-minute on-site water test, including GPG, iron, chlorine, and TDS.</li>
              <li>System sized to household and verified hardness using <Link href="/learn/how-ion-exchange-softening-works" style={{ color: "#12BDFB" }}>ion-exchange capacity math</Link>.</li>
              <li>Install in a half-day for most standard tie-ins. Older homes occasionally need a full day.</li>
              <li>Bypass valve installed so you can isolate the unit for service without shutting off the home.</li>
              <li>Salt loaded, valve programmed to demand-initiate, and we walk you through service steps in person.</li>
              <li>Workmanship and equipment <Link href="/warranty" style={{ color: "#12BDFB" }}>warranty</Link> documents handed over before we leave.</li>
            </ul>
            <p>
              Indianapolis customers typically notice the difference inside the first 48 hours. Faucets dry without spots. Soap lathers without effort. By week two, the scale that was already on the fixtures starts to soften and wipe off easily because incoming water no longer recharges the deposit.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Where in Indianapolis the spotting is worst</h2>
            <p>
              Not all Indianapolis neighborhoods test the same. The Citizens Energy distribution system blends water from several reservoirs and wells, and the closer you are to certain treatment plants, the higher the hardness reading at your tap. Across the homes we test, the patterns are consistent year over year.
            </p>
            <p>
              Hamilton County is the highest-hardness territory we serve. <Link href="/service-areas/carmel-in" style={{ color: "#12BDFB" }}>Carmel</Link>, <Link href="/service-areas/westfield-in" style={{ color: "#12BDFB" }}>Westfield</Link>, <Link href="/service-areas/zionsville-in" style={{ color: "#12BDFB" }}>Zionsville</Link>, and northern <Link href="/service-areas/fishers-in" style={{ color: "#12BDFB" }}>Fishers</Link> regularly test 19 to 21 GPG. Glass shower doors in these homes etch within 18 months of construction unless treated water is in use. North-side Indianapolis ZIPs (46220, 46240, 46250, 46260) typically test 17 to 19 GPG. Downtown and near-east-side homes are slightly lower at 15 to 18 GPG. South-side suburbs like <Link href="/service-areas/greenwood-in" style={{ color: "#12BDFB" }}>Greenwood</Link> drop into the 15 to 17 GPG range. Anything 10 GPG and above is "very hard" by the Water Quality Association standard, so every one of these neighborhoods produces visible spotting.
            </p>
            <p>
              That regional pattern matters when you are getting quotes. A 32,000-grain softener that is undersized in <Link href="/service-areas/carmel-in" style={{ color: "#12BDFB" }}>Carmel</Link> would be appropriately sized in some lower-hardness markets, which is one reason national-average specs do not always fit Indianapolis homes.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What the scale is doing where you cannot see it</h2>
            <p>
              Visible scale on faucets is the cosmetic symptom. The expensive damage happens out of sight. Inside the tank of your water heater, calcium and magnesium precipitate at the bottom and bake onto the heating element or burner plate. That insulating crust forces the heater to run longer to reach temperature, which is exactly how an Indianapolis hard-water household loses 10 to 25 percent of its water-heating efficiency over the first 3 to 5 years of the appliance's life.
            </p>
            <p>
              Inside a dishwasher, scale builds up on spray-arm jets and on the heating element under the basin, which is why "spotty glassware" almost always coexists with longer cycle times and weaker rinse pressure. Inside washing machines, scale narrows the inlet solenoid passages and reduces hot-water flow. Inside the home plumbing itself, every elbow, valve, and fixture aerator slowly narrows. In severe cases on private wells with 25-plus GPG hardness, we have replaced copper supply lines because the internal diameter was reduced by more than half. Read more about the <Link href="/blog/hard-water-indiana" style={{ color: "#12BDFB" }}>full impact of Indiana hard water</Link> on appliances and plumbing.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>The order of operations for a permanent fix</h2>
            <p>
              When an Indianapolis homeowner books our diagnostic, here is the order we walk through, in plain language. Step one is always confirming the cause. We test hardness, iron, chlorine, pH, and TDS on site, so the fix matches the problem rather than assuming. Step two is sizing. Capacity is calculated from measured GPG times household water use, so the system regenerates on the right cycle without over- or under-running. Step three is install location. The system goes at the point of entry to the home so every fixture sees treated water, with a bypass valve to isolate it for service.
            </p>
            <p>
              Step four is verification. After install, we confirm at the kitchen tap that water tests at 0 to 1 GPG, soap lathers immediately, and there is no remaining hardness slip. Step five is the 30-day follow-up. We call to verify the system is regenerating correctly, the salt level is right, and the spots have not returned. Existing scale on glass and chrome typically softens and wipes off in the first two weeks once new deposits stop forming. Look up unfamiliar terms in our <Link href="/glossary" style={{ color: "#12BDFB" }}>glossary</Link> or visit the <Link href="/how-it-works" style={{ color: "#12BDFB" }}>how it works</Link> page for the install-day walkthrough.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Common myths about white spots in Indianapolis</h2>
            <p>
              We get the same misconceptions over and over on first calls. Here are the most common, and the reality on the ground in Marion and Hamilton counties.</p>
            <p>
              <strong style={{ color: "#0C1F2E" }}>"It is just calcium, it is healthy."</strong> Calcium and magnesium are not health threats in tap water. The minerals on your faucet are not making you sick. They are, however, costing you fixtures, appliance life, and energy. Hardness is a quality-of-life and cost-of-ownership problem.
            </p>
            <p>
              <strong style={{ color: "#0C1F2E" }}>"A rinse aid fixes it."</strong> Rinse aid masks the symptom for dishes, only inside the dishwasher. It does nothing for faucets, showers, glass, or the inside of your water heater. The water is still hard everywhere else.
            </p>
            <p>
              <strong style={{ color: "#0C1F2E" }}>"My builder said the water is fine."</strong> Indianapolis water is regulated and meets federal limits. That is not the same as soft. Hardness is unregulated and runs 16 to 21 GPG in most service-area neighborhoods. Builders are not legally obligated to soften it. See our <Link href="/learn/water-hardness-gpg-explained" style={{ color: "#12BDFB" }}>GPG explainer</Link>.
            </p>
            <p>
              <strong style={{ color: "#0C1F2E" }}>"A no-salt system will fix the spots."</strong> Maybe, depending on your hardness. A <Link href="/systems/no-salt" style={{ color: "#12BDFB" }}>template-assisted crystallization conditioner</Link> reduces scale formation by converting minerals to a non-sticking crystal form, but at 18-plus GPG the visible spotting often persists. Ion-exchange softening is the only treatment that fully removes the minerals causing the spots.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Call a professional if</h2>
            <p>
              Some signs go past cosmetic and into "do not wait."
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Spots are rust-colored or brown, suggesting iron in addition to hardness.</li>
              <li>Your shower glass is permanently etched, fogging that does not wipe away.</li>
              <li>Faucet aerators clog within a week of cleaning.</li>
              <li>Hot water pressure has dropped, often a sign the water heater is scaling internally.</li>
              <li>Dishwasher cycles are leaving white film on every load even with a rinse aid.</li>
              <li>You are on a private well and seeing color, smell, or taste changes.</li>
            </ul>
            <p>
              Any one of these means the underlying water is doing more damage than the surface spots show. Schedule a test through our <Link href="/contact" style={{ color: "#12BDFB" }}>contact page</Link> or check our <Link href="/faq" style={{ color: "#12BDFB" }}>FAQ</Link> for what to expect.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>How long until the existing scale comes off</h2>
            <p>
              When new soft water starts flowing, existing scale does not vanish instantly. What changes is the direction of the equilibrium. Hard water actively deposits scale every time it dries on a surface. Soft water does the opposite. It slowly redissolves mineral deposits as it flows over them. Most Indianapolis homes see visible scale lighten on faucet aerators, chrome handles, and stainless steel sinks within the first two weeks. Light vinegar cleaning afterward wipes off easily what previously required real scrubbing.
            </p>
            <p>
              Glass shower doors are the slowest to recover. If hard-water scale has been etched into the glass for more than a year, the etching is permanent at the microscopic level and no amount of soft water will reverse it. We tell customers honestly that the spot prevention starts immediately, but if glass is already permanently fogged, the fix is a refinishing pass or eventually replacement. Water heaters with severe scale buildup will not fully reverse, but the existing scale stops growing once soft water is in use, which is what extends the appliance life. The <Link href="/learn/how-ion-exchange-softening-works" style={{ color: "#12BDFB" }}>ion-exchange softening explainer</Link> covers the chemistry behind why this works.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What soft water actually feels like</h2>
            <p>
              For a homeowner who has never lived with soft water, the change after install is striking. Soap lathers in seconds instead of beading on the skin. Shampoo rinses cleanly rather than leaving the heavy "weight" that hard water leaves in hair. Detergent doses can be cut roughly in half because most of what you used before was fighting hardness rather than cleaning. Towels come out of the dryer softer because there is no more mineral residue locked into the fibers.
            </p>
            <p>
              Some Indianapolis homeowners initially describe the feel as "slippery" in the shower. That is not soap residue. It is the absence of the soap-scum film that hard water creates with every wash. Your hands actually rinse fully clean for the first time, which feels different. Most people stop noticing within a week. The dishwasher difference is immediate too: glassware comes out clear instead of cloudy, dark plates rinse to a true black instead of a hard-water haze, and you can typically drop the rinse aid entirely. See more reactions in our <Link href="/case-studies" style={{ color: "#12BDFB" }}>case studies</Link> and customer <Link href="/reviews" style={{ color: "#12BDFB" }}>reviews</Link>.</p>

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
              <h3 className="font-display font-bold mb-3" style={{ fontSize: "1.3rem", color: "#0C1F2E" }}>Stop scrubbing. Solve the water.</h3>
              <p className="text-sm mb-5" style={{ color: "rgba(12,31,46,0.7)" }}>4.8 stars across 55 reviews. NSF-certified equipment. Serving <Link href="/service-areas/indianapolis-in" style={{ color: "#12BDFB" }}>Indianapolis</Link> and all of <Link href="/service-areas" style={{ color: "#12BDFB" }}>our 6-state territory</Link>. Browse our <Link href="/glossary" style={{ color: "#12BDFB" }}>glossary</Link> for terms.</p>
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
