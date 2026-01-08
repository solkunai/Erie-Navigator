import { Link, useLocation } from "wouter";
import { Search, Sparkles, Menu, MapPin, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./theme-toggle";
import { CompactClock } from "./real-time-clock";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/events", label: "Events" },
  { href: "/things-to-do", label: "Things to Do" },
  { href: "/autism-programs", label: "Programs" },
  { href: "/social-groups", label: "Social Groups" },
];

interface HeaderProps {
  onOpenAI?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function Header({ onOpenAI, searchQuery, onSearchChange }: HeaderProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md p-1"
              data-testid="link-home"
            >
              <MapPin className="h-6 w-6 text-primary" />
              <span className="hidden sm:inline font-bold text-xl">Discover Erie</span>
              <span className="sm:hidden font-bold text-lg">Erie</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                  location === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Erie..."
                  className="pl-9 w-48 lg:w-64"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  data-testid="input-header-search"
                />
              </div>
              
              <Button
                variant="default"
                size="sm"
                onClick={onOpenAI}
                className="gap-2"
                data-testid="button-ai-assistant"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden xl:inline">Ask AI</span>
              </Button>

              <Link href="/add-business">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  data-testid="button-add-business"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden xl:inline">Add Business</span>
                </Button>
              </Link>
            </div>

            <div className="hidden sm:block">
              <CompactClock />
            </div>

            <ThemeToggle />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 py-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search Erie..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => onSearchChange?.(e.target.value)}
                      data-testid="input-mobile-search"
                    />
                  </div>

                  <Button
                    variant="default"
                    onClick={() => {
                      onOpenAI?.();
                      setMobileMenuOpen(false);
                    }}
                    className="gap-2 w-full"
                    data-testid="button-mobile-ai"
                  >
                    <Sparkles className="h-4 w-4" />
                    Ask AI Assistant
                  </Button>

                  <SheetClose asChild>
                    <Link href="/add-business">
                      <Button
                        variant="outline"
                        className="gap-2 w-full"
                        data-testid="button-mobile-add-business"
                      >
                        <PlusCircle className="h-4 w-4" />
                        Add Your Business
                      </Button>
                    </Link>
                  </SheetClose>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={`px-4 py-3 text-sm font-medium rounded-md transition-colors hover-elevate ${
                            location === link.href
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="pt-4 border-t">
                    <CompactClock />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
