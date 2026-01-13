import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FCF4F8] relative overflow-hidden">
      {/* Dotted Background Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #FF851A 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <button className="mb-6 flex items-center gap-2 px-4 py-2 bg-white border-4 border-black rounded-sm font-bold shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <ArrowLeft className="w-5 h-5" />
            BACK HOME
          </button>
        </Link>

        {/* Main Content Card */}
        <div className="bg-white border-4 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] p-6 md:p-10">
          {/* Header */}
          <div className="mb-8 pb-6 border-b-4 border-black">
            <h1 className="font-black text-4xl md:text-5xl text-gray-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-700 font-bold">Last Updated: January 12, 2026</p>
          </div>

          {/* Introduction */}
          <div className="prose max-w-none mb-8">
            <p className="text-gray-800 leading-relaxed mb-4">
              Hello Erie ("we," "us," or "our") operates the website{" "}
              <a href="https://helloerie.xyz/" className="text-[#3A96CB] font-bold hover:underline">
                https://helloerie.xyz/
              </a>{" "}
              (the "Site"), a free public directory of businesses, restaurants, events, activities,
              and community resources in Erie, Pennsylvania.
            </p>
            <p className="text-gray-800 leading-relaxed">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our Site or submit business information for inclusion
              in our directory.
            </p>
          </div>

          {/* Section: Information We Collect */}
          <section className="mb-8">
            <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Information We Collect</h2>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              We collect the following categories of personal information:
            </p>
            <ul className="list-none space-y-3 mb-4">
              <li className="flex gap-3">
                <span className="font-black text-[#FF851A]">•</span>
                <span className="text-gray-800">
                  <strong className="text-gray-900">Identifiers:</strong> Contact name, business name,
                  business email address, phone number.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#FF851A]">•</span>
                <span className="text-gray-800">
                  <strong className="text-gray-900">Commercial information:</strong> Business description,
                  category, website URL (if provided).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#FF851A]">•</span>
                <span className="text-gray-800">
                  <strong className="text-gray-900">Internet or electronic network activity:</strong> IP address,
                  browser type, pages visited, time/date of visits (automatically via cookies and similar technologies).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#FF851A]">•</span>
                <span className="text-gray-800">
                  <strong className="text-gray-900">Uploaded content:</strong> Logos, business photos, or images
                  you voluntarily upload.
                </span>
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed mb-4">We collect this when you:</p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex gap-3">
                <span className="font-black text-[#3A96CB]">→</span>
                <span className="text-gray-800">Submit a business listing via our form.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#3A96CB]">→</span>
                <span className="text-gray-800">Browse the Site (automatic collection).</span>
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed">
              We do not collect financial information, precise geolocation (beyond business addresses you provide),
              or sensitive personal information.
            </p>
          </section>

          {/* Section: How We Use Your Information */}
          <section className="mb-8">
            <div className="bg-[#3A96CB] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">How We Use Your Information</h2>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">We use the information to:</p>
            <ul className="list-none space-y-3">
              <li className="flex gap-3">
                <span className="font-black text-[#3A96CB]">•</span>
                <span className="text-gray-800">
                  Process and display your submitted business listing publicly in the directory (including name,
                  contact details you provide, description, logo/image, and address if submitted).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#3A96CB]">•</span>
                <span className="text-gray-800">
                  Communicate with you about your submission (e.g., verification or updates) using the
                  email/phone you provide.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#3A96CB]">•</span>
                <span className="text-gray-800">
                  Improve the Site, analyze usage, and ensure functionality (via analytics).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#3A96CB]">•</span>
                <span className="text-gray-800">Comply with legal obligations.</span>
              </li>
            </ul>
          </section>

          {/* Section: Sharing of Information */}
          <section className="mb-8">
            <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-gray-900">Sharing of Information</h2>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              We publicly display submitted business information in the directory for visitors to find
              local Erie businesses. We may share data with:
            </p>
            <ul className="list-none space-y-3 mb-4">
              <li className="flex gap-3">
                <span className="font-black text-[#FFD700]">•</span>
                <span className="text-gray-800">
                  Service providers (e.g., hosting, analytics tools like Google Analytics, form processors)
                  who help operate the Site.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#FFD700]">•</span>
                <span className="text-gray-800">Legal authorities if required by law.</span>
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed">
              We do not sell personal information as defined under the California Consumer Privacy Act (CCPA/CPRA).
              If we ever do, we will provide notice and opt-out options.
            </p>
          </section>

          {/* Section: Your Rights (CCPA/CPRA) */}
          <section className="mb-8">
            <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Your Rights (California Residents – CCPA/CPRA)</h2>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              If you are a California resident, you have the right to:
            </p>
            <ul className="list-none space-y-3 mb-4">
              <li className="flex gap-3">
                <span className="font-black text-[#FF851A]">•</span>
                <span className="text-gray-800">Know what personal information we collect/use/share.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#FF851A]">•</span>
                <span className="text-gray-800">
                  Request deletion of your personal information (note: this may remove your business listing).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#FF851A]">•</span>
                <span className="text-gray-800">
                  Opt-out of any future "sale" or "sharing" of personal information.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#FF851A]">•</span>
                <span className="text-gray-800">Non-discrimination for exercising rights.</span>
              </li>
            </ul>
            <p className="text-gray-800 leading-relaxed">
              To exercise these rights, email us at{" "}
              <a href="mailto:eriedirectory@gmail.com" className="text-[#3A96CB] font-bold hover:underline">
                eriedirectory@gmail.com
              </a>
              . We will respond within 45 days (extendable by 45 days if needed). Verification may be required.
            </p>
          </section>

          {/* Section: Cookies and Tracking */}
          <section className="mb-8">
            <div className="bg-[#3A96CB] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Cookies and Tracking Technologies</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              We use cookies for essential functionality, analytics, and performance. See our separate{" "}
              <Link href="/cookie-policy">
                <a className="text-[#3A96CB] font-bold hover:underline">Cookie Policy</a>
              </Link>{" "}
              for details.
            </p>
          </section>

          {/* Section: Data Security */}
          <section className="mb-8">
            <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-gray-900">Data Security</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              We implement reasonable security measures to protect your information, but no method is 100% secure.
            </p>
          </section>

          {/* Section: Retention */}
          <section className="mb-8">
            <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Retention</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              We retain submitted business information as long as the listing is active or needed for our
              legitimate purposes. You can request removal via email.
            </p>
          </section>

          {/* Section: Children's Privacy */}
          <section className="mb-8">
            <div className="bg-[#3A96CB] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Children's Privacy</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              Our Site is not directed to children under 13. We do not knowingly collect data from children.
            </p>
          </section>

          {/* Section: Changes */}
          <section className="mb-8">
            <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-gray-900">Changes</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              We may update this policy. Changes will be posted here with an updated date.
            </p>
          </section>

          {/* Section: Contact Us */}
          <section>
            <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Contact Us</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              For questions, email{" "}
              <a href="mailto:eriedirectory@gmail.com" className="text-[#3A96CB] font-bold hover:underline">
                eriedirectory@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
