// FAQ source data, shared between the server-rendered page and the
// FAQPage JSON-LD payload. Answer text MUST match the rendered HTML
// exactly so the schema is honored by AI crawlers and Google.

export interface FAQ {
  q: string;
  a: string;
}

export interface FAQCategory {
  label: string;
  faqs: FAQ[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    label: "Water Testing",
    faqs: [
      {
        q: "What does the free water test include?",
        a: "Our certified water specialist tests for hardness (GPG), iron content (mg/L), pH levels, chlorine (ppm), total dissolved solids (TDS), hydrogen sulfide, manganese, and bacterial indicators. You get a full written report and an on-the-spot explanation of what each reading means for your family.",
      },
      {
        q: "How long does the water test take?",
        a: "About 30 to 45 minutes from start to finish. We test right there in your home, explain the results clearly, and answer every question you have before we leave, with no pressure to do anything afterward.",
      },
      {
        q: "Is the water test really free? No hidden costs?",
        a: "Completely free. No cost, no obligation, and no credit card required. We believe every family deserves to know what is in their water, regardless of whether they buy a system from us.",
      },
      {
        q: "How do I prepare for a water test?",
        a: "No preparation needed. Just let us know if you have a water softener already installed, or if there are any specific concerns you want us to focus on. We bring all testing equipment.",
      },
      {
        q: "Is my water safe to drink right now?",
        a: "In most cases, municipal water meets EPA standards for immediate safety, but standards do not account for taste, hardness, or longer-term concerns like chlorine byproducts. Well water can vary significantly and should be tested annually. Our free test gives you a definitive answer for your specific water.",
      },
    ],
  },
  {
    label: "Treatment & Systems",
    faqs: [
      {
        q: "What is no-salt water treatment?",
        a: "No-salt systems use template-assisted crystallization (TAC) to convert dissolved calcium and magnesium into harmless crystals that cannot stick to surfaces. Unlike traditional softeners, they do not remove minerals from the water, they just change the form so scale cannot form. No salt bags, no brine discharge, virtually no maintenance.",
      },
      {
        q: "What is the difference between well water and city water treatment?",
        a: "City water is pre-treated by your municipality but typically contains chlorine, chloramines, and often elevated hardness. Well water is untreated and can contain iron, sulfur (hydrogen sulfide), manganese, bacteria, pH imbalances, and sediment depending on your aquifer. The treatment approach and equipment are different for each source, which is exactly why we test first.",
      },
      {
        q: "What systems do you carry?",
        a: "We carry a full range: water softeners (single, twin, and dual city), whole-home carbon filtration (Alpha 3000, Quintex 5), well water air injection systems, reverse osmosis (5-stage, 4-stage, whole-home, and alkaline), no-salt conditioners, UV purification systems, and specialty media for arsenic, fluoride, tannins, and more. All products are made in the USA.",
      },
      {
        q: "How long does installation take?",
        a: "Most installations are completed in 2 to 4 hours. Our technician handles all plumbing connections, system programming, and bypass valve installation. We clean up completely and walk you through your new system before leaving.",
      },
      {
        q: "Is installation really free?",
        a: "Yes, free installation on every system we sell. The system price is the full price. No separate labor fee, no trip charge.",
      },
      {
        q: "What maintenance do the systems require?",
        a: "Water softeners need salt refills approximately every 6 to 8 weeks depending on household size and water hardness. Filter-based systems require media or cartridge replacement every 1 to 3 years. Reverse osmosis membranes typically last 2 to 3 years. We offer annual maintenance programs with filter replacement reminders and service visits.",
      },
      {
        q: "What warranty do your systems come with?",
        a: "We offer a lifetime warranty on our systems. If anything fails due to manufacturing defect, we repair or replace it at no charge. We also offer a satisfaction guarantee, if your water quality is not right after installation, we make it right.",
      },
    ],
  },
  {
    label: "Service & Scheduling",
    faqs: [
      {
        q: "What areas do you serve?",
        a: "We serve homeowners across Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina. In Indiana, we cover Indianapolis, Fishers, Carmel, Noblesville, Westfield, Zionsville, Greenwood, Columbus, Bloomington, South Bend, Fort Wayne, and surrounding areas. In Michigan, we cover Grand Rapids, Detroit Metro, Kalamazoo, and surrounding areas.",
      },
      {
        q: "How do I schedule a water test?",
        a: "Call or text us at (317) 983-5919, email info@myaquaotter.com, or fill out the form on our contact page. We respond within one business day and can often schedule within the same week.",
      },
      {
        q: "Do you offer emergency service?",
        a: "Yes. For system issues or urgent water quality concerns, call or text (317) 983-5919. We do our best to respond to existing customers promptly.",
      },
    ],
  },
  {
    label: "Pricing & Payment",
    faqs: [
      {
        q: "How much do water treatment systems cost?",
        a: "System pricing varies based on your water chemistry and the treatment required. Entry-level filtration systems start around $1,200. Full softening and filtration combinations run $2,500 to $4,500. Whole-home reverse osmosis systems are priced separately. We provide a written quote after your free water test, no guessing, no surprises.",
      },
      {
        q: "What payment options do you accept?",
        a: "We accept cash, check, and all major credit cards. Financing options are also available for qualified customers. Ask your specialist during your water test appointment.",
      },
    ],
  },
];
