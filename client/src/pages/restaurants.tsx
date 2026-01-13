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
import { restaurants } from "@/lib/erieData";
import { restaurantCategories, type RestaurantCategory } from "@shared/schema";

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
        <h3 className="font-bold mb-4 text-[#FF851A] uppercase tracking-wide text-sm">Cuisine Type</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {restaurantCategories.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                data-testid={`checkbox-category-${category.toLowerCase()}`}
                className="border-2 border-black data-[state=checked]:bg-[#FF851A] data-[state=checked]:border-[#FF851A]"
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer font-medium text-gray-700 hover:text-[#FF851A] transition-colors"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-black pt-6">
        <h3 className="font-bold mb-4 text-[#FF851A] uppercase tracking-wide text-sm">Price Range</h3>
        <div className="space-y-3">
          {priceRanges.map((price) => (
            <div key={price} className="flex items-center space-x-3">
              <Checkbox
                id={`price-${price}`}
                checked={selectedPrices.includes(price)}
                onCheckedChange={() => togglePrice(price)}
                data-testid={`checkbox-price-${price.length}`}
                className="border-2 border-black data-[state=checked]:bg-[#FF851A] data-[state=checked]:border-[#FF851A]"
              />
              <Label
                htmlFor={`price-${price}`}
                className="text-sm cursor-pointer font-medium text-gray-700 hover:text-[#FF851A] transition-colors"
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
          onClick={clearFilters}
          className="w-full gap-2 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

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
        <div className="bg-[#FFD700] border-b-4 border-black py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <Badge className="bg-[#FF851A] text-white border-2 border-black rounded-sm font-bold text-xs px-3 py-1 mb-4 hover:bg-[#FF851A]">
              42 SPOTS & COUNTING
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none" data-testid="text-page-title">
              <span className="italic text-black">The Grub</span>
            </h1>
            <p className="text-black text-lg mb-6 max-w-2xl font-medium">
              Burgers, tacos, and fine dining for when you're hangry. Discover Erie's diverse dining scene.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search for food vibes..."
                  className="pl-10 h-12 border-2 border-black rounded-sm focus:ring-2 focus:ring-black font-medium bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  data-testid="input-search-restaurants"
                />
              </div>

              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    className="lg:hidden gap-2 h-12 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
                    data-testid="button-mobile-filters"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge className="bg-[#FF851A] text-white border-0 ml-1">
                        {selectedCategories.length + selectedPrices.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-[#FCF4F8] border-l-4 border-black">
                  <SheetHeader>
                    <SheetTitle className="font-black text-2xl">Filter Restaurants</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-white p-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <h2 className="font-black mb-6 flex items-center gap-2 text-xl">
                  <Filter className="h-5 w-5 text-[#FF851A]" />
                  Filters
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <p className="text-gray-700 font-bold" data-testid="text-results-count">
                  Showing <span className="text-[#FF851A]">{filteredRestaurants.length}</span> of {restaurants.length} restaurants
                </p>

                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        className="cursor-pointer gap-1 bg-[#3A96CB] text-white border-2 border-black rounded-sm font-bold hover:bg-[#4da8db]"
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                        <X className="h-3 w-3" />
                      </Badge>
                    ))}
                    {selectedPrices.map((price) => (
                      <Badge
                        key={price}
                        className="cursor-pointer gap-1 bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold hover:bg-[#ffe44d]"
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
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-[#FFD700] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                    <Search className="h-12 w-12 text-black" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">No restaurants found</h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-[#FF851A] hover:bg-[#ff9d3d] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant, index) => (
                    <Card
                      key={restaurant.id}
                      className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden"
                      data-testid={`card-restaurant-${restaurant.id}`}
                    >
                      {/* Image with Badge */}
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#FF851A]/10 to-[#FFD700]/10 overflow-hidden">
                        {restaurant.imageUrl ? (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                              <img
                                src={restaurant.imageUrl}
                                alt={restaurant.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            {/* Rating Badge */}
                            <Badge className="absolute top-3 right-3 z-20 bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-1.5 py-0.5 hover:bg-[#FFD700] inline-flex items-center gap-0.5 w-auto">
                              <Star className="h-2.5 w-2.5 fill-black" />
                              {restaurant.rating}
                            </Badge>

                            {/* Category Badge */}
                            <Badge className="absolute top-3 left-3 z-20 bg-[#FF851A] text-white border-2 border-black rounded-sm font-bold text-xs px-2 py-1 hover:bg-[#FF851A]">
                              {restaurant.category}
                            </Badge>
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-6xl font-black text-[#FF851A]/30">{restaurant.name.charAt(0)}</span>
                            </div>
                            {/* Rating Badge */}
                            <Badge className="absolute top-3 right-3 z-20 bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-1.5 py-0.5 hover:bg-[#FFD700] inline-flex items-center gap-0.5 w-auto">
                              <Star className="h-2.5 w-2.5 fill-black" />
                              {restaurant.rating}
                            </Badge>

                            {/* Category Badge */}
                            <Badge className="absolute top-3 left-3 z-20 bg-[#FF851A] text-white border-2 border-black rounded-sm font-bold text-xs px-2 py-1 hover:bg-[#FF851A]">
                              {restaurant.category}
                            </Badge>
                          </>
                        )}
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="font-black text-xl line-clamp-1 text-gray-900">{restaurant.name}</h3>
                          <Badge className="bg-black text-white border-2 border-black rounded-sm font-bold text-xs px-2 py-1 hover:bg-black flex-shrink-0">
                            {restaurant.priceRange}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-700 line-clamp-2 mb-4 font-medium">
                          {restaurant.description}
                        </p>

                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#FF851A]" />
                            <span className="line-clamp-1 font-medium">{restaurant.address}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 flex-shrink-0 text-[#3A96CB]" />
                            <span className="font-medium">{restaurant.phone}</span>
                          </div>

                          {restaurant.hours && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 flex-shrink-0 text-[#FFD700]" />
                              <span className="font-medium">{restaurant.hours}</span>
                            </div>
                          )}
                        </div>

                        {restaurant.features.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4 pt-4 border-t-2 border-black">
                            {restaurant.features.slice(0, 3).map((feature) => (
                              <Badge key={feature} className="bg-white text-black border-2 border-black rounded-full text-xs font-bold hover:bg-[#FFD700] transition-colors">
                                {feature}
                              </Badge>
                            ))}
                            {restaurant.features.length > 3 && (
                              <Badge className="bg-white text-black border-2 border-black rounded-full text-xs font-bold">
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
                            className="flex items-center justify-center gap-2 text-sm font-bold text-[#FF851A] hover:text-[#ff9d3d] bg-[#FF851A]/10 border-2 border-[#FF851A] rounded-sm py-2 px-4 hover:bg-[#FF851A]/20 transition-all"
                          >
                            Visit Website
                            <ExternalLink className="h-4 w-4" />
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
    </div>
  );
}
