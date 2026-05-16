/* eslint-disable @typescript-eslint/no-var-requires */
// Generates the "10 Signs Your Water Is Damaging Your Home" lead-magnet PDF.
// Run with: npx tsx scripts/build-guide-pdf.ts
//
// Output: public/downloads/10-signs-your-water-is-damaging-your-home.pdf

import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR  = path.join(process.cwd(), "public", "downloads");
const OUT_FILE = path.join(OUT_DIR, "10-signs-your-water-is-damaging-your-home.pdf");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Brand palette
const NAVY   = "#0C1F2E";
const CYAN   = "#12BDFB";
const AMBER  = "#f59e0b";
const MUTED  = "#5d6e80";
const LIGHT  = "#eaf3f8";
const RULE   = "#cfdee7";

type Sign = {
  n: string;
  title: string;
  visible: string;       // What you can see/feel
  cause: string;         // Underlying water-chemistry cause
  cost: string;          // Monthly/annual financial impact
  fix: string;           // What treatment stage solves it
};

const SIGNS: Sign[] = [
  {
    n: "01",
    title: "Spotty dishes & cloudy glassware",
    visible: "Glasses come out of the dishwasher with white film or visible water-spot rings. Polishing doesn't fix it for long.",
    cause: "Calcium and magnesium hardness above 7 grains per gallon. The minerals stay behind as the water dries.",
    cost: "$15–$30/month in extra detergent, rinse aid, and replaced glassware over a few years.",
    fix: "Stage 3 ion-exchange softener swaps every hardness ion for sodium. Glassware comes out clean on the first run.",
  },
  {
    n: "02",
    title: "Soap that won't lather (skin & hair feel filmy)",
    visible: "You use twice the shampoo and soap to feel clean. After showering, skin feels itchy, hair feels weighed down.",
    cause: "Hardness ions bind with soap and form scum (soap curd) instead of lather.",
    cost: "2× soap/shampoo consumption ($25–$60/mo for a family) plus skin-care products to compensate.",
    fix: "Soft water makes soap go further by 50–75%. Most homeowners cut their soap budget in half.",
  },
  {
    n: "03",
    title: "Orange or rust stains on porcelain",
    visible: "Toilets, tubs, sinks develop orange-brown stains that come back days after cleaning.",
    cause: "Dissolved iron oxidizing on contact with air. Common on well water and aging municipal lines.",
    cost: "Stains permanently etch porcelain over time. Premature fixture replacement: $400–$2,000.",
    fix: "Stage 1 sediment + Stage 3 softener (with iron-grade resin) removes iron up to 3 ppm at the source.",
  },
  {
    n: "04",
    title: "Chlorine smell at the tap",
    visible: "Water smells like a swimming pool. Stronger first thing in the morning or after the city flushes the lines.",
    cause: "Free chlorine or chloramine residual from municipal disinfection. Your lungs are absorbing it during showers.",
    cost: "Skin and respiratory irritation for sensitive families. Chlorine also strips the natural oils from your skin.",
    fix: "Stage 2 catalytic carbon block adsorbs both chlorine and chloramine. Water tastes and smells like nothing.",
  },
  {
    n: "05",
    title: "Rotten-egg / sulfur odor",
    visible: "The water smells like sulfur, especially the hot side. The odor is worst right after a faucet has been off for hours.",
    cause: "Hydrogen sulfide gas (H2S) from anaerobic bacteria, common in well water and aging water heaters.",
    cost: "Corrodes copper plumbing, brass valves, and water-heater anode rods. Replacement: $800–$3,000.",
    fix: "Air-injection oxidation + carbon filtration eliminates H2S entirely. Aqua Otter sizes this to your test results.",
  },
  {
    n: "06",
    title: "Scale buildup on showerheads, faucets, kettles",
    visible: "Crusty white-gray rings on every fixture. Showerhead spray pattern weakens within months. Kettle has a chalky lining.",
    cause: "Calcium carbonate crystallizing as water evaporates. The same scale builds up where you can't see it — inside pipes, water heaters, dishwashers.",
    cost: "A scaled water heater uses 20–30% more energy and lasts half as long. $400–$1,500 in replacement + utility costs.",
    fix: "Soft water leaves zero scale. Existing scale dissolves over weeks once supply stops feeding it.",
  },
  {
    n: "07",
    title: "Appliances dying years early",
    visible: "Dishwashers and water heaters fail at 6–8 years instead of 12–15. Heating elements coated in white scale when serviced.",
    cause: "Scale insulates heating elements. They run hotter, work harder, and burn out.",
    cost: "Replacing a water heater + dishwasher 5 years early = $2,500–$4,000 over a decade. Multiply across the next 30 years.",
    fix: "Treated water extends appliance life by 2× on average. Manufacturer warranties even cite hardness limits.",
  },
  {
    n: "08",
    title: "Your tap water tastes 'off' — flat, metallic, or chemical",
    visible: "You buy bottled water for drinking. Coffee tastes worse than at restaurants. Your kids refuse to drink from the tap.",
    cause: "Combination of chlorine, dissolved metals (iron, copper), and total dissolved solids (TDS).",
    cost: "Bottled-water habit for a family of four: $40–$120/month. Plus the plastic.",
    fix: "Stage 2 carbon + Stage 3 softener handle taste at the whole-house level. Add reverse osmosis at the kitchen sink for 99% pure drinking water.",
  },
  {
    n: "09",
    title: "Laundry that fades, stiffens, or grays over time",
    visible: "Whites turn gray, towels feel stiff, dark colors fade fast. Detergent residue visible on freshly-washed clothes.",
    cause: "Hardness binds with detergent → less cleaning power. Iron oxidation also stains fabrics yellow over time.",
    cost: "Clothes wear out 30–40% faster. For a family of four: $400–$800/year in early-replacement cost.",
    fix: "Soft water lets detergent actually clean. Whites stay white, colors stay vibrant, towels stay soft.",
  },
  {
    n: "10",
    title: "Pipe corrosion: blue-green stains, pinhole leaks, low pressure",
    visible: "Blue-green staining on white sinks and tubs. Mystery leaks at joints. Slow pressure loss over years.",
    cause: "Aggressive water (low pH or high TDS) leaching copper from your pipes. The blue stain is dissolved copper.",
    cost: "Re-piping a 2,500 sq ft home: $8,000–$15,000. And one missed leak can cause water damage in the tens of thousands.",
    fix: "pH neutralization + scale-inhibiting blends are added to the system based on your water test. We measure first, then engineer.",
  },
];

// ─── Build the PDF ────────────────────────────────────────────────
const doc = new PDFDocument({ size: "LETTER", margin: 56, bufferPages: true, info: {
  Title: "10 Signs Your Water Is Damaging Your Home",
  Author: "Aqua Otter Water Solutions",
  Subject: "Free homeowner's guide to recognizing water-quality problems",
  Keywords: "water filtration, water softener, hard water, well water, Indiana, Michigan",
}});

doc.pipe(fs.createWriteStream(OUT_FILE));

// Helpers
function ruleLine(y?: number) {
  const startY = y ?? doc.y;
  doc.save().moveTo(56, startY).lineTo(556, startY).strokeColor(RULE).lineWidth(0.6).stroke().restore();
}

function eyebrow(text: string, color = CYAN) {
  doc.font("Helvetica-Bold").fontSize(8).fillColor(color).text(text.toUpperCase(), { characterSpacing: 2 });
  doc.moveDown(0.4);
}

function heading(text: string, size = 28, color = NAVY) {
  doc.font("Helvetica-Bold").fontSize(size).fillColor(color).text(text);
}

function body(text: string, color = NAVY, size = 11) {
  doc.font("Helvetica").fontSize(size).fillColor(color).text(text, { lineGap: 4 });
}

function smallLabel(text: string, color = CYAN) {
  doc.font("Helvetica-Bold").fontSize(8).fillColor(color).text(text.toUpperCase(), { characterSpacing: 1.5 });
}

// ─── COVER PAGE ───────────────────────────────────────────────────
doc.rect(0, 0, doc.page.width, doc.page.height).fill(NAVY);

// Cyan corner accent
doc.save();
doc.rect(0, 0, 8, doc.page.height).fill(CYAN);
doc.restore();

// Header brand row
doc.fillColor(CYAN).font("Helvetica-Bold").fontSize(9).text("AQUA OTTER", 56, 60, { characterSpacing: 4 });
doc.fillColor("#7d96aa").font("Helvetica").fontSize(8).text("WATER SOLUTIONS · INDIANA + MICHIGAN", 56, 73, { characterSpacing: 1.2 });

// Big eyebrow
doc.fillColor(CYAN).font("Helvetica-Bold").fontSize(10).text("FREE HOMEOWNER GUIDE", 56, 240, { characterSpacing: 3 });

// Title
doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(46).text("10 Signs Your", 56, 270, { lineGap: -8 });
doc.fillColor("#ffffff").fontSize(46).text("Water Is Damaging", 56);
doc.fillColor(CYAN).fontSize(46).text("Your Home.", 56);

// Subtitle
doc.fillColor("#a8b9c8").font("Helvetica").fontSize(13).text(
  "Most homeowners can't see what's happening to their water until it's costing them thousands. This guide shows you exactly what to look for, what each sign costs you every month, and how to fix it.",
  56, 460, { width: 480, lineGap: 4 }
);

// Footer cover info
doc.fillColor("#7d96aa").font("Helvetica-Bold").fontSize(8).text("WHAT'S INSIDE", 56, 600, { characterSpacing: 2 });
doc.fillColor("#a8b9c8").font("Helvetica").fontSize(10).text(
  "10 visible warning signs · The chemistry behind each one · Real monthly cost estimates · Which treatment stage solves it",
  56, 615, { width: 480, lineGap: 4 }
);

doc.fillColor("#7d96aa").font("Helvetica-Bold").fontSize(8).text("WRITTEN BY", 56, 690, { characterSpacing: 2 });
doc.fillColor("#ffffff").font("Helvetica").fontSize(10).text("The Aqua Otter Field Team", 56, 705);
doc.fillColor("#7d96aa").font("Helvetica").fontSize(9).text("5,000+ installs across Indiana + Michigan", 56, 720);

// Cover footer rule
doc.save().moveTo(56, doc.page.height - 50).lineTo(556, doc.page.height - 50).strokeColor("#1a3a55").lineWidth(0.5).stroke().restore();
doc.fillColor("#7d96aa").font("Helvetica").fontSize(8).text("myaquaotter.com  ·  (317) 961-6925", 56, doc.page.height - 40, { characterSpacing: 0.5 });
doc.fillColor("#7d96aa").text("Free water test included with every consultation", 56, doc.page.height - 40, { width: 500, align: "right" });

// ─── INTRO PAGE ───────────────────────────────────────────────────
doc.addPage();

eyebrow("Before we get into the signs", CYAN);
heading("Why this guide exists.", 26);
doc.moveDown(0.6);

body("Water is the only utility that touches every appliance, every fixture, every load of laundry, every glass you drink, and every shower you take. When something is wrong with it, the damage compounds quietly — month after month, year after year — until the bill arrives in the form of a dead water heater, ruined dishwasher, stained tub, or doctor visit.", NAVY, 11);
doc.moveDown(0.6);
body("The thing is, most water problems are visible if you know what to look for. The signs are right there on your fixtures, in your laundry, on your skin, and at the tip of your tongue. You just have to know how to read them.", NAVY, 11);
doc.moveDown(0.6);
body("This guide walks you through 10 of the most common warning signs. For each, you'll see what causes it at the chemistry level, what it actually costs you, and which treatment stage fixes it. By the end, you'll be able to walk through your own home and diagnose roughly what's in your water — without an expensive lab test.", NAVY, 11);
doc.moveDown(1.2);

// Callout box
const calloutY = doc.y;
doc.save().rect(56, calloutY, 500, 90).fillAndStroke(LIGHT, CYAN).restore();
doc.font("Helvetica-Bold").fontSize(10).fillColor(NAVY).text("WANT TO SKIP THE GUESSWORK?", 72, calloutY + 16, { characterSpacing: 1.5 });
doc.font("Helvetica").fontSize(11).fillColor(NAVY).text(
  "We'll come out, run a free 12-point water test on your tap, and tell you exactly what's in your water and what it would take to fix.",
  72, calloutY + 32, { width: 470, lineGap: 3 }
);
doc.font("Helvetica-Bold").fontSize(10).fillColor(CYAN).text("Schedule yours: myaquaotter.com/get-started  ·  (317) 961-6925", 72, calloutY + 70);

doc.moveDown(2);

// ─── SIGNS ────────────────────────────────────────────────────────
SIGNS.forEach((s, idx) => {
  // each sign on its own page for clean layout
  doc.addPage();

  // Big number watermark in top-right
  doc.save();
  doc.fillColor(LIGHT).font("Helvetica-Bold").fontSize(180).opacity(0.7);
  doc.text(s.n, 380, 30, { align: "right", width: 176 });
  doc.restore();

  // Eyebrow
  doc.fillColor(AMBER).font("Helvetica-Bold").fontSize(8).text(`SIGN ${s.n} OF 10`, 56, 80, { characterSpacing: 2.5 });

  // Title
  doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(26).text(s.title, 56, 100, { width: 460, lineGap: -2 });

  doc.moveDown(1);
  ruleLine();
  doc.moveDown(1);

  // What you can see
  smallLabel("WHAT YOU CAN SEE OR FEEL", AMBER);
  doc.moveDown(0.3);
  body(s.visible);
  doc.moveDown(0.9);

  // The cause
  smallLabel("WHAT'S CAUSING IT", "#7c3aed");
  doc.moveDown(0.3);
  body(s.cause);
  doc.moveDown(0.9);

  // The cost
  smallLabel("WHAT IT COSTS YOU", "#dc2626");
  doc.moveDown(0.3);
  body(s.cost);
  doc.moveDown(0.9);

  // The fix
  smallLabel("HOW WE FIX IT", CYAN);
  doc.moveDown(0.3);
  body(s.fix);
  doc.moveDown(1.5);

  // bottom progress bar
  const progressY = doc.page.height - 80;
  doc.save();
  doc.rect(56, progressY, 500, 4).fill("#e1ecf3");
  doc.rect(56, progressY, 500 * ((idx + 1) / 10), 4).fill(CYAN);
  doc.restore();

  doc.fillColor(MUTED).font("Helvetica").fontSize(8).text(`${idx + 1} of 10`, 56, progressY + 12);
  doc.fillColor(MUTED).text("myaquaotter.com  ·  (317) 961-6925", 56, progressY + 12, { width: 500, align: "right" });
});

// ─── WHAT NOW PAGE ────────────────────────────────────────────────
doc.addPage();

eyebrow("So you spotted some signs.", CYAN);
heading("What now?", 32);
doc.moveDown(0.7);

body("If even one of these signs sounds familiar, your water is costing you something — every single month — that you'd never get an itemized bill for. The good news: it's almost always fixable, and the fix pays for itself.", NAVY, 11);
doc.moveDown(0.6);
body("Here's how Aqua Otter handles it:", NAVY, 11);
doc.moveDown(0.8);

const STEPS = [
  { n: "01", title: "Free in-home water test", body: "We come to you and run a 12-point analysis on your actual tap water. No samples shipped to a lab. You see results in under 30 minutes." },
  { n: "02", title: "Custom system design", body: "Based on your water chemistry, your home's plumbing, and your family's usage — not a one-size-fits-all package." },
  { n: "03", title: "Same-week installation", body: "Our installers are W-2 employees, not subcontractors. Most homes are up and running in 2–4 hours." },
  { n: "04", title: "Lifetime warranty", body: "Parts, labor, and electronics. We manufacture our systems, so we stand behind them." },
];

STEPS.forEach((step) => {
  const y = doc.y;
  // Number circle
  doc.save();
  doc.circle(72, y + 12, 14).fillAndStroke(CYAN, CYAN);
  doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(10).text(step.n, 60, y + 8, { width: 24, align: "center" });
  doc.restore();

  doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(13).text(step.title, 100, y + 6);
  doc.fillColor(MUTED).font("Helvetica").fontSize(10).text(step.body, 100, y + 24, { width: 440, lineGap: 3 });

  doc.moveDown(2.5);
});

doc.moveDown(0.5);

// CTA box
const ctaY = doc.y;
doc.save().rect(56, ctaY, 500, 130).fill(NAVY).restore();
doc.fillColor(CYAN).font("Helvetica-Bold").fontSize(9).text("READY WHEN YOU ARE", 72, ctaY + 22, { characterSpacing: 2.5 });
doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(22).text("Schedule your free water test.", 72, ctaY + 40);
doc.fillColor("#a8b9c8").font("Helvetica").fontSize(11).text("No commitment. No high-pressure pitch. We test, we tell you what's in there, and we leave you the report.", 72, ctaY + 70, { width: 460, lineGap: 3 });

doc.fillColor(CYAN).font("Helvetica-Bold").fontSize(11).text("myaquaotter.com/get-started  ·  (317) 961-6925", 72, ctaY + 105);

// ─── BACK PAGE / FOOTER ───────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(NAVY);

doc.fillColor(CYAN).font("Helvetica-Bold").fontSize(10).text("AQUA OTTER", 56, 80, { characterSpacing: 3 });
doc.fillColor("#7d96aa").font("Helvetica").fontSize(8).text("WATER SOLUTIONS", 56, 94, { characterSpacing: 1.5 });

doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(36).text("Pure water.", 56, 200, { lineGap: -4 });
doc.fillColor("#ffffff").fontSize(36).text("Built right.", 56);
doc.fillColor(CYAN).fontSize(36).text("Warranted for life.", 56);

doc.fillColor("#a8b9c8").font("Helvetica").fontSize(11).text(
  "We've designed, built, and installed over 5,000 water systems across Indiana and Michigan. Every one engineered for the home it sits in. Every one warranted for as long as you own that home.",
  56, 380, { width: 480, lineGap: 4 }
);

// Trust column
doc.fillColor(CYAN).font("Helvetica-Bold").fontSize(9).text("WHAT WE STAND ON", 56, 480, { characterSpacing: 2 });
doc.moveDown(0.5);
const trust = [
  "5,000+ installs across IN + MI",
  "Manufacturer-direct: no middlemen, no markups",
  "W-2 install crew (not subcontractors)",
  "Lifetime warranty on parts, labor, electronics",
  "Free water test included with every consultation",
];
trust.forEach(t => {
  doc.fillColor(CYAN).text("●", 56, doc.y);
  doc.fillColor("#ffffff").font("Helvetica").fontSize(10).text(t, 72, doc.y - 12, { width: 480 });
  doc.moveDown(0.25);
});

// Contact strip
const cY = doc.page.height - 130;
doc.save().moveTo(56, cY).lineTo(556, cY).strokeColor("#1a3a55").lineWidth(0.5).stroke().restore();

doc.fillColor("#7d96aa").font("Helvetica-Bold").fontSize(8).text("PHONE", 56, cY + 16, { characterSpacing: 2 });
doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(13).text("(317) 961-6925", 56, cY + 30);

doc.fillColor("#7d96aa").font("Helvetica-Bold").fontSize(8).text("WEB", 226, cY + 16, { characterSpacing: 2 });
doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(13).text("myaquaotter.com", 226, cY + 30);

doc.fillColor("#7d96aa").font("Helvetica-Bold").fontSize(8).text("HOURS", 396, cY + 16, { characterSpacing: 2 });
doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(13).text("Mon–Sat", 396, cY + 30);

doc.fillColor("#7d96aa").font("Helvetica").fontSize(8).text("© Aqua Otter Water Solutions  ·  This guide is provided free for educational use.", 56, doc.page.height - 35);

// ─── DONE ─────────────────────────────────────────────────────────
doc.end();

// Pipe writes async; the stream finish event will fire after end().
process.stdout.write(`\nGenerating ${OUT_FILE}...\n`);
