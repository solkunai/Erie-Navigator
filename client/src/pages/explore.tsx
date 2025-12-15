import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Utensils, 
  Calendar, 
  MapPin, 
  Heart, 
  Users,
  ArrowRight
} from "lucide-react";

const categories = [
  {
    title: "Restaurants",
    description: "Discover local dining from Mexican to Italian, BBQ to fine dining",
    icon: Utensils,
    href: "/restaurants",
    color: "text-orange-500 dark:text-orange-400"
  },
  {
    title: "Events",
    description: "Find concerts, festivals, holiday celebrations, and community gatherings",
    icon: Calendar,
    href: "/events",
    color: "text-blue-500 dark:text-blue-400"
  },
  {
    title: "Things to Do",
    description: "Activities for kids and adults - museums, parks, entertainment, and more",
    icon: MapPin,
    href: "/things-to-do",
    color: "text-green-500 dark:text-green-400"
  },
  {
    title: "Autism Programs",
    description: "Supportive resources, therapies, and programs for the autism community",
    icon: Heart,
    href: "/autism-programs",
    color: "text-purple-500 dark:text-purple-400"
  },
  {
    title: "Social Groups",
    description: "Connect with clubs, organizations, and community groups",
    icon: Users,
    href: "/social-groups",
    color: "text-teal-500 dark:text-teal-400"
  }
];

export default function Explore() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-explore-title">
            Welcome to the 814's Directory
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-explore-subtitle">
            What would you like to explore today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card 
                className="h-full cursor-pointer hover-elevate transition-all duration-200 group"
                data-testid={`card-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`mb-4 ${category.color}`}>
                    <category.icon className="h-10 w-10" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground flex-grow text-sm">
                    {category.description}
                  </p>
                  <div className="flex items-center mt-4 text-primary text-sm font-medium">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Not sure what you're looking for? Try our{" "}
            <Link href="/" className="text-primary hover:underline">
              AI-powered recommendations
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
