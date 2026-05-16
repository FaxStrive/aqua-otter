## Platform Readiness Analysis

**Target:** https://www.myaquaotter.com
**Date:** 2026-05-15
**Site:** Aqua Otter Water Systems (family-owned water treatment; service area IN, MI, OH, KY, TN)

**Platform Readiness Average: 36/100**

### Platform Scores Overview

| Platform | Score | Status |
|---|---|---|
| Google AI Overviews | 32/100 | Poor |
| ChatGPT Web Search | 34/100 | Poor |
| Perplexity AI | 28/100 | Critical |
| Google Gemini | 38/100 | Poor |
| Bing Copilot | 46/100 | Fair |

**Strongest Platform:** Bing Copilot — Site is fully crawlable for Bingbot/Copilot, SSR'd Next.js HTML returns clean semantic content, no robots.txt blocks, and the Indianapolis/Midwest local-service angle aligns with Copilot's home-services intent surfaces; weakness is verification (no `msvalidate.01`) and zero LinkedIn presence linked from site.

**Weakest Platform:** Perplexity AI — Almost no community-validation signals (Reddit, Quora, forum mentions for "Aqua Otter" are essentially zero in the Midwest water-treatment conversation), no third-party review syndication is linked from the page, and the site offers no primary-source data (no original water-quality datasets, no zip-code-level analysis) that Perplexity prefers to cite over secondary summaries.

---

### Google AI Overviews

**Score: 32/100**

| Signal Category | Score | Key Findings |
|---|---|---|
| Content Structure | 14/40 | Homepage uses oversized display H1/H2s as marketing taglines ("The water system…", "What's actually", "Dirty water in.", "Do the math") rather than question-shaped headings. No "What is a water softener?" / "How does a no-salt softener work?" answer-target pattern. No comparison tables (salt vs salt-free, softener vs filter). FAQ page exists in sitemap but FAQ content not surfaced as structured Q&A on homepage. /learn/what-we-filter and /glossary are good seeds but were not seen carrying AIO-shaped 40–60 word answer blocks. |
| Source Authority | 9/30 | Domain is local-service brand with limited topical authority on national queries like "no salt water softener" (dominated by Springwell, Pelican, Aquasana, Consumer Reports). No outbound citations to EPA, USGS, WQA, or NSF visible in the homepage HTML. Top-10 ranking unlikely for the broad queries listed; more realistic for "water softener Indianapolis" geo-modified terms. |
| Technical Signals | 9/30 | Server-rendered Next.js with clean H1/H2 hierarchy and HTTP 200 to Googlebot. **Zero JSON-LD schema** on homepage, /about, or /service-areas (confirmed by HTML parse). No Article, LocalBusiness, FAQPage, or Organization schema detected. Sitemap.xml is present, robots.txt is open. Render-blocking JS is minimal due to Next.js streaming. |

**Optimization Actions:**
1. Add AIO answer-target blocks to /learn/what-we-filter, /faq, /how-it-works, and /systems/water-softener: each H2 should be the literal question ("How does a salt-free water softener work?") followed by a 40–60 word direct answer in plain `<p>`, then expand. Target the FAQ page first so it can capture "no salt softener Michigan", "water filtration Ohio" People-Also-Ask boxes.
2. Ship LocalBusiness + Organization JSON-LD with `areaServed` listing IN/MI/OH/KY/TN as five `State` nodes, `sameAs` to Google Business Profile, Facebook, LinkedIn, and Better Business Bureau profile, and `aggregateRating` pulled from the on-site /reviews page. Also add FAQPage schema on /faq and Article schema on /learn pages.
3. Build comparison tables in /learn for "salt-based vs salt-free softener", "water softener vs whole-house filter", and "city water vs well water treatment" with clear `<th>` headers — AIO extracts these directly into the carousel-style overview answer.

### ChatGPT Web Search

**Score: 34/100**

| Signal Category | Score | Key Findings |
|---|---|---|
| Entity Recognition | 8/35 | "Aqua Otter Water Systems" has no Wikipedia article, no Wikidata Q-item, and the brand collides linguistically with consumer products (Aqua Otter pet/aquarium accessories on Amazon) — entity disambiguation is weak. No Organization schema with `sameAs` array present on the homepage to disambiguate the entity to ChatGPT's retrieval layer. No on-page author/founder bylines tying real people to the brand. |
| Content Preferences | 14/40 | Homepage copy is short, emotional, and visual ("The water system…", "Dirty water in. Clean water out.") — quotable but light on factual claims, statistics, or sourced data. No visible publication or modification dates on /learn or /glossary pages. No expert bylines, certifications (WQA Master Water Specialist, NSF), or licensure numbers surfaced in HTML. |
| Crawler Access | 12/25 | OAI-SearchBot, ChatGPT-User, and GPTBot all return HTTP 200; robots.txt is fully open (`User-Agent: * Allow: /`). No llms.txt present (HTTP 404). No `noai`/`noimageai` meta tags blocking ChatGPT. Solid baseline but missing the llms.txt signal and missing the entity scaffolding ChatGPT relies on for unambiguous brand resolution. |

**Optimization Actions:**
1. Create a Wikidata item for "Aqua Otter Water Systems" with properties: instance of (Q4830453 business), country (USA), headquarters location, founder, industry (water treatment), official website, social media handles. Add sameAs from on-site Organization schema to the new Wikidata QID, Google Business Profile, LinkedIn company page, Facebook, and YouTube. This is the single highest-leverage ChatGPT action.
2. Publish /llms.txt at the root listing the canonical pages, brand description ("Aqua Otter Water Systems is a family-owned water treatment company serving Indiana, Michigan, Ohio, Kentucky, and Tennessee since [year]"), and pointer to /service-areas and /learn — also add visible "Last updated: 2026-05" lines on every /learn and /glossary page.
3. Add an /about-author or /our-experts page with named on-staff installers and any WQA/NSF certifications (or state plumbing licenses) with credentials inline; mirror that author byline at the top of every /learn article so ChatGPT can attribute claims to a named, credentialed source.

### Perplexity AI

**Score: 28/100**

| Signal Category | Score | Key Findings |
|---|---|---|
| Community Validation | 4/30 | Brand has near-zero presence in r/Plumbing, r/HomeImprovement, r/WaterTreatment, or r/Indianapolis discussions of softeners. No Quora answers cite myaquaotter.com. No Stack-Exchange-equivalent forum threads. The /reviews page exists internally but does not appear to syndicate to third-party platforms that Perplexity indexes heavily (Google reviews, BBB, Angi, HomeAdvisor) — none of these appear as outbound `sameAs` in the homepage HTML. |
| Source Directness | 8/30 | Site presents marketing copy and product positioning, not primary-source data. No original datasets (e.g., "average hardness by Indiana county"), no field measurements, no published case study PDFs with raw numbers. /case-studies URL exists in sitemap but content depth unverified. Perplexity will preferentially cite EPA, USGS, WQA, and Consumer Reports for the listed queries unless Aqua Otter publishes its own data. |
| Content Freshness | 6/20 | Sitemap shows `lastmod: 2026-04-29` across all URLs — uniform timestamps suggest a build-time sweep rather than per-page editorial updates. No visible "Updated" or "Reviewed" dates in body HTML on /learn pages. No blog or news section in the sitemap, which Perplexity uses as a freshness signal. |
| Technical Access | 10/20 | PerplexityBot returns HTTP 200, robots.txt allows all. Next.js SSR means content is in raw HTML (verified via curl) — Perplexity's limited JS execution is satisfied. No llms.txt, but technical access is otherwise clean. |

**Optimization Actions:**
1. Launch a quarterly "Midwest Water Quality Report" on /learn or a new /reports section — primary-source data table with hardness, iron, nitrate, and PFAS levels by Indiana/Michigan/Ohio/Kentucky/Tennessee county, pulled from EWG Tap Water Database and USGS NWIS. This becomes the page Perplexity cites for regional well-water queries and is the single fastest way to move from "secondary marketer" to "primary source" in Perplexity's retrieval.
2. Run a deliberate Reddit + Quora ground game: seed 8–12 helpful, non-promotional answers per quarter in r/Indianapolis, r/Michigan, r/HomeImprovement, r/Plumbing, and r/WaterTreatment answering "best water softener installer in Indianapolis" / "is no-salt softener legit" with technical depth and a brand mention in the author flair/profile — Perplexity heavily indexes Reddit.
3. Add visible "Published 2025-MM-DD / Updated 2026-MM-DD" datelines to every /learn, /glossary, /case-studies, and /faq page (and `datePublished` / `dateModified` in Article schema once schema is shipped). Establish a rolling 90-day review cadence so the freshness signal is real and demonstrable.

### Google Gemini

**Score: 38/100**

| Signal Category | Score | Key Findings |
|---|---|---|
| Google Ecosystem | 12/35 | A Google Business Profile is presumed to exist (multi-state local-service brand) but is not linked via `sameAs` from the homepage HTML. No YouTube channel evident in homepage links. No Google Scholar presence (not expected for this category). No Google News inclusion. The service-areas page surfaces all five states cleanly, which helps GBP-driven local intent. |
| Knowledge Graph | 8/30 | No Knowledge Graph entity confirmable for "Aqua Otter Water Systems" — confounded by Aqua Otter pet/aquarium products. No Organization or LocalBusiness schema in HTML to feed Knowledge Graph (verified zero JSON-LD blocks). NAP appears consistent on /contact but not echoed in structured data anywhere on the site. |
| Content Quality | 18/35 | Strong visual design and clear topical territory (water treatment, IN/MI primary, three-state expansion). Topical clustering is present in the URL architecture (/systems/water-softener, /learn, /learn/what-we-filter, /glossary, /case-studies, /service-areas) — good Gemini-friendly hub-and-spoke skeleton. But individual page depth is unverified, and homepage body copy is marketing-led rather than long-form depth that Gemini favors. |

**Optimization Actions:**
1. Claim, fully populate, and verify Google Business Profiles for every physical service hub (Indianapolis HQ + at least one anchor location per state: a Michigan, Ohio, Kentucky, and Tennessee city you actually dispatch from). Add weekly GBP posts, monthly photo uploads, and Q&A seeding — then mirror each GBP URL into the on-site Organization schema `sameAs` array.
2. Launch a YouTube channel with 6–10 foundational videos: "What's in Indianapolis tap water?", "Salt vs salt-free softener (real demo)", "How we install a whole-home filter in a Michigan basement", "Iron staining in well water — what it means". Embed every video on the matching /learn or /systems page; YouTube mentions are the single strongest GEO signal (0.737 correlation) and feed Gemini directly via Google's index.
3. Expand /learn into a true topical cluster: pillar page per state ("Water treatment in Indiana", "Water treatment in Michigan", etc.) linking to 6–10 spoke articles each (hardness, iron, chlorine, PFAS, nitrate, well vs city, equipment guide, salt-free explained). Cross-link aggressively with descriptive anchor text — Gemini rewards demonstrable topical authority over single-page depth.

### Bing Copilot

**Score: 46/100**

| Signal Category | Score | Key Findings |
|---|---|---|
| Bing Index Signals | 9/30 | No IndexNow file at /indexnow.txt (HTTP 404). No `msvalidate.01` meta tag present in homepage HTML, meaning Bing Webmaster Tools verification is unconfirmed. Sitemap.xml is valid and referenced from robots.txt — Bing will discover it. No structured `lastmod` variation, which weakens crawl prioritization. |
| Content Preferences | 16/30 | Copy is professional, clear, and well-structured at the H1/H2 level. Tone is consumer-grade rather than enterprise/workplace — Copilot's primary surface skews toward research/workplace queries but residential home-services queries are increasingly served. Direct-answer content is thin; the same answer-target gap noted for AIO applies here. No authoritative outbound citations. |
| Microsoft Ecosystem | 4/20 | No LinkedIn company page link in homepage HTML. No evident GitHub presence (not expected for this category, no penalty). No Microsoft partner badges. Multi-state operator with no LinkedIn footprint is unusual and harms Copilot's entity confidence. |
| Technical Signals | 17/20 | SSR Next.js delivers clean semantic HTML to Bingbot. HTTPS with HSTS. Mobile-responsive viewport meta is present. Fast initial paint (Vercel edge, preloaded hero image). Clean URL structure. This is the strongest individual category for the site. |

**Optimization Actions:**
1. Verify the site in Bing Webmaster Tools, add `<meta name="msvalidate.01" content="…">` to the root layout, submit sitemap.xml, and stand up IndexNow: drop the keyed `<key>.txt` file at the site root and add a Vercel Edge Function that pings `https://api.indexnow.org/indexnow?url=...&key=...` on every publish.
2. Build out a complete LinkedIn company page for Aqua Otter Water Systems with all five service states, employee tags for installers, weekly posts, and a `sameAs` link from on-site Organization schema. LinkedIn is Copilot's strongest entity-confidence signal outside Wikipedia.
3. Rewrite the FAQ and /learn lede paragraphs to a more professional, citation-friendly register (specific numbers, named standards: "NSF/ANSI Standard 44 for cation-exchange softeners…") — Copilot's ranker rewards quotable authoritative phrasing over conversion-marketing copy.

---

### Cross-Platform Synergies

Actions that improve multiple platforms simultaneously:

1. **Ship Organization + LocalBusiness + FAQPage + Article JSON-LD across the site with `sameAs` to GBP, LinkedIn, Facebook, YouTube, BBB, and the new Wikidata QID** — Impacts: Google AIO, ChatGPT, Gemini, Bing Copilot (4 of 5).
2. **Create a Wikidata item and seed authoritative third-party mentions (BBB profile, Angi profile, local news coverage)** — Impacts: ChatGPT, Perplexity, Gemini (3 of 5).
3. **Add AIO-shaped 40–60 word answer paragraphs under question-formatted H2s across /faq, /learn, /glossary, /systems/* pages** — Impacts: Google AIO, Gemini, Bing Copilot, ChatGPT (4 of 5).
4. **Publish visible `datePublished` / `dateModified` lines and matching Article schema dates on every editorial page** — Impacts: Perplexity, Gemini, Google AIO (3 of 5).
5. **Launch a YouTube channel and embed each video on its topical page** — Impacts: Gemini, Google AIO, ChatGPT (via web search transcripts) (3 of 5).

### Priority Actions (All Platforms)

1. **[CRITICAL]** Ship JSON-LD across the site: Organization + LocalBusiness (with five `areaServed` State nodes) on root layout; FAQPage on /faq; Article on every /learn page; BreadcrumbList sitewide — Affects: AIO, ChatGPT, Gemini, Copilot — Effort: Medium
2. **[CRITICAL]** Create Wikidata QID for "Aqua Otter Water Systems" and wire `sameAs` from on-site Organization schema to Wikidata, GBP, LinkedIn, Facebook, YouTube, BBB — Affects: ChatGPT, Perplexity, Gemini — Effort: Low
3. **[HIGH]** Rewrite /faq, /learn, /glossary, /systems/water-softener with AIO answer-target pattern (question H2 + 40–60 word direct answer + comparison tables where applicable) — Affects: AIO, Gemini, Copilot, ChatGPT — Effort: High
4. **[HIGH]** Verify Bing Webmaster Tools, add `msvalidate.01`, deploy IndexNow on Vercel, and stand up a complete LinkedIn company page — Affects: Bing Copilot (primary), ChatGPT (secondary via entity) — Effort: Low
5. **[HIGH]** Publish a quarterly "Midwest Water Quality Report" with county-level hardness/iron/PFAS data for IN/MI/OH/KY/TN — Affects: Perplexity (primary), AIO, Gemini — Effort: High
6. **[MEDIUM]** Launch YouTube channel with 6–10 foundational videos, embed each on the matching topical page — Affects: Gemini, AIO, ChatGPT — Effort: High
7. **[MEDIUM]** Add visible "Published / Updated" datelines and matching schema dates on every editorial URL; establish 90-day review cadence — Affects: Perplexity, Gemini, AIO — Effort: Low
8. **[MEDIUM]** Run a structured Reddit + Quora answer program (8–12 helpful answers/quarter in r/Indianapolis, r/Michigan, r/HomeImprovement, r/Plumbing, r/WaterTreatment) — Affects: Perplexity (primary), ChatGPT (secondary) — Effort: Medium

---

_SEOMAN geo-platform-analysis audit, 2026-05-15_
