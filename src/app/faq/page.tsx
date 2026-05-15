import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { FAQ_CATEGORIES } from "./faqData";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Aqua Otter Water Systems",
  description:
    "Get answers to common questions about water testing, no-salt treatment, installation, pricing, and service areas from Aqua Otter Water Systems.",
  alternates: { canonical: "https://www.myaquaotter.com/faq" },
};

export default function FAQPage() {
  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.myaquaotter.com/faq#faqpage",
    inLanguage: "en-US",
    isPartOf: { "@id": "https://www.myaquaotter.com/#website" },
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      }))
    ),
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          backgroundColor: "#ffffff",
          minHeight: "46vh",
          paddingTop: "clamp(120px, 14vh, 160px)",
          paddingBottom: "clamp(48px, 6vh, 80px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 55% 50%, rgba(18,189,251,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage: `linear-gradient(rgba(18,189,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(18,189,251,1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="container-site relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
                style={{
                  borderColor: "rgba(18,189,251,0.2)",
                  backgroundColor: "rgba(18,189,251,0.06)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#12BDFB" }}
                />
                <span
                  className="text-xs font-medium tracking-[0.1em] uppercase"
                  style={{ color: "#12BDFB" }}
                >
                  Common Questions
                </span>
              </div>
              <h1
                data-bluf
                className="font-display font-bold leading-[0.9] tracking-tight mb-5"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "#0C1F2E" }}
              >
                Everything you<br />
                <span style={{ color: "#12BDFB" }}>want to know.</span>
              </h1>
              <p style={{ color: "rgba(12,31,46,0.48)" }}>
                Can&apos;t find your answer? Call us at{" "}
                <a
                  href="tel:+13179835919"
                  className="font-medium"
                  style={{ color: "#12BDFB" }}
                >
                  (317) 983-5919
                </a>
                , we pick up.
              </p>
            </div>
            <div className="hidden lg:flex justify-end items-end">
              <Image
                src="/client/otter-thinking.png"
                alt=""
                width={220}
                height={260}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content, server-rendered <details> so every answer ships in the initial HTML */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="container-site">
          <div className="max-w-3xl mx-auto space-y-12">
            {FAQ_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <h2
                  className="font-display font-bold mb-6 pb-4 border-b"
                  style={{
                    fontSize: "1.35rem",
                    color: "#0C1F2E",
                    borderColor: "rgba(18,189,251,0.15)",
                  }}
                >
                  {cat.label}
                </h2>
                <div
                  className="bg-white rounded-3xl px-6 border"
                  style={{ borderColor: "rgba(18,189,251,0.1)" }}
                >
                  {cat.faqs.map((faq, fi) => (
                    <details
                      key={fi}
                      className="group border-b last:border-b-0"
                      style={{ borderColor: "rgba(18,189,251,0.1)" }}
                    >
                      <summary
                        className="cursor-pointer list-none w-full flex items-center justify-between gap-4 py-5 text-left"
                      >
                        <span
                          className="font-medium text-sm leading-snug"
                          style={{ color: "#0C1F2E" }}
                        >
                          {faq.q}
                        </span>
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 group-open:rotate-45 transition-transform"
                          style={{ backgroundColor: "rgba(18,189,251,0.08)" }}
                        >
                          <Plus
                            className="w-3.5 h-3.5"
                            style={{ color: "#12BDFB" }}
                          />
                        </span>
                      </summary>
                      <p
                        className="text-sm leading-relaxed pb-5"
                        style={{
                          color: "rgba(12,31,46,0.58)",
                          maxWidth: "64ch",
                        }}
                      >
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-site text-center">
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "#0C1F2E",
            }}
          >
            Still have questions?
          </h2>
          <p
            className="mb-8"
            style={{
              color: "rgba(12,31,46,0.5)",
              maxWidth: "36ch",
              margin: "0 auto 2rem",
            }}
          >
            Call or text us at{" "}
            <a
              href="tel:+13179835919"
              className="font-semibold"
              style={{ color: "#12BDFB" }}
            >
              (317) 983-5919
            </a>{" "}
            or schedule a free water test and we will answer everything in
            person.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: "#12BDFB",
              color: "#07111A",
              boxShadow: "0 0 30px rgba(18,189,251,0.35)",
            }}
          >
            Schedule Free Water Test
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
    </>
  );
}
