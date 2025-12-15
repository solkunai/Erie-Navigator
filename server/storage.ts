import type { 
  Restaurant, 
  Event, 
  Activity, 
  AutismProgram, 
  SocialGroup,
  RestaurantCategory,
  EventCategory,
  ActivityCategory,
  AudienceType
} from "@shared/schema";
import { 
  restaurants as restaurantData, 
  events as eventData, 
  activities as activityData,
  autismPrograms as programData,
  socialGroups as groupData
} from "./erieData";

export interface IStorage {
  // Restaurants
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurantById(id: string): Promise<Restaurant | undefined>;
  getRestaurantsByCategory(category: RestaurantCategory): Promise<Restaurant[]>;
  searchRestaurants(query: string): Promise<Restaurant[]>;

  // Events
  getEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | undefined>;
  getEventsByCategory(category: EventCategory): Promise<Event[]>;
  getEventsByDate(date: string): Promise<Event[]>;
  searchEvents(query: string): Promise<Event[]>;

  // Activities
  getActivities(): Promise<Activity[]>;
  getActivityById(id: string): Promise<Activity | undefined>;
  getActivitiesByCategory(category: ActivityCategory): Promise<Activity[]>;
  getActivitiesByAudience(audience: AudienceType): Promise<Activity[]>;
  searchActivities(query: string): Promise<Activity[]>;

  // Autism Programs
  getAutismPrograms(): Promise<AutismProgram[]>;
  getProgramById(id: string): Promise<AutismProgram | undefined>;
  searchPrograms(query: string): Promise<AutismProgram[]>;

  // Social Groups
  getSocialGroups(): Promise<SocialGroup[]>;
  getGroupById(id: string): Promise<SocialGroup | undefined>;
  getGroupsByCategory(category: string): Promise<SocialGroup[]>;
  searchGroups(query: string): Promise<SocialGroup[]>;
}

export class MemStorage implements IStorage {
  private restaurants: Restaurant[];
  private events: Event[];
  private activities: Activity[];
  private autismPrograms: AutismProgram[];
  private socialGroups: SocialGroup[];

  constructor() {
    this.restaurants = restaurantData;
    this.events = eventData;
    this.activities = activityData;
    this.autismPrograms = programData;
    this.socialGroups = groupData;
  }

  // Restaurants
  async getRestaurants(): Promise<Restaurant[]> {
    return this.restaurants;
  }

  async getRestaurantById(id: string): Promise<Restaurant | undefined> {
    return this.restaurants.find(r => r.id === id);
  }

  async getRestaurantsByCategory(category: RestaurantCategory): Promise<Restaurant[]> {
    return this.restaurants.filter(r => r.categories.includes(category));
  }

  async searchRestaurants(query: string): Promise<Restaurant[]> {
    const q = query.toLowerCase();
    return this.restaurants.filter(r => 
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.categories.some(c => c.toLowerCase().includes(q))
    );
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return this.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getEventById(id: string): Promise<Event | undefined> {
    return this.events.find(e => e.id === id);
  }

  async getEventsByCategory(category: EventCategory): Promise<Event[]> {
    return this.events.filter(e => e.category === category);
  }

  async getEventsByDate(date: string): Promise<Event[]> {
    return this.events.filter(e => e.date === date);
  }

  async searchEvents(query: string): Promise<Event[]> {
    const q = query.toLowerCase();
    return this.events.filter(e => 
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    );
  }

  // Activities
  async getActivities(): Promise<Activity[]> {
    return this.activities;
  }

  async getActivityById(id: string): Promise<Activity | undefined> {
    return this.activities.find(a => a.id === id);
  }

  async getActivitiesByCategory(category: ActivityCategory): Promise<Activity[]> {
    return this.activities.filter(a => a.category === category);
  }

  async getActivitiesByAudience(audience: AudienceType): Promise<Activity[]> {
    return this.activities.filter(a => a.audience.includes(audience));
  }

  async searchActivities(query: string): Promise<Activity[]> {
    const q = query.toLowerCase();
    return this.activities.filter(a => 
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  }

  // Autism Programs
  async getAutismPrograms(): Promise<AutismProgram[]> {
    return this.autismPrograms;
  }

  async getProgramById(id: string): Promise<AutismProgram | undefined> {
    return this.autismPrograms.find(p => p.id === id);
  }

  async searchPrograms(query: string): Promise<AutismProgram[]> {
    const q = query.toLowerCase();
    return this.autismPrograms.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.organization.toLowerCase().includes(q) ||
      p.services.some(s => s.toLowerCase().includes(q))
    );
  }

  // Social Groups
  async getSocialGroups(): Promise<SocialGroup[]> {
    return this.socialGroups;
  }

  async getGroupById(id: string): Promise<SocialGroup | undefined> {
    return this.socialGroups.find(g => g.id === id);
  }

  async getGroupsByCategory(category: string): Promise<SocialGroup[]> {
    return this.socialGroups.filter(g => g.category === category);
  }

  async searchGroups(query: string): Promise<SocialGroup[]> {
    const q = query.toLowerCase();
    return this.socialGroups.filter(g => 
      g.name.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
    );
  }
}

export const storage = new MemStorage();
