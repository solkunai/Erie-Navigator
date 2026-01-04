import { useState, useMemo } from "react";
import { Search, Filter, Star, MapPin, Clock, Phone, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { restaurants, } from "@/lib/erieData";
import { restaurantCategories, type RestaurantCategory } from "@/types";

const priceRanges = ["$", "$$", "$$$", "$$$$"] as const;

export default function Restaurants() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<RestaurantCategory[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (category: RestaurantCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const togglePrice = (price: string) => {
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setSearch("");
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        search === "" ||
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => restaurant.categories.includes(cat));

      const matchesPrice =
        selectedPrices.length === 0 || selectedPrices.includes(restaurant.priceRange);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [search, selectedCategories, selectedPrices]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedPrices.length > 0 || search !== "";

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Cuisine Type</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {restaurantCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                data-testid={`checkbox-category-${category.toLowerCase()}`}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${price}`}
                checked={selectedPrices.includes(price)}
                onCheckedChange={() => togglePrice(price)}
                data-testid={`checkbox-price-${price.length}`}
              />
              <Label
                htmlFor={`price-${price}`}
                className="text-sm cursor-pointer"
              >
                {price} {price === "$" && "(Budget)"} 
                {price === "$$" && "(Moderate)"}
                {price === "$$$" && "(Upscale)"}
                {price === "$$$$" && "(Fine Dining)"}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full gap-2"
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-page-title">
            Erie Restaurants
          </h1>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Discover Erie's diverse dining scene. From waterfront seafood to authentic ethnic cuisines, 
            find the perfect spot for any occasion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search-restaurants"
              />
            </div>
            
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2" data-testid="button-mobile-filters">
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" size="sm">
                      {selectedCategories.length + selectedPrices.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Restaurants</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card p-4 rounded-lg border">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h2>
              <FilterContent />
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-muted-foreground" data-testid="text-results-count">
                Showing {filteredRestaurants.length} of {restaurants.length} restaurants
              </p>
              
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="cursor-pointer gap-1"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                  {selectedPrices.map((price) => (
                    <Badge
                      key={price}
                      variant="secondary"
                      className="cursor-pointer gap-1"
                      onClick={() => togglePrice(price)}
                    >
                      {price}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="hover-elevate overflow-hidden" data-testid={`card-restaurant-${restaurant.id}`}>
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 flex items-center justify-center relative">
                      {restaurant.imageUrl ? (
                        <img 
                          src={restaurant.imageUrl} 
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-background/80 flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">{restaurant.name.charAt(0)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{restaurant.name}</h3>
                        <Badge variant="secondary" size="sm">{restaurant.priceRange}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" size="sm">{restaurant.category}</Badge>
                        <span className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          {restaurant.rating}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {restaurant.description}
                      </p>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{restaurant.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span>{restaurant.phone}</span>
                        </div>
                        
                        {restaurant.hours && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{restaurant.hours}</span>
                          </div>
                        )}
                      </div>
                      
                      {restaurant.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t">
                          {restaurant.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" size="sm" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {restaurant.features.length > 3 && (
                            <Badge variant="outline" size="sm" className="text-xs">
                              +{restaurant.features.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      {restaurant.website && (
                        <a
                          href={restaurant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          Visit Website
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
