import { useState, useMemo } from "react";
import { Search, Users, MapPin, Mail, Phone, ExternalLink, Calendar, DollarSign, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  const hasActiveFilters = selectedCategory !== "All" || search !== "";

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
        <div className="bg-[#3A96CB] border-b-4 border-black py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <Users className="h-8 w-8 text-[#3A96CB]" />
              </div>
              <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-3 py-1 hover:bg-[#FFD700]">
                CONNECT
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none text-white italic" data-testid="text-social-groups-title">
              Social Groups
            </h1>
            <p className="text-white text-lg max-w-2xl font-medium mb-6">
              Connect with like-minded people in Erie through clubs, meetups, and community organizations.
            </p>

            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Search groups, interests..."
                className="pl-10 h-12 border-2 border-black rounded-sm focus:ring-2 focus:ring-black font-medium bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search-groups"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Category Tabs */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max" data-testid="tabs-group-category">
              {groupCategories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 font-bold border-2 border-black rounded-sm transition-all whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] ${
                    selectedCategory === category
                      ? "bg-[#3A96CB] text-white"
                      : "bg-white text-gray-700 hover:bg-[#FFD700]"
                  }`}
                  data-testid={`tab-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count and Clear Filters */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <p className="text-gray-700 font-bold" data-testid="text-group-results-count">
              Showing {filteredGroups.length} groups
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>

            {hasActiveFilters && (
              <Button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="gap-2 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {filteredGroups.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-[#3A96CB] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-gray-900">No groups found</h3>
              <p className="text-gray-600 mb-6 font-medium">
                Try adjusting your search or category filter.
              </p>
              <Button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="bg-[#3A96CB] hover:bg-[#4da8db] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <Card
                  key={group.id}
                  className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden"
                  data-testid={`card-group-${group.id}`}
                >
                  {/* Logo/Icon Section */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[#3A96CB]/10 to-[#FFD700]/10 overflow-hidden border-b-4 border-black">
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      {group.imageUrl ? (
                        <img
                          src={group.imageUrl}
                          alt={group.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-[#3A96CB] border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                          <Users className="h-10 w-10 text-white" />
                        </div>
                      )}
                    </div>
                    {/* Category Badge */}
                    <Badge className="absolute top-3 left-3 z-20 bg-[#3A96CB] text-white border-2 border-black rounded-sm font-bold text-xs px-2 py-1 hover:bg-[#3A96CB]">
                      {group.category}
                    </Badge>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="font-black text-xl mb-3 line-clamp-2 text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-700 line-clamp-3 mb-4 font-medium">
                      {group.description}
                    </p>

                    <div className="space-y-2 text-sm mb-4 pt-4 border-t-2 border-black">
                      {group.meetingSchedule && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <Calendar className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#3A96CB]" />
                          <span className="font-medium">{group.meetingSchedule}</span>
                        </div>
                      )}

                      {group.location && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#FF851A]" />
                          <span className="line-clamp-1 font-medium">{group.location}</span>
                        </div>
                      )}

                      {group.membershipFee && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="h-4 w-4 flex-shrink-0 text-[#FFD700]" />
                          <span className="font-medium">{group.membershipFee}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {group.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 flex-shrink-0 text-[#3A96CB]" />
                          <a
                            href={`mailto:${group.contactEmail}`}
                            className="text-sm hover:text-[#3A96CB] hover:underline truncate font-medium text-gray-700"
                          >
                            {group.contactEmail}
                          </a>
                        </div>
                      )}

                      {group.contactPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 flex-shrink-0 text-[#FF851A]" />
                          <a
                            href={`tel:${group.contactPhone}`}
                            className="text-sm hover:text-[#FF851A] hover:underline font-medium text-gray-700"
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
                          className="inline-flex items-center gap-1 text-sm text-[#3A96CB] hover:underline font-bold mt-2"
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
    </div>
  );
}
