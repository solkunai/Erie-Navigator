import { Link, useLocation } from "wouter";
import { Search, Sparkles, Menu, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/restaurants", label: "GRUB" },
  { href: "/businesses", label: "SHOPS" },
  { href: "/events", label: "EVENTS" },
  { href: "/things-to-do", label: "CHILL SPOTS" },
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
    <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF851A] rounded-lg flex items-center justify-center border-2 border-black hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-lg">HELLO ERIE</span>
              <span className="text-gray-400">/</span>
              <span className="text-[#FF851A] font-bold text-sm">navigator</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-bold transition-all rounded-sm ${
                  location === link.href
                    ? "bg-[#FF851A] text-white"
                    : "text-gray-700 hover:text-[#FF851A] hover:bg-[#FFD700]/20"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Find the vibe..."
                  className="pl-9 w-56 h-10 text-sm border-2 border-black rounded-sm focus:ring-2 focus:ring-[#FF851A] focus:border-[#FF851A]"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              </div>
            </div>

            {/* Explore Button - Desktop */}
            <Link href="/explore" className="hidden lg:block">
              <Button
                size="sm"
                className="h-10 bg-[#3A96CB] hover:bg-[#4da8db] text-white font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Explore
              </Button>
            </Link>

            {/* User Button */}
            <button className="w-10 h-10 rounded-full bg-[#FFD700] border-2 border-black flex items-center justify-center hover:scale-105 transition-transform">
              <User className="h-5 w-5 text-black" />
            </button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-10 w-10 border-2 border-black rounded-sm hover:bg-[#FFD700]/20"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 border-l-4 border-black bg-[#FCF4F8]">
                <div className="flex flex-col gap-6 py-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-2 pb-4 border-b-2 border-black">
                    <div className="w-10 h-10 bg-[#FF851A] rounded-lg flex items-center justify-center border-2 border-black">
                      <span className="text-white font-bold text-xl">H</span>
                    </div>
                    <span className="font-bold text-lg">HELLO ERIE</span>
                  </div>

                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Find the vibe..."
                      className="pl-9 border-2 border-black rounded-sm"
                      value={searchQuery}
                      onChange={(e) => onSearchChange?.(e.target.value)}
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={`px-4 py-3 text-sm font-bold rounded-sm transition-all border-2 border-black ${
                            location === link.href
                              ? "bg-[#FF851A] text-white shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
                              : "bg-white text-gray-700 hover:bg-[#FFD700]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="border-t-2 border-black pt-4 space-y-3">
                    <SheetClose asChild>
                      <Link href="/explore" className="block">
                        <Button
                          className="w-full justify-start bg-[#3A96CB] hover:bg-[#4da8db] text-white font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Explore Erie
                        </Button>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href="/add-business" className="block">
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-white border-2 border-black font-bold hover:bg-[#FFD700]/20"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Business
                        </Button>
                      </Link>
                    </SheetClose>
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
