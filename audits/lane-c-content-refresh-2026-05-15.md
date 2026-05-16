# Lane C, Content Refresh Audit
**Site:** Aqua Otter Water Systems (https://www.myaquaotter.com)
**Date:** 2026-05-15
**Auditor scope:** Title tags, meta descriptions, content freshness, E-E-A-T signals, sitewide metatag patterns, top-10 refresh playbook.
**Research only.** No source files edited, no PR opened.

> Context note: Phase 2A foundation PR is currently shipped on branch `phase2a-foundation-v2-2026-05-15` (commit `5cb147d`). The PR adds Organization + WebSite schema, `/llms.txt`, 6 state hub pages, SSR `/faq` with FAQPage schema, and security headers. This audit reads the CURRENT `phase2a-foundation-v2` branch (which contains those fixes), so state hubs and `/faq` metadata are visible. Findings that are "already resolved by the PR" are marked **[Fixed by PR #1]**. Findings that remain are the Lane C target.

> Byline note: per the GEO content audit (`audits/geo-content-2026-05-15.md`), no real owner / founder name is verified for Aqua Otter. The /about page says "founded 1999 in Noblesville, Indiana, family-owned" without naming a person. This audit uses "Aqua Otter Team" as the byline placeholder. Do NOT invent a person until Luke confirms.

---

## 1. Content Inventory

### Articles / library

| Path | Title | Word count | Notes |
|---|---|---|---|
| /blog (index) | (no metadata export) | n/a | client component |
| /blog/hard-water-indiana | Hard Water in Indiana: What Every Homeowner Needs to Know | ~950 | client component, no metadata |
| /blog/softener-vs-no-salt | Water Softener vs. No-Salt System: Which One Is Right for You? | ~830 | client component, no metadata |
| /blog/well-water-testing | Well Water Testing: Why You Should Test Every Year | ~790 | client component, no metadata |
| /learn (index) | (no metadata export) | n/a | |
| /learn/what-we-filter | What's in your water — every contaminant we filter | n/a | only metadata export besides /faq |
| /learn/[slug] × 7 | dynamic metadata via `generateMetadata` | varies | titles render `${article.title} \| Aqua Otter Library` |

Library articles (7, from `src/lib/library-articles.ts`):
- chromium-6-indiana-water
- pfas-michigan-water
- how-ion-exchange-softening-works
- tthms-haloacetic-acids
- water-hardness-gpg-explained
- softener-vs-no-salt-conditioning
- whole-home-filtration-guide

Case studies (5, from `src/lib/case-studies.ts`):
- noblesville-hard-water-softener-ro
- ann-arbor-pfas-whole-home-filtration
- fort-wayne-iron-well-aio
- nashville-no-salt-quintex5
- detroit-lead-ro-older-home

### System / pillar pages (6)

| Path | Metadata export? | Notes |
|---|---|---|
| /systems (hub) | NO | client component |
| /systems/water-softener | NO | client component, 2,000+ words on page |
| /systems/no-salt | NO | client component |
| /systems/well-water | NO | client component |
| /systems/filtration | NO | client component |
| /systems/reverse-osmosis | NO | client component |
| /systems/uv-purification | NO | client component |

**Critical: zero of the 7 systems pages have metadata exports.** They all inherit only the root layout title "Aqua Otter Water Systems | Pure Water, Perfected" and the layout's generic description.

### State hub pages (6) **[Fixed by PR #1]**

| Path | Title pattern | Description pattern |
|---|---|---|
| /(states)/indiana | `${hub.h1} \| Aqua Otter Water Systems` | `Family-owned water treatment in Indiana. Free in-home water testing, no-salt softeners, well water systems, whole-home filtration, and reverse osmosis. Serving ${cityList}.` |
| /(states)/michigan | same template | same template |
| /(states)/ohio | same template | same template |
| /(states)/kentucky | same template | same template |
| /(states)/tennessee | same template | same template |
| /(states)/north-carolina | same template | same template |

**Note:** the brief states 5 states; the codebase ships 6 (NC was added). Update SEOMAN CLAUDE.md to reflect 6.

### Service-area pages (22 cities + 4 services per city via `[slug]/[service]`)

- `/service-areas/[slug]/page.tsx` (22 cities): dynamic title `Water Treatment in ${city}, ${state} — Free Water Test | Aqua Otter`. **Contains an em-dash in the title template.**
- `/service-areas/[slug]/[service]/page.tsx`: dynamic title `${service.name} in ${city}, ${state} | Aqua Otter` and meta description with `Lifetime warranty` claim.

### Core / conversion pages

| Path | `metadata` export? |
|---|---|
| / (home) | NO |
| /about | NO |
| /contact | NO |
| /financing | NO |
| /gallery | NO |
| /reviews | NO |
| /glossary | description only, no title |
| /warranty | NO |
| /how-it-works | NO |
| /get-started | NO |
| /service-areas (hub) | NO |
| /faq | YES **[Fixed by PR #1]** |
| /terms | NO |
| /privacy | NO |

---

## 2. Per-Page Scoring (1, low → 5, excellent)

Rubric same as Solomon: Title (presence, length, geo, differentiator), Meta (length, CTA, no template duplication), Freshness, E-E-A-T.

### State hubs **[Fixed by PR #1]**

| Path | Title | Meta | Fresh | EEAT | Agg |
|---|---|---|---|---|---|
| /indiana, /michigan, /ohio, /kentucky, /tennessee, /north-carolina | 3 | 3 | 2 | 3 | 11 |

All six share the identical description template with only state and city list swapped. Pure-template duplicate-meta risk.

### Systems pages

| Path | Title | Meta | Fresh | EEAT | Agg |
|---|---|---|---|---|---|
| /systems (hub) | 1 | 1 | 2 | 3 | 7 |
| /systems/water-softener | 1 | 1 | 3 | 4 | 9 |
| /systems/no-salt | 1 | 1 | 3 | 4 | 9 |
| /systems/well-water | 1 | 1 | 3 | 4 | 9 |
| /systems/filtration | 1 | 1 | 3 | 4 | 9 |
| /systems/reverse-osmosis | 1 | 1 | 3 | 4 | 9 |
| /systems/uv-purification | 1 | 1 | 3 | 4 | 9 |

All systems pages get the same root-layout title; they all read as "Aqua Otter Water Systems | Pure Water, Perfected" in SERPs. This is the single biggest crawl-equity loss on the site.

### Blog posts

| Path | Title | Meta | Fresh | EEAT | Agg |
|---|---|---|---|---|---|
| /blog (index) | 1 | 1 | 2 | 2 | 6 |
| /blog/hard-water-indiana | 1 | 1 | 2 | 3 | 7 |
| /blog/softener-vs-no-salt | 1 | 1 | 2 | 3 | 7 |
| /blog/well-water-testing | 1 | 1 | 2 | 3 | 7 |

Same root-layout-only problem. Blog category badges exist on-page but no Article schema and no per-post metadata.

### Core pages

| Path | Title | Meta | Fresh | EEAT | Agg |
|---|---|---|---|---|---|
| / (home) | 1 | 1 | 2 | 3 | 7 |
| /about | 1 | 1 | 2 | 2 | 6 |
| /contact | 1 | 1 | 2 | 2 | 6 |
| /financing | 1 | 1 | 2 | 3 | 7 |
| /reviews | 1 | 1 | 2 | 3 | 7 |
| /how-it-works | 1 | 1 | 2 | 3 | 7 |
| /warranty | 1 | 1 | 2 | 3 | 7 |
| /service-areas (hub) | 1 | 1 | 2 | 3 | 7 |
| /glossary | 1 | 3 | 2 | 3 | 9 |
| /get-started | 1 | 1 | 2 | 3 | 7 |
| /gallery | 1 | 1 | 2 | 3 | 7 |
| /faq | 4 | 3 | 2 | 4 | 13 **[Fixed by PR #1]** |
| /learn (index) | 1 | 1 | 2 | 3 | 7 |
| /learn/what-we-filter | 3 | 3 | 2 | 4 | 12 |

### Service-area / per-service

| Path | Title | Meta | Fresh | EEAT | Agg |
|---|---|---|---|---|---|
| /service-areas/[slug] | 3 (has em-dash) | 3 | 2 | 3 | 11 |
| /service-areas/[slug]/[service] | 3 | 3 | 2 | 3 | 11 |

---

## 3. Top-10 Refresh Candidates

| Rank | Page(s) | Why |
|---|---|---|
| 1 | /systems/water-softener, /systems/no-salt, /systems/well-water, /systems/filtration, /systems/reverse-osmosis, /systems/uv-purification, /systems (hub) | All 7 high-commercial-intent pages inherit only the root-layout title. Adding per-page `metadata` is the single biggest sitewide win. Each page is `"use client"` and must either be refactored to a server wrapper that exports `metadata` or use `generateMetadata` in a parent. |
| 2 | / (home) | Current rendered title "Aqua Otter Water Systems \| Pure Water, Perfected" is brand + tagline only. Misses Indiana / Michigan / Ohio / Kentucky / Tennessee / North Carolina geo and primary service modifiers. |
| 3 | /about | No metadata, no Person schema, no named owner. GEO content audit flagged this as a 47/100 E-E-A-T score driver. |
| 4 | /blog index + 3 posts | Zero per-post metadata, no Article schema, no `dateModified`, no OG images. Fastest top-of-funnel blocker. |
| 5 | /service-areas/[slug] template (22 cities) | Title contains an em-dash; banned by CLAUDE.md hard rule. Affects all 22 city pages. |
| 6 | /service-areas/[slug]/[service] template (22 × 4 = 88 combo pages) | Meta description uses generic "Lifetime warranty" copy; needs more precise warranty language and city-specific differentiator. Also identical across all 88 combos minus city/service swap. |
| 7 | /reviews | Pulls real Google reviews via API per the codebase; no metadata to surface the rating in SERP. |
| 8 | /financing | No metadata. Has dedicated 4-step process and offers same-day approval. Commercial value, currently invisible. |
| 9 | /(states) template (6 hubs) | All 6 share byte-identical description templates. Add 2-3 rotating variants per state. |
| 10 | /warranty | Currently displays the warranty differentiator the whole brand leans on, but has no metadata. Lost ranking opportunity for branded queries like "Aqua Otter warranty". |

---

## 4. Proposed New Title + Meta (Top 10)

All proposals: ≤60 char titles, ≤160 char metas, NO em-dashes. Phone (317) 961-6925 per CLAUDE.md (note: a few code files contain `(317) 983-5919`; needs reconciliation with Luke before any rewrite ships).

**1. /systems hub**
- Title: `Water Treatment Systems for IN, MI, OH, KY, TN, NC` (51)
- Meta: `Softeners, no-salt conditioners, well water systems, whole-home filtration, RO, and UV. Free in-home water test across 6 Midwest states.` (137)

**1a. /systems/water-softener**
- Title: `Water Softener Installation, Midwest Family Service` (51)
- Meta: `Ion-exchange softeners installed across IN, MI, OH, KY, TN, NC. 21 gpg hard water solved, free in-home water test, family-owned since 1999.` (143)

**1b. /systems/no-salt**
- Title: `No-Salt Water Conditioner, TAC Media for Hard Water` (51)
- Meta: `Salt-free TAC water conditioning for Midwest homes. Zero brine discharge, zero salt hauling, 99% scale prevention. Free in-home water test.` (140)

**1c. /systems/well-water**
- Title: `Well Water Treatment for Iron, Sulfur, Manganese` (49)
- Meta: `AiO well water systems handle 10+ mg/L iron, hydrogen sulfide odor, and manganese without chemicals. Free in-home water test across 6 states.` (143)

**1d. /systems/filtration**
- Title: `Whole-Home Water Filtration, Carbon and Sediment` (49)
- Meta: `Quintex 5 whole-home carbon filtration. 95% chlorine removal at every tap, 1.5M-gallon media life, no cartridges. Free in-home water test.` (140)

**1e. /systems/reverse-osmosis**
- Title: `Reverse Osmosis Drinking Water Systems, Midwest` (47)
- Meta: `4-stage RO under-sink systems remove 99% of lead, 99% of arsenic, 95%+ of PFAS, 99% TDS. Free in-home water test across 6 Midwest states.` (140)

**1f. /systems/uv-purification**
- Title: `UV Water Purification for Bacteria and Viruses` (47)
- Meta: `Chemical-free UV disinfection at 254nm. Log 6 reduction on E. coli, Log 4+ on Legionella, Log 4 on Hepatitis A. Free well water testing.` (139)

**2. / (home)**
- Title: `Water Treatment in IN, MI, OH, KY, TN, NC, Family Owned` (55)
- Meta: `Aqua Otter Water Systems installs softeners, RO, well water systems, and whole-home filtration across 6 Midwest states. Free in-home water test.` (148)

**3. /about**
- Title: `About Aqua Otter Water Systems, Family Owned Since 1999` (55)
- Meta: `Family-owned water treatment company founded 1999 in Noblesville, Indiana. Serving IN, MI, OH, KY, TN, NC with free in-home water testing.` (139)

**4. /blog (index) + 3 posts**
- /blog title: `Water Treatment Blog, Midwest Homeowner Guides` (47)
- /blog meta: `Hard water, well water testing, no-salt vs softener, PFAS, and chlorine guides for Indiana, Michigan, Ohio, Kentucky, Tennessee, and NC homes.` (146)
- /blog/hard-water-indiana title: `Hard Water in Indiana, Homeowner Guide for 2026` (47)
- /blog/hard-water-indiana meta: `Why Indiana water hits 18-25 gpg, where the limestone aquifer is hardest, and how softeners vs no-salt conditioners compare. Free water test.` (142)
- /blog/softener-vs-no-salt title: `Water Softener vs No-Salt System, Honest Comparison` (51)
- /blog/softener-vs-no-salt meta: `Salt-based ion exchange vs TAC no-salt conditioning. Cost, scale prevention, environmental tradeoffs, and which fits Midwest hard water best.` (143)
- /blog/well-water-testing title: `Well Water Testing, What to Test Every Year` (44)
- /blog/well-water-testing meta: `Coliform, nitrate, iron, hardness, pH, and lead are the annual test panel for Midwest private wells. What each result means and how to fix it.` (145)

**5. /service-areas/[slug] template** (remove the em-dash)
- Title: `Water Treatment in ${city}, ${state}, Free Water Test` (≤60 for most cities)
- Meta: same as current (replace any em-dashes in body if found)

**6. /service-areas/[slug]/[service] template** (rotate 2 description variants)
- Variant A: `${service.name} installed in ${city}, ${state}. ${service.tagline} Free in-home water test, lifetime tank and media warranty, family-owned.`
- Variant B: `${city}, ${state} ${service.name} installation by Aqua Otter. Free water test, custom system design, financing available. ${service.county} County.`

**7. /reviews**
- Title: `Aqua Otter Customer Reviews, Midwest Water Treatment` (52)
- Meta: `Read verified Google reviews from Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina homeowners served by Aqua Otter Water Systems.` (147)

**8. /financing**
- Title: `Water Treatment Financing, Same-Day Approval` (44)
- Meta: `Apply online in 3 to 5 minutes for water treatment financing. Same-day approval in most cases. Installation scheduled immediately. 6-state coverage.` (149)

**9. /(states) template** (rotate 2 description variants)
- Variant A: `Family-owned water treatment across ${state}. Free in-home water testing, no-salt softeners, well water systems, RO, UV. Serving ${cityList}.`
- Variant B: `${state} homes trust Aqua Otter for softener install, well water iron and sulfur removal, and whole-home filtration. Serving ${cityList}.`

**10. /warranty**
- Title: `Aqua Otter Warranty Coverage, Backed for Life` (46)
- Meta: `Aqua Otter installs are backed for the life of the system. Call or text to report an issue, remote diagnostics first, free covered repair scheduling.` (149)

---

## 5. Per-Page Refresh Playbook

### 1. /systems/* (all 7 pages, including hub)

**Critical:** every page is `"use client"` which blocks Next.js metadata exports. Three options:
1. Refactor each page so the route file is a server component that imports the existing client UI as a child (`page.tsx` = server + `SystemsClient.tsx` = "use client"). Add `export const metadata = {...}` on the server route file. Recommended.
2. Move to `generateMetadata` in a parent layout per /systems segment (less surgical, easier breakage).
3. Build a small `<MetaTags>` client component that injects meta tags via `<Head>` (NOT recommended; deprecated pattern in App Router and AI crawlers may miss it).

Pick option 1. Each of the 7 needs its own title + meta from Section 4. Add `BreadcrumbList` and `Product`/`Service` schema with each system's named hardware (Quintex 5, AiO, Hydrotech / Puronics equivalent — verify exact equipment names with Luke before publishing schema).

### 2. / (home)

- Add full `metadata` export with Section 4 copy.
- Phase 2A PR already adds Organization + WebSite schema. Verify after merge.
- Add a "States We Serve" anchor block with H2 listing all 6 state hub URLs.
- Confirm phone number reconciliation (CLAUDE.md says 317-961-6925; legacy code has 317-983-5919). Resolve before publishing.

### 3. /about

- Refactor to server component + add metadata.
- Add `Person` schema once Luke confirms owner name. Until then, ship `Organization.foundingDate: 1999` and `Organization.foundingLocation: Noblesville, IN`.
- Strengthen E-E-A-T proof: years in trade, WQA / state plumbing license number, technician count (request from Luke; do NOT invent).
- Add /about to internal-link mesh from all systems pages.

### 4. /blog and 3 blog posts

- Refactor each post route from "use client" to a server wrapper that exports metadata + injects Article schema with `datePublished` and `dateModified`.
- Add OG image at `/public/images/blog-hero/{slug}.jpg` per FaxStrive blog template (1200×630).
- Add internal link mesh: each blog post should link to 3+ /systems pages and 1 /service-areas page minimum.
- Add 4-6 FAQ entries per post with FAQPage schema.
- Note: blog posts are currently ~830-950 words. FaxStrive blog template targets 2,200-2,500. These should be rewritten with the seomachine /rewrite skill before any further work.

### 5. /service-areas/[slug] template (22 cities)

- Drop em-dash from title.
- Add 2-line city-specific opener mentioning the local utility (Indianapolis Water, DTE, Cincinnati Water Works, Louisville Water Co, Nashville Metro Water, Charlotte Water, etc.) and 1 local hardness or contaminant figure.
- Add 1 city-specific FAQ entry per page.

### 6. /service-areas/[slug]/[service] template (~88 combos)

- Ship 2 rotating description variants per Section 4.
- Add a city-specific local utility line in body.
- Verify the "Lifetime warranty" string against actual brand language. Brief and CLAUDE.md don't define this; confirm with Luke.

### 7. /reviews

- Add metadata.
- Once `aggregateRating` count and rating are verified from the live Google Reviews API, inject `AggregateRating` schema on `Organization` (not on `Review` directly — Google deprecates standalone Review schema for service businesses).

### 8. /financing

- Add metadata + `FinancialProduct` schema if a verified APR/term range is published, OR a generic `Service` schema with `offers`.
- Add 4-step "How financing works" FAQs.

### 9. /(states) template

- Ship 2 rotating description variants.
- Add per-state hardness range, named utilities, and 1-2 contaminant flags (e.g. Michigan = PFAS, Indiana = chromium-6 SFV-style legacy parcels).
- Add link to each state's blog / library articles (e.g. Indiana → /blog/hard-water-indiana + /learn/chromium-6-indiana-water).

### 10. /warranty

- Add metadata.
- Add `Warranty` schema attached to each `Product` in the systems pages once warranty terms are documented.

---

## 6. Sitewide Metatag and Pattern Findings

**Critical**
- **22 of ~30 routes have no `metadata` export.** All systems pages, all blog posts, /, /about, /contact, /financing, /reviews, /warranty, /how-it-works, /gallery, /get-started, /learn (index), /service-areas (hub), /terms, /privacy. The root layout supplies a single brand title + description that bleeds into every SERP result. This is the dominant SEO bug on the site.
- **All affected pages are `"use client"`,** which prevents the Next.js `metadata` export pattern. A refactor is required, not just a copy paste. Owner of the next sprint should pick option 1 (server route + client UI child) so this can be remediated systematically across all 22 pages.
- **/faq is fixed by PR #1.** Phase 2A foundation adds SSR /faq + FAQPage schema. Verify after merge.

**High**
- **Em-dashes in shipped meta.** The brief and SEOMAN CLAUDE.md forbid em-dashes. Existing offenders in metadata:
  - `/service-areas/[slug]/page.tsx:20`: `Water Treatment in ${city}, ${state} — Free Water Test`
  - `/learn/what-we-filter/page.tsx:8`: `What's in your water — every contaminant we filter`
  - Body and component em-dash count across `src/` (411 total occurrences in 63 files). Worst offenders: `src/components/sections/WaterJourney.tsx` (70), `src/lib/library-articles.ts` (36).
- **Identical meta descriptions across 6 state hubs.** Each state hub uses byte-identical descriptions with state + city list swapped. Add 2 rotating variants. **[Partially shipped by PR #1, still needs variant rotation.]**
- **No Article schema on blog posts.** Three posts, zero Article markup, no `datePublished` / `dateModified`. Cited as a freshness blocker by Google + every AI crawler.
- **Phone number drift.** CLAUDE.md and live site front-end use `(317) 961-6925`. Multiple page files (warranty, others) have hardcoded `(317) 983-5919`. Resolve before any rewrite ships so the canonical NAP is stable.

**Medium**
- **OG image coverage.** With most pages lacking metadata at all, OG images are blanket-missing. Once metadata is added, ship hero images per the FaxStrive blog template (1200×630) at `/public/images/blog-hero/{slug}.jpg` for blog, and `/public/images/og/{route}.jpg` for system + core pages.
- **Canonicals.** With no `metadata`, `alternates.canonical` is never set. App Router defaults to the rendered URL but explicit canonicals are recommended, especially for the `[slug]/[service]` template that risks crawl-bloat from city × service combinatorics.
- **/llms.txt shipped by PR #1.** Verify after merge that it lists all 6 state hubs + /systems + key library articles.
- **Author byline.** All blog posts read "By the Aqua Otter Team". Acceptable until Luke confirms a real owner / lead technician, then upgrade to Person schema.

**Low**
- **/glossary has description but no title.** Inherits root-layout default title only. Add a title.
- **/learn/what-we-filter is the only learn page with a static metadata export** (the others are dynamic via `[slug]`). Fine.
- **`em-dash` body sweep.** Schedule a body-content em-dash scrub as a separate Lane after metadata is fixed. Total: 411 occurrences in 63 files in `src/`.

---

_SEOMAN Lane C audit batch 3, 2026-05-15_
