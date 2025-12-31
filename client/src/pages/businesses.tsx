import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, Filter, MapPin, Clock, Phone, ExternalLink, X, Building2, Plus } from "lucide-react";
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
import { businesses } from "@/lib/erieData";
import { businessCategories, type BusinessCategory } from "@shared/schema";

export default function Businesses() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<BusinessCategory[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (category: BusinessCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearch("");
  };

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch =
        search === "" ||
        business.name.toLowerCase().includes(search.toLowerCase()) ||
        business.description.toLowerCase().includes(search.toLowerCase()) ||
        business.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => business.categories.includes(cat));

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategories]);

  const hasActiveFilters = selectedCategories.length > 0 || search !== "";

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Business Type</h3>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {businessCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                data-testid={`checkbox-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
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
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-page-title">
              Local Businesses
            </h1>
            <Link href="/add-business">
              <Button className="gap-2" data-testid="button-add-business">
                <Plus className="h-4 w-4" />
                Add Your Business
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Support local! Discover Erie's small businesses, shops, and services. 
            From boutiques to auto repair, find trusted local businesses in your community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search businesses..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search-businesses"
              />
            </div>
            
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2" data-testid="button-mobile-filters">
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary">
                      {selectedCategories.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Businesses</SheetTitle>
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
                Showing {filteredBusinesses.length} of {businesses.length} businesses
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
                </div>
              )}
            </div>

            {filteredBusinesses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No businesses found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <Card key={business.id} className="hover-elevate overflow-hidden" data-testid={`card-business-${business.id}`}>
                    <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 flex items-center justify-center relative">
                      {business.imageUrl ? (
                        <img 
                          src={business.imageUrl} 
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-background/80 flex items-center justify-center">
                            <Building2 className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                      )}
                      {business.isFeatured && (
                        <Badge className="absolute top-2 right-2" variant="default">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{business.name}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{business.category}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {business.description}
                      </p>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{business.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span>{business.phone}</span>
                        </div>
                        
                        {business.hours && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span className="line-clamp-1">{business.hours}</span>
                          </div>
                        )}
                      </div>
                      
                      {business.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t">
                          {business.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {business.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{business.features.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      {business.website && (
                        <a
                          href={business.website}
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
