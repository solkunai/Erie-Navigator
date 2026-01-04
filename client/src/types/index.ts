// Data type definitions for Erie Navigator

// Restaurant categories
export const restaurantCategories = [
  "Mexican",
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
  "Bar & Grill",
  "Fine Dining",
  "Fast Food",
  "Gluten-Free",
  "Vegetarian",
  "Vegan",
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
  };
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
