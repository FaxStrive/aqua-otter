export default function PrivacyPage() {
  return (
    <section className="pt-40 pb-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-site max-w-3xl mx-auto">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E" }}>Privacy Policy</h1>
        <p className="text-sm mb-12" style={{ color: "rgba(12,31,46,0.4)" }}>Last updated: April 19, 2026</p>
        <div className="prose-content space-y-8" style={{ color: "rgba(12,31,46,0.65)", lineHeight: 1.75 }}>
          {[
            {
              title: "Information We Collect",
              body: "When you submit a water test request or contact form, we collect your name, phone number, email address, and city or zip code. If you call or text us, we retain your phone number for the purpose of scheduling and follow-up. We do not collect payment information directly — all financing applications are handled through our lending partners.",
            },
            {
              title: "How We Use Your Information",
              body: "We use your contact information solely to schedule and perform your free water test, follow up on your service appointment, and communicate about your water treatment system. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
            },
            {
              title: "Communications",
              body: "By submitting your phone number, you agree that Aqua Otter Water Systems may contact you by phone or text message regarding your water test request. You may opt out of communications at any time by replying STOP to any text message or by calling (317) 983-5919.",
            },
            {
              title: "Cookies and Analytics",
              body: "Our website uses standard analytics tools to understand how visitors interact with our site. This data is aggregated and anonymous — we do not track individual users across other websites.",
            },
            {
              title: "Data Security",
              body: "We implement reasonable security measures to protect your personal information. Our website uses HTTPS encryption for all data transmission.",
            },
            {
              title: "Your Rights",
              body: "You may request to access, correct, or delete your personal information at any time by contacting us at info@myaquaotter.com or (317) 983-5919.",
            },
            {
              title: "Contact Us",
              body: "If you have questions about this Privacy Policy, contact us at info@myaquaotter.com or call (317) 983-5919.",
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="font-display font-bold mb-3" style={{ fontSize: "1.25rem", color: "#0C1F2E" }}>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
