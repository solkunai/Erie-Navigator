import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IceCream,
  Anchor,
  Heart,
  MapPin,
  Utensils,
  Gift
} from "lucide-react";

export default function UIKit() {
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
        {/* Header Navigation */}
        <header className="bg-white border-b-2 border-black sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#FF851A] rounded-lg flex items-center justify-center border-2 border-black">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl">HELLO ERIE</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-[#FF851A] font-bold text-xl">UI KIT</span>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="#palette" className="hover:text-[#FF851A] transition-colors">Palette</a>
                <a href="#typography" className="hover:text-[#FF851A] transition-colors">Typography</a>
                <a href="#components" className="hover:text-[#FF851A] transition-colors">Components</a>
                <a href="#layout" className="hover:text-[#FF851A] transition-colors">Layout</a>
              </nav>
              <button className="w-10 h-10 rounded-full bg-[#FFD700] border-2 border-black flex items-center justify-center hover:scale-105 transition-transform">
                <span className="text-xl">👤</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="mb-16">
            <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-3 py-1 mb-6 hover:bg-[#FFD700]">
              SYSTEM STATUS: ACTIVE
            </Badge>
            <h1 className="text-7xl font-black mb-6 leading-none">
              <span className="text-black italic">WHAT'S POPPIN'</span>
              <br />
              <span className="text-[#FF851A] italic">ERIE?</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              The single source of truth for the Hello Erie aesthetic. A scrapbook-inspired
              digital design language blending high-impact colors with tactile feedback.
            </p>
          </div>

          {/* 01. Color Palette */}
          <section id="palette" className="mb-20">
            <h2 className="text-3xl font-bold italic mb-8">01. COLOR PALETTE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Vibrant Orange */}
              <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] transition-all">
                <div className="p-0">
                  <div className="w-full h-48 bg-[#FF851A] flex items-center justify-center">
                    <span className="text-white font-bold text-xs tracking-wider">PRIMARY</span>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg mb-1">Vibrant Orange</h3>
                    <p className="text-sm text-gray-600">#FF851A • Accent Color</p>
                  </div>
                </div>
              </Card>

              {/* Electric Blue */}
              <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] transition-all">
                <div className="p-0">
                  <div className="w-full h-48 bg-[#3A96CB] flex items-center justify-center">
                    <span className="text-white font-bold text-xs tracking-wider">SECONDARY</span>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg mb-1">Electric Blue</h3>
                    <p className="text-sm text-gray-600">#3A96CB • Navigation</p>
                  </div>
                </div>
              </Card>

              {/* Sun Yellow */}
              <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] transition-all">
                <div className="p-0">
                  <div className="w-full h-48 bg-[#FFD700] flex items-center justify-center">
                    <span className="text-black font-bold text-xs tracking-wider">ACCENT</span>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg mb-1">Sun Yellow</h3>
                    <p className="text-sm text-gray-600">#FFD700 • Highlights</p>
                  </div>
                </div>
              </Card>

              {/* Off-White Dotted */}
              <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] transition-all">
                <div className="p-0">
                  <div
                    className="w-full h-48 bg-[#FCF4F8] flex items-center justify-center relative"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #d4d4d4 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  >
                    <span className="text-gray-700 font-bold text-xs tracking-wider border-2 border-gray-400 bg-white px-2 py-1">
                      CANVAS
                    </span>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg mb-1">Off-White Dotted</h3>
                    <p className="text-sm text-gray-600">#FCF4F8 • Background</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 02. Typography */}
          <section id="typography" className="mb-20">
            <h2 className="text-3xl font-bold italic mb-8">02. TYPOGRAPHY</h2>
            <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] p-8 bg-white">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Display Font */}
                <div>
                  <p className="text-xs text-[#FF851A] font-bold mb-4 tracking-wider">DISPLAY / PLUS JAKARTA SANS</p>
                  <div className="mb-8">
                    <p className="text-4xl font-black leading-tight mb-4">
                      The quick brown fox jumps over the lazy dog.
                    </p>
                    <h3 className="text-2xl font-bold mb-2">Headline 2 Bold Rounded</h3>
                    <h4 className="text-xl italic font-semibold">HEADLINE 3 ITALIC STYLE</h4>
                  </div>
                </div>

                {/* Body Font */}
                <div>
                  <p className="text-xs text-[#3A96CB] font-bold mb-4 tracking-wider">BODY / MANROPE</p>
                  <p className="text-base leading-relaxed mb-6">
                    Hello Erie uses Manrope for all functional body text. It provides high legibility
                    while maintaining a friendly, modern character that complements our chunky display font.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <span className="font-bold">Bold Body Text</span>
                      <p className="text-sm text-gray-600">Used for emphasis and small labels.</p>
                    </div>
                    <div>
                      <span className="italic">Italic Body Text</span>
                      <p className="text-sm text-gray-600">Used for captions and quotes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* 03. UI Components */}
          <section id="components" className="mb-20">
            <h2 className="text-3xl font-bold italic mb-8">03. UI COMPONENTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Buttons & Vibes */}
              <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] p-6 bg-white">
                <h3 className="text-sm font-bold mb-6 tracking-wider">BUTTONS & VIBES</h3>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-[#FF851A] hover:bg-[#ff9d3d] text-white font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] transition-all"
                  >
                    CHUNKY PRIMARY
                  </Button>
                  <Button
                    className="w-full bg-[#3A96CB] hover:bg-[#4da8db] text-white font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] transition-all"
                  >
                    SECONDARY BLUE
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] transition-all"
                  >
                    GHOST BUTTON
                  </Button>
                </div>
                <div className="flex gap-2 mt-6">
                  <Badge className="bg-[#FFD700] text-black text-xs border-2 border-black rounded-full px-3 py-1 hover:bg-[#FFD700] font-bold">
                    ADVENTURE
                  </Badge>
                  <Badge className="bg-[#ffc0b3] text-black text-xs border-2 border-black rounded-full px-3 py-1 hover:bg-[#ffc0b3] font-bold">
                    MUST VISIT
                  </Badge>
                  <Badge className="bg-[#3A96CB] text-white text-xs border-2 border-black rounded-full px-3 py-1 hover:bg-[#3A96CB] font-bold">
                    FOODIE
                  </Badge>
                </div>
              </Card>

              {/* Imagery Style */}
              <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] p-6 bg-white">
                <h3 className="text-sm font-bold mb-6 tracking-wider">IMAGERY STYLE</h3>
                <div className="bg-white p-4 border-2 border-black shadow-md transform rotate-1 hover:rotate-2 transition-transform">
                  <div className="aspect-[4/3] bg-gradient-to-b from-[#87CEEB] to-[#F0E68C] rounded-sm mb-3 flex items-center justify-center">
                    <div className="w-full h-full bg-cover bg-center rounded-sm"
                         style={{
                           backgroundImage: 'linear-gradient(to bottom, #87CEEB 0%, #87CEEB 50%, #F5DEB3 50%, #F5DEB3 100%)'
                         }}
                    />
                  </div>
                  <p className="text-xs font-bold text-center">LAKESIDE VIBES '24</p>
                </div>
              </Card>

              {/* Playful Icons */}
              <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] p-6 bg-white">
                <h3 className="text-sm font-bold mb-6 tracking-wider">PLAYFUL ICONS</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-sm border-2 border-black hover:bg-[#FFD700] transition-colors">
                    <IceCream className="w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-sm border-2 border-black hover:bg-[#FFD700] transition-colors">
                    <Anchor className="w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-sm border-2 border-black hover:bg-[#FFD700] transition-colors">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-sm border-2 border-black hover:bg-[#FFD700] transition-colors">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-sm border-2 border-black hover:bg-[#FFD700] transition-colors">
                    <Utensils className="w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-sm border-2 border-black hover:bg-[#FFD700] transition-colors">
                    <Gift className="w-8 h-8" />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 04. Layout Specs */}
          <section id="layout" className="mb-20">
            <h2 className="text-3xl font-bold italic mb-8">04. LAYOUT SPECS</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Visual Math Code */}
              <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] p-0 bg-[#1a1a1a] overflow-hidden">
                <div className="p-6 font-mono text-sm text-white space-y-3">
                  <div className="text-gray-500">// VISUAL MATH</div>
                  <div>
                    <span className="text-[#FFD700]">01</span> Border Radius: 4px (rounded-sm) for a slightly
                    <br />
                    <span className="ml-6">softened "cut" look.</span>
                  </div>
                  <div>
                    <span className="text-[#FFD700]">02</span> Shadow: Offset: 4px, y-4px, Blur: 0, Spread: 0.
                    <br />
                    <span className="ml-6">Color: #23180F.</span>
                  </div>
                  <div>
                    <span className="text-[#FFD700]">03</span> Borders: 2px Solid Charcoal for primary containers.
                  </div>
                  <div>
                    <span className="text-[#FFD700]">04</span> Grid: 24px Gaps, 12-column modular architecture.
                  </div>
                </div>
              </Card>

              {/* Modular Spacing Guide */}
              <Card className="border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] p-8 bg-white relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black text-white text-xs px-2 py-1 rounded-sm">SPACING</Badge>
                </div>
                <div className="mt-8 flex flex-col items-center justify-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#FF851A] to-[#ff9d3d] border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#FFD700] border-2 border-black rounded-sm flex items-center justify-center">
                      <Gift className="w-8 h-8 text-black" />
                    </div>
                  </div>
                  <div className="h-8 w-1 bg-[#FF851A]" />
                  <div className="w-48 h-2 bg-[#FF851A] rounded-full" />
                </div>
                <p className="text-center text-xs font-bold mt-6 tracking-wider">MODULAR SPACING GUIDE</p>
              </Card>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t-2 border-black">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#FF851A] flex items-center justify-center border-2 border-black transform -rotate-12">
                  <span className="text-white font-bold">H</span>
                </div>
                <span className="font-bold">HELLO ERIE © 2024</span>
              </div>
              <p className="text-sm text-gray-600">
                Design System version 1.0.2 / Created for Erie, PA Creators
              </p>
              <div className="flex gap-2">
                <button className="w-8 h-8 border-2 border-black rounded-sm bg-white hover:bg-[#FFD700] transition-colors" />
                <button className="w-8 h-8 border-2 border-black rounded-sm bg-white hover:bg-[#FFD700] transition-colors" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
