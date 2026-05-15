/* eslint-disable @typescript-eslint/no-explicit-any */
// Scrapes EWG Tap Water Database for every ZIP in the service-area states.
// Output: src/lib/water-profiles.json, keyed by ZIP, with utility + contaminants.
//
// Run: npx tsx scripts/scrape-ewg.ts (all states)
// npx tsx scripts/scrape-ewg.ts IN MI (just specified states)
//
// Resumable: caches ZIP→utilities and utility→data so re-runs skip done work.

import * as cheerio from "cheerio";
import pLimit from "p-limit";
import fs from "node:fs";
import path from "node:path";
import https from "node:https";

// ─── Config ──────────────────────────────────────────────────────
const TARGET_STATES_DEFAULT = ["IN", "MI", "OH", "KY", "TN", "NC"];
const targetStates = (process.argv.slice(2).length ? process.argv.slice(2) : TARGET_STATES_DEFAULT)
 .map(s => s.toUpperCase());

// GeoNames is the canonical free + CC BY USPS-derived ZIP database.
// Covers ~41,000 US ZIPs including PO-Box-only and newly-issued ZIPs.
const GEONAMES_URL = "https://download.geonames.org/export/zip/US.zip";
const GEONAMES_TXT = "US.txt";
const EWG_BASE = "https://www.ewg.org/tapwater";
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, ".cache", "ewg");
const ZIP_CACHE = path.join(CACHE_DIR, "zip-index.json");
const UTIL_CACHE = path.join(CACHE_DIR, "utility-cache.json");
const ZIP_DB_FILE = path.join(CACHE_DIR, "geonames-US.txt");
const ZIP_DB_ZIP = path.join(CACHE_DIR, "geonames-US.zip");
const OUTPUT_FILE = path.join(ROOT, "src", "lib", "water-profiles.json");

if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

// ─── Types ───────────────────────────────────────────────────────
type ContaminantHit = {
 name: string;
 this_utility: string; // measured level (e.g. "1.33 ppb")
 legal_limit: string; // legal limit (e.g. "10 ppb" or "No Legal Limit")
 health_guideline: string; // EWG guideline
 times_above: string | null; // e.g. "333x" or null if no multiplier shown
 effect: string | null; // "cancer", "developmental", etc.
};

type UtilityData = {
 pws: string;
 name: string;
 city: string;
 state: string;
 population: number | null;
 exceedance_count: number | null;
 contaminants_above_health_guidelines: ContaminantHit[];
 other_detected: ContaminantHit[];
 fetched_at: string;
};

type ZipUtility = { pws: string; name: string; city: string; state: string; population: number | null };

// ─── Cache helpers ───────────────────────────────────────────────
function loadJson<T>(p: string, def: T): T {
 if (!fs.existsSync(p)) return def;
 try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return def; }
}
function saveJson(p: string, data: unknown) {
 fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

const zipIndex: Record<string, ZipUtility[]> = loadJson(ZIP_CACHE, {});
const utilityCache: Record<string, UtilityData> = loadJson(UTIL_CACHE, {});

let savePending = false;
function debouncedSave() {
 if (savePending) return;
 savePending = true;
 setTimeout(() => {
 saveJson(ZIP_CACHE, zipIndex);
 saveJson(UTIL_CACHE, utilityCache);
 savePending = false;
 }, 1500);
}

// ─── HTTP helper (raw https for speed) ───────────────────────────
function fetchHtml(url: string, attempt = 0): Promise<string> {
 return new Promise((resolve, reject) => {
 const req = https.get(url, {
 headers: {
 "User-Agent": USER_AGENT,
 "Accept": "text/html,application/xhtml+xml",
 "Accept-Language": "en-US,en;q=0.9",
 },
 timeout: 20000,
 }, (res) => {
 // Follow redirects
 if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
 const next = res.headers.location.startsWith("http") ? res.headers.location : `${EWG_BASE}/${res.headers.location.replace(/^\//, "")}`;
 res.resume();
 return resolve(fetchHtml(next, attempt));
 }
 if (res.statusCode !== 200) {
 res.resume();
 if (attempt < 2) {
 setTimeout(() => resolve(fetchHtml(url, attempt + 1)), 1500);
 return;
 }
 return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
 }
 let body = "";
 res.setEncoding("utf8");
 res.on("data", (c) => body += c);
 res.on("end", () => resolve(body));
 });
 req.on("error", (err) => {
 if (attempt < 2) setTimeout(() => resolve(fetchHtml(url, attempt + 1)), 1500);
 else reject(err);
 });
 req.on("timeout", () => { req.destroy(new Error("timeout")); });
 });
}

// ─── ZIP DB: download GeoNames once, then parse ──────────────────
async function loadZipDb(): Promise<{ state: string; zip: string; county: string; city: string }[]> {
 if (!fs.existsSync(ZIP_DB_FILE)) {
 process.stdout.write(`Downloading GeoNames US ZIP database…\n`);
 // GeoNames is a binary zip file; download with curl and unzip via shell.
 const { execSync } = await import("node:child_process");
 execSync(`curl -sL "${GEONAMES_URL}" -o "${ZIP_DB_ZIP}"`);
 execSync(`cd "${CACHE_DIR}" && unzip -o "${ZIP_DB_ZIP}" > /dev/null && mv "${GEONAMES_TXT}" "${path.basename(ZIP_DB_FILE)}"`);
 }
 const text = fs.readFileSync(ZIP_DB_FILE, "utf8");
 const lines = text.split("\n").filter(Boolean);
 const out: { state: string; zip: string; county: string; city: string }[] = [];
 // GeoNames format (tab-delimited):
 // country postal_code place_name admin_name1 admin_code1 admin_name2 admin_code2 ...
 for (const line of lines) {
 const c = line.split("\t");
 if (c.length < 6) continue;
 const state_abbr = c[4];
 const zipcode = c[1];
 const city = c[2];
 const county = c[5] || "";
 if (!targetStates.includes(state_abbr)) continue;
 if (!/^\d{5}$/.test(zipcode)) continue;
 out.push({ state: state_abbr, zip: zipcode, county, city });
 }
 return out;
}

// ─── Parse the ZIP search-results page ───────────────────────────
function parseZipSearch(html: string): ZipUtility[] {
 const $ = cheerio.load(html);
 const out: ZipUtility[] = [];
 // Featured utility
 const featuredHref = $("a.featured-utility-link").attr("href");
 // The full list is in `.featured-utility-table tbody tr`
 $(".featured-utility-table tbody tr").each((_i, tr) => {
 const link = $(tr).find("a[href^='system.php?pws=']").first();
 const href = link.attr("href") || "";
 const m = href.match(/pws=([A-Z0-9]+)/);
 if (!m) return;
 const pws = m[1];
 const name = link.text().trim();
 const tds = $(tr).find("td");
 const cityState = $(tds[1]).text().trim();
 const popText = $(tds[2]).text().replace(/Population served:\s*/i, "").replace(/[^0-9]/g, "");
 const population = popText ? parseInt(popText, 10) : null;
 const [city, state] = cityState.split(",").map(s => s.trim());
 out.push({ pws, name, city: city || "", state: state || "", population });
 });
 // If table didn't parse but featured exists, fallback
 if (!out.length && featuredHref) {
 const m = featuredHref.match(/pws=([A-Z0-9]+)/);
 if (m) out.push({ pws: m[1], name: "", city: "", state: "", population: null });
 }
 return out;
}

// ─── Parse a utility detail page ─────────────────────────────────
function parseUtilityPage(html: string, pws: string): UtilityData {
 const $ = cheerio.load(html);

 // Name: first <h1> inside .details-hero-sub-content-wrapper containers that's NOT a contaminants count
 let name = "";
 $("h1").each((_i, el) => {
 const txt = $(el).text().trim();
 if (!name && txt && !/^\d+$/.test(txt) && !txt.includes("Find") && !txt.includes("Tap Water") && !txt.includes("Legal does")) {
 name = txt;
 }
 });

 // City + state from address-style content (best-effort)
 let city = "", state = "";
 const cityStateMatch = $(".details-hero-sub-content").text().match(/([A-Za-z .'-]+),\s*([A-Z]{2})/);
 if (cityStateMatch) { city = cityStateMatch[1].trim(); state = cityStateMatch[2]; }

 // Population
 let population: number | null = null;
 $("h1 + p, p").each((_i, el) => {
 const txt = $(el).text();
 const m = txt.match(/Population\s+(?:served|of)\s*[:]?\s*([\d,]+)/i);
 if (m && !population) population = parseInt(m[1].replace(/,/g, ""), 10);
 });
 // Fallback: any standalone integer in a section before contaminants
 if (!population) {
 $(".details-hero-sub-content h1, .pop-served-mobile + *").each((_i, el) => {
 const t = $(el).text().replace(/[^\d]/g, "");
 if (t && !population) population = parseInt(t, 10) || null;
 });
 }

 // Exceedance count: `<h1>5</h1><p>Contaminants Exceed EWG's Health Guidelines</p>`
 let exceedance_count: number | null = null;
 $("p").each((_i, el) => {
 const txt = $(el).text();
 if (/Contaminants Exceed EWG/i.test(txt)) {
 const prevH1 = $(el).prevAll("h1").first().text().trim();
 const n = parseInt(prevH1.replace(/[^\d]/g, ""), 10);
 if (!isNaN(n)) exceedance_count = n;
 }
 });

 // Contaminant cards
 const above: ContaminantHit[] = [];
 const other: ContaminantHit[] = [];

 $(".contaminant-grid-item").each((_i, el) => {
 const $el = $(el);
 const isExceeding = $el.hasClass("light-yellow-widget-2");
 const name = $el.find(".contaminant-title-wrapper h3").first().text().trim();
 const effectText = $el.find("p.potentital-effect, p.potential-effect").first().text();
 const effect = effectText ? effectText.replace(/Potential Effect:\s*/i, "").trim() : null;
 const this_utility = $el.find(".this-utility-text").first().text().replace(/This Utility:\s*/i, "").trim();
 const legal_limit = $el.find(".legal-limit-text").first().text().replace(/Legal Limit:\s*/i, "").trim();
 const health = $el.find(".health-guideline-text").first().text().replace(/EWG'?s? Health Guideline:\s*/i, "").trim();
 const times = $el.find(".detect-times-greater-than").first().text().trim() || null;

 if (!name) return;
 const hit: ContaminantHit = {
 name,
 this_utility,
 legal_limit: legal_limit || "Not Set",
 health_guideline: health,
 times_above: times,
 effect,
 };
 if (isExceeding) above.push(hit); else other.push(hit);
 });

 return {
 pws,
 name,
 city,
 state,
 population,
 exceedance_count,
 contaminants_above_health_guidelines: above,
 other_detected: other,
 fetched_at: new Date().toISOString(),
 };
}

// ─── Main scrape pipeline ────────────────────────────────────────
async function fetchUtilitiesForZip(zip: string): Promise<ZipUtility[]> {
 if (zipIndex[zip]) return zipIndex[zip];
 const html = await fetchHtml(`${EWG_BASE}/search-results.php?zip5=${zip}&searchtype=zip`);
 const utils = parseZipSearch(html);
 zipIndex[zip] = utils;
 debouncedSave();
 return utils;
}

async function fetchUtility(pws: string): Promise<UtilityData> {
 if (utilityCache[pws]) return utilityCache[pws];
 const html = await fetchHtml(`${EWG_BASE}/system.php?pws=${pws}`);
 const data = parseUtilityPage(html, pws);
 utilityCache[pws] = data;
 debouncedSave();
 return data;
}

async function main() {
 process.stdout.write(`\nEWG scrape, target states: ${targetStates.join(", ")}\n\n`);

 const zipList = await loadZipDb();
 process.stdout.write(`Loaded ${zipList.length} ZIPs across ${targetStates.length} states.\n`);

 const limit = pLimit(5);
 let zipsDone = 0;
 let zipsFailed = 0;

 // Phase 1: ZIP → utilities mapping
 process.stdout.write(`\nPhase 1: querying EWG for ${zipList.length} ZIPs (5 in parallel)…\n`);

 await Promise.all(
 zipList.map(z => limit(async () => {
 try {
 await fetchUtilitiesForZip(z.zip);
 zipsDone++;
 if (zipsDone % 50 === 0) {
 process.stdout.write(` ${zipsDone}/${zipList.length} ZIPs queried (${zipsFailed} failures)\n`);
 }
 } catch (err) {
 zipsFailed++;
 zipIndex[z.zip] = []; // don't retry next run
 }
 }))
 );

 saveJson(ZIP_CACHE, zipIndex);
 process.stdout.write(`Phase 1 complete: ${zipsDone} succeeded, ${zipsFailed} failed.\n`);

 // Phase 2: unique utilities → details
 const allPws = new Set<string>();
 for (const z of zipList) {
 for (const u of zipIndex[z.zip] ?? []) allPws.add(u.pws);
 }
 process.stdout.write(`\nPhase 2: ${allPws.size} unique utilities to fetch (${Object.keys(utilityCache).length} already cached).\n`);

 let utilDone = 0;
 let utilFailed = 0;
 const pwsArr: string[] = Array.from(allPws);

 await Promise.all(
 pwsArr.map(pws => limit(async () => {
 try {
 await fetchUtility(pws);
 utilDone++;
 if (utilDone % 50 === 0) {
 process.stdout.write(` ${utilDone}/${pwsArr.length} utilities fetched (${utilFailed} failures)\n`);
 }
 } catch (err) {
 utilFailed++;
 }
 }))
 );
 saveJson(UTIL_CACHE, utilityCache);
 process.stdout.write(`Phase 2 complete: ${utilDone} fetched, ${utilFailed} failed.\n`);

 // Phase 3: build the lookup file keyed by ZIP
 process.stdout.write(`\nPhase 3: writing lookup JSON to ${OUTPUT_FILE}…\n`);
 const out: Record<string, {
 zip: string;
 state: string;
 county: string;
 city: string;
 primary_utility: UtilityData | null;
 other_utilities: { pws: string; name: string; population: number | null }[];
 }> = {};

 for (const z of zipList) {
 const utils = zipIndex[z.zip] ?? [];
 if (!utils.length) {
 out[z.zip] = {
 zip: z.zip,
 state: z.state,
 county: z.county,
 city: z.city,
 primary_utility: null,
 other_utilities: [],
 };
 continue;
 }
 // Pick the highest-population utility as primary (most likely the actual municipal supplier)
 const sorted = [...utils].sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
 const primary = sorted[0];
 const primaryData = utilityCache[primary.pws] ?? null;
 out[z.zip] = {
 zip: z.zip,
 state: z.state,
 county: z.county,
 city: z.city,
 primary_utility: primaryData,
 other_utilities: sorted.slice(1).map(u => ({ pws: u.pws, name: u.name, population: u.population })),
 };
 }

 fs.writeFileSync(OUTPUT_FILE, JSON.stringify(out, null, 2));
 const sizeMB = (fs.statSync(OUTPUT_FILE).size / (1024 * 1024)).toFixed(2);
 process.stdout.write(`Done. Wrote ${Object.keys(out).length} ZIP profiles → ${sizeMB} MB.\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
