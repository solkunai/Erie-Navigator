import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, Filter, MapPin, Clock, Phone, ExternalLink, X, Users, User, Baby, Waves } from "lucide-react";
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
import { activityCategories, audienceTypes, type ActivityCategory, type AudienceType } from "@shared/schema";

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
    return activities
      .filter((activity) => {
        const matchesSearch =
          search === "" ||
          activity.name.toLowerCase().includes(search.toLowerCase()) ||
          activity.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(activity.category);

        const matchesAudience =
          selectedAudience === "All" || activity.audience.includes(selectedAudience);

        return matchesSearch && matchesCategory && matchesAudience;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search, selectedCategories, selectedAudience]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedAudience !== "All" || search !== "";

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-4 text-[#FF851A] uppercase tracking-wide text-sm">Activity Type</h3>
        <div className="space-y-3">
          {activityCategories.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                data-testid={`checkbox-activity-${category.toLowerCase().replace(/\s+/g, "-")}`}
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

      {hasActiveFilters && (
        <Button
          onClick={clearFilters}
          className="w-full gap-2 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
          data-testid="button-clear-activity-filters"
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
        <div className="bg-[#FF851A] border-b-4 border-black py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-3 py-1 mb-4 hover:bg-[#FFD700]">
              EXPLORE ERIE
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none text-white italic" data-testid="text-things-to-do-title">
              Chill Spots
            </h1>
            <p className="text-white text-lg max-w-2xl font-medium mb-6">
              Parks, beaches, and quiet nooks for a mental reset. Explore attractions and experiences for every age!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Find your escape..."
                  className="pl-10 h-12 border-2 border-black rounded-sm focus:ring-2 focus:ring-black font-medium bg-white text-gray-900 placeholder:text-gray-500"
                  style={{ color: '#111827' }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  data-testid="input-search-activities"
                />
              </div>

              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    className="lg:hidden gap-2 h-12 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
                    data-testid="button-mobile-activity-filters"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge className="bg-[#FF851A] text-white border-0 ml-1">
                        {selectedCategories.length + (selectedAudience !== "All" ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-[#FCF4F8] border-l-4 border-black">
                  <SheetHeader>
                    <SheetTitle className="font-black text-2xl">Filter Activities</SheetTitle>
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
          {/* Audience Tabs */}
          <Tabs value={selectedAudience} onValueChange={(value) => setSelectedAudience(value as AudienceType | "All")} className="mb-8">
            <TabsList className="flex-wrap h-auto gap-2 bg-white border-4 border-black rounded-sm p-2 shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]" data-testid="tabs-audience">
              <TabsTrigger
                value="All"
                className="gap-2 text-gray-900 data-[state=active]:bg-[#FF851A] data-[state=active]:text-white border-2 border-black rounded-sm font-bold"
                data-testid="tab-all"
              >
                <Users className="h-4 w-4" />
                All
              </TabsTrigger>
              {audienceTypes.map((audience) => {
                const Icon = audienceIcons[audience];
                return (
                  <TabsTrigger
                    key={audience}
                    value={audience}
                    className="gap-2 text-gray-900 data-[state=active]:bg-[#FF851A] data-[state=active]:text-white border-2 border-black rounded-sm font-bold"
                    data-testid={`tab-${audience.toLowerCase()}`}
                  >
                    <Icon className="h-4 w-4" />
                    {audience}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-white p-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <h2 className="font-black mb-6 flex items-center gap-2 text-xl text-gray-900">
                  <Filter className="h-5 w-5 text-[#FF851A]" />
                  Filters
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <p className="text-gray-700 font-bold" data-testid="text-activity-results-count">
                  Showing <span className="text-[#FF851A]">{filteredActivities.length}</span> of {activities.length} activities
                  {selectedAudience !== "All" && ` for ${selectedAudience}`}
                </p>

                {hasActiveFilters && selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        className="cursor-pointer gap-1 bg-[#FF851A] text-white border-2 border-black rounded-sm font-bold hover:bg-[#ff9d3d]"
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
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-[#FF851A] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                    <Waves className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">No activities found</h3>
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
                  {filteredActivities.map((activity, index) => (
                    <Link key={activity.id} href={`/things-to-do/${activity.id}`}>
                      <Card
                        className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden cursor-pointer"
                        data-testid={`card-activity-${activity.id}`}
                      >
                      {/* Hero Image Section */}
                      <div className="relative aspect-video bg-gradient-to-br from-[#FF851A]/20 to-[#FFD700]/20 flex items-center justify-center border-b-4 border-black">
                        <div className="w-20 h-20 rounded-full bg-white border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                          <Waves className="h-10 w-10 text-[#FF851A]" />
                        </div>
                        {/* Category Badge */}
                        <Badge className="absolute top-3 left-3 bg-[#FF851A] text-white border-2 border-black rounded-sm font-bold text-xs hover:bg-[#FF851A]">
                          {activity.category}
                        </Badge>
                      </div>

                      <CardContent className="p-5">
                        <h3 className="font-black text-xl mb-3 text-gray-900">{activity.name}</h3>

                        {/* Audience Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {activity.audience.map((aud) => {
                            const Icon = audienceIcons[aud];
                            return (
                              <Badge
                                key={aud}
                                className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs hover:bg-[#FFD700] flex items-center gap-1"
                              >
                                <Icon className="h-3 w-3" />
                                {aud}
                              </Badge>
                            );
                          })}
                        </div>

                        <p className="text-sm text-gray-700 line-clamp-2 mb-4 font-medium">
                          {activity.description}
                        </p>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#FF851A]" />
                            <span className="line-clamp-1 font-medium">{activity.address}</span>
                          </div>

                          {activity.hours && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 flex-shrink-0 text-[#3A96CB]" />
                              <span className="font-medium">{activity.hours}</span>
                            </div>
                          )}

                          {activity.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 flex-shrink-0 text-[#FFD700]" />
                              <span className="font-medium">{activity.phone}</span>
                            </div>
                          )}

                          {activity.priceRange && (
                            <div className="mt-3">
                              <Badge className="bg-black text-white border-2 border-black rounded-sm font-bold text-xs hover:bg-black">
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
                            className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-[#FF851A] hover:text-[#ff9d3d] bg-[#FF851A]/10 border-2 border-[#FF851A] rounded-sm py-2 px-4 hover:bg-[#FF851A]/20 transition-all"
                          >
                            Visit Website
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </CardContent>
                    </Card>
                    </Link>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 bg-white border-t-4 border-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/helloeriefinallogo.png"
                  alt="Hello Erie Logo"
                  className="w-16 h-16 object-contain transform -rotate-12"
                />
                <span className="font-black text-xl text-gray-900">HELLO ERIE © 2026</span>
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
