export default function TermsPage() {
  return (
    <section className="pt-40 pb-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-site max-w-3xl mx-auto">
        <h1 className="font-display font-bold mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0C1F2E" }}>Terms of Service</h1>
        <p className="text-sm mb-12" style={{ color: "rgba(12,31,46,0.4)" }}>Last updated: April 19, 2026</p>
        <div className="space-y-8" style={{ color: "rgba(12,31,46,0.65)", lineHeight: 1.75 }}>
          {[
            {
              title: "Services",
              body: "Aqua Otter Water Systems provides free in-home water testing, custom water treatment system design, professional installation, and ongoing maintenance services in Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina.",
            },
            {
              title: "Free Water Test",
              body: "The free water test carries no obligation to purchase any product or service. Our specialist will test your water and explain the results. Recommendations are made based on test data only. You are under no pressure to purchase anything.",
            },
            {
              title: "Installation",
              body: "Installation is free on all systems we sell. Installation is performed by licensed and insured Aqua Otter technicians — not subcontractors. Customer must be present during installation. Customer is responsible for ensuring reasonable access to the installation location.",
            },
            {
              title: "Warranty",
              body: "Our lifetime warranty covers manufacturing defects in parts and labor for warranty repairs. The warranty applies to the original installation address and is non-transferable. Normal wear items (salt, annual filter cartridges) and damage from external causes are not covered. Full warranty details are provided in writing at the time of installation.",
            },
            {
              title: "Payments and Financing",
              body: "System prices are quoted in writing before installation. Financing is offered through third-party lending partners. Aqua Otter is not a lender. Financing terms are subject to lender approval. Installation prices do not change based on financing selection.",
            },
            {
              title: "Limitation of Liability",
              body: "Aqua Otter Water Systems is not liable for pre-existing plumbing conditions, damage caused by events outside our control, or results that differ from expectations due to inaccurate information provided by the customer. Our liability is limited to the cost of the installed system.",
            },
            {
              title: "Contact",
              body: "For questions about these terms, contact us at info@myaquaotter.com or (317) 983-5919.",
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
