import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, Filter, MapPin, Clock, Phone, ExternalLink, X, Building2, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <h3 className="text-sm font-medium mb-3">Category</h3>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {businessCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer font-normal"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="w-full text-muted-foreground"
          size="sm"
        >
          Clear filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Directory
              </p>
              <h1 className="text-3xl md:text-4xl font-serif">Local Businesses</h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Support Erie's small businesses, shops, and services.
              </p>
            </div>
            <Link href="/add-business">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your Business
              </Button>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search businesses..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {selectedCategories.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedCategories.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
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
        <div className="flex gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-20">
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Count & Active Filters */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-sm text-muted-foreground">
                {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'}
              </p>
              
              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {filteredBusinesses.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="font-medium mb-2">No businesses found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search or filters.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredBusinesses.map((business) => (
                  <article 
                    key={business.id} 
                    className="flex gap-4 p-5 border rounded-lg hover:border-primary/30 transition-colors group"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-lg bg-white dark:bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden border">
                      {business.imageUrl ? (
                        <img 
                          src={business.imageUrl} 
                          alt={business.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                            {business.category}
                          </p>
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {business.name}
                          </h3>
                        </div>
                        {business.website && (
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {business.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="truncate max-w-[200px]">{business.address}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          {business.phone}
                        </span>
                        {business.hours && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span className="truncate max-w-[150px]">{business.hours}</span>
                          </span>
                        )}
                      </div>

                      {business.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {business.features.slice(0, 4).map((feature) => (
                            <span 
                              key={feature} 
                              className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                            >
                              {feature}
                            </span>
                          ))}
                          {business.features.length > 4 && (
                            <span className="text-xs px-2 py-0.5 text-muted-foreground">
                              +{business.features.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
