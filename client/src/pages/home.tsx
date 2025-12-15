import { Link } from "wouter";
import { 
  MapPin, 
  UtensilsCrossed, 
  Calendar, 
  Users, 
  Heart, 
  ArrowRight,
  Sparkles,
  Star,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RealTimeClock } from "@/components/real-time-clock";
import { restaurants, events, activities } from "@/lib/erieData";

interface HomeProps {
  onOpenAI: () => void;
}

const categoryCards = [
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    description: "Discover Erie's diverse dining scene from waterfront seafood to authentic ethnic cuisines",
    href: "/restaurants",
    count: "100+",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Find concerts, festivals, sports, and community gatherings happening in Erie",
    href: "/events",
    count: "50+",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: MapPin,
    title: "Things to Do",
    description: "Explore attractions, activities, and experiences for every age and interest",
    href: "/things-to-do",
    count: "75+",
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: Heart,
    title: "Autism Programs",
    description: "Resources, services, and sensory-friendly options for individuals and families",
    href: "/autism-programs",
    count: "25+",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Users,
    title: "Social Groups",
    description: "Connect with like-minded people through clubs, meetups, and organizations",
    href: "/social-groups",
    count: "40+",
    gradient: "from-indigo-500 to-violet-500",
  },
];

export default function Home({ onOpenAI }: HomeProps) {
  const featuredRestaurants = restaurants.slice(0, 3);
  const upcomingEvents = events.slice(0, 4);
  const popularActivities = activities.slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDkxYmEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <RealTimeClock />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
              Discover <span className="text-primary">Erie, PA</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Your complete guide to restaurants, events, activities, programs, and community groups in Erie and the surrounding area.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={onOpenAI}
                className="gap-2 text-base px-8"
                data-testid="button-hero-ai"
              >
                <Sparkles className="h-5 w-5" />
                Ask AI for Recommendations
              </Button>
              
              <Link href="/explore">
                <Button variant="outline" size="lg" className="gap-2 text-base px-8" data-testid="button-hero-explore">
                  Explore Erie
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <UtensilsCrossed className="h-4 w-4" /> 100+ Restaurants
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> 50+ Weekly Events
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> 75+ Activities
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-categories-title">Explore Erie</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to discover what Erie has to offer, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCards.map((category) => (
              <Link key={category.href} href={category.href}>
                <Card className="h-full hover-elevate active-elevate-2 cursor-pointer group" data-testid={`card-category-${category.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${category.gradient} text-white`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" size="sm">{category.count}</Badge>
                    </div>
                    <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold" data-testid="text-restaurants-title">Featured Restaurants</h2>
              <p className="text-muted-foreground">Top-rated dining spots in Erie</p>
            </div>
            <Link href="/restaurants">
              <Button variant="outline" className="gap-2" data-testid="button-view-restaurants">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover-elevate overflow-hidden" data-testid={`card-restaurant-${restaurant.id}`}>
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center rounded-t-lg overflow-hidden">
                  {restaurant.imageUrl ? (
                    <img 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UtensilsCrossed className="h-12 w-12 text-muted-foreground/30" />
                  )}
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{restaurant.name}</h3>
                    <Badge variant="secondary" size="sm">{restaurant.priceRange}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline" size="sm">{restaurant.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {restaurant.rating}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{restaurant.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold" data-testid="text-events-title">Upcoming Events</h2>
              <p className="text-muted-foreground">What's happening in Erie</p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="gap-2" data-testid="button-view-events">
                View Calendar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover-elevate flex flex-col sm:flex-row" data-testid={`card-event-${event.id}`}>
                <div className="sm:w-32 flex-shrink-0 p-4 sm:p-0 sm:m-4 flex sm:flex-col items-center justify-center bg-primary/10 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-medium text-primary">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                    </p>
                    <p className="text-2xl font-bold">
                      {new Date(event.date).getDate()}
                    </p>
                  </div>
                </div>
                <CardContent className="flex-1 py-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold line-clamp-1">{event.title}</h3>
                    {event.isFree && <Badge variant="secondary" size="sm">Free</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline" size="sm">{event.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.venue}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold" data-testid="text-activities-title">Popular Activities</h2>
              <p className="text-muted-foreground">Things to do in Erie</p>
            </div>
            <Link href="/things-to-do">
              <Button variant="outline" className="gap-2" data-testid="button-view-activities">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularActivities.map((activity) => (
              <Card key={activity.id} className="hover-elevate" data-testid={`card-activity-${activity.id}`}>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center rounded-t-lg">
                  <MapPin className="h-12 w-12 text-primary/40" />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg mb-2">{activity.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" size="sm">{activity.category}</Badge>
                    {activity.audience.map((aud) => (
                      <Badge key={aud} variant="secondary" size="sm">{aud}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Need Personalized Recommendations?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Our AI assistant can help you find the perfect restaurant, activity, or event based on your preferences and interests.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={onOpenAI}
            className="gap-2"
            data-testid="button-cta-ai"
          >
            <Sparkles className="h-5 w-5" />
            Try AI Assistant
          </Button>
        </div>
      </section>

      <footer className="py-8 border-t bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Discover Erie - Your Complete Guide to Erie, PA</p>
          <p className="mt-2">Helping you explore restaurants, events, activities, and community resources.</p>
        </div>
      </footer>
    </div>
  );
}
