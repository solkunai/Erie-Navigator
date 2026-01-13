import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, FileText, Shield, Scale } from "lucide-react";

export default function TermsOfUse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FCF4F8] relative overflow-hidden">
      {/* Dotted Background Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)',
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
          <div className="mb-8 pb-6 border-b-4 border-black flex items-center gap-4">
            <FileText className="w-12 h-12 text-[#FFD700]" />
            <div>
              <h1 className="font-black text-4xl md:text-5xl text-gray-900 mb-2">
                Terms of Use
              </h1>
              <p className="text-gray-700 font-bold">Last Updated: January 12, 2026</p>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose max-w-none mb-8">
            <p className="text-gray-800 leading-relaxed">
              Welcome to Hello Erie{" "}
              <a href="https://helloerie.xyz/" className="text-[#3A96CB] font-bold hover:underline">
                helloerie.xyz
              </a>
              . These Terms of Use govern your access to and use of our Site.
            </p>
          </div>

          {/* Section: Acceptance */}
          <section className="mb-8">
            <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Acceptance</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              By accessing or using the Site, you agree to these Terms. If you submit a business listing,
              you represent that you have authority to do so.
            </p>
          </section>

          {/* Section: Use of the Site */}
          <section className="mb-8">
            <div className="bg-[#3A96CB] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Use of the Site
              </h2>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              You may browse the directory freely. When submitting a listing:
            </p>
            <ul className="list-none space-y-3 mb-4">
              <li className="flex gap-3">
                <span className="font-black text-[#3A96CB]">✓</span>
                <span className="text-gray-800">Provide accurate, up-to-date information.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#3A96CB]">✓</span>
                <span className="text-gray-800">
                  Ensure you own or have rights to any uploaded logos/images (no copyrighted material
                  without permission).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-black text-[#3A96CB]">✓</span>
                <span className="text-gray-800">
                  Do not submit spam, illegal, offensive, or misleading content.
                </span>
              </li>
            </ul>
            <div className="bg-[#FFD700] border-4 border-black p-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <p className="text-gray-900 font-bold">
                ⚠️ We reserve the right to review, edit, approve, reject, or remove any listing at
                our sole discretion without notice.
              </p>
            </div>
          </section>

          {/* Section: Public Display */}
          <section className="mb-8">
            <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-gray-900">Public Display</h2>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              Submitted information (business name, contact details, description, images, etc.) will be
              publicly visible in the directory.
            </p>
            <p className="text-gray-800 leading-relaxed">
              We are not responsible for how third parties use this public information.
            </p>
          </section>

          {/* Section: Intellectual Property */}
          <section className="mb-8">
            <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Intellectual Property</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-800 leading-relaxed">
                The Site content (design, text) is owned by us.
              </p>
              <div className="bg-[#FCF4F8] border-4 border-black p-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
                <p className="text-gray-800 leading-relaxed">
                  You grant us a <strong className="text-gray-900">worldwide, royalty-free license</strong>{" "}
                  to display and use your submitted content (including logos/images) in the directory.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Limitation of Liability */}
          <section className="mb-8">
            <div className="bg-[#3A96CB] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white flex items-center gap-2">
                <Scale className="w-6 h-6" />
                Limitation of Liability
              </h2>
            </div>
            <div className="bg-[#FF851A] border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
              <p className="text-white leading-relaxed font-bold mb-3">
                The Site is provided "as is." We disclaim all warranties.
              </p>
              <p className="text-white leading-relaxed font-bold">
                We are not liable for any damages arising from use of the Site or reliance on
                listings (e.g., inaccurate info, business interactions).
              </p>
            </div>
          </section>

          {/* Section: Indemnification */}
          <section className="mb-8">
            <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-gray-900">Indemnification</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              You agree to indemnify us against claims arising from your submissions or use of the Site.
            </p>
          </section>

          {/* Section: Termination */}
          <section className="mb-8">
            <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Termination</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              We may suspend or terminate access for violations.
            </p>
          </section>

          {/* Section: Governing Law */}
          <section className="mb-8">
            <div className="bg-[#3A96CB] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Governing Law</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              These Terms are governed by the laws of <strong className="text-gray-900">Pennsylvania</strong>,
              without regard to conflict of laws.
            </p>
          </section>

          {/* Section: Changes */}
          <section className="mb-8">
            <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-gray-900">Changes</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              We may update these Terms; continued use constitutes acceptance.
            </p>
          </section>

          {/* Section: Contact */}
          <section>
            <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Contact</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              Questions? Email{" "}
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
