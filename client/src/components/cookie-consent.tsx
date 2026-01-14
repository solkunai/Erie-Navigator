import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);

    // If you have analytics, enable them here
    // Example: window.gtag('consent', 'update', { analytics_storage: 'granted' });
  };

  const handleDeny = () => {
    localStorage.setItem("cookie-consent", "denied");
    setIsVisible(false);

    // If you have analytics, disable them here
    // Example: window.gtag('consent', 'update', { analytics_storage: 'denied' });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-50 animate-in fade-in duration-300" />

      {/* Cookie Banner - Bottom Center */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
        <Card className="max-w-4xl mx-auto bg-white border-4 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(35,24,15,1)]">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-sm bg-[#FFD700] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
                  <Cookie className="h-8 w-8 text-black" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
                  🍪 We Use Cookies
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                  We use cookies to enhance your browsing experience, remember your preferences,
                  and analyze site traffic. By clicking "Accept All", you consent to our use of cookies.
                  You can manage your preferences or learn more in our{" "}
                  <Link href="/cookie-policy">
                    <span className="text-[#3A96CB] font-bold hover:underline cursor-pointer">
                      Cookie Policy
                    </span>
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy-policy">
                    <span className="text-[#3A96CB] font-bold hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                  </Link>
                  .
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAccept}
                    className="bg-[#27AE60] hover:bg-[#229954] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Accept All Cookies
                  </Button>
                  <Button
                    onClick={handleDeny}
                    variant="outline"
                    className="bg-white hover:bg-gray-50 text-gray-900 font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Deny All
                  </Button>
                  <Link href="/cookie-policy" className="sm:ml-auto">
                    <Button
                      variant="ghost"
                      className="w-full sm:w-auto font-bold text-gray-900 hover:bg-gray-100 border-2 border-transparent hover:border-black rounded-sm"
                    >
                      Manage Preferences
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Close Button - Mobile */}
              <button
                onClick={handleDeny}
                className="absolute top-4 right-4 sm:hidden w-8 h-8 flex items-center justify-center rounded-sm hover:bg-gray-100 transition-colors"
                aria-label="Close cookie banner"
              >
                <X className="h-5 w-5 text-gray-900" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
