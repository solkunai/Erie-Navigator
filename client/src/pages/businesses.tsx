import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, Filter, MapPin, Clock, Phone, ExternalLink, X, Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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
    return businesses
      .filter((business) => {
        const matchesSearch =
          search === "" ||
          business.name.toLowerCase().includes(search.toLowerCase()) ||
          business.description.toLowerCase().includes(search.toLowerCase()) ||
          business.category.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.some((cat) => business.categories.includes(cat));

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search, selectedCategories]);

  const hasActiveFilters = selectedCategories.length > 0 || search !== "";

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-4 text-[#3A96CB] uppercase tracking-wide text-sm">Category</h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {businessCategories.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                className="border-2 border-black data-[state=checked]:bg-[#3A96CB] data-[state=checked]:border-[#3A96CB]"
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer font-medium text-gray-700 hover:text-[#3A96CB] transition-colors"
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
        >
          <X className="h-4 w-4" />
          Clear Filters
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
        <div className="bg-[#3A96CB] border-b-4 border-black py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
              <div>
                <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-3 py-1 mb-4 hover:bg-[#FFD700]">
                  SHOP LOCAL
                </Badge>
                <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none text-white italic">
                  The Shops
                </h1>
                <p className="text-white text-lg max-w-2xl font-medium">
                  Local makers and unique treasures you won't find on Amazon. Support Erie's small businesses!
                </p>
              </div>
              <Link href="/add-business">
                <Button className="bg-[#FFD700] hover:bg-[#ffe44d] text-black font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your Business
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Find local shops..."
                  className="pl-10 h-12 border-2 border-black rounded-sm focus:ring-2 focus:ring-black font-medium bg-white text-gray-900 placeholder:text-gray-500"
                  style={{ color: '#111827' }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button className="lg:hidden gap-2 h-12 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                    <Filter className="h-4 w-4" />
                    Filters
                    {selectedCategories.length > 0 && (
                      <Badge className="bg-[#FF851A] text-white border-0 ml-1">
                        {selectedCategories.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-[#FCF4F8] border-l-4 border-black">
                  <SheetHeader>
                    <SheetTitle className="font-black text-2xl">Filter Businesses</SheetTitle>
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
                <h2 className="font-black mb-6 flex items-center gap-2 text-xl text-gray-900">
                  <Filter className="h-5 w-5 text-[#3A96CB]" />
                  Filters
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <p className="text-gray-700 font-bold">
                  Showing <span className="text-[#3A96CB]">{filteredBusinesses.length}</span> businesses
                </p>

                {selectedCategories.length > 0 && (
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
                  </div>
                )}
              </div>

              {filteredBusinesses.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-[#3A96CB] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                    <Building2 className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">No businesses found</h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    Try adjusting your search or filters.
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-[#3A96CB] hover:bg-[#4da8db] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  {/* Mobile: Horizontal Scroll */}
                  <div className="flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
                    {filteredBusinesses.map((business) => (
                      <Link key={business.id} href={`/businesses/${business.id}`} className="flex-none w-[70%] snap-start">
                        <Card
                          className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all p-6 group cursor-pointer h-full"
                        >
                      <div className="flex gap-6">
                        {/* Image */}
                        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-[#3A96CB]/10 to-[#FFD700]/10 flex-shrink-0 flex items-center justify-center overflow-hidden border-4 border-black shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                          {business.imageUrl ? (
                            <img
                              src={business.imageUrl}
                              alt={business.name}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <Building2 className="h-10 w-10 text-[#3A96CB]" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="min-w-0 flex-1">
                              <Badge className="bg-[#3A96CB] text-white border-2 border-black rounded-sm font-bold text-xs mb-2 hover:bg-[#3A96CB]">
                                {business.category}
                              </Badge>
                              <h3 className="font-black text-xl text-gray-900 group-hover:text-[#3A96CB] transition-colors line-clamp-2">
                                {business.name}
                              </h3>
                            </div>
                            {business.website && (
                              <a
                                href={business.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 p-2 bg-[#3A96CB]/10 border-2 border-[#3A96CB] rounded-sm hover:bg-[#3A96CB]/20 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="h-4 w-4 text-[#3A96CB]" />
                              </a>
                            )}
                          </div>

                          <p className="text-sm text-gray-700 mt-2 line-clamp-2 font-medium">
                            {business.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
                            <span className="flex items-center gap-2 min-w-0">
                              <MapPin className="h-4 w-4 flex-shrink-0 text-[#FF851A]" />
                              <span className="truncate font-medium">{business.address}</span>
                            </span>
                            <span className="flex items-center gap-2 min-w-0">
                              <Phone className="h-4 w-4 flex-shrink-0 text-[#3A96CB]" />
                              <span className="font-medium truncate">{business.phone}</span>
                            </span>
                            {business.hours && (
                              <span className="flex items-center gap-2 min-w-0">
                                <Clock className="h-4 w-4 flex-shrink-0 text-[#FFD700]" />
                                <span className="truncate font-medium">{business.hours}</span>
                              </span>
                            )}
                          </div>

                          {business.features.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-2 border-black">
                              {business.features.slice(0, 4).map((feature) => (
                                <Badge
                                  key={feature}
                                  className="bg-white text-black border-2 border-black rounded-full text-xs font-bold hover:bg-[#FFD700] transition-colors"
                                >
                                  {feature}
                                </Badge>
                              ))}
                              {business.features.length > 4 && (
                                <Badge className="bg-white text-black border-2 border-black rounded-full text-xs font-bold">
                                  +{business.features.length - 4} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                    </Link>
                  ))}
                  </div>

                  {/* Desktop: Vertical Stack */}
                  <div className="hidden md:grid md:gap-4">
                    {filteredBusinesses.map((business) => (
                      <Link key={business.id} href={`/businesses/${business.id}`}>
                        <Card
                          className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all p-6 group cursor-pointer"
                        >
                        <div className="flex gap-6">
                          {/* Image */}
                          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-[#3A96CB]/10 to-[#FFD700]/10 flex-shrink-0 flex items-center justify-center overflow-hidden border-4 border-black shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                            {business.imageUrl ? (
                              <img
                                src={business.imageUrl}
                                alt={business.name}
                                className="w-full h-full object-contain p-2"
                              />
                            ) : (
                              <Building2 className="h-10 w-10 text-[#3A96CB]" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <Badge className="bg-[#3A96CB] text-white border-2 border-black rounded-sm font-bold text-xs mb-2 hover:bg-[#3A96CB]">
                                  {business.category}
                                </Badge>
                                <h3 className="font-black text-xl text-gray-900 group-hover:text-[#3A96CB] transition-colors">
                                  {business.name}
                                </h3>
                              </div>
                              {business.website && (
                                <a
                                  href={business.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0 p-2 bg-[#3A96CB]/10 border-2 border-[#3A96CB] rounded-sm hover:bg-[#3A96CB]/20 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink className="h-4 w-4 text-[#3A96CB]" />
                                </a>
                              )}
                            </div>

                            <p className="text-sm text-gray-700 mt-2 line-clamp-2 font-medium">
                              {business.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
                              <span className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[#FF851A]" />
                                <span className="truncate max-w-[250px] font-medium">{business.address}</span>
                              </span>
                              <span className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#3A96CB]" />
                                <span className="font-medium">{business.phone}</span>
                              </span>
                              {business.hours && (
                                <span className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-[#FFD700]" />
                                  <span className="truncate max-w-[180px] font-medium">{business.hours}</span>
                                </span>
                              )}
                            </div>

                            {business.features.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-2 border-black">
                                {business.features.slice(0, 4).map((feature) => (
                                  <Badge
                                    key={feature}
                                    className="bg-white text-black border-2 border-black rounded-full text-xs font-bold hover:bg-[#FFD700] transition-colors"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                                {business.features.length > 4 && (
                                  <Badge className="bg-white text-black border-2 border-black rounded-full text-xs font-bold">
                                    +{business.features.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                      </Link>
                    ))}
                  </div>
                </>
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
