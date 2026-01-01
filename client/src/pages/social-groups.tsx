import { useState, useMemo } from "react";
import { Search, Users, MapPin, Mail, Phone, ExternalLink, Calendar, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { socialGroups } from "@/lib/erieData";

const groupCategories = [
  "All",
  "Professional Networking",
  "Sports & Fitness",
  "Outdoor Recreation",
  "Parenting",
  "Hobbies",
  "Arts & Creative",
  "Service & Volunteer",
  "Food & Dining",
] as const;

export default function SocialGroups() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredGroups = useMemo(() => {
    return socialGroups.filter((group) => {
      const matchesSearch =
        search === "" ||
        group.name.toLowerCase().includes(search.toLowerCase()) ||
        group.description.toLowerCase().includes(search.toLowerCase()) ||
        group.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || group.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-indigo-500/20">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-social-groups-title">
              Social Groups & Organizations
            </h1>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Connect with like-minded people in Erie through clubs, meetups, and community organizations.
            Find your community and make lasting connections.
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search groups, interests..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search-groups"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 overflow-x-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="flex-wrap h-auto gap-2" data-testid="tabs-group-category">
              {groupCategories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="whitespace-nowrap"
                  data-testid={`tab-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <p className="text-muted-foreground mb-6" data-testid="text-group-results-count">
          Showing {filteredGroups.length} groups
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>

        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No groups found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or category filter.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover-elevate flex flex-col" data-testid={`card-group-${group.id}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-white dark:bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden border">
                      {group.imageUrl ? (
                        <img 
                          src={group.imageUrl} 
                          alt={group.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-2">{group.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {group.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {group.description}
                  </p>
                  
                  <div className="space-y-2 text-sm border-t pt-4">
                    {group.meetingSchedule && (
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{group.meetingSchedule}</span>
                      </div>
                    )}
                    
                    {group.location && (
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{group.location}</span>
                      </div>
                    )}
                    
                    {group.membershipFee && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4 flex-shrink-0" />
                        <span>{group.membershipFee}</span>
                      </div>
                    )}
                    
                    {group.contactEmail && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <a 
                          href={`mailto:${group.contactEmail}`} 
                          className="hover:text-primary hover:underline truncate"
                        >
                          {group.contactEmail}
                        </a>
                      </div>
                    )}
                    
                    {group.contactPhone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <a 
                          href={`tel:${group.contactPhone}`} 
                          className="hover:text-primary hover:underline"
                        >
                          {group.contactPhone}
                        </a>
                      </div>
                    )}
                    
                    {group.website && (
                      <a
                        href={group.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline mt-2"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
