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
  ChevronRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RealTimeClock } from "@/components/real-time-clock";
import { restaurants, events, activities, businesses } from "@/lib/erieData";

interface HomeProps {
  onOpenAI: () => void;
}

export default function Home({ onOpenAI }: HomeProps) {
  const featuredRestaurants = restaurants.slice(0, 4);
  const featuredBusinesses = businesses.slice(0, 4);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Clean and Minimal */}
      <section className="relative border-b">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Your Local Guide
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-normal tracking-tight mb-6 leading-[1.1]">
              Discover what makes <br className="hidden md:block" />
              <span className="italic">Erie, PA</span> special
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Find the best restaurants, local businesses, upcoming events, and hidden gems in Erie and the surrounding area.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/restaurants">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Restaurants
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/businesses">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Businesses
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Floating Stats */}
          <div className="mt-16 flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-3xl font-serif">{restaurants.length}+</p>
              <p className="text-muted-foreground">Restaurants</p>
            </div>
            <div>
              <p className="text-3xl font-serif">{businesses.length}+</p>
              <p className="text-muted-foreground">Businesses</p>
            </div>
            <div>
              <p className="text-3xl font-serif">{events.length}+</p>
              <p className="text-muted-foreground">Events</p>
            </div>
            <div>
              <p className="text-3xl font-serif">{activities.length}+</p>
              <p className="text-muted-foreground">Activities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links - Simple Grid */}
      <section className="border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0">
            {[
              { icon: UtensilsCrossed, label: "Restaurants", href: "/restaurants", count: restaurants.length },
              { icon: Building2, label: "Businesses", href: "/businesses", count: businesses.length },
              { icon: Calendar, label: "Events", href: "/events", count: events.length },
              { icon: MapPin, label: "Things to Do", href: "/things-to-do", count: activities.length },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="p-6 md:p-8 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <item.icon className="h-5 w-5 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <p className="font-medium group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.count} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Where to Eat
              </p>
              <h2 className="text-2xl md:text-3xl font-serif">Popular Restaurants</h2>
            </div>
            <Link href="/restaurants">
              <Button variant="ghost" className="hidden sm:flex">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <article key={restaurant.id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-muted rounded-lg mb-4 overflow-hidden">
                  {restaurant.imageUrl ? (
                    <img 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                      <span className="text-4xl font-serif text-muted-foreground/30">{restaurant.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{restaurant.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{restaurant.priceRange}</span>
                  </div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{restaurant.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/restaurants">
              <Button variant="outline" className="w-full">
                View all restaurants
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Local Businesses + CTA Side by Side */}
      <section className="py-16 md:py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Businesses List */}
            <div className="lg:col-span-2">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Shop Local
                  </p>
                  <h2 className="text-2xl md:text-3xl font-serif">Local Businesses</h2>
                </div>
                <Link href="/businesses">
                  <Button variant="ghost" className="hidden sm:flex">
                    View all
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {featuredBusinesses.map((business) => (
                  <article key={business.id} className="flex gap-4 p-4 bg-background rounded-lg border hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 rounded-md bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {business.imageUrl ? (
                        <img 
                          src={business.imageUrl} 
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{business.category}</p>
                      <h3 className="font-medium group-hover:text-primary transition-colors truncate">{business.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{business.address}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Add Business CTA */}
            <div className="lg:col-span-1">
              <div className="bg-background border rounded-xl p-8 h-full flex flex-col justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif mb-3">Own a business in Erie?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get your business listed in our directory for free and connect with locals and visitors.
                </p>
                <Link href="/add-business">
                  <Button className="w-full">
                    Add Your Business
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                What's Happening
              </p>
              <h2 className="text-2xl md:text-3xl font-serif">Upcoming Events</h2>
            </div>
            <Link href="/events">
              <Button variant="ghost" className="hidden sm:flex">
                View calendar
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <article key={event.id} className="flex gap-6 p-6 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer group">
                {/* Date */}
                <div className="text-center flex-shrink-0 w-16">
                  <p className="text-sm font-medium text-primary uppercase">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                  </p>
                  <p className="text-3xl font-serif">
                    {new Date(event.date).getDate()}
                  </p>
                </div>
                
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{event.category}</span>
                    {event.isFree && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-primary font-medium">Free</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-medium group-hover:text-primary transition-colors mb-1">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.venue}
                    </span>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 self-center" />
              </article>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/events">
              <Button variant="outline" className="w-full">
                View all events
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Assistant CTA - Subtle */}
      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif mb-4">Not sure where to start?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Ask our AI assistant for personalized recommendations based on your preferences.
            </p>
            <Button size="lg" onClick={onOpenAI}>
              <Sparkles className="mr-2 h-4 w-4" />
              Get Recommendations
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Clean */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg">Discover Erie</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/restaurants" className="hover:text-foreground transition-colors">Restaurants</Link>
              <Link href="/businesses" className="hover:text-foreground transition-colors">Businesses</Link>
              <Link href="/events" className="hover:text-foreground transition-colors">Events</Link>
              <Link href="/things-to-do" className="hover:text-foreground transition-colors">Things to Do</Link>
              <Link href="/add-business" className="hover:text-foreground transition-colors">Add Your Business</Link>
            </nav>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Discover Erie
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
