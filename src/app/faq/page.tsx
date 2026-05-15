import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Phone,
  ArrowRight,
  HelpCircle,
  Droplets,
  Wrench,
  MapPin,
  CreditCard,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { InlineCTA } from "@/components/InlineCTA";
import { FAQ_GROUPS } from "./faqData";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Aqua Otter Water Systems",
  description:
    "Get answers to common questions about water testing, no-salt treatment, installation, pricing, service areas, and more from Aqua Otter Water Systems.",
  alternates: { canonical: "https://www.myaquaotter.com/faq" },
};

const PHONE = "(317) 961-6925";
const PHONE_TEL = "tel:3179616925";

const ICONS = {
  HelpCircle,
  Droplets,
  Wrench,
  MapPin,
  CreditCard,
};

export default function FAQPage() {
  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.myaquaotter.com/faq#faqpage",
    inLanguage: "en-US",
    isPartOf: { "@id": "https://www.myaquaotter.com/#website" },
    mainEntity: FAQ_GROUPS.flatMap((g) =>
      g.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      }))
    ),
  };

  return (
    <main>
      {/* Hero */}
      <Section background="dark" padding="none">
        <div className="min-h-[35vh] flex flex-col items-center justify-center text-center py-16 sm:py-24">
          <div className="mb-4">
            <Image
              src="/client/otter-thinking.png"
              alt="Aqua Otter thinking"
              width={120}
              height={120}
              className="w-20 h-20 object-contain drop-shadow-lg mx-auto"
            />
          </div>
          <span className="inline-block bg-accent/20 text-accent-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            FAQ
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-tight mb-4">
            Frequently Asked{" "}
            <span className="text-[var(--color-accent)]">Questions</span>
          </h1>
          <p className="text-white/70 max-w-xl text-base sm:text-lg">
            Everything you need to know about our water testing, treatment
            systems, service, and more.
          </p>
        </div>
      </Section>

      {/* FAQ Groups, server-rendered <details> so answers ship in the initial HTML */}
      {FAQ_GROUPS.map((group, gi) => {
        const Icon = ICONS[group.iconName];
        return (
          <div key={group.title}>
            <Section
              background={gi % 2 === 0 ? "white" : "surface"}
              gradient={gi % 2 === 0 ? "radial-left" : "radial-right"}
            >
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-dark">
                    {group.title}
                  </h2>
                </div>
                <div className="space-y-3">
                  {group.faqs.map((faq, fi) => (
                    <details
                      key={`${gi}-${fi}`}
                      className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                        <span className="font-heading font-bold text-dark text-sm sm:text-base">
                          {faq.q}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </Section>

            {gi === 0 && (
              <InlineCTA
                variant="banner"
                text="Have a Question We Didn't Answer?"
                message="Give us a call or text anytime. We love talking water."
                href="/contact"
              />
            )}
            {gi === 1 && (
              <InlineCTA
                variant="button"
                text="Schedule Your Free Water Test"
                trustLine="100% free, no obligation, takes about 30 minutes"
                href="/contact"
              />
            )}
            {gi === 2 && (
              <InlineCTA
                variant="text"
                text="Ready to get started? Contact us today"
                href="/contact"
              />
            )}
          </div>
        );
      })}

      {/* Still Have Questions CTA */}
      <Section background="dark">
        <div className="text-center max-w-2xl mx-auto">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4 opacity-60" />
          <h2 className="text-2xl sm:text-3xl font-heading font-black mb-3">
            Still Have <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-white/70 mb-6">
            We're real people who love talking about water. Call, text, or
            fill out our form, we'll get back to you fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="btn-shimmer-gold text-dark font-bold px-8 py-4 rounded-xl text-sm hover:scale-105 transition-all inline-flex items-center gap-2 justify-center"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all justify-center"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
    </main>
  );
}
