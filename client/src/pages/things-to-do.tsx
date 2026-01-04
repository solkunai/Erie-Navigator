import { useState, useMemo } from "react";
import { Search, Filter, MapPin, Clock, Phone, ExternalLink, X, Users, User, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { activities } from "@/lib/erieData";
import { activityCategories, audienceTypes, type ActivityCategory, type AudienceType } from "@/types";

const audienceIcons: Record<AudienceType, typeof Users> = {
  Kids: Baby,
  Adults: User,
  Family: Users,
};

export default function ThingsToDo() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ActivityCategory[]>([]);
  const [selectedAudience, setSelectedAudience] = useState<AudienceType | "All">("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (category: ActivityCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedAudience("All");
    setSearch("");
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        search === "" ||
        activity.name.toLowerCase().includes(search.toLowerCase()) ||
        activity.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(activity.category);

      const matchesAudience =
        selectedAudience === "All" || activity.audience.includes(selectedAudience);

      return matchesSearch && matchesCategory && matchesAudience;
    });
  }, [search, selectedCategories, selectedAudience]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedAudience !== "All" || search !== "";

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Activity Type</h3>
        <div className="space-y-2">
          {activityCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                data-testid={`checkbox-activity-${category.toLowerCase().replace(/\s+/g, "-")}`}
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
          data-testid="button-clear-activity-filters"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-things-to-do-title">
            Things to Do in Erie
          </h1>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Explore attractions, activities, and experiences for every age and interest.
            From Presque Isle beaches to museums and entertainment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search activities..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search-activities"
              />
            </div>
            
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2" data-testid="button-mobile-activity-filters">
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" size="sm">
                      {selectedCategories.length + (selectedAudience !== "All" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Activities</SheetTitle>
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
        <Tabs value={selectedAudience} onValueChange={(value) => setSelectedAudience(value as AudienceType | "All")} className="mb-8">
          <TabsList className="flex-wrap h-auto gap-2" data-testid="tabs-audience">
            <TabsTrigger value="All" className="gap-2" data-testid="tab-all">
              <Users className="h-4 w-4" />
              All
            </TabsTrigger>
            {audienceTypes.map((audience) => {
              const Icon = audienceIcons[audience];
              return (
                <TabsTrigger key={audience} value={audience} className="gap-2" data-testid={`tab-${audience.toLowerCase()}`}>
                  <Icon className="h-4 w-4" />
                  {audience}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

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
              <p className="text-muted-foreground" data-testid="text-activity-results-count">
                Showing {filteredActivities.length} of {activities.length} activities
                {selectedAudience !== "All" && ` for ${selectedAudience}`}
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

            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No activities found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => (
                  <Card key={activity.id} className="hover-elevate overflow-hidden" data-testid={`card-activity-${activity.id}`}>
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-background/80 flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-lg mb-2">{activity.name}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" size="sm">{activity.category}</Badge>
                        {activity.audience.map((aud) => {
                          const Icon = audienceIcons[aud];
                          return (
                            <Badge key={aud} variant="secondary" size="sm" className="gap-1">
                              <Icon className="h-3 w-3" />
                              {aud}
                            </Badge>
                          );
                        })}
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {activity.description}
                      </p>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{activity.address}</span>
                        </div>
                        
                        {activity.hours && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{activity.hours}</span>
                          </div>
                        )}
                        
                        {activity.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{activity.phone}</span>
                          </div>
                        )}
                        
                        {activity.priceRange && (
                          <div className="mt-2">
                            <Badge variant="secondary" size="sm">
                              {activity.priceRange}
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      {activity.website && (
                        <a
                          href={activity.website}
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
