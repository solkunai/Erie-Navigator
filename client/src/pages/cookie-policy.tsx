import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Cookie } from "lucide-react";

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FCF4F8] relative overflow-hidden">
      {/* Dotted Background Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #3A96CB 1px, transparent 1px)',
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
            <Cookie className="w-12 h-12 text-[#3A96CB]" />
            <div>
              <h1 className="font-black text-4xl md:text-5xl text-gray-900 mb-2">
                Cookie Policy
              </h1>
              <p className="text-gray-700 font-bold">Last Updated: January 14, 2026</p>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose max-w-none mb-8">
            <p className="text-gray-800 leading-relaxed">
              Hello Erie uses cookies and similar technologies on{" "}
              <a href="https://helloerie.xyz/" className="text-[#3A96CB] font-bold hover:underline">
                https://helloerie.xyz/
              </a>{" "}
              to enhance your experience.
            </p>
          </div>

          {/* Section: What Are Cookies? */}
          <section className="mb-8">
            <div className="bg-[#3A96CB] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">What Are Cookies?</h2>
            </div>
            <p className="text-gray-800 leading-relaxed">
              Cookies are small text files stored on your device that help the Site remember information
              about your visit.
            </p>
          </section>

          {/* Section: Types of Cookies We Use */}
          <section className="mb-8">
            <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-gray-900">Cookies & Local Storage Currently Used</h2>
            </div>
            <ul className="list-none space-y-4">
              <li className="bg-[#FCF4F8] border-4 border-black p-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
                <h3 className="font-black text-lg text-gray-900 mb-2">Essential Security Cookie</h3>
                <p className="text-gray-800 mb-2">
                  <strong>Cookie Name:</strong> <code className="bg-gray-200 px-2 py-1 rounded">csrf_token</code>
                </p>
                <p className="text-gray-800 mb-2">
                  <strong>Purpose:</strong> Protects form submissions from Cross-Site Request Forgery (CSRF) attacks.
                  This is a critical security measure that prevents malicious websites from submitting forms on your behalf.
                </p>
                <p className="text-gray-800 mb-2">
                  <strong>Duration:</strong> 1 hour
                </p>
                <p className="text-gray-800">
                  <strong>Type:</strong> First-party, HttpOnly (cannot be accessed by JavaScript), SameSite: Strict
                </p>
                <div className="mt-3 bg-[#FFD700] border-2 border-black p-3 rounded-sm">
                  <p className="text-gray-900 font-bold text-sm">
                    ⚠️ This cookie is essential and cannot be disabled. Blocking it will prevent form submissions
                    (like adding a business) from working properly.
                  </p>
                </div>
              </li>
              <li className="bg-[#FCF4F8] border-4 border-black p-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
                <h3 className="font-black text-lg text-gray-900 mb-2">User Preferences (Not a Cookie)</h3>
                <p className="text-gray-800 mb-2">
                  <strong>Storage Name:</strong> <code className="bg-gray-200 px-2 py-1 rounded">cookie-consent</code>
                </p>
                <p className="text-gray-800 mb-2">
                  <strong>Purpose:</strong> Remembers whether you accepted or denied cookies on our consent banner.
                  This is stored in your browser's local storage, NOT as a cookie, so it never leaves your device.
                </p>
                <p className="text-gray-800">
                  <strong>Duration:</strong> Permanent (until you clear your browser data)
                </p>
              </li>
            </ul>
          </section>

          {/* Future Cookies Notice */}
          <div className="bg-[#3A96CB] border-4 border-black p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
            <h3 className="font-black text-xl text-white mb-3">Future Analytics & Performance</h3>
            <p className="text-white leading-relaxed font-bold">
              We do NOT currently use any analytics, tracking, or advertising cookies. In the future, we may implement
              analytics tools (like Google Analytics) to understand how visitors use the Site. If we do, we will
              update this policy and obtain your consent before activating any such cookies.
            </p>
          </div>

          {/* Section: Managing Cookies */}
          <section className="mb-8">
            <div className="bg-[#3A96CB] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Managing Cookies</h2>
            </div>
            <p className="text-gray-800 leading-relaxed mb-4">
              You can manage cookies through your browser settings (e.g., block or delete).
            </p>
            <div className="bg-[#FFD700] border-4 border-black p-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <p className="text-gray-900 font-bold">
                ⚠️ Note: Blocking essential cookies may limit Site functionality.
              </p>
            </div>
          </section>

          {/* Section: Third-Party Cookies */}
          <section className="mb-8">
            <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-white">Third-Party Cookies</h2>
            </div>
            <p className="text-gray-800 leading-relaxed font-bold">
              We do NOT currently use any third-party cookies from external services like Google Analytics,
              Facebook, or advertising networks. All cookies used on this Site are set directly by Hello Erie
              (first-party cookies).
            </p>
          </section>

          {/* Section: Contact */}
          <section>
            <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block mb-4 shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
              <h2 className="font-black text-2xl text-gray-900">Contact</h2>
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
