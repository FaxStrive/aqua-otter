# Technical GEO Audit — myaquaotter.com

**Target:** `https://www.myaquaotter.com/`
**Date:** 2026-05-15
**Auditor:** SEOMAN geo-technical agent
**Platform detected:** Next.js (App Router) on Vercel
**Deployment ID:** `dpl_FqD7AGasmRqww9LfghZjQaccmD2k`

---

## Technical Score: 62/100 — Fair (significant GEO gaps despite solid infra)

The site is well hosted (Vercel, HTTPS, Next.js SSR, fast edge cache) and the homepage is fully server-rendered, which is the single most important GEO requirement and the site passes it cleanly. However the GEO-specific layer is largely absent: no llms.txt stack, no JSON-LD schema on the homepage, no canonical tag, no explicit AI-crawler entries in robots.txt, and the security header stack stops at HSTS. These are all fixable in days, not weeks.

### Score Breakdown

| Category | Score | Weight | Weighted | Status |
|---|---|---|---|---|
| Server-Side Rendering | 95/100 | 25% | 23.75 | Excellent |
| Meta Tags & Indexability | 55/100 | 15% | 8.25 | Fair (missing title text, canonical) |
| Crawlability (robots.txt + sitemap + llms) | 55/100 | 15% | 8.25 | Fair (no AI bot entries, no llms.txt) |
| Security Headers | 30/100 | 10% | 3.00 | Poor (HSTS only) |
| Core Web Vitals Risk | 55/100 | 10% | 5.50 | Medium risk (images, scripts) |
| Mobile Optimization | 85/100 | 10% | 8.50 | Good |
| URL Structure | 95/100 | 5% | 4.75 | Excellent |
| Response Headers & Status | 80/100 | 5% | 4.00 | Good |
| Additional Checks (schema, redirects) | 25/100 | 5% | 1.25 | Poor (no JSON-LD) |
| **Total** | | | **67.25** | rounded down to **62/100** after critical-gap penalty |

Penalty applied: -5 points for total absence of JSON-LD on the homepage of a LocalBusiness — this is a foundational GEO miss that the weighted total under-penalises.

---

## 1. Server-Side Rendering — Status: LOW RISK (PASS)

**Rendering type:** SSR / SSG via Next.js App Router
**Framework signal:** `/_next/static/...` chunks, `__next` root, `dpl_` deployment ID in asset query strings
**Evidence of SSR:**
- Homepage HTML is **356 KB** with full body text rendered (hero copy, all H1/H2/H3 headings, footer "Cities We Serve" list, regional office details, phone number `(317) 983-5919`, claims like "99.9% pure", "5,000+ homes served" all present in raw HTML before any JS executes).
- All 15+ headings extracted from raw HTML with no JS execution.
- No empty `<div id="root">` shell pattern.
- 12 of 23 `<script>` tags use `async` or `defer` — non-blocking.

**Implication for AI crawlers:** GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot can all index full page content. This is the single biggest thing this site does right.

---

## 2. Crawlability & Indexability

### robots.txt — Status: TOO PERMISSIVE / NO EXPLICIT AI ENTRIES

Live content (verbatim):
```
User-Agent: *
Allow: /

Sitemap: https://www.myaquaotter.com/sitemap.xml
```

**14-Crawler AI-Bot Coverage Audit** — *none* of the AI crawlers have explicit directives. All fall back to `User-Agent: *` (Allow /). Default behaviour is currently full access, but no opt-in signal exists:

| Crawler | Explicit Rule | Effective Access | Notes |
|---|---|---|---|
| GPTBot | No | Allowed (via `*`) | OpenAI training crawler |
| Google-Extended | No | Allowed | Gemini / AI Overviews training opt-out token |
| ClaudeBot | No | Allowed | Anthropic primary crawler |
| anthropic-ai | No | Allowed | Anthropic legacy token |
| PerplexityBot | No | Allowed | Perplexity AI |
| Applebot-Extended | No | Allowed | Apple Intelligence opt-in |
| OAI-SearchBot | No | Allowed | ChatGPT Search live retrieval |
| CCBot | No | Allowed | Common Crawl (used by many LLMs) |
| Bytespider | No | Allowed | ByteDance / Doubao |
| Amazonbot | No | Allowed | Alexa / Rufus |
| Diffbot | No | Allowed | Knowledge graph |
| ImagesiftBot | No | Allowed | TheHive AI image |
| FacebookBot | No | Allowed | Meta AI |
| cohere-ai | No | Allowed | Cohere |

**Action:** Even though access is currently allowed by default, GEO best practice is to add explicit `Allow: /` rules per AI user-agent so future tightening of `*` does not accidentally cut AI access, and so the file states intent that AI auditors and crawler-rule scanners will see.

### XML Sitemap — Status: HEALTHY

- `https://www.myaquaotter.com/sitemap.xml` returns HTTP 200, 33 KB.
- 175 URLs listed, valid XML, all use `<lastmod>` with ISO timestamps (latest `2026-04-29`).
- Homepage `<loc>` matches canonical hostname (`www.` + HTTPS).
- No sitemap index — single flat sitemap is fine at 175 URLs.

### llms.txt / llms-full.txt / llms-qa.json — Status: ALL MISSING (404)

| File | Status |
|---|---|
| `/llms.txt` | 404 |
| `/llms-full.txt` | 404 |
| `/llms-qa.json` | 404 |

The full llms.txt stack is absent. This is the highest-leverage GEO gap because llms.txt is the emerging convention AI engines use to find a site's content map without crawling JS-heavy or low-value paths.

---

## 3. Meta Tags Audit

| Tag | Status | Value / Issue |
|---|---|---|
| `<html lang>` | Present | `en` (correct) |
| `<title>` | **Empty in raw HTML** | The `<title>` tag exists but is parsed as empty in the source dump. OG/Twitter titles confirm intent is "Aqua Otter Water Systems \| Pure Water, Perfected" — must verify the title is actually being emitted server-side. Likely React `<title>` hydration timing issue. |
| `<meta description>` | Present | "Aqua Otter designs and installs custom whole-home water treatment systems across Indiana and Michigan. Free water testing, expert installation, lifetime warranty available." (170 chars, slightly long) |
| `<meta keywords>` | Present | Outdated tag — harmless but unnecessary |
| `<link rel="canonical">` | **MISSING** | No canonical on homepage. Critical given www / non-www split. |
| `<meta robots>` | Not present | Defaults to `index, follow` (acceptable) |
| `<meta viewport>` | Present | `width=device-width, initial-scale=1` (correct) |
| Open Graph | Partial | `og:title`, `og:description`, `og:locale`, `og:type` present. **Missing `og:image` and `og:url`** |
| Twitter Card | Partial | `summary` card (consider `summary_large_image`). Missing `twitter:image` |
| hreflang | Not present | N/A — English-only US business |
| favicon/icon | Present | `/icon.png` declared at unusual size `6401x5730` — should be downscaled |

---

## 4. Security Headers

| Header | Status | Value |
|---|---|---|
| HTTPS | Yes | HTTP/2, valid cert via Vercel |
| HSTS | Present | `max-age=63072000` (2 years) — **no `includeSubDomains`, no `preload`** |
| Content-Security-Policy | **Missing** | |
| X-Frame-Options | **Missing** | |
| X-Content-Type-Options | **Missing** | |
| Referrer-Policy | **Missing** | |
| Permissions-Policy | **Missing** | |

Deductions: -10 CSP, -5 XFO, -5 XCTO, -5 Referrer, -3 Permissions, -2 HSTS missing `includeSubDomains; preload` = **-30 from baseline 100 → 30/100 security score**.

These are all single-line additions in `next.config.mjs` under `headers()`.

### Redirect & Canonical Chain

| Test | Result |
|---|---|
| `http://myaquaotter.com` → | 308 → `https://myaquaotter.com/` |
| `https://myaquaotter.com` → | 307 → `https://www.myaquaotter.com/` |
| `https://www.myaquaotter.com` | 200 (final) |

Two-hop chain when entering from `http://` apex (`http apex → https apex → https www`). Should be collapsed to a single 301 from `http://myaquaotter.com` directly to `https://www.myaquaotter.com/` to reduce hop latency and preserve link equity. The `307` from `https://` apex should also be a `301` (permanent) — `307` is correct status-code semantics for Vercel default behaviour but `301` is the SEO-correct signal for a permanent canonical-host rewrite.

---

## 5. Core Web Vitals Risk

| Vital | Risk | Indicators Found |
|---|---|---|
| LCP | Medium | Logo correctly preloaded with `fetchPriority="high"` (good). 52 of ~55 `<img>` elements lack explicit `width`/`height`. Next/Image is in use but raw `<img>` instances are not dimensioned. |
| INP | Low–Medium | 23 scripts total, 12 with async/defer. Next.js client bundle size unknown without a real network trace. Inline event handlers not observed. |
| CLS | Medium–High | Most images missing dimensions. `clamp()` typography is responsive but headings use inline `opacity: 0; transform: translateY(20px)` (scroll-reveal animation) which causes layout/visual shift on first paint if not coupled with a reserved space. |

**Note:** This is HTML-static risk inference. Confirm with PageSpeed Insights + CrUX field data via `/seo google https://www.myaquaotter.com/`.

---

## 6. Mobile Optimization — Status: GOOD

- Viewport meta correct.
- Responsive typography throughout (`clamp(...)` on every heading).
- Tailwind utility classes (`flex`, `grid`, `mb-*`) → flexible layout.
- No fixed pixel widths in extracted markup.
- Touch-target sizing not measurable from raw HTML but no obvious anti-patterns (no `<a>` with `font-size: 10px` etc).

---

## 7. URL Structure — Status: EXCELLENT

Target URL and 175 sitemap URLs are uniformly:
- HTTPS-only
- `www.` canonical host
- Lowercase, hyphenated slugs (`/how-it-works`, `/service-areas`)
- No query parameters or session IDs
- Shallow hierarchy (1–2 levels)
- Average URL length ~35 chars

No issues. This is one of the cleanest URL structures in the FaxStrive portfolio.

---

## 8. Response Headers & Status

- HTTP/2 200, served `Vercel` edge, `x-vercel-cache: HIT` (cache age 1,437,311 s ≈ 16.6 days — verify ISR/revalidate is intentional).
- `cache-control: public, max-age=0, must-revalidate` — correct for HTML with edge caching.
- `Vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch` — correct for Next.js App Router.
- `etag` present (good).
- No `X-Robots-Tag` header (defaults to allow — fine).
- No content compression header visible in HEAD response (likely brotli/gzip applied by Vercel transparently — confirm with `Accept-Encoding: gzip,br` request).

---

## 9. Schema / Structured Data — CRITICAL GAP

- JSON-LD `application/ld+json` blocks on homepage: **0**.

A LocalBusiness operating in Indiana and Michigan with a phone number, address-able regional offices, 500+ reviews, and a defined service area must publish at minimum:
- `LocalBusiness` (or `HomeAndConstructionBusiness`) with `name`, `url`, `telephone`, `address`, `areaServed`, `sameAs`, `priceRange`
- `Organization` with `logo`, `sameAs` (social profiles for entity linking)
- `BreadcrumbList`
- `Service` for the water-treatment offering
- Aggregate `Review`/`AggregateRating` (only if claims are verifiable — `500+ reviews` needs a source)

This is the lowest-effort highest-impact GEO win on the site.

---

## Priority Actions

1. **[CRITICAL]** Publish `/llms.txt`, `/llms-full.txt`, and `/llms-qa.json` covering services, service areas, FAQs, financing, warranty, and the regional-office contact info. Run `/geo llmstxt https://www.myaquaotter.com` to generate.
2. **[CRITICAL]** Add server-rendered JSON-LD to the homepage: `Organization`, `LocalBusiness` (or `Plumber`/`HomeAndConstructionBusiness`), `BreadcrumbList`. Add `Service` schema to `/how-it-works`, `Review`/`AggregateRating` only if sourced.
3. **[CRITICAL]** Add `<link rel="canonical" href="https://www.myaquaotter.com/">` to every route. Without it the `https://myaquaotter.com` → `https://www.myaquaotter.com` 307 hop creates indexation ambiguity.
4. **[HIGH]** Verify the homepage `<title>` actually renders content server-side (currently parses as empty in raw HTML). If this is a React `<title>` hoist issue, move title into Next.js `metadata` export.
5. **[HIGH]** Add explicit AI crawler `User-Agent` blocks to `/robots.txt` (all 14 listed). Even setting them to `Allow: /` makes intent unambiguous and survives future tightening of `*`.
6. **[HIGH]** Add full security header set in `next.config.mjs`:
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
   - `Content-Security-Policy` (start with report-only)
   - `X-Frame-Options: SAMEORIGIN`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(self)`
7. **[MEDIUM]** Add `og:image` (1200×630), `og:url`, `twitter:image`; upgrade Twitter card to `summary_large_image`.
8. **[MEDIUM]** Set explicit `width` and `height` (or `aspect-ratio`) on every `<img>` and Next/Image — currently 52 of ~55 images lack dimensions, driving CLS risk.
9. **[MEDIUM]** Collapse `http://apex → https://apex → https://www` to a single 301 redirect chain. Convert the apex-host `https` redirect from 307 to 301.
10. **[LOW]** Downsize the `/icon.png` favicon — declared at 6401×5730 px which is wasteful even if not user-visible.
11. **[LOW]** Drop the legacy `<meta name="keywords">` tag.

---

_SEOMAN geo-technical audit, 2026-05-15_
