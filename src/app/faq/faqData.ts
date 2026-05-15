export interface FAQ {
  q: string;
  a: string;
}

export interface FAQGroup {
  title: string;
  iconName: "HelpCircle" | "Droplets" | "Wrench" | "MapPin" | "CreditCard";
  faqs: FAQ[];
}

export const FAQ_GROUPS: FAQGroup[] = [
  {
    title: "Water Testing",
    iconName: "Droplets",
    faqs: [
      {
        q: "What does the free water test include?",
        a: "Our free in-home water test checks for hardness, iron, pH levels, TDS (total dissolved solids), chlorine, sulfur, and other contaminants specific to your area. We bring all the testing equipment right to your home and walk you through every result in real-time.",
      },
      {
        q: "How long does the water test take?",
        a: "Most water tests take about 20-30 minutes from start to finish. We test multiple parameters, explain what each one means, and answer all your questions. There's no rush, we want you to understand your water quality completely.",
      },
      {
        q: "Is the water test really free? No hidden costs?",
        a: "100% free with zero obligation. We don't charge for the test, and there's absolutely no pressure to purchase anything. We believe in earning your business through honest results and expert recommendations, not high-pressure sales.",
      },
      {
        q: "How do I prepare for a water test?",
        a: "There's almost nothing you need to do. Just make sure we can access your main water line (usually in the basement or utility area) and a kitchen or bathroom faucet. If you have a well, having access to the pressure tank area is helpful. That's it.",
      },
      {
        q: "Is my water safe to drink right now?",
        a: "Without testing, it's impossible to know for sure. Many contaminants that affect taste, odor, and safety are invisible. That's exactly why we offer free testing, so you can know with certainty what's in your water and make informed decisions about treatment.",
      },
    ],
  },
  {
    title: "Treatment & Systems",
    iconName: "Wrench",
    faqs: [
      {
        q: "What is no-salt water treatment?",
        a: "No-salt water treatment (also called salt-free conditioning) treats hard water without using salt or chemicals. Instead of ion exchange (traditional softeners), these systems use template-assisted crystallization or other technologies to prevent scale buildup while keeping beneficial minerals in your water. It's better for the environment, your health, and your plumbing.",
      },
      {
        q: "What's the difference between well water and city water treatment?",
        a: "City water is pre-treated but often contains chlorine, fluoride, and other chemicals. Well water is untreated and can contain iron, sulfur, bacteria, hardness, and sediment. Treatment approaches differ significantly, well water typically requires more comprehensive filtration, which is why testing is so important.",
      },
      {
        q: "What systems do you carry?",
        a: "We carry a full range of water treatment systems including the Alpha 3000, Quintex 5, dual city softener and filtration systems, all-in-one well water filtration, ozone treatment systems, no-salt hard water treatment, reverse osmosis systems (whole house and under-sink), sediment filters, and more. We match the system to your specific water test results.",
      },
      {
        q: "How long does installation take?",
        a: "Most installations are completed in 2-4 hours, depending on the system and your plumbing setup. We handle everything from start to finish, and we always clean up after ourselves. Your water will be flowing through your new system the same day.",
      },
      {
        q: "Is installation really free?",
        a: "Yes. Free standard installation is included with every system purchase. We believe in transparent pricing, the price you're quoted is the price you pay, with installation included. No surprise fees, no add-on charges.",
      },
      {
        q: "What maintenance do the systems require?",
        a: "Maintenance varies by system type. Salt-based softeners need salt refills. Filter systems need periodic filter changes (typically every 6-12 months). No-salt systems are very low maintenance. We'll walk you through everything during installation and are always a call or text away if you need help.",
      },
      {
        q: "What warranty do your systems come with?",
        a: "Our systems come with manufacturer warranties that vary by product, typically ranging from 5 years to lifetime warranties on tanks and valves. We also stand behind our installation work. If something isn't right, we'll make it right.",
      },
    ],
  },
  {
    title: "Service & Scheduling",
    iconName: "MapPin",
    faqs: [
      {
        q: "What areas do you serve?",
        a: "We proudly serve six states: Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina. Our service covers major cities and surrounding areas in each state. If you're not sure if we serve your area, just give us a call or text, chances are we do.",
      },
      {
        q: "How do I schedule a water test?",
        a: "Easy. You can fill out our contact form, call us at (317) 961-6925, or text us at the same number. We'll work with your schedule to find a convenient time. Evenings work great for us, so don't worry if you work during the day.",
      },
      {
        q: "Do you offer emergency service?",
        a: "While we primarily focus on water treatment system installation and testing, we understand water emergencies happen. If you're experiencing a sudden change in water quality or a system malfunction, call or text us and we'll do our best to get to you as quickly as possible.",
      },
    ],
  },
  {
    title: "Pricing & Payment",
    iconName: "CreditCard",
    faqs: [
      {
        q: "How much do water treatment systems cost?",
        a: "Pricing depends on your specific water issues and the system needed. That's why we test first, so we can recommend the right solution at the right price. We offer competitive pricing and never recommend more than you need. Contact us for a free test and honest quote.",
      },
      {
        q: "What payment options do you accept?",
        a: "We accept cash, checks, all major credit cards, and we offer financing options to help make clean water affordable for every family. We'll discuss all payment options during your consultation so you can choose what works best for your budget.",
      },
    ],
  },
];
