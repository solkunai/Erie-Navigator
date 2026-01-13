import { useRoute, Link } from "wouter";
import { ArrowLeft, MapPin, Phone, Globe, Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function ActivityDetail() {
  const [, params] = useRoute("/things-to-do/:id");

  const { data: activitiesResponse, isLoading } = useQuery({
    queryKey: ["/api/activities"],
    queryFn: async () => {
      const response = await fetch("/api/activities");
      if (!response.ok) throw new Error("Failed to fetch activities");
      return response.json();
    },
  });

  const activities = activitiesResponse?.data || [];
  const activity = activities.find((a: any) => a.id === params?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FCF4F8] flex items-center justify-center">
        <div className="text-2xl font-black">Loading...</div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-[#FCF4F8] flex items-center justify-center">
        <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] p-8">
          <h1 className="text-2xl font-black mb-4">Activity Not Found</h1>
          <Link href="/things-to-do">
            <Button className="bg-[#8E44AD] hover:bg-[#9b59b6] text-white font-bold border-2 border-black">
              Back to Chill Spots
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF4F8]">
      {/* Hero Section */}
      <div className="bg-[#8E44AD] border-b-4 border-black py-8">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/things-to-do">
            <Button
              variant="ghost"
              className="mb-4 text-white hover:text-white hover:bg-[#9b59b6] font-bold"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Chill Spots
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Image */}
            {activity.imageUrl && (
              <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] overflow-hidden">
                <img
                  src={activity.imageUrl}
                  alt={activity.name}
                  className="w-full h-96 object-cover"
                />
              </Card>
            )}

            {/* About Section */}
            <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] bg-white">
              <CardContent className="p-8">
                <h1 className="text-4xl font-black text-gray-900 mb-4">{activity.name}</h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-[#8E44AD] text-white border-2 border-black hover:bg-[#8E44AD] font-bold">
                    {activity.category}
                  </Badge>
                  {activity.audience && activity.audience.length > 0 && (
                    <Badge className="bg-[#FFD700] text-black border-2 border-black hover:bg-[#FFD700] font-bold">
                      <Users className="h-3 w-3 mr-1" />
                      {activity.audience.join(", ")}
                    </Badge>
                  )}
                  {activity.isFeatured && (
                    <Badge className="bg-[#3A96CB] text-white border-2 border-black hover:bg-[#3A96CB] font-bold">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <h2 className="text-2xl font-black text-gray-900 mb-3">About</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {activity.description}
                </p>

                {/* Categories */}
                {activity.categories && activity.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {activity.categories.map((cat: string) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="border-2 border-black rounded-sm font-medium"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {activity.features && activity.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Features & Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {activity.features.map((feature: string) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="border-2 border-black rounded-sm bg-[#8E44AD]/20 font-medium"
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
                <h3 className="text-xl font-black text-gray-900 mb-4">Details</h3>

                {activity.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#FF851A] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">Address</p>
                      <p className="text-gray-700">{activity.address}</p>
                    </div>
                  </div>
                )}

                {activity.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#3A96CB] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">Phone</p>
                      <a
                        href={`tel:${activity.phone}`}
                        className="text-[#3A96CB] hover:underline"
                      >
                        {activity.phone}
                      </a>
                    </div>
                  </div>
                )}

                {activity.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#8E44AD] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">Website</p>
                      <a
                        href={activity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3A96CB] hover:underline break-all"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                {activity.hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#FFD700] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">Hours</p>
                      <p className="text-gray-700 whitespace-pre-line">{activity.hours}</p>
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
            <div className="flex items-center gap-3">
              <img
                src="/assets/helloeriefinallogo.png"
                alt="Hello Erie Logo"
                className="w-16 h-16 object-contain transform -rotate-12"
              />
              <span className="font-black text-xl text-gray-900">HELLO ERIE © 2026</span>
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
