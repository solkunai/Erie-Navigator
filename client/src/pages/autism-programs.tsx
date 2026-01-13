import { useState, useMemo } from "react";
import { Search, MapPin, Phone, Mail, ExternalLink, Heart, Shield, CheckCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { autismPrograms } from "@/lib/erieData";

export default function AutismPrograms() {
  const [search, setSearch] = useState("");

  const filteredPrograms = useMemo(() => {
    return autismPrograms.filter((program) => {
      return (
        search === "" ||
        program.name.toLowerCase().includes(search.toLowerCase()) ||
        program.organization.toLowerCase().includes(search.toLowerCase()) ||
        program.description.toLowerCase().includes(search.toLowerCase()) ||
        program.services.some((s) => s.toLowerCase().includes(search.toLowerCase()))
      );
    });
  }, [search]);

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
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <Heart className="h-8 w-8 text-[#FF851A]" />
              </div>
              <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-3 py-1 hover:bg-[#FFD700]">
                SUPPORT
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none text-white italic" data-testid="text-autism-page-title">
              Autism Programs
            </h1>
            <p className="text-white text-lg max-w-2xl font-medium mb-6">
              Find support services, therapy programs, and sensory-friendly resources for individuals with autism and their families in the Erie area.
            </p>

            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Search programs, services..."
                className="pl-10 h-12 border-2 border-black rounded-sm focus:ring-2 focus:ring-black font-medium bg-white text-gray-900 placeholder:text-gray-500"
                style={{ color: '#111827' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search-programs"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Info Banner */}
          <div className="bg-white border-4 border-black rounded-xl p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#3A96CB] border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-black text-xl mb-2 text-gray-900">Support & Resources</h2>
                <p className="text-gray-700 text-sm mb-3 font-medium leading-relaxed">
                  This directory includes local organizations, therapy providers, and community programs
                  that support individuals with autism spectrum disorders. Many offer sensory-friendly
                  environments and trained staff.
                </p>
                <p className="text-gray-700 text-sm font-medium">
                  If you need immediate assistance, please contact the{" "}
                  <a href="tel:211" className="text-[#3A96CB] hover:underline font-bold">211</a>{" "}
                  helpline or the{" "}
                  <a href="tel:988" className="text-[#FF851A] hover:underline font-bold">988</a>{" "}
                  Suicide and Crisis Lifeline.
                </p>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <p className="text-gray-700 font-bold" data-testid="text-program-results-count">
              Showing {filteredPrograms.length} programs and resources
            </p>

            {search && (
              <Button
                onClick={() => setSearch("")}
                className="gap-2 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
              >
                <X className="h-4 w-4" />
                Clear Search
              </Button>
            )}
          </div>

          {filteredPrograms.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-[#FF851A] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <Search className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-gray-900">No programs found</h3>
              <p className="text-gray-600 mb-6 font-medium">
                Try adjusting your search terms.
              </p>
              <Button
                onClick={() => setSearch("")}
                className="bg-[#FF851A] hover:bg-[#ff9633] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPrograms.map((program) => (
                <Card
                  key={program.id}
                  className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden"
                  data-testid={`card-program-${program.id}`}
                >
                  <CardContent className="p-6">
                    {/* Header with Logo/Icon */}
                    <div className="flex items-start gap-4 mb-4 pb-4 border-b-2 border-black">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF851A]/20 to-[#FFD700]/20 border-4 border-black flex-shrink-0 flex items-center justify-center overflow-hidden shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                        {program.imageUrl ? (
                          <img
                            src={program.imageUrl}
                            alt={program.name}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <Heart className="h-7 w-7 text-[#FF851A]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-black text-xl text-gray-900 line-clamp-2">{program.name}</h3>
                          {program.ageRange && (
                            <Badge className="flex-shrink-0 bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-2 py-1 hover:bg-[#FFD700]">
                              {program.ageRange}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 font-bold">{program.organization}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 font-medium leading-relaxed">
                      {program.description}
                    </p>

                    {/* Services Offered */}
                    <div className="mb-4">
                      <h4 className="text-sm font-black mb-2 flex items-center gap-1 text-gray-900">
                        <CheckCircle className="h-4 w-4 text-[#3A96CB]" />
                        Services Offered
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {program.services.map((service) => (
                          <Badge key={service} className="bg-white text-gray-700 border-2 border-black rounded-full text-xs font-bold hover:bg-[#3A96CB] hover:text-white transition-colors">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Accessibility Features */}
                    {program.accessibility.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-black mb-2 flex items-center gap-1 text-gray-900">
                          <Shield className="h-4 w-4 text-[#4ade80]" />
                          Accessibility Features
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {program.accessibility.map((feature) => (
                            <Badge key={feature} className="bg-[#4ade80]/20 text-gray-900 border-2 border-[#4ade80] rounded-full text-xs font-bold">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Information */}
                    <div className="pt-4 border-t-2 border-black space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#FF851A]" />
                        <span className="font-medium">{program.address}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 flex-shrink-0 text-[#3A96CB]" />
                        <a
                          href={`tel:${program.phone}`}
                          className="text-gray-700 hover:text-[#3A96CB] hover:underline font-medium"
                        >
                          {program.phone}
                        </a>
                      </div>

                      {program.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 flex-shrink-0 text-[#FF851A]" />
                          <a
                            href={`mailto:${program.email}`}
                            className="text-gray-700 hover:text-[#FF851A] hover:underline truncate font-medium"
                          >
                            {program.email}
                          </a>
                        </div>
                      )}

                      {program.website && (
                        <a
                          href={program.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#3A96CB] hover:underline font-bold mt-2"
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
