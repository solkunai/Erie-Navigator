import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Utensils,
  Calendar,
  Waves,
  Heart,
  Users,
  ArrowRight,
  Building2
} from "lucide-react";

const categories = [
  {
    title: "The Grub",
    description: "Burgers, tacos, and fine dining for when you're hangry",
    icon: Utensils,
    href: "/restaurants",
    color: "#FFD700",
    textColor: "text-black"
  },
  {
    title: "The Shops",
    description: "Local makers and unique treasures you won't find on Amazon",
    icon: Building2,
    href: "/businesses",
    color: "#3A96CB",
    textColor: "text-white"
  },
  {
    title: "What's On",
    description: "Concerts, festivals, and community events happening now",
    icon: Calendar,
    href: "/events",
    color: "#3A96CB",
    textColor: "text-white"
  },
  {
    title: "Chill Spots",
    description: "Parks, beaches, and quiet nooks for a mental reset",
    icon: Waves,
    href: "/things-to-do",
    color: "#FF851A",
    textColor: "text-white"
  },
  {
    title: "Autism Programs",
    description: "Sensory-friendly programs and accessibility resources",
    icon: Heart,
    href: "/autism-programs",
    color: "#FF851A",
    textColor: "text-white"
  },
  {
    title: "Social Groups",
    description: "Connect with clubs and community organizations",
    icon: Users,
    href: "/social-groups",
    color: "#3A96CB",
    textColor: "text-white"
  }
];

export default function Explore() {
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
        <div className="container mx-auto px-4 md:px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="bg-[#FF851A] text-white border-2 border-black rounded-sm font-bold text-xs px-3 py-1 mb-6 hover:bg-[#FF851A]">
              YOUR GUIDE TO ERIE
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-none" data-testid="text-explore-title">
              <span className="text-black italic">What's Poppin'</span>
              <br />
              <span className="text-[#3A96CB] italic">in the 814?</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium" data-testid="text-explore-subtitle">
              Discover the best food, events, shops, and hidden gems in Erie, PA
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Link key={category.href} href={category.href}>
                <Card
                  className="h-full cursor-pointer border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden group"
                  data-testid={`card-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    backgroundColor: category.color,
                    transform: `rotate(${index % 3 === 0 ? '1deg' : index % 3 === 1 ? '-1deg' : '0deg'})`
                  }}
                >
                  <div className="p-8">
                    {/* Icon */}
                    <div className="mb-6 w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                      <category.icon className={`h-8 w-8 ${category.color === '#FFD700' ? 'text-[#FF851A]' : 'text-[#3A96CB]'}`} />
                    </div>

                    {/* Title */}
                    <h2 className={`text-3xl font-black italic mb-3 ${category.textColor}`}>
                      {category.title}
                    </h2>

                    {/* Description */}
                    <p className={`${category.textColor} font-medium mb-6 leading-relaxed`}>
                      {category.description}
                    </p>

                    {/* Arrow Button */}
                    <div className={`flex items-center ${category.textColor} font-bold group-hover:translate-x-2 transition-transform`}>
                      <span>Explore</span>
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-16">
            <div className="inline-block bg-white border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
              <p className="text-gray-700 font-medium text-lg">
                Can't find what you're looking for? Check out the{" "}
                <Link href="/" className="text-[#FF851A] font-bold hover:text-[#ff9d3d] underline transition-colors">
                  homepage
                </Link>
                {" "}for recommendations!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
