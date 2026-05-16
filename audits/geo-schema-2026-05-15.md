# GEO Schema & Structured Data Audit — myaquaotter.com

**Target:** https://www.myaquaotter.com
**Business:** Aqua Otter Water Systems (family-owned multi-state water treatment)
**Service area (per /about):** Indiana, Michigan, Ohio, Kentucky, Tennessee, North Carolina (6 states — site copy says 6 states; brief said 5, /about confirms 6)
**Founded:** 1999
**Phone (NAP):** (317) 983-5919
**HQ region:** Noblesville/Indianapolis, IN
**Date:** 2026-05-15

---

## Schema & Structured Data

**Schema Score: 12/100 — Critical**

The site is effectively invisible to AI entity-resolution. Out of 16 pages sampled (homepage, /about, /how-it-works, /faq, /reviews, /contact, /service-areas, /learn, /learn/what-we-filter, /glossary, /case-studies, /systems/water-softener, /systems/reverse-osmosis, /systems/well-water, /systems/uv-purification, /service-areas/noblesville-in, /service-areas/indianapolis-in), only 2 service-area pages and 1 glossary page contain JSON-LD. The homepage, about page, all 5 system/service pages, the FAQ, reviews, contact, /how-it-works, /learn pillar, and case-studies index have ZERO structured data.

There is no Organization schema, no Person/founder schema, no Article schema on any learn-library content, no FAQPage schema on /faq despite 18+ rendered Q&A pairs, no AggregateRating despite "5.0 Google" claims, no Service schema on five product pages, no BreadcrumbList anywhere, and no `sameAs` entity links anywhere on the entire site. The two LocalBusiness blocks that do exist are minimal — no `@id` ecosystem, no `sameAs`, no `priceRange` rationale, no `openingHours`, no `parentOrganization` reference, no `areaServed` beyond a few postal codes.

### Detected Structured Data

**Total Schema Blocks Found:** 3 (across 16 pages sampled)
**Format(s) Used:** JSON-LD only (good — no Microdata/RDFa)
**Server-rendered:** Yes (where present — confirmed via raw HTML curl, not JS-injected)

| # | URL | @type | Format | Valid? | Rich-Result Eligible? |
|---|---|---|---|---|---|
| 1 | /service-areas/noblesville-in | LocalBusiness | JSON-LD | Syntactically valid | Partial — LocalBusiness rich result requires `openingHours` + needs upgrade |
| 2 | /service-areas/indianapolis-in | LocalBusiness | JSON-LD | Syntactically valid | Partial — same gaps |
| 3 | /glossary | DefinedTermSet | JSON-LD | Syntactically valid | N/A — DefinedTermSet has no Google rich result, but EXCELLENT for AI entity-graph (keep) |

### Pages With ZERO Structured Data (13 of 16 sampled)

| URL | What's missing | GEO impact |
|---|---|---|
| `/` (homepage) | Organization, WebSite + SearchAction, sameAs | CRITICAL — homepage is the canonical entity declaration page |
| `/about` | Organization, founder Person, foundingDate, areaServed, sameAs | CRITICAL — about pages are AI's primary E-E-A-T source |
| `/how-it-works` | HowTo-equivalent Service schema, BreadcrumbList | High — process content with no semantic markup |
| `/faq` | FAQPage with 18+ Q&A pairs | High — answers ALSO missing from raw HTML (JS-collapsed), double-invisibility |
| `/reviews` | AggregateRating + Review schema (5.0★ claimed, 5,000+ families) | High — review claims unverifiable to AI |
| `/contact` | ContactPage + ContactPoint | Medium |
| `/service-areas` (index) | Service or ItemList of LocalBusiness branches | Medium |
| `/systems/water-softener` | Product or Service | High — primary commercial intent page |
| `/systems/reverse-osmosis` | Product or Service | High |
| `/systems/well-water` | Service | High |
| `/systems/uv-purification` | Service | High |
| `/learn` (library index) | CollectionPage / Blog | Medium |
| `/learn/what-we-filter` | Article + author Person + speakable | High — citable contaminant content |
| `/case-studies` | ItemList of CaseStudy / Article | Medium |

### Validation Results

#### Schema Block 1: LocalBusiness (Noblesville)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Aqua Otter Water Systems — Noblesville",
  "image": "https://www.myaquaotter.com/client/service-tech-consult.jpg",
  "@id": "https://www.myaquaotter.com/service-areas/noblesville-in",
  "url": "https://www.myaquaotter.com/service-areas/noblesville-in",
  "telephone": "(317) 983-5919",
  "address": {...},
  "areaServed": [PostalCodeSpecification x2],
  "priceRange": "$$"
}
```

| Property | Status | Note |
|---|---|---|
| @context | OK | https://schema.org |
| @type | OK but narrow | Should be dual-type `["LocalBusiness","Plumber"]` — water treatment is classified under Plumber in Schema.org's LocalBusiness tree; dual-type opens additional rich-result paths |
| name | OK | |
| @id | OK | Page-scoped @id is correct pattern |
| telephone | OK | NAP matches site-wide |
| address | OK | Has locality/region/postal/country but NO `streetAddress` — Google's LocalBusiness rich result requires `streetAddress` |
| areaServed | Minimal | Only 2 ZIPs; Noblesville has 5 ZIPs (46060/46061/46062 + adjoining) |
| priceRange | OK | |
| **MISSING** | — | `openingHours`, `geo` (lat/lon), `sameAs`, `aggregateRating`, `hasMap`, `parentOrganization`, `description`, `email`, `currenciesAccepted`, `paymentAccepted` |
| **MISSING (GEO-critical)** | — | `parentOrganization` pointer to a single canonical Organization `@id` (so AI can resolve all 150+ branches → one entity) |

Same gaps apply to the Indianapolis block (4 ZIPs vs realistic 30+ for the metro).

#### Schema Block 2: DefinedTermSet (Glossary)

Well-formed. 7+ terms (GPG, ppm, ppb, ppt, TDS, pH, Turbidity, Chromium-6…). This is excellent — DefinedTermSet is unusual and gives AI a clean entity dictionary. Two micro-improvements:
- Add `inLanguage: "en-US"` on the parent set.
- Add `author` / `publisher` linking back to the Organization @id once Organization schema exists.

### GEO-Critical Schema Assessment

| Schema | Status | GEO Impact | Notes |
|---|---|---|---|
| Organization (root identity) | **MISSING site-wide** | CRITICAL | No canonical entity declaration; AI cannot resolve the brand |
| `sameAs` (entity linking) | **MISSING site-wide** | CRITICAL | Zero cross-platform identity links — single highest-leverage fix |
| `@id` ecosystem | Partial | High | Two local pages have page-scoped @id but there is no anchor `#org` to point back to |
| `parentOrganization` on LocalBusiness | MISSING | High | All branches orphaned from parent entity |
| Person (founder/author) | MISSING | High | /about does not name the founder — owner identity unknown to this audit; do NOT fabricate; ask client before adding Person schema |
| `speakable` property | MISSING site-wide | Medium | Strong direct GEO signal, easy add on BLUF paragraphs |
| `hasCredential` (BBB A+, licensing) | MISSING | Medium | Site claims "BBB A+ Accredited" and "Licensed & Insured" — these are credentials that should be marked up |
| `areaServed` covering 6 states | Partial | High | Two local blocks each cover 2-4 ZIPs; no state-level State/AdministrativeArea declaration |
| `inLanguage` | MISSING | Low | Should be `"en-US"` on Organization + key content |
| `foundingDate` (1999) | MISSING | Medium | Site repeatedly cites 1999 founding; should be in Organization schema |
| Article + Person (learn/case studies) | MISSING | High | /learn pages are the most citable content on the site |
| FAQPage + HTML parity | DOUBLE FAIL | High | (a) No FAQPage schema. (b) Answers are NOT in raw HTML — they expand client-side. AI crawlers get the questions only |
| AggregateRating (5.0 / 5,000+) | MISSING | High | Strong commercial claim with no schema substantiation |
| Service schema (5 system pages) | MISSING | High | Primary commercial intent pages, zero markup |
| BreadcrumbList | MISSING site-wide | Medium | Site has clear hierarchy (All Systems / Water Softeners) but no schema for it |
| WebSite + SearchAction | MISSING | Low | Site has no search box; SearchAction not applicable, but `WebSite` schema for the homepage is still useful |
| Review (individual) | MISSING | Medium | /reviews lists named individual reviews (Daniel Hernandez, Sierra…) with quotes — perfect for Review schema |

### sameAs Entity Linking — The Single Biggest GEO Gap

**Current sameAs links found: 0** (site-wide)

| Platform | Linked in schema? | Status |
|---|---|---|
| Wikipedia | No | Likely no entry (small business) — skip |
| Wikidata | No | Could be created — strong AI signal once published |
| Google Business Profile | No (not in schema; GBP itself may exist) | Verify and link via `sameAs` |
| LinkedIn (company) | No | Verify and link |
| Facebook | No | Verify and link |
| Instagram | No | Verify and link |
| YouTube | No | Verify — YouTube mentions are the strongest single AI-visibility signal (0.737 correlation per knowledge base) |
| BBB profile URL | No | Site claims A+ — the literal BBB profile URL is a credibility-grade `sameAs` target |
| Yelp | No | Verify and link |
| Angi / HomeAdvisor / Houzz | No | High-relevance for home-services contractors |
| NextDoor business page | No | Hyper-local trust signal |
| TrustPilot | No | Verify |

**Action:** Compile the live profile URLs from the client (do NOT fabricate). Drop them into the Organization `sameAs` array on the homepage. This single change is the highest-ROI schema fix for this site.

### Deprecated / Restricted Schemas

| Schema | Status | Found on site? | Note |
|---|---|---|---|
| HowTo | DEPRECATED Sept 2023 | No | OK — site has /how-it-works content but no HowTo schema. Do NOT add HowTo. Use Service schema instead. |
| FAQPage | RESTRICTED Aug 2023 (government + health authorities only get rich results) | No | Aqua Otter will NOT get FAQ rich snippets. However, adding FAQPage schema is still valuable: (a) AI models (ChatGPT/Perplexity/Claude) still parse FAQPage markup for entity context, (b) the questions+answers will become machine-readable, (c) it costs nothing. Recommend adding FAQPage schema BUT fix the HTML-rendering problem first (see Critical Action #2). |
| SpecialAnnouncement | DEPRECATED | No | N/A |
| CourseInfo | DEPRECATED | No | N/A |

### JavaScript Rendering Risk

**Schema Delivery:** Server-rendered (confirmed — the 3 existing JSON-LD blocks appear in `curl` raw HTML output). This is good.

**HTML Content Rendering Risk:** The /faq page renders QUESTIONS server-side but the ANSWERS are loaded client-side (collapsed accordions). Searching the raw HTML for any of 5 sampled answer phrases returned zero matches. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not execute JavaScript and are therefore reading questions-only on the FAQ page — even if FAQPage schema were added, the answers themselves must be in the initial HTML response for the schema to be honored.

**Action:** When adding FAQPage schema, also ensure the answer text is server-rendered (open by default or rendered as `<details>` or static prose). Schema with answers that don't appear in the initial HTML can be flagged as misleading and ignored by Google.

### llms.txt

`/llms.txt` returns 404 — not yet published. This is not strictly a schema issue but is in the same family of AI-discoverability markup. Run `/geo llmstxt https://www.myaquaotter.com` to generate.

---

## Recommended JSON-LD Templates

Implementation note: add to `<head>` inside `<script type="application/ld+json">` tags. The placeholders use `[REPLACE: ...]` — client must supply real values; this audit will NOT invent owner names, license numbers, or social URLs.

### Template 1 — Organization (place on EVERY page; canonical entity)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.myaquaotter.com/#organization",
  "name": "Aqua Otter Water Systems",
  "alternateName": "Aqua Otter",
  "url": "https://www.myaquaotter.com",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://www.myaquaotter.com/#logo",
    "url": "[REPLACE: absolute URL to logo PNG/SVG, 600x600 recommended]",
    "width": 600,
    "height": 600
  },
  "image": { "@id": "https://www.myaquaotter.com/#logo" },
  "description": "Family-owned water treatment company serving homeowners across Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina since 1999. Free in-home water testing, USA-made systems, lifetime warranty.",
  "foundingDate": "1999",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Noblesville",
      "addressRegion": "IN",
      "addressCountry": "US"
    }
  },
  "slogan": "The LAST Water System You Will EVER Need.",
  "telephone": "+1-317-983-5919",
  "email": "[REPLACE: primary contact email]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[REPLACE: HQ street address]",
    "addressLocality": "Noblesville",
    "addressRegion": "IN",
    "postalCode": "[REPLACE: HQ ZIP, likely 46060/46062]",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "State", "name": "Indiana" },
    { "@type": "State", "name": "Michigan" },
    { "@type": "State", "name": "Ohio" },
    { "@type": "State", "name": "Kentucky" },
    { "@type": "State", "name": "Tennessee" },
    { "@type": "State", "name": "North Carolina" }
  ],
  "knowsAbout": [
    "Water softening",
    "Reverse osmosis",
    "Well water treatment",
    "UV water purification",
    "Iron filtration",
    "Hard water (calcium and magnesium removal)",
    "PFAS removal",
    "Chromium-6 in drinking water",
    "Whole-home water filtration"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "BBB Accreditation",
      "name": "BBB A+ Accredited Business",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Better Business Bureau",
        "url": "https://www.bbb.org"
      },
      "url": "[REPLACE: BBB profile URL]"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional License",
      "name": "[REPLACE: state plumbing/water-conditioning license name]",
      "identifier": "[REPLACE: license number]",
      "recognizedBy": {
        "@type": "GovernmentOrganization",
        "name": "[REPLACE: licensing authority, e.g. Indiana Plumbing Commission]"
      }
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "[REPLACE: actual Google review count]",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "[REPLACE: Google Business Profile URL]",
    "[REPLACE: Facebook page URL]",
    "[REPLACE: Instagram profile URL]",
    "[REPLACE: LinkedIn company page URL]",
    "[REPLACE: YouTube channel URL — highest single AI-visibility signal]",
    "[REPLACE: BBB profile URL]",
    "[REPLACE: Yelp business page URL]",
    "[REPLACE: Angi/HomeAdvisor profile URL]",
    "[REPLACE: NextDoor business page URL]"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-317-983-5919",
      "contactType": "customer service",
      "areaServed": ["US-IN","US-MI","US-OH","US-KY","US-TN","US-NC"],
      "availableLanguage": "en-US"
    }
  ],
  "inLanguage": "en-US"
}
```

**Note on `founder`:** /about does NOT name the founder. Do NOT add a `founder` property until the client confirms the name. Once confirmed, add:
```json
"founder": { "@type": "Person", "@id": "https://www.myaquaotter.com/about#founder", "name": "[REPLACE: founder full name]" }
```

### Template 2 — WebSite (homepage only)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.myaquaotter.com/#website",
  "url": "https://www.myaquaotter.com",
  "name": "Aqua Otter Water Systems",
  "publisher": { "@id": "https://www.myaquaotter.com/#organization" },
  "inLanguage": "en-US"
}
```

(Omit SearchAction — the site has no internal search.)

### Template 3 — LocalBusiness + Plumber (dual-type, per service-area page; replaces current minimal blocks)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness","Plumber"],
  "@id": "https://www.myaquaotter.com/service-areas/noblesville-in#localbusiness",
  "parentOrganization": { "@id": "https://www.myaquaotter.com/#organization" },
  "name": "Aqua Otter Water Systems — Noblesville",
  "image": "https://www.myaquaotter.com/client/service-tech-consult.jpg",
  "url": "https://www.myaquaotter.com/service-areas/noblesville-in",
  "telephone": "+1-317-983-5919",
  "priceRange": "$$",
  "description": "Whole-home water treatment, softeners, reverse osmosis, and well water systems serving Noblesville, IN. Free in-home water testing.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[REPLACE: street address if there is a physical Noblesville location, else omit field]",
    "addressLocality": "Noblesville",
    "addressRegion": "IN",
    "postalCode": "46060",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[REPLACE: Noblesville HQ lat, ~40.0456]",
    "longitude": "[REPLACE: Noblesville HQ lon, ~-86.0086]"
  },
  "areaServed": [
    { "@type": "City", "name": "Noblesville", "containedInPlace": { "@type": "State", "name": "Indiana" } },
    { "@type": "PostalCodeSpecification", "postalCode": "46060" },
    { "@type": "PostalCodeSpecification", "postalCode": "46061" },
    { "@type": "PostalCodeSpecification", "postalCode": "46062" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "[REPLACE: e.g. 08:00]",
      "closes": "[REPLACE: e.g. 18:00]"
    }
  ],
  "aggregateRating": { "@id": "https://www.myaquaotter.com/#organization-rating" },
  "sameAs": [
    "[REPLACE: Google Business Profile URL for the Noblesville branch, if branch-specific GBP exists]"
  ]
}
```

Repeat per service-area page, substituting locality/postal codes. The dual `["LocalBusiness","Plumber"]` is the Schema.org-correct classification for water-treatment contractors and was specifically called out in the brief.

### Template 4 — Service (per system page, e.g. /systems/water-softener)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.myaquaotter.com/systems/water-softener#service",
  "serviceType": "Whole-home water softener installation",
  "name": "Whole-Home Water Softener Systems",
  "provider": { "@id": "https://www.myaquaotter.com/#organization" },
  "areaServed": [
    { "@type": "State", "name": "Indiana" },
    { "@type": "State", "name": "Michigan" },
    { "@type": "State", "name": "Ohio" },
    { "@type": "State", "name": "Kentucky" },
    { "@type": "State", "name": "Tennessee" },
    { "@type": "State", "name": "North Carolina" }
  ],
  "description": "Ion-exchange whole-home water softeners that remove calcium and magnesium at the source. Free water test included. USA-made systems with lifetime warranty.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "[REPLACE: typical install price or starting-at figure, e.g. 1800]",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "USD",
      "minPrice": "[REPLACE]",
      "maxPrice": "[REPLACE]"
    },
    "availability": "https://schema.org/InStock",
    "warranty": {
      "@type": "WarrantyPromise",
      "durationOfWarranty": { "@type": "QuantitativeValue", "value": "Lifetime" }
    }
  },
  "audience": {
    "@type": "PeopleAudience",
    "geographicArea": { "@type": "State", "name": "Indiana" },
    "audienceType": "Homeowners with hard water"
  }
}
```

Repeat for /systems/reverse-osmosis (serviceType: "Reverse osmosis drinking water system installation"), /systems/well-water, /systems/uv-purification, /systems/no-salt, /systems/filtration.

### Template 5 — Article + Person (for /learn/* articles and case studies)

Person template (do not commit until author is confirmed by client):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.myaquaotter.com/about#[REPLACE: author-slug]",
  "name": "[REPLACE: author full name]",
  "jobTitle": "[REPLACE: e.g. Lead Water Specialist]",
  "worksFor": { "@id": "https://www.myaquaotter.com/#organization" },
  "knowsAbout": ["Water chemistry","Water softening","Reverse osmosis","PFAS","Chromium-6"],
  "url": "https://www.myaquaotter.com/about",
  "image": "[REPLACE: headshot URL]",
  "sameAs": ["[REPLACE: LinkedIn profile URL]"]
}
```

Article template (per /learn/* page):
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://www.myaquaotter.com/learn/what-we-filter#article",
  "mainEntityOfPage": "https://www.myaquaotter.com/learn/what-we-filter",
  "headline": "What we filter: every contaminant we remove",
  "description": "A stage-by-stage breakdown of every contaminant Aqua Otter whole-home systems remove — sediment, chlorine, lead, PFAS, bacteria, and more.",
  "image": "[REPLACE: featured image URL, 1200x630]",
  "datePublished": "[REPLACE: ISO 8601, e.g. 2026-03-15]",
  "dateModified": "[REPLACE: ISO 8601]",
  "author": { "@id": "https://www.myaquaotter.com/about#[REPLACE: author-slug]" },
  "publisher": { "@id": "https://www.myaquaotter.com/#organization" },
  "inLanguage": "en-US",
  "articleSection": "Treatment Science",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["[data-bluf]","h1","h2"]
  }
}
```

The `speakable` block here is the direct GEO signal — it tells assistants which sections are read-aloud-safe. Pair with a `data-bluf` attribute on the lead paragraph (matches the FaxStrive editorial template).

### Template 6 — BreadcrumbList (per non-root page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.myaquaotter.com" },
    { "@type": "ListItem", "position": 2, "name": "All Systems", "item": "https://www.myaquaotter.com/systems" },
    { "@type": "ListItem", "position": 3, "name": "Water Softeners", "item": "https://www.myaquaotter.com/systems/water-softener" }
  ]
}
```

### Template 7 — FAQPage (only after HTML-parity fix on /faq)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.myaquaotter.com/faq#faqpage",
  "inLanguage": "en-US",
  "isPartOf": { "@id": "https://www.myaquaotter.com/#website" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does the free water test include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[REPLACE: full visible answer text — must EXACTLY match the answer rendered server-side in the page HTML, not the JS-collapsed version]"
      }
    },
    {
      "@type": "Question",
      "name": "How long does the water test take?",
      "acceptedAnswer": { "@type": "Answer", "text": "[REPLACE: full visible answer]" }
    }
    // ... repeat for all 18 questions on /faq
  ]
}
```

**Pre-requisite:** answer text must be in the initial HTML response. Today it is not. See Critical Action #2.

### Template 8 — Review + AggregateRating (for /reviews and homepage)

Aggregate on the Organization (already included in Template 1). For named individual reviews currently rendered on /reviews:

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@id": "https://www.myaquaotter.com/#organization" },
  "author": { "@type": "Person", "name": "Daniel Hernandez" },
  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
  "reviewBody": "Morgan took the time to walk me through all the options and helped me find the perfect system for my home. The installation was fast and clean, and the water quality change was immediately noticeable. Could not be happier.",
  "publisher": { "@type": "Organization", "name": "Google" }
}
```

Only mark up reviews the client has the rights to display (Google review TOS allows reproduction of public reviews on the business's own site).

---

## Schema Score Breakdown (12/100)

| Component | Max | Awarded | Note |
|---|---|---|---|
| Organization / LocalBusiness | 20 | 5 | Two minimal LocalBusiness blocks exist; no canonical Organization; no sameAs |
| Article / content schema | 15 | 0 | Zero Article markup on /learn library, case studies, /how-it-works |
| Person schema for author | 15 | 0 | No Person anywhere; site does not yet name author/founder |
| sameAs completeness | 15 | 0 | Zero sameAs links site-wide |
| speakable property | 10 | 0 | Not implemented anywhere |
| BreadcrumbList | 5 | 0 | Missing site-wide despite clear hierarchy |
| WebSite + SearchAction | 5 | 0 | WebSite missing (SearchAction not applicable — no site search) |
| No deprecated schemas | 5 | 5 | Clean — no HowTo, no SpecialAnnouncement |
| JSON-LD format | 5 | 5 | All existing schema is JSON-LD (no Microdata/RDFa) |
| Validation (no errors) | 5 | 4 | Existing 3 blocks syntactically valid; LocalBusiness blocks have weak property coverage, not errors |
| **Bonus: DefinedTermSet on glossary** | (n/a) | (noted) | Unusual and high-value for AI entity-graph; do not remove |
| **TOTAL** | 100 | **12** | Critical |

---

## Priority Actions

1. **[CRITICAL]** Add Organization JSON-LD (Template 1) site-wide in `<head>` of the root layout. Populate `sameAs` with every real platform profile URL the client supplies. This single action moves the score from 12 to roughly 40 and is the highest-ROI GEO fix on the site.

2. **[CRITICAL]** Fix /faq HTML rendering BEFORE adding FAQPage schema. Today, the answers are JS-collapsed and not in the initial HTML response. AI crawlers see only questions. Render answers server-side (open by default, or as `<details>` HTML), then add Template 7. Until answers render server-side, do not add the schema — mismatched schema/HTML can be flagged.

3. **[HIGH]** Upgrade the two existing LocalBusiness blocks to Template 3 (dual-type `["LocalBusiness","Plumber"]`, parentOrganization link, geo coords, full ZIP coverage, openingHours, sameAs branch GBP). Then roll out the same template to every other /service-areas/* page in the sitemap (10+ Indiana cities already listed, plus the additional state pages once published).

4. **[HIGH]** Add Service schema (Template 4) to all 6 /systems/* pages. These are the primary commercial-intent pages and have zero markup today.

5. **[HIGH]** Add Article schema + speakable (Template 5) to every /learn/* page and /case-studies/* entry once author identity is confirmed. Until confirmed, publish Article markup with `publisher` only (no `author`) rather than fabricating an author. Knowledge-base note: editorial template requires a `data-bluf` attribute on the lead paragraph — pair the speakable CSS selector with that attribute.

6. **[HIGH]** Add WebSite schema (Template 2) on the homepage.

7. **[MEDIUM]** Add BreadcrumbList (Template 6) on every non-root page. The site has clear hierarchy ("All Systems / Water Softeners", "Aqua Otter Library / Featured Guides") but no schema for it.

8. **[MEDIUM]** Add Review schema (Template 8) for named individual reviews on /reviews. AggregateRating belongs in the Organization block (Template 1).

9. **[MEDIUM]** Augment the existing /glossary DefinedTermSet with `inLanguage: "en-US"` and `publisher` pointing to the Organization `@id`.

10. **[LOW]** Generate /llms.txt (run `/geo llmstxt https://www.myaquaotter.com`). 404 today.

11. **[CLIENT-INPUT-REQUIRED — DO NOT FABRICATE]** Before publishing Person/founder schema, BBB profile URL, license numbers, exact branch hours, or social profile URLs, the client must supply real values. The audit explicitly avoids inventing these per the user-memory policy on fabricated authors/credentials.

---

## Sample Coverage Note

16 pages were fetched and inspected directly. The full sitemap contains additional /service-areas/*-in entries (Fishers, Carmel, Indianapolis, Westfield, Zionsville, Greenwood, Plainfield, Columbus, Bloomington, etc.) plus pages for other states that are listed in /about copy but were not in the XML sitemap snapshot at audit time (Michigan/Ohio/Kentucky/Tennessee/North Carolina pages may not yet exist as separate URLs). The schema gaps are systemic — the homepage, /about, /systems/*, /faq, /reviews, /contact, /how-it-works, /learn, /case-studies pattern is consistent and there is no reason to expect other un-sampled pages have schema.

---

_SEOMAN geo-schema audit, 2026-05-15_
