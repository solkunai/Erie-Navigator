import { useEffect, useState, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { Search, MapPin, Calendar, ExternalLink, ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { restaurants, businesses } from "@/lib/erieData";
import { useQuery } from "@tanstack/react-query";

export default function SearchResults() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // Fetch events and activities
  const { data: eventsResponse, isLoading: eventsLoading } = useQuery({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json();
    },
  });

  const { data: activitiesResponse, isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/activities"],
    queryFn: async () => {
      const response = await fetch("/api/activities");
      if (!response.ok) throw new Error("Failed to fetch activities");
      return response.json();
    },
  });

  const eventsData = eventsResponse?.data || [];
  const activitiesData = activitiesResponse?.data || [];
  const isLoading = eventsLoading || activitiesLoading;

  // Search across all data sources
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { restaurants: [], businesses: [], activities: [], events: [] };
    }

    const lowerQuery = searchQuery.toLowerCase();

    const matchRestaurants = restaurants.filter((item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.categories.some((cat) => cat.toLowerCase().includes(lowerQuery))
    );

    const matchBusinesses = businesses.filter((item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.categories.some((cat) => cat.toLowerCase().includes(lowerQuery)) ||
      (item.features && item.features.some((feat) => feat.toLowerCase().includes(lowerQuery)))
    );

    const matchActivities = activitiesData.filter((item: any) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      (item.categories && item.categories.some((cat: string) => cat.toLowerCase().includes(lowerQuery)))
    );

    const matchEvents = eventsData.filter((item: any) =>
      (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
      (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
      (item.category && item.category.toLowerCase().includes(lowerQuery))
    );

    return {
      restaurants: matchRestaurants,
      businesses: matchBusinesses,
      activities: matchActivities,
      events: matchEvents,
    };
  }, [searchQuery, eventsData, activitiesData]);

  const totalResults =
    searchResults.restaurants.length +
    searchResults.businesses.length +
    searchResults.activities.length +
    searchResults.events.length;

  return (
    <div className="min-h-screen bg-[#FCF4F8] py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-6 text-gray-700 hover:text-[#FF851A] hover:bg-[#FFD700]/20 font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#FFD700] border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
              <Search className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-black italic text-gray-900">
                Search Results
              </h1>
              {searchQuery && (
                <p className="text-gray-700 font-medium mt-1">
                  Showing results for "{searchQuery}" ({totalResults} found)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && searchQuery.trim() && (
          <Card className="bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
            <CardContent className="py-12 text-center">
              <Loader2 className="h-12 w-12 mx-auto text-[#FF851A] animate-spin mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Searching...
              </h2>
              <p className="text-gray-600">
                Finding the best matches for "{searchQuery}"
              </p>
            </CardContent>
          </Card>
        )}

        {/* No Query State */}
        {!searchQuery.trim() && (
          <Card className="bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Start your search
              </h2>
              <p className="text-gray-600">
                Use the search bar above to find restaurants, businesses, events, and activities in Erie!
              </p>
            </CardContent>
          </Card>
        )}

        {/* No Results State */}
        {!isLoading && searchQuery.trim() && totalResults === 0 && (
          <Card className="bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No results found
              </h2>
              <p className="text-gray-600">
                Try different keywords or check out our featured categories!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Results Sections */}
        {!isLoading && searchQuery.trim() && totalResults > 0 && (
          <div className="space-y-8">
            {/* Restaurants */}
            {searchResults.restaurants.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-[#FF851A] text-white px-3 py-1 border-2 border-black rounded-sm">
                    GRUB
                  </span>
                  ({searchResults.restaurants.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.restaurants.map((restaurant) => (
                    <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
                      <Card className="bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer h-full">
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {restaurant.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {restaurant.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className="bg-[#FF851A] text-white border-2 border-black hover:bg-[#FF851A] font-bold">
                              {restaurant.category}
                            </Badge>
                            <Badge className="bg-[#FFD700] text-black border-2 border-black hover:bg-[#FFD700] font-bold">
                              {restaurant.priceRange}
                            </Badge>
                          </div>
                          {restaurant.address && (
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                              <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span>{restaurant.address}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Businesses */}
            {searchResults.businesses.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-[#3A96CB] text-white px-3 py-1 border-2 border-black rounded-sm">
                    BUSINESS
                  </span>
                  ({searchResults.businesses.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.businesses.map((business) => (
                    <Link key={business.id} href={`/businesses/${business.id}`}>
                      <Card className="bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer h-full">
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {business.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {business.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className="bg-[#3A96CB] text-white border-2 border-black hover:bg-[#3A96CB] font-bold">
                              {business.category}
                            </Badge>
                          </div>
                          {business.address && (
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                              <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span>{business.address}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Activities */}
            {searchResults.activities.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-[#8E44AD] text-white px-3 py-1 border-2 border-black rounded-sm">
                    CHILL SPOTS
                  </span>
                  ({searchResults.activities.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.activities.map((activity: any) => (
                    <Link key={activity.id} href={`/things-to-do/${activity.id}`}>
                      <Card className="bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer h-full">
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {activity.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {activity.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className="bg-[#8E44AD] text-white border-2 border-black hover:bg-[#8E44AD] font-bold">
                              {activity.category}
                            </Badge>
                          </div>
                          {activity.address && (
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                              <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span>{activity.address}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Events */}
            {searchResults.events.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-[#E74C3C] text-white px-3 py-1 border-2 border-black rounded-sm">
                    EVENTS
                  </span>
                  ({searchResults.events.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.events.map((event: any) => (
                    <Link key={event.id} href={`/events/${event.id}`}>
                      <Card className="bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer h-full">
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {event.title || event.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {event.description}
                          </p>
                          {event.date && (
                            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                          )}
                          {(event.location || event.venue) && (
                            <div className="flex items-start gap-2 text-xs text-gray-600">
                              <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span>{event.location || event.venue}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
