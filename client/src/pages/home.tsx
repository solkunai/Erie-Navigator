import { Link } from "wouter";
import {
  MapPin,
  UtensilsCrossed,
  Calendar,
  Users,
  ArrowRight,
  Sparkles,
  Clock,
  Building2,
  Star,
  ShoppingBag,
  Waves
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeCarousel, type CarouselSlide } from "@/components/ui/fade-carousel";
import { restaurants, events, activities, businesses } from "@/lib/erieData";

// Featured slides for the homepage carousel
const homepageCarouselSlides: CarouselSlide[] = [
  {
    id: "home-1",
    imageUrl: "/assets/bayfronterie.jpg",
    caption: "Golden Hour at the Pier",
  },
  {
    id: "home-2",
    imageUrl: "/assets/presque-isle-beach.jpg",
    caption: "Presque Isle Beach, one of Erie's wonders",
  },
  {
    id: "home-3",
    imageUrl: "/assets/erie-sign1.jpeg",
    caption: "The Erie sign over looking the stunning peninsula",
  },
  {
    id: "home-4",
    imageUrl: "/assets/brig-niagara-erie.jpeg",
    caption: "The Brig Niagara at Maritime Museum",
  },
];

interface HomeProps {
  onOpenAI: () => void;
}

export default function Home({ onOpenAI }: HomeProps) {
  const featuredRestaurants = restaurants.slice(0, 4);
  const featuredBusinesses = businesses.slice(0, 4);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FCF4F8] relative">
      {/* Dotted Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #d4d4d4 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div className="relative z-10">
                <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-3 py-1 mb-6 hover:bg-[#FFD700]">
                  Local-made & Lake-side
                </Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-none">
                  <span className="text-[#3A96CB] italic">What's</span>
                  <br />
                  <span className="text-[#3A96CB] italic">Poppin'</span>
                  <br />
                  <span className="text-[#FF851A] italic">in Erie?</span>
                </h1>
                <p className="text-gray-700 text-lg mb-8 max-w-xl leading-relaxed">
                  Toss out the boring guidebooks. We're your neighbor's favorites, the hidden beach paths, and the best sunset spots in town.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/restaurants">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-[#FF851A] hover:bg-[#ff9d3d] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                    >
                      Show me the Grub
                    </Button>
                  </Link>
                  <Link href="/things-to-do">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                    >
                      Just Browsing
                    </Button>
                  </Link>
                </div>

                {/* Mobile Carousel - shown only on mobile/tablet */}
                <div className="mb-8 lg:hidden">
                  <div className="bg-white p-3 border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                    <FadeCarousel
                      slides={homepageCarouselSlides}
                      autoPlayInterval={4000}
                      aspectRatio="16/9"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white border-2 border-black rounded-sm shadow-[3px_3px_0px_0px_rgba(35,24,15,1)] px-6 py-4">
                    <p className="text-4xl font-black text-black">{restaurants.length}+</p>
                    <p className="text-[#FF851A] font-bold text-sm uppercase">Eats</p>
                  </div>
                  <div className="bg-white border-2 border-black rounded-sm shadow-[3px_3px_0px_0px_rgba(35,24,15,1)] px-6 py-4">
                    <p className="text-4xl font-black text-black">{businesses.length}+</p>
                    <p className="text-[#3A96CB] font-bold text-sm uppercase">Businesses</p>
                  </div>
                  <div className="bg-white border-2 border-black rounded-sm shadow-[3px_3px_0px_0px_rgba(35,24,15,1)] px-6 py-4">
                    <p className="text-4xl font-black text-black">{activities.length}+</p>
                    <p className="text-[#8E44AD] font-bold text-sm uppercase">Chill Spots</p>
                  </div>
                </div>
              </div>

              {/* Right: Carousel Card */}
              <div className="relative hidden lg:flex justify-center items-center">
                {/* Polaroid-style Carousel Card */}
                <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] transform rotate-2 hover:rotate-1 transition-transform w-full max-w-md">
                  <FadeCarousel
                    slides={homepageCarouselSlides}
                    autoPlayInterval={4000}
                    aspectRatio="4/3"
                  />
                </div>
                {/* Trending Tag */}
                <div className="absolute bottom-8 -right-4 bg-[#FF851A] text-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] transform rotate-6">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase">Trending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pick Your Adventure - Vibrant Cards */}
        <section className="py-16 bg-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-black italic mb-10 text-center text-gray-900">Pick Your Adventure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* The Grub */}
              <Link href="/restaurants">
                <Card className="border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all bg-[#FFD700] p-8 cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 border-2 border-black">
                    <UtensilsCrossed className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-3xl font-black italic mb-3 text-black">The Grub</h3>
                  <p className="text-black mb-4 leading-relaxed">
                    Burgers, tacos, and fine dining for when you're hangry.
                  </p>
                  <div className="flex items-center text-black font-bold group-hover:translate-x-1 transition-transform">
                    <span className="text-sm">{restaurants.length} Spots</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>

              {/* The Shops */}
              <Link href="/businesses">
                <Card className="border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all bg-[#3A96CB] p-8 cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 border-2 border-black">
                    <ShoppingBag className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-3xl font-black italic mb-3 text-white">The Shops</h3>
                  <p className="text-white mb-4 leading-relaxed">
                    Local makers and unique treasures you won't find on Amazon.
                  </p>
                  <div className="flex items-center text-white font-bold group-hover:translate-x-1 transition-transform">
                    <span className="text-sm">{businesses.length} Shops</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>

              {/* Chill Spots */}
              <Link href="/things-to-do">
                <Card className="border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all bg-[#FF851A] p-8 cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 border-2 border-black">
                    <Waves className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-3xl font-black italic mb-3 text-white">Chill Spots</h3>
                  <p className="text-white mb-4 leading-relaxed">
                    Parks, beaches, and quiet nooks for a mental reset.
                  </p>
                  <div className="flex items-center text-white font-bold group-hover:translate-x-1 transition-transform">
                    <span className="text-sm">{activities.length} Hideouts</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Local Legends - Featured Restaurants */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-4xl font-black italic mb-2">
                  <span className="text-[#FF851A]">Local Legends</span>
                </h2>
                <p className="text-gray-600 italic">Tried, true, and delicious</p>
              </div>
              <Link href="/restaurants" className="hidden md:block">
                <Button
                  variant="ghost"
                  className="font-bold hover:text-[#FF851A]"
                >
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRestaurants.map((restaurant, index) => (
                <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
                  <article className="group cursor-pointer">
                    {/* Polaroid-style Card */}
                    <div
                      className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all mb-3 h-full"
                    >
                      <div className="aspect-[4/3] bg-white rounded-sm mb-3 overflow-hidden relative">
                        {restaurant.imageUrl ? (
                          <div className="absolute inset-0 flex items-center justify-center p-3">
                            <img
                              src={restaurant.imageUrl}
                              alt={restaurant.name}
                              className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FF851A]/20 to-[#FFD700]/20">
                            <span className="text-5xl font-black text-[#FF851A]/30">{restaurant.name.charAt(0)}</span>
                          </div>
                        )}

                        {/* Bottom Badges - Category and Price */}
                        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2">
                          <Badge className="bg-[#FF851A] text-white border-2 border-black rounded-sm font-bold text-xs px-2 py-1 hover:bg-[#FF851A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                            {restaurant.category}
                          </Badge>
                          <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-2 py-1 hover:bg-[#FFD700] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {restaurant.priceRange}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-8 md:hidden">
              <Link href="/restaurants">
                <Button
                  className="w-full bg-[#FF851A] hover:bg-[#ff9d3d] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]"
                >
                  View all restaurants
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-4xl font-black italic mb-2">
                  <span className="text-[#3A96CB]">What's On</span>
                </h2>
                <p className="text-gray-600 italic">This week's happenings</p>
              </div>
              <Link href="/events" className="hidden md:block">
                <Button
                  variant="ghost"
                  className="font-bold hover:text-[#3A96CB]"
                >
                  View calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <article
                  key={event.id}
                  className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all p-6 cursor-pointer group"
                >
                  <div className="flex gap-6">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-20 h-20 bg-[#3A96CB] border-2 border-black rounded-lg flex flex-col items-center justify-center">
                      <p className="text-xs font-bold text-white uppercase">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                      <p className="text-3xl font-black text-white">
                        {new Date(event.date).getDate()}
                      </p>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm text-xs font-bold hover:bg-[#FFD700]">
                          {event.category}
                        </Badge>
                        {event.isFree && (
                          <Badge className="bg-[#4ade80] text-black border-2 border-black rounded-sm text-xs font-bold hover:bg-[#4ade80]">
                            FREE
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-black text-xl mb-2 text-gray-900 group-hover:text-[#3A96CB] transition-colors">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#3A96CB]" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#3A96CB]" />
                          {event.venue}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-[#3A96CB] transition-colors flex-shrink-0 self-center" />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 md:hidden">
              <Link href="/events">
                <Button
                  className="w-full bg-[#3A96CB] hover:bg-[#4da8db] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]"
                >
                  View all events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-white border-t-4 border-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/helloeriefinallogo.png"
                    alt="Hello Erie Logo"
                    className="w-16 h-16 object-contain transform -rotate-12"
                  />
                  <span className="font-black text-xl text-gray-900">HELLO ERIE © 2026</span>
                </div>
                <a
                  href="https://www.facebook.com/profile.php?id=61586551713542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/assets/facebook.jpg"
                    alt="Facebook"
                    className="w-6 h-6 rounded"
                  />
                  <span className="text-sm font-bold text-[#1877F2]">Follow us on Facebook</span>
                </a>
              </div>
              <nav className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-900">
                <Link href="/restaurants" className="hover:text-[#FF851A] transition-colors">GRUB</Link>
                <Link href="/businesses" className="hover:text-[#3A96CB] transition-colors">BUSINESS</Link>
                <Link href="/events" className="hover:text-[#FFD700] transition-colors">EVENTS</Link>
                <Link href="/things-to-do" className="hover:text-[#FF851A] transition-colors">CHILL SPOTS</Link>
              </nav>
            </div>
            {/* Policy Links */}
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
    </div>
  );
}
