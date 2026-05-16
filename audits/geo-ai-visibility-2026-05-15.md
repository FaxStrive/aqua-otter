# GEO / AI Visibility Audit — myaquaotter.com

**Target:** https://www.myaquaotter.com
**Business:** Aqua Otter Water Systems (family-owned water treatment, multi-state)
**Audit date:** 2026-05-15
**Auditor:** SEOMAN geo-ai-visibility skill

---

## AI Visibility Score: 47 / 100 — Fair

Some AI visibility but significant gaps. The site is technically open to AI crawlers and has a solid Tier-2 social footprint (BBB, Yelp, Facebook, YouTube, LinkedIn, Trustindex), but it has no Wikipedia entity, no llms.txt, weak Reddit/Wikipedia signals, and the homepage's content blocks are written in a poetic/marketing voice rather than a citation-ready voice. The /learn pages, however, are unusually citable for this niche.

### Score Breakdown

| Component | Score | Weight | Weighted |
|---|---|---|---|
| Citability | 62 / 100 | 35% | 21.7 |
| Brand Mentions | 38 / 100 | 30% | 11.4 |
| Crawler Access | 90 / 100 | 25% | 22.5 |
| llms.txt | 0 / 100 | 10% | 0.0 |
| **AI Visibility Total** | | | **47 / 100** |

Interpretation: 41–60 = Fair. The page rewards investment — the technical floor is good and a handful of /learn articles are already high-quality. Closing the entity gap (Wikipedia/Wikidata/Google Knowledge Panel), adding llms.txt, and converting the homepage's marketing copy into answer-block format would lift this into the 70s.

---

## Citability Assessment

**Page Citability Score: 62 / 100** (average of top 5 blocks)

The homepage is highly stylized — large display headings, sparse body copy, evocative one-liners ("Dirty water in.", "Real proof"). Most homepage blocks score poorly for self-containment and answer-block quality because they assume visual context. The /learn pages are dramatically more citable.

### Top citation-ready passages

1. **Hardness measurement definition (`/learn/water-hardness-gpg-explained`)** — 88 / 100
   "Water hardness measures the concentration of dissolved calcium and magnesium ions in water. GPG (grains per gallon) is the industry standard; 1 GPG = 17.1 ppm. Conversion formula: ppm ÷ 17.1 = GPG."
   Self-contained, statistically dense, original framing, table-structured. Verbatim-quotable.

2. **Hardness scale table (`/learn/water-hardness-gpg-explained`)** — 86 / 100
   The 6-row GPG classification table (0-3 Soft → 25+ Extremely hard) is exactly the format Google AI Overviews and Perplexity reward.

3. **Indiana regional hardness data (`/learn/water-hardness-gpg-explained`)** — 82 / 100
   "Fort Wayne, IN ranks highest at 22 GPG, followed by Zionsville (21 GPG) and Noblesville/Westfield (20 GPG). Detroit Metro at 7 GPG, Grand Rapids at 8 GPG."
   Proprietary regional data; no other water-treatment site in the region publishes city-level GPG. This is the strongest GEO asset on the site.

4. **Softener vs. conditioner one-liner (`/learn/softener-vs-no-salt-conditioning`)** — 78 / 100
   "Softeners make water soft. Conditioners make water less scale-forming."
   Perfect 9-word answer block. Likely to be quoted verbatim by AI engines for "what is the difference between" queries.

5. **TAC vs. phosphate explanation (`/learn/softener-vs-no-salt-conditioning`)** — 74 / 100
   Two-paragraph definition block; uses bolded terms; explains polymer beads and food-grade polyphosphate distinctly.

### Citation-unlikely areas

- **Homepage hero ("The water system…")** — 22 / 100. Display-text fragments without complete sentences; AI engines cannot extract a coherent quote.
- **Homepage CTA blocks ("Dirty water in.", "Do the math", "Real proof")** — 18 / 100. Theatrical copy with no answer payload.
- **"What's actually" / "Let's find out" headings** — 25 / 100. Trailing-off headings depend on visual continuation; AI parsers will see them as orphaned.
- **Service-area template pages (175+ identical pages)** — 30 / 100 estimated. High duplicate-content risk; programmatic SEO without per-city data dilutes citability.
- **Homepage stats (5,000+ homes, 99.9%, 500+ reviews)** — 55 / 100. Numbers are present but not embedded in self-contained answer paragraphs.

---

## AI Crawler Access

**Crawler Access Score: 90 / 100**

`robots.txt` is wide-open (`User-Agent: *` → `Allow: /`) and references the sitemap. All AI crawlers inherit full access. Only deduction: no per-crawler rules means the operator has no observability into which AI agents are crawling.

| Crawler | Status | Notes |
|---|---|---|
| GPTBot | Allowed | Inherits `*` allow-all |
| OAI-SearchBot | Allowed | Inherits `*` allow-all |
| ChatGPT-User | Allowed | Inherits `*` allow-all |
| ClaudeBot | Allowed | Inherits `*` allow-all |
| PerplexityBot | Allowed | Inherits `*` allow-all |
| Amazonbot | Allowed | Inherits `*` allow-all |
| Google-Extended | Allowed | Inherits `*` allow-all |
| Bytespider | Allowed | Inherits `*` allow-all |
| CCBot | Allowed | Inherits `*` allow-all |
| Applebot-Extended | Allowed | Inherits `*` allow-all |
| FacebookBot | Allowed | Inherits `*` allow-all |
| Cohere-ai | Allowed | Inherits `*` allow-all |

**Positives:**
- Sitemap referenced (`https://www.myaquaotter.com/sitemap.xml`) — 180+ URLs, well-formed, recent `lastmod`.
- No crawl-delay.
- Next.js site is server-rendered (the homepage HTML contains the full meta, headings, and copy — AI crawlers that do not execute JS will still see content).

**Issues:**
- No explicit AI crawler stanzas — recommend adding named `User-agent` blocks for GPTBot/ClaudeBot/PerplexityBot/Google-Extended so future policy changes are deliberate, not accidental.
- A `<meta name="robots" content="noindex"/>` tag appears in the served HTML (visible in the head). This is alarming — if it applies to the canonical homepage, the site is invisible to Google. Needs immediate investigation. (May be a Next.js 404 fallback leakage; the same response also contains a `404` title element alongside the real title element.)

---

## llms.txt Status

**Status:** Absent
**Score:** 0 / 100
- `/llms.txt` → 404
- `/llms-full.txt` → 404

This is a meaningful gap for a small water-treatment brand fighting for entity recognition. A well-crafted llms.txt would direct AI engines to the 7 `/learn/` pages (the site's strongest citable assets), the 5 `/case-studies/` pages, and the 6 `/systems/` product pages. Recommend generating via `/geo llmstxt` skill.

---

## Brand Mention Presence

**Brand Authority Score: 38 / 100**

| Platform | Status | Score Contribution | Details |
|---|---|---|---|
| Wikipedia | Absent | 0 / 30 | Wikipedia API query for "Aqua Otter Water Systems" returns no entity (top results: Sea otter, Floating island). No Wikidata Q-item found. Critical gap. |
| Reddit | Absent | 0 / 20 | No site:reddit.com mentions surfaced. Zero discussion footprint. |
| YouTube | Present | 13 / 15 | Official channel [@AquaOtterWaterSystems](https://www.youtube.com/@AquaOtterWaterSystems) with product videos ("Well Water Treatment Systems", "Alpha No-Salt Whole House"). Strong asset given YouTube's 0.737 correlation with AI visibility. |
| LinkedIn | Present | 7 / 10 | "Aqua Otter Water Systems LLC" appears as employer profile on individual employee pages (Sierra White, Larry Foster) and an open job posting. No dedicated company page surfaced. |
| Industry / Niche Sources | Mixed | 18 / 25 | BBB A+ accredited profile present, Yelp listing (6020 82nd St, Indianapolis), Nextdoor business page, Facebook page (@MyAquaOtter), Instagram (@therealaquaotter), Trustindex reviews aggregator, Find Water Pros directory. Solid Tier-2 coverage. Missing: G2, Capterra (not applicable), Angi, HomeAdvisor, Houzz, water-quality industry sites (WQA member directory). |

### Specific findings

- **Wikipedia (CRITICAL):** Direct API check via `en.wikipedia.org/w/api.php?action=query&list=search` for both "Aqua Otter Water Systems" and "Aqua Otter" returned zero matching entities. Top Wikipedia hit for "Aqua Otter" is the Sea otter article. The brand has no Wikidata Q-item, which means no entity disambiguation when AI models attempt to ground a query like "best water softener company in Indiana."
- **Reddit:** Searches for `"Aqua Otter" water softener reddit` and `"myaquaotter.com"` returned no Reddit threads. This is the single biggest organic-signal gap; Reddit is now a top-5 citation source for ChatGPT and Perplexity in home-services queries.
- **Conflicting NAP:** Site lists `(317) 983-5919` as HQ phone; the audit brief supplied `(317) 961-6925`. Yelp lists `6020 82nd St, Indianapolis`; About page lists `11216 Fall Creek Road #126, Indianapolis, IN 46256`. AI engines rely on consistent NAP for trust scoring — these must be reconciled.
- **Service-area mismatch:** The audit brief states 5 states (IN/MI/OH/KY/TN); the live site lists 6 (adds NC, with full Raleigh, NC service-area subtree). Reconcile.

---

## Priority Actions — Top 5

1. **[HIGH] Investigate the `<meta name="robots" content="noindex"/>` tag in the homepage `<head>`.**
   The served HTML contains both a noindex tag AND a 404 title alongside the canonical title — strong signal of a Next.js routing or fallback bug. If this fires for AI crawlers, the entire homepage is invisible to Google AI Overviews, Bing Copilot, and ChatGPT search. This single fix could swing the AI Visibility Score 15+ points.

2. **[HIGH] Build a Wikipedia / Wikidata entity for "Aqua Otter Water Systems".**
   Brand-mention correlation with AI citation is 3x stronger than backlink correlation. Without a Wikidata Q-item, AI engines cannot disambiguate the brand from "Sea otter" or generic "aqua" queries. Steps: (a) create Wikidata item with `sameAs` links to LinkedIn, BBB, YouTube, Facebook, Yelp; (b) draft a Wikipedia stub if notability bar is met (25+ years operating, 6-state footprint, 8 regional offices — borderline; pursue regional/business publications first to build sourcing). Use the `seo-geo-entity-optimizer` skill.

3. **[HIGH] Rewrite homepage content for citability (134–167 word answer blocks).**
   The current homepage is visually beautiful but verbally invisible. Add a 2–3 paragraph "What is Aqua Otter Water Systems?" block in 134–167 words near the top — naming the company, founding year (1999), 6-state footprint, specialization (well water + no-salt softeners), free water testing, lifetime warranty, BBB A+. This becomes the canonical "About Aqua Otter" passage every AI engine will quote.

4. **[HIGH] Generate `/llms.txt` and `/llms-full.txt`.**
   Use the `/geo llmstxt` skill. Prioritize: the 7 `/learn/` articles (your highest-citability assets), the 5 case studies, the 6 system pages, the about/service-area roots. Skip the 175+ duplicate service-area-x-product template pages. Single biggest leverage move for the 10% llms.txt score component.

5. **[MEDIUM] Seed Reddit discussion footprint in r/HomeImprovement, r/Plumbing, r/WaterTreatment, r/Indianapolis.**
   Not astroturfing — answer real user questions about Indiana water hardness, well-water iron, PFAS in Michigan, etc., linking to the `/learn` pages where genuinely useful. The Fort Wayne 22 GPG / Detroit 7 GPG regional data is uniquely shareable. Target 8–12 substantive comments over 60 days. Reddit is now a primary citation source for ChatGPT and Perplexity in home-services queries.

### Secondary actions (not in top 5 but worth queuing)

- Reconcile NAP across site, Yelp, BBB, Facebook, Google Business Profile (phone, address, state count).
- Add explicit `User-agent: GPTBot / ClaudeBot / PerplexityBot / Google-Extended` allow-stanzas to robots.txt for deliberate AI policy.
- Add LocalBusiness + Organization JSON-LD with `sameAs` array pointing to LinkedIn, YouTube, BBB, Facebook, Instagram, Yelp.
- De-duplicate or merge the 175+ city-by-product template pages; either add unique data per city (local water utility hardness number, EPA regional data) or canonicalize to the parent service-area page.
- Consider applying for WQA (Water Quality Association) Gold Seal certification — links the brand into the canonical industry entity graph.

---

## Sources

- [Aqua Otter Water Systems homepage](https://www.myaquaotter.com/)
- [About Aqua Otter](https://www.myaquaotter.com/about)
- [Water Hardness GPG Explained](https://www.myaquaotter.com/learn/water-hardness-gpg-explained)
- [Softener vs No-Salt Conditioning](https://www.myaquaotter.com/learn/softener-vs-no-salt-conditioning)
- [Sitemap](https://www.myaquaotter.com/sitemap.xml)
- [robots.txt](https://www.myaquaotter.com/robots.txt)
- [BBB profile](https://www.bbb.org/us/in/indianapolis/profile/water-conditioning-contractor/aqua-otter-0382-90040700)
- [Yelp listing](https://www.yelp.com/biz/aqua-otter-indianapolis-4)
- [YouTube channel](https://www.youtube.com/@AquaOtterWaterSystems)
- [Facebook page](https://www.facebook.com/MyAquaOtter/)
- [Instagram](https://www.instagram.com/therealaquaotter/)
- [Trustindex reviews](https://www.trustindex.io/reviews/myaquaotter.com)
- [Wikipedia API check](https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Aqua+Otter+Water+Systems) — NO ENTITY FOUND

---

_SEOMAN geo-ai-visibility audit, 2026-05-15_
