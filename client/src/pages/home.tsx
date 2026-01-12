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
      {/* Hero Section - Vibrant Mobile Design */}
      <section className="relative border-b overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        {/* Decorative gradient orbs for mobile */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 md:hidden"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 md:hidden"></div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="relative z-10">
              <Badge variant="secondary" className="mb-4 text-xs md:text-sm font-medium px-3 py-1.5 bg-primary/10 text-primary border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Your Local Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                Discover what makes{" "}
                <span className="italic bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Erie, PA</span> special
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                Find the best restaurants, local businesses, upcoming events, and hidden gems in Erie and the surrounding area.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
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
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 text-sm">
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

            {/* Right: Hero Image */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/bayfronterie.jpg"
                  alt="Erie Bayfront"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/5 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links - Vibrant Cards */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: UtensilsCrossed,
                label: "Restaurants",
                href: "/restaurants",
                count: restaurants.length,
                gradient: "from-orange-500/10 to-red-500/10",
                iconColor: "text-orange-600 dark:text-orange-400",
                hoverGradient: "hover:from-orange-500/20 hover:to-red-500/20"
              },
              {
                icon: Building2,
                label: "Businesses",
                href: "/businesses",
                count: businesses.length,
                gradient: "from-blue-500/10 to-cyan-500/10",
                iconColor: "text-blue-600 dark:text-blue-400",
                hoverGradient: "hover:from-blue-500/20 hover:to-cyan-500/20"
              },
              {
                icon: Calendar,
                label: "Events",
                href: "/events",
                count: events.length,
                gradient: "from-purple-500/10 to-pink-500/10",
                iconColor: "text-purple-600 dark:text-purple-400",
                hoverGradient: "hover:from-purple-500/20 hover:to-pink-500/20"
              },
              {
                icon: MapPin,
                label: "Things to Do",
                href: "/things-to-do",
                count: activities.length,
                gradient: "from-green-500/10 to-emerald-500/10",
                iconColor: "text-green-600 dark:text-green-400",
                hoverGradient: "hover:from-green-500/20 hover:to-emerald-500/20"
              },
            ].map((item, index) => (
              <Link key={item.href} href={item.href}>
                <div className={`relative p-6 md:p-8 rounded-2xl border bg-gradient-to-br ${item.gradient} ${item.hoverGradient} transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500`}
                     style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={`inline-flex p-3 rounded-xl bg-background/80 backdrop-blur-sm mb-4 ring-1 ring-border/50 ${item.iconColor}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.count} listings</p>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
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

          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4 -mx-4 px-4 scrollbar-hide">
            {featuredRestaurants.map((restaurant, index) => (
              <article key={restaurant.id} className="group cursor-pointer flex-shrink-0 w-[280px] md:w-auto snap-start animate-in fade-in slide-in-from-bottom-4 duration-500"
                       style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative aspect-[4/3] bg-white dark:bg-muted rounded-xl mb-4 overflow-hidden border-2 border-transparent group-hover:border-orange-500/30 transition-all duration-300 shadow-md group-hover:shadow-xl group-hover:shadow-orange-500/10">
                  {restaurant.imageUrl ? (
                    <>
                      <img
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-red-500/10">
                      <span className="text-4xl font-serif text-orange-600/30 dark:text-orange-400/30">{restaurant.name.charAt(0)}</span>
                    </div>
                  )}
                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-lg border flex items-center gap-1 shadow-sm">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-semibold">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-orange-600 dark:text-orange-400 font-medium uppercase tracking-wider">{restaurant.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{restaurant.priceRange}</span>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{restaurant.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/restaurants">
              <Button variant="outline" className="w-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20 hover:border-orange-500/40">
                View all restaurants
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Local Businesses + CTA Side by Side */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-muted/20 to-muted/40 border-y">
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
                {featuredBusinesses.map((business, index) => (
                  <article key={business.id} className="relative flex gap-4 p-5 bg-background rounded-xl border-2 border-transparent hover:border-blue-500/30 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-lg hover:shadow-blue-500/10 animate-in fade-in slide-in-from-left-4 duration-500"
                           style={{ animationDelay: `${index * 100}ms` }}>
                    {/* Gradient accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                      {business.imageUrl ? (
                        <img
                          src={business.imageUrl}
                          alt={business.name}
                          className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <Building2 className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider mb-1">{business.category}</p>
                      <h3 className="font-semibold text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate mb-1">{business.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        {business.address}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 self-center opacity-0 group-hover:opacity-100" />
                  </article>
                ))}
              </div>
            </div>

            {/* Add Business CTA */}
            <div className="lg:col-span-1">
              <div className="relative bg-background border-2 rounded-2xl p-8 h-full flex flex-col justify-center overflow-hidden shadow-lg">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl -z-10" />

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 shadow-sm">
                  <Building2 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-serif mb-3">Own a business in Erie?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get your business listed in our directory for free and connect with locals and visitors.
                </p>
                <Link href="/add-business">
                  <Button className="w-full shadow-md hover:shadow-lg transition-shadow">
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
            {upcomingEvents.map((event, index) => (
              <article key={event.id} className="relative flex gap-6 p-6 bg-gradient-to-r from-purple-500/5 via-background to-pink-500/5 border-2 border-transparent hover:border-purple-500/30 rounded-xl transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-lg hover:shadow-purple-500/10 animate-in fade-in slide-in-from-right-4 duration-500"
                       style={{ animationDelay: `${index * 100}ms` }}>
                {/* Gradient accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-xl" />

                {/* Date Badge */}
                <div className="relative text-center flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex flex-col items-center justify-center border-2 border-purple-500/30 group-hover:border-purple-500/50 transition-colors shadow-sm">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                  </p>
                  <p className="text-2xl font-serif font-bold text-purple-600 dark:text-purple-400">
                    {new Date(event.date).getDate()}
                  </p>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs">
                      {event.category}
                    </Badge>
                    {event.isFree && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs">
                        Free
                      </Badge>
                    )}
                    {event.price && !event.isFree && (
                      <span className="text-xs text-muted-foreground font-medium">{event.price}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <div className="p-1 rounded bg-purple-500/10">
                        <Clock className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                      </div>
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <div className="p-1 rounded bg-purple-500/10">
                        <MapPin className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="truncate">{event.venue}</span>
                    </span>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0 self-center" />
              </article>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/events">
              <Button variant="outline" className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40">
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
