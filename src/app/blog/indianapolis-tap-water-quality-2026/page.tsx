import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";

const SLUG = "indianapolis-tap-water-quality-2026";
const TITLE = "Indianapolis Tap Water Quality 2026: TTHM, Lead, Chlorine";
const DESCRIPTION = "What is in Indianapolis tap water in 2026: TTHM, lead, chlorine and hardness, what is regulated, and how to treat it. Free water test from Aqua Otter.";
const URL = `https://www.myaquaotter.com/blog/${SLUG}`;
const HERO = `/images/blog-hero/${SLUG}.jpg`;
const DATE_PUBLISHED = "2026-05-17";
const DATE_MODIFIED = "2026-05-17";
const AUTHOR_NAME = "Larry Foster";
const AUTHOR_URL = "https://www.myaquaotter.com/about";

const faqs = [
  {
    q: "Is Indianapolis tap water safe to drink in 2026?",
    a: "Citizens Energy Group's tap water meets federal Safe Drinking Water Act standards in 2026, but compliance is not the same as ideal. Disinfection byproducts like TTHMs, residual chlorine, and 16 to 19 GPG hardness are all present at levels that many homeowners choose to treat at the point of use.",
  },
  {
    q: "What are TTHMs and should I be worried in Indianapolis?",
    a: "Total trihalomethanes (TTHMs) are disinfection byproducts that form when chlorine reacts with organic matter in source water. The EPA limit is 80 parts per billion. Indianapolis CCR data typically reports running annual averages below the limit but with seasonal spikes that some households want filtered out.",
  },
  {
    q: "Does Indianapolis tap water have lead?",
    a: "Citizens Energy Group treats source water to be non-corrosive, so the water leaving the plant is essentially lead-free. Lead exposure risk in Indianapolis comes from older home plumbing and service lines built before 1986. Testing at your tap is the only way to know your specific home's lead level.",
  },
  {
    q: "How much chlorine is in Indianapolis tap water?",
    a: "Citizens Energy typically maintains 1 to 4 ppm residual chlorine for distribution disinfection. That level is safe but noticeable in taste, smell, and on skin. A whole-house carbon filter or under-sink RO removes most of it for drinking, cooking, and showering comfort.",
  },
  {
    q: "What is the best way to filter Indianapolis tap water?",
    a: "For drinking, a reverse osmosis system handles TTHMs, lead, chlorine, and dissolved solids in one stage. For whole-house comfort, a softener handles hardness and a carbon filter handles chlorine. A free water test tells you which combination fits your home and budget.",
  },
  {
    q: "Where can I see the official Indianapolis water quality report?",
    a: "Citizens Energy Group publishes an annual Consumer Confidence Report (CCR) each summer, available at citizensenergygroup.com. It lists detected contaminants, regulatory limits, and any monitoring violations. We help homeowners read it during free water tests.",
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

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-bold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>Water Quality</div>

          <h1 className="font-display font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#0C1F2E" }}>
            Indianapolis Tap Water Quality 2026: TTHM, Lead, Chlorine
          </h1>

          <p className="text-sm mb-8" style={{ color: "rgba(12,31,46,0.5)" }}>
            May 17, 2026 &nbsp;·&nbsp; 10 min read &nbsp;·&nbsp; By Larry Foster, Founder
          </p>

          <div className="relative w-full mb-10 rounded-3xl overflow-hidden" style={{ aspectRatio: "1200 / 630" }}>
            <Image src={HERO} alt="Indianapolis tap water quality 2026 TTHM lead chlorine hardness" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>

          <div className="space-y-6 text-base leading-relaxed" style={{ color: "rgba(12,31,46,0.75)" }}>
            <p data-bluf className="text-lg font-medium" style={{ color: "#0C1F2E" }}>
              Indianapolis tap water in 2026 meets federal Safe Drinking Water Act limits, but it carries detectable TTHMs, 1 to 4 ppm residual chlorine, 16 to 19 GPG of hardness, and a real risk of lead from pre-1986 home plumbing. Compliance is not the same as ideal. Point-of-entry treatment plus an under-sink RO solves most of it.</p>

            <div className="rounded-2xl p-6 my-2" style={{ backgroundColor: "#F0F8FF", border: "1px solid rgba(18,189,251,0.18)" }}>
              <p className="text-sm font-semibold mb-2" style={{ color: "#0C1F2E" }}>See exactly what is in your tap</p>
              <p className="text-sm mb-4" style={{ color: "rgba(12,31,46,0.65)" }}>Free 30-minute in-home water test. Call <a href="tel:+13179616925" className="font-semibold underline" style={{ color: "#12BDFB" }}>(317) 961-6925</a> or schedule online.</p>
              <Link href="/get-started" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold" style={{ backgroundColor: "#12BDFB", color: "#0C1F2E" }}>
                Schedule free water test <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Who supplies Indianapolis water</h2>
            <p>
              Citizens Energy Group is the public charitable trust that operates the Indianapolis water utility, serving roughly 800,000 people across Marion County and parts of the surrounding counties. Source water comes from a mix of reservoirs (Geist, Eagle Creek, Morse), the White River, Fall Creek, and the Indianapolis aquifer. That mix is filtered, disinfected with chlorine, and pH-adjusted to prevent pipe corrosion before it hits the distribution mains.
            </p>
            <p>
              The chemistry that leaves a Citizens Energy treatment plant is well-controlled. The water you actually drink, however, picks up whatever your home's service line and interior plumbing add to it on the way to the tap. That distinction matters most for lead and copper. Our <Link href="/service-areas/indianapolis-in" style={{ color: "#12BDFB" }}>Indianapolis service page</Link> covers the local nuances and our <Link href="/indiana" style={{ color: "#12BDFB" }}>Indiana state hub</Link> covers the broader regulatory picture.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>TTHMs and haloacetic acids: the disinfection trade-off</h2>
            <p>
              Chlorine disinfection has saved millions of lives since the early 20th century by stopping waterborne disease outbreaks. The trade-off is that chlorine reacts with natural organic matter in source water (leaves, sediment, decomposing plant material) to form disinfection byproducts, primarily total trihalomethanes (TTHMs) and haloacetic acids (HAA5).
            </p>
            <p>
              The EPA enforces a maximum contaminant level of 80 parts per billion for TTHMs and 60 ppb for HAA5, measured as a running annual average. Indianapolis CCR data typically shows compliance, but with seasonal spikes in late summer when source-water organics increase and warmer reservoir temperatures accelerate the reaction. Our <Link href="/learn/tthms-haloacetic-acids" style={{ color: "#12BDFB" }}>TTHM and HAA5 explainer</Link> breaks down the health context and the EPA framework. A carbon filter on the whole house or a <Link href="/systems/reverse-osmosis" style={{ color: "#12BDFB" }}>reverse osmosis system</Link> at the kitchen tap both reduce TTHM exposure by 90 percent or more for the water you drink and cook with.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Lead: regulated, but home-specific</h2>
            <p>
              The federal Lead and Copper Rule sets an action level of 15 parts per billion. Citizens Energy treats its distributed water to be non-corrosive so that it does not leach metal from pipes, and the water leaving the plant tests near zero for lead. But if your home was built before 1986, the year Congress banned lead solder in plumbing, you may still have lead service line segments, lead-soldered copper joints, or older brass fixtures with low-level lead content.</p>
            <p>
              Indianapolis is in the middle of a multi-year service-line inventory and replacement program. Until your line is verified, the safest approach for any pre-1986 home is to run the cold tap for 30 seconds before drawing drinking water and to consider an NSF/ANSI 53 lead-rated filter at the kitchen tap. Our standard <Link href="/systems/reverse-osmosis" style={{ color: "#12BDFB" }}>under-sink reverse osmosis</Link> is certified to reduce lead well below the EPA action level, plus most other dissolved contaminants in one stage.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Chlorine, chloramine, and the taste-and-smell question</h2>
            <p>
              Citizens Energy uses free chlorine as its primary disinfectant, typically maintaining a 1 to 4 ppm residual in the distribution system. That residual is what protects the water on its journey from plant to tap, but it is also what produces the "swimming pool" taste, dries skin, and fades color-treated hair.</p>
            <p>
              The EPA's maximum residual disinfectant level for chlorine is 4 ppm, and Indianapolis stays under that. Removing it for taste and shower comfort is a simple matter of activated-carbon filtration. A whole-house carbon stage handles it for every fixture, while a point-of-use carbon or RO system handles it for drinking only. See our <Link href="/learn/whole-home-filtration-guide" style={{ color: "#12BDFB" }}>whole-home filtration guide</Link> for how the stages fit together.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Hardness: not regulated, but it costs you money</h2>
            <p>
              Water hardness is not a contaminant under the Safe Drinking Water Act, so utilities do not have to treat for it. That is why Indianapolis water comes out of the plant at 16 to 19 GPG, well into the "very hard" range. <Link href="/service-areas/carmel-in" style={{ color: "#12BDFB" }}>Carmel</Link>, <Link href="/service-areas/fishers-in" style={{ color: "#12BDFB" }}>Fishers</Link>, and <Link href="/service-areas/noblesville-in" style={{ color: "#12BDFB" }}>Noblesville</Link> regularly run 19 to 21 GPG. While not a health issue, hardness is a real wallet issue. Indianapolis customers without a softener see water heaters fail 5 to 8 years earlier than rated, dishwasher and washer warranties voided by scale, and 10 to 30 percent higher water-heating energy bills.</p>
            <p>
              A properly sized <Link href="/systems/water-softener" style={{ color: "#12BDFB" }}>ion-exchange softener</Link> removes hardness completely. A <Link href="/systems/no-salt" style={{ color: "#12BDFB" }}>no-salt conditioner</Link> prevents scale without removing minerals, which works for moderately hard water in homes that prefer not to add salt. Our cost write-up on <Link href="/blog/water-softener-cost-indianapolis-indiana-2026" style={{ color: "#12BDFB" }}>water softener cost in Indianapolis</Link> has the 2026 numbers.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Recommended method: condition to action</h2>
            <p>
              Match what you care about most to the right treatment. Every line below maps to systems we install across Indianapolis and the rest of <Link href="/service-areas" style={{ color: "#12BDFB" }}>our 6-state service area</Link>.</p>
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: "#F0F8FF" }}>
                    <th className="text-left p-3 font-semibold" style={{ color: "#0C1F2E" }}>Your primary concern</th>
                    <th className="text-left p-3 font-semibold" style={{ color: "#0C1F2E" }}>Recommended action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">TTHMs in drinking water</td><td className="p-3">Under-sink RO or whole-house carbon</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">Lead from pre-1986 home plumbing</td><td className="p-3">NSF 53 lead-rated RO at kitchen tap</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">Chlorine taste and shower comfort</td><td className="p-3">Whole-house carbon filter</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">Hardness, scale, soap problems</td><td className="p-3">Ion-exchange softener sized to GPG</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(18,189,251,0.12)" }}>
                    <td className="p-3">All of the above</td><td className="p-3">Softener plus carbon plus under-sink RO (3-stage solution)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Bacteria concern (boil notices, well water)</td><td className="p-3">Add <Link href="/systems/uv-purification" style={{ color: "#12BDFB" }}>UV purification</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>How to read your Citizens Energy CCR</h2>
            <p>
              Every year by July 1, Citizens Energy is required to publish a Consumer Confidence Report (CCR) summarizing every regulated contaminant detected in the prior year, the measured level, the regulatory limit, and the source. The document is downloadable at citizensenergygroup.com.</p>
            <p>
              When you read it, focus on three columns: the highest level detected, the running annual average, and the EPA's MCL. If the highest level is close to the MCL even when the annual average is compliant, that means some homes saw spike exposures. TTHMs and HAA5 are the most common contaminants where this happens in Indianapolis. Our team helps customers read the report during free water tests. Look up unfamiliar terms in our <Link href="/glossary" style={{ color: "#12BDFB" }}>glossary</Link>.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>How Indianapolis compares to the rest of our service area</h2>
            <p>
              We test water for a living across six states. That gives us a useful comparison set for understanding where Indianapolis falls in the regional picture. Indianapolis sits in the middle of the hardness pack for our territory: harder than the average <Link href="/north-carolina" style={{ color: "#12BDFB" }}>North Carolina</Link> piedmont home (typically 5 to 8 GPG), comparable to most <Link href="/michigan" style={{ color: "#12BDFB" }}>Michigan</Link> municipal supplies (15 to 22 GPG), and softer than some <Link href="/ohio" style={{ color: "#12BDFB" }}>Ohio</Link> well-water homes that test above 25 GPG.
            </p>
            <p>
              On the disinfection-byproduct front, Indianapolis CCR data is consistent with the broader Ohio River and White River basin pattern. Surface-water utilities in Indiana, Ohio, <Link href="/kentucky" style={{ color: "#12BDFB" }}>Kentucky</Link>, and parts of <Link href="/tennessee" style={{ color: "#12BDFB" }}>Tennessee</Link> all report seasonal TTHM and HAA5 elevations. Lead-line concerns are very common in pre-1986 housing stock across all six of our states, not just Indianapolis. Where Indianapolis stands out is hardness combined with a regulated but noticeable chlorine residual, which is the combination that drives most of our installs in Marion and Hamilton counties.
            </p>
            <p>
              The 2024 EPA PFAS rule applies uniformly across all six states, so monitoring obligations and reporting timelines are the same wherever you are. For homeowners moving into Indianapolis from another state, the practical takeaway is that hardness and chlorine taste will be more noticeable than what you came from, and the treatment math is straightforward.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Other contaminants worth knowing about</h2>
            <p>
              TTHMs, lead, chlorine, and hardness get most of the attention in Indianapolis because they show up most consistently in CCR data and homeowner complaints. A handful of secondary contaminants are worth understanding, even if they are less common.
            </p>
            <p>
              <strong style={{ color: "#0C1F2E" }}>Nitrate.</strong> Agricultural runoff in counties surrounding Indianapolis can push nitrate levels up in source water, particularly after heavy spring rains. The EPA limit is 10 ppm. Citizens Energy tests for nitrate routinely and meets the limit, but well-water customers in the agricultural fringe of Marion and Hendricks counties should test every spring. RO removes nitrate effectively.
            </p>
            <p>
              <strong style={{ color: "#0C1F2E" }}>Chromium-6.</strong> Hexavalent chromium is detectable at trace levels in Indianapolis-area water, mostly from natural geology. There is no federal MCL specifically for chromium-6 yet, only a total chromium limit. Our <Link href="/learn/chromium-6-indiana-water" style={{ color: "#12BDFB" }}>chromium-6 in Indiana water</Link> overview covers the science and the treatment options. RO and certain anion-exchange systems remove it.
            </p>
            <p>
              <strong style={{ color: "#0C1F2E" }}>PFAS (forever chemicals).</strong> Indianapolis source water has not shown the high PFAS levels reported in some other Midwest utilities, but the EPA's 2024 PFAS rule sets enforceable limits for the first time, and Citizens Energy is required to monitor and report. Some homeowners proactively install PFAS-rated point-of-use filters as a precaution.
            </p>
            <p>
              <strong style={{ color: "#0C1F2E" }}>Sediment and turbidity spikes.</strong> Most often after a water-main break or hydrant flush in your neighborhood. A whole-house sediment filter at the point of entry catches the visible particles. A combination with a softener and carbon stage is what we typically install in <Link href="/service-areas/indianapolis-in" style={{ color: "#12BDFB" }}>Indianapolis homes</Link> that want a comprehensive solution.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What testing actually looks like</h2>
            <p>
              A free in-home water test from Aqua Otter takes about 30 minutes and covers the contaminants most likely to affect day-to-day quality of life. We use calibrated digital meters and reagent kits to measure hardness (GPG), iron (ppm), chlorine (ppm), pH, and total dissolved solids (TDS). If lead is a concern (older home, infants in the house, or you have just never tested) we can pull a sample for certified lab analysis.</p>
            <p>
              Once you have numbers, the decisions get easier. Hardness above 10 GPG and an annoying chlorine taste call for a softener plus a carbon stage. Lead concern, TTHMs, and any drinking-water priority point you toward an under-sink RO. A well with iron staining needs an iron filter before anything else. We walk through the results in plain English, show you the systems on the truck, and quote installed pricing in writing. Browse our customer experiences on the <Link href="/reviews" style={{ color: "#12BDFB" }}>reviews page</Link>.
            </p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Call a professional if</h2>
            <p>
              Some signals indicate you should not wait for the next annual report.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You live in a home built before 1986 and have never had your tap water lead-tested.</li>
              <li>Your home is on a well, especially with seasonal taste, smell, or color changes.</li>
              <li>Citizens Energy or the Indiana Department of Environmental Management has issued a boil notice in your area.</li>
              <li>You smell chlorine or a "rotten egg" sulfur odor at the tap.</li>
              <li>A household member is pregnant, infant-aged, immunocompromised, or otherwise high-risk.</li>
              <li>You see visible discoloration, sediment, or particulates after a water-main repair in your neighborhood.</li>
            </ul>
            <p>
              Read more on our <Link href="/faq" style={{ color: "#12BDFB" }}>FAQ</Link> or browse customer write-ups in our <Link href="/reviews" style={{ color: "#12BDFB" }}>reviews</Link>.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>What changes every year and what does not</h2>
            <p>
              When we publish a water-quality overview for Indianapolis, customers often ask which numbers shift year to year and which are essentially stable. The hardness profile is the most stable: limestone geology does not change, and Citizens Energy plant chemistry holds the 16 to 19 GPG range tightly. You can plan your softening solution against that number with high confidence. Lead exposure risk is also stable in the sense that it depends on your home's plumbing, not on the utility's chemistry.
            </p>
            <p>
              What moves year to year is the disinfection-byproduct profile. TTHMs and HAA5 are sensitive to source-water organic matter, which depends on reservoir conditions, summer temperatures, and recent precipitation. A wet spring followed by a warm summer is the classic recipe for elevated late-summer numbers. Chlorine residual within the distribution system can also vary slightly depending on maintenance schedules and main flushing. Regulatory limits are a third moving piece. The 2024 EPA PFAS rule is the most consequential recent change, and additional contaminant rules are in various stages of EPA review. We update our <Link href="/learn" style={{ color: "#12BDFB" }}>learn library</Link> and this blog as those rules land.</p>

            <h2 className="font-display font-bold pt-6" style={{ fontSize: "1.6rem", color: "#0C1F2E" }}>Building a treatment stack that fits</h2>
            <p>
              Most Indianapolis homes that decide to treat their water end up with one of three stacks. The minimum-effective stack for a typical Citizens Energy household is an ion-exchange softener (hardness) plus an under-sink RO (drinking-water TTHMs, lead, chlorine taste). That covers the appliance protection and the high-value drinking water for $3,500 to $5,200 installed depending on size and capacity.</p>
            <p>
              The middle stack adds a whole-house carbon filter ahead of the softener, which pulls out chlorine for showers, tubs, and skin, plus extends softener resin life by removing oxidizers. Typical Indianapolis installed cost runs $4,500 to $6,500. The top stack adds <Link href="/systems/uv-purification" style={{ color: "#12BDFB" }}>UV purification</Link> for homes with bacteria concerns (private wells, boil-notice areas) or an iron filter for high iron readings. Combined installed cost varies widely but typically falls between $5,500 and $8,500. Our <Link href="/learn/whole-home-filtration-guide" style={{ color: "#12BDFB" }}>whole-home filtration guide</Link> walks through the stage-by-stage logic, and the <Link href="/financing" style={{ color: "#12BDFB" }}>financing page</Link> covers monthly payment options. We can also build a phased plan: softener and RO now, carbon and UV later when budget allows.</p>

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
              <h3 className="font-display font-bold mb-3" style={{ fontSize: "1.3rem", color: "#0C1F2E" }}>Find out what is actually in your tap</h3>
              <p className="text-sm mb-5" style={{ color: "rgba(12,31,46,0.7)" }}>4.8 stars across 55 reviews. NSF-certified equipment. Serving <Link href="/indiana" style={{ color: "#12BDFB" }}>Indiana</Link>, <Link href="/michigan" style={{ color: "#12BDFB" }}>Michigan</Link>, <Link href="/ohio" style={{ color: "#12BDFB" }}>Ohio</Link>, <Link href="/kentucky" style={{ color: "#12BDFB" }}>Kentucky</Link>, <Link href="/tennessee" style={{ color: "#12BDFB" }}>Tennessee</Link>, and <Link href="/north-carolina" style={{ color: "#12BDFB" }}>North Carolina</Link>.</p>
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
