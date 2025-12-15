import { useState, useMemo } from "react";
import { Search, MapPin, Phone, Mail, ExternalLink, Heart, Shield, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-pink-500/20">
              <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-autism-page-title">
              Autism Programs & Resources
            </h1>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Find support services, therapy programs, and sensory-friendly resources for individuals 
            with autism and their families in the Erie area.
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search programs, services..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search-programs"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-semibold text-lg mb-2">Support & Resources</h2>
              <p className="text-muted-foreground text-sm mb-4">
                This directory includes local organizations, therapy providers, and community programs 
                that support individuals with autism spectrum disorders. Many offer sensory-friendly 
                environments and trained staff.
              </p>
              <p className="text-muted-foreground text-sm">
                If you need immediate assistance, please contact the{" "}
                <a href="tel:211" className="text-primary hover:underline font-medium">211</a>{" "}
                helpline or the{" "}
                <a href="tel:988" className="text-primary hover:underline font-medium">988</a>{" "}
                Suicide and Crisis Lifeline.
              </p>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-6" data-testid="text-program-results-count">
          Showing {filteredPrograms.length} programs and resources
        </p>

        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No programs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms.
            </p>
            <Button variant="outline" onClick={() => setSearch("")}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="hover-elevate" data-testid={`card-program-${program.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-1">{program.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{program.organization}</p>
                    </div>
                    {program.ageRange && (
                      <Badge variant="secondary" size="sm">
                        {program.ageRange}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {program.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Services Offered
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.services.map((service) => (
                        <Badge key={service} variant="outline" size="sm">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {program.accessibility.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                        <Shield className="h-4 w-4 text-green-600" />
                        Accessibility Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {program.accessibility.map((feature) => (
                          <Badge key={feature} variant="secondary" size="sm" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{program.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <a href={`tel:${program.phone}`} className="hover:text-primary hover:underline">
                        {program.phone}
                      </a>
                    </div>
                    
                    {program.email && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <a href={`mailto:${program.email}`} className="hover:text-primary hover:underline">
                          {program.email}
                        </a>
                      </div>
                    )}
                    
                    {program.website && (
                      <a
                        href={program.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
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
