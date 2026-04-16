import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Aqua Otter Water Systems",
  description:
    "Terms of Service for Aqua Otter Water Systems LLC. Review our terms for using our website, services, and SMS/text messaging program.",
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">
            Terms of{" "}
            <span className="text-primary">Service</span>
          </h1>
          <p className="text-gray-500">Last updated: April 6, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-6">
              By accessing and using the Aqua Otter Water Systems LLC website and
              services, you accept and agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our
              website or services.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              2. Eligibility
            </h2>
            <p className="text-gray-600 mb-6">
              You must be at least 18 years of age to use our services or enter
              into any agreement with Aqua Otter Water Systems LLC. By using our
              services, you represent and warrant that you are at least 18 years
              old and have the legal capacity to enter into a binding contract.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              3. Services
            </h2>
            <p className="text-gray-600 mb-6">
              Aqua Otter Water Systems LLC provides water treatment services
              including free water testing, water softener installation, well
              water treatment, no-salt hard water solutions, reverse osmosis
              systems, whole house filtration, and related services throughout
              Indiana, Michigan, Ohio, Kentucky, Tennessee, and North Carolina.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              4. SMS/Text Messaging Terms
            </h2>
            <p className="text-gray-600 mb-6">
              The following terms apply specifically to our SMS/text messaging
              program.
            </p>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              4.1 Program Description
            </h3>
            <p className="text-gray-600 mb-6">
              When you opt in to our SMS program, you may receive text messages
              from Aqua Otter Water Systems LLC including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Appointment confirmations and reminders</li>
              <li>Service updates and notifications</li>
              <li>Promotional offers and special discounts</li>
              <li>Water quality alerts and tips</li>
              <li>Follow-up messages regarding your water treatment services</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              4.2 Message Frequency
            </h3>
            <p className="text-gray-600 mb-6">
              Message frequency varies based on your interactions with us and
              your service needs. You may receive approximately 4-8 messages per
              month, though this may vary.
            </p>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              4.3 Opt-Out Instructions
            </h3>
            <div className="bg-primary-50 rounded-xl p-6 border border-primary/20 mb-6">
              <p className="text-dark mb-4">
                <strong>
                  You can cancel the SMS service at any time.
                </strong>{" "}
                Just text <strong>STOP</strong> to (317) 961-6925 or reply STOP
                to any message you receive from us.
              </p>
              <p className="text-dark mb-4">
                After you send the SMS message &quot;STOP&quot; to us, you will
                receive one final SMS message to confirm that you have been
                unsubscribed. After this, you will no longer receive SMS messages
                from us.
              </p>
              <p className="text-dark">
                If you want to join again, just sign up as you did the first time
                and we will start sending SMS messages to you again.
              </p>
            </div>
            <p className="text-gray-600 mb-6">
              We also accept the following opt-out keywords:{" "}
              <strong>STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT</strong>, or any
              other reasonable opt-out request.
            </p>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              4.4 Help Instructions
            </h3>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
              <p className="text-dark mb-4">
                <strong>
                  If you are experiencing issues with the messaging program
                </strong>
                , you can reply with the keyword <strong>HELP</strong> for more
                assistance, or you can get help directly at:
              </p>
              <ul className="list-disc pl-6 text-dark space-y-2">
                <li>Email: info@myaquaotter.com</li>
                <li>Phone: (317) 961-6925</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              4.5 Message and Data Rates
            </h3>
            <p className="text-gray-600 mb-6">
              <strong>
                As always, message and data rates may apply
              </strong>{" "}
              for any messages sent to you from us and to us from you. Message
              frequency varies. If you have any questions about your text plan or
              data plan, it is best to contact your wireless provider.
            </p>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              4.6 Carrier Liability
            </h3>
            <p className="text-gray-600 mb-6">
              <strong>
                Carriers are not liable for delayed or undelivered messages.
              </strong>{" "}
              We and wireless carriers are not responsible for any delays in the
              delivery of messages or for any errors in the content of messages.
            </p>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              4.7 Supported Carriers
            </h3>
            <p className="text-gray-600 mb-4">
              Our SMS program is compatible with the following major wireless
              carriers:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
              <p className="text-dark">
                AT&amp;T, Verizon Wireless, T-Mobile, Sprint, U.S. Cellular,
                Cricket Wireless, MetroPCS, Boost Mobile, Virgin Mobile, Alltel,
                and other major carriers. Carriers are not liable for delayed or
                undelivered messages.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-dark mt-6 mb-3">
              4.8 Privacy
            </h3>
            <p className="text-gray-600 mb-6">
              Your mobile phone number and opt-in consent data will not be shared
              with third parties for marketing purposes. For more information,
              please review our{" "}
              <a
                href="/privacy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              5. User Responsibilities
            </h2>
            <p className="text-gray-600 mb-4">
              By using our website and services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Provide accurate and complete information when requested</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not interfere with or disrupt our website or services</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-gray-600 mb-6">
              All content on this website, including text, graphics, logos,
              images, and software, is the property of Aqua Otter Water Systems
              LLC or its content suppliers and is protected by intellectual
              property laws. You may not reproduce, distribute, or create
              derivative works from this content without our express written
              permission.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              7. Free Water Testing
            </h2>
            <p className="text-gray-600 mb-6">
              Our free water testing service is offered at no charge and with no
              obligation to purchase. Water tests are conducted by trained
              professionals and results are provided for informational purposes
              to help you understand your water quality.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              8. Product and Service Warranties
            </h2>
            <p className="text-gray-600 mb-6">
              All water treatment products installed by Aqua Otter Water Systems
              LLC come with manufacturer warranties. Specific warranty terms vary
              by product and will be provided at the time of purchase and
              installation.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-6">
              To the maximum extent permitted by law, Aqua Otter Water Systems
              LLC shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or relating to
              your use of our website or services. Our total liability for any
              claims arising under these terms shall not exceed the amount you
              paid for our services.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              10. Indemnification
            </h2>
            <p className="text-gray-600 mb-6">
              You agree to indemnify and hold harmless Aqua Otter Water Systems
              LLC, its officers, directors, employees, and agents from any
              claims, damages, losses, or expenses arising from your use of our
              website or services or your violation of these terms.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              11. Third-Party Links
            </h2>
            <p className="text-gray-600 mb-6">
              Our website may contain links to third-party websites. We are not
              responsible for the content or privacy practices of these external
              sites. We encourage you to review the terms and privacy policies of
              any third-party websites you visit.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              12. Governing Law
            </h2>
            <p className="text-gray-600 mb-6">
              These Terms of Service shall be governed by and construed in
              accordance with the laws of the State of Indiana, without regard to
              its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              13. Changes to Terms
            </h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these Terms of Service at any time.
              We will notify you of significant changes by posting the updated
              terms on our website. Your continued use of our services after any
              changes constitutes your acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-dark mt-8 mb-4">
              14. Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-dark font-semibold mb-2">
                Aqua Otter Water Systems LLC
              </p>
              <p className="text-gray-600">Email: info@myaquaotter.com</p>
              <p className="text-gray-600">Phone: (317) 961-6925</p>
              <p className="text-gray-600">
                Service Areas: Indiana, Michigan, Ohio, Kentucky, Tennessee &amp;
                North Carolina
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
