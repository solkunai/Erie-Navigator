import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, date, time } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (kept for potential future authentication)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Restaurant categories
export const restaurantCategories = [
  "Mexican",
  "Latin",
  "BBQ",
  "Seafood",
  "Italian",
  "American",
  "Asian",
  "Indian",
  "Mediterranean",
  "Pizza",
  "Steakhouse",
  "Breakfast",
  "Cafe",
  "Bakery",
  "Bar & Grill",
  "Winery & Meadery",
  "Fine Dining",
  "Fast Food",
  "Gluten-Free",
  "Vegetarian",
  "Vegan",
  "Comfort Food",
  "Irish",
] as const;

export type RestaurantCategory = typeof restaurantCategories[number];

// Restaurant type
export interface Restaurant {
  id: string;
  name: string;
  category: RestaurantCategory;
  categories: RestaurantCategory[];
  address: string;
  phone: string;
  website?: string;
  description: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  rating: number;
  imageUrl?: string;
  hours?: string;
  features: string[];
}

// Event categories
export const eventCategories = [
  "Music",
  "Arts",
  "Sports",
  "Family",
  "Food & Drink",
  "Community",
  "Education",
  "Outdoor",
  "Nightlife",
  "Holiday",
  "Festival",
  "Theater",
] as const;

export type EventCategory = typeof eventCategories[number];

// Event type
export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  endTime?: string;
  venue: string;
  address: string;
  description: string;
  imageUrl?: string;
  ticketUrl?: string;
  price?: string;
  isFree: boolean;
}

// Activity audience types
export const audienceTypes = ["Kids", "Adults", "Family"] as const;
export type AudienceType = typeof audienceTypes[number];

// Activity categories
export const activityCategories = [
  "Outdoor",
  "Indoor",
  "Sports",
  "Arts & Culture",
  "Entertainment",
  "Education",
  "Nature",
  "Shopping",
  "Tours",
  "Recreation",
] as const;

export type ActivityCategory = typeof activityCategories[number];

// Activity/Things to do type
export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  audience: AudienceType[];
  address: string;
  phone?: string;
  website?: string;
  description: string;
  imageUrl?: string;
  hours?: string;
  priceRange?: string;
}

// Autism program type
export interface AutismProgram {
  id: string;
  name: string;
  organization: string;
  description: string;
  ageRange?: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  services: string[];
  accessibility: string[];
  imageUrl?: string;
}

// Social group type
export interface SocialGroup {
  id: string;
  name: string;
  category: string;
  description: string;
  meetingSchedule?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  membershipFee?: string;
  imageUrl?: string;
}

// Business categories
export const businessCategories = [
  "Restaurant",
  "Independent/Pop-up",
  "Retail",
  "Health & Wellness",
  "Beauty & Spa",
  "Automotive",
  "Home Services",
  "Professional Services",
  "Pet Services",
  "Fitness",
  "Education",
  "Entertainment",
  "Financial Services",
  "Real Estate",
  "Photography",
  "Florist",
  "Gifts & Specialty",
  "Clothing & Fashion",
  "Electronics",
  "Hardware & Tools",
  "Grocery & Market",
  "Other",
] as const;

export type BusinessCategory = typeof businessCategories[number];

// Local Business type
export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  categories: BusinessCategory[];
  address: string;
  phone: string;
  email?: string;
  website?: string;
  description: string;
  imageUrl?: string;
  hours?: string;
  features: string[];
  isFeatured?: boolean; // For future paid placements
}

// Business submission type (for the form)
export interface BusinessSubmission {
  name: string;
  category: BusinessCategory;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  description: string;
  hours?: string;
  features: string[];
  ownerName: string;
  ownerEmail: string;
  ownerPhone?: string;
}

// AI Chat message type
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  recommendations?: {
    restaurants?: Restaurant[];
    events?: Event[];
    activities?: Activity[];
    businesses?: Business[];
  };
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Filter types
export interface RestaurantFilters {
  categories: RestaurantCategory[];
  priceRange: ("$" | "$$" | "$$$" | "$$$$")[];
  search: string;
}

export interface EventFilters {
  categories: EventCategory[];
  dateRange: {
    start: string;
    end: string;
  } | null;
  search: string;
}

export interface ActivityFilters {
  categories: ActivityCategory[];
  audience: AudienceType[];
  search: string;
}

export interface BusinessFilters {
  categories: BusinessCategory[];
  search: string;
}
