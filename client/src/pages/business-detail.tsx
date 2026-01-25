import { useRoute, Link } from "wouter";
import { ArrowLeft, MapPin, Phone, Globe, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { businesses } from "@/lib/erieData";

export default function BusinessDetail() {
  const [, params] = useRoute("/businesses/:id");
  const business = businesses.find(b => b.id === params?.id);

  if (!business) {
    return (
      <div className="min-h-screen bg-[#FCF4F8] flex items-center justify-center">
        <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] p-8">
          <h1 className="text-2xl font-black mb-4">Business Not Found</h1>
          <Link href="/businesses">
            <Button className="bg-[#3A96CB] hover:bg-[#4da8db] text-white font-bold border-2 border-black">
              Back to Businesses
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF4F8]">
      {/* Hero Section */}
      <div className="bg-[#3A96CB] border-b-4 border-black py-8">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/businesses">
            <Button
              variant="ghost"
              className="mb-4 text-white hover:text-white hover:bg-[#4da8db] font-bold"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Businesses
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Image */}
            {business.imageUrl && (
              <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] overflow-hidden">
                <img
                  src={business.imageUrl}
                  alt={business.name}
                  className="w-full h-96 object-cover"
                />
              </Card>
            )}

            {/* About Section */}
            <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] bg-white">
              <CardContent className="p-8">
                <h1 className="text-4xl font-black text-gray-900 mb-4">{business.name}</h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-[#3A96CB] text-white border-2 border-black hover:bg-[#3A96CB] font-bold">
                    {business.category}
                  </Badge>
                  {business.isFeatured && (
                    <Badge className="bg-[#FFD700] text-black border-2 border-black hover:bg-[#FFD700] font-bold">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <h2 className="text-2xl font-black text-gray-900 mb-3">About</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {business.description}
                </p>

                {/* Categories */}
                {business.categories && business.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {business.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="border-2 border-black rounded-sm font-bold text-gray-900"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {business.features && business.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Features & Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {business.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="border-2 border-black rounded-sm bg-[#3A96CB]/20 font-bold text-gray-900"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] bg-white sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-black text-gray-900 mb-4">Contact Info</h3>

                {business.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#FF851A] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">Address</p>
                      <p className="text-gray-700">{business.address}</p>
                    </div>
                  </div>
                )}

                {business.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#3A96CB] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">Phone</p>
                      <a
                        href={`tel:${business.phone}`}
                        className="text-[#3A96CB] hover:underline"
                      >
                        {business.phone}
                      </a>
                    </div>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#8E44AD] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">Website</p>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3A96CB] hover:underline break-all"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                {business.hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#FFD700] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">Hours</p>
                      <p className="text-gray-700 whitespace-pre-line">{business.hours}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-white border-t-4 border-black mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/helloeriefinallogo.png"
                  alt="Hello Erie Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-black text-xl text-gray-900">HELLO ERIE © 2026</span>
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61586551713542"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img src="/assets/facebook.jpg" alt="Facebook" className="w-8 h-8 rounded" />
                <span className="font-black text-xl text-[#1877F2]">FOLLOW US</span>
              </a>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-900">
              <Link href="/restaurants" className="hover:text-[#FF851A] transition-colors">GRUB</Link>
              <Link href="/businesses" className="hover:text-[#3A96CB] transition-colors">BUSINESS</Link>
              <Link href="/events" className="hover:text-[#FFD700] transition-colors">EVENTS</Link>
              <Link href="/things-to-do" className="hover:text-[#FF851A] transition-colors">CHILL SPOTS</Link>
            </nav>
          </div>
          <div className="border-t-2 border-gray-200 pt-4">
            <nav className="flex flex-wrap justify-center gap-4 text-xs font-bold text-gray-600">
              <Link href="/privacy-policy" className="hover:text-[#3A96CB] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/cookie-policy" className="hover:text-[#3A96CB] transition-colors">
                Cookie Policy
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/terms-of-use" className="hover:text-[#3A96CB] transition-colors">
                Terms of Use
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
